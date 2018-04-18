const $common = require('../../../utils/common.js');
Page({
  data: {
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
  lookYouImage(e) { //查看头像
    let index = e.currentTarget.dataset.index;
    let listData = this.data.listData;
    let srcForIdPhoto = this.data.srcForIdPhoto;
    let image = listData[index].TeaIDPhoto ? srcForIdPhoto + listData[index].TeaIDPhoto : listData[index].TeaAvaUrl;
    wx.previewImage({
      urls: [image],
    })
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
          $common.showModal('未知错误，请稍后重试');
        }
      }.bind(this),
      function (res) {
        $common.showModal('亲~网络不给力哦，请稍后重试');
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
          $common.showModal('未知错误，请稍后重试');
        }
      }.bind(this),
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
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
          $common.showModal('未知错误，请稍后重试');
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        this.addListenCallbackNum();
        this.stopModal();
        callback();
      }
    );
  },
  teacherInfo(e) { //跳转外教信息
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(null, this.studentRegister); //获取用户信息及openid；
      return;
    }
    let index = e.currentTarget.dataset.index,
      listData = this.data.listData;
    wx.navigateTo({
      url: '../teachersInformation/index?data=' + listData[index].TeaId,
    })
  },
  activityDetail() { //跳转到活动详情
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(); //获取用户信息及openid；
      return;
    }
    let AtyId = this.data.activity.AtyId;
    if (!AtyId) return;
    wx.navigateTo({
      url: '../../New/activityDetail/index?isSign=1&atyId=' + AtyId,
    })
  },
  init() { //进入页面初始化
    wx.showLoading({ title: '努力加载中...' });
    this.getBannerData();
    this.getActivity();
    this.getListData();
  },
  getOpenId() { //获取openid
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(null, this.studentRegister); //获取用户信息及openid；
      return;
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
      wx.stopPullDownRefresh();
      this.setData({
        listenCallbackNum: 0
      })
    }
  },
  studentRegister() { //学生注册
    $common.request(
      "POST",
      $common.config.RisStudent,
      {
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          switch (res.data.rtnType) {
            case 1:
              //注册成功
              break;
            case 2:
              //改账号被禁用,无法访问程序,
              break;
            case 3:
              //账户正常
              break;
          }
        } else {
          switch (res.data.errType) {
            case 1:
              //发生异常
              break;
            case 2:
              //openId错误
              break;
            case 3:
              //未知错误
              break;
          }
        }
      },
    );
  },
  onLoad(options) {
    this.init();
    this.getOpenId();
  },
  onReady() {

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
  onReachBottom: function (res) {
    // wx.showLoading({ title: '努力加载中...' });
    // this.getListData(true, () => {
    //   wx.hideLoading();
    // });
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