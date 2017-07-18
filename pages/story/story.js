// pages/story/story.js

var app = getApp()
import utils from '../../utils/utils.js'
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    idList: [],
    readingData: [] //ONE APP首页列表中ONE STORY的内容
  },

  onLoad: function (options) {
    this.setData({
      idList: app.globalData.idList
    })
    this.getReadingPage(this.data.idList)
  },

//同index.js中getHomePage()，获取列表中ONE STORY内容
  getReadingPage: function (idlist) {
    let readingData = this.data.readingData
    if (idlist.length > 0) {
      let id = idlist.shift()
      wx.request({
        url: host + '/api/onelist/' + id + '/%E5%8C%97%E4%BA%AC',
        success: (res) => {
          if (res.data.res === 0) {
            let content = res.data.data.content_list
            if (content[1].tag_list[0].id === "7") {  //通常ONE STORY在列表的第二个，tag的id为7
              content[1].post_date = utils.formatMakettime(content[1].post_date)
              readingData.push(content[1])
            }
            else {
              for (var i = 1; i < content.length;) {  //偶尔列表第二个的内容不是ONE STORY，顺序向下查看哪个tag的id为7
                if ((typeof (content[i].tag_list[0].id) !== "undefined") && (content[i].tag_list[0].id === "7")) {
                  content[i].post_date = utils.formatMakettime(content[i].post_date)
                  readingData.push(content[i])
                  break
                }
                else {
                  i++
                }
              }
            }
          }
          this.getReadingPage(idlist)
        }
      })
    }
    else {
      this.setData({ readingData: readingData })
    }
  },

//页面跳转，传递被点击到的文章的id
  getEssay: function (e) {
    //由于id类型为object，将其转化为string类型才能传递
    let essayId = JSON.stringify(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: 'essay/essay?essayId=' + essayId
    })
  }
})