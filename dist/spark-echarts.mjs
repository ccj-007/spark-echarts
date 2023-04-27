function mt(n, o, e, t, l, s, b, g, C) {
  let d = [], h = n + (e - n) * 2 / 3, w = o + (t - o) * 2 / 3, L = b + (l - b) * 2 / 3, x = g + (s - g) * 2 / 3;
  for (let F = 0; F <= C; F++) {
    let r = F / C, X = (1 - r) * (1 - r) * (1 - r) * n + 3 * r * (1 - r) * (1 - r) * h + 3 * r * r * (1 - r) * L + r * r * r * b, yt = (1 - r) * (1 - r) * (1 - r) * o + 3 * r * (1 - r) * (1 - r) * w + 3 * r * r * (1 - r) * x + r * r * r * g;
    d.push({ x: +X.toFixed(2), y: +yt.toFixed(2) });
  }
  return d;
}
function vt(n) {
  let o = [];
  for (let e = 0; e < n.length; e++) {
    let t = n[e], l = 50;
    if (t.type === "line") {
      let s = t.start.x, b = t.start.y, g = t.end.x, C = t.end.y;
      for (let d = 0; d <= l; d++) {
        let h = d / l, w = s + (g - s) * h, L = b + (C - b) * h;
        o.push({ x: +w.toFixed(2), y: +L.toFixed(2) });
      }
    } else if (t.type === "curve") {
      let s = t.start.x, b = t.start.y, g = t.control1.x, C = t.control1.y, d = t.control2.x, h = t.control2.y, w = t.end.x, L = t.end.y;
      const x = mt(s, b, g, C, d, h, w, L, l);
      o.push(...x);
    }
  }
  return o;
}
function bt(n) {
  return vt(n);
}
function Ct(n, o = 0, e = 0, t = 10, l = "#000") {
  n.beginPath(), n.arc(o, e, t, 0, Math.PI * 2), n.fillStyle = l, n.fill(), n.closePath();
}
const T = {
  layout: {
    root: "#container",
    m: 40
  },
  /**
   * 注意！这里分段间有重复点20一定要相等，用于衔接曲线
   */
  data: [[40, 60, 40, 80, 10, 50, 80, 0, 50, 30, 20], [20, 30, 60, 40, 30, 10, 30, 20, 0, 30, 20], [20, 30, 20, 40, 20, 10, 10, 30, 0, 30, 50]],
  axisX: {
    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    format(n) {
      return n + "w";
    },
    top: 4
  },
  axisY: {
    data: [0, 20, 40, 60, 80],
    format(n) {
      return n + "人";
    },
    right: 10
  },
  series: [
    {
      rgba: [[55, 162, 255], [116, 21, 219]],
      hoverRgba: [[55, 162, 255], [116, 21, 219]],
      lineColor: "blue"
    },
    {
      rgba: [[255, 0, 135], [135, 0, 157]],
      hoverRgba: [[255, 0, 135], [135, 0, 157]],
      lineColor: "purple"
    },
    {
      rgba: [[255, 190, 0], [224, 62, 76]],
      hoverRgba: [[255, 190, 0], [224, 62, 76]],
      lineColor: "orange"
    }
  ]
}, ut = {
  removeChild(n, o) {
    for (const e of o)
      e && n.removeChild(e);
  },
  throttle(n, o, e) {
    let t = 0;
    return () => {
      const l = (/* @__PURE__ */ new Date()).getTime();
      l - t > o && (n.apply(e, arguments), t = l);
    };
  }
};
let f, S, i, y, u, p, A, M, J = [], v = T, V = [], nt = [], j = [], it = 0, k = 0, U = 0, D = 0, ot = 0, at = 0, lt = 0, ft = 0, rt = 0, st = 0, O = 0, $ = 0, Z = 0, P = 0, _ = 0, R = 0, E = 0, a = 0, m = 0, c = 0, ct = !1, I = [], G = [], H = [], Y = 0, K = 0, q = !0, tt = !1, et = -1, W = [], N = [], z = { x: 0, y: 0 }, dt = 0, B = 0, Q = 0;
function wt(n) {
  if (!n.layout.root)
    throw new Error("your root is must be exist");
  v = Object.assign(/* @__PURE__ */ Object.create(null), n);
  let { layout: { root: o, m: e } } = v;
  console.log(e), a = e, J = n.data, p = document.querySelector(o), f = document.createElement("canvas"), S = document.createElement("canvas"), A = document.createElement("canvas"), p && (f.id = "myCanvas", S.id = "myCanvasDot", A.id = "markCanvas", i = f.getContext("2d"), y = S.getContext("2d"), M = A.getContext("2d"), A.width = S.width = f.width = p.offsetWidth, f.height = A.height = S.height = p.offsetHeight, p.appendChild(f), p.appendChild(S), p.appendChild(A), V = [], nt = [], j = J.flat(), m = f.width, c = f.height, it = Math.max.apply(null, j), k = Math.min.apply(null, j), U = it - k, D = (c - 2 * a) / U, ot = j.length, at = m - 2 * a, lt = 1, ft = lt * a, rt = J.length, st = at / (ot - rt), O = st, $ = 0, Z = 0, P = 0, _ = 0, R = 0, E = 0);
}
function Pt() {
  i.beginPath(), i.moveTo(a, a), i.lineTo(a, c - a), i.lineTo(m - a + 2, c - a), i.setLineDash([3, 3]), i.strokeStyle = "#aaa", i.stroke(), i.setLineDash([1]);
  const n = v.axisY.data.length, o = v.axisX.data.length;
  for (let e = 0; e < n; e++) {
    let t = U * e / (n - 1) + k, l = c - a - (t - k) * D;
    e && (i.beginPath(), i.moveTo(a, l), i.lineTo(m - a, l), i.strokeStyle = "#ddd", i.stroke()), i.beginPath(), i.stroke(), I = [];
    for (const s of T.axisY.data)
      I.push(T.axisY.format(s));
    i.fillText(I[e] + "", a - 15 - T.axisY.right, l + 5), q && N.push(l + 5);
  }
  for (let e = 0; e < o; e++) {
    let t = e * O, l = a + t;
    e && (i.beginPath(), i.moveTo(l, c - a), i.lineTo(l, a), i.strokeStyle = "#ddd", i.stroke()), G = [];
    for (const s of T.axisX.data)
      G.push(T.axisX.format(s));
    i.fillText(G[e], l - 1, c - a + 10 + T.axisX.top), q && W.push(l - 1);
  }
}
function Tt(n) {
  const { points: o, id: e, rgba: t, lineColor: l, hoverRgba: s } = n;
  $ = P, Z = _, q && H.push({ x: $, y: Z });
  function b(C) {
    i.beginPath(), i.moveTo(e ? a + P - ft : a + P, c - a - (o[0] - k) * D), i.lineWidth = 2, i.setLineDash([0, 0]);
    let d = 0, h = 0, w = 0;
    e && (w -= a);
    for (let x = 0; x < o.length; x++) {
      d = x * O + a + P + w, h = c - a - (o[x] - k) * D;
      let F = (x - 1) * O + a + P + w, r = c - a - (o[x - 1] - k) * D, X = F + O / 2;
      x === 0 ? (R = d, E = h, i.lineTo(d, h), R === d && E === h || V.push({ type: "line", start: { x: R, y: E }, end: { x: d, y: h } })) : (i.bezierCurveTo(X, r, X, h, d, h), V.push({ type: "curve", start: { x: R, y: E }, end: { x: d, y: h }, control1: { x: X, y: r }, control2: { x: X, y: h } })), R = d, E = h, x === o.length - 1 && (P = d, _ = h, q && e === v.data.length - 1 && H.push({ x: d, y: h }));
    }
    i.strokeStyle = l, i.stroke(), C && i.beginPath(), i.lineTo(P, c - a), i.lineTo(a + $, c - a);
    let L = e ? $ : a + $;
    i.lineTo(L, c - a), i.strokeStyle = "transparent", C && i.stroke();
  }
  b(!1);
  const g = i.createLinearGradient(200, 110, 200, 290);
  tt && et === e ? (g.addColorStop(0, `rgba(${s[1][0]}, ${s[1][1]}, ${s[1][2]}, 1)`), g.addColorStop(1, `rgba(${s[0][0]}, ${s[0][1]}, ${s[0][2]}, 1)`)) : (g.addColorStop(0, `rgba(${t[1][0]}, ${t[1][1]}, ${t[1][2]}, 1)`), g.addColorStop(1, `rgba(${t[0][0]}, ${t[0][1]}, ${t[0][2]}, 0)`)), i.fillStyle = g, i.fill();
}
function kt() {
  const { data: n, series: o } = v;
  for (let e = 0; e < n.length; e++)
    Tt({ points: n[e], id: e, rgba: o[e].rgba, hoverRgba: o[e].hoverRgba, lineColor: o[e].lineColor });
  q = !1;
}
function Lt(n, o) {
  Y = n, K = o;
  for (let t = 0; t < H.length - 1; t++) {
    const l = H[t].x, s = H[t + 1].x;
    Y > l && Y < s && (et = t);
  }
  for (let t = 0; t < W.length - 1; t++) {
    const l = W[t], s = W[t + 1];
    Y > l && Y < s && (z.x = t);
  }
  for (let t = 0; t < N.length - 1; t++) {
    const l = N[t], s = N[t + 1];
    K < l && K > s && (z.y = t + 1);
  }
  let e = nt.find((t) => Math.abs(t.x - n) <= 0.5 ? t : "");
  if (e && f) {
    if (y.clearRect(0, 0, f.width, f.height), y.beginPath(), y.setLineDash([2, 4]), y.moveTo(e.x, a), y.lineTo(e.x, c - a), y.strokeStyle = "#000", y.stroke(), Ct(y, e.x, e.y, 5), !ct)
      u = document.createElement("div"), u.id = "canvasTopBox", u.innerHTML = "", p && p.appendChild(u), ct = !0;
    else if (u) {
      let t = e.y + u.offsetHeight > f.height - a ? f.height - a - u.offsetHeight : e.y - u.offsetHeight * 0.5;
      u.style.left = e.x + 20 + "px", u.style.top = t + "px", u.innerHTML = `
         <div class='label'>
           <div class='label-left' style='backGround: ${v.series[et].lineColor}'>
           </div>
          <div class='label-right'>
            <div class='label-text'>人数:${I[z.y]} </div>
            <div class='label-text'>订单数:${G[z.x]} </div>
          </div>
         </div>
        `;
    }
  }
}
function St(n) {
  console.log("ASASASD");
  const { left: o, top: e, width: t, height: l } = p.getBoundingClientRect();
  n.clientX > o && n.clientX < t + o && n.clientY > e && n.clientY < l + e ? (ht(v, { openAnimate: !1 }), Lt(n.clientX, n.clientY), tt = !0, u && (u.style.display = "block")) : (f && y.clearRect(0, 0, f.width, f.height), tt = !1, ht(v), u && (u.style.display = "none"));
}
function At() {
  Rt();
}
const $t = ut.throttle(At, 50, window);
function gt() {
  window.addEventListener("mousemove", St), window.addEventListener("resize", $t);
}
function ht(n, o) {
  i.clearRect(0, 0, m, c), y.clearRect(0, 0, m, c), p && ut.removeChild(p, [f, S, A]), pt(n, o);
}
function Rt() {
  J = [], v = T, V = [], nt = [], j = [], it = 0, k = 0, U = 0, D = 0, ot = 0, at = 0, lt = 0, ft = 0, rt = 0, st = 0, O = 0, $ = 0, Z = 0, P = 0, _ = 0, R = 0, E = 0, a = 0, m = 0, c = 0, ct = !1, I = [], G = [], H = [], Y = 0, K = 0, q = !0, tt = !1, et = -1, W = [], N = [], z = { x: 0, y: 0 }, dt = 0, B = 0, Q = 0, ht(v, { openAnimate: !1 });
}
function xt() {
  M.clearRect(0, 0, m, c), M.fillStyle = "rgba(255, 255, 255, 1)", M.fillRect(0, 0, m, c), M.clearRect(
    m - B,
    c - Q,
    B,
    Q
  ), B += 20, Q += 20, B < m ? dt = requestAnimationFrame(xt) : (cancelAnimationFrame(dt), gt());
}
function pt(n, o = { openAnimate: !0 }) {
  wt(n), Pt(), o.openAnimate && xt(), kt(), nt = bt(V), o.openAnimate || gt();
}
function Et(n) {
  pt(n);
}
const Xt = (n) => {
  const o = /* @__PURE__ */ Object.create(null);
  Object.assign(o, T, n), Et(o);
}, Yt = {
  line: Xt
};
export {
  Yt as graph
};
