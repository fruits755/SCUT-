//app.js
App({
  onLaunch: function() {
    //云开发初始化
    wx.cloud.init({
      traceUser: true,
      env: 'grocery-p8jhe'
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    //获取当前可操作视图区域
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height_01 = res.windowHeight
      }
    })
  },

  globalData: {
  }
})