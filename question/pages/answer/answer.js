// pages/posted/posted.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    content: '',
    topic: '',
    paragList: [{
      'id': 0,
      'count': ''
    }],
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delpic: function(e) {
    var num = e.currentTarget.dataset.num;
    var files = this.data.files;

    files.splice(num, 1);
    this.setData({
      files: files
    })
  },
  topic: function(e) {
    var topic = e.currentTarget.dataset.name
    this.setData({
      topic: topic
    })
  },
  //输入
  textareaValue: function(e) {
    var paragList = this.data.paragList
    var code = e.target.dataset.code
    var value = e.detail.value
    for (var i = 0; i < paragList.length; i++) {
      if (i == code) {
        paragList[i].count = value
      }
    }
    this.setData({
      paragList: paragList
    })
  },
  //添加段落
  addParag: function() {
    var paragList = this.data.paragList
    var num = paragList.length;
    var param = {
      id: num,
      count: ''
    }
    paragList.push(param)
    this.setData({
      num: num + 1,
      paragList: paragList
    })
  },
  //删除某段
  del: function(e) {
    var paragList = this.data.paragList
    var code = e.target.dataset.code
    paragList.splice(code, 1)
    this.setData({
      paragList: paragList
    })
  },
  //移至顶部
  move_top: function(e) {
    var paragList = this.data.paragList
    var code = e.target.dataset.code
    paragList.unshift(paragList.splice(code, 1)[0]);
    this.setData({
      paragList: paragList
    })
  },
  //上移额
  move_last: function(e) {
    var paragList = this.data.paragList
    var code = e.target.dataset.code
    paragList[code] = paragList.splice(code - 1, 1, paragList[code])[0];
    this.setData({
      paragList: paragList
    })
  },
  //x下移
  move_next: function(e) {
    var paragList = this.data.paragList
    var code = e.target.dataset.code
    paragList[code] = paragList.splice(code + 1, 1, paragList[code])[0];
    this.setData({
      paragList: paragList
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