// pages/Home/foreignTeacher/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['区域','一对二', '一对一', '一对三'],
    array1: ['商圈', '一对二', '一对一', '一对三'],
    array2: ['时间段', '一对二', '一对一', '一对三'],
    array3: ['价格区间', '一对二', '一对一', '一对三'],
    index:0,
    index1: 0,
    index2: 0,
    index3: 0,
    listq: [
      { index: 0 },
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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