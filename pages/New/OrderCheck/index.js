// pages/New/OrderCheck/index.js
const $common = require('../../../utils/common.js');
const $translate = require('../../../utils/translate.js');
Page({
  data: {
    cogList: [],
    pageIndex: 1,
    pageSize: 5,
  },
  orderDetail(e) {  // 看详情
    let index = e.currentTarget.dataset.index,
      cogList = this.data.cogList;
    wx.navigateTo({
      url: `/pages/New/orderDetails/index?cogId=${cogList[index].FgtId}`,
    })
  },
  timeStamp(time) { //时间戳转换为日期
    time = time.replace("/Date(", '').replace(')/', '');
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
    return `${y}-${m}-${d} ${h}:${f}`;
  },
  init(isReach) {
    let openid = wx.getStorageSync('openid');
    if (!openid) {
      $common.getOpenid(this.init.bind(this, isReach));
      return;
    }
    isReach = isReach ? true : false;
    let teaId = wx.getStorageSync('teacherStatusInfo').teaId;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    let cogList = isReach ? this.data.cogList : [];//上拉加载push，下拉刷新，重新获取
    wx.showLoading({ title: 'Loading...' });
    $common.request(
      "POST",
      $common.config.GetTeaCogInfoList,
      {
        openId: wx.getStorageSync('openid'),
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.cogList;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          for (let i = 0, len = data.length; i < len; i++) {
            let whatNum = '';
            switch (data[i].CorType) {
              case 1:
                whatNum = 'One';
                break;
              case 2:
                whatNum = 'Two';
                break;
              case 3:
                whatNum = 'Three';
                break;
            }
            data[i].week = $translate.translateWeekEn(data[i].ClaStudyTime);
            data[i].whatNum = whatNum;
            data[i].courseBuyTime = this.timeStamp(data[i].OdrBuyDate);
            data[i].openTime = this.timeStamp(data[i].FgtOpenTime);
            cogList.push(data[i]);
          }
          let hash = {};
          let newArr = cogList.reduce(function (item, next) {//数组依据FgtId去重
            hash[next.FgtId] ? '' : hash[next.FgtId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            cogList: newArr,
            pageIndex: pageIndex,
          })
        } else {
          $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
        }
      },
      (res) => {
        $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  onLoad: function (options) {
    let pageType = options.userType && parseInt(options.userType) === 2 ? true : false;
    if (pageType) { //页面由模板消息进入，身份必须为外教
      wx.setStorageSync('isEn', true);
    }
    this.init();
  },
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