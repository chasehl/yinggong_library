// pages/notice-detail/notice-detail.js

// 1. 引入刚才创建的数据文件
const DB = require('../../data/posts.js');

Page({
  data: {
    detail: {}
  },

  onLoad(options) {
    // options.id 就是从列表页传过来的，比如 "1" 或 "2"
    const noticeId = Number(options.id); // 转换成数字类型

    console.log("正在查看文章 ID:", noticeId);

    // 2. 在数据库中查找 id 匹配的那一项
    // find 方法会遍历数组，找到 id 等于 noticeId 的那个对象
    const targetNotice = DB.postList.find(item => item.id === noticeId);

    if (targetNotice) {
      // 3. 如果找到了，就显示它
      this.setData({
        detail: targetNotice
      });
    } else {
      // 4. 如果没找到（比如ID错了），提示错误
      wx.showToast({ title: '文章不存在', icon: 'none' });
    }
  }
});