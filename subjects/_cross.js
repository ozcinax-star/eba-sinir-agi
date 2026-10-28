// Dersler arası bağlantılar · Türkiye Yüzyılı Maarif Modeli 2024. Biçim: [kaynak, hedef, tür, gerekçe TR, gerekçe EN].
// Bir bağlantı yalnızca iki ders birlikte gösterildiğinde haritaya eklenir. Doğrulama: node tools/validate-cross.js
EBA.cross([
  // Matematik → Kimya
  ['mat_o_oran', 'kim_molozel', 'on', 'Mol, kütle ve tanecik sayısı arasındaki dönüşümler oran-orantı kurularak yapılır.', 'Conversions between moles, mass and number of particles are done by setting up ratios and proportions.'],
  ['mat_o_us', 'kim_mol', 'kol', 'Avogadro sayısı (6,02·10²³) bilimsel gösterimle yazılır ve işlenir.', 'Avogadro’s number (6.02×10²³) is written and handled in scientific notation.'],
  ['mat_o_oran', 'kim_stok', 'on', 'Stokiyometride girenler ve ürünler arasındaki mol oranlarından orantı kurulur.', 'Stoichiometry sets up proportions from the mole ratios of reactants and products.'],
  ['mat_o_oran', 'kim_molarite', 'kol', 'Molar derişim, çözünen mol sayısının çözelti hacmine oranıdır.', 'Molar concentration is the ratio of moles of solute to the volume of solution.'],
  ['mat_denk9', 'kim_denklem', 'kol', 'Bilinmeyen katsayılarla denkleştirme, doğrusal denklem kurup çözmeye dayanır.', 'Balancing with unknown coefficients relies on setting up and solving linear equations.'],
  ['mat_denk9', 'kim_idealgaz', 'kol', 'İdeal gaz denkleminde bilinmeyen değişken, denklem çözülerek bulunur.', 'The unknown variable in the ideal gas equation is found by solving the equation.'],
  ['mat_fonk', 'kim_gazil', 'kol', 'Charles ve Gay-Lussac yasalarındaki doğrusal ilişkiler doğrusal fonksiyon grafikleriyle okunur.', 'The linear relations in Charles’s and Gay-Lussac’s laws are read from linear function graphs.'],
  ['mat_rasyonel', 'kim_gazil', 'kol', 'Boyle yasasındaki ters orantı (PV = sabit), f(x)=1/x biçimli grafikle temsil edilir.', 'The inverse proportion in Boyle’s law (PV = constant) is represented by a graph of the form f(x)=1/x.'],
  ['mat_log', 'kim_ph', 'on', 'pH = −log[H⁺] tanımı logaritma fonksiyonunu bilmeyi gerektirir.', 'The definition pH = −log[H⁺] requires knowing the logarithm function.'],
  ['mat_o_us', 'kim_otoiyon', 'kol', 'Suyun iyonlaşma sabiti ve iyon derişimleri 10⁻¹⁴ gibi üslü sayılarla ifade edilir.', 'The ion product of water and ion concentrations are expressed with powers such as 10⁻¹⁴.'],
  ['mat_inicel', 'kim_hizdenk', 'kol', 'Hız denklemi, derişim ile hız arasındaki ilişkinin deney verilerinden çıkarılmasıyla bulunur.', 'The rate law is found by deriving the relation between concentration and rate from experimental data.'],
  ['mat_ucgenaci', 'kim_geometri', 'kol', 'Bağ açıları ve doğrusal, üçgen düzlem gibi molekül şekilleri açı ve şekil bilgisiyle yorumlanır.', 'Bond angles and molecular shapes such as linear and trigonal planar are read using knowledge of angles and shapes.'],
  ['mat_ozet', 'kim_nanoeld', 'kol', 'Nanoparçacık deneylerinin verileri ortalama ve yayılım ölçüleriyle analiz edilir.', 'Data from nanoparticle experiments are analysed with measures of centre and spread.'],
  ['mat_turev', 'kim_hizzaman', 'ilg', 'Tepkime hızı derişimin zamana göre değişim oranıdır; türev bu anlık değişimi ifade eder.', 'Reaction rate is the rate of change of concentration over time; the derivative expresses this instant change.'],

  // Matematik → Fizik
  ['mat_o_oran', 'fiz_ohareket', 'kol', 'Sürat, alınan yolun geçen zamana oranı olarak hesaplanır.', 'Speed is calculated as the ratio of distance travelled to time taken.'],
  ['mat_o_oran', 'fiz_basinc', 'kol', 'Basınç, dik etki eden kuvvetin yüzey alanına oranıdır.', 'Pressure is the ratio of the perpendicular force to the surface area.'],
  ['mat_o_us', 'fiz_nicelik', 'kol', 'SI ön ekleri ve çok büyük ya da küçük nicelikler üslü gösterimle yazılır.', 'SI prefixes and very large or small quantities are written using powers of ten.'],
  ['mat_pisagor', 'fiz_vektor', 'kol', 'Dik bileşenlerden bileşke vektörün büyüklüğü Pisagor teoremiyle bulunur.', 'The magnitude of a resultant from perpendicular components is found with the Pythagorean theorem.'],
  ['mat_trig', 'fiz_vektor', 'ilg', 'Vektörü herhangi bir açıyla bileşenlerine ayırmak sinüs ve kosinüs oranlarıyla yapılır.', 'Resolving a vector into components at any angle is done with sine and cosine ratios.'],
  ['mat_fonk', 'fiz_sabithiz', 'kol', 'Sabit hızlı harekette konum-zaman grafiği doğrusal fonksiyondur; eğimi hızı verir.', 'In uniform motion the position-time graph is a linear function whose slope gives the velocity.'],
  ['mat_dogru', 'fiz_ivme', 'kol', 'Hız-zaman grafiğindeki doğrunun eğimi ivmeyi verir.', 'The slope of the line on a velocity-time graph gives the acceleration.'],
  ['mat_kares', 'fiz_sabitivme', 'kol', 'Sabit ivmeli harekette konum-zaman grafiği karesel fonksiyon (parabol) biçimindedir.', 'In uniformly accelerated motion the position-time graph is a quadratic function (a parabola).'],
  ['mat_turev', 'fiz_ivme', 'ilg', 'Hız konumun, ivme hızın zamana göre değişim oranıdır; türev bu fikri genelleştirir.', 'Velocity is the rate of change of position and acceleration that of velocity; the derivative generalises this.'],
  ['mat_alan10', 'fiz_is', 'kol', 'İş, kuvvet-yer değiştirme grafiğinin altındaki alandan bulunur; hesap üçgen alanına dayanır.', 'Work is found from the area under the force-displacement graph, a calculation that relies on triangle area.'],
  ['mat_o_dogrusal', 'fiz_ohm', 'kol', 'Ohm deneyinde gerilim-akım grafiği doğrusal çıkar; eğimi direnci verir.', 'In the Ohm experiment the voltage-current graph is linear and its slope gives the resistance.'],
  ['mat_trig', 'fiz_ikiboyut', 'kol', 'İki boyutlu harekette hızın yatay ve düşey bileşenleri trigonometrik oranlarla bulunur.', 'In two-dimensional motion the horizontal and vertical velocity components are found with trigonometric ratios.'],
  ['mat_trig', 'fiz_kirilma', 'kol', 'Kırılma kanununda gelme ve kırılma açılarının sinüsleri kullanılır.', 'The law of refraction uses the sines of the angles of incidence and refraction.'],
  ['mat_trig', 'fiz_tork', 'kol', 'Kuvvetin uygulama açısının torka etkisi sinüs oranıyla hesaplanır.', 'The effect of the angle of the applied force on torque is calculated with the sine ratio.'],
  ['mat_trigfonk', 'fiz_aki', 'kol', 'Alternatif akım ve gerilim zamanla sinüs fonksiyonuna göre değişir.', 'Alternating current and voltage vary with time as a sine function.'],
  ['mat_benzer', 'fiz_mercekgor', 'kol', 'Mercekte cisim ve görüntü boyları ile uzaklıkları benzer üçgenlerle ilişkilendirilir.', 'In lenses, object and image sizes and distances are related through similar triangles.'],
  ['mat_donusum', 'fiz_duzlem', 'kol', 'Düzlem aynada görüntü, cismin ayna doğrusuna göre yansımasıdır.', 'In a plane mirror the image is the reflection of the object across the mirror line.'],
  ['mat_fonk', 'fiz_yay', 'kol', 'Yayda kuvvet-uzanım ilişkisi doğrusal fonksiyondur; eğimi yay sabitini verir.', 'For a spring the force-extension relation is a linear function whose slope gives the spring constant.'],

  // Matematik → Coğrafya
  ['mat_o_oran', 'cog_harita', 'on', 'Harita ölçeği, haritadaki uzunluğun gerçek uzunluğa oranıdır.', 'Map scale is the ratio of a length on the map to the real length.'],
  ['mat_o_dogrusal', 'cog_konum', 'kol', 'Mutlak konum, koordinat sistemindeki gibi enlem ve boylam olmak üzere iki değerle belirtilir.', 'Absolute location is given by two values, latitude and longitude, as in a coordinate system.'],
  ['mat_o_veri', 'cog_o_nufus', 'kol', 'Nüfusun dağılışı ve artışı tablo ve grafiklerdeki verilerle yorumlanır.', 'Population distribution and growth are interpreted from data in tables and graphs.'],
  ['mat_dagilim', 'cog_demografik', 'kol', 'Nüfus piramidi, yaş gruplarının dağılımını gösteren yatay ve iki yönlü bir histogramdır.', 'A population pyramid is a horizontal, back-to-back histogram showing the distribution of age groups.'],
  ['mat_ozet', 'cog_iklimtur', 'kol', 'İklim verileri ortalama sıcaklık, toplam yağış ve sıcaklık farkı gibi özet ölçülerle karşılaştırılır.', 'Climate data are compared with summary measures such as mean temperature, total rainfall and range.'],
  ['mat_kategorik', 'cog_sektordag', 'kol', 'Sektörlerin ülkelere göre dağılımı iki yönlü tablo ve bağıl sıklıklarla karşılaştırılır.', 'The distribution of sectors across countries is compared with two-way tables and relative frequencies.'],
  ['mat_ustel', 'cog_nufusdeg', 'ilg', 'Sabit oranla artan nüfus üstel fonksiyonla modellenir.', 'A population growing at a constant rate is modelled by an exponential function.'],
  ['mat_hazirveri', 'cog_tematik', 'ilg', 'Tematik haritalar, toplumsal ve bilimsel hazır verinin mekânsal gösterimi olarak karar vermeyi destekler.', 'Thematic maps support decision-making as spatial displays of ready-made social and scientific data.'],

  // Matematik → Biyoloji
  ['mat_olasi', 'mendel', 'kol', 'Çaprazlamalarda yavruların genotip ve fenotip oranları olasılık hesabıyla bulunur.', 'The genotype and phenotype ratios of offspring in crosses are found by probability calculations.'],
  ['mat_sayma', 'mendel', 'kol', 'Dihibrit çaprazlamada oluşabilecek gamet çeşitleri sayma stratejileriyle bulunur.', 'The possible gamete types in a dihybrid cross are found with counting strategies.'],
  ['mat_kosullu', 'eseybagli', 'kol', 'Soyağacında bir bireyin taşıyıcı olma olasılığı koşullu olasılıkla hesaplanır.', 'The probability that an individual in a pedigree is a carrier is calculated with conditional probability.'],
  ['mat_o_oran', 'piramit', 'kol', 'Enerji piramidinde basamaklar arasında aktarılan enerji yüzde ile hesaplanır.', 'The energy passed between levels of an energy pyramid is calculated as a percentage.'],
  ['mat_arastirma', 'bilim', 'kol', 'Araştırma sorusu oluşturma ve veri toplama, bilimsel araştırma sürecinin de basamaklarıdır.', 'Forming a research question and collecting data are also steps of the scientific research process.'],
  ['mat_ustel', 'populasyon', 'ilg', 'Kaynaklar sınırsızken popülasyon büyümesi üstel fonksiyonla modellenir.', 'With unlimited resources, population growth is modelled by an exponential function.'],
  ['mat_inicel', 'enzim', 'ilg', 'Sıcaklık ya da pH ile enzim aktivitesi arasındaki ilişki iki nicel değişkenli veriyle incelenir.', 'The relation between temperature or pH and enzyme activity is studied with two-variable quantitative data.'],
  ['mat_dizi', 'dongu12', 'ilg', 'Mitozla art arda bölünen hücrelerin sayısı (1, 2, 4, 8…) geometrik dizi oluşturur.', 'The number of cells dividing repeatedly by mitosis (1, 2, 4, 8…) forms a geometric sequence.'],

  // Matematik → Felsefe
  ['mat_onerme', 'fel_mantik', 'kol', 'Önerme ve doğruluk değeri bilgisi, mantıkta önerme ve doğruluk kavramlarını anlamayı kolaylaştırır.', 'Knowing propositions and truth values makes the concepts of proposition and truth in logic easier to grasp.'],
  ['mat_mantik', 'fel_arguman', 'kol', 'Bağlaç ve niceleyicilerle çalışmak, ifadeleri mantıksal yapıya dönüştürmeyi kolaylaştırır.', 'Working with connectives and quantifiers makes it easier to turn statements into logical form.'],
  ['mat_ispat', 'fel_akilyur', 'kol', 'Örneklerle doğrulama tümevarıma, genel ispat ise tümdengelime örnektir.', 'Verifying with examples illustrates induction, while a general proof illustrates deduction.'],
  ['mat_yorum9', 'fel_safsata', 'kol', 'İstatistiksel yorumlarda hata ve yanlılığı bulmak, safsataları tanımaya hazırlar.', 'Finding errors and bias in statistical claims prepares students to recognise fallacies.'],
  ['mat_ispat', 'fel_bi_unsur', 'ilg', 'Matematikteki aksiyom-teorem yapısı, bilimdeki hipotez-kuram-yasa yapısıyla karşılaştırılabilir.', 'The axiom-theorem structure of mathematics can be compared with the hypothesis-theory-law structure of science.'],

  // Matematik → Edebiyat, İngilizce, Din
  ['mat_arastirma', 'edb_anket', 'kol', 'Anket hazırlayıp sonuçlarını yazmak, veri toplama ve analize hazırlama becerisine dayanır.', 'Preparing a survey and writing up its results relies on collecting data and preparing it for analysis.'],
  ['mat_mantik', 'ing_10_8_dtb', 'ilg', 'Koşul cümlelerindeki “if…, (then)” yapısı mantıktaki “ise” bağlacına karşılık gelir.', 'The “if…, (then)” structure of conditionals corresponds to the “if…then” connective in logic.'],
  ['mat_donusum', 'din_din_sanat', 'ilg', 'İslam sanatındaki geometrik desenler yansıma, öteleme ve dönme ile oluşturulur.', 'Geometric patterns in Islamic art are built with reflections, translations and rotations.'],

  // Kimya → Biyoloji
  ['kim_o_tanecik', 'madde', 'kol', 'Difüzyon ve ozmoz, taneciklerin sürekli hareketiyle açıklanır.', 'Diffusion and osmosis are explained by the constant motion of particles.'],
  ['kim_polar', 'madde', 'kol', 'Küçük apolar moleküllerin zardan kolay geçmesi molekül polarlığıyla açıklanır.', 'That small nonpolar molecules cross the membrane easily is explained by molecular polarity.'],
  ['kim_molarasi', 'su', 'kol', 'Suyun çözücülüğü, adezyon ve kohezyonu molekülleri arasındaki hidrojen bağlarıyla açıklanır.', 'Water’s solvent power, adhesion and cohesion are explained by hydrogen bonds between its molecules.'],
  ['kim_kovalent', 'karb', 'kol', 'Karbohidratlardaki karbon, hidrojen ve oksijen atomları kovalent bağlarla bağlanır.', 'The carbon, hydrogen and oxygen atoms in carbohydrates are joined by covalent bonds.'],
  ['kim_molarasi', 'protein', 'kol', 'Proteinin katlanmış yapısını hidrojen bağı gibi moleküller arası etkileşimler korur.', 'The folded structure of a protein is maintained by interactions such as hydrogen bonds.'],
  ['kim_molarasi', 'dnayapi', 'kol', 'DNA’nın iki zincirini eşleşen bazlar arasındaki hidrojen bağları bir arada tutar.', 'The two strands of DNA are held together by hydrogen bonds between paired bases.'],
  ['kim_fonksiyon', 'protein', 'ilg', 'Amino asitler, organik kimyada incelenen amino ve karboksil fonksiyonel gruplarını taşır.', 'Amino acids carry the amino and carboxyl functional groups studied in organic chemistry.'],
  ['kim_o_asitbaz', 'enzim', 'kol', 'Enzim aktivitesinin pH’a bağlılığını anlamak asit, baz ve pH ölçeği bilgisine dayanır.', 'Understanding how enzyme activity depends on pH relies on knowing acids, bases and the pH scale.'],
  ['kim_hizfaktor', 'enzim', 'ilg', 'Enzimler, tepkime hızını artıran katalizörlerin canlılardaki örneğidir.', 'Enzymes are the living-world example of catalysts that increase reaction rate.'],
  ['kim_o_tepkime', 'fotosentez', 'kol', 'Fotosentez denklemi, girenleri ve ürünleri yazılan, atom sayısı korunan bir tepkimedir.', 'The photosynthesis equation is a reaction with reactants and products in which atoms are conserved.'],
  ['kim_enerjideg', 'fotosentez', 'ilg', 'Fotosentez enerji soğuran (endotermik), solunum enerji veren (ekzotermik) bir süreçtir.', 'Photosynthesis absorbs energy (endothermic) while respiration releases it (exothermic).'],
  ['kim_redoks', 'solunum', 'ilg', 'Hücresel solunumda glikoz yükseltgenir, oksijen indirgenir; elektron taşıma sistemi bir redoks zinciridir.', 'In cellular respiration glucose is oxidised and oxygen reduced; the electron transport system is a redox chain.'],
  ['kim_atmosfer', 'dongu', 'ilg', 'Karbon ve azot döngüleri atmosferin bileşimini değiştiren kimyasal tepkimeleri içerir.', 'The carbon and nitrogen cycles include chemical reactions that change the composition of the atmosphere.'],
  ['kim_metalekos', 'piramit', 'kol', 'Suda ve toprakta biriken ağır metaller, besin zincirindeki biyolojik birikimin kaynağıdır.', 'Heavy metals accumulating in water and soil are a source of biological magnification in food chains.'],
  ['kim_mikroplas', 'surdur', 'ilg', 'Mikroplastikler, ekolojik sürdürülebilirliği kısıtlayan kirlilik türlerindendir.', 'Microplastics are a form of pollution that limits ecological sustainability.'],
  ['kim_yesilh2', 'ferment', 'ilg', 'Evsel atıklardan yeşil hidrojen eldesi mikroorganizmaların fermantasyonuna dayanır.', 'Producing green hydrogen from household waste relies on fermentation by microorganisms.'],
  ['kim_o_asitbaz', 'homeo', 'kol', 'Kan pH’ının dar sınırlarda tutulmasını anlamak asit, baz ve pH ölçeği bilgisi ister.', 'Understanding how blood pH is kept within narrow limits requires knowing acids, bases and the pH scale.'],
  ['kim_ph', 'solsis', 'ilg', 'Kanda CO₂ birikmesi pH’ı düşürür; solunumla pH dengesi asit-baz kimyasıyla açıklanır.', 'Build-up of CO₂ in blood lowers pH; the respiratory control of pH is explained by acid-base chemistry.'],
  ['kim_iyon', 'noron', 'kol', 'Zar potansiyeli, Na⁺ ve K⁺ iyonlarının zarın iki yanındaki farklı dağılımıyla oluşur.', 'The membrane potential arises from the unequal distribution of Na⁺ and K⁺ ions across the membrane.'],

  // Fizik → Biyoloji
  ['fiz_oenerji', 'enerjiakis', 'kol', 'Enerjinin biçim değiştirerek aktarılması, besin zincirindeki enerji akışını anlamayı kolaylaştırır.', 'Energy being transferred while changing form makes energy flow in food chains easier to understand.'],
  ['fiz_korunum', 'enerjiakis', 'ilg', 'Her beslenme basamağında enerjinin azalması, enerjinin korunup ısıya dönüşmesiyle açıklanır.', 'The fall in energy at each trophic level is explained by energy being conserved but turned into heat.'],
  ['fiz_enbicim', 'fotosentez', 'kol', 'Fotosentez, ışık enerjisinin besinlerde kimyasal enerji olarak depolanmasıdır.', 'Photosynthesis stores light energy as chemical energy in food.'],
  ['fiz_renk', 'fotosentez', 'ilg', 'Klorofilin en çok soğurduğu mavi ve kırmızı ışık, dalga boylarıyla ayırt edilir.', 'The blue and red light that chlorophyll absorbs most are distinguished by their wavelengths.'],
  ['fiz_sivibas', 'dolasim', 'kol', 'Kan basıncı, damar içindeki sıvının çepere uyguladığı basınç kavramıyla açıklanır.', 'Blood pressure is explained as the pressure the fluid in a vessel exerts on its wall.'],
  ['fiz_acikhava', 'solsis', 'kol', 'Soluk alıp vermede hava, akciğerler ile dış ortam arasındaki basınç farkıyla hareket eder.', 'In breathing, air moves because of the pressure difference between the lungs and the atmosphere.'],
  ['fiz_aktarim', 'homeo', 'kol', 'Vücudun ısı kaybı ve kazancı iletim, konveksiyon ve ışımayla gerçekleşir.', 'The body loses and gains heat by conduction, convection and radiation.'],
  ['fiz_oses', 'duyu', 'kol', 'Kulağın sesi algılaması, sesin titreşimle oluşup ortamda yayılmasına dayanır.', 'Hearing relies on sound being produced by vibration and travelling through a medium.'],
  ['fiz_mercekgor', 'duyu', 'kol', 'Göz merceği yakınsak mercek gibi ışığı kırarak ağ tabakada görüntü oluşturur.', 'The eye lens refracts light like a converging lens and forms an image on the retina.'],
  ['fiz_potansiyel', 'noron', 'kol', 'Nöronda uyartı iletimi, zarın iki yanındaki potansiyel farkın değişmesine dayanır.', 'Nerve impulse conduction depends on changes in the potential difference across the membrane.'],
  ['fiz_tork', 'iskelet', 'ilg', 'Kemik, eklem ve kas birlikte kaldıraç gibi çalışır; kas kuvveti eklem çevresinde tork oluşturur.', 'Bones, joints and muscles work like levers; muscle force produces torque about a joint.'],
  ['fiz_em', 'mutasyon', 'ilg', 'UV ve X ışınları gibi yüksek enerjili elektromanyetik dalgalar mutasyona yol açabilir.', 'High-energy electromagnetic waves such as UV and X-rays can cause mutations.'],

  // Fizik → Kimya
  ['fiz_oyuk', 'kim_iyonik', 'kol', 'Zıt yüklerin birbirini çekmesi, iyonik bağdaki elektrostatik çekimi anlamayı kolaylaştırır.', 'Opposite charges attracting each other makes the electrostatic attraction in ionic bonds easier to grasp.'],
  ['fiz_hal', 'kim_kaynama', 'kol', 'Hâl değişimi sırasında sıcaklığın sabit kalması kaynama sıcaklığını yorumlamayı kolaylaştırır.', 'Temperature staying constant during a change of state helps in interpreting boiling points.'],
  ['fiz_acikhava', 'kim_kaynama', 'kol', 'Kaynama sıcaklığının dış basınca bağlılığı açık hava basıncı bilgisine dayanır.', 'The dependence of boiling point on external pressure relies on knowing atmospheric pressure.'],
  ['fiz_basinc', 'kim_gazoz', 'kol', 'Gaz basıncını anlamak, basıncın birim yüzeye etki eden kuvvet olduğunu bilmeyi gerektirir.', 'Understanding gas pressure requires knowing that pressure is force per unit area.'],
  ['fiz_ozisi', 'kim_enerjideg', 'kol', 'Olaylarda alınan ya da verilen ısı, ısı, öz ısı ve sıcaklık farkı modeliyle hesaplanır.', 'The heat absorbed or released in a process is calculated with the heat, specific heat and temperature model.'],
  ['fiz_mekanik', 'kim_gerceklesme', 'kol', 'Çarpışma teorisinde taneciklerin kinetik enerjisi tepkimenin gerçekleşip gerçekleşmeyeceğini belirler.', 'In collision theory the kinetic energy of particles determines whether a reaction occurs.'],
  ['fiz_akim', 'kim_elektroliz', 'kol', 'Elektrolizde açığa çıkan madde miktarı devreden geçen akım ve yük miktarına bağlıdır.', 'The amount of substance produced in electrolysis depends on the current and charge passed through the circuit.'],
  ['fiz_potansiyel', 'kim_galvanik', 'kol', 'Galvanik hücrenin ürettiği gerilim, devredeki potansiyel fark kavramıyla anlaşılır.', 'The voltage produced by a galvanic cell is understood through the concept of potential difference.'],
  ['fiz_kaynak', 'kim_yanma', 'kol', 'Fosil yakıtların yenilenemeyen kaynak oluşu, yanma tepkimelerinin sonuçlarını tartışmaya zemin hazırlar.', 'Fossil fuels being non-renewable sets the stage for discussing the consequences of combustion.'],
  ['fiz_coulomb', 'kim_perozel', 'ilg', 'Çekirdek yükü ve uzaklığın iyonlaşma enerjisine etkisi elektriksel kuvvetle açıklanır.', 'The effect of nuclear charge and distance on ionisation energy is explained by electric force.'],
  ['fiz_atom', 'kim_atomteori', 'ilg', 'Atom modellerinin deneysel bulgularla değişimi iki derste farklı yönleriyle ele alınır.', 'How atomic models changed with experimental evidence is treated from different angles in both subjects.'],
  ['fiz_nukleer', 'kim_enerjikaynak', 'ilg', 'Nükleer enerji, maddelerin enerji kaynağı olma potansiyelinin bir örneğidir.', 'Nuclear energy is one example of the potential of substances to be energy sources.'],
  ['fiz_yariiletken', 'kim_gunes', 'ilg', 'Geleneksel güneş pilleri yarı iletken malzemelerden üretilir.', 'Conventional solar cells are made from semiconductor materials.'],

  // Fizik ↔ Coğrafya
  ['fiz_oisi', 'cog_o_iklim', 'kol', 'Isı ve sıcaklık kavramları hava olaylarını ve iklimi anlamanın temelidir.', 'The concepts of heat and temperature are the basis for understanding weather and climate.'],
  ['fiz_acikhava', 'cog_iklimsis', 'kol', 'Basınç iklim sisteminin değişkenlerindendir; açık hava basıncı bilgisi rüzgârları yorumlatır.', 'Pressure is one of the variables of the climate system; knowing atmospheric pressure helps explain winds.'],
  ['fiz_aktarim', 'cog_iklimsis', 'kol', 'Atmosferin ısınması ışıma, iletim ve konveksiyon yoluyla gerçekleşir.', 'The atmosphere is heated by radiation, conduction and convection.'],
  ['cog_tektonik', 'fiz_rezonans', 'ilg', 'Depremi doğuran levha hareketleri, deprem dalgalarının etkisi ve rezonansla birlikte ele alınabilir.', 'The plate movements that cause earthquakes can be studied together with seismic waves and resonance.'],
  ['fiz_rezonans', 'cog_direncli', 'kol', 'Yapıların deprem dalgalarıyla rezonansa girebileceğini bilmek afete dirençli yaşam alanlarını anlamayı kolaylaştırır.', 'Knowing buildings can resonate with seismic waves helps explain what makes living spaces disaster-resilient.'],
  ['fiz_kaynak', 'cog_enerji', 'kol', 'Yenilenebilen ve yenilenemeyen kaynak ayrımı, enerji kullanımındaki değişimi yorumlamayı kolaylaştırır.', 'The renewable/non-renewable distinction helps interpret changes in how energy resources are used.'],
  ['fiz_em', 'cog_cbsuyg', 'ilg', 'Uzaktan algılama, yeryüzünden yansıyan elektromanyetik dalgaların uydularla kaydedilmesine dayanır.', 'Remote sensing relies on satellites recording electromagnetic waves reflected from the Earth’s surface.'],

  // Fizik → Felsefe
  ['fiz_tanim', 'fel_alanlar', 'kol', 'Fiziğin diğer disiplinlerle ilişkisini tartışmak, felsefenin bilimle ilişkisini kavramayı kolaylaştırır.', 'Discussing how physics relates to other disciplines makes philosophy’s relation to science easier to grasp.'],
  ['fiz_bilimci', 'fel_bi_ne', 'kol', 'Bilim insanlarının çalışma biçimlerini incelemek, bilimin ne olduğuna ilişkin görüşleri tartışmayı kolaylaştırır.', 'Examining how scientists work makes it easier to discuss views on what science is.'],
  ['fiz_planck', 'fel_bi_konu', 'ilg', 'Klasik fizikten Planck ile başlayan modern fiziğe geçiş, bilimde paradigma değişimine örnektir.', 'The shift from classical physics to the modern physics begun by Planck is an example of a paradigm change.'],
  ['fiz_nukleer', 'fel_te_aks', 'ilg', 'Nükleer enerjinin güvenlik riskleri, teknolojinin güvenlik ve değer sorunlarına örnektir.', 'The safety risks of nuclear energy exemplify the security and value problems raised by technology.'],

  // Kimya → Coğrafya
  ['kim_o_degisim', 'cog_asinma', 'kol', 'Kimyasal ayrışma, kayaçların yapısını değiştiren kimyasal değişimlere örnektir.', 'Chemical weathering is an example of chemical changes that alter the make-up of rocks.'],
  ['kim_metalekos', 'cog_gezegen', 'kol', 'Suda ve toprakta ağır metal birikimi, gezegen sınırlarını zorlayan çevre sorunlarına örnektir.', 'Heavy metal build-up in water and soil is an example of environmental problems that push planetary boundaries.'],
  ['kim_nanoekos', 'cog_susur', 'kol', 'Metal nanoparçacıkların sudan uzaklaştırılamaması, su kaynaklarının sürdürülebilir kullanımını tehdit eder.', 'Metal nanoparticles that cannot be removed from water threaten the sustainable use of water resources.'],
  ['kim_atmosfer', 'cog_kureseliklim', 'kol', 'Tepkimelerle atmosferin doğasında oluşan değişimi bilmek, küresel iklim değişikliğini yorumlamayı kolaylaştırır.', 'Knowing how reactions change the atmosphere makes global climate change easier to interpret.'],
  ['kim_yanma', 'cog_kureseliklim', 'ilg', 'Karbon temelli yakıtların yanmasıyla açığa çıkan CO₂ küresel iklim değişikliğine katkıda bulunur.', 'The CO₂ released by burning carbon-based fuels contributes to global climate change.'],
  ['kim_mikroplas', 'cog_cozumoner', 'kol', 'Mikroplastik kirliliği, çözüm önerisi geliştirilebilecek güncel bir çevre problemidir.', 'Microplastic pollution is a current environmental problem for which solutions can be proposed.'],
  ['kim_gunes', 'cog_enerji', 'ilg', 'Boyaya duyarlı güneş pilleri, enerji kaynaklarının kullanımındaki değişimin bir parçasıdır.', 'Dye-sensitised solar cells are part of the change in how energy resources are used.'],

  // Kimya → Felsefe
  ['kim_atomteori', 'fel_bi_ne', 'kol', 'Atom teorilerinin deneysel bulgularla değişmesi, bilimsel bilginin değişebilirliğine somut örnektir.', 'The change of atomic theories with new evidence is a concrete example of the revisability of science.'],
  ['kim_nanourun', 'fel_te_aks', 'ilg', 'Nanoteknolojik ürünlerin etik ve güvenlik açısından değerlendirilmesi, teknolojinin değer sorunlarıyla örtüşür.', 'Evaluating nanotech products for ethics and safety overlaps with the value problems of technology.'],
  ['kim_yapayzeka', 'fel_te_gorus', 'ilg', 'Yapay zekânın sürdürülebilirliğe etkisini sorgulamak, teknoloji-hayat ilişkisinde görüş oluşturmayı gerektirir.', 'Questioning AI’s impact on sustainability requires forming a view on the technology-life relationship.'],

  // Biyoloji ↔ Coğrafya
  ['cog_iklimsis', 'ekosistem', 'kol', 'Sıcaklık ve yağış gibi iklim değişkenleri ekosistemin cansız bileşenlerini belirler.', 'Climate variables such as temperature and precipitation determine the abiotic components of ecosystems.'],
  ['cog_nufusdeg', 'populasyon', 'kol', 'Nüfusun zamanla değişimini grafiklerle yorumlamak popülasyon büyümesini anlamayı kolaylaştırır.', 'Interpreting population change over time with graphs makes population growth easier to understand.'],
  ['ekosistem', 'cog_bitki', 'kol', 'Işık, su ve toprak gibi cansız etmenlerin canlılara etkisini bilmek bitki örtüsünün dağılışını yorumlatır.', 'Knowing how light, water and soil affect organisms helps explain the distribution of vegetation.'],
  ['biocesit', 'cog_bitki', 'kol', 'Biyoçeşitlilik ve endemik tür kavramları bitki örtüsünün çeşitliliğini yorumlamayı kolaylaştırır.', 'The ideas of biodiversity and endemic species make the diversity of vegetation easier to interpret.'],
  ['populasyon', 'cog_bitkideg', 'kol', 'Süksesyon kavramı, bitki topluluklarında zamanla görülen değişimi yorumlamayı kolaylaştırır.', 'The concept of succession helps interpret how plant communities change over time.'],
  ['dongu', 'cog_su', 'kol', 'Su döngüsünü bilmek, yeryüzündeki su kaynaklarının oluşumunu ve sınıflandırılmasını anlamayı kolaylaştırır.', 'Knowing the water cycle helps in understanding how water resources form and are classified.'],
  ['surdur', 'cog_gezegen', 'kol', 'Habitat kaybı ve kirlilik gibi sürdürülebilirlik sorunları gezegen sınırları kavramına zemin hazırlar.', 'Sustainability problems such as habitat loss and pollution prepare the ground for planetary boundaries.'],
  ['ayakizi', 'cog_kureseliklim', 'kol', 'Ekolojik ayak izini küçültme yolları, iklim değişikliğinin etkilerini azaltma stratejileriyle örtüşür.', 'Ways of reducing the ecological footprint overlap with strategies to mitigate climate change.'],
  ['koruma', 'cog_koruma', 'kol', 'Koruma alanları ve doğal kaynakların korunması, doğayı koruma anlaşmalarının etkisini anlamaya zemin hazırlar.', 'Protected areas and resource conservation prepare the ground for understanding nature protection agreements.'],
  ['cog_toprak', 'dongu', 'ilg', 'Toprak oluşumunda canlıların ve ayrıştırıcıların rolü, madde döngüleriyle ilişkilidir.', 'The role of organisms and decomposers in soil formation is linked to nutrient cycles.'],
  ['cog_gida', 'biyotek', 'ilg', 'GDO’lu ürünler, tarımsal faaliyetlerin gıda güvencesi açısından sorgulanmasında tartışılır.', 'GM crops are debated when agricultural activities are questioned in terms of food security.'],

  // Biyoloji ↔ Felsefe
  ['of_bilim', 'fel_bi_ne', 'kol', 'Bilimsel bilginin yeni kanıtlarla değişebileceği fikri, bilimin kesinliği tartışmasına zemin hazırlar.', 'The idea that scientific knowledge can change with new evidence prepares for debating its certainty.'],
  ['bilim', 'fel_bi_unsur', 'kol', 'Hipotez kurup deneyle sınamak, bilimi oluşturan unsurları felsefi olarak incelemeyi kolaylaştırır.', 'Forming and testing hypotheses makes it easier to examine philosophically the elements of science.'],
  ['etik', 'fel_ah_konu', 'kol', 'Araştırmacının sorumluluklarını tartışmak, ahlak ile etik arasındaki farkı kavramayı kolaylaştırır.', 'Discussing a researcher’s responsibilities makes the difference between morality and ethics easier to grasp.'],
  ['surdur', 'fel_cv_etik', 'kol', 'Biyoçeşitlilik kaybı gibi sorunları bilmek, canlı ve çevre merkezci etik yaklaşımları tartışmayı kolaylaştırır.', 'Knowing problems like biodiversity loss makes it easier to debate biocentric and ecocentric ethics.'],
  ['fel_te_aks', 'biyotek', 'kol', 'Teknolojinin değer sorunlarını tartışmak, GDO ve kök hücre gibi uygulamaların etik değerlendirmesini kolaylaştırır.', 'Debating the value problems of technology helps in the ethical evaluation of GMOs and stem cells.'],

  // Biyoloji ↔ Din
  ['insansinir', 'din_bagimlilik', 'kol', 'Sinir sisteminin işleyişini bilmek, bağımlılığın insan üzerindeki etkilerini değerlendirmeyi kolaylaştırır.', 'Knowing how the nervous system works makes it easier to assess the effects of addiction on people.'],
  ['koruma', 'din_insan_cevre', 'ilg', 'Doğal kaynakları koruma ve sıfır atık uygulamaları, insanın çevreye karşı ahlaki sorumluluğuyla ilişkilidir.', 'Conserving natural resources and zero-waste practices relate to our moral responsibility toward the environment.'],
  ['biyotek', 'din_mesele_ilke', 'ilg', 'Kök hücre ve GDO gibi güncel konular, dinî meselelerin çözümünde ilke ve yöntem tartışmasına konu olur.', 'Current issues such as stem cells and GMOs are discussed with the principles for resolving religious questions.'],

  // Biyoloji ↔ İngilizce
  ['of_sistem', 'ing_10_3_kel', 'kol', 'Vücut sistemlerini bilmek, İngilizcede vücut bölümleri ve hastalık sözcüklerini anlamlandırmayı kolaylaştırır.', 'Knowing the body systems makes English words for body parts and illnesses easier to make sense of.'],
  ['biocesit', 'ing_9_7_kel', 'ilg', 'Nesli tükenen hayvanlar ve habitat sözcükleri, biyoçeşitlilik ve endemik tür konusunu İngilizceye taşır.', 'Words for endangered animals and habitats carry biodiversity and endemic species into English.'],
  ['koruma', 'ing_9_7_bec', 'ilg', 'Hayvanları korumaya ilişkin İngilizce metinler, koruma alanları ve doğal kaynakların korunmasıyla örtüşür.', 'English texts on protecting animals overlap with protected areas and conservation of natural resources.'],
  ['saglik', 'ing_11_3_kel', 'ilg', 'Fiziksel sağlık ve iyi oluş sözcükleri, obezite gibi sağlık sorunlarını İngilizce tartışmayı sağlar.', 'Words for physical health and well-being let students discuss problems such as obesity in English.'],
  ['ortak', 'ing_10_8_kel', 'ilg', 'Evrende yaşam tartışması, bir varlığı canlı yapan ortak özellikleri sorgulamayı gerektirir.', 'Discussing life in the universe requires asking which shared characteristics make something alive.'],

  // Coğrafya ↔ Edebiyat
  ['edb_gezi', 'cog_bolgekrit', 'ilg', 'Gezi yazıları bir yerin doğal ve beşerî özelliklerini betimleyerek bölge kavramını somutlaştırır.', 'Travel writing makes the idea of a region concrete by describing a place’s natural and human features.'],
  ['edb_mekzam', 'cog_mekan', 'ilg', 'Metinde mekânın anlama katkısını incelemek, mekânsal düşünmeyle benzer bir bakış ister.', 'Examining how setting contributes to meaning calls for a view similar to spatial thinking.'],
  ['cog_turkdunya', 'edb_turkdunya', 'kol', 'Türk dünyasının ortak kültürel özelliklerini bilmek, bu coğrafyanın hikâye ve anılarını yorumlamayı kolaylaştırır.', 'Knowing the shared cultural traits of the Turkic world helps in interpreting its stories and memoirs.'],
  ['edb_kimlik', 'cog_kulturel', 'ilg', 'Ortak dil ve edebî miras, Türkiye ile köklü bağlara sahip yerler arasındaki kültürel etkileşimi besler.', 'A shared language and literary heritage feed cultural exchange between Türkiye and places with deep ties to it.'],
  ['edb_gezi12', 'cog_miras', 'ilg', 'Gezi yazısı, korunması gereken doğal ve kültürel zenginliklerin farkına varılmasını sağlar.', 'Travel writing raises awareness of the natural and cultural riches that need protecting.'],
  ['edb_cevre', 'cog_cevrepol', 'ilg', 'Edebî metinlerle kazanılan çevre bilinci, çevre sorunlarını önleme politikalarıyla ilişkilidir.', 'Environmental awareness gained through literature relates to policies for preventing environmental problems.'],

  // Coğrafya ↔ İngilizce
  ['cog_bolgekrit', 'ing_10_6_kel', 'ilg', 'Kıta, ülke ve milliyet sözcükleri, bölge ve ülkeleri tanıtan içeriklerin İngilizce karşılığıdır.', 'Words for continents, countries and nationalities are the English side of content on regions and countries.'],
  ['cog_yerlesim', 'ing_12_4_kel', 'kol', 'Yerleşmelerin gelişimini etkileyen faktörleri bilmek, altyapı ve kent planlaması sorunlarını tartışmayı kolaylaştırır.', 'Knowing what shapes the growth of settlements makes it easier to discuss infrastructure and urban planning.'],
  ['cog_yerorg', 'ing_11_5_kel', 'ilg', 'Metropol ve yavaş şehir gibi şehir türleri yerleşmelerin mekânsal organizasyonuyla ilişkilidir.', 'City types such as metropolis and slow city relate to the spatial organisation of settlements.'],
  ['cog_enerji', 'ing_10_7_kel', 'ilg', 'Yenilenebilir ve yenilenemez kaynak sözcükleri, enerji kaynaklarının kullanımını İngilizce tartışmayı sağlar.', 'Words for renewable and non-renewable resources let students discuss energy use in English.'],
  ['cog_kureseliklim', 'ing_12_5_bec', 'kol', 'İklim değişikliğinin etkilerini ve uyum stratejilerini bilmek, bu konudaki İngilizce metinleri anlamayı kolaylaştırır.', 'Knowing the impacts of climate change and adaptation strategies makes English texts on it easier to follow.'],
  ['cog_nufusdag', 'ing_12_5_kel', 'ilg', 'Göç sözcükleri, nüfus hareketlerini etkileyen faktörlerin İngilizce tartışılmasında kullanılır.', 'Migration vocabulary is used when discussing in English the factors behind population movements.'],
  ['cog_ticaret', 'ing_11_7_kel', 'ilg', 'Küreselleşme ve kültürel alışveriş, küresel ticaretin mekânsal bağlantılarıyla ilişkilidir.', 'Globalisation and cultural exchange are linked to the spatial connections of global trade.'],

  // Coğrafya ↔ Felsefe
  ['fel_cv_insan', 'cog_gezegen', 'ilg', 'İnsanın doğayla ilişkisi ve değer anlayışı, gezegen sınırlarının zorlanmasıyla doğrudan ilgilidir.', 'Humanity’s relation to nature and its values bear directly on the pushing of planetary boundaries.'],
  ['fel_cv_gorus', 'cog_cozumoner', 'kol', 'Çevre sorunlarını felsefi argümanlarla çözümlemek, gerekçeli çözüm önerisi geliştirmeyi kolaylaştırır.', 'Analysing environmental problems with philosophical arguments helps in developing reasoned solutions.'],

  // Coğrafya ↔ Din
  ['din_rum41', 'cog_gezegen', 'ilg', 'Rum 41. ayetteki karada ve denizde bozulma vurgusu, insan kaynaklı çevre sorunlarıyla ilişkilendirilir.', 'The verse Rum 41 on corruption on land and sea is linked with human-caused environmental problems.'],
  ['din_med_izler', 'cog_kulturel', 'ilg', 'İslam medeniyetinin Anadolu ve Balkanlara yayılışı, Türkiye’nin köklü kültürel bağlarını açıklar.', 'The spread of Islamic civilisation into Anatolia and the Balkans explains many of Türkiye’s deep cultural ties.'],
  ['din_hint_cin', 'cog_kulturmekan', 'ilg', 'Dinlerin doğduğu ve yayıldığı alanlar, kültür ile mekân arasındaki etkileşimin önemli bir boyutudur.', 'Where religions arose and spread is an important dimension of the interaction between culture and place.'],

  // Edebiyat ↔ Felsefe
  ['edb_sanat', 'fel_es_sanat', 'kol', 'Edebiyatın güzel sanatlar içindeki yerini bilmek, sanatın ne olduğu sorusunu tartışmayı kolaylaştırır.', 'Knowing literature’s place among the fine arts makes it easier to discuss what art is.'],
  ['edb_gundil', 'fel_es_konu', 'kol', 'Edebî dildeki estetik değer kavramı, estetiğin güzellik ve sanat eseri kavramlarını anlamayı kolaylaştırır.', 'The aesthetic value of literary language helps in understanding the concepts of beauty and the work of art.'],
  ['edb_dusunce', 'fel_arguman', 'kol', 'Tanımlama ve karşılaştırma gibi düşünceyi geliştirme yolları, tutarlı argüman kurmayı kolaylaştırır.', 'Ways of developing ideas such as definition and comparison make it easier to build a consistent argument.'],
  ['edb_donem', 'fel_gelisim', 'ilg', 'Edebî dönemlerdeki değişim, felsefe ve düşünce dünyasındaki değişimleri yansıtır.', 'Change across literary periods reflects changes in philosophy and the world of ideas.'],
  ['fel_dusdil', 'edb_iletisim', 'kol', 'Düşünme ile dil arasındaki ilişkiyi bilmek, dilin iletişimdeki işlevini kavramayı kolaylaştırır.', 'Knowing how thought and language relate makes the role of language in communication easier to grasp.'],
  ['fel_ed_iliski', 'edb_sanatcieser', 'ilg', 'Sanatçının dünya görüşünün eserine yansıması, edebiyat ile felsefe arasındaki ilişkiyi gösterir.', 'An artist’s worldview being reflected in the work shows the relation between literature and philosophy.'],
  ['fel_ed_felsefe', 'edb_roman12', 'kol', 'Edebî eserden felsefi görüş çıkarma becerisi, toplumsal sorunları işleyen romanın tahlilini kolaylaştırır.', 'Drawing philosophical views from literary works helps in analysing a novel about social problems.'],
  ['fel_arguman', 'edb_makale', 'kol', 'Öncül-sonuç yapısını ve tutarlılığı bilmek, makalede bir düşünceyi savunmayı kolaylaştırır.', 'Knowing premise-conclusion structure and consistency makes it easier to defend an idea in an article.'],
  ['fel_safsata', 'edb_elestiri', 'kol', 'Safsataları tanımak, gerekçeli bir eleştiri yazısında hatalı akıl yürütmeden kaçınmayı sağlar.', 'Recognising fallacies helps avoid faulty reasoning in a well-argued critical essay.'],
  ['fel_bil_olcut', 'edb_kaynak', 'ilg', 'Kaynak gösterme ve kanıtlanabilirlik, bir bilginin doğruluğunu sınama ölçütleriyle ilişkilidir.', 'Citing sources and verifiability relate to the criteria for testing whether knowledge is true.'],
  ['fel_hu_sorun', 'edb_hak', 'kol', 'Hak ve özgürlüklerin hukuksal temellerini bilmek, bu konuyu işleyen metinleri yorumlamayı kolaylaştırır.', 'Knowing the legal basis of rights and freedoms makes texts on the subject easier to interpret.'],
  ['fel_es_guzel', 'edb_siir12', 'ilg', 'Şiirde duyguların estetik ifadesi, güzelliğin öznel mi nesnel mi olduğu tartışmasıyla ilişkilidir.', 'The aesthetic expression of feelings in poetry relates to whether beauty is subjective or objective.'],

  // Edebiyat ↔ Din
  ['edb_sanat', 'din_din_sanat', 'kol', 'Güzel sanatların sınıflandırılmasını bilmek, din ve sanat ilişkisini çözümlemeyi kolaylaştırır.', 'Knowing how the fine arts are classified makes the relation between religion and art easier to analyse.'],
  ['edb_iletisim', 'din_aile_iletisim', 'kol', 'İletişim engellerini tanımak, aile içi iletişim ve etkileşim sürecini çözümlemeyi kolaylaştırır.', 'Recognising barriers to communication helps in analysing communication and interaction within the family.'],
  ['edb_kaside', 'din_hm_ehlibeyt', 'ilg', 'Hz. Muhammed sevgisi, divan şiirinde kaside biçiminde yazılan naatlarla dile getirilir.', 'Love for the Prophet Muhammad is expressed in Divan poetry through naats written in the kaside form.'],
  ['edb_gazel', 'din_tasavvuf_olusum', 'ilg', 'Divan şiirindeki ilahi aşk teması, tasavvufi düşünceden beslenir.', 'The theme of divine love in Divan poetry draws on Sufi thought.'],
  ['edb_mesnevi', 'din_tasavvuf_kultur', 'ilg', 'Mevlânâ’nın Mesnevî’si gibi eserler, tasavvufi görüşlerin mesnevi türüyle aktarıldığını gösterir.', 'Works such as Rumi’s Masnavi show Sufi views being conveyed through the masnavi form.'],
  ['edb_asik', 'din_alevi_bektasi', 'ilg', 'Âşık tarzı halk şiiri geleneği, Alevi-Bektaşi kültüründe deyiş ve nefeslerle yaşatılır.', 'The âşık (minstrel) folk poetry tradition lives on in Alevi-Bektashi culture through deyiş and nefes.'],
  ['edb_tezkire', 'din_med_izler', 'ilg', 'İslam medeniyetinin dil ve edebiyata etkisi, tezkire gibi divan edebiyatı türlerinde görülür.', 'The influence of Islamic civilisation on language and literature shows in Divan genres such as the tezkire.'],

  // Edebiyat → İngilizce
  ['edb_o_anlatim', 'ing_9_5_bec', 'kol', 'Betimleyici anlatım bilgisi, İngilizcede ev ve odaları betimleyen metin yazmayı kolaylaştırır.', 'Knowing descriptive writing makes it easier to write English texts describing homes and rooms.'],
  ['edb_o_cumle', 'ing_11_1_dtb1', 'kol', 'Türkçede ögelerin dizilişini bilmek, İngilizcedeki farklı sözcük sırasını karşılaştırmayı kolaylaştırır.', 'Knowing Turkish sentence element order makes it easier to compare the different word order of English.'],
  ['edb_o_sozcuk', 'ing_11_5_dtb2', 'kol', 'Mecaz anlam ve deyim bilgisi, “come across” gibi edat öbeklerinin kalıplaşmış anlamını kavratır.', 'Knowing figurative meaning and idioms helps grasp the fixed meanings of phrasal verbs like “come across”.'],
  ['edb_kisi', 'ing_9_3_bec', 'kol', 'Metindeki kişileri kişilik özellikleriyle tanımak, İngilizcede kişileri betimlemeyi kolaylaştırır.', 'Identifying characters by their personality traits makes it easier to describe people in English.'],
  ['edb_gezi', 'ing_9_1_bec', 'kol', 'Gezi yazısındaki betimleme deneyimi, İngilizcede bir ülkeyi ve turistik yerlerini tanıtmayı kolaylaştırır.', 'Experience with description in travel writing makes it easier to present a country and its sights in English.'],
  ['edb_olay', 'ing_10_5_dtb', 'kol', 'Olay örgüsünü izlemek, İngilizcede arka plandaki ve araya giren olayları geçmiş zamanlarla anlatmayı kolaylaştırır.', 'Following a plot helps tell background and interrupting events in English with past tenses.'],
  ['edb_otobiyo', 'ing_10_4_bec', 'kol', 'Kendi yaşam öyküsünü yazma deneyimi, İngilizcede geçmişteki aile yaşamını anlatmayı kolaylaştırır.', 'Having written one’s own life story makes it easier to describe past family life in English.'],
  ['edb_eposta', 'ing_11_2_dtb3', 'ilg', 'E-postada amaca uygun nazik rica, İngilizcede “Could you…?” yapısıyla kurulur.', 'A polite, purpose-fit request in an e-mail is made in English with “Could you…?”.'],
  ['edb_anlatici', 'ing_12_1_dtb', 'ilg', 'Dolaylı anlatım, bir sözün anlatıcının kendi bakış açısından aktarılmasına karşılık gelir.', 'Reported speech corresponds to a narrator relaying words from their own point of view.'],
  ['edb_ozgecmis', 'ing_12_1_bec', 'ilg', 'Özgeçmiş ve mezuniyet sonrası planlar, kendini tanıtan yazı becerisini iki dilde geliştirir.', 'CVs and post-graduation plans develop self-presentation writing in both languages.'],
  ['edb_meslek', 'ing_12_1_kel', 'ilg', 'Meslek seçimi ve okul sonrası planlar, iki derste de geleceğe yönelik metinlerin konusudur.', 'Career choice and plans after school are the subject of future-oriented texts in both subjects.'],
  ['edb_cevrehaber', 'ing_11_7_bec', 'ilg', 'Çevre sorunları ve çözümleri, iki derste de dinleme ve sunum çalışmalarına konu olur.', 'Environmental problems and their solutions are topics for listening and presentation work in both subjects.'],

  // Felsefe ↔ Din
  ['din_ahlak_mahiyet', 'fel_ah_konu', 'kol', 'İslam’da ahlakın mahiyetini bilmek, ahlak felsefesinin iyi, kötü ve erdem kavramlarını tartışmayı kolaylaştırır.', 'Knowing the nature of morality in Islam helps in discussing good, evil and virtue in moral philosophy.'],
  ['din_bilgi_yollari', 'fel_bil_kaynak', 'kol', 'Akıl, duyular ve vahiy gibi bilgi yollarını bilmek, bilginin kaynağına ilişkin görüşleri anlamayı kolaylaştırır.', 'Knowing paths to knowledge such as reason, the senses and revelation helps in understanding views on its source.'],
  ['fel_di_konu', 'din_din_tanim', 'kol', 'Din felsefesinin temel kavramlarını bilmek, din tanımlarını ve disiplinlerin yaklaşımını karşılaştırmayı kolaylaştırır.', 'Knowing the key concepts of philosophy of religion helps compare definitions of religion across disciplines.'],
  ['fel_di_tanri', 'din_inanc_felsefe', 'kol', 'Tanrı’nın varlığına ilişkin felsefi tutumları bilmek, inançla ilgili felsefi yaklaşımları sorgulamayı kolaylaştırır.', 'Knowing philosophical positions on God’s existence makes it easier to question philosophical views of belief.'],
  ['fel_di_arg', 'din_varlik_delil', 'ilg', 'Tanrı’nın varlığına yönelik felsefi argümanlar, Allah’ın varlığının delilleriyle karşılaştırılabilir.', 'Philosophical arguments for God’s existence can be compared with the proofs of God’s existence in Islam.'],
  ['din_kotuluk', 'fel_di_arg', 'ilg', 'Kötülük problemi, Tanrı’nın varlığına yönelik argüman tartışmalarındaki başlıca itirazlardandır.', 'The problem of evil is one of the main objections in debates over arguments for God’s existence.'],
  ['fel_ai_sor', 'din_inanc_felsefe', 'ilg', 'Akıl-inanç ilişkisine yönelik felsefi sorular, inançla ilgili felsefi yaklaşımlarla doğrudan ilişkilidir.', 'Philosophical questions on reason and faith are directly related to philosophical approaches to belief.'],
  ['fel_ah_ozgur', 'din_akil_irade', 'kol', 'Özgürlük ve sorumluluk problemi, akıl, irade ve sorumluluk ilişkisini tartışmaya zemin hazırlar.', 'The problem of freedom and responsibility prepares the ground for discussing reason, will and responsibility.'],
  ['fel_alanlar', 'din_felsefe_bilim', 'kol', 'Felsefenin bilim ve dinle ilişkisini bilmek, dinin felsefe ve bilimle ilişkisini sorgulamayı kolaylaştırır.', 'Knowing how philosophy relates to science and religion makes it easier to question religion’s relation to both.'],
  ['fel_si_konu', 'din_adalet', 'ilg', 'Adalet ve eşitlik kavramları hem siyaset felsefesinde hem İslam’ın evrensel mesajlarında temel yer tutar.', 'Justice and equality are central both in political philosophy and in the universal messages of Islam.'],
  ['din_insan_cevre', 'fel_cv_etik', 'kol', 'İnsan, çevre ve ahlak ilişkisini yorumlamak, çevre etiği yaklaşımlarını tartışmayı kolaylaştırır.', 'Interpreting the relation of humans, environment and ethics makes environmental ethics easier to debate.'],
  ['din_tekno_ahlak', 'fel_te_aks', 'kol', 'Teknoloji ve ahlak ilişkisini çözümlemek, teknolojinin değer sorunlarını tartışmayı kolaylaştırır.', 'Analysing the relation between technology and ethics makes the value problems of technology easier to debate.'],
  ['fel_gelisim', 'din_med_izler', 'ilg', 'Türk-İslam felsefe geleneği, İslam medeniyetinin düşünce alanındaki izlerindendir.', 'The Turkish-Islamic tradition of philosophy is one of the traces of Islamic civilisation in thought.'],

  // İngilizce ↔ Din
  ['ing_12_5_kel', 'din_hucurat13', 'ilg', 'Kültürel çeşitliliğe saygı, Hucurat 13. ayetteki tanışma ve kaynaşma mesajıyla ilişkilidir.', 'Respect for cultural diversity relates to the message of getting to know one another in verse Hujurat 13.'],
  ['ing_12_3_kel', 'din_aile_iletisim', 'ilg', 'Teknolojinin aile yaşamına etkisi, aile içi iletişim ve etkileşimle doğrudan ilişkilidir.', 'Technology’s effect on family life is directly linked to communication and interaction within the family.'],
  ['ing_12_2_kel', 'din_bagimlilik', 'ilg', 'Alışveriş bağımlılığı gibi konular, bağımlılıkla ilgili meselelerin bir örneğidir.', 'Topics such as shopping addiction are one example of issues related to addiction.'],

  // İngilizce ↔ Fizik, Kimya, Felsefe
  ['fiz_kaynak', 'ing_10_7_kel', 'ilg', 'Yenilenebilir ve yenilenemez kaynak sözcükleri, fizikteki enerji kaynağı sınıflandırmasıyla örtüşür.', 'Vocabulary for renewable and non-renewable resources matches the classification of energy sources in physics.'],
  ['fiz_kariyer', 'ing_12_6_kel', 'ilg', 'Fizikle ilişkili kariyer olanakları, uzay kuruluşları ve uzay görevleriyle örneklenebilir.', 'Physics-related careers can be illustrated by space agencies and their missions.'],
  ['kim_mikroplas', 'ing_11_7_kel', 'ilg', 'Çevre sorunları ve çözümleri sözcükleri, mikroplastik kirliliği gibi konuları İngilizce tartışmayı sağlar.', 'Vocabulary for environmental problems and solutions lets students discuss issues like microplastics in English.'],
  ['kim_yapayzeka', 'ing_11_8_kel', 'ilg', 'Yapay zekâ ve robotik sözcükleri, yapay zekânın sürdürülebilirliğe etkisini İngilizce tartışmayı sağlar.', 'Vocabulary for AI and robotics lets students discuss AI’s effect on sustainability in English.'],
  ['fel_te_aks', 'ing_11_8_kel', 'ilg', 'Yapay zekâ ve robotik gibi gelecek teknolojileri, teknolojinin değer ve güvenlik sorunlarını gündeme getirir.', 'Future technologies such as AI and robotics raise the value and security problems of technology.']
]);
