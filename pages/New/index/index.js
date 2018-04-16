// pages/New/index/index.js
const app = getApp();
const $common = require('../../../utils/common.js');
Page({
  data: {
    isPageShow: false, //页面初始不显示
    userInfo: {},
    userType: 1, //1 学生 2 导师 0 未知,
    vip: false, //是否vip
    teacherList: [{
      isShow: true,
      url: '../../images/LI_03.png',
      title: "Basic Information",
      luJin: '../basic/basic'
    },
    {
      isShow: true,
      url: '../../images/LI_06.png',
      title: "Course Management",
      luJin: '../CourseManagement/index'
    },
    {
      isShow: false,
      url: '../../images/LI_08.png',
      title: "Demand review",
      luJin: '../NeedSee/index'
    },
    {
      isShow: true,
      url: '../../images/LI_10.png',
      title: "Order viewing",
      luJin: '../OrderCheck/index'
    },
    {
      isShow: true,
      url: '../../images/LI_12.png',
      title: "Review Management",
      luJin: '../OrdeRreview/index'
    },
    {
      isShow: true,
      url: '../../images/LI_14.png',
      title: "Event notification",
      luJin: '../activity/index'
    },
    {
      isShow: true,
      url: '../../images/LI_16.jpg',
      title: "Online communication",
      luJin: '../Online/index'
    }],
    //学生
    studentList: [{
      url: '../../images/LI_10.png',
      title: " 我的订单",
      luJin: '../OrderCheckS/index'
    },
    {
      url: '../../images/LI_06.png',
      title: " 学习需求",
      luJin: '../NeedSeeS/index'
    },
    {
      url: '../../images/LI_14.png',
      title: " 我报名的活动",
      luJin: '../activity/index'
    },
    {
      url: '../../images/LI_12.png',
      title: " 我的点评",
      luJin: '../OrdeRreviewS/index'
    },
    {
      url: '../../images/LI_16.jpg',
      title: " 在线沟通",
      luJin: '../Online/index'
    }],
  },
  getIsVip(callback) {//获取外教是否为vip
    $common.request(
      "POST",
      $common.config.GetForTeaStatus,
      { openId: wx.getStorageSync('openid') },
      function (res) {
        if (res.data.res) {
          wx.setStorageSync("teacherStatusInfo", res.data);
          let vip = res.data.teaAddV ? res.data.teaAddV : false; //vip才能查看需求
          let teacherList = this.data.teacherList;
          teacherList[2].isShow = vip ? true : false;
          this.setData({
            vip: vip,
            teacherList: teacherList
          });
        }
      }.bind(this));
  },
  init() {
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(function () {
        this.getMyStatus();
      }.bind(this));
      return;
    }
    wx.showLoading({ title: '努力加载中...' });
    this.getMyStatus();
  },
  getMyStatus() { //获取我的用户类型
    $common.request(
      "POST",
      $common.config.GetUserType,
      {
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let userType = res.data.userType;
          this.setData({
            userInfo: wx.getStorageSync('userInfo'),
            userType: userType,
            isPageShow: true,
          });
          if (parseInt(userType) !== 2) {//用户身份不是外教,调用注册，防止首页不接收授权
            this.studentRegister();
          } else { //用户是外教，调用是否是vip//切换为英文
            wx.setNavigationBarTitle({
              title: 'Me',
            })
            this.getIsVip();
          }
        } else {
          switch (res.data.errType) {
            case 1:
              //参数不对
              break;
            case 2:
              //异常
              break;
            case 3:
              //未知错误
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
  jump(e) {  // 跳转
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.showModal('我们需要您的个人信息', false, function () {
        $common.getOpenid();
      }.bind(this));
      return;
    }
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  onLoad: function (options) {

  },
  onReady: function () {
    this.init();
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