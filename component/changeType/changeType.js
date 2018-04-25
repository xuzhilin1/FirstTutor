/**
 * auther: guo
 * date: 2018-4-24
 * use: 全局切换中英文
 */
const $common = require('../../utils/common.js');
const getOpenid = (callback) => { //获取openid
  callback = typeof callback === 'function' ? callback : () => { };
  wx.login({
    success: (res) => {
      if (res.code) {
        let code = res.code;
        let userInfo = wx.getStorageSync('userInfo');
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
          fail: (res) => {
            wx.showModal({
              title: '提示',
              content: '亲~网络不给力哦，请稍后重试',
              showCancel: false,
            })
          }
        });
      }
    }
  })
}
Component({
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isEn: false,
    falg: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    userInfo(res) { //获取个人信息
      wx.setStorageSync('userInfo', res.detail.userInfo);
      let falg = this.data.falg;
      if (!falg) return; //阻止连点
      this.data.falg = false;
      let openid = wx.getStorageSync('openid');
      if (!openid) { //没有openid
        getOpenid(this.stuOrTea);
      } else { //有openid
        this.stuOrTea();
      }
    },
    stuOrTea() { //判断是切换为老师或学生
      let isEn = this.data.isEn;
      if (!isEn) { //现处学生状态，需要切换为外教
        this.getForTeaStatus();
      } else {//现处外教状态，需要切换为学生
        this.changeType(1, this.changeSuccess.bind(this));
      }
    },
    changeSuccess() { //切换成功后执行的函数
      let isEn = this.data.isEn;
      this.setData({
        isEn: !isEn
      })
      wx.setStorageSync('isEn', !isEn);
      this.triggerEvent('isEnEvent', null);
      this.data.falg = true;
    },
    getForTeaStatus() { //获取外教信息
      $common.request(
        'POST',
        $common.config.GetForTeaStatus,
        {
          openId: wx.getStorageSync('openid')
        },
        (res) => {
          if (res.data.res) {
            wx.setStorageSync("teacherStatusInfo", res.data);
            let teaId = res.data.teaId;
            if (teaId == 0) { //该用户尚未注册为外教
              this.data.falg = true;
              wx.navigateTo({
                url: '/pages/me/register/register',
              })
            } else { //该用户注册过外教
              let teaBeDel = res.data.teaBeDel;
              if (teaBeDel == 1) { //该用户已被删除，重新注册
                this.data.falg = true;
                wx.navigateTo({
                  url: '/pages/me/register/register',
                })
              } else { //该用户未被删除
                let teaFirstReaCourse = res.data.TeaFirstReaCourse;
                if (teaFirstReaCourse == 0 && res.data.teaToe == 0) { //没有发布过课程，去注册成功页面
                  this.data.falg = true;
                  wx.navigateTo({
                    url: '/pages/me/registerSuccess/registerSuccess',
                  })
                } else { //用户有发布过课程，切换为外教
                  this.changeType(2, this.changeSuccess.bind(this));
                }
              }
            }
          } else {
            $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
            this.data.falg = true;
          }
        },
        (res) => {
          $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
          this.data.falg = true;
        }
      )
    },
    changeType(userType, callback) { //切换状态
      $common.request(
        'POST',
        $common.config.ChangeUserType,
        {
          openId: wx.getStorageSync('openid'),
          userType: userType
        },
        (res) => {
          if (res.data.res) {
            callback();
          } else {
            if (userType === 1) {
              $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
            } else if (userType === 2) {
              $common.showModal('未知错误');
            }
            this.data.falg = true;
          }
        },
        (res) => {
          if (userType === 1) {
            $common.showModal('Unknown Error', false, false, 'Ok', 'Reminder');
          } else if (userType === 2) {
            $common.showModal('未知错误');
          }
          this.data.falg = true;
        }
      )
    },
  },
  attached() {
    this.setData({
      isEn: wx.getStorageSync('isEn')
    })
  },
})
