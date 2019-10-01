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

export default {
  name: 'mapview',
  components: {},
  data: function () {
    return {
      mapview: null
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
    createMap () {
      this.mapview = new Map({
        target: 'OSMCanvas',
        layers: [
          new TitleLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
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