/**
 * 需求查看
 */
const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
const $translate = require('../../../utils/translate.js');
Page({
  data: {
    addressData: $static.areaShanghaiEn,
    nedId: -1,
    lnd: {},
  },
  onlineChart() { //立即沟通
    let userId = this.data.lnd.UserId;
    wx.navigateTo({
      url: `../../New/onlineChart/index?userId=${userId}`,
    })
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
    wx.showLoading({ title: 'Loading...' });
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
          data.time = $translate.translateTimeEn(data.NedClaTime);
          data.week = $translate.translateWeekEn(data.NedCorAfw);
          data.address = this.complateAddress(data.NedClaArea);
          this.setData({
            lnd: data
          })
        } else {
          $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
        }
      },
      (res) => {
        $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
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