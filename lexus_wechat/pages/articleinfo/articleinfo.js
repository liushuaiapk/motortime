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
    order: 1,
    images: []
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
  getBbsInfo: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'archive/' + that.data.id,
      data: {
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        var article = res.data.data
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var content = article.content
        if (content) {
          var arr = article.content.match(imgReg);
          if (arr) {
            for (var i = 0; i < arr.length; i++) {
              var content = article.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;" ')
            }
          }
        }
        var images = []
        var all_pics = res.data.data.all_pics
        if (all_pics.length > 0) {
          for (var i = 0; i < all_pics.length; i++) {
            images.push(all_pics[i].img_url)
          }
        } else {
          images.push(res.data.data.pic_url)
        }

        that.setData({
          info: res.data.data,
          contents: content,
          images: images
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
      url: app.globalData.apiUrl + 'archive/' + that.data.id + '/comments',
      data: {
        page: 1,
        size: 10,
        user_id: that.data.user_id,
        order: that.data.order
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        that.setData({
          total: res.data.data.total,
          list: res.data.data.data
        })
      }
    })
  },
  //其他作品
  getOtherList: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'archive/' + that.data.id + '/recommends',
      data: {
        media_id: 6,
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        that.setData({
          otherlist: res.data.data
        })
      }
    })
  },
  //评论排序
  commSort: function() {
    var order = this.data.order
    this.setData({
      order: order == 2 ? 1 : 2
    })
    this.getComments()
  },
  //文章点赞
  praiseart: function() {
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
      wx.request({
        url: app.globalData.apiUrl + 'archive/praise',
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
            info.praise++
          } else {
            info.is_praise = 0
            info.praise--
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
  praise: function(e) {
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.code
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
      wx.request({
        url: app.globalData.apiUrl + 'archive/comment/praise',
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
            url: app.globalData.apiUrl + 'archive/comment',
            header: {
              'content-type': 'application/json', // 默认值
              'Authorization': Authorization
            },
            data: {
              rid: that.data.rid,
              archive_id: that.data.id,
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
            url: app.globalData.apiUrl + 'archive-comment/' + id + '/delete',
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
    var that = this;
    wx.showModal({
      content: '确定要举报吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          wx.showToast({
            title: "举报成功",
            mask: true,
            icon: 'success',
            duration: 1500
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
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
  //分享获取海报
  sharePic: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'archive/share-poster',
      method: 'GET',
      data: {
        source: 9,
        id: that.data.id,
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log('sharePic-state--' + res.data.state)
        if (res.data.state == 1) {
          var share_urllist = []
          share_urllist.push(res.data.data.share_url)
          that.setData({
            maskBar: true,
            maskBarbottom: false,
            showmask: true,
            share_url: res.data.data.share_url,
            share_urllist: share_urllist
          })
          console.log('sharePic-url--' + res.data.data.share_url)
          that.savePost();
        } else {
          wx.hideLoading();
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
  //保存海报到相册
  savePost: function() {
    wx.hideLoading();
    var that = this;

    wx.downloadFile({
      url: that.data.share_url,
      success: function(res) {
        console.log('savePost---' + res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath, //临时文件路径或永久文件路径
          success(res) {
            wx.showToast({
              title: "保存成功了，快去分享吧~",
              icon: 'none',
              duration: 1500
            })
          },
          fail(err) {
            //需要用户授权设置
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              that.setData({
                openSettingBtnHidden: true
              })
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '请同意授权，才能保存哦~',
                showCancel: false
              })
            }
          }
        })
      }
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
          that.getOtherList()
        },
      })
    } else {
      that.getBbsInfo();
      that.getComments()
      that.getOtherList()
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
      path: '/pages/articleinfo/articleinfo?id=' + this.data.id
    }
  },
})