// detail.js
import utils from '../../../../utils/utils.js'
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    detail: []
  },

  onLoad: function (options) {
    let id = options.id
    wx.request({
      url: host + '/api/hp/feeds/' + id + '/%E5%8C%97%E4%BA%AC',
      success: (res) => {
        if (res.data.res === 0) {
          let detail = res.data.data
          detail.post_date = utils.formatMakettime(detail.post_date)
          this.setData({ detail })
        }
      }
    })
  }
})