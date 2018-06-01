/***
 *      ┌─┐       ┌─┐
 *   ┌──┘ ┴───────┘ ┴──┐
 *   │                 │
 *   │       ───       │
 *   │  ─┬┘       └┬─  │
 *   │                 │
 *   │       ─┴─       │
 *   │                 │
 *   └───┐         ┌───┘
 *       │         │
 *       │         │
 *       │         │
 *       │         └──────────────┐
 *       │                        │
 *       │                        ├─┐
 *       │                        ┌─┘
 *       │                        │
 *       └─┐  ┐  ┌───────┬──┐  ┌──┘
 *         │ ─┤ ─┤       │ ─┤ ─┤
 *         └──┴──┘       └──┴──┘
 *                神兽保佑
 *               代码无BUG!
 */
App({
  onLaunch: function () { },
  onShow() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调,里面好像没啥用
    });
    updateManager.onUpdateReady((res) => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
  },
  globalData: {
    userInfo: null,
    /*
       教师发布课程
     */
    releaseCourse: {
      courseIntroduce: '', //课程介绍
      courseTime: [], //上课时间段
      courseTypeIndex: 0, //课程类型下标,
      courseName: '', //课程名称
      courseAllPrice: '', //课程价格
      courseDurationIndex: 0, //课程时长下标
    },
    /*
       教师基本资料
     */
    teacherFor: {
      TeaAbstract: "", //简介
      TeaAge: "", //外教年龄
      TeaAudio: "", //外教上课视频 
      TeaClaArea: "", //上课区域
      TeaDescript: "", //外教描述
      TeaGender: 1, //外教性别
      TeaId: 5, //外教id
      TeaIdPhoto: "",
      TeaNaLityId: 1, //国籍id
      TeaName: "", //外教姓名
      TeaNation: "", //国籍
      TeaPhone: "", //电话
      TeaQualif: [],
      /*
      {
        QfsCreateOn: '', //资质添加时间
        QfsPicName: '', //资质图片链接
        QfsId: 1,
        QfsTeaId: 1
      }
       */
      TeaUniversity: "", //外教大学
      TeaWeChat: "", //外教微信
    },
    //qualifs: [], //教师资质图片名称列表
  }
})
