const $common = require('../../../utils/common.js');
Page({
  data: {
    pagesData: [],
  },
  getPagesData() {
    let arr = [{
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      status: 0, //0 未点评 1 已点评
      listq: 3,
    }, {
      userName: 'Emily',
      image: '../../images/ren_03.png',
      userList: ['英式发音', '喜欢旅游', '明星老师'],
      isVip: true,
      country: '../../images/guan_03.png',
      status: 1, //0 未点评 1 已点评
      listq: 4.5
    }];
    this.setData({
      pagesData: arr
    })
  },
  bindDelete(e) { //删除点评
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
  releaseRemark(e) { //立即点评
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../releaseRemark/index',
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
    this.getPagesData();
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