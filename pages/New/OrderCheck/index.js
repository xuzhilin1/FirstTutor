// pages/New/OrderCheck/index.js
Page({
  data: {
    userType: 2, // 1 学生 2 导师
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
    //学生列表
    SPagesData: [{
      isGroup: true,
      name: '口语一对二',
      price: '150',
      actualPrice: '150.00',
      groupNum: 2,
      PaymentNum: 6,
      num: '一对二',
      status: '拼团中，还差1人成团',
    }, {
      isGroup: false,
      name: '口语一对一',
      price: '200',
      actualPrice: '200.00',
      groupNum: 2,
      PaymentNum: 6,
      num: '一对一',
      status: '已支付',
    }],
  },
  orderDetail(e) {  // 看详情
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../orderDetails/index',
    })
  },
  init() {
    // let userType = parseInt(wx.getStorageSync('userType'));
    let userType = 1;
    this.setData({
      userType: userType
    })
    let context = '';
    if (userType === 2) { //导师
      context = '订单查看';
    } else {
      context = '我的订单';
    }
    wx.setNavigationBarTitle({
      title: context
    })
  },

  onLoad: function (options) {

  },
  onReady: function () {
    this.init();
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