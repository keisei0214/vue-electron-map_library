<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ipcRenderer } from 'electron'

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
          popupAnchor: [0, -40],
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

    this.addMarker(35.684035, 139.758212, this.icons.green, '<h1>test add</h1>', 'test</br>label')

    this.map.on('contextmenu', function (e) {
      this.addMarker(e.latlng.lat, e.latlng.lng, this.icons.green, 'clicked')
      this.removeMarker(0)
    }.bind(this))
  },
  methods: {
    addMarker (lat, lon, icon, popup, label) {
      const marker = L.marker([lat, lon], { icon: icon })
        .bindPopup(popup)
        .bindTooltip(label, { permanent: true, direction: 'right', className: 'green' }).openTooltip()
        .addTo(this.map)
      this.markers.push(marker)
    },
    removeMarker (i) {
      if (this.markers.length > i) {
        const m = this.markers.splice(i, i + 1)[0]
        this.map.removeLayer(m)
      }
    },
    getPoint () {
      ipcRenderer.send('get-marker', 1124)
      ipcRenderer.on('reply', (event, arg) => {
        console.log(arg)
        this.addMarker(arg[0], arg[1], this.icons.green, 'getPoint')
      })
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
<style>
.leaflet-tooltip.green {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  font-size: 1rem;
  color: green;
  font-weight: bolder;
  text-shadow: 1px 1px 0 #fff;
}

.leaflet-tooltip-right:before {
  border-right-color: transparent;
}
</style>