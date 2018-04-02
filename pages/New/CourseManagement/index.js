const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    // pagesData: [{
    //   corCanView: true, //是否通过审核
    //   corCreateOn: '2017-08-06 13:31', //发布时间
    //   corPrice: '200', // 课程价格
    //   fgtType: 2, //1 拼团 2 单独购买
    //   corClaNum: 1, //上课人数，1-3
    //   corTitle: '口语一对一', //课程名称
    //   fgtAttCount: 0, //拼团成功团数
    // }, {
    //   corCanView: true, //是否通过审核
    //   corCreateOn: '2017-08-06 13:31', //发布时间
    //   corPrice: '200', // 课程价格
    //   fgtType: 1, //1 拼团 2 单独购买
    //   corClaNum: 2, //上课人数，1-3
    //   corTitle: '口语一对二', //课程名称
    //   fgtAttCount: 2,//拼团成功团数
    // }, {
    //   corCanView: false, //是否通过审核
    //   corCreateOn: '2017-08-06 13:31', //发布时间
    //   corPrice: '200', // 课程价格
    //   fgtType: 2, //1 拼团 2 单独购买
    //   corClaNum: 1, //上课人数，1-3
    //   corTitle: '口语一对一', //课程名称
    //   fgtAttCount: 0, //拼团成功团数
    // }],


    pageIndex: 1,
    pageSize: 5,
    isUpload: true,
    courInfos: [], //页面数据
  },
  bindDelete(e) {
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    $common.showModal('确定删除该课程？', true, function (res) {
      if (res.confirm) {
        //发请求后删除
        pagesData.splice(index, 1);
        this.setData({
          pagesData: pagesData
        });
      }
    }.bind(this));
  },
  reviseReleaseCourse(e) { //修改课程
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../ReleaseCourse/index?status=1',
    })
  },
  releaseCourse() { //创建课程
    wx.navigateTo({
      url: '../ReleaseCourse/index?status=0',
    })
  },
  groupList(e) { //成功拼团
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../GroupList/index',
    })
  },
  orderDetails(e) { //查看课程
    let index = e.currentTarget.dataset.index,
      pagesData = this.data.pagesData;
    wx.navigateTo({
      url: '../orderDetails/index?isGroup=0',
    })
  },
  timeStamp(time) { //时间戳转换为日期
    let date = new Date(parseInt(time)),
      y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      f = date.getMinutes();
    m < 10 && (m = '0' + m);
    d < 10 && (d = '0' + d);
    h < 10 && (h = '0' + h);
    f < 10 && (f = '0' + f);
    return `${y}-${m}-${d} ${h}:${f}`;
  },
  getCourseList(isBottom) { //获取课程列表
    isBottom = typeof isBottom === 'undefined' ? false : true; //上拉加载
    let teaId = wx.getStorageSync('teacherStatusInfo').teaId;
    let pageIndex = this.data.pageIndex,
      pageSize = this.data.pageSize;
    let isUpload = this.data.isUpload;
    if (!isUpload) return; //是否可以执行加载
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.GetMyCourInfos,
      {
        teaId: teaId,
        pageIndex: pageIndex,
        pageSize: this.data.pageSize
      },
      (res) => {
        if (res.data.res) {
          let courInfos;
          if (isBottom) { //上拉加载
            courInfos = this.data.courInfos;
            let arr = res.data.courInfos;
            pageIndex++;
            if (arr.length >= pageSize) { //剩余数量不足一页
              isUpload = false;
            }
            arr.forEach(function (target, index) {
              courInfos.push(target);
            });
          } else {
            pageIndex = 1;
            courInfos = res.data.courInfos;
            isUpload = true;
          }
          courInfos.forEach(function (target, index) {
            let str = target.CorCreateOn,
              str1 = str.replace("/Date(", ''),
              time = str1.replace(')/', '');
            courInfos[index].showTime = this.timeStamp(time);
          }.bind(this));
          this.setData({
            courInfos: courInfos,
            pageIndex: pageIndex,
            isUpload: isUpload
          })
        } else {
          switch (res.data.errType) {
            case 1:
              //未知错误
              $common.showModal('未知错误');
              break;
            case 2:
              //未设置课程
              $common.showModal('你还没有发布课程');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  init() {
    this.getCourseList();
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
    this.init();
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
    this.getCourseList(true);
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