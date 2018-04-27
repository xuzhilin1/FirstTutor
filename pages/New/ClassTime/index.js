/**
 * 选择时间段
 */
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    timeList: [],
    timeNoTables: -1, //哪些时间不能选
  },
  SonTime(e) { //子组件选择时间触发该事件
    this.setData({
      timeList: e.detail.timeList
    })
  },
  submit() {
    let timeList = this.data.timeList;
    let arr = [];
    timeList.forEach(function (target, index) {
      if (target.timeType === 2) {
        arr.push({
          TimAfw: target.TimAfw,
          TimClaTime: target.TimClaTime
        })
      }
    });
    if (arr.length <= 0) {
      //请选择时间段
      $common.showModal('Please select time slot.',false, false, 'Ok', 'Reminder');
      return;
    }
    app.globalData.releaseCourse.courseTime = arr;
    wx.navigateBack({
      delta: 1,
    })
  },
  getCourseTimeTable() { //获取课程占用
    $common.request(
      'POST',
      $common.config.GetAllTeaTimeTableInfo,
      {
        teaId: wx.getStorageSync('teacherStatusInfo').teaId
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.timList;
          this.setData({
            timeNoTables: data
          })
        } else {
          $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
        }
      },
      (res) => {

      },
      (res) => {
      }
    )
  },
  init() {
    this.getCourseTimeTable();
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
    wx.stopPullDownRefresh();
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