// pages/Home/SpellGroup/index.js
Page({
  data: {
    courseName: '口语一对二',
    price: '200',
    groupNum: 2,
    partakeNum: 6,
    courseTime: 2,
    courseInterval: '9:00-11:00',
    address: '上海市浦东新区张衡路666弄2号楼201室',
    phone: '13501875412',
    userName: 'Emily',
    image: '../../images/ren_03.png',
    userList: ['英式发音', '喜欢旅游', '明星老师'],
    isVip: true,
    country: '../../images/guan_03.png',
    listq: 3,
    buyInfo: [{
      name: '黄涛',
      phone: 13505145873,
      image: '../../images/ceshi_03.jpg'
    }, {
      name: '刘先进',
      phone: 13505145873,
      image: '../../images/ceshi_03.jpg'
    }],

  },
  goHome() { //返回首页
    wx.switchTab({
      url: '../Home/index',
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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