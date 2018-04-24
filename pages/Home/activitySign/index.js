/**
 * 活动立即报名
 */
const $common = require('../../../utils/common.js');
Page({
  data: {
    userName: '',
    phone: '',
    remark: '',
    atyId: -1, //活动id
    price: 0.01
  },
  bindUserName(e) { //姓名
    this.setData({
      userName: e.detail.value
    })
  },
  bindPhone(e) { //手机号
    this.setData({
      phone: e.detail.value
    })
  },
  bindRemark(e) { //备注
    this.setData({
      remark: e.detail.value
    })
  },
  submit() { //立即报名
    let userName = this.data.userName,
      phone = this.data.phone,
      remark = this.data.remark;
    if (userName.trim().length <= 0) {
      $common.showModal('请输入姓名');
      return;
    }
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('请输入正确的手机号');
      return;
    }
    $common.request(
      'POST',
      $common.config.AtySignUp,
      {
        atyId: this.data.atyId,
        openId: wx.getStorageSync('openid'),
        stuName: userName,
        stuPhone: phone,
        Remark: remark
      },
      (res) => {
        if (res.data.res) {
          let paras = res.data.paras;
          let adrId = res.data.adrId;
          let suId = res.data.suId;
          if (paras) { //要付钱
            wx.requestPayment({
              'timeStamp': paras.timeStamp,
              'nonceStr': paras.nonceStr,
              'package': paras.package,
              'signType': 'MD5',
              'paySign': paras.paySign,
              'success': (res) => {
                console.log(res);
                $common.request(
                  'POST',
                  $common.config.PayMentSuccess,
                  {
                    atyId: this.data.atyId,
                    openId: wx.getStorageSync('openid'),
                    pagePath: `pages/Home/Success/index?status=1`
                  },
                  (res) => {

                  },
                  (res) => {

                  },
                  (res) => {
                    wx.navigateTo({ //跳转到报名成功页面
                      url: '/pages/Home/Success/index?status=1',
                    })
                  }
                )
              },
              'fail': (res) => {
                console.log(res);
                $common.request(
                  'POST',
                  $common.config.CanCelPay,
                  {
                    suId: suId,
                    adrId: adrId,
                    atyId: this.data.atyId
                  }
                )
              }
            })
          }
          return;
          wx.navigateTo({ //跳转到报名成功页面
            url: '../Success/index?status=1',
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
              $common.showModal('报名人数已满');
              break;
            case 2:
              $common.showModal('报名失败');
              break;
          }
        }
      },
      (res) => {
        $common.showModal('亲~网络不给力哦，请稍后重试');
      },
      (res) => {
        console.log(res);
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      atyId: options.atyId,
      price: options.price
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