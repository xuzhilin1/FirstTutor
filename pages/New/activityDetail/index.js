// pages/New/activityDetail/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
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
    atyId: -1, //活动id
    atyInfo: {}, //页面信息
  },
  openLocation() { //查看地址所在位置
    $common.openLocation(this.data.latitude, this.data.longitude);
  },
  activitySign() {
    wx.navigateTo({
      url: '../../Home/activitySign/index?atyId=' + this.data.atyId,
    })
  },
  timeStamp(time) { //时间戳转换为日期
    let date = new Date(parseInt(time)),
      y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      f = date.getMinutes();
    m < 10 && (m = '0' + m);
    d < 10 && (d = '0' + d);
    h < 10 && (h = '0' + h);
    f < 10 && (f = '0' + f);
    return `${m}-${d} ${h}:${f}`;
  },
  init() {
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetAtyDesInfo,
      {
        atyId: this.data.atyId
      },
      (res) => {
        if (res.data.res) {
          let atyInfo = res.data.atyInfo;
          let Sstr = atyInfo.AtyStartTime,
            Sstr1 = Sstr.replace("/Date(", ''),
            Stime = Sstr1.replace(')/', '');
          atyInfo.startTime = this.timeStamp(Stime);
          let Estr = atyInfo.AtyEndTime,
            Estr1 = Estr.replace("/Date(", ''),
            Etime = Estr1.replace(')/', '');
          atyInfo.endTime = this.timeStamp(Etime);
          this.setData({
            atyInfo: atyInfo
          })
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数有误');
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
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let atyId;
    if (options.atyId) {
      atyId = options.atyId;
    }
    console.log(options);
    this.setData({
      isSign: parseInt(options.isSign),
      atyId: atyId
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