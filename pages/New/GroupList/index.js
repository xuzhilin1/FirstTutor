const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    pagesData: [{
      corCanView: '一对二',
      corCreateOn: '2017-08-06 13:31', //发布时间
      corPrice: '200', // 课程价格
      fgtType: 1, //1 拼团 2 单独购买
      corClaNum: 2, //上课人数，1-3
      corTitle: '口语一对二', //课程名称
      fgtAttCount: 2,//拼团成功团数
      startTime: '周一上午/9:00-11:00'
    }, {
      corCanView: '一对三',
      corCreateOn: '2017-08-06 13:31', //发布时间
      corPrice: '200', // 课程价格
      fgtType: 1, //1 拼团 2 单独购买
      corClaNum: 1, //上课人数，1-3
      corTitle: '口语一对一', //课程名称
      fgtAttCount: 0, //拼团成功团数
      startTime: '周二下午/9:00-11:00'
    }]
  },
  orderDetails(e) {
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../orderDetails/index?isGroup=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.stopPullDownRefresh();
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