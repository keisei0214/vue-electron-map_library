<template>
  <div id="mapWrap">
    <Map ref="map" />
  </div>
</template>

<script>
import Map from '../components/Map.vue'
import { remote } from 'electron'

export default {
  name: 'main-page',
  components: {
    Map
  },
  methods: {
    setMenu () {
      const menu = new remote.Menu()
      const submenuList = []
      Object.keys(this.$refs.map.$data.tile).forEach((e) => {
        submenuList.push(
          {
            label: e,
            click: () => {
              this.$refs.map.changeTile(e)
            },
            type: 'radio',
            checked: this.$refs.map.$data.tile[e].getVisible()
          }
        )
      })
      menu.append(
        new remote.MenuItem({
          label: 'Map',
          submenu: submenuList
        })
      )
      remote.Menu.setApplicationMenu(menu)
    }
  },
  mounted () {
    this.$refs.map.initialize()
    this.setMenu()
  }
}
</script>

<style>
#mapWrap {
  width: 100vw;
  height: 100vh;
}
</style>