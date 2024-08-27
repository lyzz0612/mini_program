Page({
  data: {
    prizeTypes: ['无', '状元', '一秀', '二举', '四进', '三红', '五子', '五红', '六勃黑', '遍地锦', '六勃红', '状元插金花'],
    activityName: '博饼活动',
    maxParticipants: 10,
    prizeName: '',
    prizeQuantity: 1,
    prizeType: '一秀',
    prizes: [],
  },

  bindInputActivityName: function (e) {
    this.setData({
      activityName: e.detail.value
    });
  },

  bindPrizeNameInput: function (e) {
    this.setData({
      prizeName: e.detail.value
    });
  },
  onPickerChange: function(e) {
    this.setData({
      prizeType: this.data.prizeTypes[e.detail.value]
    })
  },

  bindPrizeQuantityInput: function (e) {
    this.setData({
      prizeQuantity: e.detail.value
    });
  },

  bindMaxParticipantsInput: function (e) {
    this.setData({
      maxParticipants: e.detail.value
    });
  },

  addPrize: function () {
    const { prizeName, prizeQuantity, prizeType, prizes } = this.data;
    if (prizeName && prizeQuantity) {
      prizes.push({ name: prizeName, quantity: prizeQuantity, type: prizeType });
      this.setData({
        prizes,
      });
      this.setData({
        prizeName: '',
        prizeQuantity: 1,
        prizeType: '一秀'
      });
    }
  },

  removePrize: function (e) {
    const { index } = e.currentTarget.dataset;
    const { prizes } = this.data;
    prizes.splice(index, 1);
    this.setData({ prizes });
  },

  saveActivityDetail: function () {
    const { activityName, maxParticipants, prizes } = this.data;
    const newActivity = {
      id: Date.now(),
      activityName,
      maxParticipants,
      participants: [],
      prizes
    };

    let activitys = wx.getStorageSync('activitys') || {};
    activitys[newActivity.id] = newActivity
    wx.setStorageSync('activitys', activitys);

    wx.showToast({
      title: '活动保存成功',
      icon: 'success'
    });

    // Reset form
    this.setData({
      activityName: '博饼活动',
      prizes: [],
      maxParticipants: 10
    });
    wx.navigateBack();
  }
});
