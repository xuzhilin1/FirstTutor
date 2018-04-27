const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
const app = getApp();
Page({
  data: {
    purple: 'purple-bg white',
    pageList: $static.areaShanghaiEn,
  },
  bindChange: function (e) { //切换，选择
    let index = e.currentTarget.dataset.index,
      pageList = this.data.pageList;
    pageList[index].isShow = !pageList[index].isShow;
    this.setData({
      pageList: pageList
    })
  },
  submit() { //保存按钮
    let pageList = this.data.pageList,
      arr = [];
    pageList.forEach(function (target) {
      if (target.isShow) {
        arr.push(target.id);
      }
    })
    if (arr.length <= 0) {
      $common.showModal('Please select the acceptable teaching area.', false, false, 'OK', 'Reminder');
      return;
    }
    app.globalData.teacherFor.TeaClaArea = arr.join(',');
    wx.navigateBack({
      delta: 1
    })
  },
  init() {
    let TeaClaArea = app.globalData.teacherFor.TeaClaArea;
    let arr = TeaClaArea.split(',');
    let pageList = this.data.pageList;
    for (let i = 0, len = arr.length; i < len; i++) {
      for (let j = 0, l = pageList.length; j < l; j++) {
        if (parseInt(arr[i]) === pageList[j].id) {
          pageList[j].isShow = true;
          break;
        }
      }
    }
    this.setData({
      pageList: pageList
    })
  },

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