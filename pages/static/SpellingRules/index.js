// pages/Home/SpellingRules/index.js
Page({
  data: {
    pagesData: [],
  },
  getPagesData() {
    let arr = [{
      title: ' 一、拼团有效期',
      context: ['拼团有效期是自开团时刻起24小时内，如果距离活动结束时间小于24小时，则以活动结束时间为准。']
    }, {
      title: ' 二、拼团成功',
      context: ['拼团有效期内，支付的用户达到参团人数，则拼团成功。']
    }, {
      title: ' 三、拼团失败',
      context: [
        '拼团有效期后，未达成相应参团人数的团，则该团失败。',
        '拼团失败的订单，系统会在1-7个工作日内处理退款，系统处理后1-10个工作日内原路退回至原支付账户中。']
    }, {
      title: ' 四、等待成团中如何退款？',
      context: ['拼团有效期后，未达成相应参团人数的要求，则该团失败，系统会自动退款。']
    }];
    let arrEn = [{
      title: 'I. the validity of the group.',
      context: ['It is valid for 24 hours from the time of the opening, and if the distance is less than 24 hours, the end time of the activity shall prevail.']
    }, {
      title: 'II.the group succeeds.',
      context: ['During the validity period of the group, the number of users paid to the participating group will be successful.']
    }, {
      title: 'III.Spell group failure.',
      context: [
        'After the period of validity, the group failed to reach the corresponding number of participants.',
        'The system will handle the refund within 1-7 working days. The original route will be returned to the original payment account within 1-10 working days after the system is processed.']
    }, {
      title: 'Ⅳ.How can I get a refund in the group?',
      context: ['After the validity of the group, no corresponding number of participants is required, the group fails, and the system will refund automatically.']
    }];
    this.setData({
      pagesData: this.data.isEn ? arrEn : arr
    })
  },

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  isEnEvent(res) { //判断当前显示中英文
    let isEn = wx.getStorageSync('isEn');
    this.setData({
      isEn: isEn
    });
    let text = isEn ? "Rules of the group" : "拼团规则";
    wx.setNavigationBarTitle({
      title: text
    })
    this.getPagesData();
  },
  onShow: function () {
    this.isEnEvent();
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