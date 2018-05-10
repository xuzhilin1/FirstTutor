const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    input: '',
    scoure: 0,
    btnFalg: true
  },
  bindScoure(e) { //评分
    this.setData({
      scoure: parseInt(e.currentTarget.dataset.index + 1)
    })
  },
  bindInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  getUserInfo(e) { //获取用户头像等信息
    let userInfo = e.detail.userInfo;
    if (!userInfo) return;
    $common.getUserInfo(userInfo, this.submit.bind(this));
  },
  submit() {
    if (!this.data.btnFalg) return; //阻止连点
    this.data.btnFalg = false;
    let input = this.data.input,
      scoure = this.data.scoure;
    if (scoure <= 0) {
      $common.showModal('请给该外教打分');
      return;
    }
    if (input.trim().length <= 0) {
      $common.showModal('请填写外教介绍');
      return;
    }
    $common.request(
      'POST',
      $common.config.GiveTeaAMark,
      {
        rew: {
          RewTeaId: this.data.RewTeaId,
          RewStuId: this.data.RewStuId,
          RewComment: input,
          RewScore: scoure
        }
      },
      (res) => {
        if (res.data.res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
          })
          setTimeout(() => {
            this.data.btnFalg = true;
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数错误');
              break;
            case 2:
              $common.showModal('提交失败');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
        setTimeout(() => {
          this.data.btnFalg = true;
        }, 1500);
      }
    )
  },

  onLoad: function (options) {
    let RewTeaId = options.RewTeaId ? options.RewTeaId : -1,
      RewStuId = options.RewStuId ? options.RewStuId : -1;
    this.setData({
      RewStuId: RewStuId,
      RewTeaId: RewTeaId
    })
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