//本地存储 userInfo openid userType
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
const config = {
  //获取用户Openid
  GetSaveUserOpenId: `http://wj.${host}/LittleProgram/UserInfo/GetSaveUserOpenId`,
  //获取国家信息
  GetCountryInfos: `http://wj.${host}/LittleProgram/Nationality/GetCountryInfos`,
  //外教提交申请
  ApplyForForeEdu: `http://wj.${host}/LittleProgram/ForeignTea/ApplyForForeEdu`,
}
module.exports = {
  config: config,
  phoneReg: phoneReg,
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
    success = success ? success : function (res) { };
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      confirmText: confirmText,
      success: success
    });
  },
  //从本地相册选择图片或使用相机拍照
  chooseImage(success, count) {
    count = parseInt(count) ? count : 9;
    success = success ? success : function (res) { };
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: count,
      success: success,
    })
  },
  openLocation(latitude, longitude, scale) {  //查看位置
    scale = scale ? parseInt(scale) : scale;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: scale
    })
  },
  //获取openid
  getOpenid(callback) {
    let openid,
      code,
      userInfo;
    wx.login({
      success: (res) => {
        if (res.code) {
          //获取code
          code = res.code;
          openid = wx.getStorageSync('openid');
          if (openid === null || openid === '') {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo;
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
                    }
                  },
                  fail: function (res) { },
                  complete: function (res) { }
                })

              }
            })
          } else {
            console.log('openid已获取' + res.errMsg)
          }
        }
      },
      fail() { }
    })
  },

}