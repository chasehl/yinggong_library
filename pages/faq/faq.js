// pages/faq/faq.js
Page({
  data: {
    keyword: '',
    currentCatId: 0,
    
    // 分类配置
    categories: [
      { id: 0, name: '热门问题' },
      { id: 1, name: '借阅相关' },
      { id: 2, name: '账号密码' },
      { id: 3, name: '网络资源' },
      { id: 4, name: '入馆须知' }
    ],

    // 原始全量数据
    allQuestions: [],
    // 页面渲染列表
    displayList: []
  },

  onLoad() {
    this.initData();
  },

  // 1. 初始化 Mock 数据
  initData() {
    const data = [
      // catId: 0-热门(其实可以通过逻辑判断), 1-借阅, 2-账号, 3-网络, 4-入馆
      // 为了简单，我在热门里放了一些，在其他分类也放了一些
      {
        id: 1, catId: 1, question: "我可以借几本书？借期多久？", 
        answer: "本科生可借阅 15 册，借期 30 天；研究生可借阅 20 册，借期 60 天。所有图书在无预约情况下可续借 1 次。"
      },
      {
        id: 2, catId: 2, question: "忘记了图书馆登录密码怎么办？", 
        answer: "图书馆系统默认密码通常为身份证后6位。如已修改并遗忘，请携带学生证/一卡通到图书馆一楼总服务台人工重置。"
      },
      {
        id: 3, catId: 3, question: "如何在校外访问知网(CNKI)？", 
        answer: "请先登录学校 VPN 系统 (vpn.example.edu.cn)，登录成功后即可像在校内一样访问图书馆购买的所有电子资源。"
      },
      {
        id: 4, catId: 1, question: "书超期了怎么罚款？", 
        answer: "图书逾期将产生滞纳金，标准为 0.1 元/册/天。欠费金额超过 10 元将暂停借阅权限，请尽快归还并缴纳罚款。"
      },
      {
        id: 5, catId: 4, question: "图书馆几点开门？", 
        answer: "正常开馆时间为每日 07:00 - 22:30。国家法定节假日开放时间另行通知。"
      },
      {
        id: 6, catId: 3, question: "图书馆WiFi密码是多少？", 
        answer: "图书馆 WiFi 名称为 'Library-Guest'，连接后会自动弹出认证页面，请输入学号和统一身份认证密码即可上网。"
      }
    ];

    // 为每个问题添加 isOpen 状态
    const processed = data.map(item => ({...item, isOpen: false}));

    this.setData({ allQuestions: processed });
    
    // 默认显示所有(热门) 或显示第一个分类
    this.filterList(0); 
  },

  // 2. 切换分类
  switchCategory(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ 
      currentCatId: id,
      keyword: '' // 切换分类清空搜索
    });
    this.filterList(id);
  },

  // 3. 筛选逻辑
  filterList(catId) {
    let list = [];
    if (catId === 0) {
      // 0 代表"热门"，这里我简单处理为显示全部，或者你可以指定某些ID为热门
      list = this.data.allQuestions; 
    } else {
      list = this.data.allQuestions.filter(item => item.catId === catId);
    }
    this.setData({ displayList: list });
  },

  // 4. 搜索功能
  onSearchInput(e) {
    const val = e.detail.value;
    this.setData({ keyword: val });

    if (!val) {
      this.filterList(this.data.currentCatId);
      return;
    }

    // 搜索时忽略分类，搜全量
    const result = this.data.allQuestions.filter(item => 
      item.question.includes(val) || item.answer.includes(val)
    );
    this.setData({ displayList: result });
  },

  clearSearch() {
    this.setData({ keyword: '' });
    this.filterList(this.data.currentCatId);
  },

  // 5. 展开/收起答案
  toggleAnswer(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.displayList;
    
    // 切换当前项的状态
    list[index].isOpen = !list[index].isOpen;

    // 如果想实现"手风琴"效果(点开一个，自动关闭其他的)，可以用下面这段：
    // list.forEach((item, idx) => {
    //   if (idx !== index) item.isOpen = false;
    // });

    this.setData({ displayList: list });
  }
});