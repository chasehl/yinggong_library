
Page({
  data: {
    // 这里存放当前页面实际渲染的数据
    displayBooks: [],
    // 标记是否还有更多数据
    hasMore: true,
    
    // 全部图书数据源 (模拟数据库)
    allBooks: [
      {
        id: 1,
        title: "三体：地球往事",
        author: "刘慈欣",
        cover: "/images/booklist/bookCover1.jpg" 
      },
      {
        id: 2,
        title: "乡土中国",
        author: "费孝通",
        cover: "/images/booklist/bookCover2.jpg"
      },
      {
        id: 3,
        title: "活着",
        author: "余华",
        cover: "/images/booklist/bookCover3.jpg"
      },
      {
        id: 4,
        title: "深度学习",
        author: "Ian Goodfellow",
        cover: "/images/booklist/bookCover4.jpg"
      },
      {
        id: 5,
        title: "明朝那些事儿",
        author: "当年明月",
        cover: "/images/booklist/bookCover5.jpg"
      },
      {
        id: 6,
        title: "非暴力沟通",
        author: "马歇尔·卢森堡",
        cover: "/images/booklist/bookCover6.jpg"
      },
      // --- 以下是点击加载更多后显示的 ---
      {
        id: 7,
        title: "百年孤独",
        author: "加西亚·马尔克斯",
        cover: "/images/booklist/bookCover7.jpg"
      },
      {
        id: 8,
        title: "Python编程",
        author: "埃里克·马瑟斯",
        cover: "/images/booklist/bookCover8.jpg"
      },
      {
        id: 9,
        title: "月亮与六便士",
        author: "毛姆",
        cover: "/images/booklist/bookCover9.jpg"
      },
      {
        id: 10,
        title: "置身事内",
        author: "兰小欢",
        cover: "/images/booklist/bookCover10.jpg"
      }
    ]
  },

  onLoad: function() {
    // 页面初始化：先截取前 6 本展示
    this.initBookList();
  },

  // 初始化列表
  initBookList() {
    const initialList = this.data.allBooks.slice(0, 6);
    this.setData({
      displayBooks: initialList,
      hasMore: this.data.allBooks.length > 6
    });
  },

  // 点击加载更多
  loadMoreBooks() {
    // 获取当前已显示的长度
    const currentLen = this.data.displayBooks.length;
    const totalLen = this.data.allBooks.length;

    if (currentLen >= totalLen) {
      this.setData({ hasMore: false });
      return;
    }

    // 模拟加载效果（可选）
    wx.showLoading({ title: '加载中...' });

    setTimeout(() => {
      // 每次多加载 6 本 (或者加载剩余所有)
      // 这里逻辑是：把剩余所有的都加载出来
      const nextBatch = this.data.allBooks.slice(currentLen, totalLen);
      
      this.setData({
        displayBooks: this.data.displayBooks.concat(nextBatch),
        hasMore: false // 因为一共就10本，加载一次就肯定没了，所以直接设为false
      });
      
      wx.hideLoading();
    }, 500);
  },

  // 跳转详情页
  openBookDetail(e) {
    const bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?id=${bookId}`,
    });
  },
  goToEcard(){
    wx.navigateTo({
      url: '/pages/ecard/ecard',
    })
  },
  //我的界面的扫一扫实现功能，先放到这里，之后再修改
  // 扫码借书
  goToScanBorrow() {

    
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果:', res.result);
        // 这里应该调用借书接口
        wx.showModal({
          title: '扫码成功',
          content: 'ISBN: ' + res.result,
          showCancel: false
        });
      },
      fail: (err) => {
        console.log('扫码失败', err);
      }
    });
  }
  // // “扫一扫”按钮的点击事件处理函数
  // toScan: function() {
  //   // 首先，可检查并获取相机权限（良好的用户体验）
  //   wx.authorize({
  //     scope: 'scope.camera',
  //     success: () => {
  //       // 用户已授权或授权成功，调用扫一扫
  //       this.startScanCode();
  //     },
  //     fail: (err) => {
  //       // 用户拒绝了授权，可以给出友好提示
  //       console.error('相机授权失败:', err);
  //       wx.showToast({
  //         title: '需要相机权限才能扫码',
  //         icon: 'none'
  //       });
  //       // 这里可以进一步引导用户去设置页打开权限（使用wx.openSetting）
  //     }
  //   });
  // },

  // // 实际执行扫码的函数
  // startScanCode: function() {
  //   wx.scanCode({
  //     // 可以指定只扫二维码，或二维码条形码都扫
  //     // scanType: ['qrCode', 'barCode'],
  //     // 如果只允许通过相机扫码，不允许从相册选图，可设为 true[citation:8]
  //     onlyFromCamera: true,
  //     success: (res) => {
  //       console.log('扫码成功:', res);
  //       // res.result 是扫码得到的字符串内容
  //       // res.scanType 是扫码类型（如 QR_CODE）
  //       // res.charSet 是字符集
  //       // res.path 仅在扫描小程序码时存在，为码中的路径

  //       const scanResult = res.result;
  //       wx.showToast({
  //         title: '扫码成功',
  //         icon: 'success'
  //       });

  //       // TODO: 这里处理扫码结果 -------------------
  //       // 例如，如果是ISBN码，可以跳转到图书详情页
  //       // if (this.isValidISBN(scanResult)) {
  //       //   wx.navigateTo({
  //       //     url: `/pages/book/detail?isbn=${scanResult}`
  //       //   });
  //       // } else {
  //       //   // 其他类型的结果，可以复制或展示
  //       //   wx.setClipboardData({
  //       //     data: scanResult,
  //       //   });
  //       // }
  //     },
  //     fail: (err) => {
  //       console.error('扫码失败或用户取消:', err);
  //       // 用户主动取消扫码不会触发fail，通常是其他错误
  //       // if (err.errMsg !== 'scanCode:fail cancel') {
  //       //   wx.showToast({
  //       //     title: '扫码失败',
  //       //     icon: 'none'
  //       //   });
  //       // }
  //     }
  //   });
  // },

  // // 一个简单的ISBN校验函数示例（可选）
  // isValidISBN: function(code) {
  //   // 简化版校验：13位数字或10位数字（最后一位可能是X）
  //   const isbnRegex = /^(97[89]\d{10}|\d{9}[\dX])$/;
  //   return isbnRegex.test(code);
  // }
})