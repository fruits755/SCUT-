// pages/visit/visit.js
const DB = wx.cloud.database().collection("goods_list");
const db = wx.cloud.database().collection("myidle");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试用
    list: {},
    backPhoto: '',
    sign: '这个人很懒，什么都没写。',
    sign1: '',
    openId: '',
    wxNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let index1 = (wx.getStorageSync('index'))
    var list0;
    DB.where({
      _id: index1
    }).get({
      success(res) {
        console.log(res)
        that.setData({
          list: res.data[0].list,
          openId: res.data[0]._openid,
          wxNum: res.data[0].wx,
          backPhoto: res.data[0].list.backPhoto,
          sign1: res.data[0].list.sign
        })
      }
    })
    if (that.data.sign1 == '') {} else {
      that.setData({
        sign: that.data.sign1
      })
    }
    console.log(that.data.list);

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
      },
      fail(r) {
        wx.showToast({
          title: '您还未登录,请先登录~',
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../mine/mine'
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
  onClick: function(e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.list.wx,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

  //点击图片，放大图片
  expand: function(event) {
    wx.previewImage({
      current: this.data.list.goodsPhoto[event.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: this.data.list.goodsPhoto // 需要预览的图片http链接列表
    })
  }
})