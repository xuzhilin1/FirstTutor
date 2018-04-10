const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    pageIndex: 1,
    pageSize: 5,
    courInfos: [], //页面数据
  },
  bindDelete(e) { //删除课程 
    let index = e.currentTarget.dataset.index,
      courInfos = this.data.courInfos;
    $common.showModal('确定删除该课程？', true, function (res) {
      if (res.confirm) {
        //发请求后删除
        $common.request(
          "POST",
          $common.config.DeleteCourse,
          {
            corId: courInfos[index].CorId
          },
          (res) => {
            if (res.data.res) {
              courInfos.splice(index, 1);
              this.setData({
                courInfos: courInfos
              });
            } else {
              switch (res.data.errType) {
                case 1:
                  $common.showModal('参数有误');
                  break;
                case 2:
                  $common.showModal('未知错误');
                  break;
                case 3:
                  $common.showModal('有人报名，不可删除');
                  break;
              }
            }
          },
          (res) => {
            $common.showModal('亲~网络不给力哦，请稍后重试');
          },
          (res) => {
            console.log(res);
          }
        )
      }
    }.bind(this));
  },
  reviseReleaseCourse(e) { //修改课程
    let index = e.currentTarget.dataset.index,
      courInfos = this.data.courInfos;
    app.globalData.releaseCourse = {
      courseIntroduce: '', //课程介绍
      courseTime: [], //上课时间段
      courseTypeIndex: 0, //课程类型下标,
      courseName: '', //课程名称
      courseAllPrice: '', //课程价格
      courseDurationIndex: 0, //课程时长下标
    }
    wx.navigateTo({
      url: '../ReleaseCourse/index?status=1&CorId=' + courInfos[index].CorId,
    })
  },
  releaseCourse() { //创建课程
    app.globalData.releaseCourse = {
      courseIntroduce: '', //课程介绍
      courseTime: [], //上课时间段
      courseTypeIndex: 0, //课程类型下标,
      courseName: '', //课程名称
      courseAllPrice: '', //课程价格
      courseDurationIndex: 0, //课程时长下标
    }
    wx.navigateTo({
      url: '../ReleaseCourse/index?status=0',
    })
  },
  groupList(e) { //成功拼团
    let index = e.currentTarget.dataset.index,
      courInfos = this.data.courInfos;
    wx.navigateTo({
      url: `../GroupList/index?courId=${courInfos[index].CorId}`,
    })
  },
  orderDetails(e) { //查看课程
    let index = e.currentTarget.dataset.index,
      courInfos = this.data.courInfos;
    let teacherStatusInfo = wx.getStorageSync('teacherStatusInfo');
    wx.navigateTo({
      url: '../courseDetail/index?CorId=' + courInfos[index].CorId + '&teaId=' + teacherStatusInfo.teaId,
    })
  },
  timeStamp(time) { //时间戳转换为日期
    time = time.replace("/Date(", '').replace(')/', '');
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
  getCourseList(isReach) { //获取课程列表
    isReach = isReach ? true : false;
    let teaId = wx.getStorageSync('teacherStatusInfo').teaId;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    let courInfos = isReach ? this.data.courInfos : [];//上拉加载push，下拉刷新，重新获取
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.GetMyCourInfos,
      {
        teaId: teaId,
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      (res) => {
        if (res.data.res) {
          console.log(res);
          let arr = res.data.courInfos;
          if (arr.length >= pageSize) {
            pageIndex++;
          }
          for (let i = 0, len = arr.length; i < len; i++) {
            arr[i].showTime = this.timeStamp(arr[i].CorCreateOn); //时间戳转换为时间
            courInfos.push(arr[i]);
          }
          let hash = {};
          let newArr = courInfos.reduce(function (item, next) {//数组依据CorId去重
            hash[next.CorId] ? '' : hash[next.CorId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            courInfos: newArr,
            pageIndex: pageIndex,
          })
        } else {
          switch (res.data.errType) {
            case 1:
              //未知错误
              $common.showModal('未知错误');
              break;
            case 2:
              //未设置课程
              // $common.showModal('你还没有发布课程');
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseList();
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
    this.getCourseList();
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