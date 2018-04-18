// 订单详情，学生
const $common = require('../../../utils/common.js');
Page({
  data: {
    srcForIdPhoto: $common.srcForIdPhoto,
    cog: {}, //团信息
    course: {}, //课程信息
    mem: {}, //团成员信息
    teacher: {}, //外教信息
    showMem: {}, //当前页面显示成员信息
    teaAddress: '', //外教地址
    teaPhone: '', //外教联系方式
  },
  lookYouImage() { //查看头像
    let listData = this.data.teacher;
    let srcForIdPhoto = this.data.srcForIdPhoto;
    let image = listData.TeaIDPhoto ? srcForIdPhoto + listData.TeaIDPhoto : listData.TeaAvaUrl;
    wx.previewImage({
      urls: [image],
    })
  },
  onlineChart(e) { //立即沟通
    let userId = this.data.teacher.TeaUserId;
    wx.navigateTo({
      url: `../../New/onlineChart/index?userId=${userId}`,
    })
  },
  callPhone(e) { //打电话
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  lookAddress() { //查看地图
    let address = this.data.teaAddress;
    $common.getAddress(address);
  },
  init() {
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      "POST",
      $common.config.LookUpFigroupInfo,
      {
        cogId: this.data.cogId,
        openId: wx.getStorageSync('openid')
      },
      (res) => {
        if (res.data.res) {
          let course = res.data.course;
          switch (course.CorLenOfCla) {
            case 1:
              course.courseTimeLong = 1;
              break;
            case 2:
              course.courseTimeLong = 1.5;
              break;
            case 3:
              course.courseTimeLong = 2;
              break;
          }
          let cog = res.data.cog;
          let mem = res.data.mem;
          let showMem;
          for (let i = 0, len = mem.length; i < len; i++) {
            if (mem[i].ViewOrder) {
              showMem = mem[i];
            }
          }
          showMem.orderTime = this.timeStamp(showMem.OdrCreateOn);//下单时间;
          showMem.buyTime = this.timeStamp(showMem.OdrBuyDate); //支付时间
          showMem.groupSuccessTime = this.timeStamp(showMem.OdrFgtSuccessTime);//拼团成功时间
          course.CorPrice = course.CorPrice.toFixed(2) < 0.01 ? 0.01 : course.CorPrice.toFixed(2);
          this.setData({
            course: course,
            teacher: res.data.teacher,
            cog: cog,
            mem: mem,
            showMem: showMem
          });
        } else {
          switch (res.errType) {
            case 1:
              $common.showModal('参数错误');
              break;
            case 2:
              $common.showModal('未知错误');
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
  deleteOrder() { //删除订单
    $common.request(
      'POST',
      $common.config.DeleteOgoById,
      {
        odrId: this.data.showMem.OdrId
      },
      (res) => {
        if (res.data.res) {
          $common.showModal('删除成功', false, (res) => {
            if (res.confirm) {
              wx.redirectTo({
                url: '../../Home/teachersInformation/index?data=' + this.data.teacher.TeaId,
              })
            }
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
  },
  timeStamp(time) { //时间戳转换为日期
    let str1 = time.replace("/Date(", ''),
      thisTime = str1.replace(')/', '');
    let date = new Date(parseInt(thisTime)),
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
  getTeacherPhone() {  //获取外教联系方式
    $common.request(
      'POST',
      $common.config.GetTeaAddressPhone,
      {
        cogId: this.data.cogId
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            teaAddress: res.data.teaAddress,
            teaPhone: res.data.teaPhone
          })
        } else {
          switch (res.data.errType) {
            case 1:
              //参数错误
              break;
            case 2:
              //未知错误
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cogId: options.cogId
    })
    this.init();
    this.getTeacherPhone();
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