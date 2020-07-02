// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    none: 0,
    doing: 0,
    done: 0,
    nickName: '',
    area: '',
    avatarUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res) {
        console.log(res)
        _this.setData({
          nickName: res.userInfo.nickName,
          area: res.userInfo.province + ' ' + res.userInfo.city,
          avatarUrl: res.userInfo.avatarUrl
        });
      },
    })
    wx.request({
      url: 'http://111.229.251.142/api/weapp/countLoan',
      // url: 'http://localhost:8888/weapp/countLoan',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
           none: res.data.resultData.find(obj => obj.STATUS === 0).number,
           doing: res.data.resultData.find(obj => obj.STATUS === 3).number,
           done: res.data.resultData.find(obj => obj.STATUS === 1).number
        });
      }
    })
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