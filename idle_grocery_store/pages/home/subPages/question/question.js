// pages/home/subPages/question/question.js
const DB = wx.cloud.database()
var util = require('../../../../utils/util.js')
var dayTime = util.formatTime(new Date());
const app = getApp()
var t = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '',
    user_image: '',
    user_nickname: ''
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
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res)
        // 获取用户头像和昵称，目的在于把该用户信息和public中的信息绑定，在home界面不同的人发布的信息，显示不同的头像
        DB.collection('MineInformation').get({
          success: res => {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log('get用户头像和昵称信息', res.data)
            this.setData({
              user_image: res.data[0].user_img,
              user_nickname: res.data[0].user_nickName
            })
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


  // ------------事件点击函数----------

  // 获取输入的问题
  inputMassage: function(e) {
    console.log('输入信息', e)
    this.setData({
      question: e.detail.value
    })
  },

  // 上传信息至home、home_public集合
  onload: function() {
    if (this.data.question == '') {
      wx.showToast({
        title: '输入不能存在空值',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        success: (res) => {
          DB.collection("home_public").add({
            data: {
              question: this.data.question,
              loadtime: dayTime,
              nickname: this.data.user_nickname,
              image: this.data.user_image,
              comment: []
            },
            success: function(res) {
              console.log('上传question成功', res)
            },
            fail: function(res) {
              console.log('上传question失败', res)
            },
            complete: res => {
              // 添加成功以后页面跳转回上个页面
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
  }
})