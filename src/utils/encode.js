// 此文件用于对字符串进行简单的加密和解密
export default {
  compileStr: (code) => {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    }
    return escape(c)
  },
  uncompileStr: (code) => {
    code = unescape(code)
    let c = String.fromCharCode(code.charCodeAt(0) - code.length)
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
    }
    return c
  }
}
