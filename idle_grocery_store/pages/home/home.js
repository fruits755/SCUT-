// pages/home/home.js
const DB = wx.cloud.database();
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: ['https://6772-grocery-p8jhe-1301628659.tcb.qcloud.la/4.png?sign=cc051d4b77d706b287bee6c5254f7a11&t=1588689410', 'https://6772-grocery-p8jhe-1301628659.tcb.qcloud.la/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200505224410.jpg?sign=6179656b1351eb7b9ba6295c039db727&t=1588725026'],
    fileSrc: [],
    information: [], //home_public中的信息
    temp_input: '', //临时的搜索框输入信息，用于获取最后一次输入
    search_information: [],
    search: false,
    inputmassage: ''
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
    //通过云函数获取home_public中的所有信息
    wx.cloud.callFunction({
      name: 'get_home_public',
      success: res => {
        console.log('获取home_public云函数调用成功', res.result)
        this.setData({
          information: res.result.data.reverse() //reverse()倒序拉取到的数据
        })
      },
      fail: res => {
        console.log('获取home_public云函数调用失败', res)
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
    //通过云函数获取home_public中的所有信息
    wx.cloud.callFunction({
      name: 'get_home_public',
      success: res => {
        console.log('获取home_public云函数调用成功', res.result)
        this.setData({
          information: res.result.data.reverse()
        })
        wx.stopPullDownRefresh(); //加载完成后停止下拉刷新
      },
      fail: res => {
        console.log('获取home_public云函数调用失败', res)
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

  // ------------事件触发函数---------------

  //点击小加号的触发事件
  handinsert: function() {
    wx.navigateTo({
      url: './subPages/question/question',
    })
  },


  //点击评论图标的触发事件
  clickComment: function(e) {
    if (this.data.search == !true) {
      var databaseID = this.data.information[e.currentTarget.dataset.index]._id
      console.log('databaseID:', databaseID)
      // app.globalData.home_databaseID = databaseID
      wx.navigateTo({
        url: './subPages/detail/detail?databaseID=' + databaseID,
      })
    } else {
      var databaseID = this.data.search_information[e.currentTarget.dataset.index]._id
      console.log('databaseID:', databaseID)
      // app.globalData.home_databaseID = databaseID
      wx.navigateTo({
        url: './subPages/detail/detail?databaseID=' + databaseID,
      })
    }
  },

  //搜索框点击触发事件
  Input: function(res) {
    console.log('搜索框input', res)
    this.setData({
      temp_input: res.detail.value
    })
  },

  //输入完成
  inputComplete: function() {
    console.log('最后一次input', this.data.temp_input)
    var input = this.data.temp_input
    wx.cloud.callFunction({
      name: 'search',
      data: {
        value: input
      },
      success: res => {
        console.log('search云函数调用成功', res.result.data)
        this.setData({
          search: true,
          search_information: res.result.data
        })
      },
      fail: res => {
        console.log('search云函数调用失败', res)
      }
    })
  },

  //取消搜索，回到home_public所有数据展示
  cancel_search: function() {
    console.log('点击了取消搜索')
    this.setData({
      search: false,
      inputmassage: ''
    })
  }
})