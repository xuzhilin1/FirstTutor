// pages/New/Online/index.js
Page({

  data: {
    pagesData: [],
  },
  getPagesData() {
    let arr = [{
      userName: 'Emily',
      image: '../../images/ren_03.png',
      time: '2018-02-12',
      status: true,
    }, {
      userName: 'Emily',
      image: '../../images/ren_03.png',
      time: '2018-02-12',
      status: false,
    }];
    this.setData({
      pagesData: arr
    })
  },
  onLoad: function (options) {

  },

  onReady: function () {
    this.getPagesData();
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