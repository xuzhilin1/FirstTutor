// pages/New/onlineChart/index.js
Page({
  data: {
    value: '', //聊天框的初始内容
    myImage: '../../images/ren_03.png',
    youImage: '../../images/ren_03.png',
    listData: [{
      isTime: true, //是否显示 时间 
      time: '11:52',
      chartType: true, // true 我 false 你
      chartContext: '你好，在吗?'
    }, {
      isTime: false, //是否显示 时间 
      time: '11:52',
      chartType: false, // true 我 false 你
      chartContext: '你好，在的'
    }]
  },
  confirm(e) { //点击右下角 发送 按钮
    let value = e.detail.value;
    if (value.trim().length <= 0) return;
    let listData = this.data.listData;
    listData.push({
      isTime: true, //是否显示 时间 
      time: '11:52',
      chartType: true, // true 我 false 你
      chartContext: value
    });
    this.setData({
      listData: listData,
      value: '',
    })
    wx.createSelectorQuery().select('#wrap').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
      console.log(rect);
    }).exec();
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
    return {
      title: 'FirstTutor',
      path: '/pages/Home/Home/index'
    }
  }
})