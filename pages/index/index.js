//index.js
//获取应用实例
var app = getApp()
import utils from '../../utils/utils.js'
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    idList: [],
    hpCard: []  //图文小记的数据内容
  },

  onLoad: function (options) {
    this.setData({
      idList: app.globalData.idList
    })
    this.getHomePage(this.data.idList)
  },
  
//由于ONE首页列表有很多内容，只获取第一个图文小记的内容
  getHomePage: function (idlist) {
    let hpCard = this.data.hpCard
    if (idlist.length > 0) {  //根据每一天的idList，一次加载十天
      let id = idlist.shift()
      wx.request({
        url: host + '/api/onelist/' + id + '/%E5%8C%97%E4%BA%AC',
        success: (res) => {
          if (res.data.res === 0) {
            let content = res.data.data.content_list[0] //content_list[0]：小记位于首页第一个
            //时间格式的转换，便于显示
            content.post_date = utils.formatMakettime(content.post_date)
            hpCard.push(content) 
          }
          this.getHomePage(idlist)
        }
      })
    }
    else {
      this.setData({
        hpCard
      })
    }
  }
})
