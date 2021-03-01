// pages/sell/sell.js
var util = require('../../utils/util.js')
const DB = wx.cloud.database().collection("goods_list")
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['电子产品', '体育用品', '生活用品', '其他用品'],
    array1: ['electronics', 'sport', 'life', 'others'],
    locateType: '',
    locateType1: '',
    name: '',
    wx: '',
    Des: '',
    value: '需要私聊协商',
    time: '',
    goodsnum: 0,
    goodsAddress: [],
    goodsAddress2: [],
    headPhoto: '',
    backPhoto: '',
    count: 0,
    total: 0,
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    var TIME = util.formatTime(new Date());

    that.setData({

      time: TIME,

    });
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
    var that = this;
    wx.getUserInfo({
      success: function (r) {
        console.log(r);
        that.setData({
          headPhoto: r.userInfo.avatarUrl,
          name: r.userInfo.nickName,
          count: r.userInfo.nickName
        })
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
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res)
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //向云端添加数据
  addData() {
    var that = this;
    if (that.data.Des == '' || that.data.wx == '') {
      wx.showToast({
        title: '输入不能存在空值',
        icon: 'none',
        duration: 2000,
      })
    } else if (that.data.index == '') {
      wx.showToast({
        title: '还未选择商品类型',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        success: (res) => {
          let goodsnum1 = that.data.goodsnum + 1
          that.setData({
            goodsnum: goodsnum1
          })
          if (that.data.goodsnum / 20 == 0) {
            let page1 = that.data.page + 1
            that.setData({
              page: page1
            })
          }
          for (var i = 0;; i++) {
            db.collection("goods_list").where({
              type: that.data.locateType,
              page: i
            }).count({
              success: function (res) {
                that.setData({
                  page: i,
                  total: res.total
                })
              }
            })
            if (that.data.total < 20) {
              break;
            }
          }
          console.log(that.data.goodsAddress)
          DB.add({
            data: {
              type: that.data.locateType,
              page: that.data.page,
              list: {
                name: that.data.name,
                visitorNum: 0,
                goodsPhoto: that.data.goodsAddress,
                headPhoto: that.data.headPhoto,
                backPhoto: that.data.backPhoto,
                goodsType: that.data.locateType1,
                time: that.data.time,
                Des: that.data.Des,
                wx: that.data.wx,
                value: that.data.value
              }
            },
            success(res) {
              console.log("添加成功", res)
            },
            fail(res) {
              console.log("添加失败", res)
            },
            complete(res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
  },
  // input信息
  inputDes: function (res) {
    this.setData({
      Des: res.detail.value
    })
  },

  inputWx: function (res) {
    this.setData({
      wx: res.detail.value
    })
  },
  inputValue: function (res) {
    this.setData({
      value: res.detail.value
    })
  },
  // 选择器
  bindPickerChange: function (res) {
    this.setData({
      unclick: false,
      index: res.detail.value,
      locateType: this.data.array1[res.detail.value],
      locateType1: this.data.array[res.detail.value]
    })
  },
  //上传图片函数
  upload_picture: function (name) {
    var that = this
    var goodsAddress1 = [];
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        //选择完成会先返回一个临时地址保存备用
        const images = res.tempFilePaths
        // 限制最多只能留下3张照片
        const FilePaths = images.length <= 3 ? images : images.slice(0, 3)
        that.setData({
          goodsAddress2: FilePaths
        })
        const cloudPath = [];
        FilePaths.forEach((item, i) => {
          cloudPath.push('goodsPhoto/' + that.data.count + '_' + Math.random() * 100 + FilePaths[i].match(/\.[^.]+?$/)[0])
        })
        for (var i = 0; i < 3; i++) {
          wx.cloud.uploadFile({
            cloudPath: cloudPath[i],
            filePath: FilePaths[i],
            success(res) {
              //上传成功后会返回永久地址
              console.log(res.fileID);
              const temp = that.data.goodsAddress;
              goodsAddress1.push(res.fileID)
              that.setData({
                count: that.data.count + 1
              })
              console.log(goodsAddress1)
            }
          })
        }
        //将照片上传至云端需要刚才存储的临时地址
        that.setData({
          goodsAddress: goodsAddress1
        })
      },
      fail(res) {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
      }
    })
  },
  upload_picture1: function (name) {
    var that = this;
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        //选择完成会先返回一个临时地址保存备用
        const FilePaths = res.tempFilePaths;
        const cloudPath = [];
        FilePaths.forEach((item, i) => {
          cloudPath.push('backPhoto/' + that.data.count + '_' + Math.random() * 100 + FilePaths[i].match(/\.[^.]+?$/)[0])
        })
        for (var i = 0; i < 1; i++) {
          wx.cloud.uploadFile({
            cloudPath: cloudPath[i],
            filePath: FilePaths[i],
            success(res) {
              //上传成功后会返回永久地址
              that.setData({
                backPhoto: res.fileID
              })
              console.log(backPhoto)
            }
          })
        }
        //将照片上传至云端需要刚才存储的临时地址
      },
      fail(res) {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
      }
    })
  }
})