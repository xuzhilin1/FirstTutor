const $common = require('../../../utils/common.js');
Page({
  //页面分为两种情况，1，单独购买 = 团长购买 2，团员购买
  data: {
    startCourseTime: '', //上课时间
    courseAddress: '', //上课 地址
    studentName: '', //姓名
    studentPhone: '', //手机号
    timeList: [], //选择上课时间
    timeListData: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
    timeIndex: -1,
    cogId: '', //团id 当groupType为2时必填
    corId: '', //购买的课程 id
    groupType: '', //团类型：1. 开团  2. 参团， 当orderType为1时必填
    orderType: '', //下单类型：1. 团购  2. 单独购
    PayPrice: '', //付款价格
    course: {}, //课程信息
    teacher: {}, //教师信息
    corOpenG: {}, //拼团信息
    weekTime: '', //上课时间段
    weekTimeData: {}, //上课时间段数据
  },
  initCourseTimeLong() { //初始话上课时间数据
    let weekTimeData = this.data.weekTimeData;
    let timeListData = this.data.timeListData;
    let course = this.data.course;
    let timeList = [];
    switch (weekTimeData.time) {
      case '上午':
        switch (course.CorLenOfCla) {
          case 1:
            timeList = timeListData.slice(0, 5);
            break;
          case 2:
            timeList = timeListData.slice(0, 4);
            break;
          case 3:
            timeList = timeListData.slice(0, 3);
            break;
        }
        break;
      case '下午1':
        switch (course.CorLenOfCla) {
          case 1:
            timeList = timeListData.slice(6, 11);
            break;
          case 2:
            timeList = timeListData.slice(6, 10);
            break;
          case 3:
            timeList = timeListData.slice(6, 9);
            break;
        }
        break;
      case '下午2':
        switch (course.CorLenOfCla) {
          case 1:
            timeList = timeListData.slice(12, 17);
            break;
          case 2:
            timeList = timeListData.slice(12, 16);
            break;
          case 3:
            timeList = timeListData.slice(12, 15);
            break;
        }
        break;
      case '晚上':
        switch (course.CorLenOfCla) {
          case 1:
            timeList = timeListData.slice(18, 23);
            break;
          case 2:
            timeList = timeListData.slice(18, 22);
            break;
          case 3:
            timeList = timeListData.slice(18, 21);
            break;
        }
        break;
    }
    this.setData({
      timeList: timeList,
      timeIndex: -1,
    })
  },
  initCourseTimeData() { //初始化上课时间段数据
    let weekTimeData = this.data.weekTimeData;
    let i = parseInt(weekTimeData.index);
    let week = '';
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
    this.setData({
      weekTime: `${week}/${weekTimeData.time}`,
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
    let timeListData = this.data.timeListData;
    let courseLong = parseInt(this.data.course.CorLenOfCla);
    let startCourseTime = '';
    let index = 0;
    for (let i = 0, len = timeListData.length; i < len; i++) {
      if (timeList[timeIndex] === timeListData[i]) {
        index = i;
        break;
      }
    }
    startCourseTime = `${timeList[timeIndex]}-${timeListData[index + courseLong + 1]}`;
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
    if (courseAddress.trim().length <= 0) {
      $common.showModal('请选择上课地址');
      return;
    }
    let orderType = this.data.orderType,
      course = this.data.course,
      cogId = this.data.cogId,
      groupType = this.data.groupType;
    $common.request(
      'POST',
      $common.config.PlaceAnOrder,
      {
        openId: wx.getStorageSync('openid'),
        courId: course.CorId, //购买课程ID
        cogMemNum: orderType == 2 ? 1 : course.CorType, //可参团人数（一对一与单独购买为1，团购时为2/3）
        TimId: this.data.weekTimeData.TimId,
        pName: studentName, //姓名 
        pPhone: studentPhone, //手机
        corStartTime: startCourseTime, //上课时间
        corAddress: courseAddress, //上课地址(默认线下协商)
        payPrice: this.data.PayPrice, //支付金额
        orderType: orderType, //订单类型类型：1. 团购  2. 单独购
        groupType: groupType, //团类型：1. 开团  2. 参团， 当orderType为1时必填
        cogId: cogId,// 团ID：当groupType为2时必填
      },
      (res) => {
        if (res.data.res) {
          let paras = res.data.paras;
          let cogId = res.data.cogId;
          wx.requestPayment({
            'timeStamp': paras.timeStamp,
            'nonceStr': paras.nonceStr,
            'package': paras.package,
            'signType': 'MD5',
            'paySign': paras.paySign,
            'success': (res) => { //支付成功
              /*
              单买: 跳转订单详情
              拼团: 跳转拼团页
               */
              let pagePath = ''; //用户收到的模板消息链接
              if (orderType == 1) {//订单类型类型：1. 团购  2. 单独购
                pagePath = 'pages/Home/SpellGroup/index?cogId=' + cogId;
              } else if (orderType == 2) {
                pagePath = 'pages/New/orderDetails/index?cogId=' + cogId;
              }
              $common.request( //发送模板消息
                'POST',
                $common.config.PayMentSuccess,
                {
                  cogId: cogId, //团id
                  openId: wx.getStorageSync('openid'),
                  pagePath: pagePath
                },
                (res) => {
                  console.log(cogId, pagePath, orderType, this.data.orderType);
                  wx.redirectTo({
                    url: '../BuySuccess/index?orderType=' + orderType + '&cogId=' + cogId + '&groupType=' + groupType,
                  })
                  if (res.data.res) {

                  } else {
                    switch (res.data.errType) {
                      case 1:
                        $common.showModal('发送模板消息，参数错误');
                        break;
                      case 2:
                        $common.showModal('发送模板消息，未知错误');
                        break;
                    }
                  }
                },
                (res) => {

                },
                (res) => {
                },
              )
            },
            'fail': (res) => { //支付失败
              $common.request(
                'POST',
                $common.config.AttendGroupFailed,
                {
                  cogId: cogId, //团id
                  openId: wx.getStorageSync('openid')
                },
                (res) => {
                  if (res.data.res) {

                  } else {
                    switch (res.data.errType) {
                      case 1:
                        //$common.showModal('参数错误');
                        break;
                      case 2:
                        //$common.showModal('未知错误');
                        break;
                      case 3:
                        //$common.showModal('服务器出错');
                        break;
                    }
                  }
                },
                (res) => {

                },
                (res) => {
                },
              )
            },

          })
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数有误');
              break;
            case 2:
              $common.showModal('未知错误');
              break;
            case 3:
              $common.showModal('该课程该时间段已被他人抢占先机啦~');
              break;
            case 4:
              $common.showModal('获取信息出错');
              break;
            case 1:
              $common.showModal('拼团信息添加失败');
              break;
            case 1:
              $common.showModal('cogId不正确或者服务器出错');
              break;
            case 1:
              $common.showModal('该团已经结束');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
      }
    );
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
  getOrderInfo() { //获取订单 信息
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.GetOrderInfos,
      {
        corId: this.data.corId,
        orderType: this.data.orderType,
        groupType: this.data.groupType,
        cogId: this.data.cogId
      },
      (res) => {
        if (res.data.res) {
          switch (res.data.course.CorLenOfCla) {
            case 1:
              res.data.course.courseTimeLong = 1;
              break;
            case 2:
              res.data.course.courseTimeLong = 1.5;
              break;
            case 3:
              res.data.course.courseTimeLong = 2;
              break;
          }
          if (res.data.corOpenG) { //参团信息
            let corOpenG = res.data.corOpenG;
            let weekTimeData = {};
            weekTimeData.TimId = corOpenG.TimId;
            this.setData({
              weekTime: corOpenG.TimeFie,
              startCourseTime: corOpenG.TimeStart,
              courseAddress: corOpenG.Address,
              weekTimeData: weekTimeData
            })
          }
          let course = res.data.course;
          course.CorPrice = course.CorPrice.toFixed(2) < 0.01 ? 0.01 : course.CorPrice.toFixed(2);
          this.setData({
            PayPrice: res.data.PayPrice.toFixed(2) < 0.01 ? 0.01 : res.data.PayPrice.toFixed(2),
            course: course,
            teacher: res.data.teacher
          });
          this.initCourseTimeLong();
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('courId不正确');
              break;
            case 2:
              $common.showModal('未知错误 ');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  init() {
    this.getNameAndPhone();
    this.getOrderInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cogId = options.cogId,
      corId = options.corId,
      groupType = options.groupType,
      orderType = options.orderType,
      weekTime = options.weekTime ? JSON.parse(options.weekTime) : false;
    this.setData({
      cogId: cogId,
      corId: corId,
      groupType: groupType,
      orderType: orderType,
      weekTimeData: weekTime,
    })
    if (!weekTime) return;
    this.initCourseTimeData(); //初始化上课时间段
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