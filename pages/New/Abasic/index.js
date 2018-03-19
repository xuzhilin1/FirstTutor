// pages/New/Abasic/index.js
const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
const app = getApp();
Page({
  data: {
    status: 0,
    userName: 'Emily',
    sexArray: ['女', '男'],
    sexIndex: 1,
    age: '1983-11-16',
    weChat: 'emily888',
    nationalityIndex: 0,
    nationalityArray: $static.country,
    school: '利兹大学',
    synopsis: '',
  },
  bindUserName(e) { //姓名
    this.setData({
      userName: e.detail.value
    })
  },
  bindSexChange(e) { //性别
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindAgeChange(e) { //时间
    this.setData({
      age: e.detail.value
    })
  },
  bindWeChat(e) { //微信
    this.setData({
      weChat: e.detail.value
    })
  },
  bindNationalityChange(e) { //国籍
    this.setData({
      nationalityIndex: e.detail.value
    })
  },
  bindSchool(e) { //大学
    this.setData({
      school: e.detail.value
    })
  },
  bindSynopsis(e) { //简介
    this.setData({
      synopsis: e.detail.value
    })
  },
  submit() { //保存按钮
    let userName = this.data.userName,
      sex = this.data.sexArray[this.data.sexIndex],
      age = this.data.age,
      weChat = this.data.weChat,
      nationality = this.data.nationalityArray[this.data.nationalityIndex],
      school = this.data.school,
      synopsis = this.data.synopsis;
    console.log(userName, sex, age, weChat, nationality, school, synopsis);
    if (userName.trim().length <= 0) {
      $common.showModal('请填写您的姓名');
      return;
    }
    if (weChat.trim().length <= 0) {
      $common.showModal('请填写您的微信号');
      return;
    }
    if (school.trim().length <= 0) {
      $common.showModal('请填写您的学校');
      return;
    }
    if (synopsis.trim().length <= 0) {
      $common.showModal('请填写您的简介');
      return;
    }
    let status = this.data.status;
    if (status === 0) {//申请外教资格
      wx.redirectTo({
        url: '../../Home/Success/index?status=0',
      })
    } else if (status === 1) {//外教基本资料

    }
    //发送请求
  },
  init() {
    let status = this.data.status;
    let titleText = '';
    switch (status) {
      case 0: //申请外教资格
        titleText = '申请FirstTutor外教资格';
        break;
      case 1: //外教基本资料
        titleText = '基本资料';
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = options.status;
    if (!status) return;
    this.setData({
      status: parseInt(status)
    })
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