var li = Object.create
var nn = Object.defineProperty
var fi = Object.getOwnPropertyDescriptor
var mi = Object.getOwnPropertyNames
var ci = Object.getPrototypeOf,
  hi = Object.prototype.hasOwnProperty
var b = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports)
var Mi = (n, t, s, i) => {
  if ((t && typeof t == "object") || typeof t == "function")
    for (let e of mi(t))
      !hi.call(n, e) &&
        e !== s &&
        nn(n, e, {
          get: () => t[e],
          enumerable: !(i = fi(t, e)) || i.enumerable,
        })
  return n
}
var le = (n, t, s) => (
  (s = n != null ? li(ci(n)) : {}),
  Mi(
    t || !n || !n.__esModule
      ? nn(s, "default", { value: n, enumerable: !0 })
      : s,
    n
  )
)
var yn = b((ge, Se) => {
  ;(function (n, t) {
    typeof ge == "object" && typeof Se < "u"
      ? (Se.exports = t())
      : typeof define == "function" && define.amd
        ? define(t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_plugin_customParseFormat = t())
  })(ge, function () {
    "use strict"
    var n = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A",
      },
      t =
        /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,
      s = /\d\d/,
      i = /\d\d?/,
      e = /\d*[^-_:/,()\s\d]+/,
      a = {},
      u = function (_) {
        return (_ = +_) + (_ > 68 ? 1900 : 2e3)
      },
      r = function (_) {
        return function (h) {
          this[_] = +h
        }
      },
      o = [
        /[+-]\d\d:?(\d\d)?|Z/,
        function (_) {
          ;(this.zone || (this.zone = {})).offset = (function (h) {
            if (!h || h === "Z") return 0
            var D = h.match(/([+-]|\d\d)/g),
              p = 60 * D[1] + (+D[2] || 0)
            return p === 0 ? 0 : D[0] === "+" ? -p : p
          })(_)
        },
      ],
      d = function (_) {
        var h = a[_]
        return h && (h.indexOf ? h : h.s.concat(h.f))
      },
      l = function (_, h) {
        var D,
          p = a.meridiem
        if (p) {
          for (var k = 1; k <= 24; k += 1)
            if (_.indexOf(p(k, 0, h)) > -1) {
              D = k > 12
              break
            }
        } else D = _ === (h ? "pm" : "PM")
        return D
      },
      y = {
        A: [
          e,
          function (_) {
            this.afternoon = l(_, !1)
          },
        ],
        a: [
          e,
          function (_) {
            this.afternoon = l(_, !0)
          },
        ],
        S: [
          /\d/,
          function (_) {
            this.milliseconds = 100 * +_
          },
        ],
        SS: [
          s,
          function (_) {
            this.milliseconds = 10 * +_
          },
        ],
        SSS: [
          /\d{3}/,
          function (_) {
            this.milliseconds = +_
          },
        ],
        s: [i, r("seconds")],
        ss: [i, r("seconds")],
        m: [i, r("minutes")],
        mm: [i, r("minutes")],
        H: [i, r("hours")],
        h: [i, r("hours")],
        HH: [i, r("hours")],
        hh: [i, r("hours")],
        D: [i, r("day")],
        DD: [s, r("day")],
        Do: [
          e,
          function (_) {
            var h = a.ordinal,
              D = _.match(/\d+/)
            if (((this.day = D[0]), h))
              for (var p = 1; p <= 31; p += 1)
                h(p).replace(/\[|\]/g, "") === _ && (this.day = p)
          },
        ],
        M: [i, r("month")],
        MM: [s, r("month")],
        MMM: [
          e,
          function (_) {
            var h = d("months"),
              D =
                (
                  d("monthsShort") ||
                  h.map(function (p) {
                    return p.slice(0, 3)
                  })
                ).indexOf(_) + 1
            if (D < 1) throw new Error()
            this.month = D % 12 || D
          },
        ],
        MMMM: [
          e,
          function (_) {
            var h = d("months").indexOf(_) + 1
            if (h < 1) throw new Error()
            this.month = h % 12 || h
          },
        ],
        Y: [/[+-]?\d+/, r("year")],
        YY: [
          s,
          function (_) {
            this.year = u(_)
          },
        ],
        YYYY: [/\d{4}/, r("year")],
        Z: o,
        ZZ: o,
      }
    function f(_) {
      var h, D
      ;(h = _), (D = a && a.formats)
      for (
        var p = (_ = h.replace(
            /(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,
            function (x, w, H) {
              var U = H && H.toUpperCase()
              return (
                w ||
                D[H] ||
                n[H] ||
                D[U].replace(
                  /(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,
                  function (Z, L, M) {
                    return L || M.slice(1)
                  }
                )
              )
            }
          )).match(t),
          k = p.length,
          T = 0;
        T < k;
        T += 1
      ) {
        var S = p[T],
          $ = y[S],
          O = $ && $[0],
          I = $ && $[1]
        p[T] = I ? { regex: O, parser: I } : S.replace(/^\[|\]$/g, "")
      }
      return function (x) {
        for (var w = {}, H = 0, U = 0; H < k; H += 1) {
          var Z = p[H]
          if (typeof Z == "string") U += Z.length
          else {
            var L = Z.regex,
              M = Z.parser,
              m = x.slice(U),
              Y = L.exec(m)[0]
            M.call(w, Y), (x = x.replace(Y, ""))
          }
        }
        return (
          (function (c) {
            var v = c.afternoon
            if (v !== void 0) {
              var g = c.hours
              v ? g < 12 && (c.hours += 12) : g === 12 && (c.hours = 0),
                delete c.afternoon
            }
          })(w),
          w
        )
      }
    }
    return function (_, h, D) {
      ;(D.p.customParseFormat = !0),
        _ && _.parseTwoDigitYear && (u = _.parseTwoDigitYear)
      var p = h.prototype,
        k = p.parse
      p.parse = function (T) {
        var S = T.date,
          $ = T.utc,
          O = T.args
        this.$u = $
        var I = O[1]
        if (typeof I == "string") {
          var x = O[2] === !0,
            w = O[3] === !0,
            H = x || w,
            U = O[2]
          w && (U = O[2]),
            (a = this.$locale()),
            !x && U && (a = D.Ls[U]),
            (this.$d = (function (m, Y, c) {
              try {
                if (["x", "X"].indexOf(Y) > -1)
                  return new Date((Y === "X" ? 1e3 : 1) * m)
                var v = f(Y)(m),
                  g = v.year,
                  C = v.month,
                  q = v.day,
                  N = v.hours,
                  E = v.minutes,
                  P = v.seconds,
                  ee = v.milliseconds,
                  G = v.zone,
                  X = new Date(),
                  V = q || (g || C ? 1 : X.getDate()),
                  F = g || X.getFullYear(),
                  W = 0
                ;(g && !C) || (W = C > 0 ? C - 1 : X.getMonth())
                var Q = N || 0,
                  te = E || 0,
                  ye = P || 0,
                  Ye = ee || 0
                return G
                  ? new Date(
                      Date.UTC(F, W, V, Q, te, ye, Ye + 60 * G.offset * 1e3)
                    )
                  : c
                    ? new Date(Date.UTC(F, W, V, Q, te, ye, Ye))
                    : new Date(F, W, V, Q, te, ye, Ye)
              } catch {
                return new Date("")
              }
            })(S, I, $)),
            this.init(),
            U && U !== !0 && (this.$L = this.locale(U).$L),
            H && S != this.format(I) && (this.$d = new Date("")),
            (a = {})
        } else if (I instanceof Array)
          for (var Z = I.length, L = 1; L <= Z; L += 1) {
            O[1] = I[L - 1]
            var M = D.apply(this, O)
            if (M.isValid()) {
              ;(this.$d = M.$d), (this.$L = M.$L), this.init()
              break
            }
            L === Z && (this.$d = new Date(""))
          }
        else k.call(this, T)
      }
    }
  })
})
var Yn = b((be, ke) => {
  ;(function (n, t) {
    typeof be == "object" && typeof ke < "u"
      ? (ke.exports = t())
      : typeof define == "function" && define.amd
        ? define(t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_plugin_localeData = t())
  })(be, function () {
    "use strict"
    return function (n, t, s) {
      var i = t.prototype,
        e = function (d) {
          return d && (d.indexOf ? d : d.s)
        },
        a = function (d, l, y, f, _) {
          var h = d.name ? d : d.$locale(),
            D = e(h[l]),
            p = e(h[y]),
            k =
              D ||
              p.map(function (S) {
                return S.slice(0, f)
              })
          if (!_) return k
          var T = h.weekStart
          return k.map(function (S, $) {
            return k[($ + (T || 0)) % 7]
          })
        },
        u = function () {
          return s.Ls[s.locale()]
        },
        r = function (d, l) {
          return (
            d.formats[l] ||
            (function (y) {
              return y.replace(
                /(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,
                function (f, _, h) {
                  return _ || h.slice(1)
                }
              )
            })(d.formats[l.toUpperCase()])
          )
        },
        o = function () {
          var d = this
          return {
            months: function (l) {
              return l ? l.format("MMMM") : a(d, "months")
            },
            monthsShort: function (l) {
              return l ? l.format("MMM") : a(d, "monthsShort", "months", 3)
            },
            firstDayOfWeek: function () {
              return d.$locale().weekStart || 0
            },
            weekdays: function (l) {
              return l ? l.format("dddd") : a(d, "weekdays")
            },
            weekdaysMin: function (l) {
              return l ? l.format("dd") : a(d, "weekdaysMin", "weekdays", 2)
            },
            weekdaysShort: function (l) {
              return l ? l.format("ddd") : a(d, "weekdaysShort", "weekdays", 3)
            },
            longDateFormat: function (l) {
              return r(d.$locale(), l)
            },
            meridiem: this.$locale().meridiem,
            ordinal: this.$locale().ordinal,
          }
        }
      ;(i.localeData = function () {
        return o.bind(this)()
      }),
        (s.localeData = function () {
          var d = u()
          return {
            firstDayOfWeek: function () {
              return d.weekStart || 0
            },
            weekdays: function () {
              return s.weekdays()
            },
            weekdaysShort: function () {
              return s.weekdaysShort()
            },
            weekdaysMin: function () {
              return s.weekdaysMin()
            },
            months: function () {
              return s.months()
            },
            monthsShort: function () {
              return s.monthsShort()
            },
            longDateFormat: function (l) {
              return r(d, l)
            },
            meridiem: d.meridiem,
            ordinal: d.ordinal,
          }
        }),
        (s.months = function () {
          return a(u(), "months")
        }),
        (s.monthsShort = function () {
          return a(u(), "monthsShort", "months", 3)
        }),
        (s.weekdays = function (d) {
          return a(u(), "weekdays", null, null, d)
        }),
        (s.weekdaysShort = function (d) {
          return a(u(), "weekdaysShort", "weekdays", 3, d)
        }),
        (s.weekdaysMin = function (d) {
          return a(u(), "weekdaysMin", "weekdays", 2, d)
        })
    }
  })
})
var pn = b((He, je) => {
  ;(function (n, t) {
    typeof He == "object" && typeof je < "u"
      ? (je.exports = t())
      : typeof define == "function" && define.amd
        ? define(t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_plugin_timezone = t())
  })(He, function () {
    "use strict"
    var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 },
      t = {}
    return function (s, i, e) {
      var a,
        u = function (l, y, f) {
          f === void 0 && (f = {})
          var _ = new Date(l),
            h = (function (D, p) {
              p === void 0 && (p = {})
              var k = p.timeZoneName || "short",
                T = D + "|" + k,
                S = t[T]
              return (
                S ||
                  ((S = new Intl.DateTimeFormat("en-US", {
                    hour12: !1,
                    timeZone: D,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: k,
                  })),
                  (t[T] = S)),
                S
              )
            })(y, f)
          return h.formatToParts(_)
        },
        r = function (l, y) {
          for (var f = u(l, y), _ = [], h = 0; h < f.length; h += 1) {
            var D = f[h],
              p = D.type,
              k = D.value,
              T = n[p]
            T >= 0 && (_[T] = parseInt(k, 10))
          }
          var S = _[3],
            $ = S === 24 ? 0 : S,
            O =
              _[0] +
              "-" +
              _[1] +
              "-" +
              _[2] +
              " " +
              $ +
              ":" +
              _[4] +
              ":" +
              _[5] +
              ":000",
            I = +l
          return (e.utc(O).valueOf() - (I -= I % 1e3)) / 6e4
        },
        o = i.prototype
      ;(o.tz = function (l, y) {
        l === void 0 && (l = a)
        var f = this.utcOffset(),
          _ = this.toDate(),
          h = _.toLocaleString("en-US", { timeZone: l }),
          D = Math.round((_ - new Date(h)) / 1e3 / 60),
          p = e(h, { locale: this.$L })
            .$set("millisecond", this.$ms)
            .utcOffset(15 * -Math.round(_.getTimezoneOffset() / 15) - D, !0)
        if (y) {
          var k = p.utcOffset()
          p = p.add(f - k, "minute")
        }
        return (p.$x.$timezone = l), p
      }),
        (o.offsetName = function (l) {
          var y = this.$x.$timezone || e.tz.guess(),
            f = u(this.valueOf(), y, { timeZoneName: l }).find(function (_) {
              return _.type.toLowerCase() === "timezonename"
            })
          return f && f.value
        })
      var d = o.startOf
      ;(o.startOf = function (l, y) {
        if (!this.$x || !this.$x.$timezone) return d.call(this, l, y)
        var f = e(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L })
        return d.call(f, l, y).tz(this.$x.$timezone, !0)
      }),
        (e.tz = function (l, y, f) {
          var _ = f && y,
            h = f || y || a,
            D = r(+e(), h)
          if (typeof l != "string") return e(l).tz(h)
          var p = (function ($, O, I) {
              var x = $ - 60 * O * 1e3,
                w = r(x, I)
              if (O === w) return [x, O]
              var H = r((x -= 60 * (w - O) * 1e3), I)
              return w === H
                ? [x, w]
                : [$ - 60 * Math.min(w, H) * 1e3, Math.max(w, H)]
            })(e.utc(l, _).valueOf(), D, h),
            k = p[0],
            T = p[1],
            S = e(k).utcOffset(T)
          return (S.$x.$timezone = h), S
        }),
        (e.tz.guess = function () {
          return Intl.DateTimeFormat().resolvedOptions().timeZone
        }),
        (e.tz.setDefault = function (l) {
          a = l
        })
    }
  })
})
var Dn = b((Te, we) => {
  ;(function (n, t) {
    typeof Te == "object" && typeof we < "u"
      ? (we.exports = t())
      : typeof define == "function" && define.amd
        ? define(t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_utc =
            t())
  })(Te, function () {
    "use strict"
    var n = "minute",
      t = /[+-]\d\d(?::?\d\d)?/g,
      s = /([+-]|\d\d)/g
    return function (i, e, a) {
      var u = e.prototype
      ;(a.utc = function (_) {
        var h = { date: _, utc: !0, args: arguments }
        return new e(h)
      }),
        (u.utc = function (_) {
          var h = a(this.toDate(), { locale: this.$L, utc: !0 })
          return _ ? h.add(this.utcOffset(), n) : h
        }),
        (u.local = function () {
          return a(this.toDate(), { locale: this.$L, utc: !1 })
        })
      var r = u.parse
      u.parse = function (_) {
        _.utc && (this.$u = !0),
          this.$utils().u(_.$offset) || (this.$offset = _.$offset),
          r.call(this, _)
      }
      var o = u.init
      u.init = function () {
        if (this.$u) {
          var _ = this.$d
          ;(this.$y = _.getUTCFullYear()),
            (this.$M = _.getUTCMonth()),
            (this.$D = _.getUTCDate()),
            (this.$W = _.getUTCDay()),
            (this.$H = _.getUTCHours()),
            (this.$m = _.getUTCMinutes()),
            (this.$s = _.getUTCSeconds()),
            (this.$ms = _.getUTCMilliseconds())
        } else o.call(this)
      }
      var d = u.utcOffset
      u.utcOffset = function (_, h) {
        var D = this.$utils().u
        if (D(_))
          return this.$u ? 0 : D(this.$offset) ? d.call(this) : this.$offset
        if (
          typeof _ == "string" &&
          ((_ = (function (S) {
            S === void 0 && (S = "")
            var $ = S.match(t)
            if (!$) return null
            var O = ("" + $[0]).match(s) || ["-", 0, 0],
              I = O[0],
              x = 60 * +O[1] + +O[2]
            return x === 0 ? 0 : I === "+" ? x : -x
          })(_)),
          _ === null)
        )
          return this
        var p = Math.abs(_) <= 16 ? 60 * _ : _,
          k = this
        if (h) return (k.$offset = p), (k.$u = _ === 0), k
        if (_ !== 0) {
          var T = this.$u
            ? this.toDate().getTimezoneOffset()
            : -1 * this.utcOffset()
          ;((k = this.local().add(p + T, n)).$offset = p),
            (k.$x.$localOffset = T)
        } else k = this.utc()
        return k
      }
      var l = u.format
      ;(u.format = function (_) {
        var h = _ || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "")
        return l.call(this, h)
      }),
        (u.valueOf = function () {
          var _ = this.$utils().u(this.$offset)
            ? 0
            : this.$offset +
              (this.$x.$localOffset || this.$d.getTimezoneOffset())
          return this.$d.valueOf() - 6e4 * _
        }),
        (u.isUTC = function () {
          return !!this.$u
        }),
        (u.toISOString = function () {
          return this.toDate().toISOString()
        }),
        (u.toString = function () {
          return this.toDate().toUTCString()
        })
      var y = u.toDate
      u.toDate = function (_) {
        return _ === "s" && this.$offset
          ? a(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate()
          : y.call(this)
      }
      var f = u.diff
      u.diff = function (_, h, D) {
        if (_ && this.$u === _.$u) return f.call(this, _, h, D)
        var p = this.local(),
          k = a(_).local()
        return f.call(p, k, h, D)
      }
    }
  })
})
var j = b(($e, Ce) => {
  ;(function (n, t) {
    typeof $e == "object" && typeof Ce < "u"
      ? (Ce.exports = t())
      : typeof define == "function" && define.amd
        ? define(t)
        : ((n = typeof globalThis < "u" ? globalThis : n || self).dayjs = t())
  })($e, function () {
    "use strict"
    var n = 1e3,
      t = 6e4,
      s = 36e5,
      i = "millisecond",
      e = "second",
      a = "minute",
      u = "hour",
      r = "day",
      o = "week",
      d = "month",
      l = "quarter",
      y = "year",
      f = "date",
      _ = "Invalid Date",
      h =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      D =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      p = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        ordinal: function (L) {
          var M = ["th", "st", "nd", "rd"],
            m = L % 100
          return "[" + L + (M[(m - 20) % 10] || M[m] || M[0]) + "]"
        },
      },
      k = function (L, M, m) {
        var Y = String(L)
        return !Y || Y.length >= M
          ? L
          : "" + Array(M + 1 - Y.length).join(m) + L
      },
      T = {
        s: k,
        z: function (L) {
          var M = -L.utcOffset(),
            m = Math.abs(M),
            Y = Math.floor(m / 60),
            c = m % 60
          return (M <= 0 ? "+" : "-") + k(Y, 2, "0") + ":" + k(c, 2, "0")
        },
        m: function L(M, m) {
          if (M.date() < m.date()) return -L(m, M)
          var Y = 12 * (m.year() - M.year()) + (m.month() - M.month()),
            c = M.clone().add(Y, d),
            v = m - c < 0,
            g = M.clone().add(Y + (v ? -1 : 1), d)
          return +(-(Y + (m - c) / (v ? c - g : g - c)) || 0)
        },
        a: function (L) {
          return L < 0 ? Math.ceil(L) || 0 : Math.floor(L)
        },
        p: function (L) {
          return (
            { M: d, y, w: o, d: r, D: f, h: u, m: a, s: e, ms: i, Q: l }[L] ||
            String(L || "")
              .toLowerCase()
              .replace(/s$/, "")
          )
        },
        u: function (L) {
          return L === void 0
        },
      },
      S = "en",
      $ = {}
    $[S] = p
    var O = "$isDayjsObject",
      I = function (L) {
        return L instanceof U || !(!L || !L[O])
      },
      x = function L(M, m, Y) {
        var c
        if (!M) return S
        if (typeof M == "string") {
          var v = M.toLowerCase()
          $[v] && (c = v), m && (($[v] = m), (c = v))
          var g = M.split("-")
          if (!c && g.length > 1) return L(g[0])
        } else {
          var C = M.name
          ;($[C] = M), (c = C)
        }
        return !Y && c && (S = c), c || (!Y && S)
      },
      w = function (L, M) {
        if (I(L)) return L.clone()
        var m = typeof M == "object" ? M : {}
        return (m.date = L), (m.args = arguments), new U(m)
      },
      H = T
    ;(H.l = x),
      (H.i = I),
      (H.w = function (L, M) {
        return w(L, { locale: M.$L, utc: M.$u, x: M.$x, $offset: M.$offset })
      })
    var U = (function () {
        function L(m) {
          ;(this.$L = x(m.locale, null, !0)),
            this.parse(m),
            (this.$x = this.$x || m.x || {}),
            (this[O] = !0)
        }
        var M = L.prototype
        return (
          (M.parse = function (m) {
            ;(this.$d = (function (Y) {
              var c = Y.date,
                v = Y.utc
              if (c === null) return new Date(NaN)
              if (H.u(c)) return new Date()
              if (c instanceof Date) return new Date(c)
              if (typeof c == "string" && !/Z$/i.test(c)) {
                var g = c.match(h)
                if (g) {
                  var C = g[2] - 1 || 0,
                    q = (g[7] || "0").substring(0, 3)
                  return v
                    ? new Date(
                        Date.UTC(
                          g[1],
                          C,
                          g[3] || 1,
                          g[4] || 0,
                          g[5] || 0,
                          g[6] || 0,
                          q
                        )
                      )
                    : new Date(
                        g[1],
                        C,
                        g[3] || 1,
                        g[4] || 0,
                        g[5] || 0,
                        g[6] || 0,
                        q
                      )
                }
              }
              return new Date(c)
            })(m)),
              this.init()
          }),
          (M.init = function () {
            var m = this.$d
            ;(this.$y = m.getFullYear()),
              (this.$M = m.getMonth()),
              (this.$D = m.getDate()),
              (this.$W = m.getDay()),
              (this.$H = m.getHours()),
              (this.$m = m.getMinutes()),
              (this.$s = m.getSeconds()),
              (this.$ms = m.getMilliseconds())
          }),
          (M.$utils = function () {
            return H
          }),
          (M.isValid = function () {
            return this.$d.toString() !== _
          }),
          (M.isSame = function (m, Y) {
            var c = w(m)
            return this.startOf(Y) <= c && c <= this.endOf(Y)
          }),
          (M.isAfter = function (m, Y) {
            return w(m) < this.startOf(Y)
          }),
          (M.isBefore = function (m, Y) {
            return this.endOf(Y) < w(m)
          }),
          (M.$g = function (m, Y, c) {
            return H.u(m) ? this[Y] : this.set(c, m)
          }),
          (M.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (M.valueOf = function () {
            return this.$d.getTime()
          }),
          (M.startOf = function (m, Y) {
            var c = this,
              v = !!H.u(Y) || Y,
              g = H.p(m),
              C = function (V, F) {
                var W = H.w(
                  c.$u ? Date.UTC(c.$y, F, V) : new Date(c.$y, F, V),
                  c
                )
                return v ? W : W.endOf(r)
              },
              q = function (V, F) {
                return H.w(
                  c
                    .toDate()
                    [
                      V
                    ].apply(c.toDate("s"), (v ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(F)),
                  c
                )
              },
              N = this.$W,
              E = this.$M,
              P = this.$D,
              ee = "set" + (this.$u ? "UTC" : "")
            switch (g) {
              case y:
                return v ? C(1, 0) : C(31, 11)
              case d:
                return v ? C(1, E) : C(0, E + 1)
              case o:
                var G = this.$locale().weekStart || 0,
                  X = (N < G ? N + 7 : N) - G
                return C(v ? P - X : P + (6 - X), E)
              case r:
              case f:
                return q(ee + "Hours", 0)
              case u:
                return q(ee + "Minutes", 1)
              case a:
                return q(ee + "Seconds", 2)
              case e:
                return q(ee + "Milliseconds", 3)
              default:
                return this.clone()
            }
          }),
          (M.endOf = function (m) {
            return this.startOf(m, !1)
          }),
          (M.$set = function (m, Y) {
            var c,
              v = H.p(m),
              g = "set" + (this.$u ? "UTC" : ""),
              C = ((c = {}),
              (c[r] = g + "Date"),
              (c[f] = g + "Date"),
              (c[d] = g + "Month"),
              (c[y] = g + "FullYear"),
              (c[u] = g + "Hours"),
              (c[a] = g + "Minutes"),
              (c[e] = g + "Seconds"),
              (c[i] = g + "Milliseconds"),
              c)[v],
              q = v === r ? this.$D + (Y - this.$W) : Y
            if (v === d || v === y) {
              var N = this.clone().set(f, 1)
              N.$d[C](q),
                N.init(),
                (this.$d = N.set(f, Math.min(this.$D, N.daysInMonth())).$d)
            } else C && this.$d[C](q)
            return this.init(), this
          }),
          (M.set = function (m, Y) {
            return this.clone().$set(m, Y)
          }),
          (M.get = function (m) {
            return this[H.p(m)]()
          }),
          (M.add = function (m, Y) {
            var c,
              v = this
            m = Number(m)
            var g = H.p(Y),
              C = function (E) {
                var P = w(v)
                return H.w(P.date(P.date() + Math.round(E * m)), v)
              }
            if (g === d) return this.set(d, this.$M + m)
            if (g === y) return this.set(y, this.$y + m)
            if (g === r) return C(1)
            if (g === o) return C(7)
            var q = ((c = {}), (c[a] = t), (c[u] = s), (c[e] = n), c)[g] || 1,
              N = this.$d.getTime() + m * q
            return H.w(N, this)
          }),
          (M.subtract = function (m, Y) {
            return this.add(-1 * m, Y)
          }),
          (M.format = function (m) {
            var Y = this,
              c = this.$locale()
            if (!this.isValid()) return c.invalidDate || _
            var v = m || "YYYY-MM-DDTHH:mm:ssZ",
              g = H.z(this),
              C = this.$H,
              q = this.$m,
              N = this.$M,
              E = c.weekdays,
              P = c.months,
              ee = c.meridiem,
              G = function (F, W, Q, te) {
                return (F && (F[W] || F(Y, v))) || Q[W].slice(0, te)
              },
              X = function (F) {
                return H.s(C % 12 || 12, F, "0")
              },
              V =
                ee ||
                function (F, W, Q) {
                  var te = F < 12 ? "AM" : "PM"
                  return Q ? te.toLowerCase() : te
                }
            return v.replace(D, function (F, W) {
              return (
                W ||
                (function (Q) {
                  switch (Q) {
                    case "YY":
                      return String(Y.$y).slice(-2)
                    case "YYYY":
                      return H.s(Y.$y, 4, "0")
                    case "M":
                      return N + 1
                    case "MM":
                      return H.s(N + 1, 2, "0")
                    case "MMM":
                      return G(c.monthsShort, N, P, 3)
                    case "MMMM":
                      return G(P, N)
                    case "D":
                      return Y.$D
                    case "DD":
                      return H.s(Y.$D, 2, "0")
                    case "d":
                      return String(Y.$W)
                    case "dd":
                      return G(c.weekdaysMin, Y.$W, E, 2)
                    case "ddd":
                      return G(c.weekdaysShort, Y.$W, E, 3)
                    case "dddd":
                      return E[Y.$W]
                    case "H":
                      return String(C)
                    case "HH":
                      return H.s(C, 2, "0")
                    case "h":
                      return X(1)
                    case "hh":
                      return X(2)
                    case "a":
                      return V(C, q, !0)
                    case "A":
                      return V(C, q, !1)
                    case "m":
                      return String(q)
                    case "mm":
                      return H.s(q, 2, "0")
                    case "s":
                      return String(Y.$s)
                    case "ss":
                      return H.s(Y.$s, 2, "0")
                    case "SSS":
                      return H.s(Y.$ms, 3, "0")
                    case "Z":
                      return g
                  }
                  return null
                })(F) ||
                g.replace(":", "")
              )
            })
          }),
          (M.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (M.diff = function (m, Y, c) {
            var v,
              g = this,
              C = H.p(Y),
              q = w(m),
              N = (q.utcOffset() - this.utcOffset()) * t,
              E = this - q,
              P = function () {
                return H.m(g, q)
              }
            switch (C) {
              case y:
                v = P() / 12
                break
              case d:
                v = P()
                break
              case l:
                v = P() / 3
                break
              case o:
                v = (E - N) / 6048e5
                break
              case r:
                v = (E - N) / 864e5
                break
              case u:
                v = E / s
                break
              case a:
                v = E / t
                break
              case e:
                v = E / n
                break
              default:
                v = E
            }
            return c ? v : H.a(v)
          }),
          (M.daysInMonth = function () {
            return this.endOf(d).$D
          }),
          (M.$locale = function () {
            return $[this.$L]
          }),
          (M.locale = function (m, Y) {
            if (!m) return this.$L
            var c = this.clone(),
              v = x(m, Y, !0)
            return v && (c.$L = v), c
          }),
          (M.clone = function () {
            return H.w(this.$d, this)
          }),
          (M.toDate = function () {
            return new Date(this.valueOf())
          }),
          (M.toJSON = function () {
            return this.isValid() ? this.toISOString() : null
          }),
          (M.toISOString = function () {
            return this.$d.toISOString()
          }),
          (M.toString = function () {
            return this.$d.toUTCString()
          }),
          L
        )
      })(),
      Z = U.prototype
    return (
      (w.prototype = Z),
      [
        ["$ms", i],
        ["$s", e],
        ["$m", a],
        ["$H", u],
        ["$W", r],
        ["$M", d],
        ["$y", y],
        ["$D", f],
      ].forEach(function (L) {
        Z[L[1]] = function (M) {
          return this.$g(M, L[0], L[1])
        }
      }),
      (w.extend = function (L, M) {
        return L.$i || (L(M, U, w), (L.$i = !0)), w
      }),
      (w.locale = x),
      (w.isDayjs = I),
      (w.unix = function (L) {
        return w(1e3 * L)
      }),
      (w.en = $[S]),
      (w.Ls = $),
      (w.p = {}),
      w
    )
  })
})
var Ln = b((Oe, ze) => {
  ;(function (n, t) {
    typeof Oe == "object" && typeof ze < "u"
      ? (ze.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ar =
            t(n.dayjs))
  })(Oe, function (n) {
    "use strict"
    function t(r) {
      return r && typeof r == "object" && "default" in r ? r : { default: r }
    }
    var s = t(n),
      i =
        "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split(
          "_"
        ),
      e = {
        1: "\u0661",
        2: "\u0662",
        3: "\u0663",
        4: "\u0664",
        5: "\u0665",
        6: "\u0666",
        7: "\u0667",
        8: "\u0668",
        9: "\u0669",
        0: "\u0660",
      },
      a = {
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u0660": "0",
      },
      u = {
        name: "ar",
        weekdays:
          "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split(
            "_"
          ),
        weekdaysShort:
          "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split(
            "_"
          ),
        weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split(
          "_"
        ),
        months: i,
        monthsShort: i,
        weekStart: 6,
        meridiem: function (r) {
          return r > 12 ? "\u0645" : "\u0635"
        },
        relativeTime: {
          future: "\u0628\u0639\u062F %s",
          past: "\u0645\u0646\u0630 %s",
          s: "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629",
          m: "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629",
          mm: "%d \u062F\u0642\u0627\u0626\u0642",
          h: "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629",
          hh: "%d \u0633\u0627\u0639\u0627\u062A",
          d: "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F",
          dd: "%d \u0623\u064A\u0627\u0645",
          M: "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F",
          MM: "%d \u0623\u0634\u0647\u0631",
          y: "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F",
          yy: "%d \u0623\u0639\u0648\u0627\u0645",
        },
        preparse: function (r) {
          return r
            .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (o) {
              return a[o]
            })
            .replace(/،/g, ",")
        },
        postformat: function (r) {
          return r
            .replace(/\d/g, function (o) {
              return e[o]
            })
            .replace(/,/g, "\u060C")
        },
        ordinal: function (r) {
          return r
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "D/\u200FM/\u200FYYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm",
        },
      }
    return s.default.locale(u, null, !0), u
  })
})
var vn = b((Ae, Ie) => {
  ;(function (n, t) {
    typeof Ae == "object" && typeof Ie < "u"
      ? (Ie.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_bs =
            t(n.dayjs))
  })(Ae, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "bs",
        weekdays:
          "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split(
            "_"
          ),
        months:
          "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
        monthsShort:
          "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split(
            "_"
          ),
        weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY H:mm",
          LLLL: "dddd, D. MMMM YYYY H:mm",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var gn = b((qe, xe) => {
  ;(function (n, t) {
    typeof qe == "object" && typeof xe < "u"
      ? (xe.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ca =
            t(n.dayjs))
  })(qe, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "ca",
        weekdays:
          "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split(
            "_"
          ),
        weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
        weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
        months:
          "Gener_Febrer_Mar\xE7_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split(
            "_"
          ),
        monthsShort:
          "Gen._Febr._Mar\xE7_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.".split(
            "_"
          ),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM [de] YYYY",
          LLL: "D MMMM [de] YYYY [a les] H:mm",
          LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
          ll: "D MMM YYYY",
          lll: "D MMM YYYY, H:mm",
          llll: "ddd D MMM YYYY, H:mm",
        },
        relativeTime: {
          future: "d'aqu\xED %s",
          past: "fa %s",
          s: "uns segons",
          m: "un minut",
          mm: "%d minuts",
          h: "una hora",
          hh: "%d hores",
          d: "un dia",
          dd: "%d dies",
          M: "un mes",
          MM: "%d mesos",
          y: "un any",
          yy: "%d anys",
        },
        ordinal: function (e) {
          return (
            "" +
            e +
            (e === 1 || e === 3 ? "r" : e === 2 ? "n" : e === 4 ? "t" : "\xE8")
          )
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Ne = b((Me, Sn) => {
  ;(function (n, t) {
    typeof Me == "object" && typeof Sn < "u"
      ? t(Me, j())
      : typeof define == "function" && define.amd
        ? define(["exports", "dayjs"], t)
        : t(
            ((n =
              typeof globalThis < "u"
                ? globalThis
                : n || self).dayjs_locale_ku = {}),
            n.dayjs
          )
  })(Me, function (n, t) {
    "use strict"
    function s(o) {
      return o && typeof o == "object" && "default" in o ? o : { default: o }
    }
    var i = s(t),
      e = {
        1: "\u0661",
        2: "\u0662",
        3: "\u0663",
        4: "\u0664",
        5: "\u0665",
        6: "\u0666",
        7: "\u0667",
        8: "\u0668",
        9: "\u0669",
        0: "\u0660",
      },
      a = {
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u0660": "0",
      },
      u = [
        "\u06A9\u0627\u0646\u0648\u0648\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645",
        "\u0634\u0648\u0628\u0627\u062A",
        "\u0626\u0627\u062F\u0627\u0631",
        "\u0646\u06CC\u0633\u0627\u0646",
        "\u0626\u0627\u06CC\u0627\u0631",
        "\u062D\u0648\u0632\u06D5\u06CC\u0631\u0627\u0646",
        "\u062A\u06D5\u0645\u0645\u0648\u0648\u0632",
        "\u0626\u0627\u0628",
        "\u0626\u06D5\u06CC\u0644\u0648\u0648\u0644",
        "\u062A\u0634\u0631\u06CC\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645",
        "\u062A\u0634\u0631\u06CC\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645",
        "\u06A9\u0627\u0646\u0648\u0648\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645",
      ],
      r = {
        name: "ku",
        months: u,
        monthsShort: u,
        weekdays:
          "\u06CC\u06D5\u06A9\u0634\u06D5\u0645\u0645\u06D5_\u062F\u0648\u0648\u0634\u06D5\u0645\u0645\u06D5_\u0633\u06CE\u0634\u06D5\u0645\u0645\u06D5_\u0686\u0648\u0627\u0631\u0634\u06D5\u0645\u0645\u06D5_\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645\u0645\u06D5_\u0647\u06D5\u06CC\u0646\u06CC_\u0634\u06D5\u0645\u0645\u06D5".split(
            "_"
          ),
        weekdaysShort:
          "\u06CC\u06D5\u06A9\u0634\u06D5\u0645_\u062F\u0648\u0648\u0634\u06D5\u0645_\u0633\u06CE\u0634\u06D5\u0645_\u0686\u0648\u0627\u0631\u0634\u06D5\u0645_\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645_\u0647\u06D5\u06CC\u0646\u06CC_\u0634\u06D5\u0645\u0645\u06D5".split(
            "_"
          ),
        weekStart: 6,
        weekdaysMin:
          "\u06CC_\u062F_\u0633_\u0686_\u067E_\u0647\u0640_\u0634".split("_"),
        preparse: function (o) {
          return o
            .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (d) {
              return a[d]
            })
            .replace(/،/g, ",")
        },
        postformat: function (o) {
          return o
            .replace(/\d/g, function (d) {
              return e[d]
            })
            .replace(/,/g, "\u060C")
        },
        ordinal: function (o) {
          return o
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        meridiem: function (o) {
          return o < 12 ? "\u067E.\u0646" : "\u062F.\u0646"
        },
        relativeTime: {
          future: "\u0644\u06D5 %s",
          past: "\u0644\u06D5\u0645\u06D5\u0648\u067E\u06CE\u0634 %s",
          s: "\u0686\u06D5\u0646\u062F \u0686\u0631\u06A9\u06D5\u06CC\u06D5\u06A9",
          m: "\u06CC\u06D5\u06A9 \u062E\u0648\u0644\u06D5\u06A9",
          mm: "%d \u062E\u0648\u0644\u06D5\u06A9",
          h: "\u06CC\u06D5\u06A9 \u06A9\u0627\u062A\u0698\u0645\u06CE\u0631",
          hh: "%d \u06A9\u0627\u062A\u0698\u0645\u06CE\u0631",
          d: "\u06CC\u06D5\u06A9 \u0695\u06C6\u0698",
          dd: "%d \u0695\u06C6\u0698",
          M: "\u06CC\u06D5\u06A9 \u0645\u0627\u0646\u06AF",
          MM: "%d \u0645\u0627\u0646\u06AF",
          y: "\u06CC\u06D5\u06A9 \u0633\u0627\u06B5",
          yy: "%d \u0633\u0627\u06B5",
        },
      }
    i.default.locale(r, null, !0),
      (n.default = r),
      (n.englishToArabicNumbersMap = e),
      Object.defineProperty(n, "__esModule", { value: !0 })
  })
})
var bn = b((Ee, Fe) => {
  ;(function (n, t) {
    typeof Ee == "object" && typeof Fe < "u"
      ? (Fe.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_cs =
            t(n.dayjs))
  })(Ee, function (n) {
    "use strict"
    function t(u) {
      return u && typeof u == "object" && "default" in u ? u : { default: u }
    }
    var s = t(n)
    function i(u) {
      return u > 1 && u < 5 && ~~(u / 10) != 1
    }
    function e(u, r, o, d) {
      var l = u + " "
      switch (o) {
        case "s":
          return r || d ? "p\xE1r sekund" : "p\xE1r sekundami"
        case "m":
          return r ? "minuta" : d ? "minutu" : "minutou"
        case "mm":
          return r || d ? l + (i(u) ? "minuty" : "minut") : l + "minutami"
        case "h":
          return r ? "hodina" : d ? "hodinu" : "hodinou"
        case "hh":
          return r || d ? l + (i(u) ? "hodiny" : "hodin") : l + "hodinami"
        case "d":
          return r || d ? "den" : "dnem"
        case "dd":
          return r || d ? l + (i(u) ? "dny" : "dn\xED") : l + "dny"
        case "M":
          return r || d ? "m\u011Bs\xEDc" : "m\u011Bs\xEDcem"
        case "MM":
          return r || d
            ? l + (i(u) ? "m\u011Bs\xEDce" : "m\u011Bs\xEDc\u016F")
            : l + "m\u011Bs\xEDci"
        case "y":
          return r || d ? "rok" : "rokem"
        case "yy":
          return r || d ? l + (i(u) ? "roky" : "let") : l + "lety"
      }
    }
    var a = {
      name: "cs",
      weekdays:
        "ned\u011Ble_pond\u011Bl\xED_\xFAter\xFD_st\u0159eda_\u010Dtvrtek_p\xE1tek_sobota".split(
          "_"
        ),
      weekdaysShort: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
      weekdaysMin: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
      months:
        "leden_\xFAnor_b\u0159ezen_duben_kv\u011Bten_\u010Derven_\u010Dervenec_srpen_z\xE1\u0159\xED_\u0159\xEDjen_listopad_prosinec".split(
          "_"
        ),
      monthsShort:
        "led_\xFAno_b\u0159e_dub_kv\u011B_\u010Dvn_\u010Dvc_srp_z\xE1\u0159_\u0159\xEDj_lis_pro".split(
          "_"
        ),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (u) {
        return u + "."
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY",
      },
      relativeTime: {
        future: "za %s",
        past: "p\u0159ed %s",
        s: e,
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: e,
        dd: e,
        M: e,
        MM: e,
        y: e,
        yy: e,
      },
    }
    return s.default.locale(a, null, !0), a
  })
})
var kn = b((Je, Ue) => {
  ;(function (n, t) {
    typeof Je == "object" && typeof Ue < "u"
      ? (Ue.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_cy =
            t(n.dayjs))
  })(Je, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "cy",
        weekdays:
          "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split(
            "_"
          ),
        months:
          "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split(
          "_"
        ),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "mewn %s",
          past: "%s yn \xF4l",
          s: "ychydig eiliadau",
          m: "munud",
          mm: "%d munud",
          h: "awr",
          hh: "%d awr",
          d: "diwrnod",
          dd: "%d diwrnod",
          M: "mis",
          MM: "%d mis",
          y: "blwyddyn",
          yy: "%d flynedd",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Hn = b((Pe, We) => {
  ;(function (n, t) {
    typeof Pe == "object" && typeof We < "u"
      ? (We.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_da =
            t(n.dayjs))
  })(Pe, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "da",
        weekdays:
          "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
        weekdaysShort: "s\xF8n._man._tirs._ons._tors._fre._l\xF8r.".split("_"),
        weekdaysMin: "s\xF8._ma._ti._on._to._fr._l\xF8.".split("_"),
        months:
          "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split(
            "_"
          ),
        monthsShort:
          "jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.".split(
            "_"
          ),
        weekStart: 1,
        yearStart: 4,
        ordinal: function (e) {
          return e + "."
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY HH:mm",
          LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm",
        },
        relativeTime: {
          future: "om %s",
          past: "%s siden",
          s: "f\xE5 sekunder",
          m: "et minut",
          mm: "%d minutter",
          h: "en time",
          hh: "%d timer",
          d: "en dag",
          dd: "%d dage",
          M: "en m\xE5ned",
          MM: "%d m\xE5neder",
          y: "et \xE5r",
          yy: "%d \xE5r",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var jn = b((Re, Ze) => {
  ;(function (n, t) {
    typeof Re == "object" && typeof Ze < "u"
      ? (Ze.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_de =
            t(n.dayjs))
  })(Re, function (n) {
    "use strict"
    function t(u) {
      return u && typeof u == "object" && "default" in u ? u : { default: u }
    }
    var s = t(n),
      i = {
        s: "ein paar Sekunden",
        m: ["eine Minute", "einer Minute"],
        mm: "%d Minuten",
        h: ["eine Stunde", "einer Stunde"],
        hh: "%d Stunden",
        d: ["ein Tag", "einem Tag"],
        dd: ["%d Tage", "%d Tagen"],
        M: ["ein Monat", "einem Monat"],
        MM: ["%d Monate", "%d Monaten"],
        y: ["ein Jahr", "einem Jahr"],
        yy: ["%d Jahre", "%d Jahren"],
      }
    function e(u, r, o) {
      var d = i[o]
      return Array.isArray(d) && (d = d[r ? 0 : 1]), d.replace("%d", u)
    }
    var a = {
      name: "de",
      weekdays:
        "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
          "_"
        ),
      weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months:
        "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
          "_"
        ),
      monthsShort:
        "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split(
          "_"
        ),
      ordinal: function (u) {
        return u + "."
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LTS: "HH:mm:ss",
        LT: "HH:mm",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm",
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: e,
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: e,
        dd: e,
        M: e,
        MM: e,
        y: e,
        yy: e,
      },
    }
    return s.default.locale(a, null, !0), a
  })
})
var Tn = b((Ve, Ge) => {
  ;(function (n, t) {
    typeof Ve == "object" && typeof Ge < "u"
      ? (Ge.exports = t())
      : typeof define == "function" && define.amd
        ? define(t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_en =
            t())
  })(Ve, function () {
    "use strict"
    return {
      name: "en",
      weekdays:
        "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months:
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      ordinal: function (n) {
        var t = ["th", "st", "nd", "rd"],
          s = n % 100
        return "[" + n + (t[(s - 20) % 10] || t[s] || t[0]) + "]"
      },
    }
  })
})
var wn = b((Ke, Be) => {
  ;(function (n, t) {
    typeof Ke == "object" && typeof Be < "u"
      ? (Be.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_es =
            t(n.dayjs))
  })(Ke, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "es",
        monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split(
          "_"
        ),
        weekdays:
          "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split(
            "_"
          ),
        weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
        months:
          "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
            "_"
          ),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
        },
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un d\xEDa",
          dd: "%d d\xEDas",
          M: "un mes",
          MM: "%d meses",
          y: "un a\xF1o",
          yy: "%d a\xF1os",
        },
        ordinal: function (e) {
          return e + "\xBA"
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var $n = b((Xe, Qe) => {
  ;(function (n, t) {
    typeof Xe == "object" && typeof Qe < "u"
      ? (Qe.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_et =
            t(n.dayjs))
  })(Xe, function (n) {
    "use strict"
    function t(a) {
      return a && typeof a == "object" && "default" in a ? a : { default: a }
    }
    var s = t(n)
    function i(a, u, r, o) {
      var d = {
        s: ["m\xF5ne sekundi", "m\xF5ni sekund", "paar sekundit"],
        m: ["\xFChe minuti", "\xFCks minut"],
        mm: ["%d minuti", "%d minutit"],
        h: ["\xFChe tunni", "tund aega", "\xFCks tund"],
        hh: ["%d tunni", "%d tundi"],
        d: ["\xFChe p\xE4eva", "\xFCks p\xE4ev"],
        M: ["kuu aja", "kuu aega", "\xFCks kuu"],
        MM: ["%d kuu", "%d kuud"],
        y: ["\xFChe aasta", "aasta", "\xFCks aasta"],
        yy: ["%d aasta", "%d aastat"],
      }
      return u
        ? (d[r][2] ? d[r][2] : d[r][1]).replace("%d", a)
        : (o ? d[r][0] : d[r][1]).replace("%d", a)
    }
    var e = {
      name: "et",
      weekdays:
        "p\xFChap\xE4ev_esmasp\xE4ev_teisip\xE4ev_kolmap\xE4ev_neljap\xE4ev_reede_laup\xE4ev".split(
          "_"
        ),
      weekdaysShort: "P_E_T_K_N_R_L".split("_"),
      weekdaysMin: "P_E_T_K_N_R_L".split("_"),
      months:
        "jaanuar_veebruar_m\xE4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split(
          "_"
        ),
      monthsShort:
        "jaan_veebr_m\xE4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split(
          "_"
        ),
      ordinal: function (a) {
        return a + "."
      },
      weekStart: 1,
      relativeTime: {
        future: "%s p\xE4rast",
        past: "%s tagasi",
        s: i,
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: i,
        dd: "%d p\xE4eva",
        M: i,
        MM: i,
        y: i,
        yy: i,
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm",
      },
    }
    return s.default.locale(e, null, !0), e
  })
})
var Cn = b((et, tt) => {
  ;(function (n, t) {
    typeof et == "object" && typeof tt < "u"
      ? (tt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_fa =
            t(n.dayjs))
  })(et, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "fa",
        weekdays:
          "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split(
            "_"
          ),
        weekdaysShort:
          "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split(
            "_"
          ),
        weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u062C_\u0634".split(
          "_"
        ),
        weekStart: 6,
        months:
          "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split(
            "_"
          ),
        monthsShort:
          "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split(
            "_"
          ),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "\u062F\u0631 %s",
          past: "%s \u067E\u06CC\u0634",
          s: "\u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647",
          m: "\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647",
          mm: "%d \u062F\u0642\u06CC\u0642\u0647",
          h: "\u06CC\u06A9 \u0633\u0627\u0639\u062A",
          hh: "%d \u0633\u0627\u0639\u062A",
          d: "\u06CC\u06A9 \u0631\u0648\u0632",
          dd: "%d \u0631\u0648\u0632",
          M: "\u06CC\u06A9 \u0645\u0627\u0647",
          MM: "%d \u0645\u0627\u0647",
          y: "\u06CC\u06A9 \u0633\u0627\u0644",
          yy: "%d \u0633\u0627\u0644",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var On = b((nt, it) => {
  ;(function (n, t) {
    typeof nt == "object" && typeof it < "u"
      ? (it.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_fi =
            t(n.dayjs))
  })(nt, function (n) {
    "use strict"
    function t(a) {
      return a && typeof a == "object" && "default" in a ? a : { default: a }
    }
    var s = t(n)
    function i(a, u, r, o) {
      var d = {
          s: "muutama sekunti",
          m: "minuutti",
          mm: "%d minuuttia",
          h: "tunti",
          hh: "%d tuntia",
          d: "p\xE4iv\xE4",
          dd: "%d p\xE4iv\xE4\xE4",
          M: "kuukausi",
          MM: "%d kuukautta",
          y: "vuosi",
          yy: "%d vuotta",
          numbers:
            "nolla_yksi_kaksi_kolme_nelj\xE4_viisi_kuusi_seitsem\xE4n_kahdeksan_yhdeks\xE4n".split(
              "_"
            ),
        },
        l = {
          s: "muutaman sekunnin",
          m: "minuutin",
          mm: "%d minuutin",
          h: "tunnin",
          hh: "%d tunnin",
          d: "p\xE4iv\xE4n",
          dd: "%d p\xE4iv\xE4n",
          M: "kuukauden",
          MM: "%d kuukauden",
          y: "vuoden",
          yy: "%d vuoden",
          numbers:
            "nollan_yhden_kahden_kolmen_nelj\xE4n_viiden_kuuden_seitsem\xE4n_kahdeksan_yhdeks\xE4n".split(
              "_"
            ),
        },
        y = o && !u ? l : d,
        f = y[r]
      return a < 10 ? f.replace("%d", y.numbers[a]) : f.replace("%d", a)
    }
    var e = {
      name: "fi",
      weekdays:
        "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split(
          "_"
        ),
      weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
      weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
      months:
        "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xE4kuu_hein\xE4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split(
          "_"
        ),
      monthsShort:
        "tammi_helmi_maalis_huhti_touko_kes\xE4_hein\xE4_elo_syys_loka_marras_joulu".split(
          "_"
        ),
      ordinal: function (a) {
        return a + "."
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "%s p\xE4\xE4st\xE4",
        past: "%s sitten",
        s: i,
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: i,
        dd: i,
        M: i,
        MM: i,
        y: i,
        yy: i,
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM[ta] YYYY",
        LLL: "D. MMMM[ta] YYYY, [klo] HH.mm",
        LLLL: "dddd, D. MMMM[ta] YYYY, [klo] HH.mm",
        l: "D.M.YYYY",
        ll: "D. MMM YYYY",
        lll: "D. MMM YYYY, [klo] HH.mm",
        llll: "ddd, D. MMM YYYY, [klo] HH.mm",
      },
    }
    return s.default.locale(e, null, !0), e
  })
})
var zn = b((st, rt) => {
  ;(function (n, t) {
    typeof st == "object" && typeof rt < "u"
      ? (rt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_fr =
            t(n.dayjs))
  })(st, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "fr",
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split(
          "_"
        ),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        months:
          "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split(
            "_"
          ),
        monthsShort:
          "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split(
            "_"
          ),
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "dans %s",
          past: "il y a %s",
          s: "quelques secondes",
          m: "une minute",
          mm: "%d minutes",
          h: "une heure",
          hh: "%d heures",
          d: "un jour",
          dd: "%d jours",
          M: "un mois",
          MM: "%d mois",
          y: "un an",
          yy: "%d ans",
        },
        ordinal: function (e) {
          return "" + e + (e === 1 ? "er" : "")
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var An = b((at, ut) => {
  ;(function (n, t) {
    typeof at == "object" && typeof ut < "u"
      ? (ut.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_hi =
            t(n.dayjs))
  })(at, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "hi",
        weekdays:
          "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0932\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split(
            "_"
          ),
        months:
          "\u091C\u0928\u0935\u0930\u0940_\u092B\u093C\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u092E\u094D\u092C\u0930_\u0926\u093F\u0938\u092E\u094D\u092C\u0930".split(
            "_"
          ),
        weekdaysShort:
          "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0932_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split(
            "_"
          ),
        monthsShort:
          "\u091C\u0928._\u092B\u093C\u0930._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948._\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0905\u0917._\u0938\u093F\u0924._\u0905\u0915\u094D\u091F\u0942._\u0928\u0935._\u0926\u093F\u0938.".split(
            "_"
          ),
        weekdaysMin:
          "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split(
            "_"
          ),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "A h:mm \u092C\u091C\u0947",
          LTS: "A h:mm:ss \u092C\u091C\u0947",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm \u092C\u091C\u0947",
          LLLL: "dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947",
        },
        relativeTime: {
          future: "%s \u092E\u0947\u0902",
          past: "%s \u092A\u0939\u0932\u0947",
          s: "\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923",
          m: "\u090F\u0915 \u092E\u093F\u0928\u091F",
          mm: "%d \u092E\u093F\u0928\u091F",
          h: "\u090F\u0915 \u0918\u0902\u091F\u093E",
          hh: "%d \u0918\u0902\u091F\u0947",
          d: "\u090F\u0915 \u0926\u093F\u0928",
          dd: "%d \u0926\u093F\u0928",
          M: "\u090F\u0915 \u092E\u0939\u0940\u0928\u0947",
          MM: "%d \u092E\u0939\u0940\u0928\u0947",
          y: "\u090F\u0915 \u0935\u0930\u094D\u0937",
          yy: "%d \u0935\u0930\u094D\u0937",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var In = b((ot, dt) => {
  ;(function (n, t) {
    typeof ot == "object" && typeof dt < "u"
      ? (dt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_hu =
            t(n.dayjs))
  })(ot, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "hu",
        weekdays:
          "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split(
            "_"
          ),
        weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"),
        weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
        months:
          "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split(
            "_"
          ),
        monthsShort:
          "jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec".split(
            "_"
          ),
        ordinal: function (e) {
          return e + "."
        },
        weekStart: 1,
        relativeTime: {
          future: "%s m\xFAlva",
          past: "%s",
          s: function (e, a, u, r) {
            return "n\xE9h\xE1ny m\xE1sodperc" + (r || a ? "" : "e")
          },
          m: function (e, a, u, r) {
            return "egy perc" + (r || a ? "" : "e")
          },
          mm: function (e, a, u, r) {
            return e + " perc" + (r || a ? "" : "e")
          },
          h: function (e, a, u, r) {
            return "egy " + (r || a ? "\xF3ra" : "\xF3r\xE1ja")
          },
          hh: function (e, a, u, r) {
            return e + " " + (r || a ? "\xF3ra" : "\xF3r\xE1ja")
          },
          d: function (e, a, u, r) {
            return "egy " + (r || a ? "nap" : "napja")
          },
          dd: function (e, a, u, r) {
            return e + " " + (r || a ? "nap" : "napja")
          },
          M: function (e, a, u, r) {
            return "egy " + (r || a ? "h\xF3nap" : "h\xF3napja")
          },
          MM: function (e, a, u, r) {
            return e + " " + (r || a ? "h\xF3nap" : "h\xF3napja")
          },
          y: function (e, a, u, r) {
            return "egy " + (r || a ? "\xE9v" : "\xE9ve")
          },
          yy: function (e, a, u, r) {
            return e + " " + (r || a ? "\xE9v" : "\xE9ve")
          },
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "YYYY.MM.DD.",
          LL: "YYYY. MMMM D.",
          LLL: "YYYY. MMMM D. H:mm",
          LLLL: "YYYY. MMMM D., dddd H:mm",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var qn = b((_t, lt) => {
  ;(function (n, t) {
    typeof _t == "object" && typeof lt < "u"
      ? (lt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_locale_hy_am = t(n.dayjs))
  })(_t, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "hy-am",
        weekdays:
          "\u056F\u056B\u0580\u0561\u056F\u056B_\u0565\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0570\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split(
            "_"
          ),
        months:
          "\u0570\u0578\u0582\u0576\u057E\u0561\u0580\u056B_\u0583\u0565\u057F\u0580\u057E\u0561\u0580\u056B_\u0574\u0561\u0580\u057F\u056B_\u0561\u057A\u0580\u056B\u056C\u056B_\u0574\u0561\u0575\u056B\u057D\u056B_\u0570\u0578\u0582\u0576\u056B\u057D\u056B_\u0570\u0578\u0582\u056C\u056B\u057D\u056B_\u0585\u0563\u0578\u057D\u057F\u0578\u057D\u056B_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort:
          "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split(
            "_"
          ),
        monthsShort:
          "\u0570\u0576\u057E_\u0583\u057F\u0580_\u0574\u0580\u057F_\u0561\u057A\u0580_\u0574\u0575\u057D_\u0570\u0576\u057D_\u0570\u056C\u057D_\u0585\u0563\u057D_\u057D\u057A\u057F_\u0570\u056F\u057F_\u0576\u0574\u0562_\u0564\u056F\u057F".split(
            "_"
          ),
        weekdaysMin:
          "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split(
            "_"
          ),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY \u0569.",
          LLL: "D MMMM YYYY \u0569., HH:mm",
          LLLL: "dddd, D MMMM YYYY \u0569., HH:mm",
        },
        relativeTime: {
          future: "%s \u0570\u0565\u057F\u0578",
          past: "%s \u0561\u057C\u0561\u057B",
          s: "\u0574\u056B \u0584\u0561\u0576\u056B \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576",
          m: "\u0580\u0578\u057A\u0565",
          mm: "%d \u0580\u0578\u057A\u0565",
          h: "\u056A\u0561\u0574",
          hh: "%d \u056A\u0561\u0574",
          d: "\u0585\u0580",
          dd: "%d \u0585\u0580",
          M: "\u0561\u0574\u056B\u057D",
          MM: "%d \u0561\u0574\u056B\u057D",
          y: "\u057F\u0561\u0580\u056B",
          yy: "%d \u057F\u0561\u0580\u056B",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var xn = b((ft, mt) => {
  ;(function (n, t) {
    typeof ft == "object" && typeof mt < "u"
      ? (mt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_id =
            t(n.dayjs))
  })(ft, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "id",
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        months:
          "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
            "_"
          ),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split(
          "_"
        ),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        weekStart: 1,
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [pukul] HH.mm",
          LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
        },
        relativeTime: {
          future: "dalam %s",
          past: "%s yang lalu",
          s: "beberapa detik",
          m: "semenit",
          mm: "%d menit",
          h: "sejam",
          hh: "%d jam",
          d: "sehari",
          dd: "%d hari",
          M: "sebulan",
          MM: "%d bulan",
          y: "setahun",
          yy: "%d tahun",
        },
        ordinal: function (e) {
          return e + "."
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Nn = b((ct, ht) => {
  ;(function (n, t) {
    typeof ct == "object" && typeof ht < "u"
      ? (ht.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_it =
            t(n.dayjs))
  })(ct, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "it",
        weekdays:
          "domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato".split(
            "_"
          ),
        weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
        weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
        months:
          "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split(
            "_"
          ),
        weekStart: 1,
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split(
          "_"
        ),
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "tra %s",
          past: "%s fa",
          s: "qualche secondo",
          m: "un minuto",
          mm: "%d minuti",
          h: "un' ora",
          hh: "%d ore",
          d: "un giorno",
          dd: "%d giorni",
          M: "un mese",
          MM: "%d mesi",
          y: "un anno",
          yy: "%d anni",
        },
        ordinal: function (e) {
          return e + "\xBA"
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var En = b((Mt, yt) => {
  ;(function (n, t) {
    typeof Mt == "object" && typeof yt < "u"
      ? (yt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ja =
            t(n.dayjs))
  })(Mt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "ja",
        weekdays:
          "\u65E5\u66DC\u65E5_\u6708\u66DC\u65E5_\u706B\u66DC\u65E5_\u6C34\u66DC\u65E5_\u6728\u66DC\u65E5_\u91D1\u66DC\u65E5_\u571F\u66DC\u65E5".split(
            "_"
          ),
        weekdaysShort: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split(
          "_"
        ),
        weekdaysMin: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split(
          "_"
        ),
        months:
          "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split(
            "_"
          ),
        monthsShort:
          "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split(
            "_"
          ),
        ordinal: function (e) {
          return e + "\u65E5"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY\u5E74M\u6708D\u65E5",
          LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
          LLLL: "YYYY\u5E74M\u6708D\u65E5 dddd HH:mm",
          l: "YYYY/MM/DD",
          ll: "YYYY\u5E74M\u6708D\u65E5",
          lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
          llll: "YYYY\u5E74M\u6708D\u65E5(ddd) HH:mm",
        },
        meridiem: function (e) {
          return e < 12 ? "\u5348\u524D" : "\u5348\u5F8C"
        },
        relativeTime: {
          future: "%s\u5F8C",
          past: "%s\u524D",
          s: "\u6570\u79D2",
          m: "1\u5206",
          mm: "%d\u5206",
          h: "1\u6642\u9593",
          hh: "%d\u6642\u9593",
          d: "1\u65E5",
          dd: "%d\u65E5",
          M: "1\u30F6\u6708",
          MM: "%d\u30F6\u6708",
          y: "1\u5E74",
          yy: "%d\u5E74",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Fn = b((Yt, pt) => {
  ;(function (n, t) {
    typeof Yt == "object" && typeof pt < "u"
      ? (pt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ka =
            t(n.dayjs))
  })(Yt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "ka",
        weekdays:
          "\u10D9\u10D5\u10D8\u10E0\u10D0_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8_\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8".split(
            "_"
          ),
        weekdaysShort:
          "\u10D9\u10D5\u10D8_\u10DD\u10E0\u10E8_\u10E1\u10D0\u10DB_\u10DD\u10D7\u10EE_\u10EE\u10E3\u10D7_\u10DE\u10D0\u10E0_\u10E8\u10D0\u10D1".split(
            "_"
          ),
        weekdaysMin:
          "\u10D9\u10D5_\u10DD\u10E0_\u10E1\u10D0_\u10DD\u10D7_\u10EE\u10E3_\u10DE\u10D0_\u10E8\u10D0".split(
            "_"
          ),
        months:
          "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8_\u10DB\u10D0\u10E0\u10E2\u10D8_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8_\u10DB\u10D0\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8".split(
            "_"
          ),
        monthsShort:
          "\u10D8\u10D0\u10DC_\u10D7\u10D4\u10D1_\u10DB\u10D0\u10E0_\u10D0\u10DE\u10E0_\u10DB\u10D0\u10D8_\u10D8\u10D5\u10DC_\u10D8\u10D5\u10DA_\u10D0\u10D2\u10D5_\u10E1\u10D4\u10E5_\u10DD\u10E5\u10E2_\u10DC\u10DD\u10D4_\u10D3\u10D4\u10D9".split(
            "_"
          ),
        weekStart: 1,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A",
        },
        relativeTime: {
          future: "%s \u10E8\u10D4\u10DB\u10D3\u10D4\u10D2",
          past: "%s \u10EC\u10D8\u10DC",
          s: "\u10EC\u10D0\u10DB\u10D8",
          m: "\u10EC\u10E3\u10D7\u10D8",
          mm: "%d \u10EC\u10E3\u10D7\u10D8",
          h: "\u10E1\u10D0\u10D0\u10D7\u10D8",
          hh: "%d \u10E1\u10D0\u10D0\u10D7\u10D8\u10E1",
          d: "\u10D3\u10E6\u10D4\u10E1",
          dd: "%d \u10D3\u10E6\u10D8\u10E1 \u10D2\u10D0\u10DC\u10DB\u10D0\u10D5\u10DA\u10DD\u10D1\u10D0\u10E8\u10D8",
          M: "\u10D7\u10D5\u10D8\u10E1",
          MM: "%d \u10D7\u10D5\u10D8\u10E1",
          y: "\u10EC\u10D4\u10DA\u10D8",
          yy: "%d \u10EC\u10DA\u10D8\u10E1",
        },
        ordinal: function (e) {
          return e
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Jn = b((Dt, Lt) => {
  ;(function (n, t) {
    typeof Dt == "object" && typeof Lt < "u"
      ? (Lt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_km =
            t(n.dayjs))
  })(Dt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "km",
        weekdays:
          "\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799_\u1785\u17D0\u1793\u17D2\u1791_\u17A2\u1784\u17D2\u1782\u17B6\u179A_\u1796\u17BB\u1792_\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD_\u179F\u17BB\u1780\u17D2\u179A_\u179F\u17C5\u179A\u17CD".split(
            "_"
          ),
        months:
          "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort:
          "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split(
            "_"
          ),
        monthsShort:
          "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split(
            "_"
          ),
        weekdaysMin:
          "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split(
            "_"
          ),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "%s\u1791\u17C0\u178F",
          past: "%s\u1798\u17BB\u1793",
          s: "\u1794\u17C9\u17BB\u1793\u17D2\u1798\u17B6\u1793\u179C\u17B7\u1793\u17B6\u1791\u17B8",
          m: "\u1798\u17BD\u1799\u1793\u17B6\u1791\u17B8",
          mm: "%d \u1793\u17B6\u1791\u17B8",
          h: "\u1798\u17BD\u1799\u1798\u17C9\u17C4\u1784",
          hh: "%d \u1798\u17C9\u17C4\u1784",
          d: "\u1798\u17BD\u1799\u1790\u17D2\u1784\u17C3",
          dd: "%d \u1790\u17D2\u1784\u17C3",
          M: "\u1798\u17BD\u1799\u1781\u17C2",
          MM: "%d \u1781\u17C2",
          y: "\u1798\u17BD\u1799\u1786\u17D2\u1793\u17B6\u17C6",
          yy: "%d \u1786\u17D2\u1793\u17B6\u17C6",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Un = b((vt, gt) => {
  ;(function (n, t) {
    typeof vt == "object" && typeof gt < "u"
      ? (gt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_lt =
            t(n.dayjs))
  })(vt, function (n) {
    "use strict"
    function t(o) {
      return o && typeof o == "object" && "default" in o ? o : { default: o }
    }
    var s = t(n),
      i =
        "sausio_vasario_kovo_baland\u017Eio_gegu\u017E\u0117s_bir\u017Eelio_liepos_rugpj\u016B\u010Dio_rugs\u0117jo_spalio_lapkri\u010Dio_gruod\u017Eio".split(
          "_"
        ),
      e =
        "sausis_vasaris_kovas_balandis_gegu\u017E\u0117_bir\u017Eelis_liepa_rugpj\u016Btis_rugs\u0117jis_spalis_lapkritis_gruodis".split(
          "_"
        ),
      a = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/,
      u = function (o, d) {
        return a.test(d) ? i[o.month()] : e[o.month()]
      }
    ;(u.s = e), (u.f = i)
    var r = {
      name: "lt",
      weekdays:
        "sekmadienis_pirmadienis_antradienis_tre\u010Diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split(
          "_"
        ),
      weekdaysShort: "sek_pir_ant_tre_ket_pen_\u0161e\u0161".split("_"),
      weekdaysMin: "s_p_a_t_k_pn_\u0161".split("_"),
      months: u,
      monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
      ordinal: function (o) {
        return o + "."
      },
      weekStart: 1,
      relativeTime: {
        future: "u\u017E %s",
        past: "prie\u0161 %s",
        s: "kelias sekundes",
        m: "minut\u0119",
        mm: "%d minutes",
        h: "valand\u0105",
        hh: "%d valandas",
        d: "dien\u0105",
        dd: "%d dienas",
        M: "m\u0117nes\u012F",
        MM: "%d m\u0117nesius",
        y: "metus",
        yy: "%d metus",
      },
      format: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]",
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]",
      },
    }
    return s.default.locale(r, null, !0), r
  })
})
var Pn = b((St, bt) => {
  ;(function (n, t) {
    typeof St == "object" && typeof bt < "u"
      ? (bt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_lv =
            t(n.dayjs))
  })(St, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "lv",
        weekdays:
          "sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split(
            "_"
          ),
        months:
          "janv\u0101ris_febru\u0101ris_marts_apr\u012Blis_maijs_j\u016Bnijs_j\u016Blijs_augusts_septembris_oktobris_novembris_decembris".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
        monthsShort:
          "jan_feb_mar_apr_mai_j\u016Bn_j\u016Bl_aug_sep_okt_nov_dec".split(
            "_"
          ),
        weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY.",
          LL: "YYYY. [gada] D. MMMM",
          LLL: "YYYY. [gada] D. MMMM, HH:mm",
          LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm",
        },
        relativeTime: {
          future: "p\u0113c %s",
          past: "pirms %s",
          s: "da\u017E\u0101m sekund\u0113m",
          m: "min\u016Btes",
          mm: "%d min\u016Bt\u0113m",
          h: "stundas",
          hh: "%d stund\u0101m",
          d: "dienas",
          dd: "%d dien\u0101m",
          M: "m\u0113ne\u0161a",
          MM: "%d m\u0113ne\u0161iem",
          y: "gada",
          yy: "%d gadiem",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Wn = b((kt, Ht) => {
  ;(function (n, t) {
    typeof kt == "object" && typeof Ht < "u"
      ? (Ht.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ms =
            t(n.dayjs))
  })(kt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "ms",
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        months:
          "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split(
          "_"
        ),
        weekStart: 1,
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH.mm",
          LLLL: "dddd, D MMMM YYYY HH.mm",
        },
        relativeTime: {
          future: "dalam %s",
          past: "%s yang lepas",
          s: "beberapa saat",
          m: "seminit",
          mm: "%d minit",
          h: "sejam",
          hh: "%d jam",
          d: "sehari",
          dd: "%d hari",
          M: "sebulan",
          MM: "%d bulan",
          y: "setahun",
          yy: "%d tahun",
        },
        ordinal: function (e) {
          return e + "."
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Rn = b((jt, Tt) => {
  ;(function (n, t) {
    typeof jt == "object" && typeof Tt < "u"
      ? (Tt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_my =
            t(n.dayjs))
  })(jt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "my",
        weekdays:
          "\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031_\u1010\u1014\u1004\u103A\u1039\u101C\u102C_\u1021\u1004\u103A\u1039\u1002\u102B_\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038_\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038_\u101E\u1031\u102C\u1000\u103C\u102C_\u1005\u1014\u1031".split(
            "_"
          ),
        months:
          "\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E_\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E_\u1019\u1010\u103A_\u1027\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u1007\u1030\u101C\u102D\u102F\u1004\u103A_\u101E\u103C\u1002\u102F\u1010\u103A_\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C_\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C_\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C_\u1012\u102E\u1007\u1004\u103A\u1018\u102C".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort:
          "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split(
            "_"
          ),
        monthsShort:
          "\u1007\u1014\u103A_\u1016\u1031_\u1019\u1010\u103A_\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u101C\u102D\u102F\u1004\u103A_\u101E\u103C_\u1005\u1000\u103A_\u1021\u1031\u102C\u1000\u103A_\u1014\u102D\u102F_\u1012\u102E".split(
            "_"
          ),
        weekdaysMin:
          "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split(
            "_"
          ),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "\u101C\u102C\u1019\u100A\u103A\u1037 %s \u1019\u103E\u102C",
          past: "\u101C\u103D\u1014\u103A\u1001\u1032\u1037\u101E\u1031\u102C %s \u1000",
          s: "\u1005\u1000\u1039\u1000\u1014\u103A.\u1021\u1014\u100A\u103A\u1038\u1004\u101A\u103A",
          m: "\u1010\u1005\u103A\u1019\u102D\u1014\u1005\u103A",
          mm: "%d \u1019\u102D\u1014\u1005\u103A",
          h: "\u1010\u1005\u103A\u1014\u102C\u101B\u102E",
          hh: "%d \u1014\u102C\u101B\u102E",
          d: "\u1010\u1005\u103A\u101B\u1000\u103A",
          dd: "%d \u101B\u1000\u103A",
          M: "\u1010\u1005\u103A\u101C",
          MM: "%d \u101C",
          y: "\u1010\u1005\u103A\u1014\u103E\u1005\u103A",
          yy: "%d \u1014\u103E\u1005\u103A",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Zn = b((wt, $t) => {
  ;(function (n, t) {
    typeof wt == "object" && typeof $t < "u"
      ? ($t.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_nl =
            t(n.dayjs))
  })(wt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "nl",
        weekdays:
          "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split(
            "_"
          ),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        months:
          "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
            "_"
          ),
        monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split(
          "_"
        ),
        ordinal: function (e) {
          return "[" + e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de") + "]"
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD-MM-YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "over %s",
          past: "%s geleden",
          s: "een paar seconden",
          m: "een minuut",
          mm: "%d minuten",
          h: "een uur",
          hh: "%d uur",
          d: "een dag",
          dd: "%d dagen",
          M: "een maand",
          MM: "%d maanden",
          y: "een jaar",
          yy: "%d jaar",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Vn = b((Ct, Ot) => {
  ;(function (n, t) {
    typeof Ct == "object" && typeof Ot < "u"
      ? (Ot.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_nb =
            t(n.dayjs))
  })(Ct, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "nb",
        weekdays:
          "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
        weekdaysShort: "s\xF8._ma._ti._on._to._fr._l\xF8.".split("_"),
        weekdaysMin: "s\xF8_ma_ti_on_to_fr_l\xF8".split("_"),
        months:
          "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
            "_"
          ),
        monthsShort:
          "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split(
            "_"
          ),
        ordinal: function (e) {
          return e + "."
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY [kl.] HH:mm",
          LLLL: "dddd D. MMMM YYYY [kl.] HH:mm",
        },
        relativeTime: {
          future: "om %s",
          past: "%s siden",
          s: "noen sekunder",
          m: "ett minutt",
          mm: "%d minutter",
          h: "en time",
          hh: "%d timer",
          d: "en dag",
          dd: "%d dager",
          M: "en m\xE5ned",
          MM: "%d m\xE5neder",
          y: "ett \xE5r",
          yy: "%d \xE5r",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Gn = b((zt, At) => {
  ;(function (n, t) {
    typeof zt == "object" && typeof At < "u"
      ? (At.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_pl =
            t(n.dayjs))
  })(zt, function (n) {
    "use strict"
    function t(l) {
      return l && typeof l == "object" && "default" in l ? l : { default: l }
    }
    var s = t(n)
    function i(l) {
      return l % 10 < 5 && l % 10 > 1 && ~~(l / 10) % 10 != 1
    }
    function e(l, y, f) {
      var _ = l + " "
      switch (f) {
        case "m":
          return y ? "minuta" : "minut\u0119"
        case "mm":
          return _ + (i(l) ? "minuty" : "minut")
        case "h":
          return y ? "godzina" : "godzin\u0119"
        case "hh":
          return _ + (i(l) ? "godziny" : "godzin")
        case "MM":
          return _ + (i(l) ? "miesi\u0105ce" : "miesi\u0119cy")
        case "yy":
          return _ + (i(l) ? "lata" : "lat")
      }
    }
    var a =
        "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015Bnia_pa\u017Adziernika_listopada_grudnia".split(
          "_"
        ),
      u =
        "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017Adziernik_listopad_grudzie\u0144".split(
          "_"
        ),
      r = /D MMMM/,
      o = function (l, y) {
        return r.test(y) ? a[l.month()] : u[l.month()]
      }
    ;(o.s = u), (o.f = a)
    var d = {
      name: "pl",
      weekdays:
        "niedziela_poniedzia\u0142ek_wtorek_\u015Broda_czwartek_pi\u0105tek_sobota".split(
          "_"
        ),
      weekdaysShort: "ndz_pon_wt_\u015Br_czw_pt_sob".split("_"),
      weekdaysMin: "Nd_Pn_Wt_\u015Ar_Cz_Pt_So".split("_"),
      months: o,
      monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017A_lis_gru".split(
        "_"
      ),
      ordinal: function (l) {
        return l + "."
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "za %s",
        past: "%s temu",
        s: "kilka sekund",
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: "1 dzie\u0144",
        dd: "%d dni",
        M: "miesi\u0105c",
        MM: e,
        y: "rok",
        yy: e,
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm",
      },
    }
    return s.default.locale(d, null, !0), d
  })
})
var Kn = b((It, qt) => {
  ;(function (n, t) {
    typeof It == "object" && typeof qt < "u"
      ? (qt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_locale_pt_br = t(n.dayjs))
  })(It, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "pt-br",
        weekdays:
          "domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado".split(
            "_"
          ),
        weekdaysShort: "dom_seg_ter_qua_qui_sex_s\xE1b".split("_"),
        weekdaysMin: "Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_S\xE1".split("_"),
        months:
          "janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
            "_"
          ),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split(
          "_"
        ),
        ordinal: function (e) {
          return e + "\xBA"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY [\xE0s] HH:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm",
        },
        relativeTime: {
          future: "em %s",
          past: "h\xE1 %s",
          s: "poucos segundos",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: "um dia",
          dd: "%d dias",
          M: "um m\xEAs",
          MM: "%d meses",
          y: "um ano",
          yy: "%d anos",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Bn = b((xt, Nt) => {
  ;(function (n, t) {
    typeof xt == "object" && typeof Nt < "u"
      ? (Nt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_pt =
            t(n.dayjs))
  })(xt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "pt",
        weekdays:
          "domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado".split(
            "_"
          ),
        weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"),
        weekdaysMin: "Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_Sa".split("_"),
        months:
          "janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
            "_"
          ),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split(
          "_"
        ),
        ordinal: function (e) {
          return e + "\xBA"
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY [\xE0s] HH:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm",
        },
        relativeTime: {
          future: "em %s",
          past: "h\xE1 %s",
          s: "alguns segundos",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: "um dia",
          dd: "%d dias",
          M: "um m\xEAs",
          MM: "%d meses",
          y: "um ano",
          yy: "%d anos",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Xn = b((Et, Ft) => {
  ;(function (n, t) {
    typeof Et == "object" && typeof Ft < "u"
      ? (Ft.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ro =
            t(n.dayjs))
  })(Et, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "ro",
        weekdays:
          "Duminic\u0103_Luni_Mar\u021Bi_Miercuri_Joi_Vineri_S\xE2mb\u0103t\u0103".split(
            "_"
          ),
        weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_S\xE2m".split("_"),
        weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_S\xE2".split("_"),
        months:
          "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split(
            "_"
          ),
        monthsShort:
          "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split(
            "_"
          ),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY H:mm",
          LLLL: "dddd, D MMMM YYYY H:mm",
        },
        relativeTime: {
          future: "peste %s",
          past: "acum %s",
          s: "c\xE2teva secunde",
          m: "un minut",
          mm: "%d minute",
          h: "o or\u0103",
          hh: "%d ore",
          d: "o zi",
          dd: "%d zile",
          M: "o lun\u0103",
          MM: "%d luni",
          y: "un an",
          yy: "%d ani",
        },
        ordinal: function (e) {
          return e
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var Qn = b((Jt, Ut) => {
  ;(function (n, t) {
    typeof Jt == "object" && typeof Ut < "u"
      ? (Ut.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_ru =
            t(n.dayjs))
  })(Jt, function (n) {
    "use strict"
    function t(f) {
      return f && typeof f == "object" && "default" in f ? f : { default: f }
    }
    var s = t(n),
      i =
        "\u044F\u043D\u0432\u0430\u0440\u044F_\u0444\u0435\u0432\u0440\u0430\u043B\u044F_\u043C\u0430\u0440\u0442\u0430_\u0430\u043F\u0440\u0435\u043B\u044F_\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F_\u043E\u043A\u0442\u044F\u0431\u0440\u044F_\u043D\u043E\u044F\u0431\u0440\u044F_\u0434\u0435\u043A\u0430\u0431\u0440\u044F".split(
          "_"
        ),
      e =
        "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split(
          "_"
        ),
      a =
        "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split(
          "_"
        ),
      u =
        "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440\u0442_\u0430\u043F\u0440._\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split(
          "_"
        ),
      r = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
    function o(f, _, h) {
      var D, p
      return h === "m"
        ? _
          ? "\u043C\u0438\u043D\u0443\u0442\u0430"
          : "\u043C\u0438\u043D\u0443\u0442\u0443"
        : f +
            " " +
            ((D = +f),
            (p = {
              mm: _
                ? "\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442"
                : "\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442",
              hh: "\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432",
              dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439",
              MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432",
              yy: "\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442",
            }[h].split("_")),
            D % 10 == 1 && D % 100 != 11
              ? p[0]
              : D % 10 >= 2 && D % 10 <= 4 && (D % 100 < 10 || D % 100 >= 20)
                ? p[1]
                : p[2])
    }
    var d = function (f, _) {
      return r.test(_) ? i[f.month()] : e[f.month()]
    }
    ;(d.s = e), (d.f = i)
    var l = function (f, _) {
      return r.test(_) ? a[f.month()] : u[f.month()]
    }
    ;(l.s = u), (l.f = a)
    var y = {
      name: "ru",
      weekdays:
        "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043E\u0442\u0430".split(
          "_"
        ),
      weekdaysShort:
        "\u0432\u0441\u043A_\u043F\u043D\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043F\u0442\u043D_\u0441\u0431\u0442".split(
          "_"
        ),
      weekdaysMin:
        "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split(
          "_"
        ),
      months: d,
      monthsShort: l,
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0433.",
        LLL: "D MMMM YYYY \u0433., H:mm",
        LLLL: "dddd, D MMMM YYYY \u0433., H:mm",
      },
      relativeTime: {
        future: "\u0447\u0435\u0440\u0435\u0437 %s",
        past: "%s \u043D\u0430\u0437\u0430\u0434",
        s: "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434",
        m: o,
        mm: o,
        h: "\u0447\u0430\u0441",
        hh: o,
        d: "\u0434\u0435\u043D\u044C",
        dd: o,
        M: "\u043C\u0435\u0441\u044F\u0446",
        MM: o,
        y: "\u0433\u043E\u0434",
        yy: o,
      },
      ordinal: function (f) {
        return f
      },
      meridiem: function (f) {
        return f < 4
          ? "\u043D\u043E\u0447\u0438"
          : f < 12
            ? "\u0443\u0442\u0440\u0430"
            : f < 17
              ? "\u0434\u043D\u044F"
              : "\u0432\u0435\u0447\u0435\u0440\u0430"
      },
    }
    return s.default.locale(y, null, !0), y
  })
})
var ei = b((Pt, Wt) => {
  ;(function (n, t) {
    typeof Pt == "object" && typeof Wt < "u"
      ? (Wt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_sv =
            t(n.dayjs))
  })(Pt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "sv",
        weekdays:
          "s\xF6ndag_m\xE5ndag_tisdag_onsdag_torsdag_fredag_l\xF6rdag".split(
            "_"
          ),
        weekdaysShort: "s\xF6n_m\xE5n_tis_ons_tor_fre_l\xF6r".split("_"),
        weekdaysMin: "s\xF6_m\xE5_ti_on_to_fr_l\xF6".split("_"),
        months:
          "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split(
            "_"
          ),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split(
          "_"
        ),
        weekStart: 1,
        yearStart: 4,
        ordinal: function (e) {
          var a = e % 10
          return "[" + e + (a === 1 || a === 2 ? "a" : "e") + "]"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY-MM-DD",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [kl.] HH:mm",
          LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
          lll: "D MMM YYYY HH:mm",
          llll: "ddd D MMM YYYY HH:mm",
        },
        relativeTime: {
          future: "om %s",
          past: "f\xF6r %s sedan",
          s: "n\xE5gra sekunder",
          m: "en minut",
          mm: "%d minuter",
          h: "en timme",
          hh: "%d timmar",
          d: "en dag",
          dd: "%d dagar",
          M: "en m\xE5nad",
          MM: "%d m\xE5nader",
          y: "ett \xE5r",
          yy: "%d \xE5r",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var ti = b((Rt, Zt) => {
  ;(function (n, t) {
    typeof Rt == "object" && typeof Zt < "u"
      ? (Zt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_tr =
            t(n.dayjs))
  })(Rt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "tr",
        weekdays:
          "Pazar_Pazartesi_Sal\u0131_\xC7ar\u015Famba_Per\u015Fembe_Cuma_Cumartesi".split(
            "_"
          ),
        weekdaysShort: "Paz_Pts_Sal_\xC7ar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_\xC7a_Pe_Cu_Ct".split("_"),
        months:
          "Ocak_\u015Eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011Fustos_Eyl\xFCl_Ekim_Kas\u0131m_Aral\u0131k".split(
            "_"
          ),
        monthsShort:
          "Oca_\u015Eub_Mar_Nis_May_Haz_Tem_A\u011Fu_Eyl_Eki_Kas_Ara".split(
            "_"
          ),
        weekStart: 1,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        relativeTime: {
          future: "%s sonra",
          past: "%s \xF6nce",
          s: "birka\xE7 saniye",
          m: "bir dakika",
          mm: "%d dakika",
          h: "bir saat",
          hh: "%d saat",
          d: "bir g\xFCn",
          dd: "%d g\xFCn",
          M: "bir ay",
          MM: "%d ay",
          y: "bir y\u0131l",
          yy: "%d y\u0131l",
        },
        ordinal: function (e) {
          return e + "."
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var ni = b((Vt, Gt) => {
  ;(function (n, t) {
    typeof Vt == "object" && typeof Gt < "u"
      ? (Gt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_uk =
            t(n.dayjs))
  })(Vt, function (n) {
    "use strict"
    function t(d) {
      return d && typeof d == "object" && "default" in d ? d : { default: d }
    }
    var s = t(n),
      i =
        "\u0441\u0456\u0447\u043D\u044F_\u043B\u044E\u0442\u043E\u0433\u043E_\u0431\u0435\u0440\u0435\u0437\u043D\u044F_\u043A\u0432\u0456\u0442\u043D\u044F_\u0442\u0440\u0430\u0432\u043D\u044F_\u0447\u0435\u0440\u0432\u043D\u044F_\u043B\u0438\u043F\u043D\u044F_\u0441\u0435\u0440\u043F\u043D\u044F_\u0432\u0435\u0440\u0435\u0441\u043D\u044F_\u0436\u043E\u0432\u0442\u043D\u044F_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043D\u044F".split(
          "_"
        ),
      e =
        "\u0441\u0456\u0447\u0435\u043D\u044C_\u043B\u044E\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C_\u043A\u0432\u0456\u0442\u0435\u043D\u044C_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u0435\u0440\u0432\u0435\u043D\u044C_\u043B\u0438\u043F\u0435\u043D\u044C_\u0441\u0435\u0440\u043F\u0435\u043D\u044C_\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C_\u0436\u043E\u0432\u0442\u0435\u043D\u044C_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043D\u044C".split(
          "_"
        ),
      a = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
    function u(d, l, y) {
      var f, _
      return y === "m"
        ? l
          ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430"
          : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443"
        : y === "h"
          ? l
            ? "\u0433\u043E\u0434\u0438\u043D\u0430"
            : "\u0433\u043E\u0434\u0438\u043D\u0443"
          : d +
            " " +
            ((f = +d),
            (_ = {
              ss: l
                ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434"
                : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434",
              mm: l
                ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D"
                : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D",
              hh: l
                ? "\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D"
                : "\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D",
              dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432",
              MM: "\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432",
              yy: "\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432",
            }[y].split("_")),
            f % 10 == 1 && f % 100 != 11
              ? _[0]
              : f % 10 >= 2 && f % 10 <= 4 && (f % 100 < 10 || f % 100 >= 20)
                ? _[1]
                : _[2])
    }
    var r = function (d, l) {
      return a.test(l) ? i[d.month()] : e[d.month()]
    }
    ;(r.s = e), (r.f = i)
    var o = {
      name: "uk",
      weekdays:
        "\u043D\u0435\u0434\u0456\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F_\u0441\u0443\u0431\u043E\u0442\u0430".split(
          "_"
        ),
      weekdaysShort:
        "\u043D\u0434\u043B_\u043F\u043D\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043F\u0442\u043D_\u0441\u0431\u0442".split(
          "_"
        ),
      weekdaysMin:
        "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split(
          "_"
        ),
      months: r,
      monthsShort:
        "\u0441\u0456\u0447_\u043B\u044E\u0442_\u0431\u0435\u0440_\u043A\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043B\u0438\u043F_\u0441\u0435\u0440\u043F_\u0432\u0435\u0440_\u0436\u043E\u0432\u0442_\u043B\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split(
          "_"
        ),
      weekStart: 1,
      relativeTime: {
        future: "\u0437\u0430 %s",
        past: "%s \u0442\u043E\u043C\u0443",
        s: "\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434",
        m: u,
        mm: u,
        h: u,
        hh: u,
        d: "\u0434\u0435\u043D\u044C",
        dd: u,
        M: "\u043C\u0456\u0441\u044F\u0446\u044C",
        MM: u,
        y: "\u0440\u0456\u043A",
        yy: u,
      },
      ordinal: function (d) {
        return d
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0440.",
        LLL: "D MMMM YYYY \u0440., HH:mm",
        LLLL: "dddd, D MMMM YYYY \u0440., HH:mm",
      },
    }
    return s.default.locale(o, null, !0), o
  })
})
var ii = b((Kt, Bt) => {
  ;(function (n, t) {
    typeof Kt == "object" && typeof Bt < "u"
      ? (Bt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_vi =
            t(n.dayjs))
  })(Kt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "vi",
        weekdays:
          "ch\u1EE7 nh\u1EADt_th\u1EE9 hai_th\u1EE9 ba_th\u1EE9 t\u01B0_th\u1EE9 n\u0103m_th\u1EE9 s\xE1u_th\u1EE9 b\u1EA3y".split(
            "_"
          ),
        months:
          "th\xE1ng 1_th\xE1ng 2_th\xE1ng 3_th\xE1ng 4_th\xE1ng 5_th\xE1ng 6_th\xE1ng 7_th\xE1ng 8_th\xE1ng 9_th\xE1ng 10_th\xE1ng 11_th\xE1ng 12".split(
            "_"
          ),
        weekStart: 1,
        weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        monthsShort:
          "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split(
            "_"
          ),
        weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        ordinal: function (e) {
          return e
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM [n\u0103m] YYYY",
          LLL: "D MMMM [n\u0103m] YYYY HH:mm",
          LLLL: "dddd, D MMMM [n\u0103m] YYYY HH:mm",
          l: "DD/M/YYYY",
          ll: "D MMM YYYY",
          lll: "D MMM YYYY HH:mm",
          llll: "ddd, D MMM YYYY HH:mm",
        },
        relativeTime: {
          future: "%s t\u1EDBi",
          past: "%s tr\u01B0\u1EDBc",
          s: "v\xE0i gi\xE2y",
          m: "m\u1ED9t ph\xFAt",
          mm: "%d ph\xFAt",
          h: "m\u1ED9t gi\u1EDD",
          hh: "%d gi\u1EDD",
          d: "m\u1ED9t ng\xE0y",
          dd: "%d ng\xE0y",
          M: "m\u1ED9t th\xE1ng",
          MM: "%d th\xE1ng",
          y: "m\u1ED9t n\u0103m",
          yy: "%d n\u0103m",
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var si = b((Xt, Qt) => {
  ;(function (n, t) {
    typeof Xt == "object" && typeof Qt < "u"
      ? (Qt.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_locale_zh_cn = t(n.dayjs))
  })(Xt, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "zh-cn",
        weekdays:
          "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split(
            "_"
          ),
        weekdaysShort:
          "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split(
            "_"
          ),
        weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split(
          "_"
        ),
        months:
          "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split(
            "_"
          ),
        monthsShort:
          "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split(
            "_"
          ),
        ordinal: function (e, a) {
          return a === "W" ? e + "\u5468" : e + "\u65E5"
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY\u5E74M\u6708D\u65E5",
          LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
          LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
          l: "YYYY/M/D",
          ll: "YYYY\u5E74M\u6708D\u65E5",
          lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
          llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
        },
        relativeTime: {
          future: "%s\u5185",
          past: "%s\u524D",
          s: "\u51E0\u79D2",
          m: "1 \u5206\u949F",
          mm: "%d \u5206\u949F",
          h: "1 \u5C0F\u65F6",
          hh: "%d \u5C0F\u65F6",
          d: "1 \u5929",
          dd: "%d \u5929",
          M: "1 \u4E2A\u6708",
          MM: "%d \u4E2A\u6708",
          y: "1 \u5E74",
          yy: "%d \u5E74",
        },
        meridiem: function (e, a) {
          var u = 100 * e + a
          return u < 600
            ? "\u51CC\u6668"
            : u < 900
              ? "\u65E9\u4E0A"
              : u < 1100
                ? "\u4E0A\u5348"
                : u < 1300
                  ? "\u4E2D\u5348"
                  : u < 1800
                    ? "\u4E0B\u5348"
                    : "\u665A\u4E0A"
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var ri = b((en, tn) => {
  ;(function (n, t) {
    typeof en == "object" && typeof tn < "u"
      ? (tn.exports = t(j()))
      : typeof define == "function" && define.amd
        ? define(["dayjs"], t)
        : ((n =
            typeof globalThis < "u"
              ? globalThis
              : n || self).dayjs_locale_zh_tw = t(n.dayjs))
  })(en, function (n) {
    "use strict"
    function t(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e }
    }
    var s = t(n),
      i = {
        name: "zh-tw",
        weekdays:
          "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split(
            "_"
          ),
        weekdaysShort:
          "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split(
            "_"
          ),
        weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split(
          "_"
        ),
        months:
          "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split(
            "_"
          ),
        monthsShort:
          "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split(
            "_"
          ),
        ordinal: function (e, a) {
          return a === "W" ? e + "\u9031" : e + "\u65E5"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY\u5E74M\u6708D\u65E5",
          LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
          LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
          l: "YYYY/M/D",
          ll: "YYYY\u5E74M\u6708D\u65E5",
          lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
          llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
        },
        relativeTime: {
          future: "%s\u5167",
          past: "%s\u524D",
          s: "\u5E7E\u79D2",
          m: "1 \u5206\u9418",
          mm: "%d \u5206\u9418",
          h: "1 \u5C0F\u6642",
          hh: "%d \u5C0F\u6642",
          d: "1 \u5929",
          dd: "%d \u5929",
          M: "1 \u500B\u6708",
          MM: "%d \u500B\u6708",
          y: "1 \u5E74",
          yy: "%d \u5E74",
        },
        meridiem: function (e, a) {
          var u = 100 * e + a
          return u < 600
            ? "\u51CC\u6668"
            : u < 900
              ? "\u65E9\u4E0A"
              : u < 1100
                ? "\u4E0A\u5348"
                : u < 1300
                  ? "\u4E2D\u5348"
                  : u < 1800
                    ? "\u4E0B\u5348"
                    : "\u665A\u4E0A"
        },
      }
    return s.default.locale(i, null, !0), i
  })
})
var sn = 60,
  rn = sn * 60,
  an = rn * 24,
  yi = an * 7,
  ae = 1e3,
  fe = sn * ae,
  pe = rn * ae,
  un = an * ae,
  on = yi * ae,
  de = "millisecond",
  ne = "second",
  ie = "minute",
  se = "hour",
  K = "day",
  oe = "week",
  R = "month",
  me = "quarter",
  B = "year",
  re = "date",
  dn = "YYYY-MM-DDTHH:mm:ssZ",
  De = "Invalid Date",
  _n =
    /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
  ln =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
var mn = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
    "_"
  ),
  months:
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
  ordinal: function (t) {
    var s = ["th", "st", "nd", "rd"],
      i = t % 100
    return "[" + t + (s[(i - 20) % 10] || s[i] || s[0]) + "]"
  },
}
var Le = function (t, s, i) {
    var e = String(t)
    return !e || e.length >= s ? t : "" + Array(s + 1 - e.length).join(i) + t
  },
  Yi = function (t) {
    var s = -t.utcOffset(),
      i = Math.abs(s),
      e = Math.floor(i / 60),
      a = i % 60
    return (s <= 0 ? "+" : "-") + Le(e, 2, "0") + ":" + Le(a, 2, "0")
  },
  pi = function n(t, s) {
    if (t.date() < s.date()) return -n(s, t)
    var i = (s.year() - t.year()) * 12 + (s.month() - t.month()),
      e = t.clone().add(i, R),
      a = s - e < 0,
      u = t.clone().add(i + (a ? -1 : 1), R)
    return +(-(i + (s - e) / (a ? e - u : u - e)) || 0)
  },
  Di = function (t) {
    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
  },
  Li = function (t) {
    var s = {
      M: R,
      y: B,
      w: oe,
      d: K,
      D: re,
      h: se,
      m: ie,
      s: ne,
      ms: de,
      Q: me,
    }
    return (
      s[t] ||
      String(t || "")
        .toLowerCase()
        .replace(/s$/, "")
    )
  },
  vi = function (t) {
    return t === void 0
  },
  cn = { s: Le, z: Yi, m: pi, a: Di, p: Li, u: vi }
var _e = "en",
  ue = {}
ue[_e] = mn
var hn = "$isDayjsObject",
  ve = function (t) {
    return t instanceof he || !!(t && t[hn])
  },
  ce = function n(t, s, i) {
    var e
    if (!t) return _e
    if (typeof t == "string") {
      var a = t.toLowerCase()
      ue[a] && (e = a), s && ((ue[a] = s), (e = a))
      var u = t.split("-")
      if (!e && u.length > 1) return n(u[0])
    } else {
      var r = t.name
      ;(ue[r] = t), (e = r)
    }
    return !i && e && (_e = e), e || (!i && _e)
  },
  J = function (t, s) {
    if (ve(t)) return t.clone()
    var i = typeof s == "object" ? s : {}
    return (i.date = t), (i.args = arguments), new he(i)
  },
  gi = function (t, s) {
    return J(t, { locale: s.$L, utc: s.$u, x: s.$x, $offset: s.$offset })
  },
  z = cn
z.l = ce
z.i = ve
z.w = gi
var Si = function (t) {
    var s = t.date,
      i = t.utc
    if (s === null) return new Date(NaN)
    if (z.u(s)) return new Date()
    if (s instanceof Date) return new Date(s)
    if (typeof s == "string" && !/Z$/i.test(s)) {
      var e = s.match(_n)
      if (e) {
        var a = e[2] - 1 || 0,
          u = (e[7] || "0").substring(0, 3)
        return i
          ? new Date(
              Date.UTC(e[1], a, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, u)
            )
          : new Date(e[1], a, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, u)
      }
    }
    return new Date(s)
  },
  he = (function () {
    function n(s) {
      ;(this.$L = ce(s.locale, null, !0)),
        this.parse(s),
        (this.$x = this.$x || s.x || {}),
        (this[hn] = !0)
    }
    var t = n.prototype
    return (
      (t.parse = function (i) {
        ;(this.$d = Si(i)), this.init()
      }),
      (t.init = function () {
        var i = this.$d
        ;(this.$y = i.getFullYear()),
          (this.$M = i.getMonth()),
          (this.$D = i.getDate()),
          (this.$W = i.getDay()),
          (this.$H = i.getHours()),
          (this.$m = i.getMinutes()),
          (this.$s = i.getSeconds()),
          (this.$ms = i.getMilliseconds())
      }),
      (t.$utils = function () {
        return z
      }),
      (t.isValid = function () {
        return this.$d.toString() !== De
      }),
      (t.isSame = function (i, e) {
        var a = J(i)
        return this.startOf(e) <= a && a <= this.endOf(e)
      }),
      (t.isAfter = function (i, e) {
        return J(i) < this.startOf(e)
      }),
      (t.isBefore = function (i, e) {
        return this.endOf(e) < J(i)
      }),
      (t.$g = function (i, e, a) {
        return z.u(i) ? this[e] : this.set(a, i)
      }),
      (t.unix = function () {
        return Math.floor(this.valueOf() / 1e3)
      }),
      (t.valueOf = function () {
        return this.$d.getTime()
      }),
      (t.startOf = function (i, e) {
        var a = this,
          u = z.u(e) ? !0 : e,
          r = z.p(i),
          o = function (k, T) {
            var S = z.w(a.$u ? Date.UTC(a.$y, T, k) : new Date(a.$y, T, k), a)
            return u ? S : S.endOf(K)
          },
          d = function (k, T) {
            var S = [0, 0, 0, 0],
              $ = [23, 59, 59, 999]
            return z.w(
              a.toDate()[k].apply(a.toDate("s"), (u ? S : $).slice(T)),
              a
            )
          },
          l = this.$W,
          y = this.$M,
          f = this.$D,
          _ = "set" + (this.$u ? "UTC" : "")
        switch (r) {
          case B:
            return u ? o(1, 0) : o(31, 11)
          case R:
            return u ? o(1, y) : o(0, y + 1)
          case oe: {
            var h = this.$locale().weekStart || 0,
              D = (l < h ? l + 7 : l) - h
            return o(u ? f - D : f + (6 - D), y)
          }
          case K:
          case re:
            return d(_ + "Hours", 0)
          case se:
            return d(_ + "Minutes", 1)
          case ie:
            return d(_ + "Seconds", 2)
          case ne:
            return d(_ + "Milliseconds", 3)
          default:
            return this.clone()
        }
      }),
      (t.endOf = function (i) {
        return this.startOf(i, !1)
      }),
      (t.$set = function (i, e) {
        var a,
          u = z.p(i),
          r = "set" + (this.$u ? "UTC" : ""),
          o = ((a = {}),
          (a[K] = r + "Date"),
          (a[re] = r + "Date"),
          (a[R] = r + "Month"),
          (a[B] = r + "FullYear"),
          (a[se] = r + "Hours"),
          (a[ie] = r + "Minutes"),
          (a[ne] = r + "Seconds"),
          (a[de] = r + "Milliseconds"),
          a)[u],
          d = u === K ? this.$D + (e - this.$W) : e
        if (u === R || u === B) {
          var l = this.clone().set(re, 1)
          l.$d[o](d),
            l.init(),
            (this.$d = l.set(re, Math.min(this.$D, l.daysInMonth())).$d)
        } else o && this.$d[o](d)
        return this.init(), this
      }),
      (t.set = function (i, e) {
        return this.clone().$set(i, e)
      }),
      (t.get = function (i) {
        return this[z.p(i)]()
      }),
      (t.add = function (i, e) {
        var a = this,
          u
        i = Number(i)
        var r = z.p(e),
          o = function (f) {
            var _ = J(a)
            return z.w(_.date(_.date() + Math.round(f * i)), a)
          }
        if (r === R) return this.set(R, this.$M + i)
        if (r === B) return this.set(B, this.$y + i)
        if (r === K) return o(1)
        if (r === oe) return o(7)
        var d = ((u = {}), (u[ie] = fe), (u[se] = pe), (u[ne] = ae), u)[r] || 1,
          l = this.$d.getTime() + i * d
        return z.w(l, this)
      }),
      (t.subtract = function (i, e) {
        return this.add(i * -1, e)
      }),
      (t.format = function (i) {
        var e = this,
          a = this.$locale()
        if (!this.isValid()) return a.invalidDate || De
        var u = i || dn,
          r = z.z(this),
          o = this.$H,
          d = this.$m,
          l = this.$M,
          y = a.weekdays,
          f = a.months,
          _ = a.meridiem,
          h = function (S, $, O, I) {
            return (S && (S[$] || S(e, u))) || O[$].slice(0, I)
          },
          D = function (S) {
            return z.s(o % 12 || 12, S, "0")
          },
          p =
            _ ||
            function (T, S, $) {
              var O = T < 12 ? "AM" : "PM"
              return $ ? O.toLowerCase() : O
            },
          k = function (S) {
            switch (S) {
              case "YY":
                return String(e.$y).slice(-2)
              case "YYYY":
                return z.s(e.$y, 4, "0")
              case "M":
                return l + 1
              case "MM":
                return z.s(l + 1, 2, "0")
              case "MMM":
                return h(a.monthsShort, l, f, 3)
              case "MMMM":
                return h(f, l)
              case "D":
                return e.$D
              case "DD":
                return z.s(e.$D, 2, "0")
              case "d":
                return String(e.$W)
              case "dd":
                return h(a.weekdaysMin, e.$W, y, 2)
              case "ddd":
                return h(a.weekdaysShort, e.$W, y, 3)
              case "dddd":
                return y[e.$W]
              case "H":
                return String(o)
              case "HH":
                return z.s(o, 2, "0")
              case "h":
                return D(1)
              case "hh":
                return D(2)
              case "a":
                return p(o, d, !0)
              case "A":
                return p(o, d, !1)
              case "m":
                return String(d)
              case "mm":
                return z.s(d, 2, "0")
              case "s":
                return String(e.$s)
              case "ss":
                return z.s(e.$s, 2, "0")
              case "SSS":
                return z.s(e.$ms, 3, "0")
              case "Z":
                return r
              default:
                break
            }
            return null
          }
        return u.replace(ln, function (T, S) {
          return S || k(T) || r.replace(":", "")
        })
      }),
      (t.utcOffset = function () {
        return -Math.round(this.$d.getTimezoneOffset() / 15) * 15
      }),
      (t.diff = function (i, e, a) {
        var u = this,
          r = z.p(e),
          o = J(i),
          d = (o.utcOffset() - this.utcOffset()) * fe,
          l = this - o,
          y = function () {
            return z.m(u, o)
          },
          f
        switch (r) {
          case B:
            f = y() / 12
            break
          case R:
            f = y()
            break
          case me:
            f = y() / 3
            break
          case oe:
            f = (l - d) / on
            break
          case K:
            f = (l - d) / un
            break
          case se:
            f = l / pe
            break
          case ie:
            f = l / fe
            break
          case ne:
            f = l / ae
            break
          default:
            f = l
            break
        }
        return a ? f : z.a(f)
      }),
      (t.daysInMonth = function () {
        return this.endOf(R).$D
      }),
      (t.$locale = function () {
        return ue[this.$L]
      }),
      (t.locale = function (i, e) {
        if (!i) return this.$L
        var a = this.clone(),
          u = ce(i, e, !0)
        return u && (a.$L = u), a
      }),
      (t.clone = function () {
        return z.w(this.$d, this)
      }),
      (t.toDate = function () {
        return new Date(this.valueOf())
      }),
      (t.toJSON = function () {
        return this.isValid() ? this.toISOString() : null
      }),
      (t.toISOString = function () {
        return this.$d.toISOString()
      }),
      (t.toString = function () {
        return this.$d.toUTCString()
      }),
      n
    )
  })(),
  Mn = he.prototype
J.prototype = Mn
;[
  ["$ms", de],
  ["$s", ne],
  ["$m", ie],
  ["$H", se],
  ["$W", K],
  ["$M", R],
  ["$y", B],
  ["$D", re],
].forEach(function (n) {
  Mn[n[1]] = function (t) {
    return this.$g(t, n[0], n[1])
  }
})
J.extend = function (n, t) {
  return n.$i || (n(t, he, J), (n.$i = !0)), J
}
J.locale = ce
J.isDayjs = ve
J.unix = function (n) {
  return J(n * 1e3)
}
J.en = ue[_e]
J.Ls = ue
J.p = {}
var A = J
var ui = le(yn(), 1),
  oi = le(Yn(), 1),
  di = le(pn(), 1),
  _i = le(Dn(), 1)
A.extend(ui.default)
A.extend(oi.default)
A.extend(di.default)
A.extend(_i.default)
window.dayjs = A
function bi({
  displayFormat: n,
  firstDayOfWeek: t,
  isAutofocused: s,
  locale: i,
  shouldCloseOnDateSelection: e,
  state: a,
}) {
  let u = A.tz.guess()
  return {
    daysInFocusedMonth: [],
    displayText: "",
    emptyDaysInFocusedMonth: [],
    focusedDate: null,
    focusedMonth: null,
    focusedYear: null,
    hour: null,
    isClearingState: !1,
    minute: null,
    second: null,
    state: a,
    dayLabels: [],
    months: [],
    init: function () {
      A.locale(ai[i] ?? ai.en), (this.focusedDate = A().tz(u))
      let r = this.getSelectedDate() ?? A().tz(u).hour(0).minute(0).second(0)
      ;((this.getMaxDate() !== null && r.isAfter(this.getMaxDate())) ||
        (this.getMinDate() !== null && r.isBefore(this.getMinDate()))) &&
        (r = null),
        (this.hour = r?.hour() ?? 0),
        (this.minute = r?.minute() ?? 0),
        (this.second = r?.second() ?? 0),
        this.setDisplayText(),
        this.setMonths(),
        this.setDayLabels(),
        s &&
          this.$nextTick(() => this.togglePanelVisibility(this.$refs.button)),
        this.$watch("focusedMonth", () => {
          ;(this.focusedMonth = +this.focusedMonth),
            this.focusedDate.month() !== this.focusedMonth &&
              (this.focusedDate = this.focusedDate.month(this.focusedMonth))
        }),
        this.$watch("focusedYear", () => {
          if (
            (this.focusedYear?.length > 4 &&
              (this.focusedYear = this.focusedYear.substring(0, 4)),
            !this.focusedYear || this.focusedYear?.length !== 4)
          )
            return
          let o = +this.focusedYear
          Number.isInteger(o) ||
            ((o = A().tz(u).year()), (this.focusedYear = o)),
            this.focusedDate.year() !== o &&
              (this.focusedDate = this.focusedDate.year(o))
        }),
        this.$watch("focusedDate", () => {
          let o = this.focusedDate.month(),
            d = this.focusedDate.year()
          this.focusedMonth !== o && (this.focusedMonth = o),
            this.focusedYear !== d && (this.focusedYear = d),
            this.setupDaysGrid()
        }),
        this.$watch("hour", () => {
          let o = +this.hour
          if (
            (Number.isInteger(o)
              ? o > 23
                ? (this.hour = 0)
                : o < 0
                  ? (this.hour = 23)
                  : (this.hour = o)
              : (this.hour = 0),
            this.isClearingState)
          )
            return
          let d = this.getSelectedDate() ?? this.focusedDate
          this.setState(d.hour(this.hour ?? 0))
        }),
        this.$watch("minute", () => {
          let o = +this.minute
          if (
            (Number.isInteger(o)
              ? o > 59
                ? (this.minute = 0)
                : o < 0
                  ? (this.minute = 59)
                  : (this.minute = o)
              : (this.minute = 0),
            this.isClearingState)
          )
            return
          let d = this.getSelectedDate() ?? this.focusedDate
          this.setState(d.minute(this.minute ?? 0))
        }),
        this.$watch("second", () => {
          let o = +this.second
          if (
            (Number.isInteger(o)
              ? o > 59
                ? (this.second = 0)
                : o < 0
                  ? (this.second = 59)
                  : (this.second = o)
              : (this.second = 0),
            this.isClearingState)
          )
            return
          let d = this.getSelectedDate() ?? this.focusedDate
          this.setState(d.second(this.second ?? 0))
        }),
        this.$watch("state", () => {
          if (this.state === void 0) return
          let o = this.getSelectedDate()
          if (o === null) {
            this.clearState()
            return
          }
          this.getMaxDate() !== null &&
            o?.isAfter(this.getMaxDate()) &&
            (o = null),
            this.getMinDate() !== null &&
              o?.isBefore(this.getMinDate()) &&
              (o = null)
          let d = o?.hour() ?? 0
          this.hour !== d && (this.hour = d)
          let l = o?.minute() ?? 0
          this.minute !== l && (this.minute = l)
          let y = o?.second() ?? 0
          this.second !== y && (this.second = y), this.setDisplayText()
        })
    },
    clearState: function () {
      ;(this.isClearingState = !0),
        this.setState(null),
        (this.hour = 0),
        (this.minute = 0),
        (this.second = 0),
        this.$nextTick(() => (this.isClearingState = !1))
    },
    dateIsDisabled: function (r) {
      return !!(
        (this.$refs?.disabledDates &&
          JSON.parse(this.$refs.disabledDates.value ?? []).some(
            (o) => ((o = A(o)), o.isValid() ? o.isSame(r, "day") : !1)
          )) ||
        (this.getMaxDate() && r.isAfter(this.getMaxDate(), "day")) ||
        (this.getMinDate() && r.isBefore(this.getMinDate(), "day"))
      )
    },
    dayIsDisabled: function (r) {
      return (
        this.focusedDate ?? (this.focusedDate = A().tz(u)),
        this.dateIsDisabled(this.focusedDate.date(r))
      )
    },
    dayIsSelected: function (r) {
      let o = this.getSelectedDate()
      return o === null
        ? !1
        : (this.focusedDate ?? (this.focusedDate = A().tz(u)),
          o.date() === r &&
            o.month() === this.focusedDate.month() &&
            o.year() === this.focusedDate.year())
    },
    dayIsToday: function (r) {
      let o = A().tz(u)
      return (
        this.focusedDate ?? (this.focusedDate = o),
        o.date() === r &&
          o.month() === this.focusedDate.month() &&
          o.year() === this.focusedDate.year()
      )
    },
    focusPreviousDay: function () {
      this.focusedDate ?? (this.focusedDate = A().tz(u)),
        (this.focusedDate = this.focusedDate.subtract(1, "day"))
    },
    focusPreviousWeek: function () {
      this.focusedDate ?? (this.focusedDate = A().tz(u)),
        (this.focusedDate = this.focusedDate.subtract(1, "week"))
    },
    focusNextDay: function () {
      this.focusedDate ?? (this.focusedDate = A().tz(u)),
        (this.focusedDate = this.focusedDate.add(1, "day"))
    },
    focusNextWeek: function () {
      this.focusedDate ?? (this.focusedDate = A().tz(u)),
        (this.focusedDate = this.focusedDate.add(1, "week"))
    },
    getDayLabels: function () {
      let r = A.weekdaysShort()
      return t === 0 ? r : [...r.slice(t), ...r.slice(0, t)]
    },
    getMaxDate: function () {
      let r = A(this.$refs.maxDate?.value)
      return r.isValid() ? r : null
    },
    getMinDate: function () {
      let r = A(this.$refs.minDate?.value)
      return r.isValid() ? r : null
    },
    getSelectedDate: function () {
      if (this.state === void 0 || this.state === null) return null
      let r = A(this.state)
      return r.isValid() ? r : null
    },
    togglePanelVisibility: function () {
      this.isOpen() ||
        ((this.focusedDate =
          this.getSelectedDate() ?? this.getMinDate() ?? A().tz(u)),
        this.setupDaysGrid()),
        this.$refs.panel.toggle(this.$refs.button)
    },
    selectDate: function (r = null) {
      r && this.setFocusedDay(r),
        this.focusedDate ?? (this.focusedDate = A().tz(u)),
        this.setState(this.focusedDate),
        e && this.togglePanelVisibility()
    },
    setDisplayText: function () {
      this.displayText = this.getSelectedDate()
        ? this.getSelectedDate().format(n)
        : ""
    },
    setMonths: function () {
      this.months = A.months()
    },
    setDayLabels: function () {
      this.dayLabels = this.getDayLabels()
    },
    setupDaysGrid: function () {
      this.focusedDate ?? (this.focusedDate = A().tz(u)),
        (this.emptyDaysInFocusedMonth = Array.from(
          { length: this.focusedDate.date(8 - t).day() },
          (r, o) => o + 1
        )),
        (this.daysInFocusedMonth = Array.from(
          { length: this.focusedDate.daysInMonth() },
          (r, o) => o + 1
        ))
    },
    setFocusedDay: function (r) {
      this.focusedDate = (this.focusedDate ?? A().tz(u)).date(r)
    },
    setState: function (r) {
      if (r === null) {
        ;(this.state = null), this.setDisplayText()
        return
      }
      this.dateIsDisabled(r) ||
        ((this.state = r
          .hour(this.hour ?? 0)
          .minute(this.minute ?? 0)
          .second(this.second ?? 0)
          .format("YYYY-MM-DD HH:mm:ss")),
        this.setDisplayText())
    },
    isOpen: function () {
      return this.$refs.panel?.style.display === "block"
    },
  }
}
var ai = {
  ar: Ln(),
  bs: vn(),
  ca: gn(),
  ckb: Ne(),
  cs: bn(),
  cy: kn(),
  da: Hn(),
  de: jn(),
  en: Tn(),
  es: wn(),
  et: $n(),
  fa: Cn(),
  fi: On(),
  fr: zn(),
  hi: An(),
  hu: In(),
  hy: qn(),
  id: xn(),
  it: Nn(),
  ja: En(),
  ka: Fn(),
  km: Jn(),
  ku: Ne(),
  lt: Un(),
  lv: Pn(),
  ms: Wn(),
  my: Rn(),
  nl: Zn(),
  no: Vn(),
  pl: Gn(),
  pt_BR: Kn(),
  pt_PT: Bn(),
  ro: Xn(),
  ru: Qn(),
  sv: ei(),
  tr: ti(),
  uk: ni(),
  vi: ii(),
  zh_CN: si(),
  zh_TW: ri(),
}
export { bi as default }
