<template>
  <div id="canvas">
    <div id="popup"></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import { transform } from 'ol/proj'
import Map from 'ol/Map'
import View from 'ol/View'
import TitleLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Icon, Style } from 'ol/style'
import Overlay from 'ol/Overlay'

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
        const lonlat = transform(ev.coordinate, 'EPSG:3857', 'EPSG:4326')
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

      const rome = new Feature({
        geometry: new Point(transform([139.326956, 35.738493], 'EPSG:4326', 'EPSG:3857')),
        name: 'test test'
      })
      rome.setStyle(new Style({
        image: new Icon({
          color: 'red',
          crossOrigin: 'anonymous',
          src: require('@/assets/marker.png')
        })
      }))
      const vectorSource = new VectorSource({
        features: [rome]
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource
      })

      this.mapview = new Map({
        target: 'canvas',
        layers: [
          this.tile.osmMap, this.tile.whiteMap, this.tile.airMap, vectorLayer
        ],
        view: new View({
          center: transform([139.326956, 35.738493], 'EPSG:4326', 'EPSG:3857'),
          zoom: 12,
          minZoom: 5,
          maxZoom: 18
        })
      })

      const element = this.$el.querySelector('#popup')
      const popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      })
      this.mapview.addOverlay(popup)

      this.mapview.on('singleclick', function (evt) {
        const name = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature.get('name')
        })
        if (name) {
          console.log(name)
          const coordinate = evt.coordinate
          element.innerHTML = '<p>You clicked here:</p>'
          popup.setPosition(coordinate)
        } else {
          element.innerHTML = ''
        }
      })
    }
  }
}
</script>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
}
</style>