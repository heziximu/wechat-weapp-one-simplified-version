// app.js
const host = 'http://v3.wufazhuce.com:8000'

App({

  globalData: {
    idList: []  //全局数据ONE APP上首页列表的vol，便于在其他页面调用
  },

  onLaunch: function () {
    let that = this
    //获得ONE的APP上第一页列表的vol，一次加载十天的，idList里应该有10个vol
    wx.request({
      url: host + '/api/onelist/idlist/',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.data.res === 0) {
          that.globalData.idList = res.data.data
        }
      }
    })
  }
})