// pages/Home/activity/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    srcActivity: $common.srcActivity,
    pageIndex: 1,
    pageSize: 5,
    atyList: [],
  },
  activityDetail(e) {
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(); //获取用户信息及openid；
      return;
    }
    let index = e.currentTarget.dataset.index,
      atyList = this.data.atyList;
    wx.navigateTo({
      url: '../../New/activityDetail/index?isSign=' + 1 + '&atyId=' + atyList[index].AtyId,
    })
  },
  timeStamp(time) { //时间戳转换为日期
    time = time.replace("/Date(", '').replace(')/', '');
    let now = Date.parse(new Date());
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
    return {
      isEnd: time - now > 0 ? true : false, //true 活动未结束 false活动已结束
      time: `${y}-${m}-${d} ${h}:${f}`
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
  getOpenIdCallback() { //防止用户首页拒绝授权，在此授权后再次调用注册
    this.init();
    this.studentRegister();
  },
  init(isReach) {
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(this.getOpenIdCallback); //获取用户信息及openid；
      return;
    }
    isReach = isReach ? true : false;
    wx.showLoading({ title: '努力加载中...' });
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    $common.request(
      'POST',
      $common.config.GetAtyInfoList,
      {
        openId: wx.getStorageSync('openid'),
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      (res) => {
        if (res.data.res) {
          let atyList = isReach ? this.data.atyList : [];
          let data = res.data.atyList;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          for (let i = 0, len = data.length; i < len; i++) {
            data[i].showTime = this.timeStamp(data[i].AtyEndTime); //时间戳转换为时间
            atyList.push(data[i]);
          }
          let hash = {};
          let newArr = atyList.reduce(function (item, next) {//数组依据AtyId去重
            hash[next.AtyId] ? '' : hash[next.AtyId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            atyList: newArr,
            pageIndex: pageIndex
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
    this.init(true);
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
