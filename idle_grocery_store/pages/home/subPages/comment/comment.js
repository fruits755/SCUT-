// pages/home/subPages/comment/comment.js
const DB = wx.cloud.database()
var util = require('../../../../utils/util.js')
var dayTime = util.formatTime(new Date());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempMassage: '', //临时存放input的内容，用于获取最后一次输入信息
    massage: [],
    databaseID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取通过navegaion从detail页面传来的信息
    console.log('comment页面通过navigition从home得到的databaseID', options)
    this.setData({
      databaseID: options.databaseID
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

  },


  // 事件点击函数

  inputMassage: function(res) {
    this.setData({
      tempMassage: {
        "massage": res.detail.value,
        "time": dayTime
      }
    })
  },



  // 完成选择信息采集并上传
  complete: function() {
    // 判断是否为空
    if (this.data.tempMassage == '') {
      wx.showToast({
        title: '输入不能存在空值',
        icon: 'none',
        duration: 2000,
      })
    } else {
      //把tempMassage中的最后一次input值放入massage[]
      var massage = this.data.massage;
      massage.push(this.data.tempMassage)
      this.setData({
        massage: massage
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        success: (res) => {
          let that = this
          // 调用云函数addComment来更新数据
          wx.cloud.callFunction({
            name: 'addComment',
            data: {
              comment: that.data.massage,
              databaseID: that.data.databaseID
            },
            success: res => {
              console.log('云函数addComment调用成功', res)
            },
            fail: res => {
              console.log('云函数addComment调用失败', res)
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