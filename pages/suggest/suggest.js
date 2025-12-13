// pages/suggest/suggest.js
Page({
  data: {
    currentTab: 0,
    formData: {
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      reason: ''
    },
    historyList: []
  },

  onLoad() {
    this.fetchHistory();
  },

  // 1. 切换 Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
  },

  // 2. 统一输入处理
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`formData.${field}`]: value
    });
  },

  // 3. 扫码功能
  scanISBN() {
    wx.scanCode({
      scanType: ['barCode'],
      success: (res) => {
        const isbn = res.result;
        wx.showLoading({ title: '识别中...' });
        
        // 模拟 API 查书
        setTimeout(() => {
          this.setData({
            'formData.isbn': isbn,
            'formData.title': '模拟识别出的书名',
            'formData.author': '模拟作者',
            'formData.publisher': '模拟出版社'
          });
          wx.hideLoading();
          wx.showToast({ title: '识别成功', icon: 'success' });
        }, 800);
      },
      fail: () => {
        wx.showToast({ title: '扫码取消或失败', icon: 'none' });
      }
    });
  },

  // 4. 提交表单
  submitForm() {
    const { title, author } = this.data.formData;
    
    // 简单校验
    if (!title || !author) {
      wx.showToast({ title: '请填写书名和作者', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    setTimeout(() => {
      // 构造一条新记录
      const newRecord = {
        id: Date.now(),
        date: this.formatDate(new Date()),
        title: this.data.formData.title,
        author: this.data.formData.author,
        statusCode: 'pending', // 默认审核中
        statusText: '审核中',
        reply: ''
      };

      // 插入到历史列表头部
      const newList = [newRecord, ...this.data.historyList];
      
      this.setData({
        historyList: newList,
        // 清空表单
        formData: { isbn: '', title: '', author: '', publisher: '', reason: '' },
        // 自动跳到历史页
        currentTab: 1 
      });

      wx.hideLoading();
      wx.showToast({ title: '提交成功', icon: 'success' });
    }, 800);
  },

  // 5. 获取历史 (Mock)
  fetchHistory() {
    const mockData = [
      {
        id: 1,
        date: '2025-12-01',
        title: '深度学习',
        author: 'Ian Goodfellow',
        statusCode: 'done',
        statusText: '已上架',
        reply: 'TP181/102 (二楼理工库)'
      },
      {
        id: 2,
        date: '2025-11-20',
        title: '某本太冷门的书',
        author: '佚名',
        statusCode: 'rejected',
        statusText: '已驳回',
        reply: '经查该书年代久远已绝版，且不符合本馆收藏方向。'
      },
      {
        id: 3,
        date: '2025-11-15',
        title: '埃隆·马斯克传',
        author: '艾萨克森',
        statusCode: 'buying',
        statusText: '采购中',
        reply: ''
      }
    ];
    this.setData({ historyList: mockData });
  },

  // 工具：格式化日期
  formatDate(date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
});