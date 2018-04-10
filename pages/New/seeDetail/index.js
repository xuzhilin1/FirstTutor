// pages/New/seeDetail/index.js
const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    addressData: $static.areaShanghai,
    nedId: -1,
    lnd: {},
  },
  complateTime(res) { //时间段
    let data;
    switch (parseInt(res)) {
      case 1:
        data = '上午';
        break;
      case 2:
        data = '下午1';
        break;
      case 3:
        data = '下午2';
        break;
      case 4:
        data = '晚上';
        break;
    }
    return data;
  },
  complateWeek(res) { //星期
    let data;
    switch (parseInt(res)) {
      case 1:
        data = '周一';
        break;
      case 2:
        data = '周二';
        break;
      case 3:
        data = '周三';
        break;
      case 4:
        data = '周四';
        break;
      case 5:
        data = '周五';
        break;
      case 6:
        data = '周六';
        break;
      case 7:
        data = '周日';
        break;
    }
    return data;
  },
  complateAddress(res) { //区域
    let addressData = this.data.addressData;
    let data;
    for (let i = 0, len = addressData.length; i < len; i++) {
      if (addressData[i].id === res) {
        data = addressData[i].area;
        break;
      }
    }
    return data;
  },
  init() {
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetMyLearnNeedInfo,
      {
        nedId: this.data.nedId,
        teaOpenId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.lnd;
          data.time = this.complateTime(data.NedClaTime);
          data.week = this.complateWeek(data.NedCorAfw);
          data.address = this.complateAddress(data.NedClaArea);
          this.setData({
            lnd: data
          })
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数错误');
              break;
            case 2:
              $common.showModal('未知错误');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nedId = options.nedId;
    this.setData({
      nedId: nedId
    });
    this.init();
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