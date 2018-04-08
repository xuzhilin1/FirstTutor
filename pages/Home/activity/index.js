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
    let index = e.currentTarget.dataset.index,
      atyList = this.data.atyList;
    wx.navigateTo({
      url: '../../New/activityDetail/index?isSign=' + 1 + '&atyId=' + atyList[index].AtyId,
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
    return `${y}-${m}-${d} ${h}:${f}`;
  },
  init(isReach) {
    isReach = isReach ? true : false;
    wx.showLoading({ title: '努力加载中...' });
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    $common.request(
      'POST',
      $common.config.GetAtyInfoList,
      {
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
            let str = data[i].AtyStartTime,
              str1 = str.replace("/Date(", ''),
              time = str1.replace(')/', '');
            data[i].showTime = this.timeStamp(time); //时间戳转换为时间
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