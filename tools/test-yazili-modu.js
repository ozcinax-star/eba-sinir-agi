// Kullanım: node tools/test-yazili-modu.js
// Yazılı Modu çalışma listesini (EBA.make().studyList / prereqsOf) bütün yazılılar üzerinde denetler.
const fs = require('fs'), path = require('path'), assert = require('assert');
const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'eba-core.js')); global.EBA = window.EBA;
const dir = path.join(root, 'subjects');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort((a, b) => (a[0] === '_') - (b[0] === '_') || a.localeCompare(b));
files.forEach(f => require(path.join(dir, f)));
require(path.join(root, 'yazili-data.js'));
const Y = window.EBA_YAZILI;

const all = [].concat(...EBA.ids().map(s => EBA.reg[s].links), EBA.reg._cross);
const sub = {}, ord = {}; let n = 0;
EBA.ids().forEach(s => EBA.reg[s].topics.forEach(r => { sub[r[0]] = s; ord[r[0]] = n++; }));
const gv = g => g === 'O' ? 8 : +g;
const sorted = (arr, key) => arr.every((x, i) => !i || key(arr[i - 1]) <= key(x));

let checked = 0, fails = 0;
const test = (name, fn) => { try { fn(); checked++; } catch (e) { fails++; console.error('BAŞARISIZ ' + name + ': ' + e.message); } };

// Tek ders görünümünde de tüm kayıt üzerinden çalışmalı: her yazılı kendi dersinin verisiyle denenir
Object.keys(Y.subjects).forEach(sid => {
  const D = EBA.make([sid]);
  Y.subjects[sid].exams.filter(e => e.topics && e.topics.length).forEach(e => {
    const at = sid + ' ' + e.grade + '-' + e.donem + '-' + e.yazili;
    test(at, () => {
      const L = D.studyList(e.topics), ex = new Set(e.topics);
      assert.deepStrictEqual(L.exam.map(t => t.id), e.topics.filter((id, i) => sub[id] && e.topics.indexOf(id) === i), 'yazılı konuları verilen sırada');
      const ids = L.pre.concat(L.exam, L.help).map(t => t.id);
      assert.strictEqual(new Set(ids).size, ids.length, 'yinelenen madde');
      L.pre.forEach(t => {
        assert.ok(!ex.has(t.id), t.id + ' yazılı konusu ama ön koşulda');
        assert.ok(t.for.length && t.for.every(x => ex.has(x)), t.id + ' için hizmet ettiği konu yok');
        t.for.forEach(x => assert.ok(all.some(l => l[0] === t.id && l[1] === x && l[2] === 'on'), t.id + '>' + x + ' ön koşul bağı yok'));
      });
      L.help.forEach(t => {
        assert.notStrictEqual(t.subject, sid, t.id + ' yardımcı ama aynı dersten');
        t.for.forEach(x => assert.ok(all.some(l => l[0] === t.id && l[1] === x && l[2] === 'kol'), t.id + '>' + x + ' kolaylaştırır bağı yok'));
      });
      // eksiksiz: yazılı konusuna gelen her doğrudan ön koşul listede
      all.filter(l => l[2] === 'on' && ex.has(l[1]) && !ex.has(l[0]) && sub[l[0]]).forEach(l => assert.ok(L.pre.some(t => t.id === l[0]), l[0] + ' ön koşulu eksik'));
      assert.ok(sorted(L.pre, t => gv(t.grade) * 1e4 + ord[t.id]), 'ön koşullar sınıf ve program sırasında değil');
      assert.ok(sorted(L.help, t => EBA.reg[t.subject].order * 1e4 + ord[t.id]), 'yardımcılar ders sırasında değil');
      L.pre.concat(L.exam, L.help).forEach(t => assert.ok(t.name && t.gradeLabel && t.subjectShort, t.id + ' adı/etiketi eksik'));
    });
  });
});

test('bilinen örnek: kimya 9-1-1', () => {
  const e = Y.subjects.kimya.exams.find(x => x.grade === 9 && x.donem === 1 && x.yazili === 1);
  const L = EBA.make(['kimya']).studyList(e.topics);
  assert.strictEqual(L.exam.length, 5); assert.strictEqual(L.pre.length, 1);
});
test('prereqsOf: doğrudan ön koşullar, öbür dersten olanlar dahil', () => {
  const D = EBA.make(['kimya']);
  const x = EBA.reg._cross.find(l => l[2] === 'on');
  const P = EBA.make([sub[x[1]]]).prereqsOf(x[1]);
  assert.ok(P.some(t => t.id === x[0] && t.reason), 'öbür dersten ön koşul ' + x[0] + ' yok');
  D.topics.forEach(t => D.prereqsOf(t.id).forEach(p => assert.ok(all.some(l => l[0] === p.id && l[1] === t.id && l[2] === 'on'))));
});
test('dil: İngilizce adlar', () => {
  const D = EBA.make(['kimya']); D.setLang('en');
  const e = Y.subjects.kimya.exams[0], L = D.studyList(e.topics), r = EBA.reg.kimya.topics.find(r => r[0] === e.topics[0]);
  assert.strictEqual(L.exam[0].name, r[5]);
});
test('bilinmeyen konu atlanır', () => {
  const L = EBA.make(['kimya']).studyList(['yok_boyle', 'kim_mol']);
  assert.deepStrictEqual(L.exam.map(t => t.id), ['kim_mol']);
});

console.log(fails ? fails + ' test başarısız, ' + checked + ' geçti' : 'Tamam: ' + checked + ' test geçti');
process.exit(fails ? 1 : 0);
