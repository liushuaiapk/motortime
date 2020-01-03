// pages/post/post.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 9,
    images: [],
    images_url: [],
    topicname: [],
    topics: [],
    topic_name: '',
    title: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //标题
  wtitle: function(e) {
    var title = e.detail.value
    this.setData({
      title: title
    })
  },
  //内容
  wcontent: function(e) {
    var content = e.detail.value
    this.setData({
      content: content
    })
  },
  //上传图片
  chooseImg: function() {
    var that = this;
    if (that.data.count > 0) {
      wx.chooseImage({
        count: that.data.count,
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
          var uploadImgCount = 0;
          for (var i = 0; i < tempFilePaths.length; i++) {
            wx.uploadFile({
              url: app.globalData.apiUrl + 'upload',
              filePath: tempFilePaths[i],
              name: 'img',
              formData: {
                'type': 1
              },
              success(res) {
                uploadImgCount++;
                var images_url = that.data.images_url
                var images = that.data.images
                var picdata = JSON.parse(res.data);
                images_url.push(picdata.data.img_url);
                images.push(picdata.data.img);
                var count = images_url.length;
                that.setData({
                  count: 9 - count,
                  images: images,
                  images_url: images_url
                });
                if (uploadImgCount == tempFilePaths.length) {
                  wx.hideToast();
                }
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
        }
      })
    } else {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }
  },
  //删除图片
  delpic: function(e) {
    var num = e.currentTarget.dataset.num;
    var images_url = this.data.images_url
    var images = this.data.images
    images_url.splice(num, 1);
    images.splice(num, 1);
    var count = images_url.length;
    this.setData({
      count: 9 - count,
      images: images,
      images_url: images_url
    })
  },
  //选择话题
  chooseTopic: function() {
    wx.navigateTo({
      url: '/pages/topic/topic',
    })
  },
  //删除话题
  delTopic: function() {
    wx.setStorage({
      key: 'namelist',
      data: this.data.topicname,
    })
    this.setData({
      topicname: []
    })
    wx.navigateTo({
      url: '/pages/topicdel/topicdel',
    })
  },
  //发表
  posted: function() {
    var that = this
    var title = that.data.title
    var content = that.data.content
    var images = that.data.images
    if (title == '' && content == "" && images.length == 0) {
      wx.showToast({
        title: '没有内容或图片不能发表',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else {
      var contents = title + content
      var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
      wx.request({
        url: app.globalData.apiUrl + 'check-text',
        data: {
          source: 9,
          content: contents
        },
        header: {
          'content-type': 'application/json',
          'Authorization': Authorization // 默认值
        },
        method: 'POST',
        success(res) {
          if (res.data.state == 1) {
            wx.request({
              url: app.globalData.apiUrl + 'bbs/card',
              header: {
                'content-type': 'application/json', // 默认值
                'Authorization': Authorization
              },
              data: {
                cid: 4,
                title: title,
                content: content,
                images: images,
                topics: that.data.topics
              },
              method: 'POST',
              success(res) {
                wx.showToast({
                  title: '发表成功',
                  mask: true,
                  icon: 'success',
                  duration: 1500,
                  success: function() {
                    if (res.data.state == 1) {
                      that.setData({
                        title: '',
                        content: '',
                        images: [],
                        topics: [],
                        topicname: []
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
                    }
                  }
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
      key: 'namelist',
      success: function(res) {
        var topicname = res.data.concat(that.data.topicname)
        var namelist = new Array();
        var topics = []
        for (var i = 0, len = topicname.length; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            if (topicname[i].id == topicname[j].id) {
              topicname.splice(j, 1);
              // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
              len--;
              j--;
            }
          }
        }
        for (var i = 0; i < topicname.length; i++) {
          topics.push(topicname[i].id)
        }
        that.setData({
          topics: topics,
          topicname: topicname
        })
        wx.removeStorage({
          key: 'namelist',
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