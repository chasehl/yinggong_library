// data/user-mock.js
export const borrowList = [
  { id: 101, title: "深入浅出Vue.js", author: "刘博文", dueDay: "2025-12-20", status: "normal", cover: "/images/book-cover-1.jpg" },
  { id: 102, title: "三体：死神永生", author: "刘慈欣", dueDay: "2025-12-10", status: "expiring", cover: "/images/book-cover-2.jpg" },
  { id: 103, title: "设计模式之禅", author: "秦小波", dueDay: "2025-11-01", status: "overdue", cover: "/images/book-cover-3.jpg" }
];

export const historyList = [
  { id: 201, title: "人类简史", author: "赫拉利", returnDate: "2025-10-15" },
  { id: 202, title: "活着", author: "余华", returnDate: "2025-09-10" }
];

export const staticContent = {
  rule: { title: "借阅规则", content: ["1. 本科学声每人限借 10 册。", "2. 借阅期限为 30 天，可续借 1 次。", "3. 逾期需缴纳滞纳金 0.1 元/天。"] },
  time: { title: "开放时间", content: ["周一至周五：08:00 - 22:00", "周六、周日：09:00 - 17:00", "法定节假日：另行通知"] },
  map: { title: "馆藏分布", content: ["1F：总服务台 / 报刊阅览室", "2F：社会科学书库 (A-K)", "3F：自然科学书库 (N-Z)", "4F：电子阅览室 / 自习室"] }
};