// pages/home/subPages/detail/detail.js
const DB = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    databaseID: '',
    information: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //获取通过navegaion从home页面传来的信息
    console.log('detail页面通过navigition从home得到的databaseID', options)
    this.setData({
      databaseID: options.databaseID
    })

    //通过云函数获取home_public中特定的databaseID信息
    wx.cloud.callFunction({
      name: 'get_databaseid_inf',
      data: {
        databaseID: options.databaseID
      },
      success: res => {
        console.log('onload中databaseID_info云函数调用成功', res.result)
        this.setData({
          information: res.result.data
        })
      },
      fail: res => {
        console.log('onload中databaseID_info云函数调用失败', res)
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
    let that = this;
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res)
        //通过云函数获取home_public中特定的databaseID信息
        wx.cloud.callFunction({
          name: 'get_databaseid_inf',
          data: {
            databaseID: that.data.databaseID
          },
          success: res => {
            console.log('onshow中databaseID_info云函数调用成功', res.result)
            this.setData({
              information: res.result.data
            })
            wx.stopPullDownRefresh();
          },
          fail: res => {
            console.log('onshow中databaseID_info云函数调用失败', res)
          }
        })
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        wx.showToast({
          title: '您还未登录,请先登录~',
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../../../mine/mine'
          })
        }, 1500)
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
    this.onShow()
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


  //-------------事件点击函数--------------

  // 点击"添加留言"按钮
  addcomment: function() {
    wx.navigateTo({
      url: '../comment/comment?databaseID=' + this.data.databaseID,
    })
  }
})