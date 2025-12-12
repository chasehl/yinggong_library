// pages/my-borrow/my-borrow.js
const app=getApp(); //获取全局App实例

Page({

  data: {
    borrowList: [], // 借阅列表
    overdueCount: 0, // 逾期数量
    expiringCount: 0 // 快到期数量
    //hasLoaded:false //标记是否已经加载过数据，防止重复加载
  },

  onShow(){
    this.checkLoginAndLoad();
  },

  //检查登录状态并决定下一步
  checkLoginAndLoad(){
    // 1. 检查 app.globalData.isLogin
    if (app.globalData.isLogin) {
      // --- 已登录 ---
      // 如果需要每次进入都刷新数据，直接调用 fetch
      this.fetchBorrowList(); 
    } else {
      // --- 未登录 ---
      // 先清空当前可能残留的数据
      this.setData({ borrowList: [] });

      // 弹出提示框
      wx.showModal({
        title: '提示',
        content: '您尚未登录，请先登录以查看借阅信息',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 用户点击“去登录” -> 跳转到登录页
            wx.navigateTo({
              url: '/pages/login/login'
            });
          } else if (res.cancel) {
            // 用户点击“取消” -> 返回上一页（避免用户停留在空白页）
            wx.navigateBack();
          }
        }
      });
    }
  },

  // 1. 获取借阅数据 (模拟)
  fetchBorrowList() {
    wx.showLoading({ title: '加载中' });

    // 模拟延迟
    setTimeout(() => {
      // Mock 数据：包含三种状态
      const mockList = [
        {
          id: 101,
          title: "三体：地球往事",
          author: "刘慈欣",
          cover: "/images/booklist/bookCover1.jpg",
          borrowDate: "2024-11-10",
          dueDate: "2025-01-10",
          daysLeft: 29, // 正常
          renewed: false // 是否续借过
        },
        {
          id: 102,
          title: "深度学习",
          author: "Ian Goodfellow",
          cover: "/images/booklist/bookCover4.jpg",
          borrowDate: "2024-11-01",
          dueDate: "2024-12-14",
          daysLeft: 3, // 快到期 (<=3)
          renewed: false
        },
        {
          id: 103,
          title: "百年孤独",
          author: "加西亚·马尔克斯",
          cover: "/images/booklist/bookCover7.jpg",
          borrowDate: "2024-10-01",
          dueDate: "2024-12-01",
          daysLeft: -10, // 已逾期 (<0)
          renewed: false 
        }
      ];

      this.setData({
        borrowList: mockList
      });
      
      // 计算统计数据
      this.calculateStats();
      
      wx.hideLoading();
    }, 500);
  },

  // 2. 计算顶部的统计数字
  calculateStats() {
    const list = this.data.borrowList;
    let overdue = 0;
    let expiring = 0;

    list.forEach(item => {
      if (item.daysLeft < 0) overdue++;
      else if (item.daysLeft <= 3) expiring++;
    });

    this.setData({
      overdueCount: overdue,
      expiringCount: expiring
    });
  },

  // 3. 处理续借操作
  handleRenew(e) {
    const index = e.currentTarget.dataset.index;
    const book = this.data.borrowList[index];

    // 再次校验防止误点
    if (book.renewed || book.daysLeft < 0) return;

    wx.showModal({
      title: '确认续借',
      content: `确定要续借《${book.title}》吗？续借后应还日期将延长30天。`,
      success: (res) => {
        if (res.confirm) {
          this.doRenewAction(index);
        }
      }
    });
  },

  // 执行续借逻辑
  doRenewAction(index) {
    wx.showLoading({ title: '处理中' });

    setTimeout(() => {
      // 1. 深拷贝当前列表
      let newList = [...this.data.borrowList];
      let targetBook = newList[index];

      // 2. 更新数据：应还日期+30天，剩余天数+30，标记为已续借
      // 简单模拟日期计算
      targetBook.renewed = true;
      targetBook.daysLeft += 30;
      targetBook.dueDate = "2025-02-14"; // 实际开发中应该由后端返回新日期

      // 3. 更新页面
      this.setData({
        borrowList: newList
      });
      
      // 4. 重新计算顶部统计 (因为可能把快到期的变成了正常的)
      this.calculateStats();

      wx.hideLoading();
      wx.showToast({ title: '续借成功', icon: 'success' });
    }, 800);
  },
  
  // 跳转详情
  goToBookDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/book-detail/book-detail?id=${id}` });
  }

});