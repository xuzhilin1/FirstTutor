/**
 * 在线沟通
 */
const $common = require('../../../utils/common.js');
let SocketTask;
Page({
  data: {
    srcForIdPhoto: $common.srcForIdPhoto,
    value: '', //聊天框的初始内容
    myImage: '',
    youImage: '',
    pageIndex: 1,
    pageSize: 7,
    listData: [],
    userId: -1,
    newDataCount: 0, //自己发送与接收数据之和
    tarTeaId: '',
  },
  courseInfo() { //跳转到课程信息
    let tarTeaId = this.data.tarTeaId;
    let returnPage = this.data.returnPage;
    let tarUserType = this.data.tarUserType;
    if (returnPage) { //由课程信息和支付页面跳过来的又要跳回去
      wx.navigateBack({
        delta: returnPage
      })
    } else {
      if (tarTeaId <= 0 || tarUserType == 1) return; //对方不是老师
      wx.navigateTo({
        url: `/pages/Home/teachersInformation/index?data=${tarTeaId}`,
      })
    }
  },
  removeDuplicate(thisArr, thisId) { //去重
    let hash = {};
    let newArr = thisArr.reduce(function (item, target, index) {
      hash[target[thisId]] ? item[hash[target[thisId]].nowIndex] = target : hash[target[thisId]] = {
        nowIndex: item.push(target) && index
      }
      return item;
    }, []);
    return newArr;
  },
  confirm(e) { //点击右下角 发送 按钮
    let value = e.detail.value;
    if (value.trim().length <= 0) return;
    let obj = {
      CrdChatMsg: value,
      CrdReceOpId: this.data.userId
    }
    wx.sendSocketMessage({ //发送消息
      data: JSON.stringify(obj),
      success: (res) => {
        let newDataCount = this.data.newDataCount;
        newDataCount++;
        let listData = this.data.listData;
        let lastData = listData[listData.length - 1];
        let date = new Date();
        let timeStamp = date.getTime();
        let y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          h = date.getHours(),
          f = date.getMinutes();
        m < 10 && (m = '0' + m);
        d < 10 && (d = '0' + d);
        h < 10 && (h = '0' + h);
        f < 10 && (f = '0' + f);
        let showTime = `${y}-${m}-${d} ${h}:${f}`;
        let obj = {
          CrdId: timeStamp, //暂用时间戳代替唯一id
          CrdBeMySelf: 1,
          CrdChatMsg: value,
          timeStamp: timeStamp,
          showTime: showTime,
          isTime: listData.length > 0 ? timeStamp - lastData.timeStamp >= 300000 ? true : false : false
        };
        listData.push(obj);
        this.setData({
          value: '',
          newDataCount: newDataCount,
          listData: listData
        })
        this.myPageScroll();
      }
    })

  },
  myPageScroll() {
    wx.createSelectorQuery().select('#wrap').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec();
  },
  getImage() { //获取头像
    let isEn = wx.getStorageSync('isEn');
    $common.request(
      'POST',
      $common.config.GetUserInfo,
      {
        openId: wx.getStorageSync('openid'),
        userId: this.data.userId
      },
      (res) => {
        if (res.data.res) {
          this.setData({
            myImage: res.data.curAvaUrl,
            // myType: res.data.curUserType,
            myType: res.data.curAvaUrl.indexOf('http') !== -1 ? 1 : 2,
            youImage: res.data.tarAvaUrl,
            // youType: res.data.tarUserType,
            youType: res.data.tarAvaUrl.indexOf('http') !== -1 ? 1 : 2,
            tarTeaId: res.data.tarTeaId,
            tarUserType: res.data.tarUserType
          })
        } else {
          // switch (res.data.errType) {
          //   case 1:
          //     $common.showModal('参数错误');
          //     break;
          //   case 2:
          //     $common.showModal('获取头像失败');
          //     break;
          // }
        }
      },
      (res) => {

      },
      (res) => {
      }
    )
  },
  timeStamp(time) { //时间戳转换为日期
    time = time.replace("/Date(", '').replace(')/', '');
    let date = new Date(parseInt(time)),
      y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      f = date.getMinutes();
    let msec = Date.parse(new Date(parseInt(time)));
    m < 10 && (m = '0' + m);
    d < 10 && (d = '0' + d);
    h < 10 && (h = '0' + h);
    f < 10 && (f = '0' + f);
    return {
      timeWhile: `${y}-${m}-${d} ${h}:${f}`,
      msec: msec
    }
  },
  getChat(isReach) { //获取聊天记录
    isReach = isReach ? true : false;
    let pageIndex = isReach ? this.data.pageIndex : 1,
      pageSize = this.data.pageSize,
      newDataCount = this.data.newDataCount;
    let isEn = wx.getStorageSync('isEn');
    let text = isEn ? 'Loading...' : '努力加载中...';
    wx.showLoading({ title: text });
    $common.request(
      'POST',
      $common.config.GetChatRecord,
      {
        openId: wx.getStorageSync('openid'),
        userId: this.data.userId,
        pageIndex: pageIndex,
        pageSize: pageSize,
        newDataCount: newDataCount
      },
      (res) => {
        if (res.data.res) {
          let data = res.data.infoList;
          if (data.length >= pageSize) {
            pageIndex++;
          }
          let listData = isReach ? this.data.listData : [];
          for (let i = 0, len = data.length; i < len; i++) {
            let date = this.timeStamp(data[i].CrdSendTime);
            data[i].showTime = date.timeWhile;
            data[i].timeStamp = date.msec;
            //对话时距超过5分钟显示时间 
            data[i].isTime = i > 0 ? data[i].timeStamp - data[i - 1].timeStamp >= 300000 ? true : false : false;
            listData.unshift(data[i]);
          }
          this.setData({
            listData: this.removeDuplicate(listData, 'CrdId'), //数组依据CrdId去重
            pageIndex: pageIndex
          })
        } else {
          // switch (res.data.errType) {
          //   case 1:
          //     //参数错误
          //     break;
          //   case 2:
          //     //userId不正确
          //     break;
          //   case 3:
          //     //获取记录失败
          //     break;
          //   case 4:
          //     //更改消息状态失败
          //     break;
          // }
        }
      },
      (res) => {

      },
      (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    )
  },
  init() {
    let openid = wx.getStorageSync('openid');
    this.getImage();
    this.getChat();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = options.userId;
    let returnPage = options.returnPage ? parseInt(options.returnPage) : false;
    this.setData({
      userId: userId,
      returnPage: returnPage
    });
    let openid = wx.getStorageSync('openid');
    //建立连接
    wx.connectSocket({
      url: `${$common.webStock}?userId=${openid}&tarUserId=${userId}`,
    });
    //连接成功
    wx.onSocketOpen(() => {
      //console.log('WebSocket连接已打开！');
    })
    //接收数据
    wx.onSocketMessage((res) => {
      let data = JSON.parse(res.data);
      if (data.CrdReceOpId != this.data.userId) {
        return; //不是正在和你说话的人，不鸟他
      }
      let newDataCount = this.data.newDataCount;
      newDataCount++;
      let listData = this.data.listData;
      let obj = {
        CrdBeMySelf: 0,
        CrdChatMsg: data.CrdChatMsg,
      };
      let date = new Date(parseInt(data.CrdCreateOn)),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        f = date.getMinutes();
      m < 10 && (m = '0' + m);
      d < 10 && (d = '0' + d);
      h < 10 && (h = '0' + h);
      f < 10 && (f = '0' + f);
      obj.CrdId = new Date().getTime(); //暂用时间戳代替唯一id
      obj.showTime = `${y}-${m}-${d} ${h}:${f}`;
      obj.timeStamp = data.CrdCreateOn;
      let lastData = listData[listData.length - 1];
      obj.isTime = listData.length > 0 ? obj.timeStamp - lastData.timeStamp >= 300000 ? true : false : false;
      listData.push(obj);
      this.setData({
        newDataCount: newDataCount,
        listData: listData
      });
      this.myPageScroll();
    });
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
    let text = isEn ? "Your Messages" : "在线沟通";
    wx.setNavigationBarTitle({
      title: text
    })
  },
  onShow: function () {
    this.isEnEvent();
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.closeSocket();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getChat(true);
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