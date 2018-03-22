// pages/New/activityDetail/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    userName: '',
    phone: '',
    remark: '',
  },
  bindUserName(e) { //姓名
    this.setData({
      userName: e.detail.value
    })
  },
  bindPhone(e) { //手机号
    this.setData({
      phone: e.detail.value
    })
  },
  bindRemark(e) { //备注
    this.setData({
      remark: e.detail.value
    })
  },
  submit() { //立即报名
    let userName = this.data.userName,
      phone = this.data.phone,
      remark = this.data.remark;
    if (userName.trim().length <= 0) {
      $common.showModal('请输入姓名');
      return;
    }
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('请输入正确的手机号');
      return;
    }
    //发送请求
    wx.navigateTo({ //跳转到报名成功页面
      url: '../Success/index?status=1',
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