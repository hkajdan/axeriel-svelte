<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'
  import 'leaflet/dist/leaflet.css'

  let {
    lat,
    lng,
    address = '',
    city = '',
    logoUrl = undefined
  }: {
    lat: number
    lng: number
    address?: string
    city?: string
    logoUrl?: string
  } = $props()

  let mapEl: HTMLDivElement = $state() as HTMLDivElement
  let map: any = null

  const directionsUrl = $derived(`https://www.google.com/maps/dir//${lat},${lng}`)

  onMount(async () => {
    if (!browser || !lat || !lng) return

    const L = (await import('leaflet')).default

    map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false }).setView([lat, lng], 15)

    // CartoDB Voyager — propre et moderne, sans marquage Google
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map)

    // Marqueur avec logo ou fallback texte en dessous du pin
    const badgeContent = logoUrl
      ? `<img src="${logoUrl}" alt="logo" style="height:20px;width:auto;display:block">`
      : `<span style="font-size:12px;font-weight:600;color:#1f2937">Axeriel</span>`

    const icon = L.divIcon({
      className: '',
      html: `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">
        <div style="
          width:36px;height:36px;border-radius:50% 50% 50% 0;
          background:#0092D6;border:3px solid white;
          transform:rotate(-45deg);
          box-shadow:0 2px 8px rgba(0,0,0,0.35);
          flex-shrink:0
        "></div>
        <div style="
          background:white;
          padding:4px 10px;border-radius:99px;
          box-shadow:0 2px 6px rgba(0,0,0,0.2);
          display:flex;align-items:center
        ">${badgeContent}</div>
      </div>`,
      iconSize: [120, 80],
      iconAnchor: [60, 36]
    })

    L.marker([lat, lng], { icon }).addTo(map)
  })

  onDestroy(() => {
    map?.remove()
  })
</script>

<div class="relative w-full mt-8 rounded-xl overflow-hidden" style="height:300px">
  {#if browser && lat && lng}
    <div bind:this={mapEl} class="w-full h-full"></div>

    <!-- Bouton itinéraire Google Maps — z-index 1100 pour passer au-dessus des contrôles Leaflet (1000) -->
    <button
      type="button"
      onclick={() => window.open(directionsUrl, '_blank', 'noopener,noreferrer')}
      class="absolute top-4 right-4 flex items-center gap-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
      style="z-index: 1100"
    >
      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 16l4.553-2.276A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 18V5m0 0L9 7"/></svg>
      Itinéraire
    </button>
  {:else}
    <div class="w-full h-full bg-white/10 flex items-center justify-center rounded-xl">
      <p class="text-white/60 text-sm">Coordonnées non configurées</p>
    </div>
  {/if}
</div>
