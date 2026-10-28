# Ders verisi sözleşmesi

Her ders `subjects/<kimlik>.js` dosyasıdır ve `EBA.register({...})` çağırır (örnek: `subjects/biyoloji.js`).
Doğrulama: `node tools/validate-subject.js subjects/<kimlik>.js [yazili/<kimlik>.json]`

```js
EBA.register({
  id: 'fizik', order: 4,                       // order: arayüzdeki sıra (1 Biyoloji, 2 Matematik, 3 Kimya, 4 Fizik, 5 Edebiyat, 6 Coğrafya, 7 Din, 8 Felsefe, 9 İngilizce)
  name: { tr: 'Fizik', en: 'Physics' },
  mid: { tr: 'Fen Bilimleri', en: 'Science' },  // yalnızca 'O' temalı konu varsa: ortaokul programının adı
  program: { pdf: 'https://tymm.meb.gov.tr/assets/pdf/….pdf' },
  books: { 9: { url: '…/kitap/38/…', sup: '…/kitap/115/…' }, 10: {…}, 11: {…} },  // yalnızca sayfada gördüğün bağlantılar
  popular: ['fiz_x', 'fiz_y', 'fiz_z', 'fiz_w'],     // aramada önerilen 4 konu kimliği
  themes: [ { id: 'fiz_kuvvet', grade: 9, name: { tr: '…', en: '…' }, url: '…(varsa resmî ünite sayfası)' } ],
  topics: [ ['fiz_hiz', 'fiz_kuvvet', 'Hız ve ivme', 'FZ.9.2.1', 'Türkçe özet', 'Speed and acceleration', 'English summary'] ],
  links:  [ ['fiz_hiz', 'fiz_ivme', 'on', 'Türkçe gerekçe', 'English reason'] ]
});
```

## Kurallar
- **Kimlikler** yalnızca `a-z 0-9 _`; tüm derslerde benzersiz olsun: önek kullan (`mat_`, `kim_`, `fiz_`, `edb_`, `cog_`, `din_`, `fel_`, `ing_`). Biyoloji önek kullanmaz. Tek derste tek önek.
- **Tema**: bir sınıfın ünitesi/öğrenme alanı. `grade` 9, 10, 11 ya da 12. Ortaokuldan gelen temel kavramlar için isteğe bağlı tek tema `grade: 'O'` (en çok 8 konu; kod alanı "Mat 7–8" gibi sınıf aralığı, konu dizisinin 8. alanı olarak İngilizce kod, ör. "Math 7–8").
- **Konu**: programdaki öğrenme çıktısı kümesi ya da tek bir kavram. Tema başına 6–14, ders başına yaklaşık 60–110 konu (program küçükse daha az). Ad en çok 6 kelime. `kod` alanı programda **aynen yazılan** öğrenme çıktısı kodu (ör. `FZ.9.1.1`); birden çok çıktıyı kapsıyorsa ilkini yaz. Özet tek cümle, en çok 170 karakter, MEB programına dayalı; uydurma bilgi yok.
- **Bağlantı türleri**: `on` = ön koşul (kaynak bilinmeden hedef anlaşılmaz), `kol` = öğrenmeyi kolaylaştırır, `ilg` = ilgili. `on` ve `kol` bağlantıları döngü oluşturmaz ve geriye (üst sınıftan alt sınıfa) gitmez. Ders başına yaklaşık 1,4–1,8 bağlantı/konu. Ortaokul temel konularından lise konularına `on`/`kol` bağlantı ver. Gerekçe en çok 130 karakter.
- **Her konunun** (ortaokul temelleri dahil) en az bir bağlantısı olmalı; hiçbir konu yalnız kalmasın.
- **Çeviri**: İngilizce alanlar gerçek çeviri. Terimler kabul görmüş İngilizce karşılıklarıyla.
- **Doğruluk**: yalnızca programdan, MEB sayfalarından ya da kesin bildiğin bilgiden yaz. Emin olmadığın bağlantıyı (`url`, `books`) koyma; tema `url`'si yalnızca gerçekten açtığın sayfaysa.
- Dosya UTF-8, harici bağımlılık yok.

## Yazılı eşlemesi (`yazili/<kimlik>.json`)
```json
{ "exams": [ { "grade": 9, "donem": 1, "yazili": 1, "kodlar": ["FZ.9.1.1"], "topics": ["fiz_x", "fiz_y"] } ] }
```
Kaynak: OGM Materyal "Yazılıya Hazırlanıyorum" PDF'leri (metin dökümü `yz/<ders>/<sınıf>-d<dönem>-y<yazılı>.txt`). Her PDF'in sonunda soru/öğrenme çıktısı tablosu var; `kodlar` = o metinde `/[A-Z]{2,5}\.(?:9|10|11|12)\.\d+\.[A-Z]*\d+/g` ile bulunan kodların sıralı, tekil listesi. **Eşlemeyi kodun yanında soru metnine bakarak yap**: PDF tablolarında kod yazım hataları var. Hiçbir konuya bağlanamayan soruyu atla; konu uydurma. PDF'i olmayan sınıf/dönem için giriş yazma (11. sınıfta sitede yazılı yok).
