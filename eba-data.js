// EBA Biyoloji Haritası — konu verisi, Türkçe ve İngilizce (Türkiye Yüzyılı Maarif Modeli 2026, Biyoloji 9–12)
// Kaynak: MEB TYMM Biyoloji Dersi Öğretim Programı (içerik çerçevesi ve "temel kabuller").
(function () {
  var T = 'https://tymm.meb.gov.tr';
  var themes = [
    { id: 'fen', name: 'Ortaokul temelleri', grade: 'O' },
    { id: 'yasam', name: 'Yaşam', grade: 9, url: T + '/biyoloji-dersi/unite/2' },
    { id: 'org', name: 'Organizasyon', grade: 9, url: T + '/biyoloji-dersi/unite/3' },
    { id: 'enerji', name: 'Enerji', grade: 10, url: T + '/biyoloji-dersi/unite/8' },
    { id: 'ekoloji', name: 'Ekoloji', grade: 10, url: T + '/biyoloji-dersi/unite/10' },
    { id: 'tepki', name: 'Tepki', grade: 11, url: T + '/biyoloji-dersi/unite/13' },
    { id: 'homeo', name: 'Homeostazi', grade: 11, url: T + '/biyoloji-dersi/unite/16' },
    { id: 'ureme', name: 'Üreme', grade: 12, url: T + '/biyoloji-dersi/unite/19' },
    { id: 'gen', name: 'Gen', grade: 12, url: T + '/biyoloji-dersi/unite/22' }
  ];
  // [id, tema, ad, kod (öğrenme çıktısı ya da ortaokul sınıfı), özet]
  var raw = [
    ['of_bilim','fen','Bilimin doğası','Fen 3–4','Bilimsel bilginin gözlem ve deneye dayandığı, yeni kanıtlarla değişebildiği fikri.'],
    ['of_canli','fen','Canlılar ve ortak özellikleri','Fen 3–4','Canlıları cansızlardan ayıran beslenme, solunum, büyüme, üreme ve tepki gibi temel özellikler.'],
    ['of_hucre','fen','Hücre','Fen 5','Canlıların temel yapı birimi olan hücre; hücre zarı, sitoplazma ve çekirdek.'],
    ['of_destek','fen','Destek ve hareket sistemi','Fen 5','İskelet, kas ve eklemlerin vücuda destek olması ve hareketi sağlaması.'],
    ['of_bioc','fen','Biyoçeşitlilik ve ekosistem','Fen 6','Canlı çeşitliliği, habitat, ekosistem ve nesli tükenen türler.'],
    ['of_sinir','fen','Sinir sistemi ve hormonlar','Fen 6','Merkezî ve çevresel sinir sistemi ile hormonların temel görevleri.'],
    ['of_ureme','fen','Üreme, büyüme ve gelişme','Fen 6','İnsanda ve bitkilerde üreme, büyüme ve gelişmenin temel evreleri.'],
    ['of_sistem','fen','Vücudumuzdaki sistemler','Fen 7','Sindirim, dolaşım, solunum ve boşaltım sistemlerinin yapı ve görevleri.'],
    ['of_besinz','fen','Besin zinciri ve enerji akışı','Fen 7','Üretici, tüketici ve ayrıştırıcılar arasındaki besin ilişkileri.'],
    ['of_fotos','fen','Fotosentez ve solunum','Fen 8','Bitkilerin besin üretmesi ve canlıların enerji elde etmek için solunum yapması.'],
    ['of_dna','fen','DNA ve genetik kod','Fen 8','Nükleotit, gen, DNA ve kromozom kavramları; kalıtım ve mutasyonun temeli.'],
    ['of_dongu','fen','Madde döngüleri ve sürdürülebilirlik','Fen 8','Su, oksijen ve karbon döngüleri; karbon ayak izi ve sürdürülebilir kalkınma.'],

    ['donum','yasam','Biyolojideki dönüm noktaları','BİY.9.1.1','Aşı, antibiyotik, DNA’nın yapısı, PZR ve CRISPR gibi buluşların insan hayatına katkıları.'],
    ['bilim','yasam','Bilimin doğası ve bilimsel araştırma','BİY.9.1.2','Problemden hipoteze, deneyden sonuca uzanan araştırma süreci ve bilimsel bilginin özellikleri.'],
    ['etik','yasam','Bilim etiği','BİY.9.1.3','Bilimsel araştırmalarda uyulması gereken kurallar ve araştırmacının sorumlulukları.'],
    ['ortak','yasam','Canlıların ortak özellikleri','BİY.9.1.4','Hücresel yapı, metabolizma, homeostazi, üreme, uyarılara tepki ve adaptasyon gibi tüm canlılarda görülen özellikler.'],
    ['virus','yasam','Virüsler','BİY.9.1.4','Hücresel yapıda olmayan virüslerin neden canlı ya da cansız olarak sınıflandırılamadığı.'],
    ['sinif','yasam','Sınıflandırma ve ikili adlandırma','BİY.9.1.5','Linne’nin ikili adlandırması ve tür, cins, aile gibi sınıflandırma kategorileri.'],
    ['domain','yasam','Üç üst âlem (domain) sistemi','BİY.9.1.6','Canlıların bakteriler, arkeler ve ökaryotlar olarak üç büyük gruba ayrılması.'],
    ['bakteri','yasam','Bakteriler ve arkeler','BİY.9.1.6','Prokaryot hücreli bu iki grubun benzer ve farklı yönleri, yaşam ortamları.'],
    ['okaryotlar','yasam','Protistler, bitkiler, mantarlar, hayvanlar','BİY.9.1.6','Ökaryot domainindeki dört grubun genel özellikleri ve örnekleri.'],
    ['biocesit','yasam','Biyoçeşitlilik','BİY.9.1.7','Gen, tür ve ekosistem çeşitliliği; Türkiye’nin endemik türleri.'],

    ['su','org','Su ve mineraller','BİY.9.2.1','Suyun çözücülük, adezyon ve kohezyon gibi özellikleri; minerallerin vücuttaki görevleri.'],
    ['karb','org','Karbohidratlar','BİY.9.2.2','Glikozdan nişasta, glikojen ve selüloza; hücrenin temel enerji kaynağı.'],
    ['yag','org','Yağlar (lipitler)','BİY.9.2.2','Trigliseritler, fosfolipitler ve steroitler; enerji deposu ve hücre zarının yapı taşı.'],
    ['protein','org','Proteinler','BİY.9.2.2','Amino asitlerden oluşan, yapı ve görev çeşitliliği en fazla olan organik moleküller.'],
    ['enzim','org','Enzimler','BİY.9.2.4','Tepkimeleri hızlandıran biyolojik katalizörler; pH ve sıcaklığın enzim aktivitesine etkisi.'],
    ['nukleik9','org','Nükleik asitlerin yapısı','BİY.9.2.2','DNA ve RNA’nın nükleotitlerden oluşan genel yapısı.'],
    ['vitamin','org','Vitaminler','BİY.9.2.2','Yağda ve suda çözünen vitaminler ve vücuttaki işlevleri.'],
    ['hucre','org','Prokaryot ve ökaryot hücre','BİY.9.2.5','Çekirdeği olmayan hücreler ile zarla çevrili çekirdeği olan hücrelerin karşılaştırılması.'],
    ['organel','org','Hücre zarı ve organeller','BİY.9.2.5','Hücre zarı, sitoplazma, mitokondri, kloroplast ve ribozom gibi yapılar ile aralarındaki iş birliği.'],
    ['madde','org','Hücre zarından madde geçişleri','BİY.9.2.6','Difüzyon, ozmoz, aktif taşıma, endositoz ve ekzositoz.'],
    ['dokuorgan','org','Hücreden doku, organ ve sisteme','BİY.9.2.8','Benzer hücrelerin dokuları, dokuların organları, organların sistemleri oluşturması.'],

    ['atp','enerji','ATP ve enerji aktarımı','BİY.10.1.1','Hücrenin enerji taşıyıcısı ATP’nin yapısı ve enerji aktarımındaki rolü.'],
    ['fotosentez','enerji','Fotosentez','BİY.10.1.2','Işık enerjisiyle karbondioksit ve sudan besin üretimi; ışığa bağlı ve ışıktan bağımsız evreler.'],
    ['kemosentez','enerji','Kemosentez','BİY.10.1.4','Bazı bakterilerin ışık yerine kimyasal enerji kullanarak besin üretmesi.'],
    ['sindirim','enerji','Canlılarda sindirim çeşitleri','BİY.10.1.5','Hücre içi ve hücre dışı sindirim; farklı canlılarda sindirim yapıları.'],
    ['insansind','enerji','İnsanda sindirim, emilim ve taşınma','BİY.10.1.6','Besinlerin parçalanıp kana geçmesi ve hücrelere taşınması.'],
    ['solunum','enerji','Hücresel solunum','BİY.10.1.7','Hücreler besinlerdeki kimyasal enerjiyi ATP’ye dönüştürür. Oksijenli solunum glikoliz, Krebs döngüsü ve elektron taşıma sistemi basamaklarıyla gerçekleşir; sonunda ATP, karbondioksit ve su oluşur.'],
    ['ferment','enerji','Fermantasyon','BİY.10.1.9','Oksijen kullanılmadan enerji elde edilmesi; laktik asit ve etil alkol fermantasyonu.'],
    ['metab','enerji','Enerji ve metabolizma','BİY.10.1.10','Besinlerden elde edilen enerjinin kas faaliyeti, sentez ve aktif taşıma gibi süreçlerde kullanılması.'],

    ['ekosistem','ekoloji','Ekosistemin bileşenleri','BİY.10.2.1','Işık, su ve toprak gibi cansız bileşenler ile canlı bileşenler arasındaki ilişkiler.'],
    ['populasyon','ekoloji','Popülasyon, komünite ve süksesyon','BİY.10.2.2','Popülasyonların büyümesi, taşıma kapasitesi ve komünitelerin zamanla değişmesi.'],
    ['etkilesim','ekoloji','Tür içi ve türler arası etkileşimler','BİY.10.2.2','Rekabet, av-avcı ve simbiyoz gibi canlılar arası ilişkiler.'],
    ['enerjiakis','ekoloji','Besin zinciri, besin ağı ve enerji akışı','BİY.10.2.3','Enerjinin üreticiden tüketicilere aktarılması ve her basamakta azalması.'],
    ['piramit','ekoloji','Ekolojik piramitler ve biyolojik birikim','BİY.10.2.3','Enerji piramidi ve zararlı maddelerin besin zincirinde birikmesi.'],
    ['dongu','ekoloji','Madde döngüleri','BİY.10.2.4','Su, karbon ve azot döngülerinin canlı ve cansız ortam arasında işleyişi.'],
    ['surdur','ekoloji','Ekolojik sürdürülebilirlik','BİY.10.2.5','Habitat kaybı, kirlilik ve biyoçeşitlilik kaybı gibi sürdürülebilirliği kısıtlayan durumlar.'],
    ['ayakizi','ekoloji','Ekolojik ayak izi','BİY.10.2.7','Bireyin doğal kaynak tüketiminin ölçülmesi ve küçültme yolları.'],
    ['koruma','ekoloji','Doğal kaynakların korunması ve atık yönetimi','BİY.10.2.8','Koruma alanları, Sıfır Atık gibi uygulamalar ve geri kazanım.'],

    ['bitkihormon','tepki','Bitki hormonları','BİY.11.1.2','Oksin, giberellin, etilen ve absisik asidin büyüme ve olgunlaşmadaki etkileri.'],
    ['tropizma','tepki','Tropizma ve nasti','BİY.11.1.3','Uyaranın yönüne bağlı (yönelme) ve bağlı olmayan (irkilme) bitki hareketleri.'],
    ['duyu','tepki','Duyu reseptörleri ve duyu organları','BİY.11.1.5','Işık, ses, basınç ve kimyasal uyarıları algılayan yapılar.'],
    ['noron','tepki','Nöron ve sinyal iletimi','BİY.11.1.5','Nöronun yapısı, zar potansiyelindeki değişimle uyartı iletimi ve sinaps.'],
    ['sinirfark','tepki','Hayvanlarda sinir sistemi farklılıkları','BİY.11.1.6','Süngerlerden memelilere sinir sisteminin yapısındaki farklılaşma.'],
    ['insansinir','tepki','İnsan sinir sistemi','BİY.11.1.7','Merkezî ve çevresel sinir sistemi; duyu, ara ve motor nöronların iş birliği.'],
    ['refleks','tepki','Refleks','BİY.11.1.8','Diz kapağı ve göz bebeği refleksi gibi istemsiz, hızlı tepkiler; refleks yayı.'],
    ['iskelet','tepki','Kemik, eklem ve kas','BİY.11.1.9','Hareketin oluşmasında iskelet, eklem ve kasların eş güdümlü çalışması.'],
    ['kasilma','tepki','Kas kasılma mekanizması','BİY.11.1.10','Sarkomerde aktin ve miyozinin birbiri üzerinden kayması (kayan iplikler modeli).'],
    ['bagisiklik','tepki','Bağışıklık','BİY.11.1.11','Doğal ve kazanılmış bağışıklık; aktif ve pasif bağışıklık, aşılar.'],
    ['alerji','tepki','Alerji','BİY.11.1.12','Bağışıklık sisteminin zararsız maddelere aşırı tepki vermesi.'],

    ['homeo','homeo','Homeostazi ve önemi','BİY.11.2.1','Vücudun iç ortamını (sıcaklık, pH, su, kan şekeri) belirli sınırlar içinde tutması.'],
    ['geribildirim','homeo','Pozitif ve negatif geri bildirim','BİY.11.2.3','Bir değişikliği düzelten ya da güçlendiren düzenleme döngüleri.'],
    ['endokrin','homeo','Endokrin sistem','BİY.11.2.5','Hipofiz, tiroit, pankreas ve böbrek üstü bezlerinin hormonlarla dengeyi sağlaması.'],
    ['dolasim','homeo','Dolaşım sistemi','BİY.11.2.6','Kalp, damarlar ve lenf sisteminin madde taşınması ve kan basıncı dengesindeki rolü.'],
    ['solsis','homeo','Solunum sistemi','BİY.11.2.7','Alveollerde gaz değişimi; oksijen, karbondioksit ve pH dengesinin korunması.'],
    ['bosaltim','homeo','Boşaltım sistemi ve nefron','BİY.11.2.8','Böbreklerde nefronların atıkları uzaklaştırması, su ve tuz dengesini sağlaması.'],
    ['saglik','homeo','Homeostazi bozuklukları','BİY.11.2.10','Diyabet, hipertansiyon ve obezite gibi dengenin sağlanamadığı durumlar.'],

    ['kromozom','ureme','Kromozom yapısı','BİY.12.1.3','DNA’nın proteinlerle paketlenerek kromozomları oluşturması.'],
    ['dongu12','ureme','Hücre döngüsü ve mitoz','BİY.12.1.4','İnterfaz, mitoz ve sitokinez; büyüme ve onarımın temeli.'],
    ['mayoz','ureme','Mayoz','BİY.12.1.4','Kromozom sayısını yarıya indiren ve kalıtsal çeşitlilik sağlayan bölünme.'],
    ['ayrilmama','ureme','Kromozomlarda ayrılmama','BİY.12.1.5','Bölünmede kromozomların ayrılamaması ve Down sendromu gibi sonuçları.'],
    ['eseysiz','ureme','Eşeysiz üreme','BİY.12.1.6','Bölünme, tomurcuklanma, sporla ve vejetatif üreme; ataya benzeyen bireyler.'],
    ['gametogenez','ureme','Gametogenez ve döllenme','BİY.12.1.7','Sperm ve yumurta oluşumu (spermatogenez, oogenez) ve döllenme.'],
    ['insanureme','ureme','İnsanda üreme sistemi','BİY.12.1.9','Dişi ve erkek üreme sistemleri; menstrual döngünün hormonlarla düzenlenmesi.'],
    ['embriyo','ureme','Embriyonik gelişim','BİY.12.1.10','Döllenmeden sonra bölünme, gastrülasyon ve organogenez evreleri.'],
    ['cicek','ureme','Çiçekli bitkilerde üreme','BİY.12.1.11','Çiçeğin kısımları, tozlaşma, döllenme, tohum ve meyve oluşumu.'],
    ['cimlenme','ureme','Çimlenme ve dormansi','BİY.12.1.12','Tohumun çimlenmesini etkileyen su, sıcaklık ve oksijen gibi faktörler.'],

    ['dnayapi','gen','DNA ve RNA’nın moleküler yapısı','BİY.12.2.1','Çift sarmal DNA, baz eşleşmesi ve RNA’nın DNA’dan farkları.'],
    ['replikasyon','gen','DNA replikasyonu','BİY.12.2.2','DNA’nın yarı korunumlu modelle kendini eşlemesi.'],
    ['genifade','gen','Gen ifadesi','BİY.12.2.3','Genetik kod; transkripsiyon ve translasyonla genden proteine.'],
    ['mutasyon','gen','Mutasyonlar','BİY.12.2.4','Genetik yapıdaki değişikliklerin nedenleri ve canlıya etkileri.'],
    ['mendel','gen','Mendel kalıtımı','BİY.12.2.5','Monohibrit, dihibrit ve kontrol çaprazlamaları; baskınlık ve çekiniklik.'],
    ['esbaskin','gen','Eş baskınlık ve çok alellilik','BİY.12.2.6','Kan gruplarında görülen, Mendel oranlarından farklı kalıtım biçimleri.'],
    ['eseybagli','gen','Eşeye bağlı kalıtım ve soyağacı','BİY.12.2.7','X ve Y kromozomuyla taşınan özellikler; renk körlüğü ve hemofili.'],
    ['gentest','gen','Genetik testler ve danışmanlık','BİY.12.2.8','Kalıtsal hastalık riskinin belirlenmesi; akraba evliliğinin riskleri.'],
    ['biyotek','gen','Biyoteknoloji ve etik','BİY.12.2.9','Rekombinant DNA, aşı ve hormon üretimi, GDO, kök hücre ve etik tartışmalar.']
  ];
  // [kaynak, hedef, tür, gerekçe] — on: ön koşul (kaynak, hedeften önce bilinmeli) · kol: öğrenmeyi kolaylaştırır · ilg: ilgili
  var L = [
    ['of_bilim','bilim','on','Bilimin doğasının temel özellikleri fen bilimlerinde tanıtılır; 9. sınıfta araştırma süreçleri üzerinden derinleşir.'],
    ['of_canli','ortak','on','Canlılık ölçütleri ilk kez fen bilimlerinde ele alınır; 9. sınıfta tüm canlılar için genellenir.'],
    ['of_hucre','hucre','on','Hücrenin temel yapısı 5. sınıftan bilindiği kabul edilir.'],
    ['of_hucre','organel','on','Hücre zarı, sitoplazma ve çekirdek bilinmeden organellerin iş bölümü anlaşılamaz.'],
    ['of_bioc','biocesit','on','Biyoçeşitlilik ve nesli tükenen türler 6. sınıfta işlenir.'],
    ['of_bioc','ekosistem','on','Habitat ve ekosistem kavramları ekosistem bileşenlerinin dayanağıdır.'],
    ['of_besinz','enerjiakis','on','Üretici, tüketici ve ayrıştırıcı kavramları besin ağının yapı taşlarıdır.'],
    ['of_fotos','fotosentez','on','Fotosentezin temel kavramları 8. sınıfta öğrenilmiş kabul edilir.'],
    ['of_fotos','solunum','on','Solunumun canlılar için önemi 8. sınıfta öğrenilir; 10. sınıfta basamaklarıyla ele alınır.'],
    ['of_sistem','insansind','on','Sindirim sistemini oluşturan organların görevleri 7. sınıftan bilinir.'],
    ['of_sistem','dolasim','on','Dolaşım sisteminin yapı ve organları 7. sınıfta öğrenilir.'],
    ['of_sistem','solsis','on','Solunum sisteminin organları 7. sınıfta öğrenilir.'],
    ['of_sistem','bosaltim','on','Boşaltım sistemi organlarının görevleri 7. sınıfta öğrenilir.'],
    ['of_sinir','insansinir','on','Merkezî ve çevresel sinir sistemi ayrımı 6. sınıfta yapılır.'],
    ['of_sinir','endokrin','on','Hormonlara ilişkin temel bilgiler 6. sınıfta öğrenilir.'],
    ['of_destek','iskelet','on','Destek ve hareket sisteminin yapısı 5. sınıfta öğrenilir.'],
    ['of_ureme','insanureme','on','Üreme, büyüme ve gelişmenin temel evreleri 6. sınıfta işlenir.'],
    ['of_dna','kromozom','on','Gen, DNA ve kromozom kavramları 8. sınıftan bilinir.'],
    ['of_dna','dnayapi','on','Nükleotit ve genetik kod kavramları DNA’nın moleküler yapısının temelidir.'],
    ['of_dna','mendel','on','Genotip, fenotip ve kalıtım kavramları 8. sınıfta tanıtılır.'],
    ['of_dongu','dongu','on','Su ve karbon döngüleri 8. sınıfta öğrenilir; 10. sınıfta azot döngüsüyle genişler.'],

    ['bilim','etik','kol','Araştırma sürecini bilmek, hangi adımda hangi etik kuralın gerektiğini görmeyi kolaylaştırır.'],
    ['bilim','donum','kol','Bilimsel yöntemi bilmek, dönüm noktası buluşların nasıl yapıldığını anlamayı kolaylaştırır.'],
    ['ortak','virus','on','Virüslerin canlı sayılıp sayılmadığını tartışmak için canlılık ölçütlerini bilmek gerekir.'],
    ['ortak','sinif','kol','Ortak ve farklı özellikleri görmek, canlıları gruplamanın ölçütlerini oluşturur.'],
    ['ortak','homeo','on','Homeostazi bir canlılık özelliği olarak 9. sınıfta tanıtılır; 11. sınıfta sistemlerle açıklanır.'],
    ['ortak','duyu','kol','Uyarılara tepki, canlıların ortak özelliklerinden biri olarak önceden tanınır.'],
    ['sinif','domain','on','Domain, sınıflandırma kategorilerinin en üst basamağıdır.'],
    ['hucre','domain','kol','Prokaryot-ökaryot ayrımı, üç domaini birbirinden ayırmanın en kısa yoludur.'],
    ['domain','bakteri','on','Bakteriler ve arkeler, domain sistemindeki iki prokaryot gruptur.'],
    ['domain','okaryotlar','on','Protist, bitki, mantar ve hayvanlar ökaryot domainin alt gruplarıdır.'],
    ['sinif','biocesit','kol','Türlerin adlandırılması, biyoçeşitliliğin ölçülmesini mümkün kılar.'],
    ['su','madde','on','Ozmoz suyun zardan geçişidir; suyun özellikleri bilinmeden açıklanamaz.'],
    ['protein','enzim','on','Enzimler protein yapılıdır; yapıları bozulunca (denatürasyon) işlevlerini kaybeder.'],
    ['nukleik9','dnayapi','on','Nükleotitlerin genel yapısı, DNA’nın moleküler yapısına geçmeden önce bilinmelidir.'],
    ['nukleik9','atp','kol','ATP de bir nükleotittir; nükleotit yapısını bilmek ATP’yi tanımayı kolaylaştırır.'],
    ['nukleik9','kromozom','on','Kromozomlar DNA’nın paketlenmiş hâlidir.'],
    ['karb','solunum','on','Hücresel solunumun başlıca yakıtı glikozdur.'],
    ['karb','fotosentez','on','Fotosentezin ürünü olan glikozun yapısı 9. sınıfta öğrenilir.'],
    ['yag','solunum','kol','Yağların da solunuma katılabildiğini görmek, enerji kaynaklarını karşılaştırmayı kolaylaştırır.'],
    ['yag','madde','kol','Hücre zarının fosfolipit yapısı, hangi maddelerin kolay geçtiğini açıklar.'],
    ['enzim','solunum','on','Solunumun her basamağı enzimlerle yürür; sıcaklık ve pH etkisi buradan gelir.'],
    ['enzim','fotosentez','kol','Calvin döngüsünün enzimle yürüdüğünü bilmek, sıcaklığın fotosentez hızına etkisini açıklar.'],
    ['enzim','insansind','on','Sindirim, besinlerin enzimlerle küçük moleküllere parçalanmasıdır.'],
    ['vitamin','enzim','ilg','Bazı vitaminler enzimlerin yardımcı molekülü (koenzim) olarak çalışır.'],
    ['hucre','organel','on','Organeller ökaryot hücrenin yapısı içinde anlam kazanır.'],
    ['hucre','dokuorgan','on','Doku, benzer yapıdaki hücrelerin bir araya gelmesiyle oluşur.'],
    ['organel','madde','on','Madde geçişleri hücre zarının yapısına dayanır.'],
    ['organel','fotosentez','on','Fotosentez kloroplastta gerçekleşir.'],
    ['organel','solunum','on','Oksijenli solunumun Krebs ve ETS basamakları mitokondride gerçekleşir.'],
    ['madde','insansind','on','Emilim, besin monomerlerinin bağırsak hücre zarından geçişidir.'],
    ['madde','noron','on','Uyartı iletimi, iyonların nöron zarından geçişiyle oluşan potansiyel değişimidir.'],
    ['madde','solsis','on','Alveollerdeki gaz değişimi difüzyonla gerçekleşir.'],
    ['madde','bosaltim','kol','Nefrondaki süzülme ve geri emilim, zardan madde geçişinin uygulamasıdır.'],
    ['dokuorgan','homeo','on','Homeostazi, doku, organ ve sistemlerin birlikte çalışmasıyla sağlanır.'],
    ['dokuorgan','insansind','kol','Organ-sistem düzeyini görmek, sindirim kanalının bölümlerini yerleştirmeyi kolaylaştırır.'],

    ['atp','fotosentez','on','Işığa bağlı evrede üretilen ATP, ışıktan bağımsız evrede kullanılır.'],
    ['atp','solunum','on','Hücresel solunumun amacı ATP üretmektir; ATP bilinmeden sonuç anlamlandırılamaz.'],
    ['atp','kasilma','on','Kas kasılması ATP harcanarak gerçekleşir.'],
    ['atp','metab','on','Metabolik süreçlerin enerjisi ATP aracılığıyla aktarılır.'],
    ['fotosentez','solunum','kol','Fotosentezde kurulan madde ve enerji ilişkisi, solunumu tersinden okumayı kolaylaştırır.'],
    ['fotosentez','kemosentez','kol','Fotosentezle karşılaştırıldığında kemosentezin farkı (enerji kaynağı) kolayca görülür.'],
    ['fotosentez','enerjiakis','on','Ekosistemdeki enerji, üreticilerin fotosentezle bağladığı enerjidir.'],
    ['fotosentez','dongu','on','Karbon döngüsünde CO₂’nin canlılara geçişi fotosentezle olur.'],
    ['sindirim','insansind','kol','Farklı canlıların sindirim yapılarını görmek, insandaki düzeni karşılaştırmalı anlamayı kolaylaştırır.'],
    ['insansind','solunum','kol','Sindirimle ortaya çıkan glikoz, yağ asidi ve amino asitlerin hücreye ulaşması solunumun girdisidir.'],
    ['insansind','dolasim','kol','Emilen maddelerin taşınması dolaşım sistemiyle sağlanır.'],
    ['solunum','ferment','kol','Glikoliz her iki süreçte ortaktır; solunumu bilmek fermantasyonun farkını görmeyi kolaylaştırır.'],
    ['solunum','metab','on','Metabolizmada kullanılan enerjinin kaynağı hücresel solunumdur.'],
    ['solunum','enerjiakis','kol','Her basamakta enerjinin bir kısmının solunumla ısı olarak kaybolması, piramidin daralmasını açıklar.'],
    ['solunum','solsis','kol','Hücrelerin O₂ ihtiyacı ve CO₂ üretimi, solunum sisteminin neden çalıştığını açıklar.'],
    ['solunum','kasilma','kol','Kasın kullandığı ATP’nin solunumla üretildiğini bilmek yorgunluğu anlamayı kolaylaştırır.'],
    ['solunum','dongu','ilg','Solunumla açığa çıkan CO₂ karbon döngüsünün bir parçasıdır.'],
    ['ferment','biyotek','on','Yoğurt, peynir ve ekmek yapımı fermantasyona dayalı geleneksel biyoteknolojidir.'],
    ['kemosentez','dongu','kol','Azot döngüsündeki bazı bakteriler kemosentez yapar.'],
    ['bakteri','kemosentez','kol','Kemosentez yapan canlıların bakteri ve arkeler olduğunu bilmek konuyu somutlaştırır.'],
    ['metab','homeo','kol','Enerji dengesi, homeostazinin korunan değişkenlerinden biridir.'],
    ['metab','saglik','kol','Alınan ve harcanan enerji dengesi obezitenin temelini oluşturur.'],

    ['ekosistem','populasyon','on','Popülasyon ve komünite, ekosistemin canlı bileşenlerinin düzeyleridir.'],
    ['populasyon','etkilesim','on','Etkileşimler popülasyonlar arasında ve içinde gerçekleşir.'],
    ['ekosistem','enerjiakis','on','Enerji akışı ekosistemin bileşenleri arasında gerçekleşir.'],
    ['enerjiakis','piramit','on','Ekolojik piramit, besin zincirindeki enerji kaybının görselleştirilmesidir.'],
    ['ekosistem','dongu','on','Madde döngüleri ekosistemin canlı ve cansız bileşenleri arasında işler.'],
    ['dongu','surdur','kol','Döngülerin bozulması (ötrofikasyon, iklim değişikliği) sürdürülebilirlik sorunlarını açıklar.'],
    ['biocesit','surdur','on','Biyoçeşitlilik kaybı, sürdürülebilirliği kısıtlayan temel durumlardan biridir.'],
    ['surdur','ayakizi','on','Ekolojik ayak izi, sürdürülebilirliğin bireysel ölçüsüdür.'],
    ['surdur','koruma','on','Koruma ve atık yönetimi, sürdürülebilirliği sağlamaya yönelik uygulamalardır.'],
    ['biocesit','koruma','kol','Endemik türleri tanımak, koruma önlemlerinin gerekçesini somutlaştırır.'],
    ['piramit','surdur','ilg','Biyolojik birikim, kirliliğin besin zinciri yoluyla etkisini gösterir.'],

    ['bitkihormon','tropizma','on','Yönelme hareketleri oksinin hücrelerde eşit olmayan dağılımıyla oluşur.'],
    ['bitkihormon','cimlenme','kol','Giberellin ve absisik asidin etkisini bilmek, dormansinin kırılmasını açıklar.'],
    ['noron','insansinir','on','Sinir sistemi nöronların ağ oluşturmasıyla kurulur.'],
    ['noron','refleks','on','Refleks yayı duyu, ara ve motor nöronlardan oluşur.'],
    ['noron','duyu','kol','Reseptörlerin uyarıyı nöron sinyaline dönüştürdüğünü bilmek duyuları birlikte okumayı kolaylaştırır.'],
    ['noron','sinirfark','kol','Nöron yapısını bilmek, hayvanlarda sinir ağlarının karşılaştırılmasını kolaylaştırır.'],
    ['insansinir','refleks','on','Refleksin omurilikte nasıl yönetildiği, merkezî sinir sistemi bilinmeden anlaşılamaz.'],
    ['duyu','refleks','kol','Refleks bir uyarının algılanmasıyla başlar.'],
    ['insansinir','sinirfark','ilg','İnsan sinir sistemi, hayvanlardaki farklılaşmanın bir ucunu temsil eder.'],
    ['iskelet','kasilma','on','Kas kasılmasının hareket üretmesi kemik ve eklemlerle birlikte anlam kazanır.'],
    ['noron','kasilma','kol','Kasılmayı motor nörondan gelen uyartı başlatır.'],
    ['insansinir','iskelet','kol','İstemli hareketin sinir sisteminden başladığını bilmek eş güdümü açıklar.'],
    ['protein','kasilma','kol','Aktin ve miyozinin protein yapısı, kasılma modelini somutlaştırır.'],
    ['protein','bagisiklik','kol','Antikorlar proteindir; protein yapısını bilmek antijen tanımayı anlamayı kolaylaştırır.'],
    ['bagisiklik','alerji','on','Alerji, bağışıklık sisteminin aşırı tepkisidir.'],
    ['virus','bagisiklik','ilg','Aşılar ve viral hastalıklar bağışıklığın günlük hayattaki karşılığıdır.'],
    ['insansinir','homeo','on','Programda hayvanlarda tepki, homeostazi temasının temel kabulü olarak sayılır.'],

    ['homeo','geribildirim','on','Geri bildirim, homeostazinin çalışma mekanizmasıdır.'],
    ['geribildirim','endokrin','on','Hormon düzeyleri çoğunlukla negatif geri bildirimle düzenlenir.'],
    ['insansinir','endokrin','kol','Hipotalamusun hipofizi yönetmesi, sinir ve endokrin sistemin bağlantısını gösterir.'],
    ['homeo','dolasim','kol','Kan basıncı ve kan hacmi dengesi, dolaşım sisteminin homeostazideki rolüdür.'],
    ['homeo','solsis','kol','Kan pH’ı ve CO₂ dengesi, solunum sisteminin homeostazideki rolüdür.'],
    ['homeo','bosaltim','kol','Su ve tuz dengesi, boşaltım sisteminin homeostazideki rolüdür.'],
    ['endokrin','saglik','on','Diyabet, insülin ve ADH gibi hormonların düzenlemesindeki bozukluklardır.'],
    ['dolasim','saglik','on','Hipertansiyon, kan basıncı dengesinin bozulmasıdır.'],
    ['bosaltim','saglik','kol','Diyabet insipidusta böbreğin suyu geri emememesi, nefronun görevini somutlaştırır.'],
    ['dolasim','solsis','ilg','Gaz taşınması iki sistemin birlikte çalışmasıyla gerçekleşir.'],
    ['dolasim','bosaltim','ilg','Nefron, kanın süzülmesiyle çalışır.'],
    ['endokrin','insanureme','on','Menstrual döngü hipofiz ve yumurtalık hormonlarıyla düzenlenir.'],

    ['kromozom','dongu12','on','Mitozda kromozomların eşit dağılımı, kromozom yapısı bilinmeden izlenemez.'],
    ['dongu12','mayoz','on','Mayoz, mitozla karşılaştırılarak öğrenilir.'],
    ['mayoz','ayrilmama','on','Ayrılmama, mayozda kromozomların kutuplara eşit gitmemesidir.'],
    ['mayoz','gametogenez','on','Gametler mayozla oluşur.'],
    ['dongu12','eseysiz','on','Eşeysiz üreme mitoz bölünmeye dayanır.'],
    ['gametogenez','insanureme','kol','Sperm ve yumurta oluşumunu bilmek üreme organlarının görevini anlamayı kolaylaştırır.'],
    ['gametogenez','embriyo','on','Embriyonik gelişim döllenmeyle başlar.'],
    ['insanureme','embriyo','on','Gebeliğin üreme sisteminde nasıl sürdüğü embriyonik gelişimin bağlamıdır.'],
    ['cicek','cimlenme','on','Tohum, çiçekteki döllenme sonucu oluşur.'],
    ['mayoz','cicek','kol','Polen ve yumurta hücrelerinin mayozla oluştuğunu bilmek bitkide döllenmeyi açıklar.'],
    ['eseysiz','gametogenez','ilg','Eşeysiz ve eşeyli üreme avantaj ve dezavantajlarıyla karşılaştırılır.'],
    ['eseysiz','biyotek','kol','Vejetatif üreme, bitki doku kültürü ve klonlamanın temelidir.'],
    ['dongu12','replikasyon','kol','DNA’nın interfazda eşlendiğini bilmek replikasyonun neden gerektiğini açıklar.'],

    ['dnayapi','replikasyon','on','Replikasyon, baz eşleşmesi kuralına dayanır.'],
    ['dnayapi','genifade','on','Transkripsiyon DNA’dan RNA’ya, translasyon RNA’dan proteine geçiştir.'],
    ['protein','genifade','on','Gen ifadesinin ürünü proteindir; amino asit yapısı bilinmelidir.'],
    ['genifade','mutasyon','on','Mutasyonun etkisi, değişen kodun hangi proteini etkilediğiyle anlaşılır.'],
    ['replikasyon','mutasyon','kol','Eşlenme hatalarının mutasyon kaynağı olduğunu bilmek konuyu somutlaştırır.'],
    ['mayoz','mendel','on','Alellerin gametlere ayrı ayrı dağılması mayozda gerçekleşir.'],
    ['mendel','esbaskin','on','Eş baskınlık, Mendel’in baskınlık ilkesinden farklılık olarak tanımlanır.'],
    ['mendel','eseybagli','on','Eşeye bağlı kalıtım problemleri Mendel çaprazlamalarının uygulamasıdır.'],
    ['kromozom','eseybagli','on','X ve Y eşey kromozomlarının yapısı eşeye bağlı kalıtımın temelidir.'],
    ['eseybagli','gentest','kol','Soyağacı okumak, genetik danışmanlığın nasıl risk hesapladığını gösterir.'],
    ['mutasyon','gentest','on','Genetik testler belirli mutasyonları arar.'],
    ['ayrilmama','gentest','kol','Kromozom sayısı anomalileri genetik testlerin bilinen örnekleridir.'],
    ['mutasyon','ayrilmama','ilg','Her ikisi de genetik yapıdaki değişikliklerdir; biri gen, diğeri kromozom düzeyindedir.'],
    ['genifade','biyotek','on','Rekombinant DNA ile ürün elde etmek gen ifadesine dayanır.'],
    ['replikasyon','biyotek','kol','PZR, replikasyonun laboratuvarda tekrarlanmasıdır.'],
    ['etik','biyotek','kol','Bilim etiği ilkeleri, GDO ve kök hücre tartışmalarını değerlendirmenin zeminidir.'],
    ['donum','biyotek','ilg','PZR, rekombinant DNA ve CRISPR dönüm noktası buluşlar arasında sayılır.'],
    ['esbaskin','dolasim','ilg','Kan grupları kan naklinde uyumu belirler.']
  ];

  /* ───────── İngilizce ───────── */
  var themeEn = { fen: 'Middle school foundations', yasam: 'Life', org: 'Organization', enerji: 'Energy', ekoloji: 'Ecology',
    tepki: 'Response', homeo: 'Homeostasis', ureme: 'Reproduction', gen: 'Genes' };
  // id → [ad, özet]
  var EN = {
    of_bilim: ['Nature of science', 'The idea that scientific knowledge rests on observation and experiment and can change with new evidence.'],
    of_canli: ['Living things and their shared traits', 'The basic traits that set living things apart from non-living things, such as nutrition, respiration, growth, reproduction and response.'],
    of_hucre: ['The cell', 'The cell as the basic unit of living things; cell membrane, cytoplasm and nucleus.'],
    of_destek: ['Support and movement system', 'How the skeleton, muscles and joints support the body and make movement possible.'],
    of_bioc: ['Biodiversity and ecosystems', 'The variety of life, habitats, ecosystems and extinct species.'],
    of_sinir: ['Nervous system and hormones', 'The central and peripheral nervous systems and the basic roles of hormones.'],
    of_ureme: ['Reproduction, growth and development', 'The basic stages of reproduction, growth and development in humans and plants.'],
    of_sistem: ['Systems in our body', 'Structure and functions of the digestive, circulatory, respiratory and excretory systems.'],
    of_besinz: ['Food chains and energy flow', 'Feeding relationships between producers, consumers and decomposers.'],
    of_fotos: ['Photosynthesis and respiration', 'How plants make food and how living things respire to obtain energy.'],
    of_dna: ['DNA and the genetic code', 'Nucleotide, gene, DNA and chromosome concepts; the basis of heredity and mutation.'],
    of_dongu: ['Matter cycles and sustainability', 'Water, oxygen and carbon cycles; carbon footprint and sustainable development.'],

    donum: ['Milestones in biology', 'How discoveries such as vaccines, antibiotics, the structure of DNA, PCR and CRISPR have contributed to human life.'],
    bilim: ['Nature of science and scientific inquiry', 'The research process from problem and hypothesis to experiment and conclusion, and the features of scientific knowledge.'],
    etik: ['Ethics in science', 'The rules to follow in scientific research and the responsibilities of researchers.'],
    ortak: ['Shared traits of living things', 'Traits seen in all living things, such as cellular structure, metabolism, homeostasis, reproduction, response to stimuli and adaptation.'],
    virus: ['Viruses', 'Why viruses, which lack cellular structure, cannot be classified as either living or non-living.'],
    sinif: ['Classification and binomial nomenclature', 'Linnaeus’s binomial naming and classification ranks such as species, genus and family.'],
    domain: ['The three-domain system', 'Dividing living things into three large groups: bacteria, archaea and eukaryotes.'],
    bakteri: ['Bacteria and archaea', 'How these two prokaryotic groups are alike and different, and where they live.'],
    okaryotlar: ['Protists, plants, fungi, animals', 'General features and examples of the four groups in the eukaryote domain.'],
    biocesit: ['Biodiversity', 'Genetic, species and ecosystem diversity; Türkiye’s endemic species.'],

    su: ['Water and minerals', 'Properties of water such as acting as a solvent, adhesion and cohesion; the roles of minerals in the body.'],
    karb: ['Carbohydrates', 'From glucose to starch, glycogen and cellulose; the cell’s main source of energy.'],
    yag: ['Fats (lipids)', 'Triglycerides, phospholipids and steroids; energy storage and a building block of the cell membrane.'],
    protein: ['Proteins', 'Organic molecules built from amino acids, with the greatest variety of structures and functions.'],
    enzim: ['Enzymes', 'Biological catalysts that speed up reactions; how pH and temperature affect enzyme activity.'],
    nukleik9: ['Structure of nucleic acids', 'The general structure of DNA and RNA, built from nucleotides.'],
    vitamin: ['Vitamins', 'Fat-soluble and water-soluble vitamins and their roles in the body.'],
    hucre: ['Prokaryotic and eukaryotic cells', 'Comparing cells without a nucleus with cells that have a membrane-bound nucleus.'],
    organel: ['Cell membrane and organelles', 'Structures such as the cell membrane, cytoplasm, mitochondria, chloroplasts and ribosomes, and how they work together.'],
    madde: ['Transport across the cell membrane', 'Diffusion, osmosis, active transport, endocytosis and exocytosis.'],
    dokuorgan: ['From cells to tissues, organs and systems', 'Similar cells form tissues, tissues form organs, and organs form systems.'],

    atp: ['ATP and energy transfer', 'The structure of ATP, the cell’s energy carrier, and its role in transferring energy.'],
    fotosentez: ['Photosynthesis', 'Making food from carbon dioxide and water using light energy; the light-dependent and light-independent stages.'],
    kemosentez: ['Chemosynthesis', 'How some bacteria make food using chemical energy instead of light.'],
    sindirim: ['Types of digestion in living things', 'Intracellular and extracellular digestion; digestive structures in different organisms.'],
    insansind: ['Human digestion, absorption and transport', 'How food is broken down, passes into the blood and is carried to the cells.'],
    solunum: ['Cellular respiration', 'Cells convert the chemical energy in food into ATP. Aerobic respiration proceeds through glycolysis, the Krebs cycle and the electron transport chain; it ends with ATP, carbon dioxide and water.'],
    ferment: ['Fermentation', 'Obtaining energy without using oxygen; lactic acid and ethanol fermentation.'],
    metab: ['Energy and metabolism', 'How energy from food is used in processes such as muscle activity, synthesis and active transport.'],

    ekosistem: ['Components of an ecosystem', 'Relationships between non-living components such as light, water and soil and the living components.'],
    populasyon: ['Populations, communities and succession', 'Population growth, carrying capacity and how communities change over time.'],
    etkilesim: ['Interactions within and between species', 'Relationships between organisms such as competition, predation and symbiosis.'],
    enerjiakis: ['Food chains, food webs and energy flow', 'How energy passes from producers to consumers and decreases at each level.'],
    piramit: ['Ecological pyramids and biomagnification', 'The energy pyramid and how harmful substances build up along the food chain.'],
    dongu: ['Matter cycles', 'How the water, carbon and nitrogen cycles work between the living and non-living parts of the environment.'],
    surdur: ['Ecological sustainability', 'Factors that limit sustainability, such as habitat loss, pollution and loss of biodiversity.'],
    ayakizi: ['Ecological footprint', 'Measuring an individual’s use of natural resources, and ways to reduce it.'],
    koruma: ['Conserving natural resources and waste management', 'Protected areas, practices such as Zero Waste, and recycling.'],

    bitkihormon: ['Plant hormones', 'The effects of auxin, gibberellin, ethylene and abscisic acid on growth and ripening.'],
    tropizma: ['Tropisms and nastic movements', 'Plant movements that depend on the direction of a stimulus (tropisms) and that do not (nastic movements).'],
    duyu: ['Sensory receptors and sense organs', 'Structures that detect light, sound, pressure and chemical stimuli.'],
    noron: ['Neurons and signal transmission', 'The structure of the neuron, impulse conduction through changes in membrane potential, and the synapse.'],
    sinirfark: ['Differences in animal nervous systems', 'How the structure of the nervous system diversifies from sponges to mammals.'],
    insansinir: ['The human nervous system', 'The central and peripheral nervous systems; how sensory neurons, interneurons and motor neurons work together.'],
    refleks: ['Reflexes', 'Involuntary, fast responses such as the knee-jerk and pupillary reflexes; the reflex arc.'],
    iskelet: ['Bones, joints and muscles', 'How the skeleton, joints and muscles work in coordination to produce movement.'],
    kasilma: ['Mechanism of muscle contraction', 'Actin and myosin sliding past each other in the sarcomere (the sliding filament model).'],
    bagisiklik: ['Immunity', 'Innate and acquired immunity; active and passive immunity, vaccines.'],
    alerji: ['Allergies', 'The immune system overreacting to harmless substances.'],

    homeo: ['Homeostasis and its importance', 'How the body keeps its internal environment (temperature, pH, water, blood sugar) within certain limits.'],
    geribildirim: ['Positive and negative feedback', 'Regulatory loops that correct or amplify a change.'],
    endokrin: ['The endocrine system', 'How the pituitary, thyroid, pancreas and adrenal glands maintain balance through hormones.'],
    dolasim: ['The circulatory system', 'The role of the heart, blood vessels and lymphatic system in transporting substances and balancing blood pressure.'],
    solsis: ['The respiratory system', 'Gas exchange in the alveoli; keeping oxygen, carbon dioxide and pH in balance.'],
    bosaltim: ['The excretory system and the nephron', 'How nephrons in the kidneys remove waste and keep water and salt in balance.'],
    saglik: ['Homeostasis disorders', 'Conditions in which balance cannot be maintained, such as diabetes, hypertension and obesity.'],

    kromozom: ['Chromosome structure', 'How DNA is packaged with proteins to form chromosomes.'],
    dongu12: ['The cell cycle and mitosis', 'Interphase, mitosis and cytokinesis; the basis of growth and repair.'],
    mayoz: ['Meiosis', 'The division that halves the chromosome number and creates hereditary variation.'],
    ayrilmama: ['Chromosomal nondisjunction', 'Chromosomes failing to separate during division, and outcomes such as Down syndrome.'],
    eseysiz: ['Asexual reproduction', 'Fission, budding, spore formation and vegetative reproduction; offspring that resemble the parent.'],
    gametogenez: ['Gametogenesis and fertilization', 'The formation of sperm and eggs (spermatogenesis, oogenesis) and fertilization.'],
    insanureme: ['The human reproductive system', 'The female and male reproductive systems; hormonal regulation of the menstrual cycle.'],
    embriyo: ['Embryonic development', 'Cleavage, gastrulation and organogenesis after fertilization.'],
    cicek: ['Reproduction in flowering plants', 'Parts of the flower, pollination, fertilization, and seed and fruit formation.'],
    cimlenme: ['Germination and dormancy', 'Factors such as water, temperature and oxygen that affect seed germination.'],

    dnayapi: ['Molecular structure of DNA and RNA', 'The DNA double helix, base pairing and how RNA differs from DNA.'],
    replikasyon: ['DNA replication', 'How DNA copies itself according to the semi-conservative model.'],
    genifade: ['Gene expression', 'The genetic code; from gene to protein through transcription and translation.'],
    mutasyon: ['Mutations', 'The causes of changes in genetic material and their effects on the organism.'],
    mendel: ['Mendelian inheritance', 'Monohybrid, dihybrid and test crosses; dominance and recessiveness.'],
    esbaskin: ['Codominance and multiple alleles', 'Patterns of inheritance that differ from Mendelian ratios, as seen in blood groups.'],
    eseybagli: ['Sex-linked inheritance and pedigrees', 'Traits carried on the X and Y chromosomes; color blindness and hemophilia.'],
    gentest: ['Genetic testing and counseling', 'Assessing the risk of inherited disease; the risks of consanguineous marriage.'],
    biyotek: ['Biotechnology and ethics', 'Recombinant DNA, vaccine and hormone production, GMOs, stem cells and ethical debates.']
  };
  // 'kaynak>hedef' → gerekçe
  var LEN = {
    'of_bilim>bilim': 'The basic features of the nature of science are introduced in middle-school science; in grade 9 they deepen through the research process.',
    'of_canli>ortak': 'The criteria for life are first covered in middle-school science; in grade 9 they are generalized to all living things.',
    'of_hucre>hucre': 'The basic structure of the cell is assumed to be known from grade 5.',
    'of_hucre>organel': 'Without knowing the cell membrane, cytoplasm and nucleus, the division of labor among organelles can’t be understood.',
    'of_bioc>biocesit': 'Biodiversity and extinct species are covered in grade 6.',
    'of_bioc>ekosistem': 'The concepts of habitat and ecosystem underpin the components of an ecosystem.',
    'of_besinz>enerjiakis': 'Producers, consumers and decomposers are the building blocks of the food web.',
    'of_fotos>fotosentez': 'The basic concepts of photosynthesis are assumed to be learned in grade 8.',
    'of_fotos>solunum': 'Why respiration matters to living things is learned in grade 8; in grade 10 it is covered step by step.',
    'of_sistem>insansind': 'The roles of the digestive organs are known from grade 7.',
    'of_sistem>dolasim': 'The structure and organs of the circulatory system are learned in grade 7.',
    'of_sistem>solsis': 'The organs of the respiratory system are learned in grade 7.',
    'of_sistem>bosaltim': 'The roles of the excretory organs are learned in grade 7.',
    'of_sinir>insansinir': 'The distinction between the central and peripheral nervous systems is made in grade 6.',
    'of_sinir>endokrin': 'Basic knowledge about hormones is learned in grade 6.',
    'of_destek>iskelet': 'The structure of the support and movement system is learned in grade 5.',
    'of_ureme>insanureme': 'The basic stages of reproduction, growth and development are covered in grade 6.',
    'of_dna>kromozom': 'The concepts of gene, DNA and chromosome are known from grade 8.',
    'of_dna>dnayapi': 'Nucleotides and the genetic code are the basis of DNA’s molecular structure.',
    'of_dna>mendel': 'Genotype, phenotype and heredity are introduced in grade 8.',
    'of_dongu>dongu': 'The water and carbon cycles are learned in grade 8; in grade 10 they are extended with the nitrogen cycle.',

    'bilim>etik': 'Knowing the research process makes it easier to see which ethical rule applies at which step.',
    'bilim>donum': 'Knowing the scientific method makes it easier to understand how milestone discoveries were made.',
    'ortak>virus': 'To discuss whether viruses count as living, you need to know the criteria for life.',
    'ortak>sinif': 'Seeing shared and differing traits gives you the criteria for grouping living things.',
    'ortak>homeo': 'Homeostasis is introduced in grade 9 as a trait of life; in grade 11 it is explained through the body systems.',
    'ortak>duyu': 'Response to stimuli is already familiar as one of the shared traits of living things.',
    'sinif>domain': 'The domain is the highest rank of classification.',
    'hucre>domain': 'The prokaryote–eukaryote distinction is the quickest way to tell the three domains apart.',
    'domain>bakteri': 'Bacteria and archaea are the two prokaryotic groups in the domain system.',
    'domain>okaryotlar': 'Protists, plants, fungi and animals are subgroups of the eukaryote domain.',
    'sinif>biocesit': 'Naming species is what makes it possible to measure biodiversity.',
    'su>madde': 'Osmosis is the movement of water across a membrane; it can’t be explained without the properties of water.',
    'protein>enzim': 'Enzymes are proteins; when their structure breaks down (denaturation) they lose their function.',
    'nukleik9>dnayapi': 'The general structure of nucleotides should be known before moving on to the molecular structure of DNA.',
    'nukleik9>atp': 'ATP is also a nucleotide; knowing nucleotide structure makes ATP easier to recognize.',
    'nukleik9>kromozom': 'Chromosomes are DNA in packaged form.',
    'karb>solunum': 'Glucose is the main fuel of cellular respiration.',
    'karb>fotosentez': 'The structure of glucose, the product of photosynthesis, is learned in grade 9.',
    'yag>solunum': 'Seeing that fats can also enter respiration makes it easier to compare energy sources.',
    'yag>madde': 'The phospholipid structure of the cell membrane explains which substances pass through easily.',
    'enzim>solunum': 'Every step of respiration runs on enzymes; that is where the effects of temperature and pH come from.',
    'enzim>fotosentez': 'Knowing that the Calvin cycle runs on enzymes explains how temperature affects the rate of photosynthesis.',
    'enzim>insansind': 'Digestion is the breakdown of food into small molecules by enzymes.',
    'vitamin>enzim': 'Some vitamins work as helper molecules (coenzymes) for enzymes.',
    'hucre>organel': 'Organelles make sense within the structure of the eukaryotic cell.',
    'hucre>dokuorgan': 'A tissue forms when cells with a similar structure come together.',
    'organel>madde': 'Transport across the membrane depends on the structure of the cell membrane.',
    'organel>fotosentez': 'Photosynthesis takes place in the chloroplast.',
    'organel>solunum': 'The Krebs cycle and electron transport chain steps of aerobic respiration take place in the mitochondria.',
    'madde>insansind': 'Absorption is the passage of nutrient monomers across the membranes of intestinal cells.',
    'madde>noron': 'A nerve impulse is a change in potential caused by ions crossing the neuron membrane.',
    'madde>solsis': 'Gas exchange in the alveoli happens by diffusion.',
    'madde>bosaltim': 'Filtration and reabsorption in the nephron are applications of transport across membranes.',
    'dokuorgan>homeo': 'Homeostasis is maintained by tissues, organs and systems working together.',
    'dokuorgan>insansind': 'Seeing the organ and system levels makes it easier to place the parts of the digestive tract.',

    'atp>fotosentez': 'The ATP made in the light-dependent stage is used in the light-independent stage.',
    'atp>solunum': 'The purpose of cellular respiration is to make ATP; without knowing ATP, the outcome makes no sense.',
    'atp>kasilma': 'Muscle contraction uses up ATP.',
    'atp>metab': 'The energy for metabolic processes is transferred by ATP.',
    'fotosentez>solunum': 'The matter and energy relationship set up in photosynthesis makes it easier to read respiration in reverse.',
    'fotosentez>kemosentez': 'Compared with photosynthesis, what sets chemosynthesis apart (its energy source) is easy to see.',
    'fotosentez>enerjiakis': 'The energy in an ecosystem is the energy that producers capture through photosynthesis.',
    'fotosentez>dongu': 'In the carbon cycle, CO₂ enters living things through photosynthesis.',
    'sindirim>insansind': 'Seeing the digestive structures of different organisms makes it easier to understand the human system by comparison.',
    'insansind>solunum': 'The glucose, fatty acids and amino acids released by digestion reach the cells and become the inputs of respiration.',
    'insansind>dolasim': 'Absorbed substances are carried by the circulatory system.',
    'solunum>ferment': 'Glycolysis is shared by both processes; knowing respiration makes it easier to see how fermentation differs.',
    'solunum>metab': 'Cellular respiration is the source of the energy used in metabolism.',
    'solunum>enerjiakis': 'At each level, part of the energy is lost as heat through respiration, which explains why the pyramid narrows.',
    'solunum>solsis': 'The cells’ need for O₂ and their production of CO₂ explain why the respiratory system works.',
    'solunum>kasilma': 'Knowing that the ATP muscles use is made by respiration makes fatigue easier to understand.',
    'solunum>dongu': 'The CO₂ released by respiration is part of the carbon cycle.',
    'ferment>biyotek': 'Making yogurt, cheese and bread is traditional biotechnology based on fermentation.',
    'kemosentez>dongu': 'Some bacteria in the nitrogen cycle carry out chemosynthesis.',
    'bakteri>kemosentez': 'Knowing that chemosynthetic organisms are bacteria and archaea makes the topic concrete.',
    'metab>homeo': 'Energy balance is one of the variables that homeostasis maintains.',
    'metab>saglik': 'The balance between energy taken in and energy used is the basis of obesity.',

    'ekosistem>populasyon': 'Populations and communities are levels of the living components of an ecosystem.',
    'populasyon>etkilesim': 'Interactions take place between and within populations.',
    'ekosistem>enerjiakis': 'Energy flows between the components of an ecosystem.',
    'enerjiakis>piramit': 'An ecological pyramid is a picture of energy loss along the food chain.',
    'ekosistem>dongu': 'Matter cycles run between the living and non-living components of an ecosystem.',
    'dongu>surdur': 'Disrupted cycles (eutrophication, climate change) explain sustainability problems.',
    'biocesit>surdur': 'Loss of biodiversity is one of the main factors that limit sustainability.',
    'surdur>ayakizi': 'The ecological footprint is the individual measure of sustainability.',
    'surdur>koruma': 'Conservation and waste management are practices aimed at achieving sustainability.',
    'biocesit>koruma': 'Knowing endemic species makes the reasons for conservation measures concrete.',
    'piramit>surdur': 'Biomagnification shows how pollution acts through the food chain.',

    'bitkihormon>tropizma': 'Tropic movements result from the uneven distribution of auxin in cells.',
    'bitkihormon>cimlenme': 'Knowing the effects of gibberellin and abscisic acid explains how dormancy is broken.',
    'noron>insansinir': 'The nervous system is built from networks of neurons.',
    'noron>refleks': 'The reflex arc is made up of sensory neurons, interneurons and motor neurons.',
    'noron>duyu': 'Knowing that receptors turn a stimulus into a neural signal makes it easier to study the senses together.',
    'noron>sinirfark': 'Knowing the structure of neurons makes it easier to compare nerve networks in animals.',
    'insansinir>refleks': 'How the spinal cord handles a reflex can’t be understood without knowing the central nervous system.',
    'duyu>refleks': 'A reflex begins when a stimulus is detected.',
    'insansinir>sinirfark': 'The human nervous system represents one end of the diversification seen in animals.',
    'iskelet>kasilma': 'Muscle contraction produces movement only together with bones and joints.',
    'noron>kasilma': 'Contraction is triggered by an impulse from a motor neuron.',
    'insansinir>iskelet': 'Knowing that voluntary movement starts in the nervous system explains coordination.',
    'protein>kasilma': 'The protein structure of actin and myosin makes the contraction model concrete.',
    'protein>bagisiklik': 'Antibodies are proteins; knowing protein structure makes antigen recognition easier to understand.',
    'bagisiklik>alerji': 'An allergy is an overreaction of the immune system.',
    'virus>bagisiklik': 'Vaccines and viral diseases are how immunity shows up in everyday life.',
    'insansinir>homeo': 'The curriculum lists response in animals as an assumed foundation of the homeostasis theme.',

    'homeo>geribildirim': 'Feedback is the mechanism through which homeostasis works.',
    'geribildirim>endokrin': 'Hormone levels are mostly regulated by negative feedback.',
    'insansinir>endokrin': 'The hypothalamus controlling the pituitary shows the link between the nervous and endocrine systems.',
    'homeo>dolasim': 'Balancing blood pressure and blood volume is the circulatory system’s role in homeostasis.',
    'homeo>solsis': 'Balancing blood pH and CO₂ is the respiratory system’s role in homeostasis.',
    'homeo>bosaltim': 'Keeping water and salt in balance is the excretory system’s role in homeostasis.',
    'endokrin>saglik': 'Diabetes is a disorder in the regulation carried out by hormones such as insulin and ADH.',
    'dolasim>saglik': 'Hypertension is a disruption of blood pressure balance.',
    'bosaltim>saglik': 'In diabetes insipidus the kidney can’t reabsorb water, which makes the nephron’s job concrete.',
    'dolasim>solsis': 'Gas transport happens through the two systems working together.',
    'dolasim>bosaltim': 'The nephron works by filtering the blood.',
    'endokrin>insanureme': 'The menstrual cycle is regulated by pituitary and ovarian hormones.',

    'kromozom>dongu12': 'The even distribution of chromosomes in mitosis can’t be followed without knowing chromosome structure.',
    'dongu12>mayoz': 'Meiosis is learned by comparing it with mitosis.',
    'mayoz>ayrilmama': 'Nondisjunction is when chromosomes don’t move evenly to the poles during meiosis.',
    'mayoz>gametogenez': 'Gametes are formed by meiosis.',
    'dongu12>eseysiz': 'Asexual reproduction relies on mitotic division.',
    'gametogenez>insanureme': 'Knowing how sperm and eggs form makes the roles of the reproductive organs easier to understand.',
    'gametogenez>embriyo': 'Embryonic development begins with fertilization.',
    'insanureme>embriyo': 'How pregnancy proceeds in the reproductive system is the context for embryonic development.',
    'cicek>cimlenme': 'A seed forms as a result of fertilization in the flower.',
    'mayoz>cicek': 'Knowing that pollen and egg cells form by meiosis explains fertilization in plants.',
    'eseysiz>gametogenez': 'Asexual and sexual reproduction are compared by their advantages and disadvantages.',
    'eseysiz>biyotek': 'Vegetative reproduction is the basis of plant tissue culture and cloning.',
    'dongu12>replikasyon': 'Knowing that DNA is copied during interphase explains why replication is needed.',

    'dnayapi>replikasyon': 'Replication relies on the base-pairing rule.',
    'dnayapi>genifade': 'Transcription goes from DNA to RNA, translation from RNA to protein.',
    'protein>genifade': 'The product of gene expression is a protein; the structure of amino acids should be known.',
    'genifade>mutasyon': 'The effect of a mutation is understood through which protein the changed code affects.',
    'replikasyon>mutasyon': 'Knowing that copying errors are a source of mutations makes the topic concrete.',
    'mayoz>mendel': 'Alleles are distributed separately into gametes during meiosis.',
    'mendel>esbaskin': 'Codominance is defined as a departure from Mendel’s principle of dominance.',
    'mendel>eseybagli': 'Sex-linked inheritance problems are applications of Mendelian crosses.',
    'kromozom>eseybagli': 'The structure of the X and Y sex chromosomes is the basis of sex-linked inheritance.',
    'eseybagli>gentest': 'Reading a pedigree shows how genetic counseling calculates risk.',
    'mutasyon>gentest': 'Genetic tests look for specific mutations.',
    'ayrilmama>gentest': 'Abnormal chromosome numbers are well-known examples of what genetic tests detect.',
    'mutasyon>ayrilmama': 'Both are changes in genetic material; one is at the gene level, the other at the chromosome level.',
    'genifade>biyotek': 'Making products with recombinant DNA relies on gene expression.',
    'replikasyon>biyotek': 'PCR is replication repeated in the laboratory.',
    'etik>biyotek': 'The principles of research ethics are the basis for evaluating debates on GMOs and stem cells.',
    'donum>biyotek': 'PCR, recombinant DNA and CRISPR are counted among the milestone discoveries.',
    'esbaskin>dolasim': 'Blood groups determine compatibility in blood transfusions.'
  };

  /* dile bağlı metinler */
  var NT = '(yeni sekmede açılır)', NT_EN = '(opens in a new tab)';
  var LOC = {
    tr: { locale: 'tr', mid: 'Ortaokul', grade: function (g) { return g + '. sınıf'; }, code: function (c) { return c; },
      curriculum: 'Türkiye Yüzyılı Maarif Modeli · Biyoloji Dersi Öğretim Programı (2026)', checkedAt: 'Ekim 2026',
      fenProgram: function (c) { return 'Fen Bilimleri öğretim programı (' + c + ')'; }, notVerified: 'Bağlantı henüz doğrulanmadı',
      book: function (g) { return 'Biyoloji ' + g + '. sınıf ders kitabı'; }, notPublished: 'Henüz yayımlanmadı',
      outcomes: function (th) { return th + ' teması · öğrenme çıktıları'; }, support: function (g) { return g + '. sınıf destekleme etkinlikleri'; },
      qbank: 'Kazanım bazlı soru bankası', programTitle: 'Biyoloji dersi öğretim programı (PDF)',
      lead: 'Harita ile aynı konular, aynı sırayla. Bir konuya dokunursan ön koşulları, sonraki konuları ve resmî kaynakları görürsün.',
      themePage: 'Resmî tema sayfası', newTab: NT, source: 'Kaynak', programLink: 'Öğretim programı (PDF)' },
    en: { locale: 'en', mid: 'Middle school', grade: function (g) { return 'Grade ' + g; }, code: function (c) { return c.replace(/^Fen /, 'Science '); },
      curriculum: 'Türkiye Yüzyılı Maarif Modeli · Biology Curriculum (2026)', checkedAt: 'October 2026',
      fenProgram: function (c) { return 'Science curriculum (' + c + ')'; }, notVerified: 'Link not verified yet',
      book: function (g) { return 'Biology grade ' + g + ' textbook (in Turkish)'; }, notPublished: 'Not published yet',
      outcomes: function (th) { return th + ' theme · learning outcomes (in Turkish)'; }, support: function (g) { return 'Grade ' + g + ' support activities (in Turkish)'; },
      qbank: 'Question bank by learning outcome (in Turkish)', programTitle: 'Biology curriculum (PDF, in Turkish)',
      lead: 'The same topics as the map, in the same order. Tap a topic to see its prerequisites, next topics and official resources.',
      themePage: 'Official theme page (in Turkish)', newTab: NT_EN, source: 'Source', programLink: 'Curriculum (PDF, in Turkish)' }
  };

  var themeById = {}; themes.forEach(function (t) { themeById[t.id] = t; t.names = { tr: t.name, en: themeEn[t.id] }; });
  var topics = raw.map(function (r) {
    var th = themeById[r[1]], e = EN[r[0]] || [];
    return { id: r[0], theme: r[1], grade: th.grade,
      i18n: { tr: { name: r[2], summary: r[4] }, en: { name: e[0], summary: e[1] } }, codeTr: r[3] };
  });
  var byId = {}; topics.forEach(function (t) { byId[t.id] = t; });
  var links = L.map(function (l) { return { from: l[0], to: l[1], type: l[2], reasons: { tr: l[3], en: LEN[l[0] + '>' + l[1]] } }; })
    .filter(function (l) { return byId[l.from] && byId[l.to]; });

  var api = { lang: 'tr' };
  function gradeName(g) { var S = LOC[api.lang]; return g === 'O' ? S.mid : S.grade(g); }
  /* Görünen alanları (name, summary, code, themeName, gradeLabel, reason) seçili dile çevirir */
  function setLang(lang) {
    lang = LOC[lang] ? lang : 'tr';
    var S = LOC[lang], other = lang === 'tr' ? 'en' : 'tr';
    api.lang = lang;
    themes.forEach(function (th) { th.name = th.names[lang]; });
    topics.forEach(function (t) {
      var o = t.i18n[lang];
      t.name = o.name; t.summary = o.summary; t.alt = t.i18n[other].name;
      t.code = S.code(t.codeTr); t.themeName = themeById[t.theme].name;
      t.gradeLabel = t.grade === 'O' ? S.mid + ' · ' + t.code : S.grade(t.grade);
    });
    links.forEach(function (l) { l.reason = l.reasons[lang]; });
    api.curriculum = S.curriculum; api.checkedAt = S.checkedAt;
    return lang;
  }
  /* Eksik İngilizce metinler (build.js derlemeyi durdurur) */
  function missing() {
    var out = [];
    themes.forEach(function (t) { if (!t.names.en) out.push('tema ' + t.id); });
    topics.forEach(function (t) { if (!t.i18n.en.name || !t.i18n.en.summary) out.push('konu ' + t.id); });
    links.forEach(function (l) { if (!l.reasons.en) out.push('bağlantı ' + l.from + '>' + l.to); });
    var known = {}; links.forEach(function (l) { known[l.from + '>' + l.to] = 1; });
    Object.keys(LEN).forEach(function (k) { if (!known[k]) out.push('fazla gerekçe ' + k); });
    Object.keys(EN).forEach(function (k) { if (!byId[k]) out.push('fazla konu ' + k); });
    return out;
  }

  var books = {
    9: { url: T + '/kitap/36/biyoloji-dersi-9sinif-ders-kitabi', sup: T + '/kitap/118/biyoloji-dersi-9sinif-destekleme-etkinlikleri', rich: T + '/kitap/101/biyoloji-dersi-9sinif-zenginlestirme-etkinlikleri' },
    10: { url: T + '/kitap/71/biyoloji-dersi-10sinif-ders-kitabi', sup: T + '/kitap/126/biyoloji-dersi-10sinif-destekleme-etkinlikleri', rich: T + '/kitap/109/biyoloji-dersi-10sinif-zenginlestirme-etkinlikleri' },
    11: { url: T + '/kitap/400/biyoloji-dersi-11sinif-ders-kitabi' }
  };
  var PROGRAM_PDF = T + '/assets/pdf/biyoloji-dersi_20260819_142444_074.pdf';

  function resources(id) {
    var t = byId[id], th = themeById[t.theme], out = [], S = LOC[api.lang];
    if (t.grade === 'O') {
      out.push({ title: S.fenProgram(t.code), source: 'MEB', verified: false, note: S.notVerified });
      return out;
    }
    var b = books[t.grade];
    if (b) out.push({ title: S.book(t.grade), source: 'MEB · TYMM', url: b.url, verified: true });
    else out.push({ title: S.book(t.grade), source: 'MEB · TYMM', verified: false, note: S.notPublished });
    out.push({ title: S.outcomes(th.name), source: 'MEB · TYMM', url: th.url, verified: true });
    if (b && b.sup) out.push({ title: S.support(t.grade), source: 'MEB · TYMM', url: b.sup, verified: true });
    if (t.grade === 9) out.push({ title: S.qbank, source: 'EBA · OGM Materyal', url: 'https://ogmmateryal.eba.gov.tr/soru-bankasi-kazanim/biyoloji?s=21&d=199', verified: true });
    out.push({ title: S.programTitle, source: 'MEB · TYMM', url: PROGRAM_PDF, verified: true });
    return out;
  }

  /* Konu dizini (index.html içindeki statik liste; build.js ve dil değişiminde app.js kullanır) */
  function listHTML() {
    var S = LOC[api.lang], sr = '<span class="sr"> ' + S.newTab + '</span>';
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var h = '        <p class="lead">' + S.lead + '</p>\n';
    themes.forEach(function (t) {
      h += '        <h3>' + esc(t.name) + ' <small>' + esc(gradeName(t.grade).toLocaleUpperCase(S.locale)) + '</small>' + (t.url ? ' <a class="off" href="' + t.url + '" target="_blank" rel="noopener">' + S.themePage + sr + '</a>' : '') + '</h3>\n        <ul>\n';
      topics.filter(function (x) { return x.theme === t.id; }).forEach(function (x) {
        h += '          <li><a class="t" href="#konu=' + x.id + '"><b>' + esc(x.name) + '</b><span>' + esc(x.code) + '</span><p>' + esc(x.summary) + '</p></a></li>\n';
      });
      h += '        </ul>\n';
    });
    h += '        <p class="foot">' + S.source + ': ' + esc(S.curriculum) + '. <a href="' + PROGRAM_PDF + '" target="_blank" rel="noopener">' + S.programLink + sr + '</a></p>\n';
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

  /* Türkçe karakter toleransı: hucre = hücre, ogrenme = öğrenme */
  function norm(s) {
    return (s || '').toLocaleLowerCase('tr').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u')
      .replace(/[’'()·,.\-–]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  /* sıralama: tam başlık > başlık başı > başlıkta geçen > kazanım kodu > öbür dildeki başlık > açıklama; eşitlikte lise konusu ortaokuldan önce */
  function search(q, pred) {
    var n = norm(q); if (!n) return [];
    var qc = n.replace(/ /g, ''), codeQ = /\d/.test(qc) && qc.length >= 3 || /^biy/.test(qc);
    return topics.map(function (t, i) {
      if (pred && !pred(t)) return null;
      var name = norm(t.name), k = name.indexOf(n), s = 0;
      if (name === n) s = 6; else if (k === 0) s = 5; else if (k > 0) s = 4;
      else if (codeQ && (norm(t.code).replace(/ /g, '').indexOf(qc) >= 0 || norm(t.codeTr).replace(/ /g, '').indexOf(qc) >= 0)) s = 3;
      else if (norm(t.alt).indexOf(n) >= 0) s = 2;
      else if (norm(t.summary).indexOf(n) >= 0) s = 1;
      return s ? { t: t, s: s, o: t.grade === 'O' ? 1 : 0, i: i } : null;
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s || a.o - b.o || a.i - b.i; }).map(function (x) { return x.t; });
  }

  api.themes = themes; api.themeById = themeById; api.topics = topics; api.byId = byId; api.links = links;
  api.resources = resources; api.neighbors = neighbors; api.search = search; api.programPdf = PROGRAM_PDF;
  api.setLang = setLang; api.gradeName = gradeName; api.listHTML = listHTML; api.missing = missing;
  setLang('tr');
  window.EBA_DATA = api;
})();
