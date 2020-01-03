// pages/answerInfo/answerInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputshow: false,
    collect: false,
    inputshow: false,
    image: [],
    page: 1,
    typeColl: 1,
    is_praise: 0,
    files: [],
    piclist: [],
    bottheight: 0,
    count: 9,
    uplode: true,
    user_id: '',
    comcontent: '',
    inputplac: '发表评论...',
    autoheight: true
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
            searchT: res.statusBarHeight + 8,
            regionH: res.statusBarHeight + 44,
            handaddrT: res.statusBarHeight + 10,
            botheight: 45,
            flexheight: 60
          })
        } else {
          that.setData({
            searchT: res.statusBarHeight + 6,
            regionH: res.statusBarHeight + 44,
            handaddrT: res.statusBarHeight + 8,
            botheight: 75,
            flexheight: 80
          })
        }
      },
    })
  },
  focusinput: function () {
    this.setData({
      inputshow: true,
      select: true
    })
    // var access_token = wx.getStorageSync('access_token');
    // if (access_token) {
    //   this.setData({
    //     inputshow: true,
    //     select: true
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
  },
  keychange: function (e) {
    var height = e.detail.height
    if (height == 0) {
      this.setData({
        rid: '',
        contentValue: '',
        comcontent: '',
        files: [],
        piclist: [],
        inputplac: '发表评论...',
        inputshow: false,
        select: false,
        bottheight: 0,
      })
    }
  },
  //关闭
  close: function () {
    this.setData({
      rid: '',
      contentValue: '',
      comcontent: '',
      files: [],
      piclist: [],
      inputplac: '发表评论...',
      inputshow: false,
      select: false,
      bottheight: 0,
    })
  },
  //输入内容行数
  bindlinechange: function (e) {
    var lineCount = e.detail.lineCount
    if (lineCount > 2) {
      this.setData({
        autoheight: false
      })
    } else {
      this.setData({
        autoheight: true
      })
    }
  },
  bindCollect: function () {
    this.setData({
      collect: true
    })
  },
  bindClose: function () {
    this.setData({
      collect: false
    })
  },
  //上传图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: that.data.count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload',
            filePath: tempFilePaths[i],
            name: 'img',
            success(res) {
              uploadImgCount++;
              var picdata = JSON.parse(res.data);
              var piclist = that.data.piclist;
              var newpiclist = picdata.data.img;
              var files = that.data.files;
              var newfiles = picdata.data.img_url;
              files.push(newfiles);
              piclist.push(newpiclist);
              var count = files.length;
              if (count < 4) {
                that.setData({
                  // count: 9 - count,
                  bottheight: 60,
                  piclist: piclist,
                  files: files
                });
              } else if (count > 3 && count < 7) {
                that.setData({
                  // count: 9 - count,
                  bottheight: 140,
                  piclist: piclist,
                  files: files
                });
              } else if (count > 6 && count < 9) {
                that.setData({
                  // count: 9 - count,
                  bottheight: 140,
                  piclist: piclist,
                  files: files
                });
              } else if (count == 0) {
                that.setData({
                  // count: 9 - count,
                  bottheight: 0,
                  piclist: piclist,
                  files: files
                });
              } else if (count > 8) {
                that.setData({
                  bottheight: 140,
                  files: files,
                  piclist: piclist,
                  // uplode: false
                })
              }
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          })
        }
      }
    })
  },
  //查看上传
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //查看大图
  previewImg: function (e) {
    var urls = e.currentTarget.dataset.img
    wx.previewImage({
      current: urls[0], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delpic: function (e) {
    var num = e.currentTarget.dataset.num;
    var files = this.data.files;
    var piclist = this.data.piclist;
    files.splice(num, 1);
    piclist.splice(num, 1);
    var count = files.length;
    if (count < 4 && count > 0) {
      this.setData({
        // count: 9 - count,
        bottheight: 60,
        piclist: piclist,
        files: files
      });
    } else if (count > 3 && count < 7) {
      this.setData({
        // count: 9 - count,
        bottheight: 140,
        piclist: piclist,
        files: files
      });
    } else if (count > 6 && count < 9) {
      this.setData({
        // count: 9 - count,
        bottheight: 140,
        piclist: piclist,
        files: files,
        // uplode: true
      });
    } else if (count == 0) {
      this.setData({
        // count: 9 - count,
        bottheight: 0,
        piclist: piclist,
        files: files
      });
    } else if (count > 8) {
      that.setData({
        bottheight: 140,
        files: files,
        piclist: piclist,
        // uplode: false
      })
    }
  },
  //输入内容
  contentInput: function (e) {
    var contentValue = e.detail.value
    this.setData({
      comcontent: contentValue
    })
  },
  //发表
  posted: function () {
    var that = this
    that.setData({
      btnDisabled: true
    })
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    var picnum = that.data.piclist.length
    if (that.data.comcontent == '' && picnum == 0) {
      wx.showToast({
        title: "请输入评论内容或图片",
        mask: true,
        icon: 'none',
        duration: 1500
      })
      that.setData({
        btnDisabled: false
      })
      return false
    }
    wx.request({
      url: app.globalData.apiUrl + 'bbs/card-comment',
      data: {
        card_id: that.data.id,
        rid: that.data.rid,
        content: that.data.comcontent,
        images: that.data.piclist
      },
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization // 默认值
      },
      method: 'POST',
      success(res) {
        if (res.data.state == 1) {
          wx.showToast({
            title: "发表成功",
            mask: true,
            icon: 'success',
            duration: 1500,
            success: function () {
              that.getComments(that.data.id);
              that.setData({
                btnDisabled: false,
                rid: '',
                contentValue: '',
                comcontent: '',
                files: [],
                piclist: [],
                inputshow: false,
                select: false,
                inputplac: '发表评论...'
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
  //回复
  reply: function (e) {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var rid = e.currentTarget.dataset.code
      var name = e.currentTarget.dataset.name
      this.setData({
        inputplac: '回复 ' + name + ':',
        inputshow: true,
        select: true,
        rid: rid,
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //评论分页
  bindPickerChange: function (e) {
    var page = parseInt(e.detail.value)
    var id = this.data.id
    this.setData({
      page: page + 1
    })
    this.getComments(id);
  },
  //举报
  report: function (e) {
    var id = e.currentTarget.dataset.code
    var type = e.currentTarget.dataset.type
    var that = this;
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
  },
  //删帖
  delarticle: function (e) {
    var id = e.currentTarget.dataset.code
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'bbs/card/' + id + '/delete',
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
            success: function () {
              setTimeout(function () {
                if (that.data.tagsid) {
                  wx.reLaunch({
                    url: '/pages/rich/index?tab=' + that.data.tagsid,
                  })
                } else {
                  wx.reLaunch({
                    url: '/pages/rich/index?tab=0',
                  })
                }
              }, 1500)
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
  },
  //删评
  delcomment: function (e) {
    var id = e.currentTarget.dataset.code
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
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
            success: function () {
              var commentlist = that.data.commentlist
              for (var i = 0; i < commentlist.length; i++) {
                if (commentlist[i].id == id) {
                  commentlist.splice(i, 1)
                }
              }
              var current_page = that.data.comment.current_page
              var last_page = that.data.comment.last_page
              var pageArray = []
              for (var i = 1; i < last_page + 1; i++) {
                var page = '第' + i + '页'
                pageArray.push(page)
              }
              that.setData({
                last_page: last_page,
                current_page: current_page,
                commentlist: commentlist,
                pageArray: pageArray
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
  },
  //点击分享
  sharePic: function () {
    this.setData({
      maskBar: true,
      maskBarbottom: true
    })
  },
  //点击分享到朋友圈获取海报，保存海报
  showposter: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    // var share_urllist = []
    // share_urllist.push(that.data.image[0])
    // that.setData({
    //   maskBar: true,
    //   maskBarbottom: false,
    //   showmask: true,
    //   share_url: that.data.image[0],
    //   share_urllist: share_urllist
    // })
    // wx.hideLoading();
    wx.request({
      url: app.globalData.apiUrl + 'bbs/share-poster',
      method: 'GET',
      data: {
        source: 5,
        cid: that.data.id,
        user_id: that.data.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
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
  savePost: function () {
    wx.hideLoading();
    var that = this;
    wx.downloadFile({
      url: that.data.share_url,
      success: function (res) {
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
  //关闭
  closemask: function () {
    if (this.data.showmask) {
      this.setData({
        showmask: false,
        maskBar: false
      });
    } else {
      this.setData({
        maskBarbottom: false,
        maskBar: false
      });
    }
  },
  //返回
  goback: function () {
    var back = this.data.back
    if (back == 1) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/index',
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