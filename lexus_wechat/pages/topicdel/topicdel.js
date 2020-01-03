// pages/topicdel/topicdel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  deltopic: function(e) {
    wx.showModal({
      content: '确定要删除该话题吗？',
      confirmText: "删除",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          var index = e.currentTarget.dataset.index;
          var topicname = this.data.topicname
          topicname.splice(index, 1);
          wx.setStorage({
            key: 'namelist',
            data: topicname,
          })
          this.setData({
            topicname: topicname
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  delall: function() {
    wx.showModal({
      content: '确定要删除全部话题吗？',
      confirmText: "删除",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'namelist',
            success: function(res) {
              wx.navigateBack({
                delta: 1
              })
            },
          })
          this.setData({
            topicname: []
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
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
        that.setData({
          topicname: res.data
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