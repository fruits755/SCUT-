// pages/require/require.js
const DB = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabControl: ['全部', '电子', '体育', '生活', '其他'],
    types: ['all', 'electronics', 'sport', 'life', 'others'],
    goods: {
      'all': {
        page: 0,
        list: []
      },
      'electronics': {
        page: 0,
        list: []
      },
      'sport': {
        page: 0,
        list: []
      },
      'life': {
        page: 0,
        list: []
      },
      'others': {
        page: 0,
        list: []
      }
    },
    currentType: 'all',
    currentIndex: 0,
    currentPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求商品的数据，开发初级阶段先用注释写完，留以备用。
  },
  //-------------------------网络请求函数--------------------------
  _getGoodsData(type, page1) {
    //获取页码
    var that = this;
    //发送网络请求
    wx.cloud.callFunction({
      name: "getGoods",
      data: {
        type: type,
        page: page1
      },
      success(res) {
        let list1 = [];
        for (var i = 0, j = 0; i < res.result.data.length; i++) {
          let type1 = res.result.data[i].type
          if ((type == type1) || (type == 'all')) {
            list1[j] = res.result.data[i].list;
            list1[j]._id = res.result.data[i]._id;
            j++;
          }
        }
        const oldList = that.data.goods[type].list;
        oldList.push(...list1.reverse())
        const typeKey = `goods.${type}.list`;
        const pageKey = `goods.${type}.page`;
        that.setData({
          [typeKey]: oldList,
          [pageKey]: page1
        })
        wx.stopPullDownRefresh()
      },
      fail(res) {
        console.log("数据请求失败", res)
      }
    })
  },
  _updateGoodsData(type, page1) {
    //获取页码
    var that = this;
    //发送网络请求
    wx.cloud.callFunction({
      name: "getGoods",
      data: {
        type: type,
        page: page1
      },
      success(res) {
        let list1 = [];
        for (var i = 0, j = 0; i < res.result.data.length; i++) {
          let type1 = res.result.data[i].type
          if ((type == type1) || (type == 'all')) {
            list1[j] = res.result.data[i].list;
            list1[j]._id = res.result.data[i]._id;
            j++;
          }
        }
        that.setData({
          '`goods.${type}.list`': []
        })
        const oldList = list1.reverse();
        const typeKey = `goods.${type}.list`;
        const pageKey = `goods.${type}.page`;
        that.setData({
          [typeKey]: oldList,
          [pageKey]: page1
        })
      },
      fail(res) {
        console.log("数据请求失败", res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._updateGoodsData('all', 0)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.goods[this.data.currentType].list.length < 20) {
      wx.showToast({
        title: '已经到底啦！大人。',
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
    } else {
      this.setData({
        currentPage: this.data.currentPage + 1
      })
      let type = this.data.currentType;
      let page = this.data.currentPage;
      this._getGoodsData(type, page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //-------------------------事件监听函数--------------------------
  handleTabCLick(event) {
    let index1 = wx.getStorageSync('currentIndex');
    event.currentTarget.dataset.index = index1;
    console.log(this.data.types[index1]);
    this.setData({
      currentIndex: index1,
      currentType: this.data.types[index1]
    })
    this._updateGoodsData(this.data.currentType, this.data.currentPage)
    console.log(this.data.goods[this.data.currentType].list);
  },
  visit(event) {
    //const id=event.detail.id;
    var index1 = event.target.id;
    console.log(event);
    const db = wx.cloud.database();
    const visitors = event.target.dataset.visitors + 1;
    wx.cloud.callFunction({
      name: "addVisitor",
      data: {
        id1: index1,
        visitors: visitors
      },
      success(res) {
        console.log('浏览量函数调用成功', res)
      }
    })
    wx.setStorageSync('index', index1)
    wx.navigateTo({
      url: '../visit/visit', //'url id='+id
    })
    this.onShow();
  },
  addData(event) {
    wx.navigateTo({
      url: '../sell/sell',
    })
    this.onShow();
  }
})