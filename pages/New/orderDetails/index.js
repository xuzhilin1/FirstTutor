// 外教查看订单详情
Page({
  data: {
    isGroup: 0, //1 拼团 0 !拼团,
    pagesData: {
      courseName: '口语一对一',
      buyNum: 5,
      price: "200",
      groupNum: 2,
      buyInfo: [{
        name: '张忠祥',
        phone: 13505145873,
        image: '../../images/ceshi_03.jpg'
      }, {
        name: '黄涛',
        phone: 13505145873,
        image: '../../images/ceshi_03.jpg'
      }],
      address: '上海市浦东新区张衡路666弄2号楼201室',
      orderCode: 456465434,
      orderTime: '2017-08-17 12:25:21',
      orderPayment: '2017-08-17 12:25:21',
      groupCode: 465746131,
      groupStartTime: '2017-08-17 12:25:21',
      groupEndTime: '2017-08-17 12:25:21',
      courseInterval: '周一/上午',
      courseTime: 2,
      courseDate: '9:00-11:00',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isGroup) {
      this.setData({
        isGroup: parseInt(options.isGroup)
      })
    }
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