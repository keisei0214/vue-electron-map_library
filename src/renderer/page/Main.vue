<template>
  <div id="mapWrap">
    <Map ref="map" />
  </div>
</template>

<script>
import Map from '../components/Map.vue'
import { ipcRenderer } from 'electron'
import { greenIcon, redIcon } from '../components/mapIcons/icons'

export default {
  name: 'main-page',
  components: {
    Map
  },
  mounted () {
    ipcRenderer.on('add_merker', (event, arg) => {
      this.$refs.map.addMarker(arg[0], arg[1], arg[2] === 'green' ? greenIcon : redIcon, 'getPoint')
    })
  }
}
</script>

<style>
#mapWrap {
  width: 100vw;
  height: 100vh;
}
</style>