// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    istrue: false,
    zindex: 999
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar();
    var id = options.id
    this.setData({
      user_id: id
    })
    this.getUserinfo()
    this.getList()
  },
  getUserinfo: function() {
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'user/' + that.data.user_id,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        that.setData({
          info: res.data.data
        })
        wx.setNavigationBarTitle({
          title: res.data.data.username,
        })
      }
    })
  },
  //动态列表
  getList: function() {
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'space/' + that.data.user_id + '/lists',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      data: {
        page: that.data.page
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (that.data.page > 1) {
          var list = that.data.list.concat(res.data.data.data);
        } else {
          var list = res.data.data.data;
        }
        for (var i = 0; i < list.length; i++) {
          let year = list[i].year
          let mon = list[i].date

          list[i].year = year
          list[i].mon = mon
        }
        for (var i = 0; i < list.length; i++) {
          if (i > 0) {
            if (list[i].year == list[i - 1].year) {
              list[i].yearshow = false
            } else {
              list[i].yearshow = true
            }
            if (list[i].mon == list[i - 1].mon) {
              list[i].monshow = false
            } else {
              list[i].monshow = true
            }
          } else {
            list[i].yearshow = true
            list[i].monshow = true
          }
        }
        that.setData({
          list: list,
          last_page: res.data.data.last_page,
          current_page: res.data.data.current_page,
        })
      }
    })
  },
  //跳转详情
  goBbsinfo: function(e) {
    var id = e.currentTarget.dataset.code
    var url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: '/pages/webview/webview?url=' + url,
      })
    } else {
      wx.navigateTo({
        url: '/pages/bbsinfo/bbsinfo?id=' + id,
      })
    }
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
    var that = this
    wx.getStorage({
      key: 'onload',
      success: function(res) {
        if (res.data.onload) {
          wx.getStorage({
            key: 'member',
            success: function(res) {
              var userinfo = res.data
              that.setData({
                list: [],
                page: 1,
                last_page: '',
                current_page: '',
                userinfo: userinfo,
                user_id: userinfo.id,
                avatar: userinfo.avatar,
              })
              that.getUserinfo();
              that.getMemberinfo()
              that.getList()
              wx.showLoading({
                title: '加载中',
              })
            },
          })
        }
        wx.removeStorage({
          key: 'onload',
          success: function(res) {},
        })
      },
    })
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
    var that = this
    that.setData({
      page: 1
    })
    that.getList()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    var last_page = that.data.last_page
    var current_page = that.data.current_page
    if (current_page < last_page) {
      that.setData({
        searchLoading: true,
        searchLoadingComplete: false,
        page: current_page + 1
      })
      that.getList()
    } else {
      that.setData({
        searchLoading: false,
        searchLoadingComplete: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})