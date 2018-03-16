//本地存储 code userInfo openid
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
  GetOrSetOpenid: `http://wj.${host}/LittleProgram/UserInfo/GetSaveUserOpenId`,
}
module.exports = {
  phoneReg: phoneReg,
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
  // 获取头像信息
  getHeadInfo(successFun, failFun) {
    successFun = typeof (successFun) === 'function' ? successFun : function () { };
    failFun = typeof (failFun) === 'function' ? failFun : function () { };
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.getUserInfo({
            success: (res) => { //用户授权成功
              wx.setStorageSync('userInfo', res.userInfo);
              successFun(res.userInfo);
            },
            fail: (res) => { //拒绝授权
              failFun();
            }
          })
        }
      }
    })
  },
  //获取openid
  getOpenid() {
    let openid,
      code,
      userInfo;
    wx.login({
      success: (res) => {
        if (res.code) {
          //获取code
          code = res.code;
          wx.setStorageSync('code', code);
          openid = wx.getStorageSync('openid');
          if (openid === null || openid === '') {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo;
                wx.setStorageSync("userInfo", userInfo);//本地存储个人信息
                console.log(code, userInfo, data.mchid);
                wx.request({
                  url: config.GetOrSetOpenid,
                  data: {
                    code: code,
                    nickName: userInfo.nickName,
                    avaUrl: userInfo.avatarUrl,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: 'post',
                  success: function (res) {
                    console.log(res)
                    if (res.data.result) {
                      //保存openid
                      wx.setStorageSync('openid', res.data.openid);
                      //保存用户类型
                      wx.setStorageSync('userType', res.data.userType);
                    }
                  },
                  fail: function (res) {
                    console.log(res);
                  },
                  complete: function (res) {
                    console.log(res);
                  }

                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      },
      fail: () => { //用户不予授权
        console.log('用户不予授权')
      }
    })
  },

}