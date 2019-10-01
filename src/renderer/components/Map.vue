<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  mounted () {
    L.map('app', { center: L.latLng(35.6825, 139.752778), zoom: 15 }).addLayer(
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
    )
  }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>