// main-menu.js
Page({
    data: {
        userName: '用户',
        defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        goldenImage: '../images/golden.jpg',
        goldenNumber: '1000',
    },

    //监控页面显示
    onShow: function () {
        console.info("main-menu onShow");
        this.setData({ goldenNumber: '12'});
    }
})
