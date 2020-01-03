// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      url: options.url
    })
  },

  userinfo: function(res) {
    var that = this;
    that.setData({
      logining: true
    })
    wx.login({
      success: function(res) {
        var code = res.code
        wx.getUserInfo({
          withCredentials: 'true',
          success: function(res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData
            wx.request({
              url: app.globalData.apiUrl + 'mini-login',
              data: {
                code: code,
                encryptedData: encryptedData,
                iv: iv,
                source: 9
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success(res) {
                if (res.data.state == 1) {
                  wx.setStorage({
                    key: 'access_token',
                    data: res.data.data.access_token,
                  })
                  wx.setStorage({
                    key: 'member',
                    data: res.data.data.user,
                  })
                  var params = {
                    onload: true
                  }
                  wx.setStorage({
                    key: 'onload',
                    data: params,
                  })
                  if (that.data.url) {
                    wx.redirectTo({
                      url: '/pages/' + that.data.url + '/' + that.data.url,
                    })
                  } else {
                    wx.navigateBack({
                      delta: 1
                    })
                  }

                } else {
                  wx.showToast({
                    title: res.data.error[0],
                    mask: true,
                    icon: 'none',
                    duration: 1500
                  })
                  that.setData({
                    logining: false
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  goback: function() {
    wx.navigateBack({
      delta: 1
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

  }
})