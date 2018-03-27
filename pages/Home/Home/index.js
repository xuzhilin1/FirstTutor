const $common = require('../../../utils/common.js');
Page({
  data: {
    banList: [],
    activity: {},
    listData: [],
  },
  getBannerData() { //获取轮播图数据
    $common.request(
      "POST",
      $common.config.GetBannerImgs,
      null,
      function (res) {
        if (res.data.res) {
          let banList = res.data.banList;
          this.setData({
            banList: banList
          })
        } else {
          // this.getBannerData();
        }
      }.bind(this),
      null, function (res) {
        console.log(res);
      }
    );
  },
  getActivity() { //获取最新活动
    $common.request(
      "POST",
      $common.config.GetLastestAtyInfo,
      null,
      function (res) {
        if (res.data.res) {
          this.setData({
            activity: res.data.activity
          })
        } else {
          // this.getActivity();
        }
      }.bind(this), null, function (res) {
        console.log(res);
      }
    );
  },
  getListData() {
    let arr = [{
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      listq: 3,
    }, {
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      listq: 4.5
    }, {
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      listq: 4.5
    }];
    this.setData({
      listData: arr
    })
  },
  teacherInfo(e) { //跳转外教信息
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../teachersInformation/index',
    })
  },
  init() { //进入页面初始化
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(); //获取用户信息及openid；
      return;
    }
  },
  onLoad(options) {

  },
  onReady() {
    this.getBannerData();
    this.getActivity();
    this.getListData();
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
  onPullDownRefresh: function (res) {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
    console.log(111);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})