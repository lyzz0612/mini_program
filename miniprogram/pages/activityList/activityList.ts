// activityList.ts
Page({
  data: {
    activities: [],
  },

  onLoad() {
    this.loadActivities();
  },

  onShow() {
    this.loadActivities();
  },

  loadActivities() {
    const activities = wx.getStorageSync('activitys') || {};
    this.setData({ activities: Object.values(activities) });
  },

  viewActivity(event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`,
    });
  },

  deleteActivity(event) {
    const id = event.currentTarget.dataset.id;
    let activities = this.data.activities.filter((activity) => activity.id !== id);
    this.setData({ activities });
    
    const storage_activities = wx.getStorageSync('activitys') || {};
    delete storage_activities[id];
    wx.setStorageSync('activitys', storage_activities);

    wx.showToast({
      title: '活动已删除',
      icon: 'success',
      duration: 2000,
    });
    // event.
  },
});
