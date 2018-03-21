const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    input: '',
    scoure: 0,
  },
  bindScoure(e) { //评分
    this.setData({
      scoure: parseInt(e.currentTarget.dataset.index + 1)
    })
  },
  bindInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  submit() {
    let input = this.data.input,
      scoure = this.data.scoure;
    if (scoure <= 0) {
      $common.showModal('请给该外教打分');
      return;
    }
    if (input.trim().length <= 0) {
      $common.showModal('请填写外教介绍');
      return;
    }
    // 发送请求
  },

  onLoad: function (options) {

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
    this.init();
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

  }
})