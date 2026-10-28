// Kullanım: node tools/validate-subject.js subjects/<ders>.js [yazili/<ders>.json]
const fs = require('fs'), path = require('path');
global.window = {};
require(path.resolve('eba-core.js')); global.EBA = window.EBA;
const file = process.argv[2], yz = process.argv[3];
if (!file) { console.error('dosya ver'); process.exit(2); }
require(path.resolve(file));
const id = EBA.ids()[0];
const errs = [], warns = [];
let D;
try { D = EBA.make([id]); } catch (e) { console.error('HATA:', e.message); process.exit(1); }
D.missing().forEach(m => errs.push('eksik: ' + m));
const def = EBA.reg[id];
const ok = /^[a-z0-9_]+$/;
D.topics.forEach(t => {
  if (!ok.test(t.id)) errs.push('kimlik karakteri: ' + t.id);
  if (t.i18n.tr.summary.length > 175) warns.push('uzun özet (' + t.i18n.tr.summary.length + '): ' + t.id);
  if (t.i18n.en.summary.length > 190) warns.push('uzun EN özet: ' + t.id);
  if (t.i18n.tr.name.split(' ').length > 8) warns.push('uzun ad: ' + t.id);
});
const prefixes = new Set(D.topics.map(t => t.id.split('_')[0]));
if (id !== 'biyoloji' && prefixes.size > 1) errs.push('tek önek olmalı: ' + [...prefixes]);
D.themes.forEach(th => { if (!D.topics.some(t => t.theme === th.id)) errs.push('boş tema ' + th.id); if (![9, 10, 11, 12, 'O'].includes(th.grade)) errs.push('tema sınıfı ' + th.id); if (!ok.test(th.id)) errs.push('tema kimliği ' + th.id); });
const deg = {}; D.links.forEach(l => { deg[l.from] = (deg[l.from] || 0) + 1; deg[l.to] = (deg[l.to] || 0) + 1; });
D.topics.forEach(t => { if (!deg[t.id]) errs.push('bağlantısız konu: ' + t.id); });
if (def.links.length !== D.links.length) errs.push('geçersiz uçlu bağlantı: ' + (def.links.length - D.links.length));
const seen = new Set();
def.links.forEach(l => {
  const k = l[0] + '>' + l[1];
  if (seen.has(k)) errs.push('yinelenen bağlantı ' + k); seen.add(k);
  if (l[0] === l[1]) errs.push('kendine bağlantı ' + k);
  if (l[3].length > 140 || l[4].length > 150) warns.push('uzun gerekçe ' + k);
});
// ön koşul/kolaylaştırıcı döngüsü ve sınıf yönü
const adj = {}; D.links.filter(l => l.type !== 'ilg').forEach(l => (adj[l.from] = adj[l.from] || []).push(l.to));
const st = {}, cyc = [];
const walk = u => { st[u] = 1; for (const v of adj[u] || []) { if (st[v] === 1) cyc.push(u + '>' + v); else if (!st[v]) walk(v); } st[u] = 2; };
D.topics.forEach(t => { if (!st[t.id]) walk(t.id); });
if (cyc.length) errs.push('döngü: ' + cyc.slice(0, 5).join(', '));
const gv = g => g === 'O' ? 8 : +g;
D.links.filter(l => l.type !== 'ilg').forEach(l => { if (gv(D.byId[l.from].grade) > gv(D.byId[l.to].grade)) errs.push('geriye giden bağlantı ' + l.from + '>' + l.to); });
(def.popular || []).forEach(p => { if (!D.byId[p]) errs.push('popular yok: ' + p); });
if ((def.popular || []).length !== 4) warns.push('popular 4 olmalı');
const byGrade = {}; D.topics.forEach(t => byGrade[t.grade] = (byGrade[t.grade] || 0) + 1);
if (yz) {
  const Y = JSON.parse(fs.readFileSync(yz, 'utf8')), seenE = new Set();
  (Y.exams || []).forEach(e => {
    const k = e.grade + '-' + e.donem + '-' + e.yazili; if (seenE.has(k)) errs.push('yinelenen yazılı ' + k); seenE.add(k);
    if (!e.topics || !e.topics.length) warns.push('konusuz yazılı ' + k);
    (e.topics || []).forEach(t => { if (!D.byId[t]) errs.push('yazılı ' + k + ': bilinmeyen konu ' + t); else if (D.byId[t].grade !== e.grade) errs.push('yazılı ' + k + ': sınıf uyuşmuyor ' + t); });
  });
  console.log('yazılı: ' + (Y.exams || []).length + ' giriş');
}
console.log(id + ': ' + D.themes.length + ' tema, ' + D.topics.length + ' konu, ' + D.links.length + ' bağlantı (' + (D.links.length / D.topics.length).toFixed(2) + '/konu); sınıflara göre ' + JSON.stringify(byGrade));
warns.slice(0, 15).forEach(w => console.log('uyarı: ' + w)); if (warns.length > 15) console.log('… ' + (warns.length - 15) + ' uyarı daha');
errs.slice(0, 30).forEach(e => console.log('HATA: ' + e)); if (errs.length > 30) console.log('… ' + (errs.length - 30) + ' hata daha');
process.exit(errs.length ? 1 : 0);
