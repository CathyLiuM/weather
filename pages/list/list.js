const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Page({
  data: {
    weekWeather: [1,2,3,4,5,6,7],
    city: '广州市'
  },
  onLoad: function (options) {
    console.log('onLoad')
    this.setData({
      city: options.city
    })
    this.getWeekWeather()
  },
  onReady() {
    console.log("onReady")
  },
  onHide() {
    console.log('onHide')
  },
  onUnload() {
    console.log('onUnload')
  },
  onShow() {
    console.log('onShow')
  },
  getWeekWeather(callback){
    let that = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        time: new Date().getTime(),
        city: that.city
      },
      success(res) {
        let result = res.data.result
        // console.log(result)
        that.setWeekWeather(result)
      },
      complete:()=>{
        callback&&callback()
      }
    })
  },
  setWeekWeather(result){
    let weekWeather = [];
    for(let i=0;i<7;i++){
      let date = new Date()
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayMap[date.getDay],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        temp: `${result[i].minTemp}-${result[i].maxTemp}`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    weekWeather[0].day = '今天'
    this.setData({
      weekWeather: weekWeather
    })
  },
  onPullDownRefresh(){
    this.getWeekWeather(()=>{
      wx.stopPullDownRefresh()
    })
  }
})