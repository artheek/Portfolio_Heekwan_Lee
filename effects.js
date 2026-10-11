var rd = { exports: {} }, Ol = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yb;
function u_() {
  if (Yb) return Ol;
  Yb = 1;
  var i = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function a(o, r, c) {
    var f = null;
    if (c !== void 0 && (f = "" + c), r.key !== void 0 && (f = "" + r.key), "key" in r) {
      c = {};
      for (var d in r)
        d !== "key" && (c[d] = r[d]);
    } else c = r;
    return r = c.ref, {
      $$typeof: i,
      type: o,
      key: f,
      ref: r !== void 0 ? r : null,
      props: c
    };
  }
  return Ol.Fragment = e, Ol.jsx = a, Ol.jsxs = a, Ol;
}
var Xb;
function c_() {
  return Xb || (Xb = 1, rd.exports = u_()), rd.exports;
}
var Xn = c_(), ud = { exports: {} }, Dl = {}, cd = { exports: {} }, fd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qb;
function f_() {
  return Qb || (Qb = 1, (function(i) {
    function e(G, at) {
      var I = G.length;
      G.push(at);
      t: for (; 0 < I; ) {
        var mt = I - 1 >>> 1, X = G[mt];
        if (0 < r(X, at))
          G[mt] = at, G[I] = X, I = mt;
        else break t;
      }
    }
    function a(G) {
      return G.length === 0 ? null : G[0];
    }
    function o(G) {
      if (G.length === 0) return null;
      var at = G[0], I = G.pop();
      if (I !== at) {
        G[0] = I;
        t: for (var mt = 0, X = G.length, Wt = X >>> 1; mt < Wt; ) {
          var Ye = 2 * (mt + 1) - 1, Zn = G[Ye], M = Ye + 1, q = G[M];
          if (0 > r(Zn, I))
            M < X && 0 > r(q, Zn) ? (G[mt] = q, G[M] = I, mt = M) : (G[mt] = Zn, G[Ye] = I, mt = Ye);
          else if (M < X && 0 > r(q, I))
            G[mt] = q, G[M] = I, mt = M;
          else break t;
        }
      }
      return at;
    }
    function r(G, at) {
      var I = G.sortIndex - at.sortIndex;
      return I !== 0 ? I : G.id - at.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      i.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, d = f.now();
      i.unstable_now = function() {
        return f.now() - d;
      };
    }
    var m = [], p = [], v = 1, g = null, b = 3, S = !1, w = !1, C = !1, E = !1, R = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, U = typeof setImmediate < "u" ? setImmediate : null;
    function L(G) {
      for (var at = a(p); at !== null; ) {
        if (at.callback === null) o(p);
        else if (at.startTime <= G)
          o(p), at.sortIndex = at.expirationTime, e(m, at);
        else break;
        at = a(p);
      }
    }
    function P(G) {
      if (C = !1, L(G), !w)
        if (a(m) !== null)
          w = !0, J || (J = !0, bt());
        else {
          var at = a(p);
          at !== null && zt(P, at.startTime - G);
        }
    }
    var J = !1, Y = -1, B = 5, rt = -1;
    function F() {
      return E ? !0 : !(i.unstable_now() - rt < B);
    }
    function pt() {
      if (E = !1, J) {
        var G = i.unstable_now();
        rt = G;
        var at = !0;
        try {
          t: {
            w = !1, C && (C = !1, k(Y), Y = -1), S = !0;
            var I = b;
            try {
              e: {
                for (L(G), g = a(m); g !== null && !(g.expirationTime > G && F()); ) {
                  var mt = g.callback;
                  if (typeof mt == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var X = mt(
                      g.expirationTime <= G
                    );
                    if (G = i.unstable_now(), typeof X == "function") {
                      g.callback = X, L(G), at = !0;
                      break e;
                    }
                    g === a(m) && o(m), L(G);
                  } else o(m);
                  g = a(m);
                }
                if (g !== null) at = !0;
                else {
                  var Wt = a(p);
                  Wt !== null && zt(
                    P,
                    Wt.startTime - G
                  ), at = !1;
                }
              }
              break t;
            } finally {
              g = null, b = I, S = !1;
            }
            at = void 0;
          }
        } finally {
          at ? bt() : J = !1;
        }
      }
    }
    var bt;
    if (typeof U == "function")
      bt = function() {
        U(pt);
      };
    else if (typeof MessageChannel < "u") {
      var vt = new MessageChannel(), kt = vt.port2;
      vt.port1.onmessage = pt, bt = function() {
        kt.postMessage(null);
      };
    } else
      bt = function() {
        R(pt, 0);
      };
    function zt(G, at) {
      Y = R(function() {
        G(i.unstable_now());
      }, at);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(G) {
      G.callback = null;
    }, i.unstable_forceFrameRate = function(G) {
      0 > G || 125 < G ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : B = 0 < G ? Math.floor(1e3 / G) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, i.unstable_next = function(G) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var at = 3;
          break;
        default:
          at = b;
      }
      var I = b;
      b = at;
      try {
        return G();
      } finally {
        b = I;
      }
    }, i.unstable_requestPaint = function() {
      E = !0;
    }, i.unstable_runWithPriority = function(G, at) {
      switch (G) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          G = 3;
      }
      var I = b;
      b = G;
      try {
        return at();
      } finally {
        b = I;
      }
    }, i.unstable_scheduleCallback = function(G, at, I) {
      var mt = i.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? mt + I : mt) : I = mt, G) {
        case 1:
          var X = -1;
          break;
        case 2:
          X = 250;
          break;
        case 5:
          X = 1073741823;
          break;
        case 4:
          X = 1e4;
          break;
        default:
          X = 5e3;
      }
      return X = I + X, G = {
        id: v++,
        callback: at,
        priorityLevel: G,
        startTime: I,
        expirationTime: X,
        sortIndex: -1
      }, I > mt ? (G.sortIndex = I, e(p, G), a(m) === null && G === a(p) && (C ? (k(Y), Y = -1) : C = !0, zt(P, I - mt))) : (G.sortIndex = X, e(m, G), w || S || (w = !0, J || (J = !0, bt()))), G;
    }, i.unstable_shouldYield = F, i.unstable_wrapCallback = function(G) {
      var at = b;
      return function() {
        var I = b;
        b = at;
        try {
          return G.apply(this, arguments);
        } finally {
          b = I;
        }
      };
    };
  })(fd)), fd;
}
var Zb;
function h_() {
  return Zb || (Zb = 1, cd.exports = f_()), cd.exports;
}
var hd = { exports: {} }, dt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fb;
function d_() {
  if (Fb) return dt;
  Fb = 1;
  var i = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.for("react.view_transition"), S = Symbol.iterator;
  function w(M) {
    return M === null || typeof M != "object" ? null : (M = S && M[S] || M["@@iterator"], typeof M == "function" ? M : null);
  }
  var C = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, E = Object.assign, R = {};
  function k(M, q, K) {
    this.props = M, this.context = q, this.refs = R, this.updater = K || C;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(M, q) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, q, "setState");
  }, k.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function U() {
  }
  U.prototype = k.prototype;
  function L(M, q, K) {
    this.props = M, this.context = q, this.refs = R, this.updater = K || C;
  }
  var P = L.prototype = new U();
  P.constructor = L, E(P, k.prototype), P.isPureReactComponent = !0;
  var J = Array.isArray;
  function Y() {
  }
  var B = { H: null, A: null, T: null, S: null }, rt = Object.prototype.hasOwnProperty;
  function F(M, q, K) {
    var st = K.ref;
    return {
      $$typeof: i,
      type: M,
      key: q,
      ref: st !== void 0 ? st : null,
      props: K
    };
  }
  function pt(M, q) {
    return F(M.type, q, M.props);
  }
  function bt(M) {
    return typeof M == "object" && M !== null && M.$$typeof === i;
  }
  function vt(M) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(K) {
      return q[K];
    });
  }
  var kt = /\/+/g;
  function zt(M, q) {
    return typeof M == "object" && M !== null && M.key != null ? vt("" + M.key) : q.toString(36);
  }
  function G(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(Y, Y) : (M.status = "pending", M.then(
          function(q) {
            M.status === "pending" && (M.status = "fulfilled", M.value = q);
          },
          function(q) {
            M.status === "pending" && (M.status = "rejected", M.reason = q);
          }
        )), M.status) {
          case "fulfilled":
            return M.value;
          case "rejected":
            throw M.reason;
        }
    }
    throw M;
  }
  function at(M, q, K, st, Et) {
    var ut = typeof M;
    (ut === "undefined" || ut === "boolean") && (M = null);
    var At = !1;
    if (M === null) At = !0;
    else
      switch (ut) {
        case "bigint":
        case "string":
        case "number":
          At = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case i:
            case e:
              At = !0;
              break;
            case v:
              return At = M._init, at(
                At(M._payload),
                q,
                K,
                st,
                Et
              );
          }
      }
    if (At)
      return Et = Et(M), At = st === "" ? "." + zt(M, 0) : st, J(Et) ? (K = "", At != null && (K = At.replace(kt, "$&/") + "/"), at(Et, q, K, "", function(We) {
        return We;
      })) : Et != null && (bt(Et) && (Et = pt(
        Et,
        K + (Et.key == null || M && M.key === Et.key ? "" : ("" + Et.key).replace(
          kt,
          "$&/"
        ) + "/") + At
      )), q.push(Et)), 1;
    At = 0;
    var et = st === "" ? "." : st + ":";
    if (J(M))
      for (var ct = 0; ct < M.length; ct++)
        st = M[ct], ut = et + zt(st, ct), At += at(
          st,
          q,
          K,
          ut,
          Et
        );
    else if (ct = w(M), typeof ct == "function")
      for (M = ct.call(M), ct = 0; !(st = M.next()).done; )
        st = st.value, ut = et + zt(st, ct++), At += at(
          st,
          q,
          K,
          ut,
          Et
        );
    else if (ut === "object") {
      if (typeof M.then == "function")
        return at(
          G(M),
          q,
          K,
          st,
          Et
        );
      throw q = String(M), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return At;
  }
  function I(M, q, K) {
    if (M == null) return M;
    var st = [], Et = 0;
    return at(M, st, "", "", function(ut) {
      return q.call(K, ut, Et++);
    }), st;
  }
  function mt(M) {
    if (M._status === -1) {
      var q = M._result, K = q();
      K.then(
        function(st) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = st, K.status === void 0 && (K.status = "fulfilled", K.value = st));
        },
        function(st) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = st, K.status === void 0 && (K.status = "rejected", K.reason = st));
        }
      ), M._status === -1 && (M._status = 0, M._result = K);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var X = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  };
  function Wt(M) {
    var q = B.T, K = {};
    K.types = q !== null ? q.types : null, B.T = K;
    try {
      var st = M(), Et = B.S;
      Et !== null && Et(K, st), typeof st == "object" && st !== null && typeof st.then == "function" && st.then(Y, X);
    } catch (ut) {
      X(ut);
    } finally {
      q !== null && K.types !== null && (q.types = K.types), B.T = q;
    }
  }
  function Ye(M) {
    var q = B.T;
    if (q !== null) {
      var K = q.types;
      K === null ? q.types = [M] : K.indexOf(M) === -1 && K.push(M);
    } else Wt(Ye.bind(null, M));
  }
  var Zn = {
    map: I,
    forEach: function(M, q, K) {
      I(
        M,
        function() {
          q.apply(this, arguments);
        },
        K
      );
    },
    count: function(M) {
      var q = 0;
      return I(M, function() {
        q++;
      }), q;
    },
    toArray: function(M) {
      return I(M, function(q) {
        return q;
      }) || [];
    },
    only: function(M) {
      if (!bt(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return dt.Activity = g, dt.Children = Zn, dt.Component = k, dt.Fragment = a, dt.Profiler = r, dt.PureComponent = L, dt.StrictMode = o, dt.Suspense = m, dt.ViewTransition = b, dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, dt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return B.H.useMemoCache(M);
    }
  }, dt.addTransitionType = Ye, dt.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, dt.cacheSignal = function() {
    return null;
  }, dt.cloneElement = function(M, q, K) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var st = E({}, M.props), Et = M.key;
    if (q != null)
      for (ut in q.key !== void 0 && (Et = "" + q.key), q)
        !rt.call(q, ut) || ut === "key" || ut === "__self" || ut === "__source" || ut === "ref" && q.ref === void 0 || (st[ut] = q[ut]);
    var ut = arguments.length - 2;
    if (ut === 1) st.children = K;
    else if (1 < ut) {
      for (var At = Array(ut), et = 0; et < ut; et++)
        At[et] = arguments[et + 2];
      st.children = At;
    }
    return F(M.type, Et, st);
  }, dt.createContext = function(M) {
    return M = {
      $$typeof: f,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: c,
      _context: M
    }, M;
  }, dt.createElement = function(M, q, K) {
    var st, Et = {}, ut = null;
    if (q != null)
      for (st in q.key !== void 0 && (ut = "" + q.key), q)
        rt.call(q, st) && st !== "key" && st !== "__self" && st !== "__source" && (Et[st] = q[st]);
    var At = arguments.length - 2;
    if (At === 1) Et.children = K;
    else if (1 < At) {
      for (var et = Array(At), ct = 0; ct < At; ct++)
        et[ct] = arguments[ct + 2];
      Et.children = et;
    }
    if (M && M.defaultProps)
      for (st in At = M.defaultProps, At)
        Et[st] === void 0 && (Et[st] = At[st]);
    return F(M, ut, Et);
  }, dt.createRef = function() {
    return { current: null };
  }, dt.forwardRef = function(M) {
    return { $$typeof: d, render: M };
  }, dt.isValidElement = bt, dt.lazy = function(M) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: M },
      _init: mt
    };
  }, dt.memo = function(M, q) {
    return {
      $$typeof: p,
      type: M,
      compare: q === void 0 ? null : q
    };
  }, dt.startTransition = Wt, dt.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, dt.use = function(M) {
    return B.H.use(M);
  }, dt.useActionState = function(M, q, K) {
    return B.H.useActionState(M, q, K);
  }, dt.useCallback = function(M, q) {
    return B.H.useCallback(M, q);
  }, dt.useContext = function(M) {
    return B.H.useContext(M);
  }, dt.useDebugValue = function() {
  }, dt.useDeferredValue = function(M, q) {
    return B.H.useDeferredValue(M, q);
  }, dt.useEffect = function(M, q) {
    return B.H.useEffect(M, q);
  }, dt.useEffectEvent = function(M) {
    return B.H.useEffectEvent(M);
  }, dt.useId = function() {
    return B.H.useId();
  }, dt.useImperativeHandle = function(M, q, K) {
    return B.H.useImperativeHandle(M, q, K);
  }, dt.useInsertionEffect = function(M, q) {
    return B.H.useInsertionEffect(M, q);
  }, dt.useLayoutEffect = function(M, q) {
    return B.H.useLayoutEffect(M, q);
  }, dt.useMemo = function(M, q) {
    return B.H.useMemo(M, q);
  }, dt.useOptimistic = function(M, q) {
    return B.H.useOptimistic(M, q);
  }, dt.useReducer = function(M, q, K) {
    return B.H.useReducer(M, q, K);
  }, dt.useRef = function(M) {
    return B.H.useRef(M);
  }, dt.useState = function(M) {
    return B.H.useState(M);
  }, dt.useSyncExternalStore = function(M, q, K) {
    return B.H.useSyncExternalStore(
      M,
      q,
      K
    );
  }, dt.useTransition = function() {
    return B.H.useTransition();
  }, dt.version = "19.3.0", dt;
}
var Kb;
function Vm() {
  return Kb || (Kb = 1, hd.exports = d_()), hd.exports;
}
var dd = { exports: {} }, Ce = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ib;
function m_() {
  if (Ib) return Ce;
  Ib = 1;
  var i = Vm();
  function e(v) {
    var g = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        g += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + v + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function a() {
  }
  var o = {
    d: {
      f: a,
      r: function() {
        throw Error(e(522));
      },
      D: a,
      C: a,
      L: a,
      m: a,
      X: a,
      S: a,
      M: a
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal"), c = Symbol.for("react.recoverable"), f = Symbol.for("react.optimistic_key");
  function d(v, g, b) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: S == null ? null : S === f ? f : "" + S,
      children: v,
      containerInfo: g,
      implementation: b
    };
  }
  var m = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(v, g) {
    if (v === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return Ce.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Ce.browser = function(v) {
    return { $$typeof: c, _reason: v };
  }, Ce.createPortal = function(v, g) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(e(299));
    return d(v, g, null, b);
  }, Ce.flushSync = function(v) {
    var g = m.T, b = o.p;
    try {
      if (m.T = null, o.p = 2, v) return v();
    } finally {
      m.T = g, o.p = b, o.d.f();
    }
  }, Ce.preconnect = function(v, g) {
    typeof v == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(v, g));
  }, Ce.prefetchDNS = function(v) {
    typeof v == "string" && o.d.D(v);
  }, Ce.preinit = function(v, g) {
    if (typeof v == "string" && g && typeof g.as == "string") {
      var b = g.as, S = p(b, g.crossOrigin), w = typeof g.integrity == "string" ? g.integrity : void 0, C = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      b === "style" ? o.d.S(
        v,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: S,
          integrity: w,
          fetchPriority: C
        }
      ) : b === "script" && o.d.X(v, {
        crossOrigin: S,
        integrity: w,
        fetchPriority: C,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, Ce.preinitModule = function(v, g) {
    if (typeof v == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var b = p(
            g.as,
            g.crossOrigin
          );
          o.d.M(v, {
            crossOrigin: b,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && o.d.M(v);
  }, Ce.preload = function(v, g) {
    if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var b = g.as, S = p(b, g.crossOrigin);
      o.d.L(v, b, {
        crossOrigin: S,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, Ce.preloadModule = function(v, g) {
    if (typeof v == "string")
      if (g) {
        var b = p(g.as, g.crossOrigin);
        o.d.m(v, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: b,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else o.d.m(v);
  }, Ce.requestFormReset = function(v) {
    o.d.r(v);
  }, Ce.unstable_batchedUpdates = function(v, g) {
    return v(g);
  }, Ce.useFormState = function(v, g, b) {
    return m.H.useFormState(v, g, b);
  }, Ce.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, Ce.version = "19.3.0", Ce;
}
var Jb;
function p_() {
  if (Jb) return dd.exports;
  Jb = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (e) {
        console.error(e);
      }
  }
  return i(), dd.exports = m_(), dd.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $b;
function y_() {
  if ($b) return Dl;
  $b = 1;
  var i = h_(), e = Vm(), a = p_();
  function o(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var s = 2; s < arguments.length; s++)
        n += "&args[]=" + encodeURIComponent(arguments[s]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function c(t) {
    for (var n = t, s = n; s && !s.alternate; )
      n = s, (n.flags & 4098) !== 0 && (t = n.return), s = n.return;
    for (; n.return; ) n = n.return;
    return n.tag === 3 ? t : null;
  }
  function f(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (c(t) !== t)
      throw Error(o(188));
  }
  function p(t) {
    var n = t.alternate;
    if (!n) {
      if (n = c(t), n === null) throw Error(o(188));
      return n !== t ? null : t;
    }
    for (var s = t, l = n; ; ) {
      var u = s.return;
      if (u === null) break;
      var h = u.alternate;
      if (h === null) {
        if (l = u.return, l !== null) {
          s = l;
          continue;
        }
        break;
      }
      if (u.child === h.child) {
        for (h = u.child; h; ) {
          if (h === s) return m(u), t;
          if (h === l) return m(u), n;
          h = h.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== l.return) s = u, l = h;
      else {
        for (var y = !1, x = u.child; x; ) {
          if (x === s) {
            y = !0, s = u, l = h;
            break;
          }
          if (x === l) {
            y = !0, l = u, s = h;
            break;
          }
          x = x.sibling;
        }
        if (!y) {
          for (x = h.child; x; ) {
            if (x === s) {
              y = !0, s = h, l = u;
              break;
            }
            if (x === l) {
              y = !0, l = h, s = u;
              break;
            }
            x = x.sibling;
          }
          if (!y) throw Error(o(189));
        }
      }
      if (s.alternate !== l) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? t : n;
  }
  function v(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = v(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  function g(t, n, s, l, u, h) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && s(t, l, u, h) || (t.tag !== 22 || t.memoizedState === null) && (n || t.tag !== 5 && t.tag !== 27) && g(
        t.child,
        n,
        s,
        l,
        u,
        h
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function b(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function S(t) {
    var n = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (n = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return n;
  }
  function w(t) {
    var n = [null, null], s = b(t);
    return s === null || C(
      n,
      t,
      s.child,
      { foundSelf: !1 }
    ), n;
  }
  function C(t, n, s, l) {
    for (; s !== null; ) {
      if (s === n) l.foundSelf = !0;
      else if (s.tag === 5 || s.tag === 27 || s.tag === 6) {
        if (l.foundSelf) return t[1] = s, !0;
        t[0] = s;
      } else if ((s.tag !== 22 || s.memoizedState === null) && C(
        t,
        n,
        s.child,
        l
      ))
        return !0;
      s = s.sibling;
    }
    return !1;
  }
  function E(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(o(559));
    }
  }
  var R = null, k = null;
  function U(t, n, s) {
    return t === s ? !0 : t === n ? (R = t, !0) : !1;
  }
  function L(t, n, s) {
    return t === s ? (k = t, !1) : t === n ? (k !== null && (R = t), !0) : !1;
  }
  function P(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function J(t, n, s) {
    for (var l = 0, u = t; u; u = s(u)) l++;
    u = 0;
    for (var h = n; h; h = s(h)) u++;
    for (; 0 < l - u; ) t = s(t), l--;
    for (; 0 < u - l; ) n = s(n), u--;
    for (; l--; ) {
      if (t === n || n !== null && t === n.alternate)
        return t;
      t = s(t), n = s(n);
    }
    return null;
  }
  var Y = Object.assign, B = Symbol.for("react.element"), rt = Symbol.for("react.transitional.element"), F = Symbol.for("react.portal"), pt = Symbol.for("react.fragment"), bt = Symbol.for("react.strict_mode"), vt = Symbol.for("react.profiler"), kt = Symbol.for("react.consumer"), zt = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), at = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), mt = Symbol.for("react.memo"), X = Symbol.for("react.lazy"), Wt = Symbol.for("react.activity"), Ye = Symbol.for("react.legacy_hidden"), Zn = Symbol.for("react.memo_cache_sentinel"), M = Symbol.for("react.view_transition"), q = Symbol.for("react.recoverable"), K = Symbol.iterator;
  function st(t) {
    return t === null || typeof t != "object" ? null : (t = K && t[K] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Et = Symbol.for("react.client.reference");
  function ut(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Et ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case pt:
        return "Fragment";
      case vt:
        return "Profiler";
      case bt:
        return "StrictMode";
      case at:
        return "Suspense";
      case I:
        return "SuspenseList";
      case Wt:
        return "Activity";
      case M:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case F:
          return "Portal";
        case zt:
          return t.displayName || "Context";
        case kt:
          return (t._context.displayName || "Context") + ".Consumer";
        case G:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case mt:
          return n = t.displayName || null, n !== null ? n : ut(t.type) || "Memo";
        case X:
          n = t._payload, t = t._init;
          try {
            return ut(t(n));
          } catch {
          }
      }
    return null;
  }
  var At = Array.isArray, et = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ct = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, We = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Bi = [], ba = -1;
  function Fn(t) {
    return { current: t };
  }
  function ve(t) {
    0 > ba || (t.current = Bi[ba], Bi[ba] = null, ba--);
  }
  function Yt(t, n) {
    ba++, Bi[ba] = t.current, t.current = n;
  }
  var Kn = Fn(null), Lo = Fn(null), Ui = Fn(null), er = Fn(null);
  function nr(t, n) {
    switch (Yt(Ui, n), Yt(Lo, t), Yt(Kn, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? Wv(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = Wv(n), t = tb(n, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    ve(Kn), Yt(Kn, t);
  }
  function xa() {
    ve(Kn), ve(Lo), ve(Ui);
  }
  function Mc(t) {
    var n = t.memoizedState;
    n !== null && (lo._currentValue = n.memoizedState, Yt(er, t)), n = Kn.current;
    var s = tb(n, t.type);
    n !== s && (Yt(Lo, t), Yt(Kn, s));
  }
  function ir(t) {
    Lo.current === t && (ve(Kn), ve(Lo)), er.current === t && (ve(er), lo._currentValue = We);
  }
  var zc, xp;
  function Hi(t) {
    if (zc === void 0)
      try {
        throw Error();
      } catch (s) {
        var n = s.stack.trim().match(/\n( *(at )?)/);
        zc = n && n[1] || "", xp = -1 < s.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < s.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + zc + t + xp;
  }
  var Ac = !1;
  function Oc(t, n) {
    if (!t || Ac) return "";
    Ac = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var j = function() {
                throw Error();
              };
              if (Object.defineProperty(j.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(j, []);
                } catch (Z) {
                  var z = Z;
                }
                Reflect.construct(t, [], j);
              } else {
                try {
                  j.call();
                } catch (Z) {
                  z = Z;
                }
                j = !1;
                try {
                  var V = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), j = !0, new t();
                } finally {
                  j && (V !== void 0 ? Object.defineProperty(t.prototype, "props", V) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Z) {
                z = Z;
              }
              (j = t()) && typeof j.catch == "function" && j.catch(function() {
              });
            }
          } catch (Z) {
            if (Z && z && typeof Z.stack == "string")
              return [Z.stack, z.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = l.DetermineComponentFrameRoot(), y = h[0], x = h[1];
      if (y && x) {
        var T = y.split(`
`), O = x.split(`
`);
        for (u = l = 0; l < T.length && !T[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < O.length && !O[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === T.length || u === O.length)
          for (l = T.length - 1, u = O.length - 1; 1 <= l && 0 <= u && T[l] !== O[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (T[l] !== O[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || T[l] !== O[u]) {
                  var N = `
` + T[l].replace(" at new ", " at ");
                  return t.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", t.displayName)), N;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Ac = !1, Error.prepareStackTrace = s;
    }
    return (s = t ? t.displayName || t.name : "") ? Hi(s) : "";
  }
  function dT(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Hi(t.type);
      case 16:
        return Hi("Lazy");
      case 13:
        return t.child !== n && n !== null ? Hi("Suspense Fallback") : Hi("Suspense");
      case 19:
        return Hi("SuspenseList");
      case 0:
      case 15:
        return Oc(t.type, !1);
      case 11:
        return Oc(t.type.render, !1);
      case 1:
        return Oc(t.type, !0);
      case 31:
        return Hi("Activity");
      case 30:
        return Hi("ViewTransition");
      default:
        return "";
    }
  }
  function Sp(t) {
    try {
      var n = "", s = null;
      do
        n += dT(t, s), s = t, t = t.return;
      while (t);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Dc = Object.prototype.hasOwnProperty, Rc = i.unstable_scheduleCallback, Vc = i.unstable_cancelCallback, mT = i.unstable_shouldYield, pT = i.unstable_requestPaint, tn = i.unstable_now, yT = i.unstable_getCurrentPriorityLevel, wp = i.unstable_ImmediatePriority, Tp = i.unstable_UserBlockingPriority, sr = i.unstable_NormalPriority, gT = i.unstable_LowPriority, Ep = i.unstable_IdlePriority, vT = i.log, bT = i.unstable_setDisableYieldValue, Bo = null, en = null;
  function ji(t) {
    if (typeof vT == "function" && bT(t), en && typeof en.setStrictMode == "function")
      try {
        en.setStrictMode(Bo, t);
      } catch {
      }
  }
  var nn = Math.clz32 ? Math.clz32 : wT, xT = Math.log, ST = Math.LN2;
  function wT(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (xT(t) / ST | 0) | 0;
  }
  var ar = 256, or = 262144, lr = 4194304;
  function _s(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function rr(t, n, s) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var u = 0, h = t.suspendedLanes, y = t.pingedLanes;
    t = t.warmLanes;
    var x = l & 134217727;
    return x !== 0 ? (l = x & ~h, l !== 0 ? u = _s(l) : (y &= x, y !== 0 ? u = _s(y) : s || (s = x & ~t, s !== 0 && (u = _s(s))))) : (x = l & ~h, x !== 0 ? u = _s(x) : y !== 0 ? u = _s(y) : s || (s = l & ~t, s !== 0 && (u = _s(s)))), u === 0 ? 0 : n !== 0 && n !== u && (n & h) === 0 && (h = u & -u, s = n & -n, h >= s || h === 32 && (s & 4194048) !== 0) ? n : u;
  }
  function Uo(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Cp(t, n) {
    (n & 8) !== 0 && (n |= n & 32);
    var s = t.entangledLanes;
    if (s !== 0)
      for (t = t.entanglements, s &= n; 0 < s; ) {
        var l = 31 - nn(s), u = 1 << l;
        n |= t[l], s &= ~u;
      }
    return n;
  }
  function TT(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function _p() {
    var t = lr;
    return lr <<= 1, (lr & 62914560) === 0 && (lr = 4194304), t;
  }
  function kc(t) {
    for (var n = [], s = 0; 31 > s; s++) n.push(t);
    return n;
  }
  function Ho(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function ET(t, n, s, l, u, h) {
    var y = t.pendingLanes;
    t.pendingLanes = s, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= s, t.entangledLanes &= s, t.errorRecoveryDisabledLanes &= s, t.shellSuspendCounter = 0;
    var x = t.entanglements, T = t.expirationTimes, O = t.hiddenUpdates;
    for (s = y & ~s; 0 < s; ) {
      var N = 31 - nn(s), j = 1 << N;
      x[N] = 0, T[N] = -1;
      var z = O[N];
      if (z !== null)
        for (O[N] = null, N = 0; N < z.length; N++) {
          var V = z[N];
          V !== null && (V.lane &= -536870913);
        }
      s &= ~j;
    }
    l !== 0 && Mp(t, l, 0), h !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(y & ~n));
  }
  function Mp(t, n, s) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var l = 31 - nn(n);
    t.entangledLanes |= n, t.entanglements[l] = t.entanglements[l] | 1073741824 | s & 261930;
  }
  function zp(t, n) {
    var s = t.entangledLanes |= n;
    for (t = t.entanglements; s; ) {
      var l = 31 - nn(s), u = 1 << l;
      u & n | t[l] & n && (t[l] |= n), s &= ~u;
    }
  }
  function Ap(t, n) {
    var s = n & -n;
    return s = (s & 42) !== 0 ? 1 : Nc(s), (s & (t.suspendedLanes | n)) !== 0 ? 0 : s;
  }
  function Nc(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Lc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Op() {
    var t = ct.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bb(t.type));
  }
  function Dp(t, n) {
    var s = ct.p;
    try {
      return ct.p = t, n();
    } finally {
      ct.p = s;
    }
  }
  var gi = Math.random().toString(36).slice(2), be = "__reactFiber$" + gi, Xe = "__reactProps$" + gi, Sa = "__reactContainer$" + gi, Rp = "__reactEvents$" + gi, CT = "__reactListeners$" + gi, _T = "__reactHandles$" + gi, Vp = "__reactResources$" + gi, jo = "__reactMarker$" + gi, ur = "__reactLoad$" + gi;
  function cr(t) {
    delete t[be], delete t[Xe], delete t[CT], delete t[_T];
  }
  function Ms(t) {
    var n;
    if (n = t[be]) return n;
    for (var s = t.parentNode; s; ) {
      if (n = s[Sa] || s[be]) {
        if (s = n.alternate, n.child !== null || s !== null && s.child !== null)
          for (t = gb(t); t !== null; ) {
            if (s = t[be]) return s;
            t = gb(t);
          }
        return n;
      }
      t = s, s = t.parentNode;
    }
    return null;
  }
  function wa(t) {
    if (t = t[be] || t[Sa]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function qo(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Ta(t) {
    var n = t[Vp];
    return n || (n = t[Vp] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function de(t) {
    t[jo] = !0;
  }
  function kp(t) {
    t[ur] = void 0;
  }
  var Np = /* @__PURE__ */ new Set(), Lp = {};
  function zs(t, n) {
    Ea(t, n), Ea(t + "Capture", n);
  }
  function Ea(t, n) {
    for (Lp[t] = n, t = 0; t < n.length; t++)
      Np.add(n[t]);
  }
  var MT = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Bp = {}, Up = {};
  function zT(t) {
    return Dc.call(Up, t) ? !0 : Dc.call(Bp, t) ? !1 : MT.test(t) ? Up[t] = !0 : (Bp[t] = !0, !1);
  }
  var Dt = !1;
  function Hp() {
    var t = Dt;
    return Dt = !1, t;
  }
  function fr(t, n, s) {
    if (zT(n))
      if (s === null) t.removeAttribute(n);
      else {
        switch (typeof s) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var l = n.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, s);
      }
  }
  function hr(t, n, s) {
    if (s === null) t.removeAttribute(n);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, s);
    }
  }
  function vi(t, n, s, l) {
    if (l === null) t.removeAttribute(s);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(s);
          return;
      }
      t.setAttributeNS(n, s, l);
    }
  }
  function sn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function jp(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function AT(t, n, s) {
    var l = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      n
    );
    if (!t.hasOwnProperty(n) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, h = l.set;
      return Object.defineProperty(t, n, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          s = "" + y, h.call(this, y);
        }
      }), Object.defineProperty(t, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return s;
        },
        setValue: function(y) {
          s = "" + y;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function Bc(t) {
    if (!t._valueTracker) {
      var n = jp(t) ? "checked" : "value";
      t._valueTracker = AT(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function qp(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var s = n.getValue(), l = "";
    return t && (l = jp(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== s ? (n.setValue(t), !0) : !1;
  }
  var OT = /[\n"\\]/g;
  function yn(t) {
    return t.replace(
      OT,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Uc(t, n, s, l, u, h, y, x) {
    t.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.type = y : t.removeAttribute("type"), n != null ? y === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + sn(n)) : t.value !== "" + sn(n) && (t.value = "" + sn(n)) : y !== "submit" && y !== "reset" || t.removeAttribute("value"), n != null ? y === "number" && t.value == n ? Hc(t, sn(t.value)) : Hc(t, sn(n)) : s != null ? Hc(t, sn(s)) : l != null && t.removeAttribute("value"), u == null && h != null && (t.defaultChecked = !!h), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.name = "" + sn(x) : t.removeAttribute("name");
  }
  function Pp(t, n, s, l, u, h, y, x) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || s != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        Bc(t);
        return;
      }
      s = s != null ? "" + sn(s) : "", n = n != null ? "" + sn(n) : s, x || n === t.value || (t.value = n), t.defaultValue = n;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = x ? t.checked : !!l, t.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (t.name = y), Bc(t);
  }
  function Hc(t, n) {
    t.defaultValue !== "" + n && (t.defaultValue = "" + n);
  }
  function Ca(t, n, s, l) {
    if (t = t.options, n) {
      n = {};
      for (var u = 0; u < s.length; u++)
        n["$" + s[u]] = !0;
      for (s = 0; s < t.length; s++)
        u = n.hasOwnProperty("$" + t[s].value), t[s].selected !== u && (t[s].selected = u), u && l && (t[s].defaultSelected = !0);
    } else {
      for (s = "" + sn(s), n = null, u = 0; u < t.length; u++) {
        if (t[u].value === s) {
          t[u].selected = !0, l && (t[u].defaultSelected = !0);
          return;
        }
        n !== null || t[u].disabled || (n = t[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Gp(t, n, s) {
    if (n != null && (n = "" + sn(n), n !== t.value && (t.value = n), s == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = s != null ? "" + sn(s) : "";
  }
  function Yp(t, n, s, l) {
    if (n == null) {
      if (l != null) {
        if (s != null) throw Error(o(92));
        if (At(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        s = l;
      }
      s == null && (s = ""), n = s;
    }
    s = sn(n), t.defaultValue = s, l = t.textContent, l === s && l !== "" && l !== null && (t.value = l), Bc(t);
  }
  function _a(t, n) {
    if (n) {
      var s = t.firstChild;
      if (s && s === t.lastChild && s.nodeType === 3) {
        s.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var DT = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Xp(t, n, s) {
    var l = n.indexOf("--") === 0;
    s == null || typeof s == "boolean" || s === "" ? l ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : l ? t.setProperty(n, s) : typeof s != "number" || s === 0 || DT.has(n) ? n === "float" ? t.cssFloat = s : t[n] = ("" + s).trim() : t[n] = s + "px";
  }
  function Qp(t, n, s) {
    if (n != null && typeof n != "object")
      throw Error(o(62));
    if (t = t.style, s != null) {
      for (var l in s)
        !s.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "", Dt = !0);
      for (var u in n)
        l = n[u], n.hasOwnProperty(u) && s[u] !== l && (Xp(t, u, l), Dt = !0);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Xp(t, h, n[h]);
  }
  function jc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var RT = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), VT = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function dr(t) {
    return VT.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function In() {
  }
  var qc = null;
  function Pc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ma = null, za = null;
  function Zp(t) {
    var n = wa(t);
    if (n && (t = n.stateNode)) {
      var s = t[Xe] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (Uc(
            t,
            s.value,
            s.defaultValue,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name
          ), n = s.name, s.type === "radio" && n != null) {
            for (s = t; s.parentNode; ) s = s.parentNode;
            for (s = s.querySelectorAll(
              'input[name="' + yn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < s.length; n++) {
              var l = s[n];
              if (l !== t && l.form === t.form) {
                var u = l[Xe] || null;
                if (!u) throw Error(o(90));
                Uc(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (n = 0; n < s.length; n++)
              l = s[n], l.form === t.form && qp(l);
          }
          break t;
        case "textarea":
          Gp(t, s.value, s.defaultValue);
          break t;
        case "select":
          n = s.value, n != null && Ca(t, !!s.multiple, n, !1);
      }
    }
  }
  var Gc = !1;
  function Fp(t, n, s) {
    if (Gc) return t(n, s);
    Gc = !0;
    try {
      var l = t(n);
      return l;
    } finally {
      if (Gc = !1, (Ma !== null || za !== null) && (du(), Ma && (n = Ma, t = za, za = Ma = null, Zp(n), t)))
        for (n = 0; n < t.length; n++) Zp(t[n]);
    }
  }
  function Po(t, n) {
    var s = t.stateNode;
    if (s === null) return null;
    var l = s[Xe] || null;
    if (l === null) return null;
    s = l[n];
    t: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (s && typeof s != "function")
      throw Error(
        o(231, n, typeof s)
      );
    return s;
  }
  var bi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yc = !1;
  if (bi)
    try {
      var Go = {};
      Object.defineProperty(Go, "passive", {
        get: function() {
          Yc = !0;
        }
      }), window.addEventListener("test", Go, Go), window.removeEventListener("test", Go, Go);
    } catch {
      Yc = !1;
    }
  var qi = null, Xc = null, mr = null;
  function Kp() {
    if (mr) return mr;
    var t, n = Xc, s = n.length, l, u = "value" in qi ? qi.value : qi.textContent, h = u.length;
    for (t = 0; t < s && n[t] === u[t]; t++) ;
    var y = s - t;
    for (l = 1; l <= y && n[s - l] === u[h - l]; l++) ;
    return mr = u.slice(t, 1 < l ? 1 - l : void 0);
  }
  function pr(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function yr() {
    return !0;
  }
  function Ip() {
    return !1;
  }
  function Le(t) {
    function n(s, l, u, h, y) {
      this._reactName = s, this._targetInst = u, this.type = l, this.nativeEvent = h, this.target = y, this.currentTarget = null;
      for (var x in t)
        t.hasOwnProperty(x) && (s = t[x], this[x] = s ? s(h) : h[x]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? yr : Ip, this.isPropagationStopped = Ip, this;
    }
    return Y(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var s = this.nativeEvent;
        s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = yr);
      },
      stopPropagation: function() {
        var s = this.nativeEvent;
        s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = yr);
      },
      persist: function() {
      },
      isPersistent: yr
    }), n;
  }
  var Pi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, gr = Le(Pi), Yo = Y({}, Pi, { view: 0, detail: 0 }), kT = Le(Yo), Qc, Zc, Xo, vr = Y({}, Yo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Kc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Xo && (Xo && t.type === "mousemove" ? (Qc = t.screenX - Xo.screenX, Zc = t.screenY - Xo.screenY) : Zc = Qc = 0, Xo = t), Qc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Zc;
    }
  }), Jp = Le(vr), NT = Y({}, vr, { dataTransfer: 0 }), LT = Le(NT), BT = Y({}, Yo, { relatedTarget: 0 }), Fc = Le(BT), UT = Y({}, Pi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), HT = Le(UT), jT = Y({}, Pi, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), qT = Le(jT), PT = Y({}, Pi, { data: 0 }), $p = Le(PT), GT = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, YT = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, XT = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function QT(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = XT[t]) ? !!n[t] : !1;
  }
  function Kc() {
    return QT;
  }
  var ZT = Y({}, Yo, {
    key: function(t) {
      if (t.key) {
        var n = GT[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = pr(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? YT[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Kc,
    charCode: function(t) {
      return t.type === "keypress" ? pr(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? pr(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), FT = Le(ZT), KT = Y({}, vr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Wp = Le(KT), IT = Y({}, Pi, { submitter: 0 }), JT = Le(IT), $T = Y({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Kc
  }), WT = Le($T), tE = Y({}, Pi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eE = Le(tE), nE = Y({}, vr, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), iE = Le(nE), sE = Y({}, Pi, {
    newState: 0,
    oldState: 0,
    source: 0
  }), aE = Le(sE), oE = [9, 13, 27, 32], Ic = bi && "CompositionEvent" in window, Qo = null;
  bi && "documentMode" in document && (Qo = document.documentMode);
  var lE = bi && "TextEvent" in window && !Qo, ty = bi && (!Ic || Qo && 8 < Qo && 11 >= Qo), ey = " ", ny = !1;
  function iy(t, n) {
    switch (t) {
      case "keyup":
        return oE.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function sy(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Aa = !1;
  function rE(t, n) {
    switch (t) {
      case "compositionend":
        return sy(n);
      case "keypress":
        return n.which !== 32 ? null : (ny = !0, ey);
      case "textInput":
        return t = n.data, t === ey && ny ? null : t;
      default:
        return null;
    }
  }
  function uE(t, n) {
    if (Aa)
      return t === "compositionend" || !Ic && iy(t, n) ? (t = Kp(), mr = Xc = qi = null, Aa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return ty && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var cE = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ay(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!cE[t.type] : n === "textarea";
  }
  function oy(t, n, s, l) {
    Ma ? za ? za.push(l) : za = [l] : Ma = l, n = bu(n, "onChange"), 0 < n.length && (s = new gr(
      "onChange",
      "change",
      null,
      s,
      l
    ), t.push({ event: s, listeners: n }));
  }
  var Zo = null, Fo = null;
  function fE(t) {
    Zv(t, 0);
  }
  function br(t) {
    var n = qo(t);
    if (qp(n)) return t;
  }
  function ly(t, n) {
    if (t === "change") return n;
  }
  var ry = !1;
  if (bi) {
    var Jc;
    if (bi) {
      var $c = "oninput" in document;
      if (!$c) {
        var uy = document.createElement("div");
        uy.setAttribute("oninput", "return;"), $c = typeof uy.oninput == "function";
      }
      Jc = $c;
    } else Jc = !1;
    ry = Jc && (!document.documentMode || 9 < document.documentMode);
  }
  function cy() {
    Zo && (Zo.detachEvent("onpropertychange", fy), Fo = Zo = null);
  }
  function fy(t) {
    if (t.propertyName === "value" && br(Fo)) {
      var n = [];
      oy(
        n,
        Fo,
        t,
        Pc(t)
      ), Fp(fE, n);
    }
  }
  function hE(t, n, s) {
    t === "focusin" ? (cy(), Zo = n, Fo = s, Zo.attachEvent("onpropertychange", fy)) : t === "focusout" && cy();
  }
  function dE(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return br(Fo);
  }
  function mE(t, n) {
    if (t === "click") return br(n);
  }
  function pE(t, n) {
    if (t === "input" || t === "change")
      return br(n);
  }
  function yE(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var an = typeof Object.is == "function" ? Object.is : yE;
  function Ko(t, n) {
    if (an(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var s = Object.keys(t), l = Object.keys(n);
    if (s.length !== l.length) return !1;
    for (l = 0; l < s.length; l++) {
      var u = s[l];
      if (!Dc.call(n, u) || !an(t[u], n[u]))
        return !1;
    }
    return !0;
  }
  function Wc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function hy(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function dy(t, n) {
    var s = hy(t);
    t = 0;
    for (var l; s; ) {
      if (s.nodeType === 3) {
        if (l = t + s.textContent.length, t <= n && l >= n)
          return { node: s, offset: n - t };
        t = l;
      }
      t: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break t;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = hy(s);
    }
  }
  function my(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? my(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function py(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = Wc(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof n.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) t = n.contentWindow;
      else break;
      n = Wc(t.document);
    }
    return n;
  }
  function tf(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var gE = bi && "documentMode" in document && 11 >= document.documentMode, Oa = null, ef = null, Io = null, nf = !1;
  function yy(t, n, s) {
    var l = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    nf || Oa == null || Oa !== Wc(l) || (l = Oa, "selectionStart" in l && tf(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Io && Ko(Io, l) || (Io = l, l = bu(ef, "onSelect"), 0 < l.length && (n = new gr(
      "onSelect",
      "select",
      null,
      n,
      s
    ), t.push({ event: n, listeners: l }), n.target = Oa)));
  }
  function As(t, n) {
    var s = {};
    return s[t.toLowerCase()] = n.toLowerCase(), s["Webkit" + t] = "webkit" + n, s["Moz" + t] = "moz" + n, s;
  }
  var Da = {
    animationend: As("Animation", "AnimationEnd"),
    animationiteration: As("Animation", "AnimationIteration"),
    animationstart: As("Animation", "AnimationStart"),
    transitionrun: As("Transition", "TransitionRun"),
    transitionstart: As("Transition", "TransitionStart"),
    transitioncancel: As("Transition", "TransitionCancel"),
    transitionend: As("Transition", "TransitionEnd")
  }, sf = {}, gy = {};
  bi && (gy = document.createElement("div").style, "AnimationEvent" in window || (delete Da.animationend.animation, delete Da.animationiteration.animation, delete Da.animationstart.animation), "TransitionEvent" in window || delete Da.transitionend.transition);
  function Os(t) {
    if (sf[t]) return sf[t];
    if (!Da[t]) return t;
    var n = Da[t], s;
    for (s in n)
      if (n.hasOwnProperty(s) && s in gy)
        return sf[t] = n[s];
    return t;
  }
  var vy = Os("animationend"), by = Os("animationiteration"), xy = Os("animationstart"), vE = Os("transitionrun"), bE = Os("transitionstart"), xE = Os("transitioncancel"), Sy = Os("transitionend"), wy = /* @__PURE__ */ new Map(), af = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  af.push("scrollEnd");
  function Dn(t, n) {
    wy.set(t, n), zs(n, [t]);
  }
  var SE = 0;
  function xi(t, n) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (n.autoName !== null) return n.autoName;
    t = Nn.identifierPrefix;
    var s = SE++;
    return t = "_" + t + "t_" + s.toString(32) + "_", n.autoName = t;
  }
  function Ty(t) {
    if (t == null || typeof t == "string")
      return t;
    var n = null, s = Ja;
    if (s !== null)
      for (var l = 0; l < s.length; l++) {
        var u = t[s[l]];
        if (u != null) {
          if (u === "none") return "none";
          n = n == null ? u : n + (" " + u);
        }
      }
    return n ?? t.default;
  }
  function Si(t, n) {
    return t = Ty(t), n = Ty(n), n == null ? t === "auto" ? null : t : n === "auto" ? null : n;
  }
  var xr = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, gn = [], Ra = 0, of = 0;
  function Sr() {
    for (var t = Ra, n = of = Ra = 0; n < t; ) {
      var s = gn[n];
      gn[n++] = null;
      var l = gn[n];
      gn[n++] = null;
      var u = gn[n];
      gn[n++] = null;
      var h = gn[n];
      if (gn[n++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      h !== 0 && Ey(s, u, h);
    }
  }
  function wr(t, n, s, l) {
    gn[Ra++] = t, gn[Ra++] = n, gn[Ra++] = s, gn[Ra++] = l, of |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function lf(t, n, s, l) {
    return wr(t, n, s, l), Tr(t);
  }
  function Ds(t, n) {
    return wr(t, null, null, n), Tr(t);
  }
  function Ey(t, n, s) {
    t.lanes |= s;
    var l = t.alternate;
    l !== null && (l.lanes |= s);
    for (var u = !1, h = t.return; h !== null; )
      h.childLanes |= s, l = h.alternate, l !== null && (l.childLanes |= s), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (u = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, u && n !== null && (u = 31 - nn(s), t = h.hiddenUpdates, l = t[u], l === null ? t[u] = [n] : l.push(n), n.lane = s | 536870912), h) : null;
  }
  function Tr(t) {
    if (50 < vl)
      throw vl = 0, hu = null, Error(o(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Va = {};
  function wE(t, n, s, l) {
    this.tag = t, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Qe(t, n, s, l) {
    return new wE(t, n, s, l);
  }
  function rf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function wi(t, n) {
    var s = t.alternate;
    return s === null ? (s = Qe(
      t.tag,
      n,
      t.key,
      t.mode
    ), s.elementType = t.elementType, s.type = t.type, s.stateNode = t.stateNode, s.alternate = t, t.alternate = s) : (s.pendingProps = n, s.type = t.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = t.flags & 1206910976, s.childLanes = t.childLanes, s.lanes = t.lanes, s.child = t.child, s.memoizedProps = t.memoizedProps, s.memoizedState = t.memoizedState, s.updateQueue = t.updateQueue, n = t.dependencies, s.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, s.sibling = t.sibling, s.index = t.index, s.ref = t.ref, s.refCleanup = t.refCleanup, s;
  }
  function Cy(t, n) {
    t.flags &= 1206910978;
    var s = t.alternate;
    return s === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = s.childLanes, t.lanes = s.lanes, t.child = s.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = s.memoizedProps, t.memoizedState = s.memoizedState, t.updateQueue = s.updateQueue, t.type = s.type, n = s.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Er(t, n, s, l, u, h) {
    var y = 0;
    if (l = t, typeof l == "function") rf(l) && (y = 1);
    else if (typeof l == "string")
      y = IC(
        t,
        s,
        Kn.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (l) {
        case Wt:
          return t = Qe(31, s, n, u), t.elementType = Wt, t.lanes = h, t;
        case pt:
          return Rs(s.children, u, h, n);
        case bt:
          y = 8, u |= 24;
          break;
        case vt:
          return t = Qe(12, s, n, u | 2), t.elementType = vt, t.lanes = h, t;
        case at:
          return t = Qe(13, s, n, u), t.elementType = at, t.lanes = h, t;
        case I:
          return t = Qe(19, s, n, u), t.elementType = I, t.lanes = h, t;
        case Ye:
        case M:
          return t = u | 32, t = Qe(30, s, n, t), t.elementType = M, t.lanes = h, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case zt:
                y = 10;
                break t;
              case kt:
                y = 9;
                break t;
              case G:
                y = 11;
                break t;
              case mt:
                y = 14;
                break t;
              case X:
                y = 16, l = null;
                break t;
            }
          y = 29, s = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return n = Qe(y, s, n, u), n.elementType = t, n.type = l, n.lanes = h, n;
  }
  function Rs(t, n, s, l) {
    return t = Qe(7, t, l, n), t.lanes = s, t;
  }
  function uf(t, n, s) {
    return t = Qe(6, t, null, n), t.lanes = s, t;
  }
  function _y(t) {
    var n = Qe(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function cf(t, n, s) {
    return n = Qe(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = s, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var My = /* @__PURE__ */ new WeakMap();
  function vn(t, n) {
    if (typeof t == "object" && t !== null) {
      var s = My.get(t);
      return s !== void 0 ? s : (n = {
        value: t,
        source: n,
        stack: Sp(n)
      }, My.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Sp(n)
    };
  }
  var ka = [], Na = 0, Cr = null, Jo = 0, bn = [], xn = 0, Gi = null, Jn = 1, $n = "";
  function Ti(t, n) {
    ka[Na++] = Jo, ka[Na++] = Cr, Cr = t, Jo = n;
  }
  function zy(t, n, s) {
    bn[xn++] = Jn, bn[xn++] = $n, bn[xn++] = Gi, Gi = t;
    var l = Jn;
    t = $n;
    var u = 32 - nn(l) - 1;
    l &= ~(1 << u), s += 1;
    var h = 32 - nn(n) + u;
    if (30 < h) {
      var y = u - u % 5;
      h = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, Jn = 1 << 32 - nn(n) + u | s << u | l, $n = h + t;
    } else
      Jn = 1 << h | s << u | l, $n = t;
  }
  function _r(t) {
    t.return !== null && (Ti(t, 1), zy(t, 1, 0));
  }
  function ff(t) {
    for (; t === Cr; )
      Cr = ka[--Na], ka[Na] = null, Jo = ka[--Na], ka[Na] = null;
    for (; t === Gi; )
      Gi = bn[--xn], bn[xn] = null, $n = bn[--xn], bn[xn] = null, Jn = bn[--xn], bn[xn] = null;
  }
  function Ay(t, n) {
    bn[xn++] = Jn, bn[xn++] = $n, bn[xn++] = Gi, Jn = n.id, $n = n.overflow, Gi = t;
  }
  var me = null, Xt = null, xt = !1, Yi = null, Sn = !1, hf = Error(o(519));
  function Xi(t) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $o(vn(n, t)), hf;
  }
  function Oy(t) {
    var n = t.stateNode, s = t.type, l = t.memoizedProps;
    switch (n[be] = t, n[Xe] = l, s) {
      case "dialog":
        Tt("cancel", n), Tt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Tt("load", n);
        break;
      case "video":
      case "audio":
        for (s = 0; s < xl.length; s++)
          Tt(xl[s], n);
        break;
      case "source":
        Tt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Tt("error", n), Tt("load", n);
        break;
      case "details":
        Tt("toggle", n);
        break;
      case "input":
        Tt("invalid", n), Pp(
          n,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        Tt("invalid", n);
        break;
      case "textarea":
        Tt("invalid", n), Yp(n, l.value, l.defaultValue, l.children);
    }
    s = l.children, typeof s != "string" && typeof s != "number" && typeof s != "bigint" || n.textContent === "" + s || l.suppressHydrationWarning === !0 || Jv(n.textContent, s) ? (l.popover != null && (Tt("beforetoggle", n), Tt("toggle", n)), l.onScroll != null && Tt("scroll", n), l.onScrollEnd != null && Tt("scrollend", n), l.onClick != null && (n.onclick = In), n = !0) : n = !1, n || Xi(t, !0);
  }
  function Mr(t) {
    for (me = t.return; me; )
      switch (me.tag) {
        case 5:
        case 31:
        case 13:
          Sn = !1;
          return;
        case 27:
        case 3:
          Sn = !0;
          return;
        default:
          me = me.return;
      }
  }
  function La(t) {
    if (t !== me) return !1;
    if (!xt) return Mr(t), xt = !0, !1;
    var n = t.tag, s;
    if ((s = n !== 3 && n !== 27) && ((s = n === 5) && (s = t.type, s = !(s !== "form" && s !== "button") || Ph(t.type, t.memoizedProps)), s = !s), s && Xt && Xi(t), Mr(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Xt = yb(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Xt = yb(t);
    } else
      n === 27 ? (n = Xt, ls(t.type) ? (t = Jh, Jh = null, Xt = t) : Xt = n) : Xt = me ? Tn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Vs() {
    Xt = me = null, xt = !1;
  }
  function df() {
    var t = Yi;
    return t !== null && (Ke === null ? Ke = t : Ke.push.apply(
      Ke,
      t
    ), Yi = null), t;
  }
  function $o(t) {
    Yi === null ? Yi = [t] : Yi.push(t);
  }
  var mf = Fn(null), ks = null, Ei = null;
  function Qi(t, n, s) {
    Yt(mf, n._currentValue), n._currentValue = s;
  }
  function Ci(t) {
    t._currentValue = mf.current, ve(mf);
  }
  function zr(t, n, s) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), t === s) break;
      t = t.return;
    }
  }
  function pf(t, n, s, l) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var h = u.dependencies;
      if (h !== null) {
        var y = u.child;
        h = h.firstContext;
        t: for (; h !== null; ) {
          var x = h;
          h = u;
          for (var T = 0; T < n.length; T++)
            if (x.context === n[T]) {
              h.lanes |= s, x = h.alternate, x !== null && (x.lanes |= s), zr(
                h.return,
                s,
                t
              ), l || (y = null);
              break t;
            }
          h = x.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(o(341));
        y.lanes |= s, h = y.alternate, h !== null && (h.lanes |= s), zr(y, s, t), y = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= s, y = u.alternate, y !== null && (y.lanes |= s), zr(
          u.return,
          s,
          t
        ), y = u.child, y = y !== null ? y.sibling : null) : y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === t) {
            y = null;
            break;
          }
          if (u = y.sibling, u !== null) {
            u.return = y.return, y = u;
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function Ns(t, n, s, l) {
    t = null;
    for (var u = n, h = !1; u !== null; ) {
      if (!h) {
        if ((u.flags & 524288) !== 0) h = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(o(387));
        if (y = y.memoizedProps, y !== null) {
          var x = u.type;
          an(u.pendingProps.value, y.value) || (t !== null ? t.push(x) : t = [x]);
        }
      } else if (u === er.current) {
        if (y = u.alternate, y === null) throw Error(o(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(lo) : t = [lo]);
      }
      u = u.return;
    }
    return t !== null && pf(
      n,
      t,
      s,
      l
    ), n.flags |= 262144, t !== null;
  }
  function Ar(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!an(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ls(t) {
    ks = t, Ei = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function xe(t) {
    return Dy(ks, t);
  }
  function Or(t, n) {
    return ks === null && Ls(t), Dy(t, n);
  }
  function Dy(t, n) {
    var s = n._currentValue;
    if (n = { context: n, memoizedValue: s, next: null }, Ei === null) {
      if (t === null) throw Error(o(308));
      Ei = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Ei = Ei.next = n;
    return s;
  }
  var TE = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(s, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(s) {
        return s();
      });
    };
  }, EE = i.unstable_scheduleCallback, CE = i.unstable_NormalPriority, ne = {
    $$typeof: zt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function yf() {
    return {
      controller: new TE(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Wo(t) {
    t.refCount--, t.refCount === 0 && EE(CE, function() {
      t.controller.abort();
    });
  }
  function Ry(t, n) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var s = t.transitionTypes;
      for (s === null && (s = t.transitionTypes = []), t = 0; t < n.length; t++) {
        var l = n[t];
        s.indexOf(l) === -1 && s.push(l);
      }
    }
  }
  var tl = null;
  function _E(t) {
    var n = t.transitionTypes;
    return t.transitionTypes = null, n;
  }
  var el = null, gf = 0, Bs = 0, Ba = null;
  function ME(t, n) {
    if (el === null) {
      var s = el = [];
      gf = 0, Bs = Vh(), Ba = {
        status: "pending",
        value: void 0,
        then: function(l) {
          s.push(l);
        }
      };
    }
    return gf++, n.then(Vy, Vy), n;
  }
  function Vy() {
    if (--gf === 0 && (tl = null, el !== null)) {
      Ba !== null && (Ba.status = "fulfilled");
      var t = el;
      el = null, Bs = 0, Ba = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function zE(t, n) {
    var s = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        s.push(u);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = n;
        for (var u = 0; u < s.length; u++) (0, s[u])(n);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < s.length; u++)
          (0, s[u])(void 0);
      }
    ), l;
  }
  var ky = et.S;
  et.S = function(t, n) {
    if (_v = tn(), typeof n == "object" && n !== null && typeof n.then == "function" && ME(t, n), tl !== null)
      for (var s = eo; s !== null; )
        Ry(s, tl), s = s.next;
    if (s = t.types, s !== null) {
      for (var l = eo; l !== null; )
        Ry(l, s), l = l.next;
      if (Bs !== 0) {
        l = tl, l === null && (l = tl = []);
        for (var u = 0; u < s.length; u++) {
          var h = s[u];
          l.indexOf(h) === -1 && l.push(h);
        }
      }
    }
    ky !== null && ky(t, n);
  };
  var Us = Fn(null);
  function vf() {
    var t = Us.current;
    return t !== null ? t : qt.pooledCache;
  }
  function Dr(t, n) {
    n === null ? Yt(Us, Us.current) : Yt(Us, n.pool);
  }
  function Ny() {
    var t = vf();
    return t === null ? null : { parent: ne._currentValue, pool: t };
  }
  var Ua = Error(o(460)), bf = Error(o(474)), Rr = Error(o(542)), Vr = { then: function() {
  } };
  function Ly(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function By(t, n, s) {
    switch (s = t[s], s === void 0 ? t.push(n) : s !== n && (n.then(In, In), n = s), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Hy(t), t === void 0 && !("reason" in n) ? Error(o(600)) : t;
      default:
        if (typeof n.status == "string") n.then(In, In);
        else {
          if (t = qt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = n, t.status = "pending", t.then(
            function(l) {
              if (n.status === "pending") {
                var u = n;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (n.status === "pending") {
                var u = n;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw t = n.reason, Hy(t), t;
        }
        throw js = n, Ua;
    }
  }
  function Hs(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (s) {
      throw s !== null && typeof s == "object" && typeof s.then == "function" ? (js = s, Ua) : s;
    }
  }
  var js = null;
  function Uy() {
    if (js === null) throw Error(o(459));
    var t = js;
    return js = null, t;
  }
  function Hy(t) {
    if (t === Ua || t === Rr)
      throw Error(o(483));
  }
  var Ha = null, nl = 0;
  function kr(t) {
    var n = nl;
    return nl += 1, Ha === null && (Ha = []), By(Ha, t, n);
  }
  function Zi(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Nr(t, n) {
    throw n.$$typeof === B ? Error(o(525)) : (t = Object.prototype.toString.call(n), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function jy(t) {
    function n(A, _) {
      if (t) {
        var D = A.deletions;
        D === null ? (A.deletions = [_], A.flags |= 16) : D.push(_);
      }
    }
    function s(A, _) {
      if (!t) return null;
      for (; _ !== null; )
        n(A, _), _ = _.sibling;
      return null;
    }
    function l(A) {
      for (var _ = /* @__PURE__ */ new Map(); A !== null; )
        A.key === null ? _.set(A.index, A) : _.set(A.key, A), A = A.sibling;
      return _;
    }
    function u(A, _) {
      return A = wi(A, _), A.index = 0, A.sibling = null, A;
    }
    function h(A, _, D) {
      return A.index = D, t ? (D = A.alternate, D !== null ? (D = D.index, D < _ ? (A.flags |= 2, _) : D) : (A.flags |= 134217730, _)) : (A.flags |= 1048576, _);
    }
    function y(A) {
      return t && A.alternate === null && (A.flags |= 134217730), A;
    }
    function x(A, _, D, H) {
      return _ === null || _.tag !== 6 ? (_ = uf(D, A.mode, H), _.return = A, _) : (_ = u(_, D), _.return = A, _);
    }
    function T(A, _, D, H) {
      var $ = D.type;
      return $ === pt ? (A = N(
        A,
        _,
        D.props.children,
        H,
        D.key
      ), Zi(A, D), A) : _ !== null && (_.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === X && Hs($) === _.type) ? (_ = u(_, D.props), Zi(_, D), _.return = A, _) : (_ = Er(
        D.type,
        D.key,
        D.props,
        null,
        A.mode,
        H
      ), Zi(_, D), _.return = A, _);
    }
    function O(A, _, D, H) {
      return _ === null || _.tag !== 4 || _.stateNode.containerInfo !== D.containerInfo || _.stateNode.implementation !== D.implementation ? (_ = cf(D, A.mode, H), _.return = A, _) : (_ = u(_, D.children || []), _.return = A, _);
    }
    function N(A, _, D, H, $) {
      return _ === null || _.tag !== 7 ? (_ = Rs(
        D,
        A.mode,
        H,
        $
      ), _.return = A, _) : (_ = u(_, D), _.return = A, _);
    }
    function j(A, _, D) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return _ = uf(
          "" + _,
          A.mode,
          D
        ), _.return = A, _;
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case rt:
            return D = Er(
              _.type,
              _.key,
              _.props,
              null,
              A.mode,
              D
            ), Zi(D, _), D.return = A, D;
          case F:
            return _ = cf(
              _,
              A.mode,
              D
            ), _.return = A, _;
          case X:
            return _ = Hs(_), j(A, _, D);
        }
        if (At(_) || st(_))
          return _ = Rs(
            _,
            A.mode,
            D,
            null
          ), _.return = A, _;
        if (typeof _.then == "function")
          return j(A, kr(_), D);
        if (_.$$typeof === zt)
          return j(
            A,
            Or(A, _),
            D
          );
        Nr(A, _);
      }
      return null;
    }
    function z(A, _, D, H) {
      var $ = _ !== null ? _.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return $ !== null ? null : x(A, _, "" + D, H);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case rt:
            return D.key === $ ? T(A, _, D, H) : null;
          case F:
            return D.key === $ ? O(A, _, D, H) : null;
          case X:
            return D = Hs(D), z(A, _, D, H);
        }
        if (At(D) || st(D))
          return $ !== null ? null : N(A, _, D, H, null);
        if (typeof D.then == "function")
          return z(
            A,
            _,
            kr(D),
            H
          );
        if (D.$$typeof === zt)
          return z(
            A,
            _,
            Or(A, D),
            H
          );
        Nr(A, D);
      }
      return null;
    }
    function V(A, _, D, H, $) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return A = A.get(D) || null, x(_, A, "" + H, $);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case rt:
            return A = A.get(
              H.key === null ? D : H.key
            ) || null, T(_, A, H, $);
          case F:
            return A = A.get(
              H.key === null ? D : H.key
            ) || null, O(_, A, H, $);
          case X:
            return H = Hs(H), V(
              A,
              _,
              D,
              H,
              $
            );
        }
        if (At(H) || st(H))
          return A = A.get(D) || null, N(_, A, H, $, null);
        if (typeof H.then == "function")
          return V(
            A,
            _,
            D,
            kr(H),
            $
          );
        if (H.$$typeof === zt)
          return V(
            A,
            _,
            D,
            Or(_, H),
            $
          );
        Nr(_, H);
      }
      return null;
    }
    function Z(A, _, D, H) {
      for (var $ = null, _t = null, ot = _, ft = _ = 0, ae = null; ot !== null && ft < D.length; ft++) {
        ot.index > ft ? (ae = ot, ot = null) : ae = ot.sibling;
        var Ot = z(
          A,
          ot,
          D[ft],
          H
        );
        if (Ot === null) {
          ot === null && (ot = ae);
          break;
        }
        t && ot && Ot.alternate === null && n(A, ot), _ = h(Ot, _, ft), _t === null ? $ = Ot : _t.sibling = Ot, _t = Ot, ot = ae;
      }
      if (ft === D.length)
        return s(A, ot), xt && Ti(A, ft), $;
      if (ot === null) {
        for (; ft < D.length; ft++)
          ot = j(A, D[ft], H), ot !== null && (_ = h(
            ot,
            _,
            ft
          ), _t === null ? $ = ot : _t.sibling = ot, _t = ot);
        return xt && Ti(A, ft), $;
      }
      for (ot = l(ot); ft < D.length; ft++)
        ae = V(
          ot,
          A,
          ft,
          D[ft],
          H
        ), ae !== null && (t && (Ot = ae.alternate, Ot !== null && ot.delete(Ot.key === null ? ft : Ot.key)), _ = h(
          ae,
          _,
          ft
        ), _t === null ? $ = ae : _t.sibling = ae, _t = ae);
      return t && ot.forEach(function(hs) {
        return n(A, hs);
      }), xt && Ti(A, ft), $;
    }
    function nt(A, _, D, H) {
      if (D == null) throw Error(o(151));
      for (var $ = null, _t = null, ot = _, ft = _ = 0, ae = null, Ot = D.next(); ot !== null && !Ot.done; ft++, Ot = D.next()) {
        ot.index > ft ? (ae = ot, ot = null) : ae = ot.sibling;
        var hs = z(A, ot, Ot.value, H);
        if (hs === null) {
          ot === null && (ot = ae);
          break;
        }
        t && ot && hs.alternate === null && n(A, ot), _ = h(hs, _, ft), _t === null ? $ = hs : _t.sibling = hs, _t = hs, ot = ae;
      }
      if (Ot.done)
        return s(A, ot), xt && Ti(A, ft), $;
      if (ot === null) {
        for (; !Ot.done; ft++, Ot = D.next())
          Ot = j(A, Ot.value, H), Ot !== null && (_ = h(Ot, _, ft), _t === null ? $ = Ot : _t.sibling = Ot, _t = Ot);
        return xt && Ti(A, ft), $;
      }
      for (ot = l(ot); !Ot.done; ft++, Ot = D.next())
        Ot = V(ot, A, ft, Ot.value, H), Ot !== null && (t && (ae = Ot.alternate, ae !== null && ot.delete(
          ae.key === null ? ft : ae.key
        )), _ = h(Ot, _, ft), _t === null ? $ = Ot : _t.sibling = Ot, _t = Ot);
      return t && ot.forEach(function(r_) {
        return n(A, r_);
      }), xt && Ti(A, ft), $;
    }
    function gt(A, _, D, H) {
      if (typeof D == "object" && D !== null && D.type === pt && D.key === null && D.props.ref === void 0 && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case rt:
            t: {
              for (var $ = D.key; _ !== null; ) {
                if (_.key === $) {
                  if ($ = D.type, $ === pt) {
                    if (_.tag === 7) {
                      s(
                        A,
                        _.sibling
                      ), H = u(
                        _,
                        D.props.children
                      ), Zi(H, D), H.return = A, A = H;
                      break t;
                    }
                  } else if (_.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === X && Hs($) === _.type) {
                    s(
                      A,
                      _.sibling
                    ), H = u(_, D.props), Zi(H, D), H.return = A, A = H;
                    break t;
                  }
                  s(A, _);
                  break;
                } else n(A, _);
                _ = _.sibling;
              }
              D.type === pt ? (H = Rs(
                D.props.children,
                A.mode,
                H,
                D.key
              ), Zi(H, D), H.return = A, A = H) : (H = Er(
                D.type,
                D.key,
                D.props,
                null,
                A.mode,
                H
              ), Zi(H, D), H.return = A, A = H);
            }
            return y(A);
          case F:
            t: {
              for ($ = D.key; _ !== null; ) {
                if (_.key === $)
                  if (_.tag === 4 && _.stateNode.containerInfo === D.containerInfo && _.stateNode.implementation === D.implementation) {
                    s(
                      A,
                      _.sibling
                    ), H = u(_, D.children || []), H.return = A, A = H;
                    break t;
                  } else {
                    s(A, _);
                    break;
                  }
                else n(A, _);
                _ = _.sibling;
              }
              H = cf(D, A.mode, H), H.return = A, A = H;
            }
            return y(A);
          case X:
            return D = Hs(D), gt(
              A,
              _,
              D,
              H
            );
        }
        if (At(D))
          return Z(
            A,
            _,
            D,
            H
          );
        if (st(D)) {
          if ($ = st(D), typeof $ != "function") throw Error(o(150));
          return D = $.call(D), nt(
            A,
            _,
            D,
            H
          );
        }
        if (typeof D.then == "function")
          return gt(
            A,
            _,
            kr(D),
            H
          );
        if (D.$$typeof === zt)
          return gt(
            A,
            _,
            Or(A, D),
            H
          );
        Nr(A, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, _ !== null && _.tag === 6 ? (s(A, _.sibling), H = u(_, D), H.return = A, A = H) : (s(A, _), H = uf(D, A.mode, H), H.return = A, A = H), y(A)) : s(A, _);
    }
    return function(A, _, D, H) {
      try {
        nl = 0;
        var $ = gt(
          A,
          _,
          D,
          H
        );
        return Ha = null, $;
      } catch (ot) {
        if (ot === Ua || ot === Rr) throw ot;
        var _t = Qe(29, ot, null, A.mode);
        return _t.lanes = H, _t.return = A, _t;
      } finally {
      }
    };
  }
  var qs = jy(!0), qy = jy(!1), Fi = !1;
  function xf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Sf(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ki(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ii(t, n, s) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Vt & 2) !== 0) {
      var u = l.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n, n = Tr(t), Ey(t, null, s), n;
    }
    return wr(t, l, n, s), Tr(t);
  }
  function il(t, n, s) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (s & 4194048) !== 0)) {
      var l = n.lanes;
      l &= t.pendingLanes, s |= l, n.lanes = s, zp(t, s);
    }
  }
  function wf(t, n) {
    var s = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, s === l)) {
      var u = null, h = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var y = {
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          };
          h === null ? u = h = y : h = h.next = y, s = s.next;
        } while (s !== null);
        h === null ? u = h = n : h = h.next = n;
      } else u = h = n;
      s = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: h,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = s;
      return;
    }
    t = s.lastBaseUpdate, t === null ? s.firstBaseUpdate = n : t.next = n, s.lastBaseUpdate = n;
  }
  var Tf = !1;
  function sl() {
    if (Tf) {
      var t = Ba;
      if (t !== null) throw t;
    }
  }
  function al(t, n, s, l) {
    Tf = !1;
    var u = t.updateQueue;
    Fi = !1;
    var h = u.firstBaseUpdate, y = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var T = x, O = T.next;
      T.next = null, y === null ? h = O : y.next = O, y = T;
      var N = t.alternate;
      N !== null && (N = N.updateQueue, x = N.lastBaseUpdate, x !== y && (x === null ? N.firstBaseUpdate = O : x.next = O, N.lastBaseUpdate = T));
    }
    if (h !== null) {
      var j = u.baseState;
      y = 0, N = O = T = null, x = h;
      do {
        var z = x.lane & -536870913, V = z !== x.lane;
        if (V ? (Ct & z) === z : (l & z) === z) {
          z !== 0 && z === Bs && (Tf = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          t: {
            var Z = t, nt = x;
            z = n;
            var gt = s;
            switch (nt.tag) {
              case 1:
                if (Z = nt.payload, typeof Z == "function") {
                  j = Z.call(gt, j, z);
                  break t;
                }
                j = Z;
                break t;
              case 3:
                Z.flags = Z.flags & -65537 | 128;
              case 0:
                if (Z = nt.payload, z = typeof Z == "function" ? Z.call(gt, j, z) : Z, z == null) break t;
                j = Y({}, j, z);
                break t;
              case 2:
                Fi = !0;
            }
          }
          z = x.callback, z !== null && (t.flags |= 64, V && (t.flags |= 8192), V = u.callbacks, V === null ? u.callbacks = [z] : V.push(z));
        } else
          V = {
            lane: z,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, N === null ? (O = N = V, T = j) : N = N.next = V, y |= z;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          V = x, x = V.next, V.next = null, u.lastBaseUpdate = V, u.shared.pending = null;
        }
      } while (!0);
      N === null && (T = j), u.baseState = T, u.firstBaseUpdate = O, u.lastBaseUpdate = N, h === null && (u.shared.lanes = 0), is |= y, t.lanes = y, t.memoizedState = j;
    }
  }
  function Py(t, n) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(n);
  }
  function Gy(t, n) {
    var s = t.callbacks;
    if (s !== null)
      for (t.callbacks = null, t = 0; t < s.length; t++)
        Py(s[t], n);
  }
  var Ji = Fn(null), Lr = Fn(0);
  function Yy(t, n) {
    t = Oi, Yt(Lr, t), Yt(Ji, n), Oi = t | n.baseLanes;
  }
  function Ef() {
    Yt(Lr, Oi), Yt(Ji, Ji.current);
  }
  function Cf() {
    Oi = Lr.current, ve(Ji), ve(Lr);
  }
  var Se = Fn(null), Ae = null;
  function $i(t) {
    var n = t.alternate;
    Yt(we, we.current & 1), Yt(Se, t), Ae === null && (n === null || Ji.current !== null || n.memoizedState !== null) && (Ae = t);
  }
  function _f(t) {
    Yt(we, we.current), Yt(Se, t), Ae === null && (Ae = t);
  }
  function Xy(t) {
    t.tag === 22 ? (Yt(we, we.current), Yt(Se, t), Ae === null && (Ae = t)) : Wi();
  }
  function Wi() {
    Yt(we, we.current), Yt(Se, Se.current);
  }
  function on(t) {
    ve(Se), Ae === t && (Ae = null), ve(we);
  }
  var we = Fn(0);
  function ol(t, n) {
    Yt(Se, Se.current), Yt(we, n);
  }
  function Mf(t) {
    ve(we), ve(Se), Ae === t && (Ae = null);
  }
  function Br(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var s = n.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || Kh(s) || Ih(s)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== "independent") {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var _i = 0, yt = null, Ht = null, ie = null, Ur = !1, ja = !1, Ps = !1, Hr = 0, ll = 0, qa = null, AE = 0;
  function It() {
    throw Error(o(321));
  }
  function zf(t, n) {
    if (n === null) return !1;
    for (var s = 0; s < n.length && s < t.length; s++)
      if (!an(t[s], n[s])) return !1;
    return !0;
  }
  function Af(t, n, s, l, u, h) {
    return _i = h, yt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, et.H = t === null || t.memoizedState === null ? zg : Ag, Ps = !1, h = s(l, u), Ps = !1, ja && (h = Zy(
      n,
      s,
      l,
      u
    )), Qy(t), h;
  }
  function Qy(t) {
    et.H = Qr;
    var n = Ht !== null && Ht.next !== null;
    if (_i = 0, ie = Ht = yt = null, Ur = !1, ll = 0, qa = null, n) throw Error(o(300));
    t === null || se || (t = t.dependencies, t !== null && Ar(t) && (se = !0));
  }
  function Zy(t, n, s, l) {
    yt = t;
    var u = 0;
    do {
      if (ja && (qa = null), ll = 0, ja = !1, 25 <= u) throw Error(o(301));
      if (u += 1, ie = Ht = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      et.H = BE, h = n(s, l);
    } while (ja);
    return h;
  }
  function OE() {
    var t = et.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? rl(n) : n, t = t.useState()[0], (Ht !== null ? Ht.memoizedState : null) !== t && (yt.flags |= 1024), n;
  }
  function Of() {
    var t = Hr !== 0;
    return Hr = 0, t;
  }
  function Df(t, n, s) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~s;
  }
  function Rf(t) {
    if (Ur) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Ur = !1;
    }
    _i = 0, ie = Ht = yt = null, ja = !1, ll = Hr = 0, qa = null;
  }
  function Be() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ie === null ? yt.memoizedState = ie = t : ie = ie.next = t, ie;
  }
  function te() {
    if (Ht === null) {
      var t = yt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ht.next;
    var n = ie === null ? yt.memoizedState : ie.next;
    if (n !== null)
      ie = n, Ht = t;
    else {
      if (t === null)
        throw yt.alternate === null ? Error(o(467)) : Error(o(310));
      Ht = t, t = {
        memoizedState: Ht.memoizedState,
        baseState: Ht.baseState,
        baseQueue: Ht.baseQueue,
        queue: Ht.queue,
        next: null
      }, ie === null ? yt.memoizedState = ie = t : ie = ie.next = t;
    }
    return ie;
  }
  function jr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function rl(t) {
    var n = ll;
    return ll += 1, qa === null && (qa = []), t = By(qa, t, n), n = yt, (ie === null ? n.memoizedState : ie.next) === null && (n = n.alternate, et.H = n === null || n.memoizedState === null ? zg : Ag), t;
  }
  function qr(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return rl(t);
      if (t.$$typeof === q) return;
      if (t.$$typeof === zt) return xe(t);
    }
    throw Error(o(438, String(t)));
  }
  function Vf(t) {
    var n = null, s = yt.updateQueue;
    if (s !== null && (n = s.memoCache), n == null) {
      var l = yt.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), s === null && (s = jr(), yt.updateQueue = s), s.memoCache = n, s = n.data[n.index], s === void 0)
      for (s = n.data[n.index] = Array(t), l = 0; l < t; l++)
        s[l] = Zn;
    return n.index++, s;
  }
  function Mi(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Pr(t) {
    var n = te();
    return kf(n, Ht, t);
  }
  function kf(t, n, s) {
    var l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = s;
    var u = t.baseQueue, h = l.pending;
    if (h !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = h.next, h.next = y;
      }
      n.baseQueue = u = h, l.pending = null;
    }
    if (h = t.baseState, u === null) t.memoizedState = h;
    else {
      n = u.next;
      var x = y = null, T = null, O = n, N = !1;
      do {
        var j = O.lane & -536870913;
        if (j !== O.lane ? (Ct & j) === j : (_i & j) === j) {
          var z = O.revertLane;
          if (z === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), j === Bs && (N = !0);
          else if ((_i & z) === z) {
            O = O.next, z === Bs && (N = !0);
            continue;
          } else
            j = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, T === null ? (x = T = j, y = h) : T = T.next = j, yt.lanes |= z, is |= z;
          j = O.action, Ps && s(h, j), h = O.hasEagerState ? O.eagerState : s(h, j);
        } else
          z = {
            lane: j,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, T === null ? (x = T = z, y = h) : T = T.next = z, yt.lanes |= j, is |= j;
        O = O.next;
      } while (O !== null && O !== n);
      if (T === null ? y = h : T.next = x, !an(h, t.memoizedState) && (se = !0, N && (s = Ba, s !== null)))
        throw s;
      t.memoizedState = h, t.baseState = y, t.baseQueue = T, l.lastRenderedState = h;
    }
    return u === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function Nf(t) {
    var n = te(), s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var l = s.dispatch, u = s.pending, h = n.memoizedState;
    if (u !== null) {
      s.pending = null;
      var y = u = u.next;
      do
        h = t(h, y.action), y = y.next;
      while (y !== u);
      an(h, n.memoizedState) || (se = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), s.lastRenderedState = h;
    }
    return [h, l];
  }
  function Fy(t, n, s) {
    var l = yt, u = te(), h = xt;
    if (h) {
      if (s === void 0) throw Error(o(407));
      s = s();
    } else s = n();
    var y = !an(
      (Ht || u).memoizedState,
      s
    );
    if (y && (u.memoizedState = s, se = !0), u = u.queue, Uf(Jy.bind(null, l, u, t), [
      t
    ]), t = u.getSnapshot !== n || y || ie !== null && (ie.memoizedState.tag & 1) !== 0, Pa(
      t ? 9 : 8,
      { destroy: void 0 },
      Iy.bind(null, l, u, s, n),
      null
    ), t) {
      if (l.flags |= 2048, qt === null) throw Error(o(349));
      h || (_i & 127) !== 0 || Ky(l, n, s);
    }
    return s;
  }
  function Ky(t, n, s) {
    t.flags |= 16384, t = { getSnapshot: n, value: s }, n = yt.updateQueue, n === null ? (n = jr(), yt.updateQueue = n, n.stores = [t]) : (s = n.stores, s === null ? n.stores = [t] : s.push(t));
  }
  function Iy(t, n, s, l) {
    n.value = s, n.getSnapshot = l, $y(n) && Wy(t);
  }
  function Jy(t, n, s) {
    return s(function() {
      $y(n) && Wy(t);
    });
  }
  function $y(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var s = n();
      return !an(t, s);
    } catch {
      return !0;
    }
  }
  function Wy(t) {
    var n = Ds(t, 2);
    n !== null && Ie(n, t, 2);
  }
  function Lf(t) {
    var n = Be();
    if (typeof t == "function") {
      var s = t;
      if (t = s(), Ps) {
        ji(!0);
        try {
          s();
        } finally {
          ji(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mi,
      lastRenderedState: t
    }, n;
  }
  function tg(t, n, s, l) {
    return t.baseState = s, kf(
      t,
      Ht,
      typeof l == "function" ? l : Mi
    );
  }
  function DE(t, n, s, l, u) {
    if (Xr(t)) throw Error(o(485));
    if (t = n.action, t !== null) {
      var h = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          h.listeners.push(y);
        }
      };
      et.T !== null ? s(!0) : h.isTransition = !1, l(h), s = n.pending, s === null ? (h.next = n.pending = h, eg(n, h)) : (h.next = s.next, n.pending = s.next = h);
    }
  }
  function eg(t, n) {
    var s = n.action, l = n.payload, u = t.state;
    if (n.isTransition) {
      var h = et.T, y = {};
      y.types = h !== null ? h.types : null, et.T = y;
      try {
        var x = s(u, l), T = et.S;
        T !== null && T(y, x), ng(t, n, x);
      } catch (O) {
        Bf(t, n, O);
      } finally {
        h !== null && y.types !== null && (h.types = y.types), et.T = h;
      }
    } else
      try {
        h = s(u, l), ng(t, n, h);
      } catch (O) {
        Bf(t, n, O);
      }
  }
  function ng(t, n, s) {
    s !== null && typeof s == "object" && typeof s.then == "function" ? s.then(
      function(l) {
        ig(t, n, l);
      },
      function(l) {
        return Bf(t, n, l);
      }
    ) : ig(t, n, s);
  }
  function ig(t, n, s) {
    n.status = "fulfilled", n.value = s, sg(n), t.state = s, n = t.pending, n !== null && (s = n.next, s === n ? t.pending = null : (s = s.next, n.next = s, eg(t, s)));
  }
  function Bf(t, n, s) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = s, sg(n), n = n.next;
      while (n !== l);
    }
    t.action = null;
  }
  function sg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function ag(t, n) {
    return n;
  }
  function og(t, n) {
    if (xt) {
      var s = qt.formState;
      if (s !== null) {
        t: {
          var l = yt;
          if (xt) {
            if (Xt) {
              e: {
                for (var u = Xt, h = Sn; u.nodeType !== 8; ) {
                  if (!h) {
                    u = null;
                    break e;
                  }
                  if (u = Tn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                h = u.data, u = h === "F!" || h === "F" ? u : null;
              }
              if (u) {
                Xt = Tn(
                  u.nextSibling
                ), l = u.data === "F!";
                break t;
              }
            }
            Xi(l);
          }
          l = !1;
        }
        l && (n = s[0]);
      }
    }
    return s = Be(), s.memoizedState = s.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ag,
      lastRenderedState: n
    }, s.queue = l, s = Cg.bind(
      null,
      yt,
      l
    ), l.dispatch = s, l = Lf(!1), h = Gf.bind(
      null,
      yt,
      !1,
      l.queue
    ), l = Be(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = u, s = DE.bind(
      null,
      yt,
      u,
      h,
      s
    ), u.dispatch = s, l.memoizedState = t, [n, s, !1];
  }
  function lg(t) {
    var n = te();
    return rg(n, Ht, t);
  }
  function rg(t, n, s) {
    if (n = kf(
      t,
      n,
      ag
    )[0], t = Pr(Mi)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = rl(n);
      } catch (y) {
        throw y === Ua ? Rr : y;
      }
    else l = n;
    n = te();
    var u = n.queue, h = u.dispatch;
    return s !== n.memoizedState && (yt.flags |= 2048, Pa(
      9,
      { destroy: void 0 },
      RE.bind(null, u, s),
      null
    )), [l, h, t];
  }
  function RE(t, n) {
    t.action = n;
  }
  function ug(t) {
    var n = te(), s = Ht;
    if (s !== null)
      return rg(n, s, t);
    te(), n = n.memoizedState, s = te();
    var l = s.queue.dispatch;
    return s.memoizedState = t, [n, l, !1];
  }
  function Pa(t, n, s, l) {
    return t = { tag: t, create: s, deps: l, inst: n, next: null }, n = yt.updateQueue, n === null && (n = jr(), yt.updateQueue = n), s = n.lastEffect, s === null ? n.lastEffect = t.next = t : (l = s.next, s.next = t, t.next = l, n.lastEffect = t), t;
  }
  function cg() {
    return te().memoizedState;
  }
  function Gr(t, n, s, l) {
    var u = Be();
    yt.flags |= t, u.memoizedState = Pa(
      1 | n,
      { destroy: void 0 },
      s,
      l === void 0 ? null : l
    );
  }
  function Yr(t, n, s, l) {
    var u = te();
    l = l === void 0 ? null : l;
    var h = u.memoizedState.inst;
    Ht !== null && l !== null && zf(l, Ht.memoizedState.deps) ? u.memoizedState = Pa(n, h, s, l) : (yt.flags |= t, u.memoizedState = Pa(
      1 | n,
      h,
      s,
      l
    ));
  }
  function fg(t, n) {
    Gr(8390656, 8, t, n);
  }
  function Uf(t, n) {
    Yr(2048, 8, t, n);
  }
  function VE(t) {
    yt.flags |= 4;
    var n = yt.updateQueue;
    if (n === null)
      n = jr(), yt.updateQueue = n, n.events = [t];
    else {
      var s = n.events;
      s === null ? n.events = [t] : s.push(t);
    }
  }
  function hg(t) {
    var n = te().memoizedState;
    return VE({ ref: n, nextImpl: t }), function() {
      if ((Vt & 2) !== 0) throw Error(o(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function dg(t, n) {
    return Yr(4, 2, t, n);
  }
  function mg(t, n) {
    return Yr(4, 4, t, n);
  }
  function pg(t, n) {
    if (typeof n == "function") {
      t = t();
      var s = n(t);
      return function() {
        typeof s == "function" ? s() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function yg(t, n, s) {
    s = s != null ? s.concat([t]) : null, Yr(4, 4, pg.bind(null, n, t), s);
  }
  function Hf() {
  }
  function gg(t, n) {
    var s = te();
    n = n === void 0 ? null : n;
    var l = s.memoizedState;
    return n !== null && zf(n, l[1]) ? l[0] : (s.memoizedState = [t, n], t);
  }
  function vg(t, n) {
    var s = te();
    n = n === void 0 ? null : n;
    var l = s.memoizedState;
    if (n !== null && zf(n, l[1]))
      return l[0];
    if (l = t(), Ps) {
      ji(!0);
      try {
        t();
      } finally {
        ji(!1);
      }
    }
    return s.memoizedState = [l, n], l;
  }
  function jf(t, n, s) {
    return s === void 0 || (_i & 1073741824) !== 0 && (Ct & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = s, t = zv(), yt.lanes |= t, is |= t, s);
  }
  function bg(t, n, s, l) {
    return an(s, n) ? s : Ji.current !== null ? (t = jf(t, s, l), an(t, n) || (se = !0), t) : (_i & 106) === 0 || (_i & 1073741824) !== 0 && (Ct & 261930) === 0 ? (se = !0, t.memoizedState = s) : (t = zv(), yt.lanes |= t, is |= t, n);
  }
  function xg(t, n, s, l, u) {
    var h = ct.p;
    ct.p = h !== 0 && 8 > h ? h : 8;
    var y = et.T, x = {};
    x.types = y !== null ? y.types : null, et.T = x, Gf(t, !1, n, s);
    try {
      var T = u(), O = et.S;
      if (O !== null && O(x, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var N = zE(
          T,
          l
        );
        ul(
          t,
          n,
          N,
          cn(t)
        );
      } else
        ul(
          t,
          n,
          l,
          cn(t)
        );
    } catch (j) {
      ul(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: j },
        cn()
      );
    } finally {
      ct.p = h, y !== null && x.types !== null && (y.types = x.types), et.T = y;
    }
  }
  function kE() {
  }
  function qf(t, n, s, l) {
    if (t.tag !== 5) throw Error(o(476));
    var u = Sg(t).queue;
    xg(
      t,
      u,
      n,
      We,
      s === null ? kE : function() {
        return wg(t), s(l);
      }
    );
  }
  function Sg(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: We,
      baseState: We,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Mi,
        lastRenderedState: We
      },
      next: null
    };
    var s = {};
    return n.next = {
      memoizedState: s,
      baseState: s,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Mi,
        lastRenderedState: s
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function wg(t) {
    var n = Sg(t);
    n.next === null && (n = t.alternate.memoizedState), ul(
      t,
      n.next.queue,
      {},
      cn()
    );
  }
  function Pf() {
    return xe(lo);
  }
  function Tg() {
    return te().memoizedState;
  }
  function Eg() {
    return te().memoizedState;
  }
  function NE(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var s = cn();
          t = Ki(s);
          var l = Ii(n, t, s);
          l !== null && (Ie(l, n, s), il(l, n, s)), n = { cache: yf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function LE(t, n, s) {
    var l = cn();
    s = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xr(t) ? _g(n, s) : (s = lf(t, n, s, l), s !== null && (Ie(s, t, l), Mg(s, n, l)));
  }
  function Cg(t, n, s) {
    var l = cn();
    ul(t, n, s, l);
  }
  function ul(t, n, s, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xr(t)) _g(n, u);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var y = n.lastRenderedState, x = h(y, s);
          if (u.hasEagerState = !0, u.eagerState = x, an(x, y))
            return wr(t, n, u, 0), qt === null && Sr(), !1;
        } catch {
        } finally {
        }
      if (s = lf(t, n, u, l), s !== null)
        return Ie(s, t, l), Mg(s, n, l), !0;
    }
    return !1;
  }
  function Gf(t, n, s, l) {
    if (l = {
      lane: 2,
      revertLane: Vh(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xr(t)) {
      if (n) throw Error(o(479));
    } else
      n = lf(
        t,
        s,
        l,
        2
      ), n !== null && Ie(n, t, 2);
  }
  function Xr(t) {
    var n = t.alternate;
    return t === yt || n !== null && n === yt;
  }
  function _g(t, n) {
    ja = Ur = !0;
    var s = t.pending;
    s === null ? n.next = n : (n.next = s.next, s.next = n), t.pending = n;
  }
  function Mg(t, n, s) {
    if ((s & 4194048) !== 0) {
      var l = n.lanes;
      l &= t.pendingLanes, s |= l, n.lanes = s, zp(t, s);
    }
  }
  var Qr = {
    readContext: xe,
    use: qr,
    useCallback: It,
    useContext: It,
    useEffect: It,
    useImperativeHandle: It,
    useLayoutEffect: It,
    useInsertionEffect: It,
    useMemo: It,
    useReducer: It,
    useRef: It,
    useState: It,
    useDebugValue: It,
    useDeferredValue: It,
    useTransition: It,
    useSyncExternalStore: It,
    useId: It,
    useHostTransitionStatus: It,
    useFormState: It,
    useActionState: It,
    useOptimistic: It,
    useMemoCache: It,
    useCacheRefresh: It,
    useEffectEvent: It
  }, zg = {
    readContext: xe,
    use: qr,
    useCallback: function(t, n) {
      return Be().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: xe,
    useEffect: fg,
    useImperativeHandle: function(t, n, s) {
      s = s != null ? s.concat([t]) : null, Gr(
        4194308,
        4,
        pg.bind(null, n, t),
        s
      );
    },
    useLayoutEffect: function(t, n) {
      return Gr(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      Gr(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var s = Be();
      n = n === void 0 ? null : n;
      var l = t();
      if (Ps) {
        ji(!0);
        try {
          t();
        } finally {
          ji(!1);
        }
      }
      return s.memoizedState = [l, n], l;
    },
    useReducer: function(t, n, s) {
      var l = Be();
      if (s !== void 0) {
        var u = s(n);
        if (Ps) {
          ji(!0);
          try {
            s(n);
          } finally {
            ji(!1);
          }
        }
      } else u = n;
      return l.memoizedState = l.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, l.queue = t, t = t.dispatch = LE.bind(
        null,
        yt,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var n = Be();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Lf(t);
      var n = t.queue, s = Cg.bind(null, yt, n);
      return n.dispatch = s, [t.memoizedState, s];
    },
    useDebugValue: Hf,
    useDeferredValue: function(t, n) {
      var s = Be();
      return jf(s, t, n);
    },
    useTransition: function() {
      var t = Lf(!1);
      return t = xg.bind(
        null,
        yt,
        t.queue,
        !0,
        !1
      ), Be().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, s) {
      var l = yt, u = Be();
      if (xt) {
        if (s === void 0)
          throw Error(o(407));
        s = s();
      } else {
        if (s = n(), qt === null)
          throw Error(o(349));
        (Ct & 127) !== 0 || Ky(l, n, s);
      }
      u.memoizedState = s;
      var h = { value: s, getSnapshot: n };
      return u.queue = h, fg(Jy.bind(null, l, h, t), [
        t
      ]), l.flags |= 2048, Pa(
        9,
        { destroy: void 0 },
        Iy.bind(
          null,
          l,
          h,
          s,
          n
        ),
        null
      ), s;
    },
    useId: function() {
      var t = Be(), n = qt.identifierPrefix;
      if (xt) {
        var s = $n, l = Jn;
        s = (l & ~(1 << 32 - nn(l) - 1)).toString(32) + s, n = "_" + n + "R_" + s, s = Hr++, 0 < s && (n += "H" + s.toString(32)), n += "_";
      } else
        s = AE++, n = "_" + n + "r_" + s.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Pf,
    useFormState: og,
    useActionState: og,
    useOptimistic: function(t) {
      var n = Be();
      n.memoizedState = n.baseState = t;
      var s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = s, n = Gf.bind(
        null,
        yt,
        !0,
        s
      ), s.dispatch = n, [t, n];
    },
    useMemoCache: Vf,
    useCacheRefresh: function() {
      return Be().memoizedState = NE.bind(
        null,
        yt
      );
    },
    useEffectEvent: function(t) {
      var n = Be(), s = { impl: t };
      return n.memoizedState = s, function() {
        if ((Vt & 2) !== 0)
          throw Error(o(440));
        return s.impl.apply(void 0, arguments);
      };
    }
  }, Ag = {
    readContext: xe,
    use: qr,
    useCallback: gg,
    useContext: xe,
    useEffect: Uf,
    useImperativeHandle: yg,
    useInsertionEffect: dg,
    useLayoutEffect: mg,
    useMemo: vg,
    useReducer: Pr,
    useRef: cg,
    useState: function() {
      return Pr(Mi);
    },
    useDebugValue: Hf,
    useDeferredValue: function(t, n) {
      var s = te();
      return bg(
        s,
        Ht.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Pr(Mi)[0], n = te().memoizedState;
      return [
        typeof t == "boolean" ? t : rl(t),
        n
      ];
    },
    useSyncExternalStore: Fy,
    useId: Tg,
    useHostTransitionStatus: Pf,
    useFormState: lg,
    useActionState: lg,
    useOptimistic: function(t, n) {
      var s = te();
      return tg(s, Ht, t, n);
    },
    useMemoCache: Vf,
    useCacheRefresh: Eg,
    useEffectEvent: hg
  }, BE = {
    readContext: xe,
    use: qr,
    useCallback: gg,
    useContext: xe,
    useEffect: Uf,
    useImperativeHandle: yg,
    useInsertionEffect: dg,
    useLayoutEffect: mg,
    useMemo: vg,
    useReducer: Nf,
    useRef: cg,
    useState: function() {
      return Nf(Mi);
    },
    useDebugValue: Hf,
    useDeferredValue: function(t, n) {
      var s = te();
      return Ht === null ? jf(s, t, n) : bg(
        s,
        Ht.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Nf(Mi)[0], n = te().memoizedState;
      return [
        typeof t == "boolean" ? t : rl(t),
        n
      ];
    },
    useSyncExternalStore: Fy,
    useId: Tg,
    useHostTransitionStatus: Pf,
    useFormState: ug,
    useActionState: ug,
    useOptimistic: function(t, n) {
      var s = te();
      return Ht !== null ? tg(s, Ht, t, n) : (s.baseState = t, [t, s.queue.dispatch]);
    },
    useMemoCache: Vf,
    useCacheRefresh: Eg,
    useEffectEvent: hg
  };
  function Yf(t, n, s, l) {
    n = t.memoizedState, s = s(l, n), s = s == null ? n : Y({}, n, s), t.memoizedState = s, t.lanes === 0 && (t.updateQueue.baseState = s);
  }
  var Xf = {
    enqueueSetState: function(t, n, s) {
      t = t._reactInternals;
      var l = cn(), u = Ki(l);
      u.payload = n, s != null && (u.callback = s), n = Ii(t, u, l), n !== null && (Ie(n, t, l), il(n, t, l));
    },
    enqueueReplaceState: function(t, n, s) {
      t = t._reactInternals;
      var l = cn(), u = Ki(l);
      u.tag = 1, u.payload = n, s != null && (u.callback = s), n = Ii(t, u, l), n !== null && (Ie(n, t, l), il(n, t, l));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var s = cn(), l = Ki(s);
      l.tag = 2, n != null && (l.callback = n), n = Ii(t, l, s), n !== null && (Ie(n, t, s), il(n, t, s));
    }
  };
  function Og(t, n, s, l, u, h, y) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, h, y) : n.prototype && n.prototype.isPureReactComponent ? !Ko(s, l) || !Ko(u, h) : !0;
  }
  function Dg(t, n, s, l) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(s, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(s, l), n.state !== t && Xf.enqueueReplaceState(n, n.state, null);
  }
  function Gs(t, n) {
    var s = n;
    if ("ref" in n) {
      s = {};
      for (var l in n)
        l !== "ref" && (s[l] = n[l]);
    }
    if (t = t.defaultProps) {
      s === n && (s = Y({}, s));
      for (var u in t)
        s[u] === void 0 && (s[u] = t[u]);
    }
    return s;
  }
  function Rg(t) {
    xr(t);
  }
  function Vg(t) {
    console.error(t);
  }
  function kg(t) {
    xr(t);
  }
  function Zr(t, n) {
    try {
      var s = t.onUncaughtError;
      s(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Ng(t, n, s) {
    try {
      var l = t.onCaughtError;
      l(s.value, {
        componentStack: s.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Qf(t, n, s) {
    return s = Ki(s), s.tag = 3, s.payload = { element: null }, s.callback = function() {
      Zr(t, n);
    }, s;
  }
  function Lg(t) {
    return t = Ki(t), t.tag = 3, t;
  }
  function Bg(t, n, s, l) {
    var u = s.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var h = l.value;
      t.payload = function() {
        return u(h);
      }, t.callback = function() {
        Ng(n, s, l);
      };
    }
    var y = s.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (t.callback = function() {
      Ng(n, s, l), typeof u != "function" && (ss === null ? ss = /* @__PURE__ */ new Set([this]) : ss.add(this));
      var x = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function UE(t, n, s, l, u) {
    if (s.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = s.alternate, n !== null && Ns(
        n,
        s,
        u,
        !0
      ), s = Se.current, s !== null) {
        switch (s.tag) {
          case 31:
          case 13:
          case 19:
            return Ae === null ? mu() : s.alternate === null && Jt === 0 && (Jt = 3), s.flags &= -257, s.flags |= 65536, s.lanes = u, l === Vr ? s.flags |= 16384 : (n = s.updateQueue, n === null ? s.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Oh(t, l, u)), !1;
          case 22:
            return s.flags |= 65536, l === Vr ? s.flags |= 16384 : (n = s.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, s.updateQueue = n) : (s = n.retryQueue, s === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : s.add(l)), Oh(t, l, u)), !1;
        }
        throw Error(o(435, s.tag));
      }
      return Oh(t, l, u), mu(), !1;
    }
    if (xt)
      return n = Se.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, l !== hf && (t = Error(o(422), { cause: l }), $o(vn(t, s)))) : (l !== hf && (n = Error(o(423), {
        cause: l
      }), $o(
        vn(n, s)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, l = vn(l, s), u = Qf(
        t.stateNode,
        l,
        u
      ), wf(t, u), Jt !== 4 && (Jt = 2)), !1;
    var h = Error(o(520), { cause: l });
    if (h = vn(h, s), gl === null ? gl = [h] : gl.push(h), Jt !== 4 && (Jt = 2), n === null) return !0;
    l = vn(l, s), s = n;
    do {
      switch (s.tag) {
        case 3:
          return s.flags |= 65536, t = u & -u, s.lanes |= t, t = Qf(s.stateNode, l, t), wf(s, t), !1;
        case 1:
          if (n = s.type, h = s.stateNode, (s.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (ss === null || !ss.has(h))))
            return s.flags |= 65536, u &= -u, s.lanes |= u, u = Lg(u), Bg(
              u,
              t,
              s,
              l
            ), wf(s, u), !1;
          break;
        case 22:
          if (s.memoizedState !== null)
            return s.flags |= 65536, !1;
      }
      s = s.return;
    } while (s !== null);
    return !1;
  }
  var Zf = Error(o(461)), se = !1;
  function ue(t, n, s, l) {
    n.child = t === null ? qy(n, null, s, l) : qs(
      n,
      t.child,
      s,
      l
    );
  }
  function Ug(t, n, s, l, u) {
    s = s.render;
    var h = n.ref;
    if ("ref" in l) {
      var y = {};
      for (var x in l)
        x !== "ref" && (y[x] = l[x]);
    } else y = l;
    return Ls(n), l = Af(
      t,
      n,
      s,
      y,
      h,
      u
    ), x = Of(), t !== null && !se ? (Df(t, n, u), zi(t, n, u)) : (xt && x && _r(n), n.flags |= 1, ue(t, n, l, u), n.child);
  }
  function Hg(t, n, s, l, u) {
    if (t === null) {
      var h = s.type;
      return typeof h == "function" && !rf(h) && h.defaultProps === void 0 && s.compare === null ? (n.tag = 15, n.type = h, jg(
        t,
        n,
        h,
        l,
        u
      )) : (t = Er(
        s.type,
        null,
        l,
        n,
        n.mode,
        u
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !eh(t, u)) {
      var y = h.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Ko, s(y, l) && t.ref === n.ref)
        return zi(t, n, u);
    }
    return n.flags |= 1, t = wi(h, l), t.ref = n.ref, t.return = n, n.child = t;
  }
  function jg(t, n, s, l, u) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Ko(h, l) && t.ref === n.ref)
        if (se = !1, n.pendingProps = l = h, eh(t, u))
          (t.flags & 131072) !== 0 && (se = !0);
        else
          return n.lanes = t.lanes, zi(t, n, u);
    }
    return Ff(
      t,
      n,
      s,
      l,
      u
    );
  }
  function qg(t, n, s, l) {
    var u = l.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | s : s, t !== null) {
          for (l = n.child = t.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~h;
        } else l = 0, n.child = null;
        return Pg(
          t,
          n,
          h,
          s,
          l
        );
      }
      if ((s & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Dr(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Yy(n, h) : Ef(), Xy(n);
      else
        return l = n.lanes = 536870912, Pg(
          t,
          n,
          h !== null ? h.baseLanes | s : s,
          s,
          l
        );
    } else
      h !== null ? (Dr(n, h.cachePool), Yy(n, h), Wi(), n.memoizedState = null) : (t !== null && Dr(n, null), Ef(), Wi());
    return ue(t, n, u, s), n.child;
  }
  function cl(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Pg(t, n, s, l, u) {
    var h = vf();
    return h = h === null ? null : { parent: ne._currentValue, pool: h }, n.memoizedState = {
      baseLanes: s,
      cachePool: h
    }, t !== null && Dr(n, null), Ef(), Xy(n), t !== null && Ns(t, n, l, !0), n.childLanes = u, null;
  }
  function Fr(t, n) {
    return n = Kr(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function Gg(t, n, s) {
    return qs(n, t.child, null, s), t = Fr(n, n.pendingProps), t.flags |= 2, on(n), n.memoizedState = null, t;
  }
  function HE(t, n, s) {
    var l = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (xt) {
        if (l.mode === "hidden")
          return t = Fr(n, l), n.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, cl(null, t);
        if (_f(n), (t = Xt) ? (t = pb(
          t,
          Sn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Gi !== null ? { id: Jn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, s = _y(t), s.return = n, n.child = s, me = n, Xt = null)) : t = null, t === null) throw Xi(n);
        return n.lanes = 536870912, null;
      }
      return Fr(n, l);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var y = h.dehydrated;
      if (_f(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = Gg(
            t,
            n,
            s
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(o(558));
      else if (se || Ns(t, n, s, !1), u = (s & t.childLanes) !== 0, se || u) {
        if (Ji.current === null) {
          if (l = qt, l !== null && (y = Ap(l, s), y !== 0 && y !== h.retryLane))
            throw h.retryLane = y, Ds(t, y), Ie(l, t, y), Zf;
          mu();
        }
        n = Gg(
          t,
          n,
          s
        );
      } else
        t = h.treeContext, Xt = Tn(y.nextSibling), me = n, xt = !0, Yi = null, Sn = !1, t !== null && Ay(n, t), n = Fr(n, l), n.flags |= 134221824;
      return n;
    }
    return t = wi(t.child, {
      mode: l.mode,
      children: l.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Ga(t, n) {
    var s = n.ref;
    if (s === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof s != "function" && typeof s != "object")
        throw Error(o(284));
      (t === null || t.ref !== s) && (n.flags |= 4194816);
    }
  }
  function Ff(t, n, s, l, u) {
    return Ls(n), s = Af(
      t,
      n,
      s,
      l,
      void 0,
      u
    ), l = Of(), t !== null && !se ? (Df(t, n, u), zi(t, n, u)) : (xt && l && _r(n), n.flags |= 1, ue(t, n, s, u), n.child);
  }
  function Yg(t, n, s, l, u, h) {
    return Ls(n), n.updateQueue = null, s = Zy(
      n,
      l,
      s,
      u
    ), Qy(t), l = Of(), t !== null && !se ? (Df(t, n, h), zi(t, n, h)) : (xt && l && _r(n), n.flags |= 1, ue(t, n, s, h), n.child);
  }
  function Xg(t, n, s, l, u) {
    if (Ls(n), n.stateNode === null) {
      var h = Va, y = s.contextType;
      typeof y == "object" && y !== null && (h = xe(y)), h = new s(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = Xf, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, xf(n), y = s.contextType, h.context = typeof y == "object" && y !== null ? xe(y) : Va, h.state = n.memoizedState, y = s.getDerivedStateFromProps, typeof y == "function" && (Yf(
        n,
        s,
        y,
        l
      ), h.state = n.memoizedState), typeof s.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (y = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), y !== h.state && Xf.enqueueReplaceState(h, h.state, null), al(n, l, h, u), sl(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (t === null) {
      h = n.stateNode;
      var x = n.memoizedProps, T = Gs(s, x);
      h.props = T;
      var O = h.context, N = s.contextType;
      y = Va, typeof N == "object" && N !== null && (y = xe(N));
      var j = s.getDerivedStateFromProps;
      N = typeof j == "function" || typeof h.getSnapshotBeforeUpdate == "function", x = n.pendingProps !== x, N || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x || O !== y) && Dg(
        n,
        h,
        l,
        y
      ), Fi = !1;
      var z = n.memoizedState;
      h.state = z, al(n, l, h, u), sl(), O = n.memoizedState, x || z !== O || Fi ? (typeof j == "function" && (Yf(
        n,
        s,
        j,
        l
      ), O = n.memoizedState), (T = Fi || Og(
        n,
        s,
        T,
        l,
        z,
        O,
        y
      )) ? (N || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = O), h.props = l, h.state = O, h.context = y, l = T) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Sf(t, n), y = n.memoizedProps, N = Gs(s, y), h.props = N, j = n.pendingProps, z = h.context, O = s.contextType, T = Va, typeof O == "object" && O !== null && (T = xe(O)), x = s.getDerivedStateFromProps, (O = typeof x == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== j || z !== T) && Dg(
        n,
        h,
        l,
        T
      ), Fi = !1, z = n.memoizedState, h.state = z, al(n, l, h, u), sl();
      var V = n.memoizedState;
      y !== j || z !== V || Fi || t !== null && t.dependencies !== null && Ar(t.dependencies) ? (typeof x == "function" && (Yf(
        n,
        s,
        x,
        l
      ), V = n.memoizedState), (N = Fi || Og(
        n,
        s,
        N,
        l,
        z,
        V,
        T
      ) || t !== null && t.dependencies !== null && Ar(t.dependencies)) ? (O || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, V, T), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        V,
        T
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || y === t.memoizedProps && z === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === t.memoizedProps && z === t.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = V), h.props = l, h.state = V, h.context = T, l = N) : (typeof h.componentDidUpdate != "function" || y === t.memoizedProps && z === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === t.memoizedProps && z === t.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, Ga(t, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, s = l && typeof s.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && l ? (n.child = qs(
      n,
      t.child,
      null,
      u
    ), n.child = qs(
      n,
      null,
      s,
      u
    )) : ue(t, n, s, u), n.memoizedState = h.state, t = n.child) : t = zi(
      t,
      n,
      u
    ), t;
  }
  function Qg(t, n, s, l) {
    return Vs(), n.flags |= 256, ue(t, n, s, l), n.child;
  }
  var Kf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function If(t) {
    return { baseLanes: t, cachePool: Ny() };
  }
  function Jf(t, n, s) {
    return t = t !== null ? t.childLanes & ~s : 0, n && (t |= un), t;
  }
  function Zg(t, n, s) {
    var l = n.pendingProps, u = !1, h = (n.flags & 128) !== 0, y;
    if ((y = h) || (y = t !== null && t.memoizedState === null ? !1 : (we.current & 2) !== 0), y && (u = !0, n.flags &= -129), y = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (xt) {
        if (u ? $i(n) : Wi(), (t = Xt) ? (t = pb(
          t,
          Sn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Gi !== null ? { id: Jn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, s = _y(t), s.return = n, n.child = s, me = n, Xt = null)) : t = null, t === null) throw Xi(n);
        return Ih(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      return h = l.children, l = l.fallback, u ? (Wi(), u = n.mode, h = Kr(
        { mode: "hidden", children: h },
        u
      ), l = Rs(
        l,
        u,
        s,
        null
      ), h.return = n, l.return = n, h.sibling = l, n.child = h, l = n.child, l.memoizedState = If(s), l.childLanes = Jf(
        t,
        y,
        s
      ), n.memoizedState = Kf, cl(null, l)) : ($i(n), $f(n, h));
    }
    var x = t.memoizedState;
    if (x !== null) {
      var T = x.dehydrated;
      if (T !== null)
        return jE(
          t,
          n,
          h,
          y,
          l,
          T,
          x,
          s
        );
    }
    return u ? (Wi(), u = l.fallback, h = n.mode, x = t.child, T = x.sibling, l = wi(x, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = x.subtreeFlags & 1206910976, T !== null ? u = wi(T, u) : (u = Rs(
      u,
      h,
      s,
      null
    ), u.flags |= 2), u.return = n, l.return = n, l.sibling = u, n.child = l, cl(null, l), l = n.child, u = t.child.memoizedState, u === null ? u = If(s) : (h = u.cachePool, h !== null ? (x = ne._currentValue, h = h.parent !== x ? { parent: x, pool: x } : h) : h = Ny(), u = {
      baseLanes: u.baseLanes | s,
      cachePool: h
    }), l.memoizedState = u, l.childLanes = Jf(
      t,
      y,
      s
    ), n.memoizedState = Kf, cl(t.child, l)) : ($i(n), s = t.child, t = s.sibling, s = wi(s, {
      mode: "visible",
      children: l.children
    }), s.return = n, s.sibling = null, t !== null && (y = n.deletions, y === null ? (n.deletions = [t], n.flags |= 16) : y.push(t)), n.child = s, n.memoizedState = null, s);
  }
  function $f(t, n) {
    return n = Kr(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Kr(t, n) {
    return t = Qe(22, t, null, n), t.lanes = 0, t;
  }
  function Ir(t, n, s) {
    return qs(n, t.child, null, s), t = $f(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function jE(t, n, s, l, u, h, y, x) {
    if (s)
      return n.flags & 256 ? ($i(n), n.flags &= -257, Ir(
        t,
        n,
        x
      )) : n.memoizedState !== null ? (Wi(), n.child = t.child, n.flags |= 128, null) : (Wi(), h = u.fallback, y = n.mode, u = Kr(
        { mode: "visible", children: u.children },
        y
      ), h = Rs(
        h,
        y,
        x,
        null
      ), h.flags |= 2, u.return = n, h.return = n, u.sibling = h, n.child = u, qs(n, t.child, null, x), u = n.child, u.memoizedState = If(x), u.childLanes = Jf(
        t,
        l,
        x
      ), n.memoizedState = Kf, cl(null, u));
    if ($i(n), Ih(h)) {
      if (l = h.nextSibling && h.nextSibling.dataset, l) var T = l.dgst;
      return l = T, l !== "" && (u = Error(o(419)), u.stack = "", u.digest = l, $o({ value: u, source: null, stack: null })), Ir(
        t,
        n,
        x
      );
    }
    if (se || Ns(t, n, x, !1), l = (x & t.childLanes) !== 0, se || l) {
      if (Ji.current !== null)
        return Ir(
          t,
          n,
          x
        );
      if (l = qt, l !== null && (u = Ap(
        l,
        x
      ), u !== 0 && u !== y.retryLane))
        throw y.retryLane = u, Ds(t, u), Ie(l, t, u), Zf;
      return Kh(h) || mu(), Ir(
        t,
        n,
        x
      );
    }
    return Kh(h) ? (n.flags |= 192, n.child = t.child, null) : (t = y.treeContext, Xt = Tn(h.nextSibling), me = n, xt = !0, Yi = null, Sn = !1, t !== null && Ay(n, t), n = $f(
      n,
      u.children
    ), n.flags |= 134221824, n);
  }
  function Fg(t, n, s) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n), zr(t.return, n, s);
  }
  function Kg(t) {
    for (var n = null; t !== null; ) {
      var s = t.alternate;
      s !== null && Br(s) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function Jr(t, n, s, l, u, h) {
    var y = t.memoizedState;
    y === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: s,
      tailMode: u,
      treeForkCount: h
    } : (y.isBackwards = n, y.rendering = null, y.renderingStartTime = 0, y.last = l, y.tail = s, y.tailMode = u, y.treeForkCount = h);
  }
  function Wf(t) {
    var n = t.child;
    for (t.child = null; n !== null; ) {
      var s = n.sibling;
      n.sibling = t.child, t.child = n, n = s;
    }
  }
  function th(t, n, s) {
    var l = n.pendingProps, u = l.revealOrder, h = l.tail;
    l = l.children;
    var y = we.current;
    if (n.flags & 128)
      return ol(n, y), null;
    var x = (y & 2) !== 0;
    if (x ? (y = y & 1 | 2, n.flags |= 128) : y &= 1, ol(n, y), u === "backwards" && t !== null ? (Wf(t), ue(t, n, l, s), Wf(t)) : ue(t, n, l, s), l = xt ? Jo : 0, !x && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Fg(t, s, n);
        else if (t.tag === 19)
          Fg(t, s, n);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === n) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "backwards":
        s = Kg(n.child), s === null ? (u = n.child, n.child = null) : (u = s.sibling, s.sibling = null, Wf(n)), Jr(
          n,
          !0,
          u,
          null,
          h,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (s = null, u = n.child, n.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Br(t) === null) {
            n.child = u;
            break;
          }
          t = u.sibling, u.sibling = s, s = u, u = t;
        }
        Jr(
          n,
          !0,
          s,
          null,
          h,
          l
        );
        break;
      case "together":
        Jr(
          n,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      case "independent":
        n.memoizedState = null;
        break;
      default:
        s = Kg(n.child), s === null ? (u = n.child, n.child = null) : (u = s.sibling, s.sibling = null), Jr(
          n,
          !1,
          u,
          s,
          h,
          l
        );
    }
    return n.child;
  }
  function Ig(t, n, s) {
    var l = n.pendingProps;
    return Qi(n, n.type, l.value), ue(t, n, l.children, s), n.child;
  }
  function zi(t, n, s) {
    if (t !== null && (n.dependencies = t.dependencies), is |= n.lanes, (s & n.childLanes) === 0)
      if (t !== null) {
        if (Ns(
          t,
          n,
          s,
          !1
        ), (s & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(o(153));
    if (n.child !== null) {
      for (t = n.child, s = wi(t, t.pendingProps), n.child = s, s.return = n; t.sibling !== null; )
        t = t.sibling, s = s.sibling = wi(t, t.pendingProps), s.return = n;
      s.sibling = null;
    }
    return n.child;
  }
  function eh(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ar(t)));
  }
  function qE(t, n, s) {
    switch (n.tag) {
      case 3:
        nr(n, n.stateNode.containerInfo), Qi(n, ne, t.memoizedState.cache), Vs();
        break;
      case 27:
      case 5:
        Mc(n);
        break;
      case 4:
        nr(n, n.stateNode.containerInfo);
        break;
      case 10:
        Qi(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, _f(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return $i(n), n.flags |= 128, null;
          l = Ns(
            t,
            n,
            s,
            !1
          );
          var u = n.child.childLanes;
          return l || (s & u) !== 0 ? Zg(t, n, s) : ($i(n), t = zi(
            t,
            n,
            s
          ), t !== null ? t.sibling : null);
        }
        $i(n);
        break;
      case 19:
        if (n.flags & 128)
          return th(
            t,
            n,
            s
          );
        if (u = (t.flags & 128) !== 0, l = (s & n.childLanes) !== 0, l || (Ns(
          t,
          n,
          s,
          !1
        ), l = (s & n.childLanes) !== 0), u) {
          if (l)
            return th(
              t,
              n,
              s
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ol(n, we.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, qg(
          t,
          n,
          s,
          n.pendingProps
        );
      case 24:
        Qi(n, ne, t.memoizedState.cache);
    }
    return zi(t, n, s);
  }
  function Jg(t, n, s) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        se = !0;
      else {
        if (!eh(t, s) && (n.flags & 128) === 0)
          return se = !1, qE(
            t,
            n,
            s
          );
        se = (t.flags & 131072) !== 0;
      }
    else
      se = !1, xt && (n.flags & 1048576) !== 0 && zy(n, Jo, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var l = n.pendingProps;
          if (t = Hs(n.elementType), n.type = t, typeof t == "function")
            rf(t) ? (l = Gs(t, l), n.tag = 1, n = Xg(
              null,
              n,
              t,
              l,
              s
            )) : (n.tag = 0, n = Ff(
              null,
              n,
              t,
              l,
              s
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === G) {
                n.tag = 11, n = Ug(
                  null,
                  n,
                  t,
                  l,
                  s
                );
                break t;
              } else if (u === mt) {
                n.tag = 14, n = Hg(
                  null,
                  n,
                  t,
                  l,
                  s
                );
                break t;
              } else if (u === zt) {
                n.tag = 10, n.type = t, n = Ig(
                  null,
                  n,
                  s
                );
                break t;
              }
            }
            throw n = ut(t) || t, Error(o(306, n, ""));
          }
        }
        return n;
      case 0:
        return Ff(
          t,
          n,
          n.type,
          n.pendingProps,
          s
        );
      case 1:
        return l = n.type, u = Gs(
          l,
          n.pendingProps
        ), Xg(
          t,
          n,
          l,
          u,
          s
        );
      case 3:
        t: {
          if (nr(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          u = h.element, Sf(t, n), al(n, l, null, s);
          var y = n.memoizedState;
          if (l = y.cache, Qi(n, ne, l), l !== h.cache && pf(
            n,
            [ne],
            s,
            !0
          ), sl(), l = y.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Qg(
                t,
                n,
                l,
                s
              );
              break t;
            } else if (l !== u) {
              u = vn(
                Error(o(424)),
                n
              ), $o(u), n = Qg(
                t,
                n,
                l,
                s
              );
              break t;
            } else {
              switch (t = n.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Xt = Tn(t.firstChild), me = n, xt = !0, Yi = null, Sn = !0, s = qy(
                n,
                null,
                l,
                s
              ), n.child = s; s; )
                s.flags = s.flags & -3 | 134221824, s = s.sibling;
            }
          else {
            if (Vs(), l === u) {
              n = zi(
                t,
                n,
                s
              );
              break t;
            }
            ue(t, n, l, s);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Ga(t, n), t === null ? (s = wb(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = s : xt || (n.stateNode = eb(
          n.type,
          n.pendingProps,
          Ui.current,
          n
        )) : n.memoizedState = wb(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Mc(n), t === null && xt && (l = n.stateNode = vb(
          n.type,
          n.pendingProps,
          Ui.current
        ), me = n, Sn = !0, u = Xt, ls(n.type) ? (Jh = u, Xt = Tn(l.firstChild)) : Xt = u), ue(
          t,
          n,
          n.pendingProps.children,
          s
        ), Ga(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && xt && ((u = l = Xt) && (l = NC(
          l,
          n.type,
          n.pendingProps,
          Sn
        ), l !== null ? (n.stateNode = l, me = n, Xt = Tn(l.firstChild), Sn = !1, u = !0) : u = !1), u || Xi(n)), Mc(n), u = n.type, h = n.pendingProps, y = t !== null ? t.memoizedProps : null, l = h.children, Ph(u, h) ? l = null : y !== null && Ph(u, y) && (n.flags |= 32), n.memoizedState !== null && (u = Af(
          t,
          n,
          OE,
          null,
          null,
          s
        ), lo._currentValue = u), Ga(t, n), ue(t, n, l, s), n.child;
      case 6:
        return t === null && xt && ((t = s = Xt) && (s = LC(
          s,
          n.pendingProps,
          Sn
        ), s !== null ? (n.stateNode = s, me = n, Xt = null, t = !0) : t = !1), t || Xi(n)), null;
      case 13:
        return Zg(t, n, s);
      case 4:
        return nr(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, t === null ? n.child = qs(
          n,
          null,
          l,
          s
        ) : ue(t, n, l, s), n.child;
      case 11:
        return Ug(
          t,
          n,
          n.type,
          n.pendingProps,
          s
        );
      case 7:
        return l = n.pendingProps, Ga(t, n), ue(t, n, l, s), n.child;
      case 8:
        return ue(
          t,
          n,
          n.pendingProps.children,
          s
        ), n.child;
      case 12:
        return ue(
          t,
          n,
          n.pendingProps.children,
          s
        ), n.child;
      case 10:
        return Ig(t, n, s);
      case 9:
        return u = n.type._context, l = n.pendingProps.children, Ls(n), u = xe(u), l = l(u), n.flags |= 1, ue(t, n, l, s), n.child;
      case 14:
        return Hg(
          t,
          n,
          n.type,
          n.pendingProps,
          s
        );
      case 15:
        return jg(
          t,
          n,
          n.type,
          n.pendingProps,
          s
        );
      case 19:
        return th(t, n, s);
      case 31:
        return HE(t, n, s);
      case 22:
        return qg(
          t,
          n,
          s,
          n.pendingProps
        );
      case 24:
        return Ls(n), l = xe(ne), t === null ? (u = vf(), u === null && (u = qt, h = yf(), u.pooledCache = h, h.refCount++, h !== null && (u.pooledCacheLanes |= s), u = h), n.memoizedState = { parent: l, cache: u }, xf(n), Qi(n, ne, u)) : ((t.lanes & s) !== 0 && (Sf(t, n), al(n, null, null, s), sl()), u = t.memoizedState, h = n.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Qi(n, ne, l)) : (l = h.cache, Qi(n, ne, l), l !== u.cache && pf(
          n,
          [ne],
          s,
          !0
        ))), ue(
          t,
          n,
          n.pendingProps.children,
          s
        ), n.child;
      case 30:
        return n.stateNode === null && (n.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), l = n.pendingProps, l.name != null && l.name !== "auto" ? n.flags |= t === null ? 18882560 : 18874368 : xt && _r(n), t !== null && t.memoizedProps.name !== l.name ? n.flags |= 4194816 : Ga(t, n), ue(t, n, l.children, s), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(o(156, n.tag));
  }
  function Ai(t) {
    t.flags |= 4;
  }
  function nh(t, n, s, l, u) {
    var h;
    if ((h = (t.mode & 32) !== 0) && (h = s === null ? _b(n, l) : _b(n, l) && (l.src !== s.src || l.srcSet !== s.srcSet)), h) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Rv()) t.flags |= 8192;
        else
          throw js = Vr, bf;
    } else t.flags &= -16777217;
  }
  function $g(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Mb(n))
      if (Rv()) t.flags |= 8192;
      else
        throw js = Vr, bf;
  }
  function $r(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? _p() : 536870912, t.lanes |= n, Fa |= n);
  }
  function fl(t, n) {
    if (!xt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var s = t.tail, l = null; s !== null; )
            s.alternate !== null && (l = s), s = s.sibling;
          l === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
          break;
        default:
          for (n = t.tail, s = null; n !== null; )
            n.alternate !== null && (s = n), n = n.sibling;
          s === null ? t.tail = null : s.sibling = null;
      }
  }
  function Qt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, s = 0, l = 0;
    if (n)
      for (var u = t.child; u !== null; )
        s |= u.lanes | u.childLanes, l |= u.subtreeFlags & 1206910976, l |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        s |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= l, t.childLanes = s, n;
  }
  function PE(t, n, s) {
    var l = n.pendingProps;
    switch (ff(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qt(n), null;
      case 1:
        return Qt(n), null;
      case 3:
        return s = n.stateNode, l = null, t !== null && (l = t.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ci(ne), xa(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (t === null || t.child === null) && (La(n) ? Ai(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, df())), Qt(n), null;
      case 26:
        var u = n.type, h = n.memoizedState;
        return t === null ? (Ai(n), h !== null ? (Qt(n), $g(n, h)) : (Qt(n), nh(
          n,
          u,
          null,
          l,
          s
        ))) : h ? h !== t.memoizedState ? (Ai(n), Qt(n), $g(n, h)) : (Qt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== l && Ai(n), Qt(n), nh(
          n,
          u,
          t,
          l,
          s
        )), null;
      case 27:
        if (ir(n), s = Ui.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== l && Ai(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(o(166));
            return Qt(n), n.subtreeFlags &= -33554433, null;
          }
          t = Kn.current, La(n) ? Oy(n) : (t = vb(u, l, s), n.stateNode = t, Ai(n));
        }
        return Qt(n), n.subtreeFlags &= -33554433, null;
      case 5:
        if (ir(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== l && Ai(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(o(166));
            return Qt(n), n.subtreeFlags &= -33554433, null;
          }
          if (h = Kn.current, La(n))
            Oy(n);
          else {
            var y = wl(
              Ui.current
            );
            switch (h) {
              case 1:
                h = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                h = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    h = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    h = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    h = y.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof l.is == "string" ? y.createElement("select", {
                      is: l.is
                    }) : y.createElement("select"), l.multiple ? h.multiple = !0 : l.size && (h.size = l.size);
                    break;
                  default:
                    h = typeof l.is == "string" ? y.createElement(u, { is: l.is }) : y.createElement(u);
                }
            }
            h[be] = n, h[Xe] = l;
            t: for (y = n.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                h.appendChild(y.stateNode);
              else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
                y.child.return = y, y = y.child;
                continue;
              }
              if (y === n) break t;
              for (; y.sibling === null; ) {
                if (y.return === null || y.return === n)
                  break t;
                y = y.return;
              }
              y.sibling.return = y.return, y = y.sibling;
            }
            n.stateNode = h;
            t: switch (Ee(h, u, l), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break t;
              case "img":
                l = !0;
                break t;
              default:
                l = !1;
            }
            l && Ai(n);
          }
        }
        return Qt(n), n.subtreeFlags &= -33554433, nh(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          s
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== l && Ai(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(o(166));
          if (t = Ui.current, La(n)) {
            if (t = n.stateNode, s = n.memoizedProps, l = null, u = me, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            t[be] = n, t = !!(t.nodeValue === s || l !== null && l.suppressHydrationWarning === !0 || Jv(t.nodeValue, s)), t || Xi(n, !0);
          } else
            t = wl(t).createTextNode(
              l
            ), t[be] = n, n.stateNode = t;
        }
        return Qt(n), null;
      case 31:
        if (s = n.memoizedState, t === null || t.memoizedState !== null) {
          if (l = La(n), s !== null) {
            if (t === null) {
              if (!l) throw Error(o(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[be] = n;
            } else
              Vs(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Qt(n), t = !1;
          } else
            s = df(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = s), t = !0;
          if (!t)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Qt(n), null;
      case 13:
        if (l = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = La(n), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(o(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[be] = n;
            } else
              Vs(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Qt(n), u = !1;
          } else
            u = df(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
        }
        return on(n), (n.flags & 128) !== 0 ? (n.lanes = s, n) : (s = l !== null, t = t !== null && t.memoizedState !== null, s && (l = n.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== u && (l.flags |= 2048)), s !== t && s && (n.child.flags |= 8192), $r(n, n.updateQueue), Qt(n), null);
      case 4:
        return xa(), t === null && Bh(n.stateNode.containerInfo), n.flags |= 67108864, Qt(n), null;
      case 10:
        return Ci(n.type), Qt(n), null;
      case 19:
        if (Mf(n), l = n.memoizedState, l === null) return Qt(n), null;
        if (u = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (u) fl(l, !1);
          else {
            if (Jt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = Br(t), h !== null) {
                  for (n.flags |= 128, fl(l, !1), t = h.updateQueue, n.updateQueue = t, $r(n, t), n.subtreeFlags = 0, t = s, s = n.child; s !== null; )
                    Cy(s, t), s = s.sibling;
                  return ol(
                    n,
                    we.current & 1 | 2
                  ), xt && Ti(n, l.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            l.tail !== null && tn() > cu && (n.flags |= 128, u = !0, fl(l, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Br(h), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, $r(n, t), fl(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !h.alternate && !xt)
                return Qt(n), null;
            } else
              2 * tn() - l.renderingStartTime > cu && s !== 536870912 && (n.flags |= 128, u = !0, fl(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (t = l.last, t !== null ? t.sibling = h : n.child = h, l.last = h);
        }
        if (l.tail !== null) {
          t = l.tail;
          t: {
            for (s = t; s !== null; ) {
              if (s.alternate !== null) {
                s = !1;
                break t;
              }
              s = s.sibling;
            }
            s = !0;
          }
          return l.rendering = t, l.tail = t.sibling, l.renderingStartTime = tn(), t.sibling = null, h = we.current, h = u ? h & 1 | 2 : h & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !s || xt ? ol(n, h) : (s = h, Yt(Se, n), Yt(we, s), Ae === null && (Ae = n)), xt && Ti(n, l.treeForkCount), t;
        }
        return Qt(n), null;
      case 22:
      case 23:
        return on(n), Cf(), l = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (s & 536870912) !== 0 && (n.flags & 128) === 0 && (Qt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Qt(n), s = n.updateQueue, s !== null && $r(n, s.retryQueue), s = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (s = t.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== s && (n.flags |= 2048), t !== null && ve(Us), null;
      case 24:
        return s = null, t !== null && (s = t.memoizedState.cache), n.memoizedState.cache !== s && (n.flags |= 2048), Ci(ne), Qt(n), null;
      case 25:
        return null;
      case 30:
        return n.flags |= 33554432, Qt(n), null;
    }
    throw Error(o(156, n.tag));
  }
  function GE(t, n) {
    switch (ff(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Ci(ne), xa(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return ir(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (on(n), n.alternate === null)
            throw Error(o(340));
          Vs();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (on(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(o(340));
          Vs();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return Mf(n), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, t = n.memoizedState, t !== null && (t.rendering = null, t.tail = null), n.flags |= 4, n) : null;
      case 4:
        return xa(), null;
      case 10:
        return Ci(n.type), null;
      case 22:
      case 23:
        return on(n), Cf(), t !== null && ve(Us), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Ci(ne), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wg(t, n) {
    switch (ff(n), n.tag) {
      case 3:
        Ci(ne), xa();
        break;
      case 26:
      case 27:
      case 5:
        ir(n);
        break;
      case 4:
        xa();
        break;
      case 31:
        n.memoizedState !== null && on(n);
        break;
      case 13:
        on(n);
        break;
      case 19:
        Mf(n);
        break;
      case 10:
        Ci(n.type);
        break;
      case 22:
      case 23:
        on(n), Cf(), t !== null && ve(Us);
        break;
      case 24:
        Ci(ne);
    }
  }
  function hl(t, n) {
    try {
      var s = n.updateQueue, l = s !== null ? s.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        s = u;
        do {
          if ((s.tag & t) === t) {
            l = void 0;
            var h = s.create, y = s.inst;
            l = h(), y.destroy = l;
          }
          s = s.next;
        } while (s !== u);
      }
    } catch (x) {
      Bt(n, n.return, x);
    }
  }
  function ts(t, n, s) {
    try {
      var l = n.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var h = u.next;
        l = h;
        do {
          if ((l.tag & t) === t) {
            var y = l.inst, x = y.destroy;
            if (x !== void 0) {
              y.destroy = void 0, u = n;
              var T = s, O = x;
              try {
                O();
              } catch (N) {
                Bt(
                  u,
                  T,
                  N
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (N) {
      Bt(n, n.return, N);
    }
  }
  function tv(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var s = t.stateNode;
      try {
        Gy(n, s);
      } catch (l) {
        Bt(t, t.return, l);
      }
    }
  }
  function ev(t, n, s) {
    s.props = Gs(
      t.type,
      t.memoizedProps
    ), s.state = t.memoizedState;
    try {
      s.componentWillUnmount();
    } catch (l) {
      Bt(t, n, l);
    }
  }
  function Wn(t, n) {
    try {
      var s = t.ref;
      if (s !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            var u = t.stateNode, h = xi(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== h) && (u.ref = rb(h)), l = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var y = new fn(t);
              g(
                t.child,
                !1,
                VC,
                y,
                void 0,
                void 0
              ), t.stateNode = y;
            }
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof s == "function" ? t.refCleanup = s(l) : s.current = l;
      }
    } catch (x) {
      Bt(t, n, x);
    }
  }
  function Te(t, n) {
    var s = t.ref, l = t.refCleanup;
    if (s !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Bt(t, n, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof s == "function")
        try {
          s(null);
        } catch (u) {
          Bt(t, n, u);
        }
      else s.current = null;
  }
  function Wr(t, n) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && n !== null)
      for (var s = 0; s < n.length; s++)
        mb(
          t.stateNode,
          n[s]
        );
  }
  function nv(t) {
    for (var n = t.return; n !== null && (sh(n) && mb(t.stateNode, n.stateNode), !ih(n)); )
      n = n.return;
  }
  function dl(t) {
    for (var n = t.return; n !== null && (sh(n) && kC(t.stateNode, n.stateNode), !ih(n)); )
      n = n.return;
  }
  function ih(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function sh(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function ah(t) {
    var n = t.type, s = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          s.autoFocus && l.focus();
          break t;
        case "img":
          s.src ? l.src = s.src : s.srcSet && (l.srcset = s.srcSet);
      }
    } catch (u) {
      Bt(t, t.return, u);
    }
  }
  function oh(t, n, s) {
    try {
      var l = t.stateNode;
      pC(l, t.type, s, n), l[Xe] = n;
    } catch (u) {
      Bt(t, t.return, u);
    }
  }
  function iv(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ls(t.type) || t.tag === 4;
  }
  function lh(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || iv(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ls(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function rh(t, n, s, l) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, n ? (s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s).insertBefore(u, n) : (n = s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s, n.appendChild(u), s = s._reactRootContainer, s != null || n.onclick !== null || (n.onclick = In)), Wr(t, l), Dt = !0;
    else if (u !== 4 && (u === 27 && (Wr(t, l), l = null, ls(t.type) && (s = t.stateNode, n = null)), t = t.child, t !== null))
      for (rh(
        t,
        n,
        s,
        l
      ), t = t.sibling; t !== null; )
        rh(
          t,
          n,
          s,
          l
        ), t = t.sibling;
  }
  function tu(t, n, s, l) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, n ? s.insertBefore(u, n) : s.appendChild(u), Wr(t, l), Dt = !0;
    else if (u !== 4 && (u === 27 && (Wr(t, l), l = null, ls(t.type) && (s = t.stateNode)), t = t.child, t !== null))
      for (tu(
        t,
        n,
        s,
        l
      ), t = t.sibling; t !== null; )
        tu(
          t,
          n,
          s,
          l
        ), t = t.sibling;
  }
  function sv(t) {
    var n = t.stateNode, s = t.memoizedProps;
    try {
      for (var l = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      Ee(n, l, s), n[be] = t, n[Xe] = s;
    } catch (h) {
      Bt(t, t.return, h);
    }
  }
  var eu = !1, ln = null;
  function av(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (eu = !0);
  }
  var ti = null;
  function ov() {
    var t = ti;
    return ti = null, t;
  }
  var Ze = 0;
  function Ya(t, n, s, l, u) {
    return Ze = 0, lv(
      t.child,
      n,
      s,
      l,
      u
    );
  }
  function lv(t, n, s, l, u) {
    for (var h = !1; t !== null; ) {
      if (t.tag === 5) {
        var y = t.stateNode;
        if (l !== null) {
          var x = Xh(y);
          l.push(x), x.view && (h = !0);
        } else
          h || Xh(y).view && (h = !0);
        eu = !0, ob(
          y,
          Ze === 0 ? n : n + "_" + Ze,
          s
        ), Ze++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || lv(
        t.child,
        n,
        s,
        l,
        u
      ) && (h = !0));
      t = t.sibling;
    }
    return h;
  }
  function ei(t, n) {
    for (; t !== null; )
      t.tag === 5 ? lb(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || ei(
        t.child,
        n
      )), t = t.sibling;
  }
  function nu(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (nu(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var n = t.memoizedProps;
          if (n.name == null || n.name === "auto")
            throw Error(o(544));
          var s = n.name;
          n = Si(n.default, n.share), n !== "none" && (Ya(
            t,
            s,
            n,
            null,
            !1
          ) || ei(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function uh(t, n) {
    if (t.tag === 30) {
      var s = t.stateNode, l = t.memoizedProps, u = xi(l, s), h = Si(
        l.default,
        s.paired ? l.share : l.enter
      );
      h !== "none" ? Ya(t, u, h, null, !1) ? (nu(t), s.paired || n || $a(t, l.onEnter)) : ei(t.child, !1) : nu(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        uh(t, n), t = t.sibling;
    else nu(t);
  }
  function ch(t) {
    if (ln !== null && ln.size !== 0) {
      var n = ln;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var s = t.memoizedProps, l = s.name;
              if (l != null && l !== "auto") {
                var u = n.get(l);
                if (u !== void 0) {
                  var h = Si(
                    s.default,
                    s.share
                  );
                  if (h !== "none" && (Ya(
                    t,
                    l,
                    h,
                    null,
                    !1
                  ) ? (h = t.stateNode, u.paired = h, h.paired = u, $a(t, s.onShare)) : ei(t.child, !1)), n.delete(l), n.size === 0) break;
                }
              }
            }
            ch(t);
          }
          t = t.sibling;
        }
    }
  }
  function fh(t) {
    if (t.tag === 30) {
      var n = t.memoizedProps, s = xi(n, t.stateNode), l = ln !== null ? ln.get(s) : void 0, u = Si(
        n.default,
        l !== void 0 ? n.share : n.exit
      );
      u !== "none" && (Ya(t, s, u, null, !1) ? l !== void 0 ? (u = t.stateNode, l.paired = u, u.paired = l, ln.delete(s), $a(t, n.onShare)) : $a(t, n.onExit) : ei(t.child, !1)), ln !== null && ch(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        fh(t), t = t.sibling;
    else
      ln !== null && ch(t);
  }
  function rv(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, s = xi(n, t.stateNode);
        n = Si(n.default, n.update), t.flags &= -5, n !== "none" && Ya(
          t,
          s,
          n,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && rv(t);
      t = t.sibling;
    }
  }
  function hh(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var n = t.stateNode;
            n.paired !== null && (n.paired = null, ei(t.child, !1));
          }
          hh(t);
        }
        t = t.sibling;
      }
  }
  function iu(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, ei(t.child, !1), hh(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        iu(t), t = t.sibling;
    else hh(t);
  }
  function uv(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? ei(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && uv(t), t = t.sibling;
  }
  function dh(t, n, s, l, u, h, y) {
    for (var x = !1; n !== null; ) {
      if (n.tag === 5) {
        var T = n.stateNode;
        if (h !== null && Ze < h.length) {
          var O = h[Ze], N = Xh(T);
          (O.view || N.view) && (x = !0);
          var j;
          if (j = (t.flags & 4) === 0)
            if (N.clip) j = !0;
            else {
              j = O.rect;
              var z = N.rect;
              j = j.y !== z.y || j.x !== z.x || j.height !== z.height || j.width !== z.width;
            }
          j && (t.flags |= 4), N.abs ? N = !O.abs : (O = O.rect, N = N.rect, N = O.height !== N.height || O.width !== N.width), N && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && ob(
          T,
          Ze === 0 ? s : s + "_" + Ze,
          u
        ), x && (t.flags & 4) !== 0 || (ti === null && (ti = []), ti.push(
          T,
          Ze === 0 ? l : l + "_" + Ze,
          n.memoizedProps
        )), Ze++;
      } else (n.tag !== 22 || n.memoizedState === null) && (n.tag === 30 && y ? t.flags |= n.flags & 32 : dh(
        t,
        n.child,
        s,
        l,
        u,
        h,
        y
      ) && (x = !0));
      n = n.sibling;
    }
    return x;
  }
  function cv(t, n) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var s = t.memoizedProps, l = t.stateNode, u = xi(s, l), h = Si(s.default, s.update), y;
        y = t.memoizedState, t.memoizedState = null, l = t;
        var x = t.child;
        Ze = 0, u = dh(
          l,
          x,
          u,
          u,
          h,
          y,
          !1
        ), (t.flags & 4) !== 0 && u && $a(t, s.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && cv(t);
      t = t.sibling;
    }
  }
  var pe = !1, Nt = !1, ni = !1, mh = !1, fv = typeof WeakSet == "function" ? WeakSet : Set, ye = null, ii = !1, ml = !1, su = !1, ph = !1;
  function YE(t, n, s) {
    if (t = t.containerInfo, jh = ro, t = py(t), tf(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var u = l.getSelection && l.getSelection();
          if (u && u.rangeCount !== 0) {
            l = u.anchorNode;
            var h = u.anchorOffset, y = u.focusNode;
            u = u.focusOffset;
            try {
              l.nodeType, y.nodeType;
            } catch {
              l = null;
              break t;
            }
            var x = 0, T = -1, O = -1, N = 0, j = 0, z = t, V = null;
            e: for (; ; ) {
              for (var Z; z !== l || h !== 0 && z.nodeType !== 3 || (T = x + h), z !== y || u !== 0 && z.nodeType !== 3 || (O = x + u), z.nodeType === 3 && (x += z.nodeValue.length), (Z = z.firstChild) !== null; )
                V = z, z = Z;
              for (; ; ) {
                if (z === t) break e;
                if (V === l && ++N === h && (T = x), V === y && ++j === u && (O = x), (Z = z.nextSibling) !== null) break;
                z = V, V = z.parentNode;
              }
              z = Z;
            }
            l = T === -1 || O === -1 ? null : { start: T, end: O };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (qh = { focusedElem: t, selectionRange: l }, ro = !1, s = (s & 335544064) === s, ye = n, n = s ? 9270 : 1024; ye !== null; ) {
      if (t = ye, s && (l = t.deletions, l !== null))
        for (h = 0; h < l.length; h++)
          s && fh(l[h]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        s && av(t), au(s);
      else {
        if (t.tag === 22) {
          if (l = t.alternate, t.memoizedState !== null) {
            l !== null && l.memoizedState === null && s && fh(l), au(s);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            s && av(t), au(s);
            continue;
          }
        }
        l = t.child, (t.subtreeFlags & n) !== 0 && l !== null ? (l.return = t, ye = l) : (s && rv(t), au(s));
      }
    }
    ln = null;
  }
  function au(t) {
    for (; ye !== null; ) {
      var n = ye, s = t, l = n.alternate, u = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && l !== null) {
            s = void 0, u = l.memoizedProps, l = l.memoizedState;
            var h = n.stateNode;
            try {
              var y = Gs(
                n.type,
                u
              );
              s = h.getSnapshotBeforeUpdate(
                y,
                l
              ), h.__reactInternalSnapshotBeforeUpdate = s;
            } catch (x) {
              Bt(n, n.return, x);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (l = n.stateNode.containerInfo, s = l.nodeType, s === 9)
              Fh(l);
            else if (s === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Fh(l);
                  break;
                default:
                  l.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          s && l !== null && (s = xi(
            l.memoizedProps,
            l.stateNode
          ), u = n.memoizedProps, u = Si(u.default, u.update), u !== "none" && Ya(
            l,
            s,
            u,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(o(163));
      }
      if (l = n.sibling, l !== null) {
        l.return = n.return, ye = l;
        break;
      }
      ye = n.return;
    }
  }
  function hv(t, n, s) {
    var l = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        si(t, s), l & 4 && hl(5, s);
        break;
      case 1:
        if (si(t, s), l & 4)
          if (t = s.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (y) {
              Bt(s, s.return, y);
            }
          else {
            var u = Gs(
              s.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              Bt(
                s,
                s.return,
                y
              );
            }
          }
        l & 64 && tv(s), l & 512 && Wn(s, s.return);
        break;
      case 3:
        if (si(t, s), l & 64 && (t = s.updateQueue, t !== null)) {
          if (n = null, s.child !== null)
            switch (s.child.tag) {
              case 27:
              case 5:
                n = s.child.stateNode;
                break;
              case 1:
                n = s.child.stateNode;
            }
          try {
            Gy(t, n);
          } catch (y) {
            Bt(s, s.return, y);
          }
        }
        break;
      case 27:
        n === null && l & 4 && sv(s);
      case 26:
      case 5:
        si(t, s), n === null && l & 4 && ah(s), l & 512 && Wn(s, s.return);
        break;
      case 12:
        si(t, s);
        break;
      case 31:
        si(t, s), l & 4 && yv(t, s);
        break;
      case 13:
        si(t, s), l & 4 && gv(t, s), l & 64 && (t = s.memoizedState, t !== null && (t = t.dehydrated, t !== null && (s = nC.bind(
          null,
          s
        ), BC(t, s))));
        break;
      case 22:
        if (l = s.memoizedState !== null || pe, !l) {
          var h = n !== null && n.memoizedState !== null || Nt;
          n = pe, u = Nt, pe = l, (Nt = h) && !u ? (l = 2, (s.subtreeFlags & 8772) !== 0 && (l |= 1), kn(
            t,
            s,
            l
          )) : si(t, s), pe = n, Nt = u;
        }
        break;
      case 30:
        si(t, s), l & 512 && Wn(s, s.return);
        break;
      case 7:
        l & 512 && Wn(s, s.return);
      default:
        si(t, s);
    }
  }
  function yh(t, n) {
    for (t = t.child; t !== null; )
      dv(t, n), t = t.sibling;
  }
  function dv(t, n) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var s = t.stateNode;
          if (n) {
            var l = s.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var u = t.stateNode, h = t.memoizedProps.style, y = h != null && h.hasOwnProperty("display") ? h.display : null;
            u.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
          }
        } catch (T) {
          Bt(t, t.return, T);
        }
        gh(t, n);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = n ? "" : t.memoizedProps, Dt = !0;
        } catch (T) {
          Bt(t, t.return, T);
        }
        break;
      case 18:
        try {
          var x = t.stateNode;
          n ? ab(x, !0) : ab(t.stateNode, !1);
        } catch (T) {
          Bt(t, t.return, T);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && yh(t, n);
        break;
      default:
        yh(t, n);
    }
  }
  function gh(t, n) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var s = t, l = n;
          switch (s.tag) {
            case 4:
              dv(s, l);
              break t;
            case 22:
              s.memoizedState === null && gh(s, l);
              break t;
            default:
              gh(s, l);
          }
        }
        t = t.sibling;
      }
  }
  function mv(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, mv(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && cr(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Zt = null, Fe = !1;
  function Rn(t, n, s) {
    for (s = s.child; s !== null; )
      pv(t, n, s), s = s.sibling;
  }
  function pv(t, n, s) {
    if (en && typeof en.onCommitFiberUnmount == "function")
      try {
        en.onCommitFiberUnmount(Bo, s);
      } catch {
      }
    switch (s.tag) {
      case 26:
        Nt || Te(s, n), Rn(
          t,
          n,
          s
        ), s.memoizedState ? s.memoizedState.count-- : s.stateNode && !Nt && (s = s.stateNode, s.parentNode.removeChild(s));
        break;
      case 27:
        Nt || Te(s, n), dl(s);
        var l = Zt, u = Fe;
        ls(s.type) && (Zt = s.stateNode, Fe = !1), Rn(
          t,
          n,
          s
        ), bb(
          s.stateNode,
          s.type,
          s.memoizedProps
        ), Zt = l, Fe = u;
        break;
      case 5:
        Nt || Te(s, n), dl(s);
      case 6:
        if (s.tag === 6 && dl(s), l = Zt, u = Fe, Zt = null, Rn(
          t,
          n,
          s
        ), Zt = l, Fe = u, Zt !== null)
          if (Fe)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(s.stateNode), Dt = !0;
            } catch (h) {
              Bt(
                s,
                n,
                h
              );
            }
          else
            try {
              Zt.removeChild(s.stateNode), Dt = !0;
            } catch (h) {
              Bt(
                s,
                n,
                h
              );
            }
        break;
      case 18:
        Zt !== null && (Fe ? (t = Zt, sb(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          s.stateNode
        ), uo(t)) : sb(Zt, s.stateNode));
        break;
      case 4:
        l = Zt, u = Fe, Zt = s.stateNode.containerInfo, Fe = !0, Rn(
          t,
          n,
          s
        ), Zt = l, Fe = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ts(2, s, n), Nt || ts(4, s, n), Rn(
          t,
          n,
          s
        );
        break;
      case 1:
        Nt || (Te(s, n), l = s.stateNode, typeof l.componentWillUnmount == "function" && ev(
          s,
          n,
          l
        )), Rn(
          t,
          n,
          s
        );
        break;
      case 21:
        Rn(
          t,
          n,
          s
        );
        break;
      case 22:
        Nt = (l = Nt) || s.memoizedState !== null, Rn(
          t,
          n,
          s
        ), Nt = l;
        break;
      case 30:
        Te(s, n), Rn(
          t,
          n,
          s
        );
        break;
      case 7:
        Nt || Te(s, n), Rn(
          t,
          n,
          s
        );
        break;
      default:
        Rn(
          t,
          n,
          s
        );
    }
  }
  function yv(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        uo(t);
      } catch (s) {
        Bt(n, n.return, s);
      }
    }
  }
  function gv(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        uo(t);
      } catch (s) {
        Bt(n, n.return, s);
      }
  }
  function XE(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new fv()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new fv()), n;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function ou(t, n) {
    var s = XE(t);
    n.forEach(function(l) {
      if (!s.has(l)) {
        s.add(l);
        var u = iC.bind(null, t, l);
        l.then(u, u);
      }
    });
  }
  function Ue(t, n, s) {
    var l = n.deletions;
    if (l !== null)
      for (var u = 0; u < l.length; u++) {
        var h = l[u], y = t, x = n, T = x;
        t: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (ls(T.type)) {
                Zt = T.stateNode, Fe = !1;
                break t;
              }
              break;
            case 5:
              Zt = T.stateNode, Fe = !1;
              break t;
            case 3:
            case 4:
              Zt = T.stateNode.containerInfo, Fe = !0;
              break t;
          }
          T = T.return;
        }
        if (Zt === null) throw Error(o(160));
        pv(y, x, h), Zt = null, Fe = !1, y = h.alternate, y !== null && (y.return = null), h.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        vv(n, t, s), n = n.sibling;
  }
  var Vn = null;
  function vv(t, n, s) {
    var l = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var h = 0; h < l.length; h++) {
            var y = l[h];
            y.ref.impl = y.nextImpl;
          }
        Ue(n, t, s), He(t), u & 4 && (ts(3, t, t.return), hl(3, t), ts(5, t, t.return));
        break;
      case 1:
        Ue(n, t, s), He(t), u & 512 && (Nt || l === null || Te(l, l.return)), u & 64 && pe && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (s = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = s === null ? n : s.concat(n))));
        break;
      case 26:
        if (h = Vn, Ue(n, t, s), He(t), u & 512 && (Nt || l === null || Te(l, l.return)), u & 4)
          if (u = l !== null ? l.memoizedState : null, s = t.memoizedState, l === null)
            if (s === null)
              if (t.stateNode === null)
                if (pe)
                  t.stateNode = eb(
                    t.type,
                    t.memoizedProps,
                    n.containerInfo,
                    t
                  );
                else {
                  t: {
                    n = t.type, s = t.memoizedProps, u = h.ownerDocument || h;
                    e: switch (n) {
                      case "title":
                        l = u.getElementsByTagName("title")[0], (!l || l[jo] || l[be] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = u.createElement(n), u.head.insertBefore(
                          l,
                          u.querySelector("head > title")
                        )), Ee(l, n, s), l[be] = t, de(l), n = l;
                        break t;
                      case "link":
                        if (h = Cb(
                          "link",
                          "href",
                          u
                        ).get(n + (s.href || ""))) {
                          for (y = 0; y < h.length; y++)
                            if (l = h[y], l.getAttribute("href") === (s.href == null || s.href === "" ? null : s.href) && l.getAttribute("rel") === (s.rel == null ? null : s.rel) && l.getAttribute("title") === (s.title == null ? null : s.title) && l.getAttribute("crossorigin") === (s.crossOrigin == null ? null : s.crossOrigin)) {
                              h.splice(y, 1);
                              break e;
                            }
                        }
                        l = u.createElement(n), Ee(l, n, s), u.head.appendChild(l);
                        break;
                      case "meta":
                        if (h = Cb(
                          "meta",
                          "content",
                          u
                        ).get(n + (s.content || ""))) {
                          for (y = 0; y < h.length; y++)
                            if (l = h[y], l.getAttribute("content") === (s.content == null ? null : "" + s.content) && l.getAttribute("name") === (s.name == null ? null : s.name) && l.getAttribute("property") === (s.property == null ? null : s.property) && l.getAttribute("http-equiv") === (s.httpEquiv == null ? null : s.httpEquiv) && l.getAttribute("charset") === (s.charSet == null ? null : s.charSet)) {
                              h.splice(y, 1);
                              break e;
                            }
                        }
                        l = u.createElement(n), Ee(l, n, s), u.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, n));
                    }
                    l[be] = t, de(l), n = l;
                  }
                  t.stateNode = n;
                }
              else
                pe || ed(h, t.type, t.stateNode);
            else
              t.stateNode = Eb(
                h,
                s,
                t.memoizedProps
              );
          else
            u !== s ? (u === null ? (n = l.stateNode, n === null || Nt || n.parentNode.removeChild(n)) : u.count--, s === null ? pe || ed(h, t.type, t.stateNode) : Eb(h, s, t.memoizedProps)) : s === null && t.stateNode !== null && oh(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Ue(n, t, s), He(t), u & 512 && (Nt || l === null || Te(l, l.return)), l !== null && u & 4 && oh(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (h = ni, ni = !1, Ue(n, t, s), ni = h, He(t), u & 512 && (Nt || l === null || Te(l, l.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            _a(n, ""), Dt = !0;
          } catch (N) {
            Bt(t, t.return, N);
          }
        }
        u & 4 && t.stateNode != null && (n = t.memoizedProps, oh(
          t,
          n,
          l !== null ? l.memoizedProps : n
        )), u & 1024 && (mh = !0);
        break;
      case 6:
        if (Ue(n, t, s), He(t), u & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          n = t.memoizedProps, s = t.stateNode;
          try {
            s.nodeValue = n, Dt = !0;
          } catch (N) {
            Bt(t, t.return, N);
          }
        }
        break;
      case 3:
        if (Dt = !1, Su = null, h = Vn, Vn = Tl(n.containerInfo), Ue(n, t, s), Vn = h, He(t), u & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            uo(n.containerInfo);
          } catch (N) {
            Bt(t, t.return, N);
          }
        mh && (mh = !1, bv(t)), Dt = !1;
        break;
      case 4:
        u = ni, ni = pe, l = Hp(), h = Vn, Vn = Tl(
          t.stateNode.containerInfo
        ), Ue(n, t, s), He(t), Vn = h, Dt && ml && (su = !0), Dt = l, ni = u;
        break;
      case 12:
        Ue(n, t, s), He(t);
        break;
      case 31:
        Ue(n, t, s), He(t), u & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ou(t, n)));
        break;
      case 13:
        Ue(n, t, s), He(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (uu = tn()), u & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ou(t, n)));
        break;
      case 22:
        h = t.memoizedState !== null, y = l !== null && l.memoizedState !== null;
        var x = pe, T = Nt, O = ni;
        pe = x || h, ni = O || h, Nt = T || y, Ue(n, t, s), Nt = T, ni = O, pe = x, He(t), u & 8192 && (n = t.stateNode, n._visibility = h ? n._visibility & -2 : n._visibility | 1, !h || l === null || y || pe || Nt || (n = y || Nt, s = pe, l = Nt, pe = h || pe, Nt = n, es(t, 2), pe = s, Nt = l), !h && ni || yh(t, h)), u & 4 && (n = t.updateQueue, n !== null && (s = n.retryQueue, s !== null && (n.retryQueue = null, ou(t, s))));
        break;
      case 19:
        Ue(n, t, s), He(t), u & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ou(t, n)));
        break;
      case 30:
        u & 512 && (Nt || l === null || Te(l, l.return)), u = Hp(), h = ml, y = (s & 335544064) === s, x = t.memoizedProps, ml = y && Si(
          x.default,
          x.update
        ) !== "none", Ue(n, t, s), He(t), y && l !== null && Dt && (t.flags |= 4), ml = h, Dt = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (Nt || l === null || Te(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = t);
      default:
        Ue(n, t, s), He(t);
    }
  }
  function He(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var s, l = t.return; l !== null; ) {
          if (iv(l)) {
            s = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var u = t.return; u !== null; ) {
          if (sh(u)) {
            var h = u.stateNode;
            l === null ? l = [h] : l.push(h);
          }
          if (ih(u)) break;
          u = u.return;
        }
        var y = l;
        if (s == null) throw Error(o(160));
        switch (s.tag) {
          case 27:
            var x = s.stateNode, T = lh(t);
            tu(
              t,
              T,
              x,
              y
            );
            break;
          case 5:
            var O = s.stateNode;
            s.flags & 32 && (_a(O, ""), s.flags &= -33);
            var N = lh(t);
            tu(
              t,
              N,
              O,
              y
            );
            break;
          case 3:
          case 4:
            var j = s.stateNode.containerInfo, z = lh(t);
            rh(
              t,
              z,
              j,
              y
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (V) {
        Bt(t, t.return, V);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function bv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        bv(n), n.tag === 5 && n.flags & 1024 && (n = n.stateNode, ro = !0, n.reset(), ro = !1), t = t.sibling;
      }
  }
  function Xa(t, n) {
    if (n.subtreeFlags & 9270)
      for (n = n.child; n !== null; )
        xv(n, t), n = n.sibling;
    else cv(n);
  }
  function xv(t, n) {
    var s = t.alternate;
    if (s === null) uh(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (ph = ii = !1, ov(), Xa(n, t), !ii && !su) {
            if (t = ti, t !== null)
              for (var l = 0; l < t.length; l += 3) {
                s = t[l];
                var u = t[l + 1];
                lb(s, t[l + 2]), s = s.ownerDocument.documentElement, s !== null && s.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            t = n.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), ph = !0;
          }
          ti = null;
          break;
        case 5:
          Xa(n, t);
          break;
        case 4:
          l = ii, ii = !1, Xa(n, t), ii && (su = !0), ii = l;
          break;
        case 22:
          t.memoizedState === null && (s.memoizedState !== null ? uh(t, !1) : Xa(n, t));
          break;
        case 30:
          l = ii, u = ov(), ii = !1, Xa(n, t), ii && (t.flags |= 4);
          var h = t.memoizedProps, y = t.stateNode;
          n = xi(h, y), y = xi(s.memoizedProps, y);
          var x = Si(h.default, h.update);
          x === "none" ? n = !1 : (h = s.memoizedState, s.memoizedState = null, s = t.child, Ze = 0, n = dh(
            t,
            s,
            n,
            y,
            x,
            h,
            !0
          ), Ze !== (h === null ? 0 : h.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && n ? ($a(
            t,
            t.memoizedProps.onUpdate
          ), ti = u) : u !== null && (u.push.apply(u, ti), ti = u), ii = (t.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          Xa(n, t);
      }
  }
  function si(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        hv(t, n.alternate, n), n = n.sibling;
  }
  function es(t, n) {
    for (t = t.child; t !== null; ) {
      var s = t, l = n;
      switch (s.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ts(4, s, s.return), es(
            s,
            l
          );
          break;
        case 1:
          Te(s, s.return);
          var u = s.stateNode;
          typeof u.componentWillUnmount == "function" && ev(
            s,
            s.return,
            u
          ), es(
            s,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && bb(
            s.stateNode,
            s.type,
            s.memoizedProps
          );
        case 5:
          Te(s, s.return), s.tag !== 5 && s.tag !== 27 || dl(s), es(
            s,
            l
          );
          break;
        case 6:
          dl(s);
          break;
        case 26:
          Te(s, s.return), u = s.stateNode, s.memoizedState !== null || u === null || Nt || u.parentNode.removeChild(u), es(
            s,
            l
          );
          break;
        case 22:
          s.memoizedState === null && es(
            s,
            l
          );
          break;
        case 30:
          Te(s, s.return), es(
            s,
            l
          );
          break;
        case 7:
          Te(s, s.return);
        default:
          es(
            s,
            l
          );
      }
      t = t.sibling;
    }
  }
  function kn(t, n, s) {
    for (s = (n.subtreeFlags & 8772) !== 0 ? s : s & -2, n = n.child; n !== null; ) {
      var l = n.alternate, u = t, h = n, y = h.flags, x = (s & 1) !== 0;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          kn(
            u,
            h,
            s
          ), hl(4, h);
          break;
        case 1:
          if (kn(
            u,
            h,
            s
          ), l = h, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (N) {
              Bt(l, l.return, N);
            }
          if (l = h, u = l.updateQueue, u !== null) {
            var T = l.stateNode;
            try {
              var O = u.shared.hiddenCallbacks;
              if (O !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < O.length; u++)
                  Py(O[u], T);
            } catch (N) {
              Bt(l, l.return, N);
            }
          }
          x && y & 64 && tv(h), Wn(h, h.return);
          break;
        case 27:
          (s & 2) !== 0 && sv(h);
        case 5:
          h.tag !== 5 && h.tag !== 27 || nv(h), kn(
            u,
            h,
            s
          ), x && l === null && y & 4 && ah(h), Wn(h, h.return);
          break;
        case 6:
          nv(h);
          break;
        case 26:
          T = h.stateNode, h.memoizedState !== null || T === null || pe || ed(
            Tl(T.ownerDocument),
            h.type,
            T
          ), kn(
            u,
            h,
            s
          ), x && l === null && y & 4 && ah(h), Wn(h, h.return);
          break;
        case 12:
          kn(
            u,
            h,
            s
          );
          break;
        case 31:
          kn(
            u,
            h,
            s
          ), x && y & 4 && yv(u, h);
          break;
        case 13:
          kn(
            u,
            h,
            s
          ), x && y & 4 && gv(u, h);
          break;
        case 22:
          h.memoizedState === null && kn(
            u,
            h,
            s
          ), Wn(h, h.return);
          break;
        case 30:
          kn(
            u,
            h,
            s
          ), Wn(h, h.return);
          break;
        case 7:
          Wn(h, h.return);
        default:
          kn(
            u,
            h,
            s
          );
      }
      n = n.sibling;
    }
  }
  function vh(t, n) {
    var s = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (s = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== s && (t != null && t.refCount++, s != null && Wo(s));
  }
  function bh(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Wo(t));
  }
  function wn(t, n, s, l) {
    var u = (s & 335544064) === s;
    if (n.subtreeFlags & (u ? 10262 : 10256))
      for (n = n.child; n !== null; )
        Sv(
          t,
          n,
          s,
          l
        ), n = n.sibling;
    else u && uv(n);
  }
  function Sv(t, n, s, l) {
    var u = (s & 335544064) === s;
    u && n.alternate === null && n.return !== null && n.return.alternate !== null && iu(n);
    var h = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        wn(
          t,
          n,
          s,
          l
        ), h & 2048 && hl(9, n);
        break;
      case 1:
        wn(
          t,
          n,
          s,
          l
        );
        break;
      case 3:
        wn(
          t,
          n,
          s,
          l
        ), u && ph && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), h & 2048 && (h = null, n.alternate !== null && (h = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== h && (n.refCount++, h != null && Wo(h)));
        break;
      case 12:
        if (h & 2048) {
          wn(
            t,
            n,
            s,
            l
          ), h = n.stateNode;
          try {
            var y = n.memoizedProps, x = y.id, T = y.onPostCommit;
            typeof T == "function" && T(
              x,
              n.alternate === null ? "mount" : "update",
              h.passiveEffectDuration,
              -0
            );
          } catch (O) {
            Bt(n, n.return, O);
          }
        } else
          wn(
            t,
            n,
            s,
            l
          );
        break;
      case 31:
        wn(
          t,
          n,
          s,
          l
        );
        break;
      case 13:
        wn(
          t,
          n,
          s,
          l
        );
        break;
      case 23:
        break;
      case 22:
        y = n.stateNode, x = n.alternate, n.memoizedState !== null ? (u && x !== null && x.memoizedState === null && iu(x), y._visibility & 2 ? wn(
          t,
          n,
          s,
          l
        ) : pl(
          t,
          n
        )) : (u && x !== null && x.memoizedState !== null && iu(n), y._visibility & 2 ? wn(
          t,
          n,
          s,
          l
        ) : (y._visibility |= 2, Qa(
          t,
          n,
          s,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        ))), h & 2048 && vh(x, n);
        break;
      case 24:
        wn(
          t,
          n,
          s,
          l
        ), h & 2048 && bh(n.alternate, n);
        break;
      case 30:
        u && (h = n.alternate, h !== null && (ei(h.child, !0), ei(n.child, !0))), wn(
          t,
          n,
          s,
          l
        );
        break;
      default:
        wn(
          t,
          n,
          s,
          l
        );
    }
  }
  function Qa(t, n, s, l, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, y = n, x = s, T = l, O = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Qa(
            h,
            y,
            x,
            T,
            u
          ), hl(8, y);
          break;
        case 23:
          break;
        case 22:
          var N = y.stateNode;
          y.memoizedState !== null ? N._visibility & 2 ? Qa(
            h,
            y,
            x,
            T,
            u
          ) : pl(
            h,
            y
          ) : (N._visibility |= 2, Qa(
            h,
            y,
            x,
            T,
            u
          )), u && O & 2048 && vh(
            y.alternate,
            y
          );
          break;
        case 24:
          Qa(
            h,
            y,
            x,
            T,
            u
          ), u && O & 2048 && bh(y.alternate, y);
          break;
        default:
          Qa(
            h,
            y,
            x,
            T,
            u
          );
      }
      n = n.sibling;
    }
  }
  function pl(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var s = t, l = n, u = l.flags;
        switch (l.tag) {
          case 22:
            pl(s, l), u & 2048 && vh(
              l.alternate,
              l
            );
            break;
          case 24:
            pl(s, l), u & 2048 && bh(l.alternate, l);
            break;
          default:
            pl(s, l);
        }
        n = n.sibling;
      }
  }
  var Ys = 8192;
  function Xs(t, n, s) {
    if (t.subtreeFlags & Ys)
      for (t = t.child; t !== null; )
        wv(
          t,
          n,
          s
        ), t = t.sibling;
  }
  function wv(t, n, s) {
    switch (t.tag) {
      case 26:
        Xs(
          t,
          n,
          s
        ), t.flags & Ys && (t.memoizedState !== null ? JC(
          s,
          Vn,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (n & 335544128) === n && Ab(s, t)));
        break;
      case 5:
        Xs(
          t,
          n,
          s
        ), t.flags & Ys && (t = t.stateNode, (n & 335544128) === n && Ab(s, t));
        break;
      case 3:
      case 4:
        var l = Vn;
        Vn = Tl(t.stateNode.containerInfo), Xs(
          t,
          n,
          s
        ), Vn = l;
        break;
      case 22:
        t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = Ys, Ys = 16777216, Xs(
          t,
          n,
          s
        ), Ys = l) : Xs(
          t,
          n,
          s
        ));
        break;
      case 30:
        if ((t.flags & Ys) !== 0 && (l = t.memoizedProps.name, l != null && l !== "auto")) {
          var u = t.stateNode;
          u.paired = null, ln === null && (ln = /* @__PURE__ */ new Map()), ln.set(l, u);
        }
        Xs(
          t,
          n,
          s
        );
        break;
      default:
        Xs(
          t,
          n,
          s
        );
    }
  }
  function Tv(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function yl(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var s = 0; s < n.length; s++) {
          var l = n[s];
          ye = l, Cv(
            l,
            t
          );
        }
      Tv(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Ev(t), t = t.sibling;
  }
  function Ev(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        yl(t), t.flags & 2048 && ts(9, t, t.return);
        break;
      case 3:
        yl(t);
        break;
      case 12:
        yl(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, lu(t)) : yl(t);
        break;
      default:
        yl(t);
    }
  }
  function lu(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var s = 0; s < n.length; s++) {
          var l = n[s];
          ye = l, Cv(
            l,
            t
          );
        }
      Tv(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          ts(8, n, n.return), lu(n);
          break;
        case 22:
          s = n.stateNode, s._visibility & 2 && (s._visibility &= -3, lu(n));
          break;
        default:
          lu(n);
      }
      t = t.sibling;
    }
  }
  function Cv(t, n) {
    for (; ye !== null; ) {
      var s = ye;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          ts(8, s, n);
          break;
        case 23:
        case 22:
          if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
            var l = s.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Wo(s.memoizedState.cache);
      }
      if (l = s.child, l !== null) l.return = s, ye = l;
      else
        t: for (s = t; ye !== null; ) {
          l = ye;
          var u = l.sibling, h = l.return;
          if (mv(l), l === s) {
            ye = null;
            break t;
          }
          if (u !== null) {
            u.return = h, ye = u;
            break t;
          }
          ye = h;
        }
    }
  }
  var QE = {
    getCacheForType: function(t) {
      var n = xe(ne), s = n.data.get(t);
      return s === void 0 && (s = t(), n.data.set(t, s)), s;
    },
    cacheSignal: function() {
      return xe(ne).controller.signal;
    }
  }, ZE = typeof WeakMap == "function" ? WeakMap : Map, Vt = 0, qt = null, wt = null, Ct = 0, Lt = 0, rn = null, ns = !1, Za = !1, xh = !1, Oi = 0, Jt = 0, is = 0, Qs = 0, ru = 0, un = 0, Fa = 0, gl = null, Ke = null, Sh = !1, uu = 0, _v = 0, cu = 1 / 0, fu = null, ss = null, Ft = 0, Nn = null, Zs = null, ai = 0, wh = 0, Th = null, Mv = null, Ka = null, Ia = null, Ja = null, vl = 0, hu = null;
  function cn() {
    return (Vt & 2) !== 0 && Ct !== 0 ? Ct & -Ct : et.T !== null ? Vh() : Op();
  }
  function zv() {
    if (un === 0)
      if ((Ct & 536870912) === 0 || xt) {
        var t = or;
        or <<= 1, (or & 3932160) === 0 && (or = 262144), un = t;
      } else un = 536870912;
    return t = Se.current, t !== null && (t.flags |= 32), un;
  }
  function $a(t, n) {
    if (n != null) {
      var s = t.stateNode, l = s.ref;
      l === null && (l = s.ref = rb(
        xi(t.memoizedProps, s)
      )), Ia === null && (Ia = []), Ia.push(n.bind(null, l));
    }
  }
  function Ie(t, n, s) {
    (t === qt && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null) && (Wa(t, 0), as(
      t,
      Ct,
      un,
      !1
    )), Ho(t, s), ((Vt & 2) === 0 || t !== qt) && (t === qt && ((Vt & 2) === 0 && (Qs |= s), Jt === 4 && as(
      t,
      Ct,
      un,
      !1
    )), oi(t));
  }
  function Av(t, n, s) {
    if ((Vt & 6) !== 0) throw Error(o(327));
    var l = !s && (n & 127) === 0 && (n & t.expiredLanes) === 0 || Uo(t, n), u = l ? IE(t, n) : Ch(t, n, !0), h = l;
    do {
      if (u === 0) {
        Za && !l && as(t, n, 0, !1);
        break;
      } else {
        if (s = t.current.alternate, h && !FE(s)) {
          u = Ch(t, n, !1), h = !1;
          continue;
        }
        if (u === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var y = 0;
          else
            y = t.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            n = y;
            t: {
              var x = t;
              u = gl;
              var T = x.current.memoizedState.isDehydrated;
              if (T && (Wa(x, y).flags |= 256), y = Ch(
                x,
                y,
                !1
              ), y !== 2 && y !== 6) {
                if (xh && !T) {
                  x.errorRecoveryDisabledLanes |= h, Qs |= h, u = 4;
                  break t;
                }
                h = Ke, Ke = u, h !== null && (Ke === null ? Ke = h : Ke.push.apply(
                  Ke,
                  h
                ));
              }
              u = y;
            }
            if (h = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wa(t, 0), as(t, n, 0, !0);
          break;
        }
        t: {
          switch (l = t, h = u, h) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((n & 4194048) !== n && (n & 62914560) !== n)
                break;
            case 6:
              as(
                l,
                n,
                un,
                !ns
              );
              break t;
            case 2:
              Ke = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((n & 62914560) === n && (u = uu + 300 - tn(), 10 < u)) {
            if (as(
              l,
              n,
              un,
              !ns
            ), rr(l, 0, !0) !== 0) break t;
            ai = n, l.timeoutHandle = Yh(
              Ov.bind(
                null,
                l,
                s,
                Ke,
                fu,
                Sh,
                n,
                un,
                Qs,
                Fa,
                ns,
                h,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          Ov(
            l,
            s,
            Ke,
            fu,
            Sh,
            n,
            un,
            Qs,
            Fa,
            ns,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    oi(t);
  }
  function Ov(t, n, s, l, u, h, y, x, T, O, N, j, z, V) {
    t.timeoutHandle = -1;
    var Z = n.subtreeFlags, nt = (h & 335544064) === h;
    if (j = null, (nt || Z & 8192 || (Z & 16785408) === 16785408) && (j = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: In
    }, ln = null, wv(
      n,
      h,
      j
    ), nt && (Z = j, nt = t.containerInfo, nt = (nt.nodeType === 9 ? nt : nt.ownerDocument).__reactViewTransition, nt != null && (Z.count++, Z.waitingForViewTransition = !0, Z = _l.bind(Z), nt.finished.then(Z, Z))), Z = (h & 62914560) === h ? uu - tn() : (h & 4194048) === h ? _v - tn() : 0, Z = $C(
      j,
      Z
    ), Z !== null)) {
      ai = h, t.cancelPendingCommit = Z(
        Uv.bind(
          null,
          t,
          n,
          h,
          s,
          l,
          u,
          y,
          x,
          T,
          O,
          N,
          j,
          null,
          z,
          V
        )
      ), as(t, h, y, !O);
      return;
    }
    Uv(
      t,
      n,
      h,
      s,
      l,
      u,
      y,
      x,
      T,
      O,
      N,
      j
    );
  }
  function FE(t) {
    for (var n = t; ; ) {
      var s = n.tag;
      if ((s === 0 || s === 11 || s === 15) && n.flags & 16384 && (s = n.updateQueue, s !== null && (s = s.stores, s !== null)))
        for (var l = 0; l < s.length; l++) {
          var u = s[l], h = u.getSnapshot;
          u = u.value;
          try {
            if (!an(h(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (s = n.child, n.subtreeFlags & 16384 && s !== null)
        s.return = n, n = s;
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function as(t, n, s, l) {
    n = Cp(t, n), n &= ~ru, n &= ~Qs, t.suspendedLanes |= n, t.pingedLanes &= ~n, l && (t.warmLanes |= n), l = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var h = 31 - nn(u), y = 1 << h;
      l[h] = -1, u &= ~y;
    }
    s !== 0 && Mp(t, s, n);
  }
  function du() {
    return (Vt & 6) === 0 ? (bl(0), !1) : !0;
  }
  function Eh() {
    if (wt !== null) {
      if (Lt === 0)
        var t = wt.return;
      else
        t = wt, Ei = ks = null, Rf(t), Ha = null, nl = 0, t = wt;
      for (; t !== null; )
        Wg(t.alternate, t), t = t.return;
      wt = null;
    }
  }
  function Wa(t, n) {
    var s = t.timeoutHandle;
    return s !== -1 && (t.timeoutHandle = -1, vC(s)), s = t.cancelPendingCommit, s !== null && (t.cancelPendingCommit = null, s()), ai = 0, Eh(), qt = t, wt = s = wi(t.current, null), Ct = n, Lt = 0, rn = null, ns = !1, Za = Uo(t, n), xh = !1, Fa = un = ru = Qs = is = Jt = 0, Ke = gl = null, Sh = !1, Oi = Cp(t, n), Sr(), s;
  }
  function Dv(t, n) {
    yt = null, et.H = Qr, n === Ua || n === Rr ? (n = Uy(), Lt = 3) : n === bf ? (n = Uy(), Lt = 4) : Lt = n === Zf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, rn = n, wt === null && (Jt = 1, Zr(
      t,
      vn(n, t.current)
    ));
  }
  function Rv() {
    var t = Se.current;
    return t === null ? !0 : (Ct & 4194048) === Ct ? Ae === null : (Ct & 62914560) === Ct || (Ct & 536870912) !== 0 ? t === Ae : !1;
  }
  function Vv() {
    var t = et.H;
    return et.H = Qr, t === null ? Qr : t;
  }
  function kv() {
    var t = et.A;
    return et.A = QE, t;
  }
  function mu() {
    Jt = 4, ns || (Ct & 4194048) !== Ct && Se.current !== null || (Za = !0), (is & 134217727) === 0 && (Qs & 134217727) === 0 || qt === null || as(
      qt,
      Ct,
      un,
      !1
    );
  }
  function Ch(t, n, s) {
    var l = Vt;
    Vt |= 2;
    var u = Vv(), h = kv();
    (qt !== t || Ct !== n) && (fu = null, Wa(t, n)), n = !1;
    var y = Jt;
    t: do
      try {
        if (Lt !== 0 && wt !== null) {
          var x = wt, T = rn;
          switch (Lt) {
            case 8:
              Eh(), y = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Se.current === null && (n = !0);
              var O = Lt;
              if (Lt = 0, rn = null, to(t, x, T, O), s && Za) {
                y = 0;
                break t;
              }
              break;
            default:
              O = Lt, Lt = 0, rn = null, to(t, x, T, O);
          }
        }
        KE(), y = Jt;
        break;
      } catch (N) {
        Dv(t, N);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Ei = ks = null, Vt = l, et.H = u, et.A = h, wt === null && (qt = null, Ct = 0, Sr()), y;
  }
  function KE() {
    for (; wt !== null; ) Nv(wt);
  }
  function IE(t, n) {
    var s = Vt;
    Vt |= 2;
    var l = Vv(), u = kv();
    qt !== t || Ct !== n ? (fu = null, cu = tn() + 500, Wa(t, n)) : Za = Uo(
      t,
      n
    );
    t: do
      try {
        if (Lt !== 0 && wt !== null) {
          n = wt;
          var h = rn;
          e: switch (Lt) {
            case 1:
              Lt = 0, rn = null, to(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (Ly(h)) {
                Lt = 0, rn = null, Lv(n);
                break;
              }
              n = function() {
                Lt !== 2 && Lt !== 9 || qt !== t || (Lt = 7), oi(t);
              }, h.then(n, n);
              break t;
            case 3:
              Lt = 7;
              break t;
            case 4:
              Lt = 5;
              break t;
            case 7:
              Ly(h) ? (Lt = 0, rn = null, Lv(n)) : (Lt = 0, rn = null, to(t, n, h, 7));
              break;
            case 5:
              var y = null;
              switch (wt.tag) {
                case 26:
                  y = wt.memoizedState;
                case 5:
                case 27:
                  var x = wt;
                  if (y ? Mb(y) : x.stateNode.complete) {
                    Lt = 0, rn = null;
                    var T = x.sibling;
                    if (T !== null) wt = T;
                    else {
                      var O = x.return;
                      O !== null ? (wt = O, pu(O)) : wt = null;
                    }
                    break e;
                  }
              }
              Lt = 0, rn = null, to(t, n, h, 5);
              break;
            case 6:
              Lt = 0, rn = null, to(t, n, h, 6);
              break;
            case 8:
              Eh(), Jt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        JE();
        break;
      } catch (N) {
        Dv(t, N);
      }
    while (!0);
    return Ei = ks = null, et.H = l, et.A = u, Vt = s, wt !== null ? 0 : (qt = null, Ct = 0, Sr(), Jt);
  }
  function JE() {
    for (; wt !== null && !mT(); )
      Nv(wt);
  }
  function Nv(t) {
    var n = Jg(t.alternate, t, Oi);
    t.memoizedProps = t.pendingProps, n === null ? pu(t) : wt = n;
  }
  function Lv(t) {
    var n = t, s = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Yg(
          s,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Ct
        );
        break;
      case 11:
        n = Yg(
          s,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Ct
        );
        break;
      case 5:
        Rf(n);
        var l = n;
        l === me && (xt ? (Mr(l), l.tag === 5 && l.stateNode != null && (Xt = l.stateNode)) : (Mr(l), xt = !0));
      default:
        Wg(s, n), n = wt = Cy(n, Oi), n = Jg(s, n, Oi);
    }
    t.memoizedProps = t.pendingProps, n === null ? pu(t) : wt = n;
  }
  function to(t, n, s, l) {
    Ei = ks = null, Rf(n), Ha = null, nl = 0;
    var u = n.return;
    try {
      if (UE(
        t,
        u,
        n,
        s,
        Ct
      )) {
        Jt = 1, Zr(
          t,
          vn(s, t.current)
        ), wt = null;
        return;
      }
    } catch (h) {
      if (u !== null) throw wt = u, h;
      Jt = 1, Zr(
        t,
        vn(s, t.current)
      ), wt = null;
      return;
    }
    n.flags & 32768 ? (xt || l === 1 ? t = !0 : Za || (Ct & 536870912) !== 0 ? t = !1 : (ns = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Se.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Bv(n, t)) : pu(n);
  }
  function pu(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        Bv(
          n,
          ns
        );
        return;
      }
      t = n.return;
      var s = PE(
        n.alternate,
        n,
        Oi
      );
      if (s !== null) {
        wt = s;
        return;
      }
      if (n = n.sibling, n !== null) {
        wt = n;
        return;
      }
      wt = n = t;
    } while (n !== null);
    Jt === 0 && (Jt = 5);
  }
  function Bv(t, n) {
    do {
      var s = GE(t.alternate, t);
      if (s !== null) {
        s.flags &= 32767, wt = s;
        return;
      }
      if (s = t.return, s !== null && (s.flags |= 32768, s.subtreeFlags = 0, s.deletions = null), !n && (t = t.sibling, t !== null)) {
        wt = t;
        return;
      }
      wt = t = s;
    } while (t !== null);
    Jt = 6, wt = null;
  }
  function Uv(t, n, s, l, u, h, y, x, T, O, N, j) {
    t.cancelPendingCommit = null;
    do
      yu();
    while (Ft !== 0);
    if ((Vt & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === t.current) throw Error(o(177));
      t === qt && (wt = qt = null, Ct = 0), Zs = n, Nn = t, ai = s, Th = u, Mv = l, $E(
        t,
        n,
        s,
        y,
        x,
        T,
        j
      );
    }
  }
  function $E(t, n, s, l, u, h, y) {
    var x = n.lanes | n.childLanes;
    if (wh = x, x |= of, ET(
      t,
      s,
      x,
      l,
      u,
      h
    ), Ia = null, (s & 335544064) === s ? (Ja = _E(t), l = 10262) : (Ja = null, l = 10256), (n.subtreeFlags & l) !== 0 || (n.flags & l) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, sC(sr, function() {
      return Ah(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), eu = !1, l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
      l = et.T, et.T = null, u = ct.p, ct.p = 2, h = Vt, Vt |= 4;
      try {
        YE(t, n, s);
      } finally {
        Vt = h, ct.p = u, et.T = l;
      }
    }
    Ft = 1, eu ? Ka = EC(
      y,
      t.containerInfo,
      Ja,
      _h,
      Mh,
      tC,
      zh,
      Ah,
      WE
    ) : (_h(), Mh(), zh());
  }
  function WE(t) {
    if (Ft !== 0) {
      var n = Nn.onRecoverableError;
      n(t, { componentStack: null });
    }
  }
  function tC() {
    Ft === 3 && (Ft = 0, xv(Zs, Nn), Ft = 4);
  }
  function _h() {
    if (Ft === 1) {
      Ft = 0;
      var t = Nn, n = Zs, s = ai, l = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || l) {
        l = et.T, et.T = null;
        var u = ct.p;
        ct.p = 2;
        var h = Vt;
        Vt |= 4;
        try {
          ml = su = !1, vv(n, t, s), s = qh;
          var y = py(t.containerInfo), x = s.focusedElem, T = s.selectionRange;
          if (y !== x && x && x.ownerDocument && my(
            x.ownerDocument.documentElement,
            x
          )) {
            if (T !== null && tf(x)) {
              var O = T.start, N = T.end;
              if (N === void 0 && (N = O), "selectionStart" in x)
                x.selectionStart = O, x.selectionEnd = Math.min(
                  N,
                  x.value.length
                );
              else {
                var j = x.ownerDocument || document, z = j && j.defaultView || window;
                if (z.getSelection) {
                  var V = z.getSelection(), Z = x.textContent.length, nt = Math.min(T.start, Z), gt = T.end === void 0 ? nt : Math.min(T.end, Z);
                  !V.extend && nt > gt && (y = gt, gt = nt, nt = y);
                  var A = dy(
                    x,
                    nt
                  ), _ = dy(
                    x,
                    gt
                  );
                  if (A && _ && (V.rangeCount !== 1 || V.anchorNode !== A.node || V.anchorOffset !== A.offset || V.focusNode !== _.node || V.focusOffset !== _.offset)) {
                    var D = j.createRange();
                    D.setStart(A.node, A.offset), V.removeAllRanges(), nt > gt ? (V.addRange(D), V.extend(_.node, _.offset)) : (D.setEnd(_.node, _.offset), V.addRange(D));
                  }
                }
              }
            }
            for (j = [], V = x; V = V.parentNode; )
              V.nodeType === 1 && j.push({
                element: V,
                left: V.scrollLeft,
                top: V.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < j.length; x++) {
              var H = j[x];
              H.element.scrollLeft = H.left, H.element.scrollTop = H.top;
            }
          }
          ro = !!jh, qh = jh = null;
        } finally {
          Vt = h, ct.p = u, et.T = l;
        }
      }
      t.current = n, Ft = 2;
    }
  }
  function Mh() {
    if (Ft === 2) {
      Ft = 0;
      var t = Nn, n = Zs, s = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || s) {
        s = et.T, et.T = null;
        var l = ct.p;
        ct.p = 2;
        var u = Vt;
        Vt |= 4;
        try {
          hv(t, n.alternate, n);
        } finally {
          Vt = u, ct.p = l, et.T = s;
        }
      }
      Ft = 3;
    }
  }
  function zh() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0;
      var t = Ka;
      Ka = null, pT();
      var n = Nn, s = Zs, l = ai, u = Mv, h = (l & 335544064) === l ? 10262 : 10256;
      if ((s.subtreeFlags & h) !== 0 || (s.flags & h) !== 0 ? Ft = 5 : (Ft = 0, Zs = Nn = null, Hv(n, n.pendingLanes)), h = n.pendingLanes, h === 0 && (ss = null), Lc(l), s = s.stateNode, en && typeof en.onCommitFiberRoot == "function")
        try {
          en.onCommitFiberRoot(
            Bo,
            s,
            void 0,
            (s.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        s = et.T, h = ct.p, ct.p = 2, et.T = null;
        try {
          for (var y = n.onRecoverableError, x = 0; x < u.length; x++) {
            var T = u[x];
            y(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          et.T = s, ct.p = h;
        }
      }
      if (u = Ia, y = Ja, Ja = null, u !== null && (Ia = null, y === null && (y = []), t !== null))
        for (T = 0; T < u.length; T++)
          s = (0, u[T])(
            y
          ), s !== void 0 && t.finished.finally(s);
      (ai & 3) !== 0 && yu(), oi(n), h = n.pendingLanes, (l & 261930) !== 0 && (h & 42) !== 0 ? n === hu ? vl++ : (vl = 0, hu = n) : (vl = 0, hu = null), bl(0);
    }
  }
  function Hv(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Wo(n)));
  }
  function yu() {
    return Ka !== null && (Ka.skipTransition(), Ka = null), _h(), Mh(), zh(), Ah();
  }
  function Ah() {
    if (Ft !== 5) return !1;
    var t = Nn, n = wh;
    wh = 0;
    var s = Lc(ai), l = et.T, u = ct.p;
    try {
      ct.p = 32 > s ? 32 : s, et.T = null, s = Th, Th = null;
      var h = Nn, y = ai;
      if (Ft = 0, Zs = Nn = null, ai = 0, (Vt & 6) !== 0) throw Error(o(331));
      var x = Vt;
      if (Vt |= 4, Ev(h.current), Sv(
        h,
        h.current,
        y,
        s
      ), Vt = x, bl(0, !1), en && typeof en.onPostCommitFiberRoot == "function")
        try {
          en.onPostCommitFiberRoot(Bo, h);
        } catch {
        }
      return !0;
    } finally {
      ct.p = u, et.T = l, Hv(t, n);
    }
  }
  function jv(t, n, s) {
    n = vn(s, n), n = Qf(t.stateNode, n, 2), t = Ii(t, n, 2), t !== null && (Ho(t, 2), oi(t));
  }
  function Bt(t, n, s) {
    if (t.tag === 3)
      jv(t, t, s);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          jv(
            n,
            t,
            s
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ss === null || !ss.has(l))) {
            t = vn(s, t), s = Lg(2), l = Ii(n, s, 2), l !== null && (Bg(
              s,
              l,
              n,
              t
            ), Ho(l, 2), oi(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Oh(t, n, s) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new ZE();
      var u = /* @__PURE__ */ new Set();
      l.set(n, u);
    } else
      u = l.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(n, u));
    u.has(s) || (xh = !0, u.add(s), t = eC.bind(null, t, n, s), n.then(t, t));
  }
  function eC(t, n, s) {
    var l = t.pingCache;
    l !== null && l.delete(n), t.pingedLanes |= t.suspendedLanes & s, t.warmLanes &= ~s, qt === t && (Ct & s) === s && ((Jt === 4 || Jt === 3 && (Ct & 62914560) === Ct && 300 > tn() - uu) && (Vt & 2) === 0 ? Wa(t, 0) : ru |= s, Fa === Ct && (Fa = 0)), oi(t);
  }
  function qv(t, n) {
    n === 0 && (n = _p()), t = Ds(t, n), t !== null && (Ho(t, n), oi(t));
  }
  function nC(t) {
    var n = t.memoizedState, s = 0;
    n !== null && (s = n.retryLane), qv(t, s);
  }
  function iC(t, n) {
    var s = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode, u = t.memoizedState;
        u !== null && (s = u.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(n), qv(t, s);
  }
  function sC(t, n) {
    return Rc(t, n);
  }
  var eo = null, no = null, Dh = !1, gu = !1, Rh = !1, os = 0;
  function oi(t) {
    t !== no && t.next === null && (no === null ? eo = no = t : no = no.next = t), gu = !0, Dh || (Dh = !0, oC());
  }
  function bl(t, n) {
    if (!Rh && gu) {
      Rh = !0;
      do
        for (var s = !1, l = eo; l !== null; ) {
          if (t !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var h = 0;
            else {
              var y = l.suspendedLanes, x = l.pingedLanes;
              h = (1 << 31 - nn(42 | t) + 1) - 1, h &= u & ~(y & ~x), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (s = !0, Xv(l, h));
          } else
            h = Ct, h = rr(
              l,
              l === qt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Uo(l, h) || (s = !0, Xv(l, h));
          l = l.next;
        }
      while (s);
      Rh = !1;
    }
  }
  function aC() {
    Pv();
  }
  function Pv() {
    gu = Dh = !1;
    var t = 0;
    os !== 0 && gC() && (t = os);
    for (var n = tn(), s = null, l = eo; l !== null; ) {
      var u = l.next, h = Gv(l, n);
      h === 0 ? (l.next = null, s === null ? eo = u : s.next = u, u === null && (no = s)) : (s = l, (t !== 0 || (h & 3) !== 0) && (gu = !0)), l = u;
    }
    Ft !== 0 && Ft !== 5 || bl(t), os !== 0 && (os = 0);
  }
  function Gv(t, n) {
    for (var s = t.suspendedLanes, l = t.pingedLanes, u = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var y = 31 - nn(h), x = 1 << y, T = u[y];
      T === -1 ? ((x & s) === 0 || (x & l) !== 0) && (u[y] = TT(x, n)) : T <= n && (t.expiredLanes |= x), h &= ~x;
    }
    if (n = qt, s = Ct, s = rr(
      t,
      t === n ? s : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, s === 0 || t === n && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && Vc(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((s & 3) === 0 || Uo(t, s)) {
      if (n = s & -s, n === t.callbackPriority) return n;
      switch (l !== null && Vc(l), Lc(s)) {
        case 2:
        case 8:
          s = Tp;
          break;
        case 32:
          s = sr;
          break;
        case 268435456:
          s = Ep;
          break;
        default:
          s = sr;
      }
      return l = Yv.bind(null, t), s = Rc(s, l), t.callbackPriority = n, t.callbackNode = s, n;
    }
    return l !== null && l !== null && Vc(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Yv(t, n) {
    if (Ft !== 0 && Ft !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var s = t.callbackNode;
    if (yu() && t.callbackNode !== s)
      return null;
    var l = Ct;
    return l = rr(
      t,
      t === qt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (Av(t, l, n), Gv(t, tn()), t.callbackNode != null && t.callbackNode === s ? Yv.bind(null, t) : null);
  }
  function Xv(t, n) {
    if (yu()) return null;
    Av(t, n, !0);
  }
  function oC() {
    bC(function() {
      (Vt & 6) !== 0 ? Rc(
        wp,
        aC
      ) : Pv();
    });
  }
  function Vh() {
    if (os === 0) {
      var t = Bs;
      t === 0 && (t = ar, ar <<= 1, (ar & 261888) === 0 && (ar = 256)), os = t;
    }
    return os;
  }
  function Qv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : dr(t);
  }
  function lC(t, n, s, l, u) {
    if (n === "submit" && s && s.stateNode === u) {
      var h = Qv(
        (u[Xe] || null).action
      ), y = l.submitter;
      y && (n = (n = y[Xe] || null) ? Qv(n.formAction) : y.getAttribute("formAction"), n !== null && (h = n, y = null));
      var x = new gr(
        "action",
        "action",
        null,
        l,
        u
      );
      t.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (os !== 0) {
                  var T = new FormData(u, y);
                  qf(
                    s,
                    {
                      pending: !0,
                      data: T,
                      method: u.method,
                      action: h
                    },
                    null,
                    T
                  );
                }
              } else
                typeof h == "function" && (x.preventDefault(), T = new FormData(u, y), qf(
                  s,
                  {
                    pending: !0,
                    data: T,
                    method: u.method,
                    action: h
                  },
                  h,
                  T
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var kh = 0; kh < af.length; kh++) {
    var Nh = af[kh], rC = Nh.toLowerCase(), uC = Nh[0].toUpperCase() + Nh.slice(1);
    Dn(
      rC,
      "on" + uC
    );
  }
  Dn(vy, "onAnimationEnd"), Dn(by, "onAnimationIteration"), Dn(xy, "onAnimationStart"), Dn("dblclick", "onDoubleClick"), Dn("focusin", "onFocus"), Dn("focusout", "onBlur"), Dn(vE, "onTransitionRun"), Dn(bE, "onTransitionStart"), Dn(xE, "onTransitionCancel"), Dn(Sy, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), zs(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), zs(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), zs("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), zs(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), zs(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), zs(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var xl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cC = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xl)
  );
  function Zv(t, n) {
    n = (n & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var l = t[s], u = l.event;
      l = l.listeners;
      t: {
        var h = void 0;
        if (n)
          for (var y = l.length - 1; 0 <= y; y--) {
            var x = l[y], T = x.instance, O = x.currentTarget;
            if (x = x.listener, T !== h && u.isPropagationStopped())
              break t;
            h = x, u.currentTarget = O;
            try {
              h(u);
            } catch (N) {
              xr(N);
            }
            u.currentTarget = null, h = T;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (x = l[y], T = x.instance, O = x.currentTarget, x = x.listener, T !== h && u.isPropagationStopped())
              break t;
            h = x, u.currentTarget = O;
            try {
              h(u);
            } catch (N) {
              xr(N);
            }
            u.currentTarget = null, h = T;
          }
      }
    }
  }
  function Tt(t, n) {
    var s = n[Rp];
    s === void 0 && (s = n[Rp] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    s.has(l) || (Fv(n, t, 2, !1), s.add(l));
  }
  function Lh(t, n, s) {
    var l = 0;
    n && (l |= 4), Fv(
      s,
      t,
      l,
      n
    );
  }
  var vu = "_reactListening" + Math.random().toString(36).slice(2);
  function Bh(t) {
    if (!t[vu]) {
      t[vu] = !0, Np.forEach(function(s) {
        s !== "selectionchange" && (cC.has(s) || Lh(s, !1, t), Lh(s, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[vu] || (n[vu] = !0, Lh("selectionchange", !1, n));
    }
  }
  function Fv(t, n, s, l) {
    switch (Bb(n)) {
      case 2:
        var u = n_;
        break;
      case 8:
        u = i_;
        break;
      default:
        u = id;
    }
    s = u.bind(
      null,
      n,
      s,
      t
    ), u = void 0, !Yc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), l ? u !== void 0 ? t.addEventListener(n, s, {
      capture: !0,
      passive: u
    }) : t.addEventListener(n, s, !0) : u !== void 0 ? t.addEventListener(n, s, {
      passive: u
    }) : t.addEventListener(n, s, !1);
  }
  function Uh(t, n, s, l, u) {
    var h = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var x = l.stateNode.containerInfo;
          if (x === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var T = y.tag;
              if ((T === 3 || T === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; x !== null; ) {
            if (y = Ms(x), y === null) return;
            if (T = y.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              l = h = y;
              continue t;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    Fp(function() {
      var O = h, N = Pc(s), j = [];
      t: {
        var z = wy.get(t);
        if (z !== void 0) {
          var V = gr, Z = t;
          switch (t) {
            case "keypress":
              if (pr(s) === 0) break t;
            case "keydown":
            case "keyup":
              V = FT;
              break;
            case "focusin":
              Z = "focus", V = Fc;
              break;
            case "focusout":
              Z = "blur", V = Fc;
              break;
            case "beforeblur":
            case "afterblur":
              V = Fc;
              break;
            case "click":
              if (s.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              V = Jp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = LT;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = WT;
              break;
            case vy:
            case by:
            case xy:
              V = HT;
              break;
            case Sy:
              V = eE;
              break;
            case "scroll":
            case "scrollend":
              V = kT;
              break;
            case "wheel":
              V = iE;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = qT;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = Wp;
              break;
            case "submit":
              V = JT;
              break;
            case "toggle":
            case "beforetoggle":
              V = aE;
          }
          var nt = (n & 4) !== 0, gt = !nt && (t === "scroll" || t === "scrollend"), A = nt ? z !== null ? z + "Capture" : null : z;
          nt = [];
          for (var _ = O, D; _ !== null; ) {
            var H = _;
            if (D = H.stateNode, H = H.tag, H !== 5 && H !== 26 && H !== 27 || D === null || A === null || (H = Po(_, A), H != null && nt.push(
              Sl(_, H, D)
            )), gt) break;
            _ = _.return;
          }
          0 < nt.length && (z = new V(
            z,
            Z,
            null,
            s,
            N
          ), j.push({ event: z, listeners: nt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (V = t === "mouseover" || t === "pointerover", z = t === "mouseout" || t === "pointerout", V && s !== qc && (Z = s.relatedTarget || s.fromElement) && (Ms(Z) || Z[Sa]))
            break t;
          (z || V) && (Z = N.window === N ? N : (V = N.ownerDocument) ? V.defaultView || V.parentWindow : window, z ? (V = s.relatedTarget || s.toElement, z = O, V = V ? Ms(V) : null, V !== null && (gt = c(V), nt = V.tag, V !== gt || nt !== 5 && nt !== 27 && nt !== 6) && (V = null)) : (z = null, V = O), z !== V && (nt = Jp, H = "onMouseLeave", A = "onMouseEnter", _ = "mouse", (t === "pointerout" || t === "pointerover") && (nt = Wp, H = "onPointerLeave", A = "onPointerEnter", _ = "pointer"), gt = z == null ? Z : qo(z), D = V == null ? Z : qo(V), Z = new nt(
            H,
            _ + "leave",
            z,
            s,
            N
          ), Z.target = gt, Z.relatedTarget = D, H = null, Ms(N) === O && (nt = new nt(
            A,
            _ + "enter",
            V,
            s,
            N
          ), nt.target = D, nt.relatedTarget = gt, H = nt), gt = H, nt = z && V ? J(
            z,
            V,
            fC
          ) : null, z !== null && Kv(
            j,
            Z,
            z,
            nt,
            !1
          ), V !== null && gt !== null && Kv(
            j,
            gt,
            V,
            nt,
            !0
          )));
        }
        t: {
          if (z = O ? qo(O) : window, V = z.nodeName && z.nodeName.toLowerCase(), V === "select" || V === "input" && z.type === "file")
            var $ = ly;
          else if (ay(z))
            if (ry)
              $ = pE;
            else {
              $ = dE;
              var _t = hE;
            }
          else
            V = z.nodeName, !V || V.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? O && jc(O.elementType) && ($ = ly) : $ = mE;
          if ($ && ($ = $(t, O))) {
            oy(
              j,
              $,
              s,
              N
            );
            break t;
          }
          _t && _t(t, z, O);
        }
        switch (_t = O ? qo(O) : window, t) {
          case "focusin":
            (ay(_t) || _t.contentEditable === "true") && (Oa = _t, ef = O, Io = null);
            break;
          case "focusout":
            Io = ef = Oa = null;
            break;
          case "mousedown":
            nf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            nf = !1, yy(j, s, N);
            break;
          case "selectionchange":
            if (gE) break;
          case "keydown":
          case "keyup":
            yy(j, s, N);
        }
        var ot;
        if (Ic)
          t: {
            switch (t) {
              case "compositionstart":
                var ft = "onCompositionStart";
                break t;
              case "compositionend":
                ft = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ft = "onCompositionUpdate";
                break t;
            }
            ft = void 0;
          }
        else
          Aa ? iy(t, s) && (ft = "onCompositionEnd") : t === "keydown" && s.keyCode === 229 && (ft = "onCompositionStart");
        ft && (ty && s.locale !== "ko" && (Aa || ft !== "onCompositionStart" ? ft === "onCompositionEnd" && Aa && (ot = Kp()) : (qi = N, Xc = "value" in qi ? qi.value : qi.textContent, Aa = !0)), _t = bu(O, ft), 0 < _t.length && (ft = new $p(
          ft,
          t,
          null,
          s,
          N
        ), j.push({ event: ft, listeners: _t }), ot ? ft.data = ot : (ot = sy(s), ot !== null && (ft.data = ot)))), (ot = lE ? rE(t, s) : uE(t, s)) && (ft = bu(O, "onBeforeInput"), 0 < ft.length && (_t = new $p(
          "onBeforeInput",
          "beforeinput",
          null,
          s,
          N
        ), j.push({
          event: _t,
          listeners: ft
        }), _t.data = ot)), lC(
          j,
          t,
          O,
          s,
          N
        );
      }
      Zv(j, n);
    });
  }
  function Sl(t, n, s) {
    return {
      instance: t,
      listener: n,
      currentTarget: s
    };
  }
  function bu(t, n) {
    for (var s = n + "Capture", l = []; t !== null; ) {
      var u = t, h = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || h === null || (u = Po(t, s), u != null && l.unshift(
        Sl(t, u, h)
      ), u = Po(t, n), u != null && l.push(
        Sl(t, u, h)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function fC(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Kv(t, n, s, l, u) {
    for (var h = n._reactName, y = []; s !== null && s !== l; ) {
      var x = s, T = x.alternate, O = x.stateNode;
      if (x = x.tag, T !== null && T === l) break;
      x !== 5 && x !== 26 && x !== 27 || O === null || (T = O, u ? (O = Po(s, h), O != null && y.unshift(
        Sl(s, O, T)
      )) : u || (O = Po(s, h), O != null && y.push(
        Sl(s, O, T)
      ))), s = s.return;
    }
    y.length !== 0 && t.push({ event: n, listeners: y });
  }
  var hC = /\r\n?/g, dC = /\u0000|\uFFFD/g;
  function Iv(t) {
    return (typeof t == "string" ? t : "" + t).replace(hC, `
`).replace(dC, "");
  }
  function Jv(t, n) {
    return n = Iv(n), Iv(t) === n;
  }
  function Ut(t, n, s, l, u, h) {
    switch (s) {
      case "children":
        if (typeof l == "string")
          n === "body" || n === "textarea" && l === "" || _a(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          n !== "body" && _a(t, "" + l);
        else return;
        break;
      case "className":
        hr(t, "class", l);
        break;
      case "tabIndex":
        hr(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hr(t, s, l);
        break;
      case "style":
        Qp(t, l, h);
        return;
      case "data":
        if (n !== "object") {
          hr(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || s !== "href")) {
          t.removeAttribute(s);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(s);
          break;
        }
        l = dr(l), t.setAttribute(s, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            s,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (s === "formAction" ? (n !== "input" && Ut(t, n, "name", u.name, u, null), Ut(
            t,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ut(
            t,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ut(
            t,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ut(t, n, "encType", u.encType, u, null), Ut(t, n, "method", u.method, u, null), Ut(t, n, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(s);
          break;
        }
        l = dr(l), t.setAttribute(s, l);
        break;
      case "onClick":
        l != null && (t.onclick = In);
        return;
      case "onScroll":
        l != null && Tt("scroll", t);
        return;
      case "onScrollEnd":
        l != null && Tt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (s = l.__html, s != null) {
            if (u.children != null) throw Error(o(60));
            (h != null ? h.__html : void 0) !== s && (t.innerHTML = s);
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        s = dr(l), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          s
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(s, l) : t.removeAttribute(s);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(s, "") : t.removeAttribute(s);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(s, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(s, l) : t.removeAttribute(s);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(s, l) : t.removeAttribute(s);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(s) : t.setAttribute(s, l);
        break;
      case "popover":
        Tt("beforetoggle", t), Tt("toggle", t), fr(t, "popover", l);
        break;
      case "xlinkActuate":
        vi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        vi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        vi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        vi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        vi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        vi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        vi(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        vi(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        vi(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        fr(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < s.length) || s[0] !== "o" && s[0] !== "O" || s[1] !== "n" && s[1] !== "N")
          s = RT.get(s) || s, fr(t, s, l);
        else return;
    }
    Dt = !0;
  }
  function Hh(t, n, s, l, u, h) {
    switch (s) {
      case "style":
        Qp(t, l, h);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (s = l.__html, s != null) {
            if (u.children != null) throw Error(o(60));
            (h != null ? h.__html : void 0) !== s && (t.innerHTML = s);
          }
        }
        break;
      case "children":
        if (typeof l == "string") _a(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          _a(t, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && Tt("scroll", t);
        return;
      case "onScrollEnd":
        l != null && Tt("scrollend", t);
        return;
      case "onClick":
        l != null && (t.onclick = In);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Lp.hasOwnProperty(s))
          t: {
            if (s[0] === "o" && s[1] === "n" && (u = s.endsWith("Capture"), h = s.slice(2, u ? s.length - 7 : void 0), n = t[Xe] || null, n = n != null ? n[s] : null, typeof n == "function" && t.removeEventListener(h, n, u), typeof l == "function")) {
              typeof n != "function" && n !== null && (s in t ? t[s] = null : t.hasAttribute(s) && t.removeAttribute(s)), t.addEventListener(h, l, u);
              break t;
            }
            Dt = !0, s in t ? t[s] = l : l === !0 ? t.setAttribute(s, "") : fr(t, s, l);
          }
        return;
    }
    Dt = !0;
  }
  function Ee(t, n, s) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Tt("error", t), Tt("load", t);
        var l = !1, u = !1, h;
        for (h in s)
          if (s.hasOwnProperty(h)) {
            var y = s[h];
            if (y != null)
              switch (h) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, n));
                default:
                  Ut(t, n, h, y, s, null);
              }
          }
        u && Ut(t, n, "srcSet", s.srcSet, s, null), l && Ut(t, n, "src", s.src, s, null);
        return;
      case "input":
        Tt("invalid", t);
        var x = h = y = u = null, T = null, O = null;
        for (l in s)
          if (s.hasOwnProperty(l)) {
            var N = s[l];
            if (N != null)
              switch (l) {
                case "name":
                  u = N;
                  break;
                case "type":
                  y = N;
                  break;
                case "checked":
                  T = N;
                  break;
                case "defaultChecked":
                  O = N;
                  break;
                case "value":
                  h = N;
                  break;
                case "defaultValue":
                  x = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(o(137, n));
                  break;
                default:
                  Ut(t, n, l, N, s, null);
              }
          }
        Pp(
          t,
          h,
          x,
          T,
          O,
          y,
          u,
          !1
        );
        return;
      case "select":
        Tt("invalid", t), l = y = h = null;
        for (u in s)
          if (s.hasOwnProperty(u) && (x = s[u], x != null))
            switch (u) {
              case "value":
                h = x;
                break;
              case "defaultValue":
                y = x;
                break;
              case "multiple":
                l = x;
              default:
                Ut(t, n, u, x, s, null);
            }
        n = h, s = y, t.multiple = !!l, n != null ? Ca(t, !!l, n, !1) : s != null && Ca(t, !!l, s, !0);
        return;
      case "textarea":
        Tt("invalid", t), h = u = l = null;
        for (y in s)
          if (s.hasOwnProperty(y) && (x = s[y], x != null))
            switch (y) {
              case "value":
                l = x;
                break;
              case "defaultValue":
                u = x;
                break;
              case "children":
                h = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(o(91));
                break;
              default:
                Ut(t, n, y, x, s, null);
            }
        Yp(t, l, u, h);
        return;
      case "option":
        for (T in s)
          if (s.hasOwnProperty(T) && (l = s[T], l != null))
            switch (T) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ut(t, n, T, l, s, null);
            }
        return;
      case "dialog":
        Tt("beforetoggle", t), Tt("toggle", t), Tt("cancel", t), Tt("close", t);
        break;
      case "iframe":
      case "object":
        Tt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < xl.length; l++)
          Tt(xl[l], t);
        break;
      case "image":
        Tt("error", t), Tt("load", t);
        break;
      case "details":
        Tt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Tt("error", t), Tt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (O in s)
          if (s.hasOwnProperty(O) && (l = s[O], l != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                Ut(t, n, O, l, s, null);
            }
        return;
      default:
        if (jc(n)) {
          for (N in s)
            s.hasOwnProperty(N) && (l = s[N], l !== void 0 && Hh(
              t,
              n,
              N,
              l,
              s,
              void 0
            ));
          return;
        }
    }
    for (x in s)
      s.hasOwnProperty(x) && (l = s[x], l != null && Ut(t, n, x, l, s, null));
  }
  var mC = {};
  function pC(t, n, s, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, h = null, y = null, x = null, T = null, O = null, N = null;
        for (V in s) {
          var j = s[V];
          if (s.hasOwnProperty(V) && j != null)
            switch (V) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = j;
              default:
                l.hasOwnProperty(V) || Ut(t, n, V, null, l, j);
            }
        }
        for (var z in l) {
          var V = l[z];
          if (j = s[z], l.hasOwnProperty(z) && (V != null || j != null))
            switch (z) {
              case "type":
                V !== j && (Dt = !0), h = V;
                break;
              case "name":
                V !== j && (Dt = !0), u = V;
                break;
              case "checked":
                V !== j && (Dt = !0), O = V;
                break;
              case "defaultChecked":
                V !== j && (Dt = !0), N = V;
                break;
              case "value":
                V !== j && (Dt = !0), y = V;
                break;
              case "defaultValue":
                V !== j && (Dt = !0), x = V;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null)
                  throw Error(o(137, n));
                break;
              default:
                V !== j && Ut(
                  t,
                  n,
                  z,
                  V,
                  l,
                  j
                );
            }
        }
        Uc(
          t,
          y,
          x,
          T,
          O,
          N,
          h,
          u
        );
        return;
      case "select":
        V = y = x = z = null;
        for (h in s)
          if (T = s[h], s.hasOwnProperty(h) && T != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                V = T;
              default:
                l.hasOwnProperty(h) || Ut(
                  t,
                  n,
                  h,
                  null,
                  l,
                  T
                );
            }
        for (u in l)
          if (h = l[u], T = s[u], l.hasOwnProperty(u) && (h != null || T != null))
            switch (u) {
              case "value":
                h !== T && (Dt = !0), z = h;
                break;
              case "defaultValue":
                h !== T && (Dt = !0), x = h;
                break;
              case "multiple":
                h !== T && (Dt = !0), y = h;
              default:
                h !== T && Ut(
                  t,
                  n,
                  u,
                  h,
                  l,
                  T
                );
            }
        n = x, s = y, l = V, z != null ? Ca(t, !!s, z, !1) : !!l != !!s && (n != null ? Ca(t, !!s, n, !0) : Ca(t, !!s, s ? [] : "", !1));
        return;
      case "textarea":
        V = z = null;
        for (x in s)
          if (u = s[x], s.hasOwnProperty(x) && u != null && !l.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ut(t, n, x, null, l, u);
            }
        for (y in l)
          if (u = l[y], h = s[y], l.hasOwnProperty(y) && (u != null || h != null))
            switch (y) {
              case "value":
                u !== h && (Dt = !0), z = u;
                break;
              case "defaultValue":
                u !== h && (Dt = !0), V = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== h && Ut(t, n, y, u, l, h);
            }
        Gp(t, z, V);
        return;
      case "option":
        for (var Z in s)
          if (z = s[Z], s.hasOwnProperty(Z) && z != null && !l.hasOwnProperty(Z))
            switch (Z) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ut(
                  t,
                  n,
                  Z,
                  null,
                  l,
                  z
                );
            }
        for (T in l)
          if (z = l[T], V = s[T], l.hasOwnProperty(T) && z !== V && (z != null || V != null))
            switch (T) {
              case "selected":
                z !== V && (Dt = !0), t.selected = z && typeof z != "function" && typeof z != "symbol";
                break;
              default:
                Ut(
                  t,
                  n,
                  T,
                  z,
                  l,
                  V
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var nt in s)
          z = s[nt], s.hasOwnProperty(nt) && z != null && !l.hasOwnProperty(nt) && Ut(t, n, nt, null, l, z);
        for (O in l)
          if (z = l[O], V = s[O], l.hasOwnProperty(O) && z !== V && (z != null || V != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(o(137, n));
                break;
              default:
                Ut(
                  t,
                  n,
                  O,
                  z,
                  l,
                  V
                );
            }
        return;
      default:
        if (jc(n)) {
          for (var gt in s)
            z = s[gt], s.hasOwnProperty(gt) && z !== void 0 && !l.hasOwnProperty(gt) && Hh(
              t,
              n,
              gt,
              void 0,
              l,
              z
            );
          for (N in l)
            z = l[N], V = s[N], !l.hasOwnProperty(N) || z === V || z === void 0 && V === void 0 || Hh(
              t,
              n,
              N,
              z,
              l,
              V
            );
          return;
        }
    }
    for (var A in s)
      z = s[A], s.hasOwnProperty(A) && z != null && !l.hasOwnProperty(A) && Ut(t, n, A, null, l, z);
    for (j in l)
      z = l[j], V = s[j], !l.hasOwnProperty(j) || z === V || z == null && V == null || Ut(t, n, j, z, l, V);
  }
  function $v(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function yC() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, s = performance.getEntriesByType("resource"), l = 0; l < s.length; l++) {
        var u = s[l], h = u.transferSize, y = u.initiatorType, x = u.duration;
        if (h && x && $v(y)) {
          for (y = 0, x = u.responseEnd, l += 1; l < s.length; l++) {
            var T = s[l], O = T.startTime;
            if (O > x) break;
            var N = T.transferSize, j = T.initiatorType;
            N && $v(j) && (T = T.responseEnd, y += N * (T < x ? 1 : (x - O) / (T - O)));
          }
          if (--l, n += 8 * (h + y) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var jh = null, qh = null;
  function wl(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Wv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function tb(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function eb(t, n, s, l) {
    return s = wl(
      s
    ).createElement(t), s[be] = l, s[Xe] = n, Ee(s, t, n), de(s), s;
  }
  function Ph(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Gh = null;
  function gC() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Gh ? !1 : (Gh = t, !0) : (Gh = null, !1);
  }
  var Yh = typeof setTimeout == "function" ? setTimeout : void 0, vC = typeof clearTimeout == "function" ? clearTimeout : void 0, nb = typeof Promise == "function" ? Promise : void 0, ib = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Yh, bC = typeof queueMicrotask == "function" ? queueMicrotask : typeof nb < "u" ? function(t) {
    return nb.resolve(null).then(t).catch(xC);
  } : Yh;
  function xC(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ls(t) {
    return t === "head";
  }
  function sb(t, n) {
    var s = n, l = 0;
    do {
      var u = s.nextSibling;
      if (t.removeChild(s), u && u.nodeType === 8)
        if (s = u.data, s === "/$" || s === "/&") {
          if (l === 0) {
            t.removeChild(u), uo(n);
            return;
          }
          l--;
        } else if (s === "$" || s === "$?" || s === "$~" || s === "$!" || s === "&")
          l++;
        else if (s === "html")
          $h(
            t.ownerDocument.documentElement
          );
        else if (s === "head") {
          s = t.ownerDocument.head, $h(s);
          for (var h = s.firstChild; h; ) {
            var y = h.nextSibling, x = h.nodeName;
            h[jo] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && h.rel.toLowerCase() === "stylesheet" || s.removeChild(h), h = y;
          }
        } else
          s === "body" && $h(t.ownerDocument.body);
      s = u;
    } while (s);
    uo(n);
  }
  function ab(t, n) {
    var s = t;
    t = 0;
    do {
      var l = s.nextSibling;
      if (s.nodeType === 1 ? n ? (s._stashedDisplay = s.style.display, s.style.display = "none") : (s.style.display = s._stashedDisplay || "", s.getAttribute("style") === "" && s.removeAttribute("style")) : s.nodeType === 3 && (n ? (s._stashedText = s.nodeValue, s.nodeValue = "") : s.nodeValue = s._stashedText || ""), l && l.nodeType === 8)
        if (s = l.data, s === "/$") {
          if (t === 0) break;
          t--;
        } else
          s !== "$" && s !== "$?" && s !== "$~" && s !== "$!" || t++;
      s = l;
    } while (s);
  }
  function ob(t, n, s) {
    if (n = CSS.escape(n) !== n ? "r-" + btoa(n).replace(/=/g, "") : n, t.style.viewTransitionName = n, s != null && (t.style.viewTransitionClass = s), s = getComputedStyle(t), s.display === "inline") {
      if (n = t.getClientRects(), n.length === 1) var l = 1;
      else
        for (var u = l = 0; u < n.length; u++) {
          var h = n[u];
          0 < h.width && 0 < h.height && l++;
        }
      l === 1 && (t = t.style, t.display = n.length === 1 ? "inline-block" : "block", t.marginTop = "-" + s.paddingTop, t.marginBottom = "-" + s.paddingBottom);
    }
  }
  function lb(t, n) {
    t = t.style, n = n.style;
    var s = n != null ? n.hasOwnProperty("viewTransitionName") ? n.viewTransitionName : n.hasOwnProperty("view-transition-name") ? n["view-transition-name"] : null : null;
    t.viewTransitionName = s == null || typeof s == "boolean" ? "" : ("" + s).trim(), s = n != null ? n.hasOwnProperty("viewTransitionClass") ? n.viewTransitionClass : n.hasOwnProperty("view-transition-class") ? n["view-transition-class"] : null : null, t.viewTransitionClass = s == null || typeof s == "boolean" ? "" : ("" + s).trim(), t.display === "inline-block" && (n == null ? t.display = t.margin = "" : (s = n.display, t.display = s == null || typeof s == "boolean" ? "" : s, s = n.margin, s != null ? t.margin = s : (s = n.hasOwnProperty("marginTop") ? n.marginTop : n["margin-top"], t.marginTop = s == null || typeof s == "boolean" ? "" : s, n = n.hasOwnProperty("marginBottom") ? n.marginBottom : n["margin-bottom"], t.marginBottom = n == null || typeof n == "boolean" ? "" : n)));
  }
  function SC(t, n, s) {
    return s = s.ownerDocument.defaultView, {
      rect: t,
      abs: n.position === "absolute" || n.position === "fixed",
      clip: n.clipPath !== "none" || n.overflow !== "visible" || n.filter !== "none" || n.mask !== "none" || n.mask !== "none" || n.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= s.innerHeight && t.left <= s.innerWidth
    };
  }
  function Xh(t) {
    var n = t.getBoundingClientRect(), s = getComputedStyle(t);
    return SC(n, s, t);
  }
  function wC(t) {
    return t.documentElement.clientHeight;
  }
  function TC(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function EC(t, n, s, l, u, h, y, x, T) {
    var O = n.nodeType === 9 ? n : n.ownerDocument;
    try {
      var N = O.startViewTransition({
        update: function() {
          var z = O.defaultView, V = z.navigation && z.navigation.transition, Z = O.fonts.status;
          l();
          var nt = [];
          if (Z === "loaded" && (wC(O), O.fonts.status === "loading" && nt.push(O.fonts.ready)), Z = nt.length, t !== null)
            for (var gt = t.suspenseyImages, A = 0, _ = 0; _ < gt.length; _++) {
              var D = gt[_];
              if (!D.complete) {
                var H = D.getBoundingClientRect();
                if (0 < H.bottom && 0 < H.right && H.top < z.innerHeight && H.left < z.innerWidth) {
                  if (A += zb(D), A > wu) {
                    nt.length = Z;
                    break;
                  }
                  D = new Promise(
                    TC.bind(D)
                  ), nt.push(D);
                }
              }
            }
          if (0 < nt.length)
            return z = Promise.race([
              Promise.all(nt),
              new Promise(function($) {
                return setTimeout($, 500);
              })
            ]).then(u, u), (V ? Promise.allSettled([V.finished, z]) : z).then(h, h);
          if (u(), V)
            return V.finished.then(
              h,
              h
            );
          h();
        },
        types: s
      });
      O.__reactViewTransition = N;
      var j = [];
      return N.ready.then(
        function() {
          for (var z = O.documentElement.getAnimations({
            subtree: !0
          }), V = 0; V < z.length; V++) {
            var Z = z[V], nt = Z.effect, gt = nt.pseudoElement;
            if (gt != null && gt.startsWith("::view-transition")) {
              j.push(Z), Z = nt.getKeyframes();
              for (var A = gt = void 0, _ = !0, D = 0; D < Z.length; D++) {
                var H = Z[D], $ = H.width;
                if (gt === void 0) gt = $;
                else if (gt !== $) {
                  _ = !1;
                  break;
                }
                if ($ = H.height, A === void 0) A = $;
                else if (A !== $) {
                  _ = !1;
                  break;
                }
                delete H.width, delete H.height, H.transform === "none" && delete H.transform;
              }
              _ && gt !== void 0 && A !== void 0 && (nt.setKeyframes(Z), _ = getComputedStyle(
                nt.target,
                nt.pseudoElement
              ), _.width !== gt || _.height !== A) && (_ = Z[0], _.width = gt, _.height = A, _ = Z[Z.length - 1], _.width = gt, _.height = A, nt.setKeyframes(Z));
            }
          }
          y();
        },
        function(z) {
          O.__reactViewTransition === N && (O.__reactViewTransition = null);
          try {
            if (typeof z == "object" && z !== null)
              switch (z.name) {
                case "InvalidStateError":
                  (z.message === "View transition was skipped because document visibility state is hidden." || z.message === "Skipping view transition because document visibility state has become hidden." || z.message === "Skipping view transition because viewport size changed." || z.message === "Transition was aborted because of invalid state") && (z = null);
              }
            z !== null && T(z);
          } finally {
            l(), u(), y();
          }
        }
      ), N.finished.finally(function() {
        for (var z = 0; z < j.length; z++)
          j[z].cancel();
        O.__reactViewTransition === N && (O.__reactViewTransition = null), x();
      }), N;
    } catch {
      return l(), u(), y(), null;
    }
  }
  function Fs(t, n) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + n + ")";
  }
  Fs.prototype.animate = function(t, n) {
    return n = typeof n == "number" ? { duration: n } : Y({}, n), n.pseudoElement = this._selector, this._scope.animate(t, n);
  }, Fs.prototype.getAnimations = function() {
    for (var t = this._scope, n = this._selector, s = t.getAnimations({ subtree: !0 }), l = [], u = 0; u < s.length; u++) {
      var h = s[u].effect;
      h !== null && h.target === t && h.pseudoElement === n && l.push(s[u]);
    }
    return l;
  }, Fs.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function rb(t) {
    return {
      name: t,
      group: new Fs("group", t),
      imagePair: new Fs("image-pair", t),
      old: new Fs("old", t),
      new: new Fs("new", t)
    };
  }
  function fn(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  fn.prototype.addEventListener = function(t, n, s) {
    var l = null, u = null;
    if (!(s != null && typeof s != "boolean" && (l = s.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var h = this._eventListeners;
      if (cb(h, t, n, s) === -1) {
        var y = this, x = n;
        s != null && typeof s != "boolean" && s.once === !0 && (x = function(T) {
          y.removeEventListener(
            t,
            n,
            s
          ), typeof n == "function" ? n.call(this, T) : n.handleEvent(T);
        }), l !== null && (u = y.removeEventListener.bind(
          y,
          t,
          n,
          s
        ), l.addEventListener("abort", u, { once: !0 }), u = l.removeEventListener.bind(l, "abort", u)), l = io(s), h.push({
          type: t,
          listener: n,
          optionsOrUseCapture: s,
          attachedListener: x,
          cleanup: u
        }), g(
          this._fragmentFiber.child,
          !1,
          CC,
          t,
          x,
          l
        );
      }
      this._eventListeners = h;
    }
  };
  function CC(t, n, s, l) {
    return E(t).addEventListener(
      n,
      s,
      l
    ), !1;
  }
  fn.prototype.removeEventListener = function(t, n, s) {
    var l = this._eventListeners;
    if (l !== null && (n = cb(
      l,
      t,
      n,
      s
    ), n !== -1)) {
      var u = l[n];
      s = u.attachedListener;
      var h = u.cleanup;
      u = io(u.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        _C,
        t,
        s,
        u
      ), l.splice(n, 1), h !== null && h();
    }
  };
  function _C(t, n, s, l) {
    return E(t).removeEventListener(
      n,
      s,
      l
    ), !1;
  }
  function io(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function ub(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function cb(t, n, s, l) {
    if (t.length === 0) return -1;
    l = ub(l);
    for (var u = 0; u < t.length; u++) {
      var h = t[u];
      if (h.type === n && h.listener === s && ub(h.optionsOrUseCapture) === l)
        return u;
    }
    return -1;
  }
  fn.prototype.dispatchEvent = function(t) {
    var n = b(
      this._fragmentFiber
    );
    if (n === null) return !0;
    n = E(n);
    var s = this._eventListeners;
    if (s !== null && 0 < s.length || !t.bubbles) {
      var l = n.nodeType === 9 ? n.createComment("") : document.createTextNode("");
      if (s)
        for (var u = 0; u < s.length; u++) {
          var h = s[u];
          l.addEventListener(
            h.type,
            h.attachedListener,
            io(h.optionsOrUseCapture)
          );
        }
      if (n.appendChild(l), t = l.dispatchEvent(t), s)
        for (u = 0; u < s.length; u++)
          h = s[u], l.removeEventListener(
            h.type,
            h.attachedListener,
            io(h.optionsOrUseCapture)
          );
      return n.removeChild(l), t;
    }
    return n.dispatchEvent(t);
  }, fn.prototype.focus = function(t) {
    g(
      this._fragmentFiber.child,
      !0,
      fb,
      t,
      void 0,
      void 0
    );
  };
  function fb(t, n) {
    return t.tag === 6 ? !1 : (t = E(t), UC(t, n));
  }
  fn.prototype.focusLast = function(t) {
    var n = [];
    g(
      this._fragmentFiber.child,
      !0,
      Qh,
      n,
      void 0,
      void 0
    );
    for (var s = n.length - 1; 0 <= s && !fb(n[s], t); s--) ;
  };
  function Qh(t, n) {
    return n.push(t), !1;
  }
  fn.prototype.blur = function() {
    var t = b(
      this._fragmentFiber
    );
    t !== null && (t = E(t), t = wl(t).activeElement, t !== null && g(
      this._fragmentFiber.child,
      !1,
      MC,
      t,
      void 0,
      void 0
    ));
  };
  function MC(t, n) {
    return t.tag === 6 ? !1 : (t = E(t), t === n || t.contains(n) ? (n.blur(), !0) : !1);
  }
  fn.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), g(
      this._fragmentFiber.child,
      !1,
      zC,
      t,
      void 0,
      void 0
    );
  };
  function zC(t, n) {
    return t.tag === 6 || (t = E(t), n.observe(t)), !1;
  }
  fn.prototype.unobserveUsing = function(t) {
    var n = this._observers;
    if (n !== null && n.has(t)) {
      n.delete(t), g(
        this._fragmentFiber.child,
        !1,
        AC,
        t,
        void 0,
        void 0
      );
      for (var s = n = 0; s < Ln.length; s++) {
        var l = Ln[s];
        l.fragmentInstance === this && l.observer === t ? t.unobserve(l.instance) : Ln[n++] = l;
      }
      Ln.length = n;
    }
  };
  function AC(t, n) {
    return t.tag === 6 || (t = E(t), n.unobserve(t)), !1;
  }
  var Ln = [], Zh = !1;
  function OC(t, n, s) {
    Ln.push({
      fragmentInstance: t,
      observer: n,
      instance: s
    }), Zh || (Zh = !0, HC(function() {
      Zh = !1;
      var l = Ln;
      Ln = [];
      for (var u = 0; u < l.length; u++) {
        var h = l[u];
        h.observer.unobserve(h.instance);
      }
    }));
  }
  fn.prototype.getClientRects = function() {
    var t = [];
    return g(
      this._fragmentFiber.child,
      !1,
      DC,
      t,
      void 0,
      void 0
    ), t;
  };
  function DC(t, n) {
    if (t.tag === 6) {
      t = t.stateNode;
      var s = t.ownerDocument.createRange();
      s.selectNodeContents(t), n.push.apply(n, s.getClientRects());
    } else
      t = E(t), n.push.apply(n, t.getClientRects());
    return !1;
  }
  fn.prototype.getRootNode = function(t) {
    var n = b(
      this._fragmentFiber
    );
    return n === null ? this : E(n).getRootNode(t);
  }, fn.prototype.compareDocumentPosition = function(t) {
    var n = b(
      this._fragmentFiber
    );
    if (n === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var s = [];
    g(
      this._fragmentFiber.child,
      !1,
      Qh,
      s,
      void 0,
      void 0
    );
    var l = E(n);
    if (s.length === 0) {
      if (s = l, S(this._fragmentFiber)) {
        t: {
          for (n = this._fragmentFiber.return; n !== null; ) {
            if (n.tag === 4) {
              n = n.stateNode.containerInfo;
              break t;
            }
            if (n.tag === 3 || n.tag === 5 || n.tag === 27)
              break;
            n = n.return;
          }
          n = null;
        }
        n != null && (s = n);
      }
      n = this._fragmentFiber;
      var u = l = s.compareDocumentPosition(t);
      return s === t ? u = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (s = w(n)[1], s === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = E(s).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    n = E(s[0]), u = E(s[s.length - 1]);
    var h = S(this._fragmentFiber) ? n.parentElement : l;
    if (h == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = h.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY, h = h.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var y = n.compareDocumentPosition(t), x = u.compareDocumentPosition(t), T = y & Node.DOCUMENT_POSITION_CONTAINED_BY || x & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return x = l && h && y & Node.DOCUMENT_POSITION_FOLLOWING && x & Node.DOCUMENT_POSITION_PRECEDING, n = l && n === t || h && u === t || T || x ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && n === t || !h && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : y, n & Node.DOCUMENT_POSITION_DISCONNECTED || n & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || RC(
      n,
      this._fragmentFiber,
      s[0],
      s[s.length - 1],
      t
    ) ? n : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function RC(t, n, s, l, u) {
    var h = Ms(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (s = !!h)
        t: {
          for (; h !== null; ) {
            if (h.tag === 7 && (h === n || h.alternate === n)) {
              s = !0;
              break t;
            }
            h = h.return;
          }
          s = !1;
        }
      return s;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (h === null)
        return h = u.ownerDocument, u === h || u === h.documentElement || u === h.body;
      t: {
        for (h = n, n = b(n); h !== null; ) {
          if (!(h.tag !== 5 && h.tag !== 3 && h.tag !== 27 || h !== n && h.alternate !== n)) {
            h = !0;
            break t;
          }
          h = h.return;
        }
        h = !1;
      }
      return h;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((n = !!h) && !(n = h === s) && (n = J(
      s,
      h,
      P
    ), n === null ? n = !1 : (g(
      n,
      !0,
      U,
      h,
      s
    ), h = R, R = null, n = h !== null)), n) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((n = !!h) && !(n = h === l) && (n = J(
      l,
      h,
      P
    ), n === null ? n = !1 : (g(
      n,
      !0,
      L,
      h,
      l
    ), h = R, k = R = null, n = h !== null)), n) : !1;
  }
  function hb(t, n) {
    var s = t.ownerDocument.createRange();
    s.selectNodeContents(t), t = s.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      n ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  fn.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(o(566));
    var n = [];
    g(
      this._fragmentFiber.child,
      !1,
      Qh,
      n,
      void 0,
      void 0
    );
    var s = t !== !1;
    if (n.length === 0) {
      var l = w(
        this._fragmentFiber
      );
      if (l = s ? l[1] || l[0] || b(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        t = E(l), hb(t, s);
        return;
      }
      if (l = E(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          s = "host" in l ? l.host : null, s !== null && s.scrollIntoView(t);
          return;
        }
        l.scrollIntoView(t);
      }
    }
    for (l = s ? n.length - 1 : 0; l !== (s ? -1 : n.length); ) {
      var u = n[l];
      u.tag === 6 ? (u = E(u), hb(u, s)) : E(u).scrollIntoView(t), l += s ? -1 : 1;
    }
  };
  function VC(t, n) {
    return t = E(t), db(t, n), !1;
  }
  function db(t, n) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(n);
  }
  function mb(t, n) {
    var s = n._eventListeners;
    if (s !== null)
      for (var l = 0; l < s.length; l++) {
        var u = s[l];
        t.addEventListener(
          u.type,
          u.attachedListener,
          io(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (s = n._observers, s !== null && s.forEach(function(h) {
      for (var y = 0, x = 0; x < Ln.length; x++) {
        var T = Ln[x];
        (T.fragmentInstance !== n || T.observer !== h || T.instance !== t) && (Ln[y++] = T);
      }
      Ln.length = y, h.observe(t);
    }), db(t, n));
  }
  function kC(t, n) {
    var s = n._eventListeners;
    if (s !== null)
      for (var l = 0; l < s.length; l++) {
        var u = s[l];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          io(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (s = n._observers, s !== null && s.forEach(function(h) {
      typeof h.rootMargin == "string" ? OC(
        n,
        h,
        t
      ) : h.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(n));
  }
  function Fh(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var s = n;
      switch (n = n.nextSibling, s.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Fh(s), cr(s);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (s.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(s);
    }
  }
  function NC(t, n, s, l) {
    for (; t.nodeType === 1; ) {
      var u = s;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[jo])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (h = t.getAttribute("rel"), h === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (h !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (h = t.getAttribute("src"), (h !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && h && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var h = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === h)
          return t;
      } else return t;
      if (t = Tn(t.nextSibling), t === null) break;
    }
    return null;
  }
  function LC(t, n, s) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !s || (t = Tn(t.nextSibling), t === null)) return null;
    return t;
  }
  function pb(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Tn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Kh(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ih(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function BC(t, n) {
    var s = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || s.readyState !== "loading")
      n();
    else {
      var l = function() {
        n(), s.removeEventListener("DOMContentLoaded", l);
      };
      s.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function Tn(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var Jh = null;
  function yb(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var s = t.data;
        if (s === "/$" || s === "/&") {
          if (n === 0)
            return Tn(t.nextSibling);
          n--;
        } else
          s !== "$" && s !== "$!" && s !== "$?" && s !== "$~" && s !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function gb(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var s = t.data;
        if (s === "$" || s === "$!" || s === "$?" || s === "$~" || s === "&") {
          if (n === 0) return t;
          n--;
        } else s !== "/$" && s !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function UC(t, n) {
    function s() {
      l = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var l = !1;
    try {
      t.ownerDocument.addEventListener("focus", s, !0), (t.focus || HTMLElement.prototype.focus).call(t, n);
    } finally {
      t.ownerDocument.removeEventListener("focus", s, !0);
    }
    return l;
  }
  function HC(t) {
    ib(function() {
      ib(function(n) {
        return t(n);
      });
    });
  }
  function vb(t, n, s) {
    switch (n = wl(s), t) {
      case "html":
        if (t = n.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = n.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = n.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function bb(t, n, s) {
    for (var l in s) {
      var u = s[l];
      s.hasOwnProperty(l) && u != null && Ut(t, n, l, null, mC, u);
    }
    s.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === In && (t.onclick = null), cr(t);
  }
  function $h(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    cr(t);
  }
  var En = /* @__PURE__ */ new Map(), xb = /* @__PURE__ */ new Set();
  function Tl(t) {
    if (typeof t.getRootNode == "function") {
      var n = t.getRootNode();
      if (n.nodeType === 9 || n.nodeType === 11) return n;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Di = ct.d;
  ct.d = {
    f: jC,
    r: qC,
    D: PC,
    C: GC,
    L: YC,
    m: XC,
    X: ZC,
    S: QC,
    M: FC
  };
  function jC() {
    var t = Di.f(), n = du();
    return t || n;
  }
  function qC(t) {
    var n = wa(t);
    n !== null && n.tag === 5 && n.type === "form" ? wg(n) : Di.r(t);
  }
  var so = typeof document > "u" ? null : document;
  function Sb(t, n, s) {
    var l = so;
    if (l && typeof n == "string" && n) {
      var u = yn(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof s == "string" && (u += '[crossorigin="' + s + '"]'), xb.has(u) || (xb.add(u), t = { rel: t, crossOrigin: s, href: n }, l.querySelector(u) === null && (n = l.createElement("link"), Ee(n, "link", t), de(n), l.head.appendChild(n)));
    }
  }
  function PC(t) {
    Di.D(t), Sb("dns-prefetch", t, null);
  }
  function GC(t, n) {
    Di.C(t, n), Sb("preconnect", t, n);
  }
  function YC(t, n, s) {
    Di.L(t, n, s);
    var l = so;
    if (l && t && n) {
      var u = 'link[rel="preload"][as="' + yn(n) + '"]';
      n === "image" && s && s.imageSrcSet ? (u += '[imagesrcset="' + yn(
        s.imageSrcSet
      ) + '"]', typeof s.imageSizes == "string" && (u += '[imagesizes="' + yn(
        s.imageSizes
      ) + '"]')) : u += '[href="' + yn(t) + '"]';
      var h = u;
      switch (n) {
        case "style":
          h = ao(t);
          break;
        case "script":
          h = oo(t);
      }
      if (!(En.has(h) || (t = Y(
        {
          rel: "preload",
          href: n === "image" && s && s.imageSrcSet ? void 0 : t,
          as: n
        },
        s
      ), En.set(h, t), l.querySelector(u) !== null || n === "style" && l.querySelector(El(h)) || n === "script" && l.querySelector(Cl(h))))) {
        var y = l.createElement("link");
        Ee(y, "link", t), n === "style" && (y[ur] = !0, y.onload = y.onerror = function() {
          kp(y);
        }), de(y), l.head.appendChild(y);
      }
    }
  }
  function XC(t, n) {
    Di.m(t, n);
    var s = so;
    if (s && t) {
      var l = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + yn(l) + '"][href="' + yn(t) + '"]', h = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = oo(t);
      }
      if (!En.has(h) && (t = Y({ rel: "modulepreload", href: t }, n), En.set(h, t), s.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (s.querySelector(Cl(h)))
              return;
        }
        l = s.createElement("link"), Ee(l, "link", t), de(l), s.head.appendChild(l);
      }
    }
  }
  function QC(t, n, s) {
    Di.S(t, n, s);
    var l = so;
    if (l && t) {
      var u = Ta(l).hoistableStyles, h = ao(t);
      n = n || "default";
      var y = u.get(h);
      if (!y) {
        var x = { loading: 0, preload: null };
        if (y = l.querySelector(
          El(h)
        ))
          x.loading = 5;
        else {
          t = Y(
            { rel: "stylesheet", href: t, "data-precedence": n },
            s
          ), (s = En.get(h)) && Wh(t, s);
          var T = y = l.createElement("link");
          de(T), Ee(T, "link", t), T._p = new Promise(function(O, N) {
            T.onload = O, T.onerror = N;
          }), T.addEventListener("load", function() {
            x.loading |= 1;
          }), T.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, xu(y, n, l);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: x
        }, u.set(h, y);
      }
    }
  }
  function ZC(t, n) {
    Di.X(t, n);
    var s = so;
    if (s && t) {
      var l = Ta(s).hoistableScripts, u = oo(t), h = l.get(u);
      h || (h = s.querySelector(Cl(u)), h || (t = Y({ src: t, async: !0 }, n), (n = En.get(u)) && td(t, n), h = s.createElement("script"), de(h), Ee(h, "link", t), s.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(u, h));
    }
  }
  function FC(t, n) {
    Di.M(t, n);
    var s = so;
    if (s && t) {
      var l = Ta(s).hoistableScripts, u = oo(t), h = l.get(u);
      h || (h = s.querySelector(Cl(u)), h || (t = Y({ src: t, async: !0, type: "module" }, n), (n = En.get(u)) && td(t, n), h = s.createElement("script"), de(h), Ee(h, "link", t), s.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(u, h));
    }
  }
  function wb(t, n, s, l) {
    var u = (u = Ui.current) ? Tl(u) : null;
    if (!u) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof s.precedence == "string" && typeof s.href == "string" ? (s = ao(s.href), n = Ta(
          u
        ).hoistableStyles, l = n.get(s), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(s, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (s.rel === "stylesheet" && typeof s.href == "string" && typeof s.precedence == "string") {
          t = ao(s.href);
          var h = Ta(
            u
          ).hoistableStyles, y = h.get(t);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, y), (h = u.querySelector(
            El(t)
          )) ? h._p || (y.instance = h, y.state.loading = 5) : (h = En.get(t), h || (h = {
            rel: "preload",
            as: "style",
            href: s.href,
            crossOrigin: s.crossOrigin,
            integrity: s.integrity,
            media: s.media,
            hrefLang: s.hrefLang,
            referrerPolicy: s.referrerPolicy
          }, En.set(t, h)), KC(
            u,
            t,
            h,
            y.state
          ))), n && l === null)
            throw Error(o(528, ""));
          return y;
        }
        if (n && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return n = s.async, s = s.src, typeof s == "string" && n && typeof n != "function" && typeof n != "symbol" ? (s = oo(s), n = Ta(
          u
        ).hoistableScripts, l = n.get(s), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(s, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function ao(t) {
    return 'href="' + yn(t) + '"';
  }
  function El(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Tb(t) {
    return Y({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function KC(t, n, s, l) {
    if (n = t.querySelector(
      'link[rel="preload"][as="style"][' + n + "]"
    )) {
      if (n[ur] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      n = t.createElement("link"), n[ur] = !0, n.onload = n.onerror = kp.bind(null, n), Ee(n, "link", s), de(n), t.head.appendChild(n);
    l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function oo(t) {
    return '[src="' + yn(t) + '"]';
  }
  function Cl(t) {
    return "script[async]" + t;
  }
  function Eb(t, n, s) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + yn(s.href) + '"]'
          );
          if (l)
            return n.instance = l, de(l), l;
          var u = Y({}, s, {
            "data-href": s.href,
            "data-precedence": s.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), de(l), Ee(l, "style", u), xu(l, s.precedence, t), n.instance = l;
        case "stylesheet":
          u = ao(s.href);
          var h = t.querySelector(
            El(u)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, de(h), h;
          l = Tb(s), (u = En.get(u)) && Wh(l, u), h = (t.ownerDocument || t).createElement("link"), de(h);
          var y = h;
          return y._p = new Promise(function(x, T) {
            y.onload = x, y.onerror = T;
          }), Ee(h, "link", l), n.state.loading |= 4, xu(h, s.precedence, t), n.instance = h;
        case "script":
          return h = oo(s.src), (u = t.querySelector(
            Cl(h)
          )) ? (n.instance = u, de(u), u) : (l = s, (u = En.get(h)) && (l = Y({}, s), td(l, u)), t = t.ownerDocument || t, u = t.createElement("script"), de(u), Ee(u, "link", l), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, xu(l, s.precedence, t));
    return n.instance;
  }
  function xu(t, n, s) {
    for (var l = s.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, h = u, y = 0; y < l.length; y++) {
      var x = l[y];
      if (x.dataset.precedence === n) h = x;
      else if (h !== u) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = s.nodeType === 9 ? s.head : s, n.insertBefore(t, n.firstChild));
  }
  function Wh(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function td(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var Su = null;
  function Cb(t, n, s) {
    if (Su === null) {
      var l = /* @__PURE__ */ new Map(), u = Su = /* @__PURE__ */ new Map();
      u.set(s, l);
    } else
      u = Su, l = u.get(s), l || (l = /* @__PURE__ */ new Map(), u.set(s, l));
    if (l.has(t)) return l;
    for (l.set(t, null), s = s.getElementsByTagName(t), u = 0; u < s.length; u++) {
      var h = s[u];
      if (!(h[jo] || h[be] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = h.getAttribute(n) || "";
        y = t + y;
        var x = l.get(y);
        x ? x.push(h) : l.set(y, [h]);
      }
    }
    return l;
  }
  function ed(t, n, s) {
    t = t.ownerDocument || t, t.head.insertBefore(
      s,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function IC(t, n, s) {
    if (s === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return t = n.disabled, typeof n.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function _b(t, n) {
    return t === "img" && n.src != null && n.src !== "" && n.onLoad == null && n.loading !== "lazy";
  }
  function Mb(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function zb(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Ab(t, n) {
    typeof n.decode == "function" && (t.imgCount++, n.complete || (t.imgBytes += zb(n), t.suspenseyImages.push(n)), t = WC.bind(t), n.decode().then(t, t));
  }
  function JC(t, n, s, l) {
    if (s.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (s.state.loading & 4) === 0) {
      if (s.instance === null) {
        var u = ao(l.href), h = n.querySelector(
          El(u)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = _l.bind(t), n.then(t, t)), s.state.loading |= 4, s.instance = h, de(h);
          return;
        }
        h = n.ownerDocument || n, l = Tb(l), (u = En.get(u)) && Wh(l, u), h = h.createElement("link"), de(h);
        var y = h;
        y._p = new Promise(function(x, T) {
          y.onload = x, y.onerror = T;
        }), Ee(h, "link", l), s.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(s, n), (n = s.state.preload) && (s.state.loading & 3) === 0 && (t.count++, s = _l.bind(t), n.addEventListener("load", s), n.addEventListener("error", s));
    }
  }
  var wu = 0;
  function $C(t, n) {
    return t.stylesheets && t.count === 0 && Eu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(s) {
      var l = setTimeout(function() {
        if (t.stylesheets && Eu(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && wu === 0 && (wu = 62500 * yC());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Eu(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > wu ? 50 : 800) + n
      );
      return t.unsuspend = s, function() {
        t.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function Ob(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Eu(t, t.stylesheets);
      else if (t.unsuspend) {
        var n = t.unsuspend;
        t.unsuspend = null, n();
      }
    }
  }
  function _l() {
    this.count--, Ob(this);
  }
  function WC() {
    this.imgCount--, Ob(this);
  }
  var Tu = null;
  function Eu(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Tu = /* @__PURE__ */ new Map(), n.forEach(t_, t), Tu = null, _l.call(t));
  }
  function t_(t, n) {
    if (!(n.state.loading & 4)) {
      var s = Tu.get(t);
      if (s) var l = s.get(null);
      else {
        s = /* @__PURE__ */ new Map(), Tu.set(t, s);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < u.length; h++) {
          var y = u[h];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (s.set(y.dataset.precedence, y), l = y);
        }
        l && s.set(null, l);
      }
      u = n.instance, y = u.getAttribute("data-precedence"), h = s.get(y) || l, h === l && s.set(null, u), s.set(y, u), this.count++, l = _l.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), h ? h.parentNode.insertBefore(u, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var lo = {
    $$typeof: zt,
    Provider: null,
    Consumer: null,
    _currentValue: We,
    _currentValue2: We,
    _threadCount: 0
  };
  function e_(t, n, s, l, u, h, y, x, T) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = kc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = kc(0), this.hiddenUpdates = kc(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = h, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = T, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Db(t, n, s, l, u, h, y, x, T, O, N, j) {
    return t = new e_(
      t,
      n,
      s,
      y,
      T,
      O,
      N,
      j,
      x
    ), n = 1, h === !0 && (n |= 24), h = Qe(3, null, null, n), t.current = h, h.stateNode = t, n = yf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: s,
      cache: n
    }, xf(h), t;
  }
  function Rb(t) {
    return t ? (t = Va, t) : Va;
  }
  function Vb(t, n, s, l, u, h) {
    u = Rb(u), l.context === null ? l.context = u : l.pendingContext = u, l = Ki(n), l.payload = { element: s }, h = h === void 0 ? null : h, h !== null && (l.callback = h), s = Ii(t, l, n), s !== null && (Ie(s, t, n), il(s, t, n));
  }
  function kb(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var s = t.retryLane;
      t.retryLane = s !== 0 && s < n ? s : n;
    }
  }
  function nd(t, n) {
    kb(t, n), (t = t.alternate) && kb(t, n);
  }
  function Nb(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Ds(t, 67108864);
      n !== null && Ie(n, t, 67108864), nd(t, 67108864);
    }
  }
  function Lb(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = cn();
      n = Nc(n);
      var s = Ds(t, n);
      s !== null && Ie(s, t, n), nd(t, n);
    }
  }
  var ro = !0;
  function n_(t, n, s, l) {
    var u = et.T;
    et.T = null;
    var h = ct.p;
    try {
      ct.p = 2, id(t, n, s, l);
    } finally {
      ct.p = h, et.T = u;
    }
  }
  function i_(t, n, s, l) {
    var u = et.T;
    et.T = null;
    var h = ct.p;
    try {
      ct.p = 8, id(t, n, s, l);
    } finally {
      ct.p = h, et.T = u;
    }
  }
  function id(t, n, s, l) {
    if (ro) {
      var u = sd(l);
      if (u === null)
        Uh(
          t,
          n,
          l,
          Cu,
          s
        ), Ub(t, l);
      else if (a_(
        u,
        t,
        n,
        s,
        l
      ))
        l.stopPropagation();
      else if (Ub(t, l), n & 4 && -1 < s_.indexOf(t)) {
        for (; u !== null; ) {
          var h = wa(u);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var y = _s(h.pendingLanes);
                  if (y !== 0) {
                    var x = h;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
                      var T = 1 << 31 - nn(y);
                      x.entanglements[1] |= T, y &= ~T;
                    }
                    oi(h), (Vt & 6) === 0 && (cu = tn() + 500, bl(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = Ds(h, 2), x !== null && Ie(x, h, 2), du(), nd(h, 2);
            }
          if (h = sd(l), h === null && Uh(
            t,
            n,
            l,
            Cu,
            s
          ), h === u) break;
          u = h;
        }
        u !== null && l.stopPropagation();
      } else
        Uh(
          t,
          n,
          l,
          null,
          s
        );
    }
  }
  function sd(t) {
    return t = Pc(t), ad(t);
  }
  var Cu = null;
  function ad(t) {
    if (Cu = null, t = Ms(t), t !== null) {
      var n = c(t);
      if (n === null) t = null;
      else {
        var s = n.tag;
        if (s === 13) {
          if (t = f(n), t !== null) return t;
          t = null;
        } else if (s === 31) {
          if (t = d(n), t !== null) return t;
          t = null;
        } else if (s === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return Cu = t, null;
  }
  function Bb(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (yT()) {
          case wp:
            return 2;
          case Tp:
            return 8;
          case sr:
          case gT:
            return 32;
          case Ep:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var od = !1, rs = null, us = null, cs = null, Ml = /* @__PURE__ */ new Map(), zl = /* @__PURE__ */ new Map(), fs = [], s_ = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Ub(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        rs = null;
        break;
      case "dragenter":
      case "dragleave":
        us = null;
        break;
      case "mouseover":
      case "mouseout":
        cs = null;
        break;
      case "pointerover":
      case "pointerout":
        Ml.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zl.delete(n.pointerId);
    }
  }
  function Al(t, n, s, l, u, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: s,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [u]
    }, n !== null && (n = wa(n), n !== null && Nb(n)), t) : (t.eventSystemFlags |= l, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function a_(t, n, s, l, u) {
    switch (n) {
      case "focusin":
        return rs = Al(
          rs,
          t,
          n,
          s,
          l,
          u
        ), !0;
      case "dragenter":
        return us = Al(
          us,
          t,
          n,
          s,
          l,
          u
        ), !0;
      case "mouseover":
        return cs = Al(
          cs,
          t,
          n,
          s,
          l,
          u
        ), !0;
      case "pointerover":
        var h = u.pointerId;
        return Ml.set(
          h,
          Al(
            Ml.get(h) || null,
            t,
            n,
            s,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return h = u.pointerId, zl.set(
          h,
          Al(
            zl.get(h) || null,
            t,
            n,
            s,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Hb(t) {
    var n = Ms(t.target);
    if (n !== null) {
      var s = c(n);
      if (s !== null) {
        if (n = s.tag, n === 13) {
          if (n = f(s), n !== null) {
            t.blockedOn = n, Dp(t.priority, function() {
              Lb(s);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(s), n !== null) {
            t.blockedOn = n, Dp(t.priority, function() {
              Lb(s);
            });
            return;
          }
        } else if (n === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function _u(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var s = sd(t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var l = new s.constructor(
          s.type,
          s
        );
        qc = l, s.target.dispatchEvent(l), qc = null;
      } else
        return n = wa(s), n !== null && Nb(n), t.blockedOn = s, !1;
      n.shift();
    }
    return !0;
  }
  function jb(t, n, s) {
    _u(t) && s.delete(n);
  }
  function o_() {
    od = !1, rs !== null && _u(rs) && (rs = null), us !== null && _u(us) && (us = null), cs !== null && _u(cs) && (cs = null), Ml.forEach(jb), zl.forEach(jb);
  }
  function Mu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, od || (od = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      o_
    )));
  }
  var zu = null;
  function qb(t) {
    zu !== t && (zu = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        zu === t && (zu = null);
        for (var n = 0; n < t.length; n += 3) {
          var s = t[n], l = t[n + 1], u = t[n + 2];
          if (typeof l != "function") {
            if (ad(l || s) === null)
              continue;
            break;
          }
          var h = wa(s);
          h !== null && (t.splice(n, 3), n -= 3, qf(
            h,
            {
              pending: !0,
              data: u,
              method: s.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function uo(t) {
    function n(T) {
      return Mu(T, t);
    }
    rs !== null && Mu(rs, t), us !== null && Mu(us, t), cs !== null && Mu(cs, t), Ml.forEach(n), zl.forEach(n);
    for (var s = 0; s < fs.length; s++) {
      var l = fs[s];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < fs.length && (s = fs[0], s.blockedOn === null); )
      Hb(s), s.blockedOn === null && fs.shift();
    if (s = (t.ownerDocument || t).$$reactFormReplay, s != null)
      for (l = 0; l < s.length; l += 3) {
        var u = s[l], h = s[l + 1], y = u[Xe] || null;
        if (typeof h == "function")
          y || qb(s);
        else if (y) {
          var x = null;
          if (h && h.hasAttribute("formAction")) {
            if (u = h, y = h[Xe] || null)
              x = y.formAction;
            else if (ad(u) !== null) continue;
          } else x = y.action;
          typeof x == "function" ? s[l + 1] = x : (s.splice(l, 3), l -= 3), qb(s);
        }
      }
  }
  function Pb() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(y) {
            return u = y;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      u !== null && (u(), u = null), l || setTimeout(s, 20);
    }
    function s() {
      if (!l && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(s, 100), function() {
        l = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), u !== null && (u(), u = null);
      };
    }
  }
  function ld(t) {
    this._internalRoot = t;
  }
  Au.prototype.render = ld.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    var s = n.current, l = cn();
    Vb(s, l, t, n, null, null);
  }, Au.prototype.unmount = ld.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Vb(t.current, 2, null, t, null, null), du(), n[Sa] = null;
    }
  };
  function Au(t) {
    this._internalRoot = t;
  }
  Au.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Op();
      t = { blockedOn: null, target: t, priority: n };
      for (var s = 0; s < fs.length && n !== 0 && n < fs[s].priority; s++) ;
      fs.splice(s, 0, t), s === 0 && Hb(t);
    }
  };
  var Gb = e.version;
  if (Gb !== "19.3.0")
    throw Error(
      o(
        527,
        Gb,
        "19.3.0"
      )
    );
  ct.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = p(n), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var l_ = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: et,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ou = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ou.isDisabled && Ou.supportsFiber)
      try {
        Bo = Ou.inject(
          l_
        ), en = Ou;
      } catch {
      }
  }
  return Dl.createRoot = function(t, n) {
    if (!r(t)) throw Error(o(299));
    var s = !1, l = "", u = Rg, h = Vg, y = kg;
    return n != null && (n.unstable_strictMode === !0 && (s = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError)), n = Db(
      t,
      1,
      !1,
      null,
      null,
      s,
      l,
      null,
      u,
      h,
      y,
      Pb
    ), t[Sa] = n.current, Bh(t), new ld(n);
  }, Dl.hydrateRoot = function(t, n, s) {
    if (!r(t)) throw Error(o(299));
    var l = !1, u = "", h = Rg, y = Vg, x = kg, T = null;
    return s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (u = s.identifierPrefix), s.onUncaughtError !== void 0 && (h = s.onUncaughtError), s.onCaughtError !== void 0 && (y = s.onCaughtError), s.onRecoverableError !== void 0 && (x = s.onRecoverableError), s.formState !== void 0 && (T = s.formState)), n = Db(
      t,
      1,
      !0,
      n,
      s ?? null,
      l,
      u,
      T,
      h,
      y,
      x,
      Pb
    ), n.context = Rb(null), s = n.current, l = cn(), l = Nc(l), u = Ki(l), u.callback = null, Ii(s, u, l), s = l, n.current.lanes = s, Ho(n, s), oi(n), t[Sa] = n.current, Bh(t), new Au(n);
  }, Dl.version = "19.3.0", Dl;
}
var Wb;
function g_() {
  if (Wb) return ud.exports;
  Wb = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (e) {
        console.error(e);
      }
  }
  return i(), ud.exports = y_(), ud.exports;
}
var _S = g_(), ht = Vm();
const MS = ht.createContext({});
function zS(i) {
  const e = ht.useRef(null);
  return e.current === null && (e.current = i()), e.current;
}
const v_ = typeof window < "u", AS = v_ ? ht.useLayoutEffect : ht.useEffect, km = /* @__PURE__ */ ht.createContext(null);
function Nm(i, e) {
  i.indexOf(e) === -1 && i.push(e);
}
function nc(i, e) {
  const a = i.indexOf(e);
  a > -1 && i.splice(a, 1);
}
const di = (i, e, a) => a > e ? e : a < i ? i : a;
function t0(i, e) {
  return e ? `${i}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}` : i;
}
let Kl = () => {
}, mi = () => {
};
var CS;
typeof process < "u" && ((CS = process.env) == null ? void 0 : CS.NODE_ENV) !== "production" && (Kl = (i, e, a) => {
  !i && typeof console < "u" && console.warn(t0(e, a));
}, mi = (i, e, a) => {
  if (!i)
    throw new Error(t0(e, a));
});
const xs = {}, OS = (i) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(i), DS = (i) => typeof i == "object" && i !== null, RS = (i) => /^0[^.\s]+$/u.test(i);
// @__NO_SIDE_EFFECTS__
function VS(i) {
  let e;
  return () => (e === void 0 && (e = i()), e);
}
const zn = /* @__NO_SIDE_EFFECTS__ */ (i) => i, Il = (...i) => i.reduce((e, a) => (o) => a(e(o))), ql = /* @__NO_SIDE_EFFECTS__ */ (i, e, a) => {
  const o = e - i;
  return o ? (a - i) / o : 1;
};
class Lm {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Nm(this.subscriptions, e), () => nc(this.subscriptions, e);
  }
  notify(e, a, o) {
    const r = this.subscriptions.length;
    if (r)
      if (r === 1)
        this.subscriptions[0](e, a, o);
      else
        for (let c = 0; c < r; c++) {
          const f = this.subscriptions[c];
          f && f(e, a, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const $e = /* @__NO_SIDE_EFFECTS__ */ (i) => i * 1e3, _n = /* @__NO_SIDE_EFFECTS__ */ (i) => i / 1e3, kS = /* @__NO_SIDE_EFFECTS__ */ (i, e) => e ? i * (1e3 / e) : 0, NS = (i, e, a) => (((1 - 3 * a + 3 * e) * i + (3 * a - 6 * e)) * i + 3 * e) * i, b_ = 1e-7, x_ = 12;
function S_(i, e, a, o, r) {
  let c, f, d = 0;
  do
    f = e + (a - e) / 2, c = NS(f, o, r) - i, c > 0 ? a = f : e = f;
  while (Math.abs(c) > b_ && ++d < x_);
  return f;
}
// @__NO_SIDE_EFFECTS__
function Jl(i, e, a, o) {
  if (i === e && a === o)
    return zn;
  const r = (c) => S_(c, 0, 1, i, a);
  return (c) => c === 0 || c === 1 ? c : NS(r(c), e, o);
}
const LS = /* @__NO_SIDE_EFFECTS__ */ (i) => (e) => e <= 0.5 ? i(2 * e) / 2 : (2 - i(2 * (1 - e))) / 2, BS = /* @__NO_SIDE_EFFECTS__ */ (i) => (e) => 1 - i(1 - e), US = /* @__PURE__ */ Jl(0.33, 1.53, 0.69, 0.99), Bm = /* @__PURE__ */ BS(US), HS = /* @__PURE__ */ LS(Bm), jS = (i) => i >= 1 ? 1 : (i *= 2) < 1 ? 0.5 * Bm(i) : 0.5 * (2 - Math.pow(2, -10 * (i - 1))), Um = (i) => 1 - Math.sin(Math.acos(i)), qS = /* @__PURE__ */ BS(Um), PS = /* @__PURE__ */ LS(Um), w_ = /* @__PURE__ */ Jl(0.42, 0, 1, 1), T_ = /* @__PURE__ */ Jl(0, 0, 0.58, 1), GS = /* @__PURE__ */ Jl(0.42, 0, 0.58, 1), E_ = /* @__NO_SIDE_EFFECTS__ */ (i) => Array.isArray(i) && typeof i[0] != "number", YS = /* @__NO_SIDE_EFFECTS__ */ (i) => Array.isArray(i) && typeof i[0] == "number", e0 = {
  linear: zn,
  easeIn: w_,
  easeInOut: GS,
  easeOut: T_,
  circIn: Um,
  circInOut: PS,
  circOut: qS,
  backIn: Bm,
  backInOut: HS,
  backOut: US,
  anticipate: jS
}, C_ = (i) => typeof i == "string", n0 = (i) => {
  if (/* @__PURE__ */ YS(i)) {
    mi(i.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [e, a, o, r] = i;
    return /* @__PURE__ */ Jl(e, a, o, r);
  } else if (C_(i))
    return mi(e0[i] !== void 0, `Invalid easing type '${i}'`, "invalid-easing-type"), e0[i];
  return i;
}, Du = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function __(i) {
  let e = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = !1, r = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let f = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function d(p) {
    c.has(p) && (m.schedule(p), i()), p(f);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (p, v = !1, g = !1) => {
      const S = g && o ? e : a;
      return v && c.add(p), S.add(p), p;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (p) => {
      a.delete(p), c.delete(p);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (p) => {
      if (f = p, o) {
        r = !0;
        return;
      }
      o = !0;
      const v = e;
      e = a, a = v, e.forEach(d), e.clear(), o = !1, r && (r = !1, m.process(p));
    }
  };
  return m;
}
const M_ = 40;
function XS(i, e) {
  let a = !1, o = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => a = !0, f = Du.reduce((U, L) => (U[L] = __(c), U), {}), { setup: d, read: m, resolveKeyframes: p, preUpdate: v, update: g, preRender: b, render: S, postRender: w } = f, C = () => {
    const U = xs.useManualTiming, L = U ? r.timestamp : performance.now();
    a = !1, U || (r.delta = o ? 1e3 / 60 : Math.max(Math.min(L - r.timestamp, M_), 1)), r.timestamp = L, r.isProcessing = !0, d.process(r), m.process(r), p.process(r), v.process(r), g.process(r), b.process(r), S.process(r), w.process(r), r.isProcessing = !1, a && e && (o = !1, i(C));
  }, E = () => {
    a = !0, o = !0, r.isProcessing || i(C);
  };
  return { schedule: Du.reduce((U, L) => {
    const P = f[L];
    return U[L] = (J, Y = !1, B = !1) => (a || E(), P.schedule(J, Y, B)), U;
  }, {}), cancel: (U) => {
    for (let L = 0; L < Du.length; L++)
      f[Du[L]].cancel(U);
  }, state: r, steps: f };
}
const { schedule: Gt, cancel: Ss, state: _e, steps: md } = /* @__PURE__ */ XS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : zn, !0);
let Qu;
function z_() {
  Qu = void 0;
}
const qe = {
  now: () => (Qu === void 0 && qe.set(_e.isProcessing || xs.useManualTiming ? _e.timestamp : performance.now()), Qu),
  set: (i) => {
    Qu = i, queueMicrotask(z_);
  }
}, QS = (i) => (e) => typeof e == "string" && e.startsWith(i), ZS = /* @__PURE__ */ QS("--"), A_ = /* @__PURE__ */ QS("var(--"), Hm = (i) => A_(i) ? O_.test(i.split("/*")[0].trim()) : !1, O_ = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function i0(i) {
  return typeof i != "string" ? !1 : i.split("/*")[0].includes("var(--");
}
const Vo = {
  test: (i) => typeof i == "number",
  parse: parseFloat,
  transform: (i) => i
}, Pl = {
  ...Vo,
  transform: (i) => di(0, 1, i)
}, Ru = {
  ...Vo,
  default: 1
}, Ll = (i) => Math.round(i * 1e5) / 1e5, jm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function D_(i) {
  return i == null;
}
const R_ = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, qm = (i, e) => (a) => !!(typeof a == "string" && R_.test(a) && a.startsWith(i) || e && !D_(a) && Object.prototype.hasOwnProperty.call(a, e)), FS = (i, e, a) => (o) => {
  if (typeof o != "string")
    return o;
  const [r, c, f, d] = o.match(jm);
  return {
    [i]: parseFloat(r),
    [e]: parseFloat(c),
    [a]: parseFloat(f),
    alpha: d !== void 0 ? parseFloat(d) : 1
  };
}, V_ = (i) => di(0, 255, i), pd = {
  ...Vo,
  transform: (i) => Math.round(V_(i))
}, sa = {
  test: /* @__PURE__ */ qm("rgb", "red"),
  parse: /* @__PURE__ */ FS("red", "green", "blue"),
  transform: ({ red: i, green: e, blue: a, alpha: o = 1 }) => "rgba(" + pd.transform(i) + ", " + pd.transform(e) + ", " + pd.transform(a) + ", " + Ll(Pl.transform(o)) + ")"
};
function k_(i) {
  let e = "", a = "", o = "", r = "";
  return i.length > 5 ? (e = i.substring(1, 3), a = i.substring(3, 5), o = i.substring(5, 7), r = i.substring(7, 9)) : (e = i.substring(1, 2), a = i.substring(2, 3), o = i.substring(3, 4), r = i.substring(4, 5), e += e, a += a, o += o, r += r), {
    red: parseInt(e, 16),
    green: parseInt(a, 16),
    blue: parseInt(o, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Kd = {
  test: /* @__PURE__ */ qm("#"),
  parse: k_,
  transform: sa.transform
}, $l = /* @__NO_SIDE_EFFECTS__ */ (i) => ({
  test: (e) => typeof e == "string" && e.endsWith(i) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${i}`
}), Vi = /* @__PURE__ */ $l("deg"), hi = /* @__PURE__ */ $l("%"), it = /* @__PURE__ */ $l("px"), N_ = /* @__PURE__ */ $l("vh"), L_ = /* @__PURE__ */ $l("vw"), s0 = {
  ...hi,
  parse: (i) => hi.parse(i) / 100,
  transform: (i) => hi.transform(i * 100)
}, po = {
  test: /* @__PURE__ */ qm("hsl", "hue"),
  parse: /* @__PURE__ */ FS("hue", "saturation", "lightness"),
  transform: ({ hue: i, saturation: e, lightness: a, alpha: o = 1 }) => "hsla(" + Math.round(i) + ", " + hi.transform(Ll(e)) + ", " + hi.transform(Ll(a)) + ", " + Ll(Pl.transform(o)) + ")"
}, oe = {
  test: (i) => sa.test(i) || Kd.test(i) || po.test(i),
  parse: (i) => sa.test(i) ? sa.parse(i) : po.test(i) ? po.parse(i) : Kd.parse(i),
  transform: (i) => typeof i == "string" ? i : i.hasOwnProperty("red") ? sa.transform(i) : po.transform(i),
  getAnimatableNone: (i) => {
    const e = oe.parse(i);
    return e.alpha = 0, oe.transform(e);
  }
}, B_ = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function U_(i) {
  var e, a;
  return isNaN(i) && typeof i == "string" && (((e = i.match(jm)) == null ? void 0 : e.length) || 0) + (((a = i.match(B_)) == null ? void 0 : a.length) || 0) > 0;
}
const KS = "number", IS = "color", H_ = "var", j_ = "var(", a0 = "${}", q_ = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function _o(i) {
  const e = i.toString(), a = [], o = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const d = e.replace(q_, (m) => (oe.test(m) ? (o.color.push(c), r.push(IS), a.push(oe.parse(m))) : m.startsWith(j_) ? (o.var.push(c), r.push(H_), a.push(m)) : (o.number.push(c), r.push(KS), a.push(parseFloat(m))), ++c, a0)).split(a0);
  return { values: a, split: d, indexes: o, types: r };
}
function P_(i) {
  return _o(i).values;
}
function JS({ split: i, types: e }) {
  const a = i.length;
  return (o) => {
    let r = "";
    for (let c = 0; c < a; c++)
      if (r += i[c], o[c] !== void 0) {
        const f = e[c];
        f === KS ? r += Ll(o[c]) : f === IS ? r += oe.transform(o[c]) : r += o[c];
      }
    return r;
  };
}
function G_(i) {
  return JS(_o(i));
}
const Y_ = (i) => typeof i == "number" ? 0 : oe.test(i) ? oe.getAnimatableNone(i) : i, X_ = (i, e) => typeof i == "number" ? e != null && e.trim().endsWith("/") ? i : 0 : Y_(i);
function Q_(i) {
  const e = _o(i);
  return JS(e)(e.values.map((o, r) => X_(o, e.split[r])));
}
const Pn = {
  test: U_,
  parse: P_,
  createTransformer: G_,
  getAnimatableNone: Q_
};
function yd(i, e, a) {
  return a < 0 && (a += 1), a > 1 && (a -= 1), a < 1 / 6 ? i + (e - i) * 6 * a : a < 1 / 2 ? e : a < 2 / 3 ? i + (e - i) * (2 / 3 - a) * 6 : i;
}
function Z_({ hue: i, saturation: e, lightness: a, alpha: o }) {
  i /= 360, e /= 100, a /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = a;
  else {
    const d = a < 0.5 ? a * (1 + e) : a + e - a * e, m = 2 * a - d;
    r = yd(m, d, i + 1 / 3), c = yd(m, d, i), f = yd(m, d, i - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: o
  };
}
function ic(i, e) {
  return (a) => a > 0 ? e : i;
}
const Pt = (i, e, a) => i + (e - i) * a, gd = (i, e, a) => {
  const o = i * i, r = a * (e * e - o) + o;
  return r < 0 ? 0 : Math.sqrt(r);
}, F_ = [Kd, sa, po], K_ = (i) => F_.find((e) => e.test(i));
function o0(i) {
  const e = K_(i);
  if (Kl(!!e, `'${i}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !e)
    return !1;
  let a = e.parse(i);
  return e === po && (a = Z_(a)), a;
}
const l0 = (i, e) => {
  const a = o0(i), o = o0(e);
  if (!a || !o)
    return ic(i, e);
  const r = { ...a };
  return (c) => (r.red = gd(a.red, o.red, c), r.green = gd(a.green, o.green, c), r.blue = gd(a.blue, o.blue, c), r.alpha = Pt(a.alpha, o.alpha, c), sa.transform(r));
}, Id = /* @__PURE__ */ new Set(["none", "hidden"]);
function I_(i, e) {
  return Id.has(i) ? (a) => a <= 0 ? i : e : (a) => a >= 1 ? e : i;
}
function J_(i, e) {
  return (a) => Pt(i, e, a);
}
function Pm(i) {
  return typeof i == "number" ? J_ : typeof i == "string" ? Hm(i) ? ic : oe.test(i) ? l0 : tM : Array.isArray(i) ? $S : typeof i == "object" ? oe.test(i) ? l0 : $_ : ic;
}
function $S(i, e) {
  const a = [...i], o = a.length, r = i.map((c, f) => Pm(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < o; f++)
      a[f] = r[f](c);
    return a;
  };
}
function $_(i, e) {
  const a = { ...i, ...e }, o = {};
  for (const r in a)
    i[r] !== void 0 && e[r] !== void 0 && (o[r] = Pm(i[r])(i[r], e[r]));
  return (r) => {
    for (const c in o)
      a[c] = o[c](r);
    return a;
  };
}
function W_(i, e) {
  const a = [], o = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = i.indexes[c][o[c]], d = i.values[f] ?? 0;
    a[r] = d, o[c]++;
  }
  return a;
}
const tM = (i, e) => {
  const a = Pn.createTransformer(e), o = _o(i), r = _o(e);
  return o.indexes.var.length === r.indexes.var.length && o.indexes.color.length === r.indexes.color.length && o.indexes.number.length >= r.indexes.number.length ? Id.has(i) && !r.values.length || Id.has(e) && !o.values.length ? I_(i, e) : Il($S(W_(o, r), r.values), a) : (Kl(!0, `Complex values '${i}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ic(i, e));
};
function WS(i, e, a) {
  return typeof i == "number" && typeof e == "number" && typeof a == "number" ? Pt(i, e, a) : Pm(i)(i, e);
}
const eM = (i) => {
  const e = ({ timestamp: a }) => i(a);
  return {
    start: (a = !0) => Gt.update(e, a),
    stop: () => Ss(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => _e.isProcessing ? _e.timestamp : qe.now()
  };
}, tw = (i, e, a = 10) => {
  let o = "";
  const r = Math.max(Math.round(e / a), 2);
  for (let c = 0; c < r; c++)
    o += Math.round(i(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${o.substring(0, o.length - 2)})`;
}, sc = 2e4;
function Gm(i) {
  let e = 0;
  const a = 50;
  let o = i.next(e);
  for (; !o.done && e < sc; )
    e += a, o = i.next(e);
  return e >= sc ? 1 / 0 : e;
}
function nM(i, e = 100, a) {
  const o = a({ ...i, keyframes: [0, e] }), r = Math.min(Gm(o), sc);
  return {
    type: "keyframes",
    ease: (c) => o.next(r * c).value / e,
    duration: /* @__PURE__ */ _n(r)
  };
}
const Kt = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Jd(i, e) {
  return i * Math.sqrt(1 - e * e);
}
const iM = 12;
function sM(i, e, a) {
  let o = a;
  for (let r = 1; r < iM; r++)
    o = o - i(o) / e(o);
  return o;
}
const vd = 1e-3;
function aM({ duration: i = Kt.duration, bounce: e = Kt.bounce, velocity: a = Kt.velocity, mass: o = Kt.mass }) {
  let r, c;
  Kl(i <= /* @__PURE__ */ $e(Kt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - e;
  f = di(Kt.minDamping, Kt.maxDamping, f), i = di(Kt.minDuration, Kt.maxDuration, /* @__PURE__ */ _n(i)), f < 1 ? (r = (p) => {
    const v = p * f, g = v * i, b = v - a, S = Jd(p, f), w = Math.exp(-g);
    return vd - b / S * w;
  }, c = (p) => {
    const g = p * f * i, b = g * a + a, S = Math.pow(f, 2) * Math.pow(p, 2) * i, w = Math.exp(-g), C = Jd(Math.pow(p, 2), f);
    return (-r(p) + vd > 0 ? -1 : 1) * ((b - S) * w) / C;
  }) : (r = (p) => {
    const v = Math.exp(-p * i), g = (p - a) * i + 1;
    return -vd + v * g;
  }, c = (p) => {
    const v = Math.exp(-p * i), g = (a - p) * (i * i);
    return v * g;
  });
  const d = 5 / i, m = sM(r, c, d);
  if (i = /* @__PURE__ */ $e(i), isNaN(m))
    return {
      stiffness: Kt.stiffness,
      damping: Kt.damping,
      duration: i
    };
  {
    const p = Math.pow(m, 2) * o;
    return {
      stiffness: p,
      damping: f * 2 * Math.sqrt(o * p),
      duration: i
    };
  }
}
const oM = ["duration", "bounce"], lM = ["stiffness", "damping", "mass"];
function r0(i, e) {
  return e.some((a) => i[a] !== void 0);
}
function rM(i) {
  let e = {
    velocity: Kt.velocity,
    stiffness: Kt.stiffness,
    damping: Kt.damping,
    mass: Kt.mass,
    isResolvedFromDuration: !1,
    ...i
  };
  if (!r0(i, lM) && r0(i, oM))
    if (e.velocity = 0, i.visualDuration) {
      const a = i.visualDuration, o = 2 * Math.PI / (a * 1.2), r = o * o, c = 2 * di(0.05, 1, 1 - (i.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: Kt.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const a = aM({ ...i, velocity: 0 });
      e = {
        ...e,
        ...a,
        mass: Kt.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function ac(i = Kt.visualDuration, e = Kt.bounce) {
  const a = typeof i != "object" ? {
    visualDuration: i,
    keyframes: [0, 1],
    bounce: e
  } : i;
  let { restSpeed: o, restDelta: r } = a;
  const c = a.keyframes[0], f = a.keyframes[a.keyframes.length - 1], d = { done: !1, value: c }, { stiffness: m, damping: p, mass: v, duration: g, velocity: b, isResolvedFromDuration: S } = rM({
    ...a,
    velocity: -/* @__PURE__ */ _n(a.velocity || 0)
  }), w = b || 0, C = p / (2 * Math.sqrt(m * v)), E = f - c, R = /* @__PURE__ */ _n(Math.sqrt(m / v)), k = Math.abs(E) < 5;
  o || (o = k ? Kt.restSpeed.granular : Kt.restSpeed.default), r || (r = k ? Kt.restDelta.granular : Kt.restDelta.default);
  let U, L, P, J, Y, B;
  if (C < 1)
    P = Jd(R, C), J = (w + C * R * E) / P, U = (F) => {
      const pt = Math.exp(-C * R * F);
      return f - pt * (J * Math.sin(P * F) + E * Math.cos(P * F));
    }, Y = C * R * J + E * P, B = C * R * E - J * P, L = (F) => Math.exp(-C * R * F) * (Y * Math.sin(P * F) + B * Math.cos(P * F));
  else if (C === 1) {
    U = (pt) => f - Math.exp(-R * pt) * (E + (w + R * E) * pt);
    const F = w + R * E;
    L = (pt) => Math.exp(-R * pt) * (R * F * pt - w);
  } else {
    const F = R * Math.sqrt(C * C - 1);
    U = (kt) => {
      const zt = Math.exp(-C * R * kt), G = Math.min(F * kt, 300);
      return f - zt * ((w + C * R * E) * Math.sinh(G) + F * E * Math.cosh(G)) / F;
    };
    const pt = (w + C * R * E) / F, bt = C * R * pt - E * F, vt = C * R * E - pt * F;
    L = (kt) => {
      const zt = Math.exp(-C * R * kt), G = Math.min(F * kt, 300);
      return zt * (bt * Math.sinh(G) + vt * Math.cosh(G));
    };
  }
  const rt = {
    calculatedDuration: S && g || null,
    velocity: (F) => /* @__PURE__ */ $e(L(F)),
    next: (F) => {
      if (!S && C < 1) {
        const bt = Math.exp(-C * R * F), vt = Math.sin(P * F), kt = Math.cos(P * F), zt = f - bt * (J * vt + E * kt), G = /* @__PURE__ */ $e(bt * (Y * vt + B * kt));
        return d.done = Math.abs(G) <= o && Math.abs(f - zt) <= r, d.value = d.done ? f : zt, d;
      }
      const pt = U(F);
      if (S)
        d.done = F >= g;
      else {
        const bt = /* @__PURE__ */ $e(L(F));
        d.done = Math.abs(bt) <= o && Math.abs(f - pt) <= r;
      }
      return d.value = d.done ? f : pt, d;
    },
    toString: () => {
      const F = Math.min(Gm(rt), sc), pt = tw((bt) => rt.next(F * bt).value, F, 30);
      return F + "ms " + pt;
    },
    toTransition: () => {
    }
  };
  return rt;
}
ac.applyToOptions = (i) => {
  const e = nM(i, 100, ac);
  return i.ease = e.ease, i.duration = /* @__PURE__ */ $e(e.duration), i.type = "keyframes", i;
};
const uM = 5;
function ew(i, e, a) {
  const o = Math.max(e - uM, 0);
  return /* @__PURE__ */ kS(a - i(o), e - o);
}
function $d({ keyframes: i, velocity: e = 0, power: a = 0.8, timeConstant: o = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: d, max: m, restDelta: p = 0.5, restSpeed: v }) {
  const g = i[0], b = {
    done: !1,
    value: g
  }, S = (B) => d !== void 0 && B < d || m !== void 0 && B > m, w = (B) => d === void 0 ? m : m === void 0 || Math.abs(d - B) < Math.abs(m - B) ? d : m;
  let C = a * e;
  const E = g + C, R = f === void 0 ? E : f(E);
  R !== E && (C = R - g);
  const k = (B) => -C * Math.exp(-B / o), U = (B) => R + k(B), L = (B) => {
    const rt = k(B), F = U(B);
    b.done = Math.abs(rt) <= p, b.value = b.done ? R : F;
  };
  let P, J;
  const Y = (B) => {
    S(b.value) && (P = B, J = ac({
      keyframes: [b.value, w(b.value)],
      velocity: ew(U, B, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: p,
      restSpeed: v
    }));
  };
  return Y(0), {
    calculatedDuration: null,
    next: (B) => {
      let rt = !1;
      return !J && P === void 0 && (rt = !0, L(B), Y(B)), P !== void 0 && B >= P ? J.next(B - P) : (!rt && L(B), b);
    }
  };
}
function cM(i, e, a) {
  const o = [], r = a || xs.mix || WS, c = i.length - 1;
  for (let f = 0; f < c; f++) {
    let d = r(i[f], i[f + 1]);
    if (e) {
      const m = Array.isArray(e) ? e[f] || zn : e;
      d = Il(m, d);
    }
    o.push(d);
  }
  return o;
}
function fM(i, e, { clamp: a = !0, ease: o, mixer: r } = {}) {
  const c = i.length;
  if (mi(c === e.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = i[0] === i[1];
  i[0] > i[c - 1] && (i = [...i].reverse(), e = [...e].reverse());
  const d = cM(e, o, r), m = d.length, p = (v) => {
    if (f && v < i[0])
      return e[0];
    let g = 0;
    if (m > 1)
      for (; g < i.length - 2 && !(v < i[g + 1]); g++)
        ;
    const b = /* @__PURE__ */ ql(i[g], i[g + 1], v);
    return d[g](b);
  };
  return a ? (v) => p(di(i[0], i[c - 1], v)) : p;
}
function hM(i, e) {
  const a = i[i.length - 1];
  for (let o = 1; o <= e; o++) {
    const r = /* @__PURE__ */ ql(0, e, o);
    i.push(Pt(a, 1, r));
  }
}
function dM(i) {
  const e = [0];
  return hM(e, i.length - 1), e;
}
function mM(i, e) {
  return i.map((a) => a * e);
}
function pM(i, e) {
  return i.map(() => e || GS).splice(0, i.length - 1);
}
function Bl({ duration: i = 300, keyframes: e, times: a, ease: o = "easeInOut" }) {
  const r = /* @__PURE__ */ E_(o) ? o.map(n0) : n0(o), c = {
    done: !1,
    value: e[0]
  }, f = mM(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    a && a.length === e.length ? a : dM(e),
    i
  ), d = fM(f, e, {
    ease: Array.isArray(r) ? r : pM(e, r)
  });
  return {
    calculatedDuration: i,
    next: (m) => (c.value = d(m), c.done = m >= i, c)
  };
}
const yM = (i) => i !== null;
function xc(i, { repeat: e, repeatType: a = "loop" }, o, r = 1) {
  const c = i.filter(yM), d = r < 0 || e && a !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !d || o === void 0 ? c[d] : o;
}
const gM = {
  decay: $d,
  inertia: $d,
  tween: Bl,
  keyframes: Bl,
  spring: ac
};
function nw(i) {
  typeof i.type == "string" && (i.type = gM[i.type]);
}
class Ym {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, a) {
    return this.finished.then(e, a);
  }
}
const vM = (i) => i / 100;
class oc extends Ym {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      var o, r;
      const { motionValue: a } = this.options;
      a && a.updatedAt !== qe.now() && this.tick(qe.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (r = (o = this.options).onStop) == null || r.call(o));
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    nw(e);
    const { type: a = Bl, repeat: o = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: d } = e;
    const m = a || Bl;
    m !== Bl && typeof d[0] != "number" && (this.mixKeyframes = Il(vM, WS(d[0], d[1])), d = [0, 100]);
    const p = m({ ...e, keyframes: d });
    c === "mirror" && (this.mirroredGenerator = m({
      ...e,
      keyframes: [...d].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = Gm(p));
    const { calculatedDuration: v } = p;
    this.calculatedDuration = v, this.resolvedDuration = v + r, this.totalDuration = this.resolvedDuration * (o + 1) - r, this.generator = p;
  }
  updateTime(e) {
    const a = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = a;
  }
  tick(e, a = !1) {
    const { generator: o, totalDuration: r, mixKeyframes: c, mirroredGenerator: f, resolvedDuration: d, calculatedDuration: m } = this;
    if (this.startTime === null)
      return o.next(0);
    const { delay: p = 0, keyframes: v, repeat: g, repeatType: b, repeatDelay: S, type: w, onUpdate: C, finalKeyframe: E } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), a ? this.currentTime = e : this.updateTime(e);
    const R = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), k = this.playbackSpeed >= 0 ? R < 0 : R > r;
    this.currentTime = Math.max(R, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let U = this.currentTime, L = o;
    if (g) {
      const B = Math.min(this.currentTime, r) / d;
      let rt = Math.floor(B), F = B % 1;
      !F && B >= 1 && (F = 1), F === 1 && rt--, rt = Math.min(rt, g + 1), !!(rt % 2) && (b === "reverse" ? (F = 1 - F, S && (F -= S / d)) : b === "mirror" && (L = f)), U = di(0, 1, F) * d;
    }
    let P;
    k ? (this.delayState.value = v[0], P = this.delayState) : P = L.next(U), c && !k && (P.value = c(P.value));
    let { done: J } = P;
    !k && m !== null && (J = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const Y = this.holdTime === null && (this.state === "finished" || this.state === "running" && J);
    return Y && w !== $d && (P.value = xc(v, this.options, E, this.speed)), C && C(P.value), Y && this.finish(), P;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, a) {
    return this.finished.then(e, a);
  }
  get duration() {
    return /* @__PURE__ */ _n(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ _n(e);
  }
  get time() {
    return /* @__PURE__ */ _n(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ $e(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const e = this.currentTime;
    if (e <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(e);
    const a = this.generator.next(e).value;
    return ew((o) => this.generator.next(o).value, e, a);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const a = this.playbackSpeed !== e;
    a && this.driver && this.updateTime(qe.now()), this.playbackSpeed = e, a && this.driver && (this.time = /* @__PURE__ */ _n(this.currentTime));
  }
  play() {
    var r, c;
    if (this.isStopped)
      return;
    const { driver: e = eM, startTime: a } = this.options;
    this.driver || (this.driver = e((f) => this.tick(f))), (c = (r = this.options).onPlay) == null || c.call(r);
    const o = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = o) : this.holdTime !== null ? this.startTime = o - this.holdTime : this.startTime || (this.startTime = a ?? o), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(qe.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var e, a;
    this.notifyFinished(), this.teardown(), this.state = "finished", (a = (e = this.options).onComplete) == null || a.call(e);
  }
  cancel() {
    var e, a;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (a = (e = this.options).onCancel) == null || a.call(e);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    var a;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (a = this.driver) == null || a.stop(), e.observe(this);
  }
}
function bM(i) {
  for (let e = 1; e < i.length; e++)
    i[e] ?? (i[e] = i[e - 1]);
}
const aa = (i) => i * 180 / Math.PI, Wd = (i) => {
  const e = aa(Math.atan2(i[1], i[0]));
  return tm(e);
}, xM = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (i) => (Math.abs(i[0]) + Math.abs(i[3])) / 2,
  rotate: Wd,
  rotateZ: Wd,
  skewX: (i) => aa(Math.atan(i[1])),
  skewY: (i) => aa(Math.atan(i[2])),
  skew: (i) => (Math.abs(i[1]) + Math.abs(i[2])) / 2
}, tm = (i) => (i = i % 360, i < 0 && (i += 360), i), u0 = Wd, c0 = (i) => Math.sqrt(i[0] * i[0] + i[1] * i[1]), f0 = (i) => Math.sqrt(i[4] * i[4] + i[5] * i[5]), SM = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: c0,
  scaleY: f0,
  scale: (i) => (c0(i) + f0(i)) / 2,
  rotateX: (i) => tm(aa(Math.atan2(i[6], i[5]))),
  rotateY: (i) => tm(aa(Math.atan2(-i[2], i[0]))),
  rotateZ: u0,
  rotate: u0,
  skewX: (i) => aa(Math.atan(i[4])),
  skewY: (i) => aa(Math.atan(i[1])),
  skew: (i) => (Math.abs(i[1]) + Math.abs(i[4])) / 2
};
function em(i) {
  return i.includes("scale") ? 1 : 0;
}
function nm(i, e) {
  if (!i || i === "none")
    return em(e);
  const a = i.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let o, r;
  if (a)
    o = SM, r = a;
  else {
    const d = i.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    o = xM, r = d;
  }
  if (!r)
    return em(e);
  const c = o[e], f = r[1].split(",").map(TM);
  return typeof c == "function" ? c(f) : f[c];
}
const wM = (i, e) => {
  const { transform: a = "none" } = getComputedStyle(i);
  return nm(a, e);
};
function TM(i) {
  return parseFloat(i.trim());
}
const ko = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], No = /* @__PURE__ */ new Set([...ko, "pathRotation"]), h0 = (i) => i === Vo || i === it, EM = /* @__PURE__ */ new Set(["x", "y", "z"]), CM = ko.filter((i) => !EM.has(i));
function _M(i) {
  const e = [];
  return CM.forEach((a) => {
    const o = i.getValue(a);
    o !== void 0 && (e.push([a, o.get()]), o.set(a.startsWith("scale") ? 1 : 0));
  }), e;
}
const ys = {
  // Dimensions
  width: ({ x: i }, { paddingLeft: e = "0", paddingRight: a = "0", boxSizing: o }) => {
    const r = i.max - i.min;
    return o === "border-box" ? r : r - parseFloat(e) - parseFloat(a);
  },
  height: ({ y: i }, { paddingTop: e = "0", paddingBottom: a = "0", boxSizing: o }) => {
    const r = i.max - i.min;
    return o === "border-box" ? r : r - parseFloat(e) - parseFloat(a);
  },
  top: (i, { top: e }) => parseFloat(e),
  left: (i, { left: e }) => parseFloat(e),
  bottom: ({ y: i }, { top: e }) => parseFloat(e) + (i.max - i.min),
  right: ({ x: i }, { left: e }) => parseFloat(e) + (i.max - i.min),
  // Transform
  x: (i, { transform: e }) => nm(e, "x"),
  y: (i, { transform: e }) => nm(e, "y")
};
ys.translateX = ys.x;
ys.translateY = ys.y;
const ca = /* @__PURE__ */ new Set();
let im = !1, sm = !1, am = !1;
function iw() {
  if (sm) {
    const i = Array.from(ca).filter((o) => o.needsMeasurement), e = new Set(i.map((o) => o.element)), a = /* @__PURE__ */ new Map();
    e.forEach((o) => {
      const r = _M(o);
      r.length && (a.set(o, r), o.render());
    }), i.forEach((o) => o.measureInitialState()), e.forEach((o) => {
      o.render();
      const r = a.get(o);
      r && r.forEach(([c, f]) => {
        var d;
        (d = o.getValue(c)) == null || d.set(f);
      });
    }), i.forEach((o) => o.measureEndState()), i.forEach((o) => {
      o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
    });
  }
  sm = !1, im = !1, ca.forEach((i) => i.complete(am)), ca.clear();
}
function sw() {
  ca.forEach((i) => {
    i.readKeyframes(), i.needsMeasurement && (sm = !0);
  });
}
function MM() {
  am = !0, sw(), iw(), am = !1;
}
class Xm {
  constructor(e, a, o, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = a, this.name = o, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ca.add(this), im || (im = !0, Gt.read(sw), Gt.resolveKeyframes(iw))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: a, element: o, motionValue: r } = this;
    if (e[0] === null) {
      const c = r == null ? void 0 : r.get(), f = e[e.length - 1];
      if (c !== void 0)
        e[0] = c;
      else if (o && a) {
        const d = o.readValue(a, f);
        d != null && (e[0] = d);
      }
      e[0] === void 0 && (e[0] = f), r && c === void 0 && r.set(e[0]);
    }
    bM(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ca.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ca.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const zM = (i) => i.startsWith("--");
function aw(i, e, a) {
  zM(e) ? i.style.setProperty(e, a) : i.style[e] = a;
}
const AM = {};
function ow(i, e) {
  const a = /* @__PURE__ */ VS(i);
  return () => AM[e] ?? a();
}
const OM = /* @__PURE__ */ ow(() => window.ScrollTimeline !== void 0, "scrollTimeline"), lw = /* @__PURE__ */ ow(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Nl = ([i, e, a, o]) => `cubic-bezier(${i}, ${e}, ${a}, ${o})`, d0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Nl([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Nl([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Nl([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Nl([0.33, 1.53, 0.69, 0.99])
};
function rw(i, e) {
  if (i)
    return typeof i == "function" ? lw() ? tw(i, e) : "ease-out" : /* @__PURE__ */ YS(i) ? Nl(i) : Array.isArray(i) ? i.map((a) => rw(a, e) || d0.easeOut) : d0[i];
}
function DM(i, e, a, { delay: o = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: d = "easeOut", times: m } = {}, p = void 0) {
  const v = {
    [e]: a
  };
  m && (v.offset = m);
  const g = rw(d, r);
  Array.isArray(g) && (v.easing = g);
  const b = {
    delay: o,
    duration: r,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: c + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (b.pseudoElement = p), i.animate(v, b);
}
function uw(i) {
  return typeof i == "function" && "applyToOptions" in i;
}
function RM({ type: i, ...e }) {
  return uw(i) && lw() ? i.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class cw extends Ym {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: a, name: o, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: d, onComplete: m } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, mi(typeof e.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = RM(e);
    this.animation = DM(a, o, r, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const v = xc(r, this.options, d, this.speed);
        this.updateMotionValue && this.updateMotionValue(v), aw(a, o, v), this.animation.cancel();
      }
      m == null || m(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var e, a;
    (a = (e = this.animation).finish) == null || a.call(e);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var a, o, r;
    const e = (a = this.options) == null ? void 0 : a.element;
    !this.isPseudoElement && (e != null && e.isConnected) && ((r = (o = this.animation).commitStyles) == null || r.call(o));
  }
  get duration() {
    var a, o;
    const e = ((o = (a = this.animation.effect) == null ? void 0 : a.getComputedTiming) == null ? void 0 : o.call(a).duration) || 0;
    return /* @__PURE__ */ _n(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ _n(e);
  }
  get time() {
    return /* @__PURE__ */ _n(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const a = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ $e(e), a && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, rangeStart: a, rangeEnd: o, observe: r }) {
    var c;
    return this.allowFlatten && ((c = this.animation.effect) == null || c.updateTiming({ easing: "linear" })), this.animation.onfinish = null, e && OM() ? (this.animation.timeline = e, a && (this.animation.rangeStart = a), o && (this.animation.rangeEnd = o), zn) : r(this);
  }
}
const fw = {
  anticipate: jS,
  backInOut: HS,
  circInOut: PS
};
function VM(i) {
  return i in fw;
}
function kM(i) {
  typeof i.ease == "string" && VM(i.ease) && (i.ease = fw[i.ease]);
}
const bd = 10;
class NM extends cw {
  constructor(e) {
    kM(e), nw(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: a, onUpdate: o, onComplete: r, element: c, ...f } = this.options;
    if (!a)
      return;
    if (e !== void 0) {
      a.set(e);
      return;
    }
    const d = new oc({
      ...f,
      autoplay: !1
    }), m = Math.max(bd, qe.now() - this.startTime), p = di(0, bd, m - bd), v = d.sample(m).value, { name: g } = this.options;
    c && g && aw(c, g, v), a.setWithVelocity(d.sample(Math.max(0, m - p)).value, v, p), d.stop();
  }
}
const m0 = (i, e) => e === "zIndex" ? !1 : !!(typeof i == "number" || Array.isArray(i) || typeof i == "string" && // It's animatable if we have a string
(Pn.test(i) || i === "0") && // And it contains numbers and/or colors
!i.startsWith("url("));
function LM(i) {
  const e = i[0];
  if (i.length === 1)
    return !0;
  for (let a = 0; a < i.length; a++)
    if (i[a] !== e)
      return !0;
}
function BM(i, e, a, o) {
  const r = i[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = i[i.length - 1], f = m0(r, e), d = m0(c, e);
  return Kl(f === d, `You are trying to animate ${e} from "${r}" to "${c}". "${f ? c : r}" is not an animatable value.`, "value-not-animatable"), !f || !d ? !1 : LM(i) || (a === "spring" || uw(a)) && o;
}
function om(i) {
  i.duration = 0, i.type = "keyframes";
}
const hw = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), UM = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function HM(i) {
  for (let e = 0; e < i.length; e++)
    if (typeof i[e] == "string" && UM.test(i[e]))
      return !0;
  return !1;
}
const jM = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), qM = /* @__PURE__ */ VS(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function PM(i) {
  var g;
  const { motionValue: e, name: a, repeatDelay: o, repeatType: r, damping: c, type: f, keyframes: d } = i, m = (g = e == null ? void 0 : e.owner) == null ? void 0 : g.current;
  if (!(m instanceof HTMLElement) && !(m instanceof SVGElement))
    return !1;
  const { onUpdate: p, transformTemplate: v } = e.owner.getProps();
  return qM() && a && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (hw.has(a) || jM.has(a) && HM(d)) && (a !== "transform" || !v) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !o && r !== "mirror" && c !== 0 && f !== "inertia";
}
const GM = 40;
class YM extends Ym {
  constructor({ autoplay: e = !0, delay: a = 0, type: o = "keyframes", repeat: r = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: d, name: m, motionValue: p, element: v, ...g }) {
    var w;
    super(), this.stop = () => {
      var C, E;
      this._animation && (this._animation.stop(), (C = this.stopTimeline) == null || C.call(this)), (E = this.keyframeResolver) == null || E.cancel();
    }, this.createdAt = qe.now();
    const b = {
      autoplay: e,
      delay: a,
      type: o,
      repeat: r,
      repeatDelay: c,
      repeatType: f,
      name: m,
      motionValue: p,
      element: v,
      ...g
    }, S = (v == null ? void 0 : v.KeyframeResolver) || Xm;
    this.keyframeResolver = new S(d, (C, E, R) => this.onKeyframesResolved(C, E, b, !R), m, p, v), (w = this.keyframeResolver) == null || w.scheduleResolve();
  }
  onKeyframesResolved(e, a, o, r) {
    var R, k;
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: d, delay: m, isHandoff: p, onUpdate: v } = o;
    this.resolvedAt = qe.now();
    let g = !0;
    BM(e, c, f, d) || (g = !1, (xs.instantAnimations || !m) && (v == null || v(xc(e, o, a))), e[0] = e[e.length - 1], om(o), o.repeat = 0);
    const S = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > GM ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: a,
      ...o,
      keyframes: e
    }, w = g && !p && PM(S), C = (k = (R = S.motionValue) == null ? void 0 : R.owner) == null ? void 0 : k.current;
    let E;
    if (w)
      try {
        E = new NM({
          ...S,
          element: C
        });
      } catch {
        E = new oc(S);
      }
    else
      E = new oc(S);
    E.finished.then(() => {
      this.notifyFinished();
    }).catch(zn), this.pendingTimeline && (this.stopTimeline = E.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = E;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, a) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    var e;
    return this._animation || ((e = this.keyframeResolver) == null || e.resume(), MM()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var e;
    this._animation && this.animation.cancel(), (e = this.keyframeResolver) == null || e.cancel();
  }
}
function dw(i, e, a, o = 0, r = 1) {
  const c = Array.from(i).sort((p, v) => p.sortNodePosition(v)).indexOf(e), f = i.size, d = (f - 1) * o;
  return typeof a == "function" ? a(c, f) : r === 1 ? c * o : d - c * o;
}
const p0 = 30, XM = (i) => !isNaN(parseFloat(i));
class QM {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, a = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (o) => {
      var c;
      const r = qe.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(o), this.current !== this.prev && ((c = this.events.change) == null || c.notify(this.current), this.dependents))
        for (const f of this.dependents)
          f.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = a.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = qe.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = XM(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, a) {
    this.events[e] || (this.events[e] = new Lm());
    const o = this.events[e].add(a);
    return e === "change" ? () => {
      o(), Gt.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : o;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, a) {
    this.passiveEffect = e, this.stopPassiveEffect = a;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, a, o) {
    this.set(a), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - o;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, a = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, a && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var e;
    (e = this.events.change) == null || e.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = qe.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > p0)
      return 0;
    const a = Math.min(this.updatedAt - this.prevUpdatedAt, p0);
    return /* @__PURE__ */ kS(parseFloat(this.current) - parseFloat(this.prevFrameValue), a);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((a) => {
      this.hasAnimated = !0, this.animation = e(a), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var e, a;
    (e = this.dependents) == null || e.clear(), (a = this.events.destroy) == null || a.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Mo(i, e) {
  return new QM(i, e);
}
function mw(i, e) {
  if (i != null && i.inherit && e) {
    const { inherit: a, ...o } = i;
    return { ...e, ...o };
  }
  return i;
}
function Qm(i, e) {
  const a = (i == null ? void 0 : i[e]) ?? (i == null ? void 0 : i.default) ?? i;
  return a !== i ? mw(a, i) : a;
}
const ZM = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, FM = (i) => ({
  type: "spring",
  stiffness: 550,
  damping: i === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), KM = {
  type: "keyframes",
  duration: 0.8
}, IM = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, JM = (i, { keyframes: e }) => e.length > 2 ? KM : No.has(i) ? i.startsWith("scale") ? FM(e[1]) : ZM : IM, $M = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function WM(i) {
  for (const e in i)
    if (!$M.has(e))
      return !0;
  return !1;
}
const Zm = (i, e, a, o = {}, r, c) => (f) => {
  const d = Qm(o, i) || {}, m = d.delay || o.delay || 0;
  let { elapsed: p = 0 } = o;
  p = p - /* @__PURE__ */ $e(m);
  const v = {
    keyframes: Array.isArray(a) ? a : [null, a],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...d,
    delay: -p,
    onUpdate: (b) => {
      e.set(b), d.onUpdate && d.onUpdate(b);
    },
    onComplete: () => {
      f(), d.onComplete && d.onComplete();
    },
    name: i,
    motionValue: e,
    element: c ? void 0 : r
  };
  WM(d) || Object.assign(v, JM(i, v)), v.duration && (v.duration = /* @__PURE__ */ $e(v.duration)), v.repeatDelay && (v.repeatDelay = /* @__PURE__ */ $e(v.repeatDelay)), v.from !== void 0 && (v.keyframes[0] = v.from);
  let g = !1;
  if ((v.type === !1 || v.duration === 0 && !v.repeatDelay) && (om(v), v.delay === 0 && (g = !0)), (xs.instantAnimations || xs.skipAnimations || r != null && r.shouldSkipAnimations || d.skipAnimations) && (g = !0, om(v), v.delay = 0), v.allowFlatten = !d.type && !d.ease, g && !c && e.get() !== void 0) {
    const b = xc(v.keyframes, d);
    if (b !== void 0) {
      Gt.update(() => {
        v.onUpdate(b), v.onComplete();
      });
      return;
    }
  }
  return d.isSync ? new oc(v) : new YM(v);
}, tz = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function ez(i) {
  const e = tz.exec(i);
  if (!e)
    return [,];
  const [, a, o, r] = e;
  return [`--${a ?? o}`, r];
}
const nz = 4;
function pw(i, e, a = 1) {
  mi(a <= nz, `Max CSS variable fallback depth detected in property "${i}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [o, r] = ez(i);
  if (!o)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(o);
  if (c) {
    const f = c.trim();
    return OS(f) ? parseFloat(f) : f;
  }
  return Hm(r) ? pw(r, e, a + 1) : r;
}
function y0(i) {
  const e = [{}, {}];
  return i == null || i.values.forEach((a, o) => {
    e[0][o] = a.get(), e[1][o] = a.getVelocity();
  }), e;
}
function Fm(i, e, a, o) {
  if (typeof e == "function") {
    const [r, c] = y0(o);
    e = e(a !== void 0 ? a : i.custom, r, c);
  }
  if (typeof e == "string" && (e = i.variants && i.variants[e]), typeof e == "function") {
    const [r, c] = y0(o);
    e = e(a !== void 0 ? a : i.custom, r, c);
  }
  return e;
}
function fa(i, e, a) {
  const o = i.getProps();
  return Fm(o, e, a !== void 0 ? a : o.custom, i);
}
const yw = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ko
]), lm = (i) => Array.isArray(i);
function iz(i, e, a) {
  i.hasValue(e) ? i.getValue(e).set(a) : i.addValue(e, Mo(a));
}
function sz(i) {
  return lm(i) ? i[i.length - 1] || 0 : i;
}
function Km(i, e) {
  const a = fa(i, e);
  let { transitionEnd: o = {}, transition: r = {}, ...c } = a || {};
  c = { ...c, ...o };
  for (const f in c) {
    const d = sz(c[f]);
    iz(i, f, d);
  }
}
const ze = (i) => !!(i && i.getVelocity);
function az(i) {
  return !!(ze(i) && i.add);
}
function rm(i, e) {
  const a = i.getValue("willChange");
  if (az(a))
    return a.add(e);
  if (!a && xs.WillChange) {
    const o = new xs.WillChange("auto");
    i.addValue("willChange", o), o.add(e);
  }
}
function Im(i) {
  return i.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const oz = "framerAppearId", gw = "data-" + Im(oz);
function vw(i) {
  return i.props[gw];
}
function lz({ protectedKeys: i, needsAnimating: e }, a) {
  const o = i.hasOwnProperty(a) && e[a] !== !0;
  return e[a] = !1, o;
}
function bw(i, e, { delay: a = 0, transitionOverride: o, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...d } = e;
  const m = i.getDefaultTransition();
  c = c ? mw(c, m) : m;
  const p = c == null ? void 0 : c.reduceMotion, v = c == null ? void 0 : c.skipAnimations;
  o && (c = o);
  const g = [], b = r && i.animationState && i.animationState.getState()[r], S = c == null ? void 0 : c.path;
  S && S.animateVisualElement(i, d, c, a, g);
  for (const w in d) {
    const C = i.getValue(w, i.latestValues[w] ?? null), E = d[w];
    if (E === void 0 || b && lz(b, w))
      continue;
    const R = {
      delay: a,
      ...Qm(c || {}, w)
    };
    v && (R.skipAnimations = !0);
    const k = C.get();
    if (k !== void 0 && !C.isAnimating() && !Array.isArray(E) && E === k && !R.velocity) {
      Gt.update(() => C.set(E));
      continue;
    }
    let U = !1;
    if (window.MotionHandoffAnimation) {
      const J = vw(i);
      if (J) {
        const Y = window.MotionHandoffAnimation(J, w, Gt);
        Y !== null && (R.startTime = Y, U = !0);
      }
    }
    rm(i, w);
    const L = p ?? i.shouldReduceMotion;
    C.start(Zm(w, C, E, L && yw.has(w) ? { type: !1 } : R, i, U));
    const P = C.animation;
    P && g.push(P);
  }
  if (f) {
    const w = () => Gt.update(() => {
      f && Km(i, f);
    });
    g.length ? Promise.all(g).then(w) : w();
  }
  return g;
}
function um(i, e, a = {}) {
  var m;
  const o = fa(i, e, a.type === "exit" ? (m = i.presenceContext) == null ? void 0 : m.custom : void 0);
  let { transition: r = i.getDefaultTransition() || {} } = o || {};
  a.transitionOverride && (r = a.transitionOverride);
  const c = o ? () => Promise.all(bw(i, o, a)) : () => Promise.resolve(), f = i.variantChildren && i.variantChildren.size ? (p = 0) => {
    const { delayChildren: v = 0, staggerChildren: g, staggerDirection: b } = r;
    return rz(i, e, p, v, g, b, a);
  } : () => Promise.resolve(), { when: d } = r;
  if (d) {
    const [p, v] = d === "beforeChildren" ? [c, f] : [f, c];
    return p().then(() => v());
  } else
    return Promise.all([c(), f(a.delay)]);
}
function rz(i, e, a = 0, o = 0, r = 0, c = 1, f) {
  const d = [];
  for (const m of i.variantChildren)
    m.notify("AnimationStart", e), d.push(um(m, e, {
      ...f,
      delay: a + (typeof o == "function" ? 0 : o) + dw(i.variantChildren, m, o, r, c)
    }).then(() => m.notify("AnimationComplete", e)));
  return Promise.all(d);
}
function xw(i, e, a = {}) {
  i.notify("AnimationStart", e);
  let o;
  if (Array.isArray(e)) {
    const r = e.map((c) => um(i, c, a));
    o = Promise.all(r);
  } else if (typeof e == "string")
    o = um(i, e, a);
  else {
    const r = typeof e == "function" ? fa(i, e, a.custom) : e;
    o = Promise.all(bw(i, r, a));
  }
  return o.then(() => {
    i.notify("AnimationComplete", e);
  });
}
const uz = {
  test: (i) => i === "auto",
  parse: (i) => i
}, Sw = (i) => (e) => e.test(i), ww = [Vo, it, hi, Vi, L_, N_, uz], g0 = (i) => ww.find(Sw(i));
function cz(i) {
  return typeof i == "number" ? i === 0 : i !== null ? i === "none" || i === "0" || RS(i) : !0;
}
const fz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function hz(i) {
  const [e, a] = i.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return i;
  const [o] = a.match(jm) || [];
  if (!o)
    return i;
  const r = a.replace(o, "");
  let c = fz.has(e) ? 1 : 0;
  return o !== a && (c *= 100), e + "(" + c + r + ")";
}
const dz = /\b([a-z-]*)\(.*?\)/gu, cm = {
  ...Pn,
  getAnimatableNone: (i) => {
    const e = i.match(dz);
    return e ? e.map(hz).join(" ") : i;
  }
}, fm = {
  ...Pn,
  getAnimatableNone: (i) => {
    const e = Pn.parse(i);
    return Pn.createTransformer(i)(e.map((o) => typeof o == "number" ? 0 : typeof o == "object" ? { ...o, alpha: 1 } : o));
  }
}, v0 = {
  ...Vo,
  transform: Math.round
}, mz = {
  rotate: Vi,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Vi,
  rotateX: Vi,
  rotateY: Vi,
  rotateZ: Vi,
  scale: Ru,
  scaleX: Ru,
  scaleY: Ru,
  scaleZ: Ru,
  skew: Vi,
  skewX: Vi,
  skewY: Vi,
  distance: it,
  translateX: it,
  translateY: it,
  translateZ: it,
  x: it,
  y: it,
  z: it,
  perspective: it,
  transformPerspective: it,
  opacity: Pl,
  originX: s0,
  originY: s0,
  originZ: it
}, lc = {
  // Border props
  borderWidth: it,
  borderTopWidth: it,
  borderRightWidth: it,
  borderBottomWidth: it,
  borderLeftWidth: it,
  borderRadius: it,
  borderTopLeftRadius: it,
  borderTopRightRadius: it,
  borderBottomRightRadius: it,
  borderBottomLeftRadius: it,
  // Positioning props
  width: it,
  maxWidth: it,
  height: it,
  maxHeight: it,
  top: it,
  right: it,
  bottom: it,
  left: it,
  inset: it,
  insetBlock: it,
  insetBlockStart: it,
  insetBlockEnd: it,
  insetInline: it,
  insetInlineStart: it,
  insetInlineEnd: it,
  // Spacing props
  padding: it,
  paddingTop: it,
  paddingRight: it,
  paddingBottom: it,
  paddingLeft: it,
  paddingBlock: it,
  paddingBlockStart: it,
  paddingBlockEnd: it,
  paddingInline: it,
  paddingInlineStart: it,
  paddingInlineEnd: it,
  margin: it,
  marginTop: it,
  marginRight: it,
  marginBottom: it,
  marginLeft: it,
  marginBlock: it,
  marginBlockStart: it,
  marginBlockEnd: it,
  marginInline: it,
  marginInlineStart: it,
  marginInlineEnd: it,
  // Typography
  fontSize: it,
  // Misc
  backgroundPositionX: it,
  backgroundPositionY: it,
  ...mz,
  zIndex: v0,
  // SVG
  fillOpacity: Pl,
  strokeOpacity: Pl,
  numOctaves: v0
}, pz = {
  ...lc,
  // Color props
  color: oe,
  backgroundColor: oe,
  outlineColor: oe,
  fill: oe,
  stroke: oe,
  // Border props
  borderColor: oe,
  borderTopColor: oe,
  borderRightColor: oe,
  borderBottomColor: oe,
  borderLeftColor: oe,
  filter: cm,
  WebkitFilter: cm,
  mask: fm,
  WebkitMask: fm
}, Tw = (i) => pz[i], yz = /* @__PURE__ */ new Set([cm, fm]);
function Ew(i, e) {
  let a = Tw(i);
  return yz.has(a) || (a = Pn), a.getAnimatableNone ? a.getAnimatableNone(e) : void 0;
}
const gz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function vz(i, e, a) {
  let o = 0, r;
  for (; o < i.length && !r; ) {
    const c = i[o];
    typeof c == "string" && !gz.has(c) && _o(c).values.length && (r = i[o]), o++;
  }
  if (r && a)
    for (const c of e)
      i[c] = Ew(a, r);
}
class bz extends Xm {
  constructor(e, a, o, r, c) {
    super(e, a, o, r, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: a, name: o } = this;
    if (!a || !a.current)
      return;
    super.readKeyframes();
    for (let v = 0; v < e.length; v++) {
      let g = e[v];
      if (typeof g == "string" && (g = g.trim(), Hm(g))) {
        const b = pw(g, a.current);
        b !== void 0 && (e[v] = b), v === e.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !yw.has(o) || e.length !== 2)
      return;
    const [r, c] = e, f = g0(r), d = g0(c), m = i0(r), p = i0(c);
    if (m !== p && ys[o]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== d)
      if (h0(f) && h0(d))
        for (let v = 0; v < e.length; v++) {
          const g = e[v];
          typeof g == "string" && (e[v] = parseFloat(g));
        }
      else ys[o] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: a } = this, o = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || cz(e[r])) && o.push(r);
    o.length && vz(e, o, a);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: a, name: o } = this;
    if (!e || !e.current)
      return;
    o === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ys[o](e.measureViewportBox(), window.getComputedStyle(e.current)), a[0] = this.measuredOrigin;
    const r = a[a.length - 1];
    r !== void 0 && e.getValue(o, r).jump(r, !1);
  }
  measureEndState() {
    var d;
    const { element: e, name: a, unresolvedKeyframes: o } = this;
    if (!e || !e.current)
      return;
    const r = e.getValue(a);
    r && r.jump(this.measuredOrigin, !1);
    const c = o.length - 1, f = o[c];
    o[c] = ys[a](e.measureViewportBox(), window.getComputedStyle(e.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), (d = this.removedTransforms) != null && d.length && this.removedTransforms.forEach(([m, p]) => {
      e.getValue(m).set(p);
    }), this.resolveNoneKeyframes();
  }
}
const Jm = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Cw(i, e, a) {
  if (i == null)
    return [];
  if (i instanceof EventTarget)
    return [i];
  if (typeof i == "string") {
    let o = document;
    const r = (a == null ? void 0 : a[i]) ?? o.querySelectorAll(i);
    return r ? Array.from(r) : [];
  }
  return Array.from(i).filter((o) => o != null);
}
const hm = (i, e) => e && typeof i == "number" ? e.transform(i) : i;
function xz(i) {
  return DS(i) && "offsetHeight" in i && !("ownerSVGElement" in i);
}
const { schedule: $m } = /* @__PURE__ */ XS(queueMicrotask, !1), Un = {
  x: !1,
  y: !1
};
function _w() {
  return Un.x || Un.y;
}
function Sz(i) {
  return i === "x" || i === "y" ? Un[i] ? null : (Un[i] = !0, () => {
    Un[i] = !1;
  }) : Un.x || Un.y ? null : (Un.x = Un.y = !0, () => {
    Un.x = Un.y = !1;
  });
}
function Mw(i, e) {
  const a = Cw(i), o = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: o.signal
  };
  return [a, r, () => o.abort()];
}
function wz(i) {
  return !(i.pointerType === "touch" || _w());
}
function Tz(i, e, a = {}) {
  const [o, r, c] = Mw(i, a);
  return o.forEach((f) => {
    let d = !1, m = !1, p;
    const v = () => {
      f.removeEventListener("pointerleave", w);
    }, g = (E) => {
      p && (p(E), p = void 0), v();
    }, b = (E) => {
      d = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), m && (m = !1, g(E));
    }, S = () => {
      d = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, w = (E) => {
      if (E.pointerType !== "touch") {
        if (d) {
          m = !0;
          return;
        }
        g(E);
      }
    }, C = (E) => {
      if (!wz(E))
        return;
      m = !1;
      const R = e(f, E);
      typeof R == "function" && (p = R, f.addEventListener("pointerleave", w, r));
    };
    f.addEventListener("pointerenter", C, r), f.addEventListener("pointerdown", S, r);
  }), c;
}
const zw = (i, e) => e ? i === e ? !0 : zw(i, e.parentElement) : !1, Wm = (i) => i.pointerType === "mouse" ? typeof i.button != "number" || i.button <= 0 : i.isPrimary !== !1, Ez = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Cz(i) {
  return Ez.has(i.tagName) || i.isContentEditable === !0;
}
const _z = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Mz(i) {
  return _z.has(i.tagName) || i.isContentEditable === !0;
}
const Zu = /* @__PURE__ */ new WeakSet();
function b0(i) {
  return (e) => {
    e.key === "Enter" && i(e);
  };
}
function xd(i, e) {
  i.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const zz = (i, e) => {
  const a = i.currentTarget;
  if (!a)
    return;
  const o = b0(() => {
    if (Zu.has(a))
      return;
    xd(a, "down");
    const r = b0(() => {
      xd(a, "up");
    }), c = () => xd(a, "cancel");
    a.addEventListener("keyup", r, e), a.addEventListener("blur", c, e);
  });
  a.addEventListener("keydown", o, e), a.addEventListener("blur", () => a.removeEventListener("keydown", o), e);
};
function x0(i) {
  return Wm(i) && !_w();
}
const S0 = /* @__PURE__ */ new WeakSet();
function Az(i, e, a = {}) {
  const [o, r, c] = Mw(i, a), f = (d) => {
    const m = d.currentTarget;
    if (!x0(d) || S0.has(d))
      return;
    Zu.add(m), a.stopPropagation && S0.add(d);
    const p = e(m, d), v = { ...r, capture: !0 }, g = (w, C) => {
      window.removeEventListener("pointerup", b, v), window.removeEventListener("pointercancel", S, v), Zu.has(m) && Zu.delete(m), x0(w) && typeof p == "function" && p(w, { success: C });
    }, b = (w) => {
      g(w, m === window || m === document || a.useGlobalTarget || zw(m, w.target));
    }, S = (w) => {
      g(w, !1);
    };
    window.addEventListener("pointerup", b, v), window.addEventListener("pointercancel", S, v);
  };
  return o.forEach((d) => {
    (a.useGlobalTarget ? window : d).addEventListener("pointerdown", f, r), xz(d) && (d.addEventListener("focus", (p) => zz(p, r)), !Cz(d) && !d.hasAttribute("tabindex") && (d.tabIndex = 0));
  }), c;
}
function tp(i) {
  return DS(i) && "ownerSVGElement" in i;
}
const Fu = /* @__PURE__ */ new WeakMap();
let ms;
const Aw = (i, e, a) => (o, r) => r && r[0] ? r[0][i + "Size"] : tp(o) && "getBBox" in o ? o.getBBox()[e] : o[a], Oz = /* @__PURE__ */ Aw("inline", "width", "offsetWidth"), Dz = /* @__PURE__ */ Aw("block", "height", "offsetHeight");
function Rz({ target: i, borderBoxSize: e }) {
  var a;
  (a = Fu.get(i)) == null || a.forEach((o) => {
    o(i, {
      get width() {
        return Oz(i, e);
      },
      get height() {
        return Dz(i, e);
      }
    });
  });
}
function Vz(i) {
  i.forEach(Rz);
}
function kz() {
  typeof ResizeObserver > "u" || (ms = new ResizeObserver(Vz));
}
function Nz(i, e) {
  ms || kz();
  const a = Cw(i);
  return a.forEach((o) => {
    let r = Fu.get(o);
    r || (r = /* @__PURE__ */ new Set(), Fu.set(o, r)), r.add(e), ms == null || ms.observe(o);
  }), () => {
    a.forEach((o) => {
      const r = Fu.get(o);
      r == null || r.delete(e), r != null && r.size || ms == null || ms.unobserve(o);
    });
  };
}
const Ku = /* @__PURE__ */ new Set();
let yo;
function Lz() {
  yo = () => {
    const i = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Ku.forEach((e) => e(i));
  }, window.addEventListener("resize", yo);
}
function Bz(i) {
  return Ku.add(i), yo || Lz(), () => {
    Ku.delete(i), !Ku.size && typeof yo == "function" && (window.removeEventListener("resize", yo), yo = void 0);
  };
}
function w0(i, e) {
  return typeof i == "function" ? Bz(i) : Nz(i, e);
}
function Uz(i) {
  return tp(i) && i.tagName === "svg";
}
const Hz = [...ww, oe, Pn], jz = (i) => Hz.find(Sw(i)), T0 = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), go = () => ({
  x: T0(),
  y: T0()
}), E0 = () => ({ min: 0, max: 0 }), fe = () => ({
  x: E0(),
  y: E0()
}), qz = /* @__PURE__ */ new WeakMap();
function Sc(i) {
  return i !== null && typeof i == "object" && typeof i.start == "function";
}
function Gl(i) {
  return typeof i == "string" || Array.isArray(i);
}
const ep = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], np = ["initial", ...ep];
function wc(i) {
  return Sc(i.animate) || np.some((e) => Gl(i[e]));
}
function Ow(i) {
  return !!(wc(i) || i.variants);
}
function Pz(i, e, a) {
  for (const o in e) {
    const r = e[o], c = a[o];
    if (ze(r))
      i.addValue(o, r);
    else if (ze(c))
      i.addValue(o, Mo(r, { owner: i }));
    else if (c !== r)
      if (i.hasValue(o)) {
        const f = i.getValue(o);
        f.liveStyle === !0 ? f.jump(r) : f.hasAnimated || f.set(r);
      } else {
        const f = i.getStaticValue(o);
        i.addValue(o, Mo(f !== void 0 ? f : r, { owner: i }));
      }
  }
  for (const o in a)
    e[o] === void 0 && i.removeValue(o);
  return e;
}
const rc = { current: null }, ip = { current: !1 }, Gz = typeof window < "u";
function Dw() {
  if (ip.current = !0, !!Gz)
    if (window.matchMedia) {
      const i = window.matchMedia("(prefers-reduced-motion)"), e = () => rc.current = i.matches;
      i.addEventListener("change", e), e();
    } else
      rc.current = !1;
}
const C0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let uc = {};
function Rw(i) {
  uc = i;
}
function Yz() {
  return uc;
}
class Xz {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, a, o) {
    return {};
  }
  constructor({ parent: e, props: a, presenceContext: o, reducedMotionConfig: r, skipAnimations: c, blockInitialAnimation: f, visualState: d }, m = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Xm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = qe.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, Gt.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: v } = d;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = a.initial ? { ...p } : {}, this.renderState = v, this.parent = e, this.props = a, this.presenceContext = o, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = m, this.blockInitialAnimation = !!f, this.isControllingVariants = wc(a), this.isVariantNode = Ow(a), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: g, ...b } = this.scrapeMotionValuesFromProps(a, {}, this);
    for (const S in b) {
      const w = b[S];
      p[S] !== void 0 && ze(w) && w.set(p[S]);
    }
  }
  mount(e) {
    var a, o;
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        (a = this.values.get(r)) == null || a.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = e, qz.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, c) => this.bindToMotionValue(c, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ip.current || Dw(), this.shouldReduceMotion = rc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (o = this.parent) == null || o.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var e;
    this.projection && this.projection.unmount(), Ss(this.notifyUpdate), Ss(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (e = this.parent) == null || e.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const o = this.features[a];
      o && (o.unmount(), o.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, a) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), a.accelerate && hw.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: d, times: m, ease: p, duration: v } = a.accelerate, g = new cw({
        element: this.current,
        name: e,
        keyframes: d,
        times: m,
        ease: p,
        duration: /* @__PURE__ */ $e(v)
      }), b = f(g);
      this.valueSubscriptions.set(e, () => {
        b(), g.cancel();
      });
      return;
    }
    const o = No.has(e);
    o && this.onBindTransform && this.onBindTransform();
    const r = a.on("change", (f) => {
      this.latestValues[e] = f, this.props.onUpdate && Gt.preRender(this.notifyUpdate), o && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, e, a)), this.valueSubscriptions.set(e, () => {
      r(), c && c();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in uc) {
      const a = uc[e];
      if (!a)
        continue;
      const { isEnabled: o, Feature: r } = a;
      if (!this.features[e] && r && o(this.props) && (this.features[e] = new r(this)), this.features[e]) {
        const c = this.features[e];
        c.isMounted ? c.update() : (c.mount(), c.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : fe();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, a) {
    this.latestValues[e] = a;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, a) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = a;
    for (let o = 0; o < C0.length; o++) {
      const r = C0[o];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = Pz(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const a = this.getClosestVariantNode();
    if (a)
      return a.variantChildren && a.variantChildren.add(e), () => a.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, a) {
    const o = this.values.get(e);
    a !== o && (o && this.removeValue(e), this.bindToMotionValue(e, a), this.values.set(e, a), this.latestValues[e] = a.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const a = this.valueSubscriptions.get(e);
    a && (a(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, a) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let o = this.values.get(e);
    return o === void 0 && a !== void 0 && (o = Mo(a === null ? void 0 : a, { owner: this }), this.addValue(e, o)), o;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, a) {
    let o = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return o != null && (typeof o == "string" && (OS(o) || RS(o)) ? o = parseFloat(o) : !jz(o) && Pn.test(a) && (o = Ew(e, a)), this.setBaseTarget(e, ze(o) ? o.get() : o)), ze(o) ? o.get() : o;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, a) {
    this.baseTarget[e] = a;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var c;
    const { initial: a } = this.props;
    let o;
    if (typeof a == "string" || typeof a == "object") {
      const f = Fm(this.props, a, (c = this.presenceContext) == null ? void 0 : c.custom);
      f && (o = f[e]);
    }
    if (a && o !== void 0)
      return o;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !ze(r) ? r : this.initialValues[e] !== void 0 && o === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, a) {
    return this.events[e] || (this.events[e] = new Lm()), this.events[e].add(a);
  }
  notify(e, ...a) {
    this.events[e] && this.events[e].notify(...a);
  }
  scheduleRenderMicrotask() {
    $m.render(this.render);
  }
}
class Vw extends Xz {
  constructor() {
    super(...arguments), this.KeyframeResolver = bz;
  }
  sortInstanceNodePosition(e, a) {
    return e.compareDocumentPosition(a) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, a) {
    const o = e.style;
    return o ? o[a] : void 0;
  }
  removeValueFromRenderState(e, { vars: a, style: o }) {
    delete a[e], delete o[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    ze(e) && (this.childSubscription = e.on("change", (a) => {
      this.current && (this.current.textContent = `${a}`);
    }));
  }
}
class Es {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function kw({ top: i, left: e, right: a, bottom: o }) {
  return {
    x: { min: e, max: a },
    y: { min: i, max: o }
  };
}
function Qz({ x: i, y: e }) {
  return { top: e.min, right: i.max, bottom: e.max, left: i.min };
}
function Zz(i, e) {
  if (!e)
    return i;
  const a = e({ x: i.left, y: i.top }), o = e({ x: i.right, y: i.bottom });
  return {
    top: a.y,
    left: a.x,
    bottom: o.y,
    right: o.x
  };
}
function Sd(i) {
  return i === void 0 || i === 1;
}
function dm({ scale: i, scaleX: e, scaleY: a }) {
  return !Sd(i) || !Sd(e) || !Sd(a);
}
function na(i) {
  return dm(i) || Nw(i) || i.z || i.rotate || i.rotateX || i.rotateY || i.skewX || i.skewY;
}
function Nw(i) {
  return _0(i.x) || _0(i.y);
}
function _0(i) {
  return i && i !== "0%";
}
function cc(i, e, a) {
  const o = i - a, r = e * o;
  return a + r;
}
function M0(i, e, a, o, r) {
  return r !== void 0 && (i = cc(i, r, o)), cc(i, a, o) + e;
}
function mm(i, e = 0, a = 1, o, r) {
  i.min = M0(i.min, e, a, o, r), i.max = M0(i.max, e, a, o, r);
}
function Lw(i, { x: e, y: a }) {
  mm(i.x, e.translate, e.scale, e.originPoint), mm(i.y, a.translate, a.scale, a.originPoint);
}
const z0 = 0.999999999999, A0 = 1.0000000000001;
function Fz(i, e, a, o = !1) {
  var d;
  const r = a.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let m = 0; m < r; m++) {
    c = a[m], f = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (o && c.options.layoutScroll && c.scroll && c !== c.root && (ci(i.x, -c.scroll.offset.x), ci(i.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, Lw(i, f)), o && na(c.latestValues) && Iu(i, c.latestValues, (d = c.layout) == null ? void 0 : d.layoutBox));
  }
  e.x < A0 && e.x > z0 && (e.x = 1), e.y < A0 && e.y > z0 && (e.y = 1);
}
function ci(i, e) {
  i.min += e, i.max += e;
}
function O0(i, e, a, o, r = 0.5) {
  const c = Pt(i.min, i.max, r);
  mm(i, e, a, c, o);
}
function D0(i, e) {
  return typeof i == "string" ? parseFloat(i) / 100 * (e.max - e.min) : i;
}
function Iu(i, e, a) {
  const o = a ?? i;
  O0(i.x, D0(e.x, o.x), e.scaleX, e.scale, e.originX), O0(i.y, D0(e.y, o.y), e.scaleY, e.scale, e.originY);
}
function Bw(i, e) {
  return kw(Zz(i.getBoundingClientRect(), e));
}
function Kz(i, e, a) {
  const o = Bw(i, a), { scroll: r } = e;
  return r && (ci(o.x, r.offset.x), ci(o.y, r.offset.y)), o;
}
const Iz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Jz = ko.length;
function $z(i, e, a) {
  let o = "", r = !0;
  for (let f = 0; f < Jz; f++) {
    const d = ko[f], m = i[d];
    if (m === void 0)
      continue;
    let p = !0;
    if (typeof m == "number")
      p = m === (d.startsWith("scale") ? 1 : 0);
    else {
      const v = parseFloat(m);
      p = d.startsWith("scale") ? v === 1 : v === 0;
    }
    if (!p || a) {
      const v = hm(m, lc[d]);
      if (!p) {
        r = !1;
        const g = Iz[d] || d;
        o += `${g}(${v}) `;
      }
      a && (e[d] = v);
    }
  }
  const c = i.pathRotation;
  return c && (r = !1, o += `rotate(${hm(c, lc.pathRotation)}) `), o = o.trim(), a ? o = a(e, r ? "" : o) : r && (o = "none"), o;
}
function sp(i, e, a) {
  const { style: o, vars: r, transformOrigin: c } = i;
  let f = !1, d = !1;
  for (const m in e) {
    const p = e[m];
    if (No.has(m)) {
      f = !0;
      continue;
    } else if (ZS(m)) {
      r[m] = p;
      continue;
    } else {
      const v = hm(p, lc[m]);
      m.startsWith("origin") ? (d = !0, c[m] = v) : o[m] = v;
    }
  }
  if (e.transform || (f || a ? o.transform = $z(e, i.transform, a) : o.transform && (o.transform = "none")), d) {
    const { originX: m = "50%", originY: p = "50%", originZ: v = 0 } = c;
    o.transformOrigin = `${m} ${p} ${v}`;
  }
}
function Uw(i, { style: e, vars: a }, o, r) {
  const c = i.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r == null || r.applyProjectionStyles(c, o);
  for (f in a)
    c.setProperty(f, a[f]);
}
function R0(i, e) {
  return e.max === e.min ? 0 : i / (e.max - e.min) * 100;
}
const Rl = {
  correct: (i, e) => {
    if (!e.target)
      return i;
    if (typeof i == "string")
      if (it.test(i))
        i = parseFloat(i);
      else
        return i;
    const a = R0(i, e.target.x), o = R0(i, e.target.y);
    return `${a}% ${o}%`;
  }
}, Wz = {
  correct: (i, { treeScale: e, projectionDelta: a }) => {
    const o = i, r = Pn.parse(i);
    if (r.length > 5)
      return o;
    const c = Pn.createTransformer(i), f = typeof r[0] != "number" ? 1 : 0, d = a.x.scale * e.x, m = a.y.scale * e.y;
    r[0 + f] /= d, r[1 + f] /= m;
    const p = Pt(d, m, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= p), typeof r[3 + f] == "number" && (r[3 + f] /= p), c(r);
  }
}, pm = {
  borderRadius: {
    ...Rl,
    applyTo: [...Jm]
  },
  borderTopLeftRadius: Rl,
  borderTopRightRadius: Rl,
  borderBottomLeftRadius: Rl,
  borderBottomRightRadius: Rl,
  boxShadow: Wz
};
function Hw(i, { layout: e, layoutId: a }) {
  return No.has(i) || i.startsWith("origin") || (e || a !== void 0) && (!!pm[i] || i === "opacity");
}
function ap(i, e, a) {
  var f;
  const o = i.style, r = e == null ? void 0 : e.style, c = {};
  if (!o)
    return c;
  for (const d in o)
    (ze(o[d]) || r && ze(r[d]) || Hw(d, i) || ((f = a == null ? void 0 : a.getValue(d)) == null ? void 0 : f.liveStyle) !== void 0) && (c[d] = o[d]);
  return c;
}
function tA(i) {
  return window.getComputedStyle(i);
}
class eA extends Vw {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Uw;
  }
  mount(e) {
    mi(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
  }
  readValueFromInstance(e, a) {
    var o;
    if (No.has(a))
      return (o = this.projection) != null && o.isProjecting ? em(a) : wM(e, a);
    {
      const r = tA(e), c = (ZS(a) ? r.getPropertyValue(a) : r[a]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: a }) {
    return Bw(e, a);
  }
  build(e, a, o) {
    sp(e, a, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, a, o) {
    return ap(e, a, o);
  }
}
const nA = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, iA = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function sA(i, e, a = 1, o = 0, r = !0) {
  i.pathLength = 1;
  const c = r ? nA : iA;
  i[c.offset] = `${-o}`, i[c.array] = `${e} ${a}`;
}
const aA = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function jw(i, {
  attrX: e,
  attrY: a,
  attrScale: o,
  pathLength: r,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...d
}, m, p, v) {
  if (sp(i, d, p), m) {
    i.style.viewBox && (i.attrs.viewBox = i.style.viewBox);
    return;
  }
  i.attrs = i.style, i.style = {};
  const { attrs: g, style: b } = i;
  g.transform && (b.transform = g.transform, delete g.transform), (b.transform || g.transformOrigin) && (b.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), b.transform && (b.transformBox = (v == null ? void 0 : v.transformBox) ?? "fill-box", delete g.transformBox);
  for (const S of aA)
    g[S] !== void 0 && (b[S] = g[S], delete g[S]);
  e !== void 0 && (g.x = e), a !== void 0 && (g.y = a), o !== void 0 && (g.scale = o), r !== void 0 && sA(g, r, c, f, !1);
}
const qw = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), Pw = (i) => typeof i == "string" && i.toLowerCase() === "svg";
function oA(i, e, a, o) {
  Uw(i, e, void 0, o);
  for (const r in e.attrs)
    i.setAttribute(qw.has(r) ? r : Im(r), e.attrs[r]);
}
function Gw(i, e, a) {
  const o = ap(i, e, a);
  for (const r in i)
    if (ze(i[r]) || ze(e[r])) {
      const c = ko.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      o[c] = i[r];
    }
  return o;
}
class lA extends Vw {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = fe;
  }
  getBaseTargetFromProps(e, a) {
    return e[a];
  }
  readValueFromInstance(e, a) {
    if (No.has(a)) {
      const o = Tw(a);
      return o && o.default || 0;
    }
    return a = qw.has(a) ? a : Im(a), e.getAttribute(a);
  }
  scrapeMotionValuesFromProps(e, a, o) {
    return Gw(e, a, o);
  }
  build(e, a, o) {
    jw(e, a, this.isSVGTag, o.transformTemplate, o.style);
  }
  renderInstance(e, a, o, r) {
    oA(e, a, o, r);
  }
  mount(e) {
    this.isSVGTag = Pw(e.tagName), super.mount(e);
  }
}
const rA = np.length;
function Yw(i) {
  if (!i)
    return;
  if (!i.isControllingVariants) {
    const a = i.parent ? Yw(i.parent) || {} : {};
    return i.props.initial !== void 0 && (a.initial = i.props.initial), a;
  }
  const e = {};
  for (let a = 0; a < rA; a++) {
    const o = np[a], r = i.props[o];
    (Gl(r) || r === !1) && (e[o] = r);
  }
  return e;
}
function Xw(i, e) {
  if (!Array.isArray(e))
    return !1;
  const a = e.length;
  if (a !== i.length)
    return !1;
  for (let o = 0; o < a; o++)
    if (e[o] !== i[o])
      return !1;
  return !0;
}
const uA = [...ep].reverse(), cA = ep.length;
function fA(i) {
  return (e) => Promise.all(e.map(({ animation: a, options: o }) => xw(i, a, o)));
}
function hA(i) {
  let e = fA(i), a = V0(), o = !0, r = !1;
  const c = (p) => (v, g) => {
    var S;
    const b = fa(i, g, p === "exit" ? (S = i.presenceContext) == null ? void 0 : S.custom : void 0);
    if (b) {
      const { transition: w, transitionEnd: C, ...E } = b;
      v = { ...v, ...E, ...C };
    }
    return v;
  };
  function f(p) {
    e = p(i);
  }
  function d(p) {
    const { props: v } = i, g = Yw(i.parent) || {}, b = [], S = /* @__PURE__ */ new Set();
    let w = {}, C = 1 / 0;
    for (let R = 0; R < cA; R++) {
      const k = uA[R], U = a[k], L = v[k] !== void 0 ? v[k] : g[k], P = Gl(L), J = k === p ? U.isActive : null;
      J === !1 && (C = R);
      let Y = L === g[k] && L !== v[k] && P;
      if (Y && (o || r) && i.manuallyAnimateOnMount && (Y = !1), U.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !U.isActive && J === null || // If we didn't and don't have any defined prop for this animation type
      !L && !U.prevProp || // Or if the prop doesn't define an animation
      Sc(L) || typeof L == "boolean")
        continue;
      if (k === "exit" && U.isActive && J !== !0) {
        U.prevResolvedValues && (w = {
          ...w,
          ...U.prevResolvedValues
        });
        continue;
      }
      const B = dA(U.prevProp, L);
      let rt = B || // If we're making this variant active, we want to always make it active
      k === p && U.isActive && !Y && P || // If we removed a higher-priority variant (i is in reverse order)
      R > C && P, F = !1;
      const pt = Array.isArray(L) ? L : [L];
      let bt = pt.reduce(c(k), {});
      J === !1 && (bt = {});
      const { prevResolvedValues: vt = {} } = U, kt = {
        ...vt,
        ...bt
      }, zt = (I) => {
        rt = !0, S.has(I) && (F = !0, S.delete(I)), U.needsAnimating[I] = !0;
        const mt = i.getValue(I);
        mt && (mt.liveStyle = !1);
      };
      for (const I in kt) {
        const mt = bt[I], X = vt[I];
        if (w.hasOwnProperty(I))
          continue;
        let Wt = !1;
        lm(mt) && lm(X) ? Wt = !Xw(mt, X) || B : Wt = mt !== X, Wt ? mt != null ? zt(I) : S.add(I) : mt !== void 0 && S.has(I) ? zt(I) : U.protectedKeys[I] = !0;
      }
      U.prevProp = L, U.prevResolvedValues = bt, U.isActive && (w = { ...w, ...bt }), (o || r) && i.blockInitialAnimation && (rt = !1);
      const G = Y && B;
      rt && (!G || F) && b.push(...pt.map((I) => {
        const mt = { type: k };
        if (typeof I == "string" && (o || r) && !G && i.manuallyAnimateOnMount && i.parent) {
          const { parent: X } = i, Wt = fa(X, I);
          if (X.enteringChildren && Wt) {
            const { delayChildren: Ye } = Wt.transition || {};
            mt.delay = dw(X.enteringChildren, i, Ye);
          }
        }
        return {
          animation: I,
          options: mt
        };
      }));
    }
    if (S.size) {
      const R = {};
      if (typeof v.initial != "boolean") {
        const k = fa(i, Array.isArray(v.initial) ? v.initial[0] : v.initial);
        k && k.transition && (R.transition = k.transition);
      }
      S.forEach((k) => {
        const U = i.getBaseTarget(k), L = i.getValue(k);
        L && (L.liveStyle = !0), R[k] = U ?? null;
      }), b.push({ animation: R });
    }
    let E = !!b.length;
    return o && (v.initial === !1 || v.initial === v.animate) && !i.manuallyAnimateOnMount && (E = !1), o = !1, r = !1, E ? e(b) : Promise.resolve();
  }
  function m(p, v) {
    var b;
    if (a[p].isActive === v)
      return Promise.resolve();
    (b = i.variantChildren) == null || b.forEach((S) => {
      var w;
      return (w = S.animationState) == null ? void 0 : w.setActive(p, v);
    }), a[p].isActive = v;
    const g = d(p);
    for (const S in a)
      a[S].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: d,
    setActive: m,
    setAnimateFunction: f,
    getState: () => a,
    reset: () => {
      a = V0(), r = !0;
    }
  };
}
function dA(i, e) {
  return typeof e == "string" ? e !== i : Array.isArray(e) ? !Xw(e, i) : !1;
}
function Ks(i = !1) {
  return {
    isActive: i,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function V0() {
  return {
    animate: Ks(!0),
    whileInView: Ks(),
    whileHover: Ks(),
    whileTap: Ks(),
    whileDrag: Ks(),
    whileFocus: Ks(),
    exit: Ks()
  };
}
function ym(i, e) {
  i.min = e.min, i.max = e.max;
}
function Bn(i, e) {
  ym(i.x, e.x), ym(i.y, e.y);
}
function k0(i, e) {
  i.translate = e.translate, i.scale = e.scale, i.originPoint = e.originPoint, i.origin = e.origin;
}
const Qw = 1e-4, mA = 1 - Qw, pA = 1 + Qw, Zw = 0.01, yA = 0 - Zw, gA = 0 + Zw;
function Pe(i) {
  return i.max - i.min;
}
function vA(i, e, a) {
  return Math.abs(i - e) <= a;
}
function N0(i, e, a, o = 0.5) {
  i.origin = o, i.originPoint = Pt(e.min, e.max, i.origin), i.scale = Pe(a) / Pe(e), i.translate = Pt(a.min, a.max, i.origin) - i.originPoint, (i.scale >= mA && i.scale <= pA || isNaN(i.scale)) && (i.scale = 1), (i.translate >= yA && i.translate <= gA || isNaN(i.translate)) && (i.translate = 0);
}
function Ul(i, e, a, o) {
  N0(i.x, e.x, a.x, o ? o.originX : void 0), N0(i.y, e.y, a.y, o ? o.originY : void 0);
}
function L0(i, e, a, o = 0) {
  const r = o ? Pt(a.min, a.max, o) : a.min;
  i.min = r + e.min, i.max = i.min + Pe(e);
}
function bA(i, e, a, o) {
  L0(i.x, e.x, a.x, o == null ? void 0 : o.x), L0(i.y, e.y, a.y, o == null ? void 0 : o.y);
}
function B0(i, e, a, o = 0) {
  const r = o ? Pt(a.min, a.max, o) : a.min;
  i.min = e.min - r, i.max = i.min + Pe(e);
}
function fc(i, e, a, o) {
  B0(i.x, e.x, a.x, o == null ? void 0 : o.x), B0(i.y, e.y, a.y, o == null ? void 0 : o.y);
}
function U0(i, e, a, o, r) {
  return i -= e, i = cc(i, 1 / a, o), r !== void 0 && (i = cc(i, 1 / r, o)), i;
}
function xA(i, e = 0, a = 1, o = 0.5, r, c = i, f = i) {
  if (hi.test(e) && (e = parseFloat(e), e = Pt(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let d = Pt(c.min, c.max, o);
  i === c && (d -= e), i.min = U0(i.min, e, a, d, r), i.max = U0(i.max, e, a, d, r);
}
function H0(i, e, [a, o, r], c, f) {
  xA(i, e[a], e[o], e[r], e.scale, c, f);
}
const SA = ["x", "scaleX", "originX"], wA = ["y", "scaleY", "originY"];
function j0(i, e, a, o) {
  H0(i.x, e, SA, a ? a.x : void 0, o ? o.x : void 0), H0(i.y, e, wA, a ? a.y : void 0, o ? o.y : void 0);
}
function q0(i) {
  return i.translate === 0 && i.scale === 1;
}
function Fw(i) {
  return q0(i.x) && q0(i.y);
}
function P0(i, e) {
  return i.min === e.min && i.max === e.max;
}
function TA(i, e) {
  return P0(i.x, e.x) && P0(i.y, e.y);
}
function G0(i, e) {
  return Math.round(i.min) === Math.round(e.min) && Math.round(i.max) === Math.round(e.max);
}
function Kw(i, e) {
  return G0(i.x, e.x) && G0(i.y, e.y);
}
function Y0(i) {
  return Pe(i.x) / Pe(i.y);
}
function X0(i, e) {
  return i.translate === e.translate && i.scale === e.scale && i.originPoint === e.originPoint;
}
function ri(i) {
  return [i("x"), i("y")];
}
function EA(i, e, a) {
  let o = "";
  const r = i.x.translate / e.x, c = i.y.translate / e.y, f = (a == null ? void 0 : a.z) || 0;
  if ((r || c || f) && (o = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (o += `scale(${1 / e.x}, ${1 / e.y}) `), a) {
    const { transformPerspective: p, rotate: v, pathRotation: g, rotateX: b, rotateY: S, skewX: w, skewY: C } = a;
    p && (o = `perspective(${p}px) ${o}`), v && (o += `rotate(${v}deg) `), g && (o += `rotate(${g}deg) `), b && (o += `rotateX(${b}deg) `), S && (o += `rotateY(${S}deg) `), w && (o += `skewX(${w}deg) `), C && (o += `skewY(${C}deg) `);
  }
  const d = i.x.scale * e.x, m = i.y.scale * e.y;
  return (d !== 1 || m !== 1) && (o += `scale(${d}, ${m})`), o || "none";
}
const CA = Jm.length, Q0 = (i) => typeof i == "string" ? parseFloat(i) : i, Z0 = (i) => typeof i == "number" || it.test(i);
function _A(i, e, a, o, r, c) {
  r ? (i.opacity = Pt(0, a.opacity ?? 1, MA(o)), i.opacityExit = Pt(e.opacity ?? 1, 0, zA(o))) : c && (i.opacity = Pt(e.opacity ?? 1, a.opacity ?? 1, o));
  for (let f = 0; f < CA; f++) {
    const d = Jm[f];
    let m = F0(e, d), p = F0(a, d);
    if (m === void 0 && p === void 0)
      continue;
    m || (m = 0), p || (p = 0), m === 0 || p === 0 || Z0(m) === Z0(p) ? (i[d] = Math.max(Pt(Q0(m), Q0(p), o), 0), (hi.test(p) || hi.test(m)) && (i[d] += "%")) : i[d] = p;
  }
  (e.rotate || a.rotate) && (i.rotate = Pt(e.rotate || 0, a.rotate || 0, o));
}
function F0(i, e) {
  return i[e] !== void 0 ? i[e] : i.borderRadius;
}
const MA = /* @__PURE__ */ Iw(0, 0.5, qS), zA = /* @__PURE__ */ Iw(0.5, 0.95, zn);
function Iw(i, e, a) {
  return (o) => o < i ? 0 : o > e ? 1 : a(/* @__PURE__ */ ql(i, e, o));
}
function AA(i, e, a) {
  const o = ze(i) ? i : Mo(i);
  return o.start(Zm("", o, e, a)), o.animation;
}
function Yl(i, e, a, o = { passive: !0 }) {
  return i.addEventListener(e, a, o), () => i.removeEventListener(e, a, o);
}
const OA = (i, e) => i.depth - e.depth;
class DA {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Nm(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    nc(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(OA), this.isDirty = !1, this.children.forEach(e);
  }
}
function RA(i, e) {
  const a = qe.now(), o = ({ timestamp: r }) => {
    const c = r - a;
    c >= e && (Ss(o), i(c - e));
  };
  return Gt.setup(o, !0), () => Ss(o);
}
function Ju(i) {
  return ze(i) ? i.get() : i;
}
class VA {
  constructor() {
    this.members = [];
  }
  add(e) {
    Nm(this.members, e);
    for (let a = this.members.length - 1; a >= 0; a--) {
      const o = this.members[a];
      if (o === e || o === this.lead || o === this.prevLead)
        continue;
      const r = o.instance;
      (!r || r.isConnected === !1) && !o.snapshot && (nc(this.members, o), o.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (nc(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const a = this.members[this.members.length - 1];
      a && this.promote(a);
    }
  }
  relegate(e) {
    var a;
    for (let o = this.members.indexOf(e) - 1; o >= 0; o--) {
      const r = this.members[o];
      if (r.isPresent !== !1 && ((a = r.instance) == null ? void 0 : a.isConnected) !== !1)
        return this.promote(r), !0;
    }
    return !1;
  }
  promote(e, a) {
    var r;
    const o = this.lead;
    if (e !== o && (this.prevLead = o, this.lead = e, e.show(), o)) {
      o.updateSnapshot(), e.scheduleRender();
      const { layoutDependency: c } = o.options, { layoutDependency: f } = e.options;
      (c === void 0 || c !== f) && (e.resumeFrom = o, a && (o.preserveOpacity = !0), o.snapshot && (e.snapshot = o.snapshot, e.snapshot.latestValues = o.animationValues || o.latestValues), (r = e.root) != null && r.isUpdating && (e.isLayoutDirty = !0)), e.options.crossfade === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      var a, o, r, c, f;
      (o = (a = e.options).onExitComplete) == null || o.call(a), (f = (r = e.resumingFrom) == null ? void 0 : (c = r.options).onExitComplete) == null || f.call(c);
    });
  }
  scheduleRender() {
    this.members.forEach((e) => e.instance && e.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    var e;
    (e = this.lead) != null && e.snapshot && (this.lead.snapshot = void 0);
  }
}
const $u = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, wd = ["", "X", "Y", "Z"], kA = 1e3;
let NA = 0;
function Td(i, e, a, o) {
  const { latestValues: r } = e;
  r[i] && (a[i] = r[i], e.setStaticValue(i, 0), o && (o[i] = 0));
}
function Jw(i) {
  if (i.hasCheckedOptimisedAppear = !0, i.root === i)
    return;
  const { visualElement: e } = i.options;
  if (!e)
    return;
  const a = vw(e);
  if (window.MotionHasOptimisedAnimation(a, "transform")) {
    const { layout: r, layoutId: c } = i.options;
    window.MotionCancelOptimisedAnimation(a, "transform", Gt, !(r || c));
  }
  const { parent: o } = i;
  o && !o.hasCheckedOptimisedAppear && Jw(o);
}
function $w({ attachResizeListener: i, defaultParent: e, measureScroll: a, checkIsScrollRoot: o, resetTransform: r }) {
  return class {
    constructor(f = {}, d = e == null ? void 0 : e()) {
      this.id = NA++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(UA), this.nodes.forEach(YA), this.nodes.forEach(XA), this.nodes.forEach(HA);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = d ? d.root || d : this, this.path = d ? [...d.path, d] : [], this.parent = d, this.depth = d ? d.depth + 1 : 0;
      for (let m = 0; m < this.path.length; m++)
        this.path[m].shouldResetTransform = !0;
      this.root === this && (this.nodes = new DA());
    }
    addEventListener(f, d) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new Lm()), this.eventHandlers.get(f).add(d);
    }
    notifyListeners(f, ...d) {
      const m = this.eventHandlers.get(f);
      m && m.notify(...d);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    /**
     * Lifecycles
     */
    mount(f) {
      if (this.instance)
        return;
      this.isSVG = tp(f) && !Uz(f), this.instance = f;
      const { layoutId: d, layout: m, visualElement: p } = this.options;
      if (p && !p.current && p.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (m || d) && (this.isLayoutDirty = !0), i) {
        let v, g = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Gt.read(() => {
          g = window.innerWidth;
        }), i(f, () => {
          const S = window.innerWidth;
          S !== g && (g = S, this.root.updateBlockedByResize = !0, v && v(), v = RA(b, 250), $u.hasAnimatedSinceResize && ($u.hasAnimatedSinceResize = !1, this.nodes.forEach(J0)));
        });
      }
      d && this.root.registerSharedNode(d, this), this.options.animate !== !1 && p && (d || m) && this.addEventListener("didUpdate", ({ delta: v, hasLayoutChanged: g, hasRelativeLayoutChanged: b, layout: S }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || p.getDefaultTransition() || IA, { onLayoutAnimationStart: C, onLayoutAnimationComplete: E } = p.getProps(), R = !this.targetLayout || !Kw(this.targetLayout, S), k = !g && b;
        if (this.options.layoutRoot || this.resumeFrom || k || g && (R || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const U = {
            ...Qm(w, "layout"),
            onPlay: C,
            onComplete: E
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (U.delay = 0, U.type = !1), this.startAnimation(U), this.setAnimationOrigin(v, k, U.path);
        } else
          g || J0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = S;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Ss(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(QA), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Jw(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let v = 0; v < this.path.length; v++) {
        const g = this.path[v];
        g.shouldResetTransform = !0, (typeof g.latestValues.x == "string" || typeof g.latestValues.y == "string") && (g.isLayoutDirty = !0), g.updateScroll("snapshot"), g.options.layoutRoot && g.willUpdate(!1);
      }
      const { layoutId: d, layout: m } = this.options;
      if (d === void 0 && !m)
        return;
      const p = this.getTransformTemplate();
      this.prevTransformTemplateValue = p ? p(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const m = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), m && this.nodes.forEach(qA), this.nodes.forEach(K0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(I0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(PA), this.nodes.forEach(GA), this.nodes.forEach(LA), this.nodes.forEach(BA)) : this.nodes.forEach(I0), this.clearAllSnapshots();
      const d = qe.now();
      _e.delta = di(0, 1e3 / 60, d - _e.timestamp), _e.timestamp = d, _e.isProcessing = !0, md.update.process(_e), md.preRender.process(_e), md.render.process(_e), _e.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, $m.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(jA), this.sharedNodes.forEach(ZA);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Gt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Gt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Pe(this.snapshot.measuredBox.x) && !Pe(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let m = 0; m < this.path.length; m++)
          this.path[m].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = fe()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: d } = this.options;
      d && d.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let d = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (d = !1), d && this.instance) {
        const m = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: m,
          offset: a(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : m
        };
      }
    }
    resetTransform() {
      if (!r)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, d = this.projectionDelta && !Fw(this.projectionDelta), m = this.getTransformTemplate(), p = m ? m(this.latestValues, "") : void 0, v = p !== this.prevTransformTemplateValue;
      f && this.instance && (d || na(this.latestValues) || v) && (r(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const d = this.measurePageBox();
      let m = this.removeElementScroll(d);
      return f && (m = this.removeTransform(m)), JA(m), {
        animationId: this.root.animationId,
        measuredBox: d,
        layoutBox: m,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var p;
      const { visualElement: f } = this.options;
      if (!f)
        return fe();
      const d = f.measureViewportBox();
      if (!(((p = this.scroll) == null ? void 0 : p.wasRoot) || this.path.some($A))) {
        const { scroll: v } = this.root;
        v && (ci(d.x, v.offset.x), ci(d.y, v.offset.y));
      }
      return d;
    }
    removeElementScroll(f) {
      var m;
      const d = fe();
      if (Bn(d, f), (m = this.scroll) != null && m.wasRoot)
        return d;
      for (let p = 0; p < this.path.length; p++) {
        const v = this.path[p], { scroll: g, options: b } = v;
        v !== this.root && g && b.layoutScroll && (g.wasRoot && Bn(d, f), ci(d.x, g.offset.x), ci(d.y, g.offset.y));
      }
      return d;
    }
    applyTransform(f, d = !1, m) {
      var v, g;
      const p = m || fe();
      Bn(p, f);
      for (let b = 0; b < this.path.length; b++) {
        const S = this.path[b];
        !d && S.options.layoutScroll && S.scroll && S !== S.root && (ci(p.x, -S.scroll.offset.x), ci(p.y, -S.scroll.offset.y)), na(S.latestValues) && Iu(p, S.latestValues, (v = S.layout) == null ? void 0 : v.layoutBox);
      }
      return na(this.latestValues) && Iu(p, this.latestValues, (g = this.layout) == null ? void 0 : g.layoutBox), p;
    }
    removeTransform(f) {
      var m;
      const d = fe();
      Bn(d, f);
      for (let p = 0; p < this.path.length; p++) {
        const v = this.path[p];
        if (!na(v.latestValues))
          continue;
        let g;
        v.instance && (dm(v.latestValues) && v.updateSnapshot(), g = fe(), Bn(g, v.measurePageBox())), j0(d, v.latestValues, (m = v.snapshot) == null ? void 0 : m.layoutBox, g);
      }
      return na(this.latestValues) && j0(d, this.latestValues), d;
    }
    setTargetDelta(f) {
      this.targetDelta = f, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== _e.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      var S;
      const d = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = d.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = d.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = d.isSharedProjectionDirty);
      const m = !!this.resumingFrom || this !== d;
      if (!(f || m && this.isSharedProjectionDirty || this.isProjectionDirty || (S = this.parent) != null && S.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: v, layoutId: g } = this.options;
      if (!this.layout || !(v || g))
        return;
      this.resolvedRelativeTargetAt = _e.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = fe(), this.targetWithTransforms = fe()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), bA(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Bn(this.target, this.layout.layoutBox), Lw(this.target, this.targetDelta)) : Bn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || dm(this.parent.latestValues) || Nw(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, d, m) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = fe(), this.relativeTargetOrigin = fe(), fc(this.relativeTargetOrigin, d, m, this.options.layoutAnchor || void 0), Bn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var w;
      const f = this.getLead(), d = !!this.resumingFrom || this !== f;
      let m = !0;
      if ((this.isProjectionDirty || (w = this.parent) != null && w.isProjectionDirty) && (m = !1), d && (this.isSharedProjectionDirty || this.isTransformDirty) && (m = !1), this.resolvedRelativeTargetAt === _e.timestamp && (m = !1), m)
        return;
      const { layout: p, layoutId: v } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(p || v))
        return;
      Bn(this.layoutCorrected, this.layout.layoutBox);
      const g = this.treeScale.x, b = this.treeScale.y;
      Fz(this.layoutCorrected, this.treeScale, this.path, d), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = fe());
      const { target: S } = f;
      if (!S) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (k0(this.prevProjectionDelta.x, this.projectionDelta.x), k0(this.prevProjectionDelta.y, this.projectionDelta.y)), Ul(this.projectionDelta, this.layoutCorrected, S, this.latestValues), (this.treeScale.x !== g || this.treeScale.y !== b || !X0(this.projectionDelta.x, this.prevProjectionDelta.x) || !X0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", S));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      var d;
      if ((d = this.options.visualElement) == null || d.scheduleRender(), f) {
        const m = this.getStack();
        m && m.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = go(), this.projectionDelta = go(), this.projectionDeltaWithTransform = go();
    }
    setAnimationOrigin(f, d = !1, m) {
      const p = this.snapshot, v = p ? p.latestValues : {}, g = { ...this.latestValues }, b = go();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !d;
      const S = fe(), w = p ? p.source : void 0, C = this.layout ? this.layout.source : void 0, E = w !== C, R = this.getStack(), k = !R || R.members.length <= 1, U = !!(E && !k && this.options.crossfade === !0 && !this.path.some(KA));
      this.animationProgress = 0;
      let L;
      const P = m == null ? void 0 : m.interpolateProjection(f);
      this.mixTargetDelta = (J) => {
        const Y = J / 1e3, B = P == null ? void 0 : P(Y);
        B ? (b.x.translate = B.x, b.x.scale = Pt(f.x.scale, 1, Y), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = B.y, b.y.scale = Pt(f.y.scale, 1, Y), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : ($0(b.x, f.x, Y), $0(b.y, f.y, Y)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (fc(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), FA(this.relativeTarget, this.relativeTargetOrigin, S, Y), L && TA(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = fe()), Bn(L, this.relativeTarget)), E && (this.animationValues = g, _A(g, v, this.latestValues, Y, U, k)), B && B.rotate !== void 0 && (this.animationValues || (this.animationValues = g), this.animationValues.pathRotation = B.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = Y;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      var d, m, p;
      this.notifyListeners("animationStart"), (d = this.currentAnimation) == null || d.stop(), (p = (m = this.resumingFrom) == null ? void 0 : m.currentAnimation) == null || p.stop(), this.pendingAnimation && (Ss(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Gt.update(() => {
        $u.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Mo(0)), this.motionValue.jump(0, !1), this.currentAnimation = AA(this.motionValue, [0, 1e3], {
          ...f,
          velocity: 0,
          isSync: !0,
          onUpdate: (v) => {
            this.mixTargetDelta(v), f.onUpdate && f.onUpdate(v);
          },
          onComplete: () => {
            f.onComplete && f.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const f = this.getStack();
      f && f.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(kA), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: d, target: m, layout: p, latestValues: v } = f;
      if (!(!d || !m || !p)) {
        if (this !== f && this.layout && p && Ww(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          m = this.target || fe();
          const g = Pe(this.layout.layoutBox.x);
          m.x.min = f.target.x.min, m.x.max = m.x.min + g;
          const b = Pe(this.layout.layoutBox.y);
          m.y.min = f.target.y.min, m.y.max = m.y.min + b;
        }
        Bn(d, m), Iu(d, v), Ul(this.projectionDeltaWithTransform, this.layoutCorrected, d, v);
      }
    }
    registerSharedNode(f, d) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new VA()), this.sharedNodes.get(f).add(d);
      const p = d.options.initialPromotionConfig;
      d.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity: p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(d) : void 0
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      var d;
      const { layoutId: f } = this.options;
      return f ? ((d = this.getStack()) == null ? void 0 : d.lead) || this : this;
    }
    getPrevLead() {
      var d;
      const { layoutId: f } = this.options;
      return f ? (d = this.getStack()) == null ? void 0 : d.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f)
        return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: d, preserveFollowOpacity: m } = {}) {
      const p = this.getStack();
      p && p.promote(this, m), f && (this.projectionDelta = void 0, this.needsReset = !0), d && this.setOptions({ transition: d });
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f)
        return;
      let d = !1;
      const { latestValues: m } = f;
      if ((m.z || m.rotate || m.rotateX || m.rotateY || m.rotateZ || m.skewX || m.skewY) && (d = !0), !d)
        return;
      const p = {};
      m.z && Td("z", f, p, this.animationValues);
      for (let v = 0; v < wd.length; v++)
        Td(`rotate${wd[v]}`, f, p, this.animationValues), Td(`skew${wd[v]}`, f, p, this.animationValues);
      f.render();
      for (const v in p)
        f.setStaticValue(v, p[v]), this.animationValues && (this.animationValues[v] = p[v]);
      f.scheduleRender();
    }
    applyProjectionStyles(f, d) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = Ju(d == null ? void 0 : d.pointerEvents) || "", f.transform = m ? m(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = Ju(d == null ? void 0 : d.pointerEvents) || ""), this.hasProjected && !na(this.latestValues) && (f.transform = m ? m({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const v = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let g = EA(this.projectionDeltaWithTransform, this.treeScale, v);
      m && (g = m(v, g)), f.transform = g;
      const { x: b, y: S } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${S.origin * 100}% 0`, p.animationValues ? f.opacity = p === this ? v.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : v.opacityExit : f.opacity = p === this ? v.opacity !== void 0 ? v.opacity : "" : v.opacityExit !== void 0 ? v.opacityExit : 0;
      for (const w in pm) {
        if (v[w] === void 0)
          continue;
        const { correct: C, applyTo: E, isCSSVariable: R } = pm[w], k = g === "none" ? v[w] : C(v[w], p);
        if (E) {
          const U = E.length;
          for (let L = 0; L < U; L++)
            f[E[L]] = k;
        } else
          R ? this.options.visualElement.renderState.vars[w] = k : f[w] = k;
      }
      this.options.layoutId && (f.pointerEvents = p === this ? Ju(d == null ? void 0 : d.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => {
        var d;
        return (d = f.currentAnimation) == null ? void 0 : d.stop();
      }), this.root.nodes.forEach(K0), this.root.sharedNodes.clear();
    }
  };
}
function LA(i) {
  i.updateLayout();
}
function BA(i) {
  var a;
  const e = ((a = i.resumeFrom) == null ? void 0 : a.snapshot) || i.snapshot;
  if (i.isLead() && i.layout && e && i.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: r } = i.layout, { animationType: c } = i.options, f = e.source !== i.layout.source;
    if (c === "size")
      ri((g) => {
        const b = f ? e.measuredBox[g] : e.layoutBox[g], S = Pe(b);
        b.min = o[g].min, b.max = b.min + S;
      });
    else if (c === "x" || c === "y") {
      const g = c === "x" ? "y" : "x";
      ym(f ? e.measuredBox[g] : e.layoutBox[g], o[g]);
    } else Ww(c, e.layoutBox, o) && ri((g) => {
      const b = f ? e.measuredBox[g] : e.layoutBox[g], S = Pe(o[g]);
      b.max = b.min + S, i.relativeTarget && !i.currentAnimation && (i.isProjectionDirty = !0, i.relativeTarget[g].max = i.relativeTarget[g].min + S);
    });
    const d = go();
    Ul(d, o, e.layoutBox);
    const m = go();
    f ? Ul(m, i.applyTransform(r, !0), e.measuredBox) : Ul(m, o, e.layoutBox);
    const p = !Fw(d);
    let v = !1;
    if (!i.resumeFrom) {
      const g = i.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: b, layout: S } = g;
        if (b && S) {
          const w = i.options.layoutAnchor || void 0, C = fe();
          fc(C, e.layoutBox, b.layoutBox, w);
          const E = fe();
          fc(E, o, S.layoutBox, w), Kw(C, E) || (v = !0), g.options.layoutRoot && (i.relativeTarget = E, i.relativeTargetOrigin = C, i.relativeParent = g);
        }
      }
    }
    i.notifyListeners("didUpdate", {
      layout: o,
      snapshot: e,
      delta: m,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: v
    });
  } else if (i.isLead()) {
    const { onExitComplete: o } = i.options;
    o && o();
  }
  i.options.transition = void 0;
}
function UA(i) {
  i.parent && (i.isProjecting() || (i.isProjectionDirty = i.parent.isProjectionDirty), i.isSharedProjectionDirty || (i.isSharedProjectionDirty = !!(i.isProjectionDirty || i.parent.isProjectionDirty || i.parent.isSharedProjectionDirty)), i.isTransformDirty || (i.isTransformDirty = i.parent.isTransformDirty));
}
function HA(i) {
  i.isProjectionDirty = i.isSharedProjectionDirty = i.isTransformDirty = !1;
}
function jA(i) {
  i.clearSnapshot();
}
function K0(i) {
  i.clearMeasurements();
}
function qA(i) {
  i.isLayoutDirty = !0, i.updateLayout();
}
function I0(i) {
  i.isLayoutDirty = !1;
}
function PA(i) {
  i.isAnimationBlocked && i.layout && !i.isLayoutDirty && (i.snapshot = i.layout, i.isLayoutDirty = !0);
}
function GA(i) {
  const { visualElement: e } = i.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), i.resetTransform();
}
function J0(i) {
  i.finishAnimation(), i.targetDelta = i.relativeTarget = i.target = void 0, i.isProjectionDirty = !0;
}
function YA(i) {
  i.resolveTargetDelta();
}
function XA(i) {
  i.calcProjection();
}
function QA(i) {
  i.resetSkewAndRotation();
}
function ZA(i) {
  i.removeLeadSnapshot();
}
function $0(i, e, a) {
  i.translate = Pt(e.translate, 0, a), i.scale = Pt(e.scale, 1, a), i.origin = e.origin, i.originPoint = e.originPoint;
}
function W0(i, e, a, o) {
  i.min = Pt(e.min, a.min, o), i.max = Pt(e.max, a.max, o);
}
function FA(i, e, a, o) {
  W0(i.x, e.x, a.x, o), W0(i.y, e.y, a.y, o);
}
function KA(i) {
  return i.animationValues && i.animationValues.opacityExit !== void 0;
}
const IA = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, tx = (i) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(i), ex = tx("applewebkit/") && !tx("chrome/") ? Math.round : zn;
function nx(i) {
  i.min = ex(i.min), i.max = ex(i.max);
}
function JA(i) {
  nx(i.x), nx(i.y);
}
function Ww(i, e, a) {
  return i === "position" || i === "preserve-aspect" && !vA(Y0(e), Y0(a), 0.2);
}
function $A(i) {
  var e;
  return i !== i.root && ((e = i.scroll) == null ? void 0 : e.wasRoot);
}
const WA = $w({
  attachResizeListener: (i, e) => Yl(i, "resize", e),
  measureScroll: () => {
    var i, e;
    return {
      x: document.documentElement.scrollLeft || ((i = document.body) == null ? void 0 : i.scrollLeft) || 0,
      y: document.documentElement.scrollTop || ((e = document.body) == null ? void 0 : e.scrollTop) || 0
    };
  },
  checkIsScrollRoot: () => !0
}), Ed = {
  current: void 0
}, t1 = $w({
  measureScroll: (i) => ({
    x: i.scrollLeft,
    y: i.scrollTop
  }),
  defaultParent: () => {
    if (!Ed.current) {
      const i = new WA({});
      i.mount(window), i.setOptions({ layoutScroll: !0 }), Ed.current = i;
    }
    return Ed.current;
  },
  resetTransform: (i, e) => {
    i.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (i) => window.getComputedStyle(i).position === "fixed"
}), e1 = ht.createContext({
  transformPagePoint: (i) => i,
  isStatic: !1,
  reducedMotion: "never"
});
function tO(i = !0) {
  const e = ht.useContext(km);
  if (e === null)
    return [!0, null];
  const { isPresent: a, onExitComplete: o, register: r } = e, c = ht.useId();
  ht.useEffect(() => {
    if (i)
      return r(c);
  }, [i]);
  const f = ht.useCallback(() => i && o && o(c), [c, o, i]);
  return !a && o ? [!1, f] : [!0];
}
const n1 = ht.createContext({ strict: !1 }), ix = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let sx = !1;
function eO() {
  if (sx)
    return;
  const i = {};
  for (const e in ix)
    i[e] = {
      isEnabled: (a) => ix[e].some((o) => !!a[o])
    };
  Rw(i), sx = !0;
}
function i1() {
  return eO(), Yz();
}
function nO(i) {
  const e = i1();
  for (const a in i)
    e[a] = {
      ...e[a],
      ...i[a]
    };
  Rw(e);
}
const iO = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function hc(i) {
  return i.startsWith("while") || i.startsWith("drag") && i !== "draggable" || i.startsWith("layout") || i.startsWith("onTap") || i.startsWith("onPan") || i.startsWith("onLayout") || iO.has(i);
}
let s1 = (i) => !hc(i);
function sO(i) {
  typeof i == "function" && (s1 = (e) => e.startsWith("on") ? !hc(e) : i(e));
}
try {
  sO(require("@emotion/is-prop-valid").default);
} catch {
}
function aO(i, e, a) {
  const o = {};
  for (const r in i)
    r === "values" && typeof i.values == "object" || ze(i[r]) || (s1(r) || a === !0 && hc(r) || !e && !hc(r) || // If trying to use native HTML drag events, forward drag listeners
    i.draggable && r.startsWith("onDrag")) && (o[r] = i[r]);
  return o;
}
const Tc = /* @__PURE__ */ ht.createContext({});
function oO(i, e) {
  if (wc(i)) {
    const { initial: a, animate: o } = i;
    return {
      initial: a === !1 || Gl(a) ? a : void 0,
      animate: Gl(o) ? o : void 0
    };
  }
  return i.inherit !== !1 ? e : {};
}
function lO(i) {
  const { initial: e, animate: a } = oO(i, ht.useContext(Tc));
  return ht.useMemo(() => ({ initial: e, animate: a }), [ax(e), ax(a)]);
}
function ax(i) {
  return Array.isArray(i) ? i.join(" ") : i;
}
const op = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function a1(i, e, a) {
  for (const o in e)
    !ze(e[o]) && !Hw(o, a) && (i[o] = e[o]);
}
function rO({ transformTemplate: i }, e) {
  return ht.useMemo(() => {
    const a = op();
    return sp(a, e, i), Object.assign({}, a.vars, a.style);
  }, [e]);
}
function uO(i, e) {
  const a = i.style || {}, o = {};
  return a1(o, a, i), Object.assign(o, rO(i, e)), o;
}
function cO(i, e) {
  const a = {}, o = uO(i, e);
  return i.drag && i.dragListener !== !1 && (a.draggable = !1, o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none", o.touchAction = i.drag === !0 ? "none" : `pan-${i.drag === "x" ? "y" : "x"}`), i.tabIndex === void 0 && (i.onTap || i.onTapStart || i.whileTap) && (a.tabIndex = 0), a.style = o, a;
}
const o1 = () => ({
  ...op(),
  attrs: {}
});
function fO(i, e, a, o) {
  const r = ht.useMemo(() => {
    const c = o1();
    return jw(c, e, Pw(o), i.transformTemplate, i.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (i.style) {
    const c = {};
    a1(c, i.style, i), r.style = { ...c, ...r.style };
  }
  return r;
}
const hO = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function lp(i) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof i != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    i.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(hO.indexOf(i) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(i))
    )
  );
}
function dO(i, e, a, { latestValues: o }, r, c = !1, f) {
  const m = (f ?? lp(i) ? fO : cO)(e, o, r, i), p = aO(e, typeof i == "string", c), v = i !== ht.Fragment ? { ...p, ...m, ref: a } : {}, { children: g } = e, b = ht.useMemo(() => ze(g) ? g.get() : g, [g]);
  return ht.createElement(i, {
    ...v,
    children: b
  });
}
function mO({ scrapeMotionValuesFromProps: i, createRenderState: e }, a, o, r) {
  return {
    latestValues: pO(a, o, r, i),
    renderState: e()
  };
}
function pO(i, e, a, o) {
  const r = {}, c = o(i, {});
  for (const b in c)
    r[b] = Ju(c[b]);
  let { initial: f, animate: d } = i;
  const m = wc(i), p = Ow(i);
  e && p && !m && i.inherit !== !1 && (f === void 0 && (f = e.initial), d === void 0 && (d = e.animate));
  let v = a ? a.initial === !1 : !1;
  v = v || f === !1;
  const g = v ? d : f;
  if (g && typeof g != "boolean" && !Sc(g)) {
    const b = Array.isArray(g) ? g : [g];
    for (let S = 0; S < b.length; S++) {
      const w = Fm(i, b[S]);
      if (w) {
        const { transitionEnd: C, transition: E, ...R } = w;
        for (const k in R) {
          let U = R[k];
          if (Array.isArray(U)) {
            const L = v ? U.length - 1 : 0;
            U = U[L];
          }
          U !== null && (r[k] = U);
        }
        for (const k in C)
          r[k] = C[k];
      }
    }
  }
  return r;
}
const l1 = (i) => (e, a) => {
  const o = ht.useContext(Tc), r = ht.useContext(km), c = () => mO(i, e, o, r);
  return a ? c() : zS(c);
}, yO = /* @__PURE__ */ l1({
  scrapeMotionValuesFromProps: ap,
  createRenderState: op
}), gO = /* @__PURE__ */ l1({
  scrapeMotionValuesFromProps: Gw,
  createRenderState: o1
}), vO = Symbol.for("motionComponentSymbol");
function bO(i, e, a) {
  const o = ht.useRef(a);
  ht.useInsertionEffect(() => {
    o.current = a;
  });
  const r = ht.useRef(null);
  return ht.useCallback((c) => {
    var d;
    c && ((d = i.onMount) == null || d.call(i, c)), e && (c ? e.mount(c) : e.unmount());
    const f = o.current;
    if (typeof f == "function")
      if (c) {
        const m = f(c);
        typeof m == "function" && (r.current = m);
      } else r.current ? (r.current(), r.current = null) : f(c);
    else f && (f.current = c);
  }, [e]);
}
const r1 = ht.createContext({});
function mo(i) {
  return i && typeof i == "object" && Object.prototype.hasOwnProperty.call(i, "current");
}
function xO(i, e, a, o, r, c) {
  var U, L;
  const { visualElement: f } = ht.useContext(Tc), d = ht.useContext(n1), m = ht.useContext(km), p = ht.useContext(e1), v = p.reducedMotion, g = p.skipAnimations, b = ht.useRef(null), S = ht.useRef(!1);
  o = o || d.renderer, !b.current && o && (b.current = o(i, {
    visualState: e,
    parent: f,
    props: a,
    presenceContext: m,
    blockInitialAnimation: m ? m.initial === !1 : !1,
    reducedMotionConfig: v,
    skipAnimations: g,
    isSVG: c
  }), S.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const w = b.current, C = ht.useContext(r1);
  w && !w.projection && r && (w.type === "html" || w.type === "svg") && SO(b.current, a, r, C);
  const E = ht.useRef(!1);
  ht.useInsertionEffect(() => {
    w && E.current && w.update(a, m);
  });
  const R = a[gw], k = ht.useRef(!!R && typeof window < "u" && !((U = window.MotionHandoffIsComplete) != null && U.call(window, R)) && ((L = window.MotionHasOptimisedAnimation) == null ? void 0 : L.call(window, R)));
  return AS(() => {
    S.current = !0, w && (E.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), k.current && w.animationState && w.animationState.animateChanges());
  }), ht.useEffect(() => {
    w && (!k.current && w.animationState && w.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      var P;
      (P = window.MotionHandoffMarkAsComplete) == null || P.call(window, R);
    }), k.current = !1), w.enteringChildren = void 0);
  }), w;
}
function SO(i, e, a, o) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: d, layoutScroll: m, layoutRoot: p, layoutAnchor: v, layoutCrossfade: g } = e;
  i.projection = new a(i.latestValues, e["data-framer-portal-id"] ? void 0 : u1(i.parent)), i.projection.setOptions({
    layoutId: r,
    layout: c,
    alwaysMeasureLayout: !!f || d && mo(d),
    visualElement: i,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof c == "string" ? c : "both",
    initialPromotionConfig: o,
    crossfade: g,
    layoutScroll: m,
    layoutRoot: p,
    layoutAnchor: v
  });
}
function u1(i) {
  if (i)
    return i.options.allowProjection !== !1 ? i.projection : u1(i.parent);
}
function Cd(i, { forwardMotionProps: e = !1, type: a } = {}, o, r) {
  o && nO(o);
  const c = a ? a === "svg" : lp(i), f = c ? gO : yO;
  function d(p, v) {
    let g;
    const b = {
      ...ht.useContext(e1),
      ...p,
      layoutId: wO(p)
    }, { isStatic: S } = b, w = lO(p), C = f(p, S);
    if (!S && typeof window < "u") {
      TO();
      const E = EO(b);
      g = E.MeasureLayout, w.visualElement = xO(i, C, b, r, E.ProjectionNode, c);
    }
    return Xn.jsxs(Tc.Provider, { value: w, children: [g && w.visualElement ? Xn.jsx(g, { visualElement: w.visualElement, ...b }) : null, dO(i, p, bO(C, w.visualElement, v), C, S, e, c)] });
  }
  d.displayName = `motion.${typeof i == "string" ? i : `create(${i.displayName ?? i.name ?? ""})`}`;
  const m = ht.forwardRef(d);
  return m[vO] = i, m;
}
function wO({ layoutId: i }) {
  const e = ht.useContext(MS).id;
  return e && i !== void 0 ? e + "-" + i : i;
}
function TO(i, e) {
  ht.useContext(n1).strict;
}
function EO(i) {
  const e = i1(), { drag: a, layout: o } = e;
  if (!a && !o)
    return {};
  const r = { ...a, ...o };
  return {
    MeasureLayout: a != null && a.isEnabled(i) || o != null && o.isEnabled(i) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function CO(i, e) {
  if (typeof Proxy > "u")
    return Cd;
  const a = /* @__PURE__ */ new Map(), o = (c, f) => Cd(c, f, i, e), r = (c, f) => o(c, f);
  return new Proxy(r, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, f) => f === "create" ? o : (a.has(f) || a.set(f, Cd(f, void 0, i, e)), a.get(f))
  });
}
const _O = (i, e) => e.isSVG ?? lp(i) ? new lA(e) : new eA(e, {
  allowProjection: i !== ht.Fragment
});
class MO extends Es {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = hA(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Sc(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: a } = this.node.prevProps || {};
    e !== a && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var e;
    this.node.animationState.reset(), (e = this.unmountControls) == null || e.call(this);
  }
}
let zO = 0;
class AO extends Es {
  constructor() {
    super(...arguments), this.id = zO++, this.isExitComplete = !1;
  }
  update() {
    var c;
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: a } = this.node.presenceContext, { isPresent: o } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === o)
      return;
    if (e && o === !1) {
      if (this.isExitComplete) {
        const { initial: f, custom: d } = this.node.getProps();
        if (typeof f == "string" || typeof f == "object" && f !== null && !Array.isArray(f)) {
          const m = fa(this.node, f, d);
          if (m) {
            const { transition: p, transitionEnd: v, ...g } = m;
            for (const b in g)
              (c = this.node.getValue(b)) == null || c.jump(g[b]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const r = this.node.animationState.setActive("exit", !e);
    a && !e && r.then(() => {
      this.isExitComplete = !0, a(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: a } = this.node.presenceContext || {};
    a && a(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const OO = {
  animation: {
    Feature: MO
  },
  exit: {
    Feature: AO
  }
};
function Wl(i) {
  return {
    point: {
      x: i.pageX,
      y: i.pageY
    }
  };
}
const DO = (i) => (e) => Wm(e) && i(e, Wl(e));
function Hl(i, e, a, o) {
  return Yl(i, e, DO(a), o);
}
const c1 = ({ current: i }) => i ? i.ownerDocument.defaultView : null, ox = (i, e) => Math.abs(i - e);
function RO(i, e) {
  const a = ox(i.x, e.x), o = ox(i.y, e.y);
  return Math.sqrt(a ** 2 + o ** 2);
}
const lx = /* @__PURE__ */ new Set(["auto", "scroll"]);
class f1 {
  constructor(e, a, { transformPagePoint: o, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: d } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (w) => {
      this.handleScroll(w.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Vu(this.lastRawMoveEventInfo, this.transformPagePoint));
      const w = _d(this.lastMoveEventInfo, this.history), C = this.startEvent !== null, E = RO(w.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!C && !E)
        return;
      const { point: R } = w, { timestamp: k } = _e;
      this.history.push({ ...R, timestamp: k });
      const { onStart: U, onMove: L } = this.handlers;
      C || (U && U(this.lastMoveEvent, w), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, w);
    }, this.handlePointerMove = (w, C) => {
      this.lastMoveEvent = w, this.lastRawMoveEventInfo = C, this.lastMoveEventInfo = Vu(C, this.transformPagePoint), Gt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (w, C) => {
      this.end();
      const { onEnd: E, onSessionEnd: R, resumeAnimation: k } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && k && k(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const U = _d(w.type === "pointercancel" ? this.lastMoveEventInfo : Vu(C, this.transformPagePoint), this.history);
      this.startEvent && E && E(w, U), R && R(w, U);
    }, !Wm(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = a, this.transformPagePoint = o, this.distanceThreshold = f, this.contextWindow = r || window;
    const m = Wl(e), p = Vu(m, this.transformPagePoint), { point: v } = p, { timestamp: g } = _e;
    this.history = [{ ...v, timestamp: g }];
    const { onSessionStart: b } = a;
    b && b(e, _d(p, this.history));
    const S = { passive: !0, capture: !0 };
    this.removeListeners = Il(Hl(this.contextWindow, "pointermove", this.handlePointerMove, S), Hl(this.contextWindow, "pointerup", this.handlePointerUp, S), Hl(this.contextWindow, "pointercancel", this.handlePointerUp, S)), d && this.startScrollTracking(d);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let a = e.parentElement;
    for (; a; ) {
      const o = getComputedStyle(a);
      (lx.has(o.overflowX) || lx.has(o.overflowY)) && this.scrollPositions.set(a, {
        x: a.scrollLeft,
        y: a.scrollTop
      }), a = a.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(e) {
    const a = this.scrollPositions.get(e);
    if (!a)
      return;
    const o = e === window, r = o ? { x: window.scrollX, y: window.scrollY } : {
      x: e.scrollLeft,
      y: e.scrollTop
    }, c = { x: r.x - a.x, y: r.y - a.y };
    c.x === 0 && c.y === 0 || (o ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(e, r), Gt.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Ss(this.updatePoint);
  }
}
function Vu(i, e) {
  return e ? { point: e(i.point) } : i;
}
function rx(i, e) {
  return { x: i.x - e.x, y: i.y - e.y };
}
function _d({ point: i }, e) {
  return {
    point: i,
    delta: rx(i, h1(e)),
    offset: rx(i, VO(e)),
    velocity: kO(e, 0.1)
  };
}
function VO(i) {
  return i[0];
}
function h1(i) {
  return i[i.length - 1];
}
function kO(i, e) {
  if (i.length < 2)
    return { x: 0, y: 0 };
  let a = i.length - 1, o = null;
  const r = h1(i);
  for (; a >= 0 && (o = i[a], !(r.timestamp - o.timestamp > /* @__PURE__ */ $e(e))); )
    a--;
  if (!o)
    return { x: 0, y: 0 };
  o === i[0] && i.length > 2 && r.timestamp - o.timestamp > /* @__PURE__ */ $e(e) * 2 && (o = i[1]);
  const c = /* @__PURE__ */ _n(r.timestamp - o.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (r.x - o.x) / c,
    y: (r.y - o.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function NO(i, { min: e, max: a }, o) {
  return e !== void 0 && i < e ? i = o ? Pt(e, i, o.min) : Math.max(i, e) : a !== void 0 && i > a && (i = o ? Pt(a, i, o.max) : Math.min(i, a)), i;
}
function ux(i, e, a) {
  return {
    min: e !== void 0 ? i.min + e : void 0,
    max: a !== void 0 ? i.max + a - (i.max - i.min) : void 0
  };
}
function LO(i, { top: e, left: a, bottom: o, right: r }) {
  return {
    x: ux(i.x, a, r),
    y: ux(i.y, e, o)
  };
}
function cx(i, e) {
  let a = e.min - i.min, o = e.max - i.max;
  return e.max - e.min < i.max - i.min && ([a, o] = [o, a]), { min: a, max: o };
}
function BO(i, e) {
  return {
    x: cx(i.x, e.x),
    y: cx(i.y, e.y)
  };
}
function UO(i, e) {
  let a = 0.5;
  const o = Pe(i), r = Pe(e);
  return r > o ? a = /* @__PURE__ */ ql(e.min, e.max - o, i.min) : o > r && (a = /* @__PURE__ */ ql(i.min, i.max - r, e.min)), di(0, 1, a);
}
function HO(i, e) {
  const a = {};
  return e.min !== void 0 && (a.min = e.min - i.min), e.max !== void 0 && (a.max = e.max - i.min), a;
}
const gm = 0.35;
function jO(i = gm) {
  return i === !1 ? i = 0 : i === !0 && (i = gm), {
    x: fx(i, "left", "right"),
    y: fx(i, "top", "bottom")
  };
}
function fx(i, e, a) {
  return {
    min: hx(i, e),
    max: hx(i, a)
  };
}
function hx(i, e) {
  return typeof i == "number" ? i : i[e] || 0;
}
const qO = /* @__PURE__ */ new WeakMap();
class PO {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = fe(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: a = !1, distanceThreshold: o } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const c = (g) => {
      a && this.snapToCursor(Wl(g).point), this.stopAnimation();
    }, f = (g, b) => {
      const { drag: S, dragPropagation: w, onDragStart: C } = this.getProps();
      if (S && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = Sz(S), !this.openDragLock))
        return;
      this.latestPointerEvent = g, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), ri((R) => {
        let k = this.getAxisMotionValue(R).get() || 0;
        if (hi.test(k)) {
          const { projection: U } = this.visualElement;
          if (U && U.layout) {
            const L = U.layout.layoutBox[R];
            L && (k = Pe(L) * (parseFloat(k) / 100));
          }
        }
        this.originPoint[R] = k;
      }), C && Gt.update(() => C(g, b), !1, !0), rm(this.visualElement, "transform");
      const { animationState: E } = this.visualElement;
      E && E.setActive("whileDrag", !0);
    }, d = (g, b) => {
      this.latestPointerEvent = g, this.latestPanInfo = b;
      const { dragPropagation: S, dragDirectionLock: w, onDirectionLock: C, onDrag: E } = this.getProps();
      if (!S && !this.openDragLock)
        return;
      const { offset: R } = b;
      if (w && this.currentDirection === null) {
        this.currentDirection = YO(R), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, R), this.updateAxis("y", b.point, R), this.visualElement.render(), E && Gt.update(() => E(g, b), !1, !0);
    }, m = (g, b) => {
      this.latestPointerEvent = g, this.latestPanInfo = b, this.stop(g, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => {
      const { dragSnapToOrigin: g } = this.getProps();
      (g || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: v } = this.getProps();
    this.panSession = new f1(e, {
      onSessionStart: c,
      onStart: f,
      onMove: d,
      onSessionEnd: m,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: v,
      distanceThreshold: o,
      contextWindow: c1(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(e, a) {
    const o = e || this.latestPointerEvent, r = a || this.latestPanInfo, c = this.isDragging;
    if (this.cancel(), !c || !r || !o)
      return;
    const { velocity: f } = r;
    this.startAnimation(f);
    const { onDragEnd: d } = this.getProps();
    d && Gt.postRender(() => d(o, r));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: a } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: o } = this.getProps();
    !o && this.openDragLock && (this.openDragLock(), this.openDragLock = null), a && a.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, a, o) {
    const { drag: r } = this.getProps();
    if (!o || !ku(e, r, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(e);
    let f = this.originPoint[e] + o[e];
    this.constraints && this.constraints[e] && (f = NO(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    var c;
    const { dragConstraints: e, dragElastic: a } = this.getProps(), o = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (c = this.visualElement.projection) == null ? void 0 : c.layout, r = this.constraints;
    e && mo(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && o ? this.constraints = LO(o.layoutBox, e) : this.constraints = !1, this.elastic = jO(a), r !== this.constraints && !mo(e) && o && this.constraints && !this.hasMutatedConstraints && ri((f) => {
      this.constraints !== !1 && this.getAxisMotionValue(f) && (this.constraints[f] = HO(o.layoutBox[f], this.constraints[f]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: a } = this.getProps();
    if (!e || !mo(e))
      return !1;
    const o = e.current;
    mi(o !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    r.root && (r.root.scroll = void 0, r.root.updateScroll());
    const c = Kz(o, r.root, this.visualElement.getTransformPagePoint());
    let f = BO(r.layout.layoutBox, c);
    if (a) {
      const d = a(Qz(f));
      this.hasMutatedConstraints = !!d, d && (f = kw(d));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: a, dragMomentum: o, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: d } = this.getProps(), m = this.constraints || {}, p = ri((v) => {
      if (!ku(v, a, this.currentDirection))
        return;
      let g = m && m[v] || {};
      (f === !0 || f === v) && (g = { min: 0, max: 0 });
      const b = r ? 200 : 1e6, S = r ? 40 : 1e7, w = {
        type: "inertia",
        velocity: o ? e[v] : 0,
        bounceStiffness: b,
        bounceDamping: S,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...g
      };
      return this.startAxisValueAnimation(v, w);
    });
    return Promise.all(p).then(d);
  }
  startAxisValueAnimation(e, a) {
    const o = this.getAxisMotionValue(e);
    return rm(this.visualElement, e), o.start(Zm(e, o, 0, a, this.visualElement, !1));
  }
  stopAnimation() {
    ri((e) => this.getAxisMotionValue(e).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const a = `_drag${e.toUpperCase()}`, r = this.visualElement.getProps()[a];
    return r || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
  }
  snapToCursor(e) {
    ri((a) => {
      const { drag: o } = this.getProps();
      if (!ku(a, o, this.currentDirection))
        return;
      const { projection: r } = this.visualElement, c = this.getAxisMotionValue(a);
      if (r && r.layout) {
        const { min: f, max: d } = r.layout.layoutBox[a], m = c.get() || 0;
        c.set(e[a] - Pt(f, d, 0.5) + m);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: a } = this.getProps(), { projection: o } = this.visualElement;
    if (!mo(a) || !o || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    ri((f) => {
      const d = this.getAxisMotionValue(f);
      if (d && this.constraints !== !1) {
        const m = d.get();
        r[f] = UO({ min: m, max: m }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", o.root && o.root.updateScroll(), o.updateLayout(), this.constraints = !1, this.resolveConstraints(), ri((f) => {
      if (!ku(f, e, null))
        return;
      const d = this.getAxisMotionValue(f), { min: m, max: p } = this.constraints[f];
      d.set(Pt(m, p, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    qO.set(this.visualElement, this);
    const e = this.visualElement.current, a = Hl(e, "pointerdown", (p) => {
      const { drag: v, dragListener: g = !0 } = this.getProps(), b = p.target, S = b !== e && Mz(b);
      v && g && !S && this.start(p);
    });
    let o;
    const r = () => {
      const { dragConstraints: p } = this.getProps();
      mo(p) && p.current && (this.constraints = this.resolveRefConstraints(), o || (o = GO(e, p.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Gt.read(r);
    const d = Yl(window, "resize", () => this.scalePositionWithinConstraints()), m = c.addEventListener("didUpdate", (({ delta: p, hasLayoutChanged: v }) => {
      this.isDragging && v && (ri((g) => {
        const b = this.getAxisMotionValue(g);
        b && (this.originPoint[g] += p[g].translate, b.set(b.get() + p[g].translate));
      }), this.visualElement.render());
    }));
    return () => {
      d(), a(), f(), m && m(), o && o();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: a = !1, dragDirectionLock: o = !1, dragPropagation: r = !1, dragConstraints: c = !1, dragElastic: f = gm, dragMomentum: d = !0 } = e;
    return {
      ...e,
      drag: a,
      dragDirectionLock: o,
      dragPropagation: r,
      dragConstraints: c,
      dragElastic: f,
      dragMomentum: d
    };
  }
}
function dx(i) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    i();
  };
}
function GO(i, e, a) {
  const o = w0(i, dx(a)), r = w0(e, dx(a));
  return () => {
    o(), r();
  };
}
function ku(i, e, a) {
  return (e === !0 || e === i) && (a === null || a === i);
}
function YO(i, e = 10) {
  let a = null;
  return Math.abs(i.y) > e ? a = "y" : Math.abs(i.x) > e && (a = "x"), a;
}
class XO extends Es {
  constructor(e) {
    super(e), this.removeGroupControls = zn, this.removeListeners = zn, this.controls = new PO(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || zn;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: a } = this.node.prevProps || {};
    e !== a && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Md = (i) => (e, a) => {
  i && Gt.update(() => i(e, a), !1, !0);
};
class QO extends Es {
  constructor() {
    super(...arguments), this.removePointerDownListener = zn;
  }
  onPointerDown(e) {
    this.session = new f1(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: c1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: a, onPan: o, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: Md(e),
      onStart: Md(a),
      onMove: Md(o),
      onEnd: (c, f) => {
        delete this.session, r && Gt.postRender(() => r(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Hl(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let zd = !1;
class ZO extends ht.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: a, switchLayoutGroup: o, layoutId: r } = this.props, { projection: c } = e;
    c && (a.group && a.group.add(c), o && o.register && r && o.register(c), zd && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), $u.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: a, visualElement: o, drag: r, isPresent: c } = this.props, { projection: f } = o;
    return f && (f.isPresent = c, e.layoutDependency !== a && f.setOptions({
      ...f.options,
      layoutDependency: a
    }), zd = !0, r || e.layoutDependency !== a || a === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || Gt.postRender(() => {
      const d = f.getStack();
      (!d || !d.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: a } = this.props, { projection: o } = e;
    o && (o.options.layoutAnchor = a, o.root.didUpdate(), $m.postRender(() => {
      !o.currentAnimation && o.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: a, switchLayoutGroup: o } = this.props, { projection: r } = e;
    zd = !0, r && (r.scheduleCheckAfterUnmount(), a && a.group && a.group.remove(r), o && o.deregister && o.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function d1(i) {
  const [e, a] = tO(), o = ht.useContext(MS);
  return Xn.jsx(ZO, { ...i, layoutGroup: o, switchLayoutGroup: ht.useContext(r1), isPresent: e, safeToRemove: a });
}
const FO = {
  pan: {
    Feature: QO
  },
  drag: {
    Feature: XO,
    ProjectionNode: t1,
    MeasureLayout: d1
  }
};
function mx(i, e, a) {
  const { props: o } = i;
  i.animationState && o.whileHover && i.animationState.setActive("whileHover", a === "Start");
  const r = "onHover" + a, c = o[r];
  c && Gt.postRender(() => c(e, Wl(e)));
}
class KO extends Es {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Tz(e, (a, o) => (mx(this.node, o, "Start"), (r) => mx(this.node, r, "End"))));
  }
  unmount() {
  }
}
class IO extends Es {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Il(Yl(this.node.current, "focus", () => this.onFocus()), Yl(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function px(i, e, a) {
  const { props: o } = i;
  if (i.current instanceof HTMLButtonElement && i.current.disabled)
    return;
  i.animationState && o.whileTap && i.animationState.setActive("whileTap", a === "Start");
  const r = "onTap" + (a === "End" ? "" : a), c = o[r];
  c && Gt.postRender(() => c(e, Wl(e)));
}
class JO extends Es {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: a, propagate: o } = this.node.props;
    this.unmount = Az(e, (r, c) => (px(this.node, c, "Start"), (f, { success: d }) => px(this.node, f, d ? "End" : "Cancel")), {
      useGlobalTarget: a,
      stopPropagation: (o == null ? void 0 : o.tap) === !1
    });
  }
  unmount() {
  }
}
const vm = /* @__PURE__ */ new WeakMap(), Ad = /* @__PURE__ */ new WeakMap(), $O = (i) => {
  const e = vm.get(i.target);
  e && e(i);
}, WO = (i) => {
  i.forEach($O);
};
function tD({ root: i, ...e }) {
  const a = i || document;
  Ad.has(a) || Ad.set(a, {});
  const o = Ad.get(a), r = JSON.stringify(e);
  return o[r] || (o[r] = new IntersectionObserver(WO, { root: i, ...e })), o[r];
}
function eD(i, e, a) {
  const o = tD(e);
  return vm.set(i, a), o.observe(i), () => {
    vm.delete(i), o.unobserve(i);
  };
}
const nD = {
  some: 0,
  all: 1
};
class iD extends Es {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    var m;
    (m = this.stopObserver) == null || m.call(this);
    const { viewport: e = {} } = this.node.getProps(), { root: a, margin: o, amount: r = "some", once: c } = e, f = {
      root: a ? a.current : void 0,
      rootMargin: o,
      threshold: typeof r == "number" ? r : nD[r]
    }, d = (p) => {
      const { isIntersecting: v } = p;
      if (this.isInView === v || (this.isInView = v, c && !v && this.hasEnteredView))
        return;
      v && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", v);
      const { onViewportEnter: g, onViewportLeave: b } = this.node.getProps(), S = v ? g : b;
      S && S(p);
    };
    this.stopObserver = eD(this.node.current, f, d);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: a } = this.node;
    ["amount", "margin", "root"].some(sD(e, a)) && this.startObserver();
  }
  unmount() {
    var e;
    (e = this.stopObserver) == null || e.call(this), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function sD({ viewport: i = {} }, { viewport: e = {} } = {}) {
  return (a) => i[a] !== e[a];
}
const aD = {
  inView: {
    Feature: iD
  },
  tap: {
    Feature: JO
  },
  focus: {
    Feature: IO
  },
  hover: {
    Feature: KO
  }
}, oD = {
  layout: {
    ProjectionNode: t1,
    MeasureLayout: d1
  }
}, lD = {
  ...OO,
  ...aD,
  ...FO,
  ...oD
}, m1 = /* @__PURE__ */ CO(lD, _O);
function rD() {
  !ip.current && Dw();
  const [i] = ht.useState(rc.current);
  return i;
}
function uD(i) {
  i.values.forEach((e) => e.stop());
}
function bm(i, e) {
  [...e].reverse().forEach((o) => {
    const r = i.getVariant(o);
    r && Km(i, r), i.variantChildren && i.variantChildren.forEach((c) => {
      bm(c, e);
    });
  });
}
function cD(i, e) {
  if (Array.isArray(e))
    return bm(i, e);
  if (typeof e == "string")
    return bm(i, [e]);
  Km(i, e);
}
function fD() {
  let i = !1;
  const e = /* @__PURE__ */ new Set(), a = {
    subscribe(o) {
      return e.add(o), () => void e.delete(o);
    },
    start(o, r) {
      mi(i, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");
      const c = [];
      return e.forEach((f) => {
        c.push(xw(f, o, {
          transitionOverride: r
        }));
      }), Promise.all(c);
    },
    set(o) {
      return mi(i, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."), e.forEach((r) => {
        cD(r, o);
      });
    },
    stop() {
      e.forEach((o) => {
        uD(o);
      });
    },
    mount() {
      return i = !0, () => {
        i = !1, a.stop();
      };
    }
  };
  return a;
}
function hD() {
  const i = zS(fD);
  return AS(i.mount, []), i;
}
const dD = hD, mD = m1;
function p1(i) {
  var e, a, o = "";
  if (typeof i == "string" || typeof i == "number") o += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var r = i.length;
    for (e = 0; e < r; e++) i[e] && (a = p1(i[e])) && (o && (o += " "), o += a);
  } else for (a in i) i[a] && (o && (o += " "), o += a);
  return o;
}
function pD() {
  for (var i, e, a = 0, o = "", r = arguments.length; a < r; a++) (i = arguments[a]) && (e = p1(i)) && (o && (o += " "), o += e);
  return o;
}
const yD = (i, e) => {
  const a = new Array(i.length + e.length);
  for (let o = 0; o < i.length; o++)
    a[o] = i[o];
  for (let o = 0; o < e.length; o++)
    a[i.length + o] = e[o];
  return a;
}, gD = (i, e) => ({
  classGroupId: i,
  validator: e
}), y1 = (i = /* @__PURE__ */ new Map(), e = null, a) => ({
  nextPart: i,
  validators: e,
  classGroupId: a
}), dc = "-", yx = [], vD = "arbitrary..", bD = (i) => {
  const e = SD(i), {
    conflictingClassGroups: a,
    conflictingClassGroupModifiers: o
  } = i;
  return {
    getClassGroupId: (f) => {
      if (f.startsWith("[") && f.endsWith("]"))
        return xD(f);
      const d = f.split(dc), m = d[0] === "" && d.length > 1 ? 1 : 0;
      return g1(d, m, e);
    },
    getConflictingClassGroupIds: (f, d) => {
      if (d) {
        const m = o[f], p = a[f];
        return m ? p ? yD(p, m) : m : p || yx;
      }
      return a[f] || yx;
    }
  };
}, g1 = (i, e, a) => {
  if (i.length - e === 0)
    return a.classGroupId;
  const r = i[e], c = a.nextPart.get(r);
  if (c) {
    const p = g1(i, e + 1, c);
    if (p) return p;
  }
  const f = a.validators;
  if (f === null)
    return;
  const d = e === 0 ? i.join(dc) : i.slice(e).join(dc), m = f.length;
  for (let p = 0; p < m; p++) {
    const v = f[p];
    if (v.validator(d))
      return v.classGroupId;
  }
}, xD = (i) => i.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const e = i.slice(1, -1), a = e.indexOf(":"), o = e.slice(0, a);
  return o ? vD + o : void 0;
})(), SD = (i) => {
  const {
    theme: e,
    classGroups: a
  } = i;
  return wD(a, e);
}, wD = (i, e) => {
  const a = y1();
  for (const o in i) {
    const r = i[o];
    rp(r, a, o, e);
  }
  return a;
}, rp = (i, e, a, o) => {
  const r = i.length;
  for (let c = 0; c < r; c++) {
    const f = i[c];
    TD(f, e, a, o);
  }
}, TD = (i, e, a, o) => {
  if (typeof i == "string") {
    ED(i, e, a);
    return;
  }
  if (typeof i == "function") {
    CD(i, e, a, o);
    return;
  }
  _D(i, e, a, o);
}, ED = (i, e, a) => {
  const o = i === "" ? e : v1(e, i);
  o.classGroupId = a;
}, CD = (i, e, a, o) => {
  if (MD(i)) {
    rp(i(o), e, a, o);
    return;
  }
  e.validators === null && (e.validators = []), e.validators.push(gD(a, i));
}, _D = (i, e, a, o) => {
  const r = Object.entries(i), c = r.length;
  for (let f = 0; f < c; f++) {
    const [d, m] = r[f];
    rp(m, v1(e, d), a, o);
  }
}, v1 = (i, e) => {
  let a = i;
  const o = e.split(dc), r = o.length;
  for (let c = 0; c < r; c++) {
    const f = o[c];
    let d = a.nextPart.get(f);
    d || (d = y1(), a.nextPart.set(f, d)), a = d;
  }
  return a;
}, MD = (i) => "isThemeGetter" in i && i.isThemeGetter === !0, zD = (i) => {
  if (i < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, a = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  const r = (c, f) => {
    a[c] = f, e++, e > i && (e = 0, o = a, a = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(c) {
      let f = a[c];
      if (f !== void 0)
        return f;
      if ((f = o[c]) !== void 0)
        return r(c, f), f;
    },
    set(c, f) {
      c in a ? a[c] = f : r(c, f);
    }
  };
}, xm = "!", gx = ":", AD = [], vx = (i, e, a, o, r) => ({
  modifiers: i,
  hasImportantModifier: e,
  baseClassName: a,
  maybePostfixModifierPosition: o,
  isExternal: r
}), OD = (i) => {
  const {
    prefix: e,
    experimentalParseClassName: a
  } = i;
  let o = (r) => {
    const c = [];
    let f = 0, d = 0, m = 0, p;
    const v = r.length;
    for (let C = 0; C < v; C++) {
      const E = r[C];
      if (f === 0 && d === 0) {
        if (E === gx) {
          c.push(r.slice(m, C)), m = C + 1;
          continue;
        }
        if (E === "/") {
          p = C;
          continue;
        }
      }
      E === "[" ? f++ : E === "]" ? f-- : E === "(" ? d++ : E === ")" && d--;
    }
    const g = c.length === 0 ? r : r.slice(m);
    let b = g, S = !1;
    g.endsWith(xm) ? (b = g.slice(0, -1), S = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      g.startsWith(xm) && (b = g.slice(1), S = !0)
    );
    const w = p && p > m ? p - m : void 0;
    return vx(c, S, b, w);
  };
  if (e) {
    const r = e + gx, c = o;
    o = (f) => f.startsWith(r) ? c(f.slice(r.length)) : vx(AD, !1, f, void 0, !0);
  }
  if (a) {
    const r = o;
    o = (c) => a({
      className: c,
      parseClassName: r
    });
  }
  return o;
}, DD = (i) => {
  const e = /* @__PURE__ */ new Map();
  return i.orderSensitiveModifiers.forEach((a, o) => {
    e.set(a, 1e6 + o);
  }), (a) => {
    const o = [];
    let r = [];
    for (let c = 0; c < a.length; c++) {
      const f = a[c], d = f[0] === "[", m = e.has(f);
      d || m ? (r.length > 0 && (r.sort(), o.push(...r), r = []), o.push(f)) : r.push(f);
    }
    return r.length > 0 && (r.sort(), o.push(...r)), o;
  };
}, RD = (i) => ({
  cache: zD(i.cacheSize),
  parseClassName: OD(i),
  sortModifiers: DD(i),
  postfixLookupClassGroupIds: VD(i),
  ...bD(i)
}), VD = (i) => {
  const e = /* @__PURE__ */ Object.create(null), a = i.postfixLookupClassGroups;
  if (a)
    for (let o = 0; o < a.length; o++)
      e[a[o]] = !0;
  return e;
}, kD = /\s+/, ND = (i, e) => {
  const {
    parseClassName: a,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: c,
    postfixLookupClassGroupIds: f
  } = e, d = [], m = i.trim().split(kD);
  let p = "";
  for (let v = m.length - 1; v >= 0; v -= 1) {
    const g = m[v], {
      isExternal: b,
      modifiers: S,
      hasImportantModifier: w,
      baseClassName: C,
      maybePostfixModifierPosition: E
    } = a(g);
    if (b) {
      p = g + (p.length > 0 ? " " + p : p);
      continue;
    }
    let R = !!E, k;
    if (R) {
      const Y = C.substring(0, E);
      k = o(Y);
      const B = k && f[k] ? o(C) : void 0;
      B && B !== k && (k = B, R = !1);
    } else
      k = o(C);
    if (!k) {
      if (!R) {
        p = g + (p.length > 0 ? " " + p : p);
        continue;
      }
      if (k = o(C), !k) {
        p = g + (p.length > 0 ? " " + p : p);
        continue;
      }
      R = !1;
    }
    const U = S.length === 0 ? "" : S.length === 1 ? S[0] : c(S).join(":"), L = w ? U + xm : U, P = L + k;
    if (d.indexOf(P) > -1)
      continue;
    d.push(P);
    const J = r(k, R);
    for (let Y = 0; Y < J.length; ++Y) {
      const B = J[Y];
      d.push(L + B);
    }
    p = g + (p.length > 0 ? " " + p : p);
  }
  return p;
}, LD = (...i) => {
  let e = 0, a, o, r = "";
  for (; e < i.length; )
    (a = i[e++]) && (o = b1(a)) && (r && (r += " "), r += o);
  return r;
}, b1 = (i) => {
  if (typeof i == "string")
    return i;
  let e, a = "";
  for (let o = 0; o < i.length; o++)
    i[o] && (e = b1(i[o])) && (a && (a += " "), a += e);
  return a;
}, BD = (i, ...e) => {
  let a, o, r, c;
  const f = (m) => {
    const p = e.reduce((v, g) => g(v), i());
    return a = RD(p), o = a.cache.get, r = a.cache.set, c = d, d(m);
  }, d = (m) => {
    const p = o(m);
    if (p)
      return p;
    const v = ND(m, a);
    return r(m, v), v;
  };
  return c = f, (...m) => c(LD(...m));
}, UD = [], ce = (i) => {
  const e = (a) => a[i] || UD;
  return e.isThemeGetter = !0, e.themeKey = i, e;
}, x1 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, S1 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, HD = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, jD = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, qD = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, PD = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, GD = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, YD = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ds = (i) => HD.test(i), St = (i) => !!i && !Number.isNaN(Number(i)), li = (i) => !!i && Number.isInteger(Number(i)), Od = (i) => i.endsWith("%") && St(i.slice(0, -1)), Ri = (i) => jD.test(i), w1 = () => !0, XD = (i) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  qD.test(i) && !PD.test(i)
), up = () => !1, QD = (i) => GD.test(i), ZD = (i) => YD.test(i), FD = (i) => !W(i) && !tt(i), KD = (i) => i.startsWith("@container") && (i[10] === "/" && i[11] !== void 0 || i[11] === "s" && i[16] !== void 0 && i.startsWith("-size/", 10) || i[11] === "n" && i[18] !== void 0 && i.startsWith("-normal/", 10)), ID = (i) => Cs(i, C1, up), W = (i) => x1.test(i), Is = (i) => Cs(i, _1, XD), bx = (i) => Cs(i, sR, St), JD = (i) => Cs(i, z1, w1), $D = (i) => Cs(i, M1, up), xx = (i) => Cs(i, T1, up), WD = (i) => Cs(i, E1, ZD), Nu = (i) => Cs(i, A1, QD), tt = (i) => S1.test(i), Vl = (i) => ga(i, _1), tR = (i) => ga(i, M1), Sx = (i) => ga(i, T1), eR = (i) => ga(i, C1), nR = (i) => ga(i, E1), Lu = (i) => ga(i, A1, !0), iR = (i) => ga(i, z1, !0), Cs = (i, e, a) => {
  const o = x1.exec(i);
  return o ? o[1] ? e(o[1]) : a(o[2]) : !1;
}, ga = (i, e, a = !1) => {
  const o = S1.exec(i);
  return o ? o[1] ? e(o[1]) : a : !1;
}, T1 = (i) => i === "position" || i === "percentage", E1 = (i) => i === "image" || i === "url", C1 = (i) => i === "length" || i === "size" || i === "bg-size", _1 = (i) => i === "length", sR = (i) => i === "number", M1 = (i) => i === "family-name", z1 = (i) => i === "number" || i === "weight", A1 = (i) => i === "shadow", aR = () => {
  const i = ce("color"), e = ce("font"), a = ce("text"), o = ce("font-weight"), r = ce("tracking"), c = ce("leading"), f = ce("breakpoint"), d = ce("container"), m = ce("spacing"), p = ce("radius"), v = ce("shadow"), g = ce("inset-shadow"), b = ce("text-shadow"), S = ce("drop-shadow"), w = ce("blur"), C = ce("perspective"), E = ce("aspect"), R = ce("ease"), k = ce("animate"), U = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], P = () => [...L(), tt, W], J = () => ["auto", "hidden", "clip", "visible", "scroll"], Y = () => ["auto", "contain", "none"], B = () => [tt, W, m], rt = () => [ds, "full", "auto", ...B()], F = () => [li, "none", "subgrid", tt, W], pt = () => ["auto", {
    span: ["full", li, tt, W]
  }, li, tt, W], bt = () => [li, "auto", tt, W], vt = () => ["auto", "min", "max", "fr", tt, W], kt = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], zt = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], G = () => ["auto", ...B()], at = () => [ds, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...B()], I = () => [d, ds, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...B()], mt = () => [ds, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...B()], X = () => [i, tt, W], Wt = () => [...L(), Sx, xx, {
    position: [tt, W]
  }], Ye = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Zn = () => ["auto", "cover", "contain", eR, ID, {
    size: [tt, W]
  }], M = () => [Od, Vl, Is], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    p,
    tt,
    W
  ], K = () => ["", St, Vl, Is], st = () => ["solid", "dashed", "dotted", "double"], Et = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ut = () => [St, Od, Sx, xx], At = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    tt,
    W
  ], et = () => ["none", St, tt, W], ct = () => ["none", St, tt, W], We = () => [St, tt, W], Bi = () => [ds, "full", ...B()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ri],
      breakpoint: [Ri],
      color: [w1],
      container: [Ri],
      "drop-shadow": [Ri],
      ease: ["in", "out", "in-out"],
      font: [FD],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ri],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ri],
      shadow: [Ri],
      spacing: ["px", St],
      text: [Ri],
      "text-shadow": [Ri],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ds, W, tt, E]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", tt, W]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [KD],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [St, "auto", W, tt, d]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": U()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": U()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: P()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: J()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": J()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": J()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Y()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Y()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Y()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: rt()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": rt()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": rt()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": rt(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: rt()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": rt(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: rt()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": rt()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": rt()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: rt()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: rt()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: rt()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: rt()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [li, "auto", tt, W]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ds, "full", "auto", d, ...B()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [St, ds, "auto", "initial", "none", W]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", St, tt, W]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", St, tt, W]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [li, "first", "last", "none", tt, W]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": F()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: pt()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": bt()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": bt()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": F()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: pt()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": bt()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": bt()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": vt()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": vt()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: B()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": B()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": B()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...kt(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...zt(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...zt()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...kt()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...zt(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...zt(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": kt()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...zt(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...zt()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: B()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: B()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: B()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: B()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: B()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: B()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: B()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: B()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: B()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: B()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: B()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: G()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: G()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: G()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: G()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: G()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: G()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: G()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: G()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: G()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: G()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: G()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": B()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": B()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: at()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...I()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...I()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...I()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...mt()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...mt()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...mt()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [d, "screen", ...at()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          d,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...at()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          d,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [f]
          },
          ...at()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...at()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...at()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...at()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", a, Vl, Is]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [o, iR, JD]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Od, W]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [tR, $D, e]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [W]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [r, tt, W]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [St, "none", tt, bx]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          c,
          ...B()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", tt, W]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", tt, W]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: X()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: X()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...st(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [St, "from-font", "auto", tt, Is]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: X()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [St, "auto", tt, W]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: B()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [li, tt, W]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", tt, W]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", tt, W]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: Wt()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Ye()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Zn()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, li, tt, W],
          radial: ["", tt, W],
          conic: ["", li, tt, W]
        }, nR, WD]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: X()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: M()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: M()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: M()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: X()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: X()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: X()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: K()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": K()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": K()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": K()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": K()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": K()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": K()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": K()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": K()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": K()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": K()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": K()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": K()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...st(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...st(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: X()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": X()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": X()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": X()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": X()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": X()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": X()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": X()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": X()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": X()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": X()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: X()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...st(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [St, tt, W]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", St, Vl, Is]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: X()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          v,
          Lu,
          Nu
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: X()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", g, Lu, Nu]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": X()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: K()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: X()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [St, Is]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": X()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": K()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": X()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", b, Lu, Nu]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": X()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [St, tt, W]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Et(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Et()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [St]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ut()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ut()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": X()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": X()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ut()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ut()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": X()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": X()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ut()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ut()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": X()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": X()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ut()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ut()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": X()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": X()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ut()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ut()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": X()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": X()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ut()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ut()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": X()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": X()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ut()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ut()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": X()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": X()
      }],
      "mask-image-radial": [{
        "mask-radial": [tt, W]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": ut()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ut()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": X()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": X()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": L()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [St]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ut()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ut()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": X()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": X()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: Wt()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Ye()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Zn()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", tt, W]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          tt,
          W
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: At()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [St, tt, W]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [St, tt, W]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          S,
          Lu,
          Nu
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": X()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", St, tt, W]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [St, tt, W]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", St, tt, W]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [St, tt, W]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", St, tt, W]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          tt,
          W
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": At()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [St, tt, W]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [St, tt, W]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", St, tt, W]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [St, tt, W]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", St, tt, W]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [St, tt, W]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [St, tt, W]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", St, tt, W]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": B()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": B()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": B()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", tt, W]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [St, "initial", tt, W]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", R, tt, W]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [St, tt, W]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", k, tt, W]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [C, tt, W]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": P()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: et()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": et()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": et()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": et()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ct()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ct()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ct()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ct()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: We()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": We()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": We()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [tt, W, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: P()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Bi()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Bi()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Bi()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Bi()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [li, tt, W]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: X()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: X()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", tt, W]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": X()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": X()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": B()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": B()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": B()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": B()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": B()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": B()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": B()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": B()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": B()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": B()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": B()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": B()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": B()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": B()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": B()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": B()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": B()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": B()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": B()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": B()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": B()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": B()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", tt, W]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...X()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [St, Vl, Is, bx]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...X()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, oR = /* @__PURE__ */ BD(aR);
function Sm(...i) {
  return oR(pD(i));
}
function lR({
  className: i,
  style: e,
  colors: a = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
  mode: o = "rotate",
  blur: r = "medium",
  transition: c,
  scale: f = 1,
  duration: d = 5
}) {
  const m = {
    repeat: 1 / 0,
    duration: d,
    ease: "linear"
  }, p = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${a.join(", ")})`,
        `conic-gradient(from 360deg at 50% 50%, ${a.join(", ")})`
      ],
      transition: {
        ...c ?? m
      }
    },
    pulse: {
      background: a.map(
        (g) => `radial-gradient(circle at 50% 50%, ${g} 0%, transparent 100%)`
      ),
      scale: [1 * f, 1.1 * f, 1 * f],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...c ?? {
          ...m,
          repeatType: "mirror"
        }
      }
    },
    breathe: {
      background: [
        ...a.map(
          (g) => `radial-gradient(circle at 50% 50%, ${g} 0%, transparent 100%)`
        )
      ],
      scale: [1 * f, 1.05 * f, 1 * f],
      transition: {
        ...c ?? {
          ...m,
          repeatType: "mirror"
        }
      }
    },
    colorShift: {
      background: a.map((g, b) => {
        const S = a[(b + 1) % a.length];
        return `conic-gradient(from 0deg at 50% 50%, ${g} 0%, ${S} 50%, ${g} 100%)`;
      }),
      transition: {
        ...c ?? {
          ...m,
          repeatType: "mirror"
        }
      }
    },
    flowHorizontal: {
      background: a.map((g) => {
        const b = a[(a.indexOf(g) + 1) % a.length];
        return `linear-gradient(to right, ${g}, ${b})`;
      }),
      transition: {
        ...c ?? {
          ...m,
          repeatType: "mirror"
        }
      }
    },
    static: {
      background: `linear-gradient(to right, ${a.join(", ")})`
    }
  }, v = (g) => typeof g == "number" ? "" : {
    softest: "blur-sm",
    soft: "blur",
    medium: "blur-md",
    strong: "blur-lg",
    stronger: "blur-xl",
    strongest: "blur-xl",
    none: "blur-none"
  }[g];
  return /* @__PURE__ */ Xn.jsx(
    mD.div,
    {
      style: {
        ...e,
        "--scale": f,
        ...typeof r == "number" ? { filter: `blur(${r}px)` } : {},
        willChange: "transform",
        backfaceVisibility: "hidden"
      },
      animate: p[o],
      className: Sm(
        "pointer-events-none absolute inset-0 h-full w-full",
        "scale-[var(--scale)] transform-gpu",
        v(r),
        i
      )
    }
  );
}
const oa = "generated", rR = "pointerdown", uR = "pointerup", wm = "pointerleave", cR = "pointerout", da = "pointermove", fR = "touchstart", wx = "touchend", hR = "touchmove", dR = "touchcancel", mR = "resize", pR = "visibilitychange", An = "tsParticles - Error", gs = 100, he = 0.5, De = 1e3, Oe = {
  x: 0,
  y: 0,
  z: 0
}, Bu = {
  a: 1,
  b: 0,
  c: 0,
  d: 1
}, zo = "random", Wu = "mid", Re = 2, yR = Math.PI * Re, Dd = 60, O1 = "true", Tx = "false", Rd = "canvas", Ex = 0, ki = 2, Cx = 4, gR = 1, _x = 1, Mx = 1, vR = 4, D1 = 1, tc = 255, la = 360, Tm = 100, Em = 100, zx = 0, Cm = 0, bR = 60, xR = 0, mc = 0.25, Ax = he + mc, Ox = 0, SR = 1, wR = 0, TR = 0, ER = 1, cp = 1, CR = 1, Dx = 1, pc = 0, R1 = 1, _R = 0, MR = 120, zR = 0, AR = 0, OR = 1e4, DR = 0, RR = 1, yc = 0, V1 = 1, VR = 1, kR = 0, Rx = 1, NR = 0, LR = 0, Vx = -mc, kx = 1.5, Nx = 0, BR = 1, UR = 0, _m = 0, k1 = 1, HR = 1, gc = 1, jR = 500, Lx = 50, qR = 0, Mm = 1, N1 = 0, Bx = 1, PR = 0, Js = 255, Vd = 3, kd = 6, GR = 1, YR = 1, XR = 0, QR = 0, ZR = 0, FR = 0;
var Me;
(function(i) {
  i.bottom = "bottom", i.bottomLeft = "bottom-left", i.bottomRight = "bottom-right", i.left = "left", i.none = "none", i.right = "right", i.top = "top", i.topLeft = "top-left", i.topRight = "top-right", i.outside = "outside", i.inside = "inside";
})(Me || (Me = {}));
function L1(i) {
  return typeof i == "boolean";
}
function ws(i) {
  return typeof i == "string";
}
function Ts(i) {
  return typeof i == "number";
}
function vo(i) {
  return typeof i == "object" && i !== null;
}
function pi(i) {
  return Array.isArray(i);
}
function Q(i) {
  return i == null;
}
class hn {
  constructor(e, a, o) {
    if (this._updateFromAngle = (r, c) => {
      this.x = Math.cos(r) * c, this.y = Math.sin(r) * c;
    }, !Ts(e) && e) {
      this.x = e.x, this.y = e.y;
      const r = e;
      this.z = r.z ? r.z : Oe.z;
    } else if (e !== void 0 && a !== void 0)
      this.x = e, this.y = a, this.z = o ?? Oe.z;
    else
      throw new Error(`${An} Vector3d not initialized correctly`);
  }
  static get origin() {
    return hn.create(Oe.x, Oe.y, Oe.z);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(e) {
    this._updateFromAngle(e, this.length);
  }
  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  set length(e) {
    this._updateFromAngle(this.angle, e);
  }
  static clone(e) {
    return hn.create(e.x, e.y, e.z);
  }
  static create(e, a, o) {
    return new hn(e, a, o);
  }
  add(e) {
    return hn.create(this.x + e.x, this.y + e.y, this.z + e.z);
  }
  addTo(e) {
    this.x += e.x, this.y += e.y, this.z += e.z;
  }
  copy() {
    return hn.clone(this);
  }
  distanceTo(e) {
    return this.sub(e).length;
  }
  distanceToSq(e) {
    return this.sub(e).getLengthSq();
  }
  div(e) {
    return hn.create(this.x / e, this.y / e, this.z / e);
  }
  divTo(e) {
    this.x /= e, this.y /= e, this.z /= e;
  }
  getLengthSq() {
    return this.x ** ki + this.y ** ki;
  }
  mult(e) {
    return hn.create(this.x * e, this.y * e, this.z * e);
  }
  multTo(e) {
    this.x *= e, this.y *= e, this.z *= e;
  }
  normalize() {
    const e = this.length;
    e != yc && this.multTo(D1 / e);
  }
  rotate(e) {
    return hn.create(this.x * Math.cos(e) - this.y * Math.sin(e), this.x * Math.sin(e) + this.y * Math.cos(e), Oe.z);
  }
  setTo(e) {
    this.x = e.x, this.y = e.y;
    const a = e;
    this.z = a.z ? a.z : Oe.z;
  }
  sub(e) {
    return hn.create(this.x - e.x, this.y - e.y, this.z - e.z);
  }
  subFrom(e) {
    this.x -= e.x, this.y -= e.y, this.z -= e.z;
  }
}
class ge extends hn {
  constructor(e, a) {
    super(e, a, Oe.z);
  }
  static get origin() {
    return ge.create(Oe.x, Oe.y);
  }
  static clone(e) {
    return ge.create(e.x, e.y);
  }
  static create(e, a) {
    return new ge(e, a);
  }
}
let KR = Math.random;
const B1 = {
  nextFrame: (i) => requestAnimationFrame(i),
  cancel: (i) => cancelAnimationFrame(i)
};
function jt() {
  return On(KR(), 0, 1 - Number.EPSILON);
}
function IR(i) {
  return B1.nextFrame(i);
}
function JR(i) {
  B1.cancel(i);
}
function On(i, e, a) {
  return Math.min(Math.max(i, e), a);
}
function Nd(i, e, a, o) {
  return Math.floor((i * a + e * o) / (a + o));
}
function dn(i) {
  const e = fi(i), a = 0;
  let o = Ec(i);
  return e === o && (o = a), jt() * (e - o) + o;
}
function lt(i) {
  return Ts(i) ? i : dn(i);
}
function Ec(i) {
  return Ts(i) ? i : i.min;
}
function fi(i) {
  return Ts(i) ? i : i.max;
}
function Rt(i, e) {
  if (i === e || e === void 0 && Ts(i))
    return i;
  const a = Ec(i), o = fi(i);
  return e !== void 0 ? {
    min: Math.min(a, e),
    max: Math.max(o, e)
  } : Rt(a, o);
}
function Ge(i, e) {
  const a = i.x - e.x, o = i.y - e.y, r = 2;
  return { dx: a, dy: o, distance: Math.sqrt(a ** r + o ** r) };
}
function mn(i, e) {
  return Ge(i, e).distance;
}
function bs(i) {
  return i * Math.PI / 180;
}
function $R(i, e, a) {
  if (Ts(i))
    return bs(i);
  switch (i) {
    case Me.top:
      return -Math.PI * he;
    case Me.topRight:
      return -Math.PI * mc;
    case Me.right:
      return xR;
    case Me.bottomRight:
      return Math.PI * mc;
    case Me.bottom:
      return Math.PI * he;
    case Me.bottomLeft:
      return Math.PI * Ax;
    case Me.left:
      return Math.PI;
    case Me.topLeft:
      return -Math.PI * Ax;
    case Me.inside:
      return Math.atan2(a.y - e.y, a.x - e.x);
    case Me.outside:
      return Math.atan2(e.y - a.y, e.x - a.x);
    default:
      return jt() * yR;
  }
}
function WR(i) {
  const e = ge.origin;
  return e.length = 1, e.angle = i, e;
}
function Ux(i, e, a, o) {
  return ge.create(i.x * (a - o) / (a + o) + e.x * Re * o / (a + o), i.y);
}
function t2(i) {
  var e, a;
  return {
    x: ((e = i.position) == null ? void 0 : e.x) ?? jt() * i.size.width,
    y: ((a = i.position) == null ? void 0 : a.y) ?? jt() * i.size.height
  };
}
function U1(i) {
  return i ? i.endsWith("%") ? parseFloat(i) / gs : parseFloat(i) : 1;
}
var ra;
(function(i) {
  i.auto = "auto", i.increase = "increase", i.decrease = "decrease", i.random = "random";
})(ra || (ra = {}));
var le;
(function(i) {
  i.increasing = "increasing", i.decreasing = "decreasing";
})(le || (le = {}));
var ma;
(function(i) {
  i.none = "none", i.max = "max", i.min = "min";
})(ma || (ma = {}));
var Mt;
(function(i) {
  i.bottom = "bottom", i.left = "left", i.right = "right", i.top = "top";
})(Mt || (Mt = {}));
var Ao;
(function(i) {
  i.precise = "precise", i.percent = "percent";
})(Ao || (Ao = {}));
var So;
(function(i) {
  i.max = "max", i.min = "min", i.random = "random";
})(So || (So = {}));
const e2 = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn
};
function pa() {
  return e2;
}
function n2(i) {
  const e = /* @__PURE__ */ new Map();
  return (...a) => {
    const o = JSON.stringify(a);
    if (e.has(o))
      return e.get(o);
    const r = i(...a);
    return e.set(o, r), r;
  };
}
function Hx(i) {
  const e = { bounced: !1 }, { pSide: a, pOtherSide: o, rectSide: r, rectOtherSide: c, velocity: f, factor: d } = i;
  return o.min < c.min || o.min > c.max || o.max < c.min || o.max > c.max || (a.max >= r.min && a.max <= (r.max + r.min) * he && f > Ox || a.min <= r.max && a.min > (r.max + r.min) * he && f < Ox) && (e.velocity = f * -d, e.bounced = !0), e;
}
function i2(i, e) {
  const a = pn(e, (o) => i.matches(o));
  return pi(a) ? a.some((o) => o) : a;
}
function ya() {
  return typeof window > "u" || !window || typeof window.document > "u" || !window.document;
}
function s2() {
  return !ya() && typeof matchMedia < "u";
}
function H1(i) {
  if (s2())
    return matchMedia(i);
}
function a2(i) {
  if (!(ya() || typeof IntersectionObserver > "u"))
    return new IntersectionObserver(i);
}
function o2(i) {
  if (!(ya() || typeof MutationObserver > "u"))
    return new MutationObserver(i);
}
function ee(i, e) {
  return i === e || pi(e) && e.indexOf(i) > -1;
}
async function jx(i, e) {
  try {
    await document.fonts.load(`${e ?? "400"} 36px '${i ?? "Verdana"}'`);
  } catch {
  }
}
function l2(i) {
  return Math.floor(jt() * i.length);
}
function Cc(i, e, a = !0) {
  return i[e !== void 0 && a ? e % i.length : l2(i)];
}
function fp(i, e, a, o, r) {
  return r2(tr(i, o ?? 0), e, a, r);
}
function r2(i, e, a, o) {
  let r = !0;
  return (!o || o === Mt.bottom) && (r = i.top < e.height + a.x), r && (!o || o === Mt.left) && (r = i.right > a.x), r && (!o || o === Mt.right) && (r = i.left < e.width + a.y), r && (!o || o === Mt.top) && (r = i.bottom > a.y), r;
}
function tr(i, e) {
  return {
    bottom: i.y + e,
    left: i.x - e,
    right: i.x + e,
    top: i.y - e
  };
}
function ke(i, ...e) {
  for (const a of e) {
    if (a == null)
      continue;
    if (!vo(a)) {
      i = a;
      continue;
    }
    const o = Array.isArray(a);
    o && (vo(i) || !i || !Array.isArray(i)) ? i = [] : !o && (vo(i) || !i || Array.isArray(i)) && (i = {});
    for (const r in a) {
      if (r === "__proto__")
        continue;
      const c = a, f = c[r], d = i;
      d[r] = vo(f) && Array.isArray(f) ? f.map((m) => ke(d[r], m)) : ke(d[r], f);
    }
  }
  return i;
}
function hp(i, e) {
  return !!P1(e, (a) => a.enable && ee(i, a.mode));
}
function dp(i, e, a) {
  pn(e, (o) => {
    const r = o.mode;
    o.enable && ee(i, r) && u2(o, a);
  });
}
function u2(i, e) {
  const a = i.selectors;
  pn(a, (o) => {
    e(o, i);
  });
}
function j1(i, e) {
  if (!(!e || !i))
    return P1(i, (a) => i2(e, a.selectors));
}
function zm(i) {
  return {
    position: i.getPosition(),
    radius: i.getRadius(),
    mass: i.getMass(),
    velocity: i.velocity,
    factor: ge.create(lt(i.options.bounce.horizontal.value), lt(i.options.bounce.vertical.value))
  };
}
function q1(i, e) {
  const { x: a, y: o } = i.velocity.sub(e.velocity), [r, c] = [i.position, e.position], { dx: f, dy: d } = Ge(c, r);
  if (a * f + o * d < 0)
    return;
  const p = -Math.atan2(d, f), v = i.mass, g = e.mass, b = i.velocity.rotate(p), S = e.velocity.rotate(p), w = Ux(b, S, v, g), C = Ux(S, b, v, g), E = w.rotate(-p), R = C.rotate(-p);
  i.velocity.x = E.x * i.factor.x, i.velocity.y = E.y * i.factor.y, e.velocity.x = R.x * e.factor.x, e.velocity.y = R.y * e.factor.y;
}
function c2(i, e) {
  const a = i.getPosition(), o = i.getRadius(), r = tr(a, o), c = i.options.bounce, f = Hx({
    pSide: {
      min: r.left,
      max: r.right
    },
    pOtherSide: {
      min: r.top,
      max: r.bottom
    },
    rectSide: {
      min: e.left,
      max: e.right
    },
    rectOtherSide: {
      min: e.top,
      max: e.bottom
    },
    velocity: i.velocity.x,
    factor: lt(c.horizontal.value)
  });
  f.bounced && (f.velocity !== void 0 && (i.velocity.x = f.velocity), f.position !== void 0 && (i.position.x = f.position));
  const d = Hx({
    pSide: {
      min: r.top,
      max: r.bottom
    },
    pOtherSide: {
      min: r.left,
      max: r.right
    },
    rectSide: {
      min: e.top,
      max: e.bottom
    },
    rectOtherSide: {
      min: e.left,
      max: e.right
    },
    velocity: i.velocity.y,
    factor: lt(c.vertical.value)
  });
  d.bounced && (d.velocity !== void 0 && (i.velocity.y = d.velocity), d.position !== void 0 && (i.position.y = d.position));
}
function pn(i, e) {
  return pi(i) ? i.map((o, r) => e(o, r)) : e(i, 0);
}
function Mn(i, e, a) {
  return pi(i) ? Cc(i, e, a) : i;
}
function P1(i, e) {
  return pi(i) ? i.find((o, r) => e(o, r)) : e(i, 0) ? i : void 0;
}
function G1(i, e) {
  const a = i.value, o = i.animation, r = {
    delayTime: lt(o.delay) * De,
    enable: o.enable,
    value: lt(i.value) * e,
    max: fi(a) * e,
    min: Ec(a) * e,
    loops: 0,
    maxLoops: lt(o.count),
    time: 0
  }, c = 1;
  if (o.enable) {
    switch (r.decay = c - lt(o.decay), o.mode) {
      case ra.increase:
        r.status = le.increasing;
        break;
      case ra.decrease:
        r.status = le.decreasing;
        break;
      case ra.random:
        r.status = jt() >= he ? le.increasing : le.decreasing;
        break;
    }
    const f = o.mode === ra.auto;
    switch (o.startValue) {
      case So.min:
        r.value = r.min, f && (r.status = le.increasing);
        break;
      case So.max:
        r.value = r.max, f && (r.status = le.decreasing);
        break;
      case So.random:
      default:
        r.value = dn(r), f && (r.status = jt() >= he ? le.increasing : le.decreasing);
        break;
    }
  }
  return r.initialValue = r.value, r;
}
function f2(i, e) {
  if (!(i.mode === Ao.percent)) {
    const { mode: r, ...c } = i;
    return c;
  }
  return "x" in i ? {
    x: i.x / gs * e.width,
    y: i.y / gs * e.height
  } : {
    width: i.width / gs * e.width,
    height: i.height / gs * e.height
  };
}
function Y1(i, e) {
  return f2(i, e);
}
function h2(i, e, a, o, r) {
  switch (e) {
    case ma.max:
      a >= r && i.destroy();
      break;
    case ma.min:
      a <= o && i.destroy();
      break;
  }
}
function mp(i, e, a, o, r) {
  if (i.destroyed || !e || !e.enable || (e.maxLoops ?? 0) > 0 && (e.loops ?? 0) > (e.maxLoops ?? 0))
    return;
  const v = (e.velocity ?? 0) * r.factor, g = e.min, b = e.max, S = e.decay ?? 1;
  if (e.time || (e.time = 0), (e.delayTime ?? 0) > 0 && e.time < (e.delayTime ?? 0) && (e.time += r.value), !((e.delayTime ?? 0) > 0 && e.time < (e.delayTime ?? 0))) {
    switch (e.status) {
      case le.increasing:
        e.value >= b ? (a ? e.status = le.decreasing : e.value -= b, e.loops || (e.loops = 0), e.loops++) : e.value += v;
        break;
      case le.decreasing:
        e.value <= g ? (a ? e.status = le.increasing : e.value += b, e.loops || (e.loops = 0), e.loops++) : e.value -= v;
    }
    e.velocity && S !== 1 && (e.velocity *= S), h2(i, o, e.value, g, b), i.destroyed || (e.value = On(e.value, g, b));
  }
}
function d2(i) {
  var a, o, r, c;
  const e = document.createElement("div").style;
  if (!i)
    return e;
  for (const f in i) {
    const d = i[f];
    if (!Object.prototype.hasOwnProperty.call(i, f) || Q(d))
      continue;
    const m = (a = i.getPropertyValue) == null ? void 0 : a.call(i, d);
    if (!m)
      continue;
    const p = (o = i.getPropertyPriority) == null ? void 0 : o.call(i, d);
    p ? (c = e.setProperty) == null || c.call(e, d, m, p) : (r = e.setProperty) == null || r.call(e, d, m);
  }
  return e;
}
function m2(i) {
  const e = document.createElement("div").style, a = 10, o = {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    borderWidth: "0",
    position: "fixed",
    zIndex: i.toString(a),
    "z-index": i.toString(a),
    top: "0",
    left: "0"
  };
  for (const r in o) {
    const c = o[r];
    e.setProperty(r, c);
  }
  return e;
}
const p2 = n2(m2);
var Am;
(function(i) {
  i.darken = "darken", i.enlighten = "enlighten";
})(Am || (Am = {}));
function y2(i, e) {
  if (e) {
    for (const a of i.colorManagers.values())
      if (e.startsWith(a.stringPrefix))
        return a.parseString(e);
  }
}
function Gn(i, e, a, o = !0) {
  if (!e)
    return;
  const r = ws(e) ? { value: e } : e;
  if (ws(r.value))
    return X1(i, r.value, a, o);
  if (pi(r.value))
    return Gn(i, {
      value: Cc(r.value, a, o)
    });
  for (const c of i.colorManagers.values()) {
    const f = c.handleRangeColor(r);
    if (f)
      return f;
  }
}
function X1(i, e, a, o = !0) {
  if (!e)
    return;
  const r = ws(e) ? { value: e } : e;
  if (ws(r.value))
    return r.value === zo ? Z1() : g2(i, r.value);
  if (pi(r.value))
    return X1(i, {
      value: Cc(r.value, a, o)
    });
  for (const c of i.colorManagers.values()) {
    const f = c.handleColor(r);
    if (f)
      return f;
  }
}
function Xl(i, e, a, o = !0) {
  const r = Gn(i, e, a, o);
  return r ? Q1(r) : void 0;
}
function Q1(i) {
  const e = i.r / tc, a = i.g / tc, o = i.b / tc, r = Math.max(e, a, o), c = Math.min(e, a, o), f = {
    h: zx,
    l: (r + c) * he,
    s: Cm
  };
  return r !== c && (f.s = f.l < he ? (r - c) / (r + c) : (r - c) / (Re - r - c), f.h = e === r ? (a - o) / (r - c) : f.h = a === r ? Re + (o - e) / (r - c) : Re * Re + (e - a) / (r - c)), f.l *= Em, f.s *= Tm, f.h *= bR, f.h < zx && (f.h += la), f.h >= la && (f.h -= la), f;
}
function g2(i, e) {
  return y2(i, e);
}
function Oo(i) {
  const e = (i.h % la + la) % la, a = Math.max(Cm, Math.min(Tm, i.s)), o = Math.max(PR, Math.min(Em, i.l)), r = e / la, c = a / Tm, f = o / Em;
  if (a === Cm) {
    const w = Math.round(f * Js);
    return { r: w, g: w, b: w };
  }
  const d = (w, C, E) => {
    if (E < 0 && E++, E > 1 && E--, E * kd < 1)
      return w + (C - w) * kd * E;
    if (E * Re < 1)
      return C;
    if (E * Vd < 1 * Re) {
      const U = Re / Vd;
      return w + (C - w) * (U - E) * kd;
    }
    return w;
  }, m = f < he ? f * (GR + c) : f + c - f * c, p = Re * f - m, v = YR / Vd, g = Math.min(Js, Js * d(p, m, r + v)), b = Math.min(Js, Js * d(p, m, r)), S = Math.min(Js, Js * d(p, m, r - v));
  return { r: Math.round(g), g: Math.round(b), b: Math.round(S) };
}
function v2(i) {
  const e = Oo(i);
  return {
    a: i.a,
    b: e.b,
    g: e.g,
    r: e.r
  };
}
function Z1(i) {
  const e = XR, a = tc + Mm;
  return {
    b: Math.floor(dn(Rt(e, a))),
    g: Math.floor(dn(Rt(e, a))),
    r: Math.floor(dn(Rt(e, a)))
  };
}
function Li(i, e) {
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${e ?? cp})`;
}
function Ql(i, e) {
  return `hsla(${i.h}, ${i.s}%, ${i.l}%, ${e ?? cp})`;
}
function pp(i, e, a, o) {
  let r = i, c = e;
  return r.r === void 0 && (r = Oo(i)), c.r === void 0 && (c = Oo(e)), {
    b: Nd(r.b, c.b, a, o),
    g: Nd(r.g, c.g, a, o),
    r: Nd(r.r, c.r, a, o)
  };
}
function Om(i, e, a) {
  if (a === zo)
    return Z1();
  if (a === Wu) {
    const o = i.getFillColor() ?? i.getStrokeColor(), r = (e == null ? void 0 : e.getFillColor()) ?? (e == null ? void 0 : e.getStrokeColor());
    if (o && r && e)
      return pp(o, r, i.getRadius(), e.getRadius());
    {
      const c = o ?? r;
      if (c)
        return Oo(c);
    }
  } else
    return a;
}
function F1(i, e, a, o) {
  const r = ws(e) ? e : e.value;
  return r === zo ? o ? Gn(i, {
    value: r
  }) : a ? zo : Wu : r === Wu ? Wu : Gn(i, {
    value: r
  });
}
function qx(i) {
  return i !== void 0 ? {
    h: i.h.value,
    s: i.s.value,
    l: i.l.value
  } : void 0;
}
function K1(i, e, a) {
  const o = {
    h: {
      enable: !1,
      value: i.h
    },
    s: {
      enable: !1,
      value: i.s
    },
    l: {
      enable: !1,
      value: i.l
    }
  };
  return e && (Ld(o.h, e.h, a), Ld(o.s, e.s, a), Ld(o.l, e.l, a)), o;
}
function Ld(i, e, a) {
  i.enable = e.enable, i.enable ? (i.velocity = lt(e.speed) / gs * a, i.decay = V1 - lt(e.decay), i.status = le.increasing, i.loops = ZR, i.maxLoops = lt(e.count), i.time = FR, i.delayTime = lt(e.delay) * De, e.sync || (i.velocity *= jt(), i.value *= jt()), i.initialValue = i.value, i.offset = Rt(e.offset)) : i.velocity = QR;
}
function Bd(i, e, a, o) {
  if (!i || !i.enable || (i.maxLoops ?? 0) > 0 && (i.loops ?? 0) > (i.maxLoops ?? 0) || (i.time || (i.time = 0), (i.delayTime ?? 0) > 0 && i.time < (i.delayTime ?? 0) && (i.time += o.value), (i.delayTime ?? 0) > 0 && i.time < (i.delayTime ?? 0)))
    return;
  const v = i.offset ? dn(i.offset) : 0, g = (i.velocity ?? 0) * o.factor + v * 3.6, b = i.decay ?? 1, S = fi(e), w = Ec(e);
  !a || i.status === le.increasing ? (i.value += g, i.value > S && (i.loops || (i.loops = 0), i.loops++, a ? i.status = le.decreasing : i.value -= S)) : (i.value -= g, i.value < 0 && (i.loops || (i.loops = 0), i.loops++, i.status = le.increasing)), i.velocity && b !== 1 && (i.velocity *= b), i.value = On(i.value, w, S);
}
function I1(i, e) {
  if (!i)
    return;
  const { h: a, s: o, l: r } = i, c = {
    h: { min: 0, max: 360 },
    s: { min: 0, max: 100 },
    l: { min: 0, max: 100 }
  };
  a && Bd(a, c.h, !1, e), o && Bd(o, c.s, !0, e), r && Bd(r, c.l, !0, e);
}
function jl(i, e, a) {
  i.beginPath(), i.moveTo(e.x, e.y), i.lineTo(a.x, a.y), i.closePath();
}
function b2(i, e, a) {
  i.fillStyle = a ?? "rgba(0,0,0,0)", i.fillRect(Oe.x, Oe.y, e.width, e.height);
}
function x2(i, e, a, o) {
  a && (i.globalAlpha = o, i.drawImage(a, Oe.x, Oe.y, e.width, e.height), i.globalAlpha = 1);
}
function Ud(i, e) {
  i.clearRect(Oe.x, Oe.y, e.width, e.height);
}
function S2(i) {
  const { container: e, context: a, particle: o, delta: r, colorStyles: c, backgroundMask: f, composite: d, radius: m, opacity: p, shadow: v, transform: g } = i, b = o.getPosition(), S = o.rotation + (o.pathRotation ? o.velocity.angle : qR), w = {
    sin: Math.sin(S),
    cos: Math.cos(S)
  }, C = !!S, E = {
    a: w.cos * (g.a ?? Bu.a),
    b: C ? w.sin * (g.b ?? Mm) : g.b ?? Bu.b,
    c: C ? -w.sin * (g.c ?? Mm) : g.c ?? Bu.c,
    d: w.cos * (g.d ?? Bu.d)
  };
  a.setTransform(E.a, E.b, E.c, E.d, b.x, b.y), f && (a.globalCompositeOperation = d);
  const R = o.shadowColor;
  v.enable && R && (a.shadowBlur = v.blur, a.shadowColor = Li(R), a.shadowOffsetX = v.offset.x, a.shadowOffsetY = v.offset.y), c.fill && (a.fillStyle = c.fill);
  const k = o.strokeWidth ?? N1;
  a.lineWidth = k, c.stroke && (a.strokeStyle = c.stroke);
  const U = {
    container: e,
    context: a,
    particle: o,
    radius: m,
    opacity: p,
    delta: r,
    transformData: E,
    strokeWidth: k
  };
  T2(U), E2(U), w2(U), a.globalCompositeOperation = "source-over", a.resetTransform();
}
function w2(i) {
  const { container: e, context: a, particle: o, radius: r, opacity: c, delta: f, transformData: d } = i;
  if (!o.effect)
    return;
  const m = e.effectDrawers.get(o.effect);
  m && m.draw({
    context: a,
    particle: o,
    radius: r,
    opacity: c,
    delta: f,
    pixelRatio: e.retina.pixelRatio,
    transformData: { ...d }
  });
}
function T2(i) {
  const { container: e, context: a, particle: o, radius: r, opacity: c, delta: f, strokeWidth: d, transformData: m } = i;
  if (!o.shape)
    return;
  const p = e.shapeDrawers.get(o.shape);
  p && (a.beginPath(), p.draw({
    context: a,
    particle: o,
    radius: r,
    opacity: c,
    delta: f,
    pixelRatio: e.retina.pixelRatio,
    transformData: { ...m }
  }), o.shapeClose && a.closePath(), d > N1 && a.stroke(), o.shapeFill && a.fill());
}
function E2(i) {
  const { container: e, context: a, particle: o, radius: r, opacity: c, delta: f, transformData: d } = i;
  if (!o.shape)
    return;
  const m = e.shapeDrawers.get(o.shape);
  m != null && m.afterDraw && m.afterDraw({
    context: a,
    particle: o,
    radius: r,
    opacity: c,
    delta: f,
    pixelRatio: e.retina.pixelRatio,
    transformData: { ...d }
  });
}
function C2(i, e, a) {
  e.draw && e.draw(i, a);
}
function _2(i, e, a, o) {
  e.drawParticle && e.drawParticle(i, a, o);
}
function M2(i, e, a) {
  return {
    h: i.h,
    s: i.s,
    l: i.l + (e === Am.darken ? -Bx : Bx) * a
  };
}
function z2(i, e, a) {
  const o = e[a];
  o !== void 0 && (i[a] = (i[a] ?? SR) * o);
}
function Px(i, e, a = !1) {
  if (!e)
    return;
  const o = i;
  if (!o)
    return;
  const r = o.style;
  if (!r)
    return;
  const c = /* @__PURE__ */ new Set();
  for (const f in r)
    Object.prototype.hasOwnProperty.call(r, f) && c.add(r[f]);
  for (const f in e)
    Object.prototype.hasOwnProperty.call(e, f) && c.add(e[f]);
  for (const f of c) {
    const d = e.getPropertyValue(f);
    d ? r.setProperty(f, d, a ? "important" : "") : r.removeProperty(f);
  }
}
class A2 {
  constructor(e, a) {
    this.container = e, this._applyPostDrawUpdaters = (c) => {
      var f;
      for (const d of this._postDrawUpdaters)
        (f = d.afterDraw) == null || f.call(d, c);
    }, this._applyPreDrawUpdaters = (c, f, d, m, p, v) => {
      var g;
      for (const b of this._preDrawUpdaters) {
        if (b.getColorStyles) {
          const { fill: S, stroke: w } = b.getColorStyles(f, c, d, m);
          S && (p.fill = S), w && (p.stroke = w);
        }
        if (b.getTransformValues) {
          const S = b.getTransformValues(f);
          for (const w in S)
            z2(v, S, w);
        }
        (g = b.beforeDraw) == null || g.call(b, f);
      }
    }, this._applyResizePlugins = () => {
      var c;
      for (const f of this._resizePlugins)
        (c = f.resize) == null || c.call(f);
    }, this._getPluginParticleColors = (c) => {
      let f, d;
      for (const m of this._colorPlugins)
        if (!f && m.particleFillColor && (f = Xl(this._engine, m.particleFillColor(c))), !d && m.particleStrokeColor && (d = Xl(this._engine, m.particleStrokeColor(c))), f && d)
          break;
      return [f, d];
    }, this._initCover = async () => {
      const c = this.container.actualOptions, f = c.backgroundMask.cover, d = f.color;
      if (d) {
        const m = Gn(this._engine, d);
        if (m) {
          const p = {
            ...m,
            a: f.opacity
          };
          this._coverColorStyle = Li(p, p.a);
        }
      } else
        await new Promise((m, p) => {
          if (!f.image)
            return;
          const v = document.createElement("img");
          v.addEventListener("load", () => {
            this._coverImage = {
              image: v,
              opacity: f.opacity
            }, m();
          }), v.addEventListener("error", (g) => {
            p(g.error);
          }), v.src = f.image;
        });
    }, this._initStyle = () => {
      const c = this.element, f = this.container.actualOptions;
      if (c) {
        this._fullScreen ? this._setFullScreenStyle() : this._resetOriginalStyle();
        for (const d in f.style) {
          if (!d || !f.style || !Object.prototype.hasOwnProperty.call(f.style, d))
            continue;
          const m = f.style[d];
          m && c.style.setProperty(d, m, "important");
        }
      }
    }, this._initTrail = async () => {
      const c = this.container.actualOptions, f = c.particles.move.trail, d = f.fill;
      if (!f.enable)
        return;
      const m = D1 / f.length;
      if (d.color) {
        const p = Gn(this._engine, d.color);
        if (!p)
          return;
        this._trailFill = {
          color: {
            ...p
          },
          opacity: m
        };
      } else
        await new Promise((p, v) => {
          if (!d.image)
            return;
          const g = document.createElement("img");
          g.addEventListener("load", () => {
            this._trailFill = {
              image: g,
              opacity: m
            }, p();
          }), g.addEventListener("error", (b) => {
            v(b.error);
          }), g.src = d.image;
        });
    }, this._paintBase = (c) => {
      this.draw((f) => b2(f, this.size, c));
    }, this._paintImage = (c, f) => {
      this.draw((d) => x2(d, this.size, c, f));
    }, this._repairStyle = () => {
      const c = this.element;
      if (!c)
        return;
      this._safeMutationObserver((d) => d.disconnect()), this._initStyle(), this.initBackground();
      const f = this._pointerEvents;
      c.style.pointerEvents = f, c.setAttribute("pointer-events", f), this._safeMutationObserver((d) => {
        !c || !(c instanceof Node) || d.observe(c, { attributes: !0 });
      });
    }, this._resetOriginalStyle = () => {
      const c = this.element, f = this._originalStyle;
      !c || !f || Px(c, f, !0);
    }, this._safeMutationObserver = (c) => {
      this._mutationObserver && c(this._mutationObserver);
    }, this._setFullScreenStyle = () => {
      const c = this.element;
      c && Px(c, p2(this.container.actualOptions.fullScreen.zIndex), !0);
    }, this._engine = a, this._standardSize = {
      height: 0,
      width: 0
    };
    const o = e.retina.pixelRatio, r = this._standardSize;
    this.size = {
      height: r.height * o,
      width: r.width * o
    }, this._context = null, this._generated = !1, this._preDrawUpdaters = [], this._postDrawUpdaters = [], this._resizePlugins = [], this._colorPlugins = [], this._pointerEvents = "none";
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const e = this.container.actualOptions, a = e.particles.move.trail, o = this._trailFill;
    e.backgroundMask.enable ? this.paint() : a.enable && a.length > TR && o ? o.color ? this._paintBase(Li(o.color, o.opacity)) : o.image && this._paintImage(o.image, o.opacity) : e.clear && this.draw((r) => {
      Ud(r, this.size);
    });
  }
  destroy() {
    if (this.stop(), this._generated) {
      const e = this.element;
      e == null || e.remove(), this.element = void 0;
    } else
      this._resetOriginalStyle();
    this._preDrawUpdaters = [], this._postDrawUpdaters = [], this._resizePlugins = [], this._colorPlugins = [];
  }
  draw(e) {
    const a = this._context;
    if (a)
      return e(a);
  }
  drawAsync(e) {
    const a = this._context;
    if (a)
      return e(a);
  }
  drawParticle(e, a) {
    if (e.spawning || e.destroyed)
      return;
    const o = e.getRadius();
    if (o <= wR)
      return;
    const r = e.getFillColor(), c = e.getStrokeColor() ?? r;
    let [f, d] = this._getPluginParticleColors(e);
    f || (f = r), d || (d = c), !(!f && !d) && this.draw((m) => {
      var L;
      const p = this.container, v = p.actualOptions, g = e.options.zIndex, b = ER - e.zIndexFactor, S = b ** g.opacityRate, w = e.bubble.opacity ?? ((L = e.opacity) == null ? void 0 : L.value) ?? cp, C = e.strokeOpacity ?? w, E = w * S, R = C * S, k = {}, U = {
        fill: f ? Ql(f, E) : void 0
      };
      U.stroke = d ? Ql(d, R) : U.fill, this._applyPreDrawUpdaters(m, e, o, E, U, k), S2({
        container: p,
        context: m,
        particle: e,
        delta: a,
        colorStyles: U,
        backgroundMask: v.backgroundMask.enable,
        composite: v.backgroundMask.composite,
        radius: o * b ** g.sizeRate,
        opacity: E,
        shadow: e.options.shadow,
        transform: k
      }), this._applyPostDrawUpdaters(e);
    });
  }
  drawParticlePlugin(e, a, o) {
    this.draw((r) => _2(r, e, a, o));
  }
  drawPlugin(e, a) {
    this.draw((o) => C2(o, e, a));
  }
  async init() {
    this._safeMutationObserver((e) => e.disconnect()), this._mutationObserver = o2((e) => {
      for (const a of e)
        a.type === "attributes" && a.attributeName === "style" && this._repairStyle();
    }), this.resize(), this._initStyle(), await this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      pa().error(e);
    }
    this.initBackground(), this._safeMutationObserver((e) => {
      !this.element || !(this.element instanceof Node) || e.observe(this.element, { attributes: !0 });
    }), this.initUpdaters(), this.initPlugins(), this.paint();
  }
  initBackground() {
    const e = this.container.actualOptions, a = e.background, o = this.element;
    if (!o)
      return;
    const r = o.style;
    if (r) {
      if (a.color) {
        const c = Gn(this._engine, a.color);
        r.backgroundColor = c ? Li(c, a.opacity) : "";
      } else
        r.backgroundColor = "";
      r.backgroundImage = a.image || "", r.backgroundPosition = a.position || "", r.backgroundRepeat = a.repeat || "", r.backgroundSize = a.size || "";
    }
  }
  initPlugins() {
    this._resizePlugins = [];
    for (const e of this.container.plugins.values())
      e.resize && this._resizePlugins.push(e), (e.particleFillColor ?? e.particleStrokeColor) && this._colorPlugins.push(e);
  }
  initUpdaters() {
    this._preDrawUpdaters = [], this._postDrawUpdaters = [];
    for (const e of this.container.particles.updaters)
      e.afterDraw && this._postDrawUpdaters.push(e), (e.getColorStyles ?? e.getTransformValues ?? e.beforeDraw) && this._preDrawUpdaters.push(e);
  }
  loadCanvas(e) {
    this._generated && this.element && this.element.remove(), this._generated = e.dataset && oa in e.dataset ? e.dataset[oa] === "true" : this._generated, this.element = e, this.element.ariaHidden = "true", this._originalStyle = d2(this.element.style);
    const a = this._standardSize;
    a.height = e.offsetHeight, a.width = e.offsetWidth;
    const o = this.container.retina.pixelRatio, r = this.size;
    e.height = r.height = a.height * o, e.width = r.width = a.width * o, this._context = this.element.getContext("2d"), this._safeMutationObserver((c) => c.disconnect()), this.container.retina.init(), this.initBackground(), this._safeMutationObserver((c) => {
      !this.element || !(this.element instanceof Node) || c.observe(this.element, { attributes: !0 });
    });
  }
  paint() {
    const e = this.container.actualOptions;
    this.draw((a) => {
      e.backgroundMask.enable && e.backgroundMask.cover ? (Ud(a, this.size), this._coverImage ? this._paintImage(this._coverImage.image, this._coverImage.opacity) : this._coverColorStyle ? this._paintBase(this._coverColorStyle) : this._paintBase()) : this._paintBase();
    });
  }
  resize() {
    if (!this.element)
      return !1;
    const e = this.container, a = e.canvas._standardSize, o = {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }, r = e.retina.pixelRatio, c = {
      width: o.width * r,
      height: o.height * r
    };
    if (o.height === a.height && o.width === a.width && c.height === this.element.height && c.width === this.element.width)
      return !1;
    const f = { ...a };
    a.height = o.height, a.width = o.width;
    const d = this.size;
    return this.element.width = d.width = c.width, this.element.height = d.height = c.height, this.container.started && e.particles.setResizeFactor({
      width: a.width / f.width,
      height: a.height / f.height
    }), !0;
  }
  setPointerEvents(e) {
    this.element && (this._pointerEvents = e, this._repairStyle());
  }
  stop() {
    this._safeMutationObserver((e) => e.disconnect()), this._mutationObserver = void 0, this.draw((e) => Ud(e, this.size));
  }
  async windowResize() {
    if (!this.element || !this.resize())
      return;
    const e = this.container, a = e.updateActualOptions();
    e.particles.setDensity(), this._applyResizePlugins(), a && await e.refresh();
  }
}
var wo;
(function(i) {
  i.canvas = "canvas", i.parent = "parent", i.window = "window";
})(wo || (wo = {}));
function Cn(i, e, a, o, r) {
  if (o) {
    let c = { passive: !0 };
    L1(r) ? c.capture = r : r !== void 0 && (c = r), i.addEventListener(e, a, c);
  } else {
    const c = r;
    i.removeEventListener(e, a, c);
  }
}
class O2 {
  constructor(e) {
    this.container = e, this._doMouseTouchClick = (a) => {
      const o = this.container, r = o.actualOptions;
      if (this._canPush) {
        const c = o.interactivity.mouse, f = c.position;
        if (!f)
          return;
        c.clickPosition = { ...f }, c.clickTime = (/* @__PURE__ */ new Date()).getTime();
        const d = r.interactivity.events.onClick;
        pn(d.mode, (m) => this.container.handleClickMode(m));
      }
      a.type === "touchend" && setTimeout(() => this._mouseTouchFinish(), jR);
    }, this._handleThemeChange = (a) => {
      const o = a, r = this.container, c = r.options, f = c.defaultThemes, d = o.matches ? f.dark : f.light, m = c.themes.find((p) => p.name === d);
      m != null && m.default.auto && r.loadTheme(d);
    }, this._handleVisibilityChange = () => {
      const a = this.container, o = a.actualOptions;
      this._mouseTouchFinish(), o.pauseOnBlur && (document != null && document.hidden ? (a.pageHidden = !0, a.pause()) : (a.pageHidden = !1, a.animationStatus ? a.play(!0) : a.draw(!0)));
    }, this._handleWindowResize = () => {
      this._resizeTimeout && (clearTimeout(this._resizeTimeout), delete this._resizeTimeout);
      const a = async () => {
        const o = this.container.canvas;
        await (o == null ? void 0 : o.windowResize());
      };
      this._resizeTimeout = setTimeout(() => void a(), this.container.actualOptions.interactivity.events.resize.delay * De);
    }, this._manageInteractivityListeners = (a, o) => {
      const r = this._handlers, c = this.container, f = c.actualOptions, d = c.interactivity.element;
      if (!d)
        return;
      const m = d, p = c.canvas;
      p.setPointerEvents(m === p.element ? "initial" : "none"), (f.interactivity.events.onHover.enable || f.interactivity.events.onClick.enable) && (Cn(d, da, r.mouseMove, o), Cn(d, fR, r.touchStart, o), Cn(d, hR, r.touchMove, o), f.interactivity.events.onClick.enable ? (Cn(d, wx, r.touchEndClick, o), Cn(d, uR, r.mouseUp, o), Cn(d, rR, r.mouseDown, o)) : Cn(d, wx, r.touchEnd, o), Cn(d, a, r.mouseLeave, o), Cn(d, dR, r.touchCancel, o));
    }, this._manageListeners = (a) => {
      const o = this._handlers, r = this.container, c = r.actualOptions, f = c.interactivity.detectsOn, d = r.canvas.element;
      let m = wm;
      f === wo.window ? (r.interactivity.element = window, m = cR) : f === wo.parent && d ? r.interactivity.element = d.parentElement ?? d.parentNode : r.interactivity.element = d, this._manageMediaMatch(a), this._manageResize(a), this._manageInteractivityListeners(m, a), document && Cn(document, pR, o.visibilityChange, a, !1);
    }, this._manageMediaMatch = (a) => {
      const o = this._handlers, r = H1("(prefers-color-scheme: dark)");
      if (r) {
        if (r.addEventListener !== void 0) {
          Cn(r, "change", o.themeChange, a);
          return;
        }
        r.addListener !== void 0 && (a ? r.addListener(o.oldThemeChange) : r.removeListener(o.oldThemeChange));
      }
    }, this._manageResize = (a) => {
      const o = this._handlers, r = this.container;
      if (!r.actualOptions.interactivity.events.resize)
        return;
      if (typeof ResizeObserver > "u") {
        Cn(window, mR, o.resize, a);
        return;
      }
      const f = r.canvas.element;
      this._resizeObserver && !a ? (f && this._resizeObserver.unobserve(f), this._resizeObserver.disconnect(), delete this._resizeObserver) : !this._resizeObserver && a && f && (this._resizeObserver = new ResizeObserver((d) => {
        d.find((p) => p.target === f) && this._handleWindowResize();
      }), this._resizeObserver.observe(f));
    }, this._mouseDown = () => {
      const { interactivity: a } = this.container;
      if (!a)
        return;
      const { mouse: o } = a;
      o.clicking = !0, o.downPosition = o.position;
    }, this._mouseTouchClick = (a) => {
      const o = this.container, r = o.actualOptions, { mouse: c } = o.interactivity;
      c.inside = !0;
      let f = !1;
      const d = c.position;
      if (!(!d || !r.interactivity.events.onClick.enable)) {
        for (const m of o.plugins.values())
          if (m.clickPositionValid && (f = m.clickPositionValid(d), f))
            break;
        f || this._doMouseTouchClick(a), c.clicking = !1;
      }
    }, this._mouseTouchFinish = () => {
      const a = this.container.interactivity;
      if (!a)
        return;
      const o = a.mouse;
      delete o.position, delete o.clickPosition, delete o.downPosition, a.status = wm, o.inside = !1, o.clicking = !1;
    }, this._mouseTouchMove = (a) => {
      const o = this.container, r = o.actualOptions, c = o.interactivity, f = o.canvas.element;
      if (!(c != null && c.element))
        return;
      c.mouse.inside = !0;
      let d;
      if (a.type.startsWith("pointer")) {
        this._canPush = !0;
        const p = a;
        if (c.element === window) {
          if (f) {
            const v = f.getBoundingClientRect();
            d = {
              x: p.clientX - v.left,
              y: p.clientY - v.top
            };
          }
        } else if (r.interactivity.detectsOn === wo.parent) {
          const v = p.target, g = p.currentTarget;
          if (v && g && f) {
            const b = v.getBoundingClientRect(), S = g.getBoundingClientRect(), w = f.getBoundingClientRect();
            d = {
              x: p.offsetX + Re * b.left - (S.left + w.left),
              y: p.offsetY + Re * b.top - (S.top + w.top)
            };
          } else
            d = {
              x: p.offsetX ?? p.clientX,
              y: p.offsetY ?? p.clientY
            };
        } else p.target === f && (d = {
          x: p.offsetX ?? p.clientX,
          y: p.offsetY ?? p.clientY
        });
      } else if (this._canPush = a.type !== "touchmove", f) {
        const p = a, v = p.touches[p.touches.length - k1], g = f.getBoundingClientRect();
        d = {
          x: v.clientX - (g.left ?? pc),
          y: v.clientY - (g.top ?? pc)
        };
      }
      const m = o.retina.pixelRatio;
      d && (d.x *= m, d.y *= m), c.mouse.position = d, c.status = da;
    }, this._touchEnd = (a) => {
      const o = a, r = Array.from(o.changedTouches);
      for (const c of r)
        this._touches.delete(c.identifier);
      this._mouseTouchFinish();
    }, this._touchEndClick = (a) => {
      const o = a, r = Array.from(o.changedTouches);
      for (const c of r)
        this._touches.delete(c.identifier);
      this._mouseTouchClick(a);
    }, this._touchStart = (a) => {
      const o = a, r = Array.from(o.changedTouches);
      for (const c of r)
        this._touches.set(c.identifier, performance.now());
      this._mouseTouchMove(a);
    }, this._canPush = !0, this._touches = /* @__PURE__ */ new Map(), this._handlers = {
      mouseDown: () => this._mouseDown(),
      mouseLeave: () => this._mouseTouchFinish(),
      mouseMove: (a) => this._mouseTouchMove(a),
      mouseUp: (a) => this._mouseTouchClick(a),
      touchStart: (a) => this._touchStart(a),
      touchMove: (a) => this._mouseTouchMove(a),
      touchEnd: (a) => this._touchEnd(a),
      touchCancel: (a) => this._touchEnd(a),
      touchEndClick: (a) => this._touchEndClick(a),
      visibilityChange: () => this._handleVisibilityChange(),
      themeChange: (a) => this._handleThemeChange(a),
      oldThemeChange: (a) => this._handleThemeChange(a),
      resize: () => {
        this._handleWindowResize();
      }
    };
  }
  addListeners() {
    this._manageListeners(!0);
  }
  removeListeners() {
    this._manageListeners(!1);
  }
}
var je;
(function(i) {
  i.configAdded = "configAdded", i.containerInit = "containerInit", i.particlesSetup = "particlesSetup", i.containerStarted = "containerStarted", i.containerStopped = "containerStopped", i.containerDestroyed = "containerDestroyed", i.containerPaused = "containerPaused", i.containerPlay = "containerPlay", i.containerBuilt = "containerBuilt", i.particleAdded = "particleAdded", i.particleDestroyed = "particleDestroyed", i.particleRemoved = "particleRemoved";
})(je || (je = {}));
class Ne {
  constructor() {
    this.value = "";
  }
  static create(e, a) {
    const o = new Ne();
    return o.load(e), a !== void 0 && (ws(a) || pi(a) ? o.load({ value: a }) : o.load(a)), o;
  }
  load(e) {
    Q(e) || Q(e.value) || (this.value = e.value);
  }
}
let D2 = class {
  constructor() {
    this.color = new Ne(), this.color.value = "", this.image = "", this.position = "", this.repeat = "", this.size = "", this.opacity = 1;
  }
  load(e) {
    Q(e) || (e.color !== void 0 && (this.color = Ne.create(this.color, e.color)), e.image !== void 0 && (this.image = e.image), e.position !== void 0 && (this.position = e.position), e.repeat !== void 0 && (this.repeat = e.repeat), e.size !== void 0 && (this.size = e.size), e.opacity !== void 0 && (this.opacity = e.opacity));
  }
};
class R2 {
  constructor() {
    this.opacity = 1;
  }
  load(e) {
    Q(e) || (e.color !== void 0 && (this.color = Ne.create(this.color, e.color)), e.image !== void 0 && (this.image = e.image), e.opacity !== void 0 && (this.opacity = e.opacity));
  }
}
class V2 {
  constructor() {
    this.composite = "destination-out", this.cover = new R2(), this.enable = !1;
  }
  load(e) {
    if (!Q(e)) {
      if (e.composite !== void 0 && (this.composite = e.composite), e.cover !== void 0) {
        const a = e.cover, o = ws(e.cover) ? { color: e.cover } : e.cover;
        this.cover.load(a.color !== void 0 || a.image !== void 0 ? a : { color: o });
      }
      e.enable !== void 0 && (this.enable = e.enable);
    }
  }
}
class k2 {
  constructor() {
    this.enable = !0, this.zIndex = 0;
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.zIndex !== void 0 && (this.zIndex = e.zIndex));
  }
}
class N2 {
  constructor() {
    this.enable = !1, this.mode = [];
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.mode !== void 0 && (this.mode = e.mode));
  }
}
var Do;
(function(i) {
  i.circle = "circle", i.rectangle = "rectangle";
})(Do || (Do = {}));
class Gx {
  constructor() {
    this.selectors = [], this.enable = !1, this.mode = [], this.type = Do.circle;
  }
  load(e) {
    Q(e) || (e.selectors !== void 0 && (this.selectors = e.selectors), e.enable !== void 0 && (this.enable = e.enable), e.mode !== void 0 && (this.mode = e.mode), e.type !== void 0 && (this.type = e.type));
  }
}
class L2 {
  constructor() {
    this.enable = !1, this.force = 2, this.smooth = 10;
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.force !== void 0 && (this.force = e.force), e.smooth !== void 0 && (this.smooth = e.smooth));
  }
}
class B2 {
  constructor() {
    this.enable = !1, this.mode = [], this.parallax = new L2();
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.mode !== void 0 && (this.mode = e.mode), this.parallax.load(e.parallax));
  }
}
class U2 {
  constructor() {
    this.delay = 0.5, this.enable = !0;
  }
  load(e) {
    Q(e) || (e.delay !== void 0 && (this.delay = e.delay), e.enable !== void 0 && (this.enable = e.enable));
  }
}
class H2 {
  constructor() {
    this.onClick = new N2(), this.onDiv = new Gx(), this.onHover = new B2(), this.resize = new U2();
  }
  load(e) {
    if (Q(e))
      return;
    this.onClick.load(e.onClick);
    const a = e.onDiv;
    a !== void 0 && (this.onDiv = pn(a, (o) => {
      const r = new Gx();
      return r.load(o), r;
    })), this.onHover.load(e.onHover), this.resize.load(e.resize);
  }
}
class j2 {
  constructor(e, a) {
    this._engine = e, this._container = a;
  }
  load(e) {
    if (Q(e) || !this._container)
      return;
    const a = this._engine.interactors.get(this._container);
    if (a)
      for (const o of a)
        o.loadModeOptions && o.loadModeOptions(this, e);
  }
}
class J1 {
  constructor(e, a) {
    this.detectsOn = wo.window, this.events = new H2(), this.modes = new j2(e, a);
  }
  load(e) {
    if (Q(e))
      return;
    const a = e.detectsOn;
    a !== void 0 && (this.detectsOn = a), this.events.load(e.events), this.modes.load(e.modes);
  }
}
class q2 {
  load(e) {
    Q(e) || (e.position && (this.position = {
      x: e.position.x ?? Lx,
      y: e.position.y ?? Lx,
      mode: e.position.mode ?? Ao.percent
    }), e.options && (this.options = ke({}, e.options)));
  }
}
var ua;
(function(i) {
  i.screen = "screen", i.canvas = "canvas";
})(ua || (ua = {}));
class P2 {
  constructor() {
    this.maxWidth = 1 / 0, this.options = {}, this.mode = ua.canvas;
  }
  load(e) {
    Q(e) || (Q(e.maxWidth) || (this.maxWidth = e.maxWidth), Q(e.mode) || (e.mode === ua.screen ? this.mode = ua.screen : this.mode = ua.canvas), Q(e.options) || (this.options = ke({}, e.options)));
  }
}
var ps;
(function(i) {
  i.any = "any", i.dark = "dark", i.light = "light";
})(ps || (ps = {}));
class G2 {
  constructor() {
    this.auto = !1, this.mode = ps.any, this.value = !1;
  }
  load(e) {
    Q(e) || (e.auto !== void 0 && (this.auto = e.auto), e.mode !== void 0 && (this.mode = e.mode), e.value !== void 0 && (this.value = e.value));
  }
}
class Y2 {
  constructor() {
    this.name = "", this.default = new G2();
  }
  load(e) {
    Q(e) || (e.name !== void 0 && (this.name = e.name), this.default.load(e.default), e.options !== void 0 && (this.options = ke({}, e.options)));
  }
}
class yp {
  constructor() {
    this.count = 0, this.enable = !1, this.speed = 1, this.decay = 0, this.delay = 0, this.sync = !1;
  }
  load(e) {
    Q(e) || (e.count !== void 0 && (this.count = Rt(e.count)), e.enable !== void 0 && (this.enable = e.enable), e.speed !== void 0 && (this.speed = Rt(e.speed)), e.decay !== void 0 && (this.decay = Rt(e.decay)), e.delay !== void 0 && (this.delay = Rt(e.delay)), e.sync !== void 0 && (this.sync = e.sync));
  }
}
class gp extends yp {
  constructor() {
    super(), this.mode = ra.auto, this.startValue = So.random;
  }
  load(e) {
    super.load(e), !Q(e) && (e.mode !== void 0 && (this.mode = e.mode), e.startValue !== void 0 && (this.startValue = e.startValue));
  }
}
class Hd extends yp {
  constructor() {
    super(), this.offset = 0, this.sync = !0;
  }
  load(e) {
    super.load(e), !Q(e) && e.offset !== void 0 && (this.offset = Rt(e.offset));
  }
}
class X2 {
  constructor() {
    this.h = new Hd(), this.s = new Hd(), this.l = new Hd();
  }
  load(e) {
    Q(e) || (this.h.load(e.h), this.s.load(e.s), this.l.load(e.l));
  }
}
class Zl extends Ne {
  constructor() {
    super(), this.animation = new X2();
  }
  static create(e, a) {
    const o = new Zl();
    return o.load(e), a !== void 0 && (ws(a) || pi(a) ? o.load({ value: a }) : o.load(a)), o;
  }
  load(e) {
    if (super.load(e), Q(e))
      return;
    const a = e.animation;
    a !== void 0 && (a.enable !== void 0 ? this.animation.h.load(a) : this.animation.load(e.animation));
  }
}
var To;
(function(i) {
  i.absorb = "absorb", i.bounce = "bounce", i.destroy = "destroy";
})(To || (To = {}));
class Q2 {
  constructor() {
    this.speed = 2;
  }
  load(e) {
    Q(e) || e.speed !== void 0 && (this.speed = e.speed);
  }
}
class Z2 {
  constructor() {
    this.enable = !0, this.retries = 0;
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.retries !== void 0 && (this.retries = e.retries));
  }
}
class va {
  constructor() {
    this.value = 0;
  }
  load(e) {
    Q(e) || Q(e.value) || (this.value = Rt(e.value));
  }
}
class F2 extends va {
  constructor() {
    super(), this.animation = new yp();
  }
  load(e) {
    if (super.load(e), Q(e))
      return;
    const a = e.animation;
    a !== void 0 && this.animation.load(a);
  }
}
class $1 extends F2 {
  constructor() {
    super(), this.animation = new gp();
  }
  load(e) {
    super.load(e);
  }
}
class Yx extends va {
  constructor() {
    super(), this.value = 1;
  }
}
class W1 {
  constructor() {
    this.horizontal = new Yx(), this.vertical = new Yx();
  }
  load(e) {
    Q(e) || (this.horizontal.load(e.horizontal), this.vertical.load(e.vertical));
  }
}
class K2 {
  constructor() {
    this.absorb = new Q2(), this.bounce = new W1(), this.enable = !1, this.maxSpeed = 50, this.mode = To.bounce, this.overlap = new Z2();
  }
  load(e) {
    Q(e) || (this.absorb.load(e.absorb), this.bounce.load(e.bounce), e.enable !== void 0 && (this.enable = e.enable), e.maxSpeed !== void 0 && (this.maxSpeed = Rt(e.maxSpeed)), e.mode !== void 0 && (this.mode = e.mode), this.overlap.load(e.overlap));
  }
}
class I2 {
  constructor() {
    this.close = !0, this.fill = !0, this.options = {}, this.type = [];
  }
  load(e) {
    if (Q(e))
      return;
    const a = e.options;
    if (a !== void 0)
      for (const o in a) {
        const r = a[o];
        r && (this.options[o] = ke(this.options[o] ?? {}, r));
      }
    e.close !== void 0 && (this.close = e.close), e.fill !== void 0 && (this.fill = e.fill), e.type !== void 0 && (this.type = e.type);
  }
}
class J2 {
  constructor() {
    this.offset = 0, this.value = 90;
  }
  load(e) {
    Q(e) || (e.offset !== void 0 && (this.offset = Rt(e.offset)), e.value !== void 0 && (this.value = Rt(e.value)));
  }
}
class $2 {
  constructor() {
    this.distance = 200, this.enable = !1, this.rotate = {
      x: 3e3,
      y: 3e3
    };
  }
  load(e) {
    if (!Q(e) && (e.distance !== void 0 && (this.distance = Rt(e.distance)), e.enable !== void 0 && (this.enable = e.enable), e.rotate)) {
      const a = e.rotate.x;
      a !== void 0 && (this.rotate.x = a);
      const o = e.rotate.y;
      o !== void 0 && (this.rotate.y = o);
    }
  }
}
class W2 {
  constructor() {
    this.x = 50, this.y = 50, this.mode = Ao.percent, this.radius = 0;
  }
  load(e) {
    Q(e) || (e.x !== void 0 && (this.x = e.x), e.y !== void 0 && (this.y = e.y), e.mode !== void 0 && (this.mode = e.mode), e.radius !== void 0 && (this.radius = e.radius));
  }
}
class t3 {
  constructor() {
    this.acceleration = 9.81, this.enable = !1, this.inverse = !1, this.maxSpeed = 50;
  }
  load(e) {
    Q(e) || (e.acceleration !== void 0 && (this.acceleration = Rt(e.acceleration)), e.enable !== void 0 && (this.enable = e.enable), e.inverse !== void 0 && (this.inverse = e.inverse), e.maxSpeed !== void 0 && (this.maxSpeed = Rt(e.maxSpeed)));
  }
}
class e3 {
  constructor() {
    this.clamp = !0, this.delay = new va(), this.enable = !1, this.options = {};
  }
  load(e) {
    Q(e) || (e.clamp !== void 0 && (this.clamp = e.clamp), this.delay.load(e.delay), e.enable !== void 0 && (this.enable = e.enable), this.generator = e.generator, e.options && (this.options = ke(this.options, e.options)));
  }
}
class n3 {
  load(e) {
    Q(e) || (e.color !== void 0 && (this.color = Ne.create(this.color, e.color)), e.image !== void 0 && (this.image = e.image));
  }
}
class i3 {
  constructor() {
    this.enable = !1, this.length = 10, this.fill = new n3();
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.fill !== void 0 && this.fill.load(e.fill), e.length !== void 0 && (this.length = e.length));
  }
}
var re;
(function(i) {
  i.bounce = "bounce", i.none = "none", i.out = "out", i.destroy = "destroy", i.split = "split";
})(re || (re = {}));
class s3 {
  constructor() {
    this.default = re.out;
  }
  load(e) {
    Q(e) || (e.default !== void 0 && (this.default = e.default), this.bottom = e.bottom ?? e.default, this.left = e.left ?? e.default, this.right = e.right ?? e.default, this.top = e.top ?? e.default);
  }
}
class a3 {
  constructor() {
    this.acceleration = 0, this.enable = !1;
  }
  load(e) {
    Q(e) || (e.acceleration !== void 0 && (this.acceleration = Rt(e.acceleration)), e.enable !== void 0 && (this.enable = e.enable), e.position && (this.position = ke({}, e.position)));
  }
}
class o3 {
  constructor() {
    this.angle = new J2(), this.attract = new $2(), this.center = new W2(), this.decay = 0, this.distance = {}, this.direction = Me.none, this.drift = 0, this.enable = !1, this.gravity = new t3(), this.path = new e3(), this.outModes = new s3(), this.random = !1, this.size = !1, this.speed = 2, this.spin = new a3(), this.straight = !1, this.trail = new i3(), this.vibrate = !1, this.warp = !1;
  }
  load(e) {
    if (Q(e))
      return;
    this.angle.load(Ts(e.angle) ? { value: e.angle } : e.angle), this.attract.load(e.attract), this.center.load(e.center), e.decay !== void 0 && (this.decay = Rt(e.decay)), e.direction !== void 0 && (this.direction = e.direction), e.distance !== void 0 && (this.distance = Ts(e.distance) ? {
      horizontal: e.distance,
      vertical: e.distance
    } : { ...e.distance }), e.drift !== void 0 && (this.drift = Rt(e.drift)), e.enable !== void 0 && (this.enable = e.enable), this.gravity.load(e.gravity);
    const a = e.outModes;
    a !== void 0 && (vo(a) ? this.outModes.load(a) : this.outModes.load({
      default: a
    })), this.path.load(e.path), e.random !== void 0 && (this.random = e.random), e.size !== void 0 && (this.size = e.size), e.speed !== void 0 && (this.speed = Rt(e.speed)), this.spin.load(e.spin), e.straight !== void 0 && (this.straight = e.straight), this.trail.load(e.trail), e.vibrate !== void 0 && (this.vibrate = e.vibrate), e.warp !== void 0 && (this.warp = e.warp);
  }
}
class l3 extends gp {
  constructor() {
    super(), this.destroy = ma.none, this.speed = 2;
  }
  load(e) {
    super.load(e), !Q(e) && e.destroy !== void 0 && (this.destroy = e.destroy);
  }
}
class r3 extends $1 {
  constructor() {
    super(), this.animation = new l3(), this.value = 1;
  }
  load(e) {
    if (Q(e))
      return;
    super.load(e);
    const a = e.animation;
    a !== void 0 && this.animation.load(a);
  }
}
class u3 {
  constructor() {
    this.enable = !1, this.width = 1920, this.height = 1080;
  }
  load(e) {
    if (Q(e))
      return;
    e.enable !== void 0 && (this.enable = e.enable);
    const a = e.width;
    a !== void 0 && (this.width = a);
    const o = e.height;
    o !== void 0 && (this.height = o);
  }
}
var Fl;
(function(i) {
  i.delete = "delete", i.wait = "wait";
})(Fl || (Fl = {}));
class c3 {
  constructor() {
    this.mode = Fl.delete, this.value = 0;
  }
  load(e) {
    Q(e) || (e.mode !== void 0 && (this.mode = e.mode), e.value !== void 0 && (this.value = e.value));
  }
}
class f3 {
  constructor() {
    this.density = new u3(), this.limit = new c3(), this.value = 0;
  }
  load(e) {
    Q(e) || (this.density.load(e.density), this.limit.load(e.limit), e.value !== void 0 && (this.value = e.value));
  }
}
class h3 {
  constructor() {
    this.blur = 0, this.color = new Ne(), this.enable = !1, this.offset = {
      x: 0,
      y: 0
    }, this.color.value = "#000";
  }
  load(e) {
    Q(e) || (e.blur !== void 0 && (this.blur = e.blur), this.color = Ne.create(this.color, e.color), e.enable !== void 0 && (this.enable = e.enable), e.offset !== void 0 && (e.offset.x !== void 0 && (this.offset.x = e.offset.x), e.offset.y !== void 0 && (this.offset.y = e.offset.y)));
  }
}
class d3 {
  constructor() {
    this.close = !0, this.fill = !0, this.options = {}, this.type = "circle";
  }
  load(e) {
    if (Q(e))
      return;
    const a = e.options;
    if (a !== void 0)
      for (const o in a) {
        const r = a[o];
        r && (this.options[o] = ke(this.options[o] ?? {}, r));
      }
    e.close !== void 0 && (this.close = e.close), e.fill !== void 0 && (this.fill = e.fill), e.type !== void 0 && (this.type = e.type);
  }
}
class m3 extends gp {
  constructor() {
    super(), this.destroy = ma.none, this.speed = 5;
  }
  load(e) {
    super.load(e), !Q(e) && e.destroy !== void 0 && (this.destroy = e.destroy);
  }
}
class p3 extends $1 {
  constructor() {
    super(), this.animation = new m3(), this.value = 3;
  }
  load(e) {
    if (super.load(e), Q(e))
      return;
    const a = e.animation;
    a !== void 0 && this.animation.load(a);
  }
}
class Xx {
  constructor() {
    this.width = 0;
  }
  load(e) {
    Q(e) || (e.color !== void 0 && (this.color = Zl.create(this.color, e.color)), e.width !== void 0 && (this.width = Rt(e.width)), e.opacity !== void 0 && (this.opacity = Rt(e.opacity)));
  }
}
class y3 extends va {
  constructor() {
    super(), this.opacityRate = 1, this.sizeRate = 1, this.velocityRate = 1;
  }
  load(e) {
    super.load(e), !Q(e) && (e.opacityRate !== void 0 && (this.opacityRate = e.opacityRate), e.sizeRate !== void 0 && (this.sizeRate = e.sizeRate), e.velocityRate !== void 0 && (this.velocityRate = e.velocityRate));
  }
}
class g3 {
  constructor(e, a) {
    this._engine = e, this._container = a, this.bounce = new W1(), this.collisions = new K2(), this.color = new Zl(), this.color.value = "#fff", this.effect = new I2(), this.groups = {}, this.move = new o3(), this.number = new f3(), this.opacity = new r3(), this.reduceDuplicates = !1, this.shadow = new h3(), this.shape = new d3(), this.size = new p3(), this.stroke = new Xx(), this.zIndex = new y3();
  }
  load(e) {
    if (Q(e))
      return;
    if (e.groups !== void 0)
      for (const o of Object.keys(e.groups)) {
        if (!Object.hasOwn(e.groups, o))
          continue;
        const r = e.groups[o];
        r !== void 0 && (this.groups[o] = ke(this.groups[o] ?? {}, r));
      }
    e.reduceDuplicates !== void 0 && (this.reduceDuplicates = e.reduceDuplicates), this.bounce.load(e.bounce), this.color.load(Zl.create(this.color, e.color)), this.effect.load(e.effect), this.move.load(e.move), this.number.load(e.number), this.opacity.load(e.opacity), this.shape.load(e.shape), this.size.load(e.size), this.shadow.load(e.shadow), this.zIndex.load(e.zIndex), this.collisions.load(e.collisions), e.interactivity !== void 0 && (this.interactivity = ke({}, e.interactivity));
    const a = e.stroke;
    if (a && (this.stroke = pn(a, (o) => {
      const r = new Xx();
      return r.load(o), r;
    })), this._container) {
      const o = this._engine.updaters.get(this._container);
      if (o)
        for (const c of o)
          c.loadOptions && c.loadOptions(this, e);
      const r = this._engine.interactors.get(this._container);
      if (r)
        for (const c of r)
          c.loadParticlesOptions && c.loadParticlesOptions(this, e);
    }
  }
}
function tT(i, ...e) {
  for (const a of e)
    i.load(a);
}
function eT(i, e, ...a) {
  const o = new g3(i, e);
  return tT(o, ...a), o;
}
class v3 {
  constructor(e, a) {
    this._findDefaultTheme = (o) => this.themes.find((r) => r.default.value && r.default.mode === o) ?? this.themes.find((r) => r.default.value && r.default.mode === ps.any), this._importPreset = (o) => {
      this.load(this._engine.getPreset(o));
    }, this._engine = e, this._container = a, this.autoPlay = !0, this.background = new D2(), this.backgroundMask = new V2(), this.clear = !0, this.defaultThemes = {}, this.delay = 0, this.fullScreen = new k2(), this.detectRetina = !0, this.duration = 0, this.fpsLimit = 120, this.interactivity = new J1(e, a), this.manualParticles = [], this.particles = eT(this._engine, this._container), this.pauseOnBlur = !0, this.pauseOnOutsideViewport = !0, this.responsive = [], this.smooth = !1, this.style = {}, this.themes = [], this.zLayers = 100;
  }
  load(e) {
    var f, d;
    if (Q(e))
      return;
    e.preset !== void 0 && pn(e.preset, (m) => this._importPreset(m)), e.autoPlay !== void 0 && (this.autoPlay = e.autoPlay), e.clear !== void 0 && (this.clear = e.clear), e.key !== void 0 && (this.key = e.key), e.name !== void 0 && (this.name = e.name), e.delay !== void 0 && (this.delay = Rt(e.delay));
    const a = e.detectRetina;
    a !== void 0 && (this.detectRetina = a), e.duration !== void 0 && (this.duration = Rt(e.duration));
    const o = e.fpsLimit;
    o !== void 0 && (this.fpsLimit = o), e.pauseOnBlur !== void 0 && (this.pauseOnBlur = e.pauseOnBlur), e.pauseOnOutsideViewport !== void 0 && (this.pauseOnOutsideViewport = e.pauseOnOutsideViewport), e.zLayers !== void 0 && (this.zLayers = e.zLayers), this.background.load(e.background);
    const r = e.fullScreen;
    L1(r) ? this.fullScreen.enable = r : this.fullScreen.load(r), this.backgroundMask.load(e.backgroundMask), this.interactivity.load(e.interactivity), e.manualParticles && (this.manualParticles = e.manualParticles.map((m) => {
      const p = new q2();
      return p.load(m), p;
    })), this.particles.load(e.particles), this.style = ke(this.style, e.style), this._engine.loadOptions(this, e), e.smooth !== void 0 && (this.smooth = e.smooth);
    const c = this._engine.interactors.get(this._container);
    if (c)
      for (const m of c)
        m.loadOptions && m.loadOptions(this, e);
    if (e.responsive !== void 0)
      for (const m of e.responsive) {
        const p = new P2();
        p.load(m), this.responsive.push(p);
      }
    if (this.responsive.sort((m, p) => m.maxWidth - p.maxWidth), e.themes !== void 0)
      for (const m of e.themes) {
        const p = this.themes.find((v) => v.name === m.name);
        if (p)
          p.load(m);
        else {
          const v = new Y2();
          v.load(m), this.themes.push(v);
        }
      }
    this.defaultThemes.dark = (f = this._findDefaultTheme(ps.dark)) == null ? void 0 : f.name, this.defaultThemes.light = (d = this._findDefaultTheme(ps.light)) == null ? void 0 : d.name;
  }
  setResponsive(e, a, o) {
    this.load(o);
    const r = this.responsive.find((c) => c.mode === ua.screen && screen ? c.maxWidth > screen.availWidth : c.maxWidth * a > e);
    return this.load(r == null ? void 0 : r.options), r == null ? void 0 : r.maxWidth;
  }
  setTheme(e) {
    if (e) {
      const a = this.themes.find((o) => o.name === e);
      a && this.load(a.options);
    } else {
      const a = H1("(prefers-color-scheme: dark)"), o = a == null ? void 0 : a.matches, r = this._findDefaultTheme(o ? ps.dark : ps.light);
      r && this.load(r.options);
    }
  }
}
var Ro;
(function(i) {
  i.external = "external", i.particles = "particles";
})(Ro || (Ro = {}));
class b3 {
  constructor(e, a) {
    this.container = a, this._engine = e, this._interactors = [], this._externalInteractors = [], this._particleInteractors = [];
  }
  externalInteract(e) {
    for (const a of this._externalInteractors)
      a.isEnabled() && a.interact(e);
  }
  handleClickMode(e) {
    var a;
    for (const o of this._externalInteractors)
      (a = o.handleClickMode) == null || a.call(o, e);
  }
  async init() {
    this._interactors = await this._engine.getInteractors(this.container, !0), this._externalInteractors = [], this._particleInteractors = [];
    for (const e of this._interactors) {
      switch (e.type) {
        case Ro.external:
          this._externalInteractors.push(e);
          break;
        case Ro.particles:
          this._particleInteractors.push(e);
          break;
      }
      e.init();
    }
  }
  particlesInteract(e, a) {
    for (const o of this._externalInteractors)
      o.clear(e, a);
    for (const o of this._particleInteractors)
      o.isEnabled(e) && o.interact(e, a);
  }
  reset(e) {
    for (const a of this._externalInteractors)
      a.isEnabled() && a.reset(e);
    for (const a of this._particleInteractors)
      a.isEnabled(e) && a.reset(e);
  }
}
var Yn;
(function(i) {
  i.normal = "normal", i.inside = "inside", i.outside = "outside";
})(Yn || (Yn = {}));
function x3(i, e, a, o) {
  const r = e.options[i];
  if (r)
    return ke({
      close: e.close,
      fill: e.fill
    }, Mn(r, a, o));
}
function S3(i, e, a, o) {
  const r = e.options[i];
  if (r)
    return ke({
      close: e.close,
      fill: e.fill
    }, Mn(r, a, o));
}
function Qx(i) {
  if (!ee(i.outMode, i.checkModes))
    return;
  const e = i.radius * Re;
  i.coord > i.maxCoord - e ? i.setCb(-i.radius) : i.coord < e && i.setCb(i.radius);
}
class w3 {
  constructor(e, a) {
    this.container = a, this._calcPosition = (o, r, c, f = Ex) => {
      for (const w of o.plugins.values()) {
        const C = w.particlePosition !== void 0 ? w.particlePosition(r, this) : void 0;
        if (C)
          return hn.create(C.x, C.y, c);
      }
      const d = o.canvas.size, m = t2({
        size: d,
        position: r
      }), p = hn.create(m.x, m.y, c), v = this.getRadius(), g = this.options.move.outModes, b = (w) => {
        Qx({
          outMode: w,
          checkModes: [re.bounce],
          coord: p.x,
          maxCoord: o.canvas.size.width,
          setCb: (C) => p.x += C,
          radius: v
        });
      }, S = (w) => {
        Qx({
          outMode: w,
          checkModes: [re.bounce],
          coord: p.y,
          maxCoord: o.canvas.size.height,
          setCb: (C) => p.y += C,
          radius: v
        });
      };
      return b(g.left ?? g.default), b(g.right ?? g.default), S(g.top ?? g.default), S(g.bottom ?? g.default), this._checkOverlap(p, f) ? this._calcPosition(o, void 0, c, f + VR) : p;
    }, this._calculateVelocity = () => {
      const o = WR(this.direction), r = o.copy(), c = this.options.move;
      if (c.direction === Me.inside || c.direction === Me.outside)
        return r;
      const f = bs(lt(c.angle.value)), d = bs(lt(c.angle.offset)), m = {
        left: d - f * he,
        right: d + f * he
      };
      return c.straight || (r.angle += dn(Rt(m.left, m.right))), c.random && typeof c.speed == "number" && (r.length *= jt()), r;
    }, this._checkOverlap = (o, r = Ex) => {
      const c = this.options.collisions, f = this.getRadius();
      if (!c.enable)
        return !1;
      const d = c.overlap;
      if (d.enable)
        return !1;
      const m = d.retries;
      if (m >= kR && r > m)
        throw new Error(`${An} particle is overlapping and can't be placed`);
      return !!this.container.particles.find((p) => mn(o, p.position) < f + p.getRadius());
    }, this._getRollColor = (o) => {
      if (!o || !this.roll || !this.backColor && !this.roll.alter)
        return o;
      const r = this.roll.horizontal && this.roll.vertical ? Re * Rx : Rx, c = this.roll.horizontal ? Math.PI * he : yc;
      return Math.floor(((this.roll.angle ?? yc) + c) / (Math.PI / r)) % Re ? this.backColor ? this.backColor : this.roll.alter ? M2(o, this.roll.alter.type, this.roll.alter.value) : o : o;
    }, this._initPosition = (o) => {
      const r = this.container, c = lt(this.options.zIndex.value);
      this.position = this._calcPosition(r, o, On(c, NR, r.zLayers)), this.initialPosition = this.position.copy();
      const f = r.canvas.size;
      switch (this.moveCenter = {
        ...Y1(this.options.move.center, f),
        radius: this.options.move.center.radius ?? LR,
        mode: this.options.move.center.mode ?? Ao.percent
      }, this.direction = $R(this.options.move.direction, this.position, this.moveCenter), this.options.move.direction) {
        case Me.inside:
          this.outType = Yn.inside;
          break;
        case Me.outside:
          this.outType = Yn.outside;
          break;
      }
      this.offset = ge.origin;
    }, this._engine = e;
  }
  destroy(e) {
    var c, f, d;
    if (this.unbreakable || this.destroyed)
      return;
    this.destroyed = !0, this.bubble.inRange = !1, this.slow.inRange = !1;
    const a = this.container, o = this.pathGenerator, r = a.shapeDrawers.get(this.shape);
    (c = r == null ? void 0 : r.particleDestroy) == null || c.call(r, this);
    for (const m of a.plugins.values())
      (f = m.particleDestroyed) == null || f.call(m, this, e);
    for (const m of a.particles.updaters)
      (d = m.particleDestroyed) == null || d.call(m, this, e);
    o == null || o.reset(this), this._engine.dispatchEvent(je.particleDestroyed, {
      container: this.container,
      data: {
        particle: this
      }
    });
  }
  draw(e) {
    const a = this.container, o = a.canvas;
    for (const r of a.plugins.values())
      o.drawParticlePlugin(r, this, e);
    o.drawParticle(this, e);
  }
  getFillColor() {
    return this._getRollColor(this.bubble.color ?? qx(this.color));
  }
  getMass() {
    return this.getRadius() ** ki * Math.PI * he;
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    return this.bubble.radius ?? this.size.value;
  }
  getStrokeColor() {
    return this._getRollColor(this.bubble.color ?? qx(this.strokeColor));
  }
  init(e, a, o, r) {
    var Y, B, rt, F, pt, bt;
    const c = this.container, f = this._engine;
    this.id = e, this.group = r, this.effectClose = !0, this.effectFill = !0, this.shapeClose = !0, this.shapeFill = !0, this.pathRotation = !1, this.lastPathTime = 0, this.destroyed = !1, this.unbreakable = !1, this.isRotating = !1, this.rotation = 0, this.misplaced = !1, this.retina = {
      maxDistance: {}
    }, this.outType = Yn.normal, this.ignoresResizeRatio = !0;
    const d = c.retina.pixelRatio, m = c.actualOptions, p = eT(this._engine, c, m.particles), { reduceDuplicates: v } = p, g = p.effect.type, b = p.shape.type;
    this.effect = Mn(g, this.id, v), this.shape = Mn(b, this.id, v);
    const S = p.effect, w = p.shape;
    if (o) {
      if ((Y = o.effect) != null && Y.type) {
        const vt = o.effect.type, kt = Mn(vt, this.id, v);
        kt && (this.effect = kt, S.load(o.effect));
      }
      if ((B = o.shape) != null && B.type) {
        const vt = o.shape.type, kt = Mn(vt, this.id, v);
        kt && (this.shape = kt, w.load(o.shape));
      }
    }
    if (this.effect === zo) {
      const vt = [...this.container.effectDrawers.keys()];
      this.effect = vt[Math.floor(jt() * vt.length)];
    }
    if (this.shape === zo) {
      const vt = [...this.container.shapeDrawers.keys()];
      this.shape = vt[Math.floor(jt() * vt.length)];
    }
    this.effectData = x3(this.effect, S, this.id, v), this.shapeData = S3(this.shape, w, this.id, v), p.load(o);
    const C = this.effectData;
    C && p.load(C.particles);
    const E = this.shapeData;
    E && p.load(E.particles);
    const R = new J1(f, c);
    R.load(c.actualOptions.interactivity), R.load(p.interactivity), this.interactivity = R, this.effectFill = (C == null ? void 0 : C.fill) ?? p.effect.fill, this.effectClose = (C == null ? void 0 : C.close) ?? p.effect.close, this.shapeFill = (E == null ? void 0 : E.fill) ?? p.shape.fill, this.shapeClose = (E == null ? void 0 : E.close) ?? p.shape.close, this.options = p;
    const k = this.options.move.path;
    this.pathDelay = lt(k.delay.value) * De, k.generator && (this.pathGenerator = this._engine.getPathGenerator(k.generator), this.pathGenerator && c.addPath(k.generator, this.pathGenerator) && this.pathGenerator.init(c)), c.retina.initParticle(this), this.size = G1(this.options.size, d), this.bubble = {
      inRange: !1
    }, this.slow = {
      inRange: !1,
      factor: 1
    }, this._initPosition(a), this.initialVelocity = this._calculateVelocity(), this.velocity = this.initialVelocity.copy(), this.moveDecay = V1 - lt(this.options.move.decay);
    const U = c.particles;
    U.setLastZIndex(this.position.z), this.zIndexFactor = this.position.z / c.zLayers, this.sides = 24;
    let L = c.effectDrawers.get(this.effect);
    L || (L = this._engine.getEffectDrawer(this.effect), L && c.effectDrawers.set(this.effect, L)), L != null && L.loadEffect && L.loadEffect(this);
    let P = c.shapeDrawers.get(this.shape);
    P || (P = this._engine.getShapeDrawer(this.shape), P && c.shapeDrawers.set(this.shape, P)), P != null && P.loadShape && P.loadShape(this);
    const J = P == null ? void 0 : P.getSidesCount;
    J && (this.sides = J(this)), this.spawning = !1, this.shadowColor = Gn(this._engine, this.options.shadow.color);
    for (const vt of U.updaters)
      vt.init(this);
    for (const vt of U.movers)
      (rt = vt.init) == null || rt.call(vt, this);
    (F = L == null ? void 0 : L.particleInit) == null || F.call(L, c, this), (pt = P == null ? void 0 : P.particleInit) == null || pt.call(P, c, this);
    for (const vt of c.plugins.values())
      (bt = vt.particleCreated) == null || bt.call(vt, this);
  }
  isInsideCanvas() {
    const e = this.getRadius(), a = this.container.canvas.size, o = this.position;
    return o.x >= -e && o.y >= -e && o.y <= a.height + e && o.x <= a.width + e;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    var e;
    for (const a of this.container.particles.updaters)
      (e = a.reset) == null || e.call(a, this);
  }
}
class T3 {
  constructor(e, a) {
    this.position = e, this.particle = a;
  }
}
var Eo;
(function(i) {
  i.circle = "circle", i.rectangle = "rectangle";
})(Eo || (Eo = {}));
class nT {
  constructor(e, a, o) {
    this.position = {
      x: e,
      y: a
    }, this.type = o;
  }
}
class Ve extends nT {
  constructor(e, a, o) {
    super(e, a, Eo.circle), this.radius = o;
  }
  contains(e) {
    return mn(e, this.position) <= this.radius;
  }
  intersects(e) {
    const a = this.position, o = e.position, r = { x: Math.abs(o.x - a.x), y: Math.abs(o.y - a.y) }, c = this.radius;
    if (e instanceof Ve || e.type === Eo.circle) {
      const f = e, d = c + f.radius, m = Math.sqrt(r.x ** ki + r.y ** ki);
      return d > m;
    } else if (e instanceof Qn || e.type === Eo.rectangle) {
      const f = e, { width: d, height: m } = f.size;
      return Math.pow(r.x - d, ki) + Math.pow(r.y - m, ki) <= c ** ki || r.x <= c + d && r.y <= c + m || r.x <= d || r.y <= m;
    }
    return !1;
  }
}
class Qn extends nT {
  constructor(e, a, o, r) {
    super(e, a, Eo.rectangle), this.size = {
      height: r,
      width: o
    };
  }
  contains(e) {
    const a = this.size.width, o = this.size.height, r = this.position;
    return e.x >= r.x && e.x <= r.x + a && e.y >= r.y && e.y <= r.y + o;
  }
  intersects(e) {
    if (e instanceof Ve)
      return e.intersects(this);
    const a = this.size.width, o = this.size.height, r = this.position, c = e.position, f = e instanceof Qn ? e.size : { width: 0, height: 0 }, d = f.width, m = f.height;
    return c.x < r.x + a && c.x + d > r.x && c.y < r.y + o && c.y + m > r.y;
  }
}
class vc {
  constructor(e, a) {
    this.rectangle = e, this.capacity = a, this._subdivide = () => {
      const { x: o, y: r } = this.rectangle.position, { width: c, height: f } = this.rectangle.size, { capacity: d } = this;
      for (let m = 0; m < vR; m++) {
        const p = m % Re;
        this._subs.push(new vc(new Qn(o + c * he * p, r + f * he * (Math.round(m * he) - p), c * he, f * he), d));
      }
      this._divided = !0;
    }, this._points = [], this._divided = !1, this._subs = [];
  }
  insert(e) {
    return this.rectangle.contains(e.position) ? this._points.length < this.capacity ? (this._points.push(e), !0) : (this._divided || this._subdivide(), this._subs.some((a) => a.insert(e))) : !1;
  }
  query(e, a) {
    const o = [];
    if (!e.intersects(this.rectangle))
      return [];
    for (const r of this._points)
      !e.contains(r.position) && mn(e.position, r.position) > r.particle.getRadius() && (!a || a(r.particle)) || o.push(r.particle);
    if (this._divided)
      for (const r of this._subs)
        o.push(...r.query(e, a));
    return o;
  }
  queryCircle(e, a, o) {
    return this.query(new Ve(e.x, e.y, a), o);
  }
  queryRectangle(e, a, o) {
    return this.query(new Qn(e.x, e.y, a.width, a.height), o);
  }
}
const Zx = (i) => {
  const { height: e, width: a } = i;
  return new Qn(Vx * a, Vx * e, kx * a, kx * e);
};
class E3 {
  constructor(e, a) {
    this._addToPool = (...r) => {
      this._pool.push(...r);
    }, this._applyDensity = (r, c, f, d) => {
      var w, C, E;
      const m = r.number;
      if (!((w = r.number.density) != null && w.enable)) {
        f === void 0 ? this._limit = m.limit.value : (((C = d == null ? void 0 : d.number.limit) == null ? void 0 : C.value) ?? m.limit.value) && this._groupLimits.set(f, ((E = d == null ? void 0 : d.number.limit) == null ? void 0 : E.value) ?? m.limit.value);
        return;
      }
      const p = this._initDensityFactor(m.density), v = m.value, g = m.limit.value > Nx ? m.limit.value : v, b = Math.min(v, g) * p + c, S = Math.min(this.count, this.filter((R) => R.group === f).length);
      f === void 0 ? this._limit = m.limit.value * p : this._groupLimits.set(f, m.limit.value * p), S < b ? this.push(Math.abs(b - S), void 0, r, f) : S > b && this.removeQuantity(S - b, f);
    }, this._initDensityFactor = (r) => {
      const c = this._container;
      if (!c.canvas.element || !r.enable)
        return HR;
      const f = c.canvas.element, d = c.retina.pixelRatio;
      return f.width * f.height / (r.height * r.width * d ** ki);
    }, this._pushParticle = (r, c, f, d) => {
      try {
        let m = this._pool.pop();
        m || (m = new w3(this._engine, this._container)), m.init(this._nextId, r, c, f);
        let p = !0;
        return d && (p = d(m)), p ? (this._array.push(m), this._zArray.push(m), this._nextId++, this._engine.dispatchEvent(je.particleAdded, {
          container: this._container,
          data: {
            particle: m
          }
        }), m) : void 0;
      } catch (m) {
        pa().warning(`${An} adding particle: ${m}`);
      }
    }, this._removeParticle = (r, c, f) => {
      const d = this._array[r];
      if (!d || d.group !== c)
        return !1;
      const m = this._zArray.indexOf(d);
      return this._array.splice(r, gc), this._zArray.splice(m, gc), d.destroy(f), this._engine.dispatchEvent(je.particleRemoved, {
        container: this._container,
        data: {
          particle: d
        }
      }), this._addToPool(d), !0;
    }, this._engine = e, this._container = a, this._nextId = 0, this._array = [], this._zArray = [], this._pool = [], this._limit = 0, this._groupLimits = /* @__PURE__ */ new Map(), this._needsSort = !1, this._lastZIndex = 0, this._interactionManager = new b3(e, a), this._pluginsInitialized = !1;
    const o = a.canvas.size;
    this.quadTree = new vc(Zx(o), Cx), this.movers = [], this.updaters = [];
  }
  get count() {
    return this._array.length;
  }
  addManualParticles() {
    const e = this._container;
    e.actualOptions.manualParticles.forEach((o) => this.addParticle(o.position ? Y1(o.position, e.canvas.size) : void 0, o.options));
  }
  addParticle(e, a, o, r) {
    const c = this._container.actualOptions.particles.number.limit.mode, f = o === void 0 ? this._limit : this._groupLimits.get(o) ?? this._limit, d = this.count;
    if (f > Nx)
      switch (c) {
        case Fl.delete: {
          const m = d + BR - f;
          m > UR && this.removeQuantity(m);
          break;
        }
        case Fl.wait:
          if (d >= f)
            return;
          break;
      }
    return this._pushParticle(e, a, o, r);
  }
  clear() {
    this._array = [], this._zArray = [], this._pluginsInitialized = !1;
  }
  destroy() {
    this._array = [], this._zArray = [], this.movers = [], this.updaters = [];
  }
  draw(e) {
    const a = this._container, o = a.canvas;
    o.clear(), this.update(e);
    for (const r of a.plugins.values())
      o.drawPlugin(r, e);
    for (const r of this._zArray)
      r.draw(e);
  }
  filter(e) {
    return this._array.filter(e);
  }
  find(e) {
    return this._array.find(e);
  }
  get(e) {
    return this._array[e];
  }
  handleClickMode(e) {
    this._interactionManager.handleClickMode(e);
  }
  async init() {
    var r, c;
    const e = this._container, a = e.actualOptions;
    this._lastZIndex = 0, this._needsSort = !1, await this.initPlugins();
    let o = !1;
    for (const f of e.plugins.values())
      if (o = ((r = f.particlesInitialization) == null ? void 0 : r.call(f)) ?? o, o)
        break;
    if (this.addManualParticles(), !o) {
      const f = a.particles, d = f.groups;
      for (const m in d) {
        const p = d[m];
        for (let v = this.count, g = 0; g < ((c = p.number) == null ? void 0 : c.value) && v < f.number.value; v++, g++)
          this.addParticle(void 0, p, m);
      }
      for (let m = this.count; m < f.number.value; m++)
        this.addParticle();
    }
  }
  async initPlugins() {
    if (this._pluginsInitialized)
      return;
    const e = this._container;
    this.movers = await this._engine.getMovers(e, !0), this.updaters = await this._engine.getUpdaters(e, !0), await this._interactionManager.init();
    for (const a of e.pathGenerators.values())
      a.init(e);
  }
  push(e, a, o, r) {
    for (let c = 0; c < e; c++)
      this.addParticle(a == null ? void 0 : a.position, o, r);
  }
  async redraw() {
    this.clear(), await this.init(), this.draw({ value: 0, factor: 0 });
  }
  remove(e, a, o) {
    this.removeAt(this._array.indexOf(e), void 0, a, o);
  }
  removeAt(e, a = gR, o, r) {
    if (e < _m || e > this.count)
      return;
    let c = 0;
    for (let f = e; c < a && f < this.count; f++)
      this._removeParticle(f, o, r) && (f--, c++);
  }
  removeQuantity(e, a) {
    this.removeAt(_m, e, a);
  }
  setDensity() {
    const e = this._container.actualOptions, a = e.particles.groups, o = e.manualParticles.length;
    for (const r in a)
      this._applyDensity(a[r], o, r);
    this._applyDensity(e.particles, o);
  }
  setLastZIndex(e) {
    this._lastZIndex = e, this._needsSort = this._needsSort || this._lastZIndex < e;
  }
  setResizeFactor(e) {
    this._resizeFactor = e;
  }
  update(e) {
    var c, f;
    const a = this._container, o = /* @__PURE__ */ new Set();
    this.quadTree = new vc(Zx(a.canvas.size), Cx);
    for (const d of a.pathGenerators.values())
      d.update();
    for (const d of a.plugins.values())
      (c = d.update) == null || c.call(d, e);
    const r = this._resizeFactor;
    for (const d of this._array) {
      r && !d.ignoresResizeRatio && (d.position.x *= r.width, d.position.y *= r.height, d.initialPosition.x *= r.width, d.initialPosition.y *= r.height), d.ignoresResizeRatio = !1, this._interactionManager.reset(d);
      for (const m of this._container.plugins.values()) {
        if (d.destroyed)
          break;
        (f = m.particleUpdate) == null || f.call(m, d, e);
      }
      for (const m of this.movers)
        m.isEnabled(d) && m.move(d, e);
      if (d.destroyed) {
        o.add(d);
        continue;
      }
      this.quadTree.insert(new T3(d.getPosition(), d));
    }
    if (o.size) {
      const d = (m) => !o.has(m);
      this._array = this.filter(d), this._zArray = this._zArray.filter(d);
      for (const m of o)
        this._engine.dispatchEvent(je.particleRemoved, {
          container: this._container,
          data: {
            particle: m
          }
        });
      this._addToPool(...o);
    }
    this._interactionManager.externalInteract(e);
    for (const d of this._array) {
      for (const m of this.updaters)
        m.update(d, e);
      !d.destroyed && !d.spawning && this._interactionManager.particlesInteract(d, e);
    }
    if (delete this._resizeFactor, this._needsSort) {
      const d = this._zArray;
      d.sort((m, p) => p.position.z - m.position.z || m.id - p.id), this._lastZIndex = d[d.length - k1].position.z, this._needsSort = !1;
    }
  }
}
class C3 {
  constructor(e) {
    this.container = e, this.pixelRatio = _x, this.reduceFactor = Mx;
  }
  init() {
    const e = this.container, a = e.actualOptions;
    this.pixelRatio = !a.detectRetina || ya() ? _x : devicePixelRatio, this.reduceFactor = Mx;
    const o = this.pixelRatio, r = e.canvas;
    if (r.element) {
      const d = r.element;
      r.size.width = d.offsetWidth * o, r.size.height = d.offsetHeight * o;
    }
    const c = a.particles, f = c.move;
    this.maxSpeed = lt(f.gravity.maxSpeed) * o, this.sizeAnimationSpeed = lt(c.size.animation.speed) * o;
  }
  initParticle(e) {
    const a = e.options, o = this.pixelRatio, r = a.move, c = r.distance, f = e.retina;
    f.moveDrift = lt(r.drift) * o, f.moveSpeed = lt(r.speed) * o, f.sizeAnimationSpeed = lt(a.size.animation.speed) * o;
    const d = f.maxDistance;
    d.horizontal = c.horizontal !== void 0 ? c.horizontal * o : void 0, d.vertical = c.vertical !== void 0 ? c.vertical * o : void 0, f.maxSpeed = lt(r.gravity.maxSpeed) * o;
  }
}
function $t(i) {
  return i && !i.destroyed;
}
function _3(i, e = Dd, a = !1) {
  return {
    value: i,
    factor: a ? Dd / e : Dd * i / De
  };
}
function co(i, e, ...a) {
  const o = new v3(i, e);
  return tT(o, ...a), o;
}
class M3 {
  constructor(e, a, o) {
    this._intersectionManager = (r) => {
      if (!(!$t(this) || !this.actualOptions.pauseOnOutsideViewport))
        for (const c of r)
          c.target === this.interactivity.element && (c.isIntersecting ? this.play() : this.pause());
    }, this._nextFrame = (r) => {
      try {
        if (!this._smooth && this._lastFrameTime !== void 0 && r < this._lastFrameTime + De / this.fpsLimit) {
          this.draw(!1);
          return;
        }
        this._lastFrameTime ?? (this._lastFrameTime = r);
        const c = _3(r - this._lastFrameTime, this.fpsLimit, this._smooth);
        if (this.addLifeTime(c.value), this._lastFrameTime = r, c.value > De) {
          this.draw(!1);
          return;
        }
        if (this.particles.draw(c), !this.alive()) {
          this.destroy();
          return;
        }
        this.animationStatus && this.draw(!1);
      } catch (c) {
        pa().error(`${An} in animation loop`, c);
      }
    }, this._engine = e, this.id = Symbol(a), this.fpsLimit = 120, this._smooth = !1, this._delay = 0, this._duration = 0, this._lifeTime = 0, this._firstStart = !0, this.started = !1, this.destroyed = !1, this._paused = !0, this._lastFrameTime = 0, this.zLayers = 100, this.pageHidden = !1, this._clickHandlers = /* @__PURE__ */ new Map(), this._sourceOptions = o, this._initialSourceOptions = o, this.retina = new C3(this), this.canvas = new A2(this, this._engine), this.particles = new E3(this._engine, this), this.pathGenerators = /* @__PURE__ */ new Map(), this.interactivity = {
      mouse: {
        clicking: !1,
        inside: !1
      }
    }, this.plugins = /* @__PURE__ */ new Map(), this.effectDrawers = /* @__PURE__ */ new Map(), this.shapeDrawers = /* @__PURE__ */ new Map(), this._options = co(this._engine, this), this.actualOptions = co(this._engine, this), this._eventListeners = new O2(this), this._intersectionObserver = a2((r) => this._intersectionManager(r)), this._engine.dispatchEvent(je.containerBuilt, { container: this });
  }
  get animationStatus() {
    return !this._paused && !this.pageHidden && $t(this);
  }
  get options() {
    return this._options;
  }
  get sourceOptions() {
    return this._sourceOptions;
  }
  addClickHandler(e) {
    if (!$t(this))
      return;
    const a = this.interactivity.element;
    if (!a)
      return;
    const o = (g, b, S) => {
      if (!$t(this))
        return;
      const w = this.retina.pixelRatio, C = {
        x: b.x * w,
        y: b.y * w
      }, E = this.particles.quadTree.queryCircle(C, S * w);
      e(g, E);
    }, r = (g) => {
      if (!$t(this))
        return;
      const b = g, S = {
        x: b.offsetX || b.clientX,
        y: b.offsetY || b.clientY
      };
      o(g, S, CR);
    }, c = () => {
      $t(this) && (p = !0, v = !1);
    }, f = () => {
      $t(this) && (v = !0);
    }, d = (g) => {
      if ($t(this)) {
        if (p && !v) {
          const b = g;
          let S = b.touches[b.touches.length - Dx];
          if (!S && (S = b.changedTouches[b.changedTouches.length - Dx], !S))
            return;
          const w = this.canvas.element, C = w ? w.getBoundingClientRect() : void 0, E = {
            x: S.clientX - (C ? C.left : pc),
            y: S.clientY - (C ? C.top : pc)
          };
          o(g, E, Math.max(S.radiusX, S.radiusY));
        }
        p = !1, v = !1;
      }
    }, m = () => {
      $t(this) && (p = !1, v = !1);
    };
    let p = !1, v = !1;
    this._clickHandlers.set("click", r), this._clickHandlers.set("touchstart", c), this._clickHandlers.set("touchmove", f), this._clickHandlers.set("touchend", d), this._clickHandlers.set("touchcancel", m);
    for (const [g, b] of this._clickHandlers)
      a.addEventListener(g, b);
  }
  addLifeTime(e) {
    this._lifeTime += e;
  }
  addPath(e, a, o = !1) {
    return !$t(this) || !o && this.pathGenerators.has(e) ? !1 : (this.pathGenerators.set(e, a), !0);
  }
  alive() {
    return !this._duration || this._lifeTime <= this._duration;
  }
  clearClickHandlers() {
    var e;
    if ($t(this)) {
      for (const [a, o] of this._clickHandlers)
        (e = this.interactivity.element) == null || e.removeEventListener(a, o);
      this._clickHandlers.clear();
    }
  }
  destroy(e = !0) {
    var a, o;
    if ($t(this)) {
      this.stop(), this.clearClickHandlers(), this.particles.destroy(), this.canvas.destroy();
      for (const r of this.effectDrawers.values())
        (a = r.destroy) == null || a.call(r, this);
      for (const r of this.shapeDrawers.values())
        (o = r.destroy) == null || o.call(r, this);
      for (const r of this.effectDrawers.keys())
        this.effectDrawers.delete(r);
      for (const r of this.shapeDrawers.keys())
        this.shapeDrawers.delete(r);
      if (this._engine.clearPlugins(this), this.destroyed = !0, e) {
        const r = this._engine.items, c = r.findIndex((f) => f === this);
        c >= _R && r.splice(c, R1);
      }
      this._engine.dispatchEvent(je.containerDestroyed, { container: this });
    }
  }
  draw(e) {
    if (!$t(this))
      return;
    let a = e;
    const o = (r) => {
      a && (this._lastFrameTime = void 0, a = !1), this._nextFrame(r);
    };
    this._drawAnimationFrame = IR((r) => o(r));
  }
  async export(e, a = {}) {
    for (const o of this.plugins.values()) {
      if (!o.export)
        continue;
      const r = await o.export(e, a);
      if (r.supported)
        return r.blob;
    }
    pa().error(`${An} - Export plugin with type ${e} not found`);
  }
  handleClickMode(e) {
    var a;
    if ($t(this)) {
      this.particles.handleClickMode(e);
      for (const o of this.plugins.values())
        (a = o.handleClickMode) == null || a.call(o, e);
    }
  }
  async init() {
    var p, v, g, b;
    if (!$t(this))
      return;
    const e = this._engine.getSupportedEffects();
    for (const S of e) {
      const w = this._engine.getEffectDrawer(S);
      w && this.effectDrawers.set(S, w);
    }
    const a = this._engine.getSupportedShapes();
    for (const S of a) {
      const w = this._engine.getShapeDrawer(S);
      w && this.shapeDrawers.set(S, w);
    }
    await this.particles.initPlugins(), this._options = co(this._engine, this, this._initialSourceOptions, this.sourceOptions), this.actualOptions = co(this._engine, this, this._options);
    const o = await this._engine.getAvailablePlugins(this);
    for (const [S, w] of o)
      this.plugins.set(S, w);
    this.retina.init(), await this.canvas.init(), this.updateActualOptions(), this.canvas.initBackground(), this.canvas.resize();
    const { zLayers: r, duration: c, delay: f, fpsLimit: d, smooth: m } = this.actualOptions;
    this.zLayers = r, this._duration = lt(c) * De, this._delay = lt(f) * De, this._lifeTime = 0, this.fpsLimit = d > zR ? d : MR, this._smooth = m;
    for (const S of this.effectDrawers.values())
      await ((p = S.init) == null ? void 0 : p.call(S, this));
    for (const S of this.shapeDrawers.values())
      await ((v = S.init) == null ? void 0 : v.call(S, this));
    for (const S of this.plugins.values())
      await ((g = S.init) == null ? void 0 : g.call(S));
    this._engine.dispatchEvent(je.containerInit, { container: this }), await this.particles.init(), this.particles.setDensity();
    for (const S of this.plugins.values())
      (b = S.particlesSetup) == null || b.call(S);
    this._engine.dispatchEvent(je.particlesSetup, { container: this });
  }
  async loadTheme(e) {
    $t(this) && (this._currentTheme = e, await this.refresh());
  }
  pause() {
    var e;
    if ($t(this) && (this._drawAnimationFrame !== void 0 && (JR(this._drawAnimationFrame), delete this._drawAnimationFrame), !this._paused)) {
      for (const a of this.plugins.values())
        (e = a.pause) == null || e.call(a);
      this.pageHidden || (this._paused = !0), this._engine.dispatchEvent(je.containerPaused, { container: this });
    }
  }
  play(e) {
    if (!$t(this))
      return;
    const a = this._paused || e;
    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = !1;
      return;
    }
    if (this._paused && (this._paused = !1), a)
      for (const o of this.plugins.values())
        o.play && o.play();
    this._engine.dispatchEvent(je.containerPlay, { container: this }), this.draw(a ?? !1);
  }
  async refresh() {
    if ($t(this))
      return this.stop(), this.start();
  }
  async reset(e) {
    if ($t(this))
      return this._initialSourceOptions = e, this._sourceOptions = e, this._options = co(this._engine, this, this._initialSourceOptions, this.sourceOptions), this.actualOptions = co(this._engine, this, this._options), this.refresh();
  }
  async start() {
    !$t(this) || this.started || (await this.init(), this.started = !0, await new Promise((e) => {
      const a = async () => {
        var o;
        this._eventListeners.addListeners(), this.interactivity.element instanceof HTMLElement && this._intersectionObserver && this._intersectionObserver.observe(this.interactivity.element);
        for (const r of this.plugins.values())
          await ((o = r.start) == null ? void 0 : o.call(r));
        this._engine.dispatchEvent(je.containerStarted, { container: this }), this.play(), e();
      };
      this._delayTimeout = setTimeout(() => void a(), this._delay);
    }));
  }
  stop() {
    var e;
    if (!(!$t(this) || !this.started)) {
      this._delayTimeout && (clearTimeout(this._delayTimeout), delete this._delayTimeout), this._firstStart = !0, this.started = !1, this._eventListeners.removeListeners(), this.pause(), this.particles.clear(), this.canvas.stop(), this.interactivity.element instanceof HTMLElement && this._intersectionObserver && this._intersectionObserver.unobserve(this.interactivity.element);
      for (const a of this.plugins.values())
        (e = a.stop) == null || e.call(a);
      for (const a of this.plugins.keys())
        this.plugins.delete(a);
      this._sourceOptions = this._options, this._engine.dispatchEvent(je.containerStopped, { container: this });
    }
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const e = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    return this.actualOptions.setTheme(this._currentTheme), this._responsiveMaxWidth === e ? !1 : (this._responsiveMaxWidth = e, !0);
  }
}
class z3 {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  addEventListener(e, a) {
    this.removeEventListener(e, a);
    let o = this._listeners.get(e);
    o || (o = [], this._listeners.set(e, o)), o.push(a);
  }
  dispatchEvent(e, a) {
    const o = this._listeners.get(e);
    o == null || o.forEach((r) => r(a));
  }
  hasEventListener(e) {
    return !!this._listeners.get(e);
  }
  removeAllEventListeners(e) {
    e ? this._listeners.delete(e) : this._listeners = /* @__PURE__ */ new Map();
  }
  removeEventListener(e, a) {
    const o = this._listeners.get(e);
    if (!o)
      return;
    const r = o.length, c = o.indexOf(a);
    c < _m || (r === gc ? this._listeners.delete(e) : o.splice(c, gc));
  }
}
async function jd(i, e, a, o = !1) {
  let r = e.get(i);
  return (!r || o) && (r = await Promise.all([...a.values()].map((c) => c(i))), e.set(i, r)), r;
}
async function A3(i) {
  const e = Mn(i.url, i.index);
  if (!e)
    return i.fallback;
  const a = await fetch(e);
  return a.ok ? await a.json() : (pa().error(`${An} ${a.status} while retrieving config file`), i.fallback);
}
const O3 = (i) => {
  let e;
  if (i instanceof HTMLCanvasElement || i.tagName.toLowerCase() === Rd)
    e = i, e.dataset[oa] || (e.dataset[oa] = Tx);
  else {
    const o = i.getElementsByTagName(Rd);
    o.length ? (e = o[AR], e.dataset[oa] = Tx) : (e = document.createElement(Rd), e.dataset[oa] = O1, i.appendChild(e));
  }
  const a = "100%";
  return e.style.width || (e.style.width = a), e.style.height || (e.style.height = a), e;
}, D3 = (i, e) => {
  let a = e ?? document.getElementById(i);
  return a || (a = document.createElement("div"), a.id = i, a.dataset[oa] = O1, document.body.append(a), a);
};
class R3 {
  constructor() {
    this._configs = /* @__PURE__ */ new Map(), this._domArray = [], this._eventDispatcher = new z3(), this._initialized = !1, this.plugins = [], this.colorManagers = /* @__PURE__ */ new Map(), this.easingFunctions = /* @__PURE__ */ new Map(), this._initializers = {
      interactors: /* @__PURE__ */ new Map(),
      movers: /* @__PURE__ */ new Map(),
      updaters: /* @__PURE__ */ new Map()
    }, this.interactors = /* @__PURE__ */ new Map(), this.movers = /* @__PURE__ */ new Map(), this.updaters = /* @__PURE__ */ new Map(), this.presets = /* @__PURE__ */ new Map(), this.effectDrawers = /* @__PURE__ */ new Map(), this.shapeDrawers = /* @__PURE__ */ new Map(), this.pathGenerators = /* @__PURE__ */ new Map();
  }
  get configs() {
    const e = {};
    for (const [a, o] of this._configs)
      e[a] = o;
    return e;
  }
  get items() {
    return this._domArray;
  }
  get version() {
    return "3.9.1";
  }
  async addColorManager(e, a = !0) {
    this.colorManagers.set(e.key, e), await this.refresh(a);
  }
  addConfig(e) {
    const a = e.key ?? e.name ?? "default";
    this._configs.set(a, e), this._eventDispatcher.dispatchEvent(je.configAdded, { data: { name: a, config: e } });
  }
  async addEasing(e, a, o = !0) {
    this.getEasing(e) || (this.easingFunctions.set(e, a), await this.refresh(o));
  }
  async addEffect(e, a, o = !0) {
    pn(e, (r) => {
      this.getEffectDrawer(r) || this.effectDrawers.set(r, a);
    }), await this.refresh(o);
  }
  addEventListener(e, a) {
    this._eventDispatcher.addEventListener(e, a);
  }
  async addInteractor(e, a, o = !0) {
    this._initializers.interactors.set(e, a), await this.refresh(o);
  }
  async addMover(e, a, o = !0) {
    this._initializers.movers.set(e, a), await this.refresh(o);
  }
  async addParticleUpdater(e, a, o = !0) {
    this._initializers.updaters.set(e, a), await this.refresh(o);
  }
  async addPathGenerator(e, a, o = !0) {
    this.getPathGenerator(e) || this.pathGenerators.set(e, a), await this.refresh(o);
  }
  async addPlugin(e, a = !0) {
    this.getPlugin(e.id) || this.plugins.push(e), await this.refresh(a);
  }
  async addPreset(e, a, o = !1, r = !0) {
    (o || !this.getPreset(e)) && this.presets.set(e, a), await this.refresh(r);
  }
  async addShape(e, a = !0) {
    for (const o of e.validTypes)
      this.getShapeDrawer(o) || this.shapeDrawers.set(o, e);
    await this.refresh(a);
  }
  checkVersion(e) {
    if (this.version !== e)
      throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${this.version}. Plugin version: ${e}`);
  }
  clearPlugins(e) {
    this.updaters.delete(e), this.movers.delete(e), this.interactors.delete(e);
  }
  dispatchEvent(e, a) {
    this._eventDispatcher.dispatchEvent(e, a);
  }
  dom() {
    return this.items;
  }
  domItem(e) {
    return this.item(e);
  }
  async getAvailablePlugins(e) {
    const a = /* @__PURE__ */ new Map();
    for (const o of this.plugins)
      o.needsPlugin(e.actualOptions) && a.set(o.id, await o.getPlugin(e));
    return a;
  }
  getEasing(e) {
    return this.easingFunctions.get(e) ?? ((a) => a);
  }
  getEffectDrawer(e) {
    return this.effectDrawers.get(e);
  }
  async getInteractors(e, a = !1) {
    return jd(e, this.interactors, this._initializers.interactors, a);
  }
  async getMovers(e, a = !1) {
    return jd(e, this.movers, this._initializers.movers, a);
  }
  getPathGenerator(e) {
    return this.pathGenerators.get(e);
  }
  getPlugin(e) {
    return this.plugins.find((a) => a.id === e);
  }
  getPreset(e) {
    return this.presets.get(e);
  }
  getShapeDrawer(e) {
    return this.shapeDrawers.get(e);
  }
  getSupportedEffects() {
    return this.effectDrawers.keys();
  }
  getSupportedShapes() {
    return this.shapeDrawers.keys();
  }
  async getUpdaters(e, a = !1) {
    return jd(e, this.updaters, this._initializers.updaters, a);
  }
  init() {
    this._initialized || (this._initialized = !0);
  }
  item(e) {
    const { items: a } = this, o = a[e];
    if (!o || o.destroyed) {
      a.splice(e, R1);
      return;
    }
    return o;
  }
  async load(e) {
    var b;
    const a = e.id ?? ((b = e.element) == null ? void 0 : b.id) ?? `tsparticles${Math.floor(jt() * OR)}`, { index: o, url: r } = e, c = r ? await A3({ fallback: e.options, url: r, index: o }) : e.options, f = Mn(c, o), { items: d } = this, m = d.findIndex((S) => S.id.description === a), p = new M3(this, a, f);
    if (m >= DR) {
      const S = this.item(m), w = S ? RR : yc;
      S && !S.destroyed && S.destroy(!1), d.splice(m, w, p);
    } else
      d.push(p);
    const v = D3(a, e.element), g = O3(v);
    return p.canvas.loadCanvas(g), await p.start(), p;
  }
  loadOptions(e, a) {
    this.plugins.forEach((o) => {
      var r;
      return (r = o.loadOptions) == null ? void 0 : r.call(o, e, a);
    });
  }
  loadParticlesOptions(e, a, ...o) {
    const r = this.updaters.get(e);
    r && r.forEach((c) => {
      var f;
      return (f = c.loadOptions) == null ? void 0 : f.call(c, a, ...o);
    });
  }
  async refresh(e = !0) {
    e && await Promise.all(this.items.map((a) => a.refresh()));
  }
  removeEventListener(e, a) {
    this._eventDispatcher.removeEventListener(e, a);
  }
  setOnClickHandler(e) {
    const { items: a } = this;
    if (!a.length)
      throw new Error(`${An} can only set click handlers after calling tsParticles.load()`);
    a.forEach((o) => o.addClickHandler(e));
  }
}
function V3() {
  const i = new R3();
  return i.init(), i;
}
class yi {
  constructor(e) {
    this.type = Ro.external, this.container = e;
  }
}
class vp {
  constructor(e) {
    this.type = Ro.particles, this.container = e;
  }
}
var jn;
(function(i) {
  i.clockwise = "clockwise", i.counterClockwise = "counter-clockwise", i.random = "random";
})(jn || (jn = {}));
var Fx;
(function(i) {
  i.linear = "linear", i.radial = "radial", i.random = "random";
})(Fx || (Fx = {}));
var ha;
(function(i) {
  i.easeInBack = "ease-in-back", i.easeInCirc = "ease-in-circ", i.easeInCubic = "ease-in-cubic", i.easeInLinear = "ease-in-linear", i.easeInQuad = "ease-in-quad", i.easeInQuart = "ease-in-quart", i.easeInQuint = "ease-in-quint", i.easeInExpo = "ease-in-expo", i.easeInSine = "ease-in-sine", i.easeOutBack = "ease-out-back", i.easeOutCirc = "ease-out-circ", i.easeOutCubic = "ease-out-cubic", i.easeOutLinear = "ease-out-linear", i.easeOutQuad = "ease-out-quad", i.easeOutQuart = "ease-out-quart", i.easeOutQuint = "ease-out-quint", i.easeOutExpo = "ease-out-expo", i.easeOutSine = "ease-out-sine", i.easeInOutBack = "ease-in-out-back", i.easeInOutCirc = "ease-in-out-circ", i.easeInOutCubic = "ease-in-out-cubic", i.easeInOutLinear = "ease-in-out-linear", i.easeInOutQuad = "ease-in-out-quad", i.easeInOutQuart = "ease-in-out-quart", i.easeInOutQuint = "ease-in-out-quint", i.easeInOutExpo = "ease-in-out-expo", i.easeInOutSine = "ease-in-out-sine";
})(ha || (ha = {}));
const bp = V3();
ya() || (window.tsParticles = bp);
const k3 = (i) => {
  const e = i.id ?? "tsparticles";
  return ht.useEffect(() => {
    let a;
    return bp.load({ id: e, url: i.url, options: i.options }).then((o) => {
      var r;
      a = o, (r = i.particlesLoaded) == null || r.call(i, o);
    }), () => {
      a == null || a.destroy();
    };
  }, [e, i, i.url, i.options]), /* @__PURE__ */ Xn.jsx("div", { id: e, className: i.className });
};
async function N3(i) {
  await i(bp);
}
const Dm = 0.5, L3 = 2, vs = 0, qn = 1, Kx = 60, Ix = 0, B3 = 0.01, U3 = Math.PI * L3;
function H3(i) {
  const e = i.initialPosition, { dx: a, dy: o } = Ge(e, i.position), r = Math.abs(a), c = Math.abs(o), { maxDistance: f } = i.retina, d = f.horizontal, m = f.vertical;
  if (!d && !m)
    return;
  const p = (d && r >= d) ?? !1, v = (m && c >= m) ?? !1;
  if ((p || v) && !i.misplaced)
    i.misplaced = !!d && r > d || !!m && c > m, d && (i.velocity.x = i.velocity.y * Dm - i.velocity.x), m && (i.velocity.y = i.velocity.x * Dm - i.velocity.y);
  else if ((!d || r < d) && (!m || c < m) && i.misplaced)
    i.misplaced = !1;
  else if (i.misplaced) {
    const g = i.position, b = i.velocity;
    d && (g.x < e.x && b.x < vs || g.x > e.x && b.x > vs) && (b.x *= -jt()), m && (g.y < e.y && b.y < vs || g.y > e.y && b.y > vs) && (b.y *= -jt());
  }
}
function j3(i, e, a, o, r, c, f) {
  P3(i, f);
  const d = i.gravity, m = d != null && d.enable && d.inverse ? -qn : qn;
  r && a && (i.velocity.x += r * f.factor / (Kx * a)), d != null && d.enable && a && (i.velocity.y += m * (d.acceleration * f.factor) / (Kx * a));
  const p = i.moveDecay;
  i.velocity.multTo(p);
  const v = i.velocity.mult(a);
  d != null && d.enable && o > vs && (!d.inverse && v.y >= vs && v.y >= o || d.inverse && v.y <= vs && v.y <= -o) && (v.y = m * o, a && (i.velocity.y = v.y / a));
  const g = i.options.zIndex, b = (qn - i.zIndexFactor) ** g.velocityRate;
  v.multTo(b), v.multTo(c);
  const { position: S } = i;
  S.addTo(v), e.vibrate && (S.x += Math.sin(S.x * Math.cos(S.y)) * c, S.y += Math.cos(S.y * Math.sin(S.x)) * c);
}
function q3(i, e, a) {
  const o = i.container;
  if (!i.spin)
    return;
  const r = i.spin.direction === jn.clockwise, c = {
    x: r ? Math.cos : Math.sin,
    y: r ? Math.sin : Math.cos
  };
  i.position.x = i.spin.center.x + i.spin.radius * c.x(i.spin.angle) * a, i.position.y = i.spin.center.y + i.spin.radius * c.y(i.spin.angle) * a, i.spin.radius += i.spin.acceleration * a;
  const f = Math.max(o.canvas.size.width, o.canvas.size.height), d = f * Dm;
  i.spin.radius > d ? (i.spin.radius = d, i.spin.acceleration *= -qn) : i.spin.radius < Ix && (i.spin.radius = Ix, i.spin.acceleration *= -qn), i.spin.angle += e * B3 * (qn - i.spin.radius / f);
}
function P3(i, e) {
  var f;
  const a = i.options, o = a.move.path;
  if (!o.enable)
    return;
  if (i.lastPathTime <= i.pathDelay) {
    i.lastPathTime += e.value;
    return;
  }
  const c = (f = i.pathGenerator) == null ? void 0 : f.generate(i, e);
  c && i.velocity.addTo(c), o.clamp && (i.velocity.x = On(i.velocity.x, -qn, qn), i.velocity.y = On(i.velocity.y, -qn, qn)), i.lastPathTime -= i.pathDelay;
}
function G3(i) {
  return i.slow.inRange ? i.slow.factor : qn;
}
function Y3(i) {
  const e = i.container, a = i.options, o = a.move.spin;
  if (!o.enable)
    return;
  const r = o.position ?? { x: 50, y: 50 }, c = 0.01, f = {
    x: r.x * c * e.canvas.size.width,
    y: r.y * c * e.canvas.size.height
  }, d = i.getPosition(), m = mn(d, f), p = lt(o.acceleration);
  i.retina.spinAcceleration = p * e.retina.pixelRatio, i.spin = {
    center: f,
    direction: i.velocity.x >= vs ? jn.clockwise : jn.counterClockwise,
    angle: jt() * U3,
    radius: m,
    acceleration: i.retina.spinAcceleration
  };
}
const X3 = 2, Q3 = 1, Z3 = 1;
class F3 {
  init(e) {
    const a = e.options, o = a.move.gravity;
    e.gravity = {
      enable: o.enable,
      acceleration: lt(o.acceleration),
      inverse: o.inverse
    }, Y3(e);
  }
  isEnabled(e) {
    return !e.destroyed && e.options.move.enable;
  }
  move(e, a) {
    var E, R;
    const o = e.options, r = o.move;
    if (!r.enable)
      return;
    const c = e.container, f = c.retina.pixelRatio;
    (E = e.retina).moveSpeed ?? (E.moveSpeed = lt(r.speed) * f), (R = e.retina).moveDrift ?? (R.moveDrift = lt(e.options.move.drift) * f);
    const d = G3(e), m = c.retina.reduceFactor, p = e.retina.moveSpeed, v = e.retina.moveDrift, g = fi(o.size.value) * f, b = r.size ? e.getRadius() / g : Q3, S = a.factor || Z3, w = p * b * d * S / X3, C = e.retina.maxSpeed ?? c.retina.maxSpeed;
    r.spin.enable ? q3(e, w, m) : j3(e, r, w, C, v, m, a), H3(e);
  }
}
async function K3(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addMover("base", () => Promise.resolve(new F3()), e);
}
const I3 = 2, J3 = Math.PI * I3, $3 = 0, Jx = { x: 0, y: 0 };
function W3(i) {
  const { context: e, particle: a, radius: o } = i;
  a.circleRange || (a.circleRange = { min: $3, max: J3 });
  const r = a.circleRange;
  e.arc(Jx.x, Jx.y, o, r.min, r.max, !1);
}
const t4 = 12, e4 = 360, $x = 0;
class n4 {
  constructor() {
    this.validTypes = ["circle"];
  }
  draw(e) {
    W3(e);
  }
  getSidesCount() {
    return t4;
  }
  particleInit(e, a) {
    const o = a.shapeData, r = (o == null ? void 0 : o.angle) ?? {
      max: e4,
      min: $x
    };
    a.circleRange = vo(r) ? { min: bs(r.min), max: bs(r.max) } : {
      min: $x,
      max: bs(r)
    };
  }
}
async function i4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new n4(), e);
}
class s4 {
  constructor(e, a) {
    this._container = e, this._engine = a;
  }
  init(e) {
    const a = Xl(this._engine, e.options.color, e.id, e.options.reduceDuplicates);
    a && (e.color = K1(a, e.options.color.animation, this._container.retina.reduceFactor));
  }
  isEnabled(e) {
    const { h: a, s: o, l: r } = e.options.color.animation, { color: c } = e;
    return !e.destroyed && !e.spawning && ((c == null ? void 0 : c.h.value) !== void 0 && a.enable || (c == null ? void 0 : c.s.value) !== void 0 && o.enable || (c == null ? void 0 : c.l.value) !== void 0 && r.enable);
  }
  update(e, a) {
    I1(e.color, a);
  }
}
async function a4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("color", (a) => Promise.resolve(new s4(a, i)), e);
}
var ia;
(function(i) {
  i[i.r = 1] = "r", i[i.g = 2] = "g", i[i.b = 3] = "b", i[i.a = 4] = "a";
})(ia || (ia = {}));
const o4 = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, l4 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, Uu = 16, r4 = 1, u4 = 255;
class c4 {
  constructor() {
    this.key = "hex", this.stringPrefix = "#";
  }
  handleColor(e) {
    return this._parseString(e.value);
  }
  handleRangeColor(e) {
    return this._parseString(e.value);
  }
  parseString(e) {
    return this._parseString(e);
  }
  _parseString(e) {
    if (typeof e != "string" || !(e != null && e.startsWith(this.stringPrefix)))
      return;
    const a = e.replace(o4, (r, c, f, d, m) => c + c + f + f + d + d + (m !== void 0 ? m + m : "")), o = l4.exec(a);
    return o ? {
      a: o[ia.a] !== void 0 ? parseInt(o[ia.a], Uu) / u4 : r4,
      b: parseInt(o[ia.b], Uu),
      g: parseInt(o[ia.g], Uu),
      r: parseInt(o[ia.r], Uu)
    } : void 0;
  }
}
async function f4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addColorManager(new c4(), e);
}
var bo;
(function(i) {
  i[i.h = 1] = "h", i[i.s = 2] = "s", i[i.l = 3] = "l", i[i.a = 5] = "a";
})(bo || (bo = {}));
class h4 {
  constructor() {
    this.key = "hsl", this.stringPrefix = "hsl";
  }
  handleColor(e) {
    const a = e.value, o = a.hsl ?? e.value;
    if (o.h !== void 0 && o.s !== void 0 && o.l !== void 0)
      return Oo(o);
  }
  handleRangeColor(e) {
    const a = e.value, o = a.hsl ?? e.value;
    if (o.h !== void 0 && o.l !== void 0)
      return Oo({
        h: lt(o.h),
        l: lt(o.l),
        s: lt(o.s)
      });
  }
  parseString(e) {
    if (!e.startsWith("hsl"))
      return;
    const a = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i, o = a.exec(e), r = 4, c = 1, f = 10;
    return o ? v2({
      a: o.length > r ? U1(o[bo.a]) : c,
      h: parseInt(o[bo.h], f),
      l: parseInt(o[bo.l], f),
      s: parseInt(o[bo.s], f)
    }) : void 0;
  }
}
async function d4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addColorManager(new h4(), e);
}
class m4 {
  constructor(e) {
    this.container = e;
  }
  init(e) {
    const a = e.options.opacity, o = 1;
    e.opacity = G1(a, o);
    const r = a.animation;
    r.enable && (e.opacity.velocity = lt(r.speed) / gs * this.container.retina.reduceFactor, r.sync || (e.opacity.velocity *= jt()));
  }
  isEnabled(e) {
    return !e.destroyed && !e.spawning && !!e.opacity && e.opacity.enable && ((e.opacity.maxLoops ?? 0) <= 0 || (e.opacity.maxLoops ?? 0) > 0 && (e.opacity.loops ?? 0) < (e.opacity.maxLoops ?? 0));
  }
  reset(e) {
    e.opacity && (e.opacity.time = 0, e.opacity.loops = 0);
  }
  update(e, a) {
    !this.isEnabled(e) || !e.opacity || mp(e, e.opacity, !0, e.options.opacity.animation.destroy, a);
  }
}
async function p4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("opacity", (a) => Promise.resolve(new m4(a)), e);
}
const bc = 0, Co = 0;
function y4(i) {
  if (i.outMode !== re.bounce && i.outMode !== re.split || i.direction !== Mt.left && i.direction !== Mt.right)
    return;
  i.bounds.right < Co && i.direction === Mt.left ? i.particle.position.x = i.size + i.offset.x : i.bounds.left > i.canvasSize.width && i.direction === Mt.right && (i.particle.position.x = i.canvasSize.width - i.size - i.offset.x);
  const e = i.particle.velocity.x;
  let a = !1;
  if (i.direction === Mt.right && i.bounds.right >= i.canvasSize.width && e > bc || i.direction === Mt.left && i.bounds.left <= Co && e < bc) {
    const r = lt(i.particle.options.bounce.horizontal.value);
    i.particle.velocity.x *= -r, a = !0;
  }
  if (!a)
    return;
  const o = i.offset.x + i.size;
  i.bounds.right >= i.canvasSize.width && i.direction === Mt.right ? i.particle.position.x = i.canvasSize.width - o : i.bounds.left <= Co && i.direction === Mt.left && (i.particle.position.x = o), i.outMode === re.split && i.particle.destroy();
}
function g4(i) {
  if (i.outMode !== re.bounce && i.outMode !== re.split || i.direction !== Mt.bottom && i.direction !== Mt.top)
    return;
  i.bounds.bottom < Co && i.direction === Mt.top ? i.particle.position.y = i.size + i.offset.y : i.bounds.top > i.canvasSize.height && i.direction === Mt.bottom && (i.particle.position.y = i.canvasSize.height - i.size - i.offset.y);
  const e = i.particle.velocity.y;
  let a = !1;
  if (i.direction === Mt.bottom && i.bounds.bottom >= i.canvasSize.height && e > bc || i.direction === Mt.top && i.bounds.top <= Co && e < bc) {
    const r = lt(i.particle.options.bounce.vertical.value);
    i.particle.velocity.y *= -r, a = !0;
  }
  if (!a)
    return;
  const o = i.offset.y + i.size;
  i.bounds.bottom >= i.canvasSize.height && i.direction === Mt.bottom ? i.particle.position.y = i.canvasSize.height - o : i.bounds.top <= Co && i.direction === Mt.top && (i.particle.position.y = o), i.outMode === re.split && i.particle.destroy();
}
class v4 {
  constructor(e) {
    this.container = e, this.modes = [
      re.bounce,
      re.split
    ];
  }
  update(e, a, o, r) {
    if (!this.modes.includes(r))
      return;
    const c = this.container;
    let f = !1;
    for (const b of c.plugins.values())
      if (b.particleBounce !== void 0 && (f = b.particleBounce(e, o, a)), f)
        break;
    if (f)
      return;
    const d = e.getPosition(), m = e.offset, p = e.getRadius(), v = tr(d, p), g = c.canvas.size;
    y4({ particle: e, outMode: r, direction: a, bounds: v, canvasSize: g, offset: m, size: p }), g4({ particle: e, outMode: r, direction: a, bounds: v, canvasSize: g, offset: m, size: p });
  }
}
const Hu = 0;
class b4 {
  constructor(e) {
    this.container = e, this.modes = [re.destroy];
  }
  update(e, a, o, r) {
    if (!this.modes.includes(r))
      return;
    const c = this.container;
    switch (e.outType) {
      case Yn.normal:
      case Yn.outside:
        if (fp(e.position, c.canvas.size, ge.origin, e.getRadius(), a))
          return;
        break;
      case Yn.inside: {
        const { dx: f, dy: d } = Ge(e.position, e.moveCenter), { x: m, y: p } = e.velocity;
        if (m < Hu && f > e.moveCenter.radius || p < Hu && d > e.moveCenter.radius || m >= Hu && f < -e.moveCenter.radius || p >= Hu && d < -e.moveCenter.radius)
          return;
        break;
      }
    }
    c.particles.remove(e, e.group, !0);
  }
}
const ju = 0;
class x4 {
  constructor(e) {
    this.container = e, this.modes = [re.none];
  }
  update(e, a, o, r) {
    if (!this.modes.includes(r) || ((e.options.move.distance.horizontal && (a === Mt.left || a === Mt.right)) ?? (e.options.move.distance.vertical && (a === Mt.top || a === Mt.bottom))))
      return;
    const c = e.options.move.gravity, f = this.container, d = f.canvas.size, m = e.getRadius();
    if (c.enable) {
      const p = e.position;
      (!c.inverse && p.y > d.height + m && a === Mt.bottom || c.inverse && p.y < -m && a === Mt.top) && f.particles.remove(e);
    } else {
      if (e.velocity.y > ju && e.position.y <= d.height + m || e.velocity.y < ju && e.position.y >= -m || e.velocity.x > ju && e.position.x <= d.width + m || e.velocity.x < ju && e.position.x >= -m)
        return;
      fp(e.position, f.canvas.size, ge.origin, m, a) || f.particles.remove(e);
    }
  }
}
const qu = 0, Pu = 0;
class S4 {
  constructor(e) {
    this.container = e, this.modes = [re.out];
  }
  update(e, a, o, r) {
    if (!this.modes.includes(r))
      return;
    const c = this.container;
    switch (e.outType) {
      case Yn.inside: {
        const { x: f, y: d } = e.velocity, m = ge.origin;
        m.length = e.moveCenter.radius, m.angle = e.velocity.angle + Math.PI, m.addTo(ge.create(e.moveCenter));
        const { dx: p, dy: v } = Ge(e.position, m);
        if (f <= qu && p >= Pu || d <= qu && v >= Pu || f >= qu && p <= Pu || d >= qu && v <= Pu)
          return;
        e.position.x = Math.floor(dn({
          min: 0,
          max: c.canvas.size.width
        })), e.position.y = Math.floor(dn({
          min: 0,
          max: c.canvas.size.height
        }));
        const { dx: g, dy: b } = Ge(e.position, e.moveCenter);
        e.direction = Math.atan2(-b, -g), e.velocity.angle = e.direction;
        break;
      }
      default: {
        if (fp(e.position, c.canvas.size, ge.origin, e.getRadius(), a))
          return;
        switch (e.outType) {
          case Yn.outside: {
            e.position.x = Math.floor(dn({
              min: -e.moveCenter.radius,
              max: e.moveCenter.radius
            })) + e.moveCenter.x, e.position.y = Math.floor(dn({
              min: -e.moveCenter.radius,
              max: e.moveCenter.radius
            })) + e.moveCenter.y;
            const { dx: f, dy: d } = Ge(e.position, e.moveCenter);
            e.moveCenter.radius && (e.direction = Math.atan2(d, f), e.velocity.angle = e.direction);
            break;
          }
          case Yn.normal: {
            const f = e.options.move.warp, d = c.canvas.size, m = {
              bottom: d.height + e.getRadius() + e.offset.y,
              left: -e.getRadius() - e.offset.x,
              right: d.width + e.getRadius() + e.offset.x,
              top: -e.getRadius() - e.offset.y
            }, p = e.getRadius(), v = tr(e.position, p);
            a === Mt.right && v.left > d.width + e.offset.x ? (e.position.x = m.left, e.initialPosition.x = e.position.x, f || (e.position.y = jt() * d.height, e.initialPosition.y = e.position.y)) : a === Mt.left && v.right < -e.offset.x && (e.position.x = m.right, e.initialPosition.x = e.position.x, f || (e.position.y = jt() * d.height, e.initialPosition.y = e.position.y)), a === Mt.bottom && v.top > d.height + e.offset.y ? (f || (e.position.x = jt() * d.width, e.initialPosition.x = e.position.x), e.position.y = m.top, e.initialPosition.y = e.position.y) : a === Mt.top && v.bottom < -e.offset.y && (f || (e.position.x = jt() * d.width, e.initialPosition.x = e.position.x), e.position.y = m.bottom, e.initialPosition.y = e.position.y);
            break;
          }
        }
        break;
      }
    }
  }
}
const w4 = (i, e) => i.default === e || i.bottom === e || i.left === e || i.right === e || i.top === e;
class T4 {
  constructor(e) {
    this._addUpdaterIfMissing = (a, o, r) => {
      const c = a.options.move.outModes;
      !this.updaters.has(o) && w4(c, o) && this.updaters.set(o, r(this.container));
    }, this._updateOutMode = (a, o, r, c) => {
      for (const f of this.updaters.values())
        f.update(a, c, o, r);
    }, this.container = e, this.updaters = /* @__PURE__ */ new Map();
  }
  init(e) {
    this._addUpdaterIfMissing(e, re.bounce, (a) => new v4(a)), this._addUpdaterIfMissing(e, re.out, (a) => new S4(a)), this._addUpdaterIfMissing(e, re.destroy, (a) => new b4(a)), this._addUpdaterIfMissing(e, re.none, (a) => new x4(a));
  }
  isEnabled(e) {
    return !e.destroyed && !e.spawning;
  }
  update(e, a) {
    const o = e.options.move.outModes;
    this._updateOutMode(e, a, o.bottom ?? o.default, Mt.bottom), this._updateOutMode(e, a, o.left ?? o.default, Mt.left), this._updateOutMode(e, a, o.right ?? o.default, Mt.right), this._updateOutMode(e, a, o.top ?? o.default, Mt.top);
  }
}
async function E4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("outModes", (a) => Promise.resolve(new T4(a)), e);
}
var xo;
(function(i) {
  i[i.r = 1] = "r", i[i.g = 2] = "g", i[i.b = 3] = "b", i[i.a = 5] = "a";
})(xo || (xo = {}));
class C4 {
  constructor() {
    this.key = "rgb", this.stringPrefix = "rgb";
  }
  handleColor(e) {
    const a = e.value, o = a.rgb ?? e.value;
    if (o.r !== void 0)
      return o;
  }
  handleRangeColor(e) {
    const a = e.value, o = a.rgb ?? e.value;
    if (o.r !== void 0)
      return {
        r: lt(o.r),
        g: lt(o.g),
        b: lt(o.b)
      };
  }
  parseString(e) {
    if (!e.startsWith(this.stringPrefix))
      return;
    const a = /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i, o = a.exec(e), r = 10;
    return o ? {
      a: o.length > 4 ? U1(o[xo.a]) : 1,
      b: parseInt(o[xo.b], r),
      g: parseInt(o[xo.g], r),
      r: parseInt(o[xo.r], r)
    } : void 0;
  }
}
async function _4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addColorManager(new C4(), e);
}
const $s = 0;
class M4 {
  init(e) {
    const a = e.container, o = e.options.size, r = o.animation;
    r.enable && (e.size.velocity = (e.retina.sizeAnimationSpeed ?? a.retina.sizeAnimationSpeed) / gs * a.retina.reduceFactor, r.sync || (e.size.velocity *= jt()));
  }
  isEnabled(e) {
    return !e.destroyed && !e.spawning && e.size.enable && ((e.size.maxLoops ?? $s) <= $s || (e.size.maxLoops ?? $s) > $s && (e.size.loops ?? $s) < (e.size.maxLoops ?? $s));
  }
  reset(e) {
    e.size.loops = $s;
  }
  update(e, a) {
    this.isEnabled(e) && mp(e, e.size, !0, e.options.size.animation.destroy, a);
  }
}
async function z4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("size", () => Promise.resolve(new M4()), e);
}
async function A4(i, e = !0) {
  i.checkVersion("3.9.1"), await f4(i, !1), await d4(i, !1), await _4(i, !1), await K3(i, !1), await i4(i, !1), await a4(i, !1), await p4(i, !1), await E4(i, !1), await z4(i, !1), await i.refresh(e);
}
async function O4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addEasing(ha.easeInQuad, (a) => a ** 2, !1), await i.addEasing(ha.easeOutQuad, (a) => 1 - (1 - a) ** 2, !1), await i.addEasing(ha.easeInOutQuad, (a) => a < 0.5 ? 2 * a ** 2 : 1 - (-2 * a + 2) ** 2 / 2, !1), await i.refresh(e);
}
function D4(i, e) {
  const { context: a, opacity: o } = i, r = 0.5, c = a.globalAlpha;
  if (!e)
    return;
  const f = e.width, d = f * r;
  a.globalAlpha = o, a.drawImage(e, -d, -d, f, f), a.globalAlpha = c;
}
const qd = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"', Wx = 0;
class R4 {
  constructor() {
    this.validTypes = ["emoji"], this._emojiShapeDict = /* @__PURE__ */ new Map();
  }
  destroy() {
    for (const [e, a] of this._emojiShapeDict)
      a instanceof ImageBitmap && (a == null || a.close()), this._emojiShapeDict.delete(e);
  }
  draw(e) {
    const a = e.particle.emojiDataKey;
    if (!a)
      return;
    const o = this._emojiShapeDict.get(a);
    o && D4(e, o);
  }
  async init(e) {
    const a = e.actualOptions, { validTypes: o } = this;
    if (!o.find((f) => ee(f, a.particles.shape.type)))
      return;
    const r = [jx(qd)], c = o.map((f) => a.particles.shape.options[f]).find((f) => !!f);
    c && pn(c, (f) => {
      f.font && r.push(jx(f.font));
    }), await Promise.all(r);
  }
  particleDestroy(e) {
    e.emojiDataKey = void 0;
  }
  particleInit(e, a) {
    const r = a.shapeData;
    if (!(r != null && r.value))
      return;
    const c = Mn(r.value, a.randomIndexData);
    if (!c)
      return;
    const f = typeof c == "string" ? {
      font: r.font ?? qd,
      padding: r.padding ?? Wx,
      value: c
    } : {
      font: qd,
      padding: Wx,
      ...r,
      ...c
    }, d = f.font, m = f.value, p = `${m}_${d}`;
    if (this._emojiShapeDict.has(p)) {
      a.emojiDataKey = p;
      return;
    }
    const v = f.padding * 2, g = fi(a.size.value), b = g + v, S = b * 2;
    let w;
    if (typeof OffscreenCanvas < "u") {
      const C = new OffscreenCanvas(S, S), E = C.getContext("2d");
      if (!E)
        return;
      E.font = `400 ${g * 2}px ${d}`, E.textBaseline = "middle", E.textAlign = "center", E.fillText(m, b, b), w = C.transferToImageBitmap();
    } else {
      const C = document.createElement("canvas");
      C.width = S, C.height = S;
      const E = C.getContext("2d");
      if (!E)
        return;
      E.font = `400 ${g * 2}px ${d}`, E.textBaseline = "middle", E.textAlign = "center", E.fillText(m, b, b), w = C;
    }
    this._emojiShapeDict.set(p, w), a.emojiDataKey = p;
  }
}
async function V4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new R4(), e);
}
const k4 = 1, N4 = 1, iT = 0;
function sT(i, e, a, o, r, c) {
  const f = e.actualOptions.interactivity.modes.attract;
  if (!f)
    return;
  const d = e.particles.quadTree.query(r, c);
  for (const m of d) {
    const { dx: p, dy: v, distance: g } = Ge(m.position, a), b = f.speed * f.factor, S = On(i.getEasing(f.easing)(N4 - g / o) * b, k4, f.maxSpeed), w = ge.create(g ? p / g * S : b, g ? v / g * S : b);
    m.position.subFrom(w);
  }
}
function L4(i, e, a) {
  e.attract || (e.attract = { particles: [] });
  const { attract: o } = e;
  if (o.finish || (o.count || (o.count = 0), o.count++, o.count === e.particles.count && (o.finish = !0)), o.clicking) {
    const r = e.interactivity.mouse.clickPosition, c = e.retina.attractModeDistance;
    if (!c || c < iT || !r)
      return;
    sT(i, e, r, c, new Ve(r.x, r.y, c), (f) => a(f));
  } else o.clicking === !1 && (o.particles = []);
}
function B4(i, e, a) {
  const o = e.interactivity.mouse.position, r = e.retina.attractModeDistance;
  !r || r < iT || !o || sT(i, e, o, r, new Ve(o.x, o.y, r), (c) => a(c));
}
class U4 {
  constructor() {
    this.distance = 200, this.duration = 0.4, this.easing = ha.easeOutQuad, this.factor = 1, this.maxSpeed = 50, this.speed = 1;
  }
  load(e) {
    Q(e) || (e.distance !== void 0 && (this.distance = e.distance), e.duration !== void 0 && (this.duration = e.duration), e.easing !== void 0 && (this.easing = e.easing), e.factor !== void 0 && (this.factor = e.factor), e.maxSpeed !== void 0 && (this.maxSpeed = e.maxSpeed), e.speed !== void 0 && (this.speed = e.speed));
  }
}
const kl = "attract";
let H4 = class extends yi {
  constructor(e, a) {
    super(a), this._engine = e, a.attract || (a.attract = { particles: [] }), this.handleClickMode = (o) => {
      const r = this.container.actualOptions, c = r.interactivity.modes.attract;
      if (!(!c || o !== kl)) {
        a.attract || (a.attract = { particles: [] }), a.attract.clicking = !0, a.attract.count = 0;
        for (const f of a.attract.particles)
          this.isEnabled(f) && f.velocity.setTo(f.initialVelocity);
        a.attract.particles = [], a.attract.finish = !1, setTimeout(() => {
          a.destroyed || (a.attract || (a.attract = { particles: [] }), a.attract.clicking = !1);
        }, c.duration * De);
      }
    };
  }
  clear() {
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.attract;
    a && (e.retina.attractModeDistance = a.distance * e.retina.pixelRatio);
  }
  interact() {
    const e = this.container, a = e.actualOptions, o = e.interactivity.status === da, r = a.interactivity.events, { enable: c, mode: f } = r.onHover, { enable: d, mode: m } = r.onClick;
    o && c && ee(kl, f) ? B4(this._engine, this.container, (p) => this.isEnabled(p)) : d && ee(kl, m) && L4(this._engine, this.container, (p) => this.isEnabled(p));
  }
  isEnabled(e) {
    const a = this.container, o = a.actualOptions, r = a.interactivity.mouse, c = ((e == null ? void 0 : e.interactivity) ?? o.interactivity).events;
    if ((!r.position || !c.onHover.enable) && (!r.clickPosition || !c.onClick.enable))
      return !1;
    const f = c.onHover.mode, d = c.onClick.mode;
    return ee(kl, f) || ee(kl, d);
  }
  loadModeOptions(e, ...a) {
    e.attract || (e.attract = new U4());
    for (const o of a)
      e.attract.load(o == null ? void 0 : o.attract);
  }
  reset() {
  }
};
async function j4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalAttract", (a) => Promise.resolve(new H4(i, a)), e);
}
const q4 = 2, ec = 0.5, P4 = Math.PI * ec, tS = 2, aT = 10, G4 = 0;
function oT(i, e, a, o, r) {
  const c = i.particles.quadTree.query(o, r);
  for (const f of c)
    o instanceof Ve ? q1(zm(f), {
      position: e,
      mass: a ** q4 * P4,
      velocity: ge.origin,
      factor: ge.origin
    }) : o instanceof Qn && c2(f, tr(e, a));
}
function Y4(i, e, a, o) {
  const r = document.querySelectorAll(e);
  r.length && r.forEach((c) => {
    const f = c, d = i.retina.pixelRatio, m = {
      x: (f.offsetLeft + f.offsetWidth * ec) * d,
      y: (f.offsetTop + f.offsetHeight * ec) * d
    }, p = f.offsetWidth * ec * d, v = aT * d, g = a.type === Do.circle ? new Ve(m.x, m.y, p + v) : new Qn(f.offsetLeft * d - v, f.offsetTop * d - v, f.offsetWidth * d + v * tS, f.offsetHeight * d + v * tS);
    o(m, p, g);
  });
}
function X4(i, e, a, o) {
  dp(a, e, (r, c) => Y4(i, r, c, (f, d, m) => oT(i, f, d, m, o)));
}
function Q4(i, e) {
  const a = i.retina.pixelRatio, o = aT * a, r = i.interactivity.mouse.position, c = i.retina.bounceModeDistance;
  !c || c < G4 || !r || oT(i, r, c, new Ve(r.x, r.y, c + o), e);
}
class Z4 {
  constructor() {
    this.distance = 200;
  }
  load(e) {
    Q(e) || e.distance !== void 0 && (this.distance = e.distance);
  }
}
const Gu = "bounce";
class F4 extends yi {
  constructor(e) {
    super(e);
  }
  clear() {
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.bounce;
    a && (e.retina.bounceModeDistance = a.distance * e.retina.pixelRatio);
  }
  interact() {
    const e = this.container, a = e.actualOptions, o = a.interactivity.events, r = e.interactivity.status === da, c = o.onHover.enable, f = o.onHover.mode, d = o.onDiv;
    r && c && ee(Gu, f) ? Q4(this.container, (m) => this.isEnabled(m)) : X4(this.container, d, Gu, (m) => this.isEnabled(m));
  }
  isEnabled(e) {
    const a = this.container, o = a.actualOptions, r = a.interactivity.mouse, c = ((e == null ? void 0 : e.interactivity) ?? o.interactivity).events, f = c.onDiv;
    return !!r.position && c.onHover.enable && ee(Gu, c.onHover.mode) || hp(Gu, f);
  }
  loadModeOptions(e, ...a) {
    e.bounce || (e.bounce = new Z4());
    for (const o of a)
      e.bounce.load(o == null ? void 0 : o.bounce);
  }
  reset() {
  }
}
async function K4(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalBounce", (a) => Promise.resolve(new F4(a)), e);
}
class lT {
  constructor() {
    this.distance = 200, this.duration = 0.4, this.mix = !1;
  }
  load(e) {
    if (!Q(e)) {
      if (e.distance !== void 0 && (this.distance = e.distance), e.duration !== void 0 && (this.duration = e.duration), e.mix !== void 0 && (this.mix = e.mix), e.opacity !== void 0 && (this.opacity = e.opacity), e.color !== void 0) {
        const a = pi(this.color) ? void 0 : this.color;
        this.color = pn(e.color, (o) => Ne.create(a, o));
      }
      e.size !== void 0 && (this.size = e.size);
    }
  }
}
class I4 extends lT {
  constructor() {
    super(), this.selectors = [];
  }
  load(e) {
    super.load(e), !Q(e) && e.selectors !== void 0 && (this.selectors = e.selectors);
  }
}
class J4 extends lT {
  load(e) {
    super.load(e), !Q(e) && (this.divs = pn(e.divs, (a) => {
      const o = new I4();
      return o.load(a), o;
    }));
  }
}
var ui;
(function(i) {
  i.color = "color", i.opacity = "opacity", i.size = "size";
})(ui || (ui = {}));
function eS(i, e, a, o) {
  if (e >= a) {
    const r = i + (e - a) * o;
    return On(r, i, e);
  } else if (e < a) {
    const r = i - (a - e) * o;
    return On(r, e, i);
  }
}
const Ws = "bubble", Pd = 0, $4 = 0, W4 = 2, nS = 1, iS = 1, t5 = 0, e5 = 0, Gd = 0.5, Yd = 1;
class n5 extends yi {
  constructor(e, a) {
    super(e), this._clickBubble = () => {
      var v;
      const o = this.container, r = o.actualOptions, c = o.interactivity.mouse.clickPosition, f = r.interactivity.modes.bubble;
      if (!f || !c)
        return;
      o.bubble || (o.bubble = {});
      const d = o.retina.bubbleModeDistance;
      if (!d || d < Pd)
        return;
      const m = o.particles.quadTree.queryCircle(c, d, (g) => this.isEnabled(g)), { bubble: p } = o;
      for (const g of m) {
        if (!p.clicking)
          continue;
        g.bubble.inRange = !p.durationEnd;
        const b = g.getPosition(), S = mn(b, c), w = ((/* @__PURE__ */ new Date()).getTime() - (o.interactivity.mouse.clickTime ?? $4)) / De;
        w > f.duration && (p.durationEnd = !0), w > f.duration * W4 && (p.clicking = !1, p.durationEnd = !1);
        const C = {
          bubbleObj: {
            optValue: o.retina.bubbleModeSize,
            value: g.bubble.radius
          },
          particlesObj: {
            optValue: fi(g.options.size.value) * o.retina.pixelRatio,
            value: g.size.value
          },
          type: ui.size
        };
        this._process(g, S, w, C);
        const E = {
          bubbleObj: {
            optValue: f.opacity,
            value: g.bubble.opacity
          },
          particlesObj: {
            optValue: fi(g.options.opacity.value),
            value: ((v = g.opacity) == null ? void 0 : v.value) ?? nS
          },
          type: ui.opacity
        };
        this._process(g, S, w, E), !p.durationEnd && S <= d ? this._hoverBubbleColor(g, S) : delete g.bubble.color;
      }
    }, this._hoverBubble = () => {
      const o = this.container, r = o.interactivity.mouse.position, c = o.retina.bubbleModeDistance;
      if (!c || c < Pd || !r)
        return;
      const f = o.particles.quadTree.queryCircle(r, c, (d) => this.isEnabled(d));
      for (const d of f) {
        d.bubble.inRange = !0;
        const m = d.getPosition(), p = mn(m, r), v = iS - p / c;
        p <= c ? v >= e5 && o.interactivity.status === da && (this._hoverBubbleSize(d, v), this._hoverBubbleOpacity(d, v), this._hoverBubbleColor(d, v)) : this.reset(d), o.interactivity.status === wm && this.reset(d);
      }
    }, this._hoverBubbleColor = (o, r, c) => {
      const f = this.container.actualOptions, d = c ?? f.interactivity.modes.bubble;
      if (d) {
        if (!o.bubble.finalColor) {
          const m = d.color;
          if (!m)
            return;
          const p = Mn(m);
          o.bubble.finalColor = Xl(this._engine, p);
        }
        if (o.bubble.finalColor)
          if (d.mix) {
            o.bubble.color = void 0;
            const m = o.getFillColor();
            o.bubble.color = m ? Q1(pp(m, o.bubble.finalColor, iS - r, r)) : o.bubble.finalColor;
          } else
            o.bubble.color = o.bubble.finalColor;
      }
    }, this._hoverBubbleOpacity = (o, r, c) => {
      var b, S;
      const f = this.container, d = f.actualOptions, m = (c == null ? void 0 : c.opacity) ?? ((b = d.interactivity.modes.bubble) == null ? void 0 : b.opacity);
      if (!m)
        return;
      const p = o.options.opacity.value, v = ((S = o.opacity) == null ? void 0 : S.value) ?? nS, g = eS(v, m, fi(p), r);
      g !== void 0 && (o.bubble.opacity = g);
    }, this._hoverBubbleSize = (o, r, c) => {
      const f = this.container, d = c != null && c.size ? c.size * f.retina.pixelRatio : f.retina.bubbleModeSize;
      if (d === void 0)
        return;
      const m = fi(o.options.size.value) * f.retina.pixelRatio, p = o.size.value, v = eS(p, d, m, r);
      v !== void 0 && (o.bubble.radius = v);
    }, this._process = (o, r, c, f) => {
      const d = this.container, m = f.bubbleObj.optValue, p = d.actualOptions, v = p.interactivity.modes.bubble;
      if (!v || m === void 0)
        return;
      const g = v.duration, b = d.retina.bubbleModeDistance, S = f.particlesObj.optValue, w = f.bubbleObj.value, C = f.particlesObj.value ?? t5, E = f.type;
      if (!(!b || b < Pd || m === S))
        if (d.bubble || (d.bubble = {}), d.bubble.durationEnd)
          w && (E === ui.size && delete o.bubble.radius, E === ui.opacity && delete o.bubble.opacity);
        else if (r <= b) {
          if ((w ?? C) !== m) {
            const k = C - c * (C - m) / g;
            E === ui.size && (o.bubble.radius = k), E === ui.opacity && (o.bubble.opacity = k);
          }
        } else
          E === ui.size && delete o.bubble.radius, E === ui.opacity && delete o.bubble.opacity;
    }, this._singleSelectorHover = (o, r, c) => {
      const f = this.container, d = document.querySelectorAll(r), m = f.actualOptions.interactivity.modes.bubble;
      !m || !d.length || d.forEach((p) => {
        const v = p, g = f.retina.pixelRatio, b = {
          x: (v.offsetLeft + v.offsetWidth * Gd) * g,
          y: (v.offsetTop + v.offsetHeight * Gd) * g
        }, S = v.offsetWidth * Gd * g, w = c.type === Do.circle ? new Ve(b.x, b.y, S) : new Qn(v.offsetLeft * g, v.offsetTop * g, v.offsetWidth * g, v.offsetHeight * g), C = f.particles.quadTree.query(w, (E) => this.isEnabled(E));
        for (const E of C) {
          if (!w.contains(E.getPosition()))
            continue;
          E.bubble.inRange = !0;
          const R = m.divs, k = j1(R, v);
          (!E.bubble.div || E.bubble.div !== v) && (this.clear(E, o, !0), E.bubble.div = v), this._hoverBubbleSize(E, Yd, k), this._hoverBubbleOpacity(E, Yd, k), this._hoverBubbleColor(E, Yd, k);
        }
      });
    }, this._engine = a, e.bubble || (e.bubble = {}), this.handleClickMode = (o) => {
      o === Ws && (e.bubble || (e.bubble = {}), e.bubble.clicking = !0);
    };
  }
  clear(e, a, o) {
    e.bubble.inRange && !o || (delete e.bubble.div, delete e.bubble.opacity, delete e.bubble.radius, delete e.bubble.color);
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.bubble;
    a && (e.retina.bubbleModeDistance = a.distance * e.retina.pixelRatio, a.size !== void 0 && (e.retina.bubbleModeSize = a.size * e.retina.pixelRatio));
  }
  interact(e) {
    const a = this.container.actualOptions, o = a.interactivity.events, r = o.onHover, c = o.onClick, f = r.enable, d = r.mode, m = c.enable, p = c.mode, v = o.onDiv;
    f && ee(Ws, d) ? this._hoverBubble() : m && ee(Ws, p) ? this._clickBubble() : dp(Ws, v, (g, b) => this._singleSelectorHover(e, g, b));
  }
  isEnabled(e) {
    const a = this.container, o = a.actualOptions, r = a.interactivity.mouse, c = ((e == null ? void 0 : e.interactivity) ?? o.interactivity).events, { onClick: f, onDiv: d, onHover: m } = c, p = hp(Ws, d);
    return p || m.enable && r.position || f.enable && r.clickPosition ? ee(Ws, m.mode) || ee(Ws, f.mode) || p : !1;
  }
  loadModeOptions(e, ...a) {
    e.bubble || (e.bubble = new J4());
    for (const o of a)
      e.bubble.load(o == null ? void 0 : o.bubble);
  }
  reset(e) {
    e.bubble.inRange = !1;
  }
}
async function i5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalBubble", (a) => Promise.resolve(new n5(a, i)), e);
}
class s5 {
  constructor() {
    this.opacity = 0.5;
  }
  load(e) {
    Q(e) || e.opacity !== void 0 && (this.opacity = e.opacity);
  }
}
class a5 {
  constructor() {
    this.distance = 80, this.links = new s5(), this.radius = 60;
  }
  load(e) {
    Q(e) || (e.distance !== void 0 && (this.distance = e.distance), this.links.load(e.links), e.radius !== void 0 && (this.radius = e.radius));
  }
}
const sS = 0, aS = 1, o5 = 0;
function l5(i, e, a, o) {
  const r = Math.floor(a.getRadius() / e.getRadius()), c = e.getFillColor(), f = a.getFillColor();
  if (!c || !f)
    return;
  const d = e.getPosition(), m = a.getPosition(), p = pp(c, f, e.getRadius(), a.getRadius()), v = i.createLinearGradient(d.x, d.y, m.x, m.y);
  return v.addColorStop(sS, Ql(c, o)), v.addColorStop(On(r, sS, aS), Li(p, o)), v.addColorStop(aS, Ql(f, o)), v;
}
function r5(i, e, a, o, r) {
  jl(i, o, r), i.lineWidth = e, i.strokeStyle = a, i.stroke();
}
function u5(i, e, a, o) {
  const r = i.actualOptions, c = r.interactivity.modes.connect;
  if (c)
    return l5(e, a, o, c.links.opacity);
}
function c5(i, e, a) {
  i.canvas.draw((o) => {
    const r = u5(i, o, e, a);
    if (!r)
      return;
    const c = e.getPosition(), f = a.getPosition();
    r5(o, e.retina.linksWidth ?? o5, r, c, f);
  });
}
const f5 = "connect", oS = 0;
class h5 extends yi {
  constructor(e) {
    super(e);
  }
  clear() {
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.connect;
    a && (e.retina.connectModeDistance = a.distance * e.retina.pixelRatio, e.retina.connectModeRadius = a.radius * e.retina.pixelRatio);
  }
  interact() {
    const e = this.container;
    if (e.actualOptions.interactivity.events.onHover.enable && e.interactivity.status === "pointermove") {
      const o = e.interactivity.mouse.position, { connectModeDistance: r, connectModeRadius: c } = e.retina;
      if (!r || r < oS || !c || c < oS || !o)
        return;
      const f = Math.abs(c), d = e.particles.quadTree.queryCircle(o, f, (m) => this.isEnabled(m));
      d.forEach((m, p) => {
        const v = m.getPosition(), g = 1;
        for (const b of d.slice(p + g)) {
          const S = b.getPosition(), w = Math.abs(r), C = Math.abs(v.x - S.x), E = Math.abs(v.y - S.y);
          C < w && E < w && c5(e, m, b);
        }
      });
    }
  }
  isEnabled(e) {
    const a = this.container, o = a.interactivity.mouse, r = ((e == null ? void 0 : e.interactivity) ?? a.actualOptions.interactivity).events;
    return r.onHover.enable && o.position ? ee(f5, r.onHover.mode) : !1;
  }
  loadModeOptions(e, ...a) {
    e.connect || (e.connect = new a5());
    for (const o of a)
      e.connect.load(o == null ? void 0 : o.connect);
  }
  reset() {
  }
}
async function d5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalConnect", (a) => Promise.resolve(new h5(a)), e);
}
class m5 {
  constructor() {
    this.blink = !1, this.consent = !1, this.opacity = 1;
  }
  load(e) {
    Q(e) || (e.blink !== void 0 && (this.blink = e.blink), e.color !== void 0 && (this.color = Ne.create(this.color, e.color)), e.consent !== void 0 && (this.consent = e.consent), e.opacity !== void 0 && (this.opacity = e.opacity));
  }
}
class p5 {
  constructor() {
    this.distance = 100, this.links = new m5();
  }
  load(e) {
    Q(e) || (e.distance !== void 0 && (this.distance = e.distance), this.links.load(e.links));
  }
}
const y5 = 0;
function g5(i, e, a, o, r, c) {
  jl(i, a, o), i.strokeStyle = Li(r, c), i.lineWidth = e, i.stroke();
}
function v5(i, e, a, o, r) {
  i.canvas.draw((c) => {
    const f = e.getPosition();
    g5(c, e.retina.linksWidth ?? y5, f, r, a, o);
  });
}
const b5 = "grab", x5 = 0, S5 = 0;
class w5 extends yi {
  constructor(e, a) {
    super(e), this._engine = a;
  }
  clear() {
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.grab;
    a && (e.retina.grabModeDistance = a.distance * e.retina.pixelRatio);
  }
  interact() {
    var d;
    const e = this.container, a = e.actualOptions, o = a.interactivity;
    if (!o.modes.grab || !o.events.onHover.enable || e.interactivity.status !== da)
      return;
    const r = e.interactivity.mouse.position;
    if (!r)
      return;
    const c = e.retina.grabModeDistance;
    if (!c || c < x5)
      return;
    const f = e.particles.quadTree.queryCircle(r, c, (m) => this.isEnabled(m));
    for (const m of f) {
      const p = m.getPosition(), v = mn(p, r);
      if (v > c)
        continue;
      const g = o.modes.grab.links, b = g.opacity, S = b - v * b / c;
      if (S <= S5)
        continue;
      const w = g.color ?? ((d = m.options.links) == null ? void 0 : d.color);
      if (!e.particles.grabLineColor && w) {
        const E = o.modes.grab.links;
        e.particles.grabLineColor = F1(this._engine, w, E.blink, E.consent);
      }
      const C = Om(m, void 0, e.particles.grabLineColor);
      C && v5(e, m, C, S, r);
    }
  }
  isEnabled(e) {
    const a = this.container, o = a.interactivity.mouse, r = ((e == null ? void 0 : e.interactivity) ?? a.actualOptions.interactivity).events;
    return r.onHover.enable && !!o.position && ee(b5, r.onHover.mode);
  }
  loadModeOptions(e, ...a) {
    e.grab || (e.grab = new p5());
    for (const o of a)
      e.grab.load(o == null ? void 0 : o.grab);
  }
  reset() {
  }
}
async function T5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalGrab", (a) => Promise.resolve(new w5(a, i)), e);
}
const E5 = "pause";
class C5 extends yi {
  constructor(e) {
    super(e), this.handleClickMode = (a) => {
      if (a !== E5)
        return;
      const o = this.container;
      o.animationStatus ? o.pause() : o.play();
    };
  }
  clear() {
  }
  init() {
  }
  interact() {
  }
  isEnabled() {
    return !0;
  }
  reset() {
  }
}
async function _5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalPause", (a) => Promise.resolve(new C5(a)), e);
}
class M5 {
  constructor() {
    this.default = !0, this.groups = [], this.quantity = 4;
  }
  load(e) {
    if (Q(e))
      return;
    e.default !== void 0 && (this.default = e.default), e.groups !== void 0 && (this.groups = e.groups.map((o) => o)), this.groups.length || (this.default = !0);
    const a = e.quantity;
    a !== void 0 && (this.quantity = Rt(a)), this.particles = pn(e.particles, (o) => ke({}, o));
  }
}
const z5 = "push", A5 = 0;
class O5 extends yi {
  constructor(e) {
    super(e), this.handleClickMode = (a) => {
      if (a !== z5)
        return;
      const o = this.container, r = o.actualOptions, c = r.interactivity.modes.push;
      if (!c)
        return;
      const f = lt(c.quantity);
      if (f <= A5)
        return;
      const d = Cc([void 0, ...c.groups]), m = d !== void 0 ? o.actualOptions.particles.groups[d] : void 0, p = Mn(c.particles), v = ke(m, p);
      o.particles.push(f, o.interactivity.mouse, v, d);
    };
  }
  clear() {
  }
  init() {
  }
  interact() {
  }
  isEnabled() {
    return !0;
  }
  loadModeOptions(e, ...a) {
    e.push || (e.push = new M5());
    for (const o of a)
      e.push.load(o == null ? void 0 : o.push);
  }
  reset() {
  }
}
async function D5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalPush", (a) => Promise.resolve(new O5(a)), e);
}
class R5 {
  constructor() {
    this.quantity = 2;
  }
  load(e) {
    if (Q(e))
      return;
    const a = e.quantity;
    a !== void 0 && (this.quantity = Rt(a));
  }
}
const V5 = "remove";
class k5 extends yi {
  constructor(e) {
    super(e), this.handleClickMode = (a) => {
      const o = this.container, r = o.actualOptions;
      if (!r.interactivity.modes.remove || a !== V5)
        return;
      const c = lt(r.interactivity.modes.remove.quantity);
      o.particles.removeQuantity(c);
    };
  }
  clear() {
  }
  init() {
  }
  interact() {
  }
  isEnabled() {
    return !0;
  }
  loadModeOptions(e, ...a) {
    e.remove || (e.remove = new R5());
    for (const o of a)
      e.remove.load(o == null ? void 0 : o.remove);
  }
  reset() {
  }
}
async function N5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalRemove", (a) => Promise.resolve(new k5(a)), e);
}
class rT {
  constructor() {
    this.distance = 200, this.duration = 0.4, this.factor = 100, this.speed = 1, this.maxSpeed = 50, this.easing = ha.easeOutQuad;
  }
  load(e) {
    Q(e) || (e.distance !== void 0 && (this.distance = e.distance), e.duration !== void 0 && (this.duration = e.duration), e.easing !== void 0 && (this.easing = e.easing), e.factor !== void 0 && (this.factor = e.factor), e.speed !== void 0 && (this.speed = e.speed), e.maxSpeed !== void 0 && (this.maxSpeed = e.maxSpeed));
  }
}
class L5 extends rT {
  constructor() {
    super(), this.selectors = [];
  }
  load(e) {
    super.load(e), !Q(e) && e.selectors !== void 0 && (this.selectors = e.selectors);
  }
}
class B5 extends rT {
  load(e) {
    super.load(e), !Q(e) && (this.divs = pn(e.divs, (a) => {
      const o = new L5();
      return o.load(a), o;
    }));
  }
}
const ta = "repulse", U5 = 0, H5 = 6, j5 = 3, q5 = 2, P5 = 0, G5 = 0, Y5 = 1, Xd = 0.5;
class X5 extends yi {
  constructor(e, a) {
    super(a), this._clickRepulse = () => {
      const o = this.container, r = o.actualOptions.interactivity.modes.repulse;
      if (!r)
        return;
      const c = o.repulse ?? { particles: [] };
      if (c.finish || (c.count || (c.count = 0), c.count++, c.count === o.particles.count && (c.finish = !0)), c.clicking) {
        const f = o.retina.repulseModeDistance;
        if (!f || f < U5)
          return;
        const d = Math.pow(f / H5, j5), m = o.interactivity.mouse.clickPosition;
        if (m === void 0)
          return;
        const p = new Ve(m.x, m.y, d), v = o.particles.quadTree.query(p, (g) => this.isEnabled(g));
        for (const g of v) {
          const { dx: b, dy: S, distance: w } = Ge(m, g.position), C = w ** q5, E = r.speed, R = -d * E / C;
          if (C <= d) {
            c.particles.push(g);
            const k = ge.create(b, S);
            k.length = R, g.velocity.setTo(k);
          }
        }
      } else if (c.clicking === !1) {
        for (const f of c.particles)
          f.velocity.setTo(f.initialVelocity);
        c.particles = [];
      }
    }, this._hoverRepulse = () => {
      const o = this.container, r = o.interactivity.mouse.position, c = o.retina.repulseModeDistance;
      !c || c < P5 || !r || this._processRepulse(r, c, new Ve(r.x, r.y, c));
    }, this._processRepulse = (o, r, c, f) => {
      const d = this.container, m = d.particles.quadTree.query(c, (E) => this.isEnabled(E)), p = d.actualOptions.interactivity.modes.repulse;
      if (!p)
        return;
      const { easing: v, speed: g, factor: b, maxSpeed: S } = p, w = this._engine.getEasing(v), C = ((f == null ? void 0 : f.speed) ?? g) * b;
      for (const E of m) {
        const { dx: R, dy: k, distance: U } = Ge(E.position, o), L = On(w(Y5 - U / r) * C, G5, S), P = ge.create(U ? R / U * L : C, U ? k / U * L : C);
        E.position.addTo(P);
      }
    }, this._singleSelectorRepulse = (o, r) => {
      const c = this.container, f = c.actualOptions.interactivity.modes.repulse;
      if (!f)
        return;
      const d = document.querySelectorAll(o);
      d.length && d.forEach((m) => {
        const p = m, v = c.retina.pixelRatio, g = {
          x: (p.offsetLeft + p.offsetWidth * Xd) * v,
          y: (p.offsetTop + p.offsetHeight * Xd) * v
        }, b = p.offsetWidth * Xd * v, S = r.type === Do.circle ? new Ve(g.x, g.y, b) : new Qn(p.offsetLeft * v, p.offsetTop * v, p.offsetWidth * v, p.offsetHeight * v), w = f.divs, C = j1(w, p);
        this._processRepulse(g, b, S, C);
      });
    }, this._engine = e, a.repulse || (a.repulse = { particles: [] }), this.handleClickMode = (o) => {
      const r = this.container.actualOptions, c = r.interactivity.modes.repulse;
      if (!c || o !== ta)
        return;
      a.repulse || (a.repulse = { particles: [] });
      const f = a.repulse;
      f.clicking = !0, f.count = 0;
      for (const d of a.repulse.particles)
        this.isEnabled(d) && d.velocity.setTo(d.initialVelocity);
      f.particles = [], f.finish = !1, setTimeout(() => {
        a.destroyed || (f.clicking = !1);
      }, c.duration * De);
    };
  }
  clear() {
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.repulse;
    a && (e.retina.repulseModeDistance = a.distance * e.retina.pixelRatio);
  }
  interact() {
    const e = this.container, a = e.actualOptions, o = e.interactivity.status === da, r = a.interactivity.events, c = r.onHover, f = c.enable, d = c.mode, m = r.onClick, p = m.enable, v = m.mode, g = r.onDiv;
    o && f && ee(ta, d) ? this._hoverRepulse() : p && ee(ta, v) ? this._clickRepulse() : dp(ta, g, (b, S) => this._singleSelectorRepulse(b, S));
  }
  isEnabled(e) {
    const a = this.container, o = a.actualOptions, r = a.interactivity.mouse, c = ((e == null ? void 0 : e.interactivity) ?? o.interactivity).events, f = c.onDiv, d = c.onHover, m = c.onClick, p = hp(ta, f);
    if (!(p || d.enable && r.position || m.enable && r.clickPosition))
      return !1;
    const v = d.mode, g = m.mode;
    return ee(ta, v) || ee(ta, g) || p;
  }
  loadModeOptions(e, ...a) {
    e.repulse || (e.repulse = new B5());
    for (const o of a)
      e.repulse.load(o == null ? void 0 : o.repulse);
  }
  reset() {
  }
}
async function Q5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalRepulse", (a) => Promise.resolve(new X5(i, a)), e);
}
class Z5 {
  constructor() {
    this.factor = 3, this.radius = 200;
  }
  load(e) {
    Q(e) || (e.factor !== void 0 && (this.factor = e.factor), e.radius !== void 0 && (this.radius = e.radius));
  }
}
const F5 = "slow", K5 = 0;
class I5 extends yi {
  constructor(e) {
    super(e);
  }
  clear(e, a, o) {
    e.slow.inRange && !o || (e.slow.factor = 1);
  }
  init() {
    const e = this.container, a = e.actualOptions.interactivity.modes.slow;
    a && (e.retina.slowModeRadius = a.radius * e.retina.pixelRatio);
  }
  interact() {
  }
  isEnabled(e) {
    const a = this.container, o = a.interactivity.mouse, r = ((e == null ? void 0 : e.interactivity) ?? a.actualOptions.interactivity).events;
    return r.onHover.enable && !!o.position && ee(F5, r.onHover.mode);
  }
  loadModeOptions(e, ...a) {
    e.slow || (e.slow = new Z5());
    for (const o of a)
      e.slow.load(o == null ? void 0 : o.slow);
  }
  reset(e) {
    e.slow.inRange = !1;
    const a = this.container, o = a.actualOptions, r = a.interactivity.mouse.position, c = a.retina.slowModeRadius, f = o.interactivity.modes.slow;
    if (!f || !c || c < K5 || !r)
      return;
    const d = e.getPosition(), m = mn(r, d), p = m / c, v = f.factor, { slow: g } = e;
    m > c || (g.inRange = !0, g.factor = p / v);
  }
}
async function J5(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("externalSlow", (a) => Promise.resolve(new I5(a)), e);
}
const $5 = 0, W5 = 1, tV = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function eV(i, e, a) {
  const { svgData: o } = i;
  if (!o)
    return "";
  const r = Ql(e, a);
  if (o.includes("fill"))
    return o.replace(tV, () => r);
  const c = o.indexOf(">");
  return `${o.substring($5, c)} fill="${r}"${o.substring(c)}`;
}
async function _c(i) {
  return new Promise((e) => {
    i.loading = !0;
    const a = new Image();
    i.element = a, a.addEventListener("load", () => {
      i.loading = !1, e();
    }), a.addEventListener("error", () => {
      i.element = void 0, i.error = !0, i.loading = !1, pa().error(`${An} loading image: ${i.source}`), e();
    }), a.src = i.source;
  });
}
async function nV(i) {
  if (i.type !== "svg") {
    await _c(i);
    return;
  }
  i.loading = !0;
  const e = await fetch(i.source);
  e.ok ? i.svgData = await e.text() : (pa().error(`${An} Image not found`), i.error = !0), i.loading = !1;
}
function iV(i, e, a, o) {
  var f;
  const r = eV(i, a, ((f = o.opacity) == null ? void 0 : f.value) ?? W5), c = {
    color: a,
    gif: e.gif,
    data: {
      ...i,
      svgData: r
    },
    loaded: !1,
    ratio: e.width / e.height,
    replaceColor: e.replaceColor,
    source: e.src
  };
  return new Promise((d) => {
    const m = new Blob([r], { type: "image/svg+xml" }), p = URL || window.URL || window.webkitURL || window, v = p.createObjectURL(m), g = new Image();
    g.addEventListener("load", () => {
      c.loaded = !0, c.element = g, d(c), p.revokeObjectURL(v);
    });
    const b = async () => {
      p.revokeObjectURL(v);
      const S = {
        ...i,
        error: !1,
        loading: !0
      };
      await _c(S), c.loaded = !0, c.element = S.element, d(c);
    };
    g.addEventListener("error", () => void b()), g.src = v;
  });
}
const Qd = [0, 4, 2, 1], lS = [8, 8, 4, 2];
class sV {
  constructor(e) {
    this.pos = 0, this.data = new Uint8ClampedArray(e);
  }
  getString(e) {
    const a = this.data.slice(this.pos, this.pos + e);
    return this.pos += a.length, a.reduce((o, r) => o + String.fromCharCode(r), "");
  }
  nextByte() {
    return this.data[this.pos++];
  }
  nextTwoBytes() {
    return this.pos += 2, this.data[this.pos - 2] + (this.data[this.pos - 1] << 8);
  }
  readSubBlocks() {
    let e = "", a = 0;
    const o = 0, r = 0;
    do {
      a = this.data[this.pos++];
      for (let c = a; --c >= o; e += String.fromCharCode(this.data[this.pos++]))
        ;
    } while (a !== r);
    return e;
  }
  readSubBlocksBin() {
    let e = this.data[this.pos], a = 0;
    const o = 0, r = 1;
    for (let f = 0; e !== o; f += e + r, e = this.data[this.pos + f])
      a += e;
    const c = new Uint8Array(a);
    e = this.data[this.pos++];
    for (let f = 0; e !== o; e = this.data[this.pos++])
      for (let d = e; --d >= o; c[f++] = this.data[this.pos++])
        ;
    return c;
  }
  skipSubBlocks() {
    for (const e = 1, a = 0; this.data[this.pos] !== a; this.pos += this.data[this.pos] + e)
      ;
    this.pos++;
  }
}
var Hn;
(function(i) {
  i[i.Replace = 0] = "Replace", i[i.Combine = 1] = "Combine", i[i.RestoreBackground = 2] = "RestoreBackground", i[i.RestorePrevious = 3] = "RestorePrevious", i[i.UndefinedA = 4] = "UndefinedA", i[i.UndefinedB = 5] = "UndefinedB", i[i.UndefinedC = 6] = "UndefinedC", i[i.UndefinedD = 7] = "UndefinedD";
})(Hn || (Hn = {}));
var Ni;
(function(i) {
  i[i.Extension = 33] = "Extension", i[i.ApplicationExtension = 255] = "ApplicationExtension", i[i.GraphicsControlExtension = 249] = "GraphicsControlExtension", i[i.PlainTextExtension = 1] = "PlainTextExtension", i[i.CommentExtension = 254] = "CommentExtension", i[i.Image = 44] = "Image", i[i.EndOfFile = 59] = "EndOfFile";
})(Ni || (Ni = {}));
const Je = {
  x: 0,
  y: 0
}, aV = 0, rS = 0.5, oV = 0, uS = 0, Rm = 0;
function uT(i, e) {
  const a = [];
  for (let o = 0; o < e; o++)
    a.push({
      r: i.data[i.pos],
      g: i.data[i.pos + 1],
      b: i.data[i.pos + 2]
    }), i.pos += 3;
  return a;
}
function lV(i, e, a, o) {
  switch (i.nextByte()) {
    case Ni.GraphicsControlExtension: {
      const r = e.frames[a(!1)];
      i.pos++;
      const c = i.nextByte();
      r.GCreserved = (c & 224) >>> 5, r.disposalMethod = (c & 28) >>> 2, r.userInputDelayFlag = (c & 2) === 2;
      const f = (c & 1) === 1;
      r.delayTime = i.nextTwoBytes() * 10;
      const d = i.nextByte();
      f && o(d), i.pos++;
      break;
    }
    case Ni.ApplicationExtension: {
      i.pos++;
      const r = {
        identifier: i.getString(8),
        authenticationCode: i.getString(3),
        data: i.readSubBlocksBin()
      };
      e.applicationExtensions.push(r);
      break;
    }
    case Ni.CommentExtension: {
      e.comments.push([a(!1), i.readSubBlocks()]);
      break;
    }
    case Ni.PlainTextExtension: {
      if (e.globalColorTable.length === 0)
        throw new EvalError("plain text extension without global color table");
      i.pos++, e.frames[a(!1)].plainTextData = {
        left: i.nextTwoBytes(),
        top: i.nextTwoBytes(),
        width: i.nextTwoBytes(),
        height: i.nextTwoBytes(),
        charSize: {
          width: i.nextTwoBytes(),
          height: i.nextTwoBytes()
        },
        foregroundColor: i.nextByte(),
        backgroundColor: i.nextByte(),
        text: i.readSubBlocks()
      };
      break;
    }
    default:
      i.skipSubBlocks();
      break;
  }
}
async function rV(i, e, a, o, r, c) {
  const f = e.frames[o(!0)];
  f.left = i.nextTwoBytes(), f.top = i.nextTwoBytes(), f.width = i.nextTwoBytes(), f.height = i.nextTwoBytes();
  const d = i.nextByte(), m = (d & 128) === 128, p = (d & 64) === 64;
  f.sortFlag = (d & 32) === 32, f.reserved = (d & 24) >>> 3;
  const v = 1 << (d & 7) + 1;
  m && (f.localColorTable = uT(i, v));
  const g = (R) => {
    const { r: k, g: U, b: L } = (m ? f.localColorTable : e.globalColorTable)[R];
    return R !== r(null) ? { r: k, g: U, b: L, a: 255 } : { r: k, g: U, b: L, a: a ? ~~((k + U + L) / 3) : 0 };
  }, b = (() => {
    try {
      return new ImageData(f.width, f.height, { colorSpace: "srgb" });
    } catch (R) {
      if (R instanceof DOMException && R.name === "IndexSizeError")
        return null;
      throw R;
    }
  })();
  if (b == null)
    throw new EvalError("GIF frame size is to large");
  const S = i.nextByte(), w = i.readSubBlocksBin(), C = 1 << S, E = (R, k) => {
    const U = R >>> 3, L = R & 7;
    return (w[U] + (w[U + 1] << 8) + (w[U + 2] << 16) & (1 << k) - 1 << L) >>> L;
  };
  if (p) {
    for (let R = 0, k = S + 1, U = 0, L = [[0]], P = 0; P < 4; P++)
      if (Qd[P] < f.height) {
        let J = 0, Y = 0, B = !1;
        for (; !B; ) {
          const rt = R;
          if (R = E(U, k), U += k + 1, R === C) {
            k = S + 1, L.length = C + 2;
            for (let F = 0; F < L.length; F++)
              L[F] = F < C ? [F] : [];
          } else {
            R >= L.length ? L.push(L[rt].concat(L[rt][0])) : rt !== C && L.push(L[rt].concat(L[R][0]));
            for (const F of L[R]) {
              const { r: pt, g: bt, b: vt, a: kt } = g(F);
              b.data.set([pt, bt, vt, kt], Qd[P] * f.width + lS[P] * Y + J % (f.width * 4)), J += 4;
            }
            L.length === 1 << k && k < 12 && k++;
          }
          J === f.width * 4 * (Y + 1) && (Y++, Qd[P] + lS[P] * Y >= f.height && (B = !0));
        }
      }
    f.image = b, f.bitmap = await createImageBitmap(b);
  } else {
    let R = 0, k = S + 1, U = 0, L = -4, P = !1;
    const J = [[0]];
    for (; !P; ) {
      const Y = R;
      if (R = E(U, k), U += k, R === C) {
        k = S + 1, J.length = C + 2;
        for (let B = 0; B < J.length; B++)
          J[B] = B < C ? [B] : [];
      } else {
        if (R === C + 1) {
          P = !0;
          break;
        }
        R >= J.length ? J.push(J[Y].concat(J[Y][0])) : Y !== C && J.push(J[Y].concat(J[R][0]));
        for (const B of J[R]) {
          const { r: rt, g: F, b: pt, a: bt } = g(B);
          b.data.set([rt, F, pt, bt], L += 4);
        }
        J.length >= 1 << k && k < 12 && k++;
      }
    }
    f.image = b, f.bitmap = await createImageBitmap(b);
  }
}
async function uV(i, e, a, o, r, c) {
  switch (i.nextByte()) {
    case Ni.EndOfFile:
      return !0;
    case Ni.Image:
      await rV(i, e, a, o, r);
      break;
    case Ni.Extension:
      lV(i, e, o, r);
      break;
    default:
      throw new EvalError("undefined block found");
  }
  return !1;
}
function cV(i) {
  for (const e of i.applicationExtensions)
    if (e.identifier + e.authenticationCode === "NETSCAPE2.0")
      return e.data[1] + (e.data[2] << 8);
  return NaN;
}
async function fV(i, e, a) {
  a || (a = !1);
  const o = await fetch(i);
  if (!o.ok && o.status === 404)
    throw new EvalError("file not found");
  const r = await o.arrayBuffer(), c = {
    width: 0,
    height: 0,
    totalTime: 0,
    colorRes: 0,
    pixelAspectRatio: 0,
    frames: [],
    sortFlag: !1,
    globalColorTable: [],
    backgroundImage: new ImageData(1, 1, { colorSpace: "srgb" }),
    comments: [],
    applicationExtensions: []
  }, f = new sV(new Uint8ClampedArray(r));
  if (f.getString(6) !== "GIF89a")
    throw new Error("not a supported GIF file");
  c.width = f.nextTwoBytes(), c.height = f.nextTwoBytes();
  const d = f.nextByte(), m = (d & 128) === 128;
  c.colorRes = (d & 112) >>> 4, c.sortFlag = (d & 8) === 8;
  const p = 1 << (d & 7) + 1, v = f.nextByte();
  c.pixelAspectRatio = f.nextByte(), c.pixelAspectRatio !== 0 && (c.pixelAspectRatio = (c.pixelAspectRatio + 15) / 64), m && (c.globalColorTable = uT(f, p));
  const g = (() => {
    try {
      return new ImageData(c.width, c.height, { colorSpace: "srgb" });
    } catch (L) {
      if (L instanceof DOMException && L.name === "IndexSizeError")
        return null;
      throw L;
    }
  })();
  if (g == null)
    throw new Error("GIF frame size is to large");
  const { r: b, g: S, b: w } = c.globalColorTable[v];
  g.data.set(m ? [b, S, w, 255] : [0, 0, 0, 0]);
  for (let L = 4; L < g.data.length; L *= 2)
    g.data.copyWithin(L, 0, L);
  c.backgroundImage = g;
  let C = -1, E = !0, R = -1;
  const k = (L) => (L && (E = !0), C), U = (L) => (L != null && (R = L), R);
  try {
    do
      E && (c.frames.push({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        disposalMethod: Hn.Replace,
        image: new ImageData(1, 1, { colorSpace: "srgb" }),
        plainTextData: null,
        userInputDelayFlag: !1,
        delayTime: 0,
        sortFlag: !1,
        localColorTable: [],
        reserved: 0,
        GCreserved: 0
      }), C++, R = -1, E = !1);
    while (!await uV(f, c, a, k, U, e));
    c.frames.length--;
    for (const L of c.frames) {
      if (L.userInputDelayFlag && L.delayTime === 0) {
        c.totalTime = 1 / 0;
        break;
      }
      c.totalTime += L.delayTime;
    }
    return c;
  } catch (L) {
    throw L instanceof EvalError ? new Error(`error while parsing frame ${C} "${L.message}"`) : L;
  }
}
function hV(i) {
  const { context: e, radius: a, particle: o, delta: r } = i, c = o.image;
  if (!(c != null && c.gifData) || !c.gif)
    return;
  const f = new OffscreenCanvas(c.gifData.width, c.gifData.height), d = f.getContext("2d");
  if (!d)
    throw new Error("could not create offscreen canvas context");
  d.imageSmoothingQuality = "low", d.imageSmoothingEnabled = !1, d.clearRect(Je.x, Je.y, f.width, f.height), o.gifLoopCount === void 0 && (o.gifLoopCount = c.gifLoopCount ?? Rm);
  let m = o.gifFrame ?? aV;
  const p = { x: -c.gifData.width * rS, y: -c.gifData.height * rS }, v = c.gifData.frames[m];
  if (o.gifTime === void 0 && (o.gifTime = oV), !!v.bitmap) {
    switch (e.scale(a / c.gifData.width, a / c.gifData.height), v.disposalMethod) {
      case Hn.UndefinedA:
      case Hn.UndefinedB:
      case Hn.UndefinedC:
      case Hn.UndefinedD:
      case Hn.Replace:
        d.drawImage(v.bitmap, v.left, v.top), e.drawImage(f, p.x, p.y), d.clearRect(Je.x, Je.y, f.width, f.height);
        break;
      case Hn.Combine:
        d.drawImage(v.bitmap, v.left, v.top), e.drawImage(f, p.x, p.y);
        break;
      case Hn.RestoreBackground:
        d.drawImage(v.bitmap, v.left, v.top), e.drawImage(f, p.x, p.y), d.clearRect(Je.x, Je.y, f.width, f.height), c.gifData.globalColorTable.length ? d.putImageData(c.gifData.backgroundImage, p.x, p.y) : d.putImageData(c.gifData.frames[uS].image, p.x + v.left, p.y + v.top);
        break;
      case Hn.RestorePrevious:
        {
          const g = d.getImageData(Je.x, Je.y, f.width, f.height);
          d.drawImage(v.bitmap, v.left, v.top), e.drawImage(f, p.x, p.y), d.clearRect(Je.x, Je.y, f.width, f.height), d.putImageData(g, Je.x, Je.y);
        }
        break;
    }
    if (o.gifTime += r.value, o.gifTime > v.delayTime) {
      if (o.gifTime -= v.delayTime, ++m >= c.gifData.frames.length) {
        if (--o.gifLoopCount <= Rm)
          return;
        m = uS, d.clearRect(Je.x, Je.y, f.width, f.height);
      }
      o.gifFrame = m;
    }
    e.scale(c.gifData.width / a, c.gifData.height / a);
  }
}
async function dV(i) {
  if (i.type !== "gif") {
    await _c(i);
    return;
  }
  i.loading = !0;
  try {
    i.gifData = await fV(i.source), i.gifLoopCount = cV(i.gifData) ?? Rm, i.gifLoopCount || (i.gifLoopCount = 1 / 0);
  } catch {
    i.error = !0;
  }
  i.loading = !1;
}
const mV = 2, pV = 1, yV = 12, gV = 1;
class vV {
  constructor(e) {
    this.validTypes = ["image", "images"], this.loadImageShape = async (a) => {
      if (!this._engine.loadImage)
        throw new Error(`${An} image shape not initialized`);
      await this._engine.loadImage({
        gif: a.gif,
        name: a.name,
        replaceColor: a.replaceColor ?? !1,
        src: a.src
      });
    }, this._engine = e;
  }
  addImage(e) {
    this._engine.images || (this._engine.images = []), this._engine.images.push(e);
  }
  draw(e) {
    const { context: a, radius: o, particle: r, opacity: c } = e, f = r.image, d = f == null ? void 0 : f.element;
    if (f) {
      if (a.globalAlpha = c, f.gif && f.gifData)
        hV(e);
      else if (d) {
        const m = f.ratio, p = {
          x: -o,
          y: -o
        }, v = o * mV;
        a.drawImage(d, p.x, p.y, v, v / m);
      }
      a.globalAlpha = pV;
    }
  }
  getSidesCount() {
    return yV;
  }
  async init(e) {
    const a = e.actualOptions;
    if (!(!a.preload || !this._engine.loadImage))
      for (const o of a.preload)
        await this._engine.loadImage(o);
  }
  loadShape(e) {
    if (e.shape !== "image" && e.shape !== "images")
      return;
    this._engine.images || (this._engine.images = []);
    const a = e.shapeData;
    if (!a)
      return;
    this._engine.images.find((r) => r.name === a.name || r.source === a.src) || this.loadImageShape(a).then(() => {
      this.loadShape(e);
    });
  }
  particleInit(e, a) {
    if (a.shape !== "image" && a.shape !== "images")
      return;
    this._engine.images || (this._engine.images = []);
    const o = this._engine.images, r = a.shapeData;
    if (!r)
      return;
    const c = a.getFillColor(), f = o.find((m) => m.name === r.name || m.source === r.src);
    if (!f)
      return;
    const d = r.replaceColor ?? f.replaceColor;
    if (f.loading) {
      setTimeout(() => {
        this.particleInit(e, a);
      });
      return;
    }
    (async () => {
      let m;
      f.svgData && c ? m = await iV(f, r, c, a) : m = {
        color: c,
        data: f,
        element: f.element,
        gif: f.gif,
        gifData: f.gifData,
        gifLoopCount: f.gifLoopCount,
        loaded: !0,
        ratio: r.width && r.height ? r.width / r.height : f.ratio ?? gV,
        replaceColor: d,
        source: r.src
      }, m.ratio || (m.ratio = 1);
      const p = r.fill ?? a.shapeFill, v = r.close ?? a.shapeClose, g = {
        image: m,
        fill: p,
        close: v
      };
      a.image = g.image, a.shapeFill = g.fill, a.shapeClose = g.close;
    })();
  }
}
class bV {
  constructor() {
    this.src = "", this.gif = !1;
  }
  load(e) {
    Q(e) || (e.gif !== void 0 && (this.gif = e.gif), e.height !== void 0 && (this.height = e.height), e.name !== void 0 && (this.name = e.name), e.replaceColor !== void 0 && (this.replaceColor = e.replaceColor), e.src !== void 0 && (this.src = e.src), e.width !== void 0 && (this.width = e.width));
  }
}
class xV {
  constructor(e) {
    this.id = "imagePreloader", this._engine = e;
  }
  async getPlugin() {
    return await Promise.resolve(), {};
  }
  loadOptions(e, a) {
    if (!(a != null && a.preload))
      return;
    e.preload || (e.preload = []);
    const o = e.preload;
    for (const r of a.preload) {
      const c = o.find((f) => f.name === r.name || f.src === r.src);
      if (c)
        c.load(r);
      else {
        const f = new bV();
        f.load(r), o.push(f);
      }
    }
  }
  needsPlugin() {
    return !0;
  }
}
const SV = 3;
function wV(i) {
  i.loadImage || (i.loadImage = async (e) => {
    if (!e.name && !e.src)
      throw new Error(`${An} no image source provided`);
    if (i.images || (i.images = []), !i.images.find((a) => a.name === e.name || a.source === e.src))
      try {
        const a = {
          gif: e.gif ?? !1,
          name: e.name ?? e.src,
          source: e.src,
          type: e.src.substring(e.src.length - SV),
          error: !1,
          loading: !0,
          replaceColor: e.replaceColor,
          ratio: e.width && e.height ? e.width / e.height : void 0
        };
        i.images.push(a);
        let o;
        e.gif ? o = dV : o = e.replaceColor ? nV : _c, await o(a);
      } catch {
        throw new Error(`${An} ${e.name ?? e.src} not found`);
      }
  });
}
async function TV(i, e = !0) {
  i.checkVersion("3.9.1"), wV(i);
  const a = new xV(i);
  await i.addPlugin(a, e), await i.addShape(new vV(i), e);
}
class EV extends va {
  constructor() {
    super(), this.sync = !1;
  }
  load(e) {
    Q(e) || (super.load(e), e.sync !== void 0 && (this.sync = e.sync));
  }
}
class CV extends va {
  constructor() {
    super(), this.sync = !1;
  }
  load(e) {
    Q(e) || (super.load(e), e.sync !== void 0 && (this.sync = e.sync));
  }
}
class _V {
  constructor() {
    this.count = 0, this.delay = new EV(), this.duration = new CV();
  }
  load(e) {
    Q(e) || (e.count !== void 0 && (this.count = e.count), this.delay.load(e.delay), this.duration.load(e.duration));
  }
}
const fo = 0, MV = -1, cS = 0, fS = 0;
function zV(i, e, a) {
  if (!i.life)
    return;
  const o = i.life;
  let r = !1;
  if (i.spawning)
    if (o.delayTime += e.value, o.delayTime >= i.life.delay)
      r = !0, i.spawning = !1, o.delayTime = fo, o.time = fo;
    else
      return;
  if (o.duration === MV || i.spawning || (r ? o.time = fo : o.time += e.value, o.time < o.duration))
    return;
  if (o.time = fo, i.life.count > cS && i.life.count--, i.life.count === cS) {
    i.destroy();
    return;
  }
  const c = Rt(fS, a.width), f = Rt(fS, a.width);
  i.position.x = dn(c), i.position.y = dn(f), i.spawning = !0, o.delayTime = fo, o.time = fo, i.reset();
  const d = i.options.life;
  d && (o.delay = lt(d.delay.value) * De, o.duration = lt(d.duration.value) * De);
}
const ea = 0, hS = 1, dS = -1;
class AV {
  constructor(e) {
    this.container = e;
  }
  init(e) {
    const a = this.container, o = e.options, r = o.life;
    r && (e.life = {
      delay: a.retina.reduceFactor ? lt(r.delay.value) * (r.delay.sync ? hS : jt()) / a.retina.reduceFactor * De : ea,
      delayTime: ea,
      duration: a.retina.reduceFactor ? lt(r.duration.value) * (r.duration.sync ? hS : jt()) / a.retina.reduceFactor * De : ea,
      time: ea,
      count: r.count
    }, e.life.duration <= ea && (e.life.duration = dS), e.life.count <= ea && (e.life.count = dS), e.life && (e.spawning = e.life.delay > ea));
  }
  isEnabled(e) {
    return !e.destroyed;
  }
  loadOptions(e, ...a) {
    e.life || (e.life = new _V());
    for (const o of a)
      e.life.load(o == null ? void 0 : o.life);
  }
  update(e, a) {
    !this.isEnabled(e) || !e.life || zV(e, a, this.container.canvas.size);
  }
}
async function OV(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("life", async (a) => Promise.resolve(new AV(a)), e);
}
function DV(i) {
  const { context: e, particle: a, radius: o } = i, r = a.shapeData, c = 0;
  e.moveTo(-o, c), e.lineTo(o, c), e.lineCap = (r == null ? void 0 : r.cap) ?? "butt";
}
const RV = 1;
class VV {
  constructor() {
    this.validTypes = ["line"];
  }
  draw(e) {
    DV(e);
  }
  getSidesCount() {
    return RV;
  }
}
async function kV(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new VV(), e);
}
const mS = 0.5;
class NV {
  init() {
  }
  isEnabled(e) {
    return !ya() && !e.destroyed && e.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }
  move(e) {
    const a = e.container, o = a.actualOptions, r = o.interactivity.events.onHover.parallax;
    if (ya() || !r.enable)
      return;
    const c = r.force, f = a.interactivity.mouse.position;
    if (!f)
      return;
    const d = a.canvas.size, m = {
      x: d.width * mS,
      y: d.height * mS
    }, p = r.smooth, v = e.getRadius() / c, g = {
      x: (f.x - m.x) * v,
      y: (f.y - m.y) * v
    }, { offset: b } = e;
    b.x += (g.x - b.x) / p, b.y += (g.y - b.y) / p;
  }
}
async function LV(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addMover("parallax", () => Promise.resolve(new NV()), e);
}
const pS = 1e3, BV = 1;
class UV extends vp {
  constructor(e) {
    super(e);
  }
  clear() {
  }
  init() {
  }
  interact(e) {
    const a = this.container;
    e.attractDistance === void 0 && (e.attractDistance = lt(e.options.move.attract.distance) * a.retina.pixelRatio);
    const o = e.attractDistance, r = e.getPosition(), c = a.particles.quadTree.queryCircle(r, o);
    for (const f of c) {
      if (e === f || !f.options.move.attract.enable || f.destroyed || f.spawning)
        continue;
      const d = f.getPosition(), { dx: m, dy: p } = Ge(r, d), v = e.options.move.attract.rotate, g = m / (v.x * pS), b = p / (v.y * pS), S = f.size.value / e.size.value, w = BV / S;
      e.velocity.x -= g * S, e.velocity.y -= b * S, f.velocity.x += g * w, f.velocity.y += b * w;
    }
  }
  isEnabled(e) {
    return e.options.move.attract.enable;
  }
  reset() {
  }
}
async function HV(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("particlesAttract", (a) => Promise.resolve(new UV(a)), e);
}
const jV = 0.5, qV = 10, PV = 0;
function yS(i, e, a, o, r, c) {
  const f = On(i.options.collisions.absorb.speed * r.factor / qV, PV, o);
  i.size.value += f * jV, a.size.value -= f, o <= c && (a.size.value = 0, a.destroy());
}
function GV(i, e, a, o) {
  const r = i.getRadius(), c = e.getRadius();
  r === void 0 && c !== void 0 ? i.destroy() : r !== void 0 && c === void 0 ? e.destroy() : r !== void 0 && c !== void 0 && (r >= c ? yS(i, r, e, c, a, o) : yS(e, c, i, r, a, o));
}
const gS = (i) => {
  i.collisionMaxSpeed === void 0 && (i.collisionMaxSpeed = lt(i.options.collisions.maxSpeed)), i.velocity.length > i.collisionMaxSpeed && (i.velocity.length = i.collisionMaxSpeed);
};
function cT(i, e) {
  q1(zm(i), zm(e)), gS(i), gS(e);
}
function YV(i, e) {
  !i.unbreakable && !e.unbreakable && cT(i, e), i.getRadius() === void 0 && e.getRadius() !== void 0 ? i.destroy() : i.getRadius() !== void 0 && e.getRadius() === void 0 ? e.destroy() : i.getRadius() !== void 0 && e.getRadius() !== void 0 && (i.getRadius() >= e.getRadius() ? e : i).destroy();
}
function XV(i, e, a, o) {
  switch (i.options.collisions.mode) {
    case To.absorb: {
      GV(i, e, a, o);
      break;
    }
    case To.bounce: {
      cT(i, e);
      break;
    }
    case To.destroy: {
      YV(i, e);
      break;
    }
  }
}
const QV = 2;
class ZV extends vp {
  constructor(e) {
    super(e);
  }
  clear() {
  }
  init() {
  }
  interact(e, a) {
    if (e.destroyed || e.spawning)
      return;
    const o = this.container, r = e.getPosition(), c = e.getRadius(), f = o.particles.quadTree.queryCircle(r, c * QV);
    for (const d of f) {
      if (e === d || !d.options.collisions.enable || e.options.collisions.mode !== d.options.collisions.mode || d.destroyed || d.spawning)
        continue;
      const m = d.getPosition(), p = d.getRadius();
      if (Math.abs(Math.round(r.z) - Math.round(m.z)) > c + p)
        continue;
      const v = mn(r, m), g = c + p;
      v > g || XV(e, d, a, o.retina.pixelRatio);
    }
  }
  isEnabled(e) {
    return e.options.collisions.enable;
  }
  reset() {
  }
}
async function FV(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addInteractor("particlesCollisions", (a) => Promise.resolve(new ZV(a)), e);
}
const Zd = 2;
class KV extends Ve {
  constructor(e, a, o, r) {
    super(e, a, o), this.canvasSize = r, this.canvasSize = { ...r };
  }
  contains(e) {
    const { width: a, height: o } = this.canvasSize, { x: r, y: c } = e;
    return super.contains(e) || super.contains({ x: r - a, y: c }) || super.contains({ x: r - a, y: c - o }) || super.contains({ x: r, y: c - o });
  }
  intersects(e) {
    if (super.intersects(e))
      return !0;
    const a = e, o = e, r = {
      x: e.position.x - this.canvasSize.width,
      y: e.position.y - this.canvasSize.height
    };
    if (o.radius !== void 0) {
      const c = new Ve(r.x, r.y, o.radius * Zd);
      return super.intersects(c);
    } else if (a.size !== void 0) {
      const c = new Qn(r.x, r.y, a.size.width * Zd, a.size.height * Zd);
      return super.intersects(c);
    }
    return !1;
  }
}
class IV {
  constructor() {
    this.blur = 5, this.color = new Ne(), this.color.value = "#000", this.enable = !1;
  }
  load(e) {
    Q(e) || (e.blur !== void 0 && (this.blur = e.blur), this.color = Ne.create(this.color, e.color), e.enable !== void 0 && (this.enable = e.enable));
  }
}
class JV {
  constructor() {
    this.enable = !1, this.frequency = 1;
  }
  load(e) {
    Q(e) || (e.color !== void 0 && (this.color = Ne.create(this.color, e.color)), e.enable !== void 0 && (this.enable = e.enable), e.frequency !== void 0 && (this.frequency = e.frequency), e.opacity !== void 0 && (this.opacity = e.opacity));
  }
}
class $V {
  constructor() {
    this.blink = !1, this.color = new Ne(), this.color.value = "#fff", this.consent = !1, this.distance = 100, this.enable = !1, this.frequency = 1, this.opacity = 1, this.shadow = new IV(), this.triangles = new JV(), this.width = 1, this.warp = !1;
  }
  load(e) {
    Q(e) || (e.id !== void 0 && (this.id = e.id), e.blink !== void 0 && (this.blink = e.blink), this.color = Ne.create(this.color, e.color), e.consent !== void 0 && (this.consent = e.consent), e.distance !== void 0 && (this.distance = e.distance), e.enable !== void 0 && (this.enable = e.enable), e.frequency !== void 0 && (this.frequency = e.frequency), e.opacity !== void 0 && (this.opacity = e.opacity), this.shadow.load(e.shadow), this.triangles.load(e.triangles), e.width !== void 0 && (this.width = e.width), e.warp !== void 0 && (this.warp = e.warp));
  }
}
const vS = 2, WV = 1, Yu = {
  x: 0,
  y: 0
}, tk = 0;
function ek(i, e, a, o, r) {
  const { dx: c, dy: f, distance: d } = Ge(i, e);
  if (!r || d <= a)
    return d;
  const m = {
    x: Math.abs(c),
    y: Math.abs(f)
  }, p = {
    x: Math.min(m.x, o.width - m.x),
    y: Math.min(m.y, o.height - m.y)
  };
  return Math.sqrt(p.x ** vS + p.y ** vS);
}
class nk extends vp {
  constructor(e, a) {
    super(e), this._setColor = (o) => {
      if (!o.options.links)
        return;
      const r = this._linkContainer, c = o.options.links;
      let f = c.id === void 0 ? r.particles.linksColor : r.particles.linksColors.get(c.id);
      if (f)
        return;
      const d = c.color;
      f = F1(this._engine, d, c.blink, c.consent), c.id === void 0 ? r.particles.linksColor = f : r.particles.linksColors.set(c.id, f);
    }, this._linkContainer = e, this._engine = a;
  }
  clear() {
  }
  init() {
    this._linkContainer.particles.linksColor = void 0, this._linkContainer.particles.linksColors = /* @__PURE__ */ new Map();
  }
  interact(e) {
    if (!e.options.links)
      return;
    e.links = [];
    const a = e.getPosition(), o = this.container, r = o.canvas.size;
    if (a.x < Yu.x || a.y < Yu.y || a.x > r.width || a.y > r.height)
      return;
    const c = e.options.links, f = c.opacity, d = e.retina.linksDistance ?? tk, m = c.warp;
    let p;
    m ? p = new KV(a.x, a.y, d, r) : p = new Ve(a.x, a.y, d);
    const v = o.particles.quadTree.query(p);
    for (const g of v) {
      const b = g.options.links;
      if (e === g || !(b != null && b.enable) || c.id !== b.id || g.spawning || g.destroyed || !g.links || e.links.some((E) => E.destination === g) || g.links.some((E) => E.destination === e))
        continue;
      const S = g.getPosition();
      if (S.x < Yu.x || S.y < Yu.y || S.x > r.width || S.y > r.height)
        continue;
      const w = ek(a, S, d, r, m && b.warp);
      if (w > d)
        continue;
      const C = (WV - w / d) * f;
      this._setColor(e), e.links.push({
        destination: g,
        opacity: C
      });
    }
  }
  isEnabled(e) {
    var a;
    return !!((a = e.options.links) != null && a.enable);
  }
  loadParticlesOptions(e, ...a) {
    e.links || (e.links = new $V());
    for (const o of a)
      e.links.load(o == null ? void 0 : o.links);
  }
  reset() {
  }
}
async function ik(i, e = !0) {
  await i.addInteractor("particlesLinks", async (a) => Promise.resolve(new nk(a, i)), e);
}
function sk(i, e, a, o) {
  i.beginPath(), i.moveTo(e.x, e.y), i.lineTo(a.x, a.y), i.lineTo(o.x, o.y), i.closePath();
}
function ak(i) {
  let e = !1;
  const { begin: a, end: o, engine: r, maxDistance: c, context: f, canvasSize: d, width: m, backgroundMask: p, colorLine: v, opacity: g, links: b } = i;
  if (mn(a, o) <= c)
    jl(f, a, o), e = !0;
  else if (b.warp) {
    let w, C;
    const E = {
      x: o.x - d.width,
      y: o.y
    }, R = Ge(a, E);
    if (R.distance <= c) {
      const k = a.y - R.dy / R.dx * a.x;
      w = { x: 0, y: k }, C = { x: d.width, y: k };
    } else {
      const k = {
        x: o.x,
        y: o.y - d.height
      }, U = Ge(a, k);
      if (U.distance <= c) {
        const P = -(a.y - U.dy / U.dx * a.x) / (U.dy / U.dx);
        w = { x: P, y: 0 }, C = { x: P, y: d.height };
      } else {
        const L = {
          x: o.x - d.width,
          y: o.y - d.height
        }, P = Ge(a, L);
        if (P.distance <= c) {
          const J = a.y - P.dy / P.dx * a.x;
          w = { x: -J / (P.dy / P.dx), y: J }, C = { x: w.x + d.width, y: w.y + d.height };
        }
      }
    }
    w && C && (jl(f, a, w), jl(f, o, C), e = !0);
  }
  if (!e)
    return;
  f.lineWidth = m, p.enable && (f.globalCompositeOperation = p.composite), f.strokeStyle = Li(v, g);
  const { shadow: S } = b;
  if (S.enable) {
    const w = Gn(r, S.color);
    w && (f.shadowBlur = S.blur, f.shadowColor = Li(w));
  }
  f.stroke();
}
function ok(i) {
  const { context: e, pos1: a, pos2: o, pos3: r, backgroundMask: c, colorTriangle: f, opacityTriangle: d } = i;
  sk(e, a, o, r), c.enable && (e.globalCompositeOperation = c.composite), e.fillStyle = Li(f, d), e.fill();
}
function lk(i) {
  return i.sort((e, a) => e - a), i.join("_");
}
function bS(i, e) {
  const a = lk(i.map((r) => r.id));
  let o = e.get(a);
  return o === void 0 && (o = jt(), e.set(a, o)), o;
}
const xS = 0, Fd = 0, SS = 0, rk = 0.5, uk = 1;
class ck {
  constructor(e, a) {
    this._drawLinkLine = (o, r) => {
      const c = o.options.links;
      if (!(c != null && c.enable))
        return;
      const f = this._container, d = f.actualOptions, m = r.destination, p = o.getPosition(), v = m.getPosition();
      let g = r.opacity;
      f.canvas.draw((b) => {
        var k;
        let S;
        const w = (k = o.options.twinkle) == null ? void 0 : k.lines;
        if (w != null && w.enable) {
          const U = w.frequency, L = Gn(this._engine, w.color);
          jt() < U && L && (S = L, g = lt(w.opacity));
        }
        if (!S) {
          const U = c.id !== void 0 ? f.particles.linksColors.get(c.id) : f.particles.linksColor;
          S = Om(o, m, U);
        }
        if (!S)
          return;
        const C = o.retina.linksWidth ?? Fd, E = o.retina.linksDistance ?? SS, { backgroundMask: R } = d;
        ak({
          context: b,
          width: C,
          begin: p,
          end: v,
          engine: this._engine,
          maxDistance: E,
          canvasSize: f.canvas.size,
          links: c,
          backgroundMask: R,
          colorLine: S,
          opacity: g
        });
      });
    }, this._drawLinkTriangle = (o, r, c) => {
      const f = o.options.links;
      if (!(f != null && f.enable))
        return;
      const d = f.triangles;
      if (!d.enable)
        return;
      const m = this._container, p = m.actualOptions, v = r.destination, g = c.destination, b = d.opacity ?? (r.opacity + c.opacity) * rk;
      b <= xS || m.canvas.draw((S) => {
        const w = o.getPosition(), C = v.getPosition(), E = g.getPosition(), R = o.retina.linksDistance ?? SS;
        if (mn(w, C) > R || mn(E, C) > R || mn(E, w) > R)
          return;
        let k = Gn(this._engine, d.color);
        if (!k) {
          const U = f.id !== void 0 ? m.particles.linksColors.get(f.id) : m.particles.linksColor;
          k = Om(o, v, U);
        }
        k && ok({
          context: S,
          pos1: w,
          pos2: C,
          pos3: E,
          backgroundMask: p.backgroundMask,
          colorTriangle: k,
          opacityTriangle: b
        });
      });
    }, this._drawTriangles = (o, r, c, f) => {
      var p, v, g;
      const d = c.destination;
      if (!((p = o.links) != null && p.triangles.enable && ((v = d.options.links) != null && v.triangles.enable)))
        return;
      const m = (g = d.links) == null ? void 0 : g.filter((b) => {
        const S = this._getLinkFrequency(d, b.destination);
        return d.options.links && S <= d.options.links.frequency && f.findIndex((C) => C.destination === b.destination) >= 0;
      });
      if (m != null && m.length)
        for (const b of m) {
          const S = b.destination;
          this._getTriangleFrequency(r, d, S) > o.links.triangles.frequency || this._drawLinkTriangle(r, c, b);
        }
    }, this._getLinkFrequency = (o, r) => bS([o, r], this._freqs.links), this._getTriangleFrequency = (o, r, c) => bS([o, r, c], this._freqs.triangles), this._container = e, this._engine = a, this._freqs = {
      links: /* @__PURE__ */ new Map(),
      triangles: /* @__PURE__ */ new Map()
    };
  }
  drawParticle(e, a) {
    const { links: o, options: r } = a;
    if (!(o != null && o.length))
      return;
    const c = o.filter((f) => r.links && (r.links.frequency >= uk || this._getLinkFrequency(a, f.destination) <= r.links.frequency));
    for (const f of c)
      this._drawTriangles(r, a, f, c), f.opacity > xS && (a.retina.linksWidth ?? Fd) > Fd && this._drawLinkLine(a, f);
  }
  async init() {
    this._freqs.links = /* @__PURE__ */ new Map(), this._freqs.triangles = /* @__PURE__ */ new Map(), await Promise.resolve();
  }
  particleCreated(e) {
    if (e.links = [], !e.options.links)
      return;
    const a = this._container.retina.pixelRatio, { retina: o } = e, { distance: r, width: c } = e.options.links;
    o.linksDistance = r * a, o.linksWidth = c * a;
  }
  particleDestroyed(e) {
    e.links = [];
  }
}
class fk {
  constructor(e) {
    this.id = "links", this._engine = e;
  }
  getPlugin(e) {
    return Promise.resolve(new ck(e, this._engine));
  }
  loadOptions() {
  }
  needsPlugin() {
    return !0;
  }
}
async function hk(i, e = !0) {
  const a = new fk(i);
  await i.addPlugin(a, e);
}
async function dk(i, e = !0) {
  i.checkVersion("3.9.1"), await ik(i, e), await hk(i, e);
}
const mk = 180, Xu = { x: 0, y: 0 }, pk = 2;
function yk(i, e, a) {
  const { context: o } = i, r = a.count.numerator * a.count.denominator, c = a.count.numerator / a.count.denominator, f = mk * (c - pk) / c, d = Math.PI - bs(f);
  if (o) {
    o.beginPath(), o.translate(e.x, e.y), o.moveTo(Xu.x, Xu.y);
    for (let m = 0; m < r; m++)
      o.lineTo(a.length, Xu.y), o.translate(a.length, Xu.y), o.rotate(d);
  }
}
const gk = 5;
class fT {
  draw(e) {
    const { particle: a, radius: o } = e, r = this.getCenter(a, o), c = this.getSidesData(a, o);
    yk(e, r, c);
  }
  getSidesCount(e) {
    const a = e.shapeData;
    return Math.round(lt((a == null ? void 0 : a.sides) ?? gk));
  }
}
const wS = 3.5, TS = 2.66, vk = 3;
class bk extends fT {
  constructor() {
    super(...arguments), this.validTypes = ["polygon"];
  }
  getCenter(e, a) {
    return {
      x: -a / (e.sides / wS),
      y: -a / (TS / wS)
    };
  }
  getSidesData(e, a) {
    const o = e.sides;
    return {
      count: {
        denominator: 1,
        numerator: o
      },
      length: a * TS / (o / vk)
    };
  }
}
const xk = 1.66, Sk = 3, wk = 2;
class Tk extends fT {
  constructor() {
    super(...arguments), this.validTypes = ["triangle"];
  }
  getCenter(e, a) {
    return {
      x: -a,
      y: a / xk
    };
  }
  getSidesCount() {
    return Sk;
  }
  getSidesData(e, a) {
    const o = a * wk;
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: o
    };
  }
}
async function Ek(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new bk(), e);
}
async function Ck(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new Tk(), e);
}
async function _k(i, e = !0) {
  i.checkVersion("3.9.1"), await Ek(i, e), await Ck(i, e);
}
class Mk {
  constructor() {
    this.enable = !1, this.speed = 0, this.decay = 0, this.sync = !1;
  }
  load(e) {
    Q(e) || (e.enable !== void 0 && (this.enable = e.enable), e.speed !== void 0 && (this.speed = Rt(e.speed)), e.decay !== void 0 && (this.decay = Rt(e.decay)), e.sync !== void 0 && (this.sync = e.sync));
  }
}
class zk extends va {
  constructor() {
    super(), this.animation = new Mk(), this.direction = jn.clockwise, this.path = !1, this.value = 0;
  }
  load(e) {
    Q(e) || (super.load(e), e.direction !== void 0 && (this.direction = e.direction), this.animation.load(e.animation), e.path !== void 0 && (this.path = e.path));
  }
}
const hT = 2, Ak = Math.PI * hT, Ok = 1, Dk = 360;
class Rk {
  constructor(e) {
    this.container = e;
  }
  init(e) {
    const a = e.options.rotate;
    if (!a)
      return;
    e.rotate = {
      enable: a.animation.enable,
      value: bs(lt(a.value)),
      min: 0,
      max: Ak
    }, e.pathRotation = a.path;
    let o = a.direction;
    switch (o === jn.random && (o = Math.floor(jt() * hT) > 0 ? jn.counterClockwise : jn.clockwise), o) {
      case jn.counterClockwise:
      case "counterClockwise":
        e.rotate.status = le.decreasing;
        break;
      case jn.clockwise:
        e.rotate.status = le.increasing;
        break;
    }
    const r = a.animation;
    r.enable && (e.rotate.decay = Ok - lt(r.decay), e.rotate.velocity = lt(r.speed) / Dk * this.container.retina.reduceFactor, r.sync || (e.rotate.velocity *= jt())), e.rotation = e.rotate.value;
  }
  isEnabled(e) {
    const a = e.options.rotate;
    return a ? !e.destroyed && !e.spawning && (!!a.value || a.animation.enable || a.path) : !1;
  }
  loadOptions(e, ...a) {
    e.rotate || (e.rotate = new zk());
    for (const o of a)
      e.rotate.load(o == null ? void 0 : o.rotate);
  }
  update(e, a) {
    this.isEnabled(e) && (e.isRotating = !!e.rotate, e.rotate && (mp(e, e.rotate, !1, ma.none, a), e.rotation = e.rotate.value));
  }
}
async function Vk(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("rotate", (a) => Promise.resolve(new Rk(a)), e);
}
const kk = 2, Nk = Math.sqrt(kk), Lk = 2;
function Bk(i) {
  const { context: e, radius: a } = i, o = a / Nk, r = o * Lk;
  e.rect(-o, -o, r, r);
}
const Uk = 4;
class Hk {
  constructor() {
    this.validTypes = ["edge", "square"];
  }
  draw(e) {
    Bk(e);
  }
  getSidesCount() {
    return Uk;
  }
}
async function jk(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new Hk(), e);
}
const qk = 2, ho = { x: 0, y: 0 };
function Pk(i) {
  const { context: e, particle: a, radius: o } = i, r = a.sides, c = a.starInset ?? qk;
  e.moveTo(ho.x, ho.y - o);
  for (let f = 0; f < r; f++)
    e.rotate(Math.PI / r), e.lineTo(ho.x, ho.y - o * c), e.rotate(Math.PI / r), e.lineTo(ho.x, ho.y - o);
}
const Gk = 2, Yk = 5;
class Xk {
  constructor() {
    this.validTypes = ["star"];
  }
  draw(e) {
    Pk(e);
  }
  getSidesCount(e) {
    const a = e.shapeData;
    return Math.round(lt((a == null ? void 0 : a.sides) ?? Yk));
  }
  particleInit(e, a) {
    const o = a.shapeData;
    a.starInset = lt((o == null ? void 0 : o.inset) ?? Gk);
  }
}
async function Qk(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addShape(new Xk(), e);
}
const Zk = 1;
class Fk {
  constructor(e, a) {
    this._container = e, this._engine = a;
  }
  init(e) {
    var f;
    const a = this._container, o = e.options, r = Mn(o.stroke, e.id, o.reduceDuplicates);
    e.strokeWidth = lt(r.width) * a.retina.pixelRatio, e.strokeOpacity = lt(r.opacity ?? Zk), e.strokeAnimation = (f = r.color) == null ? void 0 : f.animation;
    const c = Xl(this._engine, r.color) ?? e.getFillColor();
    c && (e.strokeColor = K1(c, e.strokeAnimation, a.retina.reduceFactor));
  }
  isEnabled(e) {
    const a = e.strokeAnimation, { strokeColor: o } = e;
    return !e.destroyed && !e.spawning && !!a && ((o == null ? void 0 : o.h.value) !== void 0 && o.h.enable || (o == null ? void 0 : o.s.value) !== void 0 && o.s.enable || (o == null ? void 0 : o.l.value) !== void 0 && o.l.enable);
  }
  update(e, a) {
    this.isEnabled(e) && I1(e.strokeColor, a);
  }
}
async function Kk(i, e = !0) {
  i.checkVersion("3.9.1"), await i.addParticleUpdater("strokeColor", (a) => Promise.resolve(new Fk(a, i)), e);
}
async function Ik(i, e = !0) {
  i.checkVersion("3.9.1"), await LV(i, !1), await j4(i, !1), await K4(i, !1), await i5(i, !1), await d5(i, !1), await T5(i, !1), await _5(i, !1), await D5(i, !1), await N5(i, !1), await Q5(i, !1), await J5(i, !1), await HV(i, !1), await FV(i, !1), await dk(i, !1), await O4(i, !1), await V4(i, !1), await TV(i, !1), await kV(i, !1), await _k(i, !1), await jk(i, !1), await Qk(i, !1), await OV(i, !1), await Vk(i, !1), await Kk(i, !1), await A4(i, e);
}
const Jk = (i) => {
  const {
    id: e,
    className: a,
    background: o,
    minSize: r,
    maxSize: c,
    speed: f,
    particleColor: d,
    particleDensity: m
  } = i, [p, v] = ht.useState(!1);
  ht.useEffect(() => {
    N3(async (w) => {
      await Ik(w);
    }).then(() => {
      v(!0);
    });
  }, []);
  const g = dD(), b = async (w) => {
    w && g.start({
      opacity: 1,
      transition: {
        duration: 1
      }
    });
  }, S = ht.useId();
  return /* @__PURE__ */ Xn.jsx(m1.div, { animate: g, className: Sm("opacity-0", a), children: p && /* @__PURE__ */ Xn.jsx(
    k3,
    {
      id: e || S,
      className: Sm("h-full w-full"),
      particlesLoaded: b,
      options: {
        background: {
          color: {
            value: o || "#0d47a1"
          }
        },
        fullScreen: {
          enable: !1,
          zIndex: 1
        },
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: {
              enable: !1,
              mode: "push"
            },
            onHover: {
              enable: !1,
              mode: "repulse"
            },
            resize: { enable: !0 }
          },
          modes: {
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          bounce: {
            horizontal: {
              value: 1
            },
            vertical: {
              value: 1
            }
          },
          collisions: {
            absorb: {
              speed: 2
            },
            bounce: {
              horizontal: {
                value: 1
              },
              vertical: {
                value: 1
              }
            },
            enable: !1,
            maxSpeed: 50,
            mode: "bounce",
            overlap: {
              enable: !0,
              retries: 0
            }
          },
          color: {
            value: d || "#ffffff",
            animation: {
              h: {
                count: 0,
                enable: !1,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: !0,
                offset: 0
              },
              s: {
                count: 0,
                enable: !1,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: !0,
                offset: 0
              },
              l: {
                count: 0,
                enable: !1,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: !0,
                offset: 0
              }
            }
          },
          effect: {
            close: !0,
            fill: !0,
            options: {},
            type: {}
          },
          groups: {},
          move: {
            angle: {
              offset: 0,
              value: 90
            },
            attract: {
              distance: 200,
              enable: !1,
              rotate: {
                x: 3e3,
                y: 3e3
              }
            },
            center: {
              x: 50,
              y: 50,
              mode: "percent",
              radius: 0
            },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: !0,
            gravity: {
              acceleration: 9.81,
              enable: !1,
              inverse: !1,
              maxSpeed: 50
            },
            path: {
              clamp: !0,
              delay: {
                value: 0
              },
              enable: !1,
              options: {}
            },
            outModes: {
              default: "out"
            },
            random: !1,
            size: !1,
            speed: {
              min: 0.1,
              max: 0.35
            },
            spin: {
              acceleration: 0,
              enable: !1
            },
            straight: !1,
            trail: {
              enable: !1,
              length: 10,
              fill: {}
            },
            vibrate: !1,
            warp: !1
          },
          number: {
            density: {
              enable: !0,
              width: 400,
              height: 400
            },
            limit: {
              mode: "delete",
              value: 0
            },
            value: m || 120
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1
            },
            animation: {
              count: 0,
              enable: !0,
              speed: f || 4,
              decay: 0,
              delay: 0,
              sync: !1,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          reduceDuplicates: !1,
          shadow: {
            blur: 0,
            color: {
              value: "#000"
            },
            enable: !1,
            offset: {
              x: 0,
              y: 0
            }
          },
          shape: {
            close: !0,
            fill: !0,
            options: {},
            type: "circle"
          },
          size: {
            value: {
              min: r || 1,
              max: c || 3
            },
            animation: {
              count: 0,
              enable: !1,
              speed: 5,
              decay: 0,
              delay: 0,
              sync: !1,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          stroke: {
            width: 0
          },
          zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
          },
          destroy: {
            bounds: {},
            mode: "none",
            split: {
              count: 1,
              factor: {
                value: 3
              },
              rate: {
                value: {
                  min: 4,
                  max: 9
                }
              },
              sizeOffset: !0
            }
          },
          roll: {
            darken: {
              enable: !1,
              value: 0
            },
            enable: !1,
            enlighten: {
              enable: !1,
              value: 0
            },
            mode: "vertical",
            speed: 25
          },
          tilt: {
            value: 0,
            animation: {
              enable: !1,
              speed: 0,
              decay: 0,
              sync: !1
            },
            direction: "clockwise",
            enable: !1
          },
          twinkle: {
            lines: {
              enable: !1,
              frequency: 0.05,
              opacity: 1
            },
            particles: {
              enable: !1,
              frequency: 0.05,
              opacity: 1
            }
          },
          wobble: {
            distance: 5,
            enable: !1,
            speed: {
              angle: 50,
              move: 10
            }
          },
          life: {
            count: 0,
            delay: {
              value: 0,
              sync: !1
            },
            duration: {
              value: 0,
              sync: !1
            }
          },
          rotate: {
            value: 0,
            animation: {
              enable: !1,
              speed: 0,
              decay: 0,
              sync: !1
            },
            direction: "clockwise",
            path: !1
          },
          orbit: {
            animation: {
              count: 0,
              enable: !1,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: !1
            },
            enable: !1,
            opacity: 1,
            rotation: {
              value: 45
            },
            width: 1
          },
          links: {
            blink: !1,
            color: {
              value: "#fff"
            },
            consent: !1,
            distance: 100,
            enable: !1,
            frequency: 1,
            opacity: 1,
            shadow: {
              blur: 5,
              color: {
                value: "#000"
              },
              enable: !1
            },
            triangles: {
              enable: !1,
              frequency: 1
            },
            width: 1,
            warp: !1
          },
          repulse: {
            value: 0,
            enabled: !1,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1
          }
        },
        detectRetina: !0
      }
    }
  ) });
};
function $k() {
  return rD() ? null : /* @__PURE__ */ Xn.jsx(Jk, { id: "portfolio-sparkles", background: "transparent", minSize: 0.5, maxSize: 1.3, particleDensity: 32, particleColor: "#8dbbe0", speed: 0.5, className: "h-full w-full" });
}
function Wk() {
  return /* @__PURE__ */ Xn.jsx(lR, { colors: ["#0894FF", "#C959DD", "#FF2E54", "#FF9004"], mode: "static", blur: "medium" });
}
const ES = document.querySelector("#sparkles-root");
ES && _S.createRoot(ES).render(/* @__PURE__ */ Xn.jsx($k, {}));
document.querySelectorAll(".glow-mount").forEach((i) => _S.createRoot(i).render(/* @__PURE__ */ Xn.jsx(Wk, {})));
