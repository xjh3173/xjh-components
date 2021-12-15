<!--
 * @Author: xjh
 * @Date: 2021-12-03 09:46:52
 * @LastEditors: xjh
 * @LastEditTime: 2021-12-07 17:04:56
 * @Description:
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse': true}">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <h1>{{ title }}</h1>
        <p>{{ version }}</p>
      </router-link>
    </transition>
  </div>
</template>

<script>
import config from '@/../package.json'
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title: 'x-admin',
      version: `V${config.version}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 108px;
  line-height: 78px;
  padding: 0px 20px;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    font-size: 18px;
    color: #fff;
    h1{
      font-size: 18px;
      line-height: 36px;
      margin: 0;
      margin-top: 30px;
    }
    p{
      font-size: 14px;
      line-height: 18px;
      margin: 0;
      color: #9AA4BA;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
