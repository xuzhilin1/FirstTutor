// pages/New/OrdeRreview/index.js
Page({
  data: {
    pagesData: [],
  },
  getPagesData() {
    let arr = [{
      image: '../../images/ren_03.png',
      userName: 'Emily',
      time: '2018-02-12 12:00:25',
      context: '这个老师非常棒，英语口语纯正！'
    }, {
      image: '../../images/ren_03.png',
      userName: 'Emily',
      time: '2018-02-12 12:00:25',
      context: '这个老师非常棒，英语口语纯正！'
    }];
    this.setData({
      pagesData: arr
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