// data/posts.js
// 这里存放所有的通知文章数据，ID必须是唯一的
const posts = [
  {
    id: 1,
    title: "关于2025年寒假期间图书馆开馆时间的通知",
    source: "图书馆办公室",
    date: "2025-01-10",
    views: 2054,
    content: `
      <div style="font-size:16px;line-height:1.8;">
        <p>各位读者：寒假将至，我馆开放时间调整如下...</p>
        <p>1. 1月15日起，开放时间为 9:00 - 17:00</p>
        <p>2. 春节期间闭馆。</p>
      </div>
    `
  },
  {
    id: 2,
    title: "“书香应工”第十届读书月系列活动预告",
    source: "读者服务部",
    date: "2024-12-05",
    views: 892,
    content: `
      <div style="font-size:16px;line-height:1.8;">
        <p>为了营造良好的校园文化氛围，我们将举办以下活动：</p>
        <p><strong>活动一：</strong>最美读书人摄影比赛</p>
        <p><strong>活动二：</strong>经典书籍诵读会</p>
        <img src="/images/notice/activity.jpg" style="width:100%; margin: 10px 0;" />
        <p>欢迎大家踊跃报名！</p>
      </div>
    `
  },
  {
    id: 3,
    title: "知网数据库将于本周六凌晨进行系统维护",
    source: "技术部",
    date: "2024-12-01",
    views: 340,
    content: `
      <div style="font-size:16px;line-height:1.8;">
        <p>接到同方知网通知，将于本周六 00:00 - 04:00 进行系统升级。</p>
        <p>维护期间无法下载论文，请提前做好准备。</p>
      </div>
    `
  }
];

// 把数据暴露出去，让别的页面能用
module.exports = {
  postList: posts
}