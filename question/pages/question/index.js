//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      "id": 0,
      "alias": "最新"
    }, {
      "id": 0,
      "alias": "热门"
    }],
    activeIndex: 1,
    navScrollLeft: 0,
    all: true,
    answer: false,
    question: false,
    newchecked: false,
    select: true,
    selectName: '看全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        var windowWidth = res.windowWidth;
        that.setData({
          windowWidth: res.windowWidth,
        })
      }
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getChannel(1)
  },
  getChannel: function(id) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'ask/' + id + '/channel',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          var oldtabs = that.data.tabs
          var tabs = oldtabs.concat(res.data.data.columns)
          that.setData({
            info: res.data.data,
            tabs: tabs
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
  handleTap: function(e) {
    var code = e.currentTarget.dataset.code;
    var singleNavWidth = this.data.windowWidth / 5;
    var navScrollLeft = (code - 2) * singleNavWidth
    //tab选项居中   
    this.setData({
      navScrollLeft: (code - 2) * singleNavWidth,
      activeIndex: code
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var value = e.detail.value
    if (value == '看全部') {
      this.setData({
        selectName: value,
        select: true,
        all: true,
        answer: false,
        question: false
      });
    } else if (value == '只看答案') {
      this.setData({
        selectName: value,
        select: true,
        all: false,
        answer: true,
        question: false
      });
    } else if (value == '只看问题') {
      this.setData({
        selectName: value,
        all: false,
        answer: false,
        question: true,
        select: true
      });
    }

  },
  select: function() {
    var that = this
    const query = wx.createSelectorQuery()
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      var bottom = res[0].bottom;
      var top = res[0].top;
      that.setData({
        bottom: bottom,
        top: top,
        select: false
      })
    })

  },
  close: function() {
    this.setData({
      select: true
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