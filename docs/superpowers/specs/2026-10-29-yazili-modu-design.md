# Yazılı Modu — tasarım

Tarih: 2026-10-29 · Durum: onaylı kararlarla otonom uygulama (kullanıcı: "otonom sürdür")

## Amaç
Öğrenci "Yazılıma neye, hangi sırayla çalışmalıyım?" sorusunun cevabını bir dakikada alsın.
Hedef yarışma kategorisi: TEKNOFEST İnsanlık Yararına Teknolojiler – Lise · Eğitim, Kültür ve Dijital Deneyim ·
Dijital Eğitim ve Öğrenme Sistemleri ("öğrenme sürecini düzenleyen içerik, takip veya geri bildirim sistemleri").

## Kullanıcının verdiği kararlar
1. Kodu Claude yazar (şu an yarışma süreci yok).
2. Giriş: arama kartında "Yazılıma çalış" düğmesi + konu panelindeki yazılı çizelgesinin altında "Bu yazılıya çalış" düğmeleri. PDF açma davranışı aynen kalır.
3. Liste: üç bölüm. **Önce bunlar** = yazılı konularının doğrudan ön koşulları (`on`, öbür derslerden olanlar dahil);
   **Yazılıda çıkan konular** = MEB örnek senaryosundaki sırayla; **Başka derslerden yardımcı** = öbür derslerden gelen `kol` köprüleri.
4. İşaretler: her konuda "Biliyorum" ve "Zorlanıyorum". Biliyorum ilerleme çubuğunu doldurur; Zorlanıyorum maddenin altında
   "Önce şuna bak" ile o konunun doğrudan ön koşullarını açar. İşaretler konuya bağlıdır, yazılılar arasında taşınır,
   yalnız bu cihazda (localStorage) saklanır.

## Claude'un verdiği kararlar
- **Veri katmanı (eba-core.js):** `D.studyList(examTopicIds)` → `{ pre, exam, help }` ve `D.prereqsOf(id)`; seçili derslerden bağımsız,
  tüm kayıt üzerinden çalışır (tek ders görünümünde de öbür dersten ön koşulu bulur). Sıralama: ön koşullar sınıfa göre
  (ortaokul önce), sonra programdaki sıra; yardımcılar ders sırasına göre. Her maddede hangi yazılı konusuna hizmet ettiği (`for`) tutulur.
- **Durum:** `state.exam = { sid, g, d, y }`. Adres: `#yazili=kimya-9-1-1` (öğretmen bu bağlantıyı sınıfa paylaşabilir);
  konu açılınca `#konu=…`, geri tuşu listeye döner.
- **Panel:** mevcut panel kabuğu. Başlıkta ders + sınıf etiketi, yazılı adı, kapat ve ilerleme çubuğu; listenin başında
  sınıf ve yazılı seçici (telefonda alt pencerenin başlığı kısa kalsın diye başlıkta değil); üç bölüm; en altta örnek yazılı
  PDF'i ve "okulunun yazılısı farklı olabilir" notu. İşaret değişince panel yeniden çizilmez; yalnız madde, öneri ve ilerleme değişir.
  Listeden konu açılınca konu panelinin üstünde "← <yazılı adı>" dönüş düğmesi çıkar; dönüşte odak açılan maddeye gelir.
- **Geri ve Esc:** Esc önce açık konuyu kapatıp listeye döner, ikinci Esc moddan çıkar. Tarayıcının geri tuşu konudan listeye,
  listeden önceki görünüme döner.
- **3B:** yazılı konuları tam parlak, ön koşul ve yardımcılar yarı parlak, kalan ağ sönük; kamera kümeye oturur;
  küme konularının adları yonga etiket olarak görünür (✓ biliyorum, ! zorlanıyorum). Girişte ışık ön koşullardan
  yazılı konularına akar ("Sinyal"); hareket azaltılmışsa akmaz.
- **Görünümler:** tek ders görünümünde tam; tüm dersler görünümünde arama kartı olmadığından panelden girilir ve
  öbür dersteki yardımcılar da ağda yanar. WebGL yoksa panel aynı listeyi verir.
- **Dil:** tüm yeni metinler Türkçe ve İngilizce.

## Uygulama sırasında bulunan mevcut hata
Tek ders görünümünden öbür dersin konusuna geçince (Yazılı Modu'nda "yardımcı" maddeleri bu yolu kullanır) tüm dersler ağı
hiç çizilmiyordu; yayındaki sitede de vardı. Neden: yeni sahnenin kurulumundaki `applyTheme`, `state.sel` dolu olduğu için
vurgu malzemelerini kuruyor, `compileAsync` bunları derleme kümesine alıyor, hemen ardından `select()` aynı malzemeleri atıyordu;
three.js derlemeyi denetlerken hata verip sözü hiç çözmüyor, çizim döngüsü başlamıyordu. Düzeltme: `applyTheme` vurguyu yalnız
sahnede gerçekten seçili konu varken (`selI >= 0`) yeniden kurar.

## Kapsam dışı (YAGNI)
Hesap/sunucu, öğretmen paneli, zincirin tamamı (4 basamak), süre sayacı, ölçüm modu, paylaşım görseli.

## Test
- `node tools/test-yazili-modu.js`: 56 yazılının hepsinde liste kuralları (ön koşul gerçekten `on`, yinelenme yok,
  yazılı konusu ön koşul listesinde yok, yardımcı başka dersten, sıralama) ve bilinen örnekler.
- Tarayıcıda: tek ders ve tüm dersler, telefon genişliği, koyu/açık mod, İngilizce, geri tuşu, işaretlerin kalıcılığı,
  WebGL'siz sayfa; ardından render_check.
