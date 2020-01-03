// pages/topicadd/topicadd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    active: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCategories()
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
        var list = that.data.list.concat(res.data.data)
        that.setData({
          list: list,
          active: list[0].id
        })
      }
    })
  },
  choosepic: function(e) {
    var id = e.currentTarget.dataset.code
    this.setData({
      active: id
    })
  },
  //话题内容
  topicname: function(e) {
    var name = e.detail.value
    this.setData({
      name: name
    })
  },
  //保存话题
  addtopic: function() {
    var that = this;
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'topic/add',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization
      },
      data: {
        brand_id: 1,
        category_id: that.data.active,
        name: that.data.name,
        source: 9
      },
      method: 'POST',
      success(res) {
        var id = res.data.data.id
        var params = {
          id: id,
          name: that.data.name
        }
        wx.setStorage({
          key: 'namelist',
          data: [params],
        })
        wx.navigateBack({
          delta: 1
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