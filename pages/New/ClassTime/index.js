// pages/New/ClassTime/index.js
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    purple: 'purple-bg white',
    weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeList: []
  },
  bindTime(e) {  // 选择
    let index = e.currentTarget.dataset.index,
      timeList = this.data.timeList;
    //0 无法选中 1 未选 2 已选
    if (timeList[index].timeType === 0) return;
    timeList[index].timeType = timeList[index].timeType === 1 ? 2 : 1;
    this.setData({
      timeList: timeList
    })
  },
  initPageData() { //初始化页面数据
    //周几就用数字1234567代替，时间段就用1（上午），2（下午1），3（下午2），4（晚上）代替
    let arr = [];
    for (let i = 0; i < 28; i++) {
      if (i < 7) {
        arr.push({
          timeName: '上午',
          timeType: 1,
          TimClaTime: 1,
          TimAfw: i + 1
        });
        continue;
      }
      if (i < 14) {
        arr.push({
          timeName: '下午1',
          timeType: 1,
          TimClaTime: 2,
          TimAfw: i - 7 + 1
        });
        continue;
      }
      if (i < 21) {
        arr.push({
          timeName: '下午2',
          timeType: 1,
          TimClaTime: 3,
          TimAfw: i - 14 + 1
        });
        continue;
      }
      if (i < 28) {
        arr.push({
          timeName: '晚上',
          timeType: 1,
          TimClaTime: 4,
          TimAfw: i - 21 + 1
        });
        continue;
      }
    }
    this.setData({
      timeList: arr
    })
  },
  submit() {
    let timeList = this.data.timeList;
    console.log(timeList);
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
      $common.showModal('请选择时间段');
      return;
    }
    app.globalData.releaseCourse.courseTime = arr;
    wx.navigateBack({
      delta: 1,
    })
  },
  init() {
    let courseTime = app.globalData.releaseCourse.courseTime;
    let timeList = this.data.timeList;
    console.log(courseTime);
    for (let i = 0, len = courseTime.length; i < len; i++) {
      for (let j = 0, l = timeList.length; j < l; j++) {
        if (courseTime[i].TimAfw === timeList[j].TimAfw && courseTime[i].TimClaTime === timeList[j].TimClaTime) {
          timeList[j].timeType = 2;
        }
      }
    }
    this.setData({
      timeList: timeList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPageData();
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