// pages/New/index/index.js
const app = getApp();
const $common = require('../../../utils/common.js');
Page({
  data: {
    userInfo: {},
    userType: 1, //1 学生 2 导师 0 未知,
    vip: true, //是否vip
    teacherList: [{
      isShow: true,
      url: '../../images/LI_03.png',
      title: " 基本资料",
      luJin: '../basic/basic'
    },
    {
      isShow: true,
      url: '../../images/LI_06.png',
      title: " 课程管理",
      luJin: '../CourseManagement/index'
    },
    {
      isShow: false,
      url: '../../images/LI_08.png',
      title: " 需求查看",
      luJin: '../NeedSee/index'
    },
    {
      isShow: true,
      url: '../../images/LI_10.png',
      title: " 订单查看",
      luJin: '../OrderCheck/index'
    },
    {
      isShow: true,
      url: '../../images/LI_12.png',
      title: " 点评管理",
      luJin: '../OrdeRreview/index'
    },
    {
      isShow: true,
      url: '../../images/LI_14.png',
      title: " 活动通知",
      luJin: '../activity/index'
    },
    {
      isShow: true,
      url: '../../images/LI_16.jpg',
      title: " 在线沟通",
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
  init() {
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(function () {
        this.setData({
          userInfo: wx.getStorageSync('userInfo'),
          userType: wx.getStorageSync('userType'),
        })
      }.bind(this));
      return;
    }
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      userType: wx.getStorageSync('userType'),
    })
    let teacherList = this.data.teacherList;
    let vip = true;
    //vip才能查看需求
    teacherList[2].isShow = vip ? true : false;
    this.setData({
      vip: vip,
      teacherList: teacherList
    });
    // this.setData({
    //   userType: 2
    // })
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