// pages/topicinfo/topicinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    this.setData({
      id: id
    })
  },
  //获取详情
  getTopicInfo: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'topic/' + that.data.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        that.setData({
          info: res.data.data
        })
      }
    })
  },
  //关联的帖子
  getTopicBbs: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'bbs/cards',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        cid: 4,
        page: that.data.page,
        size: 6,
        user_id: that.data.user_id,
        topic_id: that.data.id
      },
      method: 'GET',
      success(res) {
        that.setData({
          list: res.data.data.data,
          total: res.data.data.total
        })
        that.waterFall()
      }
    })
  },
  waterFall: function() {
    var list1 = []
    var list2 = []
    var list = this.data.list
    var newlist = []
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].image.length > 0) {
          newlist.push(list[i])
        }
      }
      for (var i = 0; i < newlist.length; i++) {
        if (i % 2 == 0) {
          list1.push(newlist[i])
        } else {
          list2.push(newlist[i])
        }
      }
      this.setData({
        listLeft: list1,
        listRight: list2
      })
    }
  },
  //点赞/取消赞
  praise: function(e) {
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.code
    var num = e.currentTarget.dataset.num
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
      wx.request({
        url: app.globalData.apiUrl + 'bbs/card/praise',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': Authorization
        },
        data: {
          id: id,
          type: type == 0 ? 1 : 2
        },
        method: 'POST',
        success(res) {
          if (num == 1) {
            var list = that.data.listLeft
          } else {
            var list = that.data.listRight
          }
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
              if (type == 0) {
                list[i].is_praise = 1
                list[i].praise_num++
              } else {
                list[i].is_praise = 0
                list[i].praise_num--
              }
            }
          }
          if (num == 1) {
            that.setData({
              listLeft: list
            })
          } else {
            that.setData({
              listRight: list
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }

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
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      wx.getStorage({
        key: 'member',
        success: function(res) {
          var userinfo = res.data
          that.setData({
            user_id: userinfo.id
          })
          that.getTopicInfo();
          that.getTopicBbs();
        },
      })
    } else {
      that.getTopicInfo();
      that.getTopicBbs();
    }
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