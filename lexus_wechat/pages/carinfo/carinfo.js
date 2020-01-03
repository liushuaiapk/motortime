// pages/carinfo/carinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model_name: '请选择',
    checked: false,
    disabled: true,
    travel: 'https://pic.motortime.com/static/travel.png',
    driving: 'https://pic.motortime.com/static/driving.png',
    drivingUp: false,
    travelUp: false,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.model_name) {
      this.setData({
        brand_id: options.brand_id,
        car_id: options.car_id,
        car_model_id: options.model_id,
        model_name: options.model_name,
        show: false
      })
    } else if (options.carid) {
      if (options.audit == 0) {
        this.setData({
          carid: options.carid,
          show: false
        })
      } else {
        this.setData({
          carid: options.carid,
          show: true
        })
      }

      this.getCarinfo(options.carid)
    }
  },
  getCarinfo: function(id) {
    var that = this
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'car/' + id,
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          var info = res.data.data
          if (info.car_card_url) {
            that.setData({
              travelUp: true
            })
          }
          if (info.driver_card_url) {
            that.setData({
              drivingUp: true
            })
          }
          that.setData({
            model_name: info.brand.title + info.car.title + info.car_model.title,
            brand_id: info.brand.id,
            car_id: info.car.id,
            car_model_id: info.car_model.model_id,
            travel: info.car_card_url,
            car_card: info.car_card,
            driving: info.driver_card_url,
            driver_card: info.driver_card
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
  checkboxChange: function() {
    if (this.data.checked == true) {
      this.setData({
        checked: false,
        disabled: true
      })
    } else {
      this.setData({
        checked: true,
        disabled: false
      })
    }
  },
  chooseImage: function(e) {
    var type = e.currentTarget.dataset.code;
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        wx.uploadFile({
          url: app.globalData.apiUrl + 'upload',
          filePath: tempFilePaths,
          name: 'img',
          success(res) {
            var picdata = JSON.parse(res.data);
            var files = picdata.data.img;
            var piclist = picdata.data.img_url;
            if (type == 'driving') {
              that.setData({
                driver_card: files,
                driving: piclist,
                drivingUp: true
              });
            } else {
              that.setData({
                car_card: files,
                travel: piclist,
                travelUp: true
              });
            }
            wx.hideToast();
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
    })
  },
  savecars: function() {
    var that = this
    var driver_card = that.data.driver_card
    var car_card = that.data.car_card
    if (driver_card == undefined) {
      wx.showToast({
        title: '请上传行驶证照片',
        icon: 'none',
        duration: 3000
      });
      return false
    }
    if (car_card == undefined) {
      wx.showToast({
        title: '请上传驾驶证照片',
        icon: 'none',
        duration: 3000
      });
      return false
    }
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'car/add',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization
      },
      data: {
        brand_id: parseInt(this.data.brand_id),
        car_id: parseInt(this.data.car_id),
        car_model_id: parseInt(this.data.car_model_id),
        car_card: this.data.car_card,
        driver_card: this.data.driver_card
      },
      method: 'POST',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          wx.showToast({
            title: '保存成功',
            mask: true,
            icon: 'success',
            duration: 1500,
            success: function() {
              setTimeout(function() {
                wx.redirectTo({
                  url: '/pages/audit/audit',
                })
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