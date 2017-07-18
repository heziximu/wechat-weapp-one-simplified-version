// movie.js
var app = getApp()
var ind = -1
import utils from '../../utils/utils.js'
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    idList: [],
    movieData: []
  },

  onLoad: function (options) {
    this.setData({
      idList: app.globalData.idList
    })
    this.getMoviePage(this.data.idList)
  },

  getMoviePage: function (idlist) {
    ind++
    let movieData = this.data.movieData
    if (idlist.length > 0) {
      let id = idlist.shift()
      wx.request({
        url: host + '/api/onelist/' + id + '/%E5%8C%97%E4%BA%AC',
        success: (res) => {
          if (res.data.res === 0) {
            let content = res.data.data.content_list
            let len = content.length
            if (content[len - 1].movie_story_id !== 0) {  //正常情况下影视在首页列表的倒数第二个，有movie_story_id的值
              content[len - 1].index = ind  //为content[i]添加一个元素index表明它在数组中的位置
              content[len - 1].post_date = utils.formatMakettime(content[len - 1].post_date)
              content[len - 1].share_info.content = utils.filterContent(content[len - 1].share_info.content)  //影视详情格式的替换
              movieData.push(content[len - 1])
            }
            else {
              for (var i = len - 1; i > 0;) { //偶尔倒数第二个不是影视，要向上查找
                if ((typeof (content[i].movie_story_id) !== "undefined") && (content[i].movie_story_id !== 0)) {
                  content[i].index = ind
                  content[i].share_info.content = utils.filterContent(content[len - 1].share_info.content)
                  movieData.push(content[i])
                  break
                }
                else {
                  i--
                }
              }
            }
          }
          this.getMoviePage(idlist)
        }
      })
    }
    else {
      this.setData({ movieData: movieData })
    }
  },

//页面跳转，传递点击到的影视的所在列表位置index
  getMovieDetail: function (e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: 'movie_story/movie_story?index=' + index
    })
  }
})