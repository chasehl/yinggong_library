// pages/map/map.js
Page({
  data: {
    currentFloor: 0, // 当前选中的楼层索引
    scrollTop: 0,    // 切换楼层时右侧滚回顶部
    
    // 楼层数据源
    floorData: [
      {
        id: 1,
        floorName: "1F",
        title: "一层：总服务台 / 报刊阅览",
        // 记得换成你的真实平面图路径
        mapImage: "/images/map/floor1.png", 
        collections: [
          { code: "New", name: "新书推荐区" },
          { code: "Mag", name: "现刊/报纸" }
        ],
        facilities: ["总服务台 (借还书)", "自助打印机", "无障碍通道", "开水间"]
      },
      {
        id: 2,
        floorName: "2F",
        title: "二层：社会科学书库",
        mapImage: "/images/map/floor2.png",
        collections: [
          { code: "A", name: "马克思主义" },
          { code: "B", name: "哲学 / 宗教" },
          { code: "C-F", name: "社会科学总论" },
          { code: "G", name: "文化 / 教育 / 体育" },
          { code: "H", name: "语言 / 文字" },
          { code: "I", name: "文学 (小说/散文)" },
          { code: "K", name: "历史 / 地理" }
        ],
        facilities: ["检索机", "男/女洗手间", "阅览座位区"]
      },
      {
        id: 3,
        floorName: "3F",
        title: "三层：自然科学书库",
        mapImage: "/images/map/floor3.png",
        collections: [
          { code: "N-Q", name: "自然科学总论" },
          { code: "R", name: "医药 / 卫生" },
          { code: "S", name: "农业科学" },
          { code: "T", name: "工业技术 (计算机)" },
          { code: "U-V", name: "交通 / 航空" },
          { code: "X-Z", name: "环境 / 综合" }
        ],
        facilities: ["密集书架区", "男/女洗手间", "研修间 (需预约)"]
      },
      {
        id: 4,
        floorName: "4F",
        title: "四层：特藏 / 电子阅览",
        mapImage: "/images/map/floor4.png",
        collections: [],
        facilities: ["电子阅览室", "古籍特藏室", "视听欣赏室", "行政办公室"]
      }
    ]
  },

  onLoad(options) {
    // 实际开发中可根据 options.floor 参数自动定位到某层
  },

  // 切换楼层
  switchFloor(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentFloor: index,
      scrollTop: 0 // 切换后右侧滚回顶部
    });
  },

  // 查看大图
  previewMap() {
    const currentImg = this.data.floorData[this.data.currentFloor].mapImage;
    // 如果没有图片或路径无效，避免报错
    if(!currentImg) return;

    wx.previewImage({
      urls: [currentImg], // 需要是一个数组
      current: currentImg
    });
  }
});