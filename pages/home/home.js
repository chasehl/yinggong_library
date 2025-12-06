// pages/home/home.js
Page({
  data: {
    // 模拟首页数据
    hotBooks: [
      {
        id: 1,
        title: 'JavaScript高级程序设计（第4版）',
        author: '[美] 马特·弗里斯比',
        coverUrl: '/images/books/js-advanced.jpg',
        category: '计算机',
        available: true
      },
      {
        id: 2,
        title: '百年孤独',
        author: '[哥伦比亚] 加西亚·马尔克斯',
        coverUrl: '/images/books/one-hundred-years.jpg',
        category: '文学小说',
        available: false
      },
      {
        id: 3,
        title: '人类简史：从动物到上帝',
        author: '[以色列] 尤瓦尔·赫拉利',
        coverUrl: '/images/books/sapiens.jpg',
        category: '历史社科',
        available: true
      }
    ],
    notice: '系统维护通知：本周日（6月12日）凌晨2:00-4:00将进行系统升级，期间服务可能短暂中断。'
  },

  onLoad() {
    // 页面加载时，可以在这里从服务器获取真实数据
    // this.fetchHomeData();
  },

  // 跳转到搜索页
  goToSearchPage() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 处理功能区点击
  handleFunction(e) {
    const type = e.currentTarget.dataset.type;
    const functionMap = {
      scan: '扫码借书',
      hot: '热门榜单',
      recommend: '智能推荐',
      mybook: '我的借阅'
    };
    wx.showToast({
      title: `点击了「${functionMap[type]}」`,
      icon: 'none'
    });
    // 实际开发中，这里会是各自的跳转逻辑
    if (type === 'mybook') {
      wx.switchTab({
        url: '/pages/me/me' // 假设“我的”页面是Tab页
      });
    }
  },

  // 跳转到图书详情页
  goToBookDetail(e) {
    const bookId = e.currentTarget.dataset.bookId;
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${bookId}`
    });
  },

  // 跳转到更多图书列表页
  goToBookList() {
    // 可以跳转到专门的列表页，或者切换到带分类的Tab
    wx.navigateTo({
      url: '/pages/bookList/bookList?type=hot'
    });
  }
});