import type { CustomUrl, Slug } from './sanity.types';
import { client } from './client';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

/**
 * Sanity Link Handling Utilities
 * 
 * This module provides utility functions for resolving and handling links from Sanity CMS.
 */

/**
 * Resolves a Sanity CustomUrl to a proper href attribute
 * Handles internal links, external links, and file downloads
 * @param url - The Sanity CustomUrl object to resolve
 * @returns Resolved URL string suitable for href attribute
 */
export function resolveSanityUrl(url: CustomUrl | undefined): string {
  if (!url) return '#';

  switch (url.type) {
    case 'external':
      return url.external || '#';
    
    case 'internal': {
      // For internal links, we now have the properly resolved slug data from the queries
      // We need to check if this is a resolved reference (with slug) or a basic reference
      const internalRef = url.internal;
      
      // Check if the internal reference has been resolved with slug data
      if (internalRef && 'slug' in internalRef) {
        const slug = (internalRef as { slug: Slug | null }).slug;
        if (slug?.current) {
          // Handle anchor if present
          const cleanSlug = slug.current.startsWith('/') ? slug.current.slice(1) : slug.current;
          const baseUrl = `/${cleanSlug}`;
          return url.anchor ? `${baseUrl}#${url.anchor}` : baseUrl;
        }
      }
      
      // Fallback for cases where slug might not be available
      // This should rarely happen with the updated queries
      console.warn(`Sanity internal reference doesn't include slug data for document type: ${(internalRef as any)?._type}`);
      
      return '#';
    }
    
    case 'file':
      // For file downloads, we need to construct the CDN URL
      if (url.file?.asset?._ref) {
        // Sanity file URLs follow this pattern:
        // https://cdn.sanity.io/files/{projectId}/{dataset}/{assetId}/{filename}
        // We'll need to extract the asset ID from the reference
        const assetId = url.file.asset._ref.replace(/^.*-([a-f0-9]+)$/, '$1');
        const originalFilename = (url.file as any)?.asset?.originalFilename || 'download';
        
        // In a real implementation, you would get these from your Sanity config
        return `https://cdn.sanity.io/files/${PUBLIC_SANITY_PROJECT_ID}/${PUBLIC_SANITY_DATASET}/${assetId}/${originalFilename}`;
      }
      return '#';

    default:
      return '#';
  }
}

/**
 * Gets the proper target attribute for a link based on Sanity URL configuration
 * @param url - The Sanity CustomUrl object
 * @returns '_blank' for new tab, '_self' for same tab, undefined for default behavior
 */
export function getLinkTarget(url: CustomUrl | undefined): '_blank' | '_self' | undefined {
  if (!url) return undefined;
  
  // Open external links in new tab if configured, keep internal links in same tab
  if (url.type === 'external' && url.openInNewTab) {
    return '_blank';
  }
  
  // For file downloads, usually open in new tab
  if (url.type === 'file' && url.openInNewTab) {
    return '_blank';
  }
  
  return '_self';
}

/**
 * Gets the proper rel attribute for a link (important for security with external links)
 * @param url - The Sanity CustomUrl object
 * @returns Security attributes string or undefined
 */
export function getLinkRel(url: CustomUrl | undefined): string | undefined {
  if (!url) return undefined;
  
  // For external links opening in new tab, add security attributes
  if (url.type === 'external' && url.openInNewTab) {
    return 'noopener noreferrer';
  }
  
  return undefined;
}

/**
 * Validates a Sanity URL to ensure it's safe to use
 * @param url - The Sanity CustomUrl object to validate
 * @returns True if the URL is valid and safe, false otherwise
 */
export function isValidSanityUrl(url: CustomUrl | undefined): boolean {
  if (!url) return false;
  
  switch (url.type) {
    case 'external':
      if (!url.external) return false;
      try {
        const parsedUrl = new URL(url.external);
        // Basic validation - allow http, https, and mailto links
        return ['http:', 'https:', 'mailto:'].includes(parsedUrl.protocol);
      } catch (e) {
        return false;
      }
    
    case 'internal': {
      const internalRef = url.internal;
      if (!internalRef) return false;
      
      // Check if it's a resolved reference with slug
      if ('slug' in internalRef) {
        return !!(internalRef as { slug: Slug | null }).slug?.current;
      }
      
      // Check if it's a basic reference with _ref
      return !!(internalRef as any)?._ref;
    }
    
    case 'file':
      return !!url.file?.asset?._ref;
    
    default:
      return false;
  }
}

/**
 * Gets a user-friendly label for the link type (for debugging/previews)
 * @param url - The Sanity CustomUrl object
 * @returns Human-readable link type label
 */
export function getLinkTypeLabel(url: CustomUrl | undefined): string {
  if (!url) return 'No URL';
  
  switch (url.type) {
    case 'external':
      return 'External Link';
    case 'internal':
      return 'Internal Link';
    case 'file':
      return 'File Download';
    default:
      return 'Unknown';
  }
}

/**
 * Gets the actual URL string for display purposes (without domain for internal links)
 * @param url - The Sanity CustomUrl object
 * @returns Display-friendly URL string
 */
export function getDisplayUrl(url: CustomUrl | undefined): string {
  if (!url) return '#';
  
  switch (url.type) {
    case 'external':
      return url.external || '#';
    case 'internal': {
      const internalRef = url.internal;
      if (internalRef && 'slug' in internalRef) {
        const slug = (internalRef as { slug: Slug | null }).slug;
        if (slug?.current) {
          // Handle anchor if present
          // Remove leading slash if present to avoid double slashes
          const cleanSlug = slug.current.startsWith('/') ? slug.current.slice(1) : slug.current;
          const baseUrl = `/${cleanSlug}`;
          return url.anchor ? `${baseUrl}#${url.anchor}` : baseUrl;
        }
      }
      return `/${(internalRef as any)?._ref?.replace(/^drafts\./, '') || '#'}`;
    }
    case 'file':
      return (url.file as any)?.asset?.originalFilename || 'download';
    default:
      return '#';
  }
}

/**
 * Fetches the actual slug for an internal reference
 * This is an async function that should be used in load functions or server-side
 * @param refId - The Sanity document reference ID
 * @returns Promise resolving to the slug path or null if not found
 */
export async function resolveInternalReferenceSlug(refId: string): Promise<string | null> {
  if (!refId) return null;
  
  try {
    // Clean up the reference ID by removing drafts. prefix
    const cleanRefId = refId.replace(/^drafts\./, '');
    
    // Query Sanity for the document with this ID to get its slug
    const query = `*[_id == $id][0]{
      _type,
      slug,
      "path": slug.current
    }`;
    
    const result = await client.fetch(query, { id: cleanRefId });
    
    if (result?.path) {
      return `/${result.path}`;
    }
    
    // If no slug found, return null
    return null;
  } catch (error) {
    console.error(`Failed to resolve internal reference ${refId}:`, error);
    return null;
  }
}

/**
 * Enhanced version of resolveSanityUrl that can handle unresolved internal references
 * by fetching the actual document data. This should be used in async contexts.
 * @param url - The Sanity CustomUrl object to resolve
 * @returns Promise resolving to the resolved URL string
 */
export async function resolveSanityUrlAsync(url: CustomUrl | undefined): Promise<string> {
  if (!url) return '#';

  switch (url.type) {
    case 'external':
      return url.external || '#';
    
    case 'internal':
      // First, check if the reference already includes slug data
      if ((url.internal as any)?.slug?.current) {
        return `/${(url.internal as any).slug.current}`;
      }
      
      // If not, try to fetch the actual document to get the slug
      if (url.internal?._ref) {
        const resolvedSlug = await resolveInternalReferenceSlug(url.internal._ref);
        if (resolvedSlug) {
          return resolvedSlug;
        }
        
        // Fallback to using the reference ID as path
        console.warn(`Could not resolve slug for reference ${url.internal._ref}, using ID as fallback`);
        return `/${url.internal._ref.replace(/^drafts\./, '')}`;
      }
      
      return '#';
    
    case 'file':
      // For file downloads, we need to construct the CDN URL
      if (url.file?.asset?._ref) {
        const assetId = url.file.asset._ref.replace(/^.*-([a-f0-9]+)$/, '$1');
        const originalFilename = (url.file as any)?.asset?.originalFilename || 'download';
        return `https://cdn.sanity.io/files/${PUBLIC_SANITY_PROJECT_ID}/${PUBLIC_SANITY_DATASET}/${assetId}/${originalFilename}`;
      }
      return '#';
    
    default:
      return '#';
  }
}