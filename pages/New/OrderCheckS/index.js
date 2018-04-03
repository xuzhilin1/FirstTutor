// pages/New/OrderCheck/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    SPagesData: [{
      isGroup: true,
      name: '口语一对二',
      price: '150',
      actualPrice: '150.00',
      groupNum: 2,
      PaymentNum: 6,
      num: '一对二',
      status: '拼团中，还差1人成团',
      image: '../../images/ren_03.png',
      userName: 'Emily',
      courseTime: 2,
    }, {
      isGroup: false,
      name: '口语一对一',
      price: '200',
      actualPrice: '200.00',
      groupNum: 2,
      PaymentNum: 6,
      num: '一对一',
      status: '已支付',
      image: '../../images/ren_03.png',
      userName: 'Emily',
      courseTime: 2,
    }],
  },
  orderDelete(e) { //删除订单
    let index = e.currentTarget.dataset.index,
      SPagesData = this.data.SPagesData;
    $common.showModal('确定删除该订单？', true, (res) => {
      if (res.confirm) {
        SPagesData.splice(index, 1);
        this.setData({
          SPagesData: SPagesData
        })
      }
    });
  },
  SOrderDetail(e) { //查看详情
    let index = e.currentTarget.dataset.index,
      SPagesData = this.data.SPagesData;
    wx.navigateTo({
      url: '../orderDetailsS/index',
    })
  },
  bindshare(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
  },

  onLoad: function (options) {

  },
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
    wx.stopPullDownRefresh();
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
    return {
      title: 'FirstTutor',
      path: '/pages/Home/Home/index'
    }
  }
})