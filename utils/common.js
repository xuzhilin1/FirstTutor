/*
   本地存储 userInfo openid userType teacherStatusInfo
   图片限制类型 .gif|.jpg|.jpeg|.png
   视频限制类型".mp4|.rmvb|.flv|.wmv|.mov|.avi";
   外教资质图片链接：http://wj.1-zhao.com/QualifImgs/
   外教视频链接：http://wj.1-zhao.com/QuaLifAudios/
*/
const data = {
  //adminsid:"1490463872",
  //appid: "wx978aabc5088a48c3",
  MchId: "1490463872", //商户号
  //Secret: "b068590dc836feca0973125466df1668",
  // APIKey: "yizhaokejiarw234WER123123456eehu",
  // TheLablePath: "D:\wwwroot\kcbweb\cert\apiclient_cert.p12",
  TitleName: ""
};
// 正则手机号码
const phoneReg = /^1[34578]\d{9}$/;
const host = "1-zhao.com";
const srcImg = 'http://wj.1-zhao.com/QualifImgs/';
const srcVideo = 'http://wj.1-zhao.com/QuaLifAudios/';
const config = {
  /*
    首页
   */
  //获取学生状态，注册学生
  RisStudent: `http://wj.${host}/LittleProgram/Student/RisStudent`,
  //获取首页banner图片列表
  GetBannerImgs: `http://wj.${host}/LittleProgram/SystemSetup/GetBannerImgs`,
  //获取首页最新活动
  GetLastestAtyInfo: `http://wj.${host}/LittleProgram/Activity/GetLastestAtyInfo`,
  // 获取首页推荐外教
  GetRecomForTeas: `http://wj.${host}/LittleProgram/ForeignTea/GetRecomForTeas`,
  //获取外教的详细信息
  GetForeignTeaInfo: `http://wj.${host}/LittleProgram/ForeignTea/GetForeignTeaInfo`,
  //找外教-详情页，获取外交发布课程信息
  GetCourInfosByTeaId: `http://wj.${host}/LittleProgram/Course/GetCourInfosByTeaId`,
  //找外教-详情页，获取某外教评论内容
  GetReviewInfoByTeaId: `http://wj.${host}/LittleProgram/Review/GetReviewInfoByTeaId`,
  //课程信息，获取课程信息与外教信息(2018-03-29)
  GetCourseInfo: `http://wj.${host}/LittleProgram/Course/GetCourseInfo`,
  //课程信息，根据课程ID获取课程的上课时间(2018-03-29)
  GetTimeTableInfos: `http://wj.${host}/LittleProgram/TimeTable/GetTimeTableInfos`,
  //
  /*
    找外教
   */
  //获取找外教中商圈信息
  GetTradingAreaInfos: `http://wj.${host}/LittleProgram/TradingArea/GetTradingAreaInfos`,
  //找外教搜索页接口
  FindForeignTea: `http://wj.${host}/LittleProgram/ForeignTea/FindForeignTea`,
  /*
    我的
   */
  //获取用户Openid
  GetSaveUserOpenId: `http://wj.${host}/LittleProgram/UserInfo/GetSaveUserOpenId`,
  //获取国家信息
  GetCountryInfos: `http://wj.${host}/LittleProgram/Nationality/GetCountryInfos`,
  //外教提交申请
  ApplyForForeEdu: `http://wj.${host}/LittleProgram/ForeignTea/ApplyForForeEdu`,
  //获取外教状态信息 是否vip...
  GetForTeaStatus: `http://wj.${host}/LittleProgram/ForeignTea/GetForTeaStatus`,
  //外教--我的课程，课程列表(2018-03 - 29)
  GetMyCourInfos: `http://wj.${host}/LittleProgram/Course/GetMyCourInfos`,
  //外教-我的课程-发布新课程
  ReleaseCourse: `http://wj.${host}/LittleProgram/Course/ReleaseCourse`,
  //我的-获取用户类型
  GetUserType: `http://wj.${host}/LittleProgram/UserInfo/GetUserType`,
  //外教--我的--获取基本信息(2018-03-29)
  GetForTeaDetailInfo: `http://wj.${host}/LittleProgram/ForeignTea/GetForTeaDetailInfo`,
  //外教，我的--上传文件(2018-03-30)
  UpLoadForTeaFile: `http://wj.${host}/LittleProgram/FileOpera/UpLoadForTeaFile`,
  // 外教--我的--修改基本资料提交(2018-03-30)
  AlterForTeaBaseInfo: `http://wj.${host}/LittleProgram/ForeignTea/AlterForTeaBaseInfo`,
  //外教基本资料修改--删除上传文件
  DeleteForTeaFile: `http://wj.${host}/LittleProgram/FileOpera/DeleteForTeaFile`,
  //学生--查看课程详情--获取某课程拼团中的团订单(2018-03-30)
  GetCorGroupInfos: `http://wj.${host}/LittleProgram/CorOpenGroup/GetCorGroupInfos`,
  //订单页--获取用户名与手机号(2018-03-30)
  GetUserNamePhone: `http://wj.${host}/LittleProgram/Student/GetUserNamePhone`,
}
const wxGetUserInfo = function (code, userInfo, callback, callback2) {
  wx.getUserInfo({
    success: (res) => {
      console.log(res);
      let userInfo = res.userInfo;
      wx.setStorageSync("userInfo", userInfo);//本地存储个人信息
      wx.request({
        url: config.GetSaveUserOpenId,
        data: {
          code: code,
          nickName: userInfo.nickName,
          avaUrl: userInfo.avatarUrl,
        },
        header: { 'content-type': 'application/json' },
        method: 'POST',
        success: (res) => {
          if (res.data.res) {
            //保存openid
            wx.setStorageSync('openid', res.data.openid);
            //保存用户类型
            wx.setStorageSync('userType', res.data.userType);
            callback();
            callback2();
          }
        },
        fail: function (res) { },
        complete: function (res) { console.log(res); }
      })
      callback();
    },
    complete: (res) => {
      console.log(res);
    }
  })
}
module.exports = {
  config: config,
  phoneReg: phoneReg,
  srcImg: srcImg,
  srcVideo: srcVideo,
  //请求数据
  request(method, url, data, success, fail, complete) {
    fail = typeof (fail) === 'function' ? fail : function () { };
    complete = typeof (complete) === 'function' ? complete : function () { };
    wx.request({
      url: url,
      data: data,
      method: method,
      header: { 'content-type': 'application/json' },
      success: success,
      fail: fail,
      complete: complete
    })
  },
  //模态弹窗
  showModal(content, showCancel, success, confirmText, title) {
    title = title ? title : '提示';
    showCancel = showCancel ? true : false;
    confirmText = confirmText ? confirmText : '确定';
    success = typeof (success) === 'function' ? success : function (res) { };
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      confirmText: confirmText,
      success: success
    });
  },
  //拍摄视频或从手机相册中选视频
  chooseVideo(success) {
    success = typeof (success) === 'function' ? success : function (res) { };
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back',
      success: success,
      complete: function (res) {

      }
    })
  },
  //从本地相册选择图片或使用相机拍照
  chooseImage(success, count) {
    count = parseInt(count) ? count : 9;
    success = typeof (success) === 'function' ? success : function (res) { };
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: count,
      success: success,
    })
  },
  //查看位置
  openLocation(latitude, longitude, scale) {
    scale = scale ? parseInt(scale) : scale;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: scale
    })
  },
  //获取openid以及个人头像等信息
  getOpenid(callback, callback2) {
    callback = typeof (callback) === 'function' ? callback : function (res) { };
    callback2 = typeof (callback2) === 'function' ? callback2 : function (res) { };
    let openid,
      code,
      userInfo;
    wx.login({
      success: (res) => {
        if (res.code) {
          //获取code
          code = res.code;
          // openid = wx.getStorageSync('openid');
          // if (openid === null || openid === '') {
          // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
          wx.getSetting({
            success: (res) => {
              if (res.authSetting['scope.userInfo']) {
                //已经授权，可以直接调用getUserInfo获取头像昵称，不会弹框
                wxGetUserInfo(code, userInfo, callback, callback2);
              } else {
                //尚未授权
                wx.openSetting({
                  success: (res) => {
                    console.log(res);
                    if (res.authSetting['scope.userInfo']) {
                      wxGetUserInfo(code, userInfo, callback, callback2);
                    }
                  }
                });
                // wx.authorize({
                //   scope: 'scope.userInfo',
                //   success: (res) => {
                //     console.log(res);
                //     wxGetUserInfo(code, userInfo, callback, callback2);
                //   },
                //   complete: (res) => {
                //     console.log(res);
                //   }
                // })
              }
            }
          })
          // }
        }
      }
    })
  },

}