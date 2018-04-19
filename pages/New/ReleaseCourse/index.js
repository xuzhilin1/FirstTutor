const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    status: 0,
    courseNumPeople: '1', //人数
    isCourseIntroduce: false, //课程介绍是否显示
    courseIntroduce: '', //课程介绍
    courseTime: [], //上课时间段
    courseType: ['一对一', '一对二', '一对三'],
    courseTypeIndex: 0, //课程类型下标,
    courseName: '', //课程名称
    coursePrice: '0',
    courseAllPrice: '', //课程价格
    duration: ['1', '1.5', '2'],
    courseDurationIndex: 0, //课程时长下标
    CorId: false, //课程id
  },
  bindCourseType(e) { //课程类型
    let value = parseInt(e.detail.value);
    this.setData({
      courseTypeIndex: value,
      courseNumPeople: parseInt(value) + 1
    });
    app.globalData.releaseCourse.courseTypeIndex = value;
    this.changePrice();
  },
  bindCourseName(e) { //课程名称
    let courseName = e.detail.value;
    this.setData({
      courseName: courseName
    });
    app.globalData.releaseCourse.courseName = courseName;
  },
  bindCourseAllPrice(e) { //课程总价
    let courseAllPrice = e.detail.value;
    this.setData({
      courseAllPrice: courseAllPrice
    });
    app.globalData.releaseCourse.courseAllPrice = courseAllPrice;
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
    let courseDurationIndex = parseInt(e.detail.value);
    this.setData({
      courseDurationIndex: courseDurationIndex
    })
    app.globalData.releaseCourse.courseDurationIndex = courseDurationIndex;
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
    let courseTypeIndex = this.data.courseTypeIndex,
      courseName = this.data.courseName,
      courseAllPrice = this.data.courseAllPrice,
      courseDurationIndex = this.data.courseDurationIndex,
      courseTime = this.data.courseTime,
      courseIntroduce = this.data.courseIntroduce,
      isCourseIntroduce = this.data.isCourseIntroduce;
    if (courseName.trim().length <= 0) {
      // $common.showModal('请填写课程名称');
      $common.showModal('Please fill in the course name', false, false, 'OK', 'Prompt');
      return;
    }
    if (!courseAllPrice) {
      // $common.showModal('请填写课程价格');
      $common.showModal('Please fill in the course price', false, false, 'OK', 'Prompt');
      return;
    }
    if (isNaN(courseAllPrice) && Number(courseAllPrice).toFixed(2) < 0) {
      // $common.showModal('请填写有效的价格');
      $common.showModal('Please fill in a valid price', false, false, 'OK', 'Prompt');
      return;
    }
    if (courseTime.length <= 0) {
      // $common.showModal('请选择时间段');
      $common.showModal('Please select time period', false, false, 'OK', 'Prompt');
      return;
    }
    if (!isCourseIntroduce) {
      // $common.showModal('请填写课程介绍');
      $common.showModal('Please fill in the course description', false, false, 'OK', 'Prompt');
      return;
    }
    if (this.data.status === 0) {
      this.releaseCourse(
        courseTypeIndex + 1,
        courseName,
        Number(courseAllPrice).toFixed(2),
        courseDurationIndex + 1,
        courseIntroduce,
        courseTypeIndex + 1,
        courseTime
      );
    } else if (this.data.status === 1) {
      this.reviseCourse(
        courseTypeIndex + 1,
        courseName,
        Number(courseAllPrice).toFixed(2),
        courseDurationIndex + 1,
        courseIntroduce,
        courseTypeIndex + 1,
        courseTime
      );
    }
  },
  reviseCourse(CorType, CorTitle, CorPrice, CorLenOfCla, CorDescript, CorClaNum, timeTables) { //修改课程
    $common.request(
      "POST",
      $common.config.AlterCourse,
      {
        newCour: {
          CorId: this.data.CorId,
          CorType: CorType,
          CorTitle: CorTitle,
          CorPrice: CorPrice,
          CorLenOfCla: CorLenOfCla,
          CorDescript: CorDescript,
          CorClaNum: CorClaNum
        },
        timeTables: timeTables
      },
      (res) => {
        if (res.data.res) {
          wx.showToast({
            title: 'success',
            icon: 'success',
            duration: 1500,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          switch (res.data.errType) {
            case 1:
              // $common.showModal('参数不正确');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
            case 2:
              // $common.showModal('未知错误');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
          }
        }
      },
      (res) => {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
        $common.showModal('Pro-network does not work Oh, please try again later', false, false, 'OK', 'Prompt');
      },
      (res) => {
      }
    )
  },
  releaseCourse(CorType, CorTitle, CorPrice, CorLenOfCla, CorDescript, CorClaNum, timeTables) { //发布课程请求
    $common.request(
      "POST",
      $common.config.ReleaseCourse,
      {
        teaId: wx.getStorageSync('teacherStatusInfo').teaId,
        newCour: {
          CorType: CorType, //课程类型
          CorTitle: CorTitle, //课程名称
          CorPrice: CorPrice, //课程价格
          CorLenOfCla: CorLenOfCla, //课程时长
          CorDescript: CorDescript, //课程介绍
          CorClaNum: CorClaNum, //上课人数
        },
        timeTables: timeTables, //上课时间段数组
      },
      (res) => {
        if (res.data.res) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          switch (res.data.errType) {
            case 1:
              // $common.showModal('参数有误');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
            case 2:
              // $common.showModal('未知异常');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
            case 3:
              // $common.showModal('未知错误');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
          }
        }
      },
      (res) => {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
        $common.showModal('Pro-network does not work Oh, please try again later', false, false, 'OK', 'Prompt');
      },
      (res) => {
      }
    )
  },

  getAlterCourse() { //修改课程，获取课程信息
    wx.showLoading({ title: '努力加载中...' });
    let CorId = this.data.CorId;
    $common.request(
      "POST",
      $common.config.AlterCourseGet,
      {
        corId: CorId
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.course;
          let data1 = res.data.courTims;
          let arr = [];
          for (let i = 0, len = data1.length; i < len; i++) {
            arr.push({
              TimAfw: data1[i].TimAfw,
              TimClaTime: data1[i].TimClaTime
            })
          }
          app.globalData.releaseCourse = {
            courseIntroduce: data.CorDescript, //课程介绍
            courseTime: arr, //上课时间段
            courseTypeIndex: data.CorType - 1, //课程类型下标,
            courseName: data.CorTitle, //课程名称
            courseAllPrice: data.CorPrice, //课程价格
            courseDurationIndex: data.CorLenOfCla - 1, //课程时长下标
          }
          this.setData({
            courseNumPeople: data.CorType
          })
          this.init();
          this.changePrice();
        } else {
          switch (res.data.errType) {
            case 1:
              // $common.showModal('参数有误');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
            case 2:
              // $common.showModal('未知错误');
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
          }
        }
      },
      (res) => {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
        $common.showModal('Pro-network does not work Oh, please try again later', false, false, 'OK', 'Prompt');
      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  init() {
    let appData = app.globalData.releaseCourse,
      courseIntroduce = appData.courseIntroduce, //课程介绍
      courseTime = appData.courseTime, //上课时间段
      courseTypeIndex = appData.courseTypeIndex, //课程类型下标
      courseName = appData.courseName, //课程名称
      courseAllPrice = appData.courseAllPrice, //课程价格
      courseDurationIndex = appData.courseDurationIndex; //课程时长下标
    let isCourseIntroduce = false; //课程介绍是否完善
    if (courseIntroduce.trim().length > 0) {
      isCourseIntroduce = true;
    }
    this.setData({
      isCourseIntroduce: isCourseIntroduce,
      courseIntroduce: courseIntroduce, //课程介绍
      courseTime: courseTime, //上课时间段
      courseTypeIndex: courseTypeIndex, //课程类型下标
      courseName: courseName, //课程名称
      courseAllPrice: courseAllPrice, //课程价格
      courseDurationIndex: courseDurationIndex //课程时长下标
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = options.status ? parseInt(options.status) : 0;
    let CorId = options.CorId ? parseInt(options.CorId) : false;
    let titleText = '';
    this.setData({
      status: parseInt(options.status),
      CorId: CorId
    })
    switch (status) {
      case 0: //发布课程
        titleText = 'Publishing courses';
        break;
      case 1: //修改课程
        titleText = 'Modify course';
        this.getAlterCourse();
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
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
    if (this.data.status === 0) {
      wx.stopPullDownRefresh();
      return;
    }
    this.getAlterCourse();
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