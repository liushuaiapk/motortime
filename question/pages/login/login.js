// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_bg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.getSettings();
    wx.getSystemInfo({ //判断机型
      success: (res) => {
        var statusBarHeight = res.statusBarHeight;
        if (statusBarHeight == 20) {
          that.setData({
            regionH: res.statusBarHeight + 44,
            handaddrT: res.statusBarHeight + 10,
            btn_bottom: 40
          })
        } else {
          that.setData({
            regionH: res.statusBarHeight + 44,
            handaddrT: res.statusBarHeight + 8,
            btn_bottom: 70
          })
        }

        var windowHeight = res.windowHeight;
        var windowWidth = res.windowWidth;
        that.setData({
          windowHeight: windowHeight,
          windowWidth: windowWidth
        })
      },
    })
  },
  //获取背景图
  getSettings: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'settings',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        source: 5
      },
      method: 'GET',
      success(res) {
        var login_bg = res.data.data.login_bg
        that.setData({
          login_bg: login_bg
        })
      }
    })
  },
  userinfo: function(res) {
    var that = this;
    wx.showLoading({
      title: '登录中',
    })
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
                source: 5
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success(res) {
                if (res.data.state == 1) {
                  wx.hideLoading();
                  wx.setStorage({
                    key: 'access_token',
                    data: res.data.data.access_token,
                  })
                  wx.setStorage({
                    key: 'member',
                    data: res.data.data.user,
                  })
                  wx.navigateBack({
                    delta: 1
                  })
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