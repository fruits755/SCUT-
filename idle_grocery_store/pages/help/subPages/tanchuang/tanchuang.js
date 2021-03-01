// pages/help/subPages/tanchuang/tanchuang.js
const DB = wx.cloud.database()
var util = require('../../../../utils/util.js')
var dayTime = util.formatTime(new Date());
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择器数据
    array: ['一饭', '二饭', '图书馆'],
    unclick: true,
    index: '', //默认显示位置
    //input信息
    massage: '',
    salary: '',
    wx: '',
    locate: '',
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
        // 获取用户头像和昵称，目的在于把该用户信息和public中的信息绑定，在跑腿界面不同的人发布的信息，显示不同的头像
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


  // --------点击触发------
  // 选择器
  bindPickerChange: function(res) {
    console.log(res, '选择器')
    this.setData({
      unclick: false,
      index: res.detail.value,
      locate: this.data.array[res.detail.value]
    })
  },
  // input信息
  inputMassage: function(res) {
    this.setData({
      massage: res.detail.value
    })
  },

  inputSalary: function(res) {
    this.setData({
      salary: res.detail.value
    })
  },

  inputWx: function(res) {
    this.setData({
      wx: res.detail.value
    })
  },

  // 完成选择信息采集并上传
  complete: function() {
    // 判断是否为空
    if (this.data.massage == '' || this.data.salary == '' || this.data.wx == '') {
      wx.showToast({
        title: '输入不能存在空值',
        icon: 'none',
        duration: 2000,
      })
    } else if (this.data.index == '') {
      wx.showToast({
        title: '还未选择附近点',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        success: (res) => {
          DB.collection("help_public").add({
            data: {
              massage: this.data.massage,
              salary: this.data.salary,
              wx: this.data.wx,
              locate: this.data.locate,
              loadtime: dayTime,
              nickname: this.data.user_nickname,
              image: this.data.user_image
            },
            success: function(res) {
              console.log('help_public上传成功', res)
            },
            fail: function(res) {
              console.log('help_public上传失败', res)
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