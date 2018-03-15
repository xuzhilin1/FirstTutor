// pages/New/index/index.js
const app = getApp();
const $common = require('../../../utils/common.js');
Page({
  data: {
    userInfo: {},
    idType: 2, //1 学生 2 导师 0 未知
    teacherList: [{
        url: '../../images/LI_03.png',
        title: " 基本资料",
        luJin: '../basic/basic'
      },
      {
        url: '../../images/LI_06.png',
        title: " 课程管理",
        luJin: '../CourseManagement/index'
      },
      {
        url: '../../images/LI_08.png',
        title: " 需求查看",
        luJin: '../NeedSee/index'
      },
      {
        url: '../../images/LI_10.png',
        title: " 订单查看",
        luJin: '../OrderCheck/index'
      },
      {
        url: '../../images/LI_12.png',
        title: " 点评管理",
        luJin: '../OrdeRreview/index'
      },
      {
        url: '../../images/LI_14.png',
        title: " 活动通知",
        luJin: '../activity/index'
      },
      {
        url: '../../images/LI_16.jpg',
        title: " 在线沟通",
        luJin: '../Online/index'
      }],
    studentList: [{
      url: '../../images/LI_10.png',
      title: " 我的订单",
      luJin: '../basic/basic'
    },
    {
      url: '../../images/LI_06.png',
      title: " 学习需求",
      luJin: '../CourseManagement/index'
    },
    {
      url: '../../images/LI_14.png',
      title: " 我报名的活动",
      luJin: '../NeedSee/index'
    },
    {
      url: '../../images/LI_12.png',
      title: " 我的点评",
      luJin: '../OrderCheck/index'
    },
    {
      url: '../../images/LI_16.jpg',
      title: " 在线沟通",
      luJin: '../OrdeRreview/index'
    }],
  },
  // 跳转
  GoXie: function (e) {
    console.log(e)
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // $common.getHeadInfo(
    //   function (res) {
    //     this.setData({
    //       userInfo: res
    //     })
    //   }.bind(this)
    // );
    $common.getOpenid();
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