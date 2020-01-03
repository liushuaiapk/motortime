//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    topnum: 1,
    handtop: '',
    navbackground: '#fff',
    imgUrls: [],
    indicatorDots: true,
    indicatorColor: "#aaaaaa",
    indicatorActiveColor: "#ffffff",
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    page: 1,
    flowllList: [],
    topicList: [],
    istrue: false,
    postbtn: false
  },
  onLoad: function() {
    app.editTabbar();
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
    that.getAdvList()
    that.getCardslist();
    wx.showLoading({
      title: '加载中',
    })
  },
  //轮播
  getAdvList: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'advs',
      data: {
        media_id: 6,
        type: 4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        that.setData({
          imgUrls: res.data.data
        })
      }
    })
  },
  //帖子列表
  getCardslist: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'bbs/cards',
      data: {
        cid: 4,
        page: that.data.page,
        size: 6,
        user_id: that.data.user_id,
        is_lexus_app: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        if (that.data.page > 1) {
          var cardsList = that.data.cardsList.concat(res.data.data.data);
        } else {
          var cardsList = res.data.data.data;
        }
        that.setData({
          cardsList: cardsList,
          last_page: res.data.data.last_page,
          current_page: res.data.data.current_page
        })
        wx.hideLoading();
      }
    })
  },
  //发表
  posted: function() {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      wx.navigateTo({
        url: '/pages/post/post',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //切换tab
  topChange: function(e) {
    var code = e.currentTarget.dataset.code
    if (code == 0) {
      this.setData({
        page: 1,
        listy: [],
        flowllList: [],
        topnum: code,
        navbackground: 'none'
      })
      this.getFollow()
      this.getFollowlist()
      wx.showLoading({
        title: '加载中',
      })
    } else if (code == 1) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        cardsList: [],
        page: 1,
        last_page: '',
        current_page: '',
        topnum: code,
        navbackground: '#fff'
      })
      this.getCardslist();
    } else {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        topicList: [],
        page: 1,
        topnum: code,
        navbackground: '#fff'
      })
      this.getTopicList()
    }
  },
  //关注人列表
  getFollow: function() {
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'user/recommend-login',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      method: 'GET',
      success(res) {
        var listy = res.data.data
        that.setData({
          listy: listy,
        })
        wx.hideLoading();
      }
    })
  },
  //关注列表
  getFollowlist: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'space/' + that.data.user_id + '/lists',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        is_follow: 1,
        page: that.data.page,
        size: 10
      },
      method: 'GET',
      success(res) {
        if (that.data.page > 1) {
          var flowllList = that.data.flowllList.concat(res.data.data.data);
        } else {
          var flowllList = res.data.data.data;
        }
        that.setData({
          flowllList: flowllList,
          last_page: res.data.data.last_page,
          current_page: res.data.data.current_page
        })
        wx.hideLoading();
      }
    })
  },
  //话题列表
  getTopicList: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'topic/lists',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        is_home: 1,
        page: that.data.page,
        size: 6
      },
      method: 'GET',
      success(res) {
        if (that.data.page > 1) {
          var list = that.data.topicList.concat(res.data.data.data);
        } else {
          var list = res.data.data.data;
        }
        let arr = []
        for (var i = 0; i < list.length; i++) {
          let year = list[i].create_year
          let mon = list[i].create_en_month
          let ym = year + '-' + mon
          list[i].ym = ym
        }
        for (var i = 0; i < list.length; i++) {
          if (i > 0) {
            if (list[i].ym == list[i - 1].ym) {
              list[i].show = false
            } else {
              list[i].show = true
            }
          } else {
            list[i].show = true
          }
        }
        that.setData({
          topicList: list,
          last_page: res.data.data.last_page,
          current_page: res.data.data.current_page
        })
        wx.hideLoading();
      }
    })
  },
  //滑动页面
  onPageScroll: function(e) {
    var code = this.data.topnum
    var scrollTop = e.scrollTop
    if (code == 0) {
      if (scrollTop > 70) {
        this.setData({
          navbackground: '#fff'
        })
      } else {
        this.setData({
          navbackground: 'none'
        })
      }
    }
  },

  //关注
  followUser: function(e) {
    var id = e.currentTarget.dataset.code
    var bbs_id = e.currentTarget.dataset.id
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
          var list = that.data.cardsList
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == bbs_id) {
              list[i].user.is_follow = 1
            }
          }
          that.setData({
            cardsList: list
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }

  },
  //点赞/取消赞
  praise: function(e) {
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.code
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
          var list = that.data.cardsList
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
            cardsList: list
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //输入聚焦
  inputfocus: function(e) {
    var access_token = wx.getStorageSync('access_token');
    if (access_token) {
      var index = e.currentTarget.dataset.index
      this.setData({
        postbtn: index
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  //键盘变化
  binkeyheight: function(e) {
    var height = e.detail.height
    if (height == 0) {
      this.setData({
        postbtn: false
      })
    }
  },
  //评论输入
  inputwrite: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //评论
  bbsTalk: function(e) {
    var id = e.currentTarget.dataset.code
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
              card_id: id,
              content: that.data.content
            },
            method: 'POST',
            success(res) {
              var list = that.data.cardsList
              for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  var comments = list[i].comments
                  var params = {
                    content: that.data.content,
                    user: {
                      user_name: that.data.userinfo.username,
                      headimg_url: that.data.userinfo.avatar
                    }
                  }
                  comments.unshift(params)
                  list[i].comments = comments
                }
              }
              that.setData({
                cardsList: list
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
  //打开分享
  openDialog: function(e) {
    var bbs_id = e.currentTarget.dataset.code
    this.setData({
      bbs_id: bbs_id,
      istrue: true
    })
  },
  //关闭分享
  closeDialog: function() {
    this.setData({
      istrue: false
    })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '凌志范儿',
      path: '/pages/bbsinfo/bbsinfo?id=' + this.data.bbs_id
    }
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
        url: '/pages/login/login?url=member',
      })
    }
  },
  //跳转别人首页
  goOther: function(e) {
    var id = e.currentTarget.dataset.code
    // wx.navigateTo({
    //   url: '/pages/other/other?id=' + id,
    // })
  },
  //轮播图跳转web-view
  goWebview: function(e) {
    var url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: '/pages/webview/webview?url=' + url,
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
  //下拉刷新
  onPullDownRefresh: function() {
    var that = this
    var code = that.data.topnum
    that.setData({
      page: 1
    })
    if (code == 0) {
      that.getFollow()
      that.getFollowlist()
    } else if (code == 1) {
      that.getCardslist();
    } else {
      that.getTopicList()
    }
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    var code = that.data.topnum
    var last_page = that.data.last_page
    var current_page = that.data.current_page
    if (current_page < last_page) {
      that.setData({
        searchLoading: true,
        searchLoadingComplete: false,
        page: current_page + 1
      })
      if (code == 0) {
        that.getFollow()
        that.getFollowlist()
      } else if (code == 1) {
        that.getCardslist();
      } else {
        that.getTopicList()
      }
    } else {
      that.setData({
        searchLoading: false,
        searchLoadingComplete: true
      })
    }
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
})