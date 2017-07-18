// index.js
import utils from '../../../utils/utils.js'
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    title: '',
    hpByMonth: []
  },

  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    console.log(options.title)
    let that = this
    let month = options.month
    wx.request({
      url: host + '/api/hp/bymonth/' + month + '-01%2000:00:00',
      success: (res) => {
        if (res.data.res === 0) {
          let hpByMonth = res.data.data
          hpByMonth.map((byMonth) => {
            byMonth.hp_makettime = utils.formatMakettime(byMonth.hp_makettime)
          })
          that.setData({
            hpByMonth: hpByMonth
          })
        }
      }
    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

//根据所点击的内容的id，跳转到详情界面detail显示相应内容
  handleTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    })
  }
})