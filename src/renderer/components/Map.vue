<template>
  <div id="OSMCanvas"></div>
</template>
<script>
import 'ol/ol.css'
import { transform } from 'ol/proj'
import Map from 'ol/Map'
import View from 'ol/View'
import TitleLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'

export default {
  name: 'mapview',
  components: {},
  data: function () {
    return {
      mapview: null,
      tile: {
        whiteMap: null,
        osmMap: null,
        airMap: null
      }
    }
  },
  methods: {
    initialize () {
      this.createMap()
      this.mapview.on('click', ev => {
        var lonlat = transform(ev.coordinate, 'EPSG:3857', 'EPSG:4326')
        console.log('clicked at ' + lonlat)
        this.selectLatLong = lonlat
        this.$emit('clicked')
      })
    },
    changeTile (tileName) {
      if (this.tile[tileName]) {
        Object.keys(this.tile).forEach((e) => {
          if (e === tileName) {
            this.tile[e].setVisible(true)
          } else {
            this.tile[e].setVisible(false)
          }
        })
      }
    },
    createMap () {
      this.tile.whiteMap = new TitleLayer({
        opacity: 1.0,
        visible: true,
        source: new XYZ({
          url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
          projection: 'EPSG:3857'
        })
      })

      this.tile.airMap = new TitleLayer({
        opacity: 1.0,
        visible: false,
        source: new XYZ({
          url: 'https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg',
          projection: 'EPSG:3857'
        })
      })

      this.tile.osmMap = new TitleLayer({
        visible: false,
        source: new OSM()
      })

      this.mapview = new Map({
        target: 'OSMCanvas',
        layers: [
          this.tile.osmMap, this.tile.whiteMap, this.tile.airMap
        ],
        view: new View({
          center: transform([139.326956, 35.738493], 'EPSG:4326', 'EPSG:3857'),
          zoom: 12,
          minZoom: 5,
          maxZoom: 18
        })
      })
    }
  }
}
</script>

<style scoped>
#OSMCanvas {
  width: 100%;
  height: 100%;
}
</style>