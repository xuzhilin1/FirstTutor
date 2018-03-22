// pages/Home/Success/index.js
const app = getApp();
Page({
  data: {
    contentText: '',
    status: 0,
  },
  init() {
    let status = this.data.status;
    let titleText = '',
      contentText = '';
    switch (status) {
      case 0: //外教资格申请
        titleText = '申请FirstTutor外教资格';
        contentText = '您已成功提交申请，请等待审核';
        break;
      case 1: //活动报名
        titleText = '活动报名成功';
        contentText = '恭喜您报名成功！';
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
    });
    this.setData({
      contentText: contentText
    })
  },
  goHome() { //返回首页
    wx.switchTab({
      url: '../Home/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: parseInt(options.status)
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