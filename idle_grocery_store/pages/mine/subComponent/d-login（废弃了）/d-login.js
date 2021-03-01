// pages/mine/subComponent/d-login/d-login.js
const DB = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {
      img: '',
      nickName: ''
    },
    login: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      //获取登录凭证code
      wx.login({

      })

      console.log('getUserInfo', e)
      const nickname = e.detail.userInfo.nickName;
      const imgUrl = e.detail.userInfo.avatarUrl;
      this.setData({
        'userInfo.img': imgUrl,
        'userInfo.nickName': nickname,
        login: false
      })

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
  }
})