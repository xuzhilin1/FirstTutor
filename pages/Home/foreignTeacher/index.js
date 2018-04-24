const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    srcForIdPhoto: $common.srcForIdPhoto,
    input: '', //课程名
    listData: [],
    areaList: [], //区域
    areaIndex: 0,
    isArea: false, //初始化只显示默认文本
    tradList: [], //商圈
    tradIndex: 0,
    isTrad: false,
    timeList: ['所有时间段', '上午', '下午1', '下午2', '晚上'], //时间段
    timeIndex: 0,
    isTime: false,
    modalArr: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], //价格区间模板数组
    priceList: [], //价格区间
    priceIndex: [0, 0],
    isPrice: false,
    isPriceAll: false,
    pageIndex: 1, //分页
    pageSize: 10, //每页多少数据
  },
  initArea() { //初始化区域
    let data = [{
      id: 0,
      area: '所有区域',
    }];
    let address = $static.areaShanghai;
    for (let i = 0, len = address.length; i < len; i++) {
      data.push(address[i]);
    }
    this.setData({
      areaList: data
    })
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
  teacherInfo(e) { //跳转外教信息
    let openid = wx.getStorageSync('openid');
    if (openid === null || openid === '') {
      $common.getOpenid(this.studentRegister); //防止用户首页拒绝授权，本页面再次注册
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
      areaIndex: parseInt(e.detail.value),
      isArea: true
    });
    this.getListData();
  },
  bindCourseType(e) { //商圈
    this.setData({
      tradIndex: parseInt(e.detail.value),
      isTrad: true
    })
    this.getListData();
  },
  bindTimeChange(e) { //时间段
    this.setData({
      timeIndex: parseInt(e.detail.value),
      isTime: true
    });
    this.getListData();
  },
  bindPriceChange(e) { //价格区间
    let value = e.detail.value;
    let isPriceAll = false;
    let min = Number(value[0]),
      max = Number(value[1]);
    if (min === 0 && max === 0) {
      isPriceAll = true;
    } else if (min >= max) {
      $common.showModal('请选择正确的价格区间');
      return;
    }
    this.setData({
      priceIndex: [min, max],
      isPrice: true,
      isPriceAll: isPriceAll
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
          let data = res.data.taList;
          data.unshift({
            TaId: 0,
            TaName: '所有商圈'
          })
          this.setData({
            tradList: data
          })
        }
      }
    );
  },
  getListData(isRefresh) { //获取页面list
    isRefresh = isRefresh ? true : false; //true 上拉， false重新加载
    wx.showLoading({ title: '努力加载中...' });
    let pageIndex = isRefresh ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    let timeCla = this.data.timeIndex === 0 ? -1 : parseInt(this.data.timeIndex), //时间段（1-4）
      areaId = this.data.areaIndex === 0 ? -1 : this.data.areaList[this.data.areaIndex].id, // 区域ID（1-16）
      taAreaId = this.data.tradIndex === 0 ? -1 : this.data.tradList[this.data.tradIndex].TaId, //商圈区域ID（1-16）
      minPrice = this.data.priceList[0][this.data.priceIndex[0]], //价格区间
      maxPrice = this.data.priceList[1][this.data.priceIndex[1]],
      corName = this.data.input ? this.data.input : null; //课程名
    if (minPrice == 0 && maxPrice == 0) {
      maxPrice = -1;
      minPrice = -1;
    }
    $common.request(
      "POST",
      $common.config.FindForeignTea,
      {
        areaId: areaId,
        taAreaId: taAreaId,
        timeCla: timeCla,
        minPrice: minPrice,
        maxPrice: maxPrice,
        corName: corName,
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
    this.initArea();
    this.initPriceInterval();
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
    this.setData({
      input: '',
      areaIndex: 0,
      tradIndex: 0,
      timeIndex: 0,
      priceIndex: [0, 0],
      isPriceAll: true
    })
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getListData(true);
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
