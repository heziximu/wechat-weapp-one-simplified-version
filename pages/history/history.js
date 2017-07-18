// history.js
var utils = require('../../utils/utils.js')

Page({

  data: {
    dateList: [],
    types: [
      {
        type: 'index',
        name: '小记'
      },
      {
        type: 'essay',
        name: '阅读'
      }
    ],
    type: 'index'
  },

  onLoad: function (options) {
    let dateList = utils.getDateList()
    this.setData({
      dateList: dateList
    })
  },

//确定所要获得的是小记还是阅读的往期内容
  setType: function (e) {
    let type = e.target.dataset.type
    this.setData({
      type: type
    })
  },

//得到按月份的往期列表信息，跳转到对应页面显示
  getMonthly: function (e) {
    let month = e.target.dataset.month
    let title = e.target.dataset.title
    let type = this.data.type
    if (type === 'index'){
      wx.navigateTo({
        url: 'index/index?month=' + month + '&title=' + title
      })
    }
    else {
      wx.navigateTo({
        url: 'essay/essay?month=' + month + '&title=' + title
      })
    }
  }
})