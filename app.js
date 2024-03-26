// app.js
App({
    globalData: {
        baseAPI: "http://127.0.0.1:8080", //后端运行端口号
        //baseAPI: "http://139.224.205.77:8080", //后端运行端口号
        token: null //微信登陆token
    },
     
    onLaunch: function () {
        console.log('onLaunch');
        this.checkLogin();
    },
  
    //微信登录逻辑
    login: function () {
        let _this = this;
        wx.login({
            success: (res) => {
                console.log("call wx_server:wxlogin success, code = " + res.code);
                wx.request({
                    url: _this.globalData.baseAPI + "/wxlogin",
                    header: {
                        'content-type': 'application/json;charset=UTF-8'
                    },
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success: (res) => {
                        console.log("call my_server:wxlogin finished, recode = " + res.data.code);
                        if (res.data.code == 0) {
                            console.log("call my_server:wxlogin success, token = " + res.data.data);
                            _this.globalData.token = res.data.data;
                            wx.setStorage({
                                key: 'token',
                                data: res.data.data
                            });
                            this.jumpToMainMenuPage();
                        } else {
                            console.log("call my_server:wxlogin failed, code = " + res.data.code + ", msg = " + res.data.msg);
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 2000
                            });
                        }

                    },
                    fail: (error) => {
                        console.error("请求失败:", error);
                        wx.showToast({
                            title: '请求失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                })
            }
        })
    },

    //检查是否登录
    checkLogin: function () {
        let _this = this;
        var token = _this.globalData.token;
        if (!token) {
            token = wx.getStorageSync('token');
            if (token) {
                _this.globalData.token = token;
            } else {
                this.login();
                return;
            }
        }

        console.log("call checkwxlogin, token = " + token);
        wx.request({
            url: _this.globalData.baseAPI + "/checkwxlogin",
            data: {
                token: token
            },
            success: (res) => {
                console.log('call my_server:checkwxlogin finished, res.data.code = ', res.data.code);
                if (res.data.code == 0) {
                    console.log('call my_server:checkwxlogin success');
                    this.jumpToMainMenuPage();
                } else {
                    console.log('call my_server:checkwxlogin failed, call login');
                    this.login();
                }
            }
        })
    },

    // 跳转到
    jumpToMainMenuPage: function () {
        setTimeout(function() {
          wx.navigateTo({ url: '/pages/main-menu/main-menu' });
        }, 1500);
    }
})
