// 包的入口文件
 
function dateFormat(dateStr){
    const dt = new Date(dateStr);
   
    const y = dt.getFullYear()
    const m = fillZero(dt.getMonth() + 1)
    const d = fillZero(dt.getDate())
   
    const hh = fillZero(dt.getHours())
    const mm = fillZero(dt.getMinutes())
    const ss = fillZero(dt.getSeconds())
   
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
   
   
  // 定义一个补零的函数
  function fillZero(n){
    return n > 9 ? n : '0' + n
  }
   
  module.exports = {
    dateFormat
  }