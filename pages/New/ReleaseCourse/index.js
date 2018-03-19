const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    status: 0,
    courseType: ['一对一', '一对二', '一对三'],
    courseTypeIndex: 0,
    courseName: '英语口语一对一',
    courseAllPrice: '400.00',
    courseNumPeople: '1',
    coursePrice: '100',
    duration: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
    durationIndex: 1,
    timeDuration: '', //时间段
    courseIntroduce: '', //课程介绍
  },
  bindCourseType(e) { //课程类型
    let value = e.detail.value;
    this.setData({
      courseTypeIndex: value,
      courseNumPeople: parseInt(value) + 1
    });
    this.changePrice();
  },
  bindCourseName(e) { //课程名称
    this.setData({
      courseName: e.detail.value
    })
  },
  bindCourseAllPrice(e) { //课程总价
    this.setData({
      courseAllPrice: e.detail.value
    });
    this.changePrice();
  },
  changePrice() { //金额切换单价
    let price = Number(this.data.courseAllPrice),
      index = parseInt(this.data.courseNumPeople);
    price = isNaN(price) ? 0 : price;
    this.setData({
      coursePrice: (price / index).toFixed(2)
    })
  },
  bindDuration(e) {  //课程时长
    this.setData({
      durationIndex: e.detail.value
    })
  },
  classTime() {  // 时间段
    wx.navigateTo({
      url: '../ClassTime/index',
    })
  },
  teachers() { //课程介绍
    wx.navigateTo({
      url: '../Teachers/index?status=1',
    })
  },
  submit() {
    let courseName = this.data.courseName,
      courseAllPrice = this.data.courseAllPrice,
      timeDuration = this.data.timeDuration,
      courseIntroduce = this.data.courseIntroduce;
    if (courseName.trim().length <= 0) {
      $common.showModal('请填写课程名称');
      return;
    }
    if (isNaN(courseAllPrice)) {
      $common.showModal('请填写有效的价格');
      return;
    }
    if (!timeDuration) {
      $common.showModal('请选择上课时间段');
      return;
    }
    if (!courseIntroduce) {
      $common.showModal('请填写课程介绍');
      return;
    }
    let courseType = this.data.courseType,
      courseTypeIndex = this.data.courseTypeIndex,
      courseNumPeople = this.data.courseNumPeople,
      coursePrice = this.data.coursePrice,
      duration = this.data.duration,
      durationIndex = this.data.durationIndex;
    //发送请求
  },
  init() {

    let status = this.data.status;
    let titleText = '';
    switch (status) {
      case 0: //发布课程
        titleText = '发布课程';
        break;
      case 1: //修改课程
        titleText = '修改课程';
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
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