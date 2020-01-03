// pages/topic/topic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightlist: [{
      id: 0,
      name: "话题推荐"
    }],
    list: [],
    category_id: 0,
    active: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCategories()
    // this.getTopic()
  },
  getCategories: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'topic/categories',
      header: {
        'content-type': 'application/json'
      },
      data: {
        brand_id: 1
      },
      method: 'GET',
      success(res) {
        var rightlist = that.data.rightlist.concat(res.data.data)
        that.setData({
          rightlist: rightlist
        })
        that.getTopic()
      }
    })
  },
  getTopic: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + 'topic/lists',
      header: {
        'content-type': 'application/json'
      },
      data: {
        category_id: that.data.category_id,
        page: 1,
        size: 20
      },
      method: 'GET',
      success(res) {
        var list = that.data.list.concat(res.data.data.data)
        that.setData({
          list: list
        })
      }
    })
  },
  chooseLeft: function(e) {
    var id = e.currentTarget.dataset.code
    this.setData({
      active: id,
      category_id: id,
      list: []
    })
    this.getTopic()
  },
  chooseTopic: function(e) {
    var id = e.currentTarget.dataset.code
    var name = e.currentTarget.dataset.name
    var params = {
      id: id,
      name: name
    }
    wx.setStorage({
      key: 'namelist',
      data: [params],
    })
    wx.navigateBack({
      delta: 1
    })
  },
  //创建话题
  addtopic: function() {
    wx.redirectTo({
      url: '/pages/topicadd/topicadd',
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