// Kullanım: node tools/validate-cross.js
// Dersler arası bağlantıları (subjects/_cross.js → EBA.cross) bütün ders dosyalarıyla birlikte denetler.
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'eba-core.js')); global.EBA = window.EBA;
const dir = path.join(root, 'subjects');
// önce dersler, en son dersler arası dosyalar (_ ile başlayanlar)
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort((a, b) => (a[0] === '_') - (b[0] === '_') || a.localeCompare(b));
files.forEach(f => require(path.join(dir, f)));

const errs = [], warns = [];
let D;
try { D = EBA.make(EBA.ids()); } catch (e) { console.error('HATA:', e.message); process.exit(1); }
D.missing().forEach(m => errs.push('eksik: ' + m));
const cross = EBA.reg._cross || [];
if (!cross.length) errs.push('dersler arası bağlantı yok (EBA.cross çağrılmamış)');

const TYPES = { on: 1, kol: 1, ilg: 1 }, MAX = 130;
const gv = g => g === 'O' ? 8 : +g;
const order = id => EBA.reg[id].order;
const seen = new Set(), pairs = {}, perSub = {};
cross.forEach((l, i) => {
  const at = '#' + (i + 1) + ' ' + l[0] + '>' + l[1];
  if (!Array.isArray(l) || l.length < 5) { errs.push(at + ': 5 alanlı dizi olmalı'); return; }
  const [from, to, type, rTr, rEn] = l, a = D.byId[from], b = D.byId[to];
  if (!a) errs.push(at + ': bilinmeyen konu ' + from);
  if (!b) errs.push(at + ': bilinmeyen konu ' + to);
  if (!TYPES[type]) errs.push(at + ': geçersiz tür ' + type);
  [['TR', rTr], ['EN', rEn]].forEach(([lg, r]) => {
    if (typeof r !== 'string' || !r.trim()) errs.push(at + ': boş gerekçe (' + lg + ')');
    else if (r.length > MAX) errs.push(at + ': uzun gerekçe ' + lg + ' (' + r.length + ')');
  });
  const k = [from, to].sort().join('|');
  if (seen.has(k)) errs.push(at + ': yinelenen çift'); seen.add(k);
  if (!a || !b) return;
  if (a.subject === b.subject) { errs.push(at + ': iki konu aynı derste (' + a.subject + ')'); return; }
  if ((type === 'on' || type === 'kol') && gv(a.grade) > gv(b.grade)) errs.push(at + ': geriye giden bağlantı (' + a.grade + ' > ' + b.grade + ')');
  const [s1, s2] = order(a.subject) < order(b.subject) ? [a.subject, b.subject] : [b.subject, a.subject];
  const p = pairs[s1 + '|' + s2] = pairs[s1 + '|' + s2] || { s1, s2, on: 0, kol: 0, ilg: 0, n: 0 };
  if (TYPES[type]) p[type]++; p.n++;
  [a, b].forEach(t => {
    const s = perSub[t.subject] = perSub[t.subject] || { n: 0, grades: {} };
    s.n++; s.grades[t.grade] = (s.grades[t.grade] || 0) + 1;
  });
});

// ön koşul/kolaylaştırıcı döngüsü: ders içi + dersler arası bağlantılar birlikte
const adj = {};
D.links.filter(l => l.type === 'on' || l.type === 'kol').forEach(l => (adj[l.from] = adj[l.from] || []).push(l.to));
const st = {}, stack = [], cyc = [];
const walk = u => {
  st[u] = 1; stack.push(u);
  for (const v of adj[u] || []) {
    if (st[v] === 1) cyc.push(stack.slice(stack.indexOf(v)).concat(v).join(' > '));
    else if (!st[v]) walk(v);
  }
  stack.pop(); st[u] = 2;
};
D.topics.forEach(t => { if (!st[t.id]) walk(t.id); });
cyc.forEach(c => errs.push('döngü: ' + c));

// tablo
const pad = (s, n) => String(s).padEnd(n), num = (s, n) => String(s).padStart(n);
const nm = id => EBA.short(id, 'tr');
const rows = Object.values(pairs).sort((x, y) => order(x.s1) - order(y.s1) || order(x.s2) - order(y.s2));
console.log(pad('Ders çifti', 28) + num('on', 4) + num('kol', 5) + num('ilg', 5) + num('top', 5));
const tot = { on: 0, kol: 0, ilg: 0, n: 0 };
rows.forEach(p => {
  console.log(pad(nm(p.s1) + ' – ' + nm(p.s2), 28) + num(p.on, 4) + num(p.kol, 5) + num(p.ilg, 5) + num(p.n, 5));
  ['on', 'kol', 'ilg', 'n'].forEach(k => tot[k] += p[k]);
});
console.log(pad('TOPLAM (' + rows.length + ' çift)', 28) + num(tot.on, 4) + num(tot.kol, 5) + num(tot.ilg, 5) + num(tot.n, 5));
console.log('');
console.log('Derslere göre (bağlantı sayısı · sınıflara göre uç sayısı):');
EBA.ids().forEach(id => {
  const s = perSub[id] || { n: 0, grades: {} };
  const all = [...new Set(D.topics.filter(t => t.subject === id).map(t => t.grade))].sort((x, y) => gv(x) - gv(y));
  const miss = all.filter(g => !s.grades[g]);
  console.log('  ' + pad(nm(id), 12) + num(s.n, 4) + '  ' + all.map(g => g + ':' + (s.grades[g] || 0)).join(' '));
  if (s.n < 12) warns.push(nm(id) + ': 12’den az dersler arası bağlantı (' + s.n + ')');
  if (miss.length) warns.push(nm(id) + ': dersler arası bağlantısı olmayan sınıf ' + miss.join(', '));
});
console.log('');
warns.forEach(w => console.log('uyarı: ' + w));
errs.slice(0, 40).forEach(e => console.log('HATA: ' + e)); if (errs.length > 40) console.log('… ' + (errs.length - 40) + ' hata daha');
console.log(errs.length ? 'SONUÇ: ' + errs.length + ' hata' : 'SONUÇ: geçti (' + cross.length + ' bağlantı)');
process.exit(errs.length ? 1 : 0);
