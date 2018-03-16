const $common = require('../../../utils/common.js');
Page({
  data: {
    courseType: ['一对一', '一对二', '一对三'],
    courseTypeIndex: 0,
    courseName: '英语口语一对一',
    courseAllPrice: '400',
    date: '1990-01-01',
    index1: 1,
    GuoJia: ['2', '1.5', '1']
  },
  bindCourseType(e) { //课程类型
    let value = e.detail.value;
    this.setData({
      courseTypeIndex: value
    })
  },
  bindCourseName(e) { //课程名称
    this.setData({
      courseName: e.detail.value
    })
  },
  bindCourseAllPrice(e) { //课程总价
    this.setData({
      courseAllPrice: e.detail.value
    })
  },
  // 选择时间
  ShiJian: function () {
    wx.navigateTo({
      url: '../ClassTime/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  //日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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