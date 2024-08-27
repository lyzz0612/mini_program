// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userInfo: null as WechatMiniprogram.UserInfo | null,
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于显示用户信息',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
        });
      },
    });
  },

  // 创建房间
  createActivity() {
    wx.navigateTo({
      url: '../createActivity/createActivity',
    });
  },
  // 创建房间
  activityList() {
    wx.navigateTo({
      url: '../activityList/activityList',
    });
  },
  
});
