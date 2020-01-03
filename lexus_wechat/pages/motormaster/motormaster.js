// pages/motormaster/motormaster.js
// var city = require('../../utils/cars.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskBaright: false,
    maskBar: false,
    choosetitle: '选择车系',
    choose_brand: true,
    _py: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    showPy: 'A',
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({ //判断机型
      success: (res) => {
        var statusBarHeight = res.statusBarHeight;
        that.setData({
          windowWidth: res.windowWidth,
        })
      },
    })
  },
  //加载车辆列表
  getCarlist: function() {
    var that = this
    var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
    wx.request({
      url: app.globalData.apiUrl + 'car/list',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          var list = res.data.data
          for (var i = 0; i < list.length; i++) {
            var number_plate = list[i].number_plate
            list[i].p_plate = number_plate.substring(0, 1)
            list[i].p_num = number_plate.substring(1, 7)
          }
          that.setData({
            list: list,
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
  //加载车辆品牌
  getBrands: function() {
    var that = this
    wx.request({
      url: app.globalData.apiUrl + 'car/brands',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          var list = res.data.data
          that.setData({
            brandList: list,
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
  //认证未成功
  showBottom: function(e) {
    var that = this
    var id = e.currentTarget.dataset.code;
    var audit = e.currentTarget.dataset.audit;
    if (audit == 0) {
      var title = '继续认证'
    } else {
      var title = '查看详情'
    }
    wx.showActionSheet({
      itemList: [title, '删除车辆'],
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '/pages/carinfo/carinfo?carid=' + id + '&audit=' + audit,
            })
          } else {
            wx.showModal({
              content: '确定要删除吗？',
              confirmText: "确定",
              cancelText: "取消",
              success: function(res) {
                console.log(res);
                if (res.confirm) {

                  var Authorization = 'Bearer' + ' ' + wx.getStorageSync('access_token');
                  wx.request({
                    url: app.globalData.apiUrl + 'car/' + id + '/delete',
                    header: {
                      'content-type': 'application/json',
                      'Authorization': Authorization
                    },
                    method: 'DELETE',
                    success(res) {
                      wx.hideLoading();
                      if (res.data.state == 1) {
                        wx.showToast({
                          title: '已删除',
                          mask: true,
                          icon: 'success',
                          duration: 1500,
                          success: function() {
                            var list = that.data.list
                            for (var i = 0; i < list.length; i++) {
                              if (list[i].id == id) {
                                list.splice(i, 1)
                              }
                            }
                            that.setData({
                              list: list
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
                } else {
                  console.log('用户点击辅助操作')
                }
              }
            });
          }
        }
      }
    });

  },
  //选择车系
  selectCar: function(e) {
    var that = this
    var brand_id = 1;
    that.setData({
      brand_id: brand_id,
      choose_set: true,
      choose_brand: false,
      choosetitle: '选择车系',
    });
    wx.request({
      url: app.globalData.apiUrl + 'car/cars',
      data: {
        brand_id: brand_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          var list = res.data.data
          that.setData({
            carsList: list,
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
  addcar: function() {
    this.selectCar()
    this.setData({
      maskBar: true,
      maskBaright: true,
      choosetitle: '选择车系',
      choose_type: false,
      choose_set: true
    })
  },
  closemask: function() {
    this.setData({
      maskBaright: false,
      maskBar: false,
      choosetitle: '选择品牌',
      choose_type: false,
      choose_set: false,
      choose_brand: true
    });

  },
  choose_set: function(e) {
    var that = this
    var car_id = e.currentTarget.dataset.code;
    var car_name = e.currentTarget.dataset.name;
    that.setData({
      car_name: car_name,
      car_id: car_id,
      choosetitle: '选择车型',
      choose_type: true,
      choose_set: false
    });
    wx.request({
      url: app.globalData.apiUrl + 'car/models',
      data: {
        car_id: car_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success(res) {
        wx.hideLoading();
        if (res.data.state == 1) {
          var list = res.data.data
          that.setData({
            modelList: list,
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
  choose_type: function(e) {
    var model_id = e.currentTarget.dataset.code;
    var model_name = e.currentTarget.dataset.name;
    this.setData({
      maskBaright: false,
      maskBar: false,
      choosetitle: '选择品牌',
      choose_type: false,
      choose_set: true
    })
    wx.navigateTo({
      url: '/pages/carinfo/carinfo?model_name=' + model_name + '&brand_id=' + this.data.brand_id + '&car_id=' + this.data.car_id + '&model_id=' + model_id,
    })
  },
  back: function() {
    var choose_type = this.data.choose_type
    var choose_set = this.data.choose_set
    var choose_brand = this.data.choose_brand
    if (choose_type) {
      this.setData({
        choosetitle: '选择车系',
        choose_type: false,
        choose_set: true,
        choose_brand: false
      })
    } else if (choose_set) {
      this.setData({
        choose_type: false,
        choose_set: false,
        choose_brand: true,
        maskBaright: false,
        maskBar: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCarlist()
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