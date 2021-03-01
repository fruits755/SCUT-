// component/d-tab-control/d-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currenIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function(event){
      const index = event.currentTarget.dataset.index;
      wx.setStorageSync('currentIndex', index);
      this.setData({
        currenIndex: index
      });
      var detail = this.data.currenIndex;
      this.triggerEvent('tab',detail);
    },
  }
})