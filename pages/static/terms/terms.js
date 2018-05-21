// pages/Home/SpellingRules/index.js
Page({
  data: {
    pagesData: {},
  },
  getPagesData() {
    let arr = {
      title: '条款与条件',
      name: '上海翌师教育科技有限公司',
      context: [{
        item: '本条款与条件构成上海翌师教育科技有限公司（下称“FirstTutor”）和您之间的有效协议。请务必仔细阅读本条款与条件。在您下单时即视为同意本条款与条件，该等同意不因订单提前终止或服务终止而失效。'
      }, {
        item: 'FirstTutor小程序提供包括互联网教学信息发布与信息搜索，教学信息交互，下单，三方支付等服务。用户应遵守腾讯的支付规则，但若本条款与条件与腾讯《微信支付服务协议》相冲突的，以本条款与条件为准。'
      }, {
        item: '您确认，您是具有完全民事权利能力和民事行为能力的自然人；若您为未成年人，您的父母或监护人已同意您使用我们的服务及您向我们提供信息。您自愿向FirstTutor提供个人信息，FirstTutor有权将该等信息以为您提供或改善服务之目的使用该等信息或分享给关联方及指定服务供应商或合伙伙伴。'
      }, {
        item: '您确认，FirstTutor仅提供平台服务，在个人用户和教师之间实现对接；对于用户和教师之间具体的线上和线下沟通、时间和地点等不负有义务，也不承担任何责任。FirstTutor建议您在线上尽可能多地了解教师的情况，并就教师的能力予以评估；此外，建议在线下沟通时核对教师护照或身份证及其资质证书。作为用户，您将单独承担核实教师资质和能力的责任；任何情况下，FirstTutor将不会对教师的资质、教学质量和风格等负责。FirstTutor将通过系统消息及向用户推送留言等方式与用户联系，用户同意接受来自FirstTutor的消息或留言。'
      }, {
        item: '您确认，FirstTutor将扣除您第一节课时费用的20%作为平台手续费，该手续费可用于抵消应向教师支付的第一节课时费用中20%的部分，您需要与教师自行达成关于结算方式的约定。付款以FirstTutor的账户实收为准。自用户在FirstTutor中提交完支付指令后至FirstTutor的账户实收款项前的期间，用户资金发生的风险与FirstTutor无关。您有义务维护FirstTutor账号及支付密码的安全性，且操作应仅限于本人，并承担一切责任。如FirstTutor含有到其他网站的链接，FirstTutor不对那些网站的隐私保护措施负责；当用户登录时,请提高警惕。'
      }, {
        item: '您同意，当且仅当在以下情况下，您可以申请退款：',
        list: [
          '(1)教师在付费后5个工作日内未能及时以任何形式反馈的，您需要在下单之日起7天内及时和我们联系并提供证据。',
          '(2)教师在双方约定首次课后，在未给予适当解释的情况下没有出现在指定地点的，您需要在事件发生之日起2天内及时和我们联系并提供证据，FirstTutor在与教师核实后在30天内退款。',
          '(3)教师于FirstTutor展示的履历或资质证明被证明存在造假。您需要在您知晓该等情况之日起2天内及时和我们联系并提供证据，FirstTutor进行核实后在30天内退款。'
        ]
      }, {
        item: '您确认，您在FirstTutor提供的个人信息及交易信息准确无误，且不存在虚假交易，您上传的信息不得含有危害国家秘密或主权、危害民族团结、邪教、迷信、暴力、色情、赌博、恐怖活动以及其他非法的内容，并对其产生的一切纠纷独自承担法律责任。FirstTutor享有对服务的监督和纠正等权利，有权删除或屏蔽用户上传的非法及侵权信息。如用户以非法目的使用平台，不以个人约课上课的真实交易为目的使用平台（如用户为运营培训机构或类似目的约课的，应事先获得FirstTutor书面同意方可进行），存在被投诉等不良记录及其他侵犯FirstTutor合法权益的行为的，FirstTutor有权取消您的需求信息，且您应承担法律责任。'
      }, {
        item: '您确认，FirstTutor对其程序及软件、其中的图文、标识等拥有版权及合法权利，并授予客户免费的、不可转让的、非独占的登陆和使用程序及软件的许可。客户不得复制、修改FirstTutor程序及软件或违法使用FirstTutor拥有版权的内容，也不得反向工程或试图提取FirstTutor程序及软件源代码。'
      }, {
        item: '您确认，FirstTutor不对不可抗力及基于网络特殊属性发生的黑客攻击、计算机病毒侵入、电信部门技术调整、腾信微信平台或相关系统的稳定性、用户将个人账号信息告知他人、教师与学员间或与任何第三人间的违约或侵权行为等FirstTutor无法控制的情况承担责任。'
      }, {
        item: '您同意，FirstTutor有权在依据法律和政府或司法机构指令、或者在您被投诉时经合理判断认为必要的情况下，单方披露您的个人信息和交易信息。'
      }, {
        item: '您同意，FirstTutor有权随时单方面对本条款与条件进行修改，并在小程序内予以更新，您须及时审阅任何修改。如果您不同意更新的，应立即停止使用FirstTutor；若您继续登录或使用小程序的，表示您已接受修改并将遵循修改后的条款。'
      }, {
        item: '本条款与条件之执行及争议解决等均适用中华人共和国大陆法律。任何争议无法协商一致的，应提交至FirstTutor注册地所在人民法院以诉讼方式解决。'
      }, {
        item: 'FirstTutor保留对本条款与条件的最终解释权。'
      }
      ]
    }
    this.setData({
      pagesData: arr
    })
  },

  onLoad: function (options) {
    console.log(options);
    let isEn = parseInt(options.isEn) === 1 ? true : false;
    this.setData({
      isEn: isEn
    });
    if (isEn) {
      wx.setNavigationBarTitle({
        title: 'Terms and conditions'
      })
    } else {
      wx.setNavigationBarTitle({
        title: 'FirstTutor服务协议'
      })
    }
    this.getPagesData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


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