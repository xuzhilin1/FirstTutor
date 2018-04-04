// pages/Home/BuySuccess/index.js
const $common = require('../../../utils/common.js');
Page({
  data: {
    srcPoster: $common.srcPoster,
    address: '上海市浦东新区张衡路666弄2号楼201室',
    phone: '13501875412',
    poster: {}, //海报信息
    isPoster: false, //海报 显隐
    orderType: 1, //订单类型类型：1. 团购  2. 单独购
    cogId: -1, //团id 例 35
    groupType: 1, //团类型：1. 开团  2. 参团
  },
  bindShowPoster() { //生成海报
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetPosterInfo,
      {},
      (res) => {
        if (res.data.res) {
          let poster = res.data.poster;
          this.setData({
            poster: poster,
            isPoster: true
          })
        } else {
          $common.showModal('未知错误');
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        console.log(res);
        wx.hideLoading();
      }
    )
  },
  bindIsPoster() { //海报隐藏
    this.setData({
      isPoster: false
    })
  },
  savePoster() { //保存海报到相册
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (!res.authSetting['scope.writePhotosAlbum']) { //没有授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              console.log(res);
              this.saveImage();
            },
            fail: (res) => {
              $common.showModal('是否授权保存到相册?', true, (res) => {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (!res.authSetting['scope.writePhotosAlbum']) return;
                      this.saveImage();
                    }
                  })
                }
              })
            }
          })
        } else {
          this.saveImage();
        }
      }
    })
  },
  saveImage() { //保存图片
    let srcPoster = this.data.srcPoster,
      url = this.data.poster.PstImgName;
    let filePath = `${srcPoster}${url}`;
    wx.downloadFile({  //保存图片必须先下载
      url: filePath,
      success: (res) => {
        if (res.statusCode === 200) {
          let saveSrc = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: saveSrc,
            success: (res) => {
              this.setData({ //海报隐藏
                isPoster: false
              })
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: (res) => {
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              })
            },
            complete: (res) => {
              console.log(res);
            }
          })
        }
      },
      fail: (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      }
    })
  },
  spellGroup() {  // 查看拼团信息
    wx.navigateTo({
      url: '../SpellGroup/index?cogId=' + this.data.cogId + '&isGroupHead=true' + '&groupType=' + this.data.groupType,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderType) {
      let orderType = parseInt(options.orderType); //订单类型类型：1. 团购  2. 单独购
      this.setData({
        orderType: orderType
      })
    }
    if (options.cogId) {
      let cogId = parseInt(options.cogId); //订单类型类型：1. 团购  2. 单独购
      this.setData({
        cogId: cogId
      })
    }
    if (options.groupType) {
      let groupType = parseInt(options.groupType); //订单类型类型：1. 团购  2. 单独购
      this.setData({
        groupType: groupType
      })
    }
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