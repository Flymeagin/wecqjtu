const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [],
    page: 0,
    caozuo: '加载更多'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globleData.localurl + 'getJW',
      method: 'POST',
      data: {
        page: that.data.page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          news: res.data.msg,
          page: res.data.page
        });
      },
      fail: function (err) {
        console.log(err);
        wx.showModal({
          title: '错误信息',
          content: "网络连接失败!",
          showCancel: false
        });
      }
    });
  },
  caozuo: function () {
    let that = this;
    let page = this.data.page;
    page--;
    if (page == 0) {
      this.setData({
        caozuo: "无更多数据"
      });
    } else {
      wx.request({
        url: app.globleData.localurl + 'getJW',
        method: 'POST',
        data: {
          page: page
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let news = that.data.news;
          let c = news.concat(res.data.msg);
          that.setData({
            news: c,
            page: page
          });
        },
        fail: function (err) {
          console.log(err);
          wx.showModal({
            title: '错误信息',
            content: "网络连接失败!",
            showCancel: false
          });
        }
      });
    }
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