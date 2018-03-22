// pages/Home/activity/index.js
Page({
  data: {
    pagesData: [],
  },
  getPagesData() {
    let arr = [{
      image: '../../images/DE_03.jpg',
      context: '十名外教，集体讲课，带你从头开始学英语！',
      address: '上海',
      time: '2018-03-25 12:00'
    }, {
      image: '../../images/DE_03.jpg',
      context: '十名外教，集体讲课，带你从头开始学英语！',
      address: '上海',
      time: '2018-03-25 12:00'
    }];
    this.setData({
      pagesData: arr
    })
  },
  activityDetail(e) {
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../../New/activityDetail/index?isSign=1',
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