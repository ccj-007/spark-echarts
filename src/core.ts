import { drawArc, getPathPoint } from "./utils/canvas-utils";
import { options } from "./config/options";
import { Options, PointList, Pos } from "./types";
import utils from "./utils/tools";

let canvas: HTMLCanvasElement | null, dotCanvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dotCtx: CanvasRenderingContext2D, labelDOM: HTMLDivElement | null, container: HTMLElement, markCanvas: HTMLCanvasElement,
  markCtx: CanvasRenderingContext2D

let data: number[][] = [], newOpt: Options = options
let pointList: PointList = [], pathPoints: Pos[] = [], concatData = [], maxY = 0, minY = 0, rangeY = 0, ratioY = 0, count = 0, rangeX = 0, xk = 0, xkVal = 0, dataLen = 0, ratioX = 0, stepX = 0, startAreaX = 0, startAreaY = 0, endAreaX = 0, endAreaY = 0, prePointPosX = 0, prePointPosY = 0, margin = 0, width = 0, height = 0, isLabel = false, newYs: string[] = [], newXs: string[] = [],
  areaList: Pos[] = [], cx = 0, cy = 0, firstEnding = true, isHover = false,
  areaId = -1, axisXList: number[] = [], axisYList: number[] = [], curInfo: { x: number, y: number } = { x: 0, y: 0 }, animateId = 0, maskWidth = 0, maskHeight = 0

/**
 * 初始化数据
 * @param options 
 * @returns 
 */
function initBaseData(options: Options) {
  if (!options.layout.root) throw new Error('your root is must be exist')
  newOpt = Object.assign(Object.create(null), options)

  // set options
  let { layout: { root, m } } = newOpt
  console.log(m);

  margin = m
  data = options.data

  container = document.querySelector(root) as HTMLElement
  canvas = document.createElement("canvas");
  dotCanvas = document.createElement("canvas");
  markCanvas = document.createElement("canvas");

  if (!container) return
  canvas.id = 'myCanvas', dotCanvas.id = 'myCanvasDot', markCanvas.id = 'markCanvas'

  ctx = canvas.getContext("2d") as CanvasRenderingContext2D, dotCtx = dotCanvas.getContext("2d") as CanvasRenderingContext2D; markCtx = markCanvas.getContext("2d") as CanvasRenderingContext2D;
  markCanvas.width = dotCanvas.width = canvas.width = container.offsetWidth
  canvas.height = markCanvas.height = dotCanvas.height = container.offsetHeight
  container.appendChild(canvas)
  container.appendChild(dotCanvas)
  container.appendChild(markCanvas)

  // 路由所有点
  pointList = [], pathPoints = []
  // 完整数据
  concatData = data.flat()
  // 定义画布尺寸和边距
  width = canvas.width, height = canvas.height

  // 计算 Y 轴坐标比例尺 ratioY
  maxY = Math.max.apply(null, concatData);
  minY = Math.min.apply(null, concatData);
  rangeY = maxY - minY;
  // 数据和坐标范围的比值
  ratioY = (height - 2 * margin) / rangeY;
  // 计算 X 轴坐标比例尺和步长
  count = concatData.length;
  rangeX = width - 2 * margin;
  xk = 1, xkVal = xk * margin
  dataLen = data.length
  ratioX = rangeX / (count - dataLen);
  stepX = ratioX;

  startAreaX = 0, startAreaY = 0, endAreaX = 0, endAreaY = 0, prePointPosX = 0, prePointPosY = 0
}

/**
 * 绘制坐标轴
 */
function drawAxis() {
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, height - margin);
  ctx.lineTo(width - margin + 2, height - margin);
  ctx.setLineDash([3, 3])
  ctx.strokeStyle = '#aaa'
  ctx.stroke();
  ctx.setLineDash([1])
  const yLen = newOpt.axisY.data.length
  const xLen = newOpt.axisX.data.length

  // 绘制 Y 轴坐标标记和标签
  for (let i = 0; i < yLen; i++) {
    let y = (rangeY * i) / (yLen - 1) + minY;
    let yPos = height - margin - (y - minY) * ratioY;

    if (i) {
      ctx.beginPath();
      ctx.moveTo(margin, yPos);
      ctx.lineTo(width - margin, yPos);
      ctx.strokeStyle = '#ddd'
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.stroke();
    newYs = []
    for (const val of options.axisY.data) {
      newYs.push(options.axisY.format(val))
    }
    ctx.fillText(newYs[i] + '', margin - 15 - options.axisY.right, yPos + 5);
    firstEnding && axisYList.push(yPos + 5)
  }

  // 绘制 X 轴坐标标签
  for (let i = 0; i < xLen; i++) {
    let x = i * stepX;
    let xPos = (margin + x);
    if (i) {
      ctx.beginPath();
      ctx.moveTo(xPos, height - margin);
      ctx.lineTo(xPos, margin);
      ctx.strokeStyle = '#ddd'
      ctx.stroke();
    }
    newXs = []
    for (const val of options.axisX.data) {
      newXs.push(options.axisX.format(val))
    }
    ctx.fillText(newXs[i], xPos - 1, height - margin + 10 + options.axisX.top);
    firstEnding && axisXList.push(xPos - 1)
  }
}

/**
 * 绘制单组曲线
 * @param data 
 */
function drawLine(data: any) {
  const { points, id, rgba, lineColor, hoverRgba } = data
  startAreaX = endAreaX
  startAreaY = endAreaY
  // 分割区
  if (firstEnding) {
    areaList.push({ x: startAreaX, y: startAreaY })
  }

  function darwColorOrLine(lineMode: boolean) {
    // 绘制折线
    ctx.beginPath();
    ctx.moveTo(id ? margin + endAreaX - xkVal : margin + endAreaX, height - margin - (points[0] - minY) * ratioY);
    ctx.lineWidth = 2
    ctx.setLineDash([0, 0])

    let x = 0, y = 0, translateX = 0
    if (id) {
      translateX -= (margin)
    }
    for (let i = 0; i < points.length; i++) {
      x = (i * stepX + margin + endAreaX + translateX)
      y = height - margin - (points[i] - minY) * ratioY;

      let x0 = (i - 1) * stepX + margin + endAreaX + translateX;
      let y0 = height - margin - (points[i - 1] - minY) * ratioY;
      let xc = x0 + stepX / 2;
      // let yc = (y0 + y) / 2;
      if (i === 0) {
        prePointPosX = x
        prePointPosY = y
        ctx.lineTo(x, y);
        if (!(prePointPosX === x && prePointPosY === y)) {
          pointList.push({ type: 'line', start: { x: prePointPosX, y: prePointPosY }, end: { x: x, y: y } })
        }
      } else {
        ctx.bezierCurveTo(xc, y0, xc, y, x, y);
        pointList.push({ type: 'curve', start: { x: prePointPosX, y: prePointPosY }, end: { x: x, y: y }, control1: { x: xc, y: y0 }, control2: { x: xc, y: y } })
      }
      prePointPosX = x
      prePointPosY = y
      if (i === points.length - 1) {
        endAreaX = x
        endAreaY = y

        if (firstEnding && id === newOpt.data.length - 1) {
          areaList.push({ x: x, y: y })
        }
      }
    }
    ctx.strokeStyle = lineColor
    ctx.stroke()

    lineMode && ctx.beginPath()

    // 右侧闭合点
    ctx.lineTo(endAreaX, height - margin)
    // 左侧闭合点
    ctx.lineTo(margin + startAreaX, height - margin)
    let startClosePointX = id ? startAreaX : margin + startAreaX
    // 交接闭合点
    ctx.lineTo(startClosePointX, height - margin)
    ctx.strokeStyle = 'transparent'
    lineMode && ctx.stroke();
  }
  darwColorOrLine(false)

  // 渐变
  const gradient = ctx.createLinearGradient(200, 110, 200, 290);

  if (isHover && areaId === id) {
    gradient.addColorStop(0, `rgba(${hoverRgba[1][0]}, ${hoverRgba[1][1]}, ${hoverRgba[1][2]}, 1)`);
    gradient.addColorStop(1, `rgba(${hoverRgba[0][0]}, ${hoverRgba[0][1]}, ${hoverRgba[0][2]}, 1)`);
  } else {
    gradient.addColorStop(0, `rgba(${rgba[1][0]}, ${rgba[1][1]}, ${rgba[1][2]}, 1)`);
    gradient.addColorStop(1, `rgba(${rgba[0][0]}, ${rgba[0][1]}, ${rgba[0][2]}, 0)`);
  }

  ctx.fillStyle = gradient;
  ctx.fill();
}

/**
 * 绘制所有组的曲线
 */
function startDrawLines() {
  const { data, series } = newOpt
  for (let i = 0; i < data.length; i++) {
    drawLine({ points: data[i], id: i, rgba: series[i].rgba, hoverRgba: series[i].hoverRgba, lineColor: series[i].lineColor })
  }
  firstEnding = false
}

/**
 * label显示
 * @param clientX 
 * @param clientY 
 */
function drawTouchPoint(clientX: number, clientY: number) {
  cx = clientX, cy = clientY

  // 计算颜色
  for (let i = 0; i < areaList.length - 1; i++) {
    const pre = areaList[i].x;
    const after = areaList[i + 1].x;

    if (cx > pre && cx < after) {
      areaId = i
    }
  }
  // 计算交叉位置
  for (let i = 0; i < axisXList.length - 1; i++) {
    const pre = axisXList[i];
    const after = axisXList[i + 1];
    if (cx > pre && cx < after) {
      curInfo.x = i
    }
  }
  for (let i = 0; i < axisYList.length - 1; i++) {
    const max = axisYList[i];
    const min = axisYList[i + 1];
    if (cy < max && cy > min) {
      curInfo.y = i + 1
    }
  }

  let crossPoint = pathPoints.find((item: Pos) => {
    const orderNum = .5
    if (Math.abs(item.x - clientX) <= orderNum) {
      return item
    } else {
      return ''
    }
  }) as Pos
  if (crossPoint && canvas) {
    dotCtx.clearRect(0, 0, canvas.width, canvas.height);

    dotCtx.beginPath()
    dotCtx.setLineDash([2, 4]);
    dotCtx.moveTo(crossPoint.x, margin)
    dotCtx.lineTo(crossPoint.x, height - margin)
    dotCtx.strokeStyle = '#000'
    dotCtx.stroke()

    drawArc(dotCtx, crossPoint.x, crossPoint.y, 5)

    //label
    if (!isLabel) {
      labelDOM = document.createElement("div");
      labelDOM.id = 'canvasTopBox'
      labelDOM.innerHTML = ""
      container && container.appendChild(labelDOM)
      isLabel = true
    } else {
      if (labelDOM) {
        let t = crossPoint.y + labelDOM.offsetHeight > canvas.height - margin ? canvas.height - margin - labelDOM.offsetHeight : crossPoint.y - labelDOM.offsetHeight * .5
        labelDOM.style.left = crossPoint.x + 20 + 'px'
        labelDOM.style.top = t + 'px'
        labelDOM.innerHTML = `
         <div class='label'>
           <div class='label-left' style='backGround: ${newOpt.series[areaId].lineColor}'>
           </div>
          <div class='label-right'>
            <div class='label-text'>人数:${newYs[curInfo.y]} </div>
            <div class='label-text'>订单数:${newXs[curInfo.x]} </div>
          </div>
         </div>
        `
      } else {
      }
    }
  }
}

function mousemoveEvent(e: MouseEvent) {
  console.log('ASASASD');

  const { left, top, width, height } = container.getBoundingClientRect()
  if (e.clientX > left && e.clientX < width + left && e.clientY > top && e.clientY < height + top) {
    // inside
    updateOptions(newOpt, { openAnimate: false })
    drawTouchPoint(e.clientX, e.clientY)
    isHover = true
    if (labelDOM) {
      labelDOM.style.display = 'block'
    }
  } else {
    // outside
    canvas && dotCtx.clearRect(0, 0, canvas.width, canvas.height);
    isHover = false
    updateOptions(newOpt)
    if (labelDOM) {
      labelDOM.style.display = 'none'
    }
  }
}

function sizeEvent() {
  resetAnimateOptions()
}
const throttleSizeEvent = utils.throttle(sizeEvent, 50, window)

function watchEvent() {
  window.addEventListener('mousemove', mousemoveEvent)
  window.addEventListener('resize', throttleSizeEvent)
}
// function removeEvent() {
//   window.removeEventListener('mousemove', mousemoveEvent)
//   window.removeEventListener('resize', throttleSizeEvent)
// }

/**
 * 更新配置
 * @param opt 
 * @param info 
 */
function updateOptions(opt: Options, info?: any) {
  // removeEvent()
  ctx.clearRect(0, 0, width, height);
  dotCtx.clearRect(0, 0, width, height);
  container && utils.removeChild(container, [canvas, dotCanvas, markCanvas])
  init(opt, info)
}

/**
 * 重置(显示动画)
 */
function resetAnimateOptions() {
  data = [], newOpt = options
  pointList = [], pathPoints = [], concatData = [], maxY = 0, minY = 0, rangeY = 0, ratioY = 0, count = 0, rangeX = 0, xk = 0, xkVal = 0, dataLen = 0, ratioX = 0, stepX = 0, startAreaX = 0, startAreaY = 0, endAreaX = 0, endAreaY = 0, prePointPosX = 0, prePointPosY = 0, margin = 0, width = 0, height = 0, isLabel = false, newYs = [], newXs = [], areaList = [], cx = 0, cy = 0, firstEnding = true, isHover = false,
    areaId = -1, axisXList = [], axisYList = [], curInfo = { x: 0, y: 0 }, animateId = 0, maskWidth = 0, maskHeight = 0
  updateOptions(newOpt, { openAnimate: false })
}

/**
 * 开场动画
 */
function drawAnimate() {
  markCtx.clearRect(0, 0, width, height);

  markCtx.fillStyle = "rgba(255, 255, 255, 1)"
  markCtx.fillRect(0, 0, width, height);

  markCtx.clearRect(
    (width - maskWidth),
    (height - maskHeight),
    maskWidth,
    maskHeight
  );

  // 更新遮罩区域大小
  maskWidth += 20;
  maskHeight += 20;
  if (maskWidth < width) {
    animateId = requestAnimationFrame(drawAnimate);
  } else {
    cancelAnimationFrame(animateId)
    watchEvent()
  }
}

/**
 * 初始化
 * @param options 
 * @param info 
 */
function init(options: Options, info = { openAnimate: true }) {
  initBaseData(options)
  drawAxis()
  info.openAnimate && drawAnimate()
  startDrawLines()
  pathPoints = getPathPoint(pointList)

  // 防止动画未结束提前监听
  if (!info.openAnimate) {
    watchEvent()
  }
}


/**
 * 入口
 * @param opt 
 */
export function openSparkECharts(opt: Options) {
  init(opt)
}