const $common = require('../../../utils/common.js');
Page({
  data: {
    isEn: false, //显示中英文
    srcForIdPhoto: $common.srcForIdPhoto,
    srcActivity: $common.srcActivity,
    srcBanner: $common.srcBanner,
    banList: [],
    activity: {},
    pageIndex: 1, // 第几页
    pageSize: 10, // 本页面默认给十条
    listData: [],
    listenCallbackNum: 0, //本页面三个接口，监听请求全部完成
  },
  getBannerData() { //获取轮播图数据
    $common.request(
      "POST",
      $common.config.GetBannerImgs,
      null,
      function (res) {
        if (res.data.res) {
          let banList = res.data.banList;
          this.setData({
            banList: banList
          })
        } else {
          // $common.showModal('未知错误，请稍后重试');
        }
      }.bind(this),
      function (res) {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      function (res) {
        this.addListenCallbackNum();
        this.stopModal();
      }.bind(this)
    );
  },
  getActivity() { //获取最新活动
    $common.request(
      "POST",
      $common.config.GetLastestAtyInfo,
      null,
      function (res) {
        if (res.data.res) {
          this.setData({
            activity: res.data.activity
          })
        } else {
          // $common.showModal('未知错误，请稍后重试');
        }
      }.bind(this),
      (res) => {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      function (res) {
        this.addListenCallbackNum();
        this.stopModal();
      }.bind(this)
    );
  },
  getListData(isReach, callback) { //推荐外教
    isReach = isReach ? true : false;
    callback = typeof callback === 'function' ? callback : function () { };
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    $common.request(
      "POST",
      $common.config.GetRecomForTeas,
      {
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          let pageIndex = parseInt(this.data.pageIndex),
            pageSize = parseInt(this.data.pageSize);
          let data = res.data.teaList;
          if (data.length >= pageSize) { //获取的数据个数等于请求的数据的个数，下标累加
            pageIndex++;
          }
          let listData = isReach ? this.data.listData : [];
          for (let i = 0, len = data.length; i < len; i++) {
            listData.push(data[i]);
          }
          let hash = {};
          let newArr = listData.reduce(function (item, next) {//数组依据TeaId去重
            hash[next.TeaId] ? '' : hash[next.TeaId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            pageIndex: pageIndex,
            listData: newArr
          })
        } else {
          // $common.showModal('未知错误，请稍后重试');
        }
      },
      (res) => {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        this.addListenCallbackNum();
        this.stopModal();
        callback();
      }
    );
  },
  teacherInfo(e) { //跳转外教信息
    let index = e.currentTarget.dataset.index,
      listData = this.data.listData;
    wx.navigateTo({
      url: '../teachersInformation/index?data=' + listData[index].TeaId,
    })
  },
  activityDetail() { //跳转到活动详情
    let AtyId = this.data.activity.AtyId;
    if (!AtyId) return;
    wx.navigateTo({
      url: '../../New/activityDetail/index?isSign=1&atyId=' + AtyId,
    })
  },
  init() { //进入页面初始化
    let isEn = wx.getStorageSync('isEn');
    let text = "";
    if (isEn) {
      text = 'Loading...';
    } else {
      text = '努力加载中...';
    }
    wx.showLoading({ title: text });
    this.getBannerData();
    this.getActivity();
    this.getListData();
  },
  getOpenId() { //获取openid
    let openid = wx.getStorageSync('openid');
    if (!openid) {
      $common.getOpenid($common.studentRegister); //获取用户信息及openid；
    } else {
      $common.studentRegister();
    }
  },
  addListenCallbackNum() {
    let num = parseInt(this.data.listenCallbackNum);
    num++;
    this.setData({
      listenCallbackNum: num
    })
  },
  stopModal() { //停止页面的各种加载状态
    let num = parseInt(this.data.listenCallbackNum);
    if (num >= 3) { //本页面有三个接口
      wx.hideLoading();
      this.setData({
        listenCallbackNum: 0
      })
    }
  },
  onLoad(options) {
    this.init();
    this.getOpenId();
  },
  onReady() {

  },
  isEnEvent(res) { //判断当前显示中英文
    this.setData({
      isEn: wx.getStorageSync('isEn')
    })
  },
  onShow: function () {
    this.isEnEvent();
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
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
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
