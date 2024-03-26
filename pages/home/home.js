// home.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    data: {
        title: '快速问答',
    },

    //监控页面显示
    onShow: function () {
        console.info("home onShow");
        // setTimeout(function() {
        //   wx.navigateTo({ url: '/pages/main-menu/main-menu' });
        // }, 2000);
  },
})
