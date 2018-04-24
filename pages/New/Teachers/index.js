const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    input: '',
    placeholder: '',
    status: 0,
  },
  bindInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  submit() {
    let input = this.data.input;
    let status = this.data.status;
    if (input.trim().length <= 0) {
      if (status == 0) {
        $common.showModal('Please fill in the teacher\'s introduction', false, false, 'OK', 'Prompt');
      } else if (status == 1) {
        $common.showModal('Please fill in the course description', false, false, 'OK', 'Prompt');
      }
      return;
    }
    switch (status) {
      case 0: //教师介绍
        app.globalData.teacherFor.TeaDescript = input;
        wx.navigateBack({
          delta: 1,
        })
        break;
      case 1:  //课程介绍
        app.globalData.releaseCourse.courseIntroduce = input;
        wx.navigateBack({
          delta: 1,
        })
        break;
    }
  },
  teacherIntroduceContext() { //教师介绍添加内容
    let TeaDescript = app.globalData.teacherFor.TeaDescript;
    this.setData({
      input: TeaDescript,
    })
  },
  courseIntroduceContext() { //课程介绍添加内容
    let courseIntroduce = app.globalData.releaseCourse.courseIntroduce;
    let input = '';
    if (courseIntroduce.trim().length > 0) {
      input = courseIntroduce;
    }
    this.setData({
      input: input,
    })
  },
  init() {
    let status = this.data.status;
    let placeholder = '',
      titleText = "";
    switch (status) {
      case 0: //教师介绍
        placeholder = '美式发音/喜欢旅游/明星老师';
        titleText = 'Teacher introduction';
        this.teacherIntroduceContext();
        break;
      case 1:  //课程介绍
        placeholder = 'Please fill in the course introduction, Maximum of 1000 Characters';
        titleText = 'Course Introduction';
        this.courseIntroduceContext();
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
    });
    this.setData({
      placeholder: placeholder
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: parseInt(options.status)
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
    this.init();
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
    wx.stopPullDownRefresh();
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