const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    input: '',
    listData: [],
    areaList: $static.areaShanghai,
    areaIndex: -1,
    courseTypeList: ['一对一', '一对二', '一对三'],
    courseTypeIndex: -1,
    timeList: ['上午', '下午1', '下午2', '晚上'],
    timeIndex: -1,
    priceList: [
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    ],
    priceIndex: [-1, -1],
  },

  getListData() {
    let arr = [{
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      listq: 3,
    }, {
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      listq: 4.5
    }, {
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      listq: 4.5
    }];
    this.setData({
      listData: arr
    })
  },
  teacherInfo(e) { //跳转外教信息
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../teachersInformation/index',
    })
  },
  bindInput(e) { //课程名称
    this.setData({
      input: e.detail.value
    })
  },
  bindAreaChange(e) { //区域
    this.setData({
      areaIndex: parseInt(e.detail.value)
    })
  },
  bindCourseType(e) { //商圈
    this.setData({
      courseTypeIndex: parseInt(e.detail.value)
    })
  },
  bindTimeChange(e) { //时间段
    this.setData({
      timeIndex: parseInt(e.detail.value)
    })
  },
  bindPriceChange(e) { //价格区间
    this.setData({
      priceIndex: e.detail.value
    })
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
    this.getListData();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})