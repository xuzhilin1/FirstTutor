/**
 * 外教资质申请
 */
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    userName: '',
    sexArray: [{
      id: 0,
      sex: 'Female'
    }, {
      id: 1,
      sex: 'Male'
    }],
    phone: '',
    passport: '',
    email: '',
    certificate: [],
    idPicture: '',
    video: "",
    sexIndex: 0,
    age: '30',
    weChat: '',
    nationalityIndex: 0,
    nationalityArray: [],
    school: '',
    synopsis: '',
    checkbox: false,
    teacherFor: {}, //教师基本资料
    TeaNaLityId: -1, //国籍id
    btnFalg: true, //防止保存按钮连点
  },
  terms() { //查看协议
    wx.navigateTo({
      url: '/pages/static/terms/terms?isEn=1',
    })
  },
  bindUserName(e) { //姓名
    this.data.userName = e.detail.value;
  },
  bindSexChange(e) { //性别
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindPhone(e) { //手机号
    this.data.phone = e.detail.value;
  },
  bindpassport(e) { //护照号
    this.data.passport = e.detail.value;
  },
  bindemail(e) { //邮箱
    this.data.email = e.detail.value;
  },
  uploadidPicture() { //上传证件照
    $common.chooseImage(function (res) {
      let image = res.tempFilePaths[0];
      wx.showLoading({ title: 'uploading...' });
      wx.uploadFile({
        url: $common.config.UpLoadForTeaFile,
        filePath: image,
        name: 'file',
        formData: {
          fileType: 1
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          if (data.res) {
            this.setData({
              idPicture: data.imgName
            })
          } else {
            $common.showModal('Upload Failed', false, false, 'OK', 'Reminder');
          }
        },
        fail: () => {
          $common.showModal('Unknown Error', false, false, 'OK', 'Reminder');
        },
        complete: (res) => {
          wx.hideLoading();
        }
      })
    }.bind(this), 1);
  },
  uploadCertificate() { //上传资质
    wx.navigateTo({
      url: '/pages/New/qualification/index',
    })
  },
  uploadVideo() { //上传视频
    $common.chooseVideo((res) => {
      let url = res.tempFilePath;//文件路径
      wx.showLoading({ title: 'uploading...' });
      wx.uploadFile({
        url: $common.config.UpLoadForTeaFile,
        filePath: url,
        name: 'file',
        formData: {
          fileType: 3
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          if (data.res) {
            this.setData({
              video: data.vdoName
            })
          } else {
            $common.showModal('Upload Failed', false, false, 'Ok', 'Reminder');
          }
        },
        fail: () => {
          $common.showModal('Upload Failed', false, false, 'Ok', 'Reminder');
        },
        complete: (res) => {
          wx.hideLoading();
        }
      });
    });
  },
  bindAgeChange(e) { //年龄
    this.setData({
      age: this.countAge(e.detail.value)
    })
  },
  bindWeChat(e) { //微信
    this.data.weChat = e.detail.value;
  },
  bindNationalityChange(e) { //国籍
    this.setData({
      nationalityIndex: e.detail.value
    })
  },
  bindSchool(e) { //大学
    this.data.school = e.detail.value;
  },
  bindSynopsis(e) { //简介
    this.data.synopsis = e.detail.value;
  },
  bindcheckbox() {  //阅读条款
    this.data.checkbox = !this.data.checkbox;
  },
  submit() { //保存按钮
    if (!this.data.btnFalg) return;
    this.data.btnFalg = false;
    let userName = this.data.userName.trim(),
      sex = this.data.sexArray[this.data.sexIndex].id,
      phone = this.data.phone,
      passport = this.data.passport.trim(),
      email = this.data.email.trim(),
      certificate = this.data.certificate,
      idPicture = this.data.idPicture,
      video = this.data.video,
      TeaClaArea = this.data.TeaClaArea,
      age = this.data.age,
      weChat = this.data.weChat.trim(),
      nationality = this.data.nationalityArray[this.data.nationalityIndex].NalId,
      TeaNation = this.data.nationalityArray[this.data.nationalityIndex].NalName,
      school = this.data.school.trim(),
      synopsis = this.data.synopsis,
      checkbox = this.data.checkbox; //是否阅读条款
    if (userName.trim().length <= 0) {
      $common.showModal('Please fill in your name.', false, false, 'Ok', 'Reminder');
      this.data.btnFalg = true;
      return;
    }
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('Please fill in the correct phone number.', false, false, 'Ok', 'Reminder');
      this.data.btnFalg = true;
      return;
    }
    if (passport.trim().length <= 0) {
      $common.showModal('Please fill in your passport.', false, false, 'Ok', 'Reminder');
      this.data.btnFalg = true;
      return;
    }
    if (!$common.emailReg.test(email)) {
      $common.showModal('Please fill in the correct email address.', false, false, 'Ok', 'Reminder');
      this.data.btnFalg = true;
      return;
    }
    // if (certificate.length <= 0) {
    //   $common.showModal('Please upload the tutor certificate picture.', false, false, 'Ok', 'Reminder');
    //   return;
    // }
    if (!idPicture) {
      $common.showModal('Please upload the Head Shot.', false, false, 'Ok', 'Reminder');
      this.data.btnFalg = true;
      return;
    }
    if (!TeaClaArea) {
      $common.showModal('Please select the acceptable teaching area.', false, false, 'OK', 'Reminder');
      this.data.btnFalg = true;
      return;
    }
    // if (!video) {
    //   $common.showModal('Please upload the tutor class video.', false, false, 'Ok', 'Reminder');
    //   return;
    // }
    if (weChat.trim().length <= 0) {
      $common.showModal('Please fill in your WeChat Account.', false, false, 'Ok', 'Prompt');
      this.data.btnFalg = true;
      return;
    }
    if (school.trim().length <= 0) {
      $common.showModal('Please fill in your University.', false, false, 'Ok', 'Prompt');
      this.data.btnFalg = true;
      return;
    }
    if (synopsis.trim().length <= 0) {
      $common.showModal('Please fill in your Key Words.', false, false, 'Ok', 'Prompt');
      this.data.btnFalg = true;
      return;
    }
    if (!checkbox) {
      $common.showModal('Please read and agree to the "Terms and conditions".', false, false, 'Ok', 'Prompt');
      this.data.btnFalg = true;
      return;
    }
    let arr = [];
    for (let i = 0, len = certificate.length; i < len; i++) {
      arr.push(certificate[i].QfsPicName);
    }
    this.requestSaveData(userName, sex, age, weChat, school, nationality, synopsis, phone, passport, email, arr, video, idPicture, TeaClaArea);
  },
  requestSaveData(TeaName, TeaGender, TeaAge, TeaWeChat, TeaUniversity, TeaNaLityId, TeaAbstract, TeaPhone, TeaPassPort, TeaMail, TeaQualif, TeaAudio, TeaIDPhoto, TeaClaArea) { //发送请求
    $common.request(
      "POST",
      $common.config.ApplyForForeEdu,
      {
        newTea: {
          TeaOpenId: wx.getStorageSync('openid'),
          TeaName: TeaName,
          TeaGender: TeaGender,
          TeaAge: TeaAge,
          TeaWeChat: TeaWeChat,
          TeaUniversity: TeaUniversity,
          TeaNaLityId: TeaNaLityId,
          TeaAbstract: TeaAbstract,
          TeaPhone: TeaPhone,
          TeaPassPort: TeaPassPort,
          TeaMail: TeaMail,
          TeaAudio: TeaAudio,
          TeaIDPhoto: TeaIDPhoto,
          TeaClassArea: TeaClaArea
        },
        Qualifs: TeaQualif,
      },
      (res) => {
        this.data.btnFalg = true;
        if (res.data.res) {
          if (res.data.resType == 5) {//注册成功，发布课程
            wx.redirectTo({
              url: '/pages/me/registerSuccess/registerSuccess',
            })
          } else if (res.data.resType == 6) { //注册成功，有发布过课程，回首页
            wx.switchTab({
              url: '/pages/Home/Home/index',
            })
          }
        } else {
          if (res.data.resType == 3) {//已注册
            wx.switchTab({
              url: '/pages/Home/Home/index',
            })
            // $common.showModal('You have been registered', false, false, 'Ok', 'Reminder');
          } else { //注册失败
            $common.showModal('Registration failed', false, false, 'Ok', 'Reminder');
          }
        }
      },
      (res) => {
        this.data.btnFalg = true;
        $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
      },
      (res) => {
        this.data.btnFalg = true;
      }
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
  TeaClaArea() {
    wx.navigateTo({
      url: '/pages/New/area/index',
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
          // let translate = data.reduce(function (item, target, index) {
          //   item.push(target.NalName);
          //   return item;
          // }, []);
          // $common.translate(translate.join('\n'), (res) => {
          //   console.log(res);
          //   let trans_result = res.data.trans_result;
          //   if (trans_result && trans_result.length > 0) { //翻译成功了
          //     for (let i = 0, len = data.length; i < len; i++) {
          //       data[i].NalName = trans_result[i].dst;
          //     }
          //   } else {//没有返回东西，报错了,显示原文
          //   }
          this.setData({
            nationalityArray: data
          })
          // });
          this.setTeaNaLityId();
        } else {
          // $common.showModal('Failed to obtain nationality information. Please regain', true, (res) => {
          //   if (res.confirm) {
          //     //用户点击确定，重新请求国籍信息
          //     this.getCountryInfo();
          //   }
          // }, 'OK', 'Prompt', 'NO');
        }
      });
  },
  init() {
    if (!app.globalData.teacherFor.TeaQualif || !app.globalData.teacherFor.TeaClaArea) return;
    let teacherFor = app.globalData.teacherFor;
    this.setData({
      certificate: teacherFor.TeaQualif,//教师资质
      TeaClaArea: teacherFor.TeaClaArea, //教师上课地址
    })
  },
  onLoad: function (options) {
    this.getCountryInfo();
  },
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
