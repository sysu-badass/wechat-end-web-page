var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    food: {
      "food_id": 1,
      "count": 0,
      "name": "豆腐",
      "price": 10,
      "food_type": "素食",
      "description": "美味",
      "image": "../../image/food/doufu.jpg",
      "available": true,
      "restaurant_id": 9527
    },
    foodItems:[],
    foodLen: 1,
    curIndex: 0,
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false
  },
  pullBar: function () {
    this.setData({
      pullBar: !this.data.pullBar
    })
  }
  ,
  addToTrolley: function (e) {
    var menuContent = this.data.foodItems;
    menuContent[e.currentTarget.dataset.index].count++;
    this.setData({
      cost: this.data.cost + menuContent[e.currentTarget.dataset.index].price,
      foodItems: menuContent,
    })
    app.globalData.cost = this.data.cost;
  },
  removeFromTrolley: function (e) {
    var menuContent = this.data.foodItems;
    if (menuContent[e.currentTarget.dataset.index].count != 0) {
      menuContent[e.currentTarget.dataset.index].count--;
      this.setData({
        cost: this.data.cost - menuContent[e.currentTarget.dataset.index].price,
        foodItems: menuContent,
      })
    }
    app.globalData.cost = this.data.cost;    
  },
  foodDetails: function(event) {
    var postfood = event.currentTarget.dataset.index;
    console.log(postfood);
    wx.navigateTo({
      url: 'foodDetail/foodDetail?food=' + postfood
    })
  },
  onLoad: function (event) {

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var tmp = app.globalData.foodItems;
    var len = tmp.length;
    for (var i = 0; i < len; i++) {
      if(tmp[i].count != 0) {
        console.log(tmp[i].count);
      } else {
        tmp[i].count = 0;
      }
    }
    this.setData({
      foodItems: tmp,
      cost: app.globalData.cost
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var tmp = app.globalData.foodItems;
    var len = tmp.length;
    for (var i = 0; i < len; i++) {
      if (tmp[i].count != 0) {
        console.log(tmp[i].count);
      } else {
        tmp[i].count = 0;
      }
    }
    this.setData({
      foodItems: tmp,
      cost: app.globalData.cost
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.foodItems = this.data.foodItems;
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