<template>
  <div id="mapWrap">
    <Map ref="map" />
  </div>
</template>

<script>
import Map from '../components/Map.vue'

export default {
  name: 'main-page',
  components: {
    Map
  },
  methods: {
  },
  mounted () {
    this.$refs.map.initialize()
  }
}
</script>

<style>
#mapWrap {
  width: 100vw;
  height: 100vh;
}
</style>