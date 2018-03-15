// pages/Home/comments/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listq: [
      { index: 0 },
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 },
    ],
    key: 5,//评分
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/xingxing_03.jpg',
    selectedSrc: '../../images/xing_14.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //点击左边,整颗星
  selectRight: function (e) {
    console.log(e)
    var key = this.data.key;
     key = e.currentTarget.dataset.key
    var id = e.currentTarget.dataset.id
    // if (key == 0) {
    //   //只有一颗星的时候,再次点击,变为0颗
    //   key = 0;
    // }else{

    // }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
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