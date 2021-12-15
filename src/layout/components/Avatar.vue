<template>
  <div class="header-container">
    <el-dropdown class="user-wrapper">
      <div class="avatar-wrapper">
        <i class="icon-user" />
        <span v-if="userName" class="username">{{ userName }}</span>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from '@/api/user'
import { removeCookie } from '@/utils/cookie'

export default {
  name: 'Avatar',
  data() {
    return {
      model: ''
    }
  },
  computed: {
    userName() {
      return ''
    }
  },
  methods: {
    logout() {
      logout().then(res => {
        removeCookie('xToken')
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "~@/styles/variables.scss";

 .header-container {
  display: flex;
  align-items: center;
  height: $tabHeight;
  right: 10px;
  color: #3C5698;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(8, 23, 63, .12);
  font-size: 14px;
  z-index: 2;

  .el-select {
    width: 100px;
    margin-left: 8px;
  }

  .time {
    margin: 0 20px 0 40px;
  }

  .user-wrapper {
    position: absolute;
    right: 20px;
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
    height: $tabHeight;
    line-height: $tabHeight;
    padding: 0 16px;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &:hover {
      background: rgba(24, 73, 255, .08);
      border-bottom: 2px solid #1849FF;
    }

    .username {
      margin-left: 10px;
      font-size: 14px;
      color: #3758A1;
    }

    .icon-user {
      display: inline-block;
      width: 28px;
      height: 28px;
      background-image: url('~@/assets/images/icon-user.svg');
      background-size: 100% 100%;
    }
  }
}
</style>
