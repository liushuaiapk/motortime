// pages/memberinfo/memberinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['未知', '男', '女'],
    sexIndex: 0,
    region: ['* 省', '* 市', '* 区'],
    regioncode: [],
    issex: false,
    iscounty: false,
    avatarname: '',
    choose: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMemberinfo()

  },
  //获取用户信息
  getMemberinfo: function () {
    var that = this
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'user',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization
      },
      method: 'GET',
      success(res) {
        if (res.data.state == 1) {
          var userInfo = res.data.data
          if (userInfo.province) {
            var province = userInfo.province.name
            var provinceid = userInfo.province.id
            var city = userInfo.city.name
            var cityid = userInfo.city.id
            var district = userInfo.district.name
            var districtid = userInfo.district.id
            var regioncode = [provinceid, cityid, districtid]
            var region = [province, city, district]
          } else {
            var regioncode = []
            var region = ['* 省', '* 市', '* 区']
          }
          that.setData({
            userInfo: userInfo,
            avatar: userInfo.avatar,
            sexIndex: userInfo.sex,
            region: region,
            regioncode: regioncode
          })
          wx.setStorage({
            key: 'member',
            data: userInfo,
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
  //性别
  bindSexChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      sexIndex: e.detail.value,
      choose: true
    })
  },
  //家乡
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      regioncode: e.detail.code,
      choose: true
    })
  },
  //更换头像
  changeHead: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
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
        wx.uploadFile({
          url: app.globalData.apiUrl + 'upload',
          filePath: tempFilePaths[0],
          name: 'img',
          formData: {
            'type': 2
          },
          success(res) {
            wx.hideToast();
            var picdata = JSON.parse(res.data);
            var avatar = picdata.data.img_url;
            var avatarname = picdata.data.img;
            that.setData({
              avatar: avatar,
              avatarname: avatarname,
              choose: true
            });
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
    })
  },
  choose: function (e) {
    var value = e.detail.value
    this.setData({
      choose: true
    })
  },
  //保存用户信息
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'user',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization
      },
      data: {
        username: e.detail.value.username,
        avatar: that.data.avatarname,
        sex: e.detail.value.sex,
        intro: e.detail.value.intro,
        province_id: that.data.regioncode[0],
        city_id: that.data.regioncode[1],
        area_id: that.data.regioncode[2]
      },
      method: 'PUT',
      success(res) {
        if (res.data.state == 1) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            mask: true,
            duration: 1500
          })

          that.getMemberinfo()
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
  //认证车辆
  openUrl: function () {
    wx.navigateTo({
      url: '/pages/motormaster/motormaster',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})