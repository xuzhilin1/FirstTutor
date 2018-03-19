const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    pagesData: [{
      corCanView: true, //是否通过审核
      corCreateOn: '2017-08-06 13:31', //发布时间
      corPrice: '200', // 课程价格
      fgtType: 2, //1 拼团 2 单独购买
      corClaNum: 1, //上课人数，1-3
      corTitle: '口语一对一', //课程名称
      fgtAttCount: 0, //拼团成功团数
    }, {
      corCanView: true, //是否通过审核
      corCreateOn: '2017-08-06 13:31', //发布时间
      corPrice: '200', // 课程价格
      fgtType: 1, //1 拼团 2 单独购买
      corClaNum: 2, //上课人数，1-3
      corTitle: '口语一对二', //课程名称
      fgtAttCount: 2,//拼团成功团数
    }, {
      corCanView: false, //是否通过审核
      corCreateOn: '2017-08-06 13:31', //发布时间
      corPrice: '200', // 课程价格
      fgtType: 2, //1 拼团 2 单独购买
      corClaNum: 1, //上课人数，1-3
      corTitle: '口语一对一', //课程名称
      fgtAttCount: 0, //拼团成功团数
    }]
  },
  bindDelete(e) {
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    $common.showModal('确定删除该课程？', true, function (res) {
      if (res.confirm) {
        //发请求后删除
        pagesData.splice(index, 1);
        this.setData({
          pagesData: pagesData
        });
      }
    }.bind(this));
  },
  reviseReleaseCourse(e) { //修改课程
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../ReleaseCourse/index?status=1',
    })
  },
  releaseCourse() { //创建课程
    wx.navigateTo({
      url: '../ReleaseCourse/index?status=0',
    })
  },
  groupList(e) { //成功拼团
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../GroupList/index',
    })
  },
  orderDetails(e) { //查看课程
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../orderDetails/index?isGroup=0',
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