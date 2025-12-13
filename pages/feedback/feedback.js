// pages/feedback/feedback.js
Page({
  data: {
    categories: ['功能异常', '产品建议', '图书荐购', '环境设施', '其他'],
    currentType: '功能异常', // 默认选中第一个
    content: '',
    contentLength: 0,
    images: [],
    contact: ''
  },

  // 1. 选择分类
  selectType(e) {
    this.setData({ currentType: e.currentTarget.dataset.type });
  },

  // 2. 输入监听
  onInput(e) {
    const val = e.detail.value;
    this.setData({
      content: val,
      contentLength: val.length
    });
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value });
  },

  // 3. 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 4 - this.data.images.length, // 还能选几张
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles.map(file => file.tempFilePath);
        this.setData({
          images: this.data.images.concat(tempFiles)
        });
      }
    });
  },

  // 4. 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const newImages = this.data.images;
    newImages.splice(index, 1);
    this.setData({ images: newImages });
  },

  // 5. 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: this.data.images
    });
  },

  // 6. 提交反馈
  submitFeedback() {
    if (!this.data.content.trim()) {
      wx.showToast({ title: '请填写描述', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    // 模拟上传和提交过程
    setTimeout(() => {
      console.log('提交数据：', {
        type: this.data.currentType,
        content: this.data.content,
        images: this.data.images,
        contact: this.data.contact
      });

      wx.hideLoading();
      
      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 2000
      });

      // 延迟返回
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
      
    }, 1000);
  }
});