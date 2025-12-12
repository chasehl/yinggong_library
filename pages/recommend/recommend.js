// pages/recommend/recommend.js
Page({
  data: {
    currentTab: 0,
    tabs: [
      { id: 0, name: '本期主打' },
      { id: 1, name: '新书速递' },
      { id: 2, name: '借阅榜单' }
    ],
    bookList: []
  },

  onLoad(options) {
    this.loadBooks(0);
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.currentTab === index) return;
    
    this.setData({ currentTab: index });
    // 切换 Tab 时重新加载对应数据
    this.loadBooks(index);
  },

  // 模拟加载数据
  loadBooks(tabIndex) {
    wx.showLoading({ title: '加载中' });

    setTimeout(() => {
      let mockData = [];

      if (tabIndex === 0) {
        // --- 本期主打 (侧重深度推荐语) ---
        mockData = [
          {
            id: 201,
            title: "置身事内：中国政府与经济发展",
            author: "兰小欢",
            cover: "https://img9.doubanio.com/view/subject/l/public/s33943362.jpg",
            score: 9.1,
            reason: "一本能让你读懂中国经济运行逻辑的通俗读物。作者将复杂的经济学原理与中国政府的具体运作相结合，通俗易懂，强烈推荐给所有关心中国现实的读者。",
            tags: ["经济", "社科", "必读"]
          },
          {
            id: 202,
            title: "额尔古纳河右岸",
            author: "迟子建",
            cover: "https://img2.doubanio.com/view/subject/l/public/s34547002.jpg",
            score: 9.0,
            reason: "茅盾文学奖获奖作品。它是对鄂温克族百年沧桑的深情挽歌，文字优美得像流淌的河水，读完让人内心感到无比的宁静与悲悯。",
            tags: ["文学", "茅盾文学奖", "自然"]
          }
        ];
      } else if (tabIndex === 1) {
        // --- 新书速递 (侧重时效性) ---
        mockData = [
          {
            id: 301,
            title: "埃隆·马斯克传",
            author: "沃尔特·艾萨克森",
            cover: "https://img1.doubanio.com/view/subject/l/public/s34633718.jpg",
            score: 8.5,
            reason: "2023年全球同步上市。乔布斯传作者最新力作，深度还原科技狂人马斯克的商业逻辑与冒险人生。",
            tags: ["传记", "科技", "新书"]
          }
        ];
      } else {
        // --- 借阅榜单 (侧重排名) ---
        mockData = [
          {
            id: 401,
            title: "三体全集",
            author: "刘慈欣",
            cover: "https://img3.doubanio.com/view/subject/l/public/s2768378.jpg",
            score: 9.5,
            reason: "图书馆借阅霸榜Top1。中国科幻的巅峰之作，无需多言，没看过的同学请务必补课。",
            tags: ["科幻", "Top1", "经典"]
          },
          {
            id: 402,
            title: "明朝那些事儿",
            author: "当年明月",
            cover: "https://img1.doubanio.com/view/subject/l/public/s3710034.jpg",
            score: 9.2,
            reason: "历史原来可以这么好看。常年占据借阅榜前三，轻松幽默的笔调写尽了大明王朝的三百年兴衰。",
            tags: ["历史", "Top2", "通俗"]
          }
        ];
      }

      this.setData({ bookList: mockData });
      wx.hideLoading();
    }, 400);
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/book-detail/book-detail?id=${id}` });
  }
});