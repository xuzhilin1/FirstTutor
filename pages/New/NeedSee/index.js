// pages/New/NeedSee/index.js
Page({
  data: {
    pagesData: [{
      name: '英语口语一对一',
      address: '长宁',
      week: '周一',
      time: '上午',
      browse: 20,
      minPrice: '100',
      maxPrice: '200'
    }, {
      name: '英语口语一对一',
      address: '长宁',
      week: '周一',
      time: '上午',
      browse: 20,
      minPrice: '100',
      maxPrice: '200'
    }]
  },
  seeDetail(e) { //立即沟通
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../seeDetail/index',
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