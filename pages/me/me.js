// pages/me/me.js
Page({
  data: {
    // 用户信息
    userInfo: {
      // 实际开发中这些数据应从服务器或本地存储获取
      // nickName: '张三',
      // avatarUrl: '/images/avatar.jpg',
      // studentId: '20230001',
      // level: '黄金会员',
      // points: 1280
    },
    
    // 借阅统计数据
    borrowStats: {
      borrowedCount: 3,
      historyCount: 42,
      reservedCount: 2,
      overdueCount: 1,
      favoriteCount: 8
    },
    
    // 未读消息数
    unreadMessageCount: 2,
    
    // 是否已登录
    isLoggedIn: false
  },

  onLoad() {
    // 页面加载时尝试从本地存储读取用户信息
    this.checkLoginStatus();
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshUserData();
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        isLoggedIn: true
      });
    }
  },

  // 刷新用户数据
  refreshUserData() {
    // 这里模拟从服务器获取数据
    // 实际开发中应使用 wx.request 调用接口
    setTimeout(() => {
      // 模拟数据更新
      const stats = wx.getStorageSync('borrowStats') || this.data.borrowStats;
      this.setData({
        borrowStats: stats
      });
    }, 500);
  },

  // 处理登录
  handleLogin() {
    wx.showModal({
      title: '登录提示',
      content: '需要获取您的用户信息',
      success: (res) => {
        if (res.confirm) {
          this.getUserProfile();
        }
      }
    });
  },

  // 获取用户信息（微信授权）
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;
        
        // 模拟分配学号（实际应从服务器获取）
        userInfo.studentId = '2023' + Math.floor(Math.random() * 9000 + 1000);
        userInfo.level = '普通会员';
        userInfo.points = 100;
        
        // 保存到本地存储
        wx.setStorageSync('userInfo', userInfo);
        
        // 更新页面数据
        this.setData({
          userInfo: userInfo,
          isLoggedIn: true
        });
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.log('用户拒绝授权', err);
      }
    });
  },

  // 处理退出登录
  handleLogout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储
          wx.removeStorageSync('userInfo');
          
          // 重置页面数据
          this.setData({
            userInfo: {},
            isLoggedIn: false
          });
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  // 处理头像点击
  handleAvatarTap() {
    if (this.data.isLoggedIn) {
      wx.showActionSheet({
        itemList: ['更换头像', '查看个人资料'],
        success: (res) => {
          if (res.tapIndex === 0) {
            this.changeAvatar();
          } else if (res.tapIndex === 1) {
            wx.navigateTo({
              url: '/pages/userProfile/userProfile'
            });
          }
        }
      });
    } else {
      this.handleLogin();
    }
  },

  // 更换头像
  changeAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        
        // 这里应该上传到服务器，这里先模拟更新本地
        const userInfo = {...this.data.userInfo, avatarUrl: tempFilePath};
        wx.setStorageSync('userInfo', userInfo);
        
        this.setData({
          userInfo: userInfo
        });
        
        wx.showToast({
          title: '头像更新成功',
          icon: 'success'
        });
      }
    });
  },

  // 跳转到各个功能页面
  goToBorrowed() {
    wx.navigateTo({
      url: '/pages/borrowed/borrowed'
    });
  },

  goToHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  goToReserved() {
    wx.navigateTo({
      url: '/pages/reserved/reserved'
    });
  },

  goToFavorites() {
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    });
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  goToMessage() {
    wx.navigateTo({
      url: '/pages/message/message'
    });
  },

  goToFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  goToOverdue() {
    if (this.data.borrowStats.overdueCount > 0) {
      wx.navigateTo({
        url: '/pages/overdue/overdue'
      });
    } else {
      wx.showToast({
        title: '暂无逾期图书',
        icon: 'none'
      });
    }
  },

  // 扫码借书
  goToScanBorrow() {
    if (!this.data.isLoggedIn) {
      this.handleLogin();
      return;
    }
    
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果:', res.result);
        // 这里应该调用借书接口
        wx.showModal({
          title: '扫码成功',
          content: 'ISBN: ' + res.result,
          showCancel: false
        });
      },
      fail: (err) => {
        console.log('扫码失败', err);
      }
    });
  },

  // 一键续借
  goToRenew() {
    if (!this.data.isLoggedIn) {
      this.handleLogin();
      return;
    }
    
    wx.showModal({
      title: '一键续借',
      content: '确定要续借所有可续借的图书吗？',
      success: (res) => {
        if (res.confirm) {
          // 这里应该调用续借接口
          wx.showLoading({
            title: '续借中...',
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '续借成功',
              icon: 'success'
            });
            
            // 更新借阅数据
            const newStats = {...this.data.borrowStats};
            newStats.overdueCount = 0; // 假设逾期已处理
            this.setData({
              borrowStats: newStats
            });
            wx.setStorageSync('borrowStats', newStats);
          }, 1500);
        }
      }
    });
  }
});