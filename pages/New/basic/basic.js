const $common = require('../../../utils/common.js');
const app = getApp();
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
        Types: '已填写',
        url: '../Teachers/index?status=0'
      },
      {
        ZiLiao: '教师资质',
        Types: '已上传',
        url: '../qualification/index'
      },
      {
        ZiLiao: '证件照',
        Types: '已上传',
      },
      {
        ZiLiao: '上课视频',
        Types: '未上传',

      },
      {
        ZiLiao: '上课区域',
        Types: '长宁区、徐汇区',
        url: '../area/index'
      }
    ],
    phone: '',
  },
  bindPhone(e) { //电话
    this.setData({
      phone: e.detail.value
    })
  },
  submit() { //点击保存按钮
    let phone = this.data.phone;
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('请填写正确的手机号');
      return;
    }
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
      console.log(res.tempFilePaths[0]);
    }.bind(this), 1);
  },
  uploadVideo() { //上传上课视频
    $common.chooseVideo(function (res) {
      let url = res.tempFilePath;//文件路径
      console.log(res);
    }.bind(this));
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