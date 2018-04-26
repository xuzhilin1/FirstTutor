// pages/New/OrderCheck/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    pageIndex: 1,
    pageSize: 5,
    infoList: [], //页面数据
  },
  orderDelete(e) { //删除订单
    let index = e.currentTarget.dataset.index,
      infoList = this.data.infoList;
    $common.showModal('确定删除该订单？', true, (res) => {
      if (res.confirm) {
        $common.request(
          'POST',
          $common.config.DeleteOgoById,
          {
            odrId: infoList[index].OdrId
          },
          (res) => {
            if (res.data.res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              infoList.splice(index, 1);
              this.setData({
                infoList: infoList
              })
            } else {
              switch (res.data.errType) {
                case 1:
                  $common.showModal('参数有误');
                  break;
                case 2:
                  $common.showModal('未知错误');
                  break;
                case 3:
                  $common.showModal('订单不存在');
                  break;
                case 4:
                  $common.showModal('删除失败');
                  break;
              }
            }
          },
          (res) => {

          },
          (res) => {
          }
        )
      }
    });
  },
  SOrderDetail(e) { //查看详情
    let index = e.currentTarget.dataset.index,
      infoList = this.data.infoList;
    wx.navigateTo({
      url: '../orderDetailsS/index?cogId=' + infoList[index].FgtId,
    })
  },
  init(isReach) {
    isReach = isReach ? true : false;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize;
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetOrderList,
      {
        openId: wx.getStorageSync('openid'),
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      (res) => {
        if (res.data.res) {
          let infoList = isReach ? this.data.infoList : [];
          let data = res.data.infoList;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          for (let i = 0, len = data.length; i < len; i++) {
            switch (data[i].CourseInfo.CorLenOfCla) {
              case 1:
                data[i].CourseInfo.courseTimeLong = 1;
                break;
              case 2:
                data[i].CourseInfo.courseTimeLong = 1.5;
                break;
              case 3:
                data[i].CourseInfo.courseTimeLong = 2;
                break;
            }
            let status = data[i].FgtType;
            if (status == 1) {
              data[i].CourseInfo.CorType = 2;
              data[i].CourseInfo.BuyCount = data[i].FgtAttCount;
            } else {
              data[i].CourseInfo.CorType = 1;
              data[i].CourseInfo.BuyCount = data[i].CourseInfo.CorBuyCount;
            }
            data[i].CourseInfo.CorClaNum = data[i].FgtMemNum;
            infoList.push(data[i]);
          }
          let hash = {};
          let newArr = infoList.reduce(function (item, next) {//数组依据FgtId去重
            hash[next.FgtId] ? '' : hash[next.FgtId] = true && item.push(next);
            return item
          }, []);
          this.setData({
            infoList: newArr,
            pageIndex: pageIndex
          })
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数有误');
              break;
            case 2:
              $common.showModal('未知错误');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  onLoad: function (options) {

  },
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
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.init(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      let index = res.target.dataset.index;
      let infoList = this.data.infoList;
      return {
        title: 'FirstTutor',
        path: '/pages/Home/SpellGroup/index?cogId=' + infoList[index].FgtId
      }
    }
    return {
      title: 'FirstTutor',
      path: '/pages/Home/Home/index'
    }
  }
})