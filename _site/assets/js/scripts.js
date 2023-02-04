"use strict";

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}! function(e, t) {
    "function" == typeof define && define.amd ? define([], function() {
        return t(e)
    }) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.SmoothScroll = t(e)
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : void 0, function(e) {
    var t = {
            ignore: "[data-scroll-ignore]",
            header: null,
            topOnEmptyHash: !0,
            speed: 500,
            speedAsDuration: !1,
            durationMax: null,
            durationMin: null,
            clip: !0,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            updateURL: !0,
            popstate: !0,
            emitEvents: !0
        },
        n = function() {
            return "querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype
        },
        o = function() {
            var e = {};
            return Array.prototype.forEach.call(arguments, function(t) {
                for (var n in t) {
                    if (!t.hasOwnProperty(n)) return;
                    e[n] = t[n]
                }
            }), e
        },
        a = function(t) {
            return !!("matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches)
        },
        r = function(t) {
            return parseInt(e.getComputedStyle(t).height, 10)
        },
        i = function(e) {
            "#" === e.charAt(0) && (e = e.substr(1));
            for (var t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
                if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                t >= 1 && t <= 31 || 127 == t || 0 === a && t >= 48 && t <= 57 || 1 === a && t >= 48 && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += t >= 128 || 45 === t || 95 === t || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a)
            }
            return "#" + r
        },
        u = function(e, t) {
            var n;
            return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t
        },
        s = function() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
        },
        c = function(t, n, o, a) {
            var r = 0;
            if (t.offsetParent)
                do {
                    r += t.offsetTop, t = t.offsetParent
                } while (t);
            return r = Math.max(r - n - o, 0), a && (r = Math.min(r, s() - e.innerHeight)), r
        },
        l = function(e) {
            return e ? r(e) + e.offsetTop : 0
        },
        d = function(e, t) {
            var n = t.speedAsDuration ? t.speed : Math.abs(e / 1e3 * t.speed);
            return t.durationMax && n > t.durationMax ? t.durationMax : t.durationMin && n < t.durationMin ? t.durationMin : parseInt(n, 10)
        },
        m = function(t) {
            if (history.replaceState && t.updateURL && !history.state) {
                var n = e.location.hash;
                n = n || e.pageYOffset, history.replaceState({
                    smoothScroll: JSON.stringify(t),
                    anchor: n || e.pageYOffset
                }, document.title, n || e.location.href)
            }
        },
        f = function(e, t, n) {
            t || history.pushState && n.updateURL && history.pushState({
                smoothScroll: JSON.stringify(n),
                anchor: e.id
            }, document.title, e === document.documentElement ? "#top" : "#" + e.id)
        },
        p = function(t, n, o) {
            0 === t && document.body.focus(), o || (t.focus(), document.activeElement !== t && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), e.scrollTo(0, n))
        },
        h = function(t, n, o, a) {
            if (n.emitEvents && "function" == typeof e.CustomEvent) {
                var r = new CustomEvent(t, {
                    bubbles: !0,
                    detail: {
                        anchor: o,
                        toggle: a
                    }
                });
                document.dispatchEvent(r)
            }
        };
    return function(r, y) {
        var g, b, v, S, E, O, I = {};
        I.cancelScroll = function(e) {
            cancelAnimationFrame(O), O = null, e || h("scrollCancel", g)
        }, I.animateScroll = function(n, a, r) {
            I.cancelScroll();
            var i = o(g || t, r || {}),
                m = "[object Number]" === Object.prototype.toString.call(n),
                y = m || !n.tagName ? null : n;
            if (m || y) {
                var b = e.pageYOffset;
                i.header && !S && (S = document.querySelector(i.header));
                var v, E, A, C = l(S),
                    L = m ? n : c(y, C, parseInt("function" == typeof i.offset ? i.offset(n, a) : i.offset, 10), i.clip),
                    M = L - b,
                    w = s(),
                    N = 0,
                    x = d(M, i),
                    H = function(t, o) {
                        var r = e.pageYOffset;
                        if (t == o || r == o || (b < o && e.innerHeight + r) >= w) return I.cancelScroll(!0), p(n, o, m), h("scrollStop", i, n, a), v = null, O = null, !0
                    },
                    q = function t(n) {
                        v || (v = n), N += n - v, E = 0 === x ? 0 : N / x, E = E > 1 ? 1 : E, A = b + M * u(i, E), e.scrollTo(0, Math.floor(A)), H(A, L) || (O = e.requestAnimationFrame(t), v = n)
                    };
                0 === e.pageYOffset && e.scrollTo(0, 0), f(n, m, i), h("scrollStart", i, n, a), I.cancelScroll(!0), e.requestAnimationFrame(q)
            }
        };
        var A = function(t) {
                if (!a() && 0 === t.button && !t.metaKey && !t.ctrlKey && "closest" in t.target && (v = t.target.closest(r)) && "a" === v.tagName.toLowerCase() && !t.target.closest(g.ignore) && v.hostname === e.location.hostname && v.pathname === e.location.pathname && /#/.test(v.href)) {
                    var n = i(v.hash),
                        o = g.topOnEmptyHash && "#" === n ? document.documentElement : document.querySelector(n);
                    o = o || "#top" !== n ? o : document.documentElement, o && (t.preventDefault(), m(g), I.animateScroll(o, v))
                }
            },
            C = function(e) {
                if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(g)) {
                    var t = history.state.anchor;
                    t && 0 !== t && !(t = document.querySelector(i(history.state.anchor))) || I.animateScroll(t, null, {
                        updateURL: !1
                    })
                }
            };
        return I.destroy = function() {
            g && (document.removeEventListener("click", A, !1), e.removeEventListener("popstate", C, !1), I.cancelScroll(), g = null, b = null, v = null, S = null, E = null, O = null)
        }, I.init = function(a) {
            if (!n()) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
            I.destroy(), g = o(t, a || {}), S = g.header ? document.querySelector(g.header) : null, document.addEventListener("click", A, !1), g.updateURL && g.popstate && e.addEventListener("popstate", C, !1)
        }, I.init(y), I
    }
});
var scroll = new SmoothScroll('a[href*="#"]', {
        easing: "easeInOutCubic",
        offset: 64
    }),
    menuOpen = document.getElementById("js-navOpen"),
    menuClose = document.getElementById("js-navClose"),
    metabarNav = document.getElementById("js-metabarNav");
menuOpen.addEventListener("click", function() {
    metabarNav.classList.add("open")
}), menuClose.addEventListener("click", function() {
    metabarNav.classList.remove("open")
});
for (var embeds = document.getElementsByClassName("embedly-card"), i = 0; i < embeds.length; i += 1) embeds[i].setAttribute("data-card-controls", "0"), embeds[i].setAttribute("data-card-align", "left"), embeds[i].setAttribute("data-card-recommend", "0"), embeds[i].setAttribute("data-card-chrome", "0");


//# sourceMappingURL=scripts.js.map