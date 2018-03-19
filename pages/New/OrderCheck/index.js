// pages/New/OrderCheck/index.js
Page({
  data: {
    pagesData: [{
      name: '口语一对多',
      isGroup: true,
      paymentTime: '2017-08-06 13:31',
      groupTime: '2017-08-06 13:31',
      price: '200',
      courseTime: '周二上午/9:00-11:00',
      PaymentNum: 5,
      groupNum: 2,
    }, {
      name: '口语一对一',
      isGroup: false,
      paymentTime: '2017-08-06 13:31',
      groupTime: '2017-08-06 13:31',
      price: '200',
      courseTime: '周二上午/9:00-11:00',
      PaymentNum: 5,
      groupNum: 2,
    }],
  },
  orderDetail(e) {  // 看详情
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../orderDetails/index',
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