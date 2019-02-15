// pages/showallcourse/showallcourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseCount: 4,
    courseType: [{
        cname: "全部"
      },
      {
        cname: "中基"
      },
      {
        cname: "中诊"
      },
      {
        cname: "方剂"
      },
      {
        cname: "临床"
      },
      {
        cname: "药理"
      },
      {
        cname: "生理"
      },
      {
        cname: "影像"
      }
    ],
    courseResult: [{
        image: '../../image/test.jpg',
        detail: 'CourseName\nTeacherName\n',
        traffic: 15,
        price: '19.00',
        date: Date.parse("2015-01-09")
      },
      {
        image: '../../image/test.jpg',
        detail: 'CourseName\nTeacherName\n',
        traffic: 18,
        price: '19.00',
        date: Date.parse("2015-01-10")
      },
      {
        image: '../../image/test.jpg',
        detail: 'CourseName\nTeacherName\n',
        traffic: 12,
        price: '19.00',
        date: Date.parse("2015-01-08")
      },
      {
        image: '../../image/test.jpg',
        detail: 'CourseName\nTeacherName\n',
        traffic: 20,
        price: '19.00',
        date: Date.parse("2015-01-15")
      }
    ],
    pCourseResult: [],
    str:'',//搜索的字符串
    resultText:[],//模糊补全输入
    redisplay:'none',
  },
  //根据某一属性比较数组
  compare: function(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },
  //点击热门根据观看人数排序
  sortByPageview: function() {
    var that = this;
    that.setData({
      courseResult: that.data.courseResult.sort(that.compare("traffic")),
    })
  },
  //点击最新根据发布时间排序
  sortByDate: function() {
    var that = this;
    that.setData({
      courseResult: that.data.courseResult.sort(that.compare("date")),
    })
  },
  //点击选择专业筛选结果
  selectCourseType: function(e) {
    var that = this;
    var selectType = e.currentTarget.dataset.type;//获取view的名字也就是选择的专业
    if (selectType == "全部") {//如果点了全部显示所有结果
      that.setData({
        courseResult: that.data.pCourseResult//将备份赋值给渲染层
      })
    } else {
      var selectCourseType = [];//存储筛选出来的记录
      var courseResult = that.data.pCourseResult;//从最初始的数组中筛选
      for (var i = 0; i < courseResult.length; i++) {
        if (courseResult[i].cName == selectType) {//筛选
          selectCourseType.push(courseResult[i]);//添加
        }
      }
      that.setData({ //将筛选出的赋值给渲染页面的courseResult
        courseResult: selectCourseType
      })
    }
  },
  changeCourseCount: function() { /*点击更多改变课程显示数量*/
    var that = this;
    that.setData({
      courseCount: that.data.courseCount + 5,
    })
  },
  changeCourseCountOfSelect: function() {
    var that = this;
    that.setData({
      courseCount: 4,
    })
  },
  //输入时自动匹配
  showResult: function (e) {
    var that = this;
    if(e.detail.value==''){
      return;
    }
    that.setData({
      str: e.detail.value,
    })
    wx.request({
      url: 'http://localhost:8080/wxggt/CompleteCourseInput',//请求路径
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
  closeResult: function (e) {
    var that = this;
    that.setData({
      redisplay: 'none',//推送框隐藏
    });
  },
  //清除搜索框值
  clearInput: function () {
    var that = this;
    that.setData({
      str: ""
    });
  },
  //点击搜索查询
  bindViewTap: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/wxggt/SearchResult',//请求路径
      data: {//附带参数
        str: that.data.str
      },
      method: 'GET',//传输方式
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {//成功后返回
        console.log(res.data);
        that.setData({
          courseResult: res.data.CourseResult,
        });
      },
      fail: function (res) {//失败后操作
        console.log(".....fail.....");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp();
    app.changeTabBar();
    var that = this;
    wx.request({
      url: 'http://localhost:8080/wxggt/SearchResult',
      data: {
        str: "中",
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data.CourseResult);
        that.setData({
          courseResult: res.data.CourseResult,
          pCourseResult: res.data.CourseResult
        });
      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.startPullDownRefresh({

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})