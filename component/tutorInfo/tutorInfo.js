const $common = require('../../utils/common.js');
Component({
  properties: {
    chatImage: { //聊天图片
      type: String,
      value: ''
    },
    photoUrl: { //图片头部链接
      type: String,
      value: 'https://wj.1-zhao.com/ForIdPhoto/'
    },
    infoList: { //传入组件的数据
      type: Object,
      value: {
        TeaId: 7,
        TeaName: '孟军辉',
        TeaNaLityId: 1,
        TeaAddV: 1,
        TeaAbstract: '好',
        TeaAvaUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6KgwJjhMHT3Qgnk3LmiaHict98bE5Ad1MIhNSDiauB8034UBUgEaiaiaIXnKeUicKkosfOQ22SPgVASzA/0',
        RewScore: 5,
        TeaSortNum: 6,
        TeaIDPhoto: '20180419103902518411.jpg'
      },
      observer(res) {
      }
    }
  },
  data: {

  },
  methods: {
    lookYouImage() { //点击查看头像
      let data = this.data.infoList,
        url = this.data.photoUrl,
        image = data.TeaIDPhoto ? url + data.TeaIDPhoto : data.TeaAvaUrl;
      wx.previewImage({
        urls: [image],
      })
    },
    getUserInfo(e) {
      let userInfo = e.detail.userInfo;
      if (!userInfo) return;
      $common.getUserInfo(userInfo, this.chat.bind(this));
    },
    chat() { //进入聊天界面
      let userId = this.data.infoList.TeaUserId;
      wx.navigateTo({
        url: `../../New/onlineChart/index?userId=${userId}`,
      })
    },
  }
})
