// pages/New/Abasic/index.js
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    teaToe: 0, //外教审核状态， 0 未审核 1 审核通过 2 审核未通过
    teaBeDel: 0, //0 教师未被删除，  1 外教已被删除
    status: 0, //0 外教资格申请 1 外教基本资料
    userName: '',
    sexArray: [{
      id: 0,
      sex: 'woman'
    }, {
      id: 1,
      sex: 'man'
    }],
    sexIndex: 0,
    age: '30',
    weChat: '',
    nationalityIndex: 0,
    nationalityArray: [],
    school: '',
    synopsis: '',
    teacherFor: {}, //教师基本资料
    TeaNaLityId: -1, //国籍id
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
      age: this.countAge(e.detail.value)
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
      TeaNation = this.data.nationalityArray[this.data.nationalityIndex].NalName,
      school = this.data.school,
      synopsis = this.data.synopsis;
    if (userName.trim().length <= 0) {
      $common.showModal('Please fill in your name.', false, false, 'OK', 'Reminder');
      return;
    }
    if (weChat.trim().length <= 0) {
      $common.showModal('Please fill in your WeChat Account.', false, false, 'OK', 'Reminder');
      return;
    }
    if (school.trim().length <= 0) {
      $common.showModal('Please fill in your University.', false, false, 'OK', 'Reminder');
      return;
    }
    if (synopsis.trim().length <= 0) {
      $common.showModal('Please fill in your brief introduction.', false, false, 'OK', 'Reminder');
      return;
    }
    let status = this.data.status;
    if (status === 1) { //外教基本资料，暂存为全局变量
      let teacherFor = this.data.teacherFor;
      teacherFor.TeaName = userName;
      teacherFor.TeaGender = sex;
      teacherFor.TeaAge = age;
      teacherFor.TeaWeChat = weChat;
      teacherFor.TeaNaLityId = nationality;
      teacherFor.TeaNation = TeaNation,
        teacherFor.TeaUniversity = school;
      teacherFor.TeaAbstract = synopsis;
      app.globalData.teacherFor = teacherFor;
      wx.navigateBack({
        delta: 1
      })
      return;
    }
    let openid = wx.getStorageSync('openid');
    if (!openid) { //没有openid，获取
      $common.getOpenid(this.submit.bind(this));
      return;
    }
    this.requestSaveData(userName, sex, age, weChat, school, nationality, synopsis);
  },
  requestSaveData(TeaName, TeaGender, TeaAge, TeaWeChat, TeaUniversity, TeaNaLityId, TeaAbstract) { //发送请求
    $common.request(
      "POST",
      $common.config.ApplyForForeEdu,
      {
        TeaOpenId: wx.getStorageSync('openid'),
        TeaName: TeaName,
        TeaGender: TeaGender,
        TeaAge: TeaAge,
        TeaWeChat: TeaWeChat,
        TeaUniversity: TeaUniversity,
        TeaNaLityId: TeaNaLityId,
        TeaAbstract: TeaAbstract
      },
      function (res) {
        if (res.data.res && res.data.resType == 5) {
          wx.redirectTo({
            url: '../../Home/Success/index?status=0',
          })
        } else {
          $common.showModal('registration failed', false, false, 'OK', 'Reminder');
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
  setTeaNaLityId() { //控制国籍id
    let TeaNaLityId = this.data.TeaNaLityId;
    if (TeaNaLityId === -1) return;
    let nationalityArray = this.data.nationalityArray;
    let nationalityIndex = 0;
    for (let i = 0, len = nationalityArray.length; i < len; i++) {
      if (nationalityArray[i].NalId == TeaNaLityId) {
        nationalityIndex = i;
        break;
      }
    }
    this.setData({
      nationalityIndex: nationalityIndex
    })
  },
  initTeacherInfo() { //初始化教师基本信息
    let teacherFor = app.globalData.teacherFor;
    this.setData({
      teacherFor: teacherFor,
      userName: teacherFor.TeaName,
      sexIndex: teacherFor.TeaGender,
      age: teacherFor.TeaAge,
      weChat: teacherFor.TeaWeChat,
      TeaNaLityId: teacherFor.TeaNaLityId,
      school: teacherFor.TeaUniversity,
      synopsis: teacherFor.TeaAbstract
    });
    this.setTeaNaLityId();
  },
  getForTeaStatus() { //外教申请，获取外教信息
    let openid = wx.getStorageSync('openid');
    if (!openid) {
      //判断并获取openId
      $common.getOpenid(this.getForTeaStatus.bind(this));
      return;
    }
    $common.request(
      'POST',
      $common.config.GetForTeaStatus,
      {
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let teaToe = res.data.teaToe,
            teaBeDel = res.data.teaBeDel;
          this.setData({
            teaToe: teaToe,
            teaBeDel: teaBeDel
          });
          if (teaBeDel === 0) { //外教未被删除
            let audit = teaToe; //0 审核中 1 审核通过 2 审核不通过
            wx.navigateTo({
              url: `../../Home/Success/index?status=0&audit=${audit}`,
            })
          }
        }
      },
      (res) => {

      },
      (res) => {
      }
    )
  },
  init() {
    let status = this.data.status;
    let titleText = '';
    switch (status) {
      case 0: //申请外教资格
        titleText = 'registration';
        this.getForTeaStatus();
        break;
      case 1: //外教基本资料
        titleText = 'Basic information';
        this.initTeacherInfo();
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
      (res) => {
        if (res.data.res) {
          let data = res.data.nationList;
          //翻译
          let translate = data.reduce(function (item, target, index) {
            item.push(target.NalName);
            return item;
          }, []);
          $common.translate(translate.join('\n'), (res) => {
            let trans_result = res.data.trans_result;
            if (trans_result && trans_result.length > 0) { //翻译成功了
              for (let i = 0, len = data.length; i < len; i++) {
                data[i].NalName = trans_result[i].dst;
              }
            } else {//没有返回东西，报错了,显示原文
            }
            this.setData({
              nationalityArray: data
            })
          });
          this.setTeaNaLityId();
        } else {
          $common.showModal('Failed to obtain nationality information. Please regain', true, (res) => {
            if (res.confirm) {
              //用户点击确定，重新请求国籍信息
              this.getCountryInfo();
            }
          }, 'OK', 'Reminder', 'NO');
        }
      });
  },
  onLoad: function (options) {
    let status = options.status;
    if (!status) return;
    this.setData({
      status: parseInt(status)
    });
  },
  onReady: function () {
    this.getCountryInfo();
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
  onPullDownRefresh: function () {
    this.init();
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
