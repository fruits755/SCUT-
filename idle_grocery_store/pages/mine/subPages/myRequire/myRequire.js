// pages/mine/subPages/myRquire/myRequire.js
const DB = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information_public:[],
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取数据库中该用户的信息
    DB.collection('help_public').get({
      success: res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        this.setData({
          information_public: res.data
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
    // 获取数据库中该用户的信息
    DB.collection('help_public').get({
      success: res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        this.setData({
          information_public: res.data
        })
        wx.stopPullDownRefresh();//加载完成后停止下拉刷新
      }
    })
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
  // ------------事件点击------------

  // 下架点击
  cancel: function(res) {
    console.log(this.data.information_public[res.currentTarget.dataset.index]._id)
    let id_public = this.data.information_public[res.currentTarget.dataset.index]._id
    DB.collection('help_public').doc(id_public).remove({
      success: function(res) {
        console.log(res.data, 'help_public删除成功')
        wx.showToast({
          title: '成功，请刷新',
          icon: 'success',
          duration: 2000,
        })
      },
      fail: function(res) {
        console.log(res, 'help_public删除失败')
      }
    })
  }
})