/**
 * auther: guo
 * date: 2018-4-24
 * use: 全局切换中英文
 */
Component({
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isEn: false,
    falg: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    userInfo(res) { //获取个人信息
      let falg = this.data.falg;
      if (!falg) return; //阻止连点
      this.data.falg = false;
      let isEn = this.data.isEn;
      this.setData({
        isEn: !isEn
      })
      wx.setStorageSync('isEn', !isEn);
      this.triggerEvent('isEnEvent', null);
      this.data.falg = true;
    }
  },
  attached() {
    this.setData({
      isEn: wx.getStorageSync('isEn')
    })
  },
})
