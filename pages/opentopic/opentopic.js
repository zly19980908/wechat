Page({
  data: {
    tempFilePaths: [],
    header:'',
    main:'',
    nick:'',
    camera: [{ tempFilePaths: '../../image/camera.png' }, { tempFilePaths: '../../image/camera.png' }, { tempFilePaths: '../../image/camera.png'}]
  },
  //获取传递过来的参数
  onLoad:function(options){
    const app = getApp();
    app.changeTabBar();
    this.setData({
      nick:options.nick,
    })
  },
  //选择照片或相机
  chooseimage:function(e){
  var _this = this;
  wx.chooseImage({
    count:9,//选择照片最大数量
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      _this.setData({
        tempFilePaths: _this.data.tempFilePaths.concat(res.tempFilePaths)//拼接数组
      })
    }
  })
  },
  //点击删除图片
  delete: function (e) {
    var index = e.currentTarget.dataset.id;
    this.data.tempFilePaths.splice(index, 1)
    //渲染数据
    this.setData({
      tempFilePaths: this.data.tempFilePaths
    })
  },
  //点击标题栏外框变蓝
  focuheader:function(e){
    var that = this;
    that.setData({
      header:'active',
      main:''
    })
  },
  //点击内容内容外栏变蓝
  focucontent: function(e) {
    var that = this;
    that.setData({
      main:'active',
      header:''
    })
    console.log(this.data.main);
  },
  //点击发送回到话题界面
  open:function(e){
    wx.navigateBack({
    })
  }
})
