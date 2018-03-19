// pages/Home/CourseInformation/index.js
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
    purple: 'purple-bg white',
    list: ['周一', '周二', '周三', '周四', '周五', '周六', '周末'],
    list1: [
      {
        qu: '上午',
        YanSe: true
      }, {
        qu: '上午',
        YanSe: ''
      },
      {
        qu: '上午',
        YanSe: ''
      },
      {
        qu: '上午',
        YanSe: ''
      },
      {
        qu: '上午',
        YanSe: ''
      },
      {
        qu: '上午',
        YanSe: ''
      },
      {
        qu: '上午',
        YanSe: ''
      },
      {
        qu: '下午1',
        YanSe: true
      }, {
        qu: '下午1',
        YanSe: ''
      },
      {
        qu: '下午1',
        YanSe: ''
      },
      {
        qu: '下午1',
        YanSe: ''
      },
      {
        qu: '下午1',
        YanSe: ''
      },
      {
        qu: '下午1',
        YanSe: ''
      },
      {
        qu: '下午1',
        YanSe: ''
      },
      {
        qu: '下午2',
        YanSe: true
      }, {
        qu: '下午2',
        YanSe: ''
      },
      {
        qu: '下午2',
        YanSe: ''
      },
      {
        qu: '下午2',
        YanSe: ''
      },
      {
        qu: '下午2',
        YanSe: ''
      },
      {
        qu: '下午2',
        YanSe: ''
      },
      {
        qu: '下午2',
        YanSe: ''
      },
      {
        qu: '晚上',
        YanSe: true
      }, {
        qu: '晚上',
        YanSe: ''
      },
      {
        qu: '晚上',
        YanSe: ''
      },
      {
        qu: '晚上',
        YanSe: ''
      },
      {
        qu: '晚上',
        YanSe: ''
      },
      {
        qu: '晚上',
        YanSe: ''
      },
      {
        qu: '晚上',
        YanSe: ''
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择
  XuanZe: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var list = this.data.list1
    list[id].YanSe = !list[id].YanSe
    this.setData({
      list1: list
    })
  
   
  },
  QueRen:function(){
    wx.navigateTo({
      url: '../sureOrder/index',
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