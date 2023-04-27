import { options } from "../config/options"

export interface Pos {
  x: number,
  y: number
}

interface PointItemLine {
  type: 'line'
  start: Pos
  end: Pos
}
interface PointItemCurve {
  type: 'curve'
  start: Pos
  end: Pos
  control1: Pos
  control2: Pos
}

type PointItem = Array<PointItemLine | PointItemCurve>

export type PointList = PointItem

export type Options = typeof options