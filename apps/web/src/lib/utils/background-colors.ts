/**
 * Background color options from Sanity
 */
type BackgroundColor = '' | 'white' | 'light-blue' | 'blue' | 'grey' | 'light-grey'

/**
 * Returns appropriate Tailwind classes for section background and text color
 * based on the background color selection from Sanity
 */
export function getSectionClasses(bg: BackgroundColor): string {
  const baseClasses = 'w-full py-16 md:py-24 lg:py-32'
  
  switch (bg) {
    case 'white':
      return `${baseClasses} bg-white text-neutral-900`
    case 'light-blue':
      return `${baseClasses} bg-primary-100 text-neutral-900`
    case 'blue':
      return `${baseClasses} bg-primary-500 text-white`
    case 'grey':
      return `${baseClasses} bg-neutral-200 text-neutral-900`
    case 'light-grey':
      return `${baseClasses} bg-neutral-50 text-neutral-900`
    default:
      return `${baseClasses} bg-white text-neutral-900`
  }
}

/**
 * Returns appropriate text color class for content on the given background
 */
export function getTextColorClass(bg: BackgroundColor): string {
  switch (bg) {
    case 'blue':
      return 'text-white'
    case 'white':
    case 'light-blue':
    case 'grey':
    case 'light-grey':
    default:
      return 'text-neutral-900'
  }
}