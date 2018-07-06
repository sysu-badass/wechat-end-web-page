var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "orders": [
      {
        "order_history_id": 1,
        "date": "2018.6.18",
        "desk_number": 2,
        "total_price": 121,
        "restaurant_id": 9527,
        "user_id": 3062
      }
    ],
    "order_items": [
      {
        "order_history_item_id": 1,
        "number": 2,
        "name": "doufu",
        "description": "delicious",
        "image": "./image/doufu.png",
        "price": 12,
        "order_history_id": 34
      }
    ],
    "url1":"https://private-anon-6de347435d-eatouteorder.apiary-mock.com/users/user_id/restaurant_id/orders",
    "url2":"https://private-anon-6de347435d-eatouteorder.apiary-mock.com/users/user_id/restaurant_id/orders/order_id",
    orderItems:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userid = app.globalData.user_id;
    var pw = app.globalData.user_password;
    var rest = app.globalData.restaurant_id;
    var Url = app.globalData.Url;
    var id=options.orderId;
    var wholeUrl = Url + '/' + userid + '/' + rest + '/orders/' + id;
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
        var tmp = res.data;
        that.setData({
          orderItems: tmp["order_items"]
        });
      }
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