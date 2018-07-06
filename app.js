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
      }
    })
  },

  jsonLen: function (jsonData) {
    var jsonLength = 0;
    for (var item in jsonData) {
      jsonLength++;
    }
    return jsonLength;
  },

  getCookie: function(app) {
    var that = app;
    var id = "lisi";
    var pw = 123;
    //var rest = app.globalData.restaurant_id;
    //var Url = app.globalData.Url;
    //https://private-anon-68054a6f84-eatouteorder.apiary-mock.com/users/login
    //var wholeUrl = Url + '/' + userid + '/' + rest + '/menu';
    wx.request({
      url: '119.29.16.224:5000/login',
      data: {
        username:'lisi',
        password:'123'
      },
      method:"POST",
      success:res => {
        console.log(res.header);
      }
    })
  },

  globalData: {
    url: "http://localhost:8080/",
    userId: null,
    userInfo: null,
    code: 0,
    user_id: 3062,
    user_password: 123456,
    restaurant_id: 9527,
    Url: 'https://private-anon-6de347435d-eatouteorder.apiary-mock.com/users',
    foodItems: [],
    cost: 0,
    cookies: ""
  },

})