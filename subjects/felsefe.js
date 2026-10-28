// Felsefe (10–11) · Türkiye Yüzyılı Maarif Modeli 2026. Kaynak: MEB TYMM Felsefe Dersi Öğretim Programı.
EBA.register({
  id: 'felsefe', order: 8,
  name: { tr: 'Felsefe', en: 'Philosophy' },
  program: { pdf: 'https://tymm.meb.gov.tr/assets/pdf/felsefe-dersi_20260819_142831_736.pdf' },
  books: {
    10: { url: 'https://tymm.meb.gov.tr/kitap/73/felsefe-dersi-10sinif-ders-kitabi', sup: 'https://tymm.meb.gov.tr/kitap/123/felsefe-dersi-10sinif-destekleme-etkinlikleri' },
    11: { url: 'https://tymm.meb.gov.tr/kitap/403/felsefe-dersi-11sinif-ders-kitabi' }
  },
  popular: ['fel_arguman', 'fel_safsata', 'fel_ah_evrensel', 'fel_si_iktidar'],
  themes: [
    { id: 'fel_th_doga', grade: 10, name: { tr: 'Felsefenin Doğası', en: 'The Nature of Philosophy' } },
    { id: 'fel_th_mantik', grade: 10, name: { tr: 'Felsefe, Mantık ve Argümantasyon', en: 'Philosophy, Logic and Argumentation' } },
    { id: 'fel_th_varlik', grade: 10, name: { tr: 'Varlık Felsefesi', en: 'Philosophy of Being' } },
    { id: 'fel_th_bilgi', grade: 10, name: { tr: 'Bilgi Felsefesi', en: 'Philosophy of Knowledge' } },
    { id: 'fel_th_ahlak', grade: 10, name: { tr: 'Ahlak Felsefesi', en: 'Moral Philosophy' } },
    { id: 'fel_th_estetik', grade: 10, name: { tr: 'Estetik ve Sanat Felsefesi', en: 'Aesthetics and Philosophy of Art' } },
    { id: 'fel_th_siyaset', grade: 10, name: { tr: 'Siyaset Felsefesi', en: 'Political Philosophy' } },
    { id: 'fel_th_din', grade: 10, name: { tr: 'Din Felsefesi', en: 'Philosophy of Religion' } },
    { id: 'fel_th_bilim', grade: 10, name: { tr: 'Bilim Felsefesi', en: 'Philosophy of Science' } },
    { id: 'fel_th_cevre', grade: 11, name: { tr: 'Çevre Sorunları ve Felsefe', en: 'Environmental Problems and Philosophy' } },
    { id: 'fel_th_tekno', grade: 11, name: { tr: 'Teknoloji ve Hayat', en: 'Technology and Life' } },
    { id: 'fel_th_akil', grade: 11, name: { tr: 'Akıl ve İnanç', en: 'Reason and Faith' } },
    { id: 'fel_th_edebiyat', grade: 11, name: { tr: 'Edebiyat ve Felsefe', en: 'Literature and Philosophy' } },
    { id: 'fel_th_hayat', grade: 11, name: { tr: 'Hayatın Anlamı', en: 'The Meaning of Life' } },
    { id: 'fel_th_hukuk', grade: 11, name: { tr: 'Hukuk ve Felsefe', en: 'Law and Philosophy' } }
  ],
  // [id, tema, ad, kod, özet, ad (EN), özet (EN)]
  topics: [
    ["fel_anlam", "fel_th_doga", "Felsefenin anlamı", "FEL.10.1.1", "Felsefenin bilgelik sevgisi olarak anlamı ve felsefenin ortak bir tanımının mümkün olup olmadığı sorusu.", "The meaning of philosophy", "The meaning of philosophy as the love of wisdom, and the question of whether a common definition of philosophy is possible."],
    ["fel_ozellik", "fel_th_doga", "Felsefi düşüncenin özellikleri", "FEL.10.1.1", "Hayret, merak, şüphe ve sorgulamayla başlayan; rasyonel, tutarlı, refleksif, eleştirel, sistemli ve evrensel düşünme.", "Features of philosophical thought", "Thinking that begins with wonder, curiosity, doubt and questioning, and is rational, coherent, reflexive, critical, systematic and universal."],
    ["fel_gelisim", "fel_th_doga", "Felsefenin ortaya çıkışı ve gelişimi", "FEL.10.1.1", "Felsefenin kültürel, siyasal ve bilimsel koşullarla gelişimi; Hint, Çin, Türk-İslam ve Antik Yunan gibi felsefe gelenekleri.", "Origins and development of philosophy", "How philosophy developed under cultural, political and scientific conditions; traditions such as Indian, Chinese, Turkish-Islamic and Ancient Greek."],
    ["fel_soru", "fel_th_doga", "Felsefi sorunun özellikleri", "FEL.10.1.1", "Felsefi soruları diğer sorulardan ayıran nitelikler ve özgün felsefi soru sorma.", "Features of a philosophical question", "The qualities that set philosophical questions apart from other questions, and asking original philosophical questions."],
    ["fel_alanlar", "fel_th_doga", "Felsefenin bilim, din, sanatla ilişkisi", "FEL.10.1.1", "Felsefenin bilim, din ve sanatla amaç, yöntem ve konu bakımından benzer ve farklı yönleri.", "Philosophy and science, religion, art", "Similarities and differences between philosophy and science, religion and art in terms of aim, method and subject."],
    ["fel_islev", "fel_th_doga", "Felsefenin bireysel ve toplumsal işlevi", "FEL.10.1.1", "Felsefenin bireyin düşünme ve yargılama biçimine ve topluma katkısı.", "Individual and social role of philosophy", "Philosophy’s contribution to how individuals think and judge, and to society."],

    ["fel_dusdil", "fel_th_mantik", "Düşünme ve dil ilişkisi", "FEL.10.2.1", "Düşünme ile dil arasındaki ilişki; dil olmadan düşünmenin mümkün olup olmadığı.", "The relation between thought and language", "How thinking and language relate, and whether thinking without language is possible."],
    ["fel_mantik", "fel_th_mantik", "Mantık, akıl ilkeleri ve önerme", "FEL.10.2.2", "Mantığın anlamı; özdeşlik, çelişmezlik, üçüncü halin imkânsızlığı ve yeter sebep ilkeleri; önerme ve doğruluk.", "Logic, laws of thought, proposition", "The meaning of logic; the principles of identity, non-contradiction, excluded middle and sufficient reason; propositions and truth."],
    ["fel_akilyur", "fel_th_mantik", "Akıl yürütme türleri", "FEL.10.2.2", "Tümdengelim, tümevarım ve analoji ile akıl yürütme türlerini örneklerde belirleme.", "Types of reasoning", "Deduction, induction and analogy, and identifying the type of reasoning in examples."],
    ["fel_arguman", "fel_th_mantik", "Argüman ve tutarlılık", "FEL.10.2.2", "Öncül ve sonuçtan oluşan argümanın yapısı; tutarlılık ve ifadeleri mantıksal yapıya dönüştürüp yeniden ifade etme.", "Argument and consistency", "The structure of an argument made of premises and a conclusion; consistency and restating statements in their logical form."],
    ["fel_safsata", "fel_th_mantik", "Safsatalar", "FEL.10.2.2", "Otoriteye başvurma, adam karalama, cımbızlama, popülerliğe başvurma, nedensellik ve yanlış analoji safsataları.", "Fallacies", "Fallacies such as appeal to authority, personal attack, cherry-picking, appeal to popularity, causal fallacy and false analogy."],

    ["fel_var_konu", "fel_th_varlik", "Varlık felsefesinin konusu ve kavramları", "FEL.10.3.1", "Varlık felsefesinin konusu; fenomen, idea, madde, oluş, öz, töz, varlık ve varoluş kavramları.", "Subject and concepts of ontology", "The subject of the philosophy of being; the concepts of phenomenon, idea, matter, becoming, essence, substance, being and existence."],
    ["fel_var_olup", "fel_th_varlik", "Varlığın var olup olmadığı", "FEL.10.3.1", "Dış dünyanın gerçekliğine ve varlığın var olup olmadığına ilişkin felsefi görüşler ve argümanlar.", "Whether being exists", "Philosophical views and arguments on the reality of the outer world and on whether being exists."],
    ["fel_var_ne", "fel_th_varlik", "Varlığın ne olduğu", "FEL.10.3.1", "Varlığın madde, idea ya da değişim olarak nasıl açıklandığına ilişkin temel görüşler.", "What being is", "Main views on whether being is explained as matter, idea or change."],

    ["fel_bil_konu", "fel_th_bilgi", "Bilgi felsefesinin konusu ve kavramları", "FEL.10.4.1", "Bilgi felsefesinin konusu; bilgi, doğruluk ve gerçeklik kavramları.", "Subject and concepts of epistemology", "The subject of the philosophy of knowledge; the concepts of knowledge, truth and reality."],
    ["fel_bil_imkan", "fel_th_bilgi", "Bilginin imkânı", "FEL.10.4.1", "Doğru bilginin mümkün olup olmadığına ilişkin görüşler ve argümanlar.", "The possibility of knowledge", "Views and arguments on whether true knowledge is possible."],
    ["fel_bil_kaynak", "fel_th_bilgi", "Bilginin kaynağı", "FEL.10.4.1", "Bilgiye akıl, duyu ve deneyim gibi hangi kaynaklardan ulaşıldığına ilişkin görüşler.", "The source of knowledge", "Views on which sources, such as reason, the senses and experience, knowledge comes from."],
    ["fel_bil_olcut", "fel_th_bilgi", "Doğruluk ölçütleri", "FEL.10.4.1", "Bir bilginin doğru olup olmadığına karar vermede kullanılan ölçütler.", "Criteria of truth", "The criteria used to decide whether a piece of knowledge is true."],

    ["fel_ah_konu", "fel_th_ahlak", "Ahlak felsefesinin konusu ve kavramları", "FEL.10.5.1", "Ahlak ile etiğin farkı; ahlak, erdem, iyi, kötü, özgürlük, sorumluluk ve vicdan kavramları.", "Subject and concepts of ethics", "The difference between morality and ethics; the concepts of morality, virtue, good, evil, freedom, responsibility and conscience."],
    ["fel_ah_evrensel", "fel_th_ahlak", "Evrensel ahlak yasasının imkânı", "FEL.10.5.1", "Herkes için geçerli bir ahlak yasasının olup olmadığına ilişkin farklı filozofların görüşleri.", "Possibility of a universal moral law", "Different philosophers’ views on whether a moral law valid for everyone exists."],
    ["fel_ah_ozgur", "fel_th_ahlak", "Özgürlük ve sorumluluk", "FEL.10.5.1", "Özgürlük problemi ve insanın kendi eylemlerinin sorumluluğunu üstlenmesi (ahlaki özerklik).", "Freedom and responsibility", "The problem of freedom and a person’s taking responsibility for their own actions (moral autonomy)."],

    ["fel_es_konu", "fel_th_estetik", "Estetik ve sanat felsefesinin konusu", "FEL.10.6.1", "Estetik ve sanat felsefesinin konusu; estetik, hoş, güzellik, sanat ve sanat eseri kavramları.", "Subject of aesthetics and philosophy of art", "The subject of aesthetics and the philosophy of art; the concepts of the aesthetic, the pleasant, beauty, art and the work of art."],
    ["fel_es_sanat", "fel_th_estetik", "Sanatın ne olduğu", "FEL.10.6.1", "Sanatın taklit, yaratım ve oyun kuramlarıyla açıklanması.", "What art is", "Explaining art through the imitation, creation and play theories."],
    ["fel_es_guzel", "fel_th_estetik", "Güzellik ve ortak estetik yargı", "FEL.10.6.1", "Güzelliğin nesnel mi öznel mi olduğu ve herkesçe paylaşılan estetik yargıların mümkün olup olmadığı.", "Beauty and shared aesthetic judgment", "Whether beauty is objective or subjective, and whether shared aesthetic judgments are possible."],

    ["fel_si_konu", "fel_th_siyaset", "Siyaset felsefesinin konusu ve kavramları", "FEL.10.7.1", "Siyaset felsefesinin konusu; adalet, birey, devlet, eşitlik, iktidar, özgürlük, toplum ve ütopya kavramları.", "Subject and concepts of political philosophy", "The subject of political philosophy; the concepts of justice, individual, state, equality, power, freedom, society and utopia."],
    ["fel_si_devlet", "fel_th_siyaset", "Devletin kökeni", "FEL.10.7.1", "Devletin nasıl ve neden ortaya çıktığına ilişkin görüşler.", "The origin of the state", "Views on how and why the state came into being."],
    ["fel_si_iktidar", "fel_th_siyaset", "İktidarın kaynağı ve meşruiyeti", "FEL.10.7.1", "Yönetme yetkisinin kimde olduğu ve iktidarın neye dayanarak meşru sayıldığı.", "Source and legitimacy of power", "Who holds the authority to rule and what makes power legitimate."],
    ["fel_si_ideal", "fel_th_siyaset", "İdeal düzen ve ütopyalar", "FEL.10.7.1", "Düşünürlerin tasarladığı ideal devlet ve toplum düzenleri ile ütopyalar.", "Ideal order and utopias", "The ideal states and social orders designed by thinkers, and utopias."],

    ["fel_di_konu", "fel_th_din", "Din felsefesinin konusu ve kavramları", "FEL.10.8.1", "Din felsefesinin konusu; din, inanç, Tanrı, vahiy, mucize ve ibadet kavramları; teolojiden farkı.", "Subject and concepts of philosophy of religion", "The subject of the philosophy of religion; the concepts of religion, faith, God, revelation, miracle and worship; how it differs from theology."],
    ["fel_di_tanri", "fel_th_din", "Tanrı’nın varlığına ilişkin görüşler", "FEL.10.8.1", "Tanrı’nın varlığı konusunda farklı tutumlar ve bu görüşlerin dayandığı düşünceler.", "Views on the existence of God", "Different positions on the existence of God and the ideas they rest on."],
    ["fel_di_arg", "fel_th_din", "Tanrı’nın varlığına yönelik argümanlar", "FEL.10.8.1", "Tanrı’nın varlığını kanıtlamak ya da çürütmek için ileri sürülen argümanlar.", "Arguments about the existence of God", "Arguments put forward to prove or refute the existence of God."],
    ["fel_di_evren", "fel_th_din", "Evren ve ruh sorunları", "FEL.10.8.1", "Evrenin sonluluğu ve sonsuzluğu ile ruhun ölümsüzlüğü sorunlarına ilişkin görüşler.", "Problems of the universe and the soul", "Views on whether the universe is finite or infinite and on the immortality of the soul."],

    ["fel_bi_konu", "fel_th_bilim", "Bilim felsefesinin konusu ve kavramları", "FEL.10.9.1", "Bilim felsefesinin konusu; bilim, bilimsel yöntem, gözlem, hipotez, kuram, paradigma ve yasa kavramları.", "Subject and concepts of philosophy of science", "The subject of the philosophy of science; the concepts of science, scientific method, observation, hypothesis, theory, paradigm and law."],
    ["fel_bi_ne", "fel_th_bilim", "Bilimin ne olduğu", "FEL.10.9.1", "Klasik ve çağdaş bilim anlayışları: bilimsel bilginin kesinliği, değişebilirliği ve toplumsal rolü.", "What science is", "Classical and contemporary views of science: the certainty and changeability of scientific knowledge and its social role."],
    ["fel_bi_unsur", "fel_th_bilim", "Bilimi oluşturan unsurlar", "FEL.10.9.1", "Gözlem, hipotez, kuram ve yasa gibi bilimi oluşturan unsurlar ile bilimsel yöntemin rolü.", "Elements of science", "The elements that make up science, such as observation, hypothesis, theory and law, and the role of scientific method."],

    ["fel_cv_insan", "fel_th_cevre", "Çevre ve insan ilişkisi", "FEL.11.1.1", "Çevreyle ilgili felsefi soru ve problemler; insanın doğa ve çevreyle ilişkisi ve değer anlayışı.", "The relation between humans and environment", "Philosophical questions and problems about the environment; how humans relate to nature and the environment."],
    ["fel_cv_etik", "fel_th_cevre", "Çevre etiği", "FEL.11.1.1", "İnsan merkezci, canlı merkezci ve çevre merkezci etik yaklaşımları.", "Environmental ethics", "The human-centred, life-centred and environment-centred ethical approaches."],
    ["fel_cv_gorus", "fel_th_cevre", "Çevre sorunlarına felsefi yaklaşım", "FEL.11.1.2", "Çevre sorunlarıyla ilgili felsefi argümanları çözümleme, görüş oluşturma ve felsefi metin yazma.", "A philosophical approach to environmental problems", "Analysing philosophical arguments on environmental problems, forming views and writing a philosophical text."],

    ["fel_te_ont", "fel_th_tekno", "Teknoloji ve ontolojik problemler", "FEL.11.2.1", "Teknoloji bağlamında ontolojik anlam kaybı ve yabancılaşma; zaman ve mekân kavramları.", "Technology and ontological problems", "Loss of ontological meaning and alienation in the context of technology; the concepts of time and space."],
    ["fel_te_aks", "fel_th_tekno", "Teknoloji ve aksiyolojik problemler", "FEL.11.2.1", "Teknoloji bağlamında güvenlik sorunları, değerlerin tahribatı ve ahlaki eylemin imkânı.", "Technology and axiological problems", "Security problems, the erosion of values and the possibility of moral action in the context of technology."],
    ["fel_te_gorus", "fel_th_tekno", "Teknoloji ve hayat üzerine düşünce", "FEL.11.2.2", "Teknoloji karşıtlığı ve taraftarlığı görüşlerini çözümleme; teknoloji-hayat ilişkisinde görüş ve felsefi metin üretme.", "Philosophical thought on technology and life", "Analysing technophobic and technophile views; forming views and writing a philosophical text on technology and life."],

    ["fel_ai_sor", "fel_th_akil", "Akıl-inanç ilişkisi sorunları", "FEL.11.3.1", "Akıl, gönül ve inanç kavramları; akıl-inanç ilişkisine yönelik felsefi sorular ve problemler.", "Problems of the reason-faith relation", "The concepts of reason, heart and faith; philosophical questions and problems on the relation between reason and faith."],
    ["fel_ai_gorus", "fel_th_akil", "Akıl-inanç görüşleri ve argümanları", "FEL.11.3.2", "Akıl-inanç ilişkisine yönelik felsefi görüş ve argümanları çözümleme ve felsefi metin yazma.", "Views and arguments on reason and faith", "Analysing philosophical views and arguments on reason and faith, and writing a philosophical text."],

    ["fel_ed_iliski", "fel_th_edebiyat", "Edebiyat-felsefe ilişkisi", "FEL.11.4.1", "Edebî unsurlara felsefi bakış; edebiyatın felsefi düşünceyi aktarmadaki yeri.", "The relation between literature and philosophy", "A philosophical look at literary elements; the role of literature in conveying philosophical thought."],
    ["fel_ed_felsefe", "fel_th_edebiyat", "Edebî unsurlarla felsefe yapma", "FEL.11.4.2", "Felsefi roman ve felsefi şiir; edebî eserlerden felsefi görüş ve argüman çıkarma.", "Doing philosophy through literary elements", "The philosophical novel and philosophical poetry; drawing philosophical views and arguments from literary works."],

    ["fel_ha_mutlu", "fel_th_hayat", "Mutluluk ve hayat ilişkisi", "FEL.11.5.1", "Hayatın anlamıyla ilgili soruların mutluluk kavramı çevresinde ele alınması.", "Happiness and life", "Treating questions about the meaning of life around the concept of happiness."],
    ["fel_ha_varolus", "fel_th_hayat", "Varoluş ve kendi olma", "FEL.11.5.1", "Kaygı, ölüm, saçma, umutsuzluk ve yabancılaşma kavramlarıyla varoluş ve kendi olma problemi.", "Existence and being oneself", "The problem of existence and being oneself through the concepts of anxiety, death, the absurd, despair and alienation."],
    ["fel_ha_gorus", "fel_th_hayat", "Hayatın anlamına yönelik görüşler", "FEL.11.5.2", "Hayatın anlamına ilişkin felsefi görüş ve argümanları çözümleme ve felsefi metin yazma.", "Views on the meaning of life", "Analysing philosophical views and arguments on the meaning of life, and writing a philosophical text."],

    ["fel_hu_doga", "fel_th_hukuk", "Hukukun doğası ve gerekliliği", "FEL.11.6.1", "Hukukun gereği ve önemi; ceza, suç, hakkaniyet, hukuk ve yasa kavramları.", "The nature and necessity of law", "The necessity and importance of law; the concepts of punishment, crime, equity, law and statute."],
    ["fel_hu_kaynak", "fel_th_hukuk", "Hukukun kaynağı ve ahlak-hukuk ilişkisi", "FEL.11.6.1", "Doğal hukuk ve pozitif hukuk anlayışları; ahlak ile hukuk arasındaki ilişki.", "Source of law and the morality-law relation", "Natural law and positive law; the relation between morality and law."],
    ["fel_hu_sorun", "fel_th_hukuk", "Hak, özgürlük ve hukuk sorunları", "FEL.11.6.2", "Hak ve özgürlüklerin hukuksal temellerini çözümleme; güncel hukuk sorunlarında görüş ve felsefi metin üretme.", "Rights, freedom and legal problems", "Analysing the legal foundations of rights and freedoms; forming views and writing a philosophical text on current legal problems."]
  ],
  // [kaynak, hedef, tür (on/kol/ilg), gerekçe (TR), gerekçe (EN)]
  links: [
    ["fel_anlam", "fel_ozellik", "on", "Felsefenin ne olduğu bilinmeden onun düşünme özellikleri anlaşılmaz.", "Its features cannot be grasped without knowing what philosophy is."],
    ["fel_anlam", "fel_gelisim", "kol", "Felsefenin tanımı, tarihsel gelişimini kavramayı kolaylaştırır.", "The definition of philosophy makes its historical development easier to follow."],
    ["fel_ozellik", "fel_soru", "on", "Felsefi sorunun nitelikleri düşüncenin sorgulayıcı özelliklerine dayanır.", "The traits of a philosophical question rest on the questioning features of thought."],
    ["fel_gelisim", "fel_alanlar", "kol", "Felsefenin ortaya çıkışı, bilim, din ve sanatla ilişkisini anlamaya yardım eder.", "How philosophy arose helps in understanding its relation to science, religion and art."],
    ["fel_anlam", "fel_alanlar", "kol", "Felsefenin tanımı, diğer alanlarla karşılaştırmanın çıkış noktasıdır.", "The definition of philosophy is the starting point for comparing it with other fields."],
    ["fel_ozellik", "fel_islev", "kol", "Felsefi düşüncenin özellikleri, işlevlerini tartışmayı kolaylaştırır.", "The features of philosophical thought make it easier to discuss its functions."],
    ["fel_alanlar", "fel_islev", "ilg", "Diğer alanlarla ilişki, felsefenin kendine özgü işlevini görünür kılar.", "The relation to other fields shows what is distinctive about philosophy’s function."],
    ["fel_soru", "fel_alanlar", "ilg", "Felsefi soru, felsefeyi bilim ve dinin sorularından ayırmada kullanılır.", "The philosophical question helps tell philosophy apart from the questions of science and religion."],

    ["fel_ozellik", "fel_mantik", "kol", "Rasyonel ve tutarlı düşünme, mantığın temel kavramlarına zemin hazırlar.", "Rational and coherent thinking prepares the ground for the basic concepts of logic."],
    ["fel_dusdil", "fel_mantik", "kol", "Düşüncenin dille ifade edilmesi, ifadeleri mantıksal açıdan incelemeyi kolaylaştırır.", "Expressing thought in language makes it easier to examine statements logically."],
    ["fel_mantik", "fel_akilyur", "on", "Önerme ve akıl ilkeleri bilinmeden akıl yürütme türleri değerlendirilemez.", "Reasoning types cannot be assessed without knowing propositions and laws of thought."],
    ["fel_akilyur", "fel_arguman", "on", "Argümanın yapısı, akıl yürütme türleri üzerinden çözümlenir.", "The structure of an argument is analysed through the types of reasoning."],
    ["fel_mantik", "fel_arguman", "on", "Önerme kavramı, argümanın öncül ve sonuçlarını belirlemenin temelidir.", "The concept of proposition is the basis for identifying an argument’s premises and conclusion."],
    ["fel_arguman", "fel_safsata", "on", "Safsata, argümanın geçerli yapısı bilindiğinde fark edilebilir.", "A fallacy can be spotted once the valid structure of an argument is known."],
    ["fel_dusdil", "fel_arguman", "ilg", "Argümanı yeniden ifade etmek düşünme ile dil arasındaki ilişkiye dayanır.", "Restating an argument relies on the relation between thought and language."],
    ["fel_islev", "fel_safsata", "ilg", "Rasyonel toplum olma işlevi, safsatalara karşı farkındalıkla ilişkilidir.", "The function of fostering a rational society ties in with awareness of fallacies."],

    ["fel_gelisim", "fel_var_konu", "kol", "Antik felsefe gelenekleri, varlık sorununun ilk ele alınışını gösterir.", "Ancient philosophical traditions show how the question of being was first taken up."],
    ["fel_arguman", "fel_var_konu", "kol", "Argüman çözümleme becerisi, varlık metinlerini incelemede kullanılır.", "Argument analysis is used when studying texts on being."],
    ["fel_var_konu", "fel_var_olup", "on", "Varlık kavramları bilinmeden varlığın var olup olmadığı tartışılamaz.", "Whether being exists cannot be discussed without the concepts of being."],
    ["fel_var_konu", "fel_var_ne", "on", "Madde, idea ve oluş kavramları, varlığın ne olduğu tartışmasının temelidir.", "Matter, idea and becoming are the basis of the debate on what being is."],
    ["fel_var_olup", "fel_var_ne", "kol", "Varlığın varlığını kabul etmek, onun ne olduğunu sormanın ön adımıdır.", "Accepting that being exists is the first step toward asking what it is."],

    ["fel_var_konu", "fel_bil_konu", "kol", "Gerçeklik anlayışı, bilginin konusu ve doğruluk üzerine düşünmeyi kolaylaştırır.", "One’s view of reality eases thinking about the object of knowledge and about truth."],
    ["fel_arguman", "fel_bil_imkan", "kol", "Bilginin imkânına dair görüşler argüman olarak değerlendirilir.", "Views on the possibility of knowledge are assessed as arguments."],
    ["fel_bil_konu", "fel_bil_imkan", "on", "Bilgi ve doğruluk kavramları, bilginin imkânı tartışmasının temelidir.", "The concepts of knowledge and truth underlie the debate on its possibility."],
    ["fel_bil_imkan", "fel_bil_kaynak", "kol", "Bilginin mümkün olduğunu kabul etmek, kaynağını sormayı anlamlı kılar.", "Granting that knowledge is possible makes asking about its source meaningful."],
    ["fel_bil_kaynak", "fel_bil_olcut", "kol", "Bilginin kaynağı, doğruluğunun nasıl sınanacağı sorusunu belirler.", "The source of knowledge shapes how its truth is to be tested."],
    ["fel_var_olup", "fel_bil_imkan", "ilg", "Dış dünyanın gerçekliği ile bilinebilirliği birbirine bağlı sorulardır.", "The reality of the outer world and its knowability are linked questions."],

    ["fel_soru", "fel_ah_konu", "kol", "Felsefi soru sorma, ahlaki problemleri tanımayı kolaylaştırır.", "Asking philosophical questions makes moral problems easier to recognise."],
    ["fel_ah_konu", "fel_ah_evrensel", "on", "Ahlak ve etik kavramları, evrensel ahlak yasası tartışmasının temelidir.", "The concepts of morality and ethics underlie the debate on a universal moral law."],
    ["fel_ah_konu", "fel_ah_ozgur", "on", "Sorumluluk ve vicdan kavramları, özgürlük problemini anlamayı sağlar.", "The concepts of responsibility and conscience are needed to understand the problem of freedom."],
    ["fel_ah_evrensel", "fel_ah_ozgur", "ilg", "Ödev ve özerklik anlayışları hem evrensel yasayı hem özgürlüğü ilgilendirir.", "Notions of duty and autonomy bear on both the universal law and freedom."],
    ["fel_islev", "fel_ah_konu", "ilg", "Etik ilkeler çerçevesinde yargıda bulunma, felsefenin toplumsal işlevlerindendir.", "Judging within ethical principles is one of philosophy’s social functions."],

    ["fel_alanlar", "fel_es_konu", "kol", "Felsefenin sanatla ilişkisi, estetik ve sanat felsefesine giriş sağlar.", "Philosophy’s relation to art leads into aesthetics and the philosophy of art."],
    ["fel_es_konu", "fel_es_sanat", "on", "Sanat ve sanat eseri kavramları, sanatın ne olduğunu tartışmanın temelidir.", "The concepts of art and the work of art are the basis for asking what art is."],
    ["fel_es_konu", "fel_es_guzel", "on", "Güzellik ve estetik kavramları, ortak estetik yargı sorununun temelidir.", "The concepts of beauty and the aesthetic underlie the problem of shared aesthetic judgment."],
    ["fel_es_sanat", "fel_es_guzel", "kol", "Sanat kuramları, güzelliğin nesnel ya da öznel sayılmasını açıklamaya yardım eder.", "Theories of art help explain why beauty is treated as objective or subjective."],
    ["fel_bil_olcut", "fel_es_guzel", "ilg", "Nesnellik-öznellik tartışması hem doğruluk hem güzellik yargısında görülür.", "The objectivity-subjectivity debate appears in judgments of both truth and beauty."],

    ["fel_ah_konu", "fel_si_konu", "kol", "Adalet ve özgürlük gibi ahlaki kavramlar siyaset felsefesinin de kavramlarıdır.", "Moral concepts such as justice and freedom are also concepts of political philosophy."],
    ["fel_ah_ozgur", "fel_si_konu", "kol", "Bireyin özgürlüğü, birey-devlet ilişkisini kavramaya zemin hazırlar.", "Individual freedom prepares the ground for understanding the individual-state relation."],
    ["fel_si_konu", "fel_si_devlet", "on", "Birey, toplum ve devlet kavramları, devletin kökeni tartışmasının temelidir.", "The concepts of individual, society and state underlie the debate on the origin of the state."],
    ["fel_si_konu", "fel_si_iktidar", "on", "İktidar kavramı bilinmeden meşruiyeti tartışılamaz.", "Legitimacy cannot be discussed without the concept of power."],
    ["fel_si_devlet", "fel_si_iktidar", "kol", "Devletin kökeni, iktidarın kaynağı sorusunu anlamayı kolaylaştırır.", "The origin of the state eases understanding the question of the source of power."],
    ["fel_si_iktidar", "fel_si_ideal", "kol", "Meşru yönetim anlayışları, ideal düzen tasarımlarını değerlendirmeyi kolaylaştırır.", "Views of legitimate rule help in evaluating designs of an ideal order."],

    ["fel_alanlar", "fel_di_konu", "kol", "Felsefenin din ile ilişkisi, din felsefesinin konusunu belirginleştirir.", "Philosophy’s relation to religion clarifies the subject of the philosophy of religion."],
    ["fel_di_konu", "fel_di_tanri", "on", "Din ve inanç kavramları, Tanrı’nın varlığına ilişkin görüşleri anlamanın temelidir.", "The concepts of religion and faith underlie the views on the existence of God."],
    ["fel_di_tanri", "fel_di_arg", "on", "Görüşler bilinmeden onları destekleyen argümanlar değerlendirilemez.", "The arguments that support the views cannot be assessed without knowing the views."],
    ["fel_arguman", "fel_di_arg", "kol", "Argüman çözümleme, Tanrı’nın varlığına yönelik kanıtları inceletir.", "Argument analysis allows the proofs of God’s existence to be examined."],
    ["fel_di_arg", "fel_di_evren", "kol", "Nedensellik ve evren argümanları, evrenin sonluluğu tartışmasına geçişi sağlar.", "Causal and cosmic arguments lead into the debate on the finiteness of the universe."],
    ["fel_var_olup", "fel_di_tanri", "ilg", "Varlık sorunu ile Tanrı’nın varlığı sorusu birbirini besler.", "The problem of being and the question of God’s existence feed each other."],

    ["fel_bil_konu", "fel_bi_konu", "kol", "Bilgi ve doğruluk kavramları, bilimsel bilgiyi tartışmanın temelidir.", "The concepts of knowledge and truth are the basis for discussing scientific knowledge."],
    ["fel_alanlar", "fel_bi_konu", "kol", "Felsefenin bilimle ilişkisi, bilim felsefesinin konusunu anlamaya yardım eder.", "Philosophy’s relation to science helps in grasping the subject of the philosophy of science."],
    ["fel_bi_konu", "fel_bi_ne", "on", "Bilim ve bilimsel yöntem kavramları, bilimin ne olduğu tartışmasının temelidir.", "The concepts of science and scientific method underlie the debate on what science is."],
    ["fel_bi_konu", "fel_bi_unsur", "on", "Gözlem, hipotez ve kuram kavramları, bilimi oluşturan unsurların temelidir.", "The concepts of observation, hypothesis and theory underlie the elements that make up science."],
    ["fel_bi_unsur", "fel_bi_ne", "kol", "Bilimin unsurlarını bilmek, bilimin doğasını tartışmayı kolaylaştırır.", "Knowing the elements of science eases discussing the nature of science."],
    ["fel_akilyur", "fel_bi_unsur", "kol", "Tümevarım ve tümdengelim, hipotez ve kuram kurmada kullanılır.", "Induction and deduction are used in forming hypotheses and theories."],
    ["fel_bil_kaynak", "fel_bi_ne", "ilg", "Deney ve gözlem, bilginin kaynağı tartışmasının bilimdeki karşılığıdır.", "Experiment and observation are the scientific counterpart of the debate on the source of knowledge."],

    ["fel_cv_insan", "fel_cv_etik", "on", "İnsan-çevre ilişkisi anlaşılmadan çevre etiği yaklaşımları kavranamaz.", "Environmental ethical approaches cannot be grasped without the human-environment relation."],
    ["fel_ah_konu", "fel_cv_etik", "on", "Çevre etiği, ahlak felsefesinin kavram ve problemlerine dayanır.", "Environmental ethics builds on the concepts and problems of moral philosophy."],
    ["fel_cv_etik", "fel_cv_gorus", "on", "Etik yaklaşımlar bilinmeden çevre sorunlarına dair argüman çözümlenemez.", "Arguments on environmental problems cannot be analysed without the ethical approaches."],
    ["fel_arguman", "fel_cv_gorus", "kol", "Felsefi argümanları çözümleme ve görüş kurma, argüman yapısı bilgisine dayanır.", "Analysing arguments and forming views relies on knowledge of argument structure."],
    ["fel_var_konu", "fel_cv_insan", "ilg", "İnsan ve doğanın varlık olarak ele alınışı, çevre sorunlarına bakışı etkiler.", "How humans and nature are treated as beings shapes the view of environmental problems."],

    ["fel_var_konu", "fel_te_ont", "on", "Teknolojinin ontolojik sorunları, varlık felsefesi kavramlarına dayanır.", "The ontological problems of technology rest on the concepts of the philosophy of being."],
    ["fel_ah_konu", "fel_te_aks", "on", "Değer ve ahlaki eylem sorunları, ahlak felsefesi kavramlarına dayanır.", "Problems of value and moral action rest on the concepts of moral philosophy."],
    ["fel_te_ont", "fel_te_aks", "kol", "Anlam kaybı ve yabancılaşma, değerlerin tahribatını anlamayı kolaylaştırır.", "Loss of meaning and alienation ease understanding the erosion of values."],
    ["fel_te_ont", "fel_te_gorus", "on", "Ontolojik sorunlar, teknolojiye dair görüşleri çözümlemenin temelidir.", "Ontological problems are the basis for analysing views on technology."],
    ["fel_te_aks", "fel_te_gorus", "on", "Aksiyolojik sorunlar, teknolojiye dair görüşleri çözümlemenin temelidir.", "Axiological problems are the basis for analysing views on technology."],
    ["fel_cv_insan", "fel_te_ont", "ilg", "Teknoloji ve doğa, insanın dünyayla ilişkisini birlikte şekillendirir.", "Technology and nature together shape how humans relate to the world."],
    ["fel_cv_etik", "fel_te_aks", "ilg", "Çevre etiği ve teknoloji etiği, insanın sorumluluğu sorusunda buluşur.", "Environmental ethics and the ethics of technology meet on the question of human responsibility."],

    ["fel_di_konu", "fel_ai_sor", "on", "Din felsefesinin temel kavramları, akıl-inanç ilişkisini ele almanın önkoşuludur.", "The basic concepts of the philosophy of religion are a prerequisite for the reason-faith relation."],
    ["fel_di_arg", "fel_ai_sor", "kol", "Tanrı’nın varlığı argümanları, aklın inanca yaklaşımını gösterir.", "The arguments on God’s existence show how reason approaches faith."],
    ["fel_bil_kaynak", "fel_ai_sor", "kol", "Akıl ve duyu tartışması, akıl-inanç sorusunu anlamaya zemin hazırlar.", "The debate on reason and the senses prepares the ground for the reason-faith question."],
    ["fel_ai_sor", "fel_ai_gorus", "on", "Akıl-inanç sorunları anlaşılmadan buna dair görüş ve argümanlar çözümlenemez.", "Views and arguments on reason and faith cannot be analysed without grasping the problems."],

    ["fel_dusdil", "fel_ed_iliski", "on", "Edebiyat dille kurulur; dil-düşünce ilişkisi edebiyat-felsefe ilişkisinin temelidir.", "Literature is built in language; the thought-language relation is the basis of the literature-philosophy relation."],
    ["fel_es_konu", "fel_ed_iliski", "kol", "Sanat ve estetik kavramları, edebî eserlere felsefi bakışı kolaylaştırır.", "The concepts of art and aesthetics ease a philosophical look at literary works."],
    ["fel_ed_iliski", "fel_ed_felsefe", "on", "Edebiyat-felsefe sorunları bilinmeden edebî unsurlarla felsefe yapılamaz.", "Philosophy cannot be done through literary elements without knowing the literature-philosophy problems."],
    ["fel_ed_felsefe", "fel_ha_varolus", "ilg", "Varoluşçu felsefi roman ve şiir, kendi olma temasını işler.", "The existentialist philosophical novel and poetry take up the theme of being oneself."],

    ["fel_ah_konu", "fel_ha_mutlu", "on", "Mutluluk ve iyi hayat, ahlak felsefesinin kavram ve problemlerine dayanır.", "Happiness and the good life rest on the concepts and problems of moral philosophy."],
    ["fel_ah_evrensel", "fel_ha_mutlu", "kol", "Epiküros ve Farabi gibi filozofların mutluluk görüşleri ahlak anlayışlarıyla bağlantılıdır.", "Philosophers such as Epicurus and Farabi tie their views of happiness to their moral outlook."],
    ["fel_ha_mutlu", "fel_ha_varolus", "kol", "Mutluluk sorusu, varoluş ve kendi olma problemine geçişi kolaylaştırır.", "The question of happiness eases the move to the problem of existence and being oneself."],
    ["fel_var_konu", "fel_ha_varolus", "kol", "Varoluş ve öz kavramları, varoluş felsefesini anlamayı kolaylaştırır.", "The concepts of existence and essence ease understanding existential philosophy."],
    ["fel_ah_ozgur", "fel_ha_varolus", "kol", "Özgürlük ve sorumluluk, kendi olma problemini anlamanın temelidir.", "Freedom and responsibility are the basis for understanding the problem of being oneself."],
    ["fel_ha_varolus", "fel_ha_gorus", "on", "Varoluş problemleri bilinmeden hayatın anlamına dair görüşler çözümlenemez.", "Views on the meaning of life cannot be analysed without the problems of existence."],
    ["fel_ha_mutlu", "fel_ha_gorus", "on", "Mutluluk ve hayat ilişkisi, hayatın anlamı görüşlerinin temelidir.", "The relation of happiness and life is the basis of views on the meaning of life."],
    ["fel_di_evren", "fel_ha_gorus", "ilg", "Ölüm ve ruhun ölümsüzlüğü sorusu, hayatın anlamı tartışmasına bağlanır.", "The question of death and the immortality of the soul ties into the debate on life’s meaning."],

    ["fel_si_konu", "fel_hu_doga", "on", "Devlet ve toplum kavramları, hukukun gerekliliğini anlamanın temelidir.", "The concepts of state and society underlie understanding the necessity of law."],
    ["fel_si_iktidar", "fel_hu_doga", "kol", "Meşru iktidar anlayışı, hukukun gereği ve yasa kavramını kolaylaştırır.", "The idea of legitimate power eases the notions of the necessity of law and of statute."],
    ["fel_hu_doga", "fel_hu_kaynak", "on", "Hukukun gereği anlaşılmadan kaynağı ve ahlakla ilişkisi tartışılamaz.", "The source of law and its relation to morality cannot be discussed without grasping its necessity."],
    ["fel_ah_evrensel", "fel_hu_kaynak", "kol", "Evrensel ahlak yasası fikri, doğal hukuk anlayışını kavramaya yardım eder.", "The idea of a universal moral law helps in grasping the notion of natural law."],
    ["fel_hu_kaynak", "fel_hu_sorun", "on", "Hukukun kaynağı bilinmeden hak ve özgürlüklerin temelleri çözümlenemez.", "The foundations of rights and freedoms cannot be analysed without knowing the source of law."],
    ["fel_ah_ozgur", "fel_hu_sorun", "kol", "Özgürlük ve sorumluluk kavramları, hak ve özgürlük sorunlarını anlamayı kolaylaştırır.", "The concepts of freedom and responsibility ease understanding problems of rights and freedoms."],

    ["fel_cv_gorus", "fel_te_gorus", "ilg", "Her ikisi de güncel sorunlar üzerine felsefi görüş ve metin üretmeyi gerektirir.", "Both require producing philosophical views and texts on current problems."],
    ["fel_te_gorus", "fel_ai_gorus", "ilg", "Felsefi argüman çözümleme ve metin yazma becerisi iki ünitede de kullanılır.", "The skills of analysing arguments and writing philosophical texts are used in both units."],
    ["fel_ai_gorus", "fel_ed_felsefe", "ilg", "Felsefi görüş geliştirme, hem metin hem edebî anlatımla yapılabilir.", "Developing philosophical views can be done through both essays and literary expression."],
    ["fel_ha_gorus", "fel_hu_sorun", "ilg", "Güncel sorunlara felsefi görüş ve metin üretme becerisi her iki ünitede ortaktır.", "The skill of forming philosophical views and texts on current issues is shared by both units."]
  ]
});
