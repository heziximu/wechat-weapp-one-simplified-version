// essay.js
import utils from "../../../utils/utils.js"
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    essay: {} //获得的文章具体内容
  },

  onLoad: function (options) {
    //对应story.js的JSON.stringify()
    let essayId = JSON.parse(options.essayId)
    //根据essayId，获得文章详情
    wx.request({
      url: host + '/api/essay/' + essayId,
      success: (res) => {
        if (res.data.res === 0) {
          let essay = res.data.data
          //为了在小程序上正常显示文章进行一些格式的替换，详见utils.js文件
          essay.hp_content = utils.filterContent(essay.hp_content)
          this.setData({ essay })
        }
      }
    })
  }

})