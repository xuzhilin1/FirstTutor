// pages/New/area/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purple:'purple-bg white',
    list:[
      {
        qu: '长宁区',
        YanSe:true
      }, {
        qu: '浦东新区',
        YanSe: ''
      },
      {
        qu: '徐汇区',
        YanSe: ''
      },
      {
        qu: '普陀区',
        YanSe: ''
      },
      {
        qu: '闵行区',
        YanSe: ''
      },
    ]
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
  XuanZe:function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var list=this.data.list
    list[id].YanSe = !list[id].YanSe
    this.setData({
      list:list
    })
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