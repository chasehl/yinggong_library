// pages/ecard/ecard.js
Page({
  data: {
    userInfo: {
      name: '张三',
      department: '计算机科学与技术学院',
      cardNumber: '202100109527',
      type: '本科生',
      avatar: '/images/default-avatar.png' // 替换为真实头像地址
    },
    originalBrightness: 0.5, // 记录原来的亮度
    timer: null
  },

  onLoad(options) {
    // 实际场景：调用API获取用户信息和动态码
    this.fetchUserInfo();
  },

  onShow() {
    // 1. 进入页面，调高屏幕亮度，方便扫码
    this.handleBrightness(true);
    // 2. 开启定时刷新（模拟动态码防止截屏）
    this.startRefreshTimer();
  },

  onHide() {
    // 离开页面，恢复亮度并清除定时器
    this.handleBrightness(false);
    this.clearRefreshTimer();
  },

  onUnload() {
    this.handleBrightness(false);
    this.clearRefreshTimer();
  },

  // --- 业务逻辑 ---

  fetchUserInfo() {
    // TODO: 发起 wx.request 获取用户数据
    console.log("加载用户信息...");
  },

  refreshCode() {
    wx.showToast({
      title: '二维码已更新',
      icon: 'none'
    });
    // TODO: 重新请求后端获取新的二维码图片或字符串
  },

  startRefreshTimer() {
    this.setData({
      timer: setInterval(() => {
        this.refreshCode();
      }, 60000) // 每60秒刷新一次
    });
  },

  clearRefreshTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  handleBrightness(isHigh) {
    if (isHigh) {
      // 获取当前亮度备份
      wx.getScreenBrightness({
        success: (res) => {
          this.setData({ originalBrightness: res.value });
          // 设置为最亮 (0~1)
          wx.setScreenBrightness({ value: 0.8 });
        }
      });
    } else {
      // 恢复原来的亮度
      wx.setScreenBrightness({ value: this.data.originalBrightness });
    }
  }
});