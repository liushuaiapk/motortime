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
    var that = this
    if (wx.getStorageSync('member')) {
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
    } else {
      wx.showToast({
        title: '您还没有登录，请点击登录...',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    }
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
      }
    })
  },
  getMemberinfo: function() {
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'user',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        that.setData({
          memberinfo: res.data.data,
          picbg: res.data.data.bg
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
  //更换背景图
  choosePic: function() {
    var that = this;
    if (wx.getStorageSync('member')) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          var tempFilePaths = res.tempFilePaths
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload',
            filePath: tempFilePaths[0],
            name: 'img',
            formData: {
              'type': 1
            },
            success(res) {
              wx.hideToast();
              var picdata = JSON.parse(res.data);
              var picbg = picdata.data.img_url;
              var bg = picdata.data.img;
              var memberinfo = that.data.memberinfo
              memberinfo.bg = bg
              memberinfo.avatar = ''
              that.setData({
                picbg: picbg,
                memberinfo: memberinfo
              });
              var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
              wx.request({
                url: app.globalData.apiUrl + 'user',
                header: {
                  'content-type': 'application/json',
                  'Authorization': Authorization
                },
                data: that.data.memberinfo,
                method: 'PUT',
                success(res) {
                  if (res.data.state == 1) {
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      mask: true,
                      duration: 1500
                    })
                    that.getMemberinfo()
                  } else {
                    wx.showToast({
                      title: res.data.error[0],
                      mask: true,
                      icon: 'none',
                      duration: 1500
                    })
                  }
                }
              })
            },
            fail: function(res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function(res) {}
              })
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //立即登录
  goLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //发表
  showpost: function() {
    this.setData({
      istrue: true,
      zindex: 0
    })
  },
  //关闭分享
  closeDialog: function() {
    this.setData({
      istrue: false,
      zindex: 999
    })
  },
  //动态
  posted: function() {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      wx.navigateTo({
        url: '/pages/post/post',
      })
      this.setData({
        istrue: false,
        zindex: 999
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