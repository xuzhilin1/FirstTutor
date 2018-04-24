/**
 * 帮助与反馈
 */
const $common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '021-54245895'
  },
  call() { //打电话
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  feedback() { //跳转意见反馈页
    wx.navigateTo({
      url: '/pages/me/feedback/feedback',
    })
  },
  commonProblem() { //跳转意见反馈页
    wx.navigateTo({
      url: '/pages/me/commonProblem/commonProblem',
    })
  },
  init() {
    wx.showLoading({ title: '努力加载...' });
    $common.request(
      'POST',
      $common.config.GetUserHelp,
      {
        type: 1,
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            phone: res.data.UhPhone
          })
        }
      },
      (res) => {

      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
    this.init();
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
    return {
      title: 'FirstTutor',
      path: '/pages/Home/Home/index'
    }
  }
})