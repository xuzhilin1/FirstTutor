const $common = require('../../../utils/common.js');
const $static = require('../../../utils/static.js');
Page({
  data: {
    nedId: -1,
    status: 1, //1 发布需求， 2 修改需求
    areaList: $static.areaShanghai,
    areaIndex: 0,
    weekList: ['一', '二', '三', '四', '五', '六', '日'],
    weekIndex: 0,
    timeList: ['上午', '下午1', '下午2', '晚上'],
    timeIndex: 0,
    pariceList: [
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    ],
    priceIndex: [1, 2],
    address: '',
    course: '',
    other: '',
    userName: '',
    phone: '',
    age: '',
    sexData: [{
      id: 0,
      data: '女',
    }, {
      id: 1,
      data: '男'
    }],
    sexIndex: 0,
    StuId: -1,
    btnFalg: true,
  },
  bindName(e) { //姓名
    this.data.userName = e.detail.value;
  },
  bindPhone(e) { //手机号
    this.data.phone = e.detail.value;
  },
  bindareaChange(e) { //区域
    this.setData({
      areaIndex: parseInt(e.detail.value)
    })
  },
  bindWeekChange(e) { //星期
    this.setData({
      weekIndex: parseInt(e.detail.value)
    })
  },
  bindTimeChange(e) { //时间段
    this.setData({
      timeIndex: parseInt(e.detail.value)
    })
  },
  bindPriceChange(e) { //费用
    let data = e.detail.value;
    if (data[0] >= data[1]) {
      $common.showModal('请选择正确的费用区间');
      return;
    }
    this.setData({
      priceIndex: e.detail.value
    })
  },
  bindAddress(e) { //地址
    this.setData({
      address: e.detail.value
    })
  },
  bindSexChange(e) { //性别
    this.setData({
      sexIndex: parseInt(e.detail.value)
    })
  },
  bindAge(e) { //年龄
    this.data.age = e.detail.value
  },
  bindCourse(e) { //课程
    this.setData({
      course: e.detail.value
    })
  },
  bindOther(e) { //其他要求
    this.setData({
      other: e.detail.value
    })
  },
  submit() { //提交需求
    if (!this.data.btnFalg) return;
    this.data.btnFalg = false;
    let area = this.data.areaList[this.data.areaIndex],
      week = parseInt(this.data.weekIndex) + 1,
      time = parseInt(this.data.timeIndex) + 1,
      minPrice = this.data.pariceList[0][this.data.priceIndex[0]],
      maxPrice = this.data.pariceList[1][this.data.priceIndex[1]],
      address = this.data.address,
      course = this.data.course,
      other = this.data.other;
    let userName = this.data.userName,
      phone = this.data.phone,
      sexData = this.data.sexData,
      sexIndex = this.data.sexIndex,
      age = this.data.age;
    if (userName.trim().length <= 0) {
      $common.showModal('请填写姓名');
      return;
    }
    if (!$common.phoneReg.test(phone)) {
      $common.showModal('请填写正确的手机号');
      return;
    }
    if (address.trim().length <= 0) {
      $common.showModal('请填写上课地址');
      return;
    }

    if (isNaN(parseInt(age)) || parseInt(age) < 0) {
      $common.showModal('请填写正确的年龄');
      return;
    }
    if (course.trim().length <= 0) {
      $common.showModal('请填写学习课程');
      return;
    }
    let status = this.data.status;
    let student = {
      StuName: userName,
      StuGender: sexData[sexIndex].id,
      StuAge: age,
      StuPhone: phone,
      StuId: this.data.StuId
    }
    if (status === 1) { //发布需求
      this.saveData(course, address, week, minPrice, maxPrice, other, time, area.id, student);
    } else if (status === 2) { //修改需求
      this.reviseData(course, address, week, minPrice, maxPrice, other, time, area.id, student);
    }
  },
  reviseData(NedCorName, NedAddress, NedCorAfw, NedMinPrice, NedMaxPrice, NedOther, NedClaTime, NedClaArea, stuInfo) { //修改需求
    $common.request(
      'POST',
      $common.config.AlterMyLearnNeedInfo,
      {
        lnd: {
          NedId: this.data.nedId,
          NedCorName: NedCorName, //学习课程
          NedAddress: NedAddress, //学习地址
          NedCorAfw: NedCorAfw, //上课时间（周几）
          NedMinPrice: NedMinPrice, //最低价格
          NedMaxPrice: NedMaxPrice, //最高价格
          NedOther: NedOther, //其他要求
          NedClaTime: NedClaTime, //上课时间段（1 上午，2 下午1，3 下午2，4 晚上）
          NedClaArea: NedClaArea, //所在区域
        },
        stuInfo: stuInfo
      },
      (res) => {
        if (res.data.res) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数不正确');
              break;
            case 2:
              $common.showModal('修改失败');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
        setTimeout(() => {
          this.data.btnFalg = true;
        }, 1500);
      }
    )
  },
  saveData(NedCorName, NedAddress, NedCorAfw, NedMinPrice, NedMaxPrice, NedOther, NedClaTime, NedClaArea, student) { //发布需求
    $common.request(
      'POST',
      $common.config.ReleaseMyLearnNeed,
      {
        openId: wx.getStorageSync('openid'),
        lnd: {
          NedCorName: NedCorName, //学习课程
          NedAddress: NedAddress, //学习地址
          NedCorAfw: NedCorAfw, //上课时间（周几）
          NedMinPrice: NedMinPrice, //最低价格
          NedMaxPrice: NedMaxPrice, //最高价格
          NedOther: NedOther, //其他要求
          NedClaTime: NedClaTime, //上课时间段（1 上午，2 下午1，3 下午2，4 晚上）
          NedClaArea: NedClaArea, //所在区域
        },
        student: student
      },
      (res) => {
        if (res.data.res) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数不正确');
              break;
            case 2:
              $common.showModal('未知错误');
              break;
            case 3:
              $common.showModal('未知错误');
              break;
            case 4:
              $common.showModal('添加失败');
              break;
          }
        }
      },
      (res) => {

      },
      (res) => {
        setTimeout(() => {
          this.data.btnFalg = true;
        }, 1500);
      }
    )
  },
  init() {
    let status = this.data.status;
    if (status === 1) {
      wx.stopPullDownRefresh();
      return;
    }
    wx.showLoading({ title: '努力加载中...' });
    $common.request(
      'POST',
      $common.config.GetMyLearnNeedInfo,
      {
        nedId: this.data.nedId
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.lnd;
          let areaList = this.data.areaList,
            areaIndex = 0;
          for (let i = 0, len = areaList.length; i < len; i++) {
            if (data.NedClaArea == areaList[i].id) {
              areaIndex = i;
              break;
            }
          }
          let pariceList = this.data.pariceList[0],
            minIndex = 0,
            maxIndex = 0;
          for (let i = 0, len = pariceList.length; i < len; i++) {
            (pariceList[i] == data.NedMinPrice) && (minIndex = i);
            (pariceList[i] == data.NedMaxPrice) && (maxIndex = i);
          }
          let student = res.data.stuInfo;
          let userName = student.StuName,
            phone = student.StuPhone,
            StuId = student.StuId,
            age = student.StuAge,
            sexIndex = student.StuGender;
          this.setData({
            address: data.NedAddress,
            course: data.NedCorName,
            other: data.NedOther,
            areaIndex: areaIndex,
            weekIndex: parseInt(data.NedCorAfw) - 1,
            timeIndex: parseInt(data.NedClaTime) - 1,
            priceIndex: [minIndex, maxIndex],
            userName: userName,
            phone: phone,
            StuId: StuId,
            age: age,
            sexIndex: sexIndex
          })
        } else {
          switch (res.data.errType) {
            case 1:
              $common.showModal('参数不正确');
              break;
            case 1:
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = options.status ? parseInt(options.status) : 1;
    let nedId = options.nedId ? options.nedId : -1;
    this.setData({
      status: status,
      nedId: nedId
    })
    this.init();
    switch (status) {
      case 1:
        wx.setNavigationBarTitle({
          title: '需求查看'
        })
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '需求修改'
        })
        break;
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