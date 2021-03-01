// pages/require/require.js
const DB = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabControl: ['全部', '一饭', '二饭', '图书馆'],
    tabIndex: 0,
    tanchu: false,
    // 项目信息
    currentInformation: [],
    information: [],
    information_one: [],
    information_two: [],
    information_library: [],
    index: '',
    tabIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.cloud.callFunction({
      name: 'get_help_public',
      success: res => {
        console.log('get_help_public云函数调用成功', res.result.data)
        let information = res.result.data
        this.setData({
          information: information,
          currentInformation: information.reverse(), //这里的reverse()！！！！！
          // 每次都把分页面数据清空，使分页面的数据总是来自information，即来自数据库res.data
          // 如果不清空，那么之后的push是在已分配过的基础上再加
          information_one: [],
          information_two: [],
          information_library: []
        })
        // 把information中的数据依据locate分类放置在不同的数组中
        for (var j = 0; j < information.length; j++) {
          // console.log(information[j])
          if (information[j].locate == '一饭') {
            console.log('一饭判断成功')
            // 一定要先声明才能用push
            var information_one = this.data.information_one
            information_one.push(information[j])
            this.setData({
              information_one: information_one
            })
          } else if (information[j].locate == '二饭') {
            console.log('二饭判断成功')
            var information_two = this.data.information_two
            information_two.push(information[j])
            this.setData({
              information_two: information_two
            })
          } else {
            console.log('图书馆判断成功')
            var information_library = this.data.information_library
            information_library.push(information[j])
            this.setData({
              information_library: information_library
            })
          }
        }
        wx.stopPullDownRefresh()
      },
      fail: res => {
        console.log('get_help_public云函数调用失败', res)
      }
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
    this.onShow();
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

  },



  // ---------------事件点击-------------
  handletanchu: function(e) {
    this.setData({
      tanchu: e.detail
    })

    wx.navigateTo({
      url: './subPages/tanchuang/tanchuang',
    })
  },


  // 得到组件传来的index值
  getIndex: function(e) {
    console.log('tabBar 的index:', e.detail)
    if (e.detail == 1) {
      this.setData({
        currentInformation: this.data.information_one
      })
    } else if (e.detail == 2) {
      this.setData({
        currentInformation: this.data.information_two
      })
    } else if (e.detail == 3) {
      this.setData({
        currentInformation: this.data.information_library
      })
    } else {
      this.setData({
        currentInformation: this.data.information
      })
    }
  },

  //copy微信号
  copy: function(res) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.currentInformation[res.currentTarget.dataset.copy_index].wx,
      success: res => {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  }
})