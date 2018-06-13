const $common = require('../../../utils/common.js');
Page({
  data: {
    isEn: false, //显示中英文
    srcForIdPhoto: $common.srcForIdPhoto,
    srcActivity: $common.srcActivity,
    srcBanner: $common.srcBanner,
    banList: [],
    activity: {},
    pageIndex: 1, // 第几页
    pageSize: 10, // 本页面默认给十条
    listData: [],
  },
  getBannerData() { //获取轮播图数据
    $common.request(
      "POST",
      $common.config.GetBannerImgs,
      null,
      (res) => {
        if (res.data.res) {
          let banList = res.data.banList;
          this.setData({
            banList: banList
          })
        } else {
        }
      },
      (res) => {
      },
      (res) => {
      }
    );
  },
  getActivity() { //获取最新活动
    $common.request(
      "POST",
      $common.config.GetLastestAtyInfo,
      null,
      (res) => {
        if (res.data.res) {
          this.setData({
            activity: res.data.activity
          })
        } else {
        }
      },
      (res) => {
      },
      (res) => {
      }
    );
  },
  getListData() { //推荐外教
    let pageIndex = this.data.pageIndex,
      pageSize = this.data.pageSize;
    $common.request(
      "POST",
      $common.config.GetRecomForTeas,
      {
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            listData: res.data.teaList
          });
        } else {
        }
      },
      (res) => {
      },
      (res) => {
        wx.hideLoading();
      }
    );
  },
  teacherInfo(e) { //跳转外教信息
    let index = e.currentTarget.dataset.index,
      listData = this.data.listData;
    wx.navigateTo({
      url: '../teachersInformation/index?data=' + listData[index].TeaId,
    })
  },
  activityDetail() { //跳转到活动详情
    let AtyId = this.data.activity.AtyId;
    if (!AtyId) return;
    wx.navigateTo({
      url: '../../New/activityDetail/index?isSign=1&atyId=' + AtyId,
    })
  },
  init() { //进入页面初始化
    let isEn = wx.getStorageSync('isEn');
    let text = "";
    if (isEn) {
      text = 'Loading...';
    } else {
      text = '努力加载中...';
    }
    wx.showLoading({ title: text });
    this.getBannerData();
    this.getActivity();
    this.getListData();
  },
  onLoad(options) {

  },
  onReady() {
    this.init();
    $common.getOpenid($common.studentRegister); //获取openid并注册
  },
  isEnEvent(res) { //判断当前显示中英文
    this.setData({
      isEn: wx.getStorageSync('isEn')
    })
  },
  onShow: function () {
    this.isEnEvent();
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
    wx.stopPullDownRefresh();
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
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
