//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              js_code: res.code,
              appid: "wxe069701a8822d1f2",
              secret: "a237d1787e6994615635ec5606ccd8be",
              grant_type: "authorization_code"
            },
            success: function (res) {
              var id = res.data.openid;
              var numId = 0;
              if (id) {
                numId = that.stringId2intId(id);
                console.log(numId);
                that.globalData.userId = numId;
              }
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
            }
          })
        }
      }
    })
    this.getOrder(this);
  },

  //把微信id前六位转化为数据库id
  stringId2intId: function (id) {
    var i = 0;
    var numId = 0;
    for (; i < 6; i++) {
      numId += id.charCodeAt(i);
    }
    return numId;
  },

  jsonLen: function (jsonData) {
    var jsonLength = 0;
    for (var item in jsonData) {
      jsonLength++;
    }
    return jsonLength;
  },

  getOrder: function (app) {
    var that = app;
    var userid = app.globalData.user_id;
    var pw = app.globalData.user_password;
    var rest = app.globalData.restaurant_id;
    var Url = app.globalData.Url;
    var wholeUrl = Url + '/' + userid + '/' + rest + '/menu';
    wx.request({
      url: wholeUrl,
      success: res => {
        var tmp = res.data["foods"];
        console.log(tmp);
        //tmp = "[{  \"food_id\": 1,\"name\": \"豆腐\", \"price\": 10,\"food_type\": \"素食\",\"description\": \"美味\",\"image\": \"../../image/food/doufu.jpg\", \"available\": true,\"restaurant_id\": 9527},{  \"food_id\": 2,\"name\": \"苹果\", \"price\": 10,\"food_type\": \"素食\",\"description\": \"美味\",\"image\": \"../../image/food/apple.jpg\", \"available\": true,\"restaurant_id\": 9527} ]";
        that.globalData.foodItems = tmp;
        for (var i = 0; i < that.globalData.foodItems.length;i++) {
          that.globalData.foodItems[i].count = 0;
        }
        console.log(that.globalData.foodItems);
      }
    })
  },

  globalData: {
    url: "http://localhost:8080/",
    userId: 111,
    userInfo: null,
    code: 0,
    user_id: 3062,
    user_password: 123456,
    restaurant_id: 9527,
    Url: 'https://private-anon-6de347435d-eatouteorder.apiary-mock.com/users',
    foodItems: [],
    cost: 0
  },

})