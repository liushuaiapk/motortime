// pages/bbsinfo/bbsinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: 0,
    info: '',
    list: [],
    inputw: 50,
    postbtn: false,
    bottombox: 0,
    istrue: false,
    inputfocus: false,
    rid: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        var statusBarHeight = res.statusBarHeight;
        if (statusBarHeight == 44) {
          that.setData({
            handtop: res.statusBarHeight * 2
          })
        } else {
          that.setData({
            handtop: res.statusBarHeight * 2
          })
        }
      },
    })
    that.setData({
      id: id
    })
  },
  //获取详情
  getBbsInfo: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'bbs/card/' + that.data.id,
      data: {
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        that.setData({

          info: res.data.data,
          images: res.data.data.image
        })
      }
    })
  },
  //预览图片
  previewImage: function(e) {
    var img = e.currentTarget.dataset.img
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  //评论列表
  getComments: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'bbs/card/' + that.data.id + '/comments',
      data: {
        page: that.data.page,
        size: 6,
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        that.setData({
          list: res.data.data.data
        })
      }
    })
  },
  //输入框聚焦
  inputfocus: function() {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      this.setData({
        inputfocus: true,
        inputw: 68,
        postbtn: true,
        bottombox: 10
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //输入框失去焦点
  binkeyheight: function(e) {
    var height = e.detail.height
    console.log('height===' + height)
    if (height == 0) {
      this.setData({
        inputfocus: false,
        inputw: 50,
        postbtn: false,
        bottombox: 0
      })
    }
  },
  //评论输入
  inputwrite: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //发表评论
  posted: function() {
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'check-text',
      data: {
        source: 9,
        content: that.data.content
      },
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization // 默认值
      },
      method: 'POST',
      success(res) {
        if (res.data.state == 1) {
          wx.request({
            url: app.globalData.apiUrl + 'bbs/card-comment',
            header: {
              'content-type': 'application/json', // 默认值
              'Authorization': Authorization
            },
            data: {
              rid: that.data.rid,
              card_id: that.data.id,
              content: that.data.content
            },
            method: 'POST',
            success(res) {
              that.getComments();
              that.setData({
                inputfocus: false,
                inputw: 50,
                postbtn: false,
                bottombox: 0,
                content: ''
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.error[0],
            mask: true,
            icon: 'none',
            duration: 1500
          })
          that.setData({
            btnDisabled: false
          })
        }
      }
    })
  },
  //回复评论
  reply: function(e) {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      this.setData({
        rid: e.currentTarget.dataset.code,
        inputfocus: true,
        inputw: 68,
        postbtn: true,
        bottombox: 10
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //删除评论
  delcomm: function(e) {
    var id = e.currentTarget.dataset.code
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.showModal({
      content: '确定要删除该条评论吗？',
      confirmText: "删除",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.apiUrl + 'bbs/card-comment/' + id + '/delete',
            header: {
              'content-type': 'application/json', // 默认值
              'Authorization': Authorization
            },
            method: 'DELETE',
            success(res) {
              if (res.data.state == 1) {
                wx.showToast({
                  title: "删除成功",
                  mask: true,
                  icon: 'success',
                  duration: 1500,
                  success: function() {
                    var commentlist = that.data.list
                    for (var i = 0; i < commentlist.length; i++) {
                      if (commentlist[i].id == id) {
                        commentlist.splice(i, 1)
                      }
                    }
                    that.setData({
                      list: commentlist
                    })
                  }
                })
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
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  //举报
  report: function(e) {
    var access_token = wx.getStorageSync('access_token');
    var id = e.currentTarget.dataset.code
    var type = e.currentTarget.dataset.type
    var that = this;
    wx.showModal({
      content: '确定要举报吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: app.globalData.apiUrl + 'bbs/tip',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              id: id,
              type: type
            },
            method: 'POST',
            success(res) {
              if (res.data.state == 1) {
                wx.showToast({
                  title: "举报成功",
                  mask: true,
                  icon: 'success',
                  duration: 1500
                })
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
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  //点赞/取消赞
  praise: function() {
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
          id: that.data.id,
          type: that.data.info.is_praise == 0 ? 1 : 2
        },
        method: 'POST',
        success(res) {
          var info = that.data.info
          if (that.data.info.is_praise == 0) {
            info.is_praise = 1
            info.praise_num++
          } else {
            info.is_praise = 0
            info.praise_num--
          }
          that.setData({
            info: info
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //评论点赞
  compraise: function(e) {
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.code
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
      wx.request({
        url: app.globalData.apiUrl + 'bbs/card-comment/praise',
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
          var list = that.data.list
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
          that.setData({
            list: list
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  openDialog: function() {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function() {
    this.setData({
      istrue: false
    })
  },
  goback: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  //关注
  followUser: function(e) {
    var id = e.currentTarget.dataset.code
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
      wx.request({
        url: app.globalData.apiUrl + 'user/follow',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': Authorization
        },
        data: {
          follow_user_id: id,
          type: 1
        },
        method: 'POST',
        success(res) {
          var info = that.data.info
          info.user.is_follow = 1
          that.setData({
            info: info
          })
        }
      })
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
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      wx.getStorage({
        key: 'member',
        success: function(res) {
          var userinfo = res.data
          that.setData({
            user_id: userinfo.id
          })
          that.getBbsInfo();
          that.getComments()
        },
      })
    } else {
      that.getBbsInfo();
      that.getComments()
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
  //分享
  onShareAppMessage: function() {
    return {
      title: '凌志范儿',
      path: '/pages/bbsinfo/bbsinfo?id=' + this.data.id
    }
  },
})