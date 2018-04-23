// pages/New/Online/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    isTeacher: false,// true 外教。 false 学生
    infoList: [],
    pageSize: 10,
    pageIndex: 1,
  },
  onlineChart(e) { //进入到聊天页面
    let index = e.currentTarget.dataset.index,
      infoList = this.data.infoList;
    let isTeacher = this.data.isTeacher;
    if (isTeacher) {
      wx.navigateTo({
        url: `../onlineChart/index?userId=${infoList[index].UserId}&isTeacher=true`,
      })
    } else {
      wx.navigateTo({
        url: `../onlineChart/index?userId=${infoList[index].UserId}`,
      })
    }
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
  removeDuplicate(thisArr, thisId) { //去重
    let hash = {};
    let newArr = thisArr.reduce(function (item, target, index) {
      hash[target[thisId]] ? item[hash[target[thisId]].nowIndex] = target : hash[target[thisId]] = {
        nowIndex: item.push(target) && index
      }
      return item;
    }, []);
    return newArr;
  },
  getPageList(isReach) { //获取页面数据
    isReach = isReach ? true : false;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    let infoList = isReach ? this.data.infoList : [];
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetChatMemRecord,
      {
        openId: wx.getStorageSync('openid'),
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.infoList;
          data.length >= pageSize && (pageIndex++);
          for (let i = 0, len = data.length; i < len; i++) {
            data[i].showTime = this.timeStamp(data[i].LastestTime);
            infoList.push(data[i]);
          }
          this.setData({
            infoList: this.removeDuplicate(infoList, 'UserId'),
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

      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },

  onLoad: function (options) {
    let isTeacher = options.isTeacher ? true : false;
    this.setData({
      isTeacher: isTeacher
    })
    if (isTeacher) { //外教，改标题为英文版
      wx.setNavigationBarTitle({
        title: 'Your Messages',
      })
    }
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPageList();
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
    this.getPageList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPageList(true);
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