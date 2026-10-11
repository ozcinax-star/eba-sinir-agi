// EBA Biyoloji Haritası — konu verisi (Türkiye Yüzyılı Maarif Modeli 2026, Biyoloji 9–12)
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

  var themeById = {}; themes.forEach(function (t) { themeById[t.id] = t; });
  var topics = raw.map(function (r) {
    var th = themeById[r[1]];
    return { id: r[0], theme: r[1], themeName: th.name, grade: th.grade, name: r[2], code: r[3], summary: r[4],
      gradeLabel: th.grade === 'O' ? 'Ortaokul · ' + r[3] : th.grade + '. sınıf' };
  });
  var byId = {}; topics.forEach(function (t) { byId[t.id] = t; });
  var links = L.map(function (l) { return { from: l[0], to: l[1], type: l[2], reason: l[3] }; })
    .filter(function (l) { return byId[l.from] && byId[l.to]; });

  var books = {
    9: { url: T + '/kitap/36/biyoloji-dersi-9sinif-ders-kitabi', sup: T + '/kitap/118/biyoloji-dersi-9sinif-destekleme-etkinlikleri', rich: T + '/kitap/101/biyoloji-dersi-9sinif-zenginlestirme-etkinlikleri' },
    10: { url: T + '/kitap/71/biyoloji-dersi-10sinif-ders-kitabi', sup: T + '/kitap/126/biyoloji-dersi-10sinif-destekleme-etkinlikleri', rich: T + '/kitap/109/biyoloji-dersi-10sinif-zenginlestirme-etkinlikleri' },
    11: { url: T + '/kitap/400/biyoloji-dersi-11sinif-ders-kitabi' }
  };
  var PROGRAM_PDF = T + '/assets/pdf/biyoloji-dersi_20260819_142444_074.pdf';

  function resources(id) {
    var t = byId[id], th = themeById[t.theme], out = [];
    if (t.grade === 'O') {
      out.push({ title: 'Fen Bilimleri öğretim programı (' + t.code + ')', source: 'MEB', verified: false, note: 'Bağlantı henüz doğrulanmadı' });
      return out;
    }
    var b = books[t.grade];
    if (b) out.push({ title: 'Biyoloji ' + t.grade + '. sınıf ders kitabı', source: 'MEB · TYMM', url: b.url, verified: true });
    else out.push({ title: 'Biyoloji ' + t.grade + '. sınıf ders kitabı', source: 'MEB · TYMM', verified: false, note: 'Henüz yayımlanmadı' });
    out.push({ title: th.name + ' teması · öğrenme çıktıları', source: 'MEB · TYMM', url: th.url, verified: true });
    if (b && b.sup) out.push({ title: t.grade + '. sınıf destekleme etkinlikleri', source: 'MEB · TYMM', url: b.sup, verified: true });
    if (t.grade === 9) out.push({ title: 'Kazanım bazlı soru bankası', source: 'EBA · OGM Materyal', url: 'https://ogmmateryal.eba.gov.tr/soru-bankasi-kazanim/biyoloji?s=21&d=199', verified: true });
    out.push({ title: 'Biyoloji dersi öğretim programı (PDF)', source: 'MEB · TYMM', url: PROGRAM_PDF, verified: true });
    return out;
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
  /* sıralama: tam başlık > başlık başı > başlıkta geçen > kazanım kodu > açıklama; eşitlikte lise konusu ortaokuldan önce */
  function search(q, pred) {
    var n = norm(q); if (!n) return [];
    var qc = n.replace(/ /g, ''), codeQ = /\d/.test(qc) && qc.length >= 3 || /^biy/.test(qc);
    return topics.map(function (t, i) {
      if (pred && !pred(t)) return null;
      var name = norm(t.name), k = name.indexOf(n), s = 0;
      if (name === n) s = 6; else if (k === 0) s = 5; else if (k > 0) s = 4;
      else if (codeQ && norm(t.code).replace(/ /g, '').indexOf(qc) >= 0) s = 3;
      else if (norm(t.summary).indexOf(n) >= 0) s = 1;
      return s ? { t: t, s: s, o: t.grade === 'O' ? 1 : 0, i: i } : null;
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s || a.o - b.o || a.i - b.i; }).map(function (x) { return x.t; });
  }

  window.EBA_DATA = { themes: themes, themeById: themeById, topics: topics, byId: byId, links: links,
    resources: resources, neighbors: neighbors, search: search, programPdf: PROGRAM_PDF,
    curriculum: 'Türkiye Yüzyılı Maarif Modeli · Biyoloji Dersi Öğretim Programı (2026)', checkedAt: 'Ekim 2026' };
})();
