var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (event) {

  },

  getOrder: function (app) {
    var that = app;
    var userid = app.globalData.user_id;
    var pw = app.globalData.user_password;
    var rest = app.globalData.restaurant_id;
    var Url = app.globalData.Url;
    var wholeUrl = Url + '/' + userid + '/' + rest + '/menu';
    console.log(wholeUrl);
    /*
    var selfheader;
    selfheader = {
      'Content-Type' : 'application/json',
      'cookie': wx.getStorageSync("sessionid")//读取cookie
    };
    */
    wx.request({
      url: wholeUrl,
      //header: selfheader,
      success: res => {
        var tmp = res.data["foods"];
        console.log(tmp);
        that.globalData.foodItems = tmp;
        for (var i = 0; i < that.globalData.foodItems.length; i++) {
          that.globalData.foodItems[i].count = 0;
        }
        console.log(that.globalData.foodItems);
      }
    })
  },
  bindGetUserInfo: function (e) {
    app.globalData.user_id = e.detail.userInfo.nickName;
    wx.switchTab({
      url: '../mealOrder/mealOrder'
    })
    //wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
    console.log(app.globalData.user_id);
    this.getOrder(app);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function() {
    if (app.globalData.userId != null) {
      wx.switchTab({
        url: '../mealOrder/mealOrder'
      })
    }
    console.log(app.globalData.userId);
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
    
  },
})