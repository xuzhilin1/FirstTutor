// pages/New/qualification/index.js
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    imageList: [],
    imageCount: 5,
    srcImg: $common.srcImg,
  },
  bindImage() { //选择照片
    let imageList = this.data.imageList,
      imageCount = this.data.imageCount;
    if (imageCount <= 0) return;
    $common.chooseImage(function (res) {
      let url = res.tempFilePaths;
      for (let i = 0, len = url.length; i < len; i++) {
        imageList.push({
          QfsPicName: url[i],
          sqlUpload: false,
        })
      }
      imageCount = 5 - imageList.length;
      this.setData({
        imageList: imageList,
        imageCount: imageCount
      });
    }.bind(this), imageCount);
  },
  submit() {  //保存按钮
    let imageList = this.data.imageList;
    if (imageList.length <= 0) {
      $common.showModal('请选择教师资质图片');
      return;
    }
    console.log(imageList);
    return;
    wx.showLoading({ title: '正在上传' });
    let data = {
      url: imageList,
      i: 0,
      len: imageList.length,
      arr: []
    }
    this.uploadFun(data);
  },
  uploadFun(data) {
    if (data.url[data.i].QfsCreateOn) {
      data.i++;
      this.uploadFun(data);
      return;
    }
    wx.uploadFile({
      url: $common.config.UpLoadForTeaFile,
      filePath: data.url[data.i].QfsPicName,
      name: 'file',
      formData: {
        fileType: 2
      },
      success: (res) => {
        let resData = JSON.parse(res.data);
        if (resData.res) {
          data.arr.push({
            QfsPicName: resData.imgNames[0],
            QfsCreateOn: true
          });
        } else { }
      },
      fail: () => {

      },
      complete: (res) => {
        console.log(res);
        if (data.i >= data.len - 1) {
          wx.hideLoading();
          app.globalData.teacherFor.TeaQualif = data.arr;
          wx.navigateBack({
            delta: 1
          })
          return;
        }
        data.i++;
        this.uploadFun(data);
      }
    })
  },
  init() {
    let TeaQualif = app.globalData.teacherFor.TeaQualif;
    let imageList = TeaQualif;
    this.setData({
      imageCount: 5 - TeaQualif.length,
      imageList: imageList
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