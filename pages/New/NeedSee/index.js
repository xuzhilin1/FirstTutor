// pages/New/NeedSee/index.js
const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    lnList: [],
    pageIndex: 1,
    pageSize: 5,
    addressData: $static.areaShanghaiEn
  },
  seeDetail(e) { //立即沟通
    let index = e.currentTarget.dataset.index,
      lnList = this.data.lnList;
    wx.navigateTo({
      url: `../seeDetail/index?nedId=${lnList[index].NedId}`,
    })
  },
  init(isReach) {
    isReach = isReach ? true : false;
    let teaId = wx.getStorageSync('teacherStatusInfo').teaId;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    let lnList = isReach ? this.data.lnList : [];//上拉加载push，下拉刷新，重新获取
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.GetAllLearnNeeds,
      {
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.lnList;
          let addressData = this.data.addressData;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          for (let i = 0, len = data.length; i < len; i++) {
            switch (data[i].NedClaTime) {
              case 1:
                data[i].time = 'Morning';
                break;
              case 2:
                data[i].time = 'Afternoon1';
                break;
              case 3:
                data[i].time = 'Afternoon2';
                break;
              case 4:
                data[i].time = 'Evening';
                break;
            }
            switch (parseInt(data[i].NedCorAfw)) {
              case 1:
                data[i].week = 'Monday';
                break;
              case 2:
                data[i].week = 'Tuesday';
                break;
              case 3:
                data[i].week = 'Wednesday';
                break;
              case 4:
                data[i].week = 'Thursday';
                break;
              case 5:
                data[i].week = 'Friday';
                break;
              case 6:
                data[i].week = 'Saturday';
                break;
              case 7:
                data[i].week = 'Sunday';
                break;
            }
            for (let j = 0, l = addressData.length; j < l; j++) {
              if (addressData[j].id === data[i].NedClaArea) {
                data[i].address = addressData[j].area
              }
            }
            lnList.push(data[i]);
          }
          let hash = {};
          let newArr = lnList.reduce(function (item, next) {//数组依据NedId去重
            hash[next.NedId] ? '' : hash[next.NedId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            lnList: newArr,
            pageIndex: pageIndex,
          })
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数错误');
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