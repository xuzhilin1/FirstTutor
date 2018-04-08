// pages/New/NeedSee/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    pagesData: [{
      name: '英语口语一对一',
      address: '长宁',
      week: '周一',
      time: '上午',
      browse: 20,
      minPrice: '100',
      maxPrice: '200',
      type: true,
    }, {
      name: '英语口语一对一',
      address: '长宁',
      week: '周一',
      time: '上午',
      browse: 20,
      minPrice: '100',
      maxPrice: '200',
      type: false
    }],
    pageIndex: 1,
    pageSize: 5,
    LnList: [],
  },
  seeDetail(e) { //修改需求
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../seeDetailS/index',
    })
  },
  bindDelete(e) { //删除
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    $common.showModal('确定删除?', true, (res) => {
      if (res.confirm) {
        pagesData.splice(index, 1);
        this.setData({
          pagesData: pagesData
        })
      }
    });
  },
  seeDetailS() { //发布需求
    wx.navigateTo({
      url: '../seeDetailS/index',
    })
  },
  init(isReach) {
    isReach = isReach ? true : false;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetMyLearnNeeds,
      {
        openId: wx.getStorageSync('openid'),
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      (res) => {
        if (res.data.res) {
          let LnList = isReach ? this.data.LnList : [];
          let data = res.data.LnList;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          for (let i = 0, len = data.length; i < len; i++) {
            LnList.push(data[i]);
          }
          // let hash = {};
          // let newArr = LnList.reduce(function (item, next) {//数组依据FgtId去重
          //   hash[next.FgtId] ? '' : hash[next.FgtId] = true && item.push(next);
          //   return item
          // }, []);
          this.setData({
            infoList: LnList,
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
        console.log(res);
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.init();
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