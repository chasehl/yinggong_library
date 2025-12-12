// pages/opentime/opentime.js
Page({
  data: {
    isOpen: true,  // 默认为开
    statusTip: '', // 提示语
    weekSchedule: [] // 列表数据
  },

  onLoad(options) {
    this.initSchedule();
    this.checkCurrentStatus();
  },

  // 1. 初始化日程表
  initSchedule() {
    // 获取今天是周几 (0是周日, 1-6是周一到周六)
    const todayIndex = new Date().getDay();
    
    // 把 0 转换成 7 (方便排序或显示，可视习惯而定，这里周一为1，周日为7)
    // 实际上 JS 的 getDay()：周日=0, 周一=1...
    // 我们可以构造一个静态数组，然后标记 isToday
    
    const scheduleData = [
      { day: "周一", time: "08:00 - 22:00" },
      { day: "周二", time: "08:00 - 22:00" },
      { day: "周三", time: "08:00 - 22:00" },
      { day: "周四", time: "08:00 - 22:00" },
      { day: "周五", time: "08:00 - 22:00" },
      { day: "周六", time: "09:00 - 21:00" },
      { day: "周日", time: "09:00 - 21:00" }
    ];

    // 映射 JS getDay() 到数组索引
    // getDay: 0(Sun), 1(Mon)... 6(Sat)
    // 我们的数组: 0(Mon)... 5(Sat), 6(Sun)
    let mapIndex = todayIndex - 1; 
    if (mapIndex === -1) mapIndex = 6; // 如果是周日(0)，对应数组最后一位(6)

    // 标记今天
    scheduleData.forEach((item, index) => {
      if (index === mapIndex) {
        item.isToday = true;
      }
    });

    this.setData({ weekSchedule: scheduleData });
  },

  // 2. 检查当前是否开馆
  checkCurrentStatus() {
    const now = new Date();
    const hour = now.getHours(); // 0-23
    const day = now.getDay();    // 0-6
    
    // 假设规则：
    // 周一至周五: 8:00 - 22:00
    // 周六日: 9:00 - 21:00
    
    let openHour = 8;
    let closeHour = 22;

    if (day === 0 || day === 6) { // 周末
      openHour = 9;
      closeHour = 21;
    }

    let isOpen = false;
    let tip = "";

    if (hour >= openHour && hour < closeHour) {
      isOpen = true;
      // 计算还有多久闭馆
      const hoursLeft = closeHour - hour;
      if (hoursLeft <= 1) {
        tip = "注意：即将闭馆，请安排好时间";
      } else {
        tip = `正常开放，今日 ${closeHour}:00 闭馆`;
      }
    } else {
      isOpen = false;
      if (hour < openHour) {
        tip = `尚未开馆，今日 ${openHour}:00 开馆`;
      } else {
        tip = "今日已闭馆，明日再来吧";
      }
    }

    this.setData({
      isOpen: isOpen,
      statusTip: tip
    });
  }
});