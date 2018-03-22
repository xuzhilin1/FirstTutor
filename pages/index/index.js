//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    listData: [],
  },
  bindClick() { //点击按钮
    wx.request({
      url: '32.php',
      success: (res) => {
        if (res.statusData === 200) { //领取成功
          let listData = this.data.listData;
          listData[0] = 233;
          //修改本地数据，
          //下次进入本页面会再次调用getListData（）
          //数据仍然同步
          this.setData({ 
            listData: listData
          })
        }
      }
    })
  },
  getListData() { //进入页面，拿到页面数据
    wx.request({
      url: '123.php',
      success: (res) => {
        this.setData({
          listData: res.data
        })
      }
    })
  },
  onShow() {
    this.getListData();
  },
})
