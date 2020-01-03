// pages/article/article.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel: [{
      id: 0,
      title: "全部"
    }],
    list: [],
    page: 1,
    activeIndex: 0,
    media_column_id: 0,
    listmore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar();
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        var statusBarHeight = res.statusBarHeight;
        var windowWidth = res.windowWidth
        if (statusBarHeight == 44) {
          that.setData({
            windowWidth: res.windowWidth,
            handtop: res.statusBarHeight * 2
          })
        } else {
          that.setData({
            windowWidth: res.windowWidth,
            handtop: res.statusBarHeight * 2
          })
        }
      },
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getChannel()
    that.getArticlelist();
  },
  getChannel: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'archive/media/channel',
      data: {
        media_id: 6
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        var channel = that.data.channel.concat(res.data.data)
        that.setData({
          channel: channel
        })
      }
    })
  },
  //选择标签类型
  handleTap: function(e) {
    var code = e.currentTarget.dataset.code;
    var index = e.currentTarget.dataset.index;
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中   
    this.setData({
      tid: 0,
      page: 1,
      navScrollLeft: (index - 2) * singleNavWidth,
      activeIndex: index,
      media_column_id: code,
      listmore: true
    })
    this.getArticlelist()
  },
  getArticlelist: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'home/lists',
      data: {
        media_id: 6,
        media_column_id: that.data.media_column_id,
        page: that.data.page,
        size: 6,
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        if (that.data.page > 1) {
          var newlist = res.data.data
          if (newlist.length == 0) {
            that.setData({
              listmore: false
            })
          } else if (newlist.length < 4) {
            that.setData({
              searchLoading: false,
              searchLoadingComplete: true,
              listmore: false
            })
          }
          var list = that.data.list.concat(res.data.data);
        } else {
          var list = res.data.data;
        }
        that.setData({
          list: list,
          posted: true
        })
        wx.hideLoading();
      }
    })
  },
  //跳转我的
  goMember: function() {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      // wx.navigateTo({
      //   url: '/pages/member/member',
      // })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
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
    if (wx.getStorageSync('member')) {
      wx.getStorage({
        key: 'member',
        success: function(res) {
          var userinfo = res.data
          that.setData({
            userinfo: userinfo,
            user_id: userinfo.id,
            avatar: userinfo.avatar,
          })

        },
      })
    } else {}
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
    var listmore = this.data.listmore
    if (listmore) {
      this.setData({
        searchLoading: true,
        searchLoadingComplete: false,
        page: this.data.page + 1
      })
      this.getArticlelist();
    } else {
      this.setData({
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