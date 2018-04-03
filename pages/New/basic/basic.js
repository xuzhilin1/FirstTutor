const $common = require('../../../utils/common.js');
const app = getApp();
const $static = require('../../../utils/static.js');
Page({
  data: {
    pagesList: [
      {
        ZiLiao: '基本资料',
        Types: '待完善',
        url: '../Abasic/index?status=1'
      },
      {
        ZiLiao: '教师介绍',
        Types: '未填写',
        url: '../Teachers/index?status=0'
      },
      {
        ZiLiao: '教师资质',
        Types: '未上传',
        url: '../qualification/index'
      },
      {
        ZiLiao: '证件照',
        Types: '未上传',
      },
      {
        ZiLiao: '上课视频',
        Types: '未上传',

      },
      {
        ZiLiao: '上课区域',
        Types: '未选择',
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
      $common.showModal('请完善基本资料');
      return;
    }
    if (!teacherFor.TeaDescript) {
      $common.showModal('请填写教师介绍');
      return;
    }
    if (teacherFor.TeaQualif.length < 0) {
      $common.showModal('请上传教师资质');
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
      $common.showModal('请选择上课区域');
      return;
    }
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('请填写正确的手机号');
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
          $common.showModal('保存成功!');
        } else {
          switch (res) {
            case 1:
              $common.showModal('资料保存失败');
              break;
            case 2:
              $common.showModal('基本资料保存失败');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
        console.log(res);
      }
    )
  },
  jump(e) {// 跳转
    let url = e.currentTarget.dataset.url,
      index = e.currentTarget.dataset.index;
    if (index == 3) {
      this.uploadPhoto();
      return;
    } else if (index == 4) {
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
      wx.showLoading({ title: '正在上传' });
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
                $common.showModal('文件类型不正确');
                break;
              case 2:
                $common.showModal('未上传文件');
                break;
              case 3:
                $common.showModal('图片上传支持.gif| .jpg| .jpeg|.png');
                break;
              case 4:
                $common.showModal('上传失败');
                break;
              case 5:
                $common.showModal('视频格式不正确');
                break;
            }
          }
        },
        fail: () => {
          $common.showModal('亲~网络不给力哦，请稍后重试');
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
      console.log(url);
      wx.showLoading({ title: '正在上传' });
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
                $common.showModal('文件类型不正确');
                break;
              case 2:
                $common.showModal('未上传文件');
                break;
              case 3:
                $common.showModal('图片上传支持.gif| .jpg| .jpeg|.png');
                break;
              case 4:
                $common.showModal('上传失败');
                break;
              case 5:
                $common.showModal('视频格式不正确');
                break;
            }
          }
        },
        fail: () => {
          $common.showModal('亲~网络不给力哦，请稍后重试');
        },
        complete: (res) => {
          wx.hideLoading();
        }
      });
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    }.bind(this));
  },
  getTeacherDetail() { //获取教师基本信息
    app.globalData.teacherFor = [];
    wx.showLoading({ title: '努力加载中...' });
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
              $common.showModal('参数有误');
              break;
            case 2:
              $common.showModal('未知错误');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        console.log(res);
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  courArea() { //上课区域，转码
    let arr = $static.areaShanghai;
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
    pagesList[0].Types = teacherFor.TeaName ? '已完善' : '待完善';//基本资料
    pagesList[1].Types = teacherFor.TeaDescript ? '已填写' : '未填写';//教师介绍
    pagesList[2].Types = teacherFor.TeaQualif.length > 0 ? '已上传' : '未上传';//教师资质
    pagesList[3].Types = teacherFor.TeaIdPhoto ? '已上传' : '未上传';//证件照
    pagesList[4].Types = teacherFor.TeaAudio ? '已上传' : '未上传';//上课视频
    pagesList[5].Types = teacherFor.TeaClaArea ? this.courArea() : '未选择';//上课区域
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