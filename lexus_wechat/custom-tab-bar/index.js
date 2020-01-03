const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [{
            pagePath: "/pages/index/index",
            iconPath: "/images/icon/index.png",
            selectedIconPath: "/images/icon/index_select.png",
          },
          {
            pagePath: "/pages/article/article",
            iconPath: "/images/icon/content.png",
            selectedIconPath: "/images/icon/content_select.png",
          },
          {
            pagePath: "/pages/my/my",
            iconPath: "/images/icon/my.png",
            selectedIconPath: "/images/icon/ny_select.png",
          },
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
  },
  /**
   * 组件的方法列表
   */
  // methods: {
  //   shareTherelease:{
  //     wx.navigateTo({
  //       url: '',
  //     })
  //   }
  // },
  methods: {
    shareTherelease(e) {
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          console.log(res)
        }
      })
    },
    shareThere(e) {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    },
  }

})