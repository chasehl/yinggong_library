// pages/notice/notice.js
Page({
  data: {
    searchKeyword: '', // 用于存放搜索词
    currentTab: 0,
    categories: [
      { id: 0, name: '全部' },
      { id: 1, name: '馆务公告' },
      { id: 2, name: '资源动态' },
      { id: 3, name: '读者活动' }
    ],
    hasMore: true,
    
    // 模拟数据源
    allNotices: [
      {
        id: 1,
        title: "关于2025年寒假期间图书馆开馆时间的通知",
        date: "2025-01-10",
        views: 2054,
        isTop: true, // 置顶
        type: 1, // 1: 馆务
        cover: "" 
      },
      {
        id: 2,
        title: "“书香应工”第十届读书月系列活动预告",
        date: "2024-12-05",
        views: 892,
        isNew: true,
        type: 3, // 3: 活动
        cover: "/images/notice/anime-moon-landscape.jpg" // 仅作示例
      },
      {
        id: 3,
        title: "知网数据库将于本周六凌晨进行系统维护",
        date: "2024-12-01",
        views: 340,
        type: 2, // 2: 资源
        cover: ""
      },
      {
        id: 4,
        title: "2024年新书推荐书单（第12期）",
        date: "2024-11-28",
        views: 566,
        type: 2,
        cover: ""
      },
      {
        id: 5,
        title: "关于严禁占座行为的温馨提示",
        date: "2024-11-15",
        views: 1201,
        type: 1,
        cover: ""
      }
    ],
    // 实际展示的列表
    noticeList: []
  },

  onLoad(options) {
    this.filterNotices();
  },

  // --- 搜索相关交互 ---
  // 1. 监听输入框输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    // 可选：如果你想一边打字一边搜索，把下面这行注释取消即可
    this.filterNotices(); 
  },

  // 2. 点击键盘“搜索”键
  onSearch() {
    this.filterNotices();
  },

  // 3. 点击“X”清除搜索
  onClearSearch() {
    this.setData({
      searchKeyword: ''
    });
    this.filterNotices();
  },

  // --- 切换 Tab ---
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
    // 切换 Tab 时，也要结合当前的搜索词进行筛选
    this.filterNotices();
  },

  // --- 核心：双重筛选逻辑 ---
  filterNotices() {
    // 1. 获取当前的所有条件
    const tabId = this.data.categories[this.data.currentTab].id;
    const keyword = this.data.searchKeyword.trim(); // 去掉首尾空格

    // 2. 从全量数据开始过滤
    let result = this.data.allNotices;

    // 第一层过滤：按 Tab 分类
    if (tabId !== 0) {
      result = result.filter(item => item.type === tabId);
    }

    // 第二层过滤：按 搜索词 (如果有的话)
    if (keyword) {
      result = result.filter(item => {
        // 核心搜索逻辑：检查标题是否包含关键词
        // toLowerCase() 是为了忽略大小写 (例如搜索 "python" 能搜到 "Python")
        return item.title.toLowerCase().includes(keyword.toLowerCase());
      });
    }

    // 3. 更新页面数据
    this.setData({
      noticeList: result
    });
  },

  // 跳转详情页
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    // 标记为已读 (仅前端视觉优化，非必须)
    const updatedList = this.data.noticeList.map(item => {
      if(item.id === id) item.read = true;
      return item;
    });
    this.setData({ noticeList: updatedList });

    // 跳转
    wx.navigateTo({ url: '/pages/notice-detail/notice-detail?id=' + id });
  },

  // 上拉加载更多
  loadMore() {
    if (!this.data.hasMore) return;
    
    // 模拟加载
    // wx.showLoading...
    // API请求...
    console.log("加载更多...");
  }
});