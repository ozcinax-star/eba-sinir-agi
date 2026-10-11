'use strict';
(function () {
  var D = window.EBA_DATA;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  var THREE_URLS = ['https://unpkg.com/three@0.169.0/build/three.module.js', 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js'];
  var MODE_KEY = 'eba-biyoloji-mode';
  var FILTERS = [['all', 'Tümü'], ['9', '9. sınıf'], ['10', '10. sınıf'], ['11', '11. sınıf'], ['12', '12. sınıf'], ['O', 'Ortaokul']];
  var POPULAR = ['solunum', 'mayoz', 'fotosentez', 'homeo'];
  var MIN_D = 90, MAX_D = 2600;
  var EOP = { pre: 0.95, base: 0.85, kol: 0.9, next: 0.8, rel: 0.85 };

  var PAL = {
    dark: { GC: { O: '#c0b6a5', 9: '#aebf92', 10: '#e3b766', 11: '#f6a06b', 12: '#e09aa3' }, EC: { pre: '#f6a06b', base: '#c0b6a5', kol: '#aebf92', next: '#f5ead8', rel: '#a19786' },
      add: true, bg: '#000000', fog: 0x241f1a, hemi: [0xfff1dc, 0x2a2119, 1.35], em: 0.46, fl: 0.9, hovE: 0.35, glowK: 1, pulseK: 1, dendK: 0.6, lineK: 1.1, dust: [0x96856c, 0.55],
      ink: '#f5ead8', ink2: '#c9bfae', acc: '#f6a06b', shadow: 'rgba(23,20,16,.95)', chipBg: 'rgba(42,37,31,.9)', nextWord: 'krem', theme: '#1d1a16' },
    light: { GC: { O: '#857b6b', 9: '#64843f', 10: '#b9821c', 11: '#d2622a', 12: '#bf5a6c' }, EC: { pre: '#c4561d', base: '#82796a', kol: '#5b7a3a', next: '#3a342c', rel: '#8a8070' },
      add: false, bg: '#ebe3d5', fog: 0xebe3d5, hemi: [0xffffff, 0xcdbfa8, 1.5], em: 0.12, fl: 0.45, hovE: 0.15, glowK: 0.4, pulseK: 0.9, dendK: 0.5, lineK: 1.2, dust: [0xbcae95, 0.45],
      ink: '#201e1d', ink2: '#5c5448', acc: '#a4501c', shadow: 'rgba(245,239,229,.95)', chipBg: 'rgba(251,246,238,.94)', nextWord: 'koyu', theme: '#e8e0d2' },
    mid: { GC: { O: '#4e4438', 9: '#2f7a12', 10: '#a35f00', 11: '#c93a0c', 12: '#b0245c' }, EC: { pre: '#c93a0c', base: '#4e4438', kol: '#2f7a12', next: '#1c1712', rel: '#6b5d4c' },
      add: false, bg: '#c7b59c', fog: 0xc7b59c, hemi: [0xffffff, 0x8a7660, 1.4], em: 0.1, fl: 0.45, hovE: 0.15, glowK: 0.35, pulseK: 0.9, dendK: 0.55, lineK: 1.25, dust: [0xa08c72, 0.35],
      ink: '#1c1712', ink2: '#3f352a', acc: '#7f300a', shadow: 'rgba(214,199,177,.95)', chipBg: 'rgba(222,210,192,.94)', nextWord: 'koyu', theme: '#b5a186' }
  };
  var GC = PAL.dark.GC, EC = PAL.dark.EC;

  var mqReduce = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var LITE = Math.min(innerWidth, innerHeight) < 700 || (navigator.hardwareConcurrency || 8) <= 4;

  var state = { mode: root.getAttribute('data-eba-mode') || 'dark', ready: false, sel: null, query: '', open: false, hi: 0, filter: 'all', help: false, listOpen: false, wide: innerWidth >= 900, roomy: innerWidth >= 1280 };
  var scene = null;
  var app = $('#app');
  var results = [];

  /* ───────── arayüz ───────── */
  var boxes = [$('#s1'), $('#s2')].map(function (w) {
    return { w: w, input: $('input', w), list: $('.results', w), none: $('.noresults', w) };
  });

  function dotHTML(g) { return '<i class="' + (g === 'O' ? 'ring' : '') + '" style="--c:var(--g' + g + ')"></i>'; }
  function subOf(t) { return t.grade === 'O' ? t.gradeLabel : t.gradeLabel + ' · ' + t.themeName; }

  function buildStatic() {
    $('#chips').innerHTML = FILTERS.map(function (f) {
      return '<button type="button" class="chip" data-f="' + f[0] + '" aria-pressed="false">' + (f[0] === 'all' ? '' : dotHTML(f[0])) + f[1] + '</button>';
    }).join('');
    var pop = $('#popular');
    POPULAR.forEach(function (id) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-secondary'; b.textContent = D.byId[id].name; b.dataset.go = id; pop.appendChild(b);
    });
  }

  function ui() {
    var sel = state.sel ? D.byId[state.sel] : null;
    app.classList.toggle('has-sel', !!sel);
    app.classList.toggle('chips-hide', !!sel);
    $('#hero').hidden = !!sel;
    $('#s2').hidden = !sel;
    $('#panel').hidden = !sel;
    $('#focusLegend').hidden = !sel;
    $('#idleLegend').style.visibility = sel ? 'hidden' : '';
    $('#hintline').hidden = !(state.roomy && !sel && scene);
    $('#help').hidden = !state.help;
    $('#helpBtn').setAttribute('aria-expanded', String(state.help));
    $('#listView').hidden = !state.listOpen && !root.classList.contains('nogl');
    $('#listBtn').setAttribute('aria-expanded', String(state.listOpen));
    $('#nextWord').textContent = PAL[state.mode].nextWord;
    $$('.mode').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)); });
    $$('.chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === state.filter)); });
    renderResults();
  }

  function renderResults() {
    results = state.query.trim() ? D.search(state.query).slice(0, 7) : [];
    boxes.forEach(function (b, bi) {
      var visible = bi === 0 ? !state.sel : !!state.sel;
      var show = visible && state.open && results.length > 0;
      b.list.hidden = !show;
      b.none.hidden = !(visible && state.open && state.query.trim() && !results.length);
      b.input.setAttribute('aria-expanded', String(show));
      if (b.input.value !== state.query) b.input.value = state.query;
      if (show) {
        b.list.innerHTML = results.map(function (t, i) {
          return '<div class="opt" role="option" id="o' + bi + '-' + i + '" data-id="' + t.id + '" aria-selected="' + (i === state.hi) + '">' + dotHTML(t.grade).replace('style="', 'style="') + '<span><b>' + esc(t.name) + '</b><small>' + esc(subOf(t)) + '</small></span></div>';
        }).join('');
        b.input.setAttribute('aria-activedescendant', 'o' + bi + '-' + state.hi);
      } else b.input.removeAttribute('aria-activedescendant');
    });
  }

  var ICON_BOOK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>';
  var ICON_OK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>';
  var ICON_EXT = '<svg style="flex:none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#645c50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';
  var ICON_CLOCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
  var ICON_ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#464238" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>';

  function itemHTML(o, kind) {
    var t = o.topic, g = t.grade === 'O' ? t.gradeLabel : t.gradeLabel + ' · ' + t.themeName;
    var via = kind === 'next' ? ' · ' + (o.type === 'kol' ? 'bu konudan destek alır' : 'bu konuya dayanır') : '';
    var mk = kind === 'next' ? ICON_ARROW : '<span class="mk ' + kind + '"></span>';
    return '<button type="button" class="item" data-go="' + t.id + '">' + mk + '<span class="it"><span class="t"><b>' + esc(t.name) + '</b><span>' + esc(g + via) + '</span></span><span class="r">' + esc(o.reason) + '</span></span></button>';
  }
  function group(h, cls, sub, arr, kind) {
    if (!arr.length) return '';
    return '<div class="sec"><h3 class="' + cls + '">' + h + '</h3>' + (sub ? '<p class="sub">' + sub + '</p>' : '') + arr.map(function (o) { return itemHTML(o, kind); }).join('') + '</div>';
  }

  function renderPanel() {
    var t = D.byId[state.sel]; if (!t) return;
    var nb = D.neighbors(t.id), res = D.resources(t.id);
    var h = '<header><div class="tags"><span class="tag tag-accent" style="font-weight:700">' + esc(t.gradeLabel) + '</span><span class="tag tag-accent-2" style="font-weight:700">' + esc(t.themeName) + ' teması</span><span class="tag tag-neutral">' + esc(t.code) + '</span>' +
      '<button type="button" class="btn btn-secondary btn-icon" data-close aria-label="Paneli kapat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<h2 tabindex="-1" id="ptitle">' + esc(t.name) + '</h2></header><div class="pbody">' +
      '<div class="sec"><h3>Kısaca</h3><p class="sum">' + esc(t.summary) + '</p></div>' +
      '<div class="sec"><h3>Resmî kaynaklar</h3>' + res.map(function (r) {
        return r.verified
          ? '<a class="res" href="' + esc(r.url) + '" target="_blank" rel="noopener"><span class="ic">' + ICON_BOOK + '</span><span class="tx"><b>' + esc(r.title) + '</b><small>' + ICON_OK + esc(r.source) + ' · Doğrulandı</small></span>' + ICON_EXT + '<span class="sr">(yeni sekmede açılır)</span></a>'
          : '<div class="res un"><span class="ic" style="background:none;color:inherit">' + ICON_CLOCK + '</span><span class="tx"><b>' + esc(r.title) + '</b><small>' + esc(r.note) + ' · resmî materyal olarak gösterilmez</small></span></div>';
      }).join('') + '<p class="fine">Bağlantılar ' + esc(D.checkedAt) + ' itibarıyla kontrol edildi.</p></div>';
    var before = nb.pre.length + nb.kol.length + nb.base.length > 0;
    if (before) {
      h += '<div class="sec">' + (nb.pre.length ? '<h3 class="pre">Önce bunları bil</h3><p class="sub">Ön koşul: bilinmeden bu konu anlaşılamaz.</p>' + nb.pre.map(function (o) { return itemHTML(o, 'pre'); }).join('') : '') +
        (nb.base.length ? '<h3 style="margin-top:14px">Ortaokuldan gelen temel</h3>' + nb.base.map(function (o) { return itemHTML(o, 'base'); }).join('') : '') +
        (nb.kol.length ? '<h3 class="kol" style="margin-top:14px">Öğrenmeni kolaylaştırır</h3><p class="sub">Şart değil; bilirsen bu konu daha kolay yerine oturur.</p>' + nb.kol.map(function (o) { return itemHTML(o, 'kol'); }).join('') : '') + '</div>';
    }
    h += group('Bu bilgiyi sonra nerede kullanacaksın', 'nx', '', nb.next, 'next');
    h += group('İlgili konular', '', '', nb.rel, 'rel');
    h += '<p class="fine">Kaynak: ' + esc(D.curriculum) + '</p></div>';
    var p = $('#panel'); p.innerHTML = h;
  }

  function announce(msg) { var l = $('#live'); l.textContent = ''; setTimeout(function () { l.textContent = msg; }, 30); }

  /* ───────── durum işlemleri ───────── */
  var hashBusy = false;
  function setHash(id) {
    var h = id ? '#konu=' + id : '';
    if (location.hash === h || (!id && !location.hash)) return;
    try { hashBusy = true; history.pushState(null, '', location.pathname + location.search + h); } catch (e) {} hashBusy = false;
  }

  function select(id, fromHash) {
    if (!D.byId[id]) return;
    state.sel = id; state.query = ''; state.open = false; state.help = false; state.hi = 0;
    if (!state.wide) state.listOpen = false;
    if (scene) scene.select(id);
    renderPanel(); ui();
    var pb = $('.pbody'); if (pb) pb.scrollTop = 0;
    if (!fromHash) setHash(id);
    var h = $('#ptitle'); if (h) h.focus({ preventScroll: true });
    announce(D.byId[id].name + ' konusu açıldı');
    if (document.activeElement && document.activeElement.tagName === 'INPUT') document.activeElement.blur();
  }
  function clearSel(fromHash) {
    if (!state.sel) return;
    var prev = state.sel;
    state.sel = null; state.help = false;
    if (scene) scene.clearSel();
    ui();
    if (!fromHash) setHash(null);
    var b = state.query ? null : $('#s1 input'); if (b && !fromHash) { /* odak aramada kalmaz */ }
    announce('Tüm harita');
    return prev;
  }
  function setFilter(k) {
    if (state.sel) clearSel();
    state.filter = k;
    if (scene) scene.setFilter(k);
    ui();
  }
  function setMode(m) {
    if (m === state.mode) return;
    state.mode = m; root.setAttribute('data-eba-mode', m);
    try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
    var tc = document.querySelector('meta[name=theme-color]'); if (tc) tc.content = PAL[m].theme;
    if (scene) scene.poke();
    ui();
  }

  function readHash() { var m = /^#konu=([\w]+)$/.exec(location.hash); return m && D.byId[m[1]] ? m[1] : null; }
  function onHash() {
    if (hashBusy) return;
    var id = readHash();
    if (id) { if (id !== state.sel) select(id, true); }
    else if (state.sel) clearSel(true);
  }

  /* ───────── olaylar ───────── */
  function bindUI() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-go],[data-close],[data-f],[data-mode],[data-submit],a[href^="#konu="],.opt') : null;
      if (!t) return;
      if (t.dataset.go) { select(t.dataset.go); return; }
      if (t.dataset.close !== undefined) { clearSel(); return; }
      if (t.dataset.f) { setFilter(t.dataset.f); return; }
      if (t.dataset.mode) { setMode(t.dataset.mode); return; }
      if (t.dataset.submit !== undefined) { if (results[0]) select(results[0].id); else boxes[0].input.focus(); return; }
      if (t.tagName === 'A') { e.preventDefault(); select(t.getAttribute('href').slice(6)); return; }
    });
    boxes.forEach(function (b) {
      b.list.addEventListener('mousedown', function (e) { var o = e.target.closest('.opt'); if (o) { e.preventDefault(); select(o.dataset.id); } });
      b.input.addEventListener('input', function () { state.query = b.input.value; state.open = true; state.hi = 0; renderResults(); });
      b.input.addEventListener('focus', function () { state.open = true; renderResults(); });
      b.input.addEventListener('blur', function () { setTimeout(function () { state.open = false; renderResults(); }, 120); });
      b.input.addEventListener('keydown', function (e) {
        var n = results.length;
        if (e.key === 'ArrowDown') { e.preventDefault(); state.hi = Math.min(Math.max(n - 1, 0), state.hi + 1); state.open = true; renderResults(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); state.hi = Math.max(0, state.hi - 1); renderResults(); }
        else if (e.key === 'Enter') { var t = results[state.hi]; if (t) { e.preventDefault(); select(t.id); } }
        else if (e.key === 'Escape') { e.stopPropagation(); state.query = ''; state.open = false; renderResults(); b.input.blur(); }
      });
    });
    $('#back').addEventListener('click', function () { clearSel(); });
    $('#helpBtn').addEventListener('click', function () { state.help = !state.help; ui(); });
    $('#helpClose').addEventListener('click', function () { state.help = false; ui(); $('#helpBtn').focus(); });
    $('#listBtn').addEventListener('click', function () { state.listOpen = !state.listOpen; ui(); if (state.listOpen) { var f = $('#listView .lbody a'); if (f) f.focus({ preventScroll: true }); } });
    $('#listClose').addEventListener('click', function () { state.listOpen = false; ui(); $('#listBtn').focus(); });
    $('#zin').addEventListener('click', function () { if (scene) scene.zoom(0.72); });
    $('#zout').addEventListener('click', function () { if (scene) scene.zoom(1.38); });
    $('#zreset').addEventListener('click', function () { setFilter('all'); if (scene) scene.reset(); });
    window.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); (state.sel ? boxes[1] : boxes[0]).input.focus(); }
      else if (e.key === 'Escape') {
        if (state.help) { state.help = false; ui(); }
        else if (state.listOpen && !root.classList.contains('nogl')) { state.listOpen = false; ui(); }
        else if (state.sel) clearSel();
      }
    });
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    if ('ResizeObserver' in window) new ResizeObserver(function () {
      var w = app.clientWidth; state.wide = w >= 900; state.roomy = w >= 1280;
      $('#hintline').hidden = !(state.roomy && !state.sel && scene);
      if (scene) scene.resize();
    }).observe(app);
  }

  /* ───────── 3B sahne ───────── */
  function Scene3D(T, stage, labelLayer, tip) {
    this.T = T; this.stage = stage; this.labelLayer = labelLayer; this.tip = tip;
    this.selI = -1; this.hover = -1; this.chipHover = -1; this.off = [0, 0]; this.lastInteract = 0; this.ptrs = new Map(); this.alive = true; this.hot = 0;
    this.build();
  }
  var S3 = Scene3D.prototype;

  S3.layout = function () {
    var s = 7;
    var rnd = function () { s = (s + 0x6D2B79F5) | 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    var order = ['yasam', 'org', 'enerji', 'ekoloji', 'tepki', 'homeo', 'ureme', 'gen'], ys = [-70, 60, -110, 90, -40, 120, -90, 30];
    var A = { fen: { x: 0, y: 0, z: 0 } };
    order.forEach(function (id, i) { var a = (i / 8) * Math.PI * 2; A[id] = { x: 400 * Math.cos(a), y: ys[i] * 1.6, z: 400 * Math.sin(a) }; });
    var N = D.topics.map(function (t) { var a = A[t.theme]; return { t: t, x: a.x + (rnd() - 0.5) * 140, y: a.y + (rnd() - 0.5) * 140, z: a.z + (rnd() - 0.5) * 140, vx: 0, vy: 0, vz: 0, deg: 0 }; });
    var ix = {}; N.forEach(function (n, i) { ix[n.t.id] = i; });
    var E = D.links.map(function (l) { return [ix[l.from], ix[l.to], l.type]; });
    E.forEach(function (e) { N[e[0]].deg++; N[e[1]].deg++; });
    for (var it = 0; it < 260; it++) {
      var k = 1 - it / 300;
      for (var i = 0; i < N.length; i++) for (var j = i + 1; j < N.length; j++) {
        var a = N[i], b = N[j], dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z, d2 = dx * dx + dy * dy + dz * dz + 1;
        if (d2 > 90000) continue;
        var d = Math.sqrt(d2), f = 1600 / d2 / d; dx *= f; dy *= f; dz *= f;
        a.vx += dx; a.vy += dy; a.vz += dz; b.vx -= dx; b.vy -= dy; b.vz -= dz;
      }
      E.forEach(function (e) { var a = N[e[0]], b = N[e[1]], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01, f = ((d - 90) * 0.012) / d; a.vx += dx * f; a.vy += dy * f; a.vz += dz * f; b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f; });
      N.forEach(function (n) { var a = A[n.t.theme], c = n.t.theme === 'fen' ? 0.05 : 0.032; n.vx += (a.x - n.x) * c; n.vy += (a.y - n.y) * c; n.vz += (a.z - n.z) * c; n.vx *= 0.8; n.vy *= 0.8; n.vz *= 0.8; n.x += n.vx * k; n.y += n.vy * k; n.z += n.vz * k; });
    }
    return { N: N, E: E, ix: ix };
  };

  S3.tex = function (size, draw) {
    var c = document.createElement('canvas'); c.width = c.height = size;
    draw(c.getContext('2d'), size);
    var t = new this.T.CanvasTexture(c); t.colorSpace = this.T.SRGBColorSpace; return t;
  };
  S3.mkSprite = function (scale, color) {
    var T = this.T, s = new T.Sprite(new T.SpriteMaterial({ map: this.glowTex, color: color || 0xffffff, transparent: true, opacity: 0, blending: this.P.add ? T.AdditiveBlending : T.NormalBlending, depthWrite: false }));
    s.scale.setScalar(scale); this.scene.add(s); return s;
  };
  S3.poke = function () { this.hot = performance.now() + 1800; };

  S3.build = function () {
    var self = this, T = this.T, L = this.layout(); this.L = L;
    this.P = PAL[state.mode]; GC = this.P.GC; EC = this.P.EC;
    var N = L.N, E = L.E, seed = 23;
    var rnd = function () { seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    this.rnd = rnd;
    var W = this.stage.clientWidth || 1200, H = this.stage.clientHeight || 800; this.W = W; this.H = H;

    var R = new T.WebGLRenderer({ antialias: !LITE, alpha: true, powerPreference: 'high-performance' });
    R.setPixelRatio(Math.min(LITE ? 1.5 : 1.75, window.devicePixelRatio || 1)); R.setSize(W, H); R.setClearColor(0x000000, 0);
    R.domElement.style.cursor = 'grab';
    R.domElement.setAttribute('role', 'img'); R.domElement.setAttribute('aria-label', 'Biyoloji konularının üç boyutlu sinir ağı. Aynı konulara klavyeyle arama kutusundan ya da Liste düğmesinden ulaşılır.');
    this.stage.appendChild(R.domElement); this.renderer = R;
    R.domElement.addEventListener('webglcontextlost', function (e) { e.preventDefault(); self.alive = false; failGL('Üç boyutlu görünüm durdu (grafik bağlamı kaybedildi).'); });

    var S = new T.Scene(); S.fog = new T.FogExp2(0x17140f, 0.00042); this.scene = S;
    var C = new T.PerspectiveCamera(45, W / H, 1, 8000); this.camera = C; S.add(C);
    this.hemi = new T.HemisphereLight(0xfff1dc, 0x2a2119, 1.3); S.add(this.hemi);
    var dl = new T.DirectionalLight(0xffffff, 1.7); dl.position.set(0.4, 0.8, 1); C.add(dl);
    this.ray = new T.Raycaster(); this.v = new T.Vector3();

    this.glowTex = this.tex(128, function (g, s) { var gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.16, 'rgba(255,255,255,.6)'); gr.addColorStop(0.45, 'rgba(255,255,255,.14)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, s, s); });
    var ringTex = this.tex(128, function (g, s) { g.strokeStyle = '#fff'; g.lineWidth = s * 0.075; g.beginPath(); g.arc(s / 2, s / 2, s * 0.36, 0, 7); g.stroke(); });

    this.nodes = N.map(function (n, i) {
      var col = new T.Color(GC[n.t.grade]), r = 4 + Math.sqrt(n.deg) * 2.1, isO = n.t.grade === 'O';
      var geo = new T.IcosahedronGeometry(1, LITE ? 2 : 3), p = geo.attributes.position, ph = rnd() * 6;
      for (var k = 0; k < p.count; k++) { var x = p.getX(k), y = p.getY(k), z = p.getZ(k), s = 1 + 0.14 * Math.sin(x * 3.1 + ph) * Math.cos(y * 2.7 + ph * 1.3) + 0.07 * Math.sin(z * 5 + ph); p.setXYZ(k, x * s, y * s * 0.9, z * s); }
      geo.computeVertexNormals();
      var mat = new T.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.45, roughness: 0.5, metalness: 0, transparent: true, opacity: isO ? 0.5 : 1 });
      var soma = new T.Mesh(geo, mat); soma.position.set(n.x, n.y, n.z); soma.scale.setScalar(r); S.add(soma);
      var gm = new T.SpriteMaterial({ map: self.glowTex, color: col, transparent: true, opacity: 0.4, blending: T.AdditiveBlending, depthWrite: false });
      var gs = new T.Sprite(gm); gs.position.copy(soma.position); gs.scale.setScalar(r * 7); S.add(gs);
      var rs = null;
      if (isO) { rs = new T.Sprite(new T.SpriteMaterial({ map: ringTex, color: col, transparent: true, opacity: 0.9, depthWrite: false })); rs.position.copy(soma.position); rs.scale.setScalar(r * 3.2); S.add(rs); }
      var hit = new T.Mesh(new T.SphereGeometry(Math.max(r * 1.7, 10), 8, 6), new T.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false }));
      hit.position.copy(soma.position); hit.userData.i = i; S.add(hit);
      return { i: i, t: n.t, pos: soma.position, r: r, col: col, soma: soma, mat: mat, gm: gm, gs: gs, rs: rs, hit: hit, isO: isO, scale: 1, flash: 0 };
    });
    this.hits = this.nodes.map(function (n) { return n.hit; });

    var dPos = [], dMeta = [], dRange = [], tmp = new T.Vector3();
    var grow = function (p0, d0, depth, step, ni, out) {
      var cur = p0.clone(), dir = d0.clone(), steps = 4 + Math.floor(rnd() * 3), branchAt = 1 + Math.floor(rnd() * 2);
      for (var s = 0; s < steps; s++) {
        dir.add(tmp.set(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(0.75)).normalize();
        var nx = cur.clone().addScaledVector(dir, step * (1 - s * 0.08));
        var f0 = Math.max(0.12, 1 - (depth * 3 + s) / 10), f1 = Math.max(0.1, 1 - (depth * 3 + s + 1) / 10);
        out.pos.push(cur.x, cur.y, cur.z, nx.x, nx.y, nx.z);
        out.m.push(ni, f0, ni, f1);
        cur = nx;
        if (depth < 2 && s === branchAt && rnd() < 0.8) grow(cur, dir.clone().add(tmp.set(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5)).normalize(), depth + 1, step * 0.72, ni, out);
      }
    };
    this.nodes.forEach(function (nd) {
      var start = dPos.length / 3, nb = (LITE ? 4 : 5) + Math.floor(rnd() * 4), step = 3 + nd.r * 0.2;
      for (var b = 0; b < nb; b++) { var d = new T.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize(); grow(nd.pos.clone().addScaledVector(d, nd.r * 0.85), d, 0, step, nd.i, { pos: dPos, m: dMeta }); }
      dRange.push([start, dPos.length / 3 - start]);
    });

    var ePos = [], eMeta = [], eRange = []; this.curves = []; this.elen = [];
    E.forEach(function (e) {
      var a = e[0], b = e[1], A = self.nodes[a].pos, B = self.nodes[b].pos, d = B.clone().sub(A), len = d.length();
      var p1 = new T.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).cross(d).normalize(), p2 = d.clone().cross(p1).normalize();
      var c1 = A.clone().addScaledVector(d, 0.33).addScaledVector(p1, len * (0.08 + rnd() * 0.12)).addScaledVector(p2, len * (rnd() - 0.5) * 0.12);
      var c2 = A.clone().addScaledVector(d, 0.66).addScaledVector(p1, len * (0.04 + rnd() * 0.1) * (rnd() < 0.5 ? -1 : 1)).addScaledVector(p2, len * (rnd() - 0.5) * 0.12);
      var cv = new T.CubicBezierCurve3(A.clone(), c1, c2, B.clone()); self.curves.push(cv); self.elen.push(cv.getLength());
      var pts = cv.getPoints(24), start = ePos.length / 3;
      for (var s = 0; s < 24; s++) {
        var q0 = pts[s], q1 = pts[s + 1]; ePos.push(q0.x, q0.y, q0.z, q1.x, q1.y, q1.z);
        eMeta.push(a, b, s / 24, a, b, (s + 1) / 24);
      }
      eRange.push([start, 48]);
    });

    var mkLines = function (pos) {
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
      var c = new T.Float32BufferAttribute(new Float32Array(pos.length), 3); g.setAttribute('color', c);
      var ls = new T.LineSegments(g, new T.LineBasicMaterial({ vertexColors: true, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
      S.add(ls); return { ls: ls, c: c, base: new Float32Array(pos.length) };
    };
    this.dend = mkLines(dPos); this.dRange = dRange; this.dMeta = dMeta;
    this.edge = mkLines(ePos); this.eRange = eRange; this.eMeta = eMeta;

    var dp = [], nd = LITE ? 350 : 900;
    for (var q = 0; q < nd; q++) { var v = new T.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize().multiplyScalar(250 + rnd() * 1150); dp.push(v.x, v.y * 0.7, v.z); }
    var dg = new T.BufferGeometry(); dg.setAttribute('position', new T.Float32BufferAttribute(dp, 3));
    this.dust = new T.Points(dg, new T.PointsMaterial({ size: 5, map: this.glowTex, color: 0x8a7a63, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false })); S.add(this.dust);

    this.nfT = new Float32Array(N.length).fill(1); this.nfC = new Float32Array(N.length).fill(1);
    this.efT = new Float32Array(E.length).fill(1); this.efC = new Float32Array(E.length).fill(1);
    this.activeEdges = E.map(function (e, k) { return k; });

    this.out = N.map(function () { return []; });
    E.forEach(function (e, k) { self.out[e[0]].push({ k: k, rev: false }); if (e[2] === 'ilg') self.out[e[1]].push({ k: k, rev: true }); });
    this.idleVis = 0; this.pulses = [];
    var np = LITE ? 14 : 34;
    for (var pq = 0; pq < np; pq++) { var pu = { sprites: [this.mkSprite(11), this.mkSprite(7), this.mkSprite(4.5)] }; this.respawn(pu, Math.floor(rnd() * E.length), false); pu.t = rnd(); this.pulses.push(pu); }

    this.themeLabels = D.themes.map(function (t) {
      var ns = self.nodes.filter(function (n) { return n.t.theme === t.id; }), c = new T.Vector3(), maxY = -1e9;
      ns.forEach(function (n) { c.add(n.pos); maxY = Math.max(maxY, n.pos.y); }); c.divideScalar(ns.length || 1);
      var el = document.createElement('div');
      el.style.cssText = 'position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center;gap:2px;white-space:nowrap;pointer-events:none;will-change:transform;opacity:0;text-shadow:0 2px 12px rgba(17,15,12,.95)';
      var a = document.createElement('span'); a.style.cssText = 'font-family:var(--font-heading);font-size:18px'; a.textContent = t.name;
      var b = document.createElement('span'); b.style.cssText = 'font-family:var(--font-body);font-size:12px;font-weight:700;letter-spacing:.12em'; b.textContent = (t.grade === 'O' ? 'Ortaokul' : t.grade + '. sınıf').toLocaleUpperCase('tr');
      el.appendChild(a); el.appendChild(b); self.labelLayer.appendChild(el);
      return { el: el, a: a, b: b, pos: new T.Vector3(c.x, maxY + 34, c.z), grade: String(t.grade) };
    });
    this.tipName = $('.n', this.tip); this.tipSub = $('.s', this.tip); this.tipAct = $('.a', this.tip);
    this.applyTheme(state.mode);

    var rb = 0; this.nodes.forEach(function (n) { rb = Math.max(rb, n.pos.length() + n.r); });
    this.idleDist = clamp(rb * 2.25, 500, 1600);
    this.ctl = { theta: 0.95, phi: 1.18, dist: this.idleDist * 1.6, target: new T.Vector3(), gTarget: new T.Vector3(), gDist: this.idleDist, vt: 0, vp: 0 };
    this.bindPointer(R.domElement);

    this.lt = performance.now(); this.poke();
    var loop = function (now) {
      if (!self.alive) return;
      self.raf = requestAnimationFrame(loop);
      var dt = Math.min(0.05, (now - self.lt) / 1000); self.lt = now;
      if (mqReduce.matches && !self.dragging && now > self.hot) return;
      if (document.hidden) return;
      try { if (self.appliedMode !== state.mode) self.applyTheme(state.mode); self.tick(dt, now / 1000); R.render(S, C); self.updateLabels(); }
      catch (e) { if (!self.errLogged) { self.errLogged = true; console.error('frame', e); } }
    };
    this.raf = requestAnimationFrame(loop);
  };

  S3.resize = function () {
    var w = this.stage.clientWidth, h = this.stage.clientHeight; if (!w || !h) return;
    this.W = w; this.H = h; this.renderer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.poke();
  };

  S3.applyTheme = function (mode) {
    var T = this.T, P = (this.P = PAL[mode]), blend = P.add ? T.AdditiveBlending : T.NormalBlending, self = this;
    this.appliedMode = mode; GC = P.GC; EC = P.EC; this.poke();
    var bc = new T.Color(P.bg); this.bgc = P.add ? [0, 0, 0] : [bc.r, bc.g, bc.b];
    var setB = function (m) { m.blending = blend; m.needsUpdate = true; };
    this.scene.fog.color.setHex(P.fog);
    this.hemi.color.setHex(P.hemi[0]); this.hemi.groundColor.setHex(P.hemi[1]); this.hemi.intensity = P.hemi[2];
    this.nodes.forEach(function (n) { n.col.set(P.GC[n.t.grade]); n.mat.color.copy(n.col); n.mat.emissive.copy(n.col); n.gm.color.copy(n.col); setB(n.gm); if (n.rs) n.rs.material.color.copy(n.col); });
    setB(this.dend.ls.material); setB(this.edge.ls.material);
    this.dust.material.color.setHex(P.dust[0]); this.dust.material.opacity = P.dust[1]; setB(this.dust.material);
    this.pulses.forEach(function (p) { var e = self.L.E[p.k], dest = self.nodes[p.rev ? e[0] : e[1]]; p.sprites.forEach(function (s) { s.material.color.copy(dest.col); setB(s.material); }); });
    var g = this.bgc, N = this.nodes, tc = new T.Color();
    var mix = function (arr, j, c, w) { arr[j] = g[0] + (c.r - g[0]) * w; arr[j + 1] = g[1] + (c.g - g[1]) * w; arr[j + 2] = g[2] + (c.b - g[2]) * w; };
    var db = this.dend.base, dm = this.dMeta;
    for (var v = 0; v < dm.length / 2; v++) mix(db, v * 3, N[dm[v * 2]].col, dm[v * 2 + 1] * P.dendK);
    var eb = this.edge.base, em = this.eMeta;
    for (var w = 0; w < em.length / 3; w++) { var u = em[w * 3 + 2]; tc.copy(N[em[w * 3]].col).lerp(N[em[w * 3 + 1]].col, u); mix(eb, w * 3, tc, (0.3 + 0.22 * Math.abs(u - 0.5) * 2) * P.lineK); }
    this.paint(this.dend, this.nfC, this.dRange); this.paint(this.edge, this.efC, this.eRange);
    this.themeLabels.forEach(function (Lb) { Lb.el.style.textShadow = '0 2px 12px ' + P.shadow; Lb.a.style.color = P.ink; Lb.b.style.color = P.ink2; });
    this.tipName.style.color = P.ink; this.tipSub.style.color = P.ink2; this.tipAct.style.color = P.acc;
    if (state.sel) { this.buildHighlight(state.sel); this.buildFocusLabels(state.sel); }
  };

  S3.bindPointer = function (el) {
    var self = this, T = this.T;
    var ndc = function (e) { var rc = el.getBoundingClientRect(); return new T.Vector2(((e.clientX - rc.left) / rc.width) * 2 - 1, -((e.clientY - rc.top) / rc.height) * 2 + 1); };
    el.addEventListener('pointerdown', function (e) {
      el.setPointerCapture(e.pointerId); self.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (self.ptrs.size === 1) { self.down = [e.clientX, e.clientY]; self.moved = false; }
      self.dragging = true; self.ctl.vt = self.ctl.vp = 0; self.lastInteract = performance.now(); self.poke();
      if (document.activeElement && document.activeElement.tagName === 'INPUT') document.activeElement.blur();
    });
    el.addEventListener('pointermove', function (e) {
      self.mouse = ndc(e); self.poke();
      if (!self.ptrs.has(e.pointerId)) return;
      var prev = self.ptrs.get(e.pointerId);
      if (self.ptrs.size >= 2) {
        var pv = Array.from(self.ptrs.values()), d0 = Math.hypot(pv[0][0] - pv[1][0], pv[0][1] - pv[1][1]);
        self.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
        var pw = Array.from(self.ptrs.values()), d1 = Math.hypot(pw[0][0] - pw[1][0], pw[0][1] - pw[1][1]);
        if (d0 > 0 && d1 > 0) self.ctl.gDist = clamp(self.ctl.gDist * d0 / d1, MIN_D, MAX_D);
        self.moved = true; return;
      }
      var dx = e.clientX - prev[0], dy = e.clientY - prev[1];
      self.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (Math.hypot(e.clientX - self.down[0], e.clientY - self.down[1]) > 5) self.moved = true;
      if (self.moved) { self.ctl.theta -= dx * 0.0055; self.ctl.phi -= dy * 0.0055; self.ctl.vt = -dx * 0.0055; self.ctl.vp = -dy * 0.0055; el.style.cursor = 'grabbing'; }
      self.lastInteract = performance.now();
    });
    var up = function (e) {
      if (!self.ptrs.has(e.pointerId)) return;
      self.ptrs.delete(e.pointerId);
      if (self.ptrs.size) return;
      self.dragging = false;
      if (!self.moved && e.type === 'pointerup') { var i = self.pick(ndc(e)); if (i >= 0) select(self.nodes[i].t.id); }
      if (e.pointerType !== 'mouse') self.mouse = null;
      el.style.cursor = self.hover >= 0 ? 'pointer' : 'grab'; self.poke();
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', function () { if (!self.dragging) { self.mouse = null; self.hover = -1; self.poke(); } });
    el.addEventListener('wheel', function (e) { e.preventDefault(); self.ctl.gDist = clamp(self.ctl.gDist * Math.exp(e.deltaY * 0.0011), MIN_D, MAX_D); self.lastInteract = performance.now(); self.poke(); }, { passive: false });
  };

  S3.zoom = function (k) { this.ctl.gDist = clamp(this.ctl.gDist * k, MIN_D, MAX_D); this.lastInteract = performance.now(); this.poke(); };
  S3.reset = function () { this.ctl.gDist = this.idleDist; this.ctl.gTarget.set(0, 0, 0); this.poke(); };

  S3.pick = function (v) {
    this.ray.setFromCamera(v, this.camera);
    var h = this.ray.intersectObjects(this.hits, false);
    return h.length ? h[0].object.userData.i : -1;
  };

  S3.respawn = function (p, k, rev) {
    p.k = k; p.rev = rev; p.t = 0; p.sp = (120 + this.rnd() * 90) / this.elen[k];
    var e = this.L.E[k], dest = this.nodes[rev ? e[0] : e[1]];
    p.sprites.forEach(function (s) { s.material.color.copy(dest.col); });
  };

  S3.relType = function (l, id) {
    if (l.type === 'ilg') return 'rel';
    if (l.to === id) return D.byId[l.from].grade === 'O' ? 'base' : l.type === 'on' ? 'pre' : 'kol';
    return 'next';
  };

  S3.computeTargets = function (sel, filter) {
    var N = this.nodes, E = this.L.E, nf = this.nfT, ef = this.efT, self = this; this.poke();
    if (sel) {
      var set = new Set([sel]), hl = new Set();
      D.links.forEach(function (l, k) { if (l.from === sel || l.to === sel) { set.add(l.from); set.add(l.to); hl.add(k); } });
      N.forEach(function (n, i) { nf[i] = set.has(n.t.id) ? 1 : 0.1; });
      E.forEach(function (e, k) { ef[k] = hl.has(k) ? 0 : 0.12; });
      this.activeEdges = Array.from(hl);
    } else if (filter && filter !== 'all') {
      var m = function (n) { return String(n.t.grade) === filter; };
      N.forEach(function (n, i) { nf[i] = m(n) ? 1 : 0.13; });
      this.activeEdges = [];
      E.forEach(function (e, k) { var a = m(N[e[0]]), b = m(N[e[1]]); ef[k] = a && b ? 1 : a || b ? 0.45 : 0.07; if (a || b) self.activeEdges.push(k); });
    } else { nf.fill(1); ef.fill(1); this.activeEdges = E.map(function (e, k) { return k; }); }
  };

  S3.buildHighlight = function (id) {
    this.clearHighlight();
    var self = this, T = this.T, g = new T.Group(), mats = [], pulses = [];
    D.links.forEach(function (l, k) {
      if (l.from !== id && l.to !== id) return;
      var type = self.relType(l, id), cv = self.curves[k], col = new T.Color(EC[type]);
      var mk = function () { var m = new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false }); m.userData.o = EOP[type]; mats.push(m); return m; };
      if (type === 'rel') { var m = mk(), sg = new T.SphereGeometry(1.15, 8, 6); for (var j = 1; j < 14; j++) { var s = new T.Mesh(sg, m); cv.getPoint(j / 14, s.position); g.add(s); } }
      else if (type === 'kol') { var m2 = mk(), n = 13; for (var j2 = 0; j2 < n; j2 += 2) { var pts = [0, 0.5, 1].map(function (u) { return cv.getPoint((j2 + u) / n); }); g.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 6, 1.1, 6, false), m2)); } }
      else g.add(new T.Mesh(new T.TubeGeometry(cv, 48, type === 'pre' ? 1.6 : 1.2, 7, false), mk()));
      if (type !== 'rel') for (var q = 0; q < 2; q++) pulses.push({ k: k, t: q / 2 + self.rnd() * 0.1, sp: 150 / self.elen[k], sprites: [self.mkSprite(14, col), self.mkSprite(9, col), self.mkSprite(5.5, col)] });
    });
    this.scene.add(g); this.hl = { g: g, mats: mats, pulses: pulses, a: 0 };
  };
  S3.clearHighlight = function () {
    var h = this.hl, self = this; if (!h) return;
    h.g.traverse(function (o) { if (o.geometry) o.geometry.dispose(); }); h.mats.forEach(function (m) { m.dispose(); }); this.scene.remove(h.g);
    h.pulses.forEach(function (p) { p.sprites.forEach(function (s) { self.scene.remove(s); s.material.dispose(); }); });
    this.hl = null;
  };

  S3.buildFocusLabels = function (id) {
    this.clearFocusLabels();
    var self = this;
    var mk = function (tag, css) { var e = document.createElement(tag); e.style.cssText = css; return e; };
    var seen = new Map(), NS = 'http://www.w3.org/2000/svg';
    D.links.forEach(function (l) { if (l.from !== id && l.to !== id) return; var o = l.from === id ? l.to : l.from; if (!seen.has(o)) seen.set(o, self.relType(l, id)); });
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible');
    this.labelLayer.appendChild(svg);
    var items = Array.from(seen).map(function (kv) {
      var oid = kv[0], type = kv[1], n = self.nodes[self.L.ix[oid]];
      var el = mk('button', 'position:absolute;left:0;top:0;display:flex;align-items:center;gap:7px;padding:5px 12px 5px 9px;border-radius:999px;border:1.5px solid ' + EC[type] + ';background:' + self.P.chipBg + ';color:' + self.P.ink + ';font-family:var(--font-body);font-weight:600;font-size:13px;line-height:1.2;white-space:nowrap;cursor:pointer;pointer-events:auto;will-change:transform;opacity:0;transition:opacity .25s');
      el.type = 'button'; el.tabIndex = -1; el.setAttribute('aria-hidden', 'true');
      el.appendChild(mk('i', 'flex:none;width:8px;height:8px;border-radius:50%;box-sizing:border-box;' + (n.isO ? 'border:2px solid ' + GC.O : 'background:' + GC[n.t.grade])));
      el.appendChild(document.createTextNode(n.t.name));
      el.addEventListener('click', function () { select(oid); });
      el.addEventListener('mouseenter', function () { self.chipHover = n.i; self.poke(); });
      el.addEventListener('mouseleave', function () { self.chipHover = -1; self.poke(); });
      self.labelLayer.appendChild(el);
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('stroke', EC[type]); ln.setAttribute('stroke-width', '1.2'); ln.setAttribute('stroke-opacity', '0.6'); ln.setAttribute('stroke-dasharray', '2 3');
      svg.appendChild(ln);
      return { el: el, n: n, ln: ln, w: 0, cy: null };
    });
    var sn = this.nodes[this.L.ix[id]];
    var main = mk('div', 'position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center;gap:2px;white-space:nowrap;pointer-events:none;text-shadow:0 2px 14px ' + this.P.shadow + ';will-change:transform;opacity:0');
    var a = mk('span', 'font-family:var(--font-heading);font-size:22px;color:' + this.P.ink); a.textContent = sn.t.name;
    var b = mk('span', 'font-family:var(--font-body);font-size:12px;font-weight:700;letter-spacing:.1em;color:' + this.P.ink2); b.textContent = (sn.isO ? sn.t.gradeLabel : sn.t.grade + '. sınıf · ' + sn.t.themeName).toLocaleUpperCase('tr');
    main.appendChild(a); main.appendChild(b); this.labelLayer.appendChild(main);
    this.fl = { items: items, main: main, n: sn, svg: svg };
  };
  S3.clearFocusLabels = function () {
    if (!this.fl) return;
    this.fl.items.forEach(function (i) { i.el.remove(); }); this.fl.main.remove(); this.fl.svg.remove(); this.fl = null; this.chipHover = -1;
  };

  S3.select = function (id) {
    var i = this.L.ix[id], n = this.nodes[i], self = this;
    this.selI = i;
    var md = 0;
    D.links.forEach(function (l) { if (l.from === id || l.to === id) md = Math.max(md, self.nodes[self.L.ix[l.from === id ? l.to : l.from]].pos.distanceTo(n.pos)); });
    this.ctl.gTarget.copy(n.pos); this.ctl.gDist = clamp(md * 2 + 150, 320, 1000);
    this.computeTargets(id, state.filter);
    this.buildHighlight(id); this.buildFocusLabels(id);
    this.lastInteract = performance.now(); this.poke();
  };
  S3.clearSel = function () {
    this.selI = -1;
    this.ctl.gTarget.set(0, 0, 0); this.ctl.gDist = this.idleDist;
    this.computeTargets(null, state.filter);
    this.clearHighlight(); this.clearFocusLabels(); this.poke();
  };
  S3.setFilter = function (k) { this.computeTargets(null, k); };

  S3.paint = function (Lr, f, ranges) {
    var a = Lr.c.array, b = Lr.base, g = this.bgc || [0, 0, 0];
    for (var i = 0; i < ranges.length; i++) { var v = f[i], st = ranges[i][0] * 3, en = st + ranges[i][1] * 3; for (var j = st; j < en; j += 3) { a[j] = g[0] + (b[j] - g[0]) * v; a[j + 1] = g[1] + (b[j + 1] - g[1]) * v; a[j + 2] = g[2] + (b[j + 2] - g[2]) * v; } }
    Lr.c.needsUpdate = true;
  };

  S3.tick = function (dt, time) {
    var C = this.camera, ctl = this.ctl, s = state, reduce = mqReduce.matches;
    var kk = 1 - Math.exp(-dt * (reduce ? 14 : 6)), kc = 1 - Math.exp(-dt * (reduce ? 12 : 3)), self = this;
    if (!this.dragging) { ctl.theta += ctl.vt; ctl.phi += ctl.vp; var dmp = Math.pow(0.9, dt * 60); ctl.vt *= dmp; ctl.vp *= dmp; }
    if (!reduce && !this.dragging && performance.now() - this.lastInteract > 2600) ctl.theta += dt * (s.sel ? 0.03 : 0.065);
    ctl.phi = clamp(ctl.phi, 0.3, 2.84);
    ctl.target.lerp(ctl.gTarget, kc); ctl.dist += (ctl.gDist - ctl.dist) * kc;
    var sp = Math.sin(ctl.phi), t = ctl.target;
    C.position.set(t.x + ctl.dist * sp * Math.sin(ctl.theta), t.y + ctl.dist * Math.cos(ctl.phi), t.z + ctl.dist * sp * Math.cos(ctl.theta));
    C.lookAt(t);
    var gx = s.sel ? (s.wide ? 228 : 0) : (s.wide ? -Math.min(this.W * 0.2, 240) : 0), gy = s.sel && !s.wide ? this.H * 0.24 : 0;
    this.off[0] += (gx - this.off[0]) * kc; this.off[1] += (gy - this.off[1]) * kc;
    if (Math.abs(this.off[0]) + Math.abs(this.off[1]) > 0.5) C.setViewOffset(this.W, this.H, this.off[0], this.off[1], this.W, this.H);
    else if (C.view && C.view.enabled) C.clearViewOffset();
    C.updateMatrixWorld();
    if (Math.abs(ctl.gDist - ctl.dist) > 0.5 || t.distanceTo(ctl.gTarget) > 0.5 || Math.abs(gx - this.off[0]) + Math.abs(gy - this.off[1]) > 0.5) this.poke();

    var prevHover = this.hover;
    if (this.mouse && !this.dragging) this.hover = this.pick(this.mouse);
    else if (!this.mouse) this.hover = -1;
    if (this.hover !== prevHover && !this.dragging) this.renderer.domElement.style.cursor = this.hover >= 0 ? 'pointer' : 'grab';

    var ch = false, i, k;
    for (i = 0; i < this.nfC.length; i++) { var d = this.nfT[i] - this.nfC[i]; if (d) { this.nfC[i] = Math.abs(d) < 0.003 ? this.nfT[i] : this.nfC[i] + d * kk; ch = true; } }
    if (ch) { this.paint(this.dend, this.nfC, this.dRange); this.poke(); }
    ch = false;
    for (k = 0; k < this.efC.length; k++) { var d2 = this.efT[k] - this.efC[k]; if (d2) { this.efC[k] = Math.abs(d2) < 0.003 ? this.efT[k] : this.efC[k] + d2 * kk; ch = true; } }
    if (ch) { this.paint(this.edge, this.efC, this.eRange); this.poke(); }

    var P = this.P;
    this.nodes.forEach(function (n, i) {
      var f = self.nfC[i], hov = i === self.hover || i === self.chipHover, isSel = i === self.selI;
      n.flash *= Math.exp(-dt * 3.2);
      var sc = (hov ? 1.3 : 1) * (isSel ? 1.22 + (reduce ? 0 : 0.06 * Math.sin(time * 3)) : 1);
      if (Math.abs(sc - n.scale) > 0.002) self.poke();
      n.scale += (sc - n.scale) * kk;
      n.soma.scale.setScalar(n.r * n.scale);
      n.mat.opacity = (n.isO ? 0.5 : 1) * (0.1 + 0.9 * f);
      n.mat.emissiveIntensity = P.em + n.flash * P.fl + (hov ? P.hovE : 0);
      n.gm.opacity = (0.38 + n.flash * 0.7 + (isSel ? 0.4 : 0) + (hov ? 0.2 : 0)) * f * P.glowK;
      n.gs.scale.setScalar(n.r * n.scale * (7 + n.flash * 3));
      if (n.rs) { n.rs.material.opacity = 0.9 * (0.1 + 0.9 * f); n.rs.scale.setScalar(n.r * n.scale * 3.2); }
    });

    var sig = !reduce;
    this.idleVis += ((sig && !s.sel ? 1 : 0) - this.idleVis) * kc;
    if (Math.abs(this.idleVis - (sig && !s.sel ? 1 : 0)) > 0.01) this.poke();
    var E = this.L.E;
    this.pulses.forEach(function (p) {
      if (self.idleVis < 0.01) return;
      p.t += p.sp * dt;
      if (p.t >= 1) {
        var e = E[p.k], dest = p.rev ? e[0] : e[1];
        if (self.idleVis > 0.3) self.nodes[dest].flash = Math.max(self.nodes[dest].flash, self.idleVis * self.nfC[dest]);
        var outs = self.out[dest];
        var nx = outs.length && self.rnd() < 0.85 ? outs[Math.floor(self.rnd() * outs.length)] : null;
        if (!nx || (self.efT[nx.k] < 0.3 && self.rnd() < 0.85)) { var ae = self.activeEdges.length ? self.activeEdges : E.map(function (x, k) { return k; }); nx = { k: ae[Math.floor(self.rnd() * ae.length)], rev: false }; }
        self.respawn(p, nx.k, nx.rev);
      }
      var cv = self.curves[p.k], ef = self.efC[p.k], fade = Math.min(1, p.t * 6, (1 - p.t) * 10 + 0.4);
      p.sprites.forEach(function (sp2, j) {
        var u = p.t - j * 0.035;
        if (u < 0) { sp2.material.opacity = 0; return; }
        cv.getPoint(p.rev ? 1 - u : u, sp2.position);
        sp2.material.opacity = (0.95 - j * 0.3) * self.idleVis * Math.max(ef, 0.06) * fade * P.pulseK;
      });
    });
    if (this.idleVis < 0.01) this.pulses.forEach(function (p) { p.sprites.forEach(function (x) { x.material.opacity = 0; }); });

    if (this.hl) {
      var h = this.hl; h.a += (1 - h.a) * kc; if (h.a < 0.995) this.poke();
      h.mats.forEach(function (m) { m.opacity = m.userData.o * h.a; });
      h.pulses.forEach(function (p) {
        p.t = (p.t + p.sp * dt) % 1;
        var cv = self.curves[p.k];
        p.sprites.forEach(function (sp2, j) { var u = p.t - j * 0.03; if (u < 0) { sp2.material.opacity = 0; return; } cv.getPoint(u, sp2.position); sp2.material.opacity = (1 - j * 0.3) * h.a * (sig ? 1 : 0); });
      });
    }
  };

  S3.updateLabels = function () {
    var C = this.camera, v = this.v, W = this.W, H = this.H, s = state, tf = Math.tan((C.fov * Math.PI) / 360);
    var proj = function (p) { v.copy(p).project(C); return [((v.x + 1) / 2) * W, ((1 - v.y) / 2) * H, v.z]; };
    var pxR = function (n) { return (n.r * n.scale * H) / (2 * C.position.distanceTo(n.pos) * tf); };
    var tl = this.themeLabels.map(function (Lb) { var p = proj(Lb.pos); return { L: Lb, x: p[0], y: p[1], z: p[2], d: C.position.distanceTo(Lb.pos) }; })
      .sort(function (a, b) { return (s.filter !== 'all' ? (b.L.grade === s.filter) - (a.L.grade === s.filter) : 0) || a.d - b.d; });
    var boxes2 = [], hit = function (bx, by, w, h) { return boxes2.some(function (q) { return bx < q.x + q.w && bx + w > q.x && by < q.y + q.h && by + h > q.y; }); };
    tl.forEach(function (o2) {
      var L = o2.L, x = o2.x, z = o2.z, d = o2.d, y = o2.y;
      var o = s.sel || z > 1 ? 0 : clamp(1.75 - d / 1250, 0.18, 1);
      if (s.filter !== 'all' && L.grade !== s.filter) o *= 0.3;
      if (s.wide && x < Math.min(700, W - 40) && y < 400 && !s.sel) o *= 0.2;
      if (!s.wide && y < 380 && !s.sel) o *= 0.2;
      if (o > 0) {
        var w = L.w || (L.w = L.el.offsetWidth || 140), h = L.h || (L.h = L.el.offsetHeight || 40), pad = 6;
        var at = function (yy) { return [x - w / 2 - pad, yy - h - pad, w + pad * 2, h + pad * 2]; };
        var b = at(y);
        if (hit(b[0], b[1], b[2], b[3])) { var up = at(y - 30); if (!hit(up[0], up[1], up[2], up[3])) { y -= 30; b = up; } else { var dn = at(y + 30); if (!hit(dn[0], dn[1], dn[2], dn[3])) { y += 30; b = dn; } else o = Math.min(o, 0.1); } }
        if (o > 0.1) boxes2.push({ x: b[0], y: b[1], w: b[2], h: b[3] });
      }
      L.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)';
      L.el.style.opacity = o.toFixed(2);
    });
    if (this.fl) {
      var fl = this.fl, pm = proj(fl.n.pos), mx = pm[0], my = pm[1], mz = pm[2], mr = pxR(fl.n), mw = fl.mw || (fl.mw = fl.main.offsetWidth || 200);
      var mTop = my + mr * 1.25 + 10;
      fl.main.style.transform = 'translate(' + mx.toFixed(1) + 'px,' + mTop.toFixed(1) + 'px) translate(-50%,0)';
      fl.main.style.opacity = mz > 1 ? '0' : '1';
      var placed = [{ x: mx - mw / 2, y: mTop, w: mw, h: 44 }, { x: mx - mr, y: my - mr, w: mr * 2, h: mr * 2 }];
      if (s.wide) placed.push({ x: W - 536, y: H - 180, w: 64, h: 180 }); else placed.push({ x: W - 80, y: H * 0.46 - 160, w: 80, h: 160 });
      var ch = 29, gap = 4;
      var maxX = (s.wide ? W - 464 : W - 12), minY = 150, maxY = s.wide ? H - 90 : H * 0.46 - 8;
      var list = fl.items.map(function (it) {
        var pa = proj(it.n.pos), ax = pa[0], ay = pa[1], z2 = pa[2], r = pxR(it.n); if (!it.w) it.w = it.el.offsetWidth || 160;
        var x = ax < mx - 4 ? ax - r - 8 - it.w : ax + r + 8;
        x = clamp(x, 12, Math.max(12, maxX - it.w));
        return { it: it, ax: ax, ay: ay, z: z2, x: x, y: ay - ch / 2 };
      }).sort(function (a, b) { return Math.abs(a.ay - my) - Math.abs(b.ay - my); });
      list.forEach(function (Lq) {
        var free = function (yy) { return !placed.some(function (p) { return Lq.x < p.x + p.w + gap && Lq.x + Lq.it.w + gap > p.x && yy < p.y + p.h + gap && yy + ch + gap > p.y; }); };
        var y = clamp(Lq.y, minY, maxY), ok = free(y);
        for (var k = 1; k < 30 && !ok; k++) { var c = clamp(Lq.y + Math.ceil(k / 2) * (ch + gap) * (k % 2 ? 1 : -1), minY, maxY); if (free(c)) { y = c; ok = true; } }
        var it = Lq.it, show = ok && Lq.z <= 1;
        if (show) placed.push({ x: Lq.x, y: y, w: it.w, h: ch });
        it.cy = it.cy == null || !it.shown ? y : it.cy + (y - it.cy) * 0.5;
        it.shown = show;
        it.el.style.transform = 'translate(' + Lq.x.toFixed(1) + 'px,' + it.cy.toFixed(1) + 'px)';
        it.el.style.opacity = show ? '1' : '0';
        it.el.style.pointerEvents = show ? 'auto' : 'none';
        var far = show && (Math.abs(it.cy + ch / 2 - Lq.ay) > 10 || Lq.x > Lq.ax + 60 || Lq.x + it.w < Lq.ax - 60);
        it.ln.setAttribute('x1', Lq.ax.toFixed(1)); it.ln.setAttribute('y1', Lq.ay.toFixed(1));
        it.ln.setAttribute('x2', (Lq.x + (Lq.x + Lq.it.w / 2 < Lq.ax ? Lq.it.w - 2 : 2)).toFixed(1)); it.ln.setAttribute('y2', (it.cy + ch / 2).toFixed(1));
        it.ln.style.display = far ? '' : 'none';
      });
    }
    var hi = this.hover;
    if (hi >= 0) {
      var n = this.nodes[hi];
      if (this.tipI !== hi) {
        this.tipName.textContent = n.t.name;
        this.tipSub.textContent = n.isO ? n.t.gradeLabel : n.t.gradeLabel + ' · ' + n.t.themeName;
        this.tipAct.textContent = hi === this.selI ? 'Açık konu' : 'Tıkla, konuyu aç';
        this.tipI = hi;
      }
      var pp = proj(n.pos), r2 = pxR(n);
      this.tip.style.transform = 'translate(' + Math.min(pp[0] + r2 + 14, W - 280).toFixed(1) + 'px,' + (pp[1] - 28).toFixed(1) + 'px)';
      this.tip.style.opacity = '1';
    } else { this.tip.style.opacity = '0'; this.tipI = -1; }
  };

  /* ───────── başlatma ───────── */
  function failGL(why) {
    root.classList.add('nogl');
    if (scene) { scene.alive = false; }
    scene = null;
    $('#loading').hidden = true;
    $('#glnote').hidden = false;
    if (why) console.warn(why);
    ui();
  }

  function hasWebGL() {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; }
  }

  function boot() {
    buildStatic(); bindUI(); ui();
    var tc = document.querySelector('meta[name=theme-color]'); if (tc) tc.content = PAL[state.mode].theme;
    var start = readHash();
    var saveData = navigator.connection && navigator.connection.saveData;
    if (!hasWebGL() || saveData) { failGL(saveData ? 'Veri tasarrufu açık: 3B görünüm atlandı.' : 'WebGL yok.'); if (start) select(start, true); return; }
    $('#loading').hidden = false;
    var done = false;
    var timer = setTimeout(function () { if (!done) { done = true; failGL('three zaman aşımı'); if (start) select(start, true); } }, 12000);
    (async function () {
      var T = null;
      for (var i = 0; i < THREE_URLS.length && !T; i++) { try { T = await import(THREE_URLS[i]); } catch (e) { console.warn('three yüklenemedi', THREE_URLS[i]); } }
      if (done) return;
      done = true; clearTimeout(timer);
      if (!T) { failGL('three yok'); if (start) select(start, true); return; }
      try {
        scene = new Scene3D(T, $('#stage'), $('#labels'), $('#tip'));
        scene.resize();
        $('#loading').hidden = true;
        state.ready = true; ui();
        if (start) setTimeout(function () { select(start, true); }, 500);
      } catch (e) { console.error(e); failGL('sahne kurulamadı'); if (start) select(start, true); }
    })();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
