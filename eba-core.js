// EBA harita çekirdeği: ders verilerini (subjects/*.js) kaydeder, seçilen derslerden tek bir veri nesnesi kurar.
// Bir ders dosyası EBA.register({...}) çağırır; sözleşme için bkz. subjects/README.md.
(function () {
  var T = 'https://tymm.meb.gov.tr';
  var reg = {}, ids = [];

  function register(def) {
    reg[def.id] = def; every = null; allLinks = null;
    if (ids.indexOf(def.id) < 0) ids.push(def.id);
    ids.sort(function (a, b) { return reg[a].order - reg[b].order; });
  }
  /* kayıtlı tüm derslerin konuları (hangi dersler seçili olursa olsun): dersler arası bağların öbür ucu için.
     ord: ders sırası + programdaki sıra */
  var every = null;
  function topicInfo(id) {
    if (!every) {
      every = {}; var n = 0;
      ids.forEach(function (sid) {
        var th = {}; reg[sid].themes.forEach(function (t) { th[t.id] = t; });
        reg[sid].topics.forEach(function (r) { every[r[0]] = { id: r[0], subject: sid, grade: th[r[1]].grade, names: { tr: r[2], en: r[5] }, ord: n++ }; });
      });
    }
    return every[id];
  }
  /* kayıttaki bütün bağlar (ders içi + dersler arası), seçimden bağımsız */
  var allLinks = null;
  function everyLink() {
    if (!allLinks) {
      allLinks = [];
      ids.forEach(function (sid) { allLinks.push.apply(allLinks, reg[sid].links); });
      allLinks = allLinks.concat(reg._cross || []);
    }
    return allLinks;
  }
  function gradeVal(g) { return g === 'O' ? 8 : +g; }

  var NT = '(yeni sekmede açılır)', NT_EN = '(opens in a new tab)';
  var GEN = {
    tr: { locale: 'tr', mid: 'Ortaokul', grade: function (g) { return g + '. sınıf'; }, checkedAt: 'Ekim 2026',
      midProgram: function (sub, c) { return sub + ' öğretim programı (' + c + ')'; }, notVerified: 'Bağlantı henüz doğrulanmadı',
      book: function (sub, g) { return sub + ' ' + g + '. sınıf ders kitabı'; }, notPublished: 'Henüz yayımlanmadı',
      outcomes: function (th) { return th + ' teması · öğrenme çıktıları'; }, support: function (g) { return g + '. sınıf destekleme etkinlikleri'; },
      qbank: 'Kazanım bazlı soru bankası', programTitle: function (sub) { return sub + ' dersi öğretim programı (PDF)'; },
      lead: 'Harita ile aynı konular, aynı sırayla. Bir konuya dokunursan ön koşulları, sonraki konuları ve resmî kaynakları görürsün.',
      themePage: 'Resmî tema sayfası', newTab: NT, source: 'Kaynak', programLink: 'Öğretim programı (PDF)',
      curriculum: function (sub) { return 'Türkiye Yüzyılı Maarif Modeli · ' + sub + ' Dersi Öğretim Programı (2026)'; }, multi: 'Türkiye Yüzyılı Maarif Modeli · Tüm dersler' },
    en: { locale: 'en', mid: 'Middle school', grade: function (g) { return 'Grade ' + g; }, checkedAt: 'October 2026',
      midProgram: function (sub, c) { return sub + ' curriculum (' + c + ')'; }, notVerified: 'Link not verified yet',
      book: function (sub, g) { return sub + ' grade ' + g + ' textbook (in Turkish)'; }, notPublished: 'Not published yet',
      outcomes: function (th) { return th + ' theme · learning outcomes (in Turkish)'; }, support: function (g) { return 'Grade ' + g + ' support activities (in Turkish)'; },
      qbank: 'Question bank by learning outcome (in Turkish)', programTitle: function (sub) { return sub + ' curriculum (PDF, in Turkish)'; },
      lead: 'The same topics as the map, in the same order. Tap a topic to see its prerequisites, next topics and official resources.',
      themePage: 'Official theme page (in Turkish)', newTab: NT_EN, source: 'Source', programLink: 'Curriculum (PDF, in Turkish)',
      curriculum: function (sub) { return 'Türkiye Yüzyılı Maarif Modeli · ' + sub + ' Curriculum (2026)'; }, multi: 'Türkiye Yüzyılı Maarif Modeli · All subjects' }
  };

  /* Türkçe karakter toleransı: hucre = hücre, ogrenme = öğrenme */
  function norm(s) {
    return (s || '').toLocaleLowerCase('tr').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u')
      .replace(/[’'()·,.\-–]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* sel: ders kimlikleri dizisi (sırayla birleştirilir) */
  function make(sel) {
    sel = (sel && sel.length ? sel : ids).filter(function (id) { return reg[id]; });
    var multi = sel.length > 1, api = { lang: 'tr' };
    var themes = [], topics = [], links = [], byId = {}, themeById = {}, subs = [];

    sel.forEach(function (sid) {
      var def = reg[sid]; subs.push(def);
      def.themes.forEach(function (th) {
        if (themeById[th.id]) throw new Error('yinelenen tema: ' + th.id);
        var t = { id: th.id, grade: th.grade, url: th.url, subject: sid, names: { tr: th.name.tr, en: th.name.en } };
        themes.push(t); themeById[t.id] = t;
      });
      def.topics.forEach(function (r) {
        var th = themeById[r[1]];
        if (!th || th.subject !== sid) throw new Error('bilinmeyen tema ' + r[1] + ' (' + r[0] + ')');
        if (byId[r[0]]) throw new Error('yinelenen konu: ' + r[0]);
        var t = { id: r[0], theme: r[1], grade: th.grade, subject: sid, i18n: { tr: { name: r[2], summary: r[4] }, en: { name: r[5], summary: r[6] } }, codeTr: r[3], codeEn: r[7] || r[3] };
        topics.push(t); byId[t.id] = t;
      });
      def.links.forEach(function (l) {
        if (!byId[l[0]] || !byId[l[1]] || byId[l[0]].subject !== sid || byId[l[1]].subject !== sid) return;
        links.push({ from: l[0], to: l[1], type: l[2], reasons: { tr: l[3], en: l[4] } });
      });
    });
    // dersler arası bağlantılar (yalnızca ilgili iki ders de seçiliyse)
    (reg._cross || []).forEach(function (l) {
      if (byId[l[0]] && byId[l[1]] && byId[l[0]].subject !== byId[l[1]].subject) links.push({ from: l[0], to: l[1], type: l[2], reasons: { tr: l[3], en: l[4] } });
    });

    function gradeName(g) { var S = GEN[api.lang]; return g === 'O' ? S.mid : S.grade(g); }
    function subName(id) { return reg[id].name[api.lang]; }
    function subShort(id) { var d = reg[id]; return (d.short || d.name)[api.lang]; }

    function setLang(lang) {
      lang = GEN[lang] ? lang : 'tr';
      var S = GEN[lang], other = lang === 'tr' ? 'en' : 'tr';
      api.lang = lang;
      themes.forEach(function (th) { th.name = th.names[lang]; });
      topics.forEach(function (t) {
        var o = t.i18n[lang];
        t.name = o.name; t.summary = o.summary; t.alt = t.i18n[other].name;
        t.code = lang === 'en' ? t.codeEn : t.codeTr; t.themeName = themeById[t.theme].name;
        t.subjectName = subName(t.subject); t.subjectShort = subShort(t.subject);
        t.gradeLabel = t.grade === 'O' ? S.mid + ' · ' + t.code : S.grade(t.grade);
      });
      links.forEach(function (l) { l.reason = l.reasons[lang]; });
      api.curriculum = multi ? S.multi : S.curriculum(subName(sel[0])); api.checkedAt = S.checkedAt;
      return lang;
    }

    /* Eksik ya da hatalı veri (build.js derlemeyi durdurur) */
    function missing() {
      var out = [], types = { on: 1, kol: 1, ilg: 1 };
      themes.forEach(function (t) { if (!t.names.tr || !t.names.en) out.push('tema ' + t.id); });
      topics.forEach(function (t) { if (!t.i18n.en.name || !t.i18n.en.summary || !t.i18n.tr.name || !t.i18n.tr.summary || !t.codeTr) out.push('konu ' + t.id); });
      links.forEach(function (l) { if (!types[l.type]) out.push('bağlantı türü ' + l.from + '>' + l.to); if (!l.reasons.tr || !l.reasons.en) out.push('bağlantı ' + l.from + '>' + l.to); });
      return out;
    }

    function resources(id) {
      var t = byId[id], th = themeById[t.theme], def = reg[t.subject], out = [], S = GEN[api.lang], sub = subName(t.subject);
      if (t.grade === 'O') {
        out.push({ title: S.midProgram(def.mid ? def.mid[api.lang] : sub, t.code), source: 'MEB', verified: false, note: S.notVerified });
        return out;
      }
      var b = (def.books || {})[t.grade];
      if (b && b.url) out.push({ title: S.book(sub, t.grade), source: 'MEB · TYMM', url: b.url, verified: true });
      else out.push({ title: S.book(sub, t.grade), source: 'MEB · TYMM', verified: false, note: S.notPublished });
      if (th.url) out.push({ title: S.outcomes(th.name), source: 'MEB · TYMM', url: th.url, verified: true });
      if (b && b.sup) out.push({ title: S.support(t.grade), source: 'MEB · TYMM', url: b.sup, verified: true });
      if (def.qbank && def.qbank[t.grade]) out.push({ title: S.qbank, source: 'EBA · OGM Materyal', url: def.qbank[t.grade], verified: true });
      if (def.program && def.program.pdf) out.push({ title: S.programTitle(sub), source: 'MEB · TYMM', url: def.program.pdf, verified: true });
      return out;
    }

    /* Konu dizini (index.html içindeki statik liste; build.js ve dil değişiminde app.js kullanır) */
    function listHTML() {
      var S = GEN[api.lang], sr = '<span class="sr"> ' + S.newTab + '</span>';
      var h = '        <p class="lead">' + S.lead + '</p>\n';
      subs.forEach(function (def) {
        if (multi) h += '        <h2 class="subj">' + esc(def.name[api.lang]) + '</h2>\n';
        themes.filter(function (t) { return t.subject === def.id; }).forEach(function (t) {
          h += '        <h3>' + esc(t.name) + ' <small>' + esc(gradeName(t.grade).toLocaleUpperCase(S.locale)) + '</small>' + (t.url ? ' <a class="off" href="' + t.url + '" target="_blank" rel="noopener">' + S.themePage + sr + '</a>' : '') + '</h3>\n        <ul>\n';
          topics.filter(function (x) { return x.theme === t.id; }).forEach(function (x) {
            h += '          <li><a class="t" href="#konu=' + x.id + '"><b>' + esc(x.name) + '</b><span>' + esc(x.code) + '</span><p>' + esc(x.summary) + '</p></a></li>\n';
          });
          h += '        </ul>\n';
        });
        if (def.program && def.program.pdf) h += '        <p class="foot">' + S.source + ': ' + esc(S.curriculum(def.name[api.lang])) + '. <a href="' + def.program.pdf + '" target="_blank" rel="noopener">' + S.programLink + sr + '</a></p>\n';
      });
      return h;
    }

    // Bir konunun çevresi: ön koşul, kolaylaştıran, sonraki, ilgili, ortaokul temeli
    function neighbors(id) {
      var r = { pre: [], kol: [], next: [], rel: [], base: [] };
      links.forEach(function (l) {
        var other, item;
        if (l.to === id && (l.type === 'on' || l.type === 'kol')) {
          other = byId[l.from]; item = { topic: other, reason: l.reason, type: l.type };
          if (other.grade === 'O') r.base.push(item); else if (l.type === 'on') r.pre.push(item); else r.kol.push(item);
        } else if (l.from === id && (l.type === 'on' || l.type === 'kol')) {
          r.next.push({ topic: byId[l.to], reason: l.reason, type: l.type });
        } else if (l.type === 'ilg' && (l.from === id || l.to === id)) {
          r.rel.push({ topic: byId[l.from === id ? l.to : l.from], reason: l.reason, type: 'ilg' });
        }
      });
      return r;
    }

    /* konunun öbür derslerle bağları; seçili derslerden bağımsız, tek ders görünümünde de çalışır.
       kind: pre (öbür dersten ön koşul), kol (öbür dersten destek), next (öbür derste kullanılır), rel (ilgili) */
    var KIND_ORDER = { pre: 0, kol: 1, next: 2, rel: 3 };
    function crossOf(id) {
      var me = topicInfo(id), out = [];
      if (!me) return out;
      (reg._cross || []).forEach(function (l) {
        var dir = l[0] === id ? 'out' : l[1] === id ? 'in' : null; if (!dir) return;
        var o = topicInfo(dir === 'out' ? l[1] : l[0]); if (!o || o.subject === me.subject) return;
        var kind = l[2] === 'ilg' ? 'rel' : dir === 'out' ? 'next' : l[2] === 'on' ? 'pre' : 'kol';
        out.push(infoOf(o.id, { kind: kind, reason: reasonOf(l) }));
      });
      return out.sort(function (a, b) { return KIND_ORDER[a.kind] - KIND_ORDER[b.kind]; });
    }
    /* kayıttaki herhangi bir konunun (seçili olmasa da) kısa bilgisi */
    function infoOf(id, extra) {
      var o = topicInfo(id), S = GEN[api.lang], r = { id: o.id, subject: o.subject, subjectShort: subShort(o.subject), name: o.names[api.lang], grade: o.grade,
        gradeLabel: o.grade === 'O' ? S.mid : S.grade(o.grade) };
      for (var k in extra) r[k] = extra[k];
      return r;
    }
    function reasonOf(l) { return api.lang === 'en' ? l[4] : l[3]; }
    function byGrade(a, b) { return gradeVal(a.grade) - gradeVal(b.grade) || topicInfo(a.id).ord - topicInfo(b.id).ord; }
    function byOrd(a, b) { return topicInfo(a.id).ord - topicInfo(b.id).ord; }

    /* bir konunun doğrudan ön koşulları (öbür derslerden olanlar dahil), sınıf ve program sırasıyla */
    function prereqsOf(id) {
      var out = [], seen = {};
      everyLink().forEach(function (l) {
        if (l[1] !== id || l[2] !== 'on' || seen[l[0]] || !topicInfo(l[0])) return;
        seen[l[0]] = 1; out.push(infoOf(l[0], { reason: reasonOf(l) }));
      });
      return out.sort(byGrade);
    }

    /* Yazılı Modu çalışma listesi; seçili derslerden bağımsız, tüm kayıt üzerinden.
       pre: yazılı konularının doğrudan ön koşulları · exam: yazılı konuları (verilen sırayla, bilinmeyenler atlanır)
       help: öbür derslerden kolaylaştıranlar (ders sırasıyla) · her maddede for: hizmet ettiği yazılı konuları */
    function studyList(examIds) {
      var ex = {}, exam = [], pre = {}, help = {};
      (examIds || []).forEach(function (id) { if (topicInfo(id) && !(id in ex)) { ex[id] = exam.length; exam.push(infoOf(id)); } });
      everyLink().forEach(function (l) {
        if (!(l[1] in ex) || l[0] in ex || !topicInfo(l[0])) return;
        var bag = l[2] === 'on' ? pre : l[2] === 'kol' && topicInfo(l[0]).subject !== topicInfo(l[1]).subject ? help : null;
        if (!bag) return;
        if (bag[l[0]]) { if (bag[l[0]].for.indexOf(l[1]) < 0) bag[l[0]].for.push(l[1]); }
        else bag[l[0]] = infoOf(l[0], { for: [l[1]], reason: reasonOf(l) });
      });
      function list(bag, cmp) {
        return Object.keys(bag).filter(function (id) { return bag !== help || !pre[id]; }).map(function (id) {
          bag[id].for.sort(function (a, b) { return ex[a] - ex[b]; }); return bag[id];
        }).sort(cmp);
      }
      return { pre: list(pre, byGrade), exam: exam, help: list(help, byOrd) };
    }

    var prefixes = {}; topics.forEach(function (t) { prefixes[norm(t.codeTr).replace(/ /g, '').split(/[0-9]/)[0]] = 1; });
    /* sıralama: tam başlık > başlık başı > başlıkta geçen > kazanım kodu > öbür dildeki başlık > açıklama; eşitlikte lise konusu ortaokuldan önce */
    function search(q, pred) {
      var n = norm(q); if (!n) return [];
      var qc = n.replace(/ /g, ''), codeQ = (/\d/.test(qc) && qc.length >= 3) || (prefixes[qc] === 1 && qc.length >= 2);
      return topics.map(function (t, i) {
        if (pred && !pred(t)) return null;
        var name = norm(t.name), k = name.indexOf(n), s = 0;
        if (name === n) s = 6; else if (k === 0) s = 5; else if (k > 0) s = 4;
        else if (codeQ && (norm(t.code).replace(/ /g, '').indexOf(qc) >= 0 || norm(t.codeTr).replace(/ /g, '').indexOf(qc) >= 0)) s = 3;
        else if (norm(t.alt).indexOf(n) >= 0) s = 2;
        else if (norm(t.summary).indexOf(n) >= 0) s = 1;
        else if (multi && norm(t.subjectName).indexOf(n) >= 0) s = 1;
        return s ? { t: t, s: s, o: t.grade === 'O' ? 1 : 0, i: i } : null;
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s || a.o - b.o || a.i - b.i; }).map(function (x) { return x.t; });
    }

    api.sel = sel; api.multi = multi;
    api.subjects = subs.map(function (d) { return { id: d.id, order: d.order }; });
    api.themes = themes; api.themeById = themeById; api.topics = topics; api.byId = byId; api.links = links;
    api.resources = resources; api.neighbors = neighbors; api.search = search; api.crossOf = crossOf;
    api.infoOf = infoOf; api.prereqsOf = prereqsOf; api.studyList = studyList;
    api.programPdf = subs[0] && subs[0].program ? subs[0].program.pdf : '';
    api.setLang = setLang; api.gradeName = gradeName; api.subjectName = subName; api.subjectShort = subShort; api.listHTML = listHTML; api.missing = missing;
    api.popular = sel.length === 1 ? (reg[sel[0]].popular || []) : [].concat.apply([], subs.map(function (d) { return (d.popular || []).slice(0, 1); }));
    setLang('tr');
    return api;
  }

  window.EBA = {
    register: register, make: make, reg: reg, ids: function () { return ids.slice(); },
    name: function (id, lang) { return reg[id].name[lang || 'tr']; },
    short: function (id, lang) { var d = reg[id]; return (d.short || d.name)[lang || 'tr']; },
    cross: function (arr) { reg._cross = (reg._cross || []).concat(arr); allLinks = null; }
  };
})();
