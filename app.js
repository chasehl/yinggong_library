// app.js
App({
  globalData:{
    isLogin:false,  //默认为未登录，测试时可改为true
    userInfo:null
  },

  onLaunch(){
    //实际开发中，这里会检查本地缓存Storage是否有token
    //const token=wx.getStorageSync('token');
    // if(token) this.globalData.isLogin=true;
  }
})
