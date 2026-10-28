// Yazılıya hazırlık verisini OGM Materyal'den (herkese açık, girişsiz) doğrular ve yazili-data.js'i üretir.
// Kaynaklar: yazili-kaynak.json (siteden toplanan PDF dizini) + yazili/<ders>.json (konu eşlemesi).
// PDF'leri kopyalamaz: yalnızca bağlantıları tutar. Her PDF'in açıldığını ve öğrenme çıktısı kodlarının
// kayıtlı listeyle aynı kaldığını kontrol eder (pdftotext varsa). Kullanım: node yazili-cek.js [--hizli]
const fs = require('fs');
const { execFileSync } = require('child_process');
global.window = {};
require('./eba-core.js'); global.EBA = window.EBA;
fs.readdirSync('subjects').filter(f => /\.js$/.test(f)).forEach(f => require('./subjects/' + f));
const K = JSON.parse(fs.readFileSync('yazili-kaynak.json', 'utf8'));
const fast = process.argv.includes('--hizli');
const OGM = { biyoloji: 'Biyoloji', matematik: 'Matematik', kimya: 'Kimya', fizik: 'Fizik', edebiyat: 'Türk Dili ve Edebiyatı', cografya: 'Coğrafya', felsefe: 'Felsefe', ingilizce: 'İngilizce' };

let pdftotext = !fast;
if (pdftotext) try { execFileSync('pdftotext', ['-v'], { stdio: 'ignore' }); } catch (e) { pdftotext = e.code !== 'ENOENT'; }
if (!fast && !pdftotext) console.warn('pdftotext yok: kod karşılaştırması atlanacak.');
const CODE = /[A-Z]{2,5}\.(?:9|10|11|12)\.\d+\.[A-Z]*\d+/g;

(async () => {
  let bad = 0;
  const subjects = {};
  for (const id of EBA.ids()) {
    const f = 'yazili/' + id + '.json';
    if (!fs.existsSync(f) || !OGM[id]) continue;
    const D = EBA.make([id]), frag = JSON.parse(fs.readFileSync(f, 'utf8')), ders = K.ders[OGM[id]] || {};
    const out = [], grades = new Set();
    for (const e of frag.exams) {
      const tag = id + ' ' + e.grade + '. sınıf ' + e.donem + '. dönem ' + e.yazili + '. yazılı';
      const guid = ((ders[e.grade] || {}).pdf || [])[(e.donem - 1) * 2 + (e.yazili - 1)];
      if (!guid) { console.error('HATA ' + tag + ': kaynak dizinde PDF yok'); bad++; continue; }
      e.topics.forEach(t => { const k = D.byId[t]; if (!k || k.grade !== e.grade) { console.error('HATA ' + tag + ': geçersiz konu ' + t); bad++; } });
      const url = K.cdn + guid + '/pdf.pdf';
      if (!fast) {
        try {
          const r = await fetch(url), buf = Buffer.from(await r.arrayBuffer());
          if (!(r.ok && buf.slice(0, 4).toString() === '%PDF')) { console.error('HATA ' + tag + ': PDF açılmadı (' + r.status + ')'); bad++; }
          else if (pdftotext) {
            fs.writeFileSync('.yz.tmp.pdf', buf);
            const txt = execFileSync('pdftotext', ['-layout', '.yz.tmp.pdf', '-'], { maxBuffer: 1 << 26 }).toString('latin1');
            const kodlar = [...new Set(txt.match(CODE) || [])].sort(), beklenen = (e.kodlar || []).slice().sort();
            if (kodlar.some(k => beklenen.indexOf(k) < 0)) { console.warn('UYARI ' + tag + ': PDF içeriği değişmiş olabilir.\n  şimdi:   ' + kodlar.join(' ') + '\n  kayıtlı: ' + beklenen.join(' ')); bad++; }
          }
        } catch (err) { console.error('HATA ' + tag + ': ' + err.message); bad++; }
      }
      out.push({ grade: e.grade, donem: e.donem, yazili: e.yazili, url, topics: e.topics }); grades.add(e.grade);
    }
    const materyal = {}; [...grades].forEach(g => { materyal[g] = K.site + '/dersler-cepte?sinif=' + g + '&ders=' + encodeURIComponent(OGM[id]); });
    subjects[id] = { materyal, exams: out };
    console.log('ok   ' + id + ': ' + out.length + ' yazılı');
  }
  try { fs.unlinkSync('.yz.tmp.pdf'); } catch (e) { }
  const data = { checked: new Date().toISOString().slice(0, 10), subjects };
  fs.writeFileSync('yazili-data.js', '// Üretilmiştir: node yazili-cek.js (kaynak: yazili-kaynak.json, yazili/*.json). Elle düzenleme.\nwindow.EBA_YAZILI = ' + JSON.stringify(data, null, 1) + ';\n');
  console.log(bad ? bad + ' sorun var; yazili-data.js yine de yazıldı, kontrol edin.' : 'Tamam: yazili-data.js yazıldı.');
  process.exit(bad ? 1 : 0);
})();
