//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    /*
       教师发布课程
     */
    releaseCourse: {
      courseIntroduce: '', //课程介绍
      courseTime: [], //上课时间段
      courseTypeIndex: 0, //课程类型下标,
      courseName: '', //课程名称
      courseAllPrice: '', //课程价格
      courseDurationIndex: 0, //课程时长下标
    },
    /*
       教师基本资料
     */
    teacherFor: {
      TeaAbstract: "", //简介
      TeaAge: "", //外教年龄
      TeaAudio: "", //外教上课视频 
      TeaClaArea: "", //上课区域
      TeaDescript: "", //外教描述
      TeaGender: 1, //外教性别
      TeaId: 5, //外教id
      TeaIdPhoto: "",
      TeaNaLityId: 1, //国籍id
      TeaName: "", //外教姓名
      TeaNation: "", //国籍
      TeaPhone: "", //电话
      TeaQualif: [],
      /*
      {
        QfsCreateOn: '', //资质添加时间
        QfsPicName: '', //资质图片链接
        QfsId: 1,
        QfsTeaId: 1
      }
       */
      TeaUniversity: "", //外教大学
      TeaWeChat: "", //外教微信
    },
    //qualifs: [], //教师资质图片名称列表
  }
})
