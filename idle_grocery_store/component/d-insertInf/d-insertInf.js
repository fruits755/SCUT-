// component/d-back-top/d-back-top.js
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
    handleTap: function() {
      var tanchu = true;
      this.triggerEvent('tanchu', tanchu);
    }
}
})