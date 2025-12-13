// pages/me/me.js
const app = getApp();

Page({
  data: {
    isLogin: false,
    userInfo: {
      nickName: "未登录",
      avatar: "/images/default-avatar.png",
      department: ""
    },
    // 核心数据
    stats: {
      borrowCount: 0,
      reserveCount: 0,
      messageCount: 0,
      favoriteCount: 0
    }
  },

  onShow() {
    this.checkLoginStatus();
  },

  // 1. 检查登录状态并加载数据
  checkLoginStatus() {
    const isLogin = app.globalData.isLogin;
    this.setData({ isLogin });

    if (isLogin) {
      // 如果已登录，更新用户信息（这里使用 Mock 数据）
      // 实际开发中应该从 app.globalData.userInfo 或本地缓存读取
      this.setData({
        userInfo: {
          nickName: "明天你好",
          avatar: this.data.userInfo.avatar !== "/images/default-avatar.png" ? this.data.userInfo.avatar : "/images/avatar1.jpg", // 模拟头像
          department: "计算机科学与技术学院"
        }
      });
      
      this.fetchUserStats();
    } else {
      // 未登录重置数据
      this.setData({
        userInfo: { nickName: "未登录", avatar: "/images/default-avatar.png" },
        stats: { borrowCount: 0, reserveCount: 0, messageCount: 0, favoriteCount: 0 }
      });
    }
  },

  // 2. 获取统计数据 (Mock)
  fetchUserStats() {
    // 模拟网络请求
    setTimeout(() => {
      this.setData({
        stats: {
          borrowCount: 3,  // 对应我的借阅
          reserveCount: 1, // 对应我的预约
          messageCount: 2, // 模拟未读
          favoriteCount: 12
        }
      });
    }, 200);
  },

  // 3. 跳转登录
  toLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },

  // 4. 修改头像 (模拟)
  changeAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        // 更新页面显示
        this.setData({
          'userInfo.avatar': tempFilePath
        });
        // 2. 【新增】同步到全局变量 (防止切页面后丢失)
        if (!app.globalData.userInfo) app.globalData.userInfo = {};
        app.globalData.userInfo.avatar = tempFilePath;

        // TODO: 上传到服务器
        wx.showToast({ title: '头像已更新', icon: 'success' });
      }
    });
  },

  // 5. 修改昵称
  editNickname() {
    wx.showModal({
      title: '修改昵称',
      content: '请输入新的昵称',
      editable: true, // 开启输入框
      placeholderText: this.data.userInfo.nickName,
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            'userInfo.nickName': res.content
          });
        // 2. 【新增】同步到全局变量
        if (!app.globalData.userInfo) app.globalData.userInfo = {};
        app.globalData.userInfo.nickName = res.content;

        wx.showToast({ title: '修改成功', icon: 'none' });
        }
      }
    });
  },

  // 6. 通用跳转
  navTo(e) {
    if (!this.data.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({ title: '功能开发中', icon: 'none' });
    }
  },

  // 7. 退出登录
  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.isLogin = false;
          this.checkLoginStatus(); // 刷新页面状态
          wx.showToast({ title: '已退出', icon: 'none' });
        }
      }
    });
  }
});