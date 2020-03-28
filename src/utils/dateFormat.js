// 日期处理函数封装

const formatDateTime = function (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

export default formatDateTime
