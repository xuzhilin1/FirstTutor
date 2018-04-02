const $common = require('../../../utils/common.js');
Page({
  //页面分为两种情况，1，单独购买 = 团长购买 2，团员购买
  data: {
    isGroupHead: 1, //1 开团, 0 参团

    startCourseTime: '', //上课时间
    courseAddress: '上海市浦东新区张衡路666号', //上课 地址
    studentName: '', //姓名
    studentPhone: '', //手机号
    timeList: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'], //选择上课时间
    timeIndex: -1,

    tea: {}, //教师信息
    course: {}, //课程信息
    teaDep: 0, //收取定金百分比
    timeListData: [], //上课时间段数据
  },
  initCourseTimeData() { //初始化上课时间数据
    let course = this.data.course,
      timeListData = this.data.timeListData;
    let arr = [],
      array = [];
    for (let i = 0, len = timeListData.length; i < len; i++) {
      if (timeListData[i].timeType !== 2) continue;
      array.push(timeListData[i]);
      let week;
      if (i === 0 || i === 7 || i === 14 || i === 21) {
        week = '周一';
      } else if (i === 1 || i === 8 || i === 15 || i === 22) {
        week = '周二';
      } else if (i === 2 || i === 9 || i === 16 || i === 23) {
        week = '周三';
      } else if (i === 3 || i === 10 || i === 17 || i === 24) {
        week = '周四';
      } else if (i === 4 || i === 11 || i === 18 || i === 25) {
        week = '周五';
      } else if (i === 5 || i === 12 || i === 19 || i === 26) {
        week = '周六';
      } else if (i === 6 || i === 13 || i === 20 || i === 27) {
        week = '周日';
      }
      arr.push([`${week}/${timeListData[i].timeName}`])
    }
    arr = arr.join('|');
    course.weekTime = arr;
    this.setData({
      course: course,
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
      timeList = this.data.timeList;
    this.setData({
      timeIndex: timeIndex,
      startCourseTime: timeList[timeIndex]
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
  getNameAndPhone() { //获取姓名和手机号
    $common.request(
      'POST',
      $common.config.GetUserNamePhone,
      {
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.nameP;
          this.setData({
            studentName: data[0],
            studentPhone: data[1]
          })
        }
      }
    )
  },
  getTeacherInfo() { //获取外教基本信息
    $common.request(
      "POST",
      $common.config.GetOrderForTeaInfo,
      {
        corId: this.data.course.CorId
      },
      (res) => {

      },
      (res) => {

      },
      (res) => {
        console.log(res);
      }
    )
  },
  getOrderInfo() { //获取订单 信息
    let course = this.data.course;
    // return;
    $common.request(
      "POST",
      $common.config.GetOrderInfos,
      {
        corId: course.CorId,
        orderType: 2,
        groupType: null,
        cogId: null
      },
      (res) => {

      },
      (res) => {

      },
      (res) => {
        console.log(res);
      }
    )
  },
  init() {
    this.getNameAndPhone();
    this.getTeacherInfo();
    this.getOrderInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let tea = JSON.parse(options.tea),
      course = JSON.parse(options.course),
      teaDep = JSON.parse(options.teaDep),
      timeListData = JSON.parse(options.timeList);
    let isGroup = parseInt(options.isGroup); // 1 团购 2 单买
    let isGroupHead = parseInt(options.isGroup); // 1 开团 2 参团
    this.setData({
      tea: tea,
      course: course,
      teaDep: teaDep, //收取定金百分比
      timeListData: timeListData
    })
    this.initCourseTimeData();
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