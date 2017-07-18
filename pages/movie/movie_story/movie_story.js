// movie_story.js
const host = 'http://v3.wufazhuce.com:8000'

Page({

  data: {
    movieStory: {}
  },

  onLoad: function (options) {
    let index = options.index
    let pages = getCurrentPages() //得到当前页
    if (pages.length > 1) {
      //得到上一页的data中的数据
      var movieStory = pages[pages.length - 2].data.movieData[index]
    }
    this.setData({
      movieStory: movieStory
    })
  }
})