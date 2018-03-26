const $common = require('../../../utils/common.js');
Page({
  //页面分为两种情况，1，单独购买 = 团长购买 2，团员购买
  data: {
    isGroup: true,
    isGroupHead: true,
    courseName: '口语一对一',
    price: 200,
    partackNum: 6,
    courseLong: 2,
    userName: 'Emily',
    image: '../../images/ren_03.png',
    userList: ['英式发音', '喜欢旅游', '明星老师'],
    isVip: true,
    country: '../../images/guan_03.png',
    listq: 3.5,
    groupNum: 2,
    personNum: 5,
    startCourseTime: '',
    startCourseStage: '周一/上午',
    courseAddress: '上海市浦东新区张衡路666号',
    studentName: '',
    studentPhone: '',
    timeList: [],
    timeIndex: -1,

  },
  initCourseTimeData() { //初始化上课时间数据
    let courseLong = this.data.courseLong,
      startCourseStage = this.data.startCourseStage;
    let arr = ["9:00", '10:00'];
    this.setData({
      timeList: arr
    })
  },
  bindStudentName(e) { //姓名
    this.setData({
      studentName: e.detail.value
    })
  },
  bindStudentPhone(e) { //手机
    this.setData({
      studentPhone: e.detail.value
    })
  },
  bindTimeChange(e) { //上课时间切换
    let timeIndex = e.detail.value,
      timeList = this.data.timeList[timeIndex].split(':')[0],
      courseLong = this.data.courseLong,
      startCourseTime = `${timeList}:00-${parseInt(timeList) + courseLong}:00`;
    this.setData({
      timeIndex: timeIndex,
      startCourseTime: startCourseTime
    })
  },
  bindCourseAddress(e) { //上课地址
    this.setData({
      courseAddress: e.detail.value
    })
  },
  submitOrder() { //提交订单
    let studentName = this.data.studentName,
      studentPhone = this.data.studentPhone,
      startCourseTime = this.data.startCourseTime,
      courseAddress = this.data.courseAddress;
    if (studentName.trim().length <= 0) {
      $common.showModal('请输入姓名');
      return;
    }
    if (!$common.phoneReg.test(studentPhone)) {
      $common.showModal('请输入正确的手机号');
      return;
    }
    if (!startCourseTime) {
      $common.showModal('请选择上课时间');
      return;
    }
    wx.navigateTo({
      url: '../BuySuccess/index',
    })
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
    this.initCourseTimeData();
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