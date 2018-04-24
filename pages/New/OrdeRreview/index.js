/**
 * 点评管理
 */
const $common = require('../../../utils/common.js');
Page({
  data: {
    pagesData: [],
    pageIndex: 1,
    pageSize: 5,
    rewList: [],
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
    isReach = isReach ? true : false;
    let teaId = wx.getStorageSync('teacherStatusInfo').teaId;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    let rewList = isReach ? this.data.rewList : [];//上拉加载push，下拉刷新，重新获取
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.GetAllRewAboutMe,
      {
        openId: wx.getStorageSync('openid'),
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.rewList;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          let translate = []; //翻译
          for (let i = 0, len = data.length; i < len; i++) {
            data[i].showTime = this.timeStamp(data[i].RewCreateOn);
            translate.push(data[i].RewComment);
          }
          // $common.translate(translate.join('\n'), (res) => { //调用翻译文本
          //   let trans_result = res.data.trans_result;
          //   if (trans_result && trans_result.length > 0) { //翻译成功了
          //     for (let i = 0, len = data.length; i < len; i++) {
          //       data[i].RewComment = trans_result[i].dst;
          //       rewList.push(data[i]);
          //     }
          //   } else {//没有返回东西，报错了,显示原文
          for (let i = 0, len = data.length; i < len; i++) {
            rewList.push(data[i]);
          }
          //   }
          let hash = {};
          let newArr = rewList.reduce(function (item, next) {//数组依据RewId去重
            hash[next.RewId] ? '' : hash[next.RewId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            rewList: newArr,
            pageIndex: pageIndex,
          })
          // });
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数错误');
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