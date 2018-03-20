// pages/New/Abasic/index.js
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    status: 0, //0 外教资格申请 1 外教基本资料 
    userName: '',
    sexArray: [{
      id: 0,
      sex: '女'
    }, {
      id: 1,
      sex: '男'
    }],
    sexIndex: 1,
    age: '1983-11-16',
    weChat: '',
    nationalityIndex: 0,
    nationalityArray: [],
    school: '',
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
      sex = this.data.sexArray[this.data.sexIndex].id,
      age = this.data.age,
      weChat = this.data.weChat,
      nationality = this.data.nationalityArray[this.data.nationalityIndex].NalId,
      school = this.data.school,
      synopsis = this.data.synopsis;
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
    let openid = wx.getStorageSync('openid');
    console.log(openid);
    if (openid === null || openid === '') { //没有openid，获取
      $common.getOpenid();
      return;
    }
    this.requestSaveData(userName, sex, age, weChat, school, nationality, synopsis);
  },
  requestSaveData(TeaName, TeaGender, TeaAge, TeaWeChat, TeaUniversity, TeaNaLityId, TeaAbstract) { //发送请求
    console.log(TeaName, TeaGender, TeaAge, TeaWeChat, TeaUniversity, TeaNaLityId, TeaAbstract);
    $common.request(
      "POST",
      $common.config.ApplyForForeEdu,
      {
        TeaOpenId: wx.getStorageSync('openid'),
        TeaName: TeaName,
        TeaGender: TeaGender,
        TeaAge: this.countAge(TeaAge),
        TeaWeChat: TeaWeChat,
        TeaUniversity: TeaUniversity,
        TeaNaLityId: TeaNaLityId,
        TeaAbstract: TeaAbstract
      },
      function (res) {
        console.log(res);
        if (res.data.res && res.data.resType == 5) {
          let status = this.data.status;
          if (status === 0) {//申请外教资格
            wx.redirectTo({
              url: '../../Home/Success/index?status=0',
            })
          } else if (status === 1) {//外教基本资料

          }
        } else {
          switch (res.data.resType) {
            case 1:
              $common.showModal('参数有误');
              break;
            case 2:
              $common.showModal('openid非法');
              break;
            case 3:
              $common.showModal('该外教已注册');
              break;
            case 4:
              $common.showModal('注册失败');
              break;
          }
        }
      }.bind(this)
    )
  },
  countAge(TAge) { //计算年龄
    let date = new Date(),
      TY = parseInt(TAge.split('-')[0]),
      nowY = parseInt(date.getFullYear());
    return nowY - TY;
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
  getCountryInfo() { //获取国籍信息
    $common.request("POST",
      $common.config.GetCountryInfos,
      null,
      function (res) {
        if (res.data.res) {
          this.setData({
            nationalityArray: res.data.nationList
          })
        } else {
          $common.showModal('获取国籍信息失败，请重新获取', true, function (res) {
            if (res.confirm) {
              //用户点击确定，重新请求国籍信息
              this.getCountryInfo();
            }
          }.bind(this));
        }
      }.bind(this));
  },
  onLoad: function (options) {
    let status = options.status;
    if (!status) return;
    this.setData({
      status: parseInt(status)
    });

  },
  onReady: function () {
    //判断并获取openId
    $common.getOpenid();
    this.getCountryInfo();
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