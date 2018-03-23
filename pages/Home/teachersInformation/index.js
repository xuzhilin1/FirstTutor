const $common = require('../../../utils/common.js');
Page({
  data: {
    userName: 'Emily',
    image: '../../images/ren_03.png',
    country: '英国',
    school: '利兹大学',
    userList: ['美式发音', '经验丰富', '3年+教龄'],
    isVip: true,
    listq: 3.5,
    sex: 0, // 0  女 1 男
    phone: 13456789789,
    isPhone: false,
    areaList: ['长宁区', '徐汇区'],
    navbarList: [{
      id: '_course',
      context: '提供课程'
    }, {
      id: '_teacherIntroduce',
      context: '外教介绍'
    }, {
      id: '_evaluate',
      context: '历史评价'
    }],
    courseList: [{
      isGroup: false,
      title: '口语一对一',
      price: '200',
      paymentNum: 5,
    }, {
      isGroup: true,
      title: '口语一对二',
      price: '200',
      paymentNum: 5,
    }],
    teacherIntroduce: [
      "Hello my name is Emily",
      "I am a teacher with English",
      "I am from England",
      "I have over 25 years teaching  experience, now i am teaching students from 5 to 18 years of age"
    ],
    src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    aptitude: [
      "../../images/imga_05.jpg",
    ],
    comment: [{
      image: '../../images/ren_03.png',
      userName: '马蒂斯',
      time: '8月5日 22：21',
      context: '这个外教非常好，给个赞'
    }, {
      image: '../../images/ren_03.png',
      userName: '马蒂斯',
      time: '8月5日 22：21',
      context: '这个外教非常好，给个赞'
    }, {
      image: '../../images/ren_03.png',
      userName: '马蒂斯',
      time: '8月5日 22：21',
      context: '这个外教非常好，给个赞'
    }, {
      image: '../../images/ren_03.png',
      userName: '马蒂斯',
      time: '8月5日 22：21',
      context: '这个外教非常好，给个赞'
    }],
    allComment: false
  },
  bindNavbar(e) { //nav滚动页面
    let index = parseInt(e.currentTarget.dataset.index),
      navbarList = this.data.navbarList;
    if (index === 0) return;
    let id = navbarList[index].id;
    let Hquery = wx.createSelectorQuery();
    Hquery.select('#_headerTop').boundingClientRect();
    Hquery.exec(function (res) {
      let HTop = Math.abs(res[0].top); //本页面第一个元素与屏幕的距离
      console.log(HTop);
      let query = wx.createSelectorQuery(); //获取节点
      query.select(`#${id}`).boundingClientRect();
      query.exec(function (res) {
        //res[0].top  获取的是目标节点到屏幕顶端的距离
        wx.pageScrollTo({ //滚动条
          scrollTop: HTop + res[0].top,
          duration: 300
        })
      })
    });
  },
  lookAllComment() { //查看全部评论
    this.setData({
      allComment: true
    })
  },
  courseInfo(e) {
    let index = e.currentTarget.dataset.index,
      courseList = this.data.courseList;
    console.log(courseList[index]);
    wx.navigateTo({
      url: '../CourseInformation/index?isGroup=' + courseList[index].isGroup
    })
  },
  getListData() {

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
    this.getListData();
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