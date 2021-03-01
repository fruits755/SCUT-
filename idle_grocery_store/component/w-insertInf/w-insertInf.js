// component/w-insertInf.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function(event) {
      var tanchu = true;
      var index1=event.target.id;
      console.log(index1);
      wx.setStorageSync('index', index1)
      this.triggerEvent('tanchu', tanchu);
    }

  }
})
