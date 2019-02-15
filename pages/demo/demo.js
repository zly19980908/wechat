Page({
  // 分享
  onShareAppMessage: function () {
    return {
      title: '这是转发搜索结果',
      path: '/page/demo/demo'
    }
  },
  //刷新完毕停止刷新动作
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  data: {//变量只小写
    courseResult: 
    [
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 15, price: '19.00' }, 
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 18, price: '19.00' },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 12, price: '19.00' }, 
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 30, price: '19.00' }
    ],
    videoResult:
    [
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 16, like: 34 },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 18, like: 35 },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 20, like: 36 },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 16, like: 37 }
    ],
    topicResult:
    [
      { topicDetail: '什么是中基?\n人们为什么要学中基呢？中基有什么好的呢？', viewCount: 25, pv: 13, image:'../../image/test.jpg'},
      { topicDetail: '简述那个些年被中基伤害过的事件？你又想起来什么呢，什么呢，什么呢？', viewCount:30, pv:12,image:''},
      { topicDetail: '自己攒钱去西藏交孩子们写代码，可以吗？', viewCount:28, pv:9 , image:''}
    ],
    listenResult:
    [
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 20, like: 27 },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 16, like: 29 },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 12, like: 16 },
      { image: '../../image/test.jpg', detail: 'CourseName\nTeacherName\n', traffic: 31, like: 37 }
    ],
    str:'',//搜索输入的字符串
    redisplay:'none',//模糊补充输入页
    display: 'none',//遮荫栏
    tabdisplay:'none',//筛选栏
    currentTab: 0,//当前所处滑块
    courseCount: 4,//课程显示条数
    videoCount: 4,//小视频显示数
    topicCount: 4,//话题显示数
    listenCount: 4,//音频显示数
    swiperText: ["推荐课程", "优选微视", "讨论问答", "精彩音频"],//滑块标题
    resultText:['微信','微信小程序','微信小','微信程','微信序']//模糊补充结果
  },
  clickTab: function(e) { /*点击选项卡切换页面*/
    var that = this; /*将this赋值给临时的that*/
    if (this.data.currentTap === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current /*不能有；*/
      });
    }
  },
  swiperTab: function(e) { /*滑动选项卡切换页面 */
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  changeCourseCount:function(){/*点击更多改变课程显示数量*/
    var that = this;
    that.setData({
      courseCount:that.data.courseCount+5,
    })
  },
  changeVideoCount: function () {/*点击更多改变小视频显示数量*/
    var that = this;
    that.setData({
      videoCount: that.data.videoCount + 5,
    })
  },
  changeTopicCount: function () {/*点击更多改变讨论显示数量*/
    var that = this;
    that.setData({
      topicCount: that.data.topicCount + 5,
    })
  },
  changeListenCount: function () {/*点击更多改变音频显示数量*/
    var that = this;
    that.setData({
      listenCount: that.data.listenCount + 5,
    })
  },
  /*点击筛选弹出侧选框*/
  showView: function(e) {
    var that = this;
    that.setData({
      display: 'block',
      tabdisplay:'block',
    })
  },
  /*点击遮影收回测选框 */
  showMain: function() {
    var that = this;
    that.setData({
      display: 'none',
      tabdisplay:'none',
    })
  },
  bindViewTap: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/wxggt/SearchResult',//跳转路径
      data: {//附带参数
        str : that.data.str,
      },
      method: 'GET',//传递方式
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {//成功后操作
        that.setData({
          courseResult: res.data.CourseResult,
          videoResult: res.data.SmallVideoResult,
          listenResult: res.data.SoundResult,
          topicResult: res.data.TopicResult,
        });
      },
      fail: function (res) {//失败后操作
        console.log(".....fail.....");
      }
    })
  },
  //点击补全内容跳转
  completeInput:function(e){
    var that = this;
    that.setData({
      str:e.currentTarget.dataset.name,//将所选内容写入输入框
    })
    that.bindViewTap(e);//调用搜索按钮函数
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件')
  },
  //输入时自动匹配
  showResult:function(e){
    var that = this;
    if (e.detail.value == '') {
      return;
    }
    that.setData({
      str: e.detail.value,
    })
    wx.request({
      url: 'http://localhost:8080/wxggt/CompleteAllInput',//请求路径
      data: {//附带参数
        str: e.detail.value,
      },
      method: 'GET',//传输方式
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {//成功后操作
        console.log(res);
        that.setData({
          resultText: res.data,
          redisplay: 'block'
        });
      },
      fail: function (res) {//失败后操作
        console.log(".....fail.....");
      }
    })
  },
   //输入完成下方消失
  closeResult:function(e){
    var that = this;
    that.setData({
      redisplay:'none',//推送框隐藏
    });
  },
  //点击课程跳转课程详细
  bindViewCourse:function(e){
    wx.navigateTo({
      url: '../showcoursesource/showcoursesource?cNO='+e.currentTarget.dataset.id
    })
  }
})