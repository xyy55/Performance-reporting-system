// miniprogram/pages/playground/playground.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    performance:[]
  },
  create:function(e){
    let head = app.globalData.branch_name + app.globalData.time+'业绩：'
    let performance = this.data.performance
    let personal_performance = ''
    let total_performance = {}
    let total_performance_sum = ''
    for(let item of performance){
      personal_performance += '⭕'+item.name + " "
      for(let key in item.performance){
        personal_performance += key + item.performance[key] + ' '
        if(key in total_performance == false){
          total_performance[key] = parseInt(item.performance[key])
        }else{
          total_performance[key] += parseInt(item.performance[key])
        }
      }
      personal_performance += "\n"
    }
    for(let key in total_performance){
      total_performance_sum += key + total_performance[key] + ' '
    }
    let finall = head + '\n' + personal_performance + '⭕' +head + total_performance_sum
    wx.setClipboardData({ data: finall })
    wx.showModal({
      title: '链接已经复制到剪切板',
      content: finall,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    console.log(finall)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('performance').where({
      time:app.globalData.time
    }).get().then(res => {
      this.setData({performance:res.data})
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
    const db = wx.cloud.database();
    db.collection('performance').where({
      time: app.getApp.time
    }).get().then(res => {
      this.setData({ performance: res.data })
    })
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