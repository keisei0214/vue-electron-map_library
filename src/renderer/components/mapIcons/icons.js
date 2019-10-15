import L from 'leaflet'

export const greenIcon = new L.Icon({
  iconUrl: require('@/assets/marker/green.png'),
  iconSize: [24, 40],
  popupAnchor: [0, -40],
  iconAnchor: [12, 45]
})

export const redIcon = new L.Icon({
  iconUrl: require('@/assets/marker/red.png'),
  iconSize: [24, 40],
  popupAnchor: [0, -40],
  iconAnchor: [12, 45]
})
