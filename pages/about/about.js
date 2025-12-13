// pages/about/about.js
Page({
  
  // 拨打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '010-88886666' 
    });
  },

  // 复制链接
  copyLink() {
    wx.setClipboardData({
      data: 'lib.example.edu.cn',
      success() {
        wx.showToast({ title: '已复制网址', icon: 'success' });
      }
    });
  },

  // 打开地图 (模拟位置)
  openMap() {
    wx.openLocation({
      latitude: 39.9042, // 替换为你学校的真实纬度
      longitude: 116.4074, // 替换为你学校的真实经度
      name: '应用工程学院图书馆',
      address: '某某市某某区应用大道1号'
    });
  }
});