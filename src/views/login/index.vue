<template>
  <div class="login-wrap flex-box">

    <div class="login-container flex-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="0" class="form-box">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            maxlength="20"
            autocomplete="off"
            @keyup.enter.native="login"
          >
            <i slot="prefix" class="iconfont pids-zhanghu" />
            <i slot="suffix" class="suffixIcon iconfont pids-qingchu" @click="form.username = ''" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            :type="showPsw ? 'text' : 'password'"
            maxlength="20"
            placeholder="请输入密码"
            autocomplete="off"
            @keyup.enter.native="login"
          >
            <i slot="prefix" class="iconfont pids-mima1" />
            <i slot="suffix" class="suffixIcon iconfont" :class="showPsw ? 'pids-xianshimima' : 'pids-yincangmima'" @click="seePsw" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" class="btn-login" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-tip">
      Copyright © 2020 All Rights Reserved
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import encode from '@/utils/encode'
import { setCookie } from '@/utils/cookie'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
          { message: '只能由英文和数字组成', trigger: 'blur', pattern: /^[a-z0-9]+$/i }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
          { message: '只能由英文和数字组成', trigger: 'blur', pattern: /^[a-z0-9]+$/i }
        ]
      },
      showPsw: false,
      loading: false,
      redirect: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    seePsw() {
      this.showPsw = !this.showPsw
    },
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          login({
            username: encode.compileStr(this.form.username),
            password: encode.compileStr(this.form.password)
          }).then(res => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(async(e) => {
            /* test code */
            if (process.env.NODE_ENV === 'development') {
              setCookie('xToken', 'token')
              this.$store.commit('user/SET_POWER', [{ code: 'permission_code' }])
              const accessedRouters = await this.$store.dispatch('permission/generateRoutes')
              this.$router.addRoutes(accessedRouters)
              this.$router.push({ path: '/' })
            }
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
}

.login-wrap {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #293950 url(./images/loginBg.png) center center no-repeat;
  background-size: cover;
  background-color: #1e277c;

  .title {
    margin-bottom: 30px;
    align-items: center;
    font-size: 26px;
    color: #fff;
    text-align: center;
    line-height: 26px;
    font-weight: 500;
    width: 288px;
    height: 42px;
  }

  .login-container {
    position: relative;
    height: 432px;
    width: 421px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-box {
    width: 100%;
    height: 288px;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 42px 32px;
    box-shadow: 0 9px 28px 8px rgba(8,23,63,0.05), 0 6px 16px 0 rgba(8,23,63,0.08), 0 3px 6px -4px rgba(8,23,63,0.12);

    /deep/ .el-input__inner {
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #3758A1;
      text-indent:10px;
    }

    i {
      display: block;
      font-size: 21px;
      margin: 0 6px;
      line-height: 42px;
      margin-top: 2.3px;
      opacity: 0.5;
      color: #1849FF;
    }
    .suffixIcon{
      color:  rgba(60,86,152,0.50)!important;
    }
  }

  .el-form-item {
    margin-bottom: 32px;
  }

  .btn-login {
    margin-top: 10px;
    width: 100%;
    line-height: 18px;
    background: #3369F6;
    border-radius: 2px;
    font-size: 16px;
    font-weight: bold;
  }

  .btn-setting {
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    color: #202020;
  }

  .bottom-tip {
    width: 90%;
    position: fixed;
    left: 5%;
    bottom: 38px;
    color: #fff;
    opacity: 0.5;
    font-size: 14px;
    line-height: 22px;
    color: #FFFFFF;
    text-align: center;
  }
}
</style>
