export function getCookie(cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

export function setCookie(name, value, day = 1) {
  const d = new Date()
  d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = name + '=' + value + '; ' + expires
}

export function removeCookie(name) {
  setCookie(name, '', -1)
}
