/**
 * 意见反馈
 */
const $common = require('../../../utils/common.js');
Page({
  data: {
    input: '',
    placeholder: '请填写意见，最多不超过1000个字符',
  },
  bindInput(e) {
    this.data.input = e.detail.value;
  },
  submit() {
    let input = this.data.input;
    if (input.trim().length <= 0) {
      $common.showModal('请填写反馈意见');
      return;
    }
    $common.request(
      'POST',
      $common.config.PublishFeedBack,
      {
        fbkCon: input,
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          wx.showToast({
            title: 'success',
            icon: 'success',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          //1 参数不正确 2 未知错误
          $common.showModal('未知错误');
        }
      },
      (res) => {

      },
      (res) => {
      }
    )
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