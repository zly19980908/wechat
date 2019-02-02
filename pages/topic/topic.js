// pages/topic/topic.js
Page({
  // 分享
  onShareAppMessage: function () {
    return {
      title: '这是转发话题',
      path: '/page/topic/topic'
    }
  },
  //刷新完毕停止刷新动作
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },
  data: {
    str:'',//搜索的字符串
    redisplay:'none',
    resultText: ['微信', '微信小程序', '微信小', '微信程', '微信序'],
    color: ["#5CACEE", "black", "black", "black"],
    topicResult:[
      {
      nick:"无锡观光团",
      time:"14分钟",
      topicheader:"测试一下",
      topicdetail:"课程学习：搜索相关内容，观看教学视频，观看直播，社区讨论(发布讨论话题，针对话题进行讨论)，随堂测试，结业考试，课程练习，评教，课程老师信息查询，教学资料下载，打赏。.课堂",
      share:500,
      pv:670,
      like:5000
      },
      {
        nick: "无锡观光团",
        time: "14分钟",
        topicheader: "测试一下",
        topicdetail: "课程学习：搜索相关内容，观看教学视频，观看直播，社区讨论(发布讨论话题，针对话题进行讨论)，随堂测试，结业考试，课程练习，评教，课程老师信息查询，教学资料下载，打赏。.课堂",
        share: 400,
        pv: 260,
        like: 4700
      },
      {
        nick: "无锡观光团",
        time: "14分钟",
        topicheader: "测试一下",
        topicdetail: "课程学习：搜索相关内容，观看教学视频，观看直播，社区讨论(发布讨论话题，针对话题进行讨论)，随堂测试，结业考试，课程练习，评教，课程老师信息查询，教学资料下载，打赏。.课堂",
        share: 600,
        pv: 360,
        like: 5200
      }]
    },
  //根据某一属性从大到小比较数组
  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },
  //根据三个属性从大到小排序
  compare2: function (property, property1, property2) {
    return function (a, b) {
      var value1 = a[property] + a[property1] + a[property2];
      var value2 = b[property] + b[property1] + b[property2];
      console.log(value1);
      console.log(value2);
      return value2 - value1;
    }
  },
  //点击最热根据点赞人数排序
  sortByLike: function (e) {
    var that = this;
    that.bindChangView(e);
    that.setData({
      topicResult: that.data.topicResult.sort(that.compare("like")),
    })
  },
  //点击最新根据发布时间排序
  sortByOpenTime:function(){

  },
  //点击关注筛选出我关注的人的话题
  selectWhoILook:function(){

  },
  //点击综合根据分享量评论量点赞量和排序
  sortByThreeStandard:function(e){
    var that = this;
    that.bindChangView(e);
    that.setData({
      topicResult: that.data.topicResult.sort(that.compare2("like","share","pv")),
    })
  },
  /*点击view改变字体颜色 */
  bindChangView:function(e){
    var that = this;
    var index = e.target.id;//获取view的id
    console.log(index);
    for(var i=0;i<4;i++){
      var color = "color["+i+"]";//获取数组对象
      if(i == index){//id为index的view字体变色
         that.setData({
           [color]:"#5CACEE",
         });
      }
      else{
        that.setData({
          [color]: "black"
        });
      }
    }
  },
  //输入时自动匹配
  showResult: function (e) {
    var that = this;
    var s = e.detail.value.split('');//将输入得字符串分割成一个个字符
    var length = s.length;//数组长度
    console.log(s[length - 1]);
    if (s[length - 1] == '微') {//判断输入的最后一个字
      that.setData({
        redisplay: 'block'
      });
    }
  },
  //点击搜索向后台发送请求
  bindViewTap:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/wxggt/ShowAllTopicServlet',//请求路径
      data: {//附带参数
        topicdetail:that.data.str,
      },
      method: 'GET',//传输方式
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {//成功后操作
        console.log(res);
        that.setData({
          topicResult: res.data,
        });
      },
      fail: function (res) {//失败后操作
        console.log(".....fail.....");
      }
    })
  },
  //输入完成下方消失
  closeResult: function (e) {
    var that = this;
    that.setData({
      str:e.detail.value,
      redisplay: 'none',
    });
  },
  //点击发布按钮跳转发布文章界面
  opentalk:function(e){
    wx.navigateTo({
      url: '../opentopic/opentopic?nick='+"无锡观光园",//带参数跳转页面,不可以跳到导航栏页面
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    app.changeTabBar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})