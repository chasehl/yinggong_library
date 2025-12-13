// pages/favorite/favorite.js
Page({
  data: {
    favoriteList: [],
    isEditMode: false,
    isAllSelected: false,
    selectedCount: 0
  },

  onShow() {
    this.fetchFavorites();
  },

  // 1. 获取收藏数据 (Mock)
  fetchFavorites() {
    // 模拟数据：包含了馆藏状态
    const mockData = [
      {
        id: 1,
        title: "Python编程：从入门到实践",
        author: "Eric Matthes",
        cover: "https://img9.doubanio.com/view/subject/l/public/s28892183.jpg",
        isAvailable: true, // 在馆
        callNumber: "TP311.56/2023",
        selected: false
      },
      {
        id: 2,
        title: "鸟哥的Linux私房菜",
        author: "鸟哥",
        cover: "https://img9.doubanio.com/view/subject/l/public/s4668478.jpg",
        isAvailable: false, // 借出
        returnDate: "2025-01-20",
        selected: false
      },
      {
        id: 3,
        title: "社会心理学",
        author: "戴维·迈尔斯",
        cover: "https://img1.doubanio.com/view/subject/l/public/s27622831.jpg",
        isAvailable: true,
        callNumber: "C912.6/2020",
        selected: false
      }
    ];

    this.setData({ favoriteList: mockData });
  },

  // 2. 切换编辑模式
  toggleEdit() {
    this.setData({ 
      isEditMode: !this.data.isEditMode,
      // 退出编辑模式时，重置所有选中状态
      favoriteList: this.data.favoriteList.map(item => ({...item, selected: false})),
      selectedCount: 0,
      isAllSelected: false
    });
  },

  // 3. 单选
  toggleSelect(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.favoriteList;
    list[index].selected = !list[index].selected;

    this.updateSelection(list);
  },

  // 4. 全选
  selectAll() {
    const isAll = !this.data.isAllSelected;
    const list = this.data.favoriteList.map(item => ({
      ...item,
      selected: isAll
    }));

    this.updateSelection(list);
  },

  // 更新选中状态统计
  updateSelection(list) {
    const count = list.filter(item => item.selected).length;
    this.setData({
      favoriteList: list,
      selectedCount: count,
      isAllSelected: count === list.length && list.length > 0
    });
  },

  // 5. 单个删除 (点击爱心/垃圾桶)
  removeOne(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏这本书吗？',
      success: (res) => {
        if (res.confirm) {
          this.doDelete([id]);
        }
      }
    });
  },

  // 6. 批量删除
  batchDelete() {
    const idsToDelete = this.data.favoriteList
      .filter(item => item.selected)
      .map(item => item.id);

    wx.showModal({
      title: '批量删除',
      content: `确定删除这 ${idsToDelete.length} 本书吗？`,
      success: (res) => {
        if (res.confirm) {
          this.doDelete(idsToDelete);
        }
      }
    });
  },

  // 执行删除逻辑
  doDelete(ids) {
    const newList = this.data.favoriteList.filter(item => !ids.includes(item.id));
    this.setData({
      favoriteList: newList,
      // 如果删完了，自动退出编辑模式
      isEditMode: newList.length > 0 ? this.data.isEditMode : false
    });
    // 更新统计
    this.updateSelection(newList);
    wx.showToast({ title: '已删除', icon: 'success' });
  },

  // 跳转详情
  goToDetail(e) {
    // 编辑模式下点击卡片也是切换选中，不跳转
    if (this.data.isEditMode) {
      // 找到对应的 index 并切换
      // 这里简化处理，实际可以通过 dataset 传 index
      return; 
    }
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/book-detail/book-detail?id=${id}` });
  },

  // 去搜索页
  goToSearch() {
    wx.switchTab({ url: '/pages/home/home' }); // 或者跳转到 search
  }
});