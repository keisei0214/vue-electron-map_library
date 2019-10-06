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
      map: null
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
  }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>