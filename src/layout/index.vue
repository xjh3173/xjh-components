<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="['main-container', route.name === 'Dashboard' ? '' : '']">
      <avatar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Avatar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Avatar,
    Sidebar,
    AppMain
  },
  computed: {
    route() {
      return this.$route
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
</style>
