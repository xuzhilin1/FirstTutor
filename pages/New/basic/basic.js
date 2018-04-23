const $common = require('../../../utils/common.js');
const app = getApp();
const $static = require('../../../utils/static.js');
Page({
  data: {
    pagesList: [
      {
        ZiLiao: 'Basic Information',
        Types: 'Imperfect',
        url: '../Abasic/index?status=1'
      },
      {
        ZiLiao: 'Tutor Introduction',
        Types: 'unfilled',
        url: '../Teachers/index?status=0'
      },
      {
        ZiLiao: 'Tutor Certificate',
        Types: 'Not uploaded',
        url: '../qualification/index'
      },
      {
        ZiLiao: 'Head Shot',
        Types: 'Not uploaded',
      },
      {
        ZiLiao: 'Teaching Video',
        Types: 'Not uploaded',

      },
      {
        ZiLiao: 'Teaching Area',
        Types: 'Not selected',
        url: '../area/index'
      }
    ],
    phone: '',
  },
  bindPhone(e) { //电话
    let phone = e.detail.value;
    this.setData({
      phone: phone
    });
    app.globalData.teacherFor.TeaPhone = phone;
  },
  submit() { //点击保存按钮
    let teacherFor = app.globalData.teacherFor;
    let qualifs = [];
    let phone = this.data.phone;
    if (!teacherFor.TeaName) {
      $common.showModal('Please improve basic information!', false, false, 'OK', 'Prompt');
      return;
    }
    if (!teacherFor.TeaDescript) {
      $common.showModal('Please fill in the teacher\'s introduction!', false, false, 'OK', 'Prompt');
      return;
    }
    if (teacherFor.TeaQualif.length < 0) {
      $common.showModal('Please upload teacher qualification!', false, false, 'OK', 'Prompt');
      return;
    }
    // if (!teacherFor.TeaIdPhoto) {
    //   $common.showModal('请上传证件照');
    //   return;
    // }
    // if (!teacherFor.TeaAudio) {
    //   $common.showModal('请上传上课视频');
    //   return;
    // }
    if (!teacherFor.TeaClaArea) {
      $common.showModal('Please select class area!', false, false, 'OK', 'Prompt');
      return;
    }
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('Please fill in the correct phone number!', false, false, 'OK', 'Prompt');
      return;
    }
    for (let i = 0, len = teacherFor.TeaQualif.length; i < len; i++) {
      qualifs.push(teacherFor.TeaQualif[i].QfsPicName);
    }
    $common.request(
      'POST',
      $common.config.AlterForTeaBaseInfo,
      {
        forTea: {
          TeaId: teacherFor.TeaId,
          TeaName: teacherFor.TeaName,
          TeaGender: teacherFor.TeaGender,
          TeaAge: teacherFor.TeaAge,
          TeaWeChat: teacherFor.TeaWeChat,
          TeaUniversity: teacherFor.TeaUniversity,
          TeaNaLityId: teacherFor.TeaNaLityId,
          TeaAbstract: teacherFor.TeaAbstract,
          TeaDescript: teacherFor.TeaDescript,
          TeaIDPhoto: teacherFor.TeaIdPhoto,
          TeaAudio: teacherFor.TeaAudio,
          TeaClassArea: teacherFor.TeaClaArea,
          TeaPhone: teacherFor.TeaPhone,
        },
        qualifs: qualifs
      },
      (res) => {
        if (res.data.res) {
          let data = app.globalData.teacherFor.TeaQualif;
          for (let i = 0, len = data.length; i < len; i++) { //保存成功后，图片链接切换为外教链接地址
            data[i].QfsCreateOn = true;
          }
          app.globalData.teacherFor.TeaQualif = data;
          $common.showModal('Saved successfully!', false, false, 'OK', 'Prompt');
        } else {
          switch (res) {
            case 1:
              $common.showModal('Failed to save data!', false, false, 'OK', 'Prompt');
              break;
            case 2:
              $common.showModal('Failed to save basic data!', false, false, 'OK', 'Prompt');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
      }
    )
  },
  jump(e) {// 跳转
    let url = e.currentTarget.dataset.url,
      index = e.currentTarget.dataset.index;
    if (index == 3) { //调用上传图片
      this.uploadPhoto();
      return;
    } else if (index == 4) { //调用上传视频
      this.uploadVideo();
      return;
    }
    wx.navigateTo({
      url: url,
    })
  },
  uploadPhoto() { //上传证件照
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
            app.globalData.teacherFor.TeaIdPhoto = data.imgName;
            this.init();
          } else {
            switch (data.errType) {
              case 1:
                $common.showModal('Incorrect file type', false, false, 'OK', 'Prompt');
                break;
              case 2:
                $common.showModal('No file uploaded', false, false, 'OK', 'Prompt');
                break;
              case 3:
                $common.showModal('Image upload support.gif| .jpg| .jpeg|.png', false, false, 'OK', 'Prompt');
                break;
              case 4:
                $common.showModal('upload failed', false, false, 'OK', 'Prompt');
                break;
              case 5:
                $common.showModal('The video format is incorrect', false, false, 'OK', 'Prompt');
                break;
            }
          }
        },
        fail: () => {
          $common.showModal('Pro-network does not work Oh, please try again later', false, false, 'OK', 'Prompt');
        },
        complete: (res) => {
          wx.hideLoading();
        }
      })
    }.bind(this), 1);
  },
  uploadVideo() { //上传上课视频
    $common.chooseVideo(function (res) {
      let url = res.tempFilePath;//文件路径
      wx.showLoading({ title: 'uploading...' });
      const uploadTask = wx.uploadFile({
        url: $common.config.UpLoadForTeaFile,
        filePath: url,
        name: 'file',
        formData: {
          fileType: 3
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          if (data.res) {
            app.globalData.teacherFor.TeaAudio = data.vdoName;
            this.init();
          } else {
            switch (data.errType) {
              case 1:
                $common.showModal('Incorrect file type', false, false, 'OK', 'Prompt');
                break;
              case 2:
                $common.showModal('No file uploaded', false, false, 'OK', 'Prompt');
                break;
              case 3:
                $common.showModal('Image upload support.gif| .jpg| .jpeg|.png', false, false, 'OK', 'Prompt');
                break;
              case 4:
                $common.showModal('upload failed', false, false, 'OK', 'Prompt');
                break;
              case 5:
                $common.showModal('The video format is incorrect', false, false, 'OK', 'Prompt');
                break;
            }
          }
        },
        fail: () => {
          $common.showModal('Pro-network does not work Oh, please try again later', false, false, 'OK', 'Prompt');
        },
        complete: (res) => {
          wx.hideLoading();
        }
      });
      uploadTask.onProgressUpdate((res) => {
        //console.log('上传进度', res.progress)
        //console.log('已经上传的数据长度', res.totalBytesSent)
        //console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    }.bind(this));
  },
  getTeacherDetail() { //获取教师基本信息
    app.globalData.teacherFor = [];
    wx.showLoading({ title: 'Hard loading...' });
    $common.request(
      "POST",
      $common.config.GetForTeaDetailInfo,
      {
        teaId: wx.getStorageSync('teacherStatusInfo').teaId,
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            forTea: res.data.forTea
          })
          app.globalData.teacherFor = res.data.forTea;
          this.init();
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('The parameter is wrong', false, false, 'OK', 'Prompt');
              break;
            case 2:
              $common.showModal('unknown mistake', false, false, 'OK', 'Prompt');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('Pro-network does not work Oh, please try again later', false, false, 'OK', 'Prompt');
      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  courArea() { //上课区域，转码
    let arr = $static.areaShanghaiEn;
    let area = app.globalData.teacherFor.TeaClaArea;
    area = area.split(',');
    let data = [];
    for (let i = 0, len = area.length; i < len; i++) {
      for (let j = 0, l = arr.length; j < l; j++) {
        if (parseInt(area[i]) === arr[j].id) {
          data.push(arr[j].area);
        }
      }
    }
    return data.join('/');
  },
  init() {
    if (!app.globalData.teacherFor.TeaQualif) return;
    let teacherFor = app.globalData.teacherFor;
    let pagesList = this.data.pagesList;
    pagesList[0].Types = teacherFor.TeaName ? 'perfect' : 'Imperfect';//基本资料
    pagesList[1].Types = teacherFor.TeaDescript ? 'Filled out' : 'unfilled';//教师介绍
    pagesList[2].Types = teacherFor.TeaQualif.length > 0 ? 'uploaded' : 'Not uploaded';//教师资质
    pagesList[3].Types = teacherFor.TeaIdPhoto ? 'uploaded' : 'Not uploaded';//证件照
    pagesList[4].Types = teacherFor.TeaAudio ? 'uploaded' : 'Not uploaded';//上课视频
    pagesList[5].Types = teacherFor.TeaClaArea ? this.courArea() : 'Not selected';//上课区域
    this.setData({
      pagesList: pagesList,
      phone: teacherFor.TeaPhone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeacherDetail();
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
    this.getTeacherDetail();
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