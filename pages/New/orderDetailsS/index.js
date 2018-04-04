// 学生查看订单详情
const $common = require('../../../utils/common.js');
Page({
  data: {
    isGroup: 0, //1 拼团 0 !拼团,
    userNameT: 'Emily',
    imageT: '../../images/ren_03.png',
    userList: ['英式发音', '喜欢旅游', '明星老师'],
    isVip: true,
    listq: 4.5,
    pagesData: {
      courseName: '口语一对一',
      buyNum: 5,
      price: "200",
      groupNum: 2,
      buyInfo: [{
        name: '黄涛',
        phone: 13505145873,
        image: '../../images/ceshi_03.jpg'
      }, {
        name: '刘先进',
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
  init() {
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.LookUpFigroupInfo,
      {
        cogId: this.data.cogId,
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let course = res.data.course;
          switch (course.CorLenOfCla) {
            case 1:
              course.courseTimeLong = 1;
              break;
            case 2:
              course.courseTimeLong = 1.5;
              break;
            case 3:
              course.courseTimeLong = 2;
              break;
          }
          let cog = res.data.cog;
          this.setData({
            course: course,
            teacher: res.data.teacher,
            cog: cog,
            mem: res.data.mem,
          });
        } else {
          switch (res.errType) {
            case 1:
              $common.showModal('参数错误');
              break;
            case 2:
              $common.showModal('未知错误');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        console.log(res);
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      cogId: options.cogId
    })
    this.init();
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
    this.init();
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