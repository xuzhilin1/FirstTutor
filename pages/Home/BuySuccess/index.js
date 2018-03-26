// pages/Home/BuySuccess/index.js
Page({
  data: {
    address: '上海市浦东新区张衡路666弄2号楼201室',
    phone: '13501875412',
    poster: '../../images/successs_03.jpg',
    isPoster: false,
  },
  bindIsPoster() { //海报显隐
    this.setData({
      isPoster: !this.data.isPoster
    })
  },
  savePoster() { //保存海报到相册
    wx.saveImageToPhotosAlbum({
      filePath: '../../images/successs_03.jpg',
      success: (res) => {
        console.log(res);
      },
      complete: (res) => {
        console.log(res);
      }
    })
  },
  spellGroup() {  // 查看拼团信息
    wx.navigateTo({
      url: '../SpellGroup/index',
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