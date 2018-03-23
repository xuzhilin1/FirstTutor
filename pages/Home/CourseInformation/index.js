// pages/Home/CourseInformation/index.js
Page({
  data: {
    isGroup: true,
    courseName: '口语一对一',
    price: 200,
    partackNum: 6,
    courseLong: 2,
    userName: 'Emily',
    image: '../../images/ren_03.png',
    userList: ['英式发音', '喜欢旅游', '明星老师'],
    isVip: true,
    country: '../../images/guan_03.png',
    listq: 3.5,
    groupNum: 2,
    personNum: 5,
    weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周末'],
    timeList: [],
    purple: 'purple-bg white',
    teacherIntroduce: [
      "Hello my name is Emily",
      "I am a teacher with English",
      "I am from England",
      "I have over 25 years teaching  experience, now i am teaching students from 5 to 18 years of age"
    ],
    groupPersonName: '保持微笑2005',
    groupPersonImage: '../../images/ren_03.png',
    groupPersonNum: 1,
    groupPersonTime: '02-23 12:25',
  },
  initPageData() { //初始化页面数据
    //周几就用数字1234567代替，时间段就用1（上午），2（下午1），3（下午2），4（晚上）代替
    let arr = [];
    for (let i = 0; i < 28; i++) {
      if (i < 7) {
        arr.push({
          timeName: '上午',
          timeType: 0,
        });
        continue;
      }
      if (i < 14) {
        arr.push({
          timeName: '下午1',
          timeType: 1,
        });
        continue;
      }
      if (i < 21) {
        arr.push({
          timeName: '下午2',
          timeType: 1,
        });
        continue;
      }
      if (i < 28) {
        arr.push({
          timeName: '晚上',
          timeType: 1,
        });
        continue;
      }
    }
    this.setData({
      timeList: arr
    })
  },
  bindTime(e) {  // 选择
    let index = e.currentTarget.dataset.index,
      timeList = this.data.timeList;
    //0 无法选中 1 未选 2 已选
    if (timeList[index].timeType === 0) return;
    timeList[index].timeType = timeList[index].timeType === 1 ? 2 : 1;
    this.setData({
      timeList: timeList
    })
  },
  sureOrder() { //立即购买
    wx.navigateTo({
      url: '../sureOrder/index',
    })
  },
  spellingRules() { //详细规则
    wx.navigateTo({
      url: '../SpellingRules/index',
    })
  },
  goHome() { //首页
    wx.switchTab({
      url: '../Home/index',
    })
  },
  goJoinGroup() { //去参团
    wx.navigateTo({
      url: '../sureOrder/index',
    })
  },
  alonePayment() { //单独购买
    wx.navigateTo({
      url: '../sureOrder/index',
    })
  },
  fightGroup() { //多人拼团
    wx.navigateTo({
      url: '../sureOrder/index',
    })
  },

  chatTeacher() { //咨询 ， 与老师交流

  },
  onLoad: function (options) {
    if (options.isGroup) {
      let isGroup = false;
      options.isGroup === 'false' && (isGroup = false);
      options.isGroup === 'true' && (isGroup = true);
      this.setData({
        isGroup: isGroup
      })
    }
    this.initPageData();
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