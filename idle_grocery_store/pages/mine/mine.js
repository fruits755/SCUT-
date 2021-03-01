// pages/mine/mine.js
const DB = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      img: '',
      nickName: ''
    },
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        this.setData({
          login: true
        })
        console.log('用户在登录态', res)
        //获取点击登录按钮后上传的用户头像和昵称
        DB.collection('MineInformation').get({
          success: res => {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log('get用户头像和昵称信息', res.data)
            this.setData({
              userInfo: {
                img: res.data[0].user_img,
                nickName: res.data[0].user_nickName
              }
            })
          }
        })
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        this.setData({
          login: false
        })
        console.log('登录状态已经失效', res)
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
  // ----------------处理事件点击-------------

  //获取用户信息并上传数据库
  getUserInfo(e) {
    const nickname = e.detail.userInfo.nickName;
    const imgUrl = e.detail.userInfo.avatarUrl;
    this.setData({
      'userInfo.img': imgUrl,
      'userInfo.nickName': nickname,
      login: true
    })
    wx.login()//进行登录，主要作用是生成登录态，保存在缓存里
    // 上传用户信息到数据库MineInformation
    DB.collection("MineInformation").add({
      data: {
        user_img: imgUrl,
        user_nickName: nickname
      },
      success: function(res) {
        console.log('用户头像和昵称上传成功', res)
      },
      fail: function(res) {
        console.log('用户头像和昵称上传失败', res)
      }
    })
  }
})