// essay.js
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    title: '',
    essayByMonth: []
  },

  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    let that = this
    let month = options.month
    let essayByMonth = this.data.essayByMonth
    wx.request({
      url: host + '/api/essay/bymonth/' + month + '-01%2000:00:00',
      success: (res) => {
        if (res.data.res === 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            let guide = res.data.data[i].guide_word
            let name = res.data.data[i].author_list[0].user_name
            //将阅读的往期内容其中不是ONE STORY的文章排除
            if ((guide !== "我们每周会选择一个主题，由七个作者绘制不同风格的短篇漫画，每天一幅。") && (name !== "黄集伟") && (name !== "苏更生")) {
              essayByMonth.push(res.data.data[i])
            }
          }
          that.setData({
            essayByMonth: essayByMonth
          })
        }
      }
    })
  },

  tapEssay: function (e) {
    var essayId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../story/essay/essay?essayId=' + essayId
    })
  }
})