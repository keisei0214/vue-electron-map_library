<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  data: function () {
    return {
      tile: {
        osmMap: null,
        whiteMap: null,
        airMap: null
      },
      map: null,
      icons: {
        green: new L.Icon({
          iconUrl: require('@/assets/marker/green.png'),
          iconSize: [24, 40],
          popupAnchor: [0, -20],
          iconAnchor: [12, 45]
        })
      },
      markers: []
    }
  },
  mounted () {
    this.tile.osmMap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png')
    this.tile.whiteMap = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png')
    this.tile.airMap = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg')

    this.map = L.map('app', { center: L.latLng(35.6825, 139.752778), zoom: 15 }).addLayer(
      this.tile.osmMap
    )
    L.control.layers(this.tile, null, null).addTo(this.map)

    this.addMarker(35.684035, 139.758212, this.icons.green, '<h1>test add</h1>')

    this.map.on('contextmenu', function (e) {
      this.addMarker(e.latlng.lat, e.latlng.lng, this.icons.green, 'clicked')
      this.removeMarker(0)
    }.bind(this))
  },
  methods: {
    addMarker (lat, lon, icon, popup) {
      const marker = L.marker([lat, lon], { icon: icon }).bindPopup(popup).addTo(this.map)
      this.markers.push(marker)
    },
    removeMarker (i) {
      if (this.markers.length > i) {
        const m = this.markers.splice(i, i + 1)[0]
        this.map.removeLayer(m)
      }
    }
  }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>