// pages/search/search.js
Page({
  data: {
    // 搜索配置
    searchTypes: ['全面检索', '书名', '作者', '索书号', '出版社', 'ISBN'],
    typeIndex: 0, // 默认选中第0个(全面检索)
    searchKeyword: '',
    
    // 状态标记
    hasSearched: false, // 是否执行过搜索

    // 结果数据
    serviceResults: [],
    bookResults: [],

    // 本地预设的服务列表 (用于搜索)
    allServices: [
      { name: '馆藏检索', icon: '/images/icon-catalog.png', url: '/pages/search/search?mode=resource' },
      { name: '我的借阅', icon: '/images/icon-borrow.png', url: '/pages/my-borrow/my-borrow' },
      { name: '我的预约', icon: '/images/icon-reserve.png', url: '/pages/my-reserve/my-reserve' },
      { name: '借阅规则', icon: '/images/icon-rule.png', url: '/pages/rule/rule' },
      { name: '借阅历史', icon: '/images/icon-history.png', url: '/pages/history/history' },
      { name: '馆藏分布', icon: '/images/icon-map.png', url: '/pages/map/map' },
      { name: '开放时间', icon: '/images/icon-clock.png', url: '/pages/opentime/opentime' },
      { name: '好书荐读', icon: '/images/icon-like.png', url: '/pages/recommend/recommend' },
      { name: '电子借阅证', icon: '/images/ecard-icon.png', url: '/pages/ecard/ecard' }
    ]
  },

  onLoad(options) {
    // 如果是从"馆藏检索"按钮进来，自动把 Picker 设为 "书名" (索引1)
    if (options.mode === 'resource') {
      this.setData({ typeIndex: 1 });
    }
  },

  // 1. 监听下拉选择改变
  bindTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value
    });
  },

  // 2. 监听输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  // 3. 清空搜索
  clearSearch() {
    this.setData({ 
      searchKeyword: '',
      serviceResults: [],
      bookResults: [],
      hasSearched: false
    });
  },

  // 4. 执行搜索 (核心)
  onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '搜索中...' });

    // 获取当前搜索类型
    const currentType = this.data.searchTypes[this.data.typeIndex];

    // --- A. 搜索服务 (仅当类型为"全面检索"时) ---
    let services = [];
    if (currentType === '全面检索') {
      services = this.data.allServices.filter(item => 
        item.name.includes(keyword)
      );
    }

    // --- B. 搜索图书 (Mock 数据) ---
    // 实际开发中，这里要根据 currentType 和 keyword 发起 wx.request
    let books = [];
    // 模拟：只要有关键词，就返回几本假书
    setTimeout(() => {
      if (keyword) {
        books = [
          {
            id: 101,
            title: keyword + "原理与实践", // 假装搜到了
            author: "张三",
            publisher: "清华大学出版社",
            callNumber: "TP312/2024",
            type: "在馆",
            cover: "https://img9.doubanio.com/view/subject/l/public/s29515433.jpg"
          },
          {
            id: 102,
            title: "深入浅出" + keyword,
            author: "李四",
            publisher: "人民邮电出版社",
            callNumber: "TP312/2023",
            type: "借出",
            cover: "https://img9.doubanio.com/view/subject/l/public/s33703816.jpg"
          }
        ];
      }

      // 更新页面数据
      this.setData({
        serviceResults: services,
        bookResults: books,
        hasSearched: true
      });

      wx.hideLoading();
    }, 500);
  },

  // 5. 点击服务图标跳转
  handleServiceTap(e) {
    const url = e.currentTarget.dataset.url;
    // 简单的页面跳转
    wx.navigateTo({ url: url });
  },
  
  // 6. 点击图书跳转详情
  goToBookDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/book-detail/book-detail?id=${id}` });
  }
});