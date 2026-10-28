'use strict';
(function () {
  var EBA = window.EBA;
  var OWNER = {}; EBA.ids().forEach(function (sid) { EBA.reg[sid].topics.forEach(function (r) { OWNER[r[0]] = sid; }); });
  var SUBJ_KEY = 'eba-subject';
  function dataFor(s) { return EBA.make(s === 'all' ? EBA.ids() : [s]); }
  function pickSubject() {
    var q = /[?&]ders=([a-z]+)/.exec(location.search), h = /^#konu=(\w+)$/.exec(location.hash), s = q && q[1];
    if (!s && h && OWNER[h[1]]) s = localStorage_get(SUBJ_KEY) === 'all' ? 'all' : OWNER[h[1]];
    if (!s) s = localStorage_get(SUBJ_KEY);
    return s === 'all' || (s && EBA.reg[s]) ? s : 'biyoloji';
  }
  function localStorage_get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  var D = dataFor(pickSubject());
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  var THREE_URLS = ['https://unpkg.com/three@0.169.0/build/three.module.js', 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js'];
  var MODE_KEY = 'eba-biyoloji-mode', LANG_KEY = 'eba-biyoloji-lang';
  var FILTER_KEYS = ['all', '9', '10', '11', '12', 'O'];
  var THREE_MOD = null;

  /* ───────── dil ───────── */
  /* index.html'deki data-i18n* öğelerinin Türkçesi sayfadan okunur; İngilizcesi burada */
  var UI = { tr: {}, en: {
    title: 'EBA Biology Map · Grades 9–12 topic network',
    desc: 'Explore grade 9–12 biology topics in an interactive neural network: see what a topic builds on, how it connects to later topics, and verified official MEB resources on one screen.',
    skip: 'Skip to content', nav: 'Map controls', brand: 'EBA Biology Map, back to start', brandName: 'Biology Map',
    chips: 'Filter by grade', modes: 'Display mode', dark: 'Dark mode', mid: 'Mid tone', light: 'Light mode',
    listOpen: 'Open topic index', list: 'List', helpOpen: 'How do I read the map?',
    helpH: 'Reading the map', close: 'Close',
    help1: 'Each neuron is a topic. Its color shows the grade and its size the number of links. Ringed neurons are foundations from middle-school science and sit at the center of the network.',
    help2: 'Click a neuron and its links light up: orange is a prerequisite, dashed green a topic that helps, <span id="nextWord">cream</span> a next topic, dotted a related topic. The flowing light shows the direction of learning.',
    help3: 'Drag: rotate · Right-click or Shift+drag, two fingers: pan · Scroll or pinch: zoom to that spot · Double-click: fly there · Arrow keys: pan · /: search · Esc: back · List button: the same topics, without 3D',
    eyebrow: 'Grade 9–12 biology · Maarif Model 2024', h1: 'Pick a topic; see what it builds on and where it leads.',
    search: 'Search topics', searchPh: 'Search: mitosis…', go: 'Search', results: 'Search results',
    none1: 'No topic found with that name. Try a shorter word.', none2: 'No topic found with that name.',
    popular: 'Popular', glnote: 'The 3D view couldn’t start on this device. Search and the topic index give the same information.',
    back: 'Back to the full map', search2: 'Search another topic', panel: 'Topic details',
    listH: 'Topic index', listClose: 'Close index', legend: 'Legend',
    legNeuron: 'Neuron: topic', legRing: 'Ring: middle-school foundation', legSize: 'Size: number of links', legFlow: 'Flowing light: direction of learning',
    legPre: 'Prerequisite', legKol: 'Helps', legNext: 'Next topic', legRel: 'Related', legBase: 'Middle-school foundation',
    hintline: 'Drag: rotate · Right-click: pan · Scroll: zoom to the pointer · Click a neuron: open it',
    zoom: 'Zoom', zin: 'Zoom in', zout: 'Zoom out', flat: '2D', flatL: 'Flat view (2D)', zreset: 'Reset view',
    loading: 'Building the neural network…'
  } };
  var I18N_ATTR = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-title', 'title'], ['data-i18n-ph', 'placeholder']];
  var STR = {
    tr: {
      locale: 'tr', langName: 'Türkçe', switchTo: 'Türkçeye geç', all: 'Tümü',
      chip: function (k) { return k === 'O' ? 'Ortaokul' : '<span>' + k + '<span class="lf">. sınıf</span></span>'; },
      random: 'Rastgele konu', scope: function (f) { return 'Kapsam: ' + f; },
      scopeAll: function (n) { return 'Tüm sınıflarda ara' + (n ? ' (+' + n + ')' : ''); }, noneIn: function (f) { return f + ' içinde sonuç yok.'; },
      viaKol: 'bu konudan destek alır', viaOn: 'bu konuya dayanır', themeTag: function (th) { return th + ' teması'; },
      closePanel: 'Paneli kapat', expand: 'Ayrıntıları büyüt', shrink: 'Küçült', grab: 'Paneli büyüt ya da küçült',
      preOnly: 'Yalnızca ön koşulları göster', short: 'Kısaca', subjPick: 'Ders seç', allSubj: 'Tüm dersler', allSubjSub: 'Hepsi tek sinir ağında', topicsN: 'konu', subjNow: function (s) { return s + ' haritası açıldı'; }, yzH: 'Yazılıya hazırlık', yzSub: 'Bu konu aşağıdaki ortak yazılılarda sorulabilir.', yzName: function (g, d, y) { return g + '. sınıf · ' + d + '. dönem ' + y + '. yazılı'; }, yzPdf: 'Örnek yazılı ve puanlama (PDF)', yzTap: 'Bir yazılıya dokun: örnek sorular ve puanlama (PDF) açılır', yzMat: 'Ders materyalleri (fasikül)', yzSrc: 'MEB · OGM Materyal · üye olmadan açılır',
      yzCell: function (y) { return y + '. yazılı'; }, yzTerm: function (d) { return d + '. dönem'; }, yzIn: 'Soruluyor', yzOut: 'Bu konu yok', yzNone: 'Yayımlanmadı', yzBad: 'Dosya hatalı',
      yzSum: function (g, inc) {
        if (!inc.length) return 'Bu konu ' + g + '. sınıfın MEB örnek yazılı senaryolarında yok. Yine de hepsini açıp bakabilirsin.';
        var w = inc.map(function (e) { return e.donem + '. dönem ' + e.yazili + '. yazılıda'; });
        return 'MEB örnek senaryosuna göre bu konu ' + (w.length > 1 ? w.slice(0, -1).join(', ') + ' ve ' + w[w.length - 1] : w[0]) + ' soruluyor. Okulunun yazılısı farklı olabilir.';
      },
      xH: 'Diğer derslerle bağı', xSub: 'Bu konu başka derslerde de işe yarar. Tıklayınca tüm dersler ağında açılır.', xSubM: 'Bu konu başka derslerde kullanılır ya da onlardan destek alır.',
      xKind: { pre: 'önce bunu bil', kol: 'kolaylaştırır', next: 'orada kullanılır', rel: 'ilgili' },
      atH: 'Dersler arası ağ', atStats: function (s, t, b) { return s + ' ders · ' + t + ' konu · ' + b + ' köprü'; }, atRow: function (t, b) { return t + ' konu · ' + b + ' köprü'; },
      atPartners: 'En çok bağlı olduğu dersler', atEx: 'Örnek köprüler', atBridges: 'Yalnızca dersler arası köprüleri göster', atList: 'Derse git',
      atHint: 'Sürükle: döndür · Sağ tık ya da Shift+sürükle: kaydır · Tekerlek: imlecin olduğu yere yakınlaş · Çift tık: oraya uç · Oklar: kaydır',
      atHintTouch: 'Bir parmak: döndür · İki parmak: kaydır ve yakınlaştır · Çift dokun: oraya uç',
      atFly: function (s) { return s + ' kümesine git'; }, bridgesOn: 'Yalnızca dersler arası köprüler gösteriliyor', bridgesOff: 'Tüm bağlantılar gösteriliyor', pairN: function (n) { return n + ' köprü'; }, yzMatNote: 'Başlıklar güncel müfredattan farklı olabilir.', official: 'Resmî kaynaklar', verified: 'Doğrulandı', newTab: '(yeni sekmede açılır)',
      notOfficial: 'resmî materyal olarak gösterilmez', checked: function (d) { return 'Bağlantılar ' + d + ' itibarıyla kontrol edildi.'; },
      preOnlyNote: 'Yalnızca bu konudan önce bilinmesi gerekenler gösteriliyor.',
      preH: 'Önce bunları bil', preSub: 'Ön koşul: bilinmeden bu konu anlaşılamaz.', baseH: 'Ortaokuldan gelen temel',
      kolH: 'Öğrenmeni kolaylaştırır', kolSub: 'Şart değil; bilirsen bu konu daha kolay yerine oturur.',
      chainH: 'Daha geriye giden zincir', chainSub: function (n) { return 'Ön koşullarının da dayandığı ' + n + ' konu. Eksik bir yer varsa buradan başla.'; },
      nextH: 'Bu bilgiyi sonra nerede kullanacaksın', relH: 'İlgili konular', source: function (s) { return 'Kaynak: ' + s; },
      opened: function (n) { return n + ' konusu açıldı'; }, fullMap: 'Tüm harita',
      showing: function (f) { return 'Gösterilen: <b>' + f + '</b> konuları.'; }, showAll: 'Tüm sınıfları göster',
      preOn: 'Yalnızca ön koşullar gösteriliyor', preOff: 'Tüm bağlantılar gösteriliyor', flatOn: 'Düz görünüm açık', flatOff: 'Üç boyutlu görünüm',
      canvas: 'Biyoloji konularının üç boyutlu sinir ağı. Aynı konulara klavyeyle arama kutusundan ya da Liste düğmesinden ulaşılır.',
      tipOpen: 'Açık konu', tipClick: 'Tıkla, konuyu aç', cream: 'krem', darkW: 'koyu'
    },
    en: {
      locale: 'en', langName: 'English', switchTo: 'Switch to English', all: 'All',
      chip: function (k) { return k === 'O' ? '<span>Middle<span class="lf"> school</span></span>' : '<span><span class="lf">Grade </span>' + k + '</span>'; },
      random: 'Random topic', scope: function (f) { return 'Scope: ' + f; },
      scopeAll: function (n) { return 'Search all grades' + (n ? ' (+' + n + ')' : ''); }, noneIn: function (f) { return 'No results in ' + f + '.'; },
      viaKol: 'draws support from this topic', viaOn: 'builds on this topic', themeTag: function (th) { return th + ' theme'; },
      closePanel: 'Close panel', expand: 'Expand details', shrink: 'Shrink', grab: 'Expand or shrink the panel',
      preOnly: 'Show prerequisites only', short: 'In short', subjPick: 'Choose a subject', allSubj: 'All subjects', allSubjSub: 'Everything in one network', topicsN: 'topics', subjNow: function (s) { return s + ' map opened'; }, yzH: 'Exam practice', yzSub: 'This topic can appear in the common written exams below.', yzName: function (g, d, y) { return 'Grade ' + g + ' · term ' + d + ' · exam ' + y; }, yzPdf: 'Sample exam and scoring (PDF, Turkish)', yzTap: 'Tap an exam to open its sample questions and scoring (PDF, Turkish)', yzMat: 'Course materials (booklets, Turkish)', yzSrc: 'MEB · OGM Materyal · no sign-up',
      yzCell: function (y) { return 'Exam ' + y; }, yzTerm: function (d) { return 'Term ' + d; }, yzIn: 'Included', yzOut: 'Not in this one', yzNone: 'Not published', yzBad: 'Wrong file',
      yzSum: function (g, inc) {
        if (!inc.length) return 'This topic isn’t in the grade ' + g + ' MEB sample exam scenarios. You can still open them all.';
        var w = inc.map(function (e) { return 'term ' + e.donem + ' exam ' + e.yazili; });
        return 'In the MEB sample scenarios this topic appears in ' + (w.length > 1 ? w.slice(0, -1).join(', ') + ' and ' + w[w.length - 1] : w[0]) + '. Your school’s exam may differ.';
      },
      xH: 'Links to other subjects', xSub: 'This topic matters in other subjects too. Opens in the all-subjects network.', xSubM: 'This topic is used in other subjects or draws on them.',
      xKind: { pre: 'know this first', kol: 'makes it easier', next: 'used there', rel: 'related' },
      atH: 'Across subjects', atStats: function (s, t, b) { return s + ' subjects · ' + t + ' topics · ' + b + ' bridges'; }, atRow: function (t, b) { return t + ' topics · ' + b + ' bridges'; },
      atPartners: 'Most linked with', atEx: 'Example bridges', atBridges: 'Show only links between subjects', atList: 'Go to a subject',
      atHint: 'Drag: rotate · Right-click or Shift+drag: pan · Wheel: zoom to the pointer · Double-click: fly there · Arrow keys: pan',
      atHintTouch: 'One finger: rotate · Two fingers: pan and zoom · Double-tap: fly there',
      atFly: function (s) { return 'Go to the ' + s + ' cluster'; }, bridgesOn: 'Showing only links between subjects', bridgesOff: 'Showing all links', pairN: function (n) { return n + ' bridges'; }, yzMatNote: 'Titles may differ from the current curriculum.', official: 'Official resources', verified: 'Verified', newTab: '(opens in a new tab)',
      notOfficial: 'not shown as official material', checked: function (d) { return 'Links checked as of ' + d + '.'; },
      preOnlyNote: 'Showing only what you need to know before this topic.',
      preH: 'Know these first', preSub: 'Prerequisite: this topic can’t be understood without it.', baseH: 'Foundation from middle school',
      kolH: 'Makes it easier to learn', kolSub: 'Not required; if you know it, this topic falls into place more easily.',
      chainH: 'The chain further back', chainSub: function (n) { return (n === 1 ? '1 topic' : n + ' topics') + ' that its prerequisites build on. If something is missing, start here.'; },
      nextH: 'Where you’ll use this later', relH: 'Related topics', source: function (s) { return 'Source: ' + s; },
      opened: function (n) { return 'Opened topic: ' + n; }, fullMap: 'Full map',
      showing: function (f) { return 'Showing: <b>' + f + '</b> topics.'; }, showAll: 'Show all grades',
      preOn: 'Showing prerequisites only', preOff: 'Showing all links', flatOn: 'Flat view on', flatOff: '3D view',
      canvas: 'Three-dimensional neural network of biology topics. The same topics can be reached by keyboard from the search box or the List button.',
      tipOpen: 'Open now', tipClick: 'Click to open the topic', cream: 'cream', darkW: 'dark'
    }
  };
  var lang = D.setLang(root.getAttribute('lang') === 'en' ? 'en' : 'tr'), TX = STR[lang];
  function filters() { return FILTER_KEYS.filter(function (k) { return k === 'all' || D.topics.some(function (t) { return String(t.grade) === k; }); }).map(function (k) { return [k, k === 'all' ? TX.all : D.gradeName(k)]; }); }
  var MIN_D = 90, MAX_D = 2600;
  var EOP = { pre: 0.95, base: 0.85, kol: 0.9, next: 0.8, rel: 0.85 };

  var PAL = {
    dark: { lbg: 'rgba(29,26,22,.5)', rim: 0.55, GC: { O: '#c0b6a5', 9: '#aebf92', 10: '#e3b766', 11: '#f6a06b', 12: '#c3a4ec' }, EC: { pre: '#f6a06b', base: '#c0b6a5', kol: '#aebf92', next: '#f5ead8', rel: '#a19786' }, SC: { biyoloji: '#9fcb78', matematik: '#78b4ea', kimya: '#ecc35a', fizik: '#f28a55', edebiyat: '#ee8fc1', cografya: '#4fc3aa', din: '#b79cf0', felsefe: '#d8b892', ingilizce: '#ef6d6d' },
      add: true, bg: '#000000', fog: 0x241f1a, hemi: [0xfff1dc, 0x2a2119, 1.35], em: 0.46, fl: 0.9, hovE: 0.35, glowK: 1, pulseK: 1, dendK: 0.6, lineK: 1.1, dust: [0x96856c, 0.55],
      ink: '#f5ead8', ink2: '#c9bfae', acc: '#f6a06b', shadow: 'rgba(23,20,16,.95)', chipBg: 'rgba(42,37,31,.9)', nextWord: 'cream', theme: '#1d1a16' },
    light: { lbg: 'rgba(245,239,229,.7)', rim: 0.8, GC: { O: '#857b6b', 9: '#64843f', 10: '#b9821c', 11: '#d2622a', 12: '#7b5bb0' }, EC: { pre: '#c4561d', base: '#82796a', kol: '#5b7a3a', next: '#3a342c', rel: '#8a8070' }, SC: { biyoloji: '#4f7f2c', matematik: '#2f6fae', kimya: '#a4780e', fizik: '#c2551c', edebiyat: '#b2477f', cografya: '#16806b', din: '#6d4fb3', felsefe: '#8a6a43', ingilizce: '#b83a3a' },
      add: false, bg: '#ebe3d5', fog: 0xebe3d5, hemi: [0xffffff, 0xcdbfa8, 1.5], em: 0.12, fl: 0.45, hovE: 0.15, glowK: 0.4, pulseK: 1.2, dendK: 0.7, lineK: 2.05, dust: [0xbcae95, 0.45],
      ink: '#201e1d', ink2: '#5c5448', acc: '#a4501c', shadow: 'rgba(245,239,229,.95)', chipBg: 'rgba(251,246,238,.94)', nextWord: 'darkW', theme: '#e8e0d2' },
    mid: { lbg: 'rgba(214,199,177,.7)', rim: 0.8, GC: { O: '#4e4438', 9: '#2f7a12', 10: '#a35f00', 11: '#c93a0c', 12: '#6a3a9c' }, EC: { pre: '#c93a0c', base: '#4e4438', kol: '#2f7a12', next: '#1c1712', rel: '#6b5d4c' }, SC: { biyoloji: '#2f6514', matematik: '#1d4f8a', kimya: '#7a5500', fizik: '#9c3a08', edebiyat: '#8c2a5f', cografya: '#0b5f4f', din: '#4f3290', felsefe: '#5e4526', ingilizce: '#8f2020' },
      add: false, bg: '#c7b59c', fog: 0xc7b59c, hemi: [0xffffff, 0x8a7660, 1.4], em: 0.1, fl: 0.45, hovE: 0.15, glowK: 0.35, pulseK: 1.2, dendK: 0.75, lineK: 1.85, dust: [0xa08c72, 0.35],
      ink: '#1c1712', ink2: '#3f352a', acc: '#7f300a', shadow: 'rgba(214,199,177,.95)', chipBg: 'rgba(222,210,192,.94)', nextWord: 'darkW', theme: '#b5a186' }
  };
  var GC = PAL.dark.GC, EC = PAL.dark.EC;

  var mqReduce = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var LITE = Math.min(innerWidth, innerHeight) < 700 || (navigator.hardwareConcurrency || 8) <= 4;

  var state = { mode: root.getAttribute('data-eba-mode') || 'dark', ready: false, subject: D.multi ? 'all' : D.sel[0], sel: null, atlasSub: null, bridges: false, subjOpen: false, query: '', open: false, hi: 0, filter: 'all', scope: 'filter', preOnly: false, flat: false, help: false, listOpen: false, wide: innerWidth >= 900, roomy: innerWidth >= 1280 };
  var scene = null;
  var COARSE = window.matchMedia ? matchMedia('(pointer: coarse)').matches : false;
  var app = $('#app');
  var results = [];

  /* ───────── arayüz ───────── */
  var boxes = [$('#s1'), $('#s2')].map(function (w) {
    return { w: w, input: $('input', w), list: $('.results', w), none: $('.noresults', w) };
  });

  function dotHTML(g) { return '<i class="' + (g === 'O' ? 'ring' : '') + '" style="--c:var(--g' + g + ')"></i>'; }
  /* tüm dersler görünümünde ağ ders rengindedir; noktalar da öyle */
  function tdot(t) { return D.multi ? '<i class="' + (t.grade === 'O' ? 'ring' : '') + '" style="--c:var(--s-' + t.subject + ')"></i>' : dotHTML(t.grade); }
  function subOf(t) { return (D.multi ? t.subjectShort + ' · ' : '') + (t.grade === 'O' ? t.gradeLabel : t.gradeLabel + ' · ' + t.themeName); }

  var ICON_RND = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>';
  function eachI18n(fn) { I18N_ATTR.forEach(function (a) { $$('[' + a[0] + ']').forEach(function (el) { fn(el, el.getAttribute(a[0]), a[1]); }); }); }
  function buildStatic() {
    var md = document.querySelector('meta[name=description]');
    UI.tr.title = document.title; UI.tr.desc = md ? md.content : '';
    eachI18n(function (el, k, attr) { if (!(k in UI.tr)) UI.tr[k] = attr ? el.getAttribute(attr) : el.innerHTML; });
    renderStatic();
    if (lang !== 'tr' || state.subject !== 'biyoloji') $('#listView .lbody').innerHTML = D.listHTML();
  }
  /* seçili derse göre değişen sayfa metinleri (Biyoloji için sayfadaki özgün metinler kalır) */
  function dyn(l) {
    if (state.subject === 'biyoloji') return {};
    var multi = D.multi, tr = l === 'tr', sub = multi ? null : D.subjectShort(D.sel[0]);
    var gs = D.topics.filter(function (t) { return t.grade !== 'O'; }).map(function (t) { return +t.grade; }), g0 = Math.min.apply(null, gs), g1 = Math.max.apply(null, gs), rg = g0 === g1 ? '' + g0 : g0 + '–' + g1;
    var ex = D.popular.map(function (id) { return D.byId[id] && D.byId[id].name; }).filter(Boolean).sort(function (x, y) { return x.length - y.length; })[0] || '';
    var low = function (s) { return s.toLocaleLowerCase(tr ? 'tr' : 'en'); };
    var nm = multi ? (tr ? 'Tüm Dersler' : 'All Subjects') : sub;
    var map = tr ? nm + ' Haritası' : nm + ' Map';
    var o = tr ? {
      title: 'EBA ' + map + ' · ' + rg + '. sınıf konu ağı',
      desc: rg + '. sınıf ' + (multi ? 'tüm ders' : low(sub)) + ' konularını etkileşimli sinir ağında keşfet: bir konunun neye dayandığını, hangi konulara götürdüğünü ve doğrulanmış resmî MEB kaynaklarını tek ekranda gör.',
      brand: 'EBA ' + map + ', başa dön', brandName: map,
      eyebrow: rg + '. sınıf ' + (multi ? 'tüm dersler' : low(sub)) + ' · Maarif Modeli 2024', searchPh: 'Konu ara: ' + low(ex) + '…',
      help1: UI.tr.help1 && UI.tr.help1.replace('ortaokul fen bilimlerinden', 'ortaokuldan')
    } : {
      title: 'EBA ' + map + ' · Grades ' + rg + ' topic network',
      desc: 'Explore grade ' + rg + ' ' + (multi ? 'all-subject' : low(sub)) + ' topics in an interactive neural network: see what a topic builds on, how it connects to later topics, and verified official MEB resources on one screen.',
      brand: 'EBA ' + map + ', back to start', brandName: map,
      eyebrow: 'Grades ' + rg + ' ' + (multi ? 'all subjects' : low(sub)) + ' · Maarif Model 2024', searchPh: 'Search: ' + low(ex) + '…',
      help1: UI.en.help1 && UI.en.help1.replace('middle-school science', 'middle school')
    };
    if (!o.help1) delete o.help1;
    return o;
  }
  function renderPopular() {
    var pop = $('#popular'); if (!pop) return;
    $$('[data-go],[data-random]', pop).forEach(function (b) { b.remove(); });
    D.popular.forEach(function (id) {
      if (!D.byId[id]) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-secondary'; b.dataset.go = id; pop.appendChild(b);
    });
    var rb = document.createElement('button'); rb.type = 'button'; rb.className = 'btn btn-secondary rnd'; rb.dataset.random = '1'; pop.appendChild(rb);
  }
  /* dile bağlı sabit metinler; her dil değişiminde yeniden yazılır */
  function renderStatic() {
    var u = Object.assign({}, UI[lang], dyn(lang)), md = document.querySelector('meta[name=description]');
    root.lang = lang; document.title = u.title; if (md) md.content = u.desc;
    eachI18n(function (el, k, attr) { var v = u[k]; if (v == null) return; if (attr) el.setAttribute(attr, v); else el.innerHTML = v; });
    renderPopular();
    $('#chips').innerHTML = filters().map(function (f) {
      return '<button type="button" class="chip" data-f="' + f[0] + '" aria-pressed="false" aria-label="' + esc(f[1]) + '">' + (f[0] === 'all' ? '' : dotHTML(f[0])) + (f[0] === 'all' ? esc(f[1]) : TX.chip(f[0])) + '</button>';
    }).join('');
    $$('#popular [data-go]').forEach(function (b) { b.textContent = D.byId[b.dataset.go].name; });
    $('#popular [data-random]').innerHTML = ICON_RND + esc(TX.random);
    var other = lang === 'tr' ? 'en' : 'tr', lb = $('#langBtn');
    lb.textContent = other.toUpperCase(); lb.setAttribute('lang', other); lb.dataset.lang = other;
    lb.setAttribute('aria-label', STR[other].switchTo); lb.title = STR[other].switchTo;
  }
  function setLang(l) {
    if (l === lang || !STR[l]) return;
    lang = D.setLang(l); TX = STR[lang];
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    try { if (/[?&]lang=/.test(location.search)) history.replaceState(history.state, '', location.pathname + location.search.replace(/([?&]lang=)[^&]*/, '$1' + lang) + location.hash); } catch (e) {}
    renderStatic();
    var lb = $('#listView .lbody'); if (lb) lb.innerHTML = D.listHTML();
    applyFilterViews();
    if (scene) scene.relabel();
    if (state.sel) renderPanel(true);
    ui();
    announce(TX.langName);
  }

  var phoneMQ = window.matchMedia('(max-width:599px)');
  function heroMin(on) {
    on = !!on && phoneMQ.matches && !state.sel;
    if (app.classList.contains('hero-min') === on) return;
    app.classList.toggle('hero-min', on);
    if (scene) { scene.hb = null; scene.poke(); }
  }
  phoneMQ.addEventListener('change', function () { heroMin(false); });
  ['focusin', 'click'].forEach(function (ev) { var h = document.getElementById('hero'); if (h) h.addEventListener(ev, function () { heroMin(false); }); });

  function ui() {
    var sel = state.sel ? D.byId[state.sel] : null;
    app.classList.toggle('has-sel', !!sel);
    app.classList.toggle('all-view', !!D.multi);
    renderSubjBtn();
    app.classList.toggle('chips-hide', !!sel);
    if (sel) heroMin(false);
    $('#hero').hidden = !!sel;
    $('#s2').hidden = !sel;
    $('#panel').hidden = !sel;
    $('#focusLegend').hidden = !sel;
    $('#idleLegend').style.visibility = sel ? 'hidden' : '';
    $('#hintline').hidden = !(state.roomy && !sel && scene && !D.multi);
    renderAtlas();
    $('#help').hidden = !state.help;
    $('#helpBtn').setAttribute('aria-expanded', String(state.help));
    $('#listView').hidden = !state.listOpen && !root.classList.contains('nogl');
    $('#listBtn').setAttribute('aria-expanded', String(state.listOpen));
    $('#nextWord').textContent = TX[PAL[state.mode].nextWord];
    if (!ui.fv) { ui.fv = 1; applyFilterViews(); }
    $$('.mode').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)); });
    $$('.chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === state.filter)); });
    renderResults();
  }

  function filterLabel() { var fs = filters(); for (var i = 0; i < fs.length; i++) if (fs[i][0] === state.filter) return fs[i][1]; return ''; }
  function renderResults() {
    var g = state.filter !== 'all' && state.scope === 'filter' ? state.filter : null;
    var all = state.query.trim() ? D.search(state.query) : [];
    var inScope = g ? all.filter(function (t) { return String(t.grade) === g; }) : all;
    var hiddenN = all.length - inScope.length;
    results = inScope.slice(0, 7);
    var scopeRow = g ? '<div class="scope" role="presentation"><span>' + esc(TX.scope(filterLabel())) + '</span><button type="button" data-scope>' + esc(TX.scopeAll(hiddenN)) + '</button></div>' : '';
    boxes.forEach(function (b, bi) {
      var visible = bi === 0 ? !state.sel : !!state.sel;
      var show = visible && state.open && (results.length > 0 || (!!g && state.query.trim() && hiddenN > 0));
      b.list.hidden = !show;
      b.none.hidden = !(visible && state.open && state.query.trim() && !results.length && !(g && hiddenN > 0));
      b.input.setAttribute('aria-expanded', String(show));
      if (b.input.value !== state.query) b.input.value = state.query;
      if (show) {
        b.list.innerHTML = results.map(function (t, i) {
          return '<div class="opt" role="option" id="o' + bi + '-' + i + '" data-id="' + t.id + '" aria-selected="' + (i === state.hi) + '">' + tdot(t) + '<span><b>' + esc(t.name) + '</b><small>' + esc(subOf(t)) + '</small></span></div>';
        }).join('') + scopeRow;
        if (!results.length) b.list.innerHTML = '<div class="scope" role="presentation"><span>' + esc(TX.noneIn(filterLabel())) + '</span><button type="button" data-scope>' + esc(TX.scopeAll(hiddenN)) + '</button></div>';
        b.input.setAttribute('aria-activedescendant', results.length ? 'o' + bi + '-' + state.hi : '');
      } else b.input.removeAttribute('aria-activedescendant');
    });
  }

  /* ders atlası: tüm dersler görünümünde soldaki boşluk. Her ders, konu ve köprü sayısıyla; seçilen ders kümesine uçulur,
     en çok bağlı olduğu dersler ve örnek köprüler açılır. Telefonda yalnızca kaydırılabilir ders şeridi kalır. */
  function atlasData() {
    var S = {}, cross = 0;
    D.sel.forEach(function (sid) { S[sid] = { id: sid, n: 0, b: 0, w: {}, ex: [] }; });
    D.topics.forEach(function (t) { S[t.subject].n++; });
    D.links.forEach(function (l) {
      var a = D.byId[l.from], b = D.byId[l.to]; if (a.subject === b.subject) return;
      cross++;
      [[a, b], [b, a]].forEach(function (p) { var s = S[p[0].subject]; s.b++; s.w[p[1].subject] = (s.w[p[1].subject] || 0) + 1; s.ex.push({ l: l, me: p[0], o: p[1] }); });
    });
    return { S: S, cross: cross };
  }
  function atlasDetail(s) {
    var ps = Object.keys(s.w).sort(function (a, b) { return s.w[b] - s.w[a]; }).slice(0, 3), rank = { on: 0, kol: 1, ilg: 2 }, seen = {}, ex = [];
    s.ex.slice().sort(function (x, y) { return rank[x.l.type] - rank[y.l.type]; }).forEach(function (e) { if (ex.length < 3 && !seen[e.o.subject]) { seen[e.o.subject] = 1; ex.push(e); } });
    return '<div class="ad"><p class="ap">' + esc(TX.atPartners) + '</p><p class="apl">' + ps.map(function (p) { return '<span><i style="--c:var(--s-' + p + ')"></i>' + esc(D.subjectShort(p)) + ' <b>' + s.w[p] + '</b></span>'; }).join('') + '</p>' +
      '<p class="ap">' + esc(TX.atEx) + '</p>' + ex.map(function (e) {
        var f = D.byId[e.l.from], t = D.byId[e.l.to];
        return '<button type="button" class="ax" data-go="' + e.me.id + '"><span><i style="--c:var(--s-' + f.subject + ')"></i>' + esc(f.name) + '</span><span class="to"><i style="--c:var(--s-' + t.subject + ')"></i>' + esc(t.name) + '</span><small>' + esc(e.l.reason) + '</small></button>';
      }).join('') + '</div>';
  }
  function renderAtlas() {
    var el = $('#atlas'); if (!el) return;
    var show = !!(D.multi && scene && !state.sel);
    if (el.hidden === show) { el.hidden = !show; if (scene) scene.refit(); }
    if (!show) return;
    var key = lang + '|' + state.atlasSub + '|' + state.bridges + '|' + D.sel.join(); if (el.dataset.k === key) return; el.dataset.k = key;
    var A = D._atlas || (D._atlas = atlasData());
    var h = '<h2 id="atlasH">' + esc(TX.atH) + '</h2><p class="as">' + esc(TX.atStats(D.sel.length, D.topics.length, A.cross)) + '</p><ul class="al" aria-label="' + esc(TX.atList) + '">';
    D.sel.forEach(function (sid) {
      var s = A.S[sid], on = state.atlasSub === sid;
      h += '<li><button type="button" class="ar" data-fly="' + sid + '" aria-pressed="' + on + '"><i style="--c:var(--s-' + sid + ')"></i><b>' + esc(D.subjectShort(sid)) + '</b><small>' + esc(TX.atRow(s.n, s.b)) + '</small></button>' + (on ? atlasDetail(s) : '') + '</li>';
    });
    el.innerHTML = h + '</ul><label class="abr"><input type="checkbox" data-bridges' + (state.bridges ? ' checked' : '') + '><span>' + esc(TX.atBridges) + '</span></label><p class="ah">' + esc(COARSE ? TX.atHintTouch : TX.atHint) + '</p>';
  }
  function flySubject(sid) {
    state.atlasSub = state.atlasSub === sid ? null : sid;
    if (scene) { scene.setHiSub(state.atlasSub); if (state.atlasSub) scene.flySubject(sid); else scene.reset(); }
    renderAtlas();
    var b = $('#atlas [data-fly="' + sid + '"]'); if (b) b.focus({ preventScroll: true });
    announce(state.atlasSub ? TX.atFly(D.subjectShort(sid)) : TX.fullMap);
  }

  var ICON_BOOK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>';
  var ICON_OK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>';
  var ICON_EXT = '<svg style="flex:none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#645c50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';
  var ICON_CLOCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
  var ICON_ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#464238" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>';

  function itemHTML(o, kind) {
    var t = o.topic, g = t.grade === 'O' ? t.gradeLabel : t.gradeLabel + ' · ' + t.themeName;
    var via = kind === 'next' ? ' · ' + (o.type === 'kol' ? TX.viaKol : TX.viaOn) : '';
    var mk = kind === 'next' ? ICON_ARROW : '<span class="mk ' + kind + '"></span>';
    return '<button type="button" class="item" data-go="' + t.id + '">' + mk + '<span class="it"><span class="t"><b>' + esc(t.name) + '</b><span>' + esc(g + via) + '</span></span><span class="r">' + esc(o.reason) + '</span></span></button>';
  }
  function group(h, cls, sub, arr, kind) {
    if (!arr.length) return '';
    return '<div class="sec"><h3 class="' + cls + '">' + h + '</h3>' + (sub ? '<p class="sub">' + sub + '</p>' : '') + arr.map(function (o) { return itemHTML(o, kind); }).join('') + '</div>';
  }

  /* ön koşul zinciri: doğrudan ön koşulların da ön koşulları (en çok 4 basamak) */
  function chainOf(id) {
    var seen = {}, out = [], frontier = [id], depth = 0;
    seen[id] = 1;
    while (frontier.length && depth < 4) {
      var next = [];
      D.links.forEach(function (l) { if (l.type === 'on' && frontier.indexOf(l.to) >= 0 && !seen[l.from]) { seen[l.from] = 1; next.push(l.from); if (depth >= 1) out.push(D.byId[l.from]); } });
      frontier = next; depth++;
    }
    var gv = function (t) { return t.grade === 'O' ? 8 : +t.grade; };
    return out.sort(function (a, b) { return gv(a) - gv(b) || a.name.localeCompare(b.name, TX.locale); });
  }

  /* Yazılı takvimi: konunun sınıfındaki dört ortak yazılı sırayla. Konunun sorulduğu yazılı dolu, sorulmadığı boş
     (yine açılır), kaynakta dosyası olmayan ya da yanlış olan kesik çizgili; böylece hiçbir yazılı sessizce kaybolmaz. */
  var ICON_CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  function yazilHTML(t) {
    var Y = window.EBA_YAZILI, ys = Y && Y.subjects && Y.subjects[t.subject]; if (!ys) return '';
    var ex = ys.exams.filter(function (e) { return e.grade === t.grade; }); if (!ex.length) return '';
    var slot = function (d, y) { return ex.filter(function (e) { return e.donem === d && e.yazili === y; })[0]; };
    var inc = ex.filter(function (e) { return e.topics && e.topics.indexOf(t.id) >= 0; });
    var cell = function (d, y) {
      var e = slot(d, y), name = TX.yzCell(y);
      if (!e || e.hata) return '<li class="yz-na"><span><b>' + esc(name) + '</b><small>' + esc(e ? TX.yzBad : TX.yzNone) + '</small></span></li>';
      var on = e.topics.indexOf(t.id) >= 0, lbl = TX.yzName(e.grade, d, y) + ': ' + (on ? TX.yzIn : TX.yzOut) + ' · ' + TX.yzPdf + ' ' + TX.newTab;
      return '<li class="' + (on ? 'yz-on' : 'yz-off') + '"><a href="' + esc(e.url) + '" target="_blank" rel="noopener" aria-label="' + esc(lbl) + '"><b>' + esc(name) + '</b><small>' + (on ? ICON_CHECK : '') + esc(on ? TX.yzIn : TX.yzOut) + '</small></a></li>';
    };
    var row = function (url, title, small) {
      return '<a class="res" href="' + esc(url) + '" target="_blank" rel="noopener"><span class="ic">' + ICON_BOOK + '</span><span class="tx"><b>' + esc(title) + '</b><small>' + esc(small) + '</small></span>' + ICON_EXT + '<span class="sr">' + esc(TX.newTab) + '</span></a>';
    };
    return '<div class="sec"><h3>' + esc(TX.yzH) + '</h3><p class="sub">' + esc(TX.yzSum(t.grade, inc)) + '</p>' +
      '<div class="yz">' + [1, 2].map(function (d) { return '<div class="yzd"><span>' + esc(TX.yzTerm(d)) + '</span><ol>' + cell(d, 1) + cell(d, 2) + '</ol></div>'; }).join('') + '</div>' +
      ex.filter(function (e) { return e.hata; }).map(function (e) { return '<p class="fine yz-note">' + esc(TX.yzName(e.grade, e.donem, e.yazili)) + ': ' + esc(e.hata[lang] || e.hata.tr) + '</p>'; }).join('') +
      '<p class="fine">' + esc(TX.yzTap + ' · ' + TX.yzSrc) + '</p>' +
      row(ys.materyal[t.grade], TX.yzMat, TX.yzSrc + ' · ' + TX.yzMatNote) +
      '<p class="fine">' + esc(TX.checked(new Date(Y.checked).toLocaleDateString(TX.locale, { month: 'long', year: 'numeric' }))) + '</p></div>';
  }

  /* dersler arası bağlar: tek ders görünümünde öbür uç tüm dersler ağında açılır */
  function crossHTML(t) {
    var xs = D.crossOf(t.id).filter(function (o) { return !state.preOnly || o.kind === 'pre'; }); if (!xs.length) return '';
    return '<div class="sec"><h3 class="xs">' + esc(TX.xH) + '</h3><p class="sub">' + esc(D.multi ? TX.xSubM : TX.xSub) + '</p>' + xs.map(function (o) {
      return '<button type="button" class="item" data-go="' + o.id + '"><span class="mk x" style="--c:var(--s-' + o.subject + ')"></span><span class="it"><span class="t"><b>' + esc(o.name) + '</b><span>' + esc(o.subjectShort + ' · ' + o.gradeLabel + ' · ' + TX.xKind[o.kind]) + '</span></span><span class="r">' + esc(o.reason) + '</span></span></button>';
    }).join('') + '</div>';
  }

  function shortHTML(t) { return '<div class="sec"><h3>' + esc(TX.short) + '</h3><p class="sum">' + esc(t.summary) + '</p></div>'; }
  function renderPanel(keep) {
    var t = D.byId[state.sel]; if (!t) return;
    var nb = D.neighbors(t.id), res = D.resources(t.id);
    // tüm dersler görünümünde öbür derslerin konuları kendi bölümünde durur
    if (D.multi) Object.keys(nb).forEach(function (k) { nb[k] = nb[k].filter(function (o) { return o.topic.subject === t.subject; }); });
    var h = '<header><div class="tags">' + (D.multi ? '<span class="tag tag-neutral" style="font-weight:700">' + esc(t.subjectShort) + '</span>' : '') + '<span class="tag tag-accent" style="font-weight:700">' + esc(t.gradeLabel) + '</span><span class="tag tag-accent-2" style="font-weight:700">' + esc(TX.themeTag(t.themeName)) + '</span><span class="tag tag-neutral">' + esc(t.code) + '</span>' +
      '<button type="button" class="btn btn-secondary btn-icon" data-close aria-label="' + esc(TX.closePanel) + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<h2 tabindex="-1" id="ptitle">' + esc(t.name) + '</h2><button type="button" class="btn btn-secondary expand" data-expand aria-expanded="false">' + esc(TX.expand) + '</button></header><div class="pbody">' +
      // telefonda alt pencerenin ilk açılan kısmında yazılı ızgarası görünsün diye önce o gelir
      (state.wide ? shortHTML(t) + yazilHTML(t) : yazilHTML(t) + shortHTML(t)) +
      '<div class="sec"><h3>' + esc(TX.official) + '</h3>' + res.map(function (r) {
        return r.verified
          ? '<a class="res" href="' + esc(r.url) + '" target="_blank" rel="noopener"><span class="ic">' + ICON_BOOK + '</span><span class="tx"><b>' + esc(r.title) + '</b><small>' + ICON_OK + esc(r.source) + ' · ' + esc(TX.verified) + '</small></span>' + ICON_EXT + '<span class="sr">' + esc(TX.newTab) + '</span></a>'
          : '<div class="res un"><span class="ic" style="background:none;color:inherit">' + ICON_CLOCK + '</span><span class="tx"><b>' + esc(r.title) + '</b><small>' + esc(r.note) + ' · ' + esc(TX.notOfficial) + '</small></span></div>';
      }).join('') + '<p class="fine">' + esc(TX.checked(D.checkedAt)) + '</p></div>';
    // ön koşul anahtarı etkilediği listelerin hemen üstünde durur
    h += '<label class="pre-only"><input type="checkbox" data-preonly' + (state.preOnly ? ' checked' : '') + '><span>' + esc(TX.preOnly) + '</span></label>';
    if (state.preOnly) { nb = { pre: nb.pre, base: nb.base, kol: [], next: [], rel: [] }; h += '<p class="fine">' + esc(TX.preOnlyNote) + '</p>'; }
    var before = nb.pre.length + nb.kol.length + nb.base.length > 0;
    if (before) {
      h += '<div class="sec">' + (nb.pre.length ? '<h3 class="pre">' + esc(TX.preH) + '</h3><p class="sub">' + esc(TX.preSub) + '</p>' + nb.pre.map(function (o) { return itemHTML(o, 'pre'); }).join('') : '') +
        (nb.base.length ? '<h3 style="margin-top:14px">' + esc(TX.baseH) + '</h3>' + nb.base.map(function (o) { return itemHTML(o, 'base'); }).join('') : '') +
        (nb.kol.length ? '<h3 class="kol" style="margin-top:14px">' + esc(TX.kolH) + '</h3><p class="sub">' + esc(TX.kolSub) + '</p>' + nb.kol.map(function (o) { return itemHTML(o, 'kol'); }).join('') : '') + '</div>';
    }
    var ch = chainOf(t.id);
    if (ch.length) {
      h += '<div class="sec"><h3>' + esc(TX.chainH) + '</h3><p class="sub">' + esc(TX.chainSub(ch.length)) + '</p><div class="chain">' +
        ch.map(function (o) { return '<button type="button" class="cn" data-go="' + o.id + '">' + tdot(o) + esc(o.name) + '</button>'; }).join('') + '</div></div>';
    }
    h += crossHTML(t);
    h += group(esc(TX.nextH), 'nx', '', nb.next, 'next');
    h += group(esc(TX.relH), '', '', nb.rel, 'rel');
    h += '<p class="fine">' + esc(TX.source(D.curriculum)) + '</p></div>';
    var p = $('#panel'); if (!keep) p.classList.remove('big'); p.innerHTML = '<button type="button" class="grab" aria-label="' + esc(TX.grab) + '"></button>' + h; syncExpand();
  }

  function syncExpand() {
    var p = $('#panel'), b = $('[data-expand]', p), big = p.classList.contains('big');
    if (b) { b.textContent = big ? TX.shrink : TX.expand; b.setAttribute('aria-expanded', String(big)); }
  }
  function togglePanel() { $('#panel').classList.toggle('big'); syncExpand(); }
  function announce(msg) { var l = $('#live'); l.textContent = ''; setTimeout(function () { l.textContent = msg; }, 30); }

  /* ───────── durum işlemleri ───────── */
  var hashBusy = false;
  function setHash(id) {
    var h = id ? '#konu=' + id : '';
    if (location.hash === h || (!id && !location.hash)) return;
    try { hashBusy = true; history.pushState(null, '', location.pathname + location.search + h); } catch (e) {} hashBusy = false;
  }

  function select(id, fromHash) {
    // öbür dersin konusu (dersler arası bağ): bağı bağlamında görmek için tüm dersler ağına geçilir
    if (!D.byId[id] && OWNER[id] && !fromHash) setSubject('all');
    if (!D.byId[id]) return;
    state.sel = id; state.query = ''; state.open = false; state.help = false; state.hi = 0; state.atlasSub = null;
    if (!state.wide) state.listOpen = false;
    if (scene) scene.select(id);
    if (phoneMQ.matches && !fromHash && navigator.vibrate) { try { navigator.vibrate(8); } catch (e) {} }
    renderPanel(); ui();
    var pb = $('.pbody'); if (pb) pb.scrollTop = 0;
    if (!fromHash) setHash(id);
    var h = $('#ptitle'); if (h) h.focus({ preventScroll: true });
    announce(TX.opened(D.byId[id].name));
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
    announce(TX.fullMap);
    return prev;
  }
  function applyFilterViews() {
    var f = state.filter;
    $$('#popular [data-go]').forEach(function (b) { b.hidden = f !== 'all' && String(D.byId[b.dataset.go].grade) !== f; });
    var pl = $('#popular > span'); if (pl) pl.hidden = !$$('#popular [data-go]').some(function (b) { return !b.hidden; });
    var lb = $('#listView .lbody'); if (!lb) return;
    lb.querySelectorAll('li').forEach(function (li) {
      var a = li.querySelector('a[href^="#konu="]'), t = a && D.byId[a.getAttribute('href').slice(6)];
      li.hidden = !!t && f !== 'all' && String(t.grade) !== f;
    });
    lb.querySelectorAll('h3').forEach(function (h) {
      var ul = h.nextElementSibling; if (!ul || ul.tagName !== 'UL') return;
      h.hidden = ul.hidden = !Array.prototype.some.call(ul.children, function (li) { return !li.hidden; });
    });
    var ln = $('#listScope');
    if (!ln) { ln = document.createElement('p'); ln.id = 'listScope'; ln.className = 'scopeline'; var lead = lb.querySelector('.lead'); if (lead) lead.after(ln); else lb.prepend(ln); }
    ln.hidden = f === 'all';
    ln.innerHTML = f === 'all' ? '' : TX.showing(esc(filterLabel())) + ' <button type="button" class="btn btn-secondary" data-f="all">' + esc(TX.showAll) + '</button>';
  }
  function setFilter(k) {
    if (state.sel) clearSel();
    state.filter = k; state.scope = 'filter';
    if (scene) scene.setFilter(k);
    applyFilterViews(); ui();
  }
  function setMode(m) {
    if (m === state.mode) return;
    state.mode = m; root.setAttribute('data-eba-mode', m);
    try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
    var tc = document.querySelector('meta[name=theme-color]'); if (tc) tc.content = PAL[m].theme;
    if (scene) scene.poke();
    ui();
  }

  function readHash() { var m = /^#konu=([\w]+)$/.exec(location.hash); if (!m || !OWNER[m[1]]) return null; if (!D.byId[m[1]]) setSubject(OWNER[m[1]], true); return D.byId[m[1]] ? m[1] : null; }
  function onHash() {
    if (hashBusy) return;
    var id = readHash();
    if (id) { if (id !== state.sel) select(id, true); }
    else if (state.sel) clearSel(true);
  }

  /* ───────── olaylar ───────── */
  function bindUI() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('.grab,[data-expand],[data-go],[data-random],[data-close],[data-f],[data-mode],[data-submit],a[href^="#konu="],.opt') : null;
      if (!t) return;
      if (t.classList.contains('grab') || t.dataset.expand !== undefined) { togglePanel(); return; }
      if (t.dataset.random) { var pool = D.topics.filter(function (x) { return x.id !== state.sel && (state.filter === 'all' || String(x.grade) === state.filter); }); select(pool[Math.floor(Math.random() * pool.length)].id); return; }
      if (t.dataset.go) { select(t.dataset.go); return; }
      if (t.dataset.close !== undefined) { clearSel(); return; }
      if (t.dataset.f) { setFilter(t.dataset.f); return; }
      if (t.dataset.mode) { setMode(t.dataset.mode); return; }
      if (t.dataset.submit !== undefined) { if (results[0]) select(results[0].id); else boxes[0].input.focus(); return; }
      if (t.tagName === 'A') { e.preventDefault(); select(t.getAttribute('href').slice(6)); return; }
    });
    boxes.forEach(function (b) {
      b.list.addEventListener('mousedown', function (e) { var sc = e.target.closest('[data-scope]'); if (sc) { e.preventDefault(); state.scope = 'all'; renderResults(); return; } var o = e.target.closest('.opt'); if (o) { e.preventDefault(); select(o.dataset.id); } });
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
    $('#subjBtn').addEventListener('click', function () { setSubjOpen(!state.subjOpen); });
    $('#subjMenu').addEventListener('click', function (e) { var b = e.target.closest('[data-subj]'); if (b) { setSubject(b.dataset.subj); $('#subjBtn').focus({ preventScroll: true }); } });
    $('#subjMenu').addEventListener('keydown', function (e) {
      var sis = $$('.si', this), i = sis.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); sis[Math.min(sis.length - 1, i + 1)].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sis[Math.max(0, i - 1)].focus(); }
    });
    document.addEventListener('pointerdown', function (e) { if (state.subjOpen && !e.target.closest('#subjMenu,#subjBtn')) { state.subjOpen = false; ui(); } });
    $('#langBtn').addEventListener('click', function () { setLang(this.dataset.lang); });
    $('#helpBtn').addEventListener('click', function () { state.help = !state.help; if (state.help) state.subjOpen = false; ui(); });
    $('#helpClose').addEventListener('click', function () { state.help = false; ui(); $('#helpBtn').focus(); });
    $('#listBtn').addEventListener('click', function () { state.listOpen = !state.listOpen; ui(); if (state.listOpen) { var f = $('#listView .lbody a'); if (f) f.focus({ preventScroll: true }); } });
    $('#listClose').addEventListener('click', function () { state.listOpen = false; ui(); $('#listBtn').focus(); });
    $('#zin').addEventListener('click', function () { if (scene) scene.zoom(0.72); });
    $('#zout').addEventListener('click', function () { if (scene) scene.zoom(1.38); });
    $('#zreset').addEventListener('click', function () { setFilter('all'); state.atlasSub = null; if (scene) { scene.setHiSub(null); scene.reset(); } renderAtlas(); });
    window.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); (state.sel ? boxes[1] : boxes[0]).input.focus(); }
      else if (e.key === 'Escape') {
        if (state.subjOpen) { state.subjOpen = false; ui(); $('#subjBtn').focus({ preventScroll: true }); }
        else if (state.help) { state.help = false; ui(); }
        else if (state.listOpen && !root.classList.contains('nogl')) { state.listOpen = false; ui(); }
        else if (state.sel) clearSel();
      }
      else if (scene && !e.altKey && !e.ctrlKey && !e.metaKey && (e.target === document.body || e.target === scene.renderer.domElement)) {
        // klavyeyle gezinme: oklar/WASD kaydırır, + − yakınlaştırır, 0 ya da Home sıfırlar
        var k = e.key.length === 1 ? e.key.toLowerCase() : e.key, st = e.shiftKey ? 220 : 90;
        var mv = { ArrowLeft: [st, 0], a: [st, 0], ArrowRight: [-st, 0], d: [-st, 0], ArrowUp: [0, st], w: [0, st], ArrowDown: [0, -st], s: [0, -st] }[k];
        if (mv) { e.preventDefault(); scene.pan(mv[0], mv[1]); }
        else if (k === '+' || k === '=') { e.preventDefault(); scene.zoom(0.8); }
        else if (k === '-' || k === '_') { e.preventDefault(); scene.zoom(1.25); }
        else if (k === '0' || k === 'Home') { e.preventDefault(); state.atlasSub = null; scene.setHiSub(null); scene.reset(); renderAtlas(); }
      }
    });
    var at = $('#atlas');
    if (at) {
      at.addEventListener('click', function (e) { var b = e.target.closest('[data-fly]'); if (b) flySubject(b.dataset.fly); });
      at.addEventListener('pointerover', function (e) { var b = e.target.closest('[data-fly]'); if (scene && e.pointerType === 'mouse') scene.setHiSub(b ? b.dataset.fly : state.atlasSub); });
      at.addEventListener('pointerleave', function () { if (scene) scene.setHiSub(state.atlasSub); });
      at.addEventListener('change', function (e) {
        if (!e.target.matches('[data-bridges]')) return;
        state.bridges = e.target.checked; if (scene) scene.setBridges(state.bridges);
        renderAtlas(); var c = $('#atlas [data-bridges]'); if (c) c.focus({ preventScroll: true });
        announce(state.bridges ? TX.bridgesOn : TX.bridgesOff);
      });
    }
    document.addEventListener('change', function (e) {
      var c = e.target; if (!c || !c.matches || !c.matches('[data-preonly]')) return;
      state.preOnly = c.checked; var pb = $('.pbody'), st = pb ? pb.scrollTop : 0;
      renderPanel(true); if (scene) scene.reapply();
      var nb = $('[data-preonly]'); if (nb) nb.focus({ preventScroll: true }); var pb2 = $('.pbody'); if (pb2) pb2.scrollTop = st;
      announce(state.preOnly ? TX.preOn : TX.preOff);
    });
    var zf = $('#zflat');
    if (zf) zf.addEventListener('click', function () { state.flat = !state.flat; zf.setAttribute('aria-pressed', String(state.flat)); if (scene) scene.poke(); announce(state.flat ? TX.flatOn : TX.flatOff); });
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    if ('ResizeObserver' in window) new ResizeObserver(function () {
      var w = app.clientWidth; state.wide = w >= 900; state.roomy = w >= 1280;
      $('#hintline').hidden = !(state.roomy && !state.sel && scene && !D.multi);
      if (scene) scene.resize();
    }).observe(app);
  }

  /* ───────── 3B sahne ───────── */
  /* Çizim bütçesi: tüm nöron gövdeleri tek InstancedMesh, parıltılar/halkalar/ışık atımları üç billboard topluluğu,
     kenarlar ve dendritler birer LineSegments. Tıklama ekran düzleminde hesaplanır; görünmez çarpışma küresi yok. */
  function Scene3D(T, stage, labelLayer, tip) {
    this.T = T; this.stage = stage; this.labelLayer = labelLayer; this.tip = tip;
    this.selI = -1; this.hover = -1; this.chipHover = -1; this.off = [0, 0]; this.lastInteract = 0; this.ptrs = new Map(); this.alive = true; this.hot = 0;
    this.nav = false; this.hiSub = null; this.bridges = false;
    this.build();
  }
  var S3 = Scene3D.prototype;

  /* ders kümelerinin merkezleri: tek derste orijin; tüm derslerde aralarındaki bağ sayısına göre kurulan küçük bir kuvvet düzeni,
     böylece çok bağlı dersler (matematik–fizik–kimya) yan yana, az bağlı olanlar kenarda durur */
  function clusterCenters(info) {
    var n = info.length; if (n < 2) return [{ x: 0, y: 0, z: 0 }];
    var idx = {}, W = info.map(function () { return info.map(function () { return 0; }); }), mx = 1;
    info.forEach(function (c, i) { idx[c.sid] = i; });
    D.links.forEach(function (l) { var a = idx[D.byId[l.from].subject], b = idx[D.byId[l.to].subject]; if (a !== b) { W[a][b]++; W[b][a]++; mx = Math.max(mx, W[a][b]); } });
    var P = info.map(function (c, i) { var a = (i / n) * Math.PI * 2; return { x: 1600 * Math.cos(a), y: (i % 2 ? 1 : -1) * 260, z: 1600 * Math.sin(a), vx: 0, vy: 0, vz: 0, R: c.rr + 190 }; });
    for (var it = 0; it < 600; it++) {
      for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
        var a = P[i], b = P[j], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01, min = a.R + b.R, f = -3e5 / (d * d);
        if (d < min) f -= (min - d) * 0.35;
        else f += (W[i][j] / mx) * (d - min) * 0.012;
        dx /= d; dy /= d; dz /= d;
        a.vx += dx * f; a.vy += dy * f; a.vz += dz * f; b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f;
      }
      P.forEach(function (p) { p.vx -= p.x * 0.003; p.vy -= p.y * 0.012; p.vz -= p.z * 0.003; p.vx *= 0.82; p.vy *= 0.82; p.vz *= 0.82; p.x += p.vx; p.y += p.vy; p.z += p.vz; });
    }
    return P;
  }

  /* Konu düzeni ağır bir hesap (tüm derslerde ~900 konu × 260 adım): parça parça yürütülür, böylece three.js inerken
     arka planda biter ve dokunuşlar donmaz. Konumlar ders kümesine göre saklanır; ders değiştirip dönünce yeniden hesaplanmaz. */
  var LAYOUT_IT = 260, LAYOUTS = {};
  function layoutJob() {
    var s = 7, key = D.sel.join(','), it = 0;
    var rnd = function () { s = (s + 0x6D2B79F5) | 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    var ys = [-70, 60, -110, 90, -40, 120, -90, 30], A = {}, anchors = [];
    var info = D.sel.map(function (sid) {
      var ths = D.themes.filter(function (t) { return t.subject === sid; }), ring = ths.filter(function (t) { return t.grade !== 'O'; });
      return { sid: sid, ths: ths, ring: ring, rr: Math.max(400, ring.length * 50) };
    });
    var CC = clusterCenters(info);
    info.forEach(function (c, si) {
      var cx = CC[si].x, cy = CC[si].y, cz = CC[si].z;
      c.ths.filter(function (t) { return t.grade === 'O'; }).forEach(function (t) { A[t.id] = { x: cx, y: cy, z: cz, mid: true }; });
      c.ring.forEach(function (t, i) { var a2 = (i / c.ring.length) * Math.PI * 2; A[t.id] = { x: cx + c.rr * Math.cos(a2), y: cy + ys[i % 8] * 1.6, z: cz + c.rr * Math.sin(a2) }; });
      anchors.push({ id: c.sid, x: cx, y: cy, z: cz, r: c.rr });
    });
    var N = D.topics.map(function (t) { var a = A[t.theme]; return { t: t, x: a.x + (rnd() - 0.5) * 140, y: a.y + (rnd() - 0.5) * 140, z: a.z + (rnd() - 0.5) * 140, vx: 0, vy: 0, vz: 0, deg: 0 }; });
    var ix = {}; N.forEach(function (n, i) { ix[n.t.id] = i; });
    var E = D.links.map(function (l) { return [ix[l.from], ix[l.to], l.type, D.byId[l.from].subject !== D.byId[l.to].subject]; });
    E.forEach(function (e) { N[e[0]].deg++; N[e[1]].deg++; });
    var saved = LAYOUTS[key];
    if (saved && saved.length === N.length * 3) { N.forEach(function (n, i) { n.x = saved[i * 3]; n.y = saved[i * 3 + 1]; n.z = saved[i * 3 + 2]; }); it = LAYOUT_IT; }
    // itme yalnızca aynı dersin konuları arasında (kümeler zaten uzak): n² yerine ders başına n²
    var G = {}; N.forEach(function (n, i) { (G[n.t.subject] = G[n.t.subject] || []).push(i); });
    G = Object.keys(G).map(function (k) { return G[k]; });
    var EI = E.filter(function (e) { return !e[3]; });
    function iterate() {
      var k = 1 - it / 300;
      for (var g = 0; g < G.length; g++) {
        var grp = G[g];
        for (var i = 0; i < grp.length; i++) for (var j = i + 1; j < grp.length; j++) {
          var a = N[grp[i]], b = N[grp[j]], dx = a.x - b.x; if (dx > 300 || dx < -300) continue; var dy = a.y - b.y, dz = a.z - b.z, d2 = dx * dx + dy * dy + dz * dz + 1;
          if (d2 > 90000) continue;
          var d = Math.sqrt(d2), f = 1600 / d2 / d; dx *= f; dy *= f; dz *= f;
          a.vx += dx; a.vy += dy; a.vz += dz; b.vx -= dx; b.vy -= dy; b.vz -= dz;
        }
      }
      EI.forEach(function (e) { var a = N[e[0]], b = N[e[1]], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01, f = ((d - 90) * 0.012) / d; a.vx += dx * f; a.vy += dy * f; a.vz += dz * f; b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f; });
      N.forEach(function (n) { var a = A[n.t.theme], c = a.mid ? 0.05 : 0.032; n.vx += (a.x - n.x) * c; n.vy += (a.y - n.y) * c; n.vz += (a.z - n.z) * c; n.vx *= 0.8; n.vy *= 0.8; n.vz *= 0.8; n.x += n.vx * k; n.y += n.vy * k; n.z += n.vz * k; });
      it++;
    }
    return {
      key: key, anchors: anchors, result: { N: N, E: E, ix: ix },
      get done() { return it >= LAYOUT_IT; },
      // ms kadar çalışır; bitince konumları saklar ve true döner
      step: function (ms) {
        var t0 = performance.now();
        while (it < LAYOUT_IT && performance.now() - t0 < ms) iterate();
        if (it >= LAYOUT_IT && !LAYOUTS[key]) { var f = new Float32Array(N.length * 3); N.forEach(function (n, i) { f[i * 3] = n.x; f[i * 3 + 1] = n.y; f[i * 3 + 2] = n.z; }); LAYOUTS[key] = f; }
        return it >= LAYOUT_IT;
      }
    };
  }
  // işi kısa dilimlerle tarayıcıya nefes aldırarak bitirir; MessageChannel arka plan sekmesinde setTimeout gibi saniyeye kısılmaz
  var yieldQ = null;
  function nextTask(fn) {
    if (!window.MessageChannel) return setTimeout(fn, 0);
    if (!yieldQ) { var ch = new MessageChannel(); yieldQ = { q: [], port: ch.port2 }; ch.port1.onmessage = function () { var f = yieldQ.q.shift(); if (f) f(); }; }
    yieldQ.q.push(fn); yieldQ.port.postMessage(0);
  }
  function runLayout(job) {
    return new Promise(function (res) {
      (function go() { if (job.step(12)) res(job); else nextTask(go); })();
    });
  }

  S3.layout = function () {
    var job = layoutJob(); job.step(Infinity);
    this.subAnchors = job.anchors;
    return job.result;
  };

  S3.tex = function (size, draw) {
    var c = document.createElement('canvas'); c.width = c.height = size;
    draw(c.getContext('2d'), size);
    var t = new this.T.CanvasTexture(c); t.colorSpace = this.T.SRGBColorSpace; return t;
  };
  /* kamera yüzlü kareler topluluğu: her kare = konum, boyut, renk, saydamlık; tek çizim çağrısı */
  S3.mkBatch = function (cap, map, order) {
    var T = this.T, g = new T.InstancedBufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], 3));
    g.setAttribute('uv', new T.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2)); g.setIndex([0, 1, 2, 0, 2, 3]);
    var mk = function (n, sz) { var a = new T.InstancedBufferAttribute(new Float32Array(n * sz), sz); a.setUsage(T.DynamicDrawUsage); return a; };
    var off = mk(cap, 3), col = mk(cap, 4), siz = mk(cap, 1);
    g.setAttribute('aOff', off); g.setAttribute('aCol', col); g.setAttribute('aSize', siz); g.instanceCount = 0;
    var m = new T.ShaderMaterial({
      uniforms: { map: { value: map }, uFog: this.fogU },
      vertexShader: 'attribute vec3 aOff; attribute vec4 aCol; attribute float aSize; uniform float uFog; varying vec2 vUv; varying vec4 vCol;\nvoid main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(aOff, 1.0); float fd = uFog * mv.z; vCol = vec4(aCol.rgb, aCol.a * exp(-fd * fd)); mv.xy += position.xy * aSize; gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform sampler2D map; varying vec2 vUv; varying vec4 vCol;\nvoid main() { float a = vCol.a * texture2D(map, vUv).a; if (a < 0.003) discard; gl_FragColor = vec4(vCol.rgb, a);\n#include <colorspace_fragment>\n}',
      transparent: true, depthWrite: false
    });
    var mesh = new T.Mesh(g, m); mesh.frustumCulled = false; mesh.renderOrder = order; this.scene.add(mesh);
    return { mesh: mesh, g: g, m: m, off: off, col: col, siz: siz, cap: cap, n: 0,
      add: function (p, size, c, a) { if (this.n >= this.cap || a < 0.003) return; var i = this.n++, o = this.off.array, q = this.col.array; o[i * 3] = p.x; o[i * 3 + 1] = p.y; o[i * 3 + 2] = p.z; q[i * 4] = c.r; q[i * 4 + 1] = c.g; q[i * 4 + 2] = c.b; q[i * 4 + 3] = a; this.siz.array[i] = size; },
      commit: function () { this.g.instanceCount = this.n; this.off.needsUpdate = this.col.needsUpdate = this.siz.needsUpdate = true; this.n = 0; } };
  };
  S3.poke = function () { this.hot = performance.now() + 1800; };
  S3.colOf = function (t) { return D.multi ? this.P.SC[t.subject] : this.P.GC[t.grade]; };

  S3.build = function () {
    var self = this, T = this.T, L = this.layout(); this.L = L;
    this.P = PAL[state.mode]; GC = this.P.GC; EC = this.P.EC;
    var N = L.N, E = L.E, seed = 23;
    var rnd = function () { seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    this.rnd = rnd;
    var W = this.stage.clientWidth || 1200, H = this.stage.clientHeight || 800; this.W = W; this.H = H;

    var R = new T.WebGLRenderer({ antialias: !LITE, alpha: true, powerPreference: 'high-performance' });
    this.prMax = Math.min(LITE || D.multi ? 1.5 : 1.75, window.devicePixelRatio || 1);
    R.setPixelRatio(this.prMax); R.setSize(W, H); R.setClearColor(0x000000, 0);
    R.domElement.style.cursor = 'grab'; R.domElement.tabIndex = 0;
    R.domElement.setAttribute('role', 'img'); R.domElement.setAttribute('aria-label', TX.canvas);
    this.stage.appendChild(R.domElement); this.renderer = R;
    R.domElement.addEventListener('webglcontextlost', function (e) { e.preventDefault(); if (!self.alive) return; self.alive = false; failGL('Üç boyutlu görünüm durdu (grafik bağlamı kaybedildi).'); });

    var S = new T.Scene(); S.fog = new T.FogExp2(0x17140f, 0.00042); this.scene = S; this.fogU = { value: S.fog.density };
    var C = new T.PerspectiveCamera(45, W / H, 1, 30000); this.camera = C; S.add(C);
    this.hemi = new T.HemisphereLight(0xfff1dc, 0x2a2119, 1.3); S.add(this.hemi);
    var dl = new T.DirectionalLight(0xffffff, 1.7); dl.position.set(0.4, 0.8, 1); C.add(dl);
    this.ray = new T.Raycaster(); this.v = new T.Vector3(); this.tv = new T.Vector3(); this.tv2 = new T.Vector3(); this.tv3 = new T.Vector3(); this.m4 = new T.Matrix4(); this.sv = new T.Vector3();

    this.glowTex = this.tex(128, function (g, s) { var gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.16, 'rgba(255,255,255,.6)'); gr.addColorStop(0.45, 'rgba(255,255,255,.14)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, s, s); });
    var ringTex = this.tex(128, function (g, s) { g.strokeStyle = '#fff'; g.lineWidth = s * 0.075; g.beginPath(); g.arc(s / 2, s / 2, s * 0.36, 0, 7); g.stroke(); });

    this.nodes = N.map(function (n, i) {
      var r = 4 + Math.sqrt(n.deg) * 2.1;
      return { i: i, t: n.t, pos: new T.Vector3(n.x, n.y, n.z), r: r, col: new T.Color(self.colOf(n.t)), isO: n.t.grade === 'O', scale: 1, flash: 0,
        q: new T.Quaternion().setFromEuler(new T.Euler(rnd() * 6.3, rnd() * 6.3, rnd() * 6.3)), op: 1, em: 0, ga: 0 };
    });
    this.hasX = new Uint8Array(N.length); E.forEach(function (e) { if (e[3]) self.hasX[e[0]] = self.hasX[e[1]] = 1; });
    var home = new T.Vector3(); this.nodes.forEach(function (n) { home.add(n.pos); }); home.divideScalar(this.nodes.length || 1); this.home = home;
    // tüm derslerde ağın ortası kutu ortasıdır: yoğun kümeler ağırlık merkezini çekince uzak ders (İngilizce) kenardan taşıyordu
    if (D.multi) { var bb = new T.Box3(); this.nodes.forEach(function (n) { bb.expandByPoint(n.pos); }); bb.getCenter(home); }
    var rb = 0; this.nodes.forEach(function (n) { rb = Math.max(rb, n.pos.distanceTo(home) + n.r); }); this.rb = rb;

    // gövdeler: tek geometri, örnek başına konum/dönüş/boyut, renk, saydamlık ve ışıma
    this.rimU = { value: 0.6 };
    var geo = new T.IcosahedronGeometry(1, LITE ? 2 : 3), p = geo.attributes.position;
    for (var k = 0; k < p.count; k++) { var x = p.getX(k), y = p.getY(k), z = p.getZ(k), sc = 1 + 0.14 * Math.sin(x * 3.1 + 1.7) * Math.cos(y * 2.7 + 2.2) + 0.07 * Math.sin(z * 5 + 1.7); p.setXYZ(k, x * sc, y * sc * 0.9, z * sc); }
    geo.computeVertexNormals();
    var fx = new T.InstancedBufferAttribute(new Float32Array(N.length * 2), 2); fx.setUsage(T.DynamicDrawUsage); geo.setAttribute('aFx', fx); this.fx = fx;
    var mat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.36, metalness: 0, transparent: true });
    mat.onBeforeCompile = function (sh) {
      sh.uniforms.uRim = self.rimU;
      sh.vertexShader = sh.vertexShader.replace('void main() {', 'attribute vec2 aFx;\nvarying vec2 vFx;\nvoid main() {\n  vFx = aFx;');
      sh.fragmentShader = sh.fragmentShader.replace('void main() {', 'uniform float uRim;\nvarying vec2 vFx;\nvoid main() {')
        .replace('#include <color_fragment>', '#include <color_fragment>\n  diffuseColor.a *= vFx.x;')
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n  totalEmissiveRadiance = diffuseColor.rgb * vFx.y;\n  float rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);\n  totalEmissiveRadiance += mix(diffuseColor.rgb, vec3(1.0), 0.6) * rimF * uRim;');
    };
    mat.customProgramCacheKey = function () { return 'soma-inst'; };
    var im = new T.InstancedMesh(geo, mat, N.length); im.instanceMatrix.setUsage(T.DynamicDrawUsage); im.frustumCulled = false; im.renderOrder = 1;
    this.nodes.forEach(function (n, i) { im.setColorAt(i, n.col); }); im.instanceColor.setUsage(T.DynamicDrawUsage);
    S.add(im); this.soma = im; this.ord = this.nodes.map(function (n, i) { return i; }); this.dd = new Float32Array(N.length);

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
      var start = dPos.length / 3, nb = (LITE || D.multi ? 4 : 5) + Math.floor(rnd() * (D.multi ? 3 : 4)), step = 3 + nd.r * 0.2;
      for (var b = 0; b < nb; b++) { var d = new T.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize(); grow(nd.pos.clone().addScaledVector(d, nd.r * 0.85), d, 0, step, nd.i, { pos: dPos, m: dMeta }); }
      dRange.push([start, dPos.length / 3 - start]);
    });

    // kenarlar; dersler arası köprüler kümelerin üstünden kavis çizer
    var ePos = [], eMeta = [], eRange = [], up = new T.Vector3(0, 1, 0); this.curves = []; this.elen = []; this.crossK = [];
    E.forEach(function (e, ki) {
      var a = e[0], b = e[1], A = self.nodes[a].pos, B = self.nodes[b].pos, d = B.clone().sub(A), len = d.length(), c1, c2;
      if (e[3]) {
        var lift = len * (0.16 + rnd() * 0.1), side = new T.Vector3(rnd() - 0.5, 0, rnd() - 0.5).multiplyScalar(len * 0.12);
        c1 = A.clone().addScaledVector(d, 0.3).addScaledVector(up, lift).add(side); c2 = A.clone().addScaledVector(d, 0.7).addScaledVector(up, lift).add(side);
        self.crossK.push(ki);
      } else {
        var p1 = new T.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).cross(d).normalize(), p2 = d.clone().cross(p1).normalize();
        c1 = A.clone().addScaledVector(d, 0.33).addScaledVector(p1, len * (0.08 + rnd() * 0.12)).addScaledVector(p2, len * (rnd() - 0.5) * 0.12);
        c2 = A.clone().addScaledVector(d, 0.66).addScaledVector(p1, len * (0.04 + rnd() * 0.1) * (rnd() < 0.5 ? -1 : 1)).addScaledVector(p2, len * (rnd() - 0.5) * 0.12);
      }
      var cv = new T.CubicBezierCurve3(A.clone(), c1, c2, B.clone()); self.curves.push(cv); self.elen.push(cv.getLength());
      var seg = e[3] ? 32 : 24, pts = cv.getPoints(seg), start = ePos.length / 3;
      for (var s = 0; s < seg; s++) {
        var q0 = pts[s], q1 = pts[s + 1]; ePos.push(q0.x, q0.y, q0.z, q1.x, q1.y, q1.z);
        eMeta.push(a, b, s / seg, a, b, (s + 1) / seg);
      }
      eRange.push([start, seg * 2]);
    });

    var mkLines = function (pos) {
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
      var c = new T.Float32BufferAttribute(new Float32Array(pos.length), 3); g.setAttribute('color', c);
      var ls = new T.LineSegments(g, new T.LineBasicMaterial({ vertexColors: true, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
      S.add(ls); return { ls: ls, c: c, base: new Float32Array(pos.length) };
    };
    this.dend = mkLines(dPos); this.dRange = dRange; this.dMeta = dMeta;
    this.edge = mkLines(ePos); this.eRange = eRange; this.eMeta = eMeta;

    var dp = [], nd = LITE ? 350 : D.multi ? 1500 : 900, dr = Math.max(1150, rb * 1.05);
    for (var q = 0; q < nd; q++) { var v = new T.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize().multiplyScalar(dr * (0.2 + rnd() * 0.8)); dp.push(home.x + v.x, home.y + v.y * 0.7, home.z + v.z); }
    var dg = new T.BufferGeometry(); dg.setAttribute('position', new T.Float32BufferAttribute(dp, 3));
    this.dust = new T.Points(dg, new T.PointsMaterial({ size: 5, map: this.glowTex, color: 0x8a7a63, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false })); S.add(this.dust);

    this.ringN = this.nodes.filter(function (n) { return n.isO; });
    this.glowB = this.mkBatch(N.length, this.glowTex, 3);
    this.ringB = this.mkBatch(Math.max(1, this.ringN.length), ringTex, 2);

    var intro = !mqReduce.matches; this.intro = intro; this.tStart = null; this.waves = [];
    this.nfT = new Float32Array(N.length).fill(intro ? 0 : 1); this.nfC = new Float32Array(N.length).fill(intro ? 0 : 1);
    this.efT = new Float32Array(E.length).fill(intro ? 0 : 1); this.efC = new Float32Array(E.length).fill(intro ? 0 : 1);
    if (intro) {
      var mxl = 1; this.nodes.forEach(function (n) { mxl = Math.max(mxl, n.pos.distanceTo(home)); });
      this.delay = this.nodes.map(function (n) { return 0.25 + 1.35 * Math.pow(n.pos.distanceTo(home) / mxl, 0.8) + rnd() * 0.18; });
      this.started = new Uint8Array(N.length);
    }
    this.activeEdges = E.map(function (e, k) { return k; });

    this.out = N.map(function () { return []; });
    E.forEach(function (e, k) { self.out[e[0]].push({ k: k, rev: false }); if (e[2] === 'ilg') self.out[e[1]].push({ k: k, rev: true }); });
    this.idleVis = 0; this.pulses = []; this.hlp = []; this.cp = [];
    var np = LITE ? 16 : 40, nbp = this.crossK.length ? (LITE ? 10 : 26) : 0;
    for (var pq = 0; pq < np + nbp; pq++) { var pu = { bridge: pq >= np }; this.respawn(pu, pu.bridge ? this.crossK[Math.floor(rnd() * this.crossK.length)] : Math.floor(rnd() * E.length), false); pu.t = rnd(); this.pulses.push(pu); }
    this.pulseB = this.mkBatch((np + nbp) * 3 + 900, this.glowTex, 4);

    this.themeLabels = D.themes.map(function (t) {
      var ns = self.nodes.filter(function (n) { return n.t.theme === t.id; }), c = new T.Vector3(), maxY = -1e9;
      ns.forEach(function (n) { c.add(n.pos); maxY = Math.max(maxY, n.pos.y); }); c.divideScalar(ns.length || 1);
      var el = document.createElement('div');
      el.style.cssText = 'position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center;gap:2px;padding:3px 12px 4px;border-radius:14px;white-space:nowrap;pointer-events:none;will-change:transform;opacity:0;text-shadow:0 2px 12px rgba(17,15,12,.95)';
      var a = document.createElement('span'); a.style.cssText = 'font-family:var(--font-heading);font-size:calc(20px * var(--ls,1))'; a.textContent = t.name;
      var b = document.createElement('span'); b.style.cssText = 'font-family:var(--font-body);font-size:calc(13px * var(--ls,1));font-weight:700;letter-spacing:.1em'; b.textContent = (D.multi ? D.subjectShort(t.subject).toLocaleUpperCase(TX.locale) + ' · ' : '') + D.gradeName(t.grade).toLocaleUpperCase(TX.locale);
      el.appendChild(a); el.appendChild(b); self.labelLayer.appendChild(el);
      return { el: el, a: a, b: b, pos: new T.Vector3(c.x, maxY + 34, c.z), grade: String(t.grade), id: t.id, sid: t.subject };
    });
    if (D.multi) this.subAnchors.forEach(function (sa) {
      var ns = self.nodes.filter(function (n) { return n.t.subject === sa.id; }), c = new T.Vector3(), maxY = -1e9;
      ns.forEach(function (n) { c.add(n.pos); maxY = Math.max(maxY, n.pos.y); }); c.divideScalar(ns.length || 1); sa.c = c;
      var el = document.createElement('div');
      el.style.cssText = 'position:absolute;left:0;top:0;display:flex;align-items:center;gap:10px;padding:6px 18px 8px;border-radius:18px;white-space:nowrap;pointer-events:none;will-change:transform,opacity;font-family:var(--font-heading);font-size:calc(34px * var(--bls,1));line-height:1';
      var dot = document.createElement('i'); dot.style.cssText = 'flex:none;width:.42em;height:.42em;border-radius:50%';
      var a = document.createElement('span'); a.textContent = D.subjectShort(sa.id); el.appendChild(dot); el.appendChild(a); self.labelLayer.appendChild(el);
      self.themeLabels.push({ el: el, a: a, b: null, dot: dot, pos: new T.Vector3(c.x, maxY + 150, c.z), grade: 'S', id: 'subj:' + sa.id, big: true, sid: sa.id });
    });
    // en çok bağlı ders çiftleri: köprü demetinin üstünde "Matematik ↔ Fizik · 38 köprü"
    if (D.multi) {
      var pc = {}, sc = {}; this.subAnchors.forEach(function (sa) { sc[sa.id] = sa.c; });
      E.forEach(function (e) { if (!e[3]) return; var a = N[e[0]].t.subject, b = N[e[1]].t.subject, k = a < b ? a + '|' + b : b + '|' + a; pc[k] = (pc[k] || 0) + 1; });
      Object.keys(pc).filter(function (k) { return pc[k] >= 6; }).sort(function (a, b) { return pc[b] - pc[a]; }).slice(0, 10).forEach(function (k) {
        var ab = k.split('|'), A2 = sc[ab[0]], B2 = sc[ab[1]], mid = A2.clone().add(B2).multiplyScalar(0.5);
        mid.y = Math.max(A2.y, B2.y) + A2.distanceTo(B2) * 0.2;
        var el = document.createElement('div');
        el.style.cssText = 'position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;padding:3px 11px 4px;border-radius:999px;white-space:nowrap;pointer-events:none;will-change:transform,opacity;opacity:0;font-family:var(--font-body);font-weight:700;font-size:calc(13px * var(--ls,1));letter-spacing:.03em';
        var d1 = document.createElement('i'), d2 = document.createElement('i'), a = document.createElement('span');
        d1.style.cssText = d2.style.cssText = 'flex:none;width:8px;height:8px;border-radius:50%';
        el.appendChild(d1); el.appendChild(d2); el.appendChild(a); self.labelLayer.appendChild(el);
        self.themeLabels.push({ el: el, a: a, b: null, d1: d1, d2: d2, pos: mid, grade: 'S', id: 'pair:' + k, pair: true, sids: ab, n: pc[k] });
      });
      this.pairText();
    }
    // gizlerken etiketin kendi düzeni (flex) saklanır; açınca o geri yazılır, yoksa ad ile sınıf yan yana yapışır
    this.themeLabels.forEach(function (Lb) { Lb.disp = Lb.el.style.display; Lb.el.style.display = Lb.ds = 'none'; });
    this.tipName = $('.n', this.tip); this.tipSub = $('.s', this.tip); this.tipAct = $('.a', this.tip);
    this.applyTheme(state.mode);

    MAX_D = D.multi ? 9000 : 2600;
    this.idleDist = this.fitDist(); S.fog.density = this.fogU.value = 0.00042 * Math.min(1, 1600 / this.idleDist);
    this.ctl = { theta: 0.95, phi: D.multi ? 0.86 : 1.18, dist: this.idleDist * 1.6, target: home.clone(), gTarget: home.clone(), gDist: this.idleDist, vt: 0, vp: 0 };
    this.bindPointer(R.domElement);

    this.lt = performance.now(); this.poke(); this.fq = 1 / 60; this.fn = 0;
    var loop = function (now) {
      if (!self.alive) return;
      self.raf = requestAnimationFrame(loop);
      var dt = Math.min(0.05, (now - self.lt) / 1000); self.lt = now;
      if (mqReduce.matches && !self.dragging && now > self.hot) return;
      if (document.hidden) return;
      try { if (self.appliedMode !== state.mode) self.applyTheme(state.mode); self.tick(dt, now / 1000); R.render(S, C); self.updateLabels(now); self.adapt(dt); }
      catch (e) { if (!self.errLogged) { self.errLogged = true; console.error('frame', e); } }
    };
    // gölgelendiriciler destekleyen tarayıcıda arka planda derlenir; ilk kareler ana iş parçacığını kilitlemez
    var go = function () { if (!self.alive) return; self.lt = performance.now(); self.poke(); self.raf = requestAnimationFrame(loop); };
    if (R.compileAsync) R.compileAsync(S, C).then(go, go); else go();
  };

  /* yavaş cihazda çözünürlüğü kademeli düşür (yalnızca aşağı; dalgalanma olmasın) */
  S3.adapt = function (dt) {
    this.fq += (dt - this.fq) * 0.05;
    if (++this.fn % 90 || this.intro || this.fn < 180) return;
    var R = this.renderer, pr = R.getPixelRatio();
    if (this.fq > 1 / 40 && pr > 1) { R.setPixelRatio(Math.max(1, pr - 0.25)); R.setSize(this.W, this.H); }
  };

  S3.dispose = function () {
    this.alive = false; cancelAnimationFrame(this.raf);
    try { var R = this.renderer; R.dispose(); if (R.forceContextLoss) R.forceContextLoss(); R.domElement.remove(); } catch (e) {}
    this.labelLayer.innerHTML = ''; if (this.tip) this.tip.style.opacity = '0';
  };

  /* ekranın arayüzle kaplı sol kısmı (açılış kartı ya da ders atlası); kadraj bunu hesaba katar */
  S3.leftInset = function () {
    if (!state.wide) return 0;
    var el = document.querySelector(D.multi ? '#atlas' : '.hero'), r = el && el.offsetParent !== null ? el.getBoundingClientRect() : null;
    return r ? r.right + 8 : 0;
  };
  S3.fitDist = function () {
    if (!D.multi) return clamp(this.rb * 2.25, 500, 1600) * (state.wide ? 1.2 : 1);
    var vf = (45 * Math.PI) / 180, wf = Math.max(200, this.W - this.leftInset()), asp = wf / this.H, hf = 2 * Math.atan(Math.tan(vf / 2) * asp), f = Math.min(vf, hf);
    // dar (dikey) ekranda tüm ağ ancak daha uzaktan sığar; uzaklaşma sınırı da ona göre büyür
    // dikey ekranda genişlik sınırlar: kenardaki ders kesilmesin diye tam sığdırılır; yatayda biraz yakından bakılır
    var raw = (this.rb / Math.sin(f / 2)) * (asp < 1 ? 1 : 0.94); MAX_D = Math.max(9000, raw * 1.25);
    return clamp(raw, 420, MAX_D * 0.9);
  };
  S3.resize = function () {
    var w = this.stage.clientWidth, h = this.stage.clientHeight; if (!w || !h) return;
    this.W = w; this.H = h; this.labelLayer.style.setProperty('--ls', w >= 1700 ? '1.35' : '1'); this.labelLayer.style.setProperty('--bls', w >= 1700 ? '1.35' : w < 600 ? '0.62' : '1'); this.renderer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.hb = null; this.ob = null; this.themeLabels.forEach(function (Lb) { Lb.w = Lb.h = 0; });
    this.refit(); this.poke();
  };
  S3.refit = function () {
    this.ab = null; this.ob = null; this.idleDist = this.fitDist();
    this.scene.fog.density = this.fogU.value = 0.00042 * Math.min(1, 1600 / this.idleDist);
    if (this.ctl && !this.nav && this.selI < 0) this.ctl.gDist = this.idleDist;
    this.poke();
  };

  S3.applyTheme = function (mode) {
    var T = this.T, P = (this.P = PAL[mode]), blend = P.add ? T.AdditiveBlending : T.NormalBlending, self = this;
    this.appliedMode = mode; GC = P.GC; EC = P.EC; this.poke();
    var bc = new T.Color(P.bg); this.bgc = P.add ? [0, 0, 0] : [bc.r, bc.g, bc.b];
    var setB = function (m) { m.blending = blend; m.needsUpdate = true; };
    this.scene.fog.color.setHex(P.fog); this.rimU.value = P.rim;
    this.hemi.color.setHex(P.hemi[0]); this.hemi.groundColor.setHex(P.hemi[1]); this.hemi.intensity = P.hemi[2];
    this.nodes.forEach(function (n) { n.col.set(self.colOf(n.t)); });
    setB(this.dend.ls.material); setB(this.edge.ls.material); setB(this.glowB.m); setB(this.pulseB.m);
    this.dust.material.color.setHex(P.dust[0]); this.dust.material.opacity = P.dust[1]; setB(this.dust.material);
    var g = this.bgc, N = this.nodes, tc = new T.Color(), E = this.L.E;
    var mix = function (arr, j, c, w) { arr[j] = g[0] + (c.r - g[0]) * w; arr[j + 1] = g[1] + (c.g - g[1]) * w; arr[j + 2] = g[2] + (c.b - g[2]) * w; };
    var db = this.dend.base, dm = this.dMeta;
    // açık zeminde yüzlerce kenar üst üste koyulaşıp gri bir yumağa döner: tüm derslerde dendritler ve ders içi çizgiler
    // geri çekilir, köprüler neredeyse ders renginin tamamıyla çizilir
    var lite = D.multi && !P.add, dk = P.dendK * (lite ? 0.6 : 1);
    for (var v = 0; v < dm.length / 2; v++) mix(db, v * 3, N[dm[v * 2]].col, dm[v * 2 + 1] * dk);
    var eb = this.edge.base, em = this.eMeta, lk = P.lineK * (lite ? 0.32 : 1), xcap = P.add ? 0.85 : lite ? 0.95 : 0.74;
    for (var k = 0, w = 0; k < this.eRange.length; k++) {
      var xk = E[k][3], end = this.eRange[k][0] + this.eRange[k][1];
      for (w = this.eRange[k][0]; w < end; w++) { var u = em[w * 3 + 2]; tc.copy(N[em[w * 3]].col).lerp(N[em[w * 3 + 1]].col, u); mix(eb, w * 3, tc, xk ? Math.min(xcap, (0.5 + 0.25 * Math.sin(u * Math.PI)) * P.lineK) : (0.3 + 0.22 * Math.abs(u - 0.5) * 2) * lk); }
    }
    this.paint(this.dend, this.nfC, this.dRange); this.paint(this.edge, this.efC, this.eRange);
    this.themeLabels.forEach(function (Lb) {
      if (Lb.big) { Lb.el.style.textShadow = '0 2px 18px ' + P.shadow; Lb.a.style.color = P.ink; Lb.dot.style.background = P.SC[Lb.sid]; return; }
      if (Lb.pair) { Lb.el.style.background = P.lbg; Lb.a.style.color = P.ink2; Lb.d1.style.background = P.SC[Lb.sids[0]]; Lb.d2.style.background = P.SC[Lb.sids[1]]; return; }
      Lb.el.style.background = P.lbg; Lb.el.style.textShadow = '0 2px 12px ' + P.shadow; Lb.a.style.color = P.ink; Lb.b.style.color = P.ink2;
    });
    this.tipName.style.color = P.ink; this.tipSub.style.color = P.ink2; this.tipAct.style.color = P.acc;
    if (state.sel) { this.buildHighlight(state.sel); this.buildFocusLabels(state.sel); }
  };

  /* ── gezinme: sürükle = döndür; sağ tık / orta tık / Shift+sürükle / iki parmak = kaydır; tekerlek ve kıstırma imlecin
        olduğu yere yakınlaşır; çift tık o noktaya uçar; klavye (bindUI): oklar/WASD kaydırır, + − yakınlaştırır, 0 sıfırlar ── */
  S3.bindPointer = function (el) {
    var self = this, T = this.T;
    var ndc = function (x, y) { var rc = el.getBoundingClientRect(); return new T.Vector2(((x - rc.left) / rc.width) * 2 - 1, -((y - rc.top) / rc.height) * 2 + 1); };
    var two = function () { var pv = Array.from(self.ptrs.values()); return { d: Math.hypot(pv[0][0] - pv[1][0], pv[0][1] - pv[1][1]), x: (pv[0][0] + pv[1][0]) / 2, y: (pv[0][1] + pv[1][1]) / 2 }; };
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    el.addEventListener('pointerdown', function (e) {
      try { el.setPointerCapture(e.pointerId); } catch (er) {} self.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (self.ptrs.size === 1) { self.down = [e.clientX, e.clientY]; self.moved = false; self.panMode = e.button === 1 || e.button === 2 || e.shiftKey || e.ctrlKey || e.metaKey || state.flat; }
      else if (self.ptrs.size === 2) self.pinch = two();
      self.dragging = true; self.ctl.vt = self.ctl.vp = 0; self.lastInteract = performance.now(); self.poke();
      if (document.activeElement && document.activeElement.tagName === 'INPUT') document.activeElement.blur();
    });
    el.addEventListener('pointermove', function (e) {
      self.mouse = ndc(e.clientX, e.clientY); self.poke();
      if (!self.ptrs.has(e.pointerId)) return;
      var prev = self.ptrs.get(e.pointerId);
      self.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (self.ptrs.size >= 2) {
        var p1 = two(), p0 = self.pinch || p1;
        if (p0.d > 0 && p1.d > 0) self.zoomAt(p0.d / p1.d, ndc(p1.x, p1.y));
        self.pan(p1.x - p0.x, p1.y - p0.y); self.pinch = p1; self.moved = true; return;
      }
      var dx = e.clientX - prev[0], dy = e.clientY - prev[1];
      if (Math.hypot(e.clientX - self.down[0], e.clientY - self.down[1]) > 5) self.moved = true;
      if (self.moved) heroMin(true);
      if (self.moved) {
        if (self.panMode) { self.pan(dx, dy); el.style.cursor = 'move'; }
        else { self.ctl.theta -= dx * 0.0055; self.ctl.phi -= dy * 0.0055; self.ctl.vt = -dx * 0.0055; self.ctl.vp = -dy * 0.0055; el.style.cursor = 'grabbing'; }
      }
      self.lastInteract = performance.now();
    });
    var up = function (e) {
      if (!self.ptrs.has(e.pointerId)) return;
      self.ptrs.delete(e.pointerId);
      if (self.ptrs.size) { self.pinch = null; if (self.ptrs.size === 1) { var only = Array.from(self.ptrs.values())[0]; self.down = only; self.panMode = true; } return; }
      self.dragging = false; self.pinch = null;
      if (!self.moved && e.type === 'pointerup' && e.button === 0) {
        var v = ndc(e.clientX, e.clientY), i = self.pick(v), now = performance.now(), lt = self.lastTap;
        // dokunmatikte çift dokunma o noktaya uçar (fare için dblclick)
        if (e.pointerType !== 'mouse' && lt && now - lt.t < 320 && Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 30) { self.lastTap = null; self.flyTo(i >= 0 ? self.nodes[i].pos : self.pointAt(v), self.ctl.gDist * 0.5); }
        else { self.lastTap = { t: now, x: e.clientX, y: e.clientY }; if (i >= 0) select(self.nodes[i].t.id); }
      }
      if (e.pointerType !== 'mouse') self.mouse = null;
      el.style.cursor = self.hover >= 0 ? 'pointer' : 'grab'; self.poke();
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', function () { if (!self.dragging) { self.mouse = null; self.hover = -1; self.poke(); } });
    el.addEventListener('wheel', function (e) { e.preventDefault(); self.zoomAt(Math.exp(e.deltaY * (e.ctrlKey ? 0.01 : 0.0011)), ndc(e.clientX, e.clientY)); }, { passive: false });
    el.addEventListener('dblclick', function (e) {
      var v = ndc(e.clientX, e.clientY), i = self.pick(v);
      self.flyTo(i >= 0 ? self.nodes[i].pos : self.pointAt(v), self.ctl.gDist * 0.5);
    });
  };
  /* imlecin altındaki nokta: dönme merkezinin derinliğindeki görüş düzleminde */
  S3.pointAt = function (v) {
    var C = this.camera; this.ray.setFromCamera(v, C);
    var dir = this.ray.ray.direction, n = C.getWorldDirection(this.tv), t = this.tv2.copy(this.ctl.target).sub(C.position).dot(n) / Math.max(1e-4, dir.dot(n));
    return this.tv3.copy(C.position).addScaledVector(dir, t);
  };
  S3.clampTarget = function () {
    var c = this.ctl, d = this.tv.copy(c.gTarget).sub(this.home), m = this.rb * 1.05;
    if (d.length() > m) c.gTarget.copy(this.home).addScaledVector(d.normalize(), m);
  };
  S3.zoomAt = function (k, v) {
    var c = this.ctl, nd = clamp(c.gDist * k, MIN_D, MAX_D), kk = nd / c.gDist;
    // yakınlaşırken imlecin altındaki nokta yerinde kalır; uzaklaşırken görünüm ağın merkezine doğru kayar
    if (v && kk < 1 - 1e-4) { var i = this.pick(v), P = i >= 0 ? this.nodes[i].pos : this.pointAt(v); c.gTarget.lerp(P, 1 - kk); this.clampTarget(); this.nav = true; }
    else if (v && kk > 1 + 1e-4 && this.selI < 0) c.gTarget.lerp(this.home, Math.min(1, (kk - 1) * 0.7));
    c.gDist = nd; this.lastInteract = performance.now(); this.poke();
  };
  S3.pan = function (dx, dy) {
    if (!dx && !dy) return;
    var C = this.camera, c = this.ctl, wpp = (2 * c.dist * Math.tan((C.fov * Math.PI) / 360)) / this.H, e = C.matrixWorld.elements;
    var mx = (-dx * e[0] + dy * e[4]) * wpp, my = (-dx * e[1] + dy * e[5]) * wpp, mz = (-dx * e[2] + dy * e[6]) * wpp;
    c.gTarget.x += mx; c.gTarget.y += my; c.gTarget.z += mz; this.clampTarget();
    c.target.x += mx; c.target.y += my; c.target.z += mz;
    this.nav = true; this.lastInteract = performance.now(); this.poke();
  };
  S3.flyTo = function (p, dist) {
    this.ctl.gTarget.copy(p); this.clampTarget(); this.ctl.gDist = clamp(dist, MIN_D, MAX_D);
    this.nav = true; this.lastInteract = performance.now(); this.poke();
  };
  S3.flySubject = function (sid) {
    var sa = (this.subAnchors || []).filter(function (a) { return a.id === sid; })[0]; if (!sa) return;
    this.flyTo(sa.c || this.tv.set(sa.x, sa.y, sa.z), Math.max(900, sa.r * 3.1));
  };
  S3.setHiSub = function (sid) { if (this.hiSub === sid) return; this.hiSub = sid; if (this.selI < 0) this.computeTargets(null, state.filter); };
  S3.setBridges = function (on) { this.bridges = !!on; if (this.selI < 0) this.computeTargets(null, state.filter); };

  S3.pairText = function () {
    this.themeLabels.forEach(function (Lb) { if (Lb.pair) { Lb.a.textContent = D.subjectShort(Lb.sids[0]) + ' ↔ ' + D.subjectShort(Lb.sids[1]) + ' · ' + TX.pairN(Lb.n); Lb.w = Lb.h = 0; } });
  };
  /* dil değişimi: etiket metinleri değişir, önbellekteki genişlikler sıfırlanır */
  S3.relabel = function () {
    this.pairText();
    this.themeLabels.forEach(function (Lb) { if (Lb.pair) return; if (Lb.big) { Lb.a.textContent = D.subjectShort(Lb.sid); Lb.w = Lb.h = 0; return; } var t = D.themeById[Lb.id]; Lb.a.textContent = t.name; Lb.b.textContent = (D.multi ? D.subjectShort(t.subject).toLocaleUpperCase(TX.locale) + ' · ' : '') + D.gradeName(t.grade).toLocaleUpperCase(TX.locale); Lb.w = Lb.h = 0; });
    this.renderer.domElement.setAttribute('aria-label', TX.canvas);
    this.tipI = -1;
    if (state.sel) this.buildFocusLabels(state.sel);
    this.poke();
  };

  S3.zoom = function (k) { this.zoomAt(k, null); };
  S3.reset = function () { this.nav = false; this.ctl.gDist = this.idleDist; this.ctl.gTarget.copy(this.home); this.poke(); };

  /* ekran düzleminde seçim: imlece en yakın, kameraya en yakın nöron */
  S3.pick = function (v) {
    var C = this.camera, W = this.W, H = this.H, px = ((v.x + 1) / 2) * W, py = ((1 - v.y) / 2) * H, tf = Math.tan((C.fov * Math.PI) / 360), best = -1, bd = 1e12, p = this.v;
    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i]; p.copy(n.pos).project(C); if (p.z > 1 || p.z < -1) continue;
      var sx = ((p.x + 1) / 2) * W, sy = ((1 - p.y) / 2) * H, cd = C.position.distanceTo(n.pos), rp = (n.r * n.scale * H) / (2 * cd * tf);
      var lim = Math.max(rp * (COARSE ? 2.3 : 1.7), COARSE ? 16 : 7), dd = (sx - px) * (sx - px) + (sy - py) * (sy - py);
      if (dd <= lim * lim && cd < bd) { bd = cd; best = i; }
    }
    return best;
  };

  S3.respawn = function (p, k, rev) {
    p.k = k; p.rev = rev; p.t = 0; p.sp = ((p.bridge ? 260 : 120) + this.rnd() * 90) / this.elen[k];
    var e = this.L.E[k]; p.col = this.nodes[rev ? e[0] : e[1]].col;
  };

  S3.relType = function (l, id) {
    if (l.type === 'ilg') return 'rel';
    if (l.to === id) return D.byId[l.from].grade === 'O' ? 'base' : l.type === 'on' ? 'pre' : 'kol';
    return 'next';
  };

  S3.keep = function (l, id) { return !state.preOnly || ['pre', 'base'].indexOf(this.relType(l, id)) >= 0; };
  S3.reapply = function () {
    var id = state.sel; if (!id || this.selI < 0) return;
    this.computeTargets(id, state.filter); this.buildHighlight(id); this.buildFocusLabels(id); this.buildChain(id); this.poke();
  };
  S3.computeTargets = function (sel, filter) {
    var N = this.nodes, E = this.L.E, nf = this.nfT, ef = this.efT, self = this; this.poke(); this.intro = false;
    if (sel) {
      var set = new Set([sel]), hl = new Set();
      D.links.forEach(function (l, k) { if ((l.from === sel || l.to === sel) && self.keep(l, sel)) { set.add(l.from); set.add(l.to); hl.add(k); } });
      var ci = this.chainInfo(sel);
      N.forEach(function (n, i) { nf[i] = set.has(n.t.id) ? 1 : (ci.up[n.t.id] != null || ci.down[n.t.id] != null) ? 0.5 : 0.1; });
      E.forEach(function (e, k) { ef[k] = hl.has(k) ? 0 : 0.12; });
      ci.upE.concat(ci.downE).forEach(function (e) { if (!hl.has(e.k)) ef[e.k] = 0.55; });
      this.activeEdges = Array.from(hl);
      return;
    }
    var fg = filter && filter !== 'all' ? filter : null, hs = this.hiSub, br = this.bridges;
    if (!fg && !hs && !br) { nf.fill(1); ef.fill(1); this.activeEdges = E.map(function (e, k) { return k; }); return; }
    var m = function (n) { return (!fg || String(n.t.grade) === fg) && (!hs || n.t.subject === hs) && (!br || self.hasX[n.i]); };
    N.forEach(function (n, i) { nf[i] = m(n) ? 1 : br && !fg && !hs ? 0.3 : 0.13; });
    this.activeEdges = [];
    E.forEach(function (e, k) {
      var a = m(N[e[0]]), b = m(N[e[1]]);
      if (br) ef[k] = e[3] && (a || b) ? (a && b ? 1 : 0.6) : 0.05;
      else if (hs && e[3]) ef[k] = a || b ? 0.85 : 0.05;
      else ef[k] = a && b ? 1 : a || b ? 0.45 : 0.07;
      if (ef[k] > 0.4) self.activeEdges.push(k);
    });
  };

  S3.buildHighlight = function (id) {
    this.clearHighlight();
    var self = this, T = this.T, g = new T.Group(), mats = [];
    D.links.forEach(function (l, k) {
      if ((l.from !== id && l.to !== id) || !self.keep(l, id)) return;
      var type = self.relType(l, id), cv = self.curves[k], col = new T.Color(EC[type]);
      var mk = function () { var m = new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false }); m.userData.o = EOP[type]; mats.push(m); return m; };
      if (type === 'rel') { var m = mk(), sg = new T.SphereGeometry(1.15, 8, 6); for (var j = 1; j < 14; j++) { var s = new T.Mesh(sg, m); cv.getPoint(j / 14, s.position); g.add(s); } }
      else if (type === 'kol') { var m2 = mk(), n = 13; for (var j2 = 0; j2 < n; j2 += 2) { var pts = [0, 0.5, 1].map(function (u) { return cv.getPoint((j2 + u) / n); }); g.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 6, 1.1, 6, false), m2)); } }
      else g.add(new T.Mesh(new T.TubeGeometry(cv, 48, type === 'pre' ? 1.6 : 1.2, 7, false), mk()));
      if (type !== 'rel') for (var q = 0; q < 2; q++) self.hlp.push({ k: k, t: q / 2 + self.rnd() * 0.1, sp: 150 / self.elen[k], col: col });
    });
    this.scene.add(g); this.hl = { g: g, mats: mats, a: 0 };
  };
  /* öğrenme yolu: ön koşul zinciri boyunca ışık, uzaktaki bilgiden seçili konuya; sonra devam konularına */
  S3.chainInfo = function (id) {
    var up = {}, down = {}, upE = [], downE = [], L = D.links, q, d;
    up[id] = 0; q = [id]; d = 0;
    while (q.length && d < 4) {
      var nx = [];
      L.forEach(function (l, k) {
        if (l.type !== 'on' || q.indexOf(l.to) < 0) return;
        if (up[l.from] == null) { up[l.from] = d + 1; nx.push(l.from); upE.push({ k: k, h: d + 1 }); }
        else if (up[l.from] === d + 1) upE.push({ k: k, h: d + 1 });
      });
      q = nx; d++;
    }
    down[id] = 0; q = [id]; d = 0;
    while (q.length && d < (state.preOnly ? 0 : 2)) {
      var nx2 = [];
      L.forEach(function (l, k) { if (l.type === 'on' && q.indexOf(l.from) >= 0 && down[l.to] == null) { down[l.to] = d + 1; nx2.push(l.to); downE.push({ k: k, h: d + 1 }); } });
      q = nx2; d++;
    }
    return { up: up, down: down, upE: upE, downE: downE };
  };
  S3.clearChain = function () { this.cp = []; };
  S3.buildChain = function (id) {
    this.clearChain();
    if (mqReduce.matches) return;
    var self = this, T = this.T, c = this.chainInfo(id), t0 = (this.clock || 0) + 0.45, maxH = 0;
    c.upE.forEach(function (e) { maxH = Math.max(maxH, e.h); });
    var accent = new T.Color(this.P.acc), nxt = new T.Color(EC.next);
    var mk = function (e, start, col) { self.cp.push({ k: e.k, at: start, dur: 1.1, dest: self.L.E[e.k][1], col: col }); };
    c.upE.forEach(function (e) { mk(e, t0 + (maxH - e.h) * 0.5, accent); });
    var after = t0 + maxH * 0.5 + 1.0;
    c.downE.forEach(function (e) { mk(e, after + (e.h - 1) * 0.55, nxt); });
  };
  S3.clearHighlight = function () {
    var h = this.hl; this.hlp = []; if (!h) return;
    h.g.traverse(function (o) { if (o.geometry) o.geometry.dispose(); }); h.mats.forEach(function (m) { m.dispose(); }); this.scene.remove(h.g);
    this.hl = null;
  };

  S3.buildFocusLabels = function (id) {
    this.clearFocusLabels();
    var self = this, P = this.P;
    var mk = function (tag, css) { var e = document.createElement(tag); e.style.cssText = css; return e; };
    var seen = new Map(), NS = 'http://www.w3.org/2000/svg', sub0 = D.byId[id].subject;
    D.links.forEach(function (l) { if ((l.from !== id && l.to !== id) || !self.keep(l, id)) return; var o = l.from === id ? l.to : l.from; if (!seen.has(o)) seen.set(o, self.relType(l, id)); });
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible');
    this.labelLayer.appendChild(svg);
    var items = Array.from(seen).map(function (kv) {
      var oid = kv[0], type = kv[1], n = self.nodes[self.L.ix[oid]], dc = D.multi ? P.SC[n.t.subject] : GC[n.t.grade];
      var el = mk('button', 'position:absolute;left:0;top:0;display:flex;align-items:center;gap:7px;padding:5px 12px 5px 9px;border-radius:999px;border:1.5px solid ' + EC[type] + ';background:' + P.chipBg + ';color:' + P.ink + ';font-family:var(--font-body);font-weight:600;font-size:13px;line-height:1.2;white-space:nowrap;cursor:pointer;pointer-events:auto;will-change:transform;opacity:0;transition:opacity .25s');
      el.type = 'button'; el.tabIndex = -1; el.setAttribute('aria-hidden', 'true');
      el.appendChild(mk('i', 'flex:none;width:8px;height:8px;border-radius:50%;box-sizing:border-box;' + (n.isO ? 'border:2px solid ' + dc : 'background:' + dc)));
      el.appendChild(document.createTextNode((n.t.subject !== sub0 ? n.t.subjectShort + ' · ' : '') + n.t.name));
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
    // uzun konu adı dar ekranda kenara taşmaz, iki satıra kırılır
    var main = mk('div', 'position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center;gap:2px;text-align:center;max-width:' + (state.wide ? '520px' : 'calc(100vw - 112px)') + ';pointer-events:none;padding:5px 16px 7px;border-radius:20px;background:' + P.chipBg + ';box-shadow:0 6px 22px ' + P.shadow + ';will-change:transform;opacity:0');
    var a = mk('span', 'font-family:var(--font-heading);font-size:22px;line-height:1.15;text-wrap:balance;color:' + P.ink); a.textContent = sn.t.name;
    var b = mk('span', 'font-family:var(--font-body);font-size:12px;font-weight:700;letter-spacing:.1em;color:' + P.ink2); b.textContent = ((D.multi ? sn.t.subjectShort + ' · ' : '') + (sn.isO ? sn.t.gradeLabel : sn.t.gradeLabel + ' · ' + sn.t.themeName)).toLocaleUpperCase(TX.locale);
    main.appendChild(a); main.appendChild(b); this.labelLayer.appendChild(main);
    this.fl = { items: items, main: main, n: sn, svg: svg };
  };
  S3.clearFocusLabels = function () {
    if (!this.fl) return;
    this.fl.items.forEach(function (i) { i.el.remove(); }); this.fl.main.remove(); this.fl.svg.remove(); this.fl = null; this.chipHover = -1;
  };

  S3.select = function (id) {
    var i = this.L.ix[id], n = this.nodes[i], self = this;
    this.selI = i; this.hiSub = null;
    var md = 0;
    D.links.forEach(function (l) { if (l.from === id || l.to === id) md = Math.max(md, self.nodes[self.L.ix[l.from === id ? l.to : l.from]].pos.distanceTo(n.pos)); });
    this.ctl.gTarget.copy(n.pos); this.ctl.gDist = clamp(md * 2 + 150, 320, D.multi ? 2600 : 1000);
    this.computeTargets(id, state.filter);
    this.buildHighlight(id); this.buildFocusLabels(id); this.buildChain(id);
    if (!mqReduce.matches) {
      n.flash = 1.4; this.waves = [];
      D.links.forEach(function (l) { if (l.from !== id && l.to !== id) return; var o = self.nodes[self.L.ix[l.from === id ? l.to : l.from]]; self.waves.push({ i: o.i, at: (self.clock || 0) + 0.14 + o.pos.distanceTo(n.pos) / 700 }); });
    }
    this.lastInteract = performance.now(); this.poke();
  };
  S3.clearSel = function () {
    this.selI = -1; this.nav = false;
    this.ctl.gTarget.copy(this.home); this.ctl.gDist = this.idleDist;
    this.computeTargets(null, state.filter);
    this.clearHighlight(); this.clearFocusLabels(); this.clearChain(); this.poke();
  };
  S3.setFilter = function (k) { this.computeTargets(null, k); };

  S3.paint = function (Lr, f, ranges) {
    var a = Lr.c.array, b = Lr.base, g = this.bgc || [0, 0, 0];
    for (var i = 0; i < ranges.length; i++) { var v = f[i], st = ranges[i][0] * 3, en = st + ranges[i][1] * 3; for (var j = st; j < en; j += 3) { a[j] = g[0] + (b[j] - g[0]) * v; a[j + 1] = g[1] + (b[j + 1] - g[1]) * v; a[j + 2] = g[2] + (b[j + 2] - g[2]) * v; } }
    Lr.c.needsUpdate = true;
  };

  S3.tick = function (dt, time) {
    var C = this.camera, ctl = this.ctl, s = state, reduce = mqReduce.matches;
    // hareket azaltılınca kamera ve geçişler süzülmez, hedefe doğrudan oturur
    var kk = reduce ? 1 : 1 - Math.exp(-dt * 6), kc = reduce ? 1 : 1 - Math.exp(-dt * 3), self = this;
    if (s.flat) {
      var tt = Math.round(ctl.theta / (Math.PI * 2)) * Math.PI * 2, hp = Math.PI / 2;
      ctl.theta += (tt - ctl.theta) * kk; ctl.phi += (hp - ctl.phi) * kk; ctl.vt = ctl.vp = 0;
      if (Math.abs(tt - ctl.theta) + Math.abs(hp - ctl.phi) > 0.002) this.poke();
    } else if (!this.dragging) { ctl.theta += ctl.vt; ctl.phi += ctl.vp; var dmp = Math.pow(0.9, dt * 60); ctl.vt *= dmp; ctl.vp *= dmp; }
    if (!s.flat && !reduce && !this.dragging && !this.nav && performance.now() - this.lastInteract > 2600) ctl.theta += dt * (s.sel ? 0.03 : D.multi ? 0.04 : 0.065);
    ctl.phi = clamp(ctl.phi, 0.3, 2.84);
    ctl.target.lerp(ctl.gTarget, kc); ctl.dist += (ctl.gDist - ctl.dist) * kc;
    var sp = Math.sin(ctl.phi), t = ctl.target;
    C.position.set(t.x + ctl.dist * sp * Math.sin(ctl.theta), t.y + ctl.dist * Math.cos(ctl.phi), t.z + ctl.dist * sp * Math.cos(ctl.theta));
    C.lookAt(t);
    var gx = 0, gy = 0;
    if (s.sel) { gx = s.wide ? 228 : 0; gy = s.wide ? 0 : this.H * 0.2; }
    else if (s.wide) { var li = this.ab != null ? this.ab : (this.ab = this.leftInset()); gx = -li / 2; } // ağ, soldaki kartın (ağ kartı ya da arama kartı) sağında kalan alanın ortasına oturur
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

    if (this.intro) {
      if (this.tStart == null) this.tStart = time;
      var el = time - this.tStart, left = 0, E2 = this.L.E;
      for (i = 0; i < this.nodes.length; i++) if (!this.started[i]) { if (el > this.delay[i]) { this.started[i] = 1; this.nfT[i] = 1; this.nodes[i].flash = 1; } else left++; }
      for (k = 0; k < E2.length; k++) if (!this.efT[k] && this.started[E2[k][0]] && this.started[E2[k][1]]) this.efT[k] = 1;
      if (!left && el > 2.4) this.intro = false;
      this.poke();
    }
    this.clock = time;
    if (this.waves.length) {
      this.waves = this.waves.filter(function (w) { if (time >= w.at) { self.nodes[w.i].flash = Math.max(self.nodes[w.i].flash, 1.1); return false; } return true; });
      this.poke();
    }

    // gövdeler: boyut, saydamlık ve ışıma; sonra kameradan uzaktan yakına sıralanıp örnek tamponlarına yazılır
    var P = this.P, N = this.nodes, gb = this.glowB, rbt = this.ringB, cp = C.position;
    for (i = 0; i < N.length; i++) {
      var n = N[i], f = this.nfC[i], hov = i === this.hover || i === this.chipHover, isSel = i === this.selI;
      n.flash *= Math.exp(-dt * 3.2);
      var sc = (hov ? 1.3 : 1) * (isSel ? 1.22 + (reduce ? 0 : 0.06 * Math.sin(time * 3)) : 1) * (this.intro ? 0.35 + 0.65 * f : 1);
      if (Math.abs(sc - n.scale) > 0.002) this.poke();
      n.scale += (sc - n.scale) * kk;
      n.op = (n.isO ? 0.5 : 1) * (0.1 + 0.9 * f);
      n.em = P.em + n.flash * P.fl + (hov ? P.hovE : 0);
      gb.add(n.pos, n.r * n.scale * (7 + n.flash * 3), n.col, (0.38 + n.flash * 0.7 + (isSel ? 0.4 : 0) + (hov ? 0.2 : 0)) * f * P.glowK);
      if (n.isO) rbt.add(n.pos, n.r * n.scale * 3.2, n.col, 0.9 * (0.1 + 0.9 * f));
      this.dd[i] = (n.pos.x - cp.x) * (n.pos.x - cp.x) + (n.pos.y - cp.y) * (n.pos.y - cp.y) + (n.pos.z - cp.z) * (n.pos.z - cp.z);
    }
    gb.commit(); rbt.commit();
    var dd = this.dd, ord = this.ord, im = this.soma, fa = this.fx.array, sv = this.sv, m4 = this.m4;
    ord.sort(function (a, b) { return dd[b] - dd[a]; });
    for (var sI = 0; sI < ord.length; sI++) {
      var nn = N[ord[sI]];
      im.setMatrixAt(sI, m4.compose(nn.pos, nn.q, sv.setScalar(nn.r * nn.scale)));
      im.setColorAt(sI, nn.col); fa[sI * 2] = nn.op; fa[sI * 2 + 1] = nn.em;
    }
    im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true; this.fx.needsUpdate = true;

    // ışık atımları (boşta), seçim vurguları ve öğrenme yolu: tek toplulukta
    var sig = !reduce, pb = this.pulseB, pos = this.tv, E = this.L.E;
    this.idleVis += ((sig && !s.sel ? 1 : 0) - this.idleVis) * kc;
    if (Math.abs(this.idleVis - (sig && !s.sel ? 1 : 0)) > 0.01) this.poke();
    if (this.idleVis > 0.01) this.pulses.forEach(function (p) {
      p.t += p.sp * dt;
      if (p.t >= 1) {
        var e = E[p.k], dest = p.rev ? e[0] : e[1];
        if (self.idleVis > 0.3) self.nodes[dest].flash = Math.max(self.nodes[dest].flash, self.idleVis * self.nfC[dest]);
        var nx = null;
        if (p.bridge) {
          var ck = self.crossK.filter(function (q) { return self.efT[q] > 0.3; }); if (!ck.length) ck = self.crossK;
          var bk = ck[Math.floor(self.rnd() * ck.length)]; nx = { k: bk, rev: E[bk][2] === 'ilg' && self.rnd() < 0.5 };
        }
        else {
          var outs = self.out[dest];
          nx = outs.length && self.rnd() < 0.85 ? outs[Math.floor(self.rnd() * outs.length)] : null;
          if (!nx || (self.efT[nx.k] < 0.3 && self.rnd() < 0.85)) { var ae = self.activeEdges.length ? self.activeEdges : E.map(function (x, k) { return k; }); nx = { k: ae[Math.floor(self.rnd() * ae.length)], rev: false }; }
        }
        self.respawn(p, nx.k, nx.rev);
      }
      var cv = self.curves[p.k], ef = self.efC[p.k], fade = Math.min(1, p.t * 6, (1 - p.t) * 10 + 0.4), big = p.bridge ? 1.45 : 1;
      for (var j = 0; j < 3; j++) {
        var u = p.t - j * 0.035; if (u < 0) continue;
        cv.getPoint(p.rev ? 1 - u : u, pos);
        pb.add(pos, [15, 9.5, 5.5][j] * big, p.col, (0.95 - j * 0.3) * self.idleVis * Math.max(ef, 0.06) * fade * P.pulseK);
      }
    });
    if (this.hl) {
      var h = this.hl; h.a += (1 - h.a) * kc; if (h.a < 0.995) this.poke();
      h.mats.forEach(function (m) { m.opacity = m.userData.o * h.a; });
      this.hlp.forEach(function (p) {
        p.t = (p.t + p.sp * dt) % 1;
        var cv = self.curves[p.k];
        for (var j = 0; j < 3; j++) { var u = p.t - j * 0.03; if (u < 0) continue; cv.getPoint(u, pos); pb.add(pos, [14, 9, 5.5][j], p.col, (1 - j * 0.3) * h.a * (sig ? 1 : 0)); }
      });
    }
    if (this.cp.length) {
      this.cp = this.cp.filter(function (p) {
        var u = (time - p.at) / p.dur;
        if (u < 0) return true;
        if (u >= 1) { if (!p.done) { p.done = 1; self.nodes[p.dest].flash = Math.max(self.nodes[p.dest].flash, 1.3); } return u < 1.4; }
        var cv = self.curves[p.k], env = Math.sin(Math.PI * Math.min(1, u * 1.05));
        for (var j = 0; j < 3; j++) { cv.getPoint(Math.max(0, u - j * 0.05), pos); pb.add(pos, [38, 23, 13][j], p.col, (0.95 - j * 0.22) * env); }
        return true;
      });
      this.poke();
    }
    pb.commit();
  };

  /* etiketlerin girmeyeceği arayüz alanları (üst çubuk, kontroller, lejant, açılış kartı, ders atlası, panel) */
  S3.obstacles = function (now) {
    if (this.ob && now - this.obT < 600) return this.ob;
    var out = [], sr = this.stage.getBoundingClientRect();
    ['.hero', '#atlas', '#controls', 'footer.legend', '#panel', '#hintline'].forEach(function (q) {
      var el = document.querySelector(q); if (!el || el.hidden || el.offsetParent === null) return;
      var r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return;
      out.push({ x: r.left - sr.left - 6, y: r.top - sr.top - 6, w: r.width + 12, h: r.height + 12 });
    });
    this.obT = now; return (this.ob = out);
  };

  S3.updateLabels = function (now) {
    var self2 = this;
    var C = this.camera, v = this.v, W = this.W, H = this.H, s = state, tf = Math.tan((C.fov * Math.PI) / 360);
    var proj = function (p) { v.copy(p).project(C); return [((v.x + 1) / 2) * W, ((1 - v.y) / 2) * H, v.z]; };
    var pxR = function (n) { return (n.r * n.scale * H) / (2 * C.position.distanceTo(n.pos) * tf); };
    var tl = this.themeLabels.map(function (Lb) { var p = proj(Lb.pos); return { L: Lb, x: p[0], y: p[1], z: p[2], d: C.position.distanceTo(Lb.pos) }; })
      .sort(function (a, b) { return (b.L.big ? 2 : b.L.pair ? 1 : 0) - (a.L.big ? 2 : a.L.pair ? 1 : 0) || (s.filter !== 'all' ? (b.L.grade === s.filter) - (a.L.grade === s.filter) : 0) || a.d - b.d; });
    var boxes2 = this.obstacles(now || performance.now()).slice(), hit = function (bx, by, w, h) { return boxes2.some(function (q) { return bx < q.x + q.w && bx + w > q.x && by < q.y + q.h && by + h > q.y; }); };
    var hs = this.hiSub;
    tl.forEach(function (o2) {
      var L = o2.L, z = o2.z, d = o2.d;
      // tüm derslerde ayrıntı uzaklıkla açılır: uzakta ders adları ve köprü çiftleri, yaklaştıkça tema adları
      var o = s.sel || z > 1 ? 0 : L.big ? clamp((d - 500) / 900, 0.3, 1) : L.pair ? (self2.bridges ? 1 : clamp((d - 700) / 1400, 0, 0.9)) : D.multi ? clamp((2600 - d) / 900, 0, 1) : clamp(2.1 - d / 1250, 0.85, 1);
      if (s.filter !== 'all' && L.grade !== s.filter && L.grade !== 'S') o *= 0.3;
      if (hs) o *= L.pair ? (L.sids.indexOf(hs) >= 0 ? 1.1 : 0) : L.sid !== hs ? (L.big ? 0.35 : 0) : 1;
      o = Math.min(1, o);
      if (o2.x < -80 || o2.x > W + 80 || o2.y < -20 || o2.y > H + 80) o = 0;
      o2.o = o;
    });
    // etiketler gizli doğar; ilk kez görünecek olanlar önce açılır, sonra hepsi tek seferde ölçülür (her etikette ayrı yerleşim hesabı olmaz)
    var meas = tl.filter(function (o2) { return o2.o > 0.02 && !o2.L.w; });
    meas.forEach(function (o2) { var L = o2.L; if (L.ds) { L.el.style.display = L.disp || ''; L.ds = ''; } });
    meas.forEach(function (o2) { var L = o2.L; L.w = L.el.offsetWidth || 140; L.h = L.el.offsetHeight || 40; });
    tl.forEach(function (o2) {
      var L = o2.L, x = o2.x, y = o2.y, o = o2.o;
      var lw = L.w || 140; x = clamp(x, lw / 2 + 8, Math.max(lw / 2 + 8, W - lw / 2 - 8));
      if (o > 0.02) {
        var w = L.w, h = L.h, pad = 6;
        var topLim = s.wide ? 88 : 124; if (y - h - pad < topLim) y = topLim + h + pad;
        var at = function (yy) { return [x - w / 2 - pad, yy - h - pad, w + pad * 2, h + pad * 2]; };
        var b = at(y);
        if (hit(b[0], b[1], b[2], b[3])) { var up = at(y - 30); if (!hit(up[0], up[1], up[2], up[3])) { y -= 30; b = up; } else { var dn = at(y + 30); if (!hit(dn[0], dn[1], dn[2], dn[3])) { y += 30; b = dn; } else o = 0; } }
        if (o > 0.1) boxes2.push({ x: b[0], y: b[1], w: b[2], h: b[3] });
      } else o = 0;
      // yalnızca değişen stil yazılır (tüm derslerde yüzlerce etiket var)
      var os = o.toFixed(2); if (L.os !== os) { L.el.style.opacity = os; L.os = os; }
      // görünmeyen etiket sayfadan da çekilir: kendi katmanını tutmaz, ekran okuyucu ve denetçi onu metin saymaz
      var ds = o > 0 ? '' : 'none'; if ((L.ds || '') !== ds) { L.el.style.display = ds || L.disp || ''; L.ds = ds; }
      if (o > 0) { var ts = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)'; if (L.ts !== ts) { L.el.style.transform = ts; L.ts = ts; } }
    });
    if (this.fl) {
      var fl = this.fl, pm = proj(fl.n.pos), mx = pm[0], my = pm[1], mz = pm[2], mr = pxR(fl.n), mw = fl.mw || (fl.mw = fl.main.offsetWidth || 200);
      var mTop = my + mr * 1.25 + 10, mh = fl.mh || (fl.mh = fl.main.offsetHeight || 50);
      // ad etiketi ekranda kalır: geniş ekranda panelin, telefonda yakınlaştırma düğmelerinin solunda
      var lim = s.wide ? W - 464 : mTop < H * 0.46 && mTop + mh > H * 0.46 - 160 ? W - 88 : W - 12;
      mx = clamp(mx, mw / 2 + 12, Math.max(mw / 2 + 12, lim - mw / 2));
      fl.main.style.transform = 'translate(' + mx.toFixed(1) + 'px,' + mTop.toFixed(1) + 'px) translate(-50%,0)';
      fl.main.style.opacity = mz > 1 ? '0' : '1';
      var placed = [{ x: mx - mw / 2, y: mTop, w: mw, h: mh }, { x: mx - mr, y: my - mr, w: mr * 2, h: mr * 2 }];
      if (s.wide) placed.push({ x: W - 536, y: H - 180, w: 64, h: 180 }); else placed.push({ x: W - 80, y: H * 0.46 - 160, w: 80, h: 160 });
      var ch = 29, gap = 4;
      var maxX = (s.wide ? W - 464 : W - 12), minY = 150, maxY = s.wide ? H - 90 : H * 0.46 - 8;
      var list = fl.items.map(function (it) {
        var pa = proj(it.n.pos), ax = pa[0], ay = pa[1], z2 = pa[2], r = pxR(it.n); if (!it.w) it.w = it.el.offsetWidth || 160;
        var x = ax < pm[0] - 4 ? ax - r - 8 - it.w : ax + r + 8;
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
        this.tipSub.textContent = (D.multi ? n.t.subjectShort + ' · ' : '') + (n.isO ? n.t.gradeLabel : n.t.gradeLabel + ' · ' + n.t.themeName);
        this.tipAct.textContent = hi === this.selI ? TX.tipOpen : TX.tipClick;
        this.tipI = hi;
      }
      var pp = proj(n.pos), r2 = pxR(n);
      this.tip.style.transform = 'translate(' + Math.min(pp[0] + r2 + 14, W - 280).toFixed(1) + 'px,' + (pp[1] - 28).toFixed(1) + 'px)';
      this.tip.style.opacity = '1';
    } else { this.tip.style.opacity = '0'; this.tipI = -1; }
  };

  /* ───────── başlatma ───────── */
  function makeScene() {
    if (!THREE_MOD) return;
    if (scene) { scene.dispose(); scene = null; }
    scene = new Scene3D(THREE_MOD, $('#stage'), $('#labels'), $('#tip'));
    scene.resize();
  }
  // ders değişince eski sahne hemen kalkar; yeni düzen dilimlerle hesaplanırken yükleniyor göstergesi görünür
  var sceneGen = 0;
  function rebuildScene() {
    if (!THREE_MOD) return;
    var job = layoutJob(), my = ++sceneGen;
    if (job.done) { makeScene(); return; }
    if (scene) { scene.dispose(); scene = null; }
    $('#loading').hidden = false;
    runLayout(job).then(function () {
      if (my !== sceneGen) return;
      $('#loading').hidden = true; makeScene();
      if (state.sel && D.byId[state.sel]) scene.select(state.sel);
      ui();
    });
  }

  var SUBJ_ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>';
  var SUBJ_CHEV = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  function subjLabel() { return D.multi ? TX.allSubj : D.subjectShort(D.sel[0]); }
  function renderSubjBtn() {
    var b = $('#subjBtn'); if (!b) return;
    b.innerHTML = SUBJ_ICON + '<span class="sl">' + esc(subjLabel()) + '</span>' + SUBJ_CHEV;
    b.setAttribute('aria-label', TX.subjPick + ': ' + subjLabel());
    b.setAttribute('aria-expanded', String(state.subjOpen));
    var m = $('#subjMenu'); m.hidden = !state.subjOpen;
    if (state.subjOpen && m.dataset.l !== lang + state.subject) {
      m.dataset.l = lang + state.subject;
      var items = [['all', TX.allSubj, TX.allSubjSub]].concat(EBA.ids().map(function (sid) { return [sid, EBA.short(sid, lang), EBA.make([sid]).topics.length + ' ' + TX.topicsN]; }));
      m.innerHTML = '<p class="sh">' + esc(TX.subjPick) + '</p>' + items.map(function (it, i) {
        return (i === 1 ? '<hr>' : '') + '<button type="button" class="si" data-subj="' + it[0] + '" aria-pressed="' + (state.subject === it[0]) + '"><b>' + esc(it[1]) + '</b><small>' + esc(it[2]) + '</small></button>';
      }).join('');
    }
  }
  function setSubjOpen(on) {
    state.subjOpen = !!on; if (on) { state.help = false; $('#subjMenu').dataset.l = ''; }
    ui();
    if (on) { var p = $('#subjMenu .si[aria-pressed="true"]') || $('#subjMenu .si'); if (p) p.focus({ preventScroll: true }); }
  }
  function setSubject(s, fromHash) {
    if (!(s === 'all' || EBA.reg[s]) || s === state.subject) { state.subjOpen = false; ui(); return; }
    state.sel = null; state.help = false; state.query = ''; state.open = false; state.filter = 'all'; state.scope = 'filter'; state.subjOpen = false; state.atlasSub = null; state.bridges = false;
    state.subject = s; D = dataFor(s); D.setLang(lang);
    try { localStorage.setItem(SUBJ_KEY, s); } catch (e) {}
    try { var q = location.search.replace(/([?&])ders=[a-z]*&?/, '$1').replace(/[?&]$/, ''); q += (q ? '&' : '?') + 'ders=' + s; history.replaceState(history.state, '', location.pathname + q + (fromHash ? location.hash : '')); } catch (e) {}
    if (!fromHash) setHash(null);
    renderStatic();
    var lb = $('#listView .lbody'); if (lb) lb.innerHTML = D.listHTML();
    $('#panel').innerHTML = '';
    applyFilterViews(); rebuildScene(); ui();
    announce(TX.subjNow(subjLabel()));
  }

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
    // düzen, three.js inerken arka planda hesaplanır
    var lay = runLayout(layoutJob());
    (async function () {
      var T = null;
      for (var i = 0; i < THREE_URLS.length && !T; i++) { try { T = await import(THREE_URLS[i]); } catch (e) { console.warn('three yüklenemedi', THREE_URLS[i]); } }
      if (T) await lay;
      if (done) return;
      done = true; clearTimeout(timer);
      if (!T) { failGL('three yok'); if (start) select(start, true); return; }
      try {
        THREE_MOD = T; makeScene();
        $('#loading').hidden = true;
        state.ready = true; ui();
        if (start) setTimeout(function () { select(start, true); }, 500);
      } catch (e) { console.error(e); failGL('sahne kurulamadı'); if (start) select(start, true); }
    })();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
