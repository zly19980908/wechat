// pages/showcoursesource/showcoursesource.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    nick:"马皓媛",
    school:"湖南中医药大学",
    studyPeople:"1000000亿人",
    describe:"包文婧的收纳能力太强了吧，竟然真的把袁姗姗乱糟糟的衣柜整理出来了，乱室佳人袁姗姗，整理达人包文婧[笑cry][笑cry]#包文婧开个家政公司吧#，名字就叫包干净！",
    sourceResult:["课前准备","看书","写代码","第一讲","你说的对","1.2","第二节","2.1","第三节","3.1","第四节","测试部分到为止"],
    topicResult: [
      {
        nick: "无锡观光团",
        time: "14分钟",
        topicheader: "测试一下",
        topicdetail: "课程学习：搜索相关内容，观看教学视频，观看直播，社区讨论(发布讨论话题，针对话题进行讨论)，随堂测试，结业考试，课程练习，评教，课程老师信息查询，教学资料下载，打赏。.课堂",
        share: 500,
        pv: 670,
        like: 5000
      },
      {
        nick: "无锡观光团",
        time: "14分钟",
        topicheader: "测试一下",
        topicdetail: "课程学习：搜索相关内容，观看教学视频，观看直播，社区讨论(发布讨论话题，针对话题进行讨论)，随堂测试，结业考试，课程练习，评教，课程老师信息查询，教学资料下载，打赏。.课堂",
        share: 500,
        pv: 670,
        like: 5000
      }]
  },
  clickTab: function (e) { /*点击选项卡切换页面*/
    var that = this; /*将this赋值给临时的that*/
    if (this.data.currentTap === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current /*不能有；*/
      });
    }
  },
  swiperTab: function (e) { /*滑动选项卡切换页面 */
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
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