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
        item: '您确认，FirstTutor仅提供平台服务，在个人用户和教师之间实现对接；对于用户和教师之间具体的线上和线下沟通、时间和地点等不负有义务，也不承担任何责任。FirstTutor建议您在线上尽可能多地了解教师的情况，并就教师的能力予以评估；此外，建议在线下沟通时核对教师护照或身份证及其资质证书。作为用户，您将单独承担核实教师资质和能力的责任；任何情况下，FirstTutor将不会对教师的资质、教学质量和风格、以及您或教师的行为等负责。FirstTutor将通过系统消息及向用户推送留言等方式与用户联系，用户同意接受来自FirstTutor的消息或留言。'
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
    };
    let arrEn = {
      title: 'TERMS AND CONDITIONS',
      context: [{
        item: 'This document ("Terms") sets out the terms and conditions on which we (Shanghai FirstTutor Education Science & Technology Co., Ltd., 上海翌师教育科技有限公司 in Chinese, hereinafter as "FirstTutor") provide our FirstTutor WeChat Mini Program ("Program") and the services available through the Program ("Services") to you as a Tutor of FirstTutor ("Tutor", "you" or "your"). By using of our Services or registering with FirstTutor, you have confirmed that you agree to these Terms, thus please carefully read and understand them.'
      }, {
        item: 'You promise to us that you are at least sixteen years of age and can (and will on request) provide electronic scanned copies of any references, or proof of qualifications and experience, as claimed in your profile.'
      }, {
        item: 'You shall respond to all enquiries from the learners who communicate or order in the Program ("Learners") within 2 days, hence you recommend you check your messages in or delivered by FirstTutor on a regular basis. We may switch off the profiles of tutors who do not reply to enquiries in a timely manner.'
      }, {
        item: 'For the tuition, Learner pays the tutor course fees offline, less the deposit (i.e. 20% of the total fee for the first course paid by Learnerto FirstTutor online) from the payable for the first course to tutor. The deposit is the one-off lump sum fee charged by FirstTutor for its platform service to you.'
      }, {
        item: 'In the event that a Learner contacts us to request a refund, we will ask you to provide feedback via our feedback complaint process, stating the reason for the refund request. If you do not respond to this feedback within 7 days of the feedback being posted on the Program, wehave the right (but not obligated) to assume that the Learner is correct and this may adversely affect your score orcredibility assessed by or shown inthe Program.'
      }, {
        item: 'You acknowledge that Learners are entitled to submit feedback on you, your profile and your tutoring services. Learners can submit scores out of five and written comments, and FirstTutor has the right to make adjustment per reasonable assessment. In responding to feedback from Learners posted on the Program, you shall not be personally abusive about a Learner or anyone else.',
      }, {
        item: 'You warrant that at no time shall you directly or indirectly suggest to a Learner that he or she apply for a refund that a Learner has made through the Program, nor shall you facilitate, or provide, the continuation of tutoring (where the tutoring is not via FirstTutor) to a Learner who has applied for (or received) a refund from The Program. In the event of your breach of this paragraph, we reserve the right to charge you for the relevant refunded booking as well as for any costs that we have reasonably incurred as a consequence of your breach of this paragraph.'
      }, {
        item: 'You promise that your phone number and other contact information provided to us are accurate and that you will update us with any changes to your contact information. Your further promise that your feedbacks to or communication with FirstTutor or Learners are always consistent with the facts. In the event that you provide inaccurate or malicious feedback about FirstTutor (including for example through a web based review site or on social media), we reserve the right to terminate our arrangement with you without notice and without liability.'
      }, {
        item: 'You warrant that you will provide your services to Learners as an independent tutor and not as a Company. You shall at all times conduct yourself in a legal and professional manner fitting of a teacher both in your dealings with your Learners.'
      }, {
        item: 'Your use of the Program and its contents grants no rights to you in relation to anyintellectual property rights ("IP Rights", in particular, trademarks and logos)  byFirstTutor, whether owned by us or by third parties.'
      }, {
        item: 'You agree and acknowledge that FirstTutoror the Program merely serves a platform through which Tutorand Learner is able to make preliminary communications and get each other’s contact information, andunder no circumstances willFirstTutor be liable to you for your use of the Program or our provisions of the Services. We are not a party to the tutoring agreement or arrangement between the Tutor and the Learner, and we shall not be liable for any actions of Learners/Tutors or other third parties.'
      }, {
        item: 'You acknowledge that (i) you are not an employee of ours, (ii) you accept full responsibility for all income tax and other taxation, as well as liabilities arising from your tutoring activities. You will  compensate us for all (if any) claims, liabilities, costs and expenses that we may suffer, which arise out of or in connection with your use of the Program, including, in particular, your breach of the Terms or the agreement with Learners, any claim raised by Learner or third-party due to your reason, or your illegal or inappropriate behaviors.',
      }, {
        item: 'The information contained in the Programis for general information purposes only and we endeavour to keep the information up-to-date and correct, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliabilityor availability with respect to the Programor the information, products or servicescontained or referred to inthe Program for any purpose. Effort is made to keep the Program running smoothly. However, FirstTutor takes no responsibility for and will not be liable for theProgram being temporarily unavailable due to technical or other issues beyond our control. Any reliance you place on such information is therefore strictly at your own risk.'
      }, {
        item: 'FirstTutor is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified (including but not limited to, your name, passport number, contact number and address, locationand other information reasonably required by our operation of the Program) when using the Program, you can be assured that it will only be used in accordance with these Terms.'
      }, {
        item: 'We might use such information for the purposes of maintaining or improving our products and services to Tutors or Learners or market research purposes. We may contact you by e-mail, phone, fax or mailusing the contact information which you have provided serving the purposes of operating theProgram or other information which we think you may find interesting. We might share such information with our affiliates or business partners serving the above purposes. Nevertheless, we are committed to use reasonable efforts to ensure that your information uploaded in the Program is secure.'
      }
      ]
    };
    this.setData({
      // pagesData: arrEn
      pagesData: this.data.isEn ? arrEn : arr
    })
  },

  onLoad: function (options) {
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