const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    areaList: $static.areaShanghai,
    areaIndex: 0,
    weekList: ['一', '二', '三', '四', '五', '六', '日'],
    weekIndex: 0,
    timeList: ['上午', '下午', '晚上'],
    timeIndex: 0,
    pariceList: [
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    ],
    priceIndex: [1, 2],
    address: '',
    course: '',
    other: '',
  },
  bindareaChange(e) { //区域
    this.setData({
      areaIndex: parseInt(e.detail.value)
    })
  },
  bindWeekChange(e) { //星期
    this.setData({
      weekIndex: parseInt(e.detail.value)
    })
  },
  bindTimeChange(e) { //时间段
    this.setData({
      timeIndex: parseInt(e.detail.value)
    })
  },
  bindPriceChange(e) { //费用
    this.setData({
      priceIndex: e.detail.value
    })
  },
  bindAddress(e) { //地址
    this.setData({
      address: e.detail.value
    })
  },
  bindCourse(e) { //课程
    this.setData({
      course: e.detail.value
    })
  },
  bindOther(e) { //其他要求
    this.setData({
      other: e.detail.value
    })
  },
  submit() { //提交需求
    let area = this.data.areaList[this.data.areaIndex],
      week = this.data.weekList[this.data.weekIndex],
      time = this.data.timeList[this.data.timeIndex],
      minPrice = this.data.pariceList[0][this.data.priceIndex[0]],
      maxPrice = this.data.pariceList[1][this.data.priceIndex[1]],
      address = this.data.address,
      course = this.data.course,
      other = this.data.other;
    if (address.trim().length <= 0) {
      $common.showModal('请填写上课地址');
      return;
    }
    if (address.trim().length <= 0) {
      $common.showModal('请填写学习课程');
      return;
    }
    //发请求
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