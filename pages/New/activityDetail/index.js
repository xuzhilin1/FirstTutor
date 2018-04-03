// pages/New/activityDetail/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    // imgUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    status: 0, //1 活动已结束 0 活动未结束
    isSign: 0, // 1 立即报名活动 0 我的活动查看
    image: '../../images/DE_03.jpg',
    context: '从零开始学英语，听说读写，全面升级',
    presonNum: "infinity",
    enrollNum: 100,
    startTime: '12-26 17:00',
    endTime: '12-26 20:00',
    address: '上海市浦东新区张衡路666号',
    introduce: [{
      title: '适应对象',
      list: ['1、英语基础薄弱，几乎零基础的学习者',
        '2、多年不碰英语，希望重拾英语的学习者',
        '3、希望以一种轻松的方法掌握英语的学习者。']
    }, {
      title: '适应对象',
      list: ['1、英语基础薄弱，几乎零基础的学习者',
        '2、多年不碰英语，希望重拾英语的学习者',
        '3、希望以一种轻松的方法掌握英语的学习者。']
    }],
    latitude: 31.22114,
    longitude: 121.54409,
  },
  openLocation() { //查看地址所在位置
    $common.openLocation(this.data.latitude, this.data.longitude);
  },
  activitySign() {
    wx.navigateTo({
      url: '../../Home/activitySign/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isSign: parseInt(options.isSign)
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