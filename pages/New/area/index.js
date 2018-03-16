const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    purple: 'purple-bg white',
    pageList: $static.areaShanghai,
    pageSelect: [],
  },
  bindChange: function (e) { //切换，选择
    let index = e.currentTarget.dataset.index,
      pageSelect = this.data.pageSelect;
    pageSelect[index] = !pageSelect[index]
    this.setData({
      pageSelect: pageSelect
    })
  },
  submit() { //保存按钮
    let pageSelect = this.data.pageSelect,
      isSelect = false;
    pageSelect.forEach(function (target) {
      target && (isSelect = true);
    })
    if (!isSelect) {
      $common.showModal('请选择上课区域');
      return;
    }
    //发送请求
  },

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