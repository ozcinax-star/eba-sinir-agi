// Yazılıya hazırlık verisini OGM Materyal'den (herkese açık, girişsiz) doğrular ve yazili-data.js'i üretir.
// PDF'leri kopyalamaz: yalnızca bağlantıları tutar. Her PDF'in açıldığını ve öğrenme çıktısı kodlarının
// yazili.json'daki listeyle aynı kaldığını kontrol eder (pdftotext varsa). Kullanım: node yazili-cek.js
const fs = require('fs');
const { execFileSync } = require('child_process');
global.window = {};
require('./eba-data.js');
const D = window.EBA_DATA;
const src = JSON.parse(fs.readFileSync('yazili.json', 'utf8'));

let pdftotext = true;
try { execFileSync('pdftotext', ['-v'], { stdio: 'ignore' }); } catch (e) { pdftotext = e.code !== 'ENOENT'; }
if (!pdftotext) console.warn('pdftotext yok: kod karşılaştırması atlanacak, yalnızca erişim denetlenecek.');

(async () => {
  let bad = 0;
  const out = [];
  for (const e of src.exams) {
    const id = e.grade + '. sınıf ' + e.donem + '. dönem ' + e.yazili + '. yazılı';
    const url = src.cdn + e.pdf + '/pdf.pdf';
    for (const t of e.topics) {
      const k = D.byId[t];
      if (!k || k.grade !== e.grade) { console.error('HATA ' + id + ': geçersiz konu ' + t); bad++; }
    }
    let ok = false;
    try {
      const r = await fetch(url);
      const buf = Buffer.from(await r.arrayBuffer());
      ok = r.ok && buf.slice(0, 4).toString() === '%PDF';
      if (!ok) console.error('HATA ' + id + ': PDF açılmadı (' + r.status + ')');
      else if (pdftotext) {
        fs.writeFileSync('.yz.tmp.pdf', buf);
        const txt = execFileSync('pdftotext', ['-layout', '.yz.tmp.pdf', '-'], { maxBuffer: 1 << 26 }).toString('latin1');
        const kodlar = [...new Set(txt.match(/B\w?Y\.\d+\.\d+\.\d+/g) || [])].sort();
        const beklenen = e.kodlar.slice().sort();
        if (kodlar.join() !== beklenen.join()) { console.warn('UYARI ' + id + ': PDF içeriği değişmiş olabilir.\n  şimdi:   ' + kodlar.join(' ') + '\n  kayıtlı: ' + beklenen.join(' ')); bad++; }
        else console.log('ok   ' + id + ' (' + kodlar.length + ' çıktı kodu)');
      } else console.log('ok   ' + id);
    } catch (err) { console.error('HATA ' + id + ': ' + err.message); ok = false; }
    if (!ok) bad++;
    out.push({ grade: e.grade, donem: e.donem, yazili: e.yazili, url, topics: e.topics });
  }
  try { fs.unlinkSync('.yz.tmp.pdf'); } catch (e) { }
  const data = { checked: new Date().toISOString().slice(0, 10), materyal: src.materyal, yazili: src.yazili, exams: out };
  fs.writeFileSync('yazili-data.js', '// Üretilmiştir: node yazili-cek.js (kaynak: yazili.json). Elle düzenleme.\nwindow.EBA_YAZILI = ' + JSON.stringify(data, null, 1) + ';\n');
  console.log(bad ? bad + ' sorun var; yazili-data.js yine de yazıldı, kontrol edin.' : 'Tamam: yazili-data.js yazıldı.');
  process.exit(bad ? 1 : 0);
})();
