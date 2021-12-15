/**
 * 时间格式化
 * @param {Date} date 要转换的时间
 * @param {formatStr} formatStr 转换的格式，如“yyyy年MM月dd日 hh:mm:ss”
 * @returns {String}
 */
export function formatDate(date, formatStr) {
  if (typeof (date) !== 'object') {
    return ''
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(w)/.test(formatStr)) {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    formatStr = formatStr.replace(RegExp.$1, week[date.getDay()])
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return formatStr
}

/**
 * 将字节转成B,KB,MB,GB等单位
 * @param {Number} number 字节
 * @return {string} 转换单位后数据
 */
export function formatByte(number) {
  let size = ''
  if (number < 0.1 * 1024) { // 如果小于0.1KB转化成B
    size = number.toFixed(2) + 'B'
  } else if (number < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
    size = (number / 1024).toFixed(2) + 'KB'
  } else if (number < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
    size = (number / (1024 * 1024)).toFixed(2) + 'MB'
  } else { // 其他转化成GB
    size = (number / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }

  const sizestr = size + ''
  const len = sizestr.indexOf('.')
  const dec = sizestr.substr(len + 1, 2)
  if (dec === '00') { // 当小数点后为00时,去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}
