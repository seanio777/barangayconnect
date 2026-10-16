import { useEffect, useRef } from "react"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import Button from "./Button"
import { JOSE_PANGANIBAN } from "../data/constants"

/*
  Leaflet map (OpenStreetMap tiles).
  - markers + selectedId + onSelect: show report pins and let the user select one
  - draft + onPick: let the user drop a pin (used on the Submit Concern page)
*/
export default function NeighborhoodMap({ markers = [], selectedId, onSelect, draft, onPick, zoom = 15 }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)
  const onPickRef = useRef(onPick)
  onPickRef.current = onPick

  useEffect(() => {
    if (!containerRef.current) return
    const map = L.map(containerRef.current, {
      zoomControl: Boolean(onPickRef.current),
      scrollWheelZoom: true,
    }).setView(JOSE_PANGANIBAN, zoom)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)
    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map
    map.on("click", (event) => {
      onPickRef.current?.({ lat: event.latlng.lat, lng: event.latlng.lng })
    })
    return () => {
      // Leaflet starts a short timer after every animated zoom. Clearing this
      // flag stops that timer from touching the map after it has been removed.
      map._animatingZoom = false
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && mapRef.current.getZoom() !== zoom) {
      mapRef.current.setZoom(zoom)
    }
  }, [zoom])

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    layer.clearLayers()
    markers.forEach((report) => {
      const status = report.status.toLowerCase().replace(/ /g, "-")
      const selected = selectedId === report.id ? " real-map-pin-selected" : ""
      const icon = L.divIcon({
        className: "real-map-marker-wrap",
        html: `<span class="real-map-pin real-map-pin-${status}${selected}"><span class="real-map-pin-center"></span></span>`,
        iconSize: [32, 42],
        iconAnchor: [16, 40],
      })
      const marker = L.marker([report.position.lat, report.position.lng], {
        icon,
        title: `${report.title}, ${report.status}`,
      }).addTo(layer)
      marker.on("click", () => onSelect?.(report.id))
      const label = document.createElement("span")
      label.textContent = report.title
      marker.bindTooltip(label)
    })
    if (draft) {
      L.marker([draft.lat, draft.lng], {
        icon: L.divIcon({
          className: "real-map-marker-wrap",
          html: '<span class="real-map-pin real-map-pin-draft"><span class="real-map-pin-center"></span></span>',
          iconSize: [32, 42],
          iconAnchor: [16, 40],
        }),
        interactive: false,
      }).addTo(layer)
    }
  }, [markers, selectedId, onSelect, draft])

  useEffect(() => {
    const report = markers.find((item) => item.id === selectedId)
    if (report) mapRef.current?.panTo([report.position.lat, report.position.lng])
  }, [selectedId])

  return (
    <div className="neighborhood-map real-map">
      <div ref={containerRef} className="real-map-canvas" aria-label="Map of Jose Panganiban, Camarines Norte" />
      {onPick && (
        <div className="map-center-action">
          <Button
            variant="outline"
            icon="pin"
            onClick={() => {
              const center = mapRef.current?.getCenter()
              if (center) onPick({ lat: center.lat, lng: center.lng })
            }}
          >
            Pin map center
          </Button>
        </div>
      )}
    </div>
  )
}
