const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    input: '',
    placeholder: '',
    status: 0,
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
  init() {
    let status = this.data.status;
    let placeholder = '',
      titleText = "";
    switch (status) {
      case 0: //教师介绍
        placeholder = '请填写教师介绍，最多不超过1000个字符';
        titleText = '教师介绍';
        break;
      case 1:  //课程介绍
        placeholder = '请填写课程介绍，最多不超过1000个字符';
        titleText = '课程介绍'
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
    });
    this.setData({
      placeholder: placeholder
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: parseInt(options.status)
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