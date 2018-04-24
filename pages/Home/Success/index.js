// pages/Home/Success/index.js
const $common = require('../../../utils/common.js');
const app = getApp();
Page({
  data: {
    audit: 0, //0 审核中 1 审核通过 2 审核不通过
    contentText: '',
    status: 0,
    srcPoster: $common.srcPoster,
    poster: {}, //海报信息
    isPoster: false, //海报 显隐
  },
  init() {
    let status = this.data.status;
    let titleText = '',
      contentText = '';
    switch (status) {
      case 0: //外教资格申请
        titleText = '申请FirstTutor外教资格';
        let audit = this.data.audit;
        if (audit === 0) {
          contentText = '您已成功提交申请，请等待审核';
        } else if (audit === 1) {
          contentText = '您已通过审核';
        } else if (audit === 2) {
          contentText = '您的审核未通过';
        }
        break;
      case 1: //活动报名
        titleText = '活动报名成功';
        contentText = '恭喜您报名成功！';
        this.getPosterInfo();
        break;
    }
    wx.setNavigationBarTitle({
      title: titleText,
    });
    this.setData({
      contentText: contentText
    })
  },
  getPosterInfo() {//生成海报
    $common.request(
      'POST',
      $common.config.GetPosterInfo,
      {},
      (res) => {
        if (res.data.res) {
          let poster = res.data.poster;
          this.setData({
            poster: poster,

          })
        } else {
          $common.showModal('未知错误');
        }
      },
      (res) => {
        // $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        wx.hideLoading();
      }
    )
  },
  bindShowPoster() {
    isPoster: true
  },
  bindIsPoster() { //海报隐藏
    this.setData({
      isPoster: false
    })
  },
  savePoster() { //保存海报到相册
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) { //没有授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
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
            }
          })
        }
      },
      fail: (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      }
    })
  },
  goHome() { //返回首页
    wx.switchTab({
      url: '../Home/index',
    })
  },
  returnNew() { //返回重新申请
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let audit = 0,
      status = parseInt(options.status);
    if (options.audit) {
      audit = parseInt(options.audit);
    }
    this.setData({
      status: status,
      audit: audit
    })
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