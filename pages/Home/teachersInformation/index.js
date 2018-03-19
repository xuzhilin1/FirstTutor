// pages/Home/teachersInformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footer:'footer',
    footer1:'footer1',
    listq: [
      { index: 0 },
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 },
    ],
    navbar: ['图文详情', '规格参数', '品牌描述'],
    list: ['list0', 'list1', 'list2'],
    currentTab:0,
    src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
  },

  XInXi:function(){
    wx.navigateTo({
      url: '../CourseInformation/index',
    })
  },
  // 选择
  navbarTap: function (e) {
    console.log(e)
    var that = this
    let target = e.currentTarget.dataset.opt;
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
      toView: target
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