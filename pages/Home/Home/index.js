const $common = require('../../../utils/common.js');
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    activity: '../../images/ceshia_10.jpg',
    listData: [],
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