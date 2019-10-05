<template>
  <div id="canvas">
    <div id="map"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content">{{name}}</div>
    </div>
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
import { Icon, Style, Fill, Stroke } from 'ol/style'
import Overlay from 'ol/Overlay'
import Text from 'ol/style/Text'

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
      },
      name: null
    }
  },
  methods: {
    initialize () {
      this.createMap()
      this.setPopup()
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

      const marker = new Feature({
        geometry: new Point(transform([139.326956, 35.738493], 'EPSG:4326', 'EPSG:3857')),
        name: 'test test'
      })
      marker.setStyle(new Style({
        image: new Icon({
          color: 'red',
          crossOrigin: 'anonymous',
          src: require('@/assets/marker.png')
        }),
        text: new Text({
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: '#ffffff', width: 1 }),
          scale: 1.5,
          textAlign: 'left',
          textBaseline: 'bottom',
          offsetY: 0,
          text: 'test TEXTaa\naaaaaaaaaaaaaa\nsssss',
          font: '10px sans-serif'
        })
      }))
      const vectorSource = new VectorSource({
        features: [marker]
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource
      })

      this.mapview = new Map({
        target: 'map',
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
    },
    setPopup () {
      const popupElement = this.$el.querySelector('#popup')
      const popup = new Overlay({
        element: popupElement,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      this.mapview.addOverlay(popup)

      const closer = this.$el.querySelector('#popup-closer')
      closer.onclick = function () {
        popup.setPosition(undefined)
        closer.blur()
        return false
      }

      this.mapview.on('singleclick', function (evt) {
        const name = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature.get('name')
        })
        if (name) {
          const coordinate = evt.coordinate
          popup.setPosition(coordinate)
          this.name = name + Math.random()
        } else {
          popup.setPosition(undefined)
          closer.blur()
        }
      }.bind(this))
    }
  }
}
</script>

<style scoped>
#canvas,
#map {
  width: 100%;
  height: 100%;
}

.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>