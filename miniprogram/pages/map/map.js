import * as echarts from '../../ec-canvas/echarts'
import china from './china.js';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  echarts.registerMap('china', china);

  chart.setOption({
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    visualMap: {
      type: 'piecewise',
      pieces: [
        { min: 5 },
        { max: 5 }
      ],
      left: -200,
      top: 'bottom',
      color: ['#FFB6C1', '#fff'],
      // text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },
    series: [{
      type: 'map',
      mapType: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      animation: false,
      data: [{
          name: '云南',
          value: 100
        },
        {
          name: '福建',
          value: 100
        }
      ]
    }],
  });
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    countryNum: 1,
    provinceNum: 0
  },

  onReady() { },

  // 获取到用户数据后
  goLocation() {
    wx.navigateTo({
      url: '/pages/location/location'
    })
  },
});