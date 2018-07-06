var app = getApp();
const Toast = require('../../zanui/toast/toast');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    foodItems: [],
    foodLen: 1,
    curIndex: 0,
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false
  },
  showIconToast() {
    Toast({
      type: 'success',
      message: '付款成功',
      selector: '#zan-toast-test'
    });
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
  foodDetails: function (event) {
    var postfood = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'foodDetail/foodDetail?food=' + postfood
    })
    app.globalData.cost = this.data.cost;
  },
  sendOrder:function() {
    var tmp = "/user_id/restaurant_id/payment";
    var resp = "204"
    var tmpbody = {
      "orders":
      [
        {
          "desk_number": 2,
          "total_price": 121,
          "restaurant_id": 9527,
          "user_id": "3062"
        }
      ],
      "order_items":
      [
        {
          "number": 2,
          "name": "豆腐",
          "description": "delicious",
          "image": "/image/doufu.png",
          "price": 12,
        }
      ]
    };
    var that = app;
    var userid = app.globalData.user_id;
    var rest = app.globalData.restaurant_id;
    var Url = app.globalData.Url;
    var wholeUrl = Url + '/' + userid + '/' + rest + '/payment';
    var wholeBody={};
    var food=this.data.foodItems;
    var ordedFood={};
    var ordedFoodList=[];
    var cost = this.data.cost;
    wholeBody["orders"] = JSON.stringify(
    [
      {
        "desk_number": 2,
        "total_price": cost,
        "restaurant_id": rest,
        "user_id": userid
      }
    ]);
    for (var i = 0; i < food.length;i++) {
      ordedFood["number"] = food[i].food_id;
      ordedFood["name"] = food[i].name;
      ordedFood["description"] = food[i].description;
      ordedFood["image"]=food[i].image;
      ordedFood["price"]=food[i].price;
      ordedFoodList.push(JSON.stringify(ordedFood));
    }
    wholeBody["order_items"] = JSON.stringify(ordedFood);
    console.log(wholeBody);
    console.log(wholeUrl);
    
    wx.request({
      url: wholeUrl,
      body: JSON.stringify(wholeBody),
      success:res => {
        console.log(res.data);
        if(res.data == 204) {
          return true;          
        }
      }
    })
    //why?????
    return true;
  },
  showIconToast() {
    Toast.setDefaultOptions({
      selector: '#zan-toast-test'
    });
    if(this.sendOrder()) {
      Toast({
        type: 'success',
        message: '订单成功',
        selector: '#zan-toast-test'
      });
    } else {
      Toast({
        type: 'fail',
        message: '订单失败',
        selector: '#zan-toast-test'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = app.globalData.foodItems;
    var tmpOrder=[];
    var index=0;
    var len = tmp.length;
    for(var i=0;i<len;i++) {
      if (tmp[i + ""].count>0) {
        tmpOrder[index+""] = tmp[i+""];
      }
    }
    this.setData({
      foodItems: tmpOrder,
      cost: app.globalData.cost
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
    var tmp = app.globalData.foodItems;
    var tmpOrder = [];
    var index = 0;
    var len = tmp.length;
    for (var i = 0; i < len; i++) {
      if (tmp[i + ""].count > 0) {
        console.log(i);
        tmpOrder[index + ""] = tmp[i + ""];
        index++;
      }
    }
    this.setData({
      foodItems: tmpOrder,
      cost: app.globalData.cost
    })
    console.log(tmpOrder);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var tmp = app.globalData.foodItems.length;
    var tmpOrder = this.data.foodItems;
    var index = 0;
    for(var i=0;i<tmp;i++) {
      if (tmp[i + ""].count > 0) {
        console.log(i);
        pp.globalData.foodItems[i + ""].count = tmpOrder[index + ""].count;
        index++;
      }
    }
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