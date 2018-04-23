// pages/Home/CourseInformation/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    srcForIdPhoto: $common.srcForIdPhoto,
    isPage: false,//页面是否显示
    FgtType: 1, //1 拼团 2 单独购买
    courId: null, //课程id
    teaId: null, //教师id
    tea: {}, //教师信息列表
    course: {}, //课程信息
    timeTables: [], //选择上课时间列表
    weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeList: [], // 页面展示上课时间表
    fgtList: {}, //推荐
    orderBeDel: 0, //1 订单已删除  0 未删除
  },
  onlineChart() { //立即沟通
    let TeaUserId = this.data.tea.TeaUserId;
    wx.navigateTo({
      url: `../../New/onlineChart/index?userId=${TeaUserId}`,
    })
  },
  SonTime(e) { //子组件选择时间触发该事件
    this.setData({
      timeList: e.detail.timeList
    })
  },
  orderDetail() { //查看购买详情
    let orderBeDel = parseInt(this.data.orderBeDel);
    if (orderBeDel === 1) {
      $common.showModal('订单已删除');
      return;
    }
    if (this.data.FgtType == 2) { //1 拼团 2 单独购买
      wx.navigateTo({
        url: '../../New/orderDetailsS/index?cogId=' + this.data.course.BeBuyCour,
      })
    } else {
      wx.navigateTo({
        url: '/pages/Home/SpellGroup/index?cogId=' + this.data.course.BeBuyCour,
      })
    }
  },
  sureOrder() { //立即购买
    let course = this.data.course;
    let timeList = this.data.timeList;
    let flage = false;
    let thisData = null;
    for (let i = 0, len = timeList.length; i < len; i++) {
      if (timeList[i].timeType === 2) {
        thisData = {
          index: i,
          time: timeList[i].timeName,
          TimId: timeList[i].TimId
        };
        flage = true;
      }
    }
    if (!flage) {
      $common.showModal('请选择时间段');
      return;
    }
    wx.navigateTo({
      url: '../sureOrder/index?orderType=' + 2 + '&corId=' + course.CorId + '&groupType=' + -1 + '&cogId=' + -1 + '&weekTime=' + JSON.stringify(thisData),
    })
  },
  spellingRules() { //详细规则
    wx.navigateTo({
      url: '/pages/static/SpellingRules/index',
    })
  },
  goHome() { //首页
    wx.switchTab({
      url: '../Home/index',
    })
  },
  goJoinGroup(e) { //去参团
    let course = this.data.course;
    let fgtList = this.data.fgtList;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../sureOrder/index?corId=' + course.CorId + '&orderType=' + 1 + '&groupType=' + 2 + '&cogId=' + fgtList[index].FgtId,
    })
  },
  alonePayment() { //单独购买
    let course = this.data.course;
    let timeList = this.data.timeList;
    let flage = false;
    let thisData = null;
    for (let i = 0, len = timeList.length; i < len; i++) {
      if (timeList[i].timeType === 2) {
        thisData = {
          index: i,
          time: timeList[i].timeName,
          TimId: timeList[i].TimId
        };
        flage = true;
      }
    }
    if (!flage) {
      $common.showModal('请选择时间段');
      return;
    }
    wx.navigateTo({
      url: '../sureOrder/index?corId=' + course.CorId + '&orderType=' + 2 + '&groupType=' + -1 + '&cogId=' + -1 + '&weekTime=' + JSON.stringify(thisData),
    })
  },
  fightGroup() { //多人拼团
    let course = this.data.course;
    let timeList = this.data.timeList;
    let flage = false;
    let thisData = null;
    for (let i = 0, len = timeList.length; i < len; i++) {
      if (timeList[i].timeType === 2) {
        thisData = {
          index: i,
          time: timeList[i].timeName,
          TimId: timeList[i].TimId
        };
        flage = true;
      }
    }
    if (!flage) {
      $common.showModal('请选择时间段');
      return;
    }
    wx.navigateTo({
      url: '../sureOrder/index?corId=' + course.CorId + '&orderType=' + 1 + '&groupType=' + 1 + '&cogId=' + -1 + '&weekTime=' + JSON.stringify(thisData),
    })
  },
  studentRegister() { //学生注册
    $common.request(
      "POST",
      $common.config.RisStudent,
      {
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          switch (res.data.rtnType) {
            case 1:
              //注册成功
              break;
            case 2:
              //改账号被禁用,无法访问程序,
              break;
            case 3:
              //账户正常
              break;
          }
        } else {
          switch (res.data.errType) {
            case 1:
              //发生异常
              break;
            case 2:
              //openId错误
              break;
            case 3:
              //未知错误
              break;
          }
        }
      },
    );
  },
  getOpenCallback() {
    this.getCourseAndTeacherInfo();
    this.studentRegister();
  },
  getCourseAndTeacherInfo() { //获取课程和教师信息
    let openid = wx.getStorageSync('openid');
    if (!openid) {
      $common.getOpenid(this.getOpenCallback);
      return;
    }
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.GetCourseInfo,
      {
        courId: this.data.courId,
        teaId: this.data.teaId,
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let course = res.data.course;
          course.paymentPrice = 0; //单人购买需支付的价格
          course.paymentPriceS = 0; //拼团购买需支付的价格
          switch (course.CorLenOfCla) {
            case 1:
              course.courseTimeLong = 1; //1小时
              break;
            case 2:
              course.courseTimeLong = 1.5; //1.5小时
              break;
            case 3:
              course.courseTimeLong = 2; //2小时
              break;
          }
          course.CorBuyPrice = course.CorBuyPrice.toFixed(2) < 0.01 ? 0.01 : course.CorBuyPrice.toFixed(2);//保留两位小数
          course.CorPrice = course.CorPrice.toFixed(2) < 0.01 ? 0.01 : course.CorPrice.toFixed(2);
          course.CorGroupPrice = course.CorGroupPrice.toFixed(2) < 0.01 ? 0.01 : course.CorGroupPrice.toFixed(2);
          let tea = res.data.tea;
          tea.TeaName = tea.TeaNickName
          this.setData({
            course: course,
            tea: tea,
            orderBeDel: res.data.orderBeDel,
            FgtType: res.data.FgtType,
            isPage: true
          })
          if (course.CorType != 1) { //一对多页面
            $common.request(
              "POST",
              $common.config.GetCorGroupInfos,
              {
                corId: this.data.courId,
              },
              (res) => {
                if (res.data.res) {
                  let data = res.data.fgtList;
                  if (data.length <= 0) return;
                  for (let i = 0, len = data.length; i < len; i++) {
                    data[i].countDown = this.timeStamp(data[i].FgtEndTime);
                  }
                  this.setData({
                    fgtList: data
                  })
                }
              },
              (res) => {

              },
              (res) => {
              }
            )
          }
        } else {
          switch (res.data.errType) {
            case 1:
              //未知错误
              break;
            case 2:
              //课程不存在
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
    );
  },
  timeStamp(time) { //时间戳转换为日期
    time = time.replace('/Date(', '').replace(')/', '');
    let date = new Date(parseInt(time)),
      y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      f = date.getMinutes();
    m < 10 && (m = '0' + m);
    d < 10 && (d = '0' + d);
    h < 10 && (h = '0' + h);
    f < 10 && (f = '0' + f);
    return `${m}-${d} ${h}:${f}`;
  },
  getCourTime() { //根据课程ID获取课程的上课时间
    $common.request(
      "POST",
      $common.config.GetTimeTableInfos,
      {
        courId: this.data.courId,
        teaId: this.data.teaId
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            timeTables: res.data.timeTables
          });
          // this.updateTimeList();
        } else {
          switch (res.data.errType) {
            case 1:
              //未知错误
              break;
            case 2:
              //未设置课程时间
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
  init() {
    this.getCourseAndTeacherInfo();
    this.getCourTime();
  },
  onLoad: function (options) {
    let courId = options.courId,
      teaId = options.teaId;
    this.setData({
      courId: courId,
      teaId: teaId
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
