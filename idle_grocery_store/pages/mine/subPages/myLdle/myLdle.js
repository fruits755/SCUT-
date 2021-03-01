// pages/mine/subPages/myLdle/myLdle.js
const DB = wx.cloud.database()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    openid: '',
    nickName: '',
    img: '',
    page: 0,
    state: '出售中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    var list2 = '';
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          img: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
    DB.collection("MineInformation").get({
      success(res) {
        var openid = res.data[0]._openid;
        wx.cloud.callFunction({
          name: "myOrder",
          data: {
            openid: openid
          },
          success(r) {
            console.log('成功', r)
            const list1 = [];
            list1.push(...r.result.data)
            that.setData({
              list: list1
            })
          },
          fail(r) {
            console.log(r)
          }
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
    const that = this;
    var list2 = '';
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          img: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        wx.stopPullDownRefresh(); //加载完成后停止下拉刷新
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
  completeOrder(event) {
    console.log('删除成功！', event.currentTarget.dataset.id)
    db.collection('goods_list').doc(event.currentTarget.dataset.id).remove({
      success: function(res) {
        console.log(res.data)
      }
    })
    wx.showToast({
      title: '订单已下架！',
      icon: 'none'
    })
    this.onLoad();
  }
})