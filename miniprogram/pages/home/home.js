// miniprogram/pages/home/home.js
//在此只能使用相对路径方式！
//.json文件中可以使用绝对路径！
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast.js'
const Moment = require('../../miniprogram_npm/moment/index.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newloan: '',
    show: false,
    bool: true,
    object: {},
    userInfo: {},
    array: [],
    gap: '0天0时0分0秒'
  },

  showPopup(event) {
    this.setData({
      show: true,
      object: event.target.dataset.item
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  // 更新贷款状态为【进行中】
  startLoan(event) {
    var _this = this
    wx.request({
      url: 'http://111.229.251.142/api/weapp/updateLoan',
      method: 'POST',
      data: {
        title: event.target.dataset.item.title,
        status: 3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          show: false
        })
        _this.queryLoanList()
      }
    })
  },

  // 更新贷款状态为【已完成】
  updateLoan(event) {
    var _this = this
    wx.request({
      url: 'http://111.229.251.142/api/weapp/updateLoan',
      // url: 'http://localhost:8888/weapp/updateLoan',
      method: 'POST',
      data: {
        title: event.target.dataset.item.title,
        completeTime: new Date(),
        status: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          show: false
        })
        _this.queryLoanList()
      }
    })
  },

  // 删除贷款
  deleteLoan(event) {
    var _this = this
    wx.request({
      url: 'http://111.229.251.142/api/weapp/updateLoan',
      // url: 'http://localhost:8888/weapp/updateLoan',
      method: 'POST',
      data: {
        title: event.target.dataset.title,
        status: 2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.queryLoanList()
      }
    })
  },

  // 监听贷款输入框变化
  onNewLoanChange(event) {
    this.setData({
      newloan: event.detail
    })
  },

  // 新增贷款 
  addNewLoan() {
    if (this.data.newloan === '') {
      Toast.fail('没事做阿')
      return
    }
    var _this = this
    wx.request({
      url: 'http://111.229.251.142/api/weapp/addLoan',
      // url: 'http://localhost:8888/weapp/addLoan',
      method: 'POST',
      data: {
        title: this.data.newloan,
        status: 0,
        createBy: this.data.userInfo.nickName,
        createTime: new Date()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.queryLoanList()
        _this.setData({
          newloan: ''
        })
      }
    })
  },

  // 获取贷款列表
  queryLoanList() {
    var _this = this
    wx.request({
      url: 'http://111.229.251.142/api/weapp/queryLoanList',
      // url: 'http://localhost:8888/weapp/queryLoanList',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          array: res.data.resultData
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryLoanList()
    let timeCount = setInterval(() => {
      let m2 = Moment() // 当下时间
      let m1 = Moment('2020-06-04 23:49:00') // 起始时间
      let du = Moment.duration(m2 - m1, 'ms') // 做差
      this.setData({
        gap: du.get('days') + '天' + du.get('hours') + '时' + du.get('minutes') + '分' + du.get('seconds') + '秒'
      });
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getUserInfo({
      success: function (res) {
        userInfo: res.userInfo
      },
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
    this.queryLoanList()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
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