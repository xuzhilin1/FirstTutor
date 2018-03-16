const $common = require('../../../utils/common.js');
Page({
  data: {
    pagesList: [
      {
        ZiLiao: '基本资料',
        Types: '待完善',
        url: '../Abasic/index'
      },
      {
        ZiLiao: '教师介绍',
        Types: '已填写',
        url: '../Teachers/index'
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
    }
  },
  // 跳转
  GoXie: function (e) {
    console.log(e)
    var idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: idx,
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