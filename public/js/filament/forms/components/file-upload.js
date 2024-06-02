var Ul = Object.defineProperty
var kl = (e, t) => {
  for (var i in t) Ul(e, i, { get: t[i], enumerable: !0 })
}
var ea = {}
kl(ea, {
  FileOrigin: () => Pt,
  FileStatus: () => pt,
  OptionTypes: () => Ni,
  Status: () => Kn,
  create: () => dt,
  destroy: () => ut,
  find: () => Vi,
  getOptions: () => Gi,
  parse: () => Bi,
  registerPlugin: () => _e,
  setOptions: () => xt,
  supported: () => zi,
})
var Hl = (e) => e instanceof HTMLElement,
  Wl = (e, t = [], i = []) => {
    let a = { ...e },
      n = [],
      r = [],
      l = () => ({ ...a }),
      o = () => {
        let p = [...n]
        return (n.length = 0), p
      },
      s = () => {
        let p = [...r]
        ;(r.length = 0),
          p.forEach(({ type: f, data: g }) => {
            u(f, g)
          })
      },
      u = (p, f, g) => {
        if (g && !document.hidden) {
          r.push({ type: p, data: f })
          return
        }
        m[p] && m[p](f), n.push({ type: p, data: f })
      },
      c = (p, ...f) => (h[p] ? h[p](...f) : null),
      d = {
        getState: l,
        processActionQueue: o,
        processDispatchQueue: s,
        dispatch: u,
        query: c,
      },
      h = {}
    t.forEach((p) => {
      h = { ...p(a), ...h }
    })
    let m = {}
    return (
      i.forEach((p) => {
        m = { ...p(u, c, a), ...m }
      }),
      d
    )
  },
  Yl = (e, t, i) => {
    if (typeof i == "function") {
      e[t] = i
      return
    }
    Object.defineProperty(e, t, { ...i })
  },
  te = (e, t) => {
    for (let i in e) e.hasOwnProperty(i) && t(i, e[i])
  },
  Ue = (e) => {
    let t = {}
    return (
      te(e, (i) => {
        Yl(t, i, e[i])
      }),
      t
    )
  },
  ne = (e, t, i = null) => {
    if (i === null) return e.getAttribute(t) || e.hasAttribute(t)
    e.setAttribute(t, i)
  },
  $l = "http://www.w3.org/2000/svg",
  ql = ["svg", "path"],
  wa = (e) => ql.includes(e),
  ei = (e, t, i = {}) => {
    typeof t == "object" && ((i = t), (t = null))
    let a = wa(e) ? document.createElementNS($l, e) : document.createElement(e)
    return (
      t && (wa(e) ? ne(a, "class", t) : (a.className = t)),
      te(i, (n, r) => {
        ne(a, n, r)
      }),
      a
    )
  },
  jl = (e) => (t, i) => {
    typeof i < "u" && e.children[i]
      ? e.insertBefore(t, e.children[i])
      : e.appendChild(t)
  },
  Xl = (e, t) => (i, a) => (typeof a < "u" ? t.splice(a, 0, i) : t.push(i), i),
  Ql = (e, t) => (i) => (
    t.splice(t.indexOf(i), 1),
    i.element.parentNode && e.removeChild(i.element),
    i
  ),
  Zl = (() => typeof window < "u" && typeof window.document < "u")(),
  un = () => Zl,
  Kl = un() ? ei("svg") : {},
  Jl = "children" in Kl ? (e) => e.children.length : (e) => e.childNodes.length,
  hn = (e, t, i, a) => {
    let n = i[0] || e.left,
      r = i[1] || e.top,
      l = n + e.width,
      o = r + e.height * (a[1] || 1),
      s = {
        element: { ...e },
        inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom },
        outer: { left: n, top: r, right: l, bottom: o },
      }
    return (
      t
        .filter((u) => !u.isRectIgnored())
        .map((u) => u.rect)
        .forEach((u) => {
          va(s.inner, { ...u.inner }), va(s.outer, { ...u.outer })
        }),
      La(s.inner),
      (s.outer.bottom += s.element.marginBottom),
      (s.outer.right += s.element.marginRight),
      La(s.outer),
      s
    )
  },
  va = (e, t) => {
    ;(t.top += e.top),
      (t.right += e.left),
      (t.bottom += e.top),
      (t.left += e.left),
      t.bottom > e.bottom && (e.bottom = t.bottom),
      t.right > e.right && (e.right = t.right)
  },
  La = (e) => {
    ;(e.width = e.right - e.left), (e.height = e.bottom - e.top)
  },
  $e = (e) => typeof e == "number",
  eo = (e, t, i, a = 0.001) => Math.abs(e - t) < a && Math.abs(i) < a,
  to = ({ stiffness: e = 0.5, damping: t = 0.75, mass: i = 10 } = {}) => {
    let a = null,
      n = null,
      r = 0,
      l = !1,
      u = Ue({
        interpolate: (c, d) => {
          if (l) return
          if (!($e(a) && $e(n))) {
            ;(l = !0), (r = 0)
            return
          }
          let h = -(n - a) * e
          ;(r += h / i),
            (n += r),
            (r *= t),
            eo(n, a, r) || d
              ? ((n = a), (r = 0), (l = !0), u.onupdate(n), u.oncomplete(n))
              : u.onupdate(n)
        },
        target: {
          set: (c) => {
            if (
              ($e(c) && !$e(n) && (n = c),
              a === null && ((a = c), (n = c)),
              (a = c),
              n === a || typeof a > "u")
            ) {
              ;(l = !0), (r = 0), u.onupdate(n), u.oncomplete(n)
              return
            }
            l = !1
          },
          get: () => a,
        },
        resting: { get: () => l },
        onupdate: (c) => {},
        oncomplete: (c) => {},
      })
    return u
  }
var io = (e) => (e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e),
  ao = ({ duration: e = 500, easing: t = io, delay: i = 0 } = {}) => {
    let a = null,
      n,
      r,
      l = !0,
      o = !1,
      s = null,
      c = Ue({
        interpolate: (d, h) => {
          l ||
            s === null ||
            (a === null && (a = d),
            !(d - a < i) &&
              ((n = d - a - i),
              n >= e || h
                ? ((n = 1),
                  (r = o ? 0 : 1),
                  c.onupdate(r * s),
                  c.oncomplete(r * s),
                  (l = !0))
                : ((r = n / e),
                  c.onupdate((n >= 0 ? t(o ? 1 - r : r) : 0) * s))))
        },
        target: {
          get: () => (o ? 0 : s),
          set: (d) => {
            if (s === null) {
              ;(s = d), c.onupdate(d), c.oncomplete(d)
              return
            }
            d < s ? ((s = 1), (o = !0)) : ((o = !1), (s = d)),
              (l = !1),
              (a = null)
          },
        },
        resting: { get: () => l },
        onupdate: (d) => {},
        oncomplete: (d) => {},
      })
    return c
  },
  Aa = { spring: to, tween: ao },
  no = (e, t, i) => {
    let a = e[t] && typeof e[t][i] == "object" ? e[t][i] : e[t] || e,
      n = typeof a == "string" ? a : a.type,
      r = typeof a == "object" ? { ...a } : {}
    return Aa[n] ? Aa[n](r) : null
  },
  Ui = (e, t, i, a = !1) => {
    ;(t = Array.isArray(t) ? t : [t]),
      t.forEach((n) => {
        e.forEach((r) => {
          let l = r,
            o = () => i[r],
            s = (u) => (i[r] = u)
          typeof r == "object" &&
            ((l = r.key), (o = r.getter || o), (s = r.setter || s)),
            !(n[l] && !a) && (n[l] = { get: o, set: s })
        })
      })
  },
  ro = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
  }) => {
    let n = { ...t },
      r = []
    return (
      te(e, (l, o) => {
        let s = no(o)
        if (!s) return
        ;(s.onupdate = (c) => {
          t[l] = c
        }),
          (s.target = n[l]),
          Ui(
            [
              {
                key: l,
                setter: (c) => {
                  s.target !== c && (s.target = c)
                },
                getter: () => t[l],
              },
            ],
            [i, a],
            t,
            !0
          ),
          r.push(s)
      }),
      {
        write: (l) => {
          let o = document.hidden,
            s = !0
          return (
            r.forEach((u) => {
              u.resting || (s = !1), u.interpolate(l, o)
            }),
            s
          )
        },
        destroy: () => {},
      }
    )
  },
  lo = (e) => (t, i) => {
    e.addEventListener(t, i)
  },
  oo = (e) => (t, i) => {
    e.removeEventListener(t, i)
  },
  so = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
    viewState: n,
    view: r,
  }) => {
    let l = [],
      o = lo(r.element),
      s = oo(r.element)
    return (
      (a.on = (u, c) => {
        l.push({ type: u, fn: c }), o(u, c)
      }),
      (a.off = (u, c) => {
        l.splice(
          l.findIndex((d) => d.type === u && d.fn === c),
          1
        ),
          s(u, c)
      }),
      {
        write: () => !0,
        destroy: () => {
          l.forEach((u) => {
            s(u.type, u.fn)
          })
        },
      }
    )
  },
  co = ({ mixinConfig: e, viewProps: t, viewExternalAPI: i }) => {
    Ui(e, i, t)
  },
  me = (e) => e != null,
  uo = {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    originX: 0,
    originY: 0,
  },
  ho = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
    view: n,
  }) => {
    let r = { ...t },
      l = {}
    Ui(e, [i, a], t)
    let o = () => [t.translateX || 0, t.translateY || 0],
      s = () => [t.scaleX || 0, t.scaleY || 0],
      u = () => (n.rect ? hn(n.rect, n.childViews, o(), s()) : null)
    return (
      (i.rect = { get: u }),
      (a.rect = { get: u }),
      e.forEach((c) => {
        t[c] = typeof r[c] > "u" ? uo[c] : r[c]
      }),
      {
        write: () => {
          if (mo(l, t)) return po(n.element, t), Object.assign(l, { ...t }), !0
        },
        destroy: () => {},
      }
    )
  },
  mo = (e, t) => {
    if (Object.keys(e).length !== Object.keys(t).length) return !0
    for (let i in t) if (t[i] !== e[i]) return !0
    return !1
  },
  po = (
    e,
    {
      opacity: t,
      perspective: i,
      translateX: a,
      translateY: n,
      scaleX: r,
      scaleY: l,
      rotateX: o,
      rotateY: s,
      rotateZ: u,
      originX: c,
      originY: d,
      width: h,
      height: m,
    }
  ) => {
    let p = "",
      f = ""
    ;(me(c) || me(d)) && (f += `transform-origin: ${c || 0}px ${d || 0}px;`),
      me(i) && (p += `perspective(${i}px) `),
      (me(a) || me(n)) && (p += `translate3d(${a || 0}px, ${n || 0}px, 0) `),
      (me(r) || me(l)) &&
        (p += `scale3d(${me(r) ? r : 1}, ${me(l) ? l : 1}, 1) `),
      me(u) && (p += `rotateZ(${u}rad) `),
      me(o) && (p += `rotateX(${o}rad) `),
      me(s) && (p += `rotateY(${s}rad) `),
      p.length && (f += `transform:${p};`),
      me(t) &&
        ((f += `opacity:${t};`),
        t === 0 && (f += "visibility:hidden;"),
        t < 1 && (f += "pointer-events:none;")),
      me(m) && (f += `height:${m}px;`),
      me(h) && (f += `width:${h}px;`)
    let g = e.elementCurrentStyle || ""
    ;(f.length !== g.length || f !== g) &&
      ((e.style.cssText = f), (e.elementCurrentStyle = f))
  },
  fo = { styles: ho, listeners: so, animations: ro, apis: co },
  Ma = (e = {}, t = {}, i = {}) => (
    t.layoutCalculated ||
      ((e.paddingTop = parseInt(i.paddingTop, 10) || 0),
      (e.marginTop = parseInt(i.marginTop, 10) || 0),
      (e.marginRight = parseInt(i.marginRight, 10) || 0),
      (e.marginBottom = parseInt(i.marginBottom, 10) || 0),
      (e.marginLeft = parseInt(i.marginLeft, 10) || 0),
      (t.layoutCalculated = !0)),
    (e.left = t.offsetLeft || 0),
    (e.top = t.offsetTop || 0),
    (e.width = t.offsetWidth || 0),
    (e.height = t.offsetHeight || 0),
    (e.right = e.left + e.width),
    (e.bottom = e.top + e.height),
    (e.scrollTop = t.scrollTop),
    (e.hidden = t.offsetParent === null),
    e
  ),
  re =
    ({
      tag: e = "div",
      name: t = null,
      attributes: i = {},
      read: a = () => {},
      write: n = () => {},
      create: r = () => {},
      destroy: l = () => {},
      filterFrameActionsForChild: o = (m, p) => p,
      didCreateView: s = () => {},
      didWriteView: u = () => {},
      ignoreRect: c = !1,
      ignoreRectUpdate: d = !1,
      mixins: h = [],
    } = {}) =>
    (m, p = {}) => {
      let f = ei(e, `filepond--${t}`, i),
        g = window.getComputedStyle(f, null),
        I = Ma(),
        E = null,
        b = !1,
        _ = [],
        y = [],
        T = {},
        v = {},
        R = [n],
        S = [a],
        P = [l],
        O = () => f,
        x = () => _.concat(),
        z = () => T,
        L = (U) => (W, $) => W(U, $),
        F = () => E || ((E = hn(I, _, [0, 0], [1, 1])), E),
        w = () => g,
        A = () => {
          ;(E = null),
            _.forEach(($) => $._read()),
            !(d && I.width && I.height) && Ma(I, f, g)
          let W = { root: X, props: p, rect: I }
          S.forEach(($) => $(W))
        },
        C = (U, W, $) => {
          let oe = W.length === 0
          return (
            R.forEach((J) => {
              J({
                props: p,
                root: X,
                actions: W,
                timestamp: U,
                shouldOptimize: $,
              }) === !1 && (oe = !1)
            }),
            y.forEach((J) => {
              J.write(U) === !1 && (oe = !1)
            }),
            _.filter((J) => !!J.element.parentNode).forEach((J) => {
              J._write(U, o(J, W), $) || (oe = !1)
            }),
            _.forEach((J, G) => {
              J.element.parentNode ||
                (X.appendChild(J.element, G),
                J._read(),
                J._write(U, o(J, W), $),
                (oe = !1))
            }),
            (b = oe),
            u({ props: p, root: X, actions: W, timestamp: U }),
            oe
          )
        },
        D = () => {
          y.forEach((U) => U.destroy()),
            P.forEach((U) => {
              U({ root: X, props: p })
            }),
            _.forEach((U) => U._destroy())
        },
        V = { element: { get: O }, style: { get: w }, childViews: { get: x } },
        B = {
          ...V,
          rect: { get: F },
          ref: { get: z },
          is: (U) => t === U,
          appendChild: jl(f),
          createChildView: L(m),
          linkView: (U) => (_.push(U), U),
          unlinkView: (U) => {
            _.splice(_.indexOf(U), 1)
          },
          appendChildView: Xl(f, _),
          removeChildView: Ql(f, _),
          registerWriter: (U) => R.push(U),
          registerReader: (U) => S.push(U),
          registerDestroyer: (U) => P.push(U),
          invalidateLayout: () => (f.layoutCalculated = !1),
          dispatch: m.dispatch,
          query: m.query,
        },
        j = {
          element: { get: O },
          childViews: { get: x },
          rect: { get: F },
          resting: { get: () => b },
          isRectIgnored: () => c,
          _read: A,
          _write: C,
          _destroy: D,
        },
        q = { ...V, rect: { get: () => I } }
      Object.keys(h)
        .sort((U, W) => (U === "styles" ? 1 : W === "styles" ? -1 : 0))
        .forEach((U) => {
          let W = fo[U]({
            mixinConfig: h[U],
            viewProps: p,
            viewState: v,
            viewInternalAPI: B,
            viewExternalAPI: j,
            view: Ue(q),
          })
          W && y.push(W)
        })
      let X = Ue(B)
      r({ root: X, props: p })
      let ue = Jl(f)
      return (
        _.forEach((U, W) => {
          X.appendChild(U.element, ue + W)
        }),
        s(X),
        Ue(j)
      )
    },
  go = (e, t, i = 60) => {
    let a = "__framePainter"
    if (window[a]) {
      window[a].readers.push(e), window[a].writers.push(t)
      return
    }
    window[a] = { readers: [e], writers: [t] }
    let n = window[a],
      r = 1e3 / i,
      l = null,
      o = null,
      s = null,
      u = null,
      c = () => {
        document.hidden
          ? ((s = () => window.setTimeout(() => d(performance.now()), r)),
            (u = () => window.clearTimeout(o)))
          : ((s = () => window.requestAnimationFrame(d)),
            (u = () => window.cancelAnimationFrame(o)))
      }
    document.addEventListener("visibilitychange", () => {
      u && u(), c(), d(performance.now())
    })
    let d = (h) => {
      ;(o = s(d)), l || (l = h)
      let m = h - l
      m <= r ||
        ((l = h - (m % r)),
        n.readers.forEach((p) => p()),
        n.writers.forEach((p) => p(h)))
    }
    return (
      c(),
      d(performance.now()),
      {
        pause: () => {
          u(o)
        },
      }
    )
  },
  fe =
    (e, t) =>
    ({
      root: i,
      props: a,
      actions: n = [],
      timestamp: r,
      shouldOptimize: l,
    }) => {
      n
        .filter((o) => e[o.type])
        .forEach((o) =>
          e[o.type]({
            root: i,
            props: a,
            action: o.data,
            timestamp: r,
            shouldOptimize: l,
          })
        ),
        t &&
          t({ root: i, props: a, actions: n, timestamp: r, shouldOptimize: l })
    },
  xa = (e, t) => t.parentNode.insertBefore(e, t),
  Oa = (e, t) => t.parentNode.insertBefore(e, t.nextSibling),
  ni = (e) => Array.isArray(e),
  Ne = (e) => e == null,
  Eo = (e) => e.trim(),
  ri = (e) => "" + e,
  To = (e, t = ",") =>
    Ne(e)
      ? []
      : ni(e)
        ? e
        : ri(e)
            .split(t)
            .map(Eo)
            .filter((i) => i.length),
  mn = (e) => typeof e == "boolean",
  pn = (e) => (mn(e) ? e : e === "true"),
  pe = (e) => typeof e == "string",
  fn = (e) => ($e(e) ? e : pe(e) ? ri(e).replace(/[a-z]+/gi, "") : 0),
  Jt = (e) => parseInt(fn(e), 10),
  Pa = (e) => parseFloat(fn(e)),
  mt = (e) => $e(e) && isFinite(e) && Math.floor(e) === e,
  Da = (e, t = 1e3) => {
    if (mt(e)) return e
    let i = ri(e).trim()
    return /MB$/i.test(i)
      ? ((i = i.replace(/MB$i/, "").trim()), Jt(i) * t * t)
      : /KB/i.test(i)
        ? ((i = i.replace(/KB$i/, "").trim()), Jt(i) * t)
        : Jt(i)
  },
  qe = (e) => typeof e == "function",
  bo = (e) => {
    let t = self,
      i = e.split("."),
      a = null
    for (; (a = i.shift()); ) if (((t = t[a]), !t)) return null
    return t
  },
  Fa = {
    process: "POST",
    patch: "PATCH",
    revert: "DELETE",
    fetch: "GET",
    restore: "GET",
    load: "GET",
  },
  Io = (e) => {
    let t = {}
    return (
      (t.url = pe(e) ? e : e.url || ""),
      (t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0),
      (t.headers = e.headers ? e.headers : {}),
      te(Fa, (i) => {
        t[i] = _o(i, e[i], Fa[i], t.timeout, t.headers)
      }),
      (t.process = e.process || pe(e) || e.url ? t.process : null),
      (t.remove = e.remove || null),
      delete t.headers,
      t
    )
  },
  _o = (e, t, i, a, n) => {
    if (t === null) return null
    if (typeof t == "function") return t
    let r = {
      url: i === "GET" || i === "PATCH" ? `?${e}=` : "",
      method: i,
      headers: n,
      withCredentials: !1,
      timeout: a,
      onload: null,
      ondata: null,
      onerror: null,
    }
    if (pe(t)) return (r.url = t), r
    if ((Object.assign(r, t), pe(r.headers))) {
      let l = r.headers.split(/:(.+)/)
      r.headers = { header: l[0], value: l[1] }
    }
    return (r.withCredentials = pn(r.withCredentials)), r
  },
  Ro = (e) => Io(e),
  yo = (e) => e === null,
  ce = (e) => typeof e == "object" && e !== null,
  So = (e) =>
    ce(e) &&
    pe(e.url) &&
    ce(e.process) &&
    ce(e.revert) &&
    ce(e.restore) &&
    ce(e.fetch),
  Ai = (e) =>
    ni(e)
      ? "array"
      : yo(e)
        ? "null"
        : mt(e)
          ? "int"
          : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
            ? "bytes"
            : So(e)
              ? "api"
              : typeof e,
  wo = (e) =>
    e
      .replace(/{\s*'/g, '{"')
      .replace(/'\s*}/g, '"}')
      .replace(/'\s*:/g, '":')
      .replace(/:\s*'/g, ':"')
      .replace(/,\s*'/g, ',"')
      .replace(/'\s*,/g, '",'),
  vo = {
    array: To,
    boolean: pn,
    int: (e) => (Ai(e) === "bytes" ? Da(e) : Jt(e)),
    number: Pa,
    float: Pa,
    bytes: Da,
    string: (e) => (qe(e) ? e : ri(e)),
    function: (e) => bo(e),
    serverapi: Ro,
    object: (e) => {
      try {
        return JSON.parse(wo(e))
      } catch {
        return null
      }
    },
  },
  Lo = (e, t) => vo[t](e),
  gn = (e, t, i) => {
    if (e === t) return e
    let a = Ai(e)
    if (a !== i) {
      let n = Lo(e, i)
      if (((a = Ai(n)), n === null))
        throw `Trying to assign value with incorrect type to "${option}", allowed type: "${i}"`
      e = n
    }
    return e
  },
  Ao = (e, t) => {
    let i = e
    return {
      enumerable: !0,
      get: () => i,
      set: (a) => {
        i = gn(a, e, t)
      },
    }
  },
  Mo = (e) => {
    let t = {}
    return (
      te(e, (i) => {
        let a = e[i]
        t[i] = Ao(a[0], a[1])
      }),
      Ue(t)
    )
  },
  xo = (e) => ({
    items: [],
    listUpdateTimeout: null,
    itemUpdateTimeout: null,
    processingQueue: [],
    options: Mo(e),
  }),
  li = (e, t = "-") =>
    e
      .split(/(?=[A-Z])/)
      .map((i) => i.toLowerCase())
      .join(t),
  Oo = (e, t) => {
    let i = {}
    return (
      te(t, (a) => {
        i[a] = {
          get: () => e.getState().options[a],
          set: (n) => {
            e.dispatch(`SET_${li(a, "_").toUpperCase()}`, { value: n })
          },
        }
      }),
      i
    )
  },
  Po = (e) => (t, i, a) => {
    let n = {}
    return (
      te(e, (r) => {
        let l = li(r, "_").toUpperCase()
        n[`SET_${l}`] = (o) => {
          try {
            a.options[r] = o.value
          } catch {}
          t(`DID_SET_${l}`, { value: a.options[r] })
        }
      }),
      n
    )
  },
  Do = (e) => (t) => {
    let i = {}
    return (
      te(e, (a) => {
        i[`GET_${li(a, "_").toUpperCase()}`] = (n) => t.options[a]
      }),
      i
    )
  },
  Se = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 },
  ki = () => Math.random().toString(36).substring(2, 11),
  Hi = (e, t) => e.splice(t, 1),
  Fo = (e, t) => {
    t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0)
  },
  oi = () => {
    let e = [],
      t = (a, n) => {
        Hi(
          e,
          e.findIndex((r) => r.event === a && (r.cb === n || !n))
        )
      },
      i = (a, n, r) => {
        e.filter((l) => l.event === a)
          .map((l) => l.cb)
          .forEach((l) => Fo(() => l(...n), r))
      }
    return {
      fireSync: (a, ...n) => {
        i(a, n, !0)
      },
      fire: (a, ...n) => {
        i(a, n, !1)
      },
      on: (a, n) => {
        e.push({ event: a, cb: n })
      },
      onOnce: (a, n) => {
        e.push({
          event: a,
          cb: (...r) => {
            t(a, n), n(...r)
          },
        })
      },
      off: t,
    }
  },
  En = (e, t, i) => {
    Object.getOwnPropertyNames(e)
      .filter((a) => !i.includes(a))
      .forEach((a) =>
        Object.defineProperty(t, a, Object.getOwnPropertyDescriptor(e, a))
      )
  },
  Co = [
    "fire",
    "process",
    "revert",
    "load",
    "on",
    "off",
    "onOnce",
    "retryLoad",
    "extend",
    "archive",
    "archived",
    "release",
    "released",
    "requestProcessing",
    "freeze",
  ],
  ge = (e) => {
    let t = {}
    return En(e, t, Co), t
  },
  zo = (e) => {
    e.forEach((t, i) => {
      t.released && Hi(e, i)
    })
  },
  k = {
    INIT: 1,
    IDLE: 2,
    PROCESSING_QUEUED: 9,
    PROCESSING: 3,
    PROCESSING_COMPLETE: 5,
    PROCESSING_ERROR: 6,
    PROCESSING_REVERT_ERROR: 10,
    LOADING: 7,
    LOAD_ERROR: 8,
  },
  se = { INPUT: 1, LIMBO: 2, LOCAL: 3 },
  Tn = (e) => /[^0-9]+/.exec(e),
  bn = () => Tn((1.1).toLocaleString())[0],
  No = () => {
    let e = bn(),
      t = (1e3).toLocaleString(),
      i = (1e3).toString()
    return t !== i ? Tn(t)[0] : e === "." ? "," : "."
  },
  M = {
    BOOLEAN: "boolean",
    INT: "int",
    NUMBER: "number",
    STRING: "string",
    ARRAY: "array",
    OBJECT: "object",
    FUNCTION: "function",
    ACTION: "action",
    SERVER_API: "serverapi",
    REGEX: "regex",
  },
  Wi = [],
  Ae = (e, t, i) =>
    new Promise((a, n) => {
      let r = Wi.filter((o) => o.key === e).map((o) => o.cb)
      if (r.length === 0) {
        a(t)
        return
      }
      let l = r.shift()
      r.reduce((o, s) => o.then((u) => s(u, i)), l(t, i))
        .then((o) => a(o))
        .catch((o) => n(o))
    }),
  Je = (e, t, i) => Wi.filter((a) => a.key === e).map((a) => a.cb(t, i)),
  Bo = (e, t) => Wi.push({ key: e, cb: t }),
  Vo = (e) => Object.assign(ot, e),
  ti = () => ({ ...ot }),
  Go = (e) => {
    te(e, (t, i) => {
      ot[t] && (ot[t][0] = gn(i, ot[t][0], ot[t][1]))
    })
  },
  ot = {
    id: [null, M.STRING],
    name: ["filepond", M.STRING],
    disabled: [!1, M.BOOLEAN],
    className: [null, M.STRING],
    required: [!1, M.BOOLEAN],
    captureMethod: [null, M.STRING],
    allowSyncAcceptAttribute: [!0, M.BOOLEAN],
    allowDrop: [!0, M.BOOLEAN],
    allowBrowse: [!0, M.BOOLEAN],
    allowPaste: [!0, M.BOOLEAN],
    allowMultiple: [!1, M.BOOLEAN],
    allowReplace: [!0, M.BOOLEAN],
    allowRevert: [!0, M.BOOLEAN],
    allowRemove: [!0, M.BOOLEAN],
    allowProcess: [!0, M.BOOLEAN],
    allowReorder: [!1, M.BOOLEAN],
    allowDirectoriesOnly: [!1, M.BOOLEAN],
    storeAsFile: [!1, M.BOOLEAN],
    forceRevert: [!1, M.BOOLEAN],
    maxFiles: [null, M.INT],
    checkValidity: [!1, M.BOOLEAN],
    itemInsertLocationFreedom: [!0, M.BOOLEAN],
    itemInsertLocation: ["before", M.STRING],
    itemInsertInterval: [75, M.INT],
    dropOnPage: [!1, M.BOOLEAN],
    dropOnElement: [!0, M.BOOLEAN],
    dropValidation: [!1, M.BOOLEAN],
    ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], M.ARRAY],
    instantUpload: [!0, M.BOOLEAN],
    maxParallelUploads: [2, M.INT],
    allowMinimumUploadDuration: [!0, M.BOOLEAN],
    chunkUploads: [!1, M.BOOLEAN],
    chunkForce: [!1, M.BOOLEAN],
    chunkSize: [5e6, M.INT],
    chunkRetryDelays: [[500, 1e3, 3e3], M.ARRAY],
    server: [null, M.SERVER_API],
    fileSizeBase: [1e3, M.INT],
    labelFileSizeBytes: ["bytes", M.STRING],
    labelFileSizeKilobytes: ["KB", M.STRING],
    labelFileSizeMegabytes: ["MB", M.STRING],
    labelFileSizeGigabytes: ["GB", M.STRING],
    labelDecimalSeparator: [bn(), M.STRING],
    labelThousandsSeparator: [No(), M.STRING],
    labelIdle: [
      'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
      M.STRING,
    ],
    labelInvalidField: ["Field contains invalid files", M.STRING],
    labelFileWaitingForSize: ["Waiting for size", M.STRING],
    labelFileSizeNotAvailable: ["Size not available", M.STRING],
    labelFileCountSingular: ["file in list", M.STRING],
    labelFileCountPlural: ["files in list", M.STRING],
    labelFileLoading: ["Loading", M.STRING],
    labelFileAdded: ["Added", M.STRING],
    labelFileLoadError: ["Error during load", M.STRING],
    labelFileRemoved: ["Removed", M.STRING],
    labelFileRemoveError: ["Error during remove", M.STRING],
    labelFileProcessing: ["Uploading", M.STRING],
    labelFileProcessingComplete: ["Upload complete", M.STRING],
    labelFileProcessingAborted: ["Upload cancelled", M.STRING],
    labelFileProcessingError: ["Error during upload", M.STRING],
    labelFileProcessingRevertError: ["Error during revert", M.STRING],
    labelTapToCancel: ["tap to cancel", M.STRING],
    labelTapToRetry: ["tap to retry", M.STRING],
    labelTapToUndo: ["tap to undo", M.STRING],
    labelButtonRemoveItem: ["Remove", M.STRING],
    labelButtonAbortItemLoad: ["Abort", M.STRING],
    labelButtonRetryItemLoad: ["Retry", M.STRING],
    labelButtonAbortItemProcessing: ["Cancel", M.STRING],
    labelButtonUndoItemProcessing: ["Undo", M.STRING],
    labelButtonRetryItemProcessing: ["Retry", M.STRING],
    labelButtonProcessItem: ["Upload", M.STRING],
    iconRemove: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
      M.STRING,
    ],
    iconProcess: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
      M.STRING,
    ],
    iconRetry: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
      M.STRING,
    ],
    iconUndo: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
      M.STRING,
    ],
    iconDone: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
      M.STRING,
    ],
    oninit: [null, M.FUNCTION],
    onwarning: [null, M.FUNCTION],
    onerror: [null, M.FUNCTION],
    onactivatefile: [null, M.FUNCTION],
    oninitfile: [null, M.FUNCTION],
    onaddfilestart: [null, M.FUNCTION],
    onaddfileprogress: [null, M.FUNCTION],
    onaddfile: [null, M.FUNCTION],
    onprocessfilestart: [null, M.FUNCTION],
    onprocessfileprogress: [null, M.FUNCTION],
    onprocessfileabort: [null, M.FUNCTION],
    onprocessfilerevert: [null, M.FUNCTION],
    onprocessfile: [null, M.FUNCTION],
    onprocessfiles: [null, M.FUNCTION],
    onremovefile: [null, M.FUNCTION],
    onpreparefile: [null, M.FUNCTION],
    onupdatefiles: [null, M.FUNCTION],
    onreorderfiles: [null, M.FUNCTION],
    beforeDropFile: [null, M.FUNCTION],
    beforeAddFile: [null, M.FUNCTION],
    beforeRemoveFile: [null, M.FUNCTION],
    beforePrepareFile: [null, M.FUNCTION],
    stylePanelLayout: [null, M.STRING],
    stylePanelAspectRatio: [null, M.STRING],
    styleItemPanelAspectRatio: [null, M.STRING],
    styleButtonRemoveItemPosition: ["left", M.STRING],
    styleButtonProcessItemPosition: ["right", M.STRING],
    styleLoadIndicatorPosition: ["right", M.STRING],
    styleProgressIndicatorPosition: ["right", M.STRING],
    styleButtonRemoveItemAlign: [!1, M.BOOLEAN],
    files: [[], M.ARRAY],
    credits: [["https://pqina.nl/", "Powered by PQINA"], M.ARRAY],
  },
  je = (e, t) =>
    Ne(t)
      ? e[0] || null
      : mt(t)
        ? e[t] || null
        : (typeof t == "object" && (t = t.id),
          e.find((i) => i.id === t) || null),
  In = (e) => {
    if (Ne(e)) return e
    if (/:/.test(e)) {
      let t = e.split(":")
      return t[1] / t[0]
    }
    return parseFloat(e)
  },
  Me = (e) => e.filter((t) => !t.archived),
  _n = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 },
  qt = null,
  Uo = () => {
    if (qt === null)
      try {
        let e = new DataTransfer()
        e.items.add(new File(["hello world"], "This_Works.txt"))
        let t = document.createElement("input")
        t.setAttribute("type", "file"),
          (t.files = e.files),
          (qt = t.files.length === 1)
      } catch {
        qt = !1
      }
    return qt
  },
  ko = [k.LOAD_ERROR, k.PROCESSING_ERROR, k.PROCESSING_REVERT_ERROR],
  Ho = [k.LOADING, k.PROCESSING, k.PROCESSING_QUEUED, k.INIT],
  Wo = [k.PROCESSING_COMPLETE],
  Yo = (e) => ko.includes(e.status),
  $o = (e) => Ho.includes(e.status),
  qo = (e) => Wo.includes(e.status),
  Ca = (e) =>
    ce(e.options.server) &&
    (ce(e.options.server.process) || qe(e.options.server.process)),
  jo = (e) => ({
    GET_STATUS: () => {
      let t = Me(e.items),
        { EMPTY: i, ERROR: a, BUSY: n, IDLE: r, READY: l } = _n
      return t.length === 0
        ? i
        : t.some(Yo)
          ? a
          : t.some($o)
            ? n
            : t.some(qo)
              ? l
              : r
    },
    GET_ITEM: (t) => je(e.items, t),
    GET_ACTIVE_ITEM: (t) => je(Me(e.items), t),
    GET_ACTIVE_ITEMS: () => Me(e.items),
    GET_ITEMS: () => e.items,
    GET_ITEM_NAME: (t) => {
      let i = je(e.items, t)
      return i ? i.filename : null
    },
    GET_ITEM_SIZE: (t) => {
      let i = je(e.items, t)
      return i ? i.fileSize : null
    },
    GET_STYLES: () =>
      Object.keys(e.options)
        .filter((t) => /^style/.test(t))
        .map((t) => ({ name: t, value: e.options[t] })),
    GET_PANEL_ASPECT_RATIO: () =>
      /circle/.test(e.options.stylePanelLayout)
        ? 1
        : In(e.options.stylePanelAspectRatio),
    GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio,
    GET_ITEMS_BY_STATUS: (t) => Me(e.items).filter((i) => i.status === t),
    GET_TOTAL_ITEMS: () => Me(e.items).length,
    SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Uo() && !Ca(e),
    IS_ASYNC: () => Ca(e),
    GET_FILE_SIZE_LABELS: (t) => ({
      labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0,
      labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
      labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
      labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0,
    }),
  }),
  Xo = (e) => {
    let t = Me(e.items).length
    if (!e.options.allowMultiple) return t === 0
    let i = e.options.maxFiles
    return i === null || t < i
  },
  Rn = (e, t, i) => Math.max(Math.min(i, e), t),
  Qo = (e, t, i) => e.splice(t, 0, i),
  Zo = (e, t, i) =>
    Ne(t)
      ? null
      : typeof i > "u"
        ? (e.push(t), t)
        : ((i = Rn(i, 0, e.length)), Qo(e, i, t), t),
  Mi = (e) =>
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
      e
    ),
  Ot = (e) => `${e}`.split("/").pop().split("?").shift(),
  si = (e) => e.split(".").pop(),
  Ko = (e) => {
    if (typeof e != "string") return ""
    let t = e.split("/").pop()
    return /svg/.test(t)
      ? "svg"
      : /zip|compressed/.test(t)
        ? "zip"
        : /plain/.test(t)
          ? "txt"
          : /msword/.test(t)
            ? "doc"
            : /[a-z]+/.test(t)
              ? t === "jpeg"
                ? "jpg"
                : t
              : ""
  },
  vt = (e, t = "") => (t + e).slice(-t.length),
  yn = (e = new Date()) =>
    `${e.getFullYear()}-${vt(e.getMonth() + 1, "00")}-${vt(e.getDate(), "00")}_${vt(e.getHours(), "00")}-${vt(e.getMinutes(), "00")}-${vt(e.getSeconds(), "00")}`,
  ht = (e, t, i = null, a = null) => {
    let n =
      typeof i == "string" ? e.slice(0, e.size, i) : e.slice(0, e.size, e.type)
    return (
      (n.lastModifiedDate = new Date()),
      e._relativePath && (n._relativePath = e._relativePath),
      pe(t) || (t = yn()),
      t && a === null && si(t)
        ? (n.name = t)
        : ((a = a || Ko(n.type)), (n.name = t + (a ? "." + a : ""))),
      n
    )
  },
  Jo = () =>
    (window.BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder),
  Sn = (e, t) => {
    let i = Jo()
    if (i) {
      let a = new i()
      return a.append(e), a.getBlob(t)
    }
    return new Blob([e], { type: t })
  },
  es = (e, t) => {
    let i = new ArrayBuffer(e.length),
      a = new Uint8Array(i)
    for (let n = 0; n < e.length; n++) a[n] = e.charCodeAt(n)
    return Sn(i, t)
  },
  wn = (e) => (/^data:(.+);/.exec(e) || [])[1] || null,
  ts = (e) => e.split(",")[1].replace(/\s/g, ""),
  is = (e) => atob(ts(e)),
  as = (e) => {
    let t = wn(e),
      i = is(e)
    return es(i, t)
  },
  ns = (e, t, i) => ht(as(e), t, null, i),
  rs = (e) => {
    if (!/^content-disposition:/i.test(e)) return null
    let t = e
      .split(/filename=|filename\*=.+''/)
      .splice(1)
      .map((i) => i.trim().replace(/^["']|[;"']{0,2}$/g, ""))
      .filter((i) => i.length)
    return t.length ? decodeURI(t[t.length - 1]) : null
  },
  ls = (e) => {
    if (/content-length:/i.test(e)) {
      let t = e.match(/[0-9]+/)[0]
      return t ? parseInt(t, 10) : null
    }
    return null
  },
  os = (e) =>
    (/x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim()) ||
    null,
  Yi = (e) => {
    let t = { source: null, name: null, size: null },
      i = e.split(`
`)
    for (let a of i) {
      let n = rs(a)
      if (n) {
        t.name = n
        continue
      }
      let r = ls(a)
      if (r) {
        t.size = r
        continue
      }
      let l = os(a)
      if (l) {
        t.source = l
        continue
      }
    }
    return t
  },
  ss = (e) => {
    let t = {
        source: null,
        complete: !1,
        progress: 0,
        size: null,
        timestamp: null,
        duration: 0,
        request: null,
      },
      i = () => t.progress,
      a = () => {
        t.request && t.request.abort && t.request.abort()
      },
      n = () => {
        let o = t.source
        l.fire("init", o),
          o instanceof File
            ? l.fire("load", o)
            : o instanceof Blob
              ? l.fire("load", ht(o, o.name))
              : Mi(o)
                ? l.fire("load", ns(o))
                : r(o)
      },
      r = (o) => {
        if (!e) {
          l.fire("error", { type: "error", body: "Can't load URL", code: 400 })
          return
        }
        ;(t.timestamp = Date.now()),
          (t.request = e(
            o,
            (s) => {
              ;(t.duration = Date.now() - t.timestamp),
                (t.complete = !0),
                s instanceof Blob && (s = ht(s, s.name || Ot(o))),
                l.fire("load", s instanceof Blob ? s : s ? s.body : null)
            },
            (s) => {
              l.fire(
                "error",
                typeof s == "string" ? { type: "error", code: 0, body: s } : s
              )
            },
            (s, u, c) => {
              if (
                (c && (t.size = c), (t.duration = Date.now() - t.timestamp), !s)
              ) {
                t.progress = null
                return
              }
              ;(t.progress = u / c), l.fire("progress", t.progress)
            },
            () => {
              l.fire("abort")
            },
            (s) => {
              let u = Yi(typeof s == "string" ? s : s.headers)
              l.fire("meta", {
                size: t.size || u.size,
                filename: u.name,
                source: u.source,
              })
            }
          ))
      },
      l = {
        ...oi(),
        setSource: (o) => (t.source = o),
        getProgress: i,
        abort: a,
        load: n,
      }
    return l
  },
  za = (e) => /GET|HEAD/.test(e),
  Xe = (e, t, i) => {
    let a = {
        onheaders: () => {},
        onprogress: () => {},
        onload: () => {},
        ontimeout: () => {},
        onerror: () => {},
        onabort: () => {},
        abort: () => {
          ;(n = !0), l.abort()
        },
      },
      n = !1,
      r = !1
    ;(i = { method: "POST", headers: {}, withCredentials: !1, ...i }),
      (t = encodeURI(t)),
      za(i.method) &&
        e &&
        (t = `${t}${encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e))}`)
    let l = new XMLHttpRequest(),
      o = za(i.method) ? l : l.upload
    return (
      (o.onprogress = (s) => {
        n || a.onprogress(s.lengthComputable, s.loaded, s.total)
      }),
      (l.onreadystatechange = () => {
        l.readyState < 2 ||
          (l.readyState === 4 && l.status === 0) ||
          r ||
          ((r = !0), a.onheaders(l))
      }),
      (l.onload = () => {
        l.status >= 200 && l.status < 300 ? a.onload(l) : a.onerror(l)
      }),
      (l.onerror = () => a.onerror(l)),
      (l.onabort = () => {
        ;(n = !0), a.onabort()
      }),
      (l.ontimeout = () => a.ontimeout(l)),
      l.open(i.method, t, !0),
      mt(i.timeout) && (l.timeout = i.timeout),
      Object.keys(i.headers).forEach((s) => {
        let u = unescape(encodeURIComponent(i.headers[s]))
        l.setRequestHeader(s, u)
      }),
      i.responseType && (l.responseType = i.responseType),
      i.withCredentials && (l.withCredentials = !0),
      l.send(e),
      a
    )
  },
  ie = (e, t, i, a) => ({ type: e, code: t, body: i, headers: a }),
  Qe = (e) => (t) => {
    e(ie("error", 0, "Timeout", t.getAllResponseHeaders()))
  },
  Na = (e) => /\?/.test(e),
  Mt = (...e) => {
    let t = ""
    return (
      e.forEach((i) => {
        t += Na(t) && Na(i) ? i.replace(/\?/, "&") : i
      }),
      t
    )
  },
  Ri = (e = "", t) => {
    if (typeof t == "function") return t
    if (!t || !pe(t.url)) return null
    let i = t.onload || ((n) => n),
      a = t.onerror || ((n) => null)
    return (n, r, l, o, s, u) => {
      let c = Xe(n, Mt(e, t.url), { ...t, responseType: "blob" })
      return (
        (c.onload = (d) => {
          let h = d.getAllResponseHeaders(),
            m = Yi(h).name || Ot(n)
          r(
            ie(
              "load",
              d.status,
              t.method === "HEAD" ? null : ht(i(d.response), m),
              h
            )
          )
        }),
        (c.onerror = (d) => {
          l(
            ie(
              "error",
              d.status,
              a(d.response) || d.statusText,
              d.getAllResponseHeaders()
            )
          )
        }),
        (c.onheaders = (d) => {
          u(ie("headers", d.status, null, d.getAllResponseHeaders()))
        }),
        (c.ontimeout = Qe(l)),
        (c.onprogress = o),
        (c.onabort = s),
        c
      )
    }
  },
  Re = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 },
  cs = (e, t, i, a, n, r, l, o, s, u, c) => {
    let d = [],
      {
        chunkTransferId: h,
        chunkServer: m,
        chunkSize: p,
        chunkRetryDelays: f,
      } = c,
      g = { serverId: h, aborted: !1 },
      I = t.ondata || ((L) => L),
      E =
        t.onload ||
        ((L, F) =>
          F === "HEAD" ? L.getResponseHeader("Upload-Offset") : L.response),
      b = t.onerror || ((L) => null),
      _ = (L) => {
        let F = new FormData()
        ce(n) && F.append(i, JSON.stringify(n))
        let w =
            typeof t.headers == "function"
              ? t.headers(a, n)
              : { ...t.headers, "Upload-Length": a.size },
          A = { ...t, headers: w },
          C = Xe(I(F), Mt(e, t.url), A)
        ;(C.onload = (D) => L(E(D, A.method))),
          (C.onerror = (D) =>
            l(
              ie(
                "error",
                D.status,
                b(D.response) || D.statusText,
                D.getAllResponseHeaders()
              )
            )),
          (C.ontimeout = Qe(l))
      },
      y = (L) => {
        let F = Mt(e, m.url, g.serverId),
          A = {
            headers:
              typeof t.headers == "function"
                ? t.headers(g.serverId)
                : { ...t.headers },
            method: "HEAD",
          },
          C = Xe(null, F, A)
        ;(C.onload = (D) => L(E(D, A.method))),
          (C.onerror = (D) =>
            l(
              ie(
                "error",
                D.status,
                b(D.response) || D.statusText,
                D.getAllResponseHeaders()
              )
            )),
          (C.ontimeout = Qe(l))
      },
      T = Math.floor(a.size / p)
    for (let L = 0; L <= T; L++) {
      let F = L * p,
        w = a.slice(F, F + p, "application/offset+octet-stream")
      d[L] = {
        index: L,
        size: w.size,
        offset: F,
        data: w,
        file: a,
        progress: 0,
        retries: [...f],
        status: Re.QUEUED,
        error: null,
        request: null,
        timeout: null,
      }
    }
    let v = () => r(g.serverId),
      R = (L) => L.status === Re.QUEUED || L.status === Re.ERROR,
      S = (L) => {
        if (g.aborted) return
        if (((L = L || d.find(R)), !L)) {
          d.every((V) => V.status === Re.COMPLETE) && v()
          return
        }
        ;(L.status = Re.PROCESSING), (L.progress = null)
        let F = m.ondata || ((V) => V),
          w = m.onerror || ((V) => null),
          A = Mt(e, m.url, g.serverId),
          C =
            typeof m.headers == "function"
              ? m.headers(L)
              : {
                  ...m.headers,
                  "Content-Type": "application/offset+octet-stream",
                  "Upload-Offset": L.offset,
                  "Upload-Length": a.size,
                  "Upload-Name": a.name,
                },
          D = (L.request = Xe(F(L.data), A, { ...m, headers: C }))
        ;(D.onload = () => {
          ;(L.status = Re.COMPLETE), (L.request = null), x()
        }),
          (D.onprogress = (V, B, j) => {
            ;(L.progress = V ? B : null), O()
          }),
          (D.onerror = (V) => {
            ;(L.status = Re.ERROR),
              (L.request = null),
              (L.error = w(V.response) || V.statusText),
              P(L) ||
                l(
                  ie(
                    "error",
                    V.status,
                    w(V.response) || V.statusText,
                    V.getAllResponseHeaders()
                  )
                )
          }),
          (D.ontimeout = (V) => {
            ;(L.status = Re.ERROR), (L.request = null), P(L) || Qe(l)(V)
          }),
          (D.onabort = () => {
            ;(L.status = Re.QUEUED), (L.request = null), s()
          })
      },
      P = (L) =>
        L.retries.length === 0
          ? !1
          : ((L.status = Re.WAITING),
            clearTimeout(L.timeout),
            (L.timeout = setTimeout(() => {
              S(L)
            }, L.retries.shift())),
            !0),
      O = () => {
        let L = d.reduce(
          (w, A) => (w === null || A.progress === null ? null : w + A.progress),
          0
        )
        if (L === null) return o(!1, 0, 0)
        let F = d.reduce((w, A) => w + A.size, 0)
        o(!0, L, F)
      },
      x = () => {
        d.filter((F) => F.status === Re.PROCESSING).length >= 1 || S()
      },
      z = () => {
        d.forEach((L) => {
          clearTimeout(L.timeout), L.request && L.request.abort()
        })
      }
    return (
      g.serverId
        ? y((L) => {
            g.aborted ||
              (d
                .filter((F) => F.offset < L)
                .forEach((F) => {
                  ;(F.status = Re.COMPLETE), (F.progress = F.size)
                }),
              x())
          })
        : _((L) => {
            g.aborted || (u(L), (g.serverId = L), x())
          }),
      {
        abort: () => {
          ;(g.aborted = !0), z()
        },
      }
    )
  },
  ds = (e, t, i, a) => (n, r, l, o, s, u, c) => {
    if (!n) return
    let d = a.chunkUploads,
      h = d && n.size > a.chunkSize,
      m = d && (h || a.chunkForce)
    if (n instanceof Blob && m) return cs(e, t, i, n, r, l, o, s, u, c, a)
    let p = t.ondata || ((y) => y),
      f = t.onload || ((y) => y),
      g = t.onerror || ((y) => null),
      I =
        typeof t.headers == "function"
          ? t.headers(n, r) || {}
          : { ...t.headers },
      E = { ...t, headers: I }
    var b = new FormData()
    ce(r) && b.append(i, JSON.stringify(r)),
      (n instanceof Blob ? [{ name: null, file: n }] : n).forEach((y) => {
        b.append(
          i,
          y.file,
          y.name === null ? y.file.name : `${y.name}${y.file.name}`
        )
      })
    let _ = Xe(p(b), Mt(e, t.url), E)
    return (
      (_.onload = (y) => {
        l(ie("load", y.status, f(y.response), y.getAllResponseHeaders()))
      }),
      (_.onerror = (y) => {
        o(
          ie(
            "error",
            y.status,
            g(y.response) || y.statusText,
            y.getAllResponseHeaders()
          )
        )
      }),
      (_.ontimeout = Qe(o)),
      (_.onprogress = s),
      (_.onabort = u),
      _
    )
  },
  us = (e = "", t, i, a) =>
    typeof t == "function"
      ? (...n) => t(i, ...n, a)
      : !t || !pe(t.url)
        ? null
        : ds(e, t, i, a),
  Lt = (e = "", t) => {
    if (typeof t == "function") return t
    if (!t || !pe(t.url)) return (n, r) => r()
    let i = t.onload || ((n) => n),
      a = t.onerror || ((n) => null)
    return (n, r, l) => {
      let o = Xe(n, e + t.url, t)
      return (
        (o.onload = (s) => {
          r(ie("load", s.status, i(s.response), s.getAllResponseHeaders()))
        }),
        (o.onerror = (s) => {
          l(
            ie(
              "error",
              s.status,
              a(s.response) || s.statusText,
              s.getAllResponseHeaders()
            )
          )
        }),
        (o.ontimeout = Qe(l)),
        o
      )
    }
  },
  vn = (e = 0, t = 1) => e + Math.random() * (t - e),
  hs = (e, t = 1e3, i = 0, a = 25, n = 250) => {
    let r = null,
      l = Date.now(),
      o = () => {
        let s = Date.now() - l,
          u = vn(a, n)
        s + u > t && (u = s + u - t)
        let c = s / t
        if (c >= 1 || document.hidden) {
          e(1)
          return
        }
        e(c), (r = setTimeout(o, u))
      }
    return (
      t > 0 && o(),
      {
        clear: () => {
          clearTimeout(r)
        },
      }
    )
  },
  ms = (e, t) => {
    let i = {
        complete: !1,
        perceivedProgress: 0,
        perceivedPerformanceUpdater: null,
        progress: null,
        timestamp: null,
        perceivedDuration: 0,
        duration: 0,
        request: null,
        response: null,
      },
      { allowMinimumUploadDuration: a } = t,
      n = (c, d) => {
        let h = () => {
            i.duration === 0 ||
              i.progress === null ||
              u.fire("progress", u.getProgress())
          },
          m = () => {
            ;(i.complete = !0), u.fire("load-perceived", i.response.body)
          }
        u.fire("start"),
          (i.timestamp = Date.now()),
          (i.perceivedPerformanceUpdater = hs(
            (p) => {
              ;(i.perceivedProgress = p),
                (i.perceivedDuration = Date.now() - i.timestamp),
                h(),
                i.response && i.perceivedProgress === 1 && !i.complete && m()
            },
            a ? vn(750, 1500) : 0
          )),
          (i.request = e(
            c,
            d,
            (p) => {
              ;(i.response = ce(p)
                ? p
                : { type: "load", code: 200, body: `${p}`, headers: {} }),
                (i.duration = Date.now() - i.timestamp),
                (i.progress = 1),
                u.fire("load", i.response.body),
                (!a || (a && i.perceivedProgress === 1)) && m()
            },
            (p) => {
              i.perceivedPerformanceUpdater.clear(),
                u.fire(
                  "error",
                  ce(p) ? p : { type: "error", code: 0, body: `${p}` }
                )
            },
            (p, f, g) => {
              ;(i.duration = Date.now() - i.timestamp),
                (i.progress = p ? f / g : null),
                h()
            },
            () => {
              i.perceivedPerformanceUpdater.clear(),
                u.fire("abort", i.response ? i.response.body : null)
            },
            (p) => {
              u.fire("transfer", p)
            }
          ))
      },
      r = () => {
        i.request &&
          (i.perceivedPerformanceUpdater.clear(),
          i.request.abort && i.request.abort(),
          (i.complete = !0))
      },
      l = () => {
        r(),
          (i.complete = !1),
          (i.perceivedProgress = 0),
          (i.progress = 0),
          (i.timestamp = null),
          (i.perceivedDuration = 0),
          (i.duration = 0),
          (i.request = null),
          (i.response = null)
      },
      o = a
        ? () => (i.progress ? Math.min(i.progress, i.perceivedProgress) : null)
        : () => i.progress || null,
      s = a
        ? () => Math.min(i.duration, i.perceivedDuration)
        : () => i.duration,
      u = {
        ...oi(),
        process: n,
        abort: r,
        getProgress: o,
        getDuration: s,
        reset: l,
      }
    return u
  },
  Ln = (e) => e.substring(0, e.lastIndexOf(".")) || e,
  ps = (e) => {
    let t = [e.name, e.size, e.type]
    return (
      e instanceof Blob || Mi(e)
        ? (t[0] = e.name || yn())
        : Mi(e)
          ? ((t[1] = e.length), (t[2] = wn(e)))
          : pe(e) &&
            ((t[0] = Ot(e)), (t[1] = 0), (t[2] = "application/octet-stream")),
      { name: t[0], size: t[1], type: t[2] }
    )
  },
  Ze = (e) => !!(e instanceof File || (e instanceof Blob && e.name)),
  An = (e) => {
    if (!ce(e)) return e
    let t = ni(e) ? [] : {}
    for (let i in e) {
      if (!e.hasOwnProperty(i)) continue
      let a = e[i]
      t[i] = a && ce(a) ? An(a) : a
    }
    return t
  },
  fs = (e = null, t = null, i = null) => {
    let a = ki(),
      n = {
        archived: !1,
        frozen: !1,
        released: !1,
        source: null,
        file: i,
        serverFileReference: t,
        transferId: null,
        processingAborted: !1,
        status: t ? k.PROCESSING_COMPLETE : k.INIT,
        activeLoader: null,
        activeProcessor: null,
      },
      r = null,
      l = {},
      o = (R) => (n.status = R),
      s = (R, ...S) => {
        n.released || n.frozen || T.fire(R, ...S)
      },
      u = () => si(n.file.name),
      c = () => n.file.type,
      d = () => n.file.size,
      h = () => n.file,
      m = (R, S, P) => {
        if (((n.source = R), T.fireSync("init"), n.file)) {
          T.fireSync("load-skip")
          return
        }
        ;(n.file = ps(R)),
          S.on("init", () => {
            s("load-init")
          }),
          S.on("meta", (O) => {
            ;(n.file.size = O.size),
              (n.file.filename = O.filename),
              O.source &&
                ((e = se.LIMBO),
                (n.serverFileReference = O.source),
                (n.status = k.PROCESSING_COMPLETE)),
              s("load-meta")
          }),
          S.on("progress", (O) => {
            o(k.LOADING), s("load-progress", O)
          }),
          S.on("error", (O) => {
            o(k.LOAD_ERROR), s("load-request-error", O)
          }),
          S.on("abort", () => {
            o(k.INIT), s("load-abort")
          }),
          S.on("load", (O) => {
            n.activeLoader = null
            let x = (L) => {
                ;(n.file = Ze(L) ? L : n.file),
                  e === se.LIMBO && n.serverFileReference
                    ? o(k.PROCESSING_COMPLETE)
                    : o(k.IDLE),
                  s("load")
              },
              z = (L) => {
                ;(n.file = O),
                  s("load-meta"),
                  o(k.LOAD_ERROR),
                  s("load-file-error", L)
              }
            if (n.serverFileReference) {
              x(O)
              return
            }
            P(O, x, z)
          }),
          S.setSource(R),
          (n.activeLoader = S),
          S.load()
      },
      p = () => {
        n.activeLoader && n.activeLoader.load()
      },
      f = () => {
        if (n.activeLoader) {
          n.activeLoader.abort()
          return
        }
        o(k.INIT), s("load-abort")
      },
      g = (R, S) => {
        if (n.processingAborted) {
          n.processingAborted = !1
          return
        }
        if ((o(k.PROCESSING), (r = null), !(n.file instanceof Blob))) {
          T.on("load", () => {
            g(R, S)
          })
          return
        }
        R.on("load", (x) => {
          ;(n.transferId = null), (n.serverFileReference = x)
        }),
          R.on("transfer", (x) => {
            n.transferId = x
          }),
          R.on("load-perceived", (x) => {
            ;(n.activeProcessor = null),
              (n.transferId = null),
              (n.serverFileReference = x),
              o(k.PROCESSING_COMPLETE),
              s("process-complete", x)
          }),
          R.on("start", () => {
            s("process-start")
          }),
          R.on("error", (x) => {
            ;(n.activeProcessor = null),
              o(k.PROCESSING_ERROR),
              s("process-error", x)
          }),
          R.on("abort", (x) => {
            ;(n.activeProcessor = null),
              (n.serverFileReference = x),
              o(k.IDLE),
              s("process-abort"),
              r && r()
          }),
          R.on("progress", (x) => {
            s("process-progress", x)
          })
        let P = (x) => {
            n.archived || R.process(x, { ...l })
          },
          O = console.error
        S(n.file, P, O), (n.activeProcessor = R)
      },
      I = () => {
        ;(n.processingAborted = !1), o(k.PROCESSING_QUEUED)
      },
      E = () =>
        new Promise((R) => {
          if (!n.activeProcessor) {
            ;(n.processingAborted = !0), o(k.IDLE), s("process-abort"), R()
            return
          }
          ;(r = () => {
            R()
          }),
            n.activeProcessor.abort()
        }),
      b = (R, S) =>
        new Promise((P, O) => {
          let x =
            n.serverFileReference !== null
              ? n.serverFileReference
              : n.transferId
          if (x === null) {
            P()
            return
          }
          R(
            x,
            () => {
              ;(n.serverFileReference = null), (n.transferId = null), P()
            },
            (z) => {
              if (!S) {
                P()
                return
              }
              o(k.PROCESSING_REVERT_ERROR), s("process-revert-error"), O(z)
            }
          ),
            o(k.IDLE),
            s("process-revert")
        }),
      _ = (R, S, P) => {
        let O = R.split("."),
          x = O[0],
          z = O.pop(),
          L = l
        O.forEach((F) => (L = L[F])),
          JSON.stringify(L[z]) !== JSON.stringify(S) &&
            ((L[z] = S),
            s("metadata-update", { key: x, value: l[x], silent: P }))
      },
      T = {
        id: { get: () => a },
        origin: { get: () => e, set: (R) => (e = R) },
        serverId: { get: () => n.serverFileReference },
        transferId: { get: () => n.transferId },
        status: { get: () => n.status },
        filename: { get: () => n.file.name },
        filenameWithoutExtension: { get: () => Ln(n.file.name) },
        fileExtension: { get: u },
        fileType: { get: c },
        fileSize: { get: d },
        file: { get: h },
        relativePath: { get: () => n.file._relativePath },
        source: { get: () => n.source },
        getMetadata: (R) => An(R ? l[R] : l),
        setMetadata: (R, S, P) => {
          if (ce(R)) {
            let O = R
            return (
              Object.keys(O).forEach((x) => {
                _(x, O[x], S)
              }),
              R
            )
          }
          return _(R, S, P), S
        },
        extend: (R, S) => (v[R] = S),
        abortLoad: f,
        retryLoad: p,
        requestProcessing: I,
        abortProcessing: E,
        load: m,
        process: g,
        revert: b,
        ...oi(),
        freeze: () => (n.frozen = !0),
        release: () => (n.released = !0),
        released: { get: () => n.released },
        archive: () => (n.archived = !0),
        archived: { get: () => n.archived },
        setFile: (R) => (n.file = R),
      },
      v = Ue(T)
    return v
  },
  gs = (e, t) => (Ne(t) ? 0 : pe(t) ? e.findIndex((i) => i.id === t) : -1),
  Ba = (e, t) => {
    let i = gs(e, t)
    if (!(i < 0)) return e[i] || null
  },
  Va = (e, t, i, a, n, r) => {
    let l = Xe(null, e, { method: "GET", responseType: "blob" })
    return (
      (l.onload = (o) => {
        let s = o.getAllResponseHeaders(),
          u = Yi(s).name || Ot(e)
        t(ie("load", o.status, ht(o.response, u), s))
      }),
      (l.onerror = (o) => {
        i(ie("error", o.status, o.statusText, o.getAllResponseHeaders()))
      }),
      (l.onheaders = (o) => {
        r(ie("headers", o.status, null, o.getAllResponseHeaders()))
      }),
      (l.ontimeout = Qe(i)),
      (l.onprogress = a),
      (l.onabort = n),
      l
    )
  },
  Ga = (e) => (
    e.indexOf("//") === 0 && (e = location.protocol + e),
    e
      .toLowerCase()
      .replace("blob:", "")
      .replace(/([a-z])?:\/\//, "$1")
      .split("/")[0]
  ),
  Es = (e) =>
    (e.indexOf(":") > -1 || e.indexOf("//") > -1) &&
    Ga(location.href) !== Ga(e),
  jt =
    (e) =>
    (...t) =>
      qe(e) ? e(...t) : e,
  Ts = (e) => !Ze(e.file),
  yi = (e, t) => {
    clearTimeout(t.listUpdateTimeout),
      (t.listUpdateTimeout = setTimeout(() => {
        e("DID_UPDATE_ITEMS", { items: Me(t.items) })
      }, 0))
  },
  Ua = (e, ...t) =>
    new Promise((i) => {
      if (!e) return i(!0)
      let a = e(...t)
      if (a == null) return i(!0)
      if (typeof a == "boolean") return i(a)
      typeof a.then == "function" && a.then(i)
    }),
  Si = (e, t) => {
    e.items.sort((i, a) => t(ge(i), ge(a)))
  },
  ye =
    (e, t) =>
    ({ query: i, success: a = () => {}, failure: n = () => {}, ...r } = {}) => {
      let l = je(e.items, i)
      if (!l) {
        n({ error: ie("error", 0, "Item not found"), file: null })
        return
      }
      t(l, a, n, r || {})
    },
  bs = (e, t, i) => ({
    ABORT_ALL: () => {
      Me(i.items).forEach((a) => {
        a.freeze(), a.abortLoad(), a.abortProcessing()
      })
    },
    DID_SET_FILES: ({ value: a = [] }) => {
      let n = a.map((l) => ({
          source: l.source ? l.source : l,
          options: l.options,
        })),
        r = Me(i.items)
      r.forEach((l) => {
        n.find((o) => o.source === l.source || o.source === l.file) ||
          e("REMOVE_ITEM", { query: l, remove: !1 })
      }),
        (r = Me(i.items)),
        n.forEach((l, o) => {
          r.find((s) => s.source === l.source || s.file === l.source) ||
            e("ADD_ITEM", { ...l, interactionMethod: Se.NONE, index: o })
        })
    },
    DID_UPDATE_ITEM_METADATA: ({ id: a, action: n, change: r }) => {
      r.silent ||
        (clearTimeout(i.itemUpdateTimeout),
        (i.itemUpdateTimeout = setTimeout(() => {
          let l = Ba(i.items, a)
          if (!t("IS_ASYNC")) {
            Ae("SHOULD_PREPARE_OUTPUT", !1, {
              item: l,
              query: t,
              action: n,
              change: r,
            }).then((c) => {
              let d = t("GET_BEFORE_PREPARE_FILE")
              d && (c = d(l, c)),
                c &&
                  e(
                    "REQUEST_PREPARE_OUTPUT",
                    {
                      query: a,
                      item: l,
                      success: (h) => {
                        e("DID_PREPARE_OUTPUT", { id: a, file: h })
                      },
                    },
                    !0
                  )
            })
            return
          }
          l.origin === se.LOCAL &&
            e("DID_LOAD_ITEM", {
              id: l.id,
              error: null,
              serverFileReference: l.source,
            })
          let o = () => {
              setTimeout(() => {
                e("REQUEST_ITEM_PROCESSING", { query: a })
              }, 32)
            },
            s = (c) => {
              l.revert(
                Lt(i.options.server.url, i.options.server.revert),
                t("GET_FORCE_REVERT")
              )
                .then(c ? o : () => {})
                .catch(() => {})
            },
            u = (c) => {
              l.abortProcessing().then(c ? o : () => {})
            }
          if (l.status === k.PROCESSING_COMPLETE)
            return s(i.options.instantUpload)
          if (l.status === k.PROCESSING) return u(i.options.instantUpload)
          i.options.instantUpload && o()
        }, 0)))
    },
    MOVE_ITEM: ({ query: a, index: n }) => {
      let r = je(i.items, a)
      if (!r) return
      let l = i.items.indexOf(r)
      ;(n = Rn(n, 0, i.items.length - 1)),
        l !== n && i.items.splice(n, 0, i.items.splice(l, 1)[0])
    },
    SORT: ({ compare: a }) => {
      Si(i, a), e("DID_SORT_ITEMS", { items: t("GET_ACTIVE_ITEMS") })
    },
    ADD_ITEMS: ({
      items: a,
      index: n,
      interactionMethod: r,
      success: l = () => {},
      failure: o = () => {},
    }) => {
      let s = n
      if (n === -1 || typeof n > "u") {
        let m = t("GET_ITEM_INSERT_LOCATION"),
          p = t("GET_TOTAL_ITEMS")
        s = m === "before" ? 0 : p
      }
      let u = t("GET_IGNORED_FILES"),
        c = (m) => (Ze(m) ? !u.includes(m.name.toLowerCase()) : !Ne(m)),
        h = a.filter(c).map(
          (m) =>
            new Promise((p, f) => {
              e("ADD_ITEM", {
                interactionMethod: r,
                source: m.source || m,
                success: p,
                failure: f,
                index: s++,
                options: m.options || {},
              })
            })
        )
      Promise.all(h).then(l).catch(o)
    },
    ADD_ITEM: ({
      source: a,
      index: n = -1,
      interactionMethod: r,
      success: l = () => {},
      failure: o = () => {},
      options: s = {},
    }) => {
      if (Ne(a)) {
        o({ error: ie("error", 0, "No source"), file: null })
        return
      }
      if (Ze(a) && i.options.ignoredFiles.includes(a.name.toLowerCase())) return
      if (!Xo(i)) {
        if (
          i.options.allowMultiple ||
          (!i.options.allowMultiple && !i.options.allowReplace)
        ) {
          let E = ie("warning", 0, "Max files")
          e("DID_THROW_MAX_FILES", { source: a, error: E }),
            o({ error: E, file: null })
          return
        }
        let I = Me(i.items)[0]
        if (
          I.status === k.PROCESSING_COMPLETE ||
          I.status === k.PROCESSING_REVERT_ERROR
        ) {
          let E = t("GET_FORCE_REVERT")
          if (
            (I.revert(Lt(i.options.server.url, i.options.server.revert), E)
              .then(() => {
                E &&
                  e("ADD_ITEM", {
                    source: a,
                    index: n,
                    interactionMethod: r,
                    success: l,
                    failure: o,
                    options: s,
                  })
              })
              .catch(() => {}),
            E)
          )
            return
        }
        e("REMOVE_ITEM", { query: I.id })
      }
      let u =
          s.type === "local"
            ? se.LOCAL
            : s.type === "limbo"
              ? se.LIMBO
              : se.INPUT,
        c = fs(u, u === se.INPUT ? null : a, s.file)
      Object.keys(s.metadata || {}).forEach((I) => {
        c.setMetadata(I, s.metadata[I])
      }),
        Je("DID_CREATE_ITEM", c, { query: t, dispatch: e })
      let d = t("GET_ITEM_INSERT_LOCATION")
      i.options.itemInsertLocationFreedom ||
        (n = d === "before" ? -1 : i.items.length),
        Zo(i.items, c, n),
        qe(d) && a && Si(i, d)
      let h = c.id
      c.on("init", () => {
        e("DID_INIT_ITEM", { id: h })
      }),
        c.on("load-init", () => {
          e("DID_START_ITEM_LOAD", { id: h })
        }),
        c.on("load-meta", () => {
          e("DID_UPDATE_ITEM_META", { id: h })
        }),
        c.on("load-progress", (I) => {
          e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: h, progress: I })
        }),
        c.on("load-request-error", (I) => {
          let E = jt(i.options.labelFileLoadError)(I)
          if (I.code >= 400 && I.code < 500) {
            e("DID_THROW_ITEM_INVALID", {
              id: h,
              error: I,
              status: { main: E, sub: `${I.code} (${I.body})` },
            }),
              o({ error: I, file: ge(c) })
            return
          }
          e("DID_THROW_ITEM_LOAD_ERROR", {
            id: h,
            error: I,
            status: { main: E, sub: i.options.labelTapToRetry },
          })
        }),
        c.on("load-file-error", (I) => {
          e("DID_THROW_ITEM_INVALID", {
            id: h,
            error: I.status,
            status: I.status,
          }),
            o({ error: I.status, file: ge(c) })
        }),
        c.on("load-abort", () => {
          e("REMOVE_ITEM", { query: h })
        }),
        c.on("load-skip", () => {
          c.on("metadata-update", (I) => {
            Ze(c.file) && e("DID_UPDATE_ITEM_METADATA", { id: h, change: I })
          }),
            e("COMPLETE_LOAD_ITEM", {
              query: h,
              item: c,
              data: { source: a, success: l },
            })
        }),
        c.on("load", () => {
          let I = (E) => {
            if (!E) {
              e("REMOVE_ITEM", { query: h })
              return
            }
            c.on("metadata-update", (b) => {
              e("DID_UPDATE_ITEM_METADATA", { id: h, change: b })
            }),
              Ae("SHOULD_PREPARE_OUTPUT", !1, { item: c, query: t }).then(
                (b) => {
                  let _ = t("GET_BEFORE_PREPARE_FILE")
                  _ && (b = _(c, b))
                  let y = () => {
                    e("COMPLETE_LOAD_ITEM", {
                      query: h,
                      item: c,
                      data: { source: a, success: l },
                    }),
                      yi(e, i)
                  }
                  if (b) {
                    e(
                      "REQUEST_PREPARE_OUTPUT",
                      {
                        query: h,
                        item: c,
                        success: (T) => {
                          e("DID_PREPARE_OUTPUT", { id: h, file: T }), y()
                        },
                      },
                      !0
                    )
                    return
                  }
                  y()
                }
              )
          }
          Ae("DID_LOAD_ITEM", c, { query: t, dispatch: e })
            .then(() => {
              Ua(t("GET_BEFORE_ADD_FILE"), ge(c)).then(I)
            })
            .catch((E) => {
              if (!E || !E.error || !E.status) return I(!1)
              e("DID_THROW_ITEM_INVALID", {
                id: h,
                error: E.error,
                status: E.status,
              })
            })
        }),
        c.on("process-start", () => {
          e("DID_START_ITEM_PROCESSING", { id: h })
        }),
        c.on("process-progress", (I) => {
          e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: h, progress: I })
        }),
        c.on("process-error", (I) => {
          e("DID_THROW_ITEM_PROCESSING_ERROR", {
            id: h,
            error: I,
            status: {
              main: jt(i.options.labelFileProcessingError)(I),
              sub: i.options.labelTapToRetry,
            },
          })
        }),
        c.on("process-revert-error", (I) => {
          e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
            id: h,
            error: I,
            status: {
              main: jt(i.options.labelFileProcessingRevertError)(I),
              sub: i.options.labelTapToRetry,
            },
          })
        }),
        c.on("process-complete", (I) => {
          e("DID_COMPLETE_ITEM_PROCESSING", {
            id: h,
            error: null,
            serverFileReference: I,
          }),
            e("DID_DEFINE_VALUE", { id: h, value: I })
        }),
        c.on("process-abort", () => {
          e("DID_ABORT_ITEM_PROCESSING", { id: h })
        }),
        c.on("process-revert", () => {
          e("DID_REVERT_ITEM_PROCESSING", { id: h }),
            e("DID_DEFINE_VALUE", { id: h, value: null })
        }),
        e("DID_ADD_ITEM", { id: h, index: n, interactionMethod: r }),
        yi(e, i)
      let { url: m, load: p, restore: f, fetch: g } = i.options.server || {}
      c.load(
        a,
        ss(
          u === se.INPUT
            ? pe(a) && Es(a) && g
              ? Ri(m, g)
              : Va
            : u === se.LIMBO
              ? Ri(m, f)
              : Ri(m, p)
        ),
        (I, E, b) => {
          Ae("LOAD_FILE", I, { query: t }).then(E).catch(b)
        }
      )
    },
    REQUEST_PREPARE_OUTPUT: ({
      item: a,
      success: n,
      failure: r = () => {},
    }) => {
      let l = { error: ie("error", 0, "Item not found"), file: null }
      if (a.archived) return r(l)
      Ae("PREPARE_OUTPUT", a.file, { query: t, item: a }).then((o) => {
        Ae("COMPLETE_PREPARE_OUTPUT", o, { query: t, item: a }).then((s) => {
          if (a.archived) return r(l)
          n(s)
        })
      })
    },
    COMPLETE_LOAD_ITEM: ({ item: a, data: n }) => {
      let { success: r, source: l } = n,
        o = t("GET_ITEM_INSERT_LOCATION")
      if (
        (qe(o) && l && Si(i, o),
        e("DID_LOAD_ITEM", {
          id: a.id,
          error: null,
          serverFileReference: a.origin === se.INPUT ? null : l,
        }),
        r(ge(a)),
        a.origin === se.LOCAL)
      ) {
        e("DID_LOAD_LOCAL_ITEM", { id: a.id })
        return
      }
      if (a.origin === se.LIMBO) {
        e("DID_COMPLETE_ITEM_PROCESSING", {
          id: a.id,
          error: null,
          serverFileReference: l,
        }),
          e("DID_DEFINE_VALUE", { id: a.id, value: a.serverId || l })
        return
      }
      t("IS_ASYNC") &&
        i.options.instantUpload &&
        e("REQUEST_ITEM_PROCESSING", { query: a.id })
    },
    RETRY_ITEM_LOAD: ye(i, (a) => {
      a.retryLoad()
    }),
    REQUEST_ITEM_PREPARE: ye(i, (a, n, r) => {
      e(
        "REQUEST_PREPARE_OUTPUT",
        {
          query: a.id,
          item: a,
          success: (l) => {
            e("DID_PREPARE_OUTPUT", { id: a.id, file: l }),
              n({ file: a, output: l })
          },
          failure: r,
        },
        !0
      )
    }),
    REQUEST_ITEM_PROCESSING: ye(i, (a, n, r) => {
      if (!(a.status === k.IDLE || a.status === k.PROCESSING_ERROR)) {
        let o = () =>
            e("REQUEST_ITEM_PROCESSING", { query: a, success: n, failure: r }),
          s = () => (document.hidden ? o() : setTimeout(o, 32))
        a.status === k.PROCESSING_COMPLETE ||
        a.status === k.PROCESSING_REVERT_ERROR
          ? a
              .revert(
                Lt(i.options.server.url, i.options.server.revert),
                t("GET_FORCE_REVERT")
              )
              .then(s)
              .catch(() => {})
          : a.status === k.PROCESSING && a.abortProcessing().then(s)
        return
      }
      a.status !== k.PROCESSING_QUEUED &&
        (a.requestProcessing(),
        e("DID_REQUEST_ITEM_PROCESSING", { id: a.id }),
        e("PROCESS_ITEM", { query: a, success: n, failure: r }, !0))
    }),
    PROCESS_ITEM: ye(i, (a, n, r) => {
      let l = t("GET_MAX_PARALLEL_UPLOADS")
      if (t("GET_ITEMS_BY_STATUS", k.PROCESSING).length === l) {
        i.processingQueue.push({ id: a.id, success: n, failure: r })
        return
      }
      if (a.status === k.PROCESSING) return
      let s = () => {
        let c = i.processingQueue.shift()
        if (!c) return
        let { id: d, success: h, failure: m } = c,
          p = je(i.items, d)
        if (!p || p.archived) {
          s()
          return
        }
        e("PROCESS_ITEM", { query: d, success: h, failure: m }, !0)
      }
      a.onOnce("process-complete", () => {
        n(ge(a)), s()
        let c = i.options.server
        if (i.options.instantUpload && a.origin === se.LOCAL && qe(c.remove)) {
          let m = () => {}
          ;(a.origin = se.LIMBO), i.options.server.remove(a.source, m, m)
        }
        t("GET_ITEMS_BY_STATUS", k.PROCESSING_COMPLETE).length ===
          i.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL")
      }),
        a.onOnce("process-error", (c) => {
          r({ error: c, file: ge(a) }), s()
        })
      let u = i.options
      a.process(
        ms(
          us(u.server.url, u.server.process, u.name, {
            chunkTransferId: a.transferId,
            chunkServer: u.server.patch,
            chunkUploads: u.chunkUploads,
            chunkForce: u.chunkForce,
            chunkSize: u.chunkSize,
            chunkRetryDelays: u.chunkRetryDelays,
          }),
          { allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION") }
        ),
        (c, d, h) => {
          Ae("PREPARE_OUTPUT", c, { query: t, item: a })
            .then((m) => {
              e("DID_PREPARE_OUTPUT", { id: a.id, file: m }), d(m)
            })
            .catch(h)
        }
      )
    }),
    RETRY_ITEM_PROCESSING: ye(i, (a) => {
      e("REQUEST_ITEM_PROCESSING", { query: a })
    }),
    REQUEST_REMOVE_ITEM: ye(i, (a) => {
      Ua(t("GET_BEFORE_REMOVE_FILE"), ge(a)).then((n) => {
        n && e("REMOVE_ITEM", { query: a })
      })
    }),
    RELEASE_ITEM: ye(i, (a) => {
      a.release()
    }),
    REMOVE_ITEM: ye(i, (a, n, r, l) => {
      let o = () => {
          let u = a.id
          Ba(i.items, u).archive(),
            e("DID_REMOVE_ITEM", { error: null, id: u, item: a }),
            yi(e, i),
            n(ge(a))
        },
        s = i.options.server
      a.origin === se.LOCAL && s && qe(s.remove) && l.remove !== !1
        ? (e("DID_START_ITEM_REMOVE", { id: a.id }),
          s.remove(
            a.source,
            () => o(),
            (u) => {
              e("DID_THROW_ITEM_REMOVE_ERROR", {
                id: a.id,
                error: ie("error", 0, u, null),
                status: {
                  main: jt(i.options.labelFileRemoveError)(u),
                  sub: i.options.labelTapToRetry,
                },
              })
            }
          ))
        : (((l.revert && a.origin !== se.LOCAL && a.serverId !== null) ||
            (i.options.chunkUploads && a.file.size > i.options.chunkSize) ||
            (i.options.chunkUploads && i.options.chunkForce)) &&
            a.revert(
              Lt(i.options.server.url, i.options.server.revert),
              t("GET_FORCE_REVERT")
            ),
          o())
    }),
    ABORT_ITEM_LOAD: ye(i, (a) => {
      a.abortLoad()
    }),
    ABORT_ITEM_PROCESSING: ye(i, (a) => {
      if (a.serverId) {
        e("REVERT_ITEM_PROCESSING", { id: a.id })
        return
      }
      a.abortProcessing().then(() => {
        i.options.instantUpload && e("REMOVE_ITEM", { query: a.id })
      })
    }),
    REQUEST_REVERT_ITEM_PROCESSING: ye(i, (a) => {
      if (!i.options.instantUpload) {
        e("REVERT_ITEM_PROCESSING", { query: a })
        return
      }
      let n = (o) => {
          o && e("REVERT_ITEM_PROCESSING", { query: a })
        },
        r = t("GET_BEFORE_REMOVE_FILE")
      if (!r) return n(!0)
      let l = r(ge(a))
      if (l == null) return n(!0)
      if (typeof l == "boolean") return n(l)
      typeof l.then == "function" && l.then(n)
    }),
    REVERT_ITEM_PROCESSING: ye(i, (a) => {
      a.revert(
        Lt(i.options.server.url, i.options.server.revert),
        t("GET_FORCE_REVERT")
      )
        .then(() => {
          ;(i.options.instantUpload || Ts(a)) &&
            e("REMOVE_ITEM", { query: a.id })
        })
        .catch(() => {})
    }),
    SET_OPTIONS: ({ options: a }) => {
      let n = Object.keys(a),
        r = Is.filter((o) => n.includes(o))
      ;[...r, ...Object.keys(a).filter((o) => !r.includes(o))].forEach((o) => {
        e(`SET_${li(o, "_").toUpperCase()}`, { value: a[o] })
      })
    },
  }),
  Is = ["server"],
  $i = (e) => e,
  Be = (e) => document.createElement(e),
  ae = (e, t) => {
    let i = e.childNodes[0]
    i
      ? t !== i.nodeValue && (i.nodeValue = t)
      : ((i = document.createTextNode(t)), e.appendChild(i))
  },
  ka = (e, t, i, a) => {
    let n = (((a % 360) - 90) * Math.PI) / 180
    return { x: e + i * Math.cos(n), y: t + i * Math.sin(n) }
  },
  _s = (e, t, i, a, n, r) => {
    let l = ka(e, t, i, n),
      o = ka(e, t, i, a)
    return ["M", l.x, l.y, "A", i, i, 0, r, 0, o.x, o.y].join(" ")
  },
  Rs = (e, t, i, a, n) => {
    let r = 1
    return (
      n > a && n - a <= 0.5 && (r = 0),
      a > n && a - n >= 0.5 && (r = 0),
      _s(e, t, i, Math.min(0.9999, a) * 360, Math.min(0.9999, n) * 360, r)
    )
  },
  ys = ({ root: e, props: t }) => {
    ;(t.spin = !1), (t.progress = 0), (t.opacity = 0)
    let i = ei("svg")
    ;(e.ref.path = ei("path", {
      "stroke-width": 2,
      "stroke-linecap": "round",
    })),
      i.appendChild(e.ref.path),
      (e.ref.svg = i),
      e.appendChild(i)
  },
  Ss = ({ root: e, props: t }) => {
    if (t.opacity === 0) return
    t.align && (e.element.dataset.align = t.align)
    let i = parseInt(ne(e.ref.path, "stroke-width"), 10),
      a = e.rect.element.width * 0.5,
      n = 0,
      r = 0
    t.spin ? ((n = 0), (r = 0.5)) : ((n = 0), (r = t.progress))
    let l = Rs(a, a, a - i, n, r)
    ne(e.ref.path, "d", l),
      ne(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0)
  },
  Ha = re({
    tag: "div",
    name: "progress-indicator",
    ignoreRectUpdate: !0,
    ignoreRect: !0,
    create: ys,
    write: Ss,
    mixins: {
      apis: ["progress", "spin", "align"],
      styles: ["opacity"],
      animations: {
        opacity: { type: "tween", duration: 500 },
        progress: { type: "spring", stiffness: 0.95, damping: 0.65, mass: 10 },
      },
    },
  }),
  ws = ({ root: e, props: t }) => {
    ;(e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`),
      (t.isDisabled = !1)
  },
  vs = ({ root: e, props: t }) => {
    let { isDisabled: i } = t,
      a = e.query("GET_DISABLED") || t.opacity === 0
    a && !i
      ? ((t.isDisabled = !0), ne(e.element, "disabled", "disabled"))
      : !a && i && ((t.isDisabled = !1), e.element.removeAttribute("disabled"))
  },
  Mn = re({
    tag: "button",
    attributes: { type: "button" },
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    name: "file-action-button",
    mixins: {
      apis: ["label"],
      styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
      animations: {
        scaleX: "spring",
        scaleY: "spring",
        translateX: "spring",
        translateY: "spring",
        opacity: { type: "tween", duration: 250 },
      },
      listeners: !0,
    },
    create: ws,
    write: vs,
  }),
  xn = (e, t = ".", i = 1e3, a = {}) => {
    let {
      labelBytes: n = "bytes",
      labelKilobytes: r = "KB",
      labelMegabytes: l = "MB",
      labelGigabytes: o = "GB",
    } = a
    e = Math.round(Math.abs(e))
    let s = i,
      u = i * i,
      c = i * i * i
    return e < s
      ? `${e} ${n}`
      : e < u
        ? `${Math.floor(e / s)} ${r}`
        : e < c
          ? `${Wa(e / u, 1, t)} ${l}`
          : `${Wa(e / c, 2, t)} ${o}`
  },
  Wa = (e, t, i) =>
    e
      .toFixed(t)
      .split(".")
      .filter((a) => a !== "0")
      .join(i),
  Ls = ({ root: e, props: t }) => {
    let i = Be("span")
    ;(i.className = "filepond--file-info-main"),
      ne(i, "aria-hidden", "true"),
      e.appendChild(i),
      (e.ref.fileName = i)
    let a = Be("span")
    ;(a.className = "filepond--file-info-sub"),
      e.appendChild(a),
      (e.ref.fileSize = a),
      ae(a, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")),
      ae(i, $i(e.query("GET_ITEM_NAME", t.id)))
  },
  xi = ({ root: e, props: t }) => {
    ae(
      e.ref.fileSize,
      xn(
        e.query("GET_ITEM_SIZE", t.id),
        ".",
        e.query("GET_FILE_SIZE_BASE"),
        e.query("GET_FILE_SIZE_LABELS", e.query)
      )
    ),
      ae(e.ref.fileName, $i(e.query("GET_ITEM_NAME", t.id)))
  },
  Ya = ({ root: e, props: t }) => {
    if (mt(e.query("GET_ITEM_SIZE", t.id))) {
      xi({ root: e, props: t })
      return
    }
    ae(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"))
  },
  As = re({
    name: "file-info",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: fe({
      DID_LOAD_ITEM: xi,
      DID_UPDATE_ITEM_META: xi,
      DID_THROW_ITEM_LOAD_ERROR: Ya,
      DID_THROW_ITEM_INVALID: Ya,
    }),
    didCreateView: (e) => {
      Je("CREATE_VIEW", { ...e, view: e })
    },
    create: Ls,
    mixins: {
      styles: ["translateX", "translateY"],
      animations: { translateX: "spring", translateY: "spring" },
    },
  }),
  On = (e) => Math.round(e * 100),
  Ms = ({ root: e }) => {
    let t = Be("span")
    ;(t.className = "filepond--file-status-main"),
      e.appendChild(t),
      (e.ref.main = t)
    let i = Be("span")
    ;(i.className = "filepond--file-status-sub"),
      e.appendChild(i),
      (e.ref.sub = i),
      Pn({ root: e, action: { progress: null } })
  },
  Pn = ({ root: e, action: t }) => {
    let i =
      t.progress === null
        ? e.query("GET_LABEL_FILE_LOADING")
        : `${e.query("GET_LABEL_FILE_LOADING")} ${On(t.progress)}%`
    ae(e.ref.main, i), ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"))
  },
  xs = ({ root: e, action: t }) => {
    let i =
      t.progress === null
        ? e.query("GET_LABEL_FILE_PROCESSING")
        : `${e.query("GET_LABEL_FILE_PROCESSING")} ${On(t.progress)}%`
    ae(e.ref.main, i), ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"))
  },
  Os = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")),
      ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"))
  },
  Ps = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")),
      ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"))
  },
  Ds = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")),
      ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"))
  },
  $a = ({ root: e }) => {
    ae(e.ref.main, ""), ae(e.ref.sub, "")
  },
  At = ({ root: e, action: t }) => {
    ae(e.ref.main, t.status.main), ae(e.ref.sub, t.status.sub)
  },
  Fs = re({
    name: "file-status",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: fe({
      DID_LOAD_ITEM: $a,
      DID_REVERT_ITEM_PROCESSING: $a,
      DID_REQUEST_ITEM_PROCESSING: Os,
      DID_ABORT_ITEM_PROCESSING: Ps,
      DID_COMPLETE_ITEM_PROCESSING: Ds,
      DID_UPDATE_ITEM_PROCESS_PROGRESS: xs,
      DID_UPDATE_ITEM_LOAD_PROGRESS: Pn,
      DID_THROW_ITEM_LOAD_ERROR: At,
      DID_THROW_ITEM_INVALID: At,
      DID_THROW_ITEM_PROCESSING_ERROR: At,
      DID_THROW_ITEM_PROCESSING_REVERT_ERROR: At,
      DID_THROW_ITEM_REMOVE_ERROR: At,
    }),
    didCreateView: (e) => {
      Je("CREATE_VIEW", { ...e, view: e })
    },
    create: Ms,
    mixins: {
      styles: ["translateX", "translateY", "opacity"],
      animations: {
        opacity: { type: "tween", duration: 250 },
        translateX: "spring",
        translateY: "spring",
      },
    },
  }),
  Oi = {
    AbortItemLoad: {
      label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
      action: "ABORT_ITEM_LOAD",
      className: "filepond--action-abort-item-load",
      align: "LOAD_INDICATOR_POSITION",
    },
    RetryItemLoad: {
      label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
      action: "RETRY_ITEM_LOAD",
      icon: "GET_ICON_RETRY",
      className: "filepond--action-retry-item-load",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RemoveItem: {
      label: "GET_LABEL_BUTTON_REMOVE_ITEM",
      action: "REQUEST_REMOVE_ITEM",
      icon: "GET_ICON_REMOVE",
      className: "filepond--action-remove-item",
      align: "BUTTON_REMOVE_ITEM_POSITION",
    },
    ProcessItem: {
      label: "GET_LABEL_BUTTON_PROCESS_ITEM",
      action: "REQUEST_ITEM_PROCESSING",
      icon: "GET_ICON_PROCESS",
      className: "filepond--action-process-item",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    AbortItemProcessing: {
      label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
      action: "ABORT_ITEM_PROCESSING",
      className: "filepond--action-abort-item-processing",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RetryItemProcessing: {
      label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
      action: "RETRY_ITEM_PROCESSING",
      icon: "GET_ICON_RETRY",
      className: "filepond--action-retry-item-processing",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RevertItemProcessing: {
      label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
      action: "REQUEST_REVERT_ITEM_PROCESSING",
      icon: "GET_ICON_UNDO",
      className: "filepond--action-revert-item-processing",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
  },
  Pi = []
te(Oi, (e) => {
  Pi.push(e)
})
var Ie = (e) => {
    if (Di(e) === "right") return 0
    let t = e.ref.buttonRemoveItem.rect.element
    return t.hidden ? null : t.width + t.left
  },
  Cs = (e) => e.ref.buttonAbortItemLoad.rect.element.width,
  Xt = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4),
  zs = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2),
  Ns = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION"),
  Bs = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"),
  Di = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"),
  Vs = {
    buttonAbortItemLoad: { opacity: 0 },
    buttonRetryItemLoad: { opacity: 0 },
    buttonRemoveItem: { opacity: 0 },
    buttonProcessItem: { opacity: 0 },
    buttonAbortItemProcessing: { opacity: 0 },
    buttonRetryItemProcessing: { opacity: 0 },
    buttonRevertItemProcessing: { opacity: 0 },
    loadProgressIndicator: { opacity: 0, align: Ns },
    processProgressIndicator: { opacity: 0, align: Bs },
    processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
    info: { translateX: 0, translateY: 0, opacity: 0 },
    status: { translateX: 0, translateY: 0, opacity: 0 },
  },
  qa = {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: Ie },
    status: { translateX: Ie },
  },
  wi = {
    buttonAbortItemProcessing: { opacity: 1 },
    processProgressIndicator: { opacity: 1 },
    status: { opacity: 1 },
  },
  st = {
    DID_THROW_ITEM_INVALID: {
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: Ie },
      status: { translateX: Ie, opacity: 1 },
    },
    DID_START_ITEM_LOAD: {
      buttonAbortItemLoad: { opacity: 1 },
      loadProgressIndicator: { opacity: 1 },
      status: { opacity: 1 },
    },
    DID_THROW_ITEM_LOAD_ERROR: {
      buttonRetryItemLoad: { opacity: 1 },
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: Ie },
      status: { opacity: 1 },
    },
    DID_START_ITEM_REMOVE: {
      processProgressIndicator: { opacity: 1, align: Di },
      info: { translateX: Ie },
      status: { opacity: 0 },
    },
    DID_THROW_ITEM_REMOVE_ERROR: {
      processProgressIndicator: { opacity: 0, align: Di },
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: Ie },
      status: { opacity: 1, translateX: Ie },
    },
    DID_LOAD_ITEM: qa,
    DID_LOAD_LOCAL_ITEM: {
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: Ie },
      status: { translateX: Ie },
    },
    DID_START_ITEM_PROCESSING: wi,
    DID_REQUEST_ITEM_PROCESSING: wi,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: wi,
    DID_COMPLETE_ITEM_PROCESSING: {
      buttonRevertItemProcessing: { opacity: 1 },
      info: { opacity: 1 },
      status: { opacity: 1 },
    },
    DID_THROW_ITEM_PROCESSING_ERROR: {
      buttonRemoveItem: { opacity: 1 },
      buttonRetryItemProcessing: { opacity: 1 },
      status: { opacity: 1 },
      info: { translateX: Ie },
    },
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
      buttonRevertItemProcessing: { opacity: 1 },
      status: { opacity: 1 },
      info: { opacity: 1 },
    },
    DID_ABORT_ITEM_PROCESSING: {
      buttonRemoveItem: { opacity: 1 },
      buttonProcessItem: { opacity: 1 },
      info: { translateX: Ie },
      status: { opacity: 1 },
    },
    DID_REVERT_ITEM_PROCESSING: qa,
  },
  Gs = re({
    create: ({ root: e }) => {
      e.element.innerHTML = e.query("GET_ICON_DONE")
    },
    name: "processing-complete-indicator",
    ignoreRect: !0,
    mixins: {
      styles: ["scaleX", "scaleY", "opacity"],
      animations: {
        scaleX: "spring",
        scaleY: "spring",
        opacity: { type: "tween", duration: 250 },
      },
    },
  }),
  Us = ({ root: e, props: t }) => {
    let i = Object.keys(Oi).reduce((p, f) => ((p[f] = { ...Oi[f] }), p), {}),
      { id: a } = t,
      n = e.query("GET_ALLOW_REVERT"),
      r = e.query("GET_ALLOW_REMOVE"),
      l = e.query("GET_ALLOW_PROCESS"),
      o = e.query("GET_INSTANT_UPLOAD"),
      s = e.query("IS_ASYNC"),
      u = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN"),
      c
    s
      ? l && !n
        ? (c = (p) => !/RevertItemProcessing/.test(p))
        : !l && n
          ? (c = (p) =>
              !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(p))
          : !l && !n && (c = (p) => !/Process/.test(p))
      : (c = (p) => !/Process/.test(p))
    let d = c ? Pi.filter(c) : Pi.concat()
    if (
      (o &&
        n &&
        ((i.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM"),
        (i.RevertItemProcessing.icon = "GET_ICON_REMOVE")),
      s && !n)
    ) {
      let p = st.DID_COMPLETE_ITEM_PROCESSING
      ;(p.info.translateX = zs),
        (p.info.translateY = Xt),
        (p.status.translateY = Xt),
        (p.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 })
    }
    if (
      (s &&
        !l &&
        ([
          "DID_START_ITEM_PROCESSING",
          "DID_REQUEST_ITEM_PROCESSING",
          "DID_UPDATE_ITEM_PROCESS_PROGRESS",
          "DID_THROW_ITEM_PROCESSING_ERROR",
        ].forEach((p) => {
          st[p].status.translateY = Xt
        }),
        (st.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Cs)),
      u && n)
    ) {
      i.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION"
      let p = st.DID_COMPLETE_ITEM_PROCESSING
      ;(p.info.translateX = Ie),
        (p.status.translateY = Xt),
        (p.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 })
    }
    r || (i.RemoveItem.disabled = !0),
      te(i, (p, f) => {
        let g = e.createChildView(Mn, {
          label: e.query(f.label),
          icon: e.query(f.icon),
          opacity: 0,
        })
        d.includes(p) && e.appendChildView(g),
          f.disabled &&
            (g.element.setAttribute("disabled", "disabled"),
            g.element.setAttribute("hidden", "hidden")),
          (g.element.dataset.align = e.query(`GET_STYLE_${f.align}`)),
          g.element.classList.add(f.className),
          g.on("click", (I) => {
            I.stopPropagation(),
              !f.disabled && e.dispatch(f.action, { query: a })
          }),
          (e.ref[`button${p}`] = g)
      }),
      (e.ref.processingCompleteIndicator = e.appendChildView(
        e.createChildView(Gs)
      )),
      (e.ref.processingCompleteIndicator.element.dataset.align = e.query(
        "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"
      )),
      (e.ref.info = e.appendChildView(e.createChildView(As, { id: a }))),
      (e.ref.status = e.appendChildView(e.createChildView(Fs, { id: a })))
    let h = e.appendChildView(
      e.createChildView(Ha, {
        opacity: 0,
        align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION"),
      })
    )
    h.element.classList.add("filepond--load-indicator"),
      (e.ref.loadProgressIndicator = h)
    let m = e.appendChildView(
      e.createChildView(Ha, {
        opacity: 0,
        align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"),
      })
    )
    m.element.classList.add("filepond--process-indicator"),
      (e.ref.processProgressIndicator = m),
      (e.ref.activeStyles = [])
  },
  ks = ({ root: e, actions: t, props: i }) => {
    Hs({ root: e, actions: t, props: i })
    let a = t
      .concat()
      .filter((n) => /^DID_/.test(n.type))
      .reverse()
      .find((n) => st[n.type])
    if (a) {
      e.ref.activeStyles = []
      let n = st[a.type]
      te(Vs, (r, l) => {
        let o = e.ref[r]
        te(l, (s, u) => {
          let c = n[r] && typeof n[r][s] < "u" ? n[r][s] : u
          e.ref.activeStyles.push({ control: o, key: s, value: c })
        })
      })
    }
    e.ref.activeStyles.forEach(({ control: n, key: r, value: l }) => {
      n[r] = typeof l == "function" ? l(e) : l
    })
  },
  Hs = fe({
    DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
      e.ref.buttonAbortItemProcessing.label = t.value
    },
    DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: e, action: t }) => {
      e.ref.buttonAbortItemLoad.label = t.value
    },
    DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: e, action: t }) => {
      e.ref.buttonAbortItemRemoval.label = t.value
    },
    DID_REQUEST_ITEM_PROCESSING: ({ root: e }) => {
      ;(e.ref.processProgressIndicator.spin = !0),
        (e.ref.processProgressIndicator.progress = 0)
    },
    DID_START_ITEM_LOAD: ({ root: e }) => {
      ;(e.ref.loadProgressIndicator.spin = !0),
        (e.ref.loadProgressIndicator.progress = 0)
    },
    DID_START_ITEM_REMOVE: ({ root: e }) => {
      ;(e.ref.processProgressIndicator.spin = !0),
        (e.ref.processProgressIndicator.progress = 0)
    },
    DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: e, action: t }) => {
      ;(e.ref.loadProgressIndicator.spin = !1),
        (e.ref.loadProgressIndicator.progress = t.progress)
    },
    DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: e, action: t }) => {
      ;(e.ref.processProgressIndicator.spin = !1),
        (e.ref.processProgressIndicator.progress = t.progress)
    },
  }),
  Ws = re({
    create: Us,
    write: ks,
    didCreateView: (e) => {
      Je("CREATE_VIEW", { ...e, view: e })
    },
    name: "file",
  }),
  Ys = ({ root: e, props: t }) => {
    ;(e.ref.fileName = Be("legend")),
      e.appendChild(e.ref.fileName),
      (e.ref.file = e.appendChildView(e.createChildView(Ws, { id: t.id }))),
      (e.ref.data = !1)
  },
  $s = ({ root: e, props: t }) => {
    ae(e.ref.fileName, $i(e.query("GET_ITEM_NAME", t.id)))
  },
  qs = re({
    create: Ys,
    ignoreRect: !0,
    write: fe({ DID_LOAD_ITEM: $s }),
    didCreateView: (e) => {
      Je("CREATE_VIEW", { ...e, view: e })
    },
    tag: "fieldset",
    name: "file-wrapper",
  }),
  ja = { type: "spring", damping: 0.6, mass: 7 },
  js = ({ root: e, props: t }) => {
    ;[
      { name: "top" },
      {
        name: "center",
        props: { translateY: null, scaleY: null },
        mixins: {
          animations: { scaleY: ja },
          styles: ["translateY", "scaleY"],
        },
      },
      {
        name: "bottom",
        props: { translateY: null },
        mixins: { animations: { translateY: ja }, styles: ["translateY"] },
      },
    ].forEach((i) => {
      Xs(e, i, t.name)
    }),
      e.element.classList.add(`filepond--${t.name}`),
      (e.ref.scalable = null)
  },
  Xs = (e, t, i) => {
    let a = re({
        name: `panel-${t.name} filepond--${i}`,
        mixins: t.mixins,
        ignoreRectUpdate: !0,
      }),
      n = e.createChildView(a, t.props)
    e.ref[t.name] = e.appendChildView(n)
  },
  Qs = ({ root: e, props: t }) => {
    if (
      ((e.ref.scalable === null || t.scalable !== e.ref.scalable) &&
        ((e.ref.scalable = mn(t.scalable) ? t.scalable : !0),
        (e.element.dataset.scalable = e.ref.scalable)),
      !t.height)
    )
      return
    let i = e.ref.top.rect.element,
      a = e.ref.bottom.rect.element,
      n = Math.max(i.height + a.height, t.height)
    ;(e.ref.center.translateY = i.height),
      (e.ref.center.scaleY = (n - i.height - a.height) / 100),
      (e.ref.bottom.translateY = n - a.height)
  },
  Dn = re({
    name: "panel",
    read: ({ root: e, props: t }) =>
      (t.heightCurrent = e.ref.bottom.translateY),
    write: Qs,
    create: js,
    ignoreRect: !0,
    mixins: { apis: ["height", "heightCurrent", "scalable"] },
  }),
  Zs = (e) => {
    let t = e.map((a) => a.id),
      i
    return {
      setIndex: (a) => {
        i = a
      },
      getIndex: () => i,
      getItemIndex: (a) => t.indexOf(a.id),
    }
  },
  Xa = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 },
  Qa = "spring",
  Za = {
    DID_START_ITEM_LOAD: "busy",
    DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
    DID_THROW_ITEM_INVALID: "load-invalid",
    DID_THROW_ITEM_LOAD_ERROR: "load-error",
    DID_LOAD_ITEM: "idle",
    DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
    DID_START_ITEM_REMOVE: "busy",
    DID_START_ITEM_PROCESSING: "busy processing",
    DID_REQUEST_ITEM_PROCESSING: "busy processing",
    DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
    DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
    DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
    DID_ABORT_ITEM_PROCESSING: "cancelled",
    DID_REVERT_ITEM_PROCESSING: "idle",
  },
  Ks = ({ root: e, props: t }) => {
    if (
      ((e.ref.handleClick = (a) =>
        e.dispatch("DID_ACTIVATE_ITEM", { id: t.id })),
      (e.element.id = `filepond--item-${t.id}`),
      e.element.addEventListener("click", e.ref.handleClick),
      (e.ref.container = e.appendChildView(
        e.createChildView(qs, { id: t.id })
      )),
      (e.ref.panel = e.appendChildView(
        e.createChildView(Dn, { name: "item-panel" })
      )),
      (e.ref.panel.height = null),
      (t.markedForRemoval = !1),
      !e.query("GET_ALLOW_REORDER"))
    )
      return
    e.element.dataset.dragState = "idle"
    let i = (a) => {
      if (!a.isPrimary) return
      let n = !1,
        r = { x: a.pageX, y: a.pageY }
      ;(t.dragOrigin = { x: e.translateX, y: e.translateY }),
        (t.dragCenter = { x: a.offsetX, y: a.offsetY })
      let l = Zs(e.query("GET_ACTIVE_ITEMS"))
      e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: l })
      let o = (d) => {
          if (!d.isPrimary) return
          d.stopPropagation(),
            d.preventDefault(),
            (t.dragOffset = { x: d.pageX - r.x, y: d.pageY - r.y }),
            t.dragOffset.x * t.dragOffset.x + t.dragOffset.y * t.dragOffset.y >
              16 &&
              !n &&
              ((n = !0),
              e.element.removeEventListener("click", e.ref.handleClick)),
            e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: l })
        },
        s = (d) => {
          d.isPrimary &&
            ((t.dragOffset = { x: d.pageX - r.x, y: d.pageY - r.y }), c())
        },
        u = () => {
          c()
        },
        c = () => {
          document.removeEventListener("pointercancel", u),
            document.removeEventListener("pointermove", o),
            document.removeEventListener("pointerup", s),
            e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: l }),
            n &&
              setTimeout(
                () => e.element.addEventListener("click", e.ref.handleClick),
                0
              )
        }
      document.addEventListener("pointercancel", u),
        document.addEventListener("pointermove", o),
        document.addEventListener("pointerup", s)
    }
    e.element.addEventListener("pointerdown", i)
  },
  Js = fe({
    DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
      e.height = t.height
    },
  }),
  ec = fe(
    {
      DID_GRAB_ITEM: ({ root: e, props: t }) => {
        t.dragOrigin = { x: e.translateX, y: e.translateY }
      },
      DID_DRAG_ITEM: ({ root: e }) => {
        e.element.dataset.dragState = "drag"
      },
      DID_DROP_ITEM: ({ root: e, props: t }) => {
        ;(t.dragOffset = null),
          (t.dragOrigin = null),
          (e.element.dataset.dragState = "drop")
      },
    },
    ({ root: e, actions: t, props: i, shouldOptimize: a }) => {
      e.element.dataset.dragState === "drop" &&
        e.scaleX <= 1 &&
        (e.element.dataset.dragState = "idle")
      let n = t
        .concat()
        .filter((l) => /^DID_/.test(l.type))
        .reverse()
        .find((l) => Za[l.type])
      n &&
        n.type !== i.currentState &&
        ((i.currentState = n.type),
        (e.element.dataset.filepondItemState = Za[i.currentState] || ""))
      let r =
        e.query("GET_ITEM_PANEL_ASPECT_RATIO") ||
        e.query("GET_PANEL_ASPECT_RATIO")
      r
        ? a || (e.height = e.rect.element.width * r)
        : (Js({ root: e, actions: t, props: i }),
          !e.height &&
            e.ref.container.rect.element.height > 0 &&
            (e.height = e.ref.container.rect.element.height)),
        a && (e.ref.panel.height = null),
        (e.ref.panel.height = e.height)
    }
  ),
  tc = re({
    create: Ks,
    write: ec,
    destroy: ({ root: e, props: t }) => {
      e.element.removeEventListener("click", e.ref.handleClick),
        e.dispatch("RELEASE_ITEM", { query: t.id })
    },
    tag: "li",
    name: "item",
    mixins: {
      apis: [
        "id",
        "interactionMethod",
        "markedForRemoval",
        "spawnDate",
        "dragCenter",
        "dragOrigin",
        "dragOffset",
      ],
      styles: [
        "translateX",
        "translateY",
        "scaleX",
        "scaleY",
        "opacity",
        "height",
      ],
      animations: {
        scaleX: Qa,
        scaleY: Qa,
        translateX: Xa,
        translateY: Xa,
        opacity: { type: "tween", duration: 150 },
      },
    },
  }),
  qi = (e, t) => Math.max(1, Math.floor((e + 1) / t)),
  ji = (e, t, i) => {
    if (!i) return
    let a = e.rect.element.width,
      n = t.length,
      r = null
    if (n === 0 || i.top < t[0].rect.element.top) return -1
    let o = t[0].rect.element,
      s = o.marginLeft + o.marginRight,
      u = o.width + s,
      c = qi(a, u)
    if (c === 1) {
      for (let m = 0; m < n; m++) {
        let p = t[m],
          f = p.rect.outer.top + p.rect.element.height * 0.5
        if (i.top < f) return m
      }
      return n
    }
    let d = o.marginTop + o.marginBottom,
      h = o.height + d
    for (let m = 0; m < n; m++) {
      let p = m % c,
        f = Math.floor(m / c),
        g = p * u,
        I = f * h,
        E = I - o.marginTop,
        b = g + u,
        _ = I + h + o.marginBottom
      if (i.top < _ && i.top > E) {
        if (i.left < b) return m
        m !== n - 1 ? (r = m) : (r = null)
      }
    }
    return r !== null ? r : n
  },
  Qt = {
    height: 0,
    width: 0,
    get getHeight() {
      return this.height
    },
    set setHeight(e) {
      ;(this.height === 0 || e === 0) && (this.height = e)
    },
    get getWidth() {
      return this.width
    },
    set setWidth(e) {
      ;(this.width === 0 || e === 0) && (this.width = e)
    },
    setDimensions: function (e, t) {
      ;(this.height === 0 || e === 0) && (this.height = e),
        (this.width === 0 || t === 0) && (this.width = t)
    },
  },
  ic = ({ root: e }) => {
    ne(e.element, "role", "list"), (e.ref.lastItemSpanwDate = Date.now())
  },
  ac = ({ root: e, action: t }) => {
    let { id: i, index: a, interactionMethod: n } = t
    e.ref.addIndex = a
    let r = Date.now(),
      l = r,
      o = 1
    if (n !== Se.NONE) {
      o = 0
      let s = e.query("GET_ITEM_INSERT_INTERVAL"),
        u = r - e.ref.lastItemSpanwDate
      l = u < s ? r + (s - u) : r
    }
    ;(e.ref.lastItemSpanwDate = l),
      e.appendChildView(
        e.createChildView(tc, {
          spawnDate: l,
          id: i,
          opacity: o,
          interactionMethod: n,
        }),
        a
      )
  },
  Ka = (e, t, i, a = 0, n = 1) => {
    e.dragOffset
      ? ((e.translateX = null),
        (e.translateY = null),
        (e.translateX = e.dragOrigin.x + e.dragOffset.x),
        (e.translateY = e.dragOrigin.y + e.dragOffset.y),
        (e.scaleX = 1.025),
        (e.scaleY = 1.025))
      : ((e.translateX = t),
        (e.translateY = i),
        Date.now() > e.spawnDate &&
          (e.opacity === 0 && nc(e, t, i, a, n),
          (e.scaleX = 1),
          (e.scaleY = 1),
          (e.opacity = 1)))
  },
  nc = (e, t, i, a, n) => {
    e.interactionMethod === Se.NONE
      ? ((e.translateX = null),
        (e.translateX = t),
        (e.translateY = null),
        (e.translateY = i))
      : e.interactionMethod === Se.DROP
        ? ((e.translateX = null),
          (e.translateX = t - a * 20),
          (e.translateY = null),
          (e.translateY = i - n * 10),
          (e.scaleX = 0.8),
          (e.scaleY = 0.8))
        : e.interactionMethod === Se.BROWSE
          ? ((e.translateY = null), (e.translateY = i - 30))
          : e.interactionMethod === Se.API &&
            ((e.translateX = null),
            (e.translateX = t - 30),
            (e.translateY = null))
  },
  rc = ({ root: e, action: t }) => {
    let { id: i } = t,
      a = e.childViews.find((n) => n.id === i)
    a &&
      ((a.scaleX = 0.9),
      (a.scaleY = 0.9),
      (a.opacity = 0),
      (a.markedForRemoval = !0))
  },
  vi = (e) =>
    e.rect.element.height +
    e.rect.element.marginBottom * 0.5 +
    e.rect.element.marginTop * 0.5,
  lc = (e) =>
    e.rect.element.width +
    e.rect.element.marginLeft * 0.5 +
    e.rect.element.marginRight * 0.5,
  oc = ({ root: e, action: t }) => {
    let { id: i, dragState: a } = t,
      n = e.query("GET_ITEM", { id: i }),
      r = e.childViews.find((g) => g.id === i),
      l = e.childViews.length,
      o = a.getItemIndex(n)
    if (!r) return
    let s = {
        x: r.dragOrigin.x + r.dragOffset.x + r.dragCenter.x,
        y: r.dragOrigin.y + r.dragOffset.y + r.dragCenter.y,
      },
      u = vi(r),
      c = lc(r),
      d = Math.floor(e.rect.outer.width / c)
    d > l && (d = l)
    let h = Math.floor(l / d + 1)
    ;(Qt.setHeight = u * h), (Qt.setWidth = c * d)
    var m = {
      y: Math.floor(s.y / u),
      x: Math.floor(s.x / c),
      getGridIndex: function () {
        return s.y > Qt.getHeight || s.y < 0 || s.x > Qt.getWidth || s.x < 0
          ? o
          : this.y * d + this.x
      },
      getColIndex: function () {
        let I = e.query("GET_ACTIVE_ITEMS"),
          E = e.childViews.filter((O) => O.rect.element.height),
          b = I.map((O) => E.find((x) => x.id === O.id)),
          _ = b.findIndex((O) => O === r),
          y = vi(r),
          T = b.length,
          v = T,
          R = 0,
          S = 0,
          P = 0
        for (let O = 0; O < T; O++)
          if (((R = vi(b[O])), (P = S), (S = P + R), s.y < S)) {
            if (_ > O) {
              if (s.y < P + y) {
                v = O
                break
              }
              continue
            }
            v = O
            break
          }
        return v
      },
    }
    let p = d > 1 ? m.getGridIndex() : m.getColIndex()
    e.dispatch("MOVE_ITEM", { query: r, index: p })
    let f = a.getIndex()
    if (f === void 0 || f !== p) {
      if ((a.setIndex(p), f === void 0)) return
      e.dispatch("DID_REORDER_ITEMS", {
        items: e.query("GET_ACTIVE_ITEMS"),
        origin: o,
        target: p,
      })
    }
  },
  sc = fe({ DID_ADD_ITEM: ac, DID_REMOVE_ITEM: rc, DID_DRAG_ITEM: oc }),
  cc = ({ root: e, props: t, actions: i, shouldOptimize: a }) => {
    sc({ root: e, props: t, actions: i })
    let { dragCoordinates: n } = t,
      r = e.rect.element.width,
      l = e.childViews.filter((b) => b.rect.element.height),
      o = e
        .query("GET_ACTIVE_ITEMS")
        .map((b) => l.find((_) => _.id === b.id))
        .filter((b) => b),
      s = n ? ji(e, o, n) : null,
      u = e.ref.addIndex || null
    e.ref.addIndex = null
    let c = 0,
      d = 0,
      h = 0
    if (o.length === 0) return
    let m = o[0].rect.element,
      p = m.marginTop + m.marginBottom,
      f = m.marginLeft + m.marginRight,
      g = m.width + f,
      I = m.height + p,
      E = qi(r, g)
    if (E === 1) {
      let b = 0,
        _ = 0
      o.forEach((y, T) => {
        if (s) {
          let S = T - s
          S === -2
            ? (_ = -p * 0.25)
            : S === -1
              ? (_ = -p * 0.75)
              : S === 0
                ? (_ = p * 0.75)
                : S === 1
                  ? (_ = p * 0.25)
                  : (_ = 0)
        }
        a && ((y.translateX = null), (y.translateY = null)),
          y.markedForRemoval || Ka(y, 0, b + _)
        let R =
          (y.rect.element.height + p) * (y.markedForRemoval ? y.opacity : 1)
        b += R
      })
    } else {
      let b = 0,
        _ = 0
      o.forEach((y, T) => {
        T === s && (c = 1),
          T === u && (h += 1),
          y.markedForRemoval && y.opacity < 0.5 && (d -= 1)
        let v = T + h + c + d,
          R = v % E,
          S = Math.floor(v / E),
          P = R * g,
          O = S * I,
          x = Math.sign(P - b),
          z = Math.sign(O - _)
        ;(b = P),
          (_ = O),
          !y.markedForRemoval &&
            (a && ((y.translateX = null), (y.translateY = null)),
            Ka(y, P, O, x, z))
      })
    }
  },
  dc = (e, t) =>
    t.filter((i) => (i.data && i.data.id ? e.id === i.data.id : !0)),
  uc = re({
    create: ic,
    write: cc,
    tag: "ul",
    name: "list",
    didWriteView: ({ root: e }) => {
      e.childViews
        .filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting)
        .forEach((t) => {
          t._destroy(), e.removeChildView(t)
        })
    },
    filterFrameActionsForChild: dc,
    mixins: { apis: ["dragCoordinates"] },
  }),
  hc = ({ root: e, props: t }) => {
    ;(e.ref.list = e.appendChildView(e.createChildView(uc))),
      (t.dragCoordinates = null),
      (t.overflowing = !1)
  },
  mc = ({ root: e, props: t, action: i }) => {
    e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") &&
      (t.dragCoordinates = {
        left: i.position.scopeLeft - e.ref.list.rect.element.left,
        top:
          i.position.scopeTop -
          (e.rect.outer.top +
            e.rect.element.marginTop +
            e.rect.element.scrollTop),
      })
  },
  pc = ({ props: e }) => {
    e.dragCoordinates = null
  },
  fc = fe({ DID_DRAG: mc, DID_END_DRAG: pc }),
  gc = ({ root: e, props: t, actions: i }) => {
    if (
      (fc({ root: e, props: t, actions: i }),
      (e.ref.list.dragCoordinates = t.dragCoordinates),
      t.overflowing &&
        !t.overflow &&
        ((t.overflowing = !1),
        (e.element.dataset.state = ""),
        (e.height = null)),
      t.overflow)
    ) {
      let a = Math.round(t.overflow)
      a !== e.height &&
        ((t.overflowing = !0),
        (e.element.dataset.state = "overflow"),
        (e.height = a))
    }
  },
  Ec = re({
    create: hc,
    write: gc,
    name: "list-scroller",
    mixins: {
      apis: ["overflow", "dragCoordinates"],
      styles: ["height", "translateY"],
      animations: { translateY: "spring" },
    },
  }),
  xe = (e, t, i, a = "") => {
    i ? ne(e, t, a) : e.removeAttribute(t)
  },
  Tc = (e) => {
    if (!(!e || e.value === "")) {
      try {
        e.value = ""
      } catch {}
      if (e.value) {
        let t = Be("form"),
          i = e.parentNode,
          a = e.nextSibling
        t.appendChild(e), t.reset(), a ? i.insertBefore(e, a) : i.appendChild(e)
      }
    }
  },
  bc = ({ root: e, props: t }) => {
    ;(e.element.id = `filepond--browser-${t.id}`),
      ne(e.element, "name", e.query("GET_NAME")),
      ne(e.element, "aria-controls", `filepond--assistant-${t.id}`),
      ne(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`),
      Fn({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }),
      Cn({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }),
      zn({ root: e, action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") } }),
      Fi({ root: e }),
      Nn({ root: e, action: { value: e.query("GET_REQUIRED") } }),
      Bn({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }),
      (e.ref.handleChange = (i) => {
        if (!e.element.value) return
        let a = Array.from(e.element.files).map(
          (n) => ((n._relativePath = n.webkitRelativePath), n)
        )
        setTimeout(() => {
          t.onload(a), Tc(e.element)
        }, 250)
      }),
      e.element.addEventListener("change", e.ref.handleChange)
  },
  Fn = ({ root: e, action: t }) => {
    e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") &&
      xe(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "")
  },
  Cn = ({ root: e, action: t }) => {
    xe(e.element, "multiple", t.value)
  },
  zn = ({ root: e, action: t }) => {
    xe(e.element, "webkitdirectory", t.value)
  },
  Fi = ({ root: e }) => {
    let t = e.query("GET_DISABLED"),
      i = e.query("GET_ALLOW_BROWSE"),
      a = t || !i
    xe(e.element, "disabled", a)
  },
  Nn = ({ root: e, action: t }) => {
    t.value
      ? e.query("GET_TOTAL_ITEMS") === 0 && xe(e.element, "required", !0)
      : xe(e.element, "required", !1)
  },
  Bn = ({ root: e, action: t }) => {
    xe(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value)
  },
  Ja = ({ root: e }) => {
    let { element: t } = e
    e.query("GET_TOTAL_ITEMS") > 0
      ? (xe(t, "required", !1), xe(t, "name", !1))
      : (xe(t, "name", !0, e.query("GET_NAME")),
        e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""),
        e.query("GET_REQUIRED") && xe(t, "required", !0))
  },
  Ic = ({ root: e }) => {
    e.query("GET_CHECK_VALIDITY") &&
      e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"))
  },
  _c = re({
    tag: "input",
    name: "browser",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    attributes: { type: "file" },
    create: bc,
    destroy: ({ root: e }) => {
      e.element.removeEventListener("change", e.ref.handleChange)
    },
    write: fe({
      DID_LOAD_ITEM: Ja,
      DID_REMOVE_ITEM: Ja,
      DID_THROW_ITEM_INVALID: Ic,
      DID_SET_DISABLED: Fi,
      DID_SET_ALLOW_BROWSE: Fi,
      DID_SET_ALLOW_DIRECTORIES_ONLY: zn,
      DID_SET_ALLOW_MULTIPLE: Cn,
      DID_SET_ACCEPTED_FILE_TYPES: Fn,
      DID_SET_CAPTURE_METHOD: Bn,
      DID_SET_REQUIRED: Nn,
    }),
  }),
  en = { ENTER: 13, SPACE: 32 },
  Rc = ({ root: e, props: t }) => {
    let i = Be("label")
    ne(i, "for", `filepond--browser-${t.id}`),
      ne(i, "id", `filepond--drop-label-${t.id}`),
      ne(i, "aria-hidden", "true"),
      (e.ref.handleKeyDown = (a) => {
        ;(a.keyCode === en.ENTER || a.keyCode === en.SPACE) &&
          (a.preventDefault(), e.ref.label.click())
      }),
      (e.ref.handleClick = (a) => {
        a.target === i || i.contains(a.target) || e.ref.label.click()
      }),
      i.addEventListener("keydown", e.ref.handleKeyDown),
      e.element.addEventListener("click", e.ref.handleClick),
      Vn(i, t.caption),
      e.appendChild(i),
      (e.ref.label = i)
  },
  Vn = (e, t) => {
    e.innerHTML = t
    let i = e.querySelector(".filepond--label-action")
    return i && ne(i, "tabindex", "0"), t
  },
  yc = re({
    name: "drop-label",
    ignoreRect: !0,
    create: Rc,
    destroy: ({ root: e }) => {
      e.ref.label.addEventListener("keydown", e.ref.handleKeyDown),
        e.element.removeEventListener("click", e.ref.handleClick)
    },
    write: fe({
      DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
        Vn(e.ref.label, t.value)
      },
    }),
    mixins: {
      styles: ["opacity", "translateX", "translateY"],
      animations: {
        opacity: { type: "tween", duration: 150 },
        translateX: "spring",
        translateY: "spring",
      },
    },
  }),
  Sc = re({
    name: "drip-blob",
    ignoreRect: !0,
    mixins: {
      styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
      animations: {
        scaleX: "spring",
        scaleY: "spring",
        translateX: "spring",
        translateY: "spring",
        opacity: { type: "tween", duration: 250 },
      },
    },
  }),
  wc = ({ root: e }) => {
    let t = e.rect.element.width * 0.5,
      i = e.rect.element.height * 0.5
    e.ref.blob = e.appendChildView(
      e.createChildView(Sc, {
        opacity: 0,
        scaleX: 2.5,
        scaleY: 2.5,
        translateX: t,
        translateY: i,
      })
    )
  },
  vc = ({ root: e, action: t }) => {
    if (!e.ref.blob) {
      wc({ root: e })
      return
    }
    ;(e.ref.blob.translateX = t.position.scopeLeft),
      (e.ref.blob.translateY = t.position.scopeTop),
      (e.ref.blob.scaleX = 1),
      (e.ref.blob.scaleY = 1),
      (e.ref.blob.opacity = 1)
  },
  Lc = ({ root: e }) => {
    e.ref.blob && (e.ref.blob.opacity = 0)
  },
  Ac = ({ root: e }) => {
    e.ref.blob &&
      ((e.ref.blob.scaleX = 2.5),
      (e.ref.blob.scaleY = 2.5),
      (e.ref.blob.opacity = 0))
  },
  Mc = ({ root: e, props: t, actions: i }) => {
    xc({ root: e, props: t, actions: i })
    let { blob: a } = e.ref
    i.length === 0 &&
      a &&
      a.opacity === 0 &&
      (e.removeChildView(a), (e.ref.blob = null))
  },
  xc = fe({ DID_DRAG: vc, DID_DROP: Ac, DID_END_DRAG: Lc }),
  Oc = re({ ignoreRect: !0, ignoreRectUpdate: !0, name: "drip", write: Mc }),
  Gn = (e, t) => {
    try {
      let i = new DataTransfer()
      t.forEach((a) => {
        a instanceof File
          ? i.items.add(a)
          : i.items.add(new File([a], a.name, { type: a.type }))
      }),
        (e.files = i.files)
    } catch {
      return !1
    }
    return !0
  },
  Pc = ({ root: e }) => (e.ref.fields = {}),
  ci = (e, t) => e.ref.fields[t],
  Xi = (e) => {
    e.query("GET_ACTIVE_ITEMS").forEach((t) => {
      e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id])
    })
  },
  tn = ({ root: e }) => Xi(e),
  Dc = ({ root: e, action: t }) => {
    let n =
        !(e.query("GET_ITEM", t.id).origin === se.LOCAL) &&
        e.query("SHOULD_UPDATE_FILE_INPUT"),
      r = Be("input")
    ;(r.type = n ? "file" : "hidden"),
      (r.name = e.query("GET_NAME")),
      (r.disabled = e.query("GET_DISABLED")),
      (e.ref.fields[t.id] = r),
      Xi(e)
  },
  Fc = ({ root: e, action: t }) => {
    let i = ci(e, t.id)
    if (
      !i ||
      (t.serverFileReference !== null && (i.value = t.serverFileReference),
      !e.query("SHOULD_UPDATE_FILE_INPUT"))
    )
      return
    let a = e.query("GET_ITEM", t.id)
    Gn(i, [a.file])
  },
  Cc = ({ root: e, action: t }) => {
    e.query("SHOULD_UPDATE_FILE_INPUT") &&
      setTimeout(() => {
        let i = ci(e, t.id)
        i && Gn(i, [t.file])
      }, 0)
  },
  zc = ({ root: e }) => {
    e.element.disabled = e.query("GET_DISABLED")
  },
  Nc = ({ root: e, action: t }) => {
    let i = ci(e, t.id)
    i &&
      (i.parentNode && i.parentNode.removeChild(i), delete e.ref.fields[t.id])
  },
  Bc = ({ root: e, action: t }) => {
    let i = ci(e, t.id)
    i &&
      (t.value === null
        ? i.removeAttribute("value")
        : i.type != "file" && (i.value = t.value),
      Xi(e))
  },
  Vc = fe({
    DID_SET_DISABLED: zc,
    DID_ADD_ITEM: Dc,
    DID_LOAD_ITEM: Fc,
    DID_REMOVE_ITEM: Nc,
    DID_DEFINE_VALUE: Bc,
    DID_PREPARE_OUTPUT: Cc,
    DID_REORDER_ITEMS: tn,
    DID_SORT_ITEMS: tn,
  }),
  Gc = re({
    tag: "fieldset",
    name: "data",
    create: Pc,
    write: Vc,
    ignoreRect: !0,
  }),
  Uc = (e) => ("getRootNode" in e ? e.getRootNode() : document),
  kc = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"],
  Hc = ["css", "csv", "html", "txt"],
  Wc = { zip: "zip|compressed", epub: "application/epub+zip" },
  Un = (e = "") => (
    (e = e.toLowerCase()),
    kc.includes(e)
      ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e)
      : Hc.includes(e)
        ? "text/" + e
        : Wc[e] || ""
  ),
  Qi = (e) =>
    new Promise((t, i) => {
      let a = Kc(e)
      if (a.length && !Yc(e)) return t(a)
      $c(e).then(t)
    }),
  Yc = (e) => (e.files ? e.files.length > 0 : !1),
  $c = (e) =>
    new Promise((t, i) => {
      let a = (e.items ? Array.from(e.items) : [])
        .filter((n) => qc(n))
        .map((n) => jc(n))
      if (!a.length) {
        t(e.files ? Array.from(e.files) : [])
        return
      }
      Promise.all(a)
        .then((n) => {
          let r = []
          n.forEach((l) => {
            r.push.apply(r, l)
          }),
            t(
              r
                .filter((l) => l)
                .map(
                  (l) => (
                    l._relativePath || (l._relativePath = l.webkitRelativePath),
                    l
                  )
                )
            )
        })
        .catch(console.error)
    }),
  qc = (e) => {
    if (kn(e)) {
      let t = Zi(e)
      if (t) return t.isFile || t.isDirectory
    }
    return e.kind === "file"
  },
  jc = (e) =>
    new Promise((t, i) => {
      if (Zc(e)) {
        Xc(Zi(e)).then(t).catch(i)
        return
      }
      t([e.getAsFile()])
    }),
  Xc = (e) =>
    new Promise((t, i) => {
      let a = [],
        n = 0,
        r = 0,
        l = () => {
          r === 0 && n === 0 && t(a)
        },
        o = (s) => {
          n++
          let u = s.createReader(),
            c = () => {
              u.readEntries((d) => {
                if (d.length === 0) {
                  n--, l()
                  return
                }
                d.forEach((h) => {
                  h.isDirectory
                    ? o(h)
                    : (r++,
                      h.file((m) => {
                        let p = Qc(m)
                        h.fullPath && (p._relativePath = h.fullPath),
                          a.push(p),
                          r--,
                          l()
                      }))
                }),
                  c()
              }, i)
            }
          c()
        }
      o(e)
    }),
  Qc = (e) => {
    if (e.type.length) return e
    let t = e.lastModifiedDate,
      i = e.name,
      a = Un(si(e.name))
    return (
      a.length &&
        ((e = e.slice(0, e.size, a)), (e.name = i), (e.lastModifiedDate = t)),
      e
    )
  },
  Zc = (e) => kn(e) && (Zi(e) || {}).isDirectory,
  kn = (e) => "webkitGetAsEntry" in e,
  Zi = (e) => e.webkitGetAsEntry(),
  Kc = (e) => {
    let t = []
    try {
      if (((t = ed(e)), t.length)) return t
      t = Jc(e)
    } catch {}
    return t
  },
  Jc = (e) => {
    let t = e.getData("url")
    return typeof t == "string" && t.length ? [t] : []
  },
  ed = (e) => {
    let t = e.getData("text/html")
    if (typeof t == "string" && t.length) {
      let i = t.match(/src\s*=\s*"(.+?)"/)
      if (i) return [i[1]]
    }
    return []
  },
  ii = [],
  Ke = (e) => ({
    pageLeft: e.pageX,
    pageTop: e.pageY,
    scopeLeft: e.offsetX || e.layerX,
    scopeTop: e.offsetY || e.layerY,
  }),
  td = (e, t, i) => {
    let a = id(t),
      n = {
        element: e,
        filterElement: i,
        state: null,
        ondrop: () => {},
        onenter: () => {},
        ondrag: () => {},
        onexit: () => {},
        onload: () => {},
        allowdrop: () => {},
      }
    return (n.destroy = a.addListener(n)), n
  },
  id = (e) => {
    let t = ii.find((a) => a.element === e)
    if (t) return t
    let i = ad(e)
    return ii.push(i), i
  },
  ad = (e) => {
    let t = [],
      i = { dragenter: rd, dragover: ld, dragleave: sd, drop: od },
      a = {}
    te(i, (r, l) => {
      ;(a[r] = l(e, t)), e.addEventListener(r, a[r], !1)
    })
    let n = {
      element: e,
      addListener: (r) => (
        t.push(r),
        () => {
          t.splice(t.indexOf(r), 1),
            t.length === 0 &&
              (ii.splice(ii.indexOf(n), 1),
              te(i, (l) => {
                e.removeEventListener(l, a[l], !1)
              }))
        }
      ),
    }
    return n
  },
  nd = (e, t) => (
    "elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)
  ),
  Ki = (e, t) => {
    let i = Uc(t),
      a = nd(i, {
        x: e.pageX - window.pageXOffset,
        y: e.pageY - window.pageYOffset,
      })
    return a === t || t.contains(a)
  },
  Hn = null,
  Zt = (e, t) => {
    try {
      e.dropEffect = t
    } catch {}
  },
  rd = (e, t) => (i) => {
    i.preventDefault(),
      (Hn = i.target),
      t.forEach((a) => {
        let { element: n, onenter: r } = a
        Ki(i, n) && ((a.state = "enter"), r(Ke(i)))
      })
  },
  ld = (e, t) => (i) => {
    i.preventDefault()
    let a = i.dataTransfer
    Qi(a).then((n) => {
      let r = !1
      t.some((l) => {
        let {
          filterElement: o,
          element: s,
          onenter: u,
          onexit: c,
          ondrag: d,
          allowdrop: h,
        } = l
        Zt(a, "copy")
        let m = h(n)
        if (!m) {
          Zt(a, "none")
          return
        }
        if (Ki(i, s)) {
          if (((r = !0), l.state === null)) {
            ;(l.state = "enter"), u(Ke(i))
            return
          }
          if (((l.state = "over"), o && !m)) {
            Zt(a, "none")
            return
          }
          d(Ke(i))
        } else o && !r && Zt(a, "none"), l.state && ((l.state = null), c(Ke(i)))
      })
    })
  },
  od = (e, t) => (i) => {
    i.preventDefault()
    let a = i.dataTransfer
    Qi(a).then((n) => {
      t.forEach((r) => {
        let {
          filterElement: l,
          element: o,
          ondrop: s,
          onexit: u,
          allowdrop: c,
        } = r
        if (((r.state = null), !(l && !Ki(i, o)))) {
          if (!c(n)) return u(Ke(i))
          s(Ke(i), n)
        }
      })
    })
  },
  sd = (e, t) => (i) => {
    Hn === i.target &&
      t.forEach((a) => {
        let { onexit: n } = a
        ;(a.state = null), n(Ke(i))
      })
  },
  cd = (e, t, i) => {
    e.classList.add("filepond--hopper")
    let {
        catchesDropsOnPage: a,
        requiresDropOnElement: n,
        filterItems: r = (c) => c,
      } = i,
      l = td(e, a ? document.documentElement : e, n),
      o = "",
      s = ""
    ;(l.allowdrop = (c) => t(r(c))),
      (l.ondrop = (c, d) => {
        let h = r(d)
        if (!t(h)) {
          u.ondragend(c)
          return
        }
        ;(s = "drag-drop"), u.onload(h, c)
      }),
      (l.ondrag = (c) => {
        u.ondrag(c)
      }),
      (l.onenter = (c) => {
        ;(s = "drag-over"), u.ondragstart(c)
      }),
      (l.onexit = (c) => {
        ;(s = "drag-exit"), u.ondragend(c)
      })
    let u = {
      updateHopperState: () => {
        o !== s && ((e.dataset.hopperState = s), (o = s))
      },
      onload: () => {},
      ondragstart: () => {},
      ondrag: () => {},
      ondragend: () => {},
      destroy: () => {
        l.destroy()
      },
    }
    return u
  },
  Ci = !1,
  ct = [],
  Wn = (e) => {
    let t = document.activeElement
    if (t && /textarea|input/i.test(t.nodeName)) {
      let i = !1,
        a = t
      for (; a !== document.body; ) {
        if (a.classList.contains("filepond--root")) {
          i = !0
          break
        }
        a = a.parentNode
      }
      if (!i) return
    }
    Qi(e.clipboardData).then((i) => {
      i.length && ct.forEach((a) => a(i))
    })
  },
  dd = (e) => {
    ct.includes(e) ||
      (ct.push(e), !Ci && ((Ci = !0), document.addEventListener("paste", Wn)))
  },
  ud = (e) => {
    Hi(ct, ct.indexOf(e)),
      ct.length === 0 && (document.removeEventListener("paste", Wn), (Ci = !1))
  },
  hd = () => {
    let e = (i) => {
        t.onload(i)
      },
      t = {
        destroy: () => {
          ud(e)
        },
        onload: () => {},
      }
    return dd(e), t
  },
  md = ({ root: e, props: t }) => {
    ;(e.element.id = `filepond--assistant-${t.id}`),
      ne(e.element, "role", "status"),
      ne(e.element, "aria-live", "polite"),
      ne(e.element, "aria-relevant", "additions")
  },
  an = null,
  nn = null,
  Li = [],
  di = (e, t) => {
    e.element.textContent = t
  },
  pd = (e) => {
    e.element.textContent = ""
  },
  Yn = (e, t, i) => {
    let a = e.query("GET_TOTAL_ITEMS")
    di(
      e,
      `${i} ${t}, ${a} ${a === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`
    ),
      clearTimeout(nn),
      (nn = setTimeout(() => {
        pd(e)
      }, 1500))
  },
  $n = (e) => e.element.parentNode.contains(document.activeElement),
  fd = ({ root: e, action: t }) => {
    if (!$n(e)) return
    e.element.textContent = ""
    let i = e.query("GET_ITEM", t.id)
    Li.push(i.filename),
      clearTimeout(an),
      (an = setTimeout(() => {
        Yn(e, Li.join(", "), e.query("GET_LABEL_FILE_ADDED")), (Li.length = 0)
      }, 750))
  },
  gd = ({ root: e, action: t }) => {
    if (!$n(e)) return
    let i = t.item
    Yn(e, i.filename, e.query("GET_LABEL_FILE_REMOVED"))
  },
  Ed = ({ root: e, action: t }) => {
    let a = e.query("GET_ITEM", t.id).filename,
      n = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")
    di(e, `${a} ${n}`)
  },
  rn = ({ root: e, action: t }) => {
    let a = e.query("GET_ITEM", t.id).filename,
      n = e.query("GET_LABEL_FILE_PROCESSING_ABORTED")
    di(e, `${a} ${n}`)
  },
  Kt = ({ root: e, action: t }) => {
    let a = e.query("GET_ITEM", t.id).filename
    di(e, `${t.status.main} ${a} ${t.status.sub}`)
  },
  Td = re({
    create: md,
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: fe({
      DID_LOAD_ITEM: fd,
      DID_REMOVE_ITEM: gd,
      DID_COMPLETE_ITEM_PROCESSING: Ed,
      DID_ABORT_ITEM_PROCESSING: rn,
      DID_REVERT_ITEM_PROCESSING: rn,
      DID_THROW_ITEM_REMOVE_ERROR: Kt,
      DID_THROW_ITEM_LOAD_ERROR: Kt,
      DID_THROW_ITEM_INVALID: Kt,
      DID_THROW_ITEM_PROCESSING_ERROR: Kt,
    }),
    tag: "span",
    name: "assistant",
  }),
  qn = (e, t = "-") =>
    e.replace(new RegExp(`${t}.`, "g"), (i) => i.charAt(1).toUpperCase()),
  jn = (e, t = 16, i = !0) => {
    let a = Date.now(),
      n = null
    return (...r) => {
      clearTimeout(n)
      let l = Date.now() - a,
        o = () => {
          ;(a = Date.now()), e(...r)
        }
      l < t ? i || (n = setTimeout(o, t - l)) : o()
    }
  },
  bd = 1e6,
  ai = (e) => e.preventDefault(),
  Id = ({ root: e, props: t }) => {
    let i = e.query("GET_ID")
    i && (e.element.id = i)
    let a = e.query("GET_CLASS_NAME")
    a &&
      a
        .split(" ")
        .filter((s) => s.length)
        .forEach((s) => {
          e.element.classList.add(s)
        }),
      (e.ref.label = e.appendChildView(
        e.createChildView(yc, {
          ...t,
          translateY: null,
          caption: e.query("GET_LABEL_IDLE"),
        })
      )),
      (e.ref.list = e.appendChildView(
        e.createChildView(Ec, { translateY: null })
      )),
      (e.ref.panel = e.appendChildView(
        e.createChildView(Dn, { name: "panel-root" })
      )),
      (e.ref.assistant = e.appendChildView(e.createChildView(Td, { ...t }))),
      (e.ref.data = e.appendChildView(e.createChildView(Gc, { ...t }))),
      (e.ref.measure = Be("div")),
      (e.ref.measure.style.height = "100%"),
      e.element.appendChild(e.ref.measure),
      (e.ref.bounds = null),
      e
        .query("GET_STYLES")
        .filter((s) => !Ne(s.value))
        .map(({ name: s, value: u }) => {
          e.element.dataset[s] = u
        }),
      (e.ref.widthPrevious = null),
      (e.ref.widthUpdated = jn(() => {
        ;(e.ref.updateHistory = []), e.dispatch("DID_RESIZE_ROOT")
      }, 250)),
      (e.ref.previousAspectRatio = null),
      (e.ref.updateHistory = [])
    let n = window.matchMedia("(pointer: fine) and (hover: hover)").matches,
      r = "PointerEvent" in window
    e.query("GET_ALLOW_REORDER") &&
      r &&
      !n &&
      (e.element.addEventListener("touchmove", ai, { passive: !1 }),
      e.element.addEventListener("gesturestart", ai))
    let l = e.query("GET_CREDITS")
    if (l.length === 2) {
      let s = document.createElement("a")
      ;(s.className = "filepond--credits"),
        s.setAttribute("aria-hidden", "true"),
        (s.href = l[0]),
        (s.tabindex = -1),
        (s.target = "_blank"),
        (s.rel = "noopener noreferrer"),
        (s.textContent = l[1]),
        e.element.appendChild(s),
        (e.ref.credits = s)
    }
  },
  _d = ({ root: e, props: t, actions: i }) => {
    if (
      (vd({ root: e, props: t, actions: i }),
      i
        .filter((T) => /^DID_SET_STYLE_/.test(T.type))
        .filter((T) => !Ne(T.data.value))
        .map(({ type: T, data: v }) => {
          let R = qn(T.substring(8).toLowerCase(), "_")
          ;(e.element.dataset[R] = v.value), e.invalidateLayout()
        }),
      e.rect.element.hidden)
    )
      return
    e.rect.element.width !== e.ref.widthPrevious &&
      ((e.ref.widthPrevious = e.rect.element.width), e.ref.widthUpdated())
    let a = e.ref.bounds
    a ||
      ((a = e.ref.bounds = Sd(e)),
      e.element.removeChild(e.ref.measure),
      (e.ref.measure = null))
    let { hopper: n, label: r, list: l, panel: o } = e.ref
    n && n.updateHopperState()
    let s = e.query("GET_PANEL_ASPECT_RATIO"),
      u = e.query("GET_ALLOW_MULTIPLE"),
      c = e.query("GET_TOTAL_ITEMS"),
      d = u ? e.query("GET_MAX_FILES") || bd : 1,
      h = c === d,
      m = i.find((T) => T.type === "DID_ADD_ITEM")
    if (h && m) {
      let T = m.data.interactionMethod
      ;(r.opacity = 0),
        u
          ? (r.translateY = -40)
          : T === Se.API
            ? (r.translateX = 40)
            : T === Se.BROWSE
              ? (r.translateY = 40)
              : (r.translateY = 30)
    } else h || ((r.opacity = 1), (r.translateX = 0), (r.translateY = 0))
    let p = Rd(e),
      f = yd(e),
      g = r.rect.element.height,
      I = !u || h ? 0 : g,
      E = h ? l.rect.element.marginTop : 0,
      b = c === 0 ? 0 : l.rect.element.marginBottom,
      _ = I + E + f.visual + b,
      y = I + E + f.bounds + b
    if (
      ((l.translateY = Math.max(0, I - l.rect.element.marginTop) - p.top), s)
    ) {
      let T = e.rect.element.width,
        v = T * s
      s !== e.ref.previousAspectRatio &&
        ((e.ref.previousAspectRatio = s), (e.ref.updateHistory = []))
      let R = e.ref.updateHistory
      R.push(T)
      let S = 2
      if (R.length > S * 2) {
        let O = R.length,
          x = O - 10,
          z = 0
        for (let L = O; L >= x; L--)
          if ((R[L] === R[L - 2] && z++, z >= S)) return
      }
      ;(o.scalable = !1), (o.height = v)
      let P = v - I - (b - p.bottom) - (h ? E : 0)
      f.visual > P ? (l.overflow = P) : (l.overflow = null), (e.height = v)
    } else if (a.fixedHeight) {
      o.scalable = !1
      let T = a.fixedHeight - I - (b - p.bottom) - (h ? E : 0)
      f.visual > T ? (l.overflow = T) : (l.overflow = null)
    } else if (a.cappedHeight) {
      let T = _ >= a.cappedHeight,
        v = Math.min(a.cappedHeight, _)
      ;(o.scalable = !0), (o.height = T ? v : v - p.top - p.bottom)
      let R = v - I - (b - p.bottom) - (h ? E : 0)
      _ > a.cappedHeight && f.visual > R
        ? (l.overflow = R)
        : (l.overflow = null),
        (e.height = Math.min(a.cappedHeight, y - p.top - p.bottom))
    } else {
      let T = c > 0 ? p.top + p.bottom : 0
      ;(o.scalable = !0),
        (o.height = Math.max(g, _ - T)),
        (e.height = Math.max(g, y - T))
    }
    e.ref.credits &&
      o.heightCurrent &&
      (e.ref.credits.style.transform = `translateY(${o.heightCurrent}px)`)
  },
  Rd = (e) => {
    let t = e.ref.list.childViews[0].childViews[0]
    return t
      ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom }
      : { top: 0, bottom: 0 }
  },
  yd = (e) => {
    let t = 0,
      i = 0,
      a = e.ref.list,
      n = a.childViews[0],
      r = n.childViews.filter((E) => E.rect.element.height),
      l = e
        .query("GET_ACTIVE_ITEMS")
        .map((E) => r.find((b) => b.id === E.id))
        .filter((E) => E)
    if (l.length === 0) return { visual: t, bounds: i }
    let o = n.rect.element.width,
      s = ji(n, l, a.dragCoordinates),
      u = l[0].rect.element,
      c = u.marginTop + u.marginBottom,
      d = u.marginLeft + u.marginRight,
      h = u.width + d,
      m = u.height + c,
      p = typeof s < "u" && s >= 0 ? 1 : 0,
      f = l.find((E) => E.markedForRemoval && E.opacity < 0.45) ? -1 : 0,
      g = l.length + p + f,
      I = qi(o, h)
    return (
      I === 1
        ? l.forEach((E) => {
            let b = E.rect.element.height + c
            ;(i += b), (t += b * E.opacity)
          })
        : ((i = Math.ceil(g / I) * m), (t = i)),
      { visual: t, bounds: i }
    )
  },
  Sd = (e) => {
    let t = e.ref.measureHeight || null
    return {
      cappedHeight: parseInt(e.style.maxHeight, 10) || null,
      fixedHeight: t === 0 ? null : t,
    }
  },
  Ji = (e, t) => {
    let i = e.query("GET_ALLOW_REPLACE"),
      a = e.query("GET_ALLOW_MULTIPLE"),
      n = e.query("GET_TOTAL_ITEMS"),
      r = e.query("GET_MAX_FILES"),
      l = t.length
    return !a && l > 1
      ? (e.dispatch("DID_THROW_MAX_FILES", {
          source: t,
          error: ie("warning", 0, "Max files"),
        }),
        !0)
      : ((r = a ? r : 1),
        !a && i
          ? !1
          : mt(r) && n + l > r
            ? (e.dispatch("DID_THROW_MAX_FILES", {
                source: t,
                error: ie("warning", 0, "Max files"),
              }),
              !0)
            : !1)
  },
  wd = (e, t, i) => {
    let a = e.childViews[0]
    return ji(a, t, {
      left: i.scopeLeft - a.rect.element.left,
      top:
        i.scopeTop -
        (e.rect.outer.top +
          e.rect.element.marginTop +
          e.rect.element.scrollTop),
    })
  },
  ln = (e) => {
    let t = e.query("GET_ALLOW_DROP"),
      i = e.query("GET_DISABLED"),
      a = t && !i
    if (a && !e.ref.hopper) {
      let n = cd(
        e.element,
        (r) => {
          let l = e.query("GET_BEFORE_DROP_FILE") || (() => !0)
          return e.query("GET_DROP_VALIDATION")
            ? r.every(
                (s) =>
                  Je("ALLOW_HOPPER_ITEM", s, { query: e.query }).every(
                    (u) => u === !0
                  ) && l(s)
              )
            : !0
        },
        {
          filterItems: (r) => {
            let l = e.query("GET_IGNORED_FILES")
            return r.filter((o) =>
              Ze(o) ? !l.includes(o.name.toLowerCase()) : !0
            )
          },
          catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
          requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT"),
        }
      )
      ;(n.onload = (r, l) => {
        let s = e.ref.list.childViews[0].childViews.filter(
            (c) => c.rect.element.height
          ),
          u = e
            .query("GET_ACTIVE_ITEMS")
            .map((c) => s.find((d) => d.id === c.id))
            .filter((c) => c)
        Ae("ADD_ITEMS", r, { dispatch: e.dispatch }).then((c) => {
          if (Ji(e, c)) return !1
          e.dispatch("ADD_ITEMS", {
            items: c,
            index: wd(e.ref.list, u, l),
            interactionMethod: Se.DROP,
          })
        }),
          e.dispatch("DID_DROP", { position: l }),
          e.dispatch("DID_END_DRAG", { position: l })
      }),
        (n.ondragstart = (r) => {
          e.dispatch("DID_START_DRAG", { position: r })
        }),
        (n.ondrag = jn((r) => {
          e.dispatch("DID_DRAG", { position: r })
        })),
        (n.ondragend = (r) => {
          e.dispatch("DID_END_DRAG", { position: r })
        }),
        (e.ref.hopper = n),
        (e.ref.drip = e.appendChildView(e.createChildView(Oc)))
    } else
      !a &&
        e.ref.hopper &&
        (e.ref.hopper.destroy(),
        (e.ref.hopper = null),
        e.removeChildView(e.ref.drip))
  },
  on = (e, t) => {
    let i = e.query("GET_ALLOW_BROWSE"),
      a = e.query("GET_DISABLED"),
      n = i && !a
    n && !e.ref.browser
      ? (e.ref.browser = e.appendChildView(
          e.createChildView(_c, {
            ...t,
            onload: (r) => {
              Ae("ADD_ITEMS", r, { dispatch: e.dispatch }).then((l) => {
                if (Ji(e, l)) return !1
                e.dispatch("ADD_ITEMS", {
                  items: l,
                  index: -1,
                  interactionMethod: Se.BROWSE,
                })
              })
            },
          }),
          0
        ))
      : !n &&
        e.ref.browser &&
        (e.removeChildView(e.ref.browser), (e.ref.browser = null))
  },
  sn = (e) => {
    let t = e.query("GET_ALLOW_PASTE"),
      i = e.query("GET_DISABLED"),
      a = t && !i
    a && !e.ref.paster
      ? ((e.ref.paster = hd()),
        (e.ref.paster.onload = (n) => {
          Ae("ADD_ITEMS", n, { dispatch: e.dispatch }).then((r) => {
            if (Ji(e, r)) return !1
            e.dispatch("ADD_ITEMS", {
              items: r,
              index: -1,
              interactionMethod: Se.PASTE,
            })
          })
        }))
      : !a && e.ref.paster && (e.ref.paster.destroy(), (e.ref.paster = null))
  },
  vd = fe({
    DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
      on(e, t)
    },
    DID_SET_ALLOW_DROP: ({ root: e }) => {
      ln(e)
    },
    DID_SET_ALLOW_PASTE: ({ root: e }) => {
      sn(e)
    },
    DID_SET_DISABLED: ({ root: e, props: t }) => {
      ln(e),
        sn(e),
        on(e, t),
        e.query("GET_DISABLED")
          ? (e.element.dataset.disabled = "disabled")
          : e.element.removeAttribute("data-disabled")
    },
  }),
  Ld = re({
    name: "root",
    read: ({ root: e }) => {
      e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight)
    },
    create: Id,
    write: _d,
    destroy: ({ root: e }) => {
      e.ref.paster && e.ref.paster.destroy(),
        e.ref.hopper && e.ref.hopper.destroy(),
        e.element.removeEventListener("touchmove", ai),
        e.element.removeEventListener("gesturestart", ai)
    },
    mixins: { styles: ["height"] },
  }),
  Ad = (e = {}) => {
    let t = null,
      i = ti(),
      a = Wl(xo(i), [jo, Do(i)], [bs, Po(i)])
    a.dispatch("SET_OPTIONS", { options: e })
    let n = () => {
      document.hidden || a.dispatch("KICK")
    }
    document.addEventListener("visibilitychange", n)
    let r = null,
      l = !1,
      o = !1,
      s = null,
      u = null,
      c = () => {
        l || (l = !0),
          clearTimeout(r),
          (r = setTimeout(() => {
            ;(l = !1),
              (s = null),
              (u = null),
              o && ((o = !1), a.dispatch("DID_STOP_RESIZE"))
          }, 500))
      }
    window.addEventListener("resize", c)
    let d = Ld(a, { id: ki() }),
      h = !1,
      m = !1,
      p = {
        _read: () => {
          l &&
            ((u = window.innerWidth),
            s || (s = u),
            !o && u !== s && (a.dispatch("DID_START_RESIZE"), (o = !0))),
            m && h && (h = d.element.offsetParent === null),
            !h && (d._read(), (m = d.rect.element.hidden))
        },
        _write: (w) => {
          let A = a.processActionQueue().filter((C) => !/^SET_/.test(C.type))
          ;(h && !A.length) ||
            (E(A),
            (h = d._write(w, A, o)),
            zo(a.query("GET_ITEMS")),
            h && a.processDispatchQueue())
        },
      },
      f = (w) => (A) => {
        let C = { type: w }
        if (!A) return C
        if (
          (A.hasOwnProperty("error") &&
            (C.error = A.error ? { ...A.error } : null),
          A.status && (C.status = { ...A.status }),
          A.file && (C.output = A.file),
          A.source)
        )
          C.file = A.source
        else if (A.item || A.id) {
          let D = A.item ? A.item : a.query("GET_ITEM", A.id)
          C.file = D ? ge(D) : null
        }
        return (
          A.items && (C.items = A.items.map(ge)),
          /progress/.test(w) && (C.progress = A.progress),
          A.hasOwnProperty("origin") &&
            A.hasOwnProperty("target") &&
            ((C.origin = A.origin), (C.target = A.target)),
          C
        )
      },
      g = {
        DID_DESTROY: f("destroy"),
        DID_INIT: f("init"),
        DID_THROW_MAX_FILES: f("warning"),
        DID_INIT_ITEM: f("initfile"),
        DID_START_ITEM_LOAD: f("addfilestart"),
        DID_UPDATE_ITEM_LOAD_PROGRESS: f("addfileprogress"),
        DID_LOAD_ITEM: f("addfile"),
        DID_THROW_ITEM_INVALID: [f("error"), f("addfile")],
        DID_THROW_ITEM_LOAD_ERROR: [f("error"), f("addfile")],
        DID_THROW_ITEM_REMOVE_ERROR: [f("error"), f("removefile")],
        DID_PREPARE_OUTPUT: f("preparefile"),
        DID_START_ITEM_PROCESSING: f("processfilestart"),
        DID_UPDATE_ITEM_PROCESS_PROGRESS: f("processfileprogress"),
        DID_ABORT_ITEM_PROCESSING: f("processfileabort"),
        DID_COMPLETE_ITEM_PROCESSING: f("processfile"),
        DID_COMPLETE_ITEM_PROCESSING_ALL: f("processfiles"),
        DID_REVERT_ITEM_PROCESSING: f("processfilerevert"),
        DID_THROW_ITEM_PROCESSING_ERROR: [f("error"), f("processfile")],
        DID_REMOVE_ITEM: f("removefile"),
        DID_UPDATE_ITEMS: f("updatefiles"),
        DID_ACTIVATE_ITEM: f("activatefile"),
        DID_REORDER_ITEMS: f("reorderfiles"),
      },
      I = (w) => {
        let A = { pond: F, ...w }
        delete A.type,
          d.element.dispatchEvent(
            new CustomEvent(`FilePond:${w.type}`, {
              detail: A,
              bubbles: !0,
              cancelable: !0,
              composed: !0,
            })
          )
        let C = []
        w.hasOwnProperty("error") && C.push(w.error),
          w.hasOwnProperty("file") && C.push(w.file)
        let D = ["type", "error", "file"]
        Object.keys(w)
          .filter((B) => !D.includes(B))
          .forEach((B) => C.push(w[B])),
          F.fire(w.type, ...C)
        let V = a.query(`GET_ON${w.type.toUpperCase()}`)
        V && V(...C)
      },
      E = (w) => {
        w.length &&
          w
            .filter((A) => g[A.type])
            .forEach((A) => {
              let C = g[A.type]
              ;(Array.isArray(C) ? C : [C]).forEach((D) => {
                A.type === "DID_INIT_ITEM"
                  ? I(D(A.data))
                  : setTimeout(() => {
                      I(D(A.data))
                    }, 0)
              })
            })
      },
      b = (w) => a.dispatch("SET_OPTIONS", { options: w }),
      _ = (w) => a.query("GET_ACTIVE_ITEM", w),
      y = (w) =>
        new Promise((A, C) => {
          a.dispatch("REQUEST_ITEM_PREPARE", {
            query: w,
            success: (D) => {
              A(D)
            },
            failure: (D) => {
              C(D)
            },
          })
        }),
      T = (w, A = {}) =>
        new Promise((C, D) => {
          S([{ source: w, options: A }], { index: A.index })
            .then((V) => C(V && V[0]))
            .catch(D)
        }),
      v = (w) => w.file && w.id,
      R = (w, A) => (
        typeof w == "object" && !v(w) && !A && ((A = w), (w = void 0)),
        a.dispatch("REMOVE_ITEM", { ...A, query: w }),
        a.query("GET_ACTIVE_ITEM", w) === null
      ),
      S = (...w) =>
        new Promise((A, C) => {
          let D = [],
            V = {}
          if (ni(w[0])) D.push.apply(D, w[0]), Object.assign(V, w[1] || {})
          else {
            let B = w[w.length - 1]
            typeof B == "object" &&
              !(B instanceof Blob) &&
              Object.assign(V, w.pop()),
              D.push(...w)
          }
          a.dispatch("ADD_ITEMS", {
            items: D,
            index: V.index,
            interactionMethod: Se.API,
            success: A,
            failure: C,
          })
        }),
      P = () => a.query("GET_ACTIVE_ITEMS"),
      O = (w) =>
        new Promise((A, C) => {
          a.dispatch("REQUEST_ITEM_PROCESSING", {
            query: w,
            success: (D) => {
              A(D)
            },
            failure: (D) => {
              C(D)
            },
          })
        }),
      x = (...w) => {
        let A = Array.isArray(w[0]) ? w[0] : w,
          C = A.length ? A : P()
        return Promise.all(C.map(y))
      },
      z = (...w) => {
        let A = Array.isArray(w[0]) ? w[0] : w
        if (!A.length) {
          let C = P().filter(
            (D) =>
              !(D.status === k.IDLE && D.origin === se.LOCAL) &&
              D.status !== k.PROCESSING &&
              D.status !== k.PROCESSING_COMPLETE &&
              D.status !== k.PROCESSING_REVERT_ERROR
          )
          return Promise.all(C.map(O))
        }
        return Promise.all(A.map(O))
      },
      L = (...w) => {
        let A = Array.isArray(w[0]) ? w[0] : w,
          C
        typeof A[A.length - 1] == "object"
          ? (C = A.pop())
          : Array.isArray(w[0]) && (C = w[1])
        let D = P()
        return A.length
          ? A.map((B) => ($e(B) ? (D[B] ? D[B].id : null) : B))
              .filter((B) => B)
              .map((B) => R(B, C))
          : Promise.all(D.map((B) => R(B, C)))
      },
      F = {
        ...oi(),
        ...p,
        ...Oo(a, i),
        setOptions: b,
        addFile: T,
        addFiles: S,
        getFile: _,
        processFile: O,
        prepareFile: y,
        removeFile: R,
        moveFile: (w, A) => a.dispatch("MOVE_ITEM", { query: w, index: A }),
        getFiles: P,
        processFiles: z,
        removeFiles: L,
        prepareFiles: x,
        sort: (w) => a.dispatch("SORT", { compare: w }),
        browse: () => {
          var w = d.element.querySelector("input[type=file]")
          w && w.click()
        },
        destroy: () => {
          F.fire("destroy", d.element),
            a.dispatch("ABORT_ALL"),
            d._destroy(),
            window.removeEventListener("resize", c),
            document.removeEventListener("visibilitychange", n),
            a.dispatch("DID_DESTROY")
        },
        insertBefore: (w) => xa(d.element, w),
        insertAfter: (w) => Oa(d.element, w),
        appendTo: (w) => w.appendChild(d.element),
        replaceElement: (w) => {
          xa(d.element, w), w.parentNode.removeChild(w), (t = w)
        },
        restoreElement: () => {
          t &&
            (Oa(t, d.element),
            d.element.parentNode.removeChild(d.element),
            (t = null))
        },
        isAttachedTo: (w) => d.element === w || t === w,
        element: { get: () => d.element },
        status: { get: () => a.query("GET_STATUS") },
      }
    return a.dispatch("DID_INIT"), Ue(F)
  },
  Xn = (e = {}) => {
    let t = {}
    return (
      te(ti(), (a, n) => {
        t[a] = n[0]
      }),
      Ad({ ...t, ...e })
    )
  },
  Md = (e) => e.charAt(0).toLowerCase() + e.slice(1),
  xd = (e) => qn(e.replace(/^data-/, "")),
  Qn = (e, t) => {
    te(t, (i, a) => {
      te(e, (n, r) => {
        let l = new RegExp(i)
        if (!l.test(n) || (delete e[n], a === !1)) return
        if (pe(a)) {
          e[a] = r
          return
        }
        let s = a.group
        ce(a) && !e[s] && (e[s] = {}), (e[s][Md(n.replace(l, ""))] = r)
      }),
        a.mapping && Qn(e[a.group], a.mapping)
    })
  },
  Od = (e, t = {}) => {
    let i = []
    te(e.attributes, (n) => {
      i.push(e.attributes[n])
    })
    let a = i
      .filter((n) => n.name)
      .reduce((n, r) => {
        let l = ne(e, r.name)
        return (n[xd(r.name)] = l === r.name ? !0 : l), n
      }, {})
    return Qn(a, t), a
  },
  Pd = (e, t = {}) => {
    let i = {
      "^class$": "className",
      "^multiple$": "allowMultiple",
      "^capture$": "captureMethod",
      "^webkitdirectory$": "allowDirectoriesOnly",
      "^server": {
        group: "server",
        mapping: {
          "^process": { group: "process" },
          "^revert": { group: "revert" },
          "^fetch": { group: "fetch" },
          "^restore": { group: "restore" },
          "^load": { group: "load" },
        },
      },
      "^type$": !1,
      "^files$": !1,
    }
    Je("SET_ATTRIBUTE_TO_OPTION_MAP", i)
    let a = { ...t },
      n = Od(
        e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e,
        i
      )
    Object.keys(n).forEach((l) => {
      ce(n[l])
        ? (ce(a[l]) || (a[l] = {}), Object.assign(a[l], n[l]))
        : (a[l] = n[l])
    }),
      (a.files = (t.files || []).concat(
        Array.from(e.querySelectorAll("input:not([type=file])")).map((l) => ({
          source: l.value,
          options: { type: l.dataset.type },
        }))
      ))
    let r = Xn(a)
    return (
      e.files &&
        Array.from(e.files).forEach((l) => {
          r.addFile(l)
        }),
      r.replaceElement(e),
      r
    )
  },
  Dd = (...e) => (Hl(e[0]) ? Pd(...e) : Xn(...e)),
  Fd = ["fire", "_read", "_write"],
  cn = (e) => {
    let t = {}
    return En(e, t, Fd), t
  },
  Cd = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (i, a) => t[a]),
  zd = (e) => {
    let t = new Blob(["(", e.toString(), ")()"], {
        type: "application/javascript",
      }),
      i = URL.createObjectURL(t),
      a = new Worker(i)
    return {
      transfer: (n, r) => {},
      post: (n, r, l) => {
        let o = ki()
        ;(a.onmessage = (s) => {
          s.data.id === o && r(s.data.message)
        }),
          a.postMessage({ id: o, message: n }, l)
      },
      terminate: () => {
        a.terminate(), URL.revokeObjectURL(i)
      },
    }
  },
  Nd = (e) =>
    new Promise((t, i) => {
      let a = new Image()
      ;(a.onload = () => {
        t(a)
      }),
        (a.onerror = (n) => {
          i(n)
        }),
        (a.src = e)
    }),
  Zn = (e, t) => {
    let i = e.slice(0, e.size, e.type)
    return (i.lastModifiedDate = e.lastModifiedDate), (i.name = t), i
  },
  Bd = (e) => Zn(e, e.name),
  dn = [],
  Vd = (e) => {
    if (dn.includes(e)) return
    dn.push(e)
    let t = e({
      addFilter: Bo,
      utils: {
        Type: M,
        forin: te,
        isString: pe,
        isFile: Ze,
        toNaturalFileSize: xn,
        replaceInString: Cd,
        getExtensionFromFilename: si,
        getFilenameWithoutExtension: Ln,
        guesstimateMimeType: Un,
        getFileFromBlob: ht,
        getFilenameFromURL: Ot,
        createRoute: fe,
        createWorker: zd,
        createView: re,
        createItemAPI: ge,
        loadImage: Nd,
        copyFile: Bd,
        renameFile: Zn,
        createBlob: Sn,
        applyFilterChain: Ae,
        text: ae,
        getNumericAspectRatioFromString: In,
      },
      views: { fileActionButton: Mn },
    })
    Vo(t.options)
  },
  Gd = () =>
    Object.prototype.toString.call(window.operamini) === "[object OperaMini]",
  Ud = () => "Promise" in window,
  kd = () => "slice" in Blob.prototype,
  Hd = () => "URL" in window && "createObjectURL" in window.URL,
  Wd = () => "visibilityState" in document,
  Yd = () => "performance" in window,
  $d = () => "supports" in (window.CSS || {}),
  qd = () => /MSIE|Trident/.test(window.navigator.userAgent),
  zi = (() => {
    let e =
      un() && !Gd() && Wd() && Ud() && kd() && Hd() && Yd() && ($d() || qd())
    return () => e
  })(),
  Ge = { apps: [] },
  jd = "filepond",
  et = () => {},
  Kn = {},
  pt = {},
  Pt = {},
  Ni = {},
  dt = et,
  ut = et,
  Bi = et,
  Vi = et,
  _e = et,
  Gi = et,
  xt = et
if (zi()) {
  go(
    () => {
      Ge.apps.forEach((i) => i._read())
    },
    (i) => {
      Ge.apps.forEach((a) => a._write(i))
    }
  )
  let e = () => {
    document.dispatchEvent(
      new CustomEvent("FilePond:loaded", {
        detail: {
          supported: zi,
          create: dt,
          destroy: ut,
          parse: Bi,
          find: Vi,
          registerPlugin: _e,
          setOptions: xt,
        },
      })
    ),
      document.removeEventListener("DOMContentLoaded", e)
  }
  document.readyState !== "loading"
    ? setTimeout(() => e(), 0)
    : document.addEventListener("DOMContentLoaded", e)
  let t = () =>
    te(ti(), (i, a) => {
      Ni[i] = a[1]
    })
  ;(Kn = { ..._n }),
    (Pt = { ...se }),
    (pt = { ...k }),
    (Ni = {}),
    t(),
    (dt = (...i) => {
      let a = Dd(...i)
      return a.on("destroy", ut), Ge.apps.push(a), cn(a)
    }),
    (ut = (i) => {
      let a = Ge.apps.findIndex((n) => n.isAttachedTo(i))
      return a >= 0 ? (Ge.apps.splice(a, 1)[0].restoreElement(), !0) : !1
    }),
    (Bi = (i) =>
      Array.from(i.querySelectorAll(`.${jd}`))
        .filter((r) => !Ge.apps.find((l) => l.isAttachedTo(r)))
        .map((r) => dt(r))),
    (Vi = (i) => {
      let a = Ge.apps.find((n) => n.isAttachedTo(i))
      return a ? cn(a) : null
    }),
    (_e = (...i) => {
      i.forEach(Vd), t()
    }),
    (Gi = () => {
      let i = {}
      return (
        te(ti(), (a, n) => {
          i[a] = n[0]
        }),
        i
      )
    }),
    (xt = (i) => (
      ce(i) &&
        (Ge.apps.forEach((a) => {
          a.setOptions(i)
        }),
        Go(i)),
      Gi()
    ))
}
function Jn(e, t) {
  var i = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    t &&
      (a = a.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable
      })),
      i.push.apply(i, a)
  }
  return i
}
function fr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Jn(Object(i), !0).forEach(function (a) {
          Kd(e, a, i[a])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
        : Jn(Object(i)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(i, a))
          })
  }
  return e
}
function Xd(e, t) {
  if (typeof e != "object" || !e) return e
  var i = e[Symbol.toPrimitive]
  if (i !== void 0) {
    var a = i.call(e, t || "default")
    if (typeof a != "object") return a
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
function gr(e) {
  var t = Xd(e, "string")
  return typeof t == "symbol" ? t : t + ""
}
function aa(e) {
  "@babel/helpers - typeof"
  return (
    (aa =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t
          }),
    aa(e)
  )
}
function Qd(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function")
}
function er(e, t) {
  for (var i = 0; i < t.length; i++) {
    var a = t[i]
    ;(a.enumerable = a.enumerable || !1),
      (a.configurable = !0),
      "value" in a && (a.writable = !0),
      Object.defineProperty(e, gr(a.key), a)
  }
}
function Zd(e, t, i) {
  return (
    t && er(e.prototype, t),
    i && er(e, i),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  )
}
function Kd(e, t, i) {
  return (
    (t = gr(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = i),
    e
  )
}
function Er(e) {
  return Jd(e) || eu(e) || tu(e) || iu()
}
function Jd(e) {
  if (Array.isArray(e)) return na(e)
}
function eu(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e)
}
function tu(e, t) {
  if (e) {
    if (typeof e == "string") return na(e, t)
    var i = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (i === "Object" && e.constructor && (i = e.constructor.name),
      i === "Map" || i === "Set")
    )
      return Array.from(e)
    if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
      return na(e, t)
  }
}
function na(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i]
  return a
}
function iu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var pi = typeof window < "u" && typeof window.document < "u",
  De = pi ? window : {},
  ma =
    pi && De.document.documentElement
      ? "ontouchstart" in De.document.documentElement
      : !1,
  pa = pi ? "PointerEvent" in De : !1,
  Z = "cropper",
  fa = "all",
  Tr = "crop",
  br = "move",
  Ir = "zoom",
  tt = "e",
  it = "w",
  ft = "s",
  ke = "n",
  Dt = "ne",
  Ft = "nw",
  Ct = "se",
  zt = "sw",
  ra = "".concat(Z, "-crop"),
  tr = "".concat(Z, "-disabled"),
  Te = "".concat(Z, "-hidden"),
  ir = "".concat(Z, "-hide"),
  au = "".concat(Z, "-invisible"),
  mi = "".concat(Z, "-modal"),
  la = "".concat(Z, "-move"),
  Bt = "".concat(Z, "Action"),
  ui = "".concat(Z, "Preview"),
  ga = "crop",
  _r = "move",
  Rr = "none",
  oa = "crop",
  sa = "cropend",
  ca = "cropmove",
  da = "cropstart",
  ar = "dblclick",
  nu = ma ? "touchstart" : "mousedown",
  ru = ma ? "touchmove" : "mousemove",
  lu = ma ? "touchend touchcancel" : "mouseup",
  nr = pa ? "pointerdown" : nu,
  rr = pa ? "pointermove" : ru,
  lr = pa ? "pointerup pointercancel" : lu,
  or = "ready",
  sr = "resize",
  cr = "wheel",
  ua = "zoom",
  dr = "image/jpeg",
  ou = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,
  su = /^data:/,
  cu = /^data:image\/jpeg;base64,/,
  du = /^img|canvas$/i,
  yr = 200,
  Sr = 100,
  ur = {
    viewMode: 0,
    dragMode: ga,
    initialAspectRatio: NaN,
    aspectRatio: NaN,
    data: null,
    preview: "",
    responsive: !0,
    restore: !0,
    checkCrossOrigin: !0,
    checkOrientation: !0,
    modal: !0,
    guides: !0,
    center: !0,
    highlight: !0,
    background: !0,
    autoCrop: !0,
    autoCropArea: 0.8,
    movable: !0,
    rotatable: !0,
    scalable: !0,
    zoomable: !0,
    zoomOnTouch: !0,
    zoomOnWheel: !0,
    wheelZoomRatio: 0.1,
    cropBoxMovable: !0,
    cropBoxResizable: !0,
    toggleDragModeOnDblclick: !0,
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: yr,
    minContainerHeight: Sr,
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null,
  },
  uu =
    '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',
  hu = Number.isNaN || De.isNaN
function Y(e) {
  return typeof e == "number" && !hu(e)
}
var hr = function (t) {
  return t > 0 && t < 1 / 0
}
function ta(e) {
  return typeof e > "u"
}
function at(e) {
  return aa(e) === "object" && e !== null
}
var mu = Object.prototype.hasOwnProperty
function gt(e) {
  if (!at(e)) return !1
  try {
    var t = e.constructor,
      i = t.prototype
    return t && i && mu.call(i, "isPrototypeOf")
  } catch {
    return !1
  }
}
function Ee(e) {
  return typeof e == "function"
}
var pu = Array.prototype.slice
function wr(e) {
  return Array.from ? Array.from(e) : pu.call(e)
}
function le(e, t) {
  return (
    e &&
      Ee(t) &&
      (Array.isArray(e) || Y(e.length)
        ? wr(e).forEach(function (i, a) {
            t.call(e, i, a, e)
          })
        : at(e) &&
          Object.keys(e).forEach(function (i) {
            t.call(e, e[i], i, e)
          })),
    e
  )
}
var K =
    Object.assign ||
    function (t) {
      for (
        var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), n = 1;
        n < i;
        n++
      )
        a[n - 1] = arguments[n]
      return (
        at(t) &&
          a.length > 0 &&
          a.forEach(function (r) {
            at(r) &&
              Object.keys(r).forEach(function (l) {
                t[l] = r[l]
              })
          }),
        t
      )
    },
  fu = /\.\d*(?:0|9){12}\d*$/
function Tt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11
  return fu.test(e) ? Math.round(e * t) / t : e
}
var gu = /^width|height|left|top|marginLeft|marginTop$/
function He(e, t) {
  var i = e.style
  le(t, function (a, n) {
    gu.test(n) && Y(a) && (a = "".concat(a, "px")), (i[n] = a)
  })
}
function Eu(e, t) {
  return e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1
}
function de(e, t) {
  if (t) {
    if (Y(e.length)) {
      le(e, function (a) {
        de(a, t)
      })
      return
    }
    if (e.classList) {
      e.classList.add(t)
      return
    }
    var i = e.className.trim()
    i
      ? i.indexOf(t) < 0 && (e.className = "".concat(i, " ").concat(t))
      : (e.className = t)
  }
}
function Pe(e, t) {
  if (t) {
    if (Y(e.length)) {
      le(e, function (i) {
        Pe(i, t)
      })
      return
    }
    if (e.classList) {
      e.classList.remove(t)
      return
    }
    e.className.indexOf(t) >= 0 && (e.className = e.className.replace(t, ""))
  }
}
function Et(e, t, i) {
  if (t) {
    if (Y(e.length)) {
      le(e, function (a) {
        Et(a, t, i)
      })
      return
    }
    i ? de(e, t) : Pe(e, t)
  }
}
var Tu = /([a-z\d])([A-Z])/g
function Ea(e) {
  return e.replace(Tu, "$1-$2").toLowerCase()
}
function ha(e, t) {
  return at(e[t])
    ? e[t]
    : e.dataset
      ? e.dataset[t]
      : e.getAttribute("data-".concat(Ea(t)))
}
function Vt(e, t, i) {
  at(i)
    ? (e[t] = i)
    : e.dataset
      ? (e.dataset[t] = i)
      : e.setAttribute("data-".concat(Ea(t)), i)
}
function bu(e, t) {
  if (at(e[t]))
    try {
      delete e[t]
    } catch {
      e[t] = void 0
    }
  else if (e.dataset)
    try {
      delete e.dataset[t]
    } catch {
      e.dataset[t] = void 0
    }
  else e.removeAttribute("data-".concat(Ea(t)))
}
var vr = /\s\s*/,
  Lr = (function () {
    var e = !1
    if (pi) {
      var t = !1,
        i = function () {},
        a = Object.defineProperty({}, "once", {
          get: function () {
            return (e = !0), t
          },
          set: function (r) {
            t = r
          },
        })
      De.addEventListener("test", i, a), De.removeEventListener("test", i, a)
    }
    return e
  })()
function Oe(e, t, i) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
    n = i
  t.trim()
    .split(vr)
    .forEach(function (r) {
      if (!Lr) {
        var l = e.listeners
        l &&
          l[r] &&
          l[r][i] &&
          ((n = l[r][i]),
          delete l[r][i],
          Object.keys(l[r]).length === 0 && delete l[r],
          Object.keys(l).length === 0 && delete e.listeners)
      }
      e.removeEventListener(r, n, a)
    })
}
function we(e, t, i) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
    n = i
  t.trim()
    .split(vr)
    .forEach(function (r) {
      if (a.once && !Lr) {
        var l = e.listeners,
          o = l === void 0 ? {} : l
        ;(n = function () {
          delete o[r][i], e.removeEventListener(r, n, a)
          for (var u = arguments.length, c = new Array(u), d = 0; d < u; d++)
            c[d] = arguments[d]
          i.apply(e, c)
        }),
          o[r] || (o[r] = {}),
          o[r][i] && e.removeEventListener(r, o[r][i], a),
          (o[r][i] = n),
          (e.listeners = o)
      }
      e.addEventListener(r, n, a)
    })
}
function bt(e, t, i) {
  var a
  return (
    Ee(Event) && Ee(CustomEvent)
      ? (a = new CustomEvent(t, { detail: i, bubbles: !0, cancelable: !0 }))
      : ((a = document.createEvent("CustomEvent")),
        a.initCustomEvent(t, !0, !0, i)),
    e.dispatchEvent(a)
  )
}
function Ar(e) {
  var t = e.getBoundingClientRect()
  return {
    left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: t.top + (window.pageYOffset - document.documentElement.clientTop),
  }
}
var ia = De.location,
  Iu = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i
function mr(e) {
  var t = e.match(Iu)
  return (
    t !== null &&
    (t[1] !== ia.protocol || t[2] !== ia.hostname || t[3] !== ia.port)
  )
}
function pr(e) {
  var t = "timestamp=".concat(new Date().getTime())
  return e + (e.indexOf("?") === -1 ? "?" : "&") + t
}
function Nt(e) {
  var t = e.rotate,
    i = e.scaleX,
    a = e.scaleY,
    n = e.translateX,
    r = e.translateY,
    l = []
  Y(n) && n !== 0 && l.push("translateX(".concat(n, "px)")),
    Y(r) && r !== 0 && l.push("translateY(".concat(r, "px)")),
    Y(t) && t !== 0 && l.push("rotate(".concat(t, "deg)")),
    Y(i) && i !== 1 && l.push("scaleX(".concat(i, ")")),
    Y(a) && a !== 1 && l.push("scaleY(".concat(a, ")"))
  var o = l.length ? l.join(" ") : "none"
  return { WebkitTransform: o, msTransform: o, transform: o }
}
function _u(e) {
  var t = fr({}, e),
    i = 0
  return (
    le(e, function (a, n) {
      delete t[n],
        le(t, function (r) {
          var l = Math.abs(a.startX - r.startX),
            o = Math.abs(a.startY - r.startY),
            s = Math.abs(a.endX - r.endX),
            u = Math.abs(a.endY - r.endY),
            c = Math.sqrt(l * l + o * o),
            d = Math.sqrt(s * s + u * u),
            h = (d - c) / c
          Math.abs(h) > Math.abs(i) && (i = h)
        })
    }),
    i
  )
}
function hi(e, t) {
  var i = e.pageX,
    a = e.pageY,
    n = { endX: i, endY: a }
  return t ? n : fr({ startX: i, startY: a }, n)
}
function Ru(e) {
  var t = 0,
    i = 0,
    a = 0
  return (
    le(e, function (n) {
      var r = n.startX,
        l = n.startY
      ;(t += r), (i += l), (a += 1)
    }),
    (t /= a),
    (i /= a),
    { pageX: t, pageY: i }
  )
}
function We(e) {
  var t = e.aspectRatio,
    i = e.height,
    a = e.width,
    n =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : "contain",
    r = hr(a),
    l = hr(i)
  if (r && l) {
    var o = i * t
    ;(n === "contain" && o > a) || (n === "cover" && o < a)
      ? (i = a / t)
      : (a = i * t)
  } else r ? (i = a / t) : l && (a = i * t)
  return { width: a, height: i }
}
function yu(e) {
  var t = e.width,
    i = e.height,
    a = e.degree
  if (((a = Math.abs(a) % 180), a === 90)) return { width: i, height: t }
  var n = ((a % 90) * Math.PI) / 180,
    r = Math.sin(n),
    l = Math.cos(n),
    o = t * l + i * r,
    s = t * r + i * l
  return a > 90 ? { width: s, height: o } : { width: o, height: s }
}
function Su(e, t, i, a) {
  var n = t.aspectRatio,
    r = t.naturalWidth,
    l = t.naturalHeight,
    o = t.rotate,
    s = o === void 0 ? 0 : o,
    u = t.scaleX,
    c = u === void 0 ? 1 : u,
    d = t.scaleY,
    h = d === void 0 ? 1 : d,
    m = i.aspectRatio,
    p = i.naturalWidth,
    f = i.naturalHeight,
    g = a.fillColor,
    I = g === void 0 ? "transparent" : g,
    E = a.imageSmoothingEnabled,
    b = E === void 0 ? !0 : E,
    _ = a.imageSmoothingQuality,
    y = _ === void 0 ? "low" : _,
    T = a.maxWidth,
    v = T === void 0 ? 1 / 0 : T,
    R = a.maxHeight,
    S = R === void 0 ? 1 / 0 : R,
    P = a.minWidth,
    O = P === void 0 ? 0 : P,
    x = a.minHeight,
    z = x === void 0 ? 0 : x,
    L = document.createElement("canvas"),
    F = L.getContext("2d"),
    w = We({ aspectRatio: m, width: v, height: S }),
    A = We({ aspectRatio: m, width: O, height: z }, "cover"),
    C = Math.min(w.width, Math.max(A.width, p)),
    D = Math.min(w.height, Math.max(A.height, f)),
    V = We({ aspectRatio: n, width: v, height: S }),
    B = We({ aspectRatio: n, width: O, height: z }, "cover"),
    j = Math.min(V.width, Math.max(B.width, r)),
    q = Math.min(V.height, Math.max(B.height, l)),
    X = [-j / 2, -q / 2, j, q]
  return (
    (L.width = Tt(C)),
    (L.height = Tt(D)),
    (F.fillStyle = I),
    F.fillRect(0, 0, C, D),
    F.save(),
    F.translate(C / 2, D / 2),
    F.rotate((s * Math.PI) / 180),
    F.scale(c, h),
    (F.imageSmoothingEnabled = b),
    (F.imageSmoothingQuality = y),
    F.drawImage.apply(
      F,
      [e].concat(
        Er(
          X.map(function (ue) {
            return Math.floor(Tt(ue))
          })
        )
      )
    ),
    F.restore(),
    L
  )
}
var Mr = String.fromCharCode
function wu(e, t, i) {
  var a = ""
  i += t
  for (var n = t; n < i; n += 1) a += Mr(e.getUint8(n))
  return a
}
var vu = /^data:.*,/
function Lu(e) {
  var t = e.replace(vu, ""),
    i = atob(t),
    a = new ArrayBuffer(i.length),
    n = new Uint8Array(a)
  return (
    le(n, function (r, l) {
      n[l] = i.charCodeAt(l)
    }),
    a
  )
}
function Au(e, t) {
  for (var i = [], a = 8192, n = new Uint8Array(e); n.length > 0; )
    i.push(Mr.apply(null, wr(n.subarray(0, a)))), (n = n.subarray(a))
  return "data:".concat(t, ";base64,").concat(btoa(i.join("")))
}
function Mu(e) {
  var t = new DataView(e),
    i
  try {
    var a, n, r
    if (t.getUint8(0) === 255 && t.getUint8(1) === 216)
      for (var l = t.byteLength, o = 2; o + 1 < l; ) {
        if (t.getUint8(o) === 255 && t.getUint8(o + 1) === 225) {
          n = o
          break
        }
        o += 1
      }
    if (n) {
      var s = n + 4,
        u = n + 10
      if (wu(t, s, 4) === "Exif") {
        var c = t.getUint16(u)
        if (
          ((a = c === 18761),
          (a || c === 19789) && t.getUint16(u + 2, a) === 42)
        ) {
          var d = t.getUint32(u + 4, a)
          d >= 8 && (r = u + d)
        }
      }
    }
    if (r) {
      var h = t.getUint16(r, a),
        m,
        p
      for (p = 0; p < h; p += 1)
        if (((m = r + p * 12 + 2), t.getUint16(m, a) === 274)) {
          ;(m += 8), (i = t.getUint16(m, a)), t.setUint16(m, 1, a)
          break
        }
    }
  } catch {
    i = 1
  }
  return i
}
function xu(e) {
  var t = 0,
    i = 1,
    a = 1
  switch (e) {
    case 2:
      i = -1
      break
    case 3:
      t = -180
      break
    case 4:
      a = -1
      break
    case 5:
      ;(t = 90), (a = -1)
      break
    case 6:
      t = 90
      break
    case 7:
      ;(t = 90), (i = -1)
      break
    case 8:
      t = -90
      break
  }
  return { rotate: t, scaleX: i, scaleY: a }
}
var Ou = {
    render: function () {
      this.initContainer(),
        this.initCanvas(),
        this.initCropBox(),
        this.renderCanvas(),
        this.cropped && this.renderCropBox()
    },
    initContainer: function () {
      var t = this.element,
        i = this.options,
        a = this.container,
        n = this.cropper,
        r = Number(i.minContainerWidth),
        l = Number(i.minContainerHeight)
      de(n, Te), Pe(t, Te)
      var o = {
        width: Math.max(a.offsetWidth, r >= 0 ? r : yr),
        height: Math.max(a.offsetHeight, l >= 0 ? l : Sr),
      }
      ;(this.containerData = o),
        He(n, { width: o.width, height: o.height }),
        de(t, Te),
        Pe(n, Te)
    },
    initCanvas: function () {
      var t = this.containerData,
        i = this.imageData,
        a = this.options.viewMode,
        n = Math.abs(i.rotate) % 180 === 90,
        r = n ? i.naturalHeight : i.naturalWidth,
        l = n ? i.naturalWidth : i.naturalHeight,
        o = r / l,
        s = t.width,
        u = t.height
      t.height * o > t.width
        ? a === 3
          ? (s = t.height * o)
          : (u = t.width / o)
        : a === 3
          ? (u = t.width / o)
          : (s = t.height * o)
      var c = {
        aspectRatio: o,
        naturalWidth: r,
        naturalHeight: l,
        width: s,
        height: u,
      }
      ;(this.canvasData = c),
        (this.limited = a === 1 || a === 2),
        this.limitCanvas(!0, !0),
        (c.width = Math.min(Math.max(c.width, c.minWidth), c.maxWidth)),
        (c.height = Math.min(Math.max(c.height, c.minHeight), c.maxHeight)),
        (c.left = (t.width - c.width) / 2),
        (c.top = (t.height - c.height) / 2),
        (c.oldLeft = c.left),
        (c.oldTop = c.top),
        (this.initialCanvasData = K({}, c))
    },
    limitCanvas: function (t, i) {
      var a = this.options,
        n = this.containerData,
        r = this.canvasData,
        l = this.cropBoxData,
        o = a.viewMode,
        s = r.aspectRatio,
        u = this.cropped && l
      if (t) {
        var c = Number(a.minCanvasWidth) || 0,
          d = Number(a.minCanvasHeight) || 0
        o > 1
          ? ((c = Math.max(c, n.width)),
            (d = Math.max(d, n.height)),
            o === 3 && (d * s > c ? (c = d * s) : (d = c / s)))
          : o > 0 &&
            (c
              ? (c = Math.max(c, u ? l.width : 0))
              : d
                ? (d = Math.max(d, u ? l.height : 0))
                : u &&
                  ((c = l.width),
                  (d = l.height),
                  d * s > c ? (c = d * s) : (d = c / s)))
        var h = We({ aspectRatio: s, width: c, height: d })
        ;(c = h.width),
          (d = h.height),
          (r.minWidth = c),
          (r.minHeight = d),
          (r.maxWidth = 1 / 0),
          (r.maxHeight = 1 / 0)
      }
      if (i)
        if (o > (u ? 0 : 1)) {
          var m = n.width - r.width,
            p = n.height - r.height
          ;(r.minLeft = Math.min(0, m)),
            (r.minTop = Math.min(0, p)),
            (r.maxLeft = Math.max(0, m)),
            (r.maxTop = Math.max(0, p)),
            u &&
              this.limited &&
              ((r.minLeft = Math.min(l.left, l.left + (l.width - r.width))),
              (r.minTop = Math.min(l.top, l.top + (l.height - r.height))),
              (r.maxLeft = l.left),
              (r.maxTop = l.top),
              o === 2 &&
                (r.width >= n.width &&
                  ((r.minLeft = Math.min(0, m)), (r.maxLeft = Math.max(0, m))),
                r.height >= n.height &&
                  ((r.minTop = Math.min(0, p)), (r.maxTop = Math.max(0, p)))))
        } else
          (r.minLeft = -r.width),
            (r.minTop = -r.height),
            (r.maxLeft = n.width),
            (r.maxTop = n.height)
    },
    renderCanvas: function (t, i) {
      var a = this.canvasData,
        n = this.imageData
      if (i) {
        var r = yu({
            width: n.naturalWidth * Math.abs(n.scaleX || 1),
            height: n.naturalHeight * Math.abs(n.scaleY || 1),
            degree: n.rotate || 0,
          }),
          l = r.width,
          o = r.height,
          s = a.width * (l / a.naturalWidth),
          u = a.height * (o / a.naturalHeight)
        ;(a.left -= (s - a.width) / 2),
          (a.top -= (u - a.height) / 2),
          (a.width = s),
          (a.height = u),
          (a.aspectRatio = l / o),
          (a.naturalWidth = l),
          (a.naturalHeight = o),
          this.limitCanvas(!0, !1)
      }
      ;(a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft),
        (a.height > a.maxHeight || a.height < a.minHeight) &&
          (a.top = a.oldTop),
        (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
        (a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight)),
        this.limitCanvas(!1, !0),
        (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
        (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
        (a.oldLeft = a.left),
        (a.oldTop = a.top),
        He(
          this.canvas,
          K(
            { width: a.width, height: a.height },
            Nt({ translateX: a.left, translateY: a.top })
          )
        ),
        this.renderImage(t),
        this.cropped && this.limited && this.limitCropBox(!0, !0)
    },
    renderImage: function (t) {
      var i = this.canvasData,
        a = this.imageData,
        n = a.naturalWidth * (i.width / i.naturalWidth),
        r = a.naturalHeight * (i.height / i.naturalHeight)
      K(a, {
        width: n,
        height: r,
        left: (i.width - n) / 2,
        top: (i.height - r) / 2,
      }),
        He(
          this.image,
          K(
            { width: a.width, height: a.height },
            Nt(K({ translateX: a.left, translateY: a.top }, a))
          )
        ),
        t && this.output()
    },
    initCropBox: function () {
      var t = this.options,
        i = this.canvasData,
        a = t.aspectRatio || t.initialAspectRatio,
        n = Number(t.autoCropArea) || 0.8,
        r = { width: i.width, height: i.height }
      a &&
        (i.height * a > i.width
          ? (r.height = r.width / a)
          : (r.width = r.height * a)),
        (this.cropBoxData = r),
        this.limitCropBox(!0, !0),
        (r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth)),
        (r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight)),
        (r.width = Math.max(r.minWidth, r.width * n)),
        (r.height = Math.max(r.minHeight, r.height * n)),
        (r.left = i.left + (i.width - r.width) / 2),
        (r.top = i.top + (i.height - r.height) / 2),
        (r.oldLeft = r.left),
        (r.oldTop = r.top),
        (this.initialCropBoxData = K({}, r))
    },
    limitCropBox: function (t, i) {
      var a = this.options,
        n = this.containerData,
        r = this.canvasData,
        l = this.cropBoxData,
        o = this.limited,
        s = a.aspectRatio
      if (t) {
        var u = Number(a.minCropBoxWidth) || 0,
          c = Number(a.minCropBoxHeight) || 0,
          d = o
            ? Math.min(n.width, r.width, r.width + r.left, n.width - r.left)
            : n.width,
          h = o
            ? Math.min(n.height, r.height, r.height + r.top, n.height - r.top)
            : n.height
        ;(u = Math.min(u, n.width)),
          (c = Math.min(c, n.height)),
          s &&
            (u && c
              ? c * s > u
                ? (c = u / s)
                : (u = c * s)
              : u
                ? (c = u / s)
                : c && (u = c * s),
            h * s > d ? (h = d / s) : (d = h * s)),
          (l.minWidth = Math.min(u, d)),
          (l.minHeight = Math.min(c, h)),
          (l.maxWidth = d),
          (l.maxHeight = h)
      }
      i &&
        (o
          ? ((l.minLeft = Math.max(0, r.left)),
            (l.minTop = Math.max(0, r.top)),
            (l.maxLeft = Math.min(n.width, r.left + r.width) - l.width),
            (l.maxTop = Math.min(n.height, r.top + r.height) - l.height))
          : ((l.minLeft = 0),
            (l.minTop = 0),
            (l.maxLeft = n.width - l.width),
            (l.maxTop = n.height - l.height)))
    },
    renderCropBox: function () {
      var t = this.options,
        i = this.containerData,
        a = this.cropBoxData
      ;(a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft),
        (a.height > a.maxHeight || a.height < a.minHeight) &&
          (a.top = a.oldTop),
        (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
        (a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight)),
        this.limitCropBox(!1, !0),
        (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
        (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
        (a.oldLeft = a.left),
        (a.oldTop = a.top),
        t.movable &&
          t.cropBoxMovable &&
          Vt(
            this.face,
            Bt,
            a.width >= i.width && a.height >= i.height ? br : fa
          ),
        He(
          this.cropBox,
          K(
            { width: a.width, height: a.height },
            Nt({ translateX: a.left, translateY: a.top })
          )
        ),
        this.cropped && this.limited && this.limitCanvas(!0, !0),
        this.disabled || this.output()
    },
    output: function () {
      this.preview(), bt(this.element, oa, this.getData())
    },
  },
  Pu = {
    initPreview: function () {
      var t = this.element,
        i = this.crossOrigin,
        a = this.options.preview,
        n = i ? this.crossOriginUrl : this.url,
        r = t.alt || "The image to preview",
        l = document.createElement("img")
      if (
        (i && (l.crossOrigin = i),
        (l.src = n),
        (l.alt = r),
        this.viewBox.appendChild(l),
        (this.viewBoxImage = l),
        !!a)
      ) {
        var o = a
        typeof a == "string"
          ? (o = t.ownerDocument.querySelectorAll(a))
          : a.querySelector && (o = [a]),
          (this.previews = o),
          le(o, function (s) {
            var u = document.createElement("img")
            Vt(s, ui, {
              width: s.offsetWidth,
              height: s.offsetHeight,
              html: s.innerHTML,
            }),
              i && (u.crossOrigin = i),
              (u.src = n),
              (u.alt = r),
              (u.style.cssText =
                'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"'),
              (s.innerHTML = ""),
              s.appendChild(u)
          })
      }
    },
    resetPreview: function () {
      le(this.previews, function (t) {
        var i = ha(t, ui)
        He(t, { width: i.width, height: i.height }),
          (t.innerHTML = i.html),
          bu(t, ui)
      })
    },
    preview: function () {
      var t = this.imageData,
        i = this.canvasData,
        a = this.cropBoxData,
        n = a.width,
        r = a.height,
        l = t.width,
        o = t.height,
        s = a.left - i.left - t.left,
        u = a.top - i.top - t.top
      !this.cropped ||
        this.disabled ||
        (He(
          this.viewBoxImage,
          K(
            { width: l, height: o },
            Nt(K({ translateX: -s, translateY: -u }, t))
          )
        ),
        le(this.previews, function (c) {
          var d = ha(c, ui),
            h = d.width,
            m = d.height,
            p = h,
            f = m,
            g = 1
          n && ((g = h / n), (f = r * g)),
            r && f > m && ((g = m / r), (p = n * g), (f = m)),
            He(c, { width: p, height: f }),
            He(
              c.getElementsByTagName("img")[0],
              K(
                { width: l * g, height: o * g },
                Nt(K({ translateX: -s * g, translateY: -u * g }, t))
              )
            )
        }))
    },
  },
  Du = {
    bind: function () {
      var t = this.element,
        i = this.options,
        a = this.cropper
      Ee(i.cropstart) && we(t, da, i.cropstart),
        Ee(i.cropmove) && we(t, ca, i.cropmove),
        Ee(i.cropend) && we(t, sa, i.cropend),
        Ee(i.crop) && we(t, oa, i.crop),
        Ee(i.zoom) && we(t, ua, i.zoom),
        we(a, nr, (this.onCropStart = this.cropStart.bind(this))),
        i.zoomable &&
          i.zoomOnWheel &&
          we(a, cr, (this.onWheel = this.wheel.bind(this)), {
            passive: !1,
            capture: !0,
          }),
        i.toggleDragModeOnDblclick &&
          we(a, ar, (this.onDblclick = this.dblclick.bind(this))),
        we(t.ownerDocument, rr, (this.onCropMove = this.cropMove.bind(this))),
        we(t.ownerDocument, lr, (this.onCropEnd = this.cropEnd.bind(this))),
        i.responsive && we(window, sr, (this.onResize = this.resize.bind(this)))
    },
    unbind: function () {
      var t = this.element,
        i = this.options,
        a = this.cropper
      Ee(i.cropstart) && Oe(t, da, i.cropstart),
        Ee(i.cropmove) && Oe(t, ca, i.cropmove),
        Ee(i.cropend) && Oe(t, sa, i.cropend),
        Ee(i.crop) && Oe(t, oa, i.crop),
        Ee(i.zoom) && Oe(t, ua, i.zoom),
        Oe(a, nr, this.onCropStart),
        i.zoomable &&
          i.zoomOnWheel &&
          Oe(a, cr, this.onWheel, { passive: !1, capture: !0 }),
        i.toggleDragModeOnDblclick && Oe(a, ar, this.onDblclick),
        Oe(t.ownerDocument, rr, this.onCropMove),
        Oe(t.ownerDocument, lr, this.onCropEnd),
        i.responsive && Oe(window, sr, this.onResize)
    },
  },
  Fu = {
    resize: function () {
      if (!this.disabled) {
        var t = this.options,
          i = this.container,
          a = this.containerData,
          n = i.offsetWidth / a.width,
          r = i.offsetHeight / a.height,
          l = Math.abs(n - 1) > Math.abs(r - 1) ? n : r
        if (l !== 1) {
          var o, s
          t.restore &&
            ((o = this.getCanvasData()), (s = this.getCropBoxData())),
            this.render(),
            t.restore &&
              (this.setCanvasData(
                le(o, function (u, c) {
                  o[c] = u * l
                })
              ),
              this.setCropBoxData(
                le(s, function (u, c) {
                  s[c] = u * l
                })
              ))
        }
      }
    },
    dblclick: function () {
      this.disabled ||
        this.options.dragMode === Rr ||
        this.setDragMode(Eu(this.dragBox, ra) ? _r : ga)
    },
    wheel: function (t) {
      var i = this,
        a = Number(this.options.wheelZoomRatio) || 0.1,
        n = 1
      this.disabled ||
        (t.preventDefault(),
        !this.wheeling &&
          ((this.wheeling = !0),
          setTimeout(function () {
            i.wheeling = !1
          }, 50),
          t.deltaY
            ? (n = t.deltaY > 0 ? 1 : -1)
            : t.wheelDelta
              ? (n = -t.wheelDelta / 120)
              : t.detail && (n = t.detail > 0 ? 1 : -1),
          this.zoom(-n * a, t)))
    },
    cropStart: function (t) {
      var i = t.buttons,
        a = t.button
      if (
        !(
          this.disabled ||
          ((t.type === "mousedown" ||
            (t.type === "pointerdown" && t.pointerType === "mouse")) &&
            ((Y(i) && i !== 1) || (Y(a) && a !== 0) || t.ctrlKey))
        )
      ) {
        var n = this.options,
          r = this.pointers,
          l
        t.changedTouches
          ? le(t.changedTouches, function (o) {
              r[o.identifier] = hi(o)
            })
          : (r[t.pointerId || 0] = hi(t)),
          Object.keys(r).length > 1 && n.zoomable && n.zoomOnTouch
            ? (l = Ir)
            : (l = ha(t.target, Bt)),
          ou.test(l) &&
            bt(this.element, da, { originalEvent: t, action: l }) !== !1 &&
            (t.preventDefault(),
            (this.action = l),
            (this.cropping = !1),
            l === Tr && ((this.cropping = !0), de(this.dragBox, mi)))
      }
    },
    cropMove: function (t) {
      var i = this.action
      if (!(this.disabled || !i)) {
        var a = this.pointers
        t.preventDefault(),
          bt(this.element, ca, { originalEvent: t, action: i }) !== !1 &&
            (t.changedTouches
              ? le(t.changedTouches, function (n) {
                  K(a[n.identifier] || {}, hi(n, !0))
                })
              : K(a[t.pointerId || 0] || {}, hi(t, !0)),
            this.change(t))
      }
    },
    cropEnd: function (t) {
      if (!this.disabled) {
        var i = this.action,
          a = this.pointers
        t.changedTouches
          ? le(t.changedTouches, function (n) {
              delete a[n.identifier]
            })
          : delete a[t.pointerId || 0],
          i &&
            (t.preventDefault(),
            Object.keys(a).length || (this.action = ""),
            this.cropping &&
              ((this.cropping = !1),
              Et(this.dragBox, mi, this.cropped && this.options.modal)),
            bt(this.element, sa, { originalEvent: t, action: i }))
      }
    },
  },
  Cu = {
    change: function (t) {
      var i = this.options,
        a = this.canvasData,
        n = this.containerData,
        r = this.cropBoxData,
        l = this.pointers,
        o = this.action,
        s = i.aspectRatio,
        u = r.left,
        c = r.top,
        d = r.width,
        h = r.height,
        m = u + d,
        p = c + h,
        f = 0,
        g = 0,
        I = n.width,
        E = n.height,
        b = !0,
        _
      !s && t.shiftKey && (s = d && h ? d / h : 1),
        this.limited &&
          ((f = r.minLeft),
          (g = r.minTop),
          (I = f + Math.min(n.width, a.width, a.left + a.width)),
          (E = g + Math.min(n.height, a.height, a.top + a.height)))
      var y = l[Object.keys(l)[0]],
        T = { x: y.endX - y.startX, y: y.endY - y.startY },
        v = function (S) {
          switch (S) {
            case tt:
              m + T.x > I && (T.x = I - m)
              break
            case it:
              u + T.x < f && (T.x = f - u)
              break
            case ke:
              c + T.y < g && (T.y = g - c)
              break
            case ft:
              p + T.y > E && (T.y = E - p)
              break
          }
        }
      switch (o) {
        case fa:
          ;(u += T.x), (c += T.y)
          break
        case tt:
          if (T.x >= 0 && (m >= I || (s && (c <= g || p >= E)))) {
            b = !1
            break
          }
          v(tt),
            (d += T.x),
            d < 0 && ((o = it), (d = -d), (u -= d)),
            s && ((h = d / s), (c += (r.height - h) / 2))
          break
        case ke:
          if (T.y <= 0 && (c <= g || (s && (u <= f || m >= I)))) {
            b = !1
            break
          }
          v(ke),
            (h -= T.y),
            (c += T.y),
            h < 0 && ((o = ft), (h = -h), (c -= h)),
            s && ((d = h * s), (u += (r.width - d) / 2))
          break
        case it:
          if (T.x <= 0 && (u <= f || (s && (c <= g || p >= E)))) {
            b = !1
            break
          }
          v(it),
            (d -= T.x),
            (u += T.x),
            d < 0 && ((o = tt), (d = -d), (u -= d)),
            s && ((h = d / s), (c += (r.height - h) / 2))
          break
        case ft:
          if (T.y >= 0 && (p >= E || (s && (u <= f || m >= I)))) {
            b = !1
            break
          }
          v(ft),
            (h += T.y),
            h < 0 && ((o = ke), (h = -h), (c -= h)),
            s && ((d = h * s), (u += (r.width - d) / 2))
          break
        case Dt:
          if (s) {
            if (T.y <= 0 && (c <= g || m >= I)) {
              b = !1
              break
            }
            v(ke), (h -= T.y), (c += T.y), (d = h * s)
          } else
            v(ke),
              v(tt),
              T.x >= 0
                ? m < I
                  ? (d += T.x)
                  : T.y <= 0 && c <= g && (b = !1)
                : (d += T.x),
              T.y <= 0
                ? c > g && ((h -= T.y), (c += T.y))
                : ((h -= T.y), (c += T.y))
          d < 0 && h < 0
            ? ((o = zt), (h = -h), (d = -d), (c -= h), (u -= d))
            : d < 0
              ? ((o = Ft), (d = -d), (u -= d))
              : h < 0 && ((o = Ct), (h = -h), (c -= h))
          break
        case Ft:
          if (s) {
            if (T.y <= 0 && (c <= g || u <= f)) {
              b = !1
              break
            }
            v(ke), (h -= T.y), (c += T.y), (d = h * s), (u += r.width - d)
          } else
            v(ke),
              v(it),
              T.x <= 0
                ? u > f
                  ? ((d -= T.x), (u += T.x))
                  : T.y <= 0 && c <= g && (b = !1)
                : ((d -= T.x), (u += T.x)),
              T.y <= 0
                ? c > g && ((h -= T.y), (c += T.y))
                : ((h -= T.y), (c += T.y))
          d < 0 && h < 0
            ? ((o = Ct), (h = -h), (d = -d), (c -= h), (u -= d))
            : d < 0
              ? ((o = Dt), (d = -d), (u -= d))
              : h < 0 && ((o = zt), (h = -h), (c -= h))
          break
        case zt:
          if (s) {
            if (T.x <= 0 && (u <= f || p >= E)) {
              b = !1
              break
            }
            v(it), (d -= T.x), (u += T.x), (h = d / s)
          } else
            v(ft),
              v(it),
              T.x <= 0
                ? u > f
                  ? ((d -= T.x), (u += T.x))
                  : T.y >= 0 && p >= E && (b = !1)
                : ((d -= T.x), (u += T.x)),
              T.y >= 0 ? p < E && (h += T.y) : (h += T.y)
          d < 0 && h < 0
            ? ((o = Dt), (h = -h), (d = -d), (c -= h), (u -= d))
            : d < 0
              ? ((o = Ct), (d = -d), (u -= d))
              : h < 0 && ((o = Ft), (h = -h), (c -= h))
          break
        case Ct:
          if (s) {
            if (T.x >= 0 && (m >= I || p >= E)) {
              b = !1
              break
            }
            v(tt), (d += T.x), (h = d / s)
          } else
            v(ft),
              v(tt),
              T.x >= 0
                ? m < I
                  ? (d += T.x)
                  : T.y >= 0 && p >= E && (b = !1)
                : (d += T.x),
              T.y >= 0 ? p < E && (h += T.y) : (h += T.y)
          d < 0 && h < 0
            ? ((o = Ft), (h = -h), (d = -d), (c -= h), (u -= d))
            : d < 0
              ? ((o = zt), (d = -d), (u -= d))
              : h < 0 && ((o = Dt), (h = -h), (c -= h))
          break
        case br:
          this.move(T.x, T.y), (b = !1)
          break
        case Ir:
          this.zoom(_u(l), t), (b = !1)
          break
        case Tr:
          if (!T.x || !T.y) {
            b = !1
            break
          }
          ;(_ = Ar(this.cropper)),
            (u = y.startX - _.left),
            (c = y.startY - _.top),
            (d = r.minWidth),
            (h = r.minHeight),
            T.x > 0
              ? (o = T.y > 0 ? Ct : Dt)
              : T.x < 0 && ((u -= d), (o = T.y > 0 ? zt : Ft)),
            T.y < 0 && (c -= h),
            this.cropped ||
              (Pe(this.cropBox, Te),
              (this.cropped = !0),
              this.limited && this.limitCropBox(!0, !0))
          break
      }
      b &&
        ((r.width = d),
        (r.height = h),
        (r.left = u),
        (r.top = c),
        (this.action = o),
        this.renderCropBox()),
        le(l, function (R) {
          ;(R.startX = R.endX), (R.startY = R.endY)
        })
    },
  },
  zu = {
    crop: function () {
      return (
        this.ready &&
          !this.cropped &&
          !this.disabled &&
          ((this.cropped = !0),
          this.limitCropBox(!0, !0),
          this.options.modal && de(this.dragBox, mi),
          Pe(this.cropBox, Te),
          this.setCropBoxData(this.initialCropBoxData)),
        this
      )
    },
    reset: function () {
      return (
        this.ready &&
          !this.disabled &&
          ((this.imageData = K({}, this.initialImageData)),
          (this.canvasData = K({}, this.initialCanvasData)),
          (this.cropBoxData = K({}, this.initialCropBoxData)),
          this.renderCanvas(),
          this.cropped && this.renderCropBox()),
        this
      )
    },
    clear: function () {
      return (
        this.cropped &&
          !this.disabled &&
          (K(this.cropBoxData, { left: 0, top: 0, width: 0, height: 0 }),
          (this.cropped = !1),
          this.renderCropBox(),
          this.limitCanvas(!0, !0),
          this.renderCanvas(),
          Pe(this.dragBox, mi),
          de(this.cropBox, Te)),
        this
      )
    },
    replace: function (t) {
      var i =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
      return (
        !this.disabled &&
          t &&
          (this.isImg && (this.element.src = t),
          i
            ? ((this.url = t),
              (this.image.src = t),
              this.ready &&
                ((this.viewBoxImage.src = t),
                le(this.previews, function (a) {
                  a.getElementsByTagName("img")[0].src = t
                })))
            : (this.isImg && (this.replaced = !0),
              (this.options.data = null),
              this.uncreate(),
              this.load(t))),
        this
      )
    },
    enable: function () {
      return (
        this.ready &&
          this.disabled &&
          ((this.disabled = !1), Pe(this.cropper, tr)),
        this
      )
    },
    disable: function () {
      return (
        this.ready &&
          !this.disabled &&
          ((this.disabled = !0), de(this.cropper, tr)),
        this
      )
    },
    destroy: function () {
      var t = this.element
      return t[Z]
        ? ((t[Z] = void 0),
          this.isImg && this.replaced && (t.src = this.originalUrl),
          this.uncreate(),
          this)
        : this
    },
    move: function (t) {
      var i =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t,
        a = this.canvasData,
        n = a.left,
        r = a.top
      return this.moveTo(ta(t) ? t : n + Number(t), ta(i) ? i : r + Number(i))
    },
    moveTo: function (t) {
      var i =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t,
        a = this.canvasData,
        n = !1
      return (
        (t = Number(t)),
        (i = Number(i)),
        this.ready &&
          !this.disabled &&
          this.options.movable &&
          (Y(t) && ((a.left = t), (n = !0)),
          Y(i) && ((a.top = i), (n = !0)),
          n && this.renderCanvas(!0)),
        this
      )
    },
    zoom: function (t, i) {
      var a = this.canvasData
      return (
        (t = Number(t)),
        t < 0 ? (t = 1 / (1 - t)) : (t = 1 + t),
        this.zoomTo((a.width * t) / a.naturalWidth, null, i)
      )
    },
    zoomTo: function (t, i, a) {
      var n = this.options,
        r = this.canvasData,
        l = r.width,
        o = r.height,
        s = r.naturalWidth,
        u = r.naturalHeight
      if (
        ((t = Number(t)), t >= 0 && this.ready && !this.disabled && n.zoomable)
      ) {
        var c = s * t,
          d = u * t
        if (
          bt(this.element, ua, {
            ratio: t,
            oldRatio: l / s,
            originalEvent: a,
          }) === !1
        )
          return this
        if (a) {
          var h = this.pointers,
            m = Ar(this.cropper),
            p =
              h && Object.keys(h).length
                ? Ru(h)
                : { pageX: a.pageX, pageY: a.pageY }
          ;(r.left -= (c - l) * ((p.pageX - m.left - r.left) / l)),
            (r.top -= (d - o) * ((p.pageY - m.top - r.top) / o))
        } else
          gt(i) && Y(i.x) && Y(i.y)
            ? ((r.left -= (c - l) * ((i.x - r.left) / l)),
              (r.top -= (d - o) * ((i.y - r.top) / o)))
            : ((r.left -= (c - l) / 2), (r.top -= (d - o) / 2))
        ;(r.width = c), (r.height = d), this.renderCanvas(!0)
      }
      return this
    },
    rotate: function (t) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(t))
    },
    rotateTo: function (t) {
      return (
        (t = Number(t)),
        Y(t) &&
          this.ready &&
          !this.disabled &&
          this.options.rotatable &&
          ((this.imageData.rotate = t % 360), this.renderCanvas(!0, !0)),
        this
      )
    },
    scaleX: function (t) {
      var i = this.imageData.scaleY
      return this.scale(t, Y(i) ? i : 1)
    },
    scaleY: function (t) {
      var i = this.imageData.scaleX
      return this.scale(Y(i) ? i : 1, t)
    },
    scale: function (t) {
      var i =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t,
        a = this.imageData,
        n = !1
      return (
        (t = Number(t)),
        (i = Number(i)),
        this.ready &&
          !this.disabled &&
          this.options.scalable &&
          (Y(t) && ((a.scaleX = t), (n = !0)),
          Y(i) && ((a.scaleY = i), (n = !0)),
          n && this.renderCanvas(!0, !0)),
        this
      )
    },
    getData: function () {
      var t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1,
        i = this.options,
        a = this.imageData,
        n = this.canvasData,
        r = this.cropBoxData,
        l
      if (this.ready && this.cropped) {
        l = {
          x: r.left - n.left,
          y: r.top - n.top,
          width: r.width,
          height: r.height,
        }
        var o = a.width / a.naturalWidth
        if (
          (le(l, function (c, d) {
            l[d] = c / o
          }),
          t)
        ) {
          var s = Math.round(l.y + l.height),
            u = Math.round(l.x + l.width)
          ;(l.x = Math.round(l.x)),
            (l.y = Math.round(l.y)),
            (l.width = u - l.x),
            (l.height = s - l.y)
        }
      } else l = { x: 0, y: 0, width: 0, height: 0 }
      return (
        i.rotatable && (l.rotate = a.rotate || 0),
        i.scalable && ((l.scaleX = a.scaleX || 1), (l.scaleY = a.scaleY || 1)),
        l
      )
    },
    setData: function (t) {
      var i = this.options,
        a = this.imageData,
        n = this.canvasData,
        r = {}
      if (this.ready && !this.disabled && gt(t)) {
        var l = !1
        i.rotatable &&
          Y(t.rotate) &&
          t.rotate !== a.rotate &&
          ((a.rotate = t.rotate), (l = !0)),
          i.scalable &&
            (Y(t.scaleX) &&
              t.scaleX !== a.scaleX &&
              ((a.scaleX = t.scaleX), (l = !0)),
            Y(t.scaleY) &&
              t.scaleY !== a.scaleY &&
              ((a.scaleY = t.scaleY), (l = !0))),
          l && this.renderCanvas(!0, !0)
        var o = a.width / a.naturalWidth
        Y(t.x) && (r.left = t.x * o + n.left),
          Y(t.y) && (r.top = t.y * o + n.top),
          Y(t.width) && (r.width = t.width * o),
          Y(t.height) && (r.height = t.height * o),
          this.setCropBoxData(r)
      }
      return this
    },
    getContainerData: function () {
      return this.ready ? K({}, this.containerData) : {}
    },
    getImageData: function () {
      return this.sized ? K({}, this.imageData) : {}
    },
    getCanvasData: function () {
      var t = this.canvasData,
        i = {}
      return (
        this.ready &&
          le(
            ["left", "top", "width", "height", "naturalWidth", "naturalHeight"],
            function (a) {
              i[a] = t[a]
            }
          ),
        i
      )
    },
    setCanvasData: function (t) {
      var i = this.canvasData,
        a = i.aspectRatio
      return (
        this.ready &&
          !this.disabled &&
          gt(t) &&
          (Y(t.left) && (i.left = t.left),
          Y(t.top) && (i.top = t.top),
          Y(t.width)
            ? ((i.width = t.width), (i.height = t.width / a))
            : Y(t.height) && ((i.height = t.height), (i.width = t.height * a)),
          this.renderCanvas(!0)),
        this
      )
    },
    getCropBoxData: function () {
      var t = this.cropBoxData,
        i
      return (
        this.ready &&
          this.cropped &&
          (i = { left: t.left, top: t.top, width: t.width, height: t.height }),
        i || {}
      )
    },
    setCropBoxData: function (t) {
      var i = this.cropBoxData,
        a = this.options.aspectRatio,
        n,
        r
      return (
        this.ready &&
          this.cropped &&
          !this.disabled &&
          gt(t) &&
          (Y(t.left) && (i.left = t.left),
          Y(t.top) && (i.top = t.top),
          Y(t.width) && t.width !== i.width && ((n = !0), (i.width = t.width)),
          Y(t.height) &&
            t.height !== i.height &&
            ((r = !0), (i.height = t.height)),
          a && (n ? (i.height = i.width / a) : r && (i.width = i.height * a)),
          this.renderCropBox()),
        this
      )
    },
    getCroppedCanvas: function () {
      var t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      if (!this.ready || !window.HTMLCanvasElement) return null
      var i = this.canvasData,
        a = Su(this.image, this.imageData, i, t)
      if (!this.cropped) return a
      var n = this.getData(t.rounded),
        r = n.x,
        l = n.y,
        o = n.width,
        s = n.height,
        u = a.width / Math.floor(i.naturalWidth)
      u !== 1 && ((r *= u), (l *= u), (o *= u), (s *= u))
      var c = o / s,
        d = We({
          aspectRatio: c,
          width: t.maxWidth || 1 / 0,
          height: t.maxHeight || 1 / 0,
        }),
        h = We(
          { aspectRatio: c, width: t.minWidth || 0, height: t.minHeight || 0 },
          "cover"
        ),
        m = We({
          aspectRatio: c,
          width: t.width || (u !== 1 ? a.width : o),
          height: t.height || (u !== 1 ? a.height : s),
        }),
        p = m.width,
        f = m.height
      ;(p = Math.min(d.width, Math.max(h.width, p))),
        (f = Math.min(d.height, Math.max(h.height, f)))
      var g = document.createElement("canvas"),
        I = g.getContext("2d")
      ;(g.width = Tt(p)),
        (g.height = Tt(f)),
        (I.fillStyle = t.fillColor || "transparent"),
        I.fillRect(0, 0, p, f)
      var E = t.imageSmoothingEnabled,
        b = E === void 0 ? !0 : E,
        _ = t.imageSmoothingQuality
      ;(I.imageSmoothingEnabled = b), _ && (I.imageSmoothingQuality = _)
      var y = a.width,
        T = a.height,
        v = r,
        R = l,
        S,
        P,
        O,
        x,
        z,
        L
      v <= -o || v > y
        ? ((v = 0), (S = 0), (O = 0), (z = 0))
        : v <= 0
          ? ((O = -v), (v = 0), (S = Math.min(y, o + v)), (z = S))
          : v <= y && ((O = 0), (S = Math.min(o, y - v)), (z = S)),
        S <= 0 || R <= -s || R > T
          ? ((R = 0), (P = 0), (x = 0), (L = 0))
          : R <= 0
            ? ((x = -R), (R = 0), (P = Math.min(T, s + R)), (L = P))
            : R <= T && ((x = 0), (P = Math.min(s, T - R)), (L = P))
      var F = [v, R, S, P]
      if (z > 0 && L > 0) {
        var w = p / o
        F.push(O * w, x * w, z * w, L * w)
      }
      return (
        I.drawImage.apply(
          I,
          [a].concat(
            Er(
              F.map(function (A) {
                return Math.floor(Tt(A))
              })
            )
          )
        ),
        g
      )
    },
    setAspectRatio: function (t) {
      var i = this.options
      return (
        !this.disabled &&
          !ta(t) &&
          ((i.aspectRatio = Math.max(0, t) || NaN),
          this.ready &&
            (this.initCropBox(), this.cropped && this.renderCropBox())),
        this
      )
    },
    setDragMode: function (t) {
      var i = this.options,
        a = this.dragBox,
        n = this.face
      if (this.ready && !this.disabled) {
        var r = t === ga,
          l = i.movable && t === _r
        ;(t = r || l ? t : Rr),
          (i.dragMode = t),
          Vt(a, Bt, t),
          Et(a, ra, r),
          Et(a, la, l),
          i.cropBoxMovable || (Vt(n, Bt, t), Et(n, ra, r), Et(n, la, l))
      }
      return this
    },
  },
  Nu = De.Cropper,
  Ta = (function () {
    function e(t) {
      var i =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
      if ((Qd(this, e), !t || !du.test(t.tagName)))
        throw new Error(
          "The first argument is required and must be an <img> or <canvas> element."
        )
      ;(this.element = t),
        (this.options = K({}, ur, gt(i) && i)),
        (this.cropped = !1),
        (this.disabled = !1),
        (this.pointers = {}),
        (this.ready = !1),
        (this.reloading = !1),
        (this.replaced = !1),
        (this.sized = !1),
        (this.sizing = !1),
        this.init()
    }
    return Zd(
      e,
      [
        {
          key: "init",
          value: function () {
            var i = this.element,
              a = i.tagName.toLowerCase(),
              n
            if (!i[Z]) {
              if (((i[Z] = this), a === "img")) {
                if (
                  ((this.isImg = !0),
                  (n = i.getAttribute("src") || ""),
                  (this.originalUrl = n),
                  !n)
                )
                  return
                n = i.src
              } else
                a === "canvas" &&
                  window.HTMLCanvasElement &&
                  (n = i.toDataURL())
              this.load(n)
            }
          },
        },
        {
          key: "load",
          value: function (i) {
            var a = this
            if (i) {
              ;(this.url = i), (this.imageData = {})
              var n = this.element,
                r = this.options
              if (
                (!r.rotatable && !r.scalable && (r.checkOrientation = !1),
                !r.checkOrientation || !window.ArrayBuffer)
              ) {
                this.clone()
                return
              }
              if (su.test(i)) {
                cu.test(i) ? this.read(Lu(i)) : this.clone()
                return
              }
              var l = new XMLHttpRequest(),
                o = this.clone.bind(this)
              ;(this.reloading = !0),
                (this.xhr = l),
                (l.onabort = o),
                (l.onerror = o),
                (l.ontimeout = o),
                (l.onprogress = function () {
                  l.getResponseHeader("content-type") !== dr && l.abort()
                }),
                (l.onload = function () {
                  a.read(l.response)
                }),
                (l.onloadend = function () {
                  ;(a.reloading = !1), (a.xhr = null)
                }),
                r.checkCrossOrigin && mr(i) && n.crossOrigin && (i = pr(i)),
                l.open("GET", i, !0),
                (l.responseType = "arraybuffer"),
                (l.withCredentials = n.crossOrigin === "use-credentials"),
                l.send()
            }
          },
        },
        {
          key: "read",
          value: function (i) {
            var a = this.options,
              n = this.imageData,
              r = Mu(i),
              l = 0,
              o = 1,
              s = 1
            if (r > 1) {
              this.url = Au(i, dr)
              var u = xu(r)
              ;(l = u.rotate), (o = u.scaleX), (s = u.scaleY)
            }
            a.rotatable && (n.rotate = l),
              a.scalable && ((n.scaleX = o), (n.scaleY = s)),
              this.clone()
          },
        },
        {
          key: "clone",
          value: function () {
            var i = this.element,
              a = this.url,
              n = i.crossOrigin,
              r = a
            this.options.checkCrossOrigin &&
              mr(a) &&
              (n || (n = "anonymous"), (r = pr(a))),
              (this.crossOrigin = n),
              (this.crossOriginUrl = r)
            var l = document.createElement("img")
            n && (l.crossOrigin = n),
              (l.src = r || a),
              (l.alt = i.alt || "The image to crop"),
              (this.image = l),
              (l.onload = this.start.bind(this)),
              (l.onerror = this.stop.bind(this)),
              de(l, ir),
              i.parentNode.insertBefore(l, i.nextSibling)
          },
        },
        {
          key: "start",
          value: function () {
            var i = this,
              a = this.image
            ;(a.onload = null), (a.onerror = null), (this.sizing = !0)
            var n =
                De.navigator &&
                /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(
                  De.navigator.userAgent
                ),
              r = function (u, c) {
                K(i.imageData, {
                  naturalWidth: u,
                  naturalHeight: c,
                  aspectRatio: u / c,
                }),
                  (i.initialImageData = K({}, i.imageData)),
                  (i.sizing = !1),
                  (i.sized = !0),
                  i.build()
              }
            if (a.naturalWidth && !n) {
              r(a.naturalWidth, a.naturalHeight)
              return
            }
            var l = document.createElement("img"),
              o = document.body || document.documentElement
            ;(this.sizingImage = l),
              (l.onload = function () {
                r(l.width, l.height), n || o.removeChild(l)
              }),
              (l.src = a.src),
              n ||
                ((l.style.cssText =
                  "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;"),
                o.appendChild(l))
          },
        },
        {
          key: "stop",
          value: function () {
            var i = this.image
            ;(i.onload = null),
              (i.onerror = null),
              i.parentNode.removeChild(i),
              (this.image = null)
          },
        },
        {
          key: "build",
          value: function () {
            if (!(!this.sized || this.ready)) {
              var i = this.element,
                a = this.options,
                n = this.image,
                r = i.parentNode,
                l = document.createElement("div")
              l.innerHTML = uu
              var o = l.querySelector(".".concat(Z, "-container")),
                s = o.querySelector(".".concat(Z, "-canvas")),
                u = o.querySelector(".".concat(Z, "-drag-box")),
                c = o.querySelector(".".concat(Z, "-crop-box")),
                d = c.querySelector(".".concat(Z, "-face"))
              ;(this.container = r),
                (this.cropper = o),
                (this.canvas = s),
                (this.dragBox = u),
                (this.cropBox = c),
                (this.viewBox = o.querySelector(".".concat(Z, "-view-box"))),
                (this.face = d),
                s.appendChild(n),
                de(i, Te),
                r.insertBefore(o, i.nextSibling),
                Pe(n, ir),
                this.initPreview(),
                this.bind(),
                (a.initialAspectRatio =
                  Math.max(0, a.initialAspectRatio) || NaN),
                (a.aspectRatio = Math.max(0, a.aspectRatio) || NaN),
                (a.viewMode =
                  Math.max(0, Math.min(3, Math.round(a.viewMode))) || 0),
                de(c, Te),
                a.guides ||
                  de(c.getElementsByClassName("".concat(Z, "-dashed")), Te),
                a.center ||
                  de(c.getElementsByClassName("".concat(Z, "-center")), Te),
                a.background && de(o, "".concat(Z, "-bg")),
                a.highlight || de(d, au),
                a.cropBoxMovable && (de(d, la), Vt(d, Bt, fa)),
                a.cropBoxResizable ||
                  (de(c.getElementsByClassName("".concat(Z, "-line")), Te),
                  de(c.getElementsByClassName("".concat(Z, "-point")), Te)),
                this.render(),
                (this.ready = !0),
                this.setDragMode(a.dragMode),
                a.autoCrop && this.crop(),
                this.setData(a.data),
                Ee(a.ready) && we(i, or, a.ready, { once: !0 }),
                bt(i, or)
            }
          },
        },
        {
          key: "unbuild",
          value: function () {
            if (this.ready) {
              ;(this.ready = !1), this.unbind(), this.resetPreview()
              var i = this.cropper.parentNode
              i && i.removeChild(this.cropper), Pe(this.element, Te)
            }
          },
        },
        {
          key: "uncreate",
          value: function () {
            this.ready
              ? (this.unbuild(), (this.ready = !1), (this.cropped = !1))
              : this.sizing
                ? ((this.sizingImage.onload = null),
                  (this.sizing = !1),
                  (this.sized = !1))
                : this.reloading
                  ? ((this.xhr.onabort = null), this.xhr.abort())
                  : this.image && this.stop()
          },
        },
      ],
      [
        {
          key: "noConflict",
          value: function () {
            return (window.Cropper = Nu), e
          },
        },
        {
          key: "setDefaults",
          value: function (i) {
            K(ur, gt(i) && i)
          },
        },
      ]
    )
  })()
K(Ta.prototype, Ou, Pu, Du, Fu, Cu, zu)
var xr = ({ addFilter: e, utils: t }) => {
    let { Type: i, replaceInString: a, toNaturalFileSize: n } = t
    return (
      e("ALLOW_HOPPER_ITEM", (r, { query: l }) => {
        if (!l("GET_ALLOW_FILE_SIZE_VALIDATION")) return !0
        let o = l("GET_MAX_FILE_SIZE")
        if (o !== null && r.size > o) return !1
        let s = l("GET_MIN_FILE_SIZE")
        return !(s !== null && r.size < s)
      }),
      e(
        "LOAD_FILE",
        (r, { query: l }) =>
          new Promise((o, s) => {
            if (!l("GET_ALLOW_FILE_SIZE_VALIDATION")) return o(r)
            let u = l("GET_FILE_VALIDATE_SIZE_FILTER")
            if (u && !u(r)) return o(r)
            let c = l("GET_MAX_FILE_SIZE")
            if (c !== null && r.size > c) {
              s({
                status: {
                  main: l("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
                  sub: a(l("GET_LABEL_MAX_FILE_SIZE"), {
                    filesize: n(
                      c,
                      ".",
                      l("GET_FILE_SIZE_BASE"),
                      l("GET_FILE_SIZE_LABELS", l)
                    ),
                  }),
                },
              })
              return
            }
            let d = l("GET_MIN_FILE_SIZE")
            if (d !== null && r.size < d) {
              s({
                status: {
                  main: l("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
                  sub: a(l("GET_LABEL_MIN_FILE_SIZE"), {
                    filesize: n(
                      d,
                      ".",
                      l("GET_FILE_SIZE_BASE"),
                      l("GET_FILE_SIZE_LABELS", l)
                    ),
                  }),
                },
              })
              return
            }
            let h = l("GET_MAX_TOTAL_FILE_SIZE")
            if (
              h !== null &&
              l("GET_ACTIVE_ITEMS").reduce((p, f) => p + f.fileSize, 0) > h
            ) {
              s({
                status: {
                  main: l("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"),
                  sub: a(l("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
                    filesize: n(
                      h,
                      ".",
                      l("GET_FILE_SIZE_BASE"),
                      l("GET_FILE_SIZE_LABELS", l)
                    ),
                  }),
                },
              })
              return
            }
            o(r)
          })
      ),
      {
        options: {
          allowFileSizeValidation: [!0, i.BOOLEAN],
          maxFileSize: [null, i.INT],
          minFileSize: [null, i.INT],
          maxTotalFileSize: [null, i.INT],
          fileValidateSizeFilter: [null, i.FUNCTION],
          labelMinFileSizeExceeded: ["File is too small", i.STRING],
          labelMinFileSize: ["Minimum file size is {filesize}", i.STRING],
          labelMaxFileSizeExceeded: ["File is too large", i.STRING],
          labelMaxFileSize: ["Maximum file size is {filesize}", i.STRING],
          labelMaxTotalFileSizeExceeded: [
            "Maximum total size exceeded",
            i.STRING,
          ],
          labelMaxTotalFileSize: [
            "Maximum total file size is {filesize}",
            i.STRING,
          ],
        },
      }
    )
  },
  Bu = typeof window < "u" && typeof window.document < "u"
Bu &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: xr })
  )
var Or = xr
var Pr = ({ addFilter: e, utils: t }) => {
    let {
        Type: i,
        isString: a,
        replaceInString: n,
        guesstimateMimeType: r,
        getExtensionFromFilename: l,
        getFilenameFromURL: o,
      } = t,
      s = (m, p) => {
        let f = (/^[^/]+/.exec(m) || []).pop(),
          g = p.slice(0, -2)
        return f === g
      },
      u = (m, p) => m.some((f) => (/\*$/.test(f) ? s(p, f) : f === p)),
      c = (m) => {
        let p = ""
        if (a(m)) {
          let f = o(m),
            g = l(f)
          g && (p = r(g))
        } else p = m.type
        return p
      },
      d = (m, p, f) => {
        if (p.length === 0) return !0
        let g = c(m)
        return f
          ? new Promise((I, E) => {
              f(m, g)
                .then((b) => {
                  u(p, b) ? I() : E()
                })
                .catch(E)
            })
          : u(p, g)
      },
      h = (m) => (p) => (m[p] === null ? !1 : m[p] || p)
    return (
      e("SET_ATTRIBUTE_TO_OPTION_MAP", (m) =>
        Object.assign(m, { accept: "acceptedFileTypes" })
      ),
      e("ALLOW_HOPPER_ITEM", (m, { query: p }) =>
        p("GET_ALLOW_FILE_TYPE_VALIDATION")
          ? d(m, p("GET_ACCEPTED_FILE_TYPES"))
          : !0
      ),
      e(
        "LOAD_FILE",
        (m, { query: p }) =>
          new Promise((f, g) => {
            if (!p("GET_ALLOW_FILE_TYPE_VALIDATION")) {
              f(m)
              return
            }
            let I = p("GET_ACCEPTED_FILE_TYPES"),
              E = p("GET_FILE_VALIDATE_TYPE_DETECT_TYPE"),
              b = d(m, I, E),
              _ = () => {
                let y = I.map(
                    h(p("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"))
                  ).filter((v) => v !== !1),
                  T = y.filter((v, R) => y.indexOf(v) === R)
                g({
                  status: {
                    main: p("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
                    sub: n(p("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"), {
                      allTypes: T.join(", "),
                      allButLastType: T.slice(0, -1).join(", "),
                      lastType: T[T.length - 1],
                    }),
                  },
                })
              }
            if (typeof b == "boolean") return b ? f(m) : _()
            b.then(() => {
              f(m)
            }).catch(_)
          })
      ),
      {
        options: {
          allowFileTypeValidation: [!0, i.BOOLEAN],
          acceptedFileTypes: [[], i.ARRAY],
          labelFileTypeNotAllowed: ["File is of invalid type", i.STRING],
          fileValidateTypeLabelExpectedTypes: [
            "Expects {allButLastType} or {lastType}",
            i.STRING,
          ],
          fileValidateTypeLabelExpectedTypesMap: [{}, i.OBJECT],
          fileValidateTypeDetectType: [null, i.FUNCTION],
        },
      }
    )
  },
  Vu = typeof window < "u" && typeof window.document < "u"
Vu &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: Pr })
  )
var Dr = Pr
var Fr = (e) => /^image/.test(e.type),
  Cr = ({ addFilter: e, utils: t }) => {
    let { Type: i, isFile: a, getNumericAspectRatioFromString: n } = t,
      r = (u, c) => !(!Fr(u.file) || !c("GET_ALLOW_IMAGE_CROP")),
      l = (u) => typeof u == "object",
      o = (u) => typeof u == "number",
      s = (u, c) =>
        u.setMetadata("crop", Object.assign({}, u.getMetadata("crop"), c))
    return (
      e("DID_CREATE_ITEM", (u, { query: c }) => {
        u.extend("setImageCrop", (d) => {
          if (!(!r(u, c) || !l(center))) return u.setMetadata("crop", d), d
        }),
          u.extend("setImageCropCenter", (d) => {
            if (!(!r(u, c) || !l(d))) return s(u, { center: d })
          }),
          u.extend("setImageCropZoom", (d) => {
            if (!(!r(u, c) || !o(d))) return s(u, { zoom: Math.max(1, d) })
          }),
          u.extend("setImageCropRotation", (d) => {
            if (!(!r(u, c) || !o(d))) return s(u, { rotation: d })
          }),
          u.extend("setImageCropFlip", (d) => {
            if (!(!r(u, c) || !l(d))) return s(u, { flip: d })
          }),
          u.extend("setImageCropAspectRatio", (d) => {
            if (!r(u, c) || typeof d > "u") return
            let h = u.getMetadata("crop"),
              m = n(d),
              p = {
                center: { x: 0.5, y: 0.5 },
                flip: h
                  ? Object.assign({}, h.flip)
                  : { horizontal: !1, vertical: !1 },
                rotation: 0,
                zoom: 1,
                aspectRatio: m,
              }
            return u.setMetadata("crop", p), p
          })
      }),
      e(
        "DID_LOAD_ITEM",
        (u, { query: c }) =>
          new Promise((d, h) => {
            let m = u.file
            if (
              !a(m) ||
              !Fr(m) ||
              !c("GET_ALLOW_IMAGE_CROP") ||
              u.getMetadata("crop")
            )
              return d(u)
            let f = c("GET_IMAGE_CROP_ASPECT_RATIO")
            u.setMetadata("crop", {
              center: { x: 0.5, y: 0.5 },
              flip: { horizontal: !1, vertical: !1 },
              rotation: 0,
              zoom: 1,
              aspectRatio: f ? n(f) : null,
            }),
              d(u)
          })
      ),
      {
        options: {
          allowImageCrop: [!0, i.BOOLEAN],
          imageCropAspectRatio: [null, i.STRING],
        },
      }
    )
  },
  Gu = typeof window < "u" && typeof window.document < "u"
Gu &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: Cr })
  )
var zr = Cr
var ba = (e) => /^image/.test(e.type),
  Nr = (e) => {
    let { addFilter: t, utils: i, views: a } = e,
      { Type: n, createRoute: r, createItemAPI: l = (c) => c } = i,
      { fileActionButton: o } = a
    t(
      "SHOULD_REMOVE_ON_REVERT",
      (c, { item: d, query: h }) =>
        new Promise((m) => {
          let { file: p } = d,
            f =
              h("GET_ALLOW_IMAGE_EDIT") &&
              h("GET_IMAGE_EDIT_ALLOW_EDIT") &&
              ba(p)
          m(!f)
        })
    ),
      t(
        "DID_LOAD_ITEM",
        (c, { query: d, dispatch: h }) =>
          new Promise((m, p) => {
            if (c.origin > 1) {
              m(c)
              return
            }
            let { file: f } = c
            if (
              !d("GET_ALLOW_IMAGE_EDIT") ||
              !d("GET_IMAGE_EDIT_INSTANT_EDIT")
            ) {
              m(c)
              return
            }
            if (!ba(f)) {
              m(c)
              return
            }
            let g = (E, b, _) => (y) => {
                s.shift(), y ? b(E) : _(E), h("KICK"), I()
              },
              I = () => {
                if (!s.length) return
                let { item: E, resolve: b, reject: _ } = s[0]
                h("EDIT_ITEM", { id: E.id, handleEditorResponse: g(E, b, _) })
              }
            u({ item: c, resolve: m, reject: p }), s.length === 1 && I()
          })
      ),
      t("DID_CREATE_ITEM", (c, { query: d, dispatch: h }) => {
        c.extend("edit", () => {
          h("EDIT_ITEM", { id: c.id })
        })
      })
    let s = [],
      u = (c) => (s.push(c), c)
    return (
      t("CREATE_VIEW", (c) => {
        let { is: d, view: h, query: m } = c
        if (!m("GET_ALLOW_IMAGE_EDIT")) return
        let p = m("GET_ALLOW_IMAGE_PREVIEW")
        if (!((d("file-info") && !p) || (d("file") && p))) return
        let g = m("GET_IMAGE_EDIT_EDITOR")
        if (!g) return
        g.filepondCallbackBridge ||
          ((g.outputData = !0),
          (g.outputFile = !1),
          (g.filepondCallbackBridge = {
            onconfirm: g.onconfirm || (() => {}),
            oncancel: g.oncancel || (() => {}),
          }))
        let I = ({ root: _, props: y, action: T }) => {
            let { id: v } = y,
              { handleEditorResponse: R } = T
            ;(g.cropAspectRatio =
              _.query("GET_IMAGE_CROP_ASPECT_RATIO") || g.cropAspectRatio),
              (g.outputCanvasBackgroundColor =
                _.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR") ||
                g.outputCanvasBackgroundColor)
            let S = _.query("GET_ITEM", v)
            if (!S) return
            let P = S.file,
              O = S.getMetadata("crop"),
              x = {
                center: { x: 0.5, y: 0.5 },
                flip: { horizontal: !1, vertical: !1 },
                zoom: 1,
                rotation: 0,
                aspectRatio: null,
              },
              z = S.getMetadata("resize"),
              L = S.getMetadata("filter") || null,
              F = S.getMetadata("filters") || null,
              w = S.getMetadata("colors") || null,
              A = S.getMetadata("markup") || null,
              C = {
                crop: O || x,
                size: z
                  ? {
                      upscale: z.upscale,
                      mode: z.mode,
                      width: z.size.width,
                      height: z.size.height,
                    }
                  : null,
                filter: F
                  ? F.id || F.matrix
                  : _.query("GET_ALLOW_IMAGE_FILTER") &&
                      _.query("GET_IMAGE_FILTER_COLOR_MATRIX") &&
                      !w
                    ? L
                    : null,
                color: w,
                markup: A,
              }
            ;(g.onconfirm = ({ data: D }) => {
              let {
                  crop: V,
                  size: B,
                  filter: j,
                  color: q,
                  colorMatrix: X,
                  markup: ue,
                } = D,
                U = {}
              if ((V && (U.crop = V), B)) {
                let W = (S.getMetadata("resize") || {}).size,
                  $ = { width: B.width, height: B.height }
                !($.width && $.height) &&
                  W &&
                  (($.width = W.width), ($.height = W.height)),
                  ($.width || $.height) &&
                    (U.resize = { upscale: B.upscale, mode: B.mode, size: $ })
              }
              ue && (U.markup = ue),
                (U.colors = q),
                (U.filters = j),
                (U.filter = X),
                S.setMetadata(U),
                g.filepondCallbackBridge.onconfirm(D, l(S)),
                R &&
                  (g.onclose = () => {
                    R(!0), (g.onclose = null)
                  })
            }),
              (g.oncancel = () => {
                g.filepondCallbackBridge.oncancel(l(S)),
                  R &&
                    (g.onclose = () => {
                      R(!1), (g.onclose = null)
                    })
              }),
              g.open(P, C)
          },
          E = ({ root: _, props: y }) => {
            if (!m("GET_IMAGE_EDIT_ALLOW_EDIT")) return
            let { id: T } = y,
              v = m("GET_ITEM", T)
            if (!v) return
            let R = v.file
            if (ba(R))
              if (
                ((_.ref.handleEdit = (S) => {
                  S.stopPropagation(), _.dispatch("EDIT_ITEM", { id: T })
                }),
                p)
              ) {
                let S = h.createChildView(o, {
                  label: "edit",
                  icon: m("GET_IMAGE_EDIT_ICON_EDIT"),
                  opacity: 0,
                })
                S.element.classList.add("filepond--action-edit-item"),
                  (S.element.dataset.align = m(
                    "GET_STYLE_IMAGE_EDIT_BUTTON_EDIT_ITEM_POSITION"
                  )),
                  S.on("click", _.ref.handleEdit),
                  (_.ref.buttonEditItem = h.appendChildView(S))
              } else {
                let S = h.element.querySelector(".filepond--file-info-main"),
                  P = document.createElement("button")
                ;(P.className = "filepond--action-edit-item-alt"),
                  (P.innerHTML =
                    m("GET_IMAGE_EDIT_ICON_EDIT") + "<span>edit</span>"),
                  P.addEventListener("click", _.ref.handleEdit),
                  S.appendChild(P),
                  (_.ref.editButton = P)
              }
          }
        h.registerDestroyer(({ root: _ }) => {
          _.ref.buttonEditItem &&
            _.ref.buttonEditItem.off("click", _.ref.handleEdit),
            _.ref.editButton &&
              _.ref.editButton.removeEventListener("click", _.ref.handleEdit)
        })
        let b = { EDIT_ITEM: I, DID_LOAD_ITEM: E }
        if (p) {
          let _ = ({ root: y }) => {
            y.ref.buttonEditItem && (y.ref.buttonEditItem.opacity = 1)
          }
          b.DID_IMAGE_PREVIEW_SHOW = _
        }
        h.registerWriter(r(b))
      }),
      {
        options: {
          allowImageEdit: [!0, n.BOOLEAN],
          styleImageEditButtonEditItemPosition: ["bottom center", n.STRING],
          imageEditInstantEdit: [!1, n.BOOLEAN],
          imageEditAllowEdit: [!0, n.BOOLEAN],
          imageEditIconEdit: [
            '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z" fill="currentColor" fill-rule="nonzero"/></svg>',
            n.STRING,
          ],
          imageEditEditor: [null, n.OBJECT],
        },
      }
    )
  },
  Uu = typeof window < "u" && typeof window.document < "u"
Uu &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: Nr })
  )
var Br = Nr
var ku = (e) => /^image\/jpeg/.test(e.type),
  nt = {
    JPEG: 65496,
    APP1: 65505,
    EXIF: 1165519206,
    TIFF: 18761,
    Orientation: 274,
    Unknown: 65280,
  },
  rt = (e, t, i = !1) => e.getUint16(t, i),
  Vr = (e, t, i = !1) => e.getUint32(t, i),
  Hu = (e) =>
    new Promise((t, i) => {
      let a = new FileReader()
      ;(a.onload = function (n) {
        let r = new DataView(n.target.result)
        if (rt(r, 0) !== nt.JPEG) {
          t(-1)
          return
        }
        let l = r.byteLength,
          o = 2
        for (; o < l; ) {
          let s = rt(r, o)
          if (((o += 2), s === nt.APP1)) {
            if (Vr(r, (o += 2)) !== nt.EXIF) break
            let u = rt(r, (o += 6)) === nt.TIFF
            o += Vr(r, o + 4, u)
            let c = rt(r, o, u)
            o += 2
            for (let d = 0; d < c; d++)
              if (rt(r, o + d * 12, u) === nt.Orientation) {
                t(rt(r, o + d * 12 + 8, u))
                return
              }
          } else {
            if ((s & nt.Unknown) !== nt.Unknown) break
            o += rt(r, o)
          }
        }
        t(-1)
      }),
        a.readAsArrayBuffer(e.slice(0, 64 * 1024))
    }),
  Wu = (() => typeof window < "u" && typeof window.document < "u")(),
  Yu = () => Wu,
  $u =
    "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=",
  Gr,
  fi = Yu() ? new Image() : {}
fi.onload = () => (Gr = fi.naturalWidth > fi.naturalHeight)
fi.src = $u
var qu = () => Gr,
  Ur = ({ addFilter: e, utils: t }) => {
    let { Type: i, isFile: a } = t
    return (
      e(
        "DID_LOAD_ITEM",
        (n, { query: r }) =>
          new Promise((l, o) => {
            let s = n.file
            if (
              !a(s) ||
              !ku(s) ||
              !r("GET_ALLOW_IMAGE_EXIF_ORIENTATION") ||
              !qu()
            )
              return l(n)
            Hu(s).then((u) => {
              n.setMetadata("exif", { orientation: u }), l(n)
            })
          })
      ),
      { options: { allowImageExifOrientation: [!0, i.BOOLEAN] } }
    )
  },
  ju = typeof window < "u" && typeof window.document < "u"
ju &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: Ur })
  )
var kr = Ur
var Xu = (e) => /^image/.test(e.type),
  Hr = (e, t) => Ut(e.x * t, e.y * t),
  Wr = (e, t) => Ut(e.x + t.x, e.y + t.y),
  Qu = (e) => {
    let t = Math.sqrt(e.x * e.x + e.y * e.y)
    return t === 0 ? { x: 0, y: 0 } : Ut(e.x / t, e.y / t)
  },
  gi = (e, t, i) => {
    let a = Math.cos(t),
      n = Math.sin(t),
      r = Ut(e.x - i.x, e.y - i.y)
    return Ut(i.x + a * r.x - n * r.y, i.y + n * r.x + a * r.y)
  },
  Ut = (e = 0, t = 0) => ({ x: e, y: t }),
  be = (e, t, i = 1, a) => {
    if (typeof e == "string") return parseFloat(e) * i
    if (typeof e == "number")
      return e * (a ? t[a] : Math.min(t.width, t.height))
  },
  Zu = (e, t, i) => {
    let a = e.borderStyle || e.lineStyle || "solid",
      n = e.backgroundColor || e.fontColor || "transparent",
      r = e.borderColor || e.lineColor || "transparent",
      l = be(e.borderWidth || e.lineWidth, t, i),
      o = e.lineCap || "round",
      s = e.lineJoin || "round",
      u = typeof a == "string" ? "" : a.map((d) => be(d, t, i)).join(","),
      c = e.opacity || 1
    return {
      "stroke-linecap": o,
      "stroke-linejoin": s,
      "stroke-width": l || 0,
      "stroke-dasharray": u,
      stroke: r,
      fill: n,
      opacity: c,
    }
  },
  ve = (e) => e != null,
  Ku = (e, t, i = 1) => {
    let a = be(e.x, t, i, "width") || be(e.left, t, i, "width"),
      n = be(e.y, t, i, "height") || be(e.top, t, i, "height"),
      r = be(e.width, t, i, "width"),
      l = be(e.height, t, i, "height"),
      o = be(e.right, t, i, "width"),
      s = be(e.bottom, t, i, "height")
    return (
      ve(n) || (ve(l) && ve(s) ? (n = t.height - l - s) : (n = s)),
      ve(a) || (ve(r) && ve(o) ? (a = t.width - r - o) : (a = o)),
      ve(r) || (ve(a) && ve(o) ? (r = t.width - a - o) : (r = 0)),
      ve(l) || (ve(n) && ve(s) ? (l = t.height - n - s) : (l = 0)),
      { x: a || 0, y: n || 0, width: r || 0, height: l || 0 }
    )
  },
  Ju = (e) => e.map((t, i) => `${i === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" "),
  Ce = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i])),
  eh = "http://www.w3.org/2000/svg",
  It = (e, t) => {
    let i = document.createElementNS(eh, e)
    return t && Ce(i, t), i
  },
  th = (e) => Ce(e, { ...e.rect, ...e.styles }),
  ih = (e) => {
    let t = e.rect.x + e.rect.width * 0.5,
      i = e.rect.y + e.rect.height * 0.5,
      a = e.rect.width * 0.5,
      n = e.rect.height * 0.5
    return Ce(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles })
  },
  ah = { contain: "xMidYMid meet", cover: "xMidYMid slice" },
  nh = (e, t) => {
    Ce(e, { ...e.rect, ...e.styles, preserveAspectRatio: ah[t.fit] || "none" })
  },
  rh = { left: "start", center: "middle", right: "end" },
  lh = (e, t, i, a) => {
    let n = be(t.fontSize, i, a),
      r = t.fontFamily || "sans-serif",
      l = t.fontWeight || "normal",
      o = rh[t.textAlign] || "start"
    Ce(e, {
      ...e.rect,
      ...e.styles,
      "stroke-width": 0,
      "font-weight": l,
      "font-size": n,
      "font-family": r,
      "text-anchor": o,
    }),
      e.text !== t.text &&
        ((e.text = t.text), (e.textContent = t.text.length ? t.text : " "))
  },
  oh = (e, t, i, a) => {
    Ce(e, { ...e.rect, ...e.styles, fill: "none" })
    let n = e.childNodes[0],
      r = e.childNodes[1],
      l = e.childNodes[2],
      o = e.rect,
      s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height }
    if ((Ce(n, { x1: o.x, y1: o.y, x2: s.x, y2: s.y }), !t.lineDecoration))
      return
    ;(r.style.display = "none"), (l.style.display = "none")
    let u = Qu({ x: s.x - o.x, y: s.y - o.y }),
      c = be(0.05, i, a)
    if (t.lineDecoration.indexOf("arrow-begin") !== -1) {
      let d = Hr(u, c),
        h = Wr(o, d),
        m = gi(o, 2, h),
        p = gi(o, -2, h)
      Ce(r, {
        style: "display:block;",
        d: `M${m.x},${m.y} L${o.x},${o.y} L${p.x},${p.y}`,
      })
    }
    if (t.lineDecoration.indexOf("arrow-end") !== -1) {
      let d = Hr(u, -c),
        h = Wr(s, d),
        m = gi(s, 2, h),
        p = gi(s, -2, h)
      Ce(l, {
        style: "display:block;",
        d: `M${m.x},${m.y} L${s.x},${s.y} L${p.x},${p.y}`,
      })
    }
  },
  sh = (e, t, i, a) => {
    Ce(e, {
      ...e.styles,
      fill: "none",
      d: Ju(
        t.points.map((n) => ({
          x: be(n.x, i, a, "width"),
          y: be(n.y, i, a, "height"),
        }))
      ),
    })
  },
  Ei = (e) => (t) => It(e, { id: t.id }),
  ch = (e) => {
    let t = It("image", {
      id: e.id,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      opacity: "0",
    })
    return (
      (t.onload = () => {
        t.setAttribute("opacity", e.opacity || 1)
      }),
      t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.src),
      t
    )
  },
  dh = (e) => {
    let t = It("g", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }),
      i = It("line")
    t.appendChild(i)
    let a = It("path")
    t.appendChild(a)
    let n = It("path")
    return t.appendChild(n), t
  },
  uh = {
    image: ch,
    rect: Ei("rect"),
    ellipse: Ei("ellipse"),
    text: Ei("text"),
    path: Ei("path"),
    line: dh,
  },
  hh = { rect: th, ellipse: ih, image: nh, text: lh, path: sh, line: oh },
  mh = (e, t) => uh[e](t),
  ph = (e, t, i, a, n) => {
    t !== "path" && (e.rect = Ku(i, a, n)),
      (e.styles = Zu(i, a, n)),
      hh[t](e, i, a, n)
  },
  fh = ["x", "y", "left", "top", "right", "bottom", "width", "height"],
  gh = (e) => (typeof e == "string" && /%/.test(e) ? parseFloat(e) / 100 : e),
  Eh = (e) => {
    let [t, i] = e,
      a = i.points ? {} : fh.reduce((n, r) => ((n[r] = gh(i[r])), n), {})
    return [t, { zIndex: 0, ...i, ...a }]
  },
  Th = (e, t) =>
    e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0,
  bh = (e) =>
    e.utils.createView({
      name: "image-preview-markup",
      tag: "svg",
      ignoreRect: !0,
      mixins: {
        apis: ["width", "height", "crop", "markup", "resize", "dirty"],
      },
      write: ({ root: t, props: i }) => {
        if (!i.dirty) return
        let { crop: a, resize: n, markup: r } = i,
          l = i.width,
          o = i.height,
          s = a.width,
          u = a.height
        if (n) {
          let { size: m } = n,
            p = m && m.width,
            f = m && m.height,
            g = n.mode,
            I = n.upscale
          p && !f && (f = p), f && !p && (p = f)
          let E = s < p && u < f
          if (!E || (E && I)) {
            let b = p / s,
              _ = f / u
            if (g === "force") (s = p), (u = f)
            else {
              let y
              g === "cover"
                ? (y = Math.max(b, _))
                : g === "contain" && (y = Math.min(b, _)),
                (s = s * y),
                (u = u * y)
            }
          }
        }
        let c = { width: l, height: o }
        t.element.setAttribute("width", c.width),
          t.element.setAttribute("height", c.height)
        let d = Math.min(l / s, o / u)
        t.element.innerHTML = ""
        let h = t.query("GET_IMAGE_PREVIEW_MARKUP_FILTER")
        r.filter(h)
          .map(Eh)
          .sort(Th)
          .forEach((m) => {
            let [p, f] = m,
              g = mh(p, f)
            ph(g, p, f, c, d), t.element.appendChild(g)
          })
      },
    }),
  Gt = (e, t) => ({ x: e, y: t }),
  Ih = (e, t) => e.x * t.x + e.y * t.y,
  Yr = (e, t) => Gt(e.x - t.x, e.y - t.y),
  _h = (e, t) => Ih(Yr(e, t), Yr(e, t)),
  $r = (e, t) => Math.sqrt(_h(e, t)),
  qr = (e, t) => {
    let i = e,
      a = 1.5707963267948966,
      n = t,
      r = 1.5707963267948966 - t,
      l = Math.sin(a),
      o = Math.sin(n),
      s = Math.sin(r),
      u = Math.cos(r),
      c = i / l,
      d = c * o,
      h = c * s
    return Gt(u * d, u * h)
  },
  Rh = (e, t) => {
    let i = e.width,
      a = e.height,
      n = qr(i, t),
      r = qr(a, t),
      l = Gt(e.x + Math.abs(n.x), e.y - Math.abs(n.y)),
      o = Gt(e.x + e.width + Math.abs(r.y), e.y + Math.abs(r.x)),
      s = Gt(e.x - Math.abs(r.y), e.y + e.height - Math.abs(r.x))
    return { width: $r(l, o), height: $r(l, s) }
  },
  yh = (e, t, i = 1) => {
    let a = e.height / e.width,
      n = 1,
      r = t,
      l = 1,
      o = a
    o > r && ((o = r), (l = o / a))
    let s = Math.max(n / l, r / o),
      u = e.width / (i * s * l),
      c = u * t
    return { width: u, height: c }
  },
  Xr = (e, t, i, a) => {
    let n = a.x > 0.5 ? 1 - a.x : a.x,
      r = a.y > 0.5 ? 1 - a.y : a.y,
      l = n * 2 * e.width,
      o = r * 2 * e.height,
      s = Rh(t, i)
    return Math.max(s.width / l, s.height / o)
  },
  Qr = (e, t) => {
    let i = e.width,
      a = i * t
    a > e.height && ((a = e.height), (i = a / t))
    let n = (e.width - i) * 0.5,
      r = (e.height - a) * 0.5
    return { x: n, y: r, width: i, height: a }
  },
  Sh = (e, t = {}) => {
    let { zoom: i, rotation: a, center: n, aspectRatio: r } = t
    r || (r = e.height / e.width)
    let l = yh(e, r, i),
      o = { x: l.width * 0.5, y: l.height * 0.5 },
      s = { x: 0, y: 0, width: l.width, height: l.height, center: o },
      u = typeof t.scaleToFit > "u" || t.scaleToFit,
      c = Xr(e, Qr(s, r), a, u ? n : { x: 0.5, y: 0.5 }),
      d = i * c
    return {
      widthFloat: l.width / d,
      heightFloat: l.height / d,
      width: Math.round(l.width / d),
      height: Math.round(l.height / d),
    }
  },
  Fe = { type: "spring", stiffness: 0.5, damping: 0.45, mass: 10 },
  wh = (e) =>
    e.utils.createView({
      name: "image-bitmap",
      ignoreRect: !0,
      mixins: { styles: ["scaleX", "scaleY"] },
      create: ({ root: t, props: i }) => {
        t.appendChild(i.image)
      },
    }),
  vh = (e) =>
    e.utils.createView({
      name: "image-canvas-wrapper",
      tag: "div",
      ignoreRect: !0,
      mixins: {
        apis: ["crop", "width", "height"],
        styles: [
          "originX",
          "originY",
          "translateX",
          "translateY",
          "scaleX",
          "scaleY",
          "rotateZ",
        ],
        animations: {
          originX: Fe,
          originY: Fe,
          scaleX: Fe,
          scaleY: Fe,
          translateX: Fe,
          translateY: Fe,
          rotateZ: Fe,
        },
      },
      create: ({ root: t, props: i }) => {
        ;(i.width = i.image.width),
          (i.height = i.image.height),
          (t.ref.bitmap = t.appendChildView(
            t.createChildView(wh(e), { image: i.image })
          ))
      },
      write: ({ root: t, props: i }) => {
        let { flip: a } = i.crop,
          { bitmap: n } = t.ref
        ;(n.scaleX = a.horizontal ? -1 : 1), (n.scaleY = a.vertical ? -1 : 1)
      },
    }),
  Lh = (e) =>
    e.utils.createView({
      name: "image-clip",
      tag: "div",
      ignoreRect: !0,
      mixins: {
        apis: [
          "crop",
          "markup",
          "resize",
          "width",
          "height",
          "dirty",
          "background",
        ],
        styles: ["width", "height", "opacity"],
        animations: { opacity: { type: "tween", duration: 250 } },
      },
      didWriteView: function ({ root: t, props: i }) {
        i.background && (t.element.style.backgroundColor = i.background)
      },
      create: ({ root: t, props: i }) => {
        ;(t.ref.image = t.appendChildView(
          t.createChildView(vh(e), Object.assign({}, i))
        )),
          (t.ref.createMarkup = () => {
            t.ref.markup ||
              (t.ref.markup = t.appendChildView(
                t.createChildView(bh(e), Object.assign({}, i))
              ))
          }),
          (t.ref.destroyMarkup = () => {
            t.ref.markup &&
              (t.removeChildView(t.ref.markup), (t.ref.markup = null))
          })
        let a = t.query("GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR")
        a !== null &&
          (a === "grid"
            ? (t.element.dataset.transparencyIndicator = a)
            : (t.element.dataset.transparencyIndicator = "color"))
      },
      write: ({ root: t, props: i, shouldOptimize: a }) => {
        let { crop: n, markup: r, resize: l, dirty: o, width: s, height: u } = i
        t.ref.image.crop = n
        let c = {
            x: 0,
            y: 0,
            width: s,
            height: u,
            center: { x: s * 0.5, y: u * 0.5 },
          },
          d = { width: t.ref.image.width, height: t.ref.image.height },
          h = { x: n.center.x * d.width, y: n.center.y * d.height },
          m = {
            x: c.center.x - d.width * n.center.x,
            y: c.center.y - d.height * n.center.y,
          },
          p = Math.PI * 2 + (n.rotation % (Math.PI * 2)),
          f = n.aspectRatio || d.height / d.width,
          g = typeof n.scaleToFit > "u" || n.scaleToFit,
          I = Xr(d, Qr(c, f), p, g ? n.center : { x: 0.5, y: 0.5 }),
          E = n.zoom * I
        r && r.length
          ? (t.ref.createMarkup(),
            (t.ref.markup.width = s),
            (t.ref.markup.height = u),
            (t.ref.markup.resize = l),
            (t.ref.markup.dirty = o),
            (t.ref.markup.markup = r),
            (t.ref.markup.crop = Sh(d, n)))
          : t.ref.markup && t.ref.destroyMarkup()
        let b = t.ref.image
        if (a) {
          ;(b.originX = null),
            (b.originY = null),
            (b.translateX = null),
            (b.translateY = null),
            (b.rotateZ = null),
            (b.scaleX = null),
            (b.scaleY = null)
          return
        }
        ;(b.originX = h.x),
          (b.originY = h.y),
          (b.translateX = m.x),
          (b.translateY = m.y),
          (b.rotateZ = p),
          (b.scaleX = E),
          (b.scaleY = E)
      },
    }),
  Ah = (e) =>
    e.utils.createView({
      name: "image-preview",
      tag: "div",
      ignoreRect: !0,
      mixins: {
        apis: ["image", "crop", "markup", "resize", "dirty", "background"],
        styles: ["translateY", "scaleX", "scaleY", "opacity"],
        animations: {
          scaleX: Fe,
          scaleY: Fe,
          translateY: Fe,
          opacity: { type: "tween", duration: 400 },
        },
      },
      create: ({ root: t, props: i }) => {
        t.ref.clip = t.appendChildView(
          t.createChildView(Lh(e), {
            id: i.id,
            image: i.image,
            crop: i.crop,
            markup: i.markup,
            resize: i.resize,
            dirty: i.dirty,
            background: i.background,
          })
        )
      },
      write: ({ root: t, props: i, shouldOptimize: a }) => {
        let { clip: n } = t.ref,
          { image: r, crop: l, markup: o, resize: s, dirty: u } = i
        if (
          ((n.crop = l),
          (n.markup = o),
          (n.resize = s),
          (n.dirty = u),
          (n.opacity = a ? 0 : 1),
          a || t.rect.element.hidden)
        )
          return
        let c = r.height / r.width,
          d = l.aspectRatio || c,
          h = t.rect.inner.width,
          m = t.rect.inner.height,
          p = t.query("GET_IMAGE_PREVIEW_HEIGHT"),
          f = t.query("GET_IMAGE_PREVIEW_MIN_HEIGHT"),
          g = t.query("GET_IMAGE_PREVIEW_MAX_HEIGHT"),
          I = t.query("GET_PANEL_ASPECT_RATIO"),
          E = t.query("GET_ALLOW_MULTIPLE")
        I && !E && ((p = h * I), (d = I))
        let b = p !== null ? p : Math.max(f, Math.min(h * d, g)),
          _ = b / d
        _ > h && ((_ = h), (b = _ * d)),
          b > m && ((b = m), (_ = m / d)),
          (n.width = _),
          (n.height = b)
      },
    }),
  Mh = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
    <defs>
        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">
            <stop offset='50%' stop-color='#000000'/>
            <stop offset='56%' stop-color='#0a0a0a'/>
            <stop offset='63%' stop-color='#262626'/>
            <stop offset='69%' stop-color='#4f4f4f'/>
            <stop offset='75%' stop-color='#808080'/>
            <stop offset='81%' stop-color='#b1b1b1'/>
            <stop offset='88%' stop-color='#dadada'/>
            <stop offset='94%' stop-color='#f6f6f6'/>
            <stop offset='100%' stop-color='#ffffff'/>
        </radialGradient>
        <mask id="mask-__UID__">
            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>
        </mask>
    </defs>
    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>
</svg>`,
  jr = 0,
  xh = (e) =>
    e.utils.createView({
      name: "image-preview-overlay",
      tag: "div",
      ignoreRect: !0,
      create: ({ root: t, props: i }) => {
        let a = Mh
        if (document.querySelector("base")) {
          let n = new URL(
            window.location.href.replace(window.location.hash, "")
          ).href
          a = a.replace(/url\(\#/g, "url(" + n + "#")
        }
        jr++,
          t.element.classList.add(
            `filepond--image-preview-overlay-${i.status}`
          ),
          (t.element.innerHTML = a.replace(/__UID__/g, jr))
      },
      mixins: {
        styles: ["opacity"],
        animations: { opacity: { type: "spring", mass: 25 } },
      },
    }),
  Oh = function () {
    self.onmessage = (e) => {
      createImageBitmap(e.data.message.file).then((t) => {
        self.postMessage({ id: e.data.id, message: t }, [t])
      })
    }
  },
  Ph = function () {
    self.onmessage = (e) => {
      let t = e.data.message.imageData,
        i = e.data.message.colorMatrix,
        a = t.data,
        n = a.length,
        r = i[0],
        l = i[1],
        o = i[2],
        s = i[3],
        u = i[4],
        c = i[5],
        d = i[6],
        h = i[7],
        m = i[8],
        p = i[9],
        f = i[10],
        g = i[11],
        I = i[12],
        E = i[13],
        b = i[14],
        _ = i[15],
        y = i[16],
        T = i[17],
        v = i[18],
        R = i[19],
        S = 0,
        P = 0,
        O = 0,
        x = 0,
        z = 0
      for (; S < n; S += 4)
        (P = a[S] / 255),
          (O = a[S + 1] / 255),
          (x = a[S + 2] / 255),
          (z = a[S + 3] / 255),
          (a[S] = Math.max(
            0,
            Math.min((P * r + O * l + x * o + z * s + u) * 255, 255)
          )),
          (a[S + 1] = Math.max(
            0,
            Math.min((P * c + O * d + x * h + z * m + p) * 255, 255)
          )),
          (a[S + 2] = Math.max(
            0,
            Math.min((P * f + O * g + x * I + z * E + b) * 255, 255)
          )),
          (a[S + 3] = Math.max(
            0,
            Math.min((P * _ + O * y + x * T + z * v + R) * 255, 255)
          ))
      self.postMessage({ id: e.data.id, message: t }, [t.data.buffer])
    }
  },
  Dh = (e, t) => {
    let i = new Image()
    ;(i.onload = () => {
      let a = i.naturalWidth,
        n = i.naturalHeight
      ;(i = null), t(a, n)
    }),
      (i.src = e)
  },
  Fh = {
    1: () => [1, 0, 0, 1, 0, 0],
    2: (e) => [-1, 0, 0, 1, e, 0],
    3: (e, t) => [-1, 0, 0, -1, e, t],
    4: (e, t) => [1, 0, 0, -1, 0, t],
    5: () => [0, 1, 1, 0, 0, 0],
    6: (e, t) => [0, 1, -1, 0, t, 0],
    7: (e, t) => [0, -1, -1, 0, t, e],
    8: (e) => [0, -1, 1, 0, 0, e],
  },
  Ch = (e, t, i, a) => {
    a !== -1 && e.transform.apply(e, Fh[a](t, i))
  },
  zh = (e, t, i, a) => {
    ;(t = Math.round(t)), (i = Math.round(i))
    let n = document.createElement("canvas")
    ;(n.width = t), (n.height = i)
    let r = n.getContext("2d")
    return (
      a >= 5 && a <= 8 && ([t, i] = [i, t]),
      Ch(r, t, i, a),
      r.drawImage(e, 0, 0, t, i),
      n
    )
  },
  Zr = (e) => /^image/.test(e.type) && !/svg/.test(e.type),
  Nh = 10,
  Bh = 10,
  Vh = (e) => {
    let t = Math.min(Nh / e.width, Bh / e.height),
      i = document.createElement("canvas"),
      a = i.getContext("2d"),
      n = (i.width = Math.ceil(e.width * t)),
      r = (i.height = Math.ceil(e.height * t))
    a.drawImage(e, 0, 0, n, r)
    let l = null
    try {
      l = a.getImageData(0, 0, n, r).data
    } catch {
      return null
    }
    let o = l.length,
      s = 0,
      u = 0,
      c = 0,
      d = 0
    for (; d < o; d += 4)
      (s += l[d] * l[d]), (u += l[d + 1] * l[d + 1]), (c += l[d + 2] * l[d + 2])
    return (s = Ia(s, o)), (u = Ia(u, o)), (c = Ia(c, o)), { r: s, g: u, b: c }
  },
  Ia = (e, t) => Math.floor(Math.sqrt(e / (t / 4))),
  Gh = (e, t) => (
    (t = t || document.createElement("canvas")),
    (t.width = e.width),
    (t.height = e.height),
    t.getContext("2d").drawImage(e, 0, 0),
    t
  ),
  Uh = (e) => {
    let t
    try {
      t = new ImageData(e.width, e.height)
    } catch {
      t = document
        .createElement("canvas")
        .getContext("2d")
        .createImageData(e.width, e.height)
    }
    return t.data.set(new Uint8ClampedArray(e.data)), t
  },
  kh = (e) =>
    new Promise((t, i) => {
      let a = new Image()
      ;(a.crossOrigin = "Anonymous"),
        (a.onload = () => {
          t(a)
        }),
        (a.onerror = (n) => {
          i(n)
        }),
        (a.src = e)
    }),
  Hh = (e) => {
    let t = xh(e),
      i = Ah(e),
      { createWorker: a } = e.utils,
      n = (E, b, _) =>
        new Promise((y) => {
          E.ref.imageData ||
            (E.ref.imageData = _.getContext("2d").getImageData(
              0,
              0,
              _.width,
              _.height
            ))
          let T = Uh(E.ref.imageData)
          if (!b || b.length !== 20)
            return _.getContext("2d").putImageData(T, 0, 0), y()
          let v = a(Ph)
          v.post(
            { imageData: T, colorMatrix: b },
            (R) => {
              _.getContext("2d").putImageData(R, 0, 0), v.terminate(), y()
            },
            [T.data.buffer]
          )
        }),
      r = (E, b) => {
        E.removeChildView(b),
          (b.image.width = 1),
          (b.image.height = 1),
          b._destroy()
      },
      l = ({ root: E }) => {
        let b = E.ref.images.shift()
        return (
          (b.opacity = 0), (b.translateY = -15), E.ref.imageViewBin.push(b), b
        )
      },
      o = ({ root: E, props: b, image: _ }) => {
        let y = b.id,
          T = E.query("GET_ITEM", { id: y })
        if (!T) return
        let v = T.getMetadata("crop") || {
            center: { x: 0.5, y: 0.5 },
            flip: { horizontal: !1, vertical: !1 },
            zoom: 1,
            rotation: 0,
            aspectRatio: null,
          },
          R = E.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"),
          S,
          P,
          O = !1
        E.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
          ((S = T.getMetadata("markup") || []),
          (P = T.getMetadata("resize")),
          (O = !0))
        let x = E.appendChildView(
          E.createChildView(i, {
            id: y,
            image: _,
            crop: v,
            resize: P,
            markup: S,
            dirty: O,
            background: R,
            opacity: 0,
            scaleX: 1.15,
            scaleY: 1.15,
            translateY: 15,
          }),
          E.childViews.length
        )
        E.ref.images.push(x),
          (x.opacity = 1),
          (x.scaleX = 1),
          (x.scaleY = 1),
          (x.translateY = 0),
          setTimeout(() => {
            E.dispatch("DID_IMAGE_PREVIEW_SHOW", { id: y })
          }, 250)
      },
      s = ({ root: E, props: b }) => {
        let _ = E.query("GET_ITEM", { id: b.id })
        if (!_) return
        let y = E.ref.images[E.ref.images.length - 1]
        ;(y.crop = _.getMetadata("crop")),
          (y.background = E.query(
            "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
          )),
          E.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
            ((y.dirty = !0),
            (y.resize = _.getMetadata("resize")),
            (y.markup = _.getMetadata("markup")))
      },
      u = ({ root: E, props: b, action: _ }) => {
        if (
          !/crop|filter|markup|resize/.test(_.change.key) ||
          !E.ref.images.length
        )
          return
        let y = E.query("GET_ITEM", { id: b.id })
        if (y) {
          if (/filter/.test(_.change.key)) {
            let T = E.ref.images[E.ref.images.length - 1]
            n(E, _.change.value, T.image)
            return
          }
          if (/crop|markup|resize/.test(_.change.key)) {
            let T = y.getMetadata("crop"),
              v = E.ref.images[E.ref.images.length - 1]
            if (
              T &&
              T.aspectRatio &&
              v.crop &&
              v.crop.aspectRatio &&
              Math.abs(T.aspectRatio - v.crop.aspectRatio) > 1e-5
            ) {
              let R = l({ root: E })
              o({ root: E, props: b, image: Gh(R.image) })
            } else s({ root: E, props: b })
          }
        }
      },
      c = (E) => {
        let _ = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./),
          y = _ ? parseInt(_[1]) : null
        return y !== null && y <= 58
          ? !1
          : "createImageBitmap" in window && Zr(E)
      },
      d = ({ root: E, props: b }) => {
        let { id: _ } = b,
          y = E.query("GET_ITEM", _)
        if (!y) return
        let T = URL.createObjectURL(y.file)
        Dh(T, (v, R) => {
          E.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
            id: _,
            width: v,
            height: R,
          })
        })
      },
      h = ({ root: E, props: b }) => {
        let { id: _ } = b,
          y = E.query("GET_ITEM", _)
        if (!y) return
        let T = URL.createObjectURL(y.file),
          v = () => {
            kh(T).then(R)
          },
          R = (S) => {
            URL.revokeObjectURL(T)
            let O = (y.getMetadata("exif") || {}).orientation || -1,
              { width: x, height: z } = S
            if (!x || !z) return
            O >= 5 && O <= 8 && ([x, z] = [z, x])
            let L = Math.max(1, window.devicePixelRatio * 0.75),
              w = E.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR") * L,
              A = z / x,
              C = E.rect.element.width,
              D = E.rect.element.height,
              V = C,
              B = V * A
            A > 1
              ? ((V = Math.min(x, C * w)), (B = V * A))
              : ((B = Math.min(z, D * w)), (V = B / A))
            let j = zh(S, V, B, O),
              q = () => {
                let ue = E.query(
                  "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR"
                )
                  ? Vh(data)
                  : null
                y.setMetadata("color", ue, !0),
                  "close" in S && S.close(),
                  (E.ref.overlayShadow.opacity = 1),
                  o({ root: E, props: b, image: j })
              },
              X = y.getMetadata("filter")
            X ? n(E, X, j).then(q) : q()
          }
        if (c(y.file)) {
          let S = a(Oh)
          S.post({ file: y.file }, (P) => {
            if ((S.terminate(), !P)) {
              v()
              return
            }
            R(P)
          })
        } else v()
      },
      m = ({ root: E }) => {
        let b = E.ref.images[E.ref.images.length - 1]
        ;(b.translateY = 0), (b.scaleX = 1), (b.scaleY = 1), (b.opacity = 1)
      },
      p = ({ root: E }) => {
        ;(E.ref.overlayShadow.opacity = 1),
          (E.ref.overlayError.opacity = 0),
          (E.ref.overlaySuccess.opacity = 0)
      },
      f = ({ root: E }) => {
        ;(E.ref.overlayShadow.opacity = 0.25), (E.ref.overlayError.opacity = 1)
      },
      g = ({ root: E }) => {
        ;(E.ref.overlayShadow.opacity = 0.25),
          (E.ref.overlaySuccess.opacity = 1)
      },
      I = ({ root: E }) => {
        ;(E.ref.images = []),
          (E.ref.imageData = null),
          (E.ref.imageViewBin = []),
          (E.ref.overlayShadow = E.appendChildView(
            E.createChildView(t, { opacity: 0, status: "idle" })
          )),
          (E.ref.overlaySuccess = E.appendChildView(
            E.createChildView(t, { opacity: 0, status: "success" })
          )),
          (E.ref.overlayError = E.appendChildView(
            E.createChildView(t, { opacity: 0, status: "failure" })
          ))
      }
    return e.utils.createView({
      name: "image-preview-wrapper",
      create: I,
      styles: ["height"],
      apis: ["height"],
      destroy: ({ root: E }) => {
        E.ref.images.forEach((b) => {
          ;(b.image.width = 1), (b.image.height = 1)
        })
      },
      didWriteView: ({ root: E }) => {
        E.ref.images.forEach((b) => {
          b.dirty = !1
        })
      },
      write: e.utils.createRoute(
        {
          DID_IMAGE_PREVIEW_DRAW: m,
          DID_IMAGE_PREVIEW_CONTAINER_CREATE: d,
          DID_FINISH_CALCULATE_PREVIEWSIZE: h,
          DID_UPDATE_ITEM_METADATA: u,
          DID_THROW_ITEM_LOAD_ERROR: f,
          DID_THROW_ITEM_PROCESSING_ERROR: f,
          DID_THROW_ITEM_INVALID: f,
          DID_COMPLETE_ITEM_PROCESSING: g,
          DID_START_ITEM_PROCESSING: p,
          DID_REVERT_ITEM_PROCESSING: p,
        },
        ({ root: E }) => {
          let b = E.ref.imageViewBin.filter((_) => _.opacity === 0)
          ;(E.ref.imageViewBin = E.ref.imageViewBin.filter(
            (_) => _.opacity > 0
          )),
            b.forEach((_) => r(E, _)),
            (b.length = 0)
        }
      ),
    })
  },
  Kr = (e) => {
    let { addFilter: t, utils: i } = e,
      { Type: a, createRoute: n, isFile: r } = i,
      l = Hh(e)
    return (
      t("CREATE_VIEW", (o) => {
        let { is: s, view: u, query: c } = o
        if (!s("file") || !c("GET_ALLOW_IMAGE_PREVIEW")) return
        let d = ({ root: g, props: I }) => {
            let { id: E } = I,
              b = c("GET_ITEM", E)
            if (!b || !r(b.file) || b.archived) return
            let _ = b.file
            if (!Xu(_) || !c("GET_IMAGE_PREVIEW_FILTER_ITEM")(b)) return
            let y = "createImageBitmap" in (window || {}),
              T = c("GET_IMAGE_PREVIEW_MAX_FILE_SIZE")
            if (!y && T && _.size > T) return
            g.ref.imagePreview = u.appendChildView(
              u.createChildView(l, { id: E })
            )
            let v = g.query("GET_IMAGE_PREVIEW_HEIGHT")
            v && g.dispatch("DID_UPDATE_PANEL_HEIGHT", { id: b.id, height: v })
            let R =
              !y &&
              _.size > c("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE")
            g.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id: E }, R)
          },
          h = (g, I) => {
            if (!g.ref.imagePreview) return
            let { id: E } = I,
              b = g.query("GET_ITEM", { id: E })
            if (!b) return
            let _ = g.query("GET_PANEL_ASPECT_RATIO"),
              y = g.query("GET_ITEM_PANEL_ASPECT_RATIO"),
              T = g.query("GET_IMAGE_PREVIEW_HEIGHT")
            if (_ || y || T) return
            let { imageWidth: v, imageHeight: R } = g.ref
            if (!v || !R) return
            let S = g.query("GET_IMAGE_PREVIEW_MIN_HEIGHT"),
              P = g.query("GET_IMAGE_PREVIEW_MAX_HEIGHT"),
              x = (b.getMetadata("exif") || {}).orientation || -1
            if (
              (x >= 5 && x <= 8 && ([v, R] = [R, v]),
              !Zr(b.file) || g.query("GET_IMAGE_PREVIEW_UPSCALE"))
            ) {
              let C = 2048 / v
              ;(v *= C), (R *= C)
            }
            let z = R / v,
              L = (b.getMetadata("crop") || {}).aspectRatio || z,
              F = Math.max(S, Math.min(R, P)),
              w = g.rect.element.width,
              A = Math.min(w * L, F)
            g.dispatch("DID_UPDATE_PANEL_HEIGHT", { id: b.id, height: A })
          },
          m = ({ root: g }) => {
            g.ref.shouldRescale = !0
          },
          p = ({ root: g, action: I }) => {
            I.change.key === "crop" && (g.ref.shouldRescale = !0)
          },
          f = ({ root: g, action: I }) => {
            ;(g.ref.imageWidth = I.width),
              (g.ref.imageHeight = I.height),
              (g.ref.shouldRescale = !0),
              (g.ref.shouldDrawPreview = !0),
              g.dispatch("KICK")
          }
        u.registerWriter(
          n(
            {
              DID_RESIZE_ROOT: m,
              DID_STOP_RESIZE: m,
              DID_LOAD_ITEM: d,
              DID_IMAGE_PREVIEW_CALCULATE_SIZE: f,
              DID_UPDATE_ITEM_METADATA: p,
            },
            ({ root: g, props: I }) => {
              g.ref.imagePreview &&
                (g.rect.element.hidden ||
                  (g.ref.shouldRescale && (h(g, I), (g.ref.shouldRescale = !1)),
                  g.ref.shouldDrawPreview &&
                    (requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        g.dispatch("DID_FINISH_CALCULATE_PREVIEWSIZE", {
                          id: I.id,
                        })
                      })
                    }),
                    (g.ref.shouldDrawPreview = !1))))
            }
          )
        )
      }),
      {
        options: {
          allowImagePreview: [!0, a.BOOLEAN],
          imagePreviewFilterItem: [() => !0, a.FUNCTION],
          imagePreviewHeight: [null, a.INT],
          imagePreviewMinHeight: [44, a.INT],
          imagePreviewMaxHeight: [256, a.INT],
          imagePreviewMaxFileSize: [null, a.INT],
          imagePreviewZoomFactor: [2, a.INT],
          imagePreviewUpscale: [!1, a.BOOLEAN],
          imagePreviewMaxInstantPreviewFileSize: [1e6, a.INT],
          imagePreviewTransparencyIndicator: [null, a.STRING],
          imagePreviewCalculateAverageImageColor: [!1, a.BOOLEAN],
          imagePreviewMarkupShow: [!0, a.BOOLEAN],
          imagePreviewMarkupFilter: [() => !0, a.FUNCTION],
        },
      }
    )
  },
  Wh = typeof window < "u" && typeof window.document < "u"
Wh &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: Kr })
  )
var Jr = Kr
var Yh = (e) => /^image/.test(e.type),
  $h = (e, t) => {
    let i = new Image()
    ;(i.onload = () => {
      let a = i.naturalWidth,
        n = i.naturalHeight
      ;(i = null), t({ width: a, height: n })
    }),
      (i.onerror = () => t(null)),
      (i.src = e)
  },
  el = ({ addFilter: e, utils: t }) => {
    let { Type: i } = t
    return (
      e(
        "DID_LOAD_ITEM",
        (a, { query: n }) =>
          new Promise((r, l) => {
            let o = a.file
            if (!Yh(o) || !n("GET_ALLOW_IMAGE_RESIZE")) return r(a)
            let s = n("GET_IMAGE_RESIZE_MODE"),
              u = n("GET_IMAGE_RESIZE_TARGET_WIDTH"),
              c = n("GET_IMAGE_RESIZE_TARGET_HEIGHT"),
              d = n("GET_IMAGE_RESIZE_UPSCALE")
            if (u === null && c === null) return r(a)
            let h = u === null ? c : u,
              m = c === null ? h : c,
              p = URL.createObjectURL(o)
            $h(p, (f) => {
              if ((URL.revokeObjectURL(p), !f)) return r(a)
              let { width: g, height: I } = f,
                E = (a.getMetadata("exif") || {}).orientation || -1
              if ((E >= 5 && E <= 8 && ([g, I] = [I, g]), g === h && I === m))
                return r(a)
              if (!d) {
                if (s === "cover") {
                  if (g <= h || I <= m) return r(a)
                } else if (g <= h && I <= h) return r(a)
              }
              a.setMetadata("resize", {
                mode: s,
                upscale: d,
                size: { width: h, height: m },
              }),
                r(a)
            })
          })
      ),
      {
        options: {
          allowImageResize: [!0, i.BOOLEAN],
          imageResizeMode: ["cover", i.STRING],
          imageResizeUpscale: [!0, i.BOOLEAN],
          imageResizeTargetWidth: [null, i.INT],
          imageResizeTargetHeight: [null, i.INT],
        },
      }
    )
  },
  qh = typeof window < "u" && typeof window.document < "u"
qh &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: el })
  )
var tl = el
var jh = (e) => /^image/.test(e.type),
  Xh = (e) => e.substr(0, e.lastIndexOf(".")) || e,
  Qh = { jpeg: "jpg", "svg+xml": "svg" },
  Zh = (e, t) => {
    let i = Xh(e),
      a = t.split("/")[1],
      n = Qh[a] || a
    return `${i}.${n}`
  },
  Kh = (e) => (/jpeg|png|svg\+xml/.test(e) ? e : "image/jpeg"),
  Jh = (e) => /^image/.test(e.type),
  em = {
    1: () => [1, 0, 0, 1, 0, 0],
    2: (e) => [-1, 0, 0, 1, e, 0],
    3: (e, t) => [-1, 0, 0, -1, e, t],
    4: (e, t) => [1, 0, 0, -1, 0, t],
    5: () => [0, 1, 1, 0, 0, 0],
    6: (e, t) => [0, 1, -1, 0, t, 0],
    7: (e, t) => [0, -1, -1, 0, t, e],
    8: (e) => [0, -1, 1, 0, 0, e],
  },
  tm = (e, t, i) => (i === -1 && (i = 1), em[i](e, t)),
  kt = (e, t) => ({ x: e, y: t }),
  im = (e, t) => e.x * t.x + e.y * t.y,
  il = (e, t) => kt(e.x - t.x, e.y - t.y),
  am = (e, t) => im(il(e, t), il(e, t)),
  al = (e, t) => Math.sqrt(am(e, t)),
  nl = (e, t) => {
    let i = e,
      a = 1.5707963267948966,
      n = t,
      r = 1.5707963267948966 - t,
      l = Math.sin(a),
      o = Math.sin(n),
      s = Math.sin(r),
      u = Math.cos(r),
      c = i / l,
      d = c * o,
      h = c * s
    return kt(u * d, u * h)
  },
  nm = (e, t) => {
    let i = e.width,
      a = e.height,
      n = nl(i, t),
      r = nl(a, t),
      l = kt(e.x + Math.abs(n.x), e.y - Math.abs(n.y)),
      o = kt(e.x + e.width + Math.abs(r.y), e.y + Math.abs(r.x)),
      s = kt(e.x - Math.abs(r.y), e.y + e.height - Math.abs(r.x))
    return { width: al(l, o), height: al(l, s) }
  },
  ol = (e, t, i = 0, a = { x: 0.5, y: 0.5 }) => {
    let n = a.x > 0.5 ? 1 - a.x : a.x,
      r = a.y > 0.5 ? 1 - a.y : a.y,
      l = n * 2 * e.width,
      o = r * 2 * e.height,
      s = nm(t, i)
    return Math.max(s.width / l, s.height / o)
  },
  sl = (e, t) => {
    let i = e.width,
      a = i * t
    a > e.height && ((a = e.height), (i = a / t))
    let n = (e.width - i) * 0.5,
      r = (e.height - a) * 0.5
    return { x: n, y: r, width: i, height: a }
  },
  rl = (e, t, i = 1) => {
    let a = e.height / e.width,
      n = 1,
      r = t,
      l = 1,
      o = a
    o > r && ((o = r), (l = o / a))
    let s = Math.max(n / l, r / o),
      u = e.width / (i * s * l),
      c = u * t
    return { width: u, height: c }
  },
  cl = (e) => {
    ;(e.width = 1), (e.height = 1), e.getContext("2d").clearRect(0, 0, 1, 1)
  },
  ll = (e) => e && (e.horizontal || e.vertical),
  rm = (e, t, i) => {
    if (t <= 1 && !ll(i))
      return (e.width = e.naturalWidth), (e.height = e.naturalHeight), e
    let a = document.createElement("canvas"),
      n = e.naturalWidth,
      r = e.naturalHeight,
      l = t >= 5 && t <= 8
    l ? ((a.width = r), (a.height = n)) : ((a.width = n), (a.height = r))
    let o = a.getContext("2d")
    if ((t && o.transform.apply(o, tm(n, r, t)), ll(i))) {
      let s = [1, 0, 0, 1, 0, 0]
      ;((!l && i.horizontal) || l & i.vertical) && ((s[0] = -1), (s[4] = n)),
        ((!l && i.vertical) || (l && i.horizontal)) &&
          ((s[3] = -1), (s[5] = r)),
        o.transform(...s)
    }
    return o.drawImage(e, 0, 0, n, r), a
  },
  lm = (e, t, i = {}, a = {}) => {
    let { canvasMemoryLimit: n, background: r = null } = a,
      l = i.zoom || 1,
      o = rm(e, t, i.flip),
      s = { width: o.width, height: o.height },
      u = i.aspectRatio || s.height / s.width,
      c = rl(s, u, l)
    if (n) {
      let b = c.width * c.height
      if (b > n) {
        let _ = Math.sqrt(n) / Math.sqrt(b)
        ;(s.width = Math.floor(s.width * _)),
          (s.height = Math.floor(s.height * _)),
          (c = rl(s, u, l))
      }
    }
    let d = document.createElement("canvas"),
      h = { x: c.width * 0.5, y: c.height * 0.5 },
      m = { x: 0, y: 0, width: c.width, height: c.height, center: h },
      p = typeof i.scaleToFit > "u" || i.scaleToFit,
      f = l * ol(s, sl(m, u), i.rotation, p ? i.center : { x: 0.5, y: 0.5 })
    ;(d.width = Math.round(c.width / f)),
      (d.height = Math.round(c.height / f)),
      (h.x /= f),
      (h.y /= f)
    let g = {
        x: h.x - s.width * (i.center ? i.center.x : 0.5),
        y: h.y - s.height * (i.center ? i.center.y : 0.5),
      },
      I = d.getContext("2d")
    r && ((I.fillStyle = r), I.fillRect(0, 0, d.width, d.height)),
      I.translate(h.x, h.y),
      I.rotate(i.rotation || 0),
      I.drawImage(o, g.x - h.x, g.y - h.y, s.width, s.height)
    let E = I.getImageData(0, 0, d.width, d.height)
    return cl(d), E
  },
  om = (() => typeof window < "u" && typeof window.document < "u")()
om &&
  (HTMLCanvasElement.prototype.toBlob ||
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function (e, t, i) {
        var a = this.toDataURL(t, i).split(",")[1]
        setTimeout(function () {
          for (
            var n = atob(a), r = n.length, l = new Uint8Array(r), o = 0;
            o < r;
            o++
          )
            l[o] = n.charCodeAt(o)
          e(new Blob([l], { type: t || "image/png" }))
        })
      },
    }))
var sm = (e, t, i = null) =>
    new Promise((a) => {
      let n = i ? i(e) : e
      Promise.resolve(n).then((r) => {
        r.toBlob(a, t.type, t.quality)
      })
    }),
  bi = (e, t) => Ht(e.x * t, e.y * t),
  Ii = (e, t) => Ht(e.x + t.x, e.y + t.y),
  dl = (e) => {
    let t = Math.sqrt(e.x * e.x + e.y * e.y)
    return t === 0 ? { x: 0, y: 0 } : Ht(e.x / t, e.y / t)
  },
  Ye = (e, t, i) => {
    let a = Math.cos(t),
      n = Math.sin(t),
      r = Ht(e.x - i.x, e.y - i.y)
    return Ht(i.x + a * r.x - n * r.y, i.y + n * r.x + a * r.y)
  },
  Ht = (e = 0, t = 0) => ({ x: e, y: t }),
  he = (e, t, i = 1, a) => {
    if (typeof e == "string") return parseFloat(e) * i
    if (typeof e == "number")
      return e * (a ? t[a] : Math.min(t.width, t.height))
  },
  lt = (e, t, i) => {
    let a = e.borderStyle || e.lineStyle || "solid",
      n = e.backgroundColor || e.fontColor || "transparent",
      r = e.borderColor || e.lineColor || "transparent",
      l = he(e.borderWidth || e.lineWidth, t, i),
      o = e.lineCap || "round",
      s = e.lineJoin || "round",
      u = typeof a == "string" ? "" : a.map((d) => he(d, t, i)).join(","),
      c = e.opacity || 1
    return {
      "stroke-linecap": o,
      "stroke-linejoin": s,
      "stroke-width": l || 0,
      "stroke-dasharray": u,
      stroke: r,
      fill: n,
      opacity: c,
    }
  },
  Le = (e) => e != null,
  Rt = (e, t, i = 1) => {
    let a = he(e.x, t, i, "width") || he(e.left, t, i, "width"),
      n = he(e.y, t, i, "height") || he(e.top, t, i, "height"),
      r = he(e.width, t, i, "width"),
      l = he(e.height, t, i, "height"),
      o = he(e.right, t, i, "width"),
      s = he(e.bottom, t, i, "height")
    return (
      Le(n) || (Le(l) && Le(s) ? (n = t.height - l - s) : (n = s)),
      Le(a) || (Le(r) && Le(o) ? (a = t.width - r - o) : (a = o)),
      Le(r) || (Le(a) && Le(o) ? (r = t.width - a - o) : (r = 0)),
      Le(l) || (Le(n) && Le(s) ? (l = t.height - n - s) : (l = 0)),
      { x: a || 0, y: n || 0, width: r || 0, height: l || 0 }
    )
  },
  cm = (e) => e.map((t, i) => `${i === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" "),
  ze = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i])),
  dm = "http://www.w3.org/2000/svg",
  _t = (e, t) => {
    let i = document.createElementNS(dm, e)
    return t && ze(i, t), i
  },
  um = (e) => ze(e, { ...e.rect, ...e.styles }),
  hm = (e) => {
    let t = e.rect.x + e.rect.width * 0.5,
      i = e.rect.y + e.rect.height * 0.5,
      a = e.rect.width * 0.5,
      n = e.rect.height * 0.5
    return ze(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles })
  },
  mm = { contain: "xMidYMid meet", cover: "xMidYMid slice" },
  pm = (e, t) => {
    ze(e, { ...e.rect, ...e.styles, preserveAspectRatio: mm[t.fit] || "none" })
  },
  fm = { left: "start", center: "middle", right: "end" },
  gm = (e, t, i, a) => {
    let n = he(t.fontSize, i, a),
      r = t.fontFamily || "sans-serif",
      l = t.fontWeight || "normal",
      o = fm[t.textAlign] || "start"
    ze(e, {
      ...e.rect,
      ...e.styles,
      "stroke-width": 0,
      "font-weight": l,
      "font-size": n,
      "font-family": r,
      "text-anchor": o,
    }),
      e.text !== t.text &&
        ((e.text = t.text), (e.textContent = t.text.length ? t.text : " "))
  },
  Em = (e, t, i, a) => {
    ze(e, { ...e.rect, ...e.styles, fill: "none" })
    let n = e.childNodes[0],
      r = e.childNodes[1],
      l = e.childNodes[2],
      o = e.rect,
      s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height }
    if ((ze(n, { x1: o.x, y1: o.y, x2: s.x, y2: s.y }), !t.lineDecoration))
      return
    ;(r.style.display = "none"), (l.style.display = "none")
    let u = dl({ x: s.x - o.x, y: s.y - o.y }),
      c = he(0.05, i, a)
    if (t.lineDecoration.indexOf("arrow-begin") !== -1) {
      let d = bi(u, c),
        h = Ii(o, d),
        m = Ye(o, 2, h),
        p = Ye(o, -2, h)
      ze(r, {
        style: "display:block;",
        d: `M${m.x},${m.y} L${o.x},${o.y} L${p.x},${p.y}`,
      })
    }
    if (t.lineDecoration.indexOf("arrow-end") !== -1) {
      let d = bi(u, -c),
        h = Ii(s, d),
        m = Ye(s, 2, h),
        p = Ye(s, -2, h)
      ze(l, {
        style: "display:block;",
        d: `M${m.x},${m.y} L${s.x},${s.y} L${p.x},${p.y}`,
      })
    }
  },
  Tm = (e, t, i, a) => {
    ze(e, {
      ...e.styles,
      fill: "none",
      d: cm(
        t.points.map((n) => ({
          x: he(n.x, i, a, "width"),
          y: he(n.y, i, a, "height"),
        }))
      ),
    })
  },
  Ti = (e) => (t) => _t(e, { id: t.id }),
  bm = (e) => {
    let t = _t("image", {
      id: e.id,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      opacity: "0",
    })
    return (
      (t.onload = () => {
        t.setAttribute("opacity", e.opacity || 1)
      }),
      t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.src),
      t
    )
  },
  Im = (e) => {
    let t = _t("g", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }),
      i = _t("line")
    t.appendChild(i)
    let a = _t("path")
    t.appendChild(a)
    let n = _t("path")
    return t.appendChild(n), t
  },
  _m = {
    image: bm,
    rect: Ti("rect"),
    ellipse: Ti("ellipse"),
    text: Ti("text"),
    path: Ti("path"),
    line: Im,
  },
  Rm = { rect: um, ellipse: hm, image: pm, text: gm, path: Tm, line: Em },
  ym = (e, t) => _m[e](t),
  Sm = (e, t, i, a, n) => {
    t !== "path" && (e.rect = Rt(i, a, n)),
      (e.styles = lt(i, a, n)),
      Rm[t](e, i, a, n)
  },
  ul = (e, t) =>
    e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0,
  wm = (e, t = {}, i, a) =>
    new Promise((n) => {
      let { background: r = null } = a,
        l = new FileReader()
      ;(l.onloadend = () => {
        let o = l.result,
          s = document.createElement("div")
        ;(s.style.cssText =
          "position:absolute;pointer-events:none;width:0;height:0;visibility:hidden;"),
          (s.innerHTML = o)
        let u = s.querySelector("svg")
        document.body.appendChild(s)
        let c = u.getBBox()
        s.parentNode.removeChild(s)
        let d = s.querySelector("title"),
          h = u.getAttribute("viewBox") || "",
          m = u.getAttribute("width") || "",
          p = u.getAttribute("height") || "",
          f = parseFloat(m) || null,
          g = parseFloat(p) || null,
          I = (m.match(/[a-z]+/) || [])[0] || "",
          E = (p.match(/[a-z]+/) || [])[0] || "",
          b = h.split(" ").map(parseFloat),
          _ = b.length ? { x: b[0], y: b[1], width: b[2], height: b[3] } : c,
          y = f ?? _.width,
          T = g ?? _.height
        ;(u.style.overflow = "visible"),
          u.setAttribute("width", y),
          u.setAttribute("height", T)
        let v = ""
        if (i && i.length) {
          let X = { width: y, height: T }
          ;(v = i.sort(ul).reduce((ue, U) => {
            let W = ym(U[0], U[1])
            return (
              Sm(W, U[0], U[1], X),
              W.removeAttribute("id"),
              W.getAttribute("opacity") === 1 && W.removeAttribute("opacity"),
              ue +
                `
` +
                W.outerHTML +
                `
`
            )
          }, "")),
            (v = `

<g>${v.replace(/&nbsp;/g, " ")}</g>

`)
        }
        let R = t.aspectRatio || T / y,
          S = y,
          P = S * R,
          O = typeof t.scaleToFit > "u" || t.scaleToFit,
          x = t.center ? t.center.x : 0.5,
          z = t.center ? t.center.y : 0.5,
          L = ol(
            { width: y, height: T },
            sl({ width: S, height: P }, R),
            t.rotation,
            O ? { x, y: z } : { x: 0.5, y: 0.5 }
          ),
          F = t.zoom * L,
          w = t.rotation * (180 / Math.PI),
          A = { x: S * 0.5, y: P * 0.5 },
          C = { x: A.x - y * x, y: A.y - T * z },
          D = [
            `rotate(${w} ${A.x} ${A.y})`,
            `translate(${A.x} ${A.y})`,
            `scale(${F})`,
            `translate(${-A.x} ${-A.y})`,
            `translate(${C.x} ${C.y})`,
          ],
          V = t.flip && t.flip.horizontal,
          B = t.flip && t.flip.vertical,
          j = [
            `scale(${V ? -1 : 1} ${B ? -1 : 1})`,
            `translate(${V ? -y : 0} ${B ? -T : 0})`,
          ],
          q = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${S}${I}" height="${P}${E}" 
viewBox="0 0 ${S} ${P}" ${r ? 'style="background:' + r + '" ' : ""}
preserveAspectRatio="xMinYMin"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg">
<!-- Generated by PQINA - https://pqina.nl/ -->
<title>${d ? d.textContent : ""}</title>
<g transform="${D.join(" ")}">
<g transform="${j.join(" ")}">
${u.outerHTML}${v}
</g>
</g>
</svg>`
        n(q)
      }),
        l.readAsText(e)
    }),
  vm = (e) => {
    let t
    try {
      t = new ImageData(e.width, e.height)
    } catch {
      t = document
        .createElement("canvas")
        .getContext("2d")
        .createImageData(e.width, e.height)
    }
    return t.data.set(e.data), t
  },
  Lm = () => {
    let e = { resize: c, filter: u },
      t = (d, h) => (
        d.forEach((m) => {
          h = e[m.type](h, m.data)
        }),
        h
      ),
      i = (d, h) => {
        let m = d.transforms,
          p = null
        if (
          (m.forEach((f) => {
            f.type === "filter" && (p = f)
          }),
          p)
        ) {
          let f = null
          m.forEach((g) => {
            g.type === "resize" && (f = g)
          }),
            f &&
              ((f.data.matrix = p.data),
              (m = m.filter((g) => g.type !== "filter")))
        }
        h(t(m, d.imageData))
      }
    self.onmessage = (d) => {
      i(d.data.message, (h) => {
        self.postMessage({ id: d.data.id, message: h }, [h.data.buffer])
      })
    }
    let a = 1,
      n = 1,
      r = 1
    function l(d, h, m) {
      let p = h[d] / 255,
        f = h[d + 1] / 255,
        g = h[d + 2] / 255,
        I = h[d + 3] / 255,
        E = p * m[0] + f * m[1] + g * m[2] + I * m[3] + m[4],
        b = p * m[5] + f * m[6] + g * m[7] + I * m[8] + m[9],
        _ = p * m[10] + f * m[11] + g * m[12] + I * m[13] + m[14],
        y = p * m[15] + f * m[16] + g * m[17] + I * m[18] + m[19],
        T = Math.max(0, E * y) + a * (1 - y),
        v = Math.max(0, b * y) + n * (1 - y),
        R = Math.max(0, _ * y) + r * (1 - y)
      ;(h[d] = Math.max(0, Math.min(1, T)) * 255),
        (h[d + 1] = Math.max(0, Math.min(1, v)) * 255),
        (h[d + 2] = Math.max(0, Math.min(1, R)) * 255)
    }
    let o = self.JSON.stringify([
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ])
    function s(d) {
      return self.JSON.stringify(d || []) === o
    }
    function u(d, h) {
      if (!h || s(h)) return d
      let m = d.data,
        p = m.length,
        f = h[0],
        g = h[1],
        I = h[2],
        E = h[3],
        b = h[4],
        _ = h[5],
        y = h[6],
        T = h[7],
        v = h[8],
        R = h[9],
        S = h[10],
        P = h[11],
        O = h[12],
        x = h[13],
        z = h[14],
        L = h[15],
        F = h[16],
        w = h[17],
        A = h[18],
        C = h[19],
        D = 0,
        V = 0,
        B = 0,
        j = 0,
        q = 0,
        X = 0,
        ue = 0,
        U = 0,
        W = 0,
        $ = 0,
        oe = 0,
        J = 0
      for (; D < p; D += 4)
        (V = m[D] / 255),
          (B = m[D + 1] / 255),
          (j = m[D + 2] / 255),
          (q = m[D + 3] / 255),
          (X = V * f + B * g + j * I + q * E + b),
          (ue = V * _ + B * y + j * T + q * v + R),
          (U = V * S + B * P + j * O + q * x + z),
          (W = V * L + B * F + j * w + q * A + C),
          ($ = Math.max(0, X * W) + a * (1 - W)),
          (oe = Math.max(0, ue * W) + n * (1 - W)),
          (J = Math.max(0, U * W) + r * (1 - W)),
          (m[D] = Math.max(0, Math.min(1, $)) * 255),
          (m[D + 1] = Math.max(0, Math.min(1, oe)) * 255),
          (m[D + 2] = Math.max(0, Math.min(1, J)) * 255)
      return d
    }
    function c(d, h) {
      let {
        mode: m = "contain",
        upscale: p = !1,
        width: f,
        height: g,
        matrix: I,
      } = h
      if (((I = !I || s(I) ? null : I), !f && !g)) return u(d, I)
      if ((f === null ? (f = g) : g === null && (g = f), m !== "force")) {
        let x = f / d.width,
          z = g / d.height,
          L = 1
        if (
          (m === "cover"
            ? (L = Math.max(x, z))
            : m === "contain" && (L = Math.min(x, z)),
          L > 1 && p === !1)
        )
          return u(d, I)
        ;(f = d.width * L), (g = d.height * L)
      }
      let E = d.width,
        b = d.height,
        _ = Math.round(f),
        y = Math.round(g),
        T = d.data,
        v = new Uint8ClampedArray(_ * y * 4),
        R = E / _,
        S = b / y,
        P = Math.ceil(R * 0.5),
        O = Math.ceil(S * 0.5)
      for (let x = 0; x < y; x++)
        for (let z = 0; z < _; z++) {
          let L = (z + x * _) * 4,
            F = 0,
            w = 0,
            A = 0,
            C = 0,
            D = 0,
            V = 0,
            B = 0,
            j = (x + 0.5) * S
          for (let q = Math.floor(x * S); q < (x + 1) * S; q++) {
            let X = Math.abs(j - (q + 0.5)) / O,
              ue = (z + 0.5) * R,
              U = X * X
            for (let W = Math.floor(z * R); W < (z + 1) * R; W++) {
              let $ = Math.abs(ue - (W + 0.5)) / P,
                oe = Math.sqrt(U + $ * $)
              if (
                oe >= -1 &&
                oe <= 1 &&
                ((F = 2 * oe * oe * oe - 3 * oe * oe + 1), F > 0)
              ) {
                $ = 4 * (W + q * E)
                let J = T[$ + 3]
                ;(B += F * J),
                  (A += F),
                  J < 255 && (F = (F * J) / 250),
                  (C += F * T[$]),
                  (D += F * T[$ + 1]),
                  (V += F * T[$ + 2]),
                  (w += F)
              }
            }
          }
          ;(v[L] = C / w),
            (v[L + 1] = D / w),
            (v[L + 2] = V / w),
            (v[L + 3] = B / A),
            I && l(L, v, I)
        }
      return { data: v, width: _, height: y }
    }
  },
  Am = (e, t) => {
    if (e.getUint32(t + 4, !1) !== 1165519206) return
    t += 4
    let i = e.getUint16((t += 6), !1) === 18761
    t += e.getUint32(t + 4, i)
    let a = e.getUint16(t, i)
    t += 2
    for (let n = 0; n < a; n++)
      if (e.getUint16(t + n * 12, i) === 274)
        return e.setUint16(t + n * 12 + 8, 1, i), !0
    return !1
  },
  Mm = (e) => {
    let t = new DataView(e)
    if (t.getUint16(0) !== 65496) return null
    let i = 2,
      a,
      n,
      r = !1
    for (
      ;
      i < t.byteLength &&
      ((a = t.getUint16(i, !1)),
      (n = t.getUint16(i + 2, !1) + 2),
      !(
        !((a >= 65504 && a <= 65519) || a === 65534) ||
        (r || (r = Am(t, i, n)), i + n > t.byteLength)
      ));

    )
      i += n
    return e.slice(0, i)
  },
  xm = (e) =>
    new Promise((t) => {
      let i = new FileReader()
      ;(i.onload = () => t(Mm(i.result) || null)),
        i.readAsArrayBuffer(e.slice(0, 256 * 1024))
    }),
  Om = () =>
    (window.BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder),
  Pm = (e, t) => {
    let i = Om()
    if (i) {
      let a = new i()
      return a.append(e), a.getBlob(t)
    }
    return new Blob([e], { type: t })
  },
  Dm = () => Math.random().toString(36).substr(2, 9),
  Fm = (e) => {
    let t = new Blob(["(", e.toString(), ")()"], {
        type: "application/javascript",
      }),
      i = URL.createObjectURL(t),
      a = new Worker(i),
      n = []
    return {
      transfer: () => {},
      post: (r, l, o) => {
        let s = Dm()
        ;(n[s] = l),
          (a.onmessage = (u) => {
            let c = n[u.data.id]
            c && (c(u.data.message), delete n[u.data.id])
          }),
          a.postMessage({ id: s, message: r }, o)
      },
      terminate: () => {
        a.terminate(), URL.revokeObjectURL(i)
      },
    }
  },
  Cm = (e) =>
    new Promise((t, i) => {
      let a = new Image()
      ;(a.onload = () => {
        t(a)
      }),
        (a.onerror = (n) => {
          i(n)
        }),
        (a.src = e)
    }),
  zm = (e) =>
    e.reduce(
      (t, i) => t.then((a) => i().then(Array.prototype.concat.bind(a))),
      Promise.resolve([])
    ),
  Nm = (e, t) =>
    new Promise((i) => {
      let a = { width: e.width, height: e.height },
        n = e.getContext("2d"),
        r = t.sort(ul).map(
          (l) => () =>
            new Promise((o) => {
              Wm[l[0]](n, a, l[1], o) && o()
            })
        )
      zm(r).then(() => i(e))
    }),
  yt = (e, t) => {
    e.beginPath(),
      (e.lineCap = t["stroke-linecap"]),
      (e.lineJoin = t["stroke-linejoin"]),
      (e.lineWidth = t["stroke-width"]),
      t["stroke-dasharray"].length &&
        e.setLineDash(t["stroke-dasharray"].split(",")),
      (e.fillStyle = t.fill),
      (e.strokeStyle = t.stroke),
      (e.globalAlpha = t.opacity || 1)
  },
  St = (e) => {
    e.fill(), e.stroke(), (e.globalAlpha = 1)
  },
  Bm = (e, t, i) => {
    let a = Rt(i, t),
      n = lt(i, t)
    return yt(e, n), e.rect(a.x, a.y, a.width, a.height), St(e, n), !0
  },
  Vm = (e, t, i) => {
    let a = Rt(i, t),
      n = lt(i, t)
    yt(e, n)
    let r = a.x,
      l = a.y,
      o = a.width,
      s = a.height,
      u = 0.5522848,
      c = (o / 2) * u,
      d = (s / 2) * u,
      h = r + o,
      m = l + s,
      p = r + o / 2,
      f = l + s / 2
    return (
      e.moveTo(r, f),
      e.bezierCurveTo(r, f - d, p - c, l, p, l),
      e.bezierCurveTo(p + c, l, h, f - d, h, f),
      e.bezierCurveTo(h, f + d, p + c, m, p, m),
      e.bezierCurveTo(p - c, m, r, f + d, r, f),
      St(e, n),
      !0
    )
  },
  Gm = (e, t, i, a) => {
    let n = Rt(i, t),
      r = lt(i, t)
    yt(e, r)
    let l = new Image()
    new URL(i.src, window.location.href).origin !== window.location.origin &&
      (l.crossOrigin = ""),
      (l.onload = () => {
        if (i.fit === "cover") {
          let s = n.width / n.height,
            u = s > 1 ? l.width : l.height * s,
            c = s > 1 ? l.width / s : l.height,
            d = l.width * 0.5 - u * 0.5,
            h = l.height * 0.5 - c * 0.5
          e.drawImage(l, d, h, u, c, n.x, n.y, n.width, n.height)
        } else if (i.fit === "contain") {
          let s = Math.min(n.width / l.width, n.height / l.height),
            u = s * l.width,
            c = s * l.height,
            d = n.x + n.width * 0.5 - u * 0.5,
            h = n.y + n.height * 0.5 - c * 0.5
          e.drawImage(l, 0, 0, l.width, l.height, d, h, u, c)
        } else
          e.drawImage(l, 0, 0, l.width, l.height, n.x, n.y, n.width, n.height)
        St(e, r), a()
      }),
      (l.src = i.src)
  },
  Um = (e, t, i) => {
    let a = Rt(i, t),
      n = lt(i, t)
    yt(e, n)
    let r = he(i.fontSize, t),
      l = i.fontFamily || "sans-serif",
      o = i.fontWeight || "normal",
      s = i.textAlign || "left"
    return (
      (e.font = `${o} ${r}px ${l}`),
      (e.textAlign = s),
      e.fillText(i.text, a.x, a.y),
      St(e, n),
      !0
    )
  },
  km = (e, t, i) => {
    let a = lt(i, t)
    yt(e, a), e.beginPath()
    let n = i.points.map((l) => ({
      x: he(l.x, t, 1, "width"),
      y: he(l.y, t, 1, "height"),
    }))
    e.moveTo(n[0].x, n[0].y)
    let r = n.length
    for (let l = 1; l < r; l++) e.lineTo(n[l].x, n[l].y)
    return St(e, a), !0
  },
  Hm = (e, t, i) => {
    let a = Rt(i, t),
      n = lt(i, t)
    yt(e, n), e.beginPath()
    let r = { x: a.x, y: a.y },
      l = { x: a.x + a.width, y: a.y + a.height }
    e.moveTo(r.x, r.y), e.lineTo(l.x, l.y)
    let o = dl({ x: l.x - r.x, y: l.y - r.y }),
      s = 0.04 * Math.min(t.width, t.height)
    if (i.lineDecoration.indexOf("arrow-begin") !== -1) {
      let u = bi(o, s),
        c = Ii(r, u),
        d = Ye(r, 2, c),
        h = Ye(r, -2, c)
      e.moveTo(d.x, d.y), e.lineTo(r.x, r.y), e.lineTo(h.x, h.y)
    }
    if (i.lineDecoration.indexOf("arrow-end") !== -1) {
      let u = bi(o, -s),
        c = Ii(l, u),
        d = Ye(l, 2, c),
        h = Ye(l, -2, c)
      e.moveTo(d.x, d.y), e.lineTo(l.x, l.y), e.lineTo(h.x, h.y)
    }
    return St(e, n), !0
  },
  Wm = { rect: Bm, ellipse: Vm, image: Gm, text: Um, line: Hm, path: km },
  Ym = (e) => {
    let t = document.createElement("canvas")
    return (
      (t.width = e.width),
      (t.height = e.height),
      t.getContext("2d").putImageData(e, 0, 0),
      t
    )
  },
  $m = (e, t, i = {}) =>
    new Promise((a, n) => {
      if (!e || !Jh(e)) return n({ status: "not an image file", file: e })
      let {
          stripImageHead: r,
          beforeCreateBlob: l,
          afterCreateBlob: o,
          canvasMemoryLimit: s,
        } = i,
        { crop: u, size: c, filter: d, markup: h, output: m } = t,
        p =
          t.image && t.image.orientation
            ? Math.max(1, Math.min(8, t.image.orientation))
            : null,
        f = m && m.quality,
        g = f === null ? null : f / 100,
        I = (m && m.type) || null,
        E = (m && m.background) || null,
        b = []
      c &&
        (typeof c.width == "number" || typeof c.height == "number") &&
        b.push({ type: "resize", data: c }),
        d && d.length === 20 && b.push({ type: "filter", data: d })
      let _ = (v) => {
          let R = o ? o(v) : v
          Promise.resolve(R).then(a)
        },
        y = (v, R) => {
          let S = Ym(v),
            P = h.length ? Nm(S, h) : S
          Promise.resolve(P).then((O) => {
            sm(O, R, l)
              .then((x) => {
                if ((cl(O), r)) return _(x)
                xm(e).then((z) => {
                  z !== null &&
                    (x = new Blob([z, x.slice(20)], { type: x.type })),
                    _(x)
                })
              })
              .catch(n)
          })
        }
      if (/svg/.test(e.type) && I === null)
        return wm(e, u, h, { background: E }).then((v) => {
          a(Pm(v, "image/svg+xml"))
        })
      let T = URL.createObjectURL(e)
      Cm(T)
        .then((v) => {
          URL.revokeObjectURL(T)
          let R = lm(v, p, u, { canvasMemoryLimit: s, background: E }),
            S = { quality: g, type: I || e.type }
          if (!b.length) return y(R, S)
          let P = Fm(Lm)
          P.post(
            { transforms: b, imageData: R },
            (O) => {
              y(vm(O), S), P.terminate()
            },
            [R.data.buffer]
          )
        })
        .catch(n)
    }),
  qm = ["x", "y", "left", "top", "right", "bottom", "width", "height"],
  jm = (e) => (typeof e == "string" && /%/.test(e) ? parseFloat(e) / 100 : e),
  Xm = (e) => {
    let [t, i] = e,
      a = i.points ? {} : qm.reduce((n, r) => ((n[r] = jm(i[r])), n), {})
    return [t, { zIndex: 0, ...i, ...a }]
  },
  Qm = (e) =>
    new Promise((t, i) => {
      let a = new Image()
      a.src = URL.createObjectURL(e)
      let n = () => {
        let l = a.naturalWidth,
          o = a.naturalHeight
        l &&
          o &&
          (URL.revokeObjectURL(a.src),
          clearInterval(r),
          t({ width: l, height: o }))
      }
      a.onerror = (l) => {
        URL.revokeObjectURL(a.src), clearInterval(r), i(l)
      }
      let r = setInterval(n, 1)
      n()
    })
typeof window < "u" &&
  typeof window.document < "u" &&
  (HTMLCanvasElement.prototype.toBlob ||
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function (e, t, i) {
        let a = this
        setTimeout(() => {
          let n = a.toDataURL(t, i).split(",")[1],
            r = atob(n),
            l = r.length,
            o = new Uint8Array(l)
          for (; l--; ) o[l] = r.charCodeAt(l)
          e(new Blob([o], { type: t || "image/png" }))
        })
      },
    }))
var _a = typeof window < "u" && typeof window.document < "u",
  Zm = _a && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  hl = ({ addFilter: e, utils: t }) => {
    let { Type: i, forin: a, getFileFromBlob: n, isFile: r } = t,
      l = ["crop", "resize", "filter", "markup", "output"],
      o = (c) => (d, h, m) => d(h, c ? c(m) : m),
      s = (c) =>
        c.aspectRatio === null &&
        c.rotation === 0 &&
        c.zoom === 1 &&
        c.center &&
        c.center.x === 0.5 &&
        c.center.y === 0.5 &&
        c.flip &&
        c.flip.horizontal === !1 &&
        c.flip.vertical === !1
    e(
      "SHOULD_PREPARE_OUTPUT",
      (c, { query: d }) =>
        new Promise((h) => {
          h(!d("IS_ASYNC"))
        })
    )
    let u = (c, d, h) =>
      new Promise((m) => {
        if (!c("GET_ALLOW_IMAGE_TRANSFORM") || h.archived || !r(d) || !jh(d))
          return m(!1)
        Qm(d)
          .then(() => {
            let p = c("GET_IMAGE_TRANSFORM_IMAGE_FILTER")
            if (p) {
              let f = p(d)
              if (f == null) return handleRevert(!0)
              if (typeof f == "boolean") return m(f)
              if (typeof f.then == "function") return f.then(m)
            }
            m(!0)
          })
          .catch((p) => {
            m(!1)
          })
      })
    return (
      e("DID_CREATE_ITEM", (c, { query: d, dispatch: h }) => {
        d("GET_ALLOW_IMAGE_TRANSFORM") &&
          c.extend(
            "requestPrepare",
            () =>
              new Promise((m, p) => {
                h(
                  "REQUEST_PREPARE_OUTPUT",
                  { query: c.id, item: c, success: m, failure: p },
                  !0
                )
              })
          )
      }),
      e(
        "PREPARE_OUTPUT",
        (c, { query: d, item: h }) =>
          new Promise((m) => {
            u(d, c, h).then((p) => {
              if (!p) return m(c)
              let f = []
              d("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_ORIGINAL") &&
                f.push(
                  () =>
                    new Promise((R) => {
                      R({
                        name: d("GET_IMAGE_TRANSFORM_VARIANTS_ORIGINAL_NAME"),
                        file: c,
                      })
                    })
                ),
                d("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_DEFAULT") &&
                  f.push(
                    (R, S, P) =>
                      new Promise((O) => {
                        R(S, P).then((x) =>
                          O({
                            name: d(
                              "GET_IMAGE_TRANSFORM_VARIANTS_DEFAULT_NAME"
                            ),
                            file: x,
                          })
                        )
                      })
                  )
              let g = d("GET_IMAGE_TRANSFORM_VARIANTS") || {}
              a(g, (R, S) => {
                let P = o(S)
                f.push(
                  (O, x, z) =>
                    new Promise((L) => {
                      P(O, x, z).then((F) => L({ name: R, file: F }))
                    })
                )
              })
              let I = d("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY"),
                E = d("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY_MODE"),
                b = I === null ? null : I / 100,
                _ = d("GET_IMAGE_TRANSFORM_OUTPUT_MIME_TYPE"),
                y = d("GET_IMAGE_TRANSFORM_CLIENT_TRANSFORMS") || l
              h.setMetadata("output", { type: _, quality: b, client: y }, !0)
              let T = (R, S) =>
                  new Promise((P, O) => {
                    let x = { ...S }
                    Object.keys(x)
                      .filter((B) => B !== "exif")
                      .forEach((B) => {
                        y.indexOf(B) === -1 && delete x[B]
                      })
                    let {
                        resize: z,
                        exif: L,
                        output: F,
                        crop: w,
                        filter: A,
                        markup: C,
                      } = x,
                      D = {
                        image: { orientation: L ? L.orientation : null },
                        output:
                          F &&
                          (F.type ||
                            typeof F.quality == "number" ||
                            F.background)
                            ? {
                                type: F.type,
                                quality:
                                  typeof F.quality == "number"
                                    ? F.quality * 100
                                    : null,
                                background:
                                  F.background ||
                                  d(
                                    "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
                                  ) ||
                                  null,
                              }
                            : void 0,
                        size:
                          z && (z.size.width || z.size.height)
                            ? { mode: z.mode, upscale: z.upscale, ...z.size }
                            : void 0,
                        crop: w && !s(w) ? { ...w } : void 0,
                        markup: C && C.length ? C.map(Xm) : [],
                        filter: A,
                      }
                    if (D.output) {
                      let B = F.type ? F.type !== R.type : !1,
                        j = /\/jpe?g$/.test(R.type),
                        q = F.quality !== null ? j && E === "always" : !1
                      if (!!!(D.size || D.crop || D.filter || B || q))
                        return P(R)
                    }
                    let V = {
                      beforeCreateBlob: d(
                        "GET_IMAGE_TRANSFORM_BEFORE_CREATE_BLOB"
                      ),
                      afterCreateBlob: d(
                        "GET_IMAGE_TRANSFORM_AFTER_CREATE_BLOB"
                      ),
                      canvasMemoryLimit: d(
                        "GET_IMAGE_TRANSFORM_CANVAS_MEMORY_LIMIT"
                      ),
                      stripImageHead: d(
                        "GET_IMAGE_TRANSFORM_OUTPUT_STRIP_IMAGE_HEAD"
                      ),
                    }
                    $m(R, D, V)
                      .then((B) => {
                        let j = n(B, Zh(R.name, Kh(B.type)))
                        P(j)
                      })
                      .catch(O)
                  }),
                v = f.map((R) => R(T, c, h.getMetadata()))
              Promise.all(v).then((R) => {
                m(R.length === 1 && R[0].name === null ? R[0].file : R)
              })
            })
          })
      ),
      {
        options: {
          allowImageTransform: [!0, i.BOOLEAN],
          imageTransformImageFilter: [null, i.FUNCTION],
          imageTransformOutputMimeType: [null, i.STRING],
          imageTransformOutputQuality: [null, i.INT],
          imageTransformOutputStripImageHead: [!0, i.BOOLEAN],
          imageTransformClientTransforms: [null, i.ARRAY],
          imageTransformOutputQualityMode: ["always", i.STRING],
          imageTransformVariants: [null, i.OBJECT],
          imageTransformVariantsIncludeDefault: [!0, i.BOOLEAN],
          imageTransformVariantsDefaultName: [null, i.STRING],
          imageTransformVariantsIncludeOriginal: [!1, i.BOOLEAN],
          imageTransformVariantsOriginalName: ["original_", i.STRING],
          imageTransformBeforeCreateBlob: [null, i.FUNCTION],
          imageTransformAfterCreateBlob: [null, i.FUNCTION],
          imageTransformCanvasMemoryLimit: [
            _a && Zm ? 4096 * 4096 : null,
            i.INT,
          ],
          imageTransformCanvasBackgroundColor: [null, i.STRING],
        },
      }
    )
  }
_a &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: hl })
  )
var ml = hl
var Ra = (e) => /^video/.test(e.type),
  Wt = (e) => /^audio/.test(e.type),
  ya = class {
    constructor(t, i) {
      ;(this.mediaEl = t),
        (this.audioElems = i),
        (this.onplayhead = !1),
        (this.duration = 0),
        (this.timelineWidth =
          this.audioElems.timeline.offsetWidth -
          this.audioElems.playhead.offsetWidth),
        (this.moveplayheadFn = this.moveplayhead.bind(this)),
        this.registerListeners()
    }
    registerListeners() {
      this.mediaEl.addEventListener(
        "timeupdate",
        this.timeUpdate.bind(this),
        !1
      ),
        this.mediaEl.addEventListener(
          "canplaythrough",
          () => (this.duration = this.mediaEl.duration),
          !1
        ),
        this.audioElems.timeline.addEventListener(
          "click",
          this.timelineClicked.bind(this),
          !1
        ),
        this.audioElems.button.addEventListener("click", this.play.bind(this)),
        this.audioElems.playhead.addEventListener(
          "mousedown",
          this.mouseDown.bind(this),
          !1
        ),
        window.addEventListener("mouseup", this.mouseUp.bind(this), !1)
    }
    play() {
      this.mediaEl.paused ? this.mediaEl.play() : this.mediaEl.pause(),
        this.audioElems.button.classList.toggle("play"),
        this.audioElems.button.classList.toggle("pause")
    }
    timeUpdate() {
      let t = (this.mediaEl.currentTime / this.duration) * 100
      ;(this.audioElems.playhead.style.marginLeft = t + "%"),
        this.mediaEl.currentTime === this.duration &&
          (this.audioElems.button.classList.toggle("play"),
          this.audioElems.button.classList.toggle("pause"))
    }
    moveplayhead(t) {
      let i = t.clientX - this.getPosition(this.audioElems.timeline)
      i >= 0 &&
        i <= this.timelineWidth &&
        (this.audioElems.playhead.style.marginLeft = i + "px"),
        i < 0 && (this.audioElems.playhead.style.marginLeft = "0px"),
        i > this.timelineWidth &&
          (this.audioElems.playhead.style.marginLeft =
            this.timelineWidth - 4 + "px")
    }
    timelineClicked(t) {
      this.moveplayhead(t),
        (this.mediaEl.currentTime = this.duration * this.clickPercent(t))
    }
    mouseDown() {
      ;(this.onplayhead = !0),
        window.addEventListener("mousemove", this.moveplayheadFn, !0),
        this.mediaEl.removeEventListener(
          "timeupdate",
          this.timeUpdate.bind(this),
          !1
        )
    }
    mouseUp(t) {
      window.removeEventListener("mousemove", this.moveplayheadFn, !0),
        this.onplayhead == !0 &&
          (this.moveplayhead(t),
          (this.mediaEl.currentTime = this.duration * this.clickPercent(t)),
          this.mediaEl.addEventListener(
            "timeupdate",
            this.timeUpdate.bind(this),
            !1
          )),
        (this.onplayhead = !1)
    }
    clickPercent(t) {
      return (
        (t.clientX - this.getPosition(this.audioElems.timeline)) /
        this.timelineWidth
      )
    }
    getPosition(t) {
      return t.getBoundingClientRect().left
    }
  },
  Km = (e) =>
    e.utils.createView({
      name: "media-preview",
      tag: "div",
      ignoreRect: !0,
      create: ({ root: t, props: i }) => {
        let { id: a } = i,
          n = t.query("GET_ITEM", { id: i.id }),
          r = Wt(n.file) ? "audio" : "video"
        if (
          ((t.ref.media = document.createElement(r)),
          t.ref.media.setAttribute("controls", !0),
          t.element.appendChild(t.ref.media),
          Wt(n.file))
        ) {
          let l = document.createDocumentFragment()
          ;(t.ref.audio = []),
            (t.ref.audio.container = document.createElement("div")),
            (t.ref.audio.button = document.createElement("span")),
            (t.ref.audio.timeline = document.createElement("div")),
            (t.ref.audio.playhead = document.createElement("div")),
            (t.ref.audio.container.className = "audioplayer"),
            (t.ref.audio.button.className = "playpausebtn play"),
            (t.ref.audio.timeline.className = "timeline"),
            (t.ref.audio.playhead.className = "playhead"),
            t.ref.audio.timeline.appendChild(t.ref.audio.playhead),
            t.ref.audio.container.appendChild(t.ref.audio.button),
            t.ref.audio.container.appendChild(t.ref.audio.timeline),
            l.appendChild(t.ref.audio.container),
            t.element.appendChild(l)
        }
      },
      write: e.utils.createRoute({
        DID_MEDIA_PREVIEW_LOAD: ({ root: t, props: i }) => {
          let { id: a } = i,
            n = t.query("GET_ITEM", { id: i.id })
          if (!n) return
          let r = window.URL || window.webkitURL,
            l = new Blob([n.file], { type: n.file.type })
          ;(t.ref.media.type = n.file.type),
            (t.ref.media.src =
              (n.file.mock && n.file.url) || r.createObjectURL(l)),
            Wt(n.file) && new ya(t.ref.media, t.ref.audio),
            t.ref.media.addEventListener(
              "loadeddata",
              () => {
                let o = 75
                if (Ra(n.file)) {
                  let s = t.ref.media.offsetWidth,
                    u = t.ref.media.videoWidth / s
                  o = t.ref.media.videoHeight / u
                }
                t.dispatch("DID_UPDATE_PANEL_HEIGHT", { id: i.id, height: o })
              },
              !1
            )
        },
      }),
    }),
  Jm = (e) => {
    let t = ({ root: a, props: n }) => {
        let { id: r } = n
        a.query("GET_ITEM", r) &&
          a.dispatch("DID_MEDIA_PREVIEW_LOAD", { id: r })
      },
      i = ({ root: a, props: n }) => {
        let r = Km(e)
        a.ref.media = a.appendChildView(a.createChildView(r, { id: n.id }))
      }
    return e.utils.createView({
      name: "media-preview-wrapper",
      create: i,
      write: e.utils.createRoute({ DID_MEDIA_PREVIEW_CONTAINER_CREATE: t }),
    })
  },
  Sa = (e) => {
    let { addFilter: t, utils: i } = e,
      { Type: a, createRoute: n } = i,
      r = Jm(e)
    return (
      t("CREATE_VIEW", (l) => {
        let { is: o, view: s, query: u } = l
        if (!o("file")) return
        let c = ({ root: d, props: h }) => {
          let { id: m } = h,
            p = u("GET_ITEM", m),
            f = u("GET_ALLOW_VIDEO_PREVIEW"),
            g = u("GET_ALLOW_AUDIO_PREVIEW")
          !p ||
            p.archived ||
            ((!Ra(p.file) || !f) && (!Wt(p.file) || !g)) ||
            ((d.ref.mediaPreview = s.appendChildView(
              s.createChildView(r, { id: m })
            )),
            d.dispatch("DID_MEDIA_PREVIEW_CONTAINER_CREATE", { id: m }))
        }
        s.registerWriter(
          n({ DID_LOAD_ITEM: c }, ({ root: d, props: h }) => {
            let { id: m } = h,
              p = u("GET_ITEM", m),
              f = d.query("GET_ALLOW_VIDEO_PREVIEW"),
              g = d.query("GET_ALLOW_AUDIO_PREVIEW")
            !p ||
              ((!Ra(p.file) || !f) && (!Wt(p.file) || !g)) ||
              d.rect.element.hidden
          })
        )
      }),
      {
        options: {
          allowVideoPreview: [!0, a.BOOLEAN],
          allowAudioPreview: [!0, a.BOOLEAN],
        },
      }
    )
  },
  ep = typeof window < "u" && typeof window.document < "u"
ep &&
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: Sa })
  )
var pl = {
  labelIdle:
    '\u0627\u0633\u062D\u0628 \u0648 \u0627\u062F\u0631\u062C \u0645\u0644\u0641\u0627\u062A\u0643 \u0623\u0648 <span class="filepond--label-action"> \u062A\u0635\u0641\u062D </span>',
  labelInvalidField:
    "\u0627\u0644\u062D\u0642\u0644 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
  labelFileWaitingForSize:
    "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062D\u062C\u0645",
  labelFileSizeNotAvailable:
    "\u0627\u0644\u062D\u062C\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D",
  labelFileLoading: "\u0628\u0627\u0644\u0625\u0646\u062A\u0638\u0627\u0631",
  labelFileLoadError:
    "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0645\u064A\u0644",
  labelFileProcessing: "\u064A\u062A\u0645 \u0627\u0644\u0631\u0641\u0639",
  labelFileProcessingComplete: "\u062A\u0645 \u0627\u0644\u0631\u0641\u0639",
  labelFileProcessingAborted:
    "\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0631\u0641\u0639",
  labelFileProcessingError:
    "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u0641\u0639",
  labelFileProcessingRevertError:
    "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0631\u0627\u062C\u0639",
  labelFileRemoveError:
    "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641",
  labelTapToCancel:
    "\u0627\u0646\u0642\u0631 \u0644\u0644\u0625\u0644\u063A\u0627\u0621",
  labelTapToRetry:
    "\u0627\u0646\u0642\u0631 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629",
  labelTapToUndo:
    "\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0631\u0627\u062C\u0639",
  labelButtonRemoveItem: "\u0645\u0633\u062D",
  labelButtonAbortItemLoad: "\u0625\u0644\u063A\u0627\u0621",
  labelButtonRetryItemLoad: "\u0625\u0639\u0627\u062F\u0629",
  labelButtonAbortItemProcessing: "\u0625\u0644\u063A\u0627\u0621",
  labelButtonUndoItemProcessing: "\u062A\u0631\u0627\u062C\u0639",
  labelButtonRetryItemProcessing: "\u0625\u0639\u0627\u062F\u0629",
  labelButtonProcessItem: "\u0631\u0641\u0639",
  labelMaxFileSizeExceeded:
    "\u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627",
  labelMaxFileSize:
    "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0642\u0635\u0649: {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A",
  labelMaxTotalFileSize:
    "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641: {filesize}",
  labelFileTypeNotAllowed:
    "\u0645\u0644\u0641 \u0645\u0646 \u0646\u0648\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",
  fileValidateTypeLabelExpectedTypes:
    "\u062A\u062A\u0648\u0642\u0639 {allButLastType} \u0645\u0646 {lastType}",
  imageValidateSizeLabelFormatError:
    "\u0646\u0648\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645",
  imageValidateSizeLabelImageSizeTooSmall:
    "\u0627\u0644\u0635\u0648\u0631\u0629 \u0635\u063A\u064A\u0631 \u062C\u062F\u0627",
  imageValidateSizeLabelImageSizeTooBig:
    "\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627",
  imageValidateSizeLabelExpectedMinSize:
    "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0623\u0628\u0639\u0627\u062F \u0647\u0648: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0623\u0628\u0639\u0627\u062F \u0647\u0648: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u0627\u0644\u062F\u0642\u0629 \u0636\u0639\u064A\u0641\u0629 \u062C\u062F\u0627",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u0627\u0644\u062F\u0642\u0629 \u0645\u0631\u062A\u0641\u0639\u0629 \u062C\u062F\u0627",
  imageValidateSizeLabelExpectedMinResolution:
    "\u0623\u0642\u0644 \u062F\u0642\u0629: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u0623\u0642\u0635\u0649 \u062F\u0642\u0629: {maxResolution}",
}
var fl = {
  labelIdle:
    'Arrossega i deixa els teus fitxers o <span class="filepond--label-action"> Navega </span>',
  labelInvalidField: "El camp cont\xE9 fitxers inv\xE0lids",
  labelFileWaitingForSize: "Esperant mida",
  labelFileSizeNotAvailable: "Mida no disponible",
  labelFileLoading: "Carregant",
  labelFileLoadError: "Error durant la c\xE0rrega",
  labelFileProcessing: "Pujant",
  labelFileProcessingComplete: "Pujada completada",
  labelFileProcessingAborted: "Pujada cancel\xB7lada",
  labelFileProcessingError: "Error durant la pujada",
  labelFileProcessingRevertError: "Error durant la reversi\xF3",
  labelFileRemoveError: "Error durant l'eliminaci\xF3",
  labelTapToCancel: "toca per cancel\xB7lar",
  labelTapToRetry: "toca per reintentar",
  labelTapToUndo: "toca per desfer",
  labelButtonRemoveItem: "Eliminar",
  labelButtonAbortItemLoad: "Cancel\xB7lar",
  labelButtonRetryItemLoad: "Reintentar",
  labelButtonAbortItemProcessing: "Cancel\xB7lar",
  labelButtonUndoItemProcessing: "Desfer",
  labelButtonRetryItemProcessing: "Reintentar",
  labelButtonProcessItem: "Pujar",
  labelMaxFileSizeExceeded: "El fitxer \xE9s massa gran",
  labelMaxFileSize: "La mida m\xE0xima del fitxer \xE9s {filesize}",
  labelMaxTotalFileSizeExceeded: "Mida m\xE0xima total excedida",
  labelMaxTotalFileSize: "La mida m\xE0xima total del fitxer \xE9s {filesize}",
  labelFileTypeNotAllowed: "Fitxer de tipus inv\xE0lid",
  fileValidateTypeLabelExpectedTypes: "Espera {allButLastType} o {lastType}",
  imageValidateSizeLabelFormatError: "Tipus d'imatge no suportada",
  imageValidateSizeLabelImageSizeTooSmall: "La imatge \xE9s massa petita",
  imageValidateSizeLabelImageSizeTooBig: "La imatge \xE9s massa gran",
  imageValidateSizeLabelExpectedMinSize:
    "La mida m\xEDnima \xE9s {minWidth} x {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "La mida m\xE0xima \xE9s {maxWidth} x {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "La resoluci\xF3 \xE9s massa baixa",
  imageValidateSizeLabelImageResolutionTooHigh:
    "La resoluci\xF3 \xE9s massa alta",
  imageValidateSizeLabelExpectedMinResolution:
    "La resoluci\xF3 m\xEDnima \xE9s {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "La resoluci\xF3 m\xE0xima \xE9s {maxResolution}",
}
var gl = {
  labelIdle:
    '\u067E\u06D5\u0695\u06AF\u06D5\u06A9\u0627\u0646 \u0641\u0695\u06CE \u0628\u062F\u06D5 \u0626\u06CE\u0631\u06D5 \u0628\u06C6 \u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u06CC\u0627\u0646 <span class="filepond--label-action"> \u0647\u06D5\u06B5\u0628\u0698\u06CE\u0631\u06D5 </span>',
  labelInvalidField:
    "\u067E\u06D5\u0695\u06AF\u06D5\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06CC \u062A\u06CE\u062F\u0627\u06CC\u06D5",
  labelFileWaitingForSize:
    "\u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06CC\u06CC \u0642\u06D5\u0628\u0627\u0631\u06D5",
  labelFileSizeNotAvailable:
    "\u0642\u06D5\u0628\u0627\u0631\u06D5 \u0628\u06D5\u0631\u062F\u06D5\u0633\u062A \u0646\u06CC\u06D5",
  labelFileLoading: "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
  labelFileLoadError:
    "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5\u0645\u0627\u0648\u06D5\u06CC \u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
  labelFileProcessing: "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
  labelFileProcessingComplete:
    "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u062A\u06D5\u0648\u0627\u0648 \u0628\u0648\u0648",
  labelFileProcessingAborted:
    "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u06CC\u06D5\u0648\u06D5",
  labelFileProcessingError:
    "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5\u06A9\u0627\u062A\u06CC \u0628\u0627\u0631\u06A9\u0631\u062F\u0646\u062F\u0627",
  labelFileProcessingRevertError:
    "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u06AF\u06D5\u0695\u0627\u0646\u06D5\u0648\u06D5",
  labelFileRemoveError:
    "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u0633\u0695\u06CC\u0646\u06D5\u0648\u06D5",
  labelTapToCancel:
    "\u0628\u06C6 \u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5 Tab \u062F\u0627\u0628\u06AF\u0631\u06D5",
  labelTapToRetry:
    "tap \u062F\u0627\u0628\u06AF\u0631\u06D5 \u0628\u06C6 \u062F\u0648\u0648\u0628\u0627\u0631\u06D5\u06A9\u0631\u062F\u0646\u06D5\u0648\u06D5",
  labelTapToUndo:
    "tap \u062F\u0627\u0628\u06AF\u0631\u06D5 \u0628\u06C6 \u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5",
  labelButtonRemoveItem: "\u0633\u0695\u06CC\u0646\u06D5\u0648\u06D5",
  labelButtonAbortItemLoad:
    "\u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5",
  labelButtonRetryItemLoad:
    "\u0647\u06D5\u0648\u06B5\u062F\u0627\u0646\u06D5\u0648\u06D5",
  labelButtonAbortItemProcessing:
    "\u067E\u06D5\u0634\u06CC\u0645\u0627\u0646\u0628\u0648\u0648\u0646\u06D5\u0648\u06D5",
  labelButtonUndoItemProcessing:
    "\u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5",
  labelButtonRetryItemProcessing:
    "\u0647\u06D5\u0648\u06B5\u062F\u0627\u0646\u06D5\u0648\u06D5",
  labelButtonProcessItem: "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
  labelMaxFileSizeExceeded:
    "\u067E\u06D5\u0695\u06AF\u06D5 \u0632\u06C6\u0631 \u06AF\u06D5\u0648\u0631\u06D5\u06CC\u06D5",
  labelMaxFileSize:
    "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5\u06CC \u06A9\u06C6\u06CC \u06AF\u0634\u062A\u06CC \u062A\u06CE\u067E\u06D5\u0695\u06CE\u0646\u062F\u0631\u0627",
  labelMaxTotalFileSize:
    "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5\u06CC \u06A9\u06C6\u06CC \u067E\u06D5\u0695\u06AF\u06D5 {filesize}",
  labelFileTypeNotAllowed:
    "\u062C\u06C6\u0631\u06CC \u067E\u06D5\u0695\u06AF\u06D5\u06A9\u06D5 \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06D5",
  fileValidateTypeLabelExpectedTypes:
    "\u062C\u06AF\u06D5 \u0644\u06D5 {allButLastType} \u06CC\u0627\u0646 {lastType}",
  imageValidateSizeLabelFormatError:
    "\u062C\u06C6\u0631\u06CC \u0648\u06CE\u0646\u06D5 \u067E\u0627\u06B5\u067E\u0634\u062A\u06CC\u06CC \u0646\u06D5\u06A9\u0631\u0627\u0648\u06D5",
  imageValidateSizeLabelImageSizeTooSmall:
    "\u0648\u06CE\u0646\u06D5\u06A9\u06D5 \u0632\u06C6\u0631 \u0628\u0686\u0648\u0648\u06A9\u06D5",
  imageValidateSizeLabelImageSizeTooBig:
    "\u0648\u06CE\u0646\u06D5\u06A9\u06D5 \u0632\u06C6\u0631 \u06AF\u06D5\u0648\u0631\u06D5\u06CC\u06D5",
  imageValidateSizeLabelExpectedMinSize:
    "\u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC\u06D5\u06A9\u06D5\u06CC \u0632\u06C6\u0631 \u06A9\u06D5\u0645\u06D5",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC\u06D5\u06A9\u06D5\u06CC \u0632\u06C6\u0631 \u0628\u06D5\u0631\u0632\u06D5",
  imageValidateSizeLabelExpectedMinResolution:
    "\u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0648\u0631\u062F\u0628\u06CC\u0646\u06CC {maxResolution}",
}
var El = {
  labelIdle:
    'P\u0159et\xE1hn\u011Bte soubor sem (drag&drop) nebo <span class="filepond--label-action"> Vyhledat </span>',
  labelInvalidField: "Pole obsahuje chybn\xE9 soubory",
  labelFileWaitingForSize: "Zji\u0161\u0165uje se velikost",
  labelFileSizeNotAvailable: "Velikost nen\xED zn\xE1m\xE1",
  labelFileLoading: "P\u0159en\xE1\u0161\xED se",
  labelFileLoadError: "Chyba p\u0159i p\u0159enosu",
  labelFileProcessing: "Prob\xEDh\xE1 upload",
  labelFileProcessingComplete: "Upload dokon\u010Den",
  labelFileProcessingAborted: "Upload stornov\xE1n",
  labelFileProcessingError: "Chyba p\u0159i uploadu",
  labelFileProcessingRevertError: "Chyba p\u0159i obnov\u011B",
  labelFileRemoveError: "Chyba p\u0159i odstran\u011Bn\xED",
  labelTapToCancel: "klepn\u011Bte pro storno",
  labelTapToRetry: "klepn\u011Bte pro opakov\xE1n\xED",
  labelTapToUndo: "klepn\u011Bte pro vr\xE1cen\xED",
  labelButtonRemoveItem: "Odstranit",
  labelButtonAbortItemLoad: "Storno",
  labelButtonRetryItemLoad: "Opakovat",
  labelButtonAbortItemProcessing: "Zp\u011Bt",
  labelButtonUndoItemProcessing: "Vr\xE1tit",
  labelButtonRetryItemProcessing: "Opakovat",
  labelButtonProcessItem: "Upload",
  labelMaxFileSizeExceeded: "Soubor je p\u0159\xEDli\u0161 velk\xFD",
  labelMaxFileSize: "Nejv\u011Bt\u0161\xED velikost souboru je {filesize}",
  labelMaxTotalFileSizeExceeded:
    "P\u0159ekro\u010Dena maxim\xE1ln\xED celkov\xE1 velikost souboru",
  labelMaxTotalFileSize:
    "Maxim\xE1ln\xED celkov\xE1 velikost souboru je {filesize}",
  labelFileTypeNotAllowed: "Soubor je nespr\xE1vn\xE9ho typu",
  fileValidateTypeLabelExpectedTypes:
    "O\u010Dek\xE1v\xE1 se {allButLastType} nebo {lastType}",
  imageValidateSizeLabelFormatError:
    "Obr\xE1zek tohoto typu nen\xED podporov\xE1n",
  imageValidateSizeLabelImageSizeTooSmall:
    "Obr\xE1zek je p\u0159\xEDli\u0161 mal\xFD",
  imageValidateSizeLabelImageSizeTooBig:
    "Obr\xE1zek je p\u0159\xEDli\u0161 velk\xFD",
  imageValidateSizeLabelExpectedMinSize:
    "Minim\xE1ln\xED rozm\u011Br je {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maxim\xE1ln\xED rozm\u011Br je {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "Rozli\u0161en\xED je p\u0159\xEDli\u0161 mal\xE9",
  imageValidateSizeLabelImageResolutionTooHigh:
    "Rozli\u0161en\xED je p\u0159\xEDli\u0161 velk\xE9",
  imageValidateSizeLabelExpectedMinResolution:
    "Minim\xE1ln\xED rozli\u0161en\xED je {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maxim\xE1ln\xED rozli\u0161en\xED je {maxResolution}",
}
var Tl = {
  labelIdle:
    'Tr\xE6k & slip filer eller <span class = "filepond - label-action"> Gennemse </span>',
  labelInvalidField: "Felt indeholder ugyldige filer",
  labelFileWaitingForSize: "Venter p\xE5 st\xF8rrelse",
  labelFileSizeNotAvailable: "St\xF8rrelse ikke tilg\xE6ngelig",
  labelFileLoading: "Loader",
  labelFileLoadError: "Load fejlede",
  labelFileProcessing: "Uploader",
  labelFileProcessingComplete: "Upload f\xE6rdig",
  labelFileProcessingAborted: "Upload annulleret",
  labelFileProcessingError: "Upload fejlede",
  labelFileProcessingRevertError: "Fortryd fejlede",
  labelFileRemoveError: "Fjern fejlede",
  labelTapToCancel: "tryk for at annullere",
  labelTapToRetry: "tryk for at pr\xF8ve igen",
  labelTapToUndo: "tryk for at fortryde",
  labelButtonRemoveItem: "Fjern",
  labelButtonAbortItemLoad: "Annuller",
  labelButtonRetryItemLoad: "Fors\xF8g igen",
  labelButtonAbortItemProcessing: "Annuller",
  labelButtonUndoItemProcessing: "Fortryd",
  labelButtonRetryItemProcessing: "Pr\xF8v igen",
  labelButtonProcessItem: "Upload",
  labelMaxFileSizeExceeded: "Filen er for stor",
  labelMaxFileSize: "Maksimal filst\xF8rrelse er {filesize}",
  labelMaxTotalFileSizeExceeded: "Maksimal totalst\xF8rrelse overskredet",
  labelMaxTotalFileSize: "Maksimal total filst\xF8rrelse er {filesize}",
  labelFileTypeNotAllowed: "Ugyldig filtype",
  fileValidateTypeLabelExpectedTypes:
    "Forventer {allButLastType} eller {lastType}",
  imageValidateSizeLabelFormatError: "Ugyldigt format",
  imageValidateSizeLabelImageSizeTooSmall: "Billedet er for lille",
  imageValidateSizeLabelImageSizeTooBig: "Billedet er for stort",
  imageValidateSizeLabelExpectedMinSize:
    "Minimum st\xF8rrelse er {minBredde} \xD7 {minH\xF8jde}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maksimal st\xF8rrelse er {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "For lav opl\xF8sning",
  imageValidateSizeLabelImageResolutionTooHigh: "For h\xF8j opl\xF8sning",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimum opl\xF8sning er {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maksimal opl\xF8sning er {maxResolution}",
}
var bl = {
  labelIdle:
    'Dateien ablegen oder <span class="filepond--label-action"> ausw\xE4hlen </span>',
  labelInvalidField: "Feld beinhaltet ung\xFCltige Dateien",
  labelFileWaitingForSize: "Dateigr\xF6\xDFe berechnen",
  labelFileSizeNotAvailable: "Dateigr\xF6\xDFe nicht verf\xFCgbar",
  labelFileLoading: "Laden",
  labelFileLoadError: "Fehler beim Laden",
  labelFileProcessing: "Upload l\xE4uft",
  labelFileProcessingComplete: "Upload abgeschlossen",
  labelFileProcessingAborted: "Upload abgebrochen",
  labelFileProcessingError: "Fehler beim Upload",
  labelFileProcessingRevertError: "Fehler beim Wiederherstellen",
  labelFileRemoveError: "Fehler beim L\xF6schen",
  labelTapToCancel: "abbrechen",
  labelTapToRetry: "erneut versuchen",
  labelTapToUndo: "r\xFCckg\xE4ngig",
  labelButtonRemoveItem: "Entfernen",
  labelButtonAbortItemLoad: "Verwerfen",
  labelButtonRetryItemLoad: "Erneut versuchen",
  labelButtonAbortItemProcessing: "Abbrechen",
  labelButtonUndoItemProcessing: "R\xFCckg\xE4ngig",
  labelButtonRetryItemProcessing: "Erneut versuchen",
  labelButtonProcessItem: "Upload",
  labelMaxFileSizeExceeded: "Datei ist zu gro\xDF",
  labelMaxFileSize: "Maximale Dateigr\xF6\xDFe: {filesize}",
  labelMaxTotalFileSizeExceeded:
    "Maximale gesamte Dateigr\xF6\xDFe \xFCberschritten",
  labelMaxTotalFileSize: "Maximale gesamte Dateigr\xF6\xDFe: {filesize}",
  labelFileTypeNotAllowed: "Dateityp ung\xFCltig",
  fileValidateTypeLabelExpectedTypes:
    "Erwartet {allButLastType} oder {lastType}",
  imageValidateSizeLabelFormatError: "Bildtyp nicht unterst\xFCtzt",
  imageValidateSizeLabelImageSizeTooSmall: "Bild ist zu klein",
  imageValidateSizeLabelImageSizeTooBig: "Bild ist zu gro\xDF",
  imageValidateSizeLabelExpectedMinSize:
    "Mindestgr\xF6\xDFe: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maximale Gr\xF6\xDFe: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Aufl\xF6sung ist zu niedrig",
  imageValidateSizeLabelImageResolutionTooHigh: "Aufl\xF6sung ist zu hoch",
  imageValidateSizeLabelExpectedMinResolution:
    "Mindestaufl\xF6sung: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maximale Aufl\xF6sung: {maxResolution}",
}
var Il = {
  labelIdle:
    'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
  labelInvalidField: "Field contains invalid files",
  labelFileWaitingForSize: "Waiting for size",
  labelFileSizeNotAvailable: "Size not available",
  labelFileLoading: "Loading",
  labelFileLoadError: "Error during load",
  labelFileProcessing: "Uploading",
  labelFileProcessingComplete: "Upload complete",
  labelFileProcessingAborted: "Upload cancelled",
  labelFileProcessingError: "Error during upload",
  labelFileProcessingRevertError: "Error during revert",
  labelFileRemoveError: "Error during remove",
  labelTapToCancel: "tap to cancel",
  labelTapToRetry: "tap to retry",
  labelTapToUndo: "tap to undo",
  labelButtonRemoveItem: "Remove",
  labelButtonAbortItemLoad: "Abort",
  labelButtonRetryItemLoad: "Retry",
  labelButtonAbortItemProcessing: "Cancel",
  labelButtonUndoItemProcessing: "Undo",
  labelButtonRetryItemProcessing: "Retry",
  labelButtonProcessItem: "Upload",
  labelMaxFileSizeExceeded: "File is too large",
  labelMaxFileSize: "Maximum file size is {filesize}",
  labelMaxTotalFileSizeExceeded: "Maximum total size exceeded",
  labelMaxTotalFileSize: "Maximum total file size is {filesize}",
  labelFileTypeNotAllowed: "File of invalid type",
  fileValidateTypeLabelExpectedTypes: "Expects {allButLastType} or {lastType}",
  imageValidateSizeLabelFormatError: "Image type not supported",
  imageValidateSizeLabelImageSizeTooSmall: "Image is too small",
  imageValidateSizeLabelImageSizeTooBig: "Image is too big",
  imageValidateSizeLabelExpectedMinSize:
    "Minimum size is {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maximum size is {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Resolution is too low",
  imageValidateSizeLabelImageResolutionTooHigh: "Resolution is too high",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimum resolution is {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maximum resolution is {maxResolution}",
}
var _l = {
  labelIdle:
    'Arrastra y suelta tus archivos o <span class = "filepond--label-action"> Examina <span>',
  labelInvalidField: "El campo contiene archivos inv\xE1lidos",
  labelFileWaitingForSize: "Esperando tama\xF1o",
  labelFileSizeNotAvailable: "Tama\xF1o no disponible",
  labelFileLoading: "Cargando",
  labelFileLoadError: "Error durante la carga",
  labelFileProcessing: "Subiendo",
  labelFileProcessingComplete: "Subida completa",
  labelFileProcessingAborted: "Subida cancelada",
  labelFileProcessingError: "Error durante la subida",
  labelFileProcessingRevertError: "Error durante la reversi\xF3n",
  labelFileRemoveError: "Error durante la eliminaci\xF3n",
  labelTapToCancel: "toca para cancelar",
  labelTapToRetry: "tocar para reintentar",
  labelTapToUndo: "tocar para deshacer",
  labelButtonRemoveItem: "Eliminar",
  labelButtonAbortItemLoad: "Cancelar",
  labelButtonRetryItemLoad: "Reintentar",
  labelButtonAbortItemProcessing: "Cancelar",
  labelButtonUndoItemProcessing: "Deshacer",
  labelButtonRetryItemProcessing: "Reintentar",
  labelButtonProcessItem: "Subir",
  labelMaxFileSizeExceeded: "El archivo es demasiado grande",
  labelMaxFileSize: "El tama\xF1o m\xE1ximo del archivo es {filesize}",
  labelMaxTotalFileSizeExceeded: "Tama\xF1o total m\xE1ximo excedido",
  labelMaxTotalFileSize:
    "El tama\xF1o total m\xE1ximo del archivo es {filesize}",
  labelFileTypeNotAllowed: "Archivo de tipo inv\xE1lido",
  fileValidateTypeLabelExpectedTypes: "Espera {allButLastType} o {lastType}",
  imageValidateSizeLabelFormatError: "Tipo de imagen no soportada",
  imageValidateSizeLabelImageSizeTooSmall: "La imagen es demasiado peque\xF1a",
  imageValidateSizeLabelImageSizeTooBig: "La imagen es demasiado grande",
  imageValidateSizeLabelExpectedMinSize:
    "El tama\xF1o m\xEDnimo es {minWidth} x {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "El tama\xF1o m\xE1ximo es {maxWidth} x {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "La resoluci\xF3n es demasiado baja",
  imageValidateSizeLabelImageResolutionTooHigh:
    "La resoluci\xF3n es demasiado alta",
  imageValidateSizeLabelExpectedMinResolution:
    "La resoluci\xF3n m\xEDnima es {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "La resoluci\xF3n m\xE1xima es {maxResolution}",
}
var Rl = {
  labelIdle:
    '\u0641\u0627\u06CC\u0644 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06A9\u0634\u06CC\u062F \u0648 \u0631\u0647\u0627 \u06A9\u0646\u06CC\u062F\u060C \u06CC\u0627 <span class="filepond--label-action"> \u062C\u0633\u062A\u062C\u0648 \u06A9\u0646\u06CC\u062F </span>',
  labelInvalidField:
    "\u0641\u06CC\u0644\u062F \u062F\u0627\u0631\u0627\u06CC \u0641\u0627\u06CC\u0644 \u0647\u0627\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A",
  labelFileWaitingForSize: "Waiting for size",
  labelFileSizeNotAvailable:
    "\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0645\u062C\u0627\u0632 \u0646\u06CC\u0633\u062A",
  labelFileLoading:
    "\u062F\u0631\u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
  labelFileLoadError:
    "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u0627\u062C\u0631\u0627",
  labelFileProcessing:
    "\u062F\u0631\u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
  labelFileProcessingComplete:
    "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0627\u0645\u0644 \u0634\u062F",
  labelFileProcessingAborted:
    "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0644\u063A\u0648 \u0634\u062F",
  labelFileProcessingError:
    "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
  labelFileProcessingRevertError:
    "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u062D\u0630\u0641",
  labelFileRemoveError:
    "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u062D\u0630\u0641",
  labelTapToCancel:
    "\u0628\u0631\u0627\u06CC \u0644\u063A\u0648 \u0636\u0631\u0628\u0647 \u0628\u0632\u0646\u06CC\u062F",
  labelTapToRetry:
    "\u0628\u0631\u0627\u06CC \u062A\u06A9\u0631\u0627\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F",
  labelTapToUndo:
    "\u0628\u0631\u0627\u06CC \u0628\u0631\u06AF\u0634\u062A \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F",
  labelButtonRemoveItem: "\u062D\u0630\u0641",
  labelButtonAbortItemLoad: "\u0644\u063A\u0648",
  labelButtonRetryItemLoad: "\u062A\u06A9\u0631\u0627\u0631",
  labelButtonAbortItemProcessing: "\u0644\u063A\u0648",
  labelButtonUndoItemProcessing: "\u0628\u0631\u06AF\u0634\u062A",
  labelButtonRetryItemProcessing: "\u062A\u06A9\u0631\u0627\u0631",
  labelButtonProcessItem: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
  labelMaxFileSizeExceeded:
    "\u0641\u0627\u06CC\u0644 \u0628\u0633\u06CC\u0627\u0631 \u062D\u062C\u06CC\u0645 \u0627\u0633\u062A",
  labelMaxFileSize:
    "\u062D\u062F\u0627\u06A9\u062B\u0631 \u0645\u062C\u0627\u0632 \u0641\u0627\u06CC\u0644 {filesize} \u0627\u0633\u062A",
  labelMaxTotalFileSizeExceeded:
    "\u0627\u0632 \u062D\u062F\u0627\u06A9\u062B\u0631 \u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0634\u062F",
  labelMaxTotalFileSize:
    "\u062D\u062F\u0627\u06A9\u062B\u0631 \u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 {filesize} \u0627\u0633\u062A",
  labelFileTypeNotAllowed:
    "\u0646\u0648\u0639 \u0641\u0627\u06CC\u0644 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A",
  fileValidateTypeLabelExpectedTypes:
    "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 {allButLastType} \u06CC\u0627 {lastType}",
  imageValidateSizeLabelFormatError:
    "\u0641\u0631\u0645\u062A \u062A\u0635\u0648\u06CC\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC \u0634\u0648\u062F",
  imageValidateSizeLabelImageSizeTooSmall:
    "\u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u06A9\u0648\u0686\u06A9 \u0627\u0633\u062A",
  imageValidateSizeLabelImageSizeTooBig:
    "\u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u0628\u0632\u0631\u06AF \u0627\u0633\u062A",
  imageValidateSizeLabelExpectedMinSize:
    "\u062D\u062F\u0627\u0642\u0644 \u0627\u0646\u062F\u0627\u0632\u0647 {minWidth} \xD7 {minHeight} \u0627\u0633\u062A",
  imageValidateSizeLabelExpectedMaxSize:
    "\u062D\u062F\u0627\u06A9\u062B\u0631 \u0627\u0646\u062F\u0627\u0632\u0647 {maxWidth} \xD7 {maxHeight} \u0627\u0633\u062A",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u06A9\u0645 \u0627\u0633\u062A",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u0648\u0636\u0648\u0639 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u0632\u06CC\u0627\u062F \u0627\u0633\u062A",
  imageValidateSizeLabelExpectedMinResolution:
    "\u062D\u062F\u0627\u0642\u0644 \u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 {minResolution} \u0627\u0633\u062A",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u062D\u062F\u0627\u06A9\u062B\u0631 \u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 {maxResolution} \u0627\u0633\u062A",
}
var yl = {
  labelIdle:
    'Ved\xE4 ja pudota tiedostoja tai <span class="filepond--label-action"> Selaa </span>',
  labelInvalidField: "Kent\xE4ss\xE4 on virheellisi\xE4 tiedostoja",
  labelFileWaitingForSize: "Odotetaan kokoa",
  labelFileSizeNotAvailable: "Kokoa ei saatavilla",
  labelFileLoading: "Ladataan",
  labelFileLoadError: "Virhe latauksessa",
  labelFileProcessing: "L\xE4hetet\xE4\xE4n",
  labelFileProcessingComplete: "L\xE4hetys valmis",
  labelFileProcessingAborted: "L\xE4hetys peruttu",
  labelFileProcessingError: "Virhe l\xE4hetyksess\xE4",
  labelFileProcessingRevertError: "Virhe palautuksessa",
  labelFileRemoveError: "Virhe poistamisessa",
  labelTapToCancel: "peruuta napauttamalla",
  labelTapToRetry: "yrit\xE4 uudelleen napauttamalla",
  labelTapToUndo: "kumoa napauttamalla",
  labelButtonRemoveItem: "Poista",
  labelButtonAbortItemLoad: "Keskeyt\xE4",
  labelButtonRetryItemLoad: "Yrit\xE4 uudelleen",
  labelButtonAbortItemProcessing: "Peruuta",
  labelButtonUndoItemProcessing: "Kumoa",
  labelButtonRetryItemProcessing: "Yrit\xE4 uudelleen",
  labelButtonProcessItem: "L\xE4het\xE4",
  labelMaxFileSizeExceeded: "Tiedoston koko on liian suuri",
  labelMaxFileSize: "Tiedoston maksimikoko on {filesize}",
  labelMaxTotalFileSizeExceeded: "Tiedostojen yhdistetty maksimikoko ylitetty",
  labelMaxTotalFileSize: "Tiedostojen yhdistetty maksimikoko on {filesize}",
  labelFileTypeNotAllowed: "Tiedostotyyppi\xE4 ei sallita",
  fileValidateTypeLabelExpectedTypes:
    "Sallitaan {allButLastType} tai {lastType}",
  imageValidateSizeLabelFormatError: "Kuvatyyppi\xE4 ei tueta",
  imageValidateSizeLabelImageSizeTooSmall: "Kuva on liian pieni",
  imageValidateSizeLabelImageSizeTooBig: "Kuva on liian suuri",
  imageValidateSizeLabelExpectedMinSize:
    "Minimikoko on {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maksimikoko on {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Resoluutio on liian pieni",
  imageValidateSizeLabelImageResolutionTooHigh: "Resoluutio on liian suuri",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimiresoluutio on {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maksimiresoluutio on {maxResolution}",
}
var Sl = {
  labelIdle:
    'Faites glisser vos fichiers ou <span class = "filepond--label-action"> Parcourir </span>',
  labelInvalidField: "Le champ contient des fichiers invalides",
  labelFileWaitingForSize: "En attente de taille",
  labelFileSizeNotAvailable: "Taille non disponible",
  labelFileLoading: "Chargement",
  labelFileLoadError: "Erreur durant le chargement",
  labelFileProcessing: "Traitement",
  labelFileProcessingComplete: "Traitement effectu\xE9",
  labelFileProcessingAborted: "Traitement interrompu",
  labelFileProcessingError: "Erreur durant le traitement",
  labelFileProcessingRevertError: "Erreur durant la restauration",
  labelFileRemoveError: "Erreur durant la suppression",
  labelTapToCancel: "appuyer pour annuler",
  labelTapToRetry: "appuyer pour r\xE9essayer",
  labelTapToUndo: "appuyer pour revenir en arri\xE8re",
  labelButtonRemoveItem: "Retirer",
  labelButtonAbortItemLoad: "Annuler",
  labelButtonRetryItemLoad: "Recommencer",
  labelButtonAbortItemProcessing: "Annuler",
  labelButtonUndoItemProcessing: "Revenir en arri\xE8re",
  labelButtonRetryItemProcessing: "Recommencer",
  labelButtonProcessItem: "Transf\xE9rer",
  labelMaxFileSizeExceeded: "Le fichier est trop volumineux",
  labelMaxFileSize: "La taille maximale de fichier est {filesize}",
  labelMaxTotalFileSizeExceeded: "Taille totale maximale d\xE9pass\xE9e",
  labelMaxTotalFileSize:
    "La taille totale maximale des fichiers est {filesize}",
  labelFileTypeNotAllowed: "Fichier non valide",
  fileValidateTypeLabelExpectedTypes: "Attendu {allButLastType} ou {lastType}",
  imageValidateSizeLabelFormatError: "Type d'image non pris en charge",
  imageValidateSizeLabelImageSizeTooSmall: "L'image est trop petite",
  imageValidateSizeLabelImageSizeTooBig: "L'image est trop grande",
  imageValidateSizeLabelExpectedMinSize:
    "La taille minimale est {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "La taille maximale est {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "La r\xE9solution est trop faible",
  imageValidateSizeLabelImageResolutionTooHigh:
    "La r\xE9solution est trop \xE9lev\xE9e",
  imageValidateSizeLabelExpectedMinResolution:
    "La r\xE9solution minimale est {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "La r\xE9solution maximale est {maxResolution}",
}
var wl = {
  labelIdle:
    'Mozgasd ide a f\xE1jlt a felt\xF6lt\xE9shez, vagy <span class="filepond--label-action"> tall\xF3z\xE1s </span>',
  labelInvalidField: "A mez\u0151 \xE9rv\xE9nytelen f\xE1jlokat tartalmaz",
  labelFileWaitingForSize: "F\xE1ljm\xE9ret kisz\xE1mol\xE1sa",
  labelFileSizeNotAvailable: "A f\xE1jlm\xE9ret nem el\xE9rhet\u0151",
  labelFileLoading: "T\xF6lt\xE9s",
  labelFileLoadError: "Hiba a bet\xF6lt\xE9s sor\xE1n",
  labelFileProcessing: "Felt\xF6lt\xE9s",
  labelFileProcessingComplete: "Sikeres felt\xF6lt\xE9s",
  labelFileProcessingAborted: "A felt\xF6lt\xE9s megszak\xEDtva",
  labelFileProcessingError: "Hiba t\xF6rt\xE9nt a felt\xF6lt\xE9s sor\xE1n",
  labelFileProcessingRevertError: "Hiba a vissza\xE1ll\xEDt\xE1s sor\xE1n",
  labelFileRemoveError: "Hiba t\xF6rt\xE9nt az elt\xE1vol\xEDt\xE1s sor\xE1n",
  labelTapToCancel: "koppints a t\xF6rl\xE9shez",
  labelTapToRetry: "koppints az \xFAjrakezd\xE9shez",
  labelTapToUndo: "koppints a visszavon\xE1shoz",
  labelButtonRemoveItem: "Elt\xE1vol\xEDt\xE1s",
  labelButtonAbortItemLoad: "Megszak\xEDt\xE1s",
  labelButtonRetryItemLoad: "\xDAjrapr\xF3b\xE1lkoz\xE1s",
  labelButtonAbortItemProcessing: "Megszak\xEDt\xE1s",
  labelButtonUndoItemProcessing: "Visszavon\xE1s",
  labelButtonRetryItemProcessing: "\xDAjrapr\xF3b\xE1lkoz\xE1s",
  labelButtonProcessItem: "Felt\xF6lt\xE9s",
  labelMaxFileSizeExceeded:
    "A f\xE1jl t\xFAll\xE9pte a maxim\xE1lis m\xE9retet",
  labelMaxFileSize: "Maxim\xE1lis f\xE1jlm\xE9ret: {filesize}",
  labelMaxTotalFileSizeExceeded:
    "T\xFAll\xE9pte a maxim\xE1lis teljes m\xE9retet",
  labelMaxTotalFileSize: "A maxim\xE1is teljes f\xE1jlm\xE9ret: {filesize}",
  labelFileTypeNotAllowed: "\xC9rv\xE9nytelen t\xEDpus\xFA f\xE1jl",
  fileValidateTypeLabelExpectedTypes:
    "Enged\xE9lyezett t\xEDpusok {allButLastType} vagy {lastType}",
  imageValidateSizeLabelFormatError: "A k\xE9pt\xEDpus nem t\xE1mogatott",
  imageValidateSizeLabelImageSizeTooSmall: "A k\xE9p t\xFAl kicsi",
  imageValidateSizeLabelImageSizeTooBig: "A k\xE9p t\xFAl nagy",
  imageValidateSizeLabelExpectedMinSize:
    "Minimum m\xE9ret: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maximum m\xE9ret: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "A felbont\xE1s t\xFAl alacsony",
  imageValidateSizeLabelImageResolutionTooHigh: "A felbont\xE1s t\xFAl magas",
  imageValidateSizeLabelExpectedMinResolution:
    "Minim\xE1is felbont\xE1s: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maxim\xE1lis felbont\xE1s: {maxResolution}",
}
var vl = {
  labelIdle:
    'Seret & Jatuhkan berkas Anda atau <span class="filepond--label-action">Jelajahi</span>',
  labelInvalidField: "Isian berisi berkas yang tidak valid",
  labelFileWaitingForSize: "Menunggu ukuran berkas",
  labelFileSizeNotAvailable: "Ukuran berkas tidak tersedia",
  labelFileLoading: "Memuat",
  labelFileLoadError: "Kesalahan saat memuat",
  labelFileProcessing: "Mengunggah",
  labelFileProcessingComplete: "Pengunggahan selesai",
  labelFileProcessingAborted: "Pengunggahan dibatalkan",
  labelFileProcessingError: "Kesalahan saat pengunggahan",
  labelFileProcessingRevertError: "Kesalahan saat pemulihan",
  labelFileRemoveError: "Kesalahan saat penghapusan",
  labelTapToCancel: "ketuk untuk membatalkan",
  labelTapToRetry: "ketuk untuk mencoba lagi",
  labelTapToUndo: "ketuk untuk mengurungkan",
  labelButtonRemoveItem: "Hapus",
  labelButtonAbortItemLoad: "Batalkan",
  labelButtonRetryItemLoad: "Coba Kembali",
  labelButtonAbortItemProcessing: "Batalkan",
  labelButtonUndoItemProcessing: "Urungkan",
  labelButtonRetryItemProcessing: "Coba Kembali",
  labelButtonProcessItem: "Unggah",
  labelMaxFileSizeExceeded: "Berkas terlalu besar",
  labelMaxFileSize: "Ukuran berkas maksimum adalah {filesize}",
  labelMaxTotalFileSizeExceeded: "Jumlah berkas maksimum terlampaui",
  labelMaxTotalFileSize: "Jumlah berkas maksimum adalah {filesize}",
  labelFileTypeNotAllowed: "Jenis berkas tidak valid",
  fileValidateTypeLabelExpectedTypes:
    "Mengharapkan {allButLastType} atau {lastType}",
  imageValidateSizeLabelFormatError: "Jenis citra tidak didukung",
  imageValidateSizeLabelImageSizeTooSmall: "Citra terlalu kecil",
  imageValidateSizeLabelImageSizeTooBig: "Citra terlalu besar",
  imageValidateSizeLabelExpectedMinSize:
    "Ukuran minimum adalah {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Ukuran maksimum adalah {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Resolusi terlalu rendah",
  imageValidateSizeLabelImageResolutionTooHigh: "Resolusi terlalu tinggi",
  imageValidateSizeLabelExpectedMinResolution:
    "Resolusi minimum adalah {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Resolusi maksimum adalah {maxResolution}",
}
var Ll = {
  labelIdle:
    'Trascina e rilascia i tuoi file oppure <span class = "filepond--label-action"> Carica <span>',
  labelInvalidField: "Il campo contiene dei file non validi",
  labelFileWaitingForSize: "Aspettando le dimensioni",
  labelFileSizeNotAvailable: "Dimensioni non disponibili",
  labelFileLoading: "Caricamento",
  labelFileLoadError: "Errore durante il caricamento",
  labelFileProcessing: "Caricamento",
  labelFileProcessingComplete: "Caricamento completato",
  labelFileProcessingAborted: "Caricamento cancellato",
  labelFileProcessingError: "Errore durante il caricamento",
  labelFileProcessingRevertError: "Errore durante il ripristino",
  labelFileRemoveError: "Errore durante l'eliminazione",
  labelTapToCancel: "tocca per cancellare",
  labelTapToRetry: "tocca per riprovare",
  labelTapToUndo: "tocca per ripristinare",
  labelButtonRemoveItem: "Elimina",
  labelButtonAbortItemLoad: "Cancella",
  labelButtonRetryItemLoad: "Ritenta",
  labelButtonAbortItemProcessing: "Camcella",
  labelButtonUndoItemProcessing: "Indietro",
  labelButtonRetryItemProcessing: "Ritenta",
  labelButtonProcessItem: "Carica",
  labelMaxFileSizeExceeded: "Il peso del file \xE8 eccessivo",
  labelMaxFileSize: "Il peso massimo del file \xE8 {filesize}",
  labelMaxTotalFileSizeExceeded: "Dimensione totale massima superata",
  labelMaxTotalFileSize:
    "La dimensione massima totale del file \xE8 {filesize}",
  labelFileTypeNotAllowed: "File non supportato",
  fileValidateTypeLabelExpectedTypes: "Aspetta {allButLastType} o {lastType}",
  imageValidateSizeLabelFormatError: "Tipo di immagine non compatibile",
  imageValidateSizeLabelImageSizeTooSmall: "L'immagine \xE8 troppo piccola",
  imageValidateSizeLabelImageSizeTooBig: "L'immagine \xE8 troppo grande",
  imageValidateSizeLabelExpectedMinSize:
    "La dimensione minima \xE8 {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "La dimensione massima \xE8 {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "La risoluzione \xE8 troppo bassa",
  imageValidateSizeLabelImageResolutionTooHigh:
    "La risoluzione \xE8 troppo alta",
  imageValidateSizeLabelExpectedMinResolution:
    "La risoluzione minima \xE8 {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "La risoluzione massima \xE8 {maxResolution}",
}
var Al = {
  labelIdle:
    '\u1791\u17B6\u1789&\u178A\u17B6\u1780\u17CB\u17A0\u17D2\u179C\u17B6\u179B\u17CB\u17AF\u1780\u179F\u17B6\u179A\u179A\u1794\u179F\u17CB\u17A2\u17D2\u1793\u1780 \u17AC <span class="filepond--label-action"> \u179F\u17D2\u179C\u17C2\u1784\u179A\u1780 </span>',
  labelInvalidField:
    "\u1785\u1793\u17D2\u179B\u17C4\u17C7\u1798\u17B6\u1793\u17AF\u1780\u179F\u17B6\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C",
  labelFileWaitingForSize:
    "\u1780\u17C6\u1796\u17BB\u1784\u179A\u1784\u17CB\u1785\u17B6\u17C6\u1791\u17C6\u17A0\u17C6",
  labelFileSizeNotAvailable:
    "\u1791\u17C6\u17A0\u17C6\u1798\u17B7\u1793\u17A2\u17B6\u1785\u1794\u17D2\u179A\u17BE\u1794\u17B6\u1793",
  labelFileLoading:
    "\u1780\u17C6\u1796\u17BB\u1784\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A",
  labelFileLoadError:
    "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A",
  labelFileProcessing:
    "\u1780\u17C6\u1796\u17BB\u1784\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784",
  labelFileProcessingComplete:
    "\u1780\u17B6\u179A\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784\u1796\u17C1\u1789\u179B\u17C1\u1789",
  labelFileProcessingAborted:
    "\u1780\u17B6\u179A\u1794\u1784\u17D2\u17A0\u17C4\u17C7\u178F\u17D2\u179A\u17BC\u179C\u1794\u17B6\u1793\u1794\u17C4\u17C7\u1794\u1784\u17CB",
  labelFileProcessingError:
    "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u1780\u17C6\u1796\u17BB\u1784\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784",
  labelFileProcessingRevertError:
    "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178F\u17D2\u179A\u17A1\u1794\u17CB",
  labelFileRemoveError:
    "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178A\u1780\u1785\u17C1\u1789",
  labelTapToCancel:
    "\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1794\u17C4\u17C7\u1794\u1784\u17CB",
  labelTapToRetry:
    "\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F",
  labelTapToUndo:
    "\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1798\u17B7\u1793\u1792\u17D2\u179C\u17BE\u179C\u17B7\u1789",
  labelButtonRemoveItem: "\u1799\u1780\u1785\u17C1\u1789",
  labelButtonAbortItemLoad: "\u1794\u17C4\u17C7\u1794\u1784\u17CB",
  labelButtonRetryItemLoad:
    "\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F",
  labelButtonAbortItemProcessing: "\u1794\u17C4\u17C7\u1794\u1784\u17CB",
  labelButtonUndoItemProcessing:
    "\u1798\u17B7\u1793\u1792\u17D2\u179C\u17BE\u179C\u17B7\u1789",
  labelButtonRetryItemProcessing:
    "\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F",
  labelButtonProcessItem: "\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784",
  labelMaxFileSizeExceeded:
    "\u17AF\u1780\u179F\u17B6\u179A\u1792\u17C6\u1796\u17C1\u1780",
  labelMaxFileSize:
    "\u1791\u17C6\u17A0\u17C6\u17AF\u1780\u179F\u17B6\u179A\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u179B\u17BE\u179F\u1791\u17C6\u17A0\u17C6\u179F\u179A\u17BB\u1794\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6",
  labelMaxTotalFileSize:
    "\u1791\u17C6\u17A0\u17C6\u17AF\u1780\u179F\u17B6\u179A\u179F\u179A\u17BB\u1794\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {filesize}",
  labelFileTypeNotAllowed:
    "\u1794\u17D2\u179A\u1797\u17C1\u1791\u17AF\u1780\u179F\u17B6\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C",
  fileValidateTypeLabelExpectedTypes:
    "\u179A\u17C6\u1796\u17B9\u1784\u1790\u17B6 {allButLastType} \u17AC {lastType}",
  imageValidateSizeLabelFormatError:
    "\u1794\u17D2\u179A\u1797\u17C1\u1791\u179A\u17BC\u1794\u1797\u17B6\u1796\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C",
  imageValidateSizeLabelImageSizeTooSmall:
    "\u179A\u17BC\u1794\u1797\u17B6\u1796\u178F\u17BC\u1785\u1796\u17C1\u1780",
  imageValidateSizeLabelImageSizeTooBig:
    "\u179A\u17BC\u1794\u1797\u17B6\u1796\u1792\u17C6\u1796\u17C1\u1780",
  imageValidateSizeLabelExpectedMinSize:
    "\u1791\u17C6\u17A0\u17C6\u17A2\u1794\u17D2\u1794\u1794\u179A\u1798\u17B6\u1782\u17BA {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u1791\u17C6\u17A0\u17C6\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1791\u17B6\u1794\u1796\u17C1\u1780",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1781\u17D2\u1796\u179F\u17CB\u1796\u17C1\u1780",
  imageValidateSizeLabelExpectedMinResolution:
    "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u17A2\u1794\u17D2\u1794\u1794\u179A\u1798\u17B6\u1782\u17BA {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {maxResolution}",
}
var Ml = {
  labelIdle:
    'Drag & Drop je bestanden of <span class="filepond--label-action"> Bladeren </span>',
  labelInvalidField: "Veld bevat ongeldige bestanden",
  labelFileWaitingForSize: "Wachten op grootte",
  labelFileSizeNotAvailable: "Grootte niet beschikbaar",
  labelFileLoading: "Laden",
  labelFileLoadError: "Fout tijdens laden",
  labelFileProcessing: "Uploaden",
  labelFileProcessingComplete: "Upload afgerond",
  labelFileProcessingAborted: "Upload geannuleerd",
  labelFileProcessingError: "Fout tijdens upload",
  labelFileProcessingRevertError: "Fout bij herstellen",
  labelFileRemoveError: "Fout bij verwijderen",
  labelTapToCancel: "tik om te annuleren",
  labelTapToRetry: "tik om opnieuw te proberen",
  labelTapToUndo: "tik om ongedaan te maken",
  labelButtonRemoveItem: "Verwijderen",
  labelButtonAbortItemLoad: "Afbreken",
  labelButtonRetryItemLoad: "Opnieuw proberen",
  labelButtonAbortItemProcessing: "Annuleren",
  labelButtonUndoItemProcessing: "Ongedaan maken",
  labelButtonRetryItemProcessing: "Opnieuw proberen",
  labelButtonProcessItem: "Upload",
  labelMaxFileSizeExceeded: "Bestand is te groot",
  labelMaxFileSize: "Maximale bestandsgrootte is {filesize}",
  labelMaxTotalFileSizeExceeded: "Maximale totale grootte overschreden",
  labelMaxTotalFileSize: "Maximale totale bestandsgrootte is {filesize}",
  labelFileTypeNotAllowed: "Ongeldig bestandstype",
  fileValidateTypeLabelExpectedTypes: "Verwacht {allButLastType} of {lastType}",
  imageValidateSizeLabelFormatError: "Afbeeldingstype niet ondersteund",
  imageValidateSizeLabelImageSizeTooSmall: "Afbeelding is te klein",
  imageValidateSizeLabelImageSizeTooBig: "Afbeelding is te groot",
  imageValidateSizeLabelExpectedMinSize:
    "Minimale afmeting is {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maximale afmeting is {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Resolutie is te laag",
  imageValidateSizeLabelImageResolutionTooHigh: "Resolution is too high",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimale resolutie is {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maximale resolutie is {maxResolution}",
}
var xl = {
  labelIdle:
    'Dra og slipp filene dine, eller <span class="filepond--label-action"> Bla gjennom... </span>',
  labelInvalidField: "Feltet inneholder ugyldige filer",
  labelFileWaitingForSize: "Venter p\xE5 st\xF8rrelse",
  labelFileSizeNotAvailable: "St\xF8rrelse ikke tilgjengelig",
  labelFileLoading: "Laster",
  labelFileLoadError: "Feil under lasting",
  labelFileProcessing: "Laster opp",
  labelFileProcessingComplete: "Opplasting ferdig",
  labelFileProcessingAborted: "Opplasting avbrutt",
  labelFileProcessingError: "Feil under opplasting",
  labelFileProcessingRevertError: "Feil under reversering",
  labelFileRemoveError: "Feil under flytting",
  labelTapToCancel: "klikk for \xE5 avbryte",
  labelTapToRetry: "klikk for \xE5 pr\xF8ve p\xE5 nytt",
  labelTapToUndo: "klikk for \xE5 angre",
  labelButtonRemoveItem: "Fjern",
  labelButtonAbortItemLoad: "Avbryt",
  labelButtonRetryItemLoad: "Pr\xF8v p\xE5 nytt",
  labelButtonAbortItemProcessing: "Avbryt",
  labelButtonUndoItemProcessing: "Angre",
  labelButtonRetryItemProcessing: "Pr\xF8v p\xE5 nytt",
  labelButtonProcessItem: "Last opp",
  labelMaxFileSizeExceeded: "Filen er for stor",
  labelMaxFileSize: "Maksimal filst\xF8rrelse er {filesize}",
  labelMaxTotalFileSizeExceeded: "Maksimal total st\xF8rrelse oversteget",
  labelMaxTotalFileSize: "Maksimal total st\xF8rrelse er {filesize}",
  labelFileTypeNotAllowed: "Ugyldig filtype",
  fileValidateTypeLabelExpectedTypes:
    "Forventer {allButLastType} eller {lastType}",
  imageValidateSizeLabelFormatError: "Bildeformat ikke st\xF8ttet",
  imageValidateSizeLabelImageSizeTooSmall: "Bildet er for lite",
  imageValidateSizeLabelImageSizeTooBig: "Bildet er for stort",
  imageValidateSizeLabelExpectedMinSize:
    "Minimumsst\xF8rrelse er {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maksimumsst\xF8rrelse er {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Oppl\xF8sningen er for lav",
  imageValidateSizeLabelImageResolutionTooHigh: "Oppl\xF8sningen er for h\xF8y",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimum oppl\xF8sning er {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maksimal oppl\xF8sning er {maxResolution}",
}
var Ol = {
  labelIdle:
    'Przeci\u0105gnij i upu\u015B\u0107 lub <span class="filepond--label-action">wybierz</span> pliki',
  labelInvalidField: "Nieprawid\u0142owe pliki",
  labelFileWaitingForSize: "Pobieranie rozmiaru",
  labelFileSizeNotAvailable: "Nieznany rozmiar",
  labelFileLoading: "Wczytywanie",
  labelFileLoadError: "B\u0142\u0105d wczytywania",
  labelFileProcessing: "Przesy\u0142anie",
  labelFileProcessingComplete: "Przes\u0142ano",
  labelFileProcessingAborted: "Przerwano",
  labelFileProcessingError: "Przesy\u0142anie nie powiod\u0142o si\u0119",
  labelFileProcessingRevertError: "Co\u015B posz\u0142o nie tak",
  labelFileRemoveError: "Nieudane usuni\u0119cie",
  labelTapToCancel: "Anuluj",
  labelTapToRetry: "Pon\xF3w",
  labelTapToUndo: "Cofnij",
  labelButtonRemoveItem: "Usu\u0144",
  labelButtonAbortItemLoad: "Przerwij",
  labelButtonRetryItemLoad: "Pon\xF3w",
  labelButtonAbortItemProcessing: "Anuluj",
  labelButtonUndoItemProcessing: "Cofnij",
  labelButtonRetryItemProcessing: "Pon\xF3w",
  labelButtonProcessItem: "Prze\u015Blij",
  labelMaxFileSizeExceeded: "Plik jest zbyt du\u017Cy",
  labelMaxFileSize: "Dopuszczalna wielko\u015B\u0107 pliku to {filesize}",
  labelMaxTotalFileSizeExceeded:
    "Przekroczono \u0142\u0105czny rozmiar plik\xF3w",
  labelMaxTotalFileSize:
    "\u0141\u0105czny rozmiar plik\xF3w nie mo\u017Ce przekroczy\u0107 {filesize}",
  labelFileTypeNotAllowed: "Niedozwolony rodzaj pliku",
  fileValidateTypeLabelExpectedTypes:
    "Oczekiwano {allButLastType} lub {lastType}",
  imageValidateSizeLabelFormatError: "Nieobs\u0142ugiwany format obrazu",
  imageValidateSizeLabelImageSizeTooSmall: "Obraz jest zbyt ma\u0142y",
  imageValidateSizeLabelImageSizeTooBig: "Obraz jest zbyt du\u017Cy",
  imageValidateSizeLabelExpectedMinSize:
    "Minimalne wymiary obrazu to {minWidth}\xD7{minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maksymalna wymiary obrazu to {maxWidth}\xD7{maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "Rozdzielczo\u015B\u0107 jest zbyt niska",
  imageValidateSizeLabelImageResolutionTooHigh:
    "Rozdzielczo\u015B\u0107 jest zbyt wysoka",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimalna rozdzielczo\u015B\u0107 to {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maksymalna rozdzielczo\u015B\u0107 to {maxResolution}",
}
var _i = {
  labelIdle:
    'Arraste e solte os arquivos ou <span class="filepond--label-action"> Clique aqui </span>',
  labelInvalidField: "Arquivos inv\xE1lidos",
  labelFileWaitingForSize: "Calculando o tamanho do arquivo",
  labelFileSizeNotAvailable: "Tamanho do arquivo indispon\xEDvel",
  labelFileLoading: "Carregando",
  labelFileLoadError: "Erro durante o carregamento",
  labelFileProcessing: "Enviando",
  labelFileProcessingComplete: "Envio finalizado",
  labelFileProcessingAborted: "Envio cancelado",
  labelFileProcessingError: "Erro durante o envio",
  labelFileProcessingRevertError: "Erro ao reverter o envio",
  labelFileRemoveError: "Erro ao remover o arquivo",
  labelTapToCancel: "clique para cancelar",
  labelTapToRetry: "clique para reenviar",
  labelTapToUndo: "clique para desfazer",
  labelButtonRemoveItem: "Remover",
  labelButtonAbortItemLoad: "Abortar",
  labelButtonRetryItemLoad: "Reenviar",
  labelButtonAbortItemProcessing: "Cancelar",
  labelButtonUndoItemProcessing: "Desfazer",
  labelButtonRetryItemProcessing: "Reenviar",
  labelButtonProcessItem: "Enviar",
  labelMaxFileSizeExceeded: "Arquivo \xE9 muito grande",
  labelMaxFileSize: "O tamanho m\xE1ximo permitido: {filesize}",
  labelMaxTotalFileSizeExceeded: "Tamanho total dos arquivos excedido",
  labelMaxTotalFileSize: "Tamanho total permitido: {filesize}",
  labelFileTypeNotAllowed: "Tipo de arquivo inv\xE1lido",
  fileValidateTypeLabelExpectedTypes:
    "Tipos de arquivo suportados s\xE3o {allButLastType} ou {lastType}",
  imageValidateSizeLabelFormatError: "Tipo de imagem inv\xE1lida",
  imageValidateSizeLabelImageSizeTooSmall: "Imagem muito pequena",
  imageValidateSizeLabelImageSizeTooBig: "Imagem muito grande",
  imageValidateSizeLabelExpectedMinSize:
    "Tamanho m\xEDnimo permitida: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Tamanho m\xE1ximo permitido: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "Resolu\xE7\xE3o muito baixa",
  imageValidateSizeLabelImageResolutionTooHigh: "Resolu\xE7\xE3o muito alta",
  imageValidateSizeLabelExpectedMinResolution:
    "Resolu\xE7\xE3o m\xEDnima permitida: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Resolu\xE7\xE3o m\xE1xima permitida: {maxResolution}",
}
var Pl = {
  labelIdle:
    'Trage \u0219i plaseaz\u0103 fi\u0219iere sau <span class="filepond--label-action"> Caut\u0103-le </span>',
  labelInvalidField: "C\xE2mpul con\u021Bine fi\u0219iere care nu sunt valide",
  labelFileWaitingForSize: "\xCEn a\u0219teptarea dimensiunii",
  labelFileSizeNotAvailable: "Dimensiunea nu este diponibil\u0103",
  labelFileLoading: "Se \xEEncarc\u0103",
  labelFileLoadError: "Eroare la \xEEnc\u0103rcare",
  labelFileProcessing: "Se \xEEncarc\u0103",
  labelFileProcessingComplete: "\xCEnc\u0103rcare finalizat\u0103",
  labelFileProcessingAborted: "\xCEnc\u0103rcare anulat\u0103",
  labelFileProcessingError: "Eroare la \xEEnc\u0103rcare",
  labelFileProcessingRevertError: "Eroare la anulare",
  labelFileRemoveError: "Eroare la \u015Ftergere",
  labelTapToCancel: "apas\u0103 pentru a anula",
  labelTapToRetry: "apas\u0103 pentru a re\xEEncerca",
  labelTapToUndo: "apas\u0103 pentru a anula",
  labelButtonRemoveItem: "\u015Eterge",
  labelButtonAbortItemLoad: "Anuleaz\u0103",
  labelButtonRetryItemLoad: "Re\xEEncearc\u0103",
  labelButtonAbortItemProcessing: "Anuleaz\u0103",
  labelButtonUndoItemProcessing: "Anuleaz\u0103",
  labelButtonRetryItemProcessing: "Re\xEEncearc\u0103",
  labelButtonProcessItem: "\xCEncarc\u0103",
  labelMaxFileSizeExceeded: "Fi\u0219ierul este prea mare",
  labelMaxFileSize:
    "Dimensiunea maxim\u0103 a unui fi\u0219ier este de {filesize}",
  labelMaxTotalFileSizeExceeded:
    "Dimensiunea total\u0103 maxim\u0103 a fost dep\u0103\u0219it\u0103",
  labelMaxTotalFileSize:
    "Dimensiunea total\u0103 maxim\u0103 a fi\u0219ierelor este de {filesize}",
  labelFileTypeNotAllowed: "Tipul fi\u0219ierului nu este valid",
  fileValidateTypeLabelExpectedTypes:
    "Se a\u0219teapt\u0103 {allButLastType} sau {lastType}",
  imageValidateSizeLabelFormatError: "Formatul imaginii nu este acceptat",
  imageValidateSizeLabelImageSizeTooSmall: "Imaginea este prea mic\u0103",
  imageValidateSizeLabelImageSizeTooBig: "Imaginea este prea mare",
  imageValidateSizeLabelExpectedMinSize:
    "M\u0103rimea minim\u0103 este de {maxWidth} x {maxHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "M\u0103rimea maxim\u0103 este de {maxWidth} x {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "Rezolu\u021Bia este prea mic\u0103",
  imageValidateSizeLabelImageResolutionTooHigh: "Rezolu\u021Bia este prea mare",
  imageValidateSizeLabelExpectedMinResolution:
    "Rezolu\u021Bia minim\u0103 este de {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Rezolu\u021Bia maxim\u0103 este de {maxResolution}",
}
var Dl = {
  labelIdle:
    '\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043B\u0438 <span class="filepond--label-action"> \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 </span>',
  labelInvalidField:
    "\u041F\u043E\u043B\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0444\u0430\u0439\u043B\u044B",
  labelFileWaitingForSize:
    "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440",
  labelFileSizeNotAvailable:
    "\u0420\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F",
  labelFileLoading: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435",
  labelFileLoadError:
    "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438",
  labelFileProcessing: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
  labelFileProcessingComplete:
    "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
  labelFileProcessingAborted:
    "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430",
  labelFileProcessingError:
    "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435",
  labelFileProcessingRevertError:
    "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0435",
  labelFileRemoveError:
    "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438",
  labelTapToCancel:
    "\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B",
  labelTapToRetry:
    "\u043D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
  labelTapToUndo:
    "\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  labelButtonRemoveItem: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  labelButtonAbortItemLoad:
    "\u041F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u043E",
  labelButtonRetryItemLoad:
    "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
  labelButtonAbortItemProcessing: "\u041E\u0442\u043C\u0435\u043D\u0430",
  labelButtonUndoItemProcessing:
    "\u041E\u0442\u043C\u0435\u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  labelButtonRetryItemProcessing:
    "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
  labelButtonProcessItem: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
  labelMaxFileSizeExceeded:
    "\u0424\u0430\u0439\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439",
  labelMaxFileSize:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440",
  labelMaxTotalFileSize:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: {filesize}",
  labelFileTypeNotAllowed:
    "\u0424\u0430\u0439\u043B \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0430",
  fileValidateTypeLabelExpectedTypes:
    "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F {allButLastType} \u0438\u043B\u0438 {lastType}",
  imageValidateSizeLabelFormatError:
    "\u0422\u0438\u043F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F",
  imageValidateSizeLabelImageSizeTooSmall:
    "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435",
  imageValidateSizeLabelImageSizeTooBig:
    "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435",
  imageValidateSizeLabelExpectedMinSize:
    "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043D\u0438\u0437\u043A\u043E\u0435",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0432\u044B\u0441\u043E\u043A\u043E\u0435",
  imageValidateSizeLabelExpectedMinResolution:
    "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435: {maxResolution}",
}
var Fl = {
  labelIdle:
    'Drag och sl\xE4pp dina filer eller <span class="filepond--label-action"> Bl\xE4ddra </span>',
  labelInvalidField: "F\xE4ltet inneh\xE5ller felaktiga filer",
  labelFileWaitingForSize: "V\xE4ntar p\xE5 storlek",
  labelFileSizeNotAvailable: "Storleken finns inte tillg\xE4nglig",
  labelFileLoading: "Laddar",
  labelFileLoadError: "Fel under laddning",
  labelFileProcessing: "Laddar upp",
  labelFileProcessingComplete: "Uppladdning klar",
  labelFileProcessingAborted: "Uppladdning avbruten",
  labelFileProcessingError: "Fel under uppladdning",
  labelFileProcessingRevertError: "Fel under \xE5terst\xE4llning",
  labelFileRemoveError: "Fel under borttagning",
  labelTapToCancel: "tryck f\xF6r att avbryta",
  labelTapToRetry: "tryck f\xF6r att f\xF6rs\xF6ka igen",
  labelTapToUndo: "tryck f\xF6r att \xE5ngra",
  labelButtonRemoveItem: "Tabort",
  labelButtonAbortItemLoad: "Avbryt",
  labelButtonRetryItemLoad: "F\xF6rs\xF6k igen",
  labelButtonAbortItemProcessing: "Avbryt",
  labelButtonUndoItemProcessing: "\xC5ngra",
  labelButtonRetryItemProcessing: "F\xF6rs\xF6k igen",
  labelButtonProcessItem: "Ladda upp",
  labelMaxFileSizeExceeded: "Filen \xE4r f\xF6r stor",
  labelMaxFileSize: "St\xF6rsta till\xE5tna filstorlek \xE4r {filesize}",
  labelMaxTotalFileSizeExceeded: "Maximal uppladdningsstorlek uppn\xE5d",
  labelMaxTotalFileSize: "Maximal uppladdningsstorlek \xE4r {filesize}",
  labelFileTypeNotAllowed: "Felaktig filtyp",
  fileValidateTypeLabelExpectedTypes:
    "Godk\xE4nda filtyper {allButLastType} eller {lastType}",
  imageValidateSizeLabelFormatError: "Bildtypen saknar st\xF6d",
  imageValidateSizeLabelImageSizeTooSmall: "Bilden \xE4r f\xF6r liten",
  imageValidateSizeLabelImageSizeTooBig: "Bilden \xE4r f\xF6r stor",
  imageValidateSizeLabelExpectedMinSize:
    "Minimal storlek \xE4r {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maximal storlek \xE4r {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "Uppl\xF6sningen \xE4r f\xF6r l\xE5g",
  imageValidateSizeLabelImageResolutionTooHigh:
    "Uppl\xF6sningen \xE4r f\xF6r h\xF6g",
  imageValidateSizeLabelExpectedMinResolution:
    "Minsta till\xE5tna uppl\xF6sning \xE4r {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "H\xF6gsta till\xE5tna uppl\xF6sning \xE4r {maxResolution}",
}
var Cl = {
  labelIdle:
    'Dosyan\u0131z\u0131 S\xFCr\xFCkleyin & B\u0131rak\u0131n ya da <span class="filepond--label-action"> Se\xE7in </span>',
  labelInvalidField: "Alan ge\xE7ersiz dosyalar i\xE7eriyor",
  labelFileWaitingForSize: "Boyut hesaplan\u0131yor",
  labelFileSizeNotAvailable: "Boyut mevcut de\u011Fil",
  labelFileLoading: "Y\xFCkleniyor",
  labelFileLoadError: "Y\xFCkleme s\u0131ras\u0131nda hata olu\u015Ftu",
  labelFileProcessing: "Y\xFCkleniyor",
  labelFileProcessingComplete: "Y\xFCkleme tamamland\u0131",
  labelFileProcessingAborted: "Y\xFCkleme iptal edildi",
  labelFileProcessingError: "Y\xFCklerken hata olu\u015Ftu",
  labelFileProcessingRevertError: "Geri \xE7ekerken hata olu\u015Ftu",
  labelFileRemoveError: "Kald\u0131r\u0131rken hata olu\u015Ftu",
  labelTapToCancel: "\u0130ptal etmek i\xE7in t\u0131klay\u0131n",
  labelTapToRetry: "Tekrar denemek i\xE7in t\u0131klay\u0131n",
  labelTapToUndo: "Geri almak i\xE7in t\u0131klay\u0131n",
  labelButtonRemoveItem: "Kald\u0131r",
  labelButtonAbortItemLoad: "\u0130ptal Et",
  labelButtonRetryItemLoad: "Tekrar dene",
  labelButtonAbortItemProcessing: "\u0130ptal et",
  labelButtonUndoItemProcessing: "Geri Al",
  labelButtonRetryItemProcessing: "Tekrar dene",
  labelButtonProcessItem: "Y\xFCkle",
  labelMaxFileSizeExceeded: "Dosya \xE7ok b\xFCy\xFCk",
  labelMaxFileSize: "En fazla dosya boyutu: {filesize}",
  labelMaxTotalFileSizeExceeded: "Maximum boyut a\u015F\u0131ld\u0131",
  labelMaxTotalFileSize: "Maximum dosya boyutu :{filesize}",
  labelFileTypeNotAllowed: "Ge\xE7ersiz dosya tipi",
  fileValidateTypeLabelExpectedTypes:
    "\u015Eu {allButLastType} ya da \u015Fu dosya olmas\u0131 gerekir: {lastType}",
  imageValidateSizeLabelFormatError: "Resim tipi desteklenmiyor",
  imageValidateSizeLabelImageSizeTooSmall: "Resim \xE7ok k\xFC\xE7\xFCk",
  imageValidateSizeLabelImageSizeTooBig: "Resim \xE7ok b\xFCy\xFCk",
  imageValidateSizeLabelExpectedMinSize:
    "Minimum boyut {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "Maximum boyut {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\xC7\xF6z\xFCn\xFCrl\xFCk \xE7ok d\xFC\u015F\xFCk",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\xC7\xF6z\xFCn\xFCrl\xFCk \xE7ok y\xFCksek",
  imageValidateSizeLabelExpectedMinResolution:
    "Minimum \xE7\xF6z\xFCn\xFCrl\xFCk {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "Maximum \xE7\xF6z\xFCn\xFCrl\xFCk {maxResolution}",
}
var zl = {
  labelIdle:
    '\u041F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0456\u0442\u044C \u0444\u0430\u0439\u043B\u0438 \u0430\u0431\u043E <span class="filepond--label-action"> \u0432\u0438\u0431\u0435\u0440\u0456\u0442\u044C </span>',
  labelInvalidField:
    "\u041F\u043E\u043B\u0435 \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0456 \u0444\u0430\u0439\u043B\u0438",
  labelFileWaitingForSize:
    "\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u0440\u043E\u0437\u043C\u0456\u0440",
  labelFileSizeNotAvailable:
    "\u0420\u043E\u0437\u043C\u0456\u0440 \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439",
  labelFileLoading:
    "\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F",
  labelFileLoadError:
    "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u0456",
  labelFileProcessing:
    "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F",
  labelFileProcessingComplete:
    "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E",
  labelFileProcessingAborted:
    "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E",
  labelFileProcessingError:
    "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u0456",
  labelFileProcessingRevertError:
    "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0456",
  labelFileRemoveError:
    "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u0456",
  labelTapToCancel: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
  labelTapToRetry:
    "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443",
  labelTapToUndo:
    "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0432\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u044E \u0434\u0456\u044E",
  labelButtonRemoveItem: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
  labelButtonAbortItemLoad:
    "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
  labelButtonRetryItemLoad:
    "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443",
  labelButtonAbortItemProcessing:
    "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
  labelButtonUndoItemProcessing:
    "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u044E \u0434\u0456\u044E",
  labelButtonRetryItemProcessing:
    "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443",
  labelButtonProcessItem:
    "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F",
  labelMaxFileSizeExceeded:
    "\u0424\u0430\u0439\u043B \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0439",
  labelMaxFileSize:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440 \u0444\u0430\u0439\u043B\u0443: {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u041F\u0435\u0440\u0435\u0432\u0438\u0449\u0435\u043D\u043E \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440",
  labelMaxTotalFileSize:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {filesize}",
  labelFileTypeNotAllowed:
    "\u0424\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0443 \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F",
  fileValidateTypeLabelExpectedTypes:
    "\u041E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F {allButLastType} \u0430\u0431\u043E {lastType}",
  imageValidateSizeLabelFormatError:
    "\u0424\u043E\u0440\u043C\u0430\u0442 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F",
  imageValidateSizeLabelImageSizeTooSmall:
    "\u0417\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0435",
  imageValidateSizeLabelImageSizeTooBig:
    "\u0417\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435",
  imageValidateSizeLabelExpectedMinSize:
    "\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u0420\u043E\u0437\u043C\u0456\u0440\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0456",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u0420\u043E\u0437\u043C\u0456\u0440\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0456",
  imageValidateSizeLabelExpectedMinResolution:
    "\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: {maxResolution}",
}
var Nl = {
  labelIdle:
    'K\xE9o th\u1EA3 t\u1EC7p c\u1EE7a b\u1EA1n ho\u1EB7c <span class="filepond--label-action"> T\xECm ki\u1EBFm </span>',
  labelInvalidField:
    "Tr\u01B0\u1EDDng ch\u1EE9a c\xE1c t\u1EC7p kh\xF4ng h\u1EE3p l\u1EC7",
  labelFileWaitingForSize: "\u0110ang ch\u1EDD k\xEDch th\u01B0\u1EDBc",
  labelFileSizeNotAvailable: "K\xEDch th\u01B0\u1EDBc kh\xF4ng c\xF3 s\u1EB5n",
  labelFileLoading: "\u0110ang t\u1EA3i",
  labelFileLoadError: "L\u1ED7i khi t\u1EA3i",
  labelFileProcessing: "\u0110ang t\u1EA3i l\xEAn",
  labelFileProcessingComplete: "T\u1EA3i l\xEAn th\xE0nh c\xF4ng",
  labelFileProcessingAborted: "\u0110\xE3 hu\u1EF7 t\u1EA3i l\xEAn",
  labelFileProcessingError: "L\u1ED7i khi t\u1EA3i l\xEAn",
  labelFileProcessingRevertError: "L\u1ED7i khi ho\xE0n nguy\xEAn",
  labelFileRemoveError: "L\u1ED7i khi x\xF3a",
  labelTapToCancel: "nh\u1EA5n \u0111\u1EC3 h\u1EE7y",
  labelTapToRetry: "nh\u1EA5n \u0111\u1EC3 th\u1EED l\u1EA1i",
  labelTapToUndo: "nh\u1EA5n \u0111\u1EC3 ho\xE0n t\xE1c",
  labelButtonRemoveItem: "Xo\xE1",
  labelButtonAbortItemLoad: "Hu\u1EF7 b\u1ECF",
  labelButtonRetryItemLoad: "Th\u1EED l\u1EA1i",
  labelButtonAbortItemProcessing: "H\u1EE7y b\u1ECF",
  labelButtonUndoItemProcessing: "Ho\xE0n t\xE1c",
  labelButtonRetryItemProcessing: "Th\u1EED l\u1EA1i",
  labelButtonProcessItem: "T\u1EA3i l\xEAn",
  labelMaxFileSizeExceeded: "T\u1EADp tin qu\xE1 l\u1EDBn",
  labelMaxFileSize:
    "K\xEDch th\u01B0\u1EDBc t\u1EC7p t\u1ED1i \u0111a l\xE0 {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u0110\xE3 v\u01B0\u1EE3t qu\xE1 t\u1ED5ng k\xEDch th\u01B0\u1EDBc t\u1ED1i \u0111a",
  labelMaxTotalFileSize:
    "T\u1ED5ng k\xEDch th\u01B0\u1EDBc t\u1EC7p t\u1ED1i \u0111a l\xE0 {filesize}",
  labelFileTypeNotAllowed:
    "T\u1EC7p thu\u1ED9c lo\u1EA1i kh\xF4ng h\u1EE3p l\u1EC7",
  fileValidateTypeLabelExpectedTypes:
    "Ki\u1EC3u t\u1EC7p h\u1EE3p l\u1EC7 l\xE0 {allButLastType} ho\u1EB7c {lastType}",
  imageValidateSizeLabelFormatError:
    "Lo\u1EA1i h\xECnh \u1EA3nh kh\xF4ng \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3",
  imageValidateSizeLabelImageSizeTooSmall: "H\xECnh \u1EA3nh qu\xE1 nh\u1ECF",
  imageValidateSizeLabelImageSizeTooBig: "H\xECnh \u1EA3nh qu\xE1 l\u1EDBn",
  imageValidateSizeLabelExpectedMinSize:
    "K\xEDch th\u01B0\u1EDBc t\u1ED1i thi\u1EC3u l\xE0 {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "K\xEDch th\u01B0\u1EDBc t\u1ED1i \u0111a l\xE0 {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow:
    "\u0110\u1ED9 ph\xE2n gi\u1EA3i qu\xE1 th\u1EA5p",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u0110\u1ED9 ph\xE2n gi\u1EA3i qu\xE1 cao",
  imageValidateSizeLabelExpectedMinResolution:
    "\u0110\u1ED9 ph\xE2n gi\u1EA3i t\u1ED1i thi\u1EC3u l\xE0 {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u0110\u1ED9 ph\xE2n gi\u1EA3i t\u1ED1i \u0111a l\xE0 {maxResolution}",
}
var Bl = {
  labelIdle:
    '\u62D6\u653E\u6587\u4EF6\uFF0C\u6216\u8005 <span class="filepond--label-action"> \u6D4F\u89C8 </span>',
  labelInvalidField: "\u5B57\u6BB5\u5305\u542B\u65E0\u6548\u6587\u4EF6",
  labelFileWaitingForSize: "\u8BA1\u7B97\u6587\u4EF6\u5927\u5C0F",
  labelFileSizeNotAvailable: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u53EF\u7528",
  labelFileLoading: "\u52A0\u8F7D",
  labelFileLoadError: "\u52A0\u8F7D\u9519\u8BEF",
  labelFileProcessing: "\u4E0A\u4F20",
  labelFileProcessingComplete: "\u5DF2\u4E0A\u4F20",
  labelFileProcessingAborted: "\u4E0A\u4F20\u5DF2\u53D6\u6D88",
  labelFileProcessingError: "\u4E0A\u4F20\u51FA\u9519",
  labelFileProcessingRevertError: "\u8FD8\u539F\u51FA\u9519",
  labelFileRemoveError: "\u5220\u9664\u51FA\u9519",
  labelTapToCancel: "\u70B9\u51FB\u53D6\u6D88",
  labelTapToRetry: "\u70B9\u51FB\u91CD\u8BD5",
  labelTapToUndo: "\u70B9\u51FB\u64A4\u6D88",
  labelButtonRemoveItem: "\u5220\u9664",
  labelButtonAbortItemLoad: "\u4E2D\u6B62",
  labelButtonRetryItemLoad: "\u91CD\u8BD5",
  labelButtonAbortItemProcessing: "\u53D6\u6D88",
  labelButtonUndoItemProcessing: "\u64A4\u6D88",
  labelButtonRetryItemProcessing: "\u91CD\u8BD5",
  labelButtonProcessItem: "\u4E0A\u4F20",
  labelMaxFileSizeExceeded: "\u6587\u4EF6\u592A\u5927",
  labelMaxFileSize: "\u6700\u5927\u503C: {filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u8D85\u8FC7\u6700\u5927\u6587\u4EF6\u5927\u5C0F",
  labelMaxTotalFileSize: "\u6700\u5927\u6587\u4EF6\u5927\u5C0F\uFF1A{filesize}",
  labelFileTypeNotAllowed: "\u6587\u4EF6\u7C7B\u578B\u65E0\u6548",
  fileValidateTypeLabelExpectedTypes:
    "\u5E94\u4E3A {allButLastType} \u6216 {lastType}",
  imageValidateSizeLabelFormatError:
    "\u4E0D\u652F\u6301\u56FE\u50CF\u7C7B\u578B",
  imageValidateSizeLabelImageSizeTooSmall: "\u56FE\u50CF\u592A\u5C0F",
  imageValidateSizeLabelImageSizeTooBig: "\u56FE\u50CF\u592A\u5927",
  imageValidateSizeLabelExpectedMinSize:
    "\u6700\u5C0F\u503C: {minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u6700\u5927\u503C: {maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "\u5206\u8FA8\u7387\u592A\u4F4E",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u5206\u8FA8\u7387\u592A\u9AD8",
  imageValidateSizeLabelExpectedMinResolution:
    "\u6700\u5C0F\u5206\u8FA8\u7387\uFF1A{minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u6700\u5927\u5206\u8FA8\u7387\uFF1A{maxResolution}",
}
var Vl = {
  labelIdle:
    '\u62D6\u653E\u6A94\u6848\uFF0C\u6216\u8005 <span class="filepond--label-action"> \u700F\u89BD </span>',
  labelInvalidField: "\u4E0D\u652F\u63F4\u6B64\u6A94\u6848",
  labelFileWaitingForSize: "\u6B63\u5728\u8A08\u7B97\u6A94\u6848\u5927\u5C0F",
  labelFileSizeNotAvailable: "\u6A94\u6848\u5927\u5C0F\u4E0D\u7B26",
  labelFileLoading: "\u8B80\u53D6\u4E2D",
  labelFileLoadError: "\u8B80\u53D6\u932F\u8AA4",
  labelFileProcessing: "\u4E0A\u50B3",
  labelFileProcessingComplete: "\u5DF2\u4E0A\u50B3",
  labelFileProcessingAborted: "\u4E0A\u50B3\u5DF2\u53D6\u6D88",
  labelFileProcessingError: "\u4E0A\u50B3\u767C\u751F\u932F\u8AA4",
  labelFileProcessingRevertError: "\u9084\u539F\u932F\u8AA4",
  labelFileRemoveError: "\u522A\u9664\u932F\u8AA4",
  labelTapToCancel: "\u9EDE\u64CA\u53D6\u6D88",
  labelTapToRetry: "\u9EDE\u64CA\u91CD\u8A66",
  labelTapToUndo: "\u9EDE\u64CA\u9084\u539F",
  labelButtonRemoveItem: "\u522A\u9664",
  labelButtonAbortItemLoad: "\u505C\u6B62",
  labelButtonRetryItemLoad: "\u91CD\u8A66",
  labelButtonAbortItemProcessing: "\u53D6\u6D88",
  labelButtonUndoItemProcessing: "\u53D6\u6D88",
  labelButtonRetryItemProcessing: "\u91CD\u8A66",
  labelButtonProcessItem: "\u4E0A\u50B3",
  labelMaxFileSizeExceeded: "\u6A94\u6848\u904E\u5927",
  labelMaxFileSize: "\u6700\u5927\u503C\uFF1A{filesize}",
  labelMaxTotalFileSizeExceeded:
    "\u8D85\u904E\u6700\u5927\u53EF\u4E0A\u50B3\u5927\u5C0F",
  labelMaxTotalFileSize:
    "\u6700\u5927\u53EF\u4E0A\u50B3\u5927\u5C0F\uFF1A{filesize}",
  labelFileTypeNotAllowed: "\u4E0D\u652F\u63F4\u6B64\u985E\u578B\u6A94\u6848",
  fileValidateTypeLabelExpectedTypes:
    "\u61C9\u70BA {allButLastType} \u6216 {lastType}",
  imageValidateSizeLabelFormatError:
    "\u4E0D\u652F\u6301\u6B64\u985E\u5716\u7247\u985E\u578B",
  imageValidateSizeLabelImageSizeTooSmall: "\u5716\u7247\u904E\u5C0F",
  imageValidateSizeLabelImageSizeTooBig: "\u5716\u7247\u904E\u5927",
  imageValidateSizeLabelExpectedMinSize:
    "\u6700\u5C0F\u5C3A\u5BF8\uFF1A{minWidth} \xD7 {minHeight}",
  imageValidateSizeLabelExpectedMaxSize:
    "\u6700\u5927\u5C3A\u5BF8\uFF1A{maxWidth} \xD7 {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "\u89E3\u6790\u5EA6\u904E\u4F4E",
  imageValidateSizeLabelImageResolutionTooHigh:
    "\u89E3\u6790\u5EA6\u904E\u9AD8",
  imageValidateSizeLabelExpectedMinResolution:
    "\u6700\u4F4E\u89E3\u6790\u5EA6\uFF1A{minResolution}",
  imageValidateSizeLabelExpectedMaxResolution:
    "\u6700\u9AD8\u89E3\u6790\u5EA6\uFF1A{maxResolution}",
}
_e(Or)
_e(Dr)
_e(zr)
_e(Br)
_e(kr)
_e(Jr)
_e(tl)
_e(ml)
_e(Sa)
window.FilePond = ea
function tp({
  acceptedFileTypes: e,
  imageEditorEmptyFillColor: t,
  imageEditorMode: i,
  imageEditorViewportHeight: a,
  imageEditorViewportWidth: n,
  deleteUploadedFileUsing: r,
  isDeletable: l,
  isDisabled: o,
  getUploadedFilesUsing: s,
  imageCropAspectRatio: u,
  imagePreviewHeight: c,
  imageResizeMode: d,
  imageResizeTargetHeight: h,
  imageResizeTargetWidth: m,
  imageResizeUpscale: p,
  isAvatar: f,
  hasImageEditor: g,
  hasCircleCropper: I,
  canEditSvgs: E,
  isSvgEditingConfirmed: b,
  confirmSvgEditingMessage: _,
  disabledSvgEditingMessage: y,
  isDownloadable: T,
  isMultiple: v,
  isOpenable: R,
  isPreviewable: S,
  isReorderable: P,
  itemPanelAspectRatio: O,
  loadingIndicatorPosition: x,
  locale: z,
  maxFiles: L,
  maxSize: F,
  minSize: w,
  panelAspectRatio: A,
  panelLayout: C,
  placeholder: D,
  removeUploadedFileButtonPosition: V,
  removeUploadedFileUsing: B,
  reorderUploadedFilesUsing: j,
  shouldAppendFiles: q,
  shouldOrientImageFromExif: X,
  shouldTransformImage: ue,
  state: U,
  uploadButtonPosition: W,
  uploadingMessage: $,
  uploadProgressIndicatorPosition: oe,
  uploadUsing: J,
}) {
  return {
    fileKeyIndex: {},
    pond: null,
    shouldUpdateState: !0,
    state: U,
    lastState: null,
    uploadedFileIndex: {},
    isEditorOpen: !1,
    editingFile: {},
    currentRatio: "",
    editor: {},
    init: async function () {
      xt(Gl[z] ?? Gl.en),
        (this.pond = dt(this.$refs.input, {
          acceptedFileTypes: e,
          allowImageExifOrientation: X,
          allowPaste: !1,
          allowRemove: l,
          allowReorder: P,
          allowImagePreview: S,
          allowVideoPreview: S,
          allowAudioPreview: S,
          allowImageTransform: ue,
          credits: !1,
          files: await this.getFiles(),
          imageCropAspectRatio: u,
          imagePreviewHeight: c,
          imageResizeTargetHeight: h,
          imageResizeTargetWidth: m,
          imageResizeMode: d,
          imageResizeUpscale: p,
          itemInsertLocation: q ? "after" : "before",
          ...(D && { labelIdle: D }),
          maxFiles: L,
          maxFileSize: F,
          minFileSize: w,
          styleButtonProcessItemPosition: W,
          styleButtonRemoveItemPosition: V,
          styleItemPanelAspectRatio: O,
          styleLoadIndicatorPosition: x,
          stylePanelAspectRatio: A,
          stylePanelLayout: C,
          styleProgressIndicatorPosition: oe,
          server: {
            load: async (N, H) => {
              let ee = await (await fetch(N, { cache: "no-store" })).blob()
              H(ee)
            },
            process: (N, H, Q, ee, wt, Ve) => {
              this.shouldUpdateState = !1
              let Yt = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /[018]/g,
                ($t) =>
                  (
                    $t ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                      (15 >> ($t / 4)))
                  ).toString(16)
              )
              J(
                Yt,
                H,
                ($t) => {
                  ;(this.shouldUpdateState = !0), ee($t)
                },
                wt,
                Ve
              )
            },
            remove: async (N, H) => {
              let Q = this.uploadedFileIndex[N] ?? null
              Q && (await r(Q), H())
            },
            revert: async (N, H) => {
              await B(N), H()
            },
          },
          allowImageEdit: g,
          imageEditEditor: {
            open: (N) => this.loadEditor(N),
            onconfirm: () => {},
            oncancel: () => this.closeEditor(),
            onclose: () => this.closeEditor(),
          },
        })),
        this.$watch("state", async () => {
          if (this.pond && this.shouldUpdateState && this.state !== void 0) {
            if (
              this.state !== null &&
              Object.values(this.state).filter((N) =>
                N.startsWith("livewire-file:")
              ).length
            ) {
              this.lastState = null
              return
            }
            JSON.stringify(this.state) !== this.lastState &&
              ((this.lastState = JSON.stringify(this.state)),
              (this.pond.files = await this.getFiles()))
          }
        }),
        this.pond.on("reorderfiles", async (N) => {
          let H = N.map((Q) =>
            Q.source instanceof File
              ? Q.serverId
              : this.uploadedFileIndex[Q.source] ?? null
          ).filter((Q) => Q)
          await j(q ? H : H.reverse())
        }),
        this.pond.on("initfile", async (N) => {
          T && (f || this.insertDownloadLink(N))
        }),
        this.pond.on("initfile", async (N) => {
          R && (f || this.insertOpenLink(N))
        }),
        this.pond.on("addfilestart", async (N) => {
          N.status === pt.PROCESSING_QUEUED &&
            this.dispatchFormEvent("form-processing-started", { message: $ })
        })
      let G = async () => {
        this.pond
          .getFiles()
          .filter(
            (N) =>
              N.status === pt.PROCESSING || N.status === pt.PROCESSING_QUEUED
          ).length || this.dispatchFormEvent("form-processing-finished")
      }
      this.pond.on("processfile", G),
        this.pond.on("processfileabort", G),
        this.pond.on("processfilerevert", G)
    },
    destroy: function () {
      this.destroyEditor(), ut(this.$refs.input), (this.pond = null)
    },
    dispatchFormEvent: function (G, N = {}) {
      this.$el
        .closest("form")
        ?.dispatchEvent(
          new CustomEvent(G, { composed: !0, cancelable: !0, detail: N })
        )
    },
    getUploadedFiles: async function () {
      let G = await s()
      ;(this.fileKeyIndex = G ?? {}),
        (this.uploadedFileIndex = Object.entries(this.fileKeyIndex)
          .filter(([N, H]) => H?.url)
          .reduce((N, [H, Q]) => ((N[Q.url] = H), N), {}))
    },
    getFiles: async function () {
      await this.getUploadedFiles()
      let G = []
      for (let N of Object.values(this.fileKeyIndex))
        N &&
          G.push({
            source: N.url,
            options: {
              type: "local",
              ...(!N.type ||
              (S &&
                (/^audio/.test(N.type) ||
                  /^image/.test(N.type) ||
                  /^video/.test(N.type)))
                ? {}
                : { file: { name: N.name, size: N.size, type: N.type } }),
            },
          })
      return q ? G : G.reverse()
    },
    insertDownloadLink: function (G) {
      if (G.origin !== Pt.LOCAL) return
      let N = this.getDownloadLink(G)
      N &&
        document
          .getElementById(`filepond--item-${G.id}`)
          .querySelector(".filepond--file-info-main")
          .prepend(N)
    },
    insertOpenLink: function (G) {
      if (G.origin !== Pt.LOCAL) return
      let N = this.getOpenLink(G)
      N &&
        document
          .getElementById(`filepond--item-${G.id}`)
          .querySelector(".filepond--file-info-main")
          .prepend(N)
    },
    getDownloadLink: function (G) {
      let N = G.source
      if (!N) return
      let H = document.createElement("a")
      return (
        (H.className = "filepond--download-icon"),
        (H.href = N),
        (H.download = G.file.name),
        H
      )
    },
    getOpenLink: function (G) {
      let N = G.source
      if (!N) return
      let H = document.createElement("a")
      return (
        (H.className = "filepond--open-icon"),
        (H.href = N),
        (H.target = "_blank"),
        H
      )
    },
    initEditor: function () {
      o ||
        (g &&
          (this.editor = new Ta(this.$refs.editor, {
            aspectRatio: n / a,
            autoCropArea: 1,
            center: !0,
            crop: (G) => {
              ;(this.$refs.xPositionInput.value = Math.round(G.detail.x)),
                (this.$refs.yPositionInput.value = Math.round(G.detail.y)),
                (this.$refs.heightInput.value = Math.round(G.detail.height)),
                (this.$refs.widthInput.value = Math.round(G.detail.width)),
                (this.$refs.rotationInput.value = G.detail.rotate)
            },
            cropBoxResizable: !0,
            guides: !0,
            highlight: !0,
            responsive: !0,
            toggleDragModeOnDblclick: !0,
            viewMode: i,
            wheelZoomRatio: 0.02,
          })))
    },
    closeEditor: function () {
      ;(this.editingFile = {}), (this.isEditorOpen = !1), this.destroyEditor()
    },
    fixImageDimensions: function (G, N) {
      if (G.type !== "image/svg+xml") return N(G)
      let H = new FileReader()
      ;(H.onload = (Q) => {
        let ee = new DOMParser()
          .parseFromString(Q.target.result, "image/svg+xml")
          ?.querySelector("svg")
        if (!ee) return N(G)
        let wt = ["viewBox", "ViewBox", "viewbox"].find((Yt) =>
          ee.hasAttribute(Yt)
        )
        if (!wt) return N(G)
        let Ve = ee.getAttribute(wt).split(" ")
        return !Ve || Ve.length !== 4
          ? N(G)
          : (ee.setAttribute("width", parseFloat(Ve[2]) + "pt"),
            ee.setAttribute("height", parseFloat(Ve[3]) + "pt"),
            N(
              new File(
                [
                  new Blob([new XMLSerializer().serializeToString(ee)], {
                    type: "image/svg+xml",
                  }),
                ],
                G.name,
                { type: "image/svg+xml", _relativePath: "" }
              )
            ))
      }),
        H.readAsText(G)
    },
    loadEditor: function (G) {
      if (o || !g || !G) return
      let N = G.type === "image/svg+xml"
      if (!E && N) {
        alert(y)
        return
      }
      ;(b && N && !confirm(_)) ||
        this.fixImageDimensions(G, (H) => {
          ;(this.editingFile = H), this.initEditor()
          let Q = new FileReader()
          ;(Q.onload = (ee) => {
            ;(this.isEditorOpen = !0),
              setTimeout(() => this.editor.replace(ee.target.result), 200)
          }),
            Q.readAsDataURL(G)
        })
    },
    getRoundedCanvas: function (G) {
      let N = G.width,
        H = G.height,
        Q = document.createElement("canvas")
      ;(Q.width = N), (Q.height = H)
      let ee = Q.getContext("2d")
      return (
        (ee.imageSmoothingEnabled = !0),
        ee.drawImage(G, 0, 0, N, H),
        (ee.globalCompositeOperation = "destination-in"),
        ee.beginPath(),
        ee.ellipse(N / 2, H / 2, N / 2, H / 2, 0, 0, 2 * Math.PI),
        ee.fill(),
        Q
      )
    },
    saveEditor: function () {
      if (o || !g) return
      let G = this.editor.getCroppedCanvas({
        fillColor: t ?? "transparent",
        height: h,
        imageSmoothingEnabled: !0,
        imageSmoothingQuality: "high",
        width: m,
      })
      I && (G = this.getRoundedCanvas(G)),
        G.toBlob(
          (N) => {
            v &&
              this.pond.removeFile(
                this.pond
                  .getFiles()
                  .find((H) => H.filename === this.editingFile.name)?.id,
                { revert: !0 }
              ),
              this.$nextTick(() => {
                this.shouldUpdateState = !1
                let H = this.editingFile.name.slice(
                    0,
                    this.editingFile.name.lastIndexOf(".")
                  ),
                  Q = this.editingFile.name.split(".").pop()
                Q === "svg" && (Q = "png")
                let ee = /-v(\d+)/
                ee.test(H)
                  ? (H = H.replace(ee, (wt, Ve) => `-v${Number(Ve) + 1}`))
                  : (H += "-v1"),
                  this.pond
                    .addFile(
                      new File([N], `${H}.${Q}`, {
                        type:
                          this.editingFile.type === "image/svg+xml" || I
                            ? "image/png"
                            : this.editingFile.type,
                        lastModified: new Date().getTime(),
                      })
                    )
                    .then(() => {
                      this.closeEditor()
                    })
                    .catch(() => {
                      this.closeEditor()
                    })
              })
          },
          I ? "image/png" : this.editingFile.type
        )
    },
    destroyEditor: function () {
      this.editor &&
        typeof this.editor.destroy == "function" &&
        this.editor.destroy(),
        (this.editor = null)
    },
  }
}
var Gl = {
  ar: pl,
  ca: fl,
  ckb: gl,
  cs: El,
  da: Tl,
  de: bl,
  en: Il,
  es: _l,
  fa: Rl,
  fi: yl,
  fr: Sl,
  hu: wl,
  id: vl,
  it: Ll,
  km: Al,
  nl: Ml,
  no: xl,
  pl: Ol,
  pt_BR: _i,
  pt_PT: _i,
  ro: Pl,
  ru: Dl,
  sv: Fl,
  tr: Cl,
  uk: zl,
  vi: Nl,
  zh_CN: Bl,
  zh_TW: Vl,
}
export { tp as default }
/*! Bundled license information:

filepond/dist/filepond.esm.js:
  (*!
   * FilePond 4.31.1
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

cropperjs/dist/cropper.esm.js:
  (*!
   * Cropper.js v1.6.2
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2024-04-21T07:43:05.335Z
   *)

filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js:
  (*!
   * FilePondPluginFileValidateSize 2.2.8
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js:
  (*!
   * FilePondPluginFileValidateType 1.2.9
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-crop/dist/filepond-plugin-image-crop.esm.js:
  (*!
   * FilePondPluginImageCrop 2.0.6
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-edit/dist/filepond-plugin-image-edit.esm.js:
  (*!
   * FilePondPluginImageEdit 1.6.3
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.esm.js:
  (*!
   * FilePondPluginImageExifOrientation 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js:
  (*!
   * FilePondPluginImagePreview 4.6.12
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-resize/dist/filepond-plugin-image-resize.esm.js:
  (*!
   * FilePondPluginImageResize 2.0.10
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-transform/dist/filepond-plugin-image-transform.esm.js:
  (*!
   * FilePondPluginImageTransform 3.8.7
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-media-preview/dist/filepond-plugin-media-preview.esm.js:
  (*!
   * FilePondPluginMediaPreview 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit undefined for details.
   *)
*/
