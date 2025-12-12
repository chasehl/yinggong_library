// pages/my-reserve/my-reserve.js
const app = getApp();

Page({
  data: {
    currentTab: 0, // 0: 当前预约, 1: 历史记录
    activeList: [],  // 存放进行中的数据
    historyList: [], // 存放历史数据
    displayList: []  // 实际渲染到页面的数据
  },

  onShow() {
    this.checkLoginAndLoad();
  },

  // 1. 登录检查 (与我的借阅一致)
  checkLoginAndLoad() {
    if (app.globalData.isLogin) {
      this.fetchReserveList();
    } else {
      this.setData({ displayList: [] });
      wx.showModal({
        title: '提示',
        content: '您尚未登录，请先登录查看预约信息',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login' });
          } else {
            wx.navigateBack();
          }
        }
      });
    }
  },

  // 2. 获取预约列表 Mock
  fetchReserveList() {
    wx.showLoading({ title: '加载中' });

    setTimeout(() => {
      // 模拟后端返回的混合数据
      const mockData = [
        // 状态: ready(待取), waiting(排队), finished(已取), cancelled(取消), expired(过期)
        {
          id: 1,
          bookId: 101,
          title: "机器学习实战",
          author: "Peter Harrington",
          cover: "https://img9.doubanio.com/view/subject/l/public/s29515433.jpg",
          status: "ready", // 待取书
          location: "一楼总服务台预约架",
          expireDate: "2025-01-15",
          applyDate: "2024-12-20"
        },
        {
          id: 2,
          bookId: 102,
          title: "三体全集",
          author: "刘慈欣",
          cover: "https://img3.doubanio.com/view/subject/l/public/s2768378.jpg",
          status: "waiting", // 排队中
          rank: 3,
          totalQueue: 5,
          applyDate: "2025-01-05"
        },
        {
          id: 3,
          bookId: 103,
          title: "明朝那些事儿",
          author: "当年明月",
          cover: "https://img1.doubanio.com/view/subject/l/public/s3710034.jpg",
          status: "cancelled", // 已取消
          statusText: "已取消",
          finishDate: "2024-11-11"
        },
        {
          id: 4,
          bookId: 104,
          title: "围城",
          author: "钱钟书",
          cover: "", // 如果没图，CSS里有默认背景
          status: "expired", // 已过期
          statusText: "预约失效",
          finishDate: "2024-10-01"
        }
      ];

      // 数据清洗与分类
      const active = mockData.filter(item => item.status === 'ready' || item.status === 'waiting');
      const history = mockData.filter(item => item.status !== 'ready' && item.status !== 'waiting');

      this.setData({
        activeList: active,
        historyList: history
      });
      
      // 更新当前显示列表
      this.updateDisplay();

      wx.hideLoading();
    }, 500);
  },

  // 3. 切换 Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    this.updateDisplay();
  },

  // 更新渲染
  updateDisplay() {
    if (this.data.currentTab === 0) {
      this.setData({ displayList: this.data.activeList });
    } else {
      this.setData({ displayList: this.data.historyList });
    }
  },

  // 4. 取消预约
  handleCancel(e) {
    const { id, title } = e.currentTarget.dataset;
    
    wx.showModal({
      title: '取消预约',
      content: `确定取消预约《${title}》吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中' });
          
          setTimeout(() => {
            // 模拟删除操作：从 active 移到 history，并修改状态
            let targetItem = this.data.activeList.find(item => item.id === id);
            
            // 过滤掉该项
            const newActive = this.data.activeList.filter(item => item.id !== id);
            
            // 修改状态加入历史
            if (targetItem) {
                targetItem.status = 'cancelled';
                targetItem.statusText = '已取消';
                targetItem.finishDate = '刚刚'; // 实际应为当前时间
                
                const newHistory = [targetItem, ...this.data.historyList];
                
                this.setData({
                    activeList: newActive,
                    historyList: newHistory
                });
                this.updateDisplay();
            }

            wx.hideLoading();
            wx.showToast({ title: '已取消' });
          }, 600);
        }
      }
    });
  },

  goToBookDetail(e) {
      // 跳转图书详情代码...
  }
});