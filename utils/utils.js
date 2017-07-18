const VOL_AND_READING_BEGIN_TIME = '2012-10'
const MONTH_MAP = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
  'Jul.', 'Aug.', 'Sep.', 'Otc.', 'Nov.', 'Dec.']

//文章格式转化
const filterContent = (string) => string.replace(/[\r\n]/g, "\n\n").replace(/<.*?>/g, "").replace(/\n这里藏着一张图片，前往应用商店，下载「一个」最新版本查看！\n/g, "").replace(/\n\n\n\n/g, "\n\n")

//显示时间的格式
const formatMakettime = (dateString) => {
  return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')
}

//往期列表，按月份降序排列
const getBeginTime = () => {
  let beginTime = VOL_AND_READING_BEGIN_TIME
  return new Date(beginTime)
}
const getDateList = () => {
  let begin = getBeginTime()
  let beginYear = begin.getFullYear()
  let beginMonth = begin.getMonth()

  let now = new Date()
  let nowYear = now.getFullYear()
  let nowMonth = now.getMonth()

  let dateList = [];
  for (let y = nowYear; y >= beginYear; y--) {
    for (let m = 11; m >= 0; m--) {
      dateList.push({
        title: MONTH_MAP[m] + y,
        value: y + '-' + (m + 1)
      })
    }
  }

  dateList = dateList.slice(11 - nowMonth, dateList.length - beginMonth)
  return dateList
}

module.exports = {
  filterContent,
  formatMakettime,
  getDateList
}
