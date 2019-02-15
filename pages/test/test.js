// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,//当前选项卡
    nowIndex:1,//当前题数
    questionDisplay:"none",//显示问题
    Type:"多选题",
    answer:[],
    questionResult:[
    {
    Question:"下列关于习近平同志用典语句反应出的哲学道理，与其他三个选项不一的十()",
    A: "XXXXXXXXX编辑文本",
    B: "XXXXXXXXX编辑卷子",
    C: "XXXXXXXXX编辑菜单",
    D: "XXXXXXXXX编辑任命",
    type: "单选题",
    },
    {
    Question:"下列关于毛主席同志用典语句反应出的哲学道理，与其他三个选项不一的十()",
    A: "XXXXXXXXX编辑文本",
    B: "XXXXXXXXX编辑卷子",
    C: "XXXXXXXXX编辑菜单",
    D: "XXXXXXXXX编辑任命",
    E: "XXXXXXXXX编辑行为",
    type: "多选题",
    },
    {
    Question:"下列关于胡锦涛同志用典语句反应出的哲学道理，与其他三个选项不一的十()",
    A: "XXXXXXXXX编辑文本",
    B: "XXXXXXXXX编辑卷子",
    C: "XXXXXXXXX编辑菜单",
    D: "XXXXXXXXX编辑任命",
    type: "单选题",
    }],
    radioClass: ["answer-unselect", "answer-unselect", "answer-unselect", "answer-unselect", "answer-unselect"],
    selected:0
  },

  //点击选项改变按钮样式
  changeRadioSelected:function(e){
    var that = this;
    var index = e.target.dataset.id;
    var selected = that.data.selected;
    var radioSelected = "radioClass["+selected+"]";//获取上一个选中的答案
    var radioNow = "radioClass[" + index + "]";//获取当前选中答案
    that.setData({
      [radioSelected]: "answer-unselect",//修改[]不可少
      [radioNow]: "answer-selected",
      selected: index
    })
  },

  //点击选项改变多选框样式
  checkSelected: function (e) {
    var that = this;
    var index = e.target.dataset.id;
    var radioNow = "radioClass[" + index + "]";//获取当前选中答案
    if (that.data.radioClass[index] =="answer-unselect"){
      that.setData({//修改[]不可少
        [radioNow]: "answer-selected"
      })
    }
    else{
      that.setData({//修改[]不可少
        [radioNow]: "answer-unselect"
      })
    }
  },

  //滑动窗口切换题目
  changeQuestion:function(e){
    var that = this;
    var index = e.detail.current;
    var radioNow = that.data.questionResult[index];
    var length = that.data.radioClass.length;
    for (var i = 0; i < length; i++){//切换题目，选项样式全部复原
      var selectNow = "radioClass["+i+"]";
    that.setData({
      [selectNow]: "answer-unselect",
    });
    }
    that.setData({//切换到新页
      currentTab: index,
      Type: radioNow.type,//将题目类型改为当前题目类型
      nowIndex: index + 1
    });
  },

  //点击上一页翻到前一页
  onPage:function(e){
    var that = this;
    var index = that.data.currentTab-1;
    if(index>=0){
    var radioNow = that.data.questionResult[index];
    var length = that.data.radioClass.length;
    for (var i = 0; i < length; i++) {
      var selectNow = "radioClass[" + i + "]";
      that.setData({
        [selectNow]: "answer-unselect",
      });
    }
    that.setData({
      currentTab: index,
      Type: radioNow.type,//将题目类型改为当前题目类型
      nowIndex: index + 1
    });
    }
  },

  //按下一题切换到下一页
  nextPage:function(e){
    var that = this;
    var index = that.data.currentTab + 1;
    var questionCount = that.data.questionResult.length;
    if (index < questionCount){
    var radioNow = that.data.questionResult[index];
    var length = that.data.radioClass.length;
    for (var i = 0; i < length; i++) {
      var selectNow = "radioClass[" + i + "]";
      that.setData({
        [selectNow]: "answer-unselect",
      });
    }
    that.setData({
      currentTab: index,
      Type: radioNow.type,//将题目类型改为当前题目类型
      nowIndex: index + 1
    });
    }
  },

  //点击选择题目显示所有题目
  showAllQuestion:function(e){
    var that = this;
    that.setData({
      questionDisplay:"block",
    })
  },

  //隐藏所有题目，跳转到所选题目
  closeAllQuestion:function(e){
    var that = this;
    var index = e.target.dataset.id;
    that.setData({
      questionDisplay:"none",//隐藏视图
      currentTab:index//跳转到所选题
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据传入名字修改页面标题
    wx.setNavigationBarTitle({
      title: options.name,
    })
    var that = this;
    that.setData({
      Type:that.data.questionResult[0].type
    })
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