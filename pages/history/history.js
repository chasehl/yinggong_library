// pages/history/history.js
const app = getApp();

Page({
  data: {
    keyword: '',
    allList: [],     // 存放完整数据
    displayList: [], // 存放搜索/过滤后的数据
    totalCount: 0,
    perfectRate: 100 // 默认100%
  },

  onShow() {
    this.checkLoginAndLoad();
  },

  checkLoginAndLoad() {
    if (app.globalData.isLogin) {
      this.fetchHistory();
    } else {
      this.setData({ displayList: [], totalCount: 0, perfectRate: 0 });
      wx.showModal({
        title: '提示',
        content: '您尚未登录，请先登录查看历史记录',
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

  fetchHistory() {
    wx.showLoading({ title: '加载中' });

    setTimeout(() => {
      // Mock 数据：包含正常归还和逾期归还的
      const mockData = [
        {
          bookId: 101,
          title: "活着",
          author: "余华",
          cover: "/images/booklist/bookCover3.jpg",
          borrowDate: "2024-10-01",
          returnDate: "2024-10-25",
          isOverdue: false // 正常
        },
        {
          bookId: 102,
          title: "深入浅出Vue.js",
          author: "刘博文",
          cover: "/images/booklist/empty.jpg", // 无图测试
          borrowDate: "2024-09-15",
          returnDate: "2024-10-20",
          isOverdue: true // 逾期
        },
        {
          bookId: 103,
          title: "我们仨",
          author: "杨绛",
          cover: "/images/booklist/empty.jpg",
          borrowDate: "2024-08-01",
          returnDate: "2024-08-10",
          isOverdue: false
        },
        {
          bookId: 104,
          title: "Java编程思想",
          author: "Bruce Eckel",
          cover: "/images/booklist/empty.jpg",
          borrowDate: "2024-06-01",
          returnDate: "2024-09-01",
          isOverdue: true // 严重逾期
        }
      ];

      this.data.allList = mockData; // 保存原件
      this.setData({ displayList: mockData });
      
      this.calculateStats(mockData); // 计算统计数据
      wx.hideLoading();
    }, 500);
  },

  // 计算统计数据
  calculateStats(list) {
    if (list.length === 0) return;

    const total = list.length;
    const overdueCount = list.filter(item => item.isOverdue).length;
    // 计算守约率：(总数 - 逾期数) / 总数 * 100
    const rate = ((total - overdueCount) / total * 100).toFixed(0);

    this.setData({
      totalCount: total,
      perfectRate: rate
    });
  },

  // 搜索输入
  onSearchInput(e) {
    const val = e.detail.value;
    this.setData({ keyword: val });
    this.doSearch(val);
  },

  // 清空搜索
  clearSearch() {
    this.setData({ keyword: '' });
    this.doSearch('');
  },

  // 执行前端筛选
  doSearch(key) {
    if (!key) {
      this.setData({ displayList: this.data.allList });
      return;
    }
    
    const res = this.data.allList.filter(item => 
      item.title.includes(key) || item.author.includes(key)
    );
    this.setData({ displayList: res });
  },

  goToBookDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/book-detail/book-detail?id=${id}` });
  }
});