export const options = {
  layout: {
    root: '#container',
    m: 40
  },
  /**
   * 注意！这里分段间有重复点20一定要相等，用于衔接曲线
   */
  data: [[40, 60, 40, 80, 10, 50, 80, 0, 50, 30, 20], [20, 30, 60, 40, 30, 10, 30, 20, 0, 30, 20], [20, 30, 20, 40, 20, 10, 10, 30, 0, 30, 50]],
  axisX: {
    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    format(param: string | number) {
      return param + 'w'
    },
    top: 4,
  },
  axisY: {
    data: [0, 20, 40, 60, 80],
    format(param: string | number) {
      return param + '人'
    },
    right: 10,
  },
  series: [
    {
      rgba: [[55, 162, 255], [116, 21, 219]],
      hoverRgba: [[55, 162, 255], [116, 21, 219]],
      lineColor: 'blue'
    },
    {
      rgba: [[255, 0, 135], [135, 0, 157]],
      hoverRgba: [[255, 0, 135], [135, 0, 157]],
      lineColor: 'purple'
    },
    {
      rgba: [[255, 190, 0], [224, 62, 76]],
      hoverRgba: [[255, 190, 0], [224, 62, 76]],
      lineColor: 'orange'
    }
  ]
}
