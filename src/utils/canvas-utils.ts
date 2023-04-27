import { PointList } from "../types";

function getBezierCurvePoints(startX: number, startY: number, cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, endX: number, endY: number, steps: number) {
  let points = [];

  // 使用二次贝塞尔曲线近似三次贝塞尔曲线
  let q1x = startX + (cp1X - startX) * 2 / 3;
  let q1y = startY + (cp1Y - startY) * 2 / 3;
  let q2x = endX + (cp2X - endX) * 2 / 3;
  let q2y = endY + (cp2Y - endY) * 2 / 3;

  // 采样曲线上的所有点
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = (1 - t) * (1 - t) * (1 - t) * startX +
      3 * t * (1 - t) * (1 - t) * q1x +
      3 * t * t * (1 - t) * q2x +
      t * t * t * endX;
    let y = (1 - t) * (1 - t) * (1 - t) * startY +
      3 * t * (1 - t) * (1 - t) * q1y +
      3 * t * t * (1 - t) * q2y +
      t * t * t * endY;

    points.push({ x: +x.toFixed(2), y: +y.toFixed(2) });
  }

  return points;
}


// 获取线段上的所有点
function getAllPoints(segments: PointList) {
  let points = [];
  // let lastPoint = null;

  // 遍历所有线段的控制点和终点，将这些点的坐标存储到数组中
  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i];
    let pointsCount = 50; // 点的数量
    // 如果是直线，则使用lineTo方法连接线段的终点
    if (segment.type === "line") {
      let x0 = segment.start.x;
      let y0 = segment.start.y;
      let x1 = segment.end.x;
      let y1 = segment.end.y;
      for (let j = 0; j <= pointsCount; j++) {
        let t = j / pointsCount;
        let x = x0 + (x1 - x0) * t;
        let y = y0 + (y1 - y0) * t;
        points.push({ x: +x.toFixed(2), y: +y.toFixed(2) });
      }
      // 如果是曲线，则使用贝塞尔曲线的方法绘制曲线，并将曲线上的所有点的坐标存储到数组中
    } else if (segment.type === "curve") {
      let x0 = segment.start.x;
      let y0 = segment.start.y;
      let x1 = segment.control1.x;
      let y1 = segment.control1.y;
      let x2 = segment.control2.x;
      let y2 = segment.control2.y;
      let x3 = segment.end.x;
      let y3 = segment.end.y;
      const point = getBezierCurvePoints(x0, y0, x1, y1, x2, y2, x3, y3, pointsCount)
      points.push(...point);
    }
    // 更新线段的起点
    // lastPoint = segment.end;
  }
  return points
}

export function getPathPoint(segments: PointList) {
  return getAllPoints(segments)
}

export function drawArc(ctx: CanvasRenderingContext2D, x = 0, y = 0, radius = 10, color = '#000') {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

export function getRanColor() {
  return Math.floor(Math.random() * 256)
}
