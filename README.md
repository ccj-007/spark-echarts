# spark-echarts

## qucik start

```js
pnpm dev
pnpm build // vite打包构建，默认在dist目录生成sdk，支持umd、esm
```

## detailed introduction

[Echarts 无法实现这个曲线图 😭，那我手写一个](https://juejin.cn/post/7224886702883258424)

## examples

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./dist/style.css">
</head>
<style>

</style>

<body>
  <div id="container"></div>

  <script type="module">
    import { graph } from "./dist/spark-echarts.mjs";

    let options = {
      layout: {
        root: '#container',
        m: 60
      },
      /**
       * 注意！这里分段间有重复点20一定要相等，用于衔接曲线
       */
      data: [[40, 60, 40, 80, 10, 50, 80, 0, 50, 30, 20], [20, 30, 60, 40, 30, 10, 30, 20, 0, 30, 20], [20, 30, 20, 40, 20, 10, 10, 30, 0, 30, 50]],
      axisX: {
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        format (param) {
          return param + 'w'
        },
        top: 4,
      },
      axisY: {
        data: [0, 20, 40, 60, 80],
        format (param) {
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
    graph.line(options)
  </script>
</body>

</html>
```
