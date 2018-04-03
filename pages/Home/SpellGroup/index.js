// pages/Home/SpellGroup/index.js
const $common = require('../../../utils/common.js');
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
    countDown: "00:00:00",
    leftTime: '30000000', //倒计时时间戳
  },
  countDown() { // 倒计时
    let leftTime = parseInt(this.data.leftTime);
    leftTime -= 1000;
    let day = parseInt(leftTime / 1000 / 60 / 60 / 24, 10), //计算剩余的天数 
      hour = parseInt(leftTime / 1000 / 60 / 60 % 24, 10), //计算剩余的小时 
      minute = parseInt(leftTime / 1000 / 60 % 60, 10),//计算剩余的分钟 
      second = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    day < 10 && (day = '0' + day);
    hour < 10 && (hour = '0' + hour);
    minute < 10 && (minute = '0' + minute);
    second < 10 && (second = '0' + second);
    setTimeout(() => {
      this.setData({
        countDown: `${hour}:${minute}:${second}`,
        leftTime: leftTime
      })
      if (leftTime <= 0) {
        this.setData({
          countDown: `00:00:00`,
        })
        return;
      }
      this.countDown();
    }, 1000);
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
    $common.request("GET", 'http://127.0.0.1:8081', null, (a, b, c) => {
      console.log(a, b, c);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.countDown();
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