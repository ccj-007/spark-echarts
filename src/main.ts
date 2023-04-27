import { openSparkECharts } from "./core";
import { options } from "./config/options";
import { Options } from "./types";
import "./style/canvas-style.css";

const getLineGraph = (opt: Options) => {
  const initOpt = Object.create(null)
  Object.assign(initOpt, options, opt)
  openSparkECharts(initOpt)
}

if (import.meta.env.MODE === 'development') {
  getLineGraph(options)
}

export const graph = {
  line: getLineGraph
}
