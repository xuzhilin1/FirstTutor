const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    input: '', //课程名
    listData: [],
    areaList: $static.areaShanghai,
    areaIndex: -1,
    tradList: [], //商圈
    tradIndex: -1,
    timeList: ['上午', '下午1', '下午2', '晚上'], //时间段
    timeIndex: -1,
    modalArr: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], //价格区间模板数组
    priceList: [], //价格区间
    priceIndex: [-1, -1],
    pageIndex: 1, //分页
    pageSize: 10, //每页多少数据
  },
  teacherInfo(e) { //跳转外教信息
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(); //获取用户信息及openid；
      return;
    }
    let index = e.currentTarget.dataset.index,
      listData = this.data.listData;
    wx.navigateTo({
      url: '../teachersInformation/index?data=' + listData[index].TeaId,
    })
  },
  bindInput(e) { //课程名称
    this.setData({
      input: e.detail.value.trim()
    })
    this.getListData();
  },
  bindAreaChange(e) { //区域
    this.setData({
      areaIndex: parseInt(e.detail.value)
    });
    this.getListData();
  },
  bindCourseType(e) { //商圈
    this.setData({
      tradIndex: parseInt(e.detail.value)
    })
    this.getListData();
  },
  bindTimeChange(e) { //时间段
    this.setData({
      timeIndex: parseInt(e.detail.value)
    });
    this.getListData();
  },
  bindPriceChange(e) { //价格区间
    let value = e.detail.value;
    if (Number(value[0]) >= Number(value[1])) {
      $common.showModal('请选择正确的价格区间');
      return;
    }
    this.setData({
      priceIndex: e.detail.value
    });
    this.getListData();
  },
  searchClick() { //点击搜索
    this.getListData();
  },
  getTradData() { //获取商圈信息
    $common.request(
      "POST",
      $common.config.GetTradingAreaInfos,
      null,
      (res) => {
        if (res.data.res) {
          this.setData({
            tradList: res.data.taList
          })
        }
      }
    );
  },
  getListData(isRefresh) { //获取页面list
    isRefresh = isRefresh ? true : false;
    wx.showLoading({ title: '努力加载中...' });
    let pageIndex = this.data.pageIndex,
      pageSize = this.data.pageSize;
    $common.request(
      "POST",
      $common.config.FindForeignTea,
      {
        areaId: this.data.areaIndex === -1 ? -1 : this.data.areaList[this.data.areaIndex].id, // 区域ID（1-16）
        taAreaId: this.data.tradIndex === -1 ? -1 : this.data.tradList[this.data.tradIndex].TaId, //商圈区域ID（1-16）
        timeCla: this.data.timeIndex === -1 ? -1 : parseInt(this.data.timeIndex) + 1, //时间段（1-4）
        minPrice: this.data.priceIndex[0] == -1 ? -1 : this.data.priceList[0][this.data.priceIndex[0]], //价格区间
        maxPrice: this.data.priceIndex[0] == -1 ? -1 : this.data.priceList[1][this.data.priceIndex[1]],
        corName: this.data.input ? this.data.input : null, //课程名
        pageIndex: pageIndex, //分页
        pageSize: pageSize, //每页个数
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.teaList;
          if (data.length >= pageSize) { //后续有数据，下标累加
            pageIndex++;
          }
          let listData = isRefresh ? this.data.listData : []; //上拉加载push，否则重新 开始
          for (let i = 0, len = data.length; i < len; i++) {
            listData.push(data[i]);
          }
          let hash = {};
          let newArr = listData.reduce(function (item, next) {//数组依据TeaId去重
            hash[next.TeaId] ? '' : hash[next.TeaId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            listData: newArr,
            pageIndex: pageIndex,
          })
        } else {
          $common.showModal('未知错误，请稍后重试');
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      },
    )
  },
  initPriceInterval() { //初始化价格区间
    let modalArr = this.data.modalArr,
      arr1 = [],
      arr2 = [];
    for (let i = 0, len = modalArr.length; i < len; i++) {
      arr1.push(modalArr[i]);
      arr2.push(modalArr[i]);
    }
    this.setData({
      priceList: [arr1, arr2],
      priceIndex: [-1, -1],
    })
  },
  init() {
    this.getTradData();
    this.getListData();
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
    this.init();
    this.initPriceInterval();
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
    this.setData({
      pageIndex: 1,
      input: '',
      areaIndex: -1,
      tradIndex: -1,
      timeIndex: -1,
    })
    this.initPriceInterval();
    this.getTradData();
    this.getListData(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getListData();
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