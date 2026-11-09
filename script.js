/**
 * ==============================================================================
 * AZERBAIJAN - ATEŞLER ÜLKESİ (ODLAR YURDU)
 * script.js - Vanilla JavaScript Etkileşimli Özellikler
 * ==============================================================================
 * 
 * Bu dosyada aşağıdaki 4 temel özellik ve yardımcı işlevler yer alır:
 * 1. Mobil Cihazlar İçin Hamburger Menü (Aç/Kapa Çekmece Sistemi)
 * 2. Açık/Koyu (Dark/Light) Tema Değiştirme ve LocalStorage Kaydı
 * 3. Şehirler & Turistik Yerler İçin Canlı Arama ve Kategori Filtreleme Sistemi
 * 4. Azerbaycan Hakkında 5 Soruluk Etkileşimli Mini Bilgi Yarışması (Quiz)
 * + Ekstra: Şehir Detay Modal Penceresi, ScrollSpy & Yukarı Çık Butonu
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // ÖZELLİK 1: AÇIK / KOYU TEMA DEĞİŞTİRME SİSTEMİ (DARK / LIGHT THEME)
  // ============================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Kullanıcının kayıtlı tema tercihini kontrol et (LocalStorage)
  const savedTheme = localStorage.getItem('azerbaijan_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    // Sistem açık temayı tercih ediyorsa açık başla, aksi halde varsayılan koyu kalır
    htmlRoot.setAttribute('data-theme', 'light');
  }

  // Butona tıklandığında temayı değiştir ve kaydet
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('azerbaijan_theme', newTheme);
    });
  }


  // ============================================================================
  // ÖZELLİK 2: MOBİL HAMBURGER MENÜ (DRAWER AÇ/KAPA)
  // ============================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Menüyü Açma Fonksiyonu
  function openMobileMenu() {
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerOverlay.classList.add('active');
    drawerOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Arka planın kaymasını engelle
  }

  // Menüyü Kapatma Fonksiyonu
  function closeMobileMenu() {
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerOverlay.classList.remove('active');
    drawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
  }

  // Menü bağlantılarına tıklandığında menüyü otomatik kapat
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ESC tuşuna basıldığında menüyü kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
      closeCityModal();
    }
  });


  // ============================================================================
  // ÖZELLİK 3: ŞEHİRLER & TURİSTİK YERLER İÇİN ARAMA VE FİLTRELEME SİSTEMİ
  // ============================================================================
  const searchInput = document.getElementById('citySearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cityCards = document.querySelectorAll('.city-card');
  const citiesCountEl = document.getElementById('citiesCount');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  let currentCategory = 'all';
  let searchQuery = '';

  // Filtreleme ve Arama Çekirdek Fonksiyonu
  function filterCities() {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    cityCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardSearchData = (card.getAttribute('data-name') + ' ' + card.innerText).toLowerCase();

      // Kategori kontrolü
      const matchesCategory = (currentCategory === 'all') || cardCategory.includes(currentCategory);
      
      // Arama terimi kontrolü
      const matchesQuery = query === '' || cardSearchData.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.35s ease';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Sayaç ve Sonuç Bulunamadı durumunu güncelle
    if (citiesCountEl) {
      citiesCountEl.textContent = visibleCount;
    }

    if (noResultsMessage) {
      if (visibleCount === 0) {
        noResultsMessage.style.display = 'block';
      } else {
        noResultsMessage.style.display = 'none';
      }
    }
  }

  // Arama Girişi Dinleyicisi (Canlı Arama)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.length > 0) {
        clearSearchBtn.classList.add('visible');
      } else {
        clearSearchBtn.classList.remove('visible');
      }
      filterCities();
    });
  }

  // Arama Temizleme Butonu
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      filterCities();
      searchInput.focus();
    });
  }

  // Kategori Butonları Dinleyicisi
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterCities();
    });
  });

  // Filtreleri Sıfırla Butonu
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.remove('visible');
      }
      filterButtons.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
      currentCategory = 'all';
      filterCities();
    });
  }


  // ============================================================================
  // EK BİLEŞEN: ŞEHİR DETAY MODAL PENCERESİ (CITY DETAILS MODAL)
  // ============================================================================
  const cityModal = document.getElementById('cityDetailModal');
  const modalCityTitle = document.getElementById('modalCityTitle');
  const modalCityContent = document.getElementById('modalCityContent');
  const closeCityModalBtn = document.getElementById('closeCityModalBtn');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const openCityButtons = document.querySelectorAll('.open-city-modal');

  // Şehir Detay Bilgileri Veritabanı
  const cityDetailsData = {
    baku: {
      title: "Bakü (Bakı) — Detaylı Gezi & Tarih Rehberi",
      content: `
        <div style="margin-bottom:16px;">
          <img src="images/baku_flame.jpg" alt="Bakü" style="width:100%; border-radius:12px; margin-bottom:14px; max-height:240px; object-fit:cover;">
          <p><strong>Bölge & Konum:</strong> Abşeron Yarımadası, Hazar Denizi'nin batı kıyısı (Koordinat: 40°24′N 49°52′E)</p>
          <p><strong>Rakım:</strong> Deniz seviyesinin 28 metre altı (Dünyanın en alçak rakımlı başkenti)</p>
          <p><strong>Nüfus:</strong> Yaklaşık 2.4 Milyon</p>
        </div>
        <hr style="border:0; border-top:1px solid var(--border-color); margin:14px 0;">
        <h4 style="color:var(--flag-blue); margin-bottom:8px;"><i class="fa-solid fa-compass"></i> Ziyaretçiler İçin Önemli İpuçları:</h4>
        <ul style="padding-left:20px; margin-bottom:14px; list-style:disc;">
          <li><strong>En İyi Ziyaret Zamanı:</strong> İlkbahar (Nisan-Haziran) ve Sonbahar (Eylül-Kasım) ılıman iklimiyle idealdir.</li>
          <li><strong>Ulaşım:</strong> Bakü Metrosu, çağdaş "BakıKart" ile kolayca kullanılabilir; Haydar Aliyev Havalimanı'ndan merkeze Express otobüsler mevcuttur.</li>
          <li><strong>Tarihî Özet:</strong> 12. yüzyılda Şirvanşahlar'ın başkenti olmuş, 19. yüzyılda dünya petrolünün beşiği haline gelmiştir. 2000 yılında UNESCO Dünya Mirası Listesi'ne alınan İçerişehir; Kız Kalesi ve Şirvanşahlar Sarayı'nı barındırır.</li>
          <li><strong>Gastronomi:</strong> Sahil boyunca taze Hazar kütümü (balık), kutab çeşitleri ve safranlı Bakü pilavı mutlaka denenmelidir.</li>
        </ul>
      `
    },
    sheki: {
      title: "Şeki (Şəki) — İpek Yolu ve Zanaat Başkenti",
      content: `
        <div style="margin-bottom:16px;">
          <img src="images/sheki.jpg" alt="Şeki" style="width:100%; border-radius:12px; margin-bottom:14px; max-height:240px; object-fit:cover;">
          <p><strong>Bölge:</strong> Şeki-Zagatala Ekonomik Bölgesi, Büyük Kafkas Dağları etekleri</p>
          <p><strong>UNESCO Statüsü:</strong> Şeki Tarihî Merkezi ve Şeki Hanları Sarayı (2019 Dünya Mirası)</p>
          <p><strong>Ünü:</strong> İpekçilik, Şebeke Vitray Sanatı, Şeki Helvası ve Piti Yemeği</p>
        </div>
        <hr style="border:0; border-top:1px solid var(--border-color); margin:14px 0;">
        <h4 style="color:var(--flag-blue); margin-bottom:8px;"><i class="fa-solid fa-wand-magic-sparkles"></i> Eşsiz Mimari: Şebeke Sanatı:</h4>
        <p style="margin-bottom:12px;">
          18. yüzyılda inşa edilen <strong>Şeki Hanları Sarayı</strong>'nın pencereleri, hiçbir çivi ve tutkal kullanılmadan, ahşap çıtaların birbirine geçirilmesiyle oluşturulan 5.000'den fazla renkli Venedik camı parçasından yapılmıştır.
        </p>
        <h4 style="color:var(--flag-blue); margin-bottom:8px;"><i class="fa-solid fa-utensils"></i> Lezzet İpucu:</h4>
        <p>Geleneksel kilden güveçlerde 8 saat kısık ateşte pişirilen meşhur nohutlu ve kuzu etli <strong>"Piti"</strong> yemeğini yemeden Şeki'den ayrılmayın.</p>
      `
    },
    ganja: {
      title: "Gence (Gəncə) — Şiirin ve Asırlık Çınarların Kenti",
      content: `
        <div style="margin-bottom:16px;">
          <img src="images/ganja.jpg" alt="Gence" style="width:100%; border-radius:12px; margin-bottom:14px; max-height:240px; object-fit:cover;">
          <p><strong>Bölge:</strong> Batı Azerbaycan, Gence-Kazah Düzlüğü</p>
          <p><strong>Tarih:</strong> 4000 yıldan fazla köklü geçmiş</p>
          <p><strong>Sembol:</strong> Nizami Gencevi Türbesi ve Şah Abbas Camii</p>
        </div>
        <hr style="border:0; border-top:1px solid var(--border-color); margin:14px 0;">
        <h4 style="color:var(--flag-blue); margin-bottom:8px;"><i class="fa-solid fa-book-bookmark"></i> Kültür Rotası:</h4>
        <ul style="padding-left:20px; margin-bottom:14px; list-style:disc;">
          <li><strong>Nizami Gencevi Anıt Mezarı:</strong> 12. yüzyıl şairinin hatırasına adanmış görkemli müze ve anıt kompleksi.</li>
          <li><strong>Şişeli Ev:</strong> İbrahim Caferov tarafından İkinci Dünya Savaşı'nda kaybolan kardeşinin anısına yaklaşık 50.000 cam şişeyle inşa edilen sıra dışı mozaik ev.</li>
          <li><strong>Göygöl Doğa Gezisi:</strong> Gence'ye 45 km mesafede, 1139 yılındaki büyük depremde Kapaz Dağı'nın çökmesiyle oluşan zümrüt renkli tabiat gölü.</li>
        </ul>
      `
    },
    shusha: {
      title: "Şuşa (Şuşa) — Azerbaycan Kültürünün Kalbi & Karabağ'ın İncisi",
      content: `
        <div style="margin-bottom:16px;">
          <img src="images/shusha.jpg" alt="Şuşa" style="width:100%; border-radius:12px; margin-bottom:14px; max-height:240px; object-fit:cover;">
          <p><strong>Bölge:</strong> Karabağ Sıradağları, 1400 metre rakım</p>
          <p><strong>Unvan:</strong> Azerbaycan'ın Kültür Başkenti (2021) ve Türk Dünyası Kültür Başkenti (2023)</p>
          <p><strong>Doğal Sembol:</strong> Yalnızca Şuşa dağlarında yetişen efsanevi <em>Hâr-ı Bülbül</em> çiçeği</p>
        </div>
        <hr style="border:0; border-top:1px solid var(--border-color); margin:14px 0;">
        <h4 style="color:var(--flag-blue); margin-bottom:8px;"><i class="fa-solid fa-music"></i> Kafkasya'nın Konservatuvarı:</h4>
        <p style="margin-bottom:12px;">
          Şuşa; büyük besteci Üzeyir Hacıbeyli, tenor Bülbül, şair Molla Penah Vâkıf ve Han kızı Hurşidbanu Natavan'ın vatanıdır. Her yıl Cıdır Düzü'nde düzenlenen <strong>Hâr-ı Bülbül Müzik Festivali</strong> ve Vâkıf Şiir Günleri dünya sanatçılarını ağırlar.
        </p>
        <p><strong>Şuşa Kalesi:</strong> 1750'lerde Karabağ Hanı Penah Ali Han tarafından sarp kayalar üzerine kurulan geçilmez tarihî kale surlarıdır.</p>
      `
    },
    gobustan: {
      title: "Gobustan (Qobustan) — 40.000 Yıllık İnsanlık Mirası",
      content: `
        <div style="margin-bottom:16px;">
          <img src="images/gobustan.jpg" alt="Gobustan" style="width:100%; border-radius:12px; margin-bottom:14px; max-height:240px; object-fit:cover;">
          <p><strong>Konum:</strong> Bakü'nün güneybatısında, Hazar kıyısına yakın yarı çöl plato</p>
          <p><strong>UNESCO Statüsü:</strong> Gobustan Kaya Sanatı Kültürel Peyzajı (2007 Dünya Mirası)</p>
          <p><strong>Önem:</strong> 6.000'den fazla kaya oyması (petroglif), müzikal kireçtaşı ve çamur volkanları</p>
        </div>
        <hr style="border:0; border-top:1px solid var(--border-color); margin:14px 0;">
        <h4 style="color:var(--flag-blue); margin-bottom:8px;"><i class="fa-solid fa-volcano"></i> Jeolojik ve Arkeolojik Harikalar:</h4>
        <ul style="padding-left:20px; margin-bottom:14px; list-style:disc;">
          <li><strong>Petroglifler:</strong> Üst Paleolitik Çağ'dan Orta Çağ'a kadar av sahneleri, dans figürleri (Yallı), Güneş ve hamile kadın tasvirleri.</li>
          <li><strong>Gaval Daş:</strong> Küçük bir çakılla vurulduğunda tef veya tambur gibi yankılanan, tarih öncesi ritüel çalgısı.</li>
          <li><strong>Çamur Volkanları:</strong> Dünyadaki binden fazla çamur volkanının yarısına yakını bu bölgededir. Yer altından soğuk mineralli çamur ve gaz fışkırtırlar.</li>
        </ul>
      `
    }
  };

  function openCityModal(cityKey) {
    const data = cityDetailsData[cityKey];
    if (data) {
      modalCityTitle.textContent = data.title;
      modalCityContent.innerHTML = data.content;
      cityModal.classList.add('active');
      cityModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCityModal() {
    if (cityModal) {
      cityModal.classList.remove('active');
      cityModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openCityButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cityKey = e.currentTarget.getAttribute('data-city');
      openCityModal(cityKey);
    });
  });

  if (closeCityModalBtn) closeCityModalBtn.addEventListener('click', closeCityModal);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeCityModal);
  if (cityModal) {
    cityModal.addEventListener('click', (e) => {
      if (e.target === cityModal) closeCityModal();
    });
  }


  // ============================================================================
  // ÖZELLİK 4: AZERBAYCAN 5 SORULUK MİNİ BİLGİ YARIŞMASI (INTERACTIVE QUIZ)
  // ============================================================================
  
  // 5 Soru Veri Seti
  const quizData = [
    {
      category: "Doğa & Coğrafya",
      question: "Azerbaycan'a \"Ateşler Ülkesi\" (Odlar Yurdu) unvanını kazandıran ve yer altından çıkan doğal metan gazının yüzyıllardır sönmeden yandığı ünlü tabiat harikası neresidir?",
      options: [
        "Şahdağ Zirvesi",
        "Yanar Dağ",
        "Cıdır Düzü",
        "Göygöl Kıyısı"
      ],
      correctIndex: 1, // Yanar Dağ
      explanation: "Yanar Dağ, Abşeron Yarımadası'nda yer altından sızan doğal gaz alevlerinin yağmurda ve karda hiç sönmeden yüzyıllardır yandığı eşsiz bir doğa anıtıdır."
    },
    {
      category: "Sanat & Müzik",
      question: "1908 yılında sahnelenen ve tüm Müslüman Doğu dünyasının İLK operası olan \"Leyli ve Mecnun\"u besteleyen, aynı zamanda Azerbaycan Millî Marşı'nın da bestecisi olan dahi sanatçı kimdir?",
      options: [
        "Nizami Gencevi",
        "Molla Penah Vâkıf",
        "Üzeyir Hacıbeyli",
        "Fikret Amirov"
      ],
      correctIndex: 2, // Üzeyir Hacıbeyli
      explanation: "Üzeyir Hacıbeyli, 1908'de 'Leyli ve Mecnun' ile Doğu'nun ilk operasını bestelemiş; geleneksel mugam ile klasik Batı müziğini harmanlayan büyük bir ekol kurmuştur."
    },
    {
      category: "Tarih & Arkeoloji",
      question: "40.000 yıllık insanlık tarihini kaya oymalarıyla (petroglifler) belgeleyen ve aynı zamanda dünyanın en zengin çamur volkanı alanına sahip UNESCO Dünya Mirası alanı hangisidir?",
      options: [
        "Şirvan Millî Parkı",
        "Gobustan Millî Parkı",
        "Kafkas Biyosfer Rezervi",
        "Hirkan Millî Parkı"
      ],
      correctIndex: 1, // Gobustan Millî Parkı
      explanation: "Gobustan Millî Parkı, 6.000'den fazla kaya resmi ve dünyadaki aktif çamur volkanlarının neredeyse yarısına ev sahipliği yapan olağanüstü bir açık hava müzesidir."
    },
    {
      category: "Siyasi Tarih & Demokrasi",
      question: "28 Mayıs 1918'de kurulan ve tüm Müslüman Doğu ile Türk dünyasında kadınlara seçme ve seçilme hakkı tanıyan İLK demokratik ve laik cumhuriyet hangisidir?",
      options: [
        "Azerbaycan Demokratik Cumhuriyeti",
        "Buhara Halk Cumhuriyeti",
        "Hive Cumhuriyeti",
        "Kırım Halk Cumhuriyeti"
      ],
      correctIndex: 0, // Azerbaycan Demokratik Cumhuriyeti
      explanation: "Mehmet Emin Resulzade önderliğinde kurulan Azerbaycan Demokratik Cumhuriyeti, Doğu'nun ilk demokratik cumhuriyetidir ve birçok Batı ülkesinden önce kadınlara oy hakkı tanımıştır."
    },
    {
      category: "Kültür & Mimari",
      question: "Şeki şehrinde bulunan, harç, çivi veya tutkal kullanılmadan 5.000 parçalık renkli cam ve ahşap geçme tekniğiyle (Şebeke) yapılan 18. yüzyıl şaheseri saray hangisidir?",
      options: [
        "Şirvanşahlar Sarayı",
        "Panah Ali Han Kalesi",
        "Şeki Hanları Sarayı",
        "Serdar Sarayı"
      ],
      correctIndex: 2, // Şeki Hanları Sarayı
      explanation: "1797 yılında tamamlanan Şeki Hanları Sarayı, büyüleyici Şebeke vitrayları ve tavan freskleriyle 2019 yılında UNESCO Dünya Mirası Listesi'ne girmiştir."
    }
  ];

  // Quiz DOM Elemanları
  let currentQuestionIndex = 0;
  let score = 0;
  let hasAnswered = false;

  const currentQuestionNumEl = document.getElementById('currentQuestionNum');
  const questionCategoryEl = document.getElementById('questionCategory');
  const liveScoreEl = document.getElementById('liveScore');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsGrid = document.getElementById('quizOptionsGrid');
  const quizExplanationBox = document.getElementById('quizExplanationBox');
  const explanationText = document.getElementById('explanationText');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  const quizCard = document.getElementById('quizCard');
  const quizResultCard = document.getElementById('quizResultCard');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  // Sonuç Elemanları
  const finalScoreText = document.getElementById('finalScoreText');
  const resultTitle = document.getElementById('resultTitle');
  const resultFeedbackMsg = document.getElementById('resultFeedbackMsg');
  const resultCorrectCount = document.getElementById('resultCorrectCount');
  const resultWrongCount = document.getElementById('resultWrongCount');
  const resultPercentage = document.getElementById('resultPercentage');
  const resultBadgeIcon = document.getElementById('resultBadgeIcon');

  // Soruyu Yükleme Fonksiyonu
  function loadQuestion(index) {
    hasAnswered = false;
    const q = quizData[index];

    // Üst Panel Bilgileri
    currentQuestionNumEl.textContent = (index + 1);
    questionCategoryEl.textContent = q.category;
    liveScoreEl.textContent = score;

    // İlerleme Çubuğu Güncellemesi
    const progressPercent = ((index + 1) / quizData.length) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;

    // Soru Metni
    quizQuestionText.textContent = `${index + 1}. ${q.question}`;

    // Seçenek Butonlarını Oluştur
    quizOptionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.setAttribute('type', 'button');
      btn.innerHTML = `
        <span><strong>${letters[optIdx]})</strong> ${optText}</span>
        <span class="option-status-icon"><i class="fa-regular fa-circle"></i></span>
      `;

      btn.addEventListener('click', () => handleOptionSelect(optIdx, btn));
      quizOptionsGrid.appendChild(btn);
    });

    // Açıklama ve İleri butonunu gizle
    quizExplanationBox.style.display = 'none';
    nextQuestionBtn.style.display = 'none';
  }

  // Seçenek Tıklanması Durumu
  function handleOptionSelect(selectedIndex, selectedBtn) {
    if (hasAnswered) return;
    hasAnswered = true;

    const q = quizData[currentQuestionIndex];
    const optionButtons = quizOptionsGrid.querySelectorAll('.quiz-option-btn');

    // Tüm butonları devre dışı bırak
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correctIndex) {
      // DOĞRU CEVAP
      score++;
      liveScoreEl.textContent = score;
      selectedBtn.classList.add('correct');
      selectedBtn.querySelector('.option-status-icon').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      explanationText.innerHTML = `<strong>Tebrikler, Doğru!</strong> ${q.explanation}`;
    } else {
      // YANLIŞ CEVAP
      selectedBtn.classList.add('incorrect');
      selectedBtn.querySelector('.option-status-icon').innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      
      // Doğru olan seçeneği de yeşil göster
      const correctBtn = optionButtons[q.correctIndex];
      if (correctBtn) {
        correctBtn.classList.add('correct');
        correctBtn.querySelector('.option-status-icon').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      }

      explanationText.innerHTML = `<strong>Yanlış Cevap.</strong> ${q.explanation}`;
    }

    // Açıklamayı Göster
    quizExplanationBox.style.display = 'flex';

    // Sonraki Soru veya Sonucu Gör Butonu
    if (currentQuestionIndex < quizData.length - 1) {
      nextQuestionBtn.innerHTML = 'Sonraki Soru <i class="fa-solid fa-arrow-right"></i>';
    } else {
      nextQuestionBtn.innerHTML = 'Sonuçları Gör <i class="fa-solid fa-award"></i>';
    }
    nextQuestionBtn.style.display = 'inline-flex';
  }

  // Sonraki Soru Butonu Dinleyicisi
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener('click', () => {
      if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
      } else {
        showQuizResults();
      }
    });
  }

  // Quiz Sonuç Ekranını Gösterme
  function showQuizResults() {
    quizCard.style.display = 'none';
    quizResultCard.style.display = 'block';

    const totalQuestions = quizData.length;
    const wrongCount = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);

    finalScoreText.textContent = `${score} / ${totalQuestions}`;
    resultCorrectCount.textContent = score;
    resultWrongCount.textContent = wrongCount;
    resultPercentage.textContent = `${percentage}%`;

    // Skora göre dinamik unvan ve mesaj
    if (score === 5) {
      resultTitle.textContent = "Kusursuz! Tam Bir Azerbaycan Uzmanısınız! 🇦🇿";
      resultFeedbackMsg.textContent = "Tüm soruları eksiksiz doğru cevapladınız! Azerbaycan'ın tarihine, kültürüne ve tabiatına mükemmel şekilde hakimsiniz.";
      resultBadgeIcon.innerHTML = '<i class="fa-solid fa-crown"></i>';
    } else if (score >= 3) {
      resultTitle.textContent = "Tebrikler! Çok Başarılı Bir Skor! 👏";
      resultFeedbackMsg.textContent = "Azerbaycan hakkında zengin bir genel kültüre sahipsiniz. Birkaç küçük tekrarla 5'te 5 yapabilirsiniz!";
      resultBadgeIcon.innerHTML = '<i class="fa-solid fa-medal"></i>';
    } else {
      resultTitle.textContent = "Güzel Deneme! Keşfetmeye Devam Edin 📚";
      resultFeedbackMsg.textContent = "Azerbaycan'ın büyüleyici tarihini ve zengin kültürünü web sitemizdeki bölümleri inceleyerek daha yakından tanıyabilirsiniz.";
      resultBadgeIcon.innerHTML = '<i class="fa-solid fa-book-open-reader"></i>';
    }
  }

  // Quiz'i Yeniden Başlatma
  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      score = 0;
      currentQuestionIndex = 0;
      quizResultCard.style.display = 'none';
      quizCard.style.display = 'block';
      loadQuestion(0);
    });
  }

  // Sayfa açıldığında 1. soruyu yükle
  if (quizCard) {
    loadQuestion(0);
  }


  // ============================================================================
  // EK ÖZELLİK: YUKARI ÇIK BUTONU (SCROLL TO TOP) & HEADER SCROLL EFEKTİ
  // ============================================================================
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header küçülme ve gölge efekti
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Yukarı Çık Butonu Görünürlüğü
    if (backToTopBtn) {
      if (scrollPos > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // SCROLLSPY (Aktif Menü Bağlantısını Otomatik Vurgulama)
    let currentActiveId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Yukarı Çık Butonuna Tıklanması
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

