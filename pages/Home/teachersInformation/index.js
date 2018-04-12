const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    srcImg: $common.srcImg,
    srcVideo: $common.srcVideo,
    teaId: null,   //教师id
    teaInfo: {}, //教师信息
    allAreaList: $static.areaShanghai,
    areaList: [],
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
    courseList: [], //课程列表
    qualifInfo: [], //外教资质图片
    pageIndex: 1,
    pageSize: 5, //分页，每页多少条
    comment: [], //评论
    totalCount: 0, //共计多少条评论
    allComment: false,
    listenCallbackNum: 0, //本页面三个接口，监听请求全部完成
  },
  onlineChart() { //立即沟通
    let TeaUserId = this.data.teaInfo.TeaUserId;
    wx.navigateTo({
      url: `../../New/onlineChart/index?userId=${TeaUserId}`,
    })
  },
  callPhone(e) { //打电话
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
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
    let totalCount = parseInt(this.data.totalCount); //所有的评论个数
    this.setData({
      pageSize: totalCount,  //使一次性请求到所有的评论
    })
    this.getCommentData(true);
  },
  courseInfo(e) {
    let index = e.currentTarget.dataset.index,
      courseList = this.data.courseList;
    wx.navigateTo({
      url: '../CourseInformation/index?courId=' + courseList[index].CorId + '&teaId=' + this.data.teaId
    })
  },
  timeStamp(time) { //时间戳转换为日期
    let date = new Date(parseInt(time)),
      y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      f = date.getMinutes();
    h < 10 && (h = '0' + h);
    f < 10 && (f = '0' + f);
    return `${m}月${d}日 ${h}:${f}`;
  },
  resetArea() { //重置上课区域
    let TeaClassArea = this.data.teaInfo.TeaClassArea.split(',');
    let allAreaList = this.data.allAreaList;
    let arr = [];
    for (let i = 0, len = TeaClassArea.length; i < len; i++) {
      for (let j = 0, l = allAreaList.length; j < l; j++) {
        if (allAreaList[j].id == TeaClassArea[i]) {
          arr.push(allAreaList[j]);
        }
      }
    }
    this.setData({
      areaList: arr
    })
  },
  getTeacherData() { //获取本页面教师信息
    $common.request(
      "POST",
      $common.config.GetForeignTeaInfo,
      {
        teaId: this.data.teaId,
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            teaInfo: res.data.teaInfo,
            qualifInfo: res.data.qualifInfo
          });
          this.resetArea();
        } else {
          $common.showModal('未知错误，请稍后重试');
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        this.addListenCallbackNum();
        this.stopModal();
      }
    )
  },
  getCourseData() { //获取外教发布课程的信息
    $common.request(
      "POST",
      $common.config.GetCourInfosByTeaId,
      {
        teaId: this.data.teaId,
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            courseList: res.data.courList
          })
        }
      },
      (res) => {

      },
      (res) => {
        this.addListenCallbackNum();
        this.stopModal();
      }
    )
  },
  getCommentData(isLook) { //获取评论
    isLook = typeof isLook === 'undefined' ? false : true; //是否为点击查看所有评论进入
    if (isLook) {
      wx.showLoading({ title: '努力加载中...' });
    }
    $common.request(
      "POST",
      $common.config.GetReviewInfoByTeaId,
      {
        teaId: this.data.teaId,
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize
      },
      (res) => {
        if (res.data.res) {
          let arr = res.data.rewList;
          arr.forEach(function (target, index) {
            let str = target.RewCreateOn,
              str1 = str.replace("/Date(", ''),
              time = str1.replace(')/', '');
            arr[index].showTime = this.timeStamp(time);
          }.bind(this));
          this.setData({
            comment: arr,
            totalCount: res.data.totalCount,
            pageSize: 5
          })
          if (isLook) {
            this.setData({
              allComment: true //请求成功让按钮消失
            })
          }
        }
      },
      (res) => {

      },
      (res) => {
        if (isLook) {
          wx.hideLoading();
          return;
        }
        this.addListenCallbackNum();
        this.stopModal();
      },
    )
  },
  addListenCallbackNum() {
    let num = parseInt(this.data.listenCallbackNum);
    num++;
    this.setData({
      listenCallbackNum: num
    })
  },
  stopModal() { //停止页面的各种加载状态
    let num = parseInt(this.data.listenCallbackNum);
    if (num >= 3) { //本页面有三个接口
      wx.hideLoading();
      wx.stopPullDownRefresh();
      this.setData({
        listenCallbackNum: 0
      })
    }
  },
  init() {
    wx.showLoading({ title: '努力加载中...' });
    this.getTeacherData();
    this.getCourseData();
    this.getCommentData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teaId: options.data
    });
    this.init();
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
    this.init();
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