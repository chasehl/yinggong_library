// pages/bookshelf/bookshelf.js
Page({

  data: {
    currentTab: 0, // 0:在读, 1:想读, 2:已读
    isEditMode: false,
    
    // 模拟全量数据 (实际应从后端获取)
    allBooks: [],
    // 当前显示的数据
    displayList: []
  },

  onLoad(options) {
    this.fetchBooks();
  },

  // 1. 获取书籍数据
  fetchBooks() {
    // status: 0-reading, 1-want, 2-read
    const mockData = [
      { id: 1, title: "设计心理学", author: "诺曼", cover: "/images/booklist/empty.jpg", status: 0, progress: 45 },
      { id: 2, title: "人类简史", author: "赫拉利", cover: "/images/booklist/empty.jpg", status: 0, progress: 12 },
      { id: 3, title: "黑客与画家", author: "格雷厄姆", cover: "/images/booklist/empty.jpg", status: 1, progress: 0 },
      { id: 4, title: "邓小平时代", author: "傅高义", cover: "/images/booklist/empty.jpg", status: 2, progress: 100 },
      { id: 5, title: "算法导论", author: "CLRS", cover: "/images/booklist/empty.jpg", status: 1, progress: 0 }
    ];

    this.setData({ allBooks: mockData });
    this.filterBooks(0); // 默认显示"在读"
  },

  // 2. 切换 Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      currentTab: index,
      isEditMode: false // 切换Tab自动退出编辑模式
    });
    this.filterBooks(index);
  },

  // 3. 筛选逻辑
  filterBooks(statusIndex) {
    const list = this.data.allBooks.filter(item => item.status === statusIndex);
    this.setData({ displayList: list });
  },

  // 4. 切换编辑模式
  toggleEdit() {
    this.setData({ isEditMode: !this.data.isEditMode });
  },

  // 5. 点击书籍
  onBookTap(e) {
    // 如果是编辑模式，点击书籍不跳转，或者可以做其他操作
    if (this.data.isEditMode) return;

    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/book-detail/book-detail?id=${id}` });
  },

  // 6. 删除书籍
  deleteBook(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '移出书架',
      content: '确定要将这本书移出书架吗？',
      success: (res) => {
        if (res.confirm) {
          // 从 allBooks 中删除
          const newAll = this.data.allBooks.filter(item => item.id !== id);
          
          this.setData({ allBooks: newAll });
          
          // 重新刷新当前列表
          this.filterBooks(this.data.currentTab);
          
          wx.showToast({ title: '已移除', icon: 'none' });
        }
      }
    });
  },

  // 7. 去添加
  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search?mode=resource' // 复用之前的搜索页，只搜资源
    });
  }
});