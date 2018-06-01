const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    srcForIdPhoto: $common.srcForIdPhoto,
    addressData: $static.areaShanghaiEn,
    input: '', //课程名/学生名
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
    pageIndexEn: 1,
    pageSizeEn: 10,
    pageListEn: [],
    stop: null,//函数防抖
    flage: true, //函数节流
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
  teacherInfo(e) { //跳转外教信息
    let index = e.currentTarget.dataset.index,
      listData = this.data.listData;
    wx.navigateTo({
      url: '../teachersInformation/index?data=' + listData[index].TeaId,
    })
  },
  bindInput(e) { //课程名称
    this.data.input = e.detail.value.trim();
    clearTimeout(this.data.stop);
    this.data.stop = setTimeout(() => {
      let isEn = this.data.isEn;
      if (isEn) {
        this.getListDataEn();
      } else {
        this.getListData();
      }
    }, 500);
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
    let isEn = this.data.isEn;
    if (isEn) {
      this.getListDataEn();
    } else {
      this.getListData();
    }
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
  getListData(isReach) { //获取找外教页面list
    let pageIndex = 1,
      pageSize = this.data.pageSize;
    isReach && (pageIndex = this.data.pageIndex);
    let timeIndex = +this.data.timeIndex,
      areaList = this.data.areaList,
      areaIndex = +this.data.areaIndex,
      tradList = this.data.tradList,
      tradIndex = +this.data.tradIndex,
      priceList = this.data.priceList,
      priceIndex = this.data.priceIndex,
      input = this.data.input;
    let timeCla = timeIndex === 0 ? -1 : timeIndex, //时间段（1-4）
      areaId = areaIndex === 0 ? -1 : areaList[areaIndex].id, // 区域ID（1-16）
      taAreaId = tradIndex === 0 ? -1 : tradList[tradIndex].TaArea, //商圈区域ID（1-16）
      minPrice = priceList[0][priceIndex[0]], //价格区间
      maxPrice = priceList[1][priceIndex[1]],
      corName = input ? input : null; //课程名
    if (minPrice == 0 && maxPrice == 0) {
      maxPrice = -1;
      minPrice = -1;
    }
    wx.showLoading({ title: '努力加载中...' });
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
          let listData = [];
          isReach && (listData = this.data.listData);
          for (let i = 0, len = data.length; i < len; i++) {
            listData.push(data[i]);
          }
          let hash = {};
          let newArr = listData.reduce(function (item, next) {//数组依据TeaId去重
            hash[next.TeaId] ? '' : hash[next.TeaId] = true && item.push(next);
            return item
          }, []);
          data.length >= pageSize && (this.data.pageIndex++);
          this.setData({
            listData: newArr,
          })
        } else {
          $common.showModal('未知错误，请稍后重试');
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        this.data.flage = true;
        wx.hideLoading();
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
  getIsVip(callback) {//获取外教是否为vip
    $common.request(
      "POST",
      $common.config.GetForTeaStatus,
      { openId: wx.getStorageSync('openid') },
      (res) => {
        if (res.data.res) {
          let teaToe = res.data.teaToe === 1 ? true : false; //1审核通过
          this.setData({
            teaToe: teaToe
          });
          callback();
        }
      },
      (res) => { },
      (res) => {
      }
    );
  },
  getListDataEn(isReach) { //获取找学生页面list
    if (!this.data.teaToe) return; //该外教审核不通过
    let pageIndexEn = 1,
      pageSizeEn = this.data.pageSizeEn;
    isReach && (pageIndexEn = this.data.pageIndexEn);
    wx.showLoading({ title: 'Loading...' });
    $common.request(
      "POST",
      $common.config.GetAllLearnNeeds,
      {
        pageIndex: pageIndexEn,
        pageSize: pageSizeEn,
        searchKey: this.data.input
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.lnList;
          let addressData = this.data.addressData;
          let pageListEn = [];
          isReach && (pageListEn = this.data.pageListEn);
          for (let i = 0, len = data.length; i < len; i++) {
            switch (data[i].NedClaTime) {
              case 1:
                data[i].time = 'AM';
                break;
              case 2:
                data[i].time = 'PM1';
                break;
              case 3:
                data[i].time = 'PM2';
                break;
              case 4:
                data[i].time = 'PM3';
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
                data[i].address = addressData[j].area;
              }
            }
            pageListEn.push(data[i]);
          }
          let hash = {};
          let newArr = pageListEn.reduce(function (item, next) {//数组依据NedId去重
            hash[next.NedId] ? '' : hash[next.NedId] = true && item.push(next);
            return item
          }, []);
          data.length >= pageSizeEn && (this.data.pageIndexEn++);
          this.setData({
            pageListEn: newArr,
          })
        } else {
          $common.showModal('Unknown Error', false, false, 'OK', 'Prompt');
        }
      },
      (res) => {
        $common.showModal('Unknown Error', false, false, 'OK', 'Prompt');
      },
      (res) => {
        this.data.flage = true;
        wx.hideLoading();
      }
    )
  },
  seeDetail(e) { //立即沟通详情
    let index = e.currentTarget.dataset.index,
      lnList = this.data.pageListEn;
    wx.navigateTo({
      url: `/pages/New/seeDetail/index?nedId=${lnList[index].NedId}`,
    })
  },
  onlineChart(e) { //立即沟通
    let index = e.currentTarget.dataset.index,
      lnList = this.data.pageListEn,
      userId = lnList[index].StuUserId;
    wx.navigateTo({
      url: `../../New/onlineChart/index?userId=${userId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initArea();
    this.initPriceInterval();
  },
  onReady: function () {

  },
  isEnEvent(res) { //判断当前显示中英文
    let isEn = wx.getStorageSync('isEn');
    this.setData({
      isEn: isEn
    });
    if (isEn) { //找学生
      wx.setNavigationBarTitle({
        title: 'Find Student'
      })
      this.getIsVip(this.getListDataEn);
    } else { //找外教
      wx.setNavigationBarTitle({
        title: '找外教'
      })
      this.getListData();
    }
  },
  onShow: function () {
    this.data.pageIndex = 1;
    this.data.pageIndexEn = 1;
    this.isEnEvent();
    this.getTradData();
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
    wx.stopPullDownRefresh();
    let isEn = this.data.isEn;
    if (isEn) { //找学生
      this.data.pageIndexEn = 1;
      this.getListDataEn();
    } else { //找外教
      this.setData({
        input: '',
        areaIndex: 0,
        tradIndex: 0,
        timeIndex: 0,
        priceIndex: [0, 0],
        isPriceAll: true
      })
      this.getTradData();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.flage) return;
    this.data.flage = false;
    let isEn = this.data.isEn;
    if (isEn) { //找学生
      this.getListDataEn(true);
    } else { //找外教
      this.getListData(true);
    }
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
