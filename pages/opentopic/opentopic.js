Page({
  data: {
    tempFilePaths: [],//图片路径
    header:'',//标题样式
    main:'',//内容样式
    nick:'',//用户昵称
    title:'',//标题内容
    content:'',//主题内容
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
      for (var i = 0; i < _this.data.tempFilePaths.length;i++){
      wx.uploadFile({
        url: 'http://localhost:8080/wxggt/images/login',
        filePath: _this.data.tempFilePaths[i],
        name: 'file',
        success:function(res){
          console.log(res);
        },
        fail: function(res){
          wx.showToast({
            title: '上传图片上似乎出现了一些问题，请检查网络环境',
            icon:'none',
            duration:2500
          })
        }
      })
      }
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
  //输入标题时获取输入内容
  inputTitle:function(e){
    var that = this;
    that.setData({
      title:e.detail.value,//将输入的内容赋值给标题
    })
  },
  //输入内容时获取输入内容
  inputContent:function(e){
    var that = this;
    that.setData({
      content:e.detail.value,
    })
  },
  //点击发送回到话题界面
  open:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/wxggt/AddTopicServlet',//请求路径
      data: {//附带参数
        initiator:"伍嘉晖",
        uid:"201601090143",
        title:that.data.title,
        content:that.data.content,
        cNO:"201601090150",
      },
      method: 'GET',//传输方式
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {//成功后返回
        wx.showToast({
          //提示消息
          title: '发布成功!',
          //提示的图标
          icon:'success',
          //图标加载延迟
          duration:1000
        })
        wx.navigateBack({
        })
      },
      fail: function (res) {//失败后操作
        console.log(".....fail.....");
      }
    })
  }
})
