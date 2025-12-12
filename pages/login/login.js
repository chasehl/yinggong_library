// pages/login/login.js
const app = getApp();

Page({
  handleLogin() {
    wx.showLoading({ title: '登录中...' });

    // 模拟登录请求
    setTimeout(() => {
      wx.hideLoading();
      
      // 1. 修改全局登录状态
      app.globalData.isLogin = true;
      
      // 2. 提示成功
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });

      // 3. 延迟后返回上一页 (即返回到 MyBorrow 页面)
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      
    }, 1000);
  },

  goBack() {
    wx.navigateBack();
  }
});