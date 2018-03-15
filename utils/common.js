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
const host = "1-zhao.com";
const config = {
  //获取用户Openid
  GetOrSetOpenid: `http://wj.${host}/LittleProgram/UserInfo/GetSaveUserOpenId`,
}
module.exports = {
  // 获取头像信息
  getHeadInfo(successFun, failFun) {
    successFun = successFun ? successFun : function () { };
    failFun = failFun ? failFun : function () { };
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
      success: (res) => { //用户给与授权
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
                    // mchid: data.MchId
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: 'post',
                  success: function (res) {
                    console.log(res)
                    // if (res.data.result) {
                    //   dingwei();
                    //   wx.setStorageSync('openid', res.data.openid);
                    // }
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