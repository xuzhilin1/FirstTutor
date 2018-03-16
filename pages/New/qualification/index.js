// pages/New/qualification/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    imageList: [],
    imageCount: 9
  },
  bindImage() { //选择照片
    let imageList = this.data.imageList,
      imageCount = this.data.imageCount;
    if (imageCount <= 0) return;
    $common.chooseImage(function (res) {
      let url = res.tempFilePaths;
      url.forEach(function (target, index) {
        imageList.push(target);
      });
      imageCount = 9 - imageList.length;
      this.setData({
        imageList: imageList,
        imageCount: imageCount
      });
    }.bind(this), imageCount);
  },
  submit() {  //保存按钮
    let imageList = this.data.imageList;
    if (imageList.length <= 0) return;
    //调用函数，上传图片
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