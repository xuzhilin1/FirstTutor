// component/timeSlot/timeSlot.js
/*
  author: guo
  date: 2018-04-20
  use: 选择时间段
 */
const timeList = (function () {
  //周几就用数字1234567代替，时间段就用1（上午），2（下午1），3（下午2），4（晚上）代替
  //0 无法选中 1 未选 2 已选
  let arr = [];
  for (let i = 0; i < 28; i++) {
    if (i < 7) {
      arr.push({
        timeName: '上午',
        timeType: 0,
        TimClaTime: 1,
        TimAfw: i + 1
      });
      continue;
    }
    if (i < 14) {
      arr.push({
        timeName: '下午1',
        timeType: 0,
        TimClaTime: 2,
        TimAfw: i - 7 + 1
      });
      continue;
    }
    if (i < 21) {
      arr.push({
        timeName: '下午2',
        timeType: 0,
        TimClaTime: 3,
        TimAfw: i - 14 + 1
      });
      continue;
    }
    if (i < 28) {
      arr.push({
        timeName: '晚上',
        timeType: 0,
        TimClaTime: 4,
        TimAfw: i - 21 + 1
      });
      continue;
    }
  }
  return arr;
}());
const timeListEn = (function () {
  //周几就用数字1234567代替，时间段就用1（AM），2（PM1），3（PM2），4（PM3）代替
  //0 无法选中 1 未选 2 已选
  let arr = [];
  for (let i = 0; i < 28; i++) {
    if (i < 7) {
      arr.push({
        timeName: 'AM',
        timeType: 0,
        TimClaTime: 1,
        TimAfw: i + 1
      });
      continue;
    }
    if (i < 14) {
      arr.push({
        timeName: 'PM1',
        timeType: 0,
        TimClaTime: 2,
        TimAfw: i - 7 + 1
      });
      continue;
    }
    if (i < 21) {
      arr.push({
        timeName: 'PM2',
        timeType: 0,
        TimClaTime: 3,
        TimAfw: i - 14 + 1
      });
      continue;
    }
    if (i < 28) {
      arr.push({
        timeName: 'PM3',
        timeType: 0,
        TimClaTime: 4,
        TimAfw: i - 21 + 1
      });
      continue;
    }
  }
  return arr;
}());
Component({
  properties: {
    timeTables: {
      type: Array,
      observer(res) { //页面把数据传过来触发，哪些课程可以选
        let timeTables = res,
          timeList = this.data.timeList;
        if (timeTables.length <= 0) return; //第一次或没有值，不管他
        for (let i = 0, len = timeTables.length; i < len; i++) {
          //该时间段已被购买，或不向学生展示
          if (timeTables[i].TimBePurch === 1 || timeTables[i].TimCanUse === 0) continue;
          for (let j = 0, l = timeList.length; j < l; j++) {
            if (timeTables[i].TimAfw == timeList[j].TimAfw && timeTables[i].TimClaTime == timeList[j].TimClaTime) { //相同
              timeList[j].timeType = 1;
              timeList[j].TimId = timeTables[i].TimId;
              break;
            }
          }
        }
        this.setData({
          timeList: timeList
        });
        this.triggerEvent('SonTime', { timeList: timeList });//将数据返回给父组件
      }
    },
    timeNoTables: {
      type: null,
      observer(res) {//页面把数据传过来触发，哪些课程不能选
        let timeNoTables = res;
        if (timeNoTables === -1) return; //第一次传的默认值，不管他
        let timeList = this.data.timeList;
        for (let j = 0, l = timeList.length; j < l; j++) {
          timeList[j].timeType = 1;
        }
        for (let i = 0, len = timeNoTables.length; i < len; i++) { //判断那些时间段不能选
          for (let j = 0, l = timeList.length; j < l; j++) {
            if (timeNoTables[i].TimAfw === timeList[j].TimAfw && timeNoTables[i].TimClaTime === timeList[j].TimClaTime) {
              timeList[j].timeType = 0;
            }
          }
        }
        let app = getApp(),
          courseTime = app.globalData.releaseCourse.courseTime;
        for (let i = 0, len = courseTime.length; i < len; i++) {//判断那些时间段已选
          for (let j = 0, l = timeList.length; j < l; j++) {
            if (courseTime[i].TimAfw === timeList[j].TimAfw && courseTime[i].TimClaTime === timeList[j].TimClaTime) {
              timeList[j].timeType = 2;
            }
          }
        }
        this.setData({
          timeList: timeList
        })
        this.triggerEvent('SonTime', { timeList: timeList });//将数据返回给父组件
      }
    },
    isEn: { //是否显示英文版
      type: Boolean,
      value: false,
      observer(res) {
        if (res) {
          this.setData({
            weekList: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            timeList: timeListEn
          })
        }
      }
    }
  },
  data: {
    weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeList: timeList,
    isEn: false
  },
  attached() {
    let isEn = wx.getStorageSync('isEn');
    this.setData({
      isEn: isEn
    })
    if (isEn) {
      this.setData({
        weekList: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        timeList: timeListEn
      })
    }
  },
  methods: {
    _selectTime(e) { //选择时间触发
      let index = e.currentTarget.dataset.index;
      let timeList = this.data.timeList;
      if (timeList[index].timeType === 0) return;
      timeList[index].timeType = timeList[index].timeType === 1 ? 2 : 1;
      this.setData({
        timeList: timeList
      })
      this.triggerEvent('SonTime', { timeList: timeList });//将数据返回给父组件
    },
  },
})
