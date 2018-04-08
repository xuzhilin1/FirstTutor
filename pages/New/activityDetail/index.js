// pages/New/activityDetail/index.js
const $common = require('../../../utils/common.js');
const WxParse = require('../../../wxParse/wxParse.js'); //字符串转换为微信页面
Page({
  data: {
    status: 0, //1 活动已结束 0 活动未结束
    isSign: 0, // 1 立即报名活动 0 我的活动查看
    srcActivity: $common.srcActivity,
    srcActivityVideo: $common.srcActivityVideo,
    latitude: 31.22114,
    longitude: 121.54409,
    atyId: -1, //活动id
    atyInfo: {}, //页面信息
    atyImgs: [], //轮播图
    alreadySignUp: 0, //是否已经报名 0 否，大于0 是
  },
  openLocation() { //查看地址所在位置
    $common.openLocation(this.data.latitude, this.data.longitude);
  },
  activitySign() {
    let alreadySignUp = this.data.alreadySignUp;
    if (alreadySignUp > 0) return;
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
  judgeOld(time) { //判断活动是否过期
    let Sstr1 = time.replace("/Date(", ''),
      Stime = Sstr1.replace(')/', '');
    let timestamp = Date.parse(new Date());
    let status = Stime - timestamp > 0 ? 0 : 1;
    return status;
  },
  init() {
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetAtyDesInfo,
      {
        atyId: this.data.atyId,
        openId: wx.getStorageSync('openid')
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
          WxParse.wxParse('article', 'html', atyInfo.AtyDescript, this, 5);
          let status = this.judgeOld(atyInfo.AtyEndTime);
          this.setData({
            atyInfo: atyInfo,
            atyImgs: res.data.atyImgs,
            status: status,
            alreadySignUp: res.data.alreadySignUp
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