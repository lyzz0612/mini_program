// activityDetail.js
Page({
  data: {
    prizeTypes: ['无', '状元', '一秀', '二举', '四进', '三红', '五子', '五红', '六勃黑', '遍地锦', '六勃红', '状元插金花'],
    activityId: '',
    activityName: '',
    participants: [],
    prizes: [],
    currentPerson: '',
    selectedPrizeType: '无',
    filteredPrizes: [],
    selectedPrize: ''    
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
      prizes: activityDetail.prizes,
      currentPerson: activityDetail.participants[0],
      selectedPrizeType: '无',
    });
    this.filterPrizes();
  },

  onPrizeCategoryChange: function(event) { 
    const selectedPrizeType = event.detail.value;
    this.setData({
      selectedPrizeType
    }, () => {
      this.filterPrizes();
    });
  },
  filterPrizes: function() {
    const { prizes, selectedPrizeType } = this.data;
    const filteredPrizes = prizes.filter(prize => prize.type === selectedPrizeType);

    filteredPrizes.unshift({"name": "无", "quantity": 1000})

    this.setData({
      filteredPrizes,
      selectedPrize: filteredPrizes.length > 0 ? filteredPrizes[0].name : ''
    });
  },
  onPrizeSelect: function(event) {
    const selectedPrize = event.detail.value;
    this.setData({
      selectedPrize
    });
  },
  saveResult() {
    const activities = wx.getStorageSync('activitys') || {};
    let activityDetail = activities[this.data.activityId];
    if(!activityDetail.result) {
      activityDetail.result = {};
    }
    if(!activityDetail.result[this.data.currentPerson]) {
      activityDetail.result[this.data.currentPerson] = [];
    }
    activityDetail.result[this.data.currentPerson].push({
      "prize": this.data.selectedPrize,
      "prizeType": this.data.selectedPrizeType
    })
    wx.setStorageSync('activitys', activities);
    
    const { prizes, selectedPrize, currentPerson, participants } = this.data;
    const filteredPrizes = prizes.filter(prize => prize.name == selectedPrize);
    if(filteredPrizes.length > 0) {
      filteredPrizes[0].quantity -= 1;
      this.setData({
        prizes
      });
    }
    let old_index = participants.indexOf(currentPerson)
    let new_index = (old_index + 1) % participants.length
    this.setData({
      currentPerson: participants[new_index],
      selectedPrizeType: '无',
    });
    this.filterPrizes();
  }

});
