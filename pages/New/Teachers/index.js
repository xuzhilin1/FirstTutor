// pages/New/Teachers/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    input: ''
  },
  bindInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  submit() {
    let input = this.data.input;
    if (input.trim().length <= 0) {
      $common.showModal('请填写教师介绍');
      return;
    }
    // 发送请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
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