<!--
 * @Author: xjh
 * @Date: 2021-12-03 09:46:51
 * @LastEditors: xjh
 * @LastEditTime: 2021-12-03 14:25:41
 * @Description:
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  height: 100%;
  font-family: 'Source Han Sans CN Regular', 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
