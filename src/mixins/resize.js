const resizeMixin = {
  data() {
    return {
      reEvt: 'resize',
      // 是否开启了px2rem
      px2remOn: false,
      key: Date.now()
    }
  },
  mounted() {
    // 开启px2rem
    this.px2remOn = true
    this.px2remConfig()
  },
  beforeDestroy() {
    if (this.px2remOn) {
      window.removeEventListener(this.reEvt, this.resetFontSize)
    }
  },
  methods: {
    // 绑定事件
    px2remConfig() {
      // orientationchange->手机屏幕转屏事件
      // resize->页面大小改变事件(兼容pc，移动端)
      this.reEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      window.addEventListener(this.reEvt, this.resetFontSize)
      // DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
      document.addEventListener('DOMContentLoaded', this.setHtmlFontSize)
    },
    // 设置根字号
    setHtmlFontSize() {
      const html = document.getElementsByTagName('html')[0]
      const designWidth = 1920
      const clientW = document.documentElement.clientWidth || document.body.clientWidth
      if (!clientW) {
        return
      }
      const fontSize = 100 * (clientW / parseInt(designWidth, 10))
      html.style.fontSize = fontSize >= 75 ? fontSize + 'px' : '75px'
    },
    // 重置根字号
    resetFontSize() {
      const _this = this
      if (window.resetFontTimeout) {
        clearTimeout(window.resetFontTimeout)
      }
      // 防抖
      window.resetFontTimeout = setTimeout(() => {
        _this.setHtmlFontSize()
        _this.key = Date.now()
      }, 500)
    }
  }
}
export default resizeMixin
