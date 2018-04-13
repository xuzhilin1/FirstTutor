// pages/Home/CourseInformation/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    FgtType: 1, //1 拼团 2 单独购买
    purple: 'purple-bg white',
    courId: null, //课程id
    teaId: null, //教师id
    listenCallbackNum: 0,
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
  initPageData() { //初始化上课时间
    //周几就用数字1234567代替，时间段就用1（上午），2（下午1），3（下午2），4（晚上）代替
    let arr = [];
    for (let i = 0; i < 28; i++) { //0不可选 1可选 2 选中
      if (i < 7) {
        arr.push({
          timeName: '上午',
          timeType: 0,
        });
        continue;
      }
      if (i < 14) {
        arr.push({
          timeName: '下午1',
          timeType: 0,
        });
        continue;
      }
      if (i < 21) {
        arr.push({
          timeName: '下午2',
          timeType: 0,
        });
        continue;
      }
      if (i < 28) {
        arr.push({
          timeName: '晚上',
          timeType: 0,
        });
        continue;
      }
    }
    this.setData({
      timeList: arr
    })
  },
  bindTime(e) {  // 选择
    let index = e.currentTarget.dataset.index,
      timeList = this.data.timeList;
    //0 无法选中 1 未选 2 已选
    if (timeList[index].timeType === 0) return;
    for (let i = 0, len = timeList.length; i < len; i++) {
      if (timeList[i].timeType === 2) {
        timeList[i].timeType = 1;
      }
    }
    timeList[index].timeType = 2;
    this.setData({
      timeList: timeList
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
      url: '../SpellingRules/index',
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
  getCourseAndTeacherInfo() { //获取课程和教师信息
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
          this.setData({
            course: course,
            tea: res.data.tea,
            orderBeDel: res.data.orderBeDel,
            FgtType: res.data.FgtType,
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
                  console.log(res);
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
                console.log(res);
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
        this.addListenCallbackNum();
        this.stopModal();
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
          this.updateTimeList();
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
        this.addListenCallbackNum();
        this.stopModal();
      }
    );
  },
  updateTimeList() { //刷新时间列表
    let timeTables = this.data.timeTables,
      timeList = this.data.timeList;
    timeTables.forEach(function (target, index) {
      let week = target.TimAfw,//周几
        time = target.TimClaTime; //上午、下午1、下午2、晚上
      //改时间段已被购买，或不向学生展示
      if (target.TimBePurch === 1 || target.TimCanUse === 0) { return }
      let arr = [];
      switch (time) {
        case 1:
          arr = [0, 1, 2, 3, 4, 5, 6];
          break;
        case 2:
          arr = [7, 8, 9, 10, 11, 12, 13];
          break;
        case 3:
          arr = [14, 15, 16, 17, 18, 19, 20];
          break;
        case 4:
          arr = [21, 22, 23, 24, 25, 26, 27];
          break;
      }
      let nowIndex = arr[week - 1]; //当前所改变的数组下标
      timeList[nowIndex].timeType = 1;
      timeList[nowIndex].TimId = target.TimId;
    });
    this.setData({
      timeList: timeList
    })
  },
  addListenCallbackNum() {
    let num = parseInt(this.data.listenCallbackNum);
    num++;
    this.setData({
      listenCallbackNum: num
    })
  },
  stopModal() { //停止页面的各种加载状态
    let num = parseInt(this.data.listenCallbackNum);
    if (num >= 2) { //本页面有两个接口
      wx.hideLoading();
      wx.stopPullDownRefresh();
      this.setData({
        listenCallbackNum: 0
      })
    }
  },
  init() {
    wx.showLoading({ title: '努力加载中...' });
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