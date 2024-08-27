// activityDetail.js
Page({
  data: {
    activityId: '',
    activityName: '',
    participants: [],
    prizes: [],
    newParticipantName: ''
  },

  onLoad: function(options) {
    // 假设在页面加载时，从服务器或本地存储中获取活动详情
    this.loadActivityDetail(options.id);
  },

  loadActivityDetail: function(id) {    
    const activities = wx.getStorageSync('activitys') || {};
    let activityDetail = activities[id];

    this.setData({
      activityId: id,
      activityName: activityDetail.activityName,
      participants: activityDetail.participants,
      prizes: activityDetail.prizes
    });
  },

  bindNameInput: function(e) {
    this.setData({
      newParticipantName: e.detail.value
    });
  },

  addParticipant: function() {
    if (this.data.newParticipantName) {
      const newParticipant = this.data.newParticipantName;
      this.setData({
        participants: [...this.data.participants, newParticipant],
        // 清空输入框
        newParticipantName: ''
      });
    } else {
      wx.showToast({
        title: '请输入参与者名称',
        icon: 'none'
      });
    }
  },

  removeParticipant: function(e) {
    const { index } = e.currentTarget.dataset;
    const { participants } = this.data;
    participants.splice(index, 1);
    this.setData({ participants });
  },

  startActivity: function() {
    // 启动活动逻辑
    const id = this.data.activityId;
    const activities = wx.getStorageSync('activitys') || {};
    let activityDetail = activities[id];
    activityDetail.participants = this.data.participants;
    wx.setStorageSync('activitys', activities);
    
    wx.navigateTo({
      url: `/pages/activityLogic/activityLogic?id=${id}`,
    });
  }
});
