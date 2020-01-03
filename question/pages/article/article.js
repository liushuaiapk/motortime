// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputshow: false,
    collect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({ //判断机型
      success: (res) => {
        var statusBarHeight = res.statusBarHeight;
        if (statusBarHeight == 20) {
          that.setData({
            botheight: 90
          })
        } else {
          that.setData({
            botheight: 150
          })
        }
      },
    })
  },
  focusinput: function() {
    console.log('focusinput')
    this.setData({
      inputshow: true
    })
  },
  blirinput: function() {
    this.setData({
      inputshow: false
    })
  },
  bindCollect: function() {
    this.setData({
      collect: true
    })
  },
  bindClose: function() {
    this.setData({
      collect: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '分享',
      path: '/pages/article/article'
    }
  }
})