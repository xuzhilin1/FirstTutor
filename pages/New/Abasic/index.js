// pages/New/Abasic/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    userName: 'Emily',
    sexArray: ['女', '男'],
    sexIndex: 1,
    age: '1983-11-16',
    weChat: 'emily888',
    nationalityIndex: 1,
    nationalityArray: ['英国', '美国'],
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
    //发送请求
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