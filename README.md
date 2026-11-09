# AZERBAIJAN – Ateşler Ülkesi (Odlar Yurdu) 🇦🇿

Modern, profesyonel, tamamen duyarlı (responsive) ve etkileşimli özelliklere sahip kapsamlı Azerbaycan tanıtım web sitesi.

---

## 📌 Projenin Amacı
Bu projenin temel amacı; Azerbaycan'ın binlerce yıllık köklü tarihini, coğrafi zenginliklerini, UNESCO tescilli kültürel mirasını, zengin mutfağını, edebiyat ve sanat üstatlarını, tarihi şehirlerini ve büyüleyici doğasını en modern web standartlarında dünyaya tanıtmaktır.

---

## 🚀 Canlı Yayın Bağlantısı (GitHub Pages)
Projenin GitHub Pages üzerinden yayımlanmış canlı versiyonuna aşağıdaki bağlantıdan erişebilirsiniz:

🔗 **GitHub Pages Canlı Önizleme:**  
`https://<kullanici-adiniz>.github.io/<depo-adiniz>/`  
*(Kendi GitHub hesabınıza yükledikten sonra bu bağlantı otomatik olarak aktifleşecektir; detaylar aşağıdaki kurulum adımlarında açıklanmıştır.)*

---

## 🛠️ Kullanılan Teknolojiler
Proje, hiçbir harici frontend framework (React, Vue, Angular vb.) kullanılmadan, tamamen standartlara uygun saf (Vanilla) web teknolojileriyle geliştirilmiştir:

- **HTML5:** Semantik etiket yapısı (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`, vb.), SEO ve erişilebilirlik (ARIA standartları) optimizasyonu.
- **CSS3:** Modern CSS değişkenleri (`CSS Custom Properties`), Flexbox & CSS Grid sistemleri, `@keyframes` animasyonları, cam efektleri (`backdrop-filter: blur`), yumuşak geçişler ve kapsamlı Media Query'ler ile %100 mobil ve masaüstü uyumu.
- **Vanilla JavaScript (ES6+):** Saf JavaScript ile dinamik DOM manipülasyonu, olay dinleyicileri (Event Listeners), `localStorage` tema yönetimi, canlı arama ve filtreleme algoritmaları ve etkileşimli sınav mantığı.
- **Tipografi & İkonlar:** Google Fonts (`Outfit` ve `Playfair Display`), Font Awesome 6.5.1 vektör ikon kütüphanesi.
- **Görseller:** Yüksek çözünürlüklü, telif haklarına uygun ve yerel olarak optimize edilmiş görsel koleksiyonu.

---

## 📁 Proje Dosya Yapısı

```text
c:\xampp\htdocs\Odev\
│
├── index.html              # Semantik HTML5 ana sayfa ve tüm bölümler
├── style.css               # Tüm tasarım, renk paletleri, temalar ve medya sorguları
├── script.js               # Etkileşimli JavaScript özellikleri ve işlevleri
├── README.md               # Proje belgelendirmesi ve açıklama raporu
│
└── images/                 # Yerel yüksek çözünürlüklü optimize görseller
    ├── flag.svg            # Azerbaycan resmî devlet bayrağı (vektörel SVG)
    ├── hero_baku.jpg       # Ana karşılama ekranı panoramik görseli
    ├── baku_flame.jpg      # Bakü Alev Kuleleri ve sahil manzarası
    ├── baku.jpg            # Tarihî Bakü mimarisi
    ├── sheki.jpg           # Şeki Hanları Sarayı ve Şebeke vitrayları
    ├── ganja.jpg           # Gence Nizami Türbesi ve tarihî dokusu
    ├── shusha.jpg          # Şuşa Cıdır Düzü ve Karabağ yaylası
    ├── gobustan.jpg        # Gobustan kaya resimleri (petroglifler)
    ├── history_shirvanshah.jpg  # Şirvanşahlar Sarayı
    ├── history_safavid.jpg      # Safeviler dönemi minyatürü
    ├── history_adr.jpg          # 1918 Azerbaycan Demokratik Cumhuriyeti
    ├── history_modern.jpg       # Haydar Aliyev Merkezi ve modern Bakü
    ├── culture_novruz.jpg       # Nevruz Bayramı ve bayram honçası
    ├── culture_carpet.jpg       # UNESCO tescilli Azerbaycan halı sanatı
    ├── culture_costume.jpg      # Geleneksel millî kıyafetler ve kelağayı
    ├── culture_music.jpg        # Mugam müziği (Tar, Kemança) ve Yallı dansı
    ├── cuisine_plov.jpg         # Şah Plov (Kral pilavı)
    ├── cuisine_dolma.jpg        # Yarpaq Dolması
    ├── cuisine_dushbere.jpg     # Geleneksel Düşbərə çorbası
    ├── cuisine_baklava.jpg      # Bakü baklavası ve şekerbura
    ├── lit_nizami.jpg           # Nizami Gencevi
    ├── lit_fuzuli.jpg           # Muhammed Fuzuli
    ├── lit_vagif.jpg            # Molla Penah Vâkıf
    ├── music_hajibeyov.jpg      # Üzeyir Hacıbeyli
    ├── nature_caspian.jpg       # Hazar Denizi günbatımı
    ├── nature_caucasus.jpg      # Kafkas Dağları ve Şahdağ
    ├── nature_mud_volcanoes.jpg # Gobustan çamur volkanları
    ├── nature_yanardag.jpg      # Yanar Dağ ebedî alevleri
    └── nature_ateshgah.jpg      # Bakü Ateşgâh Tapınağı
```

---

## ⚡ Geliştirilen JavaScript Özellikleri

1. **Mobil Cihazlar İçin Hamburger Menü:**
   - 768px altındaki ekranlarda otomatik olarak devreye girer.
   - Hamburger ikonundan `X` simgesine dönüşen akıcı CSS animasyonuna sahiptir.
   - Ekranı kaplayan yarı saydam arka plan perdesi (`backdrop blur overlay`) ile odaklanma sağlar.
   - Menü açıkken sayfa kaymasını engeller (`body scroll lock`), menü bağlantılarına veya ESC tuşuna tıklandığında otomatik kapanır.

2. **Açık / Koyu (Light & Dark) Tema Değiştirici:**
   - Sayfanın sağ üst köşesindeki buton aracılığıyla gece mavisi (Dark) ve açık buzul beyazı (Light) modları arasında anında geçiş sağlar.
   - Kullanıcının tercihini tarayıcının `localStorage` hafızasında depolar; sayfa yenilendiğinde veya tekrar açıldığında kullanıcının seçimi korunur.
   - Sistem tercihlerine (`prefers-color-scheme`) duyarlıdır.

3. **Canlı Arama ve Kategori Filtreleme Sistemi (Şehirler & Turistik Yerler):**
   - **Metin Araması:** Arama kutusuna yazılan kelimeleri eşzamanlı olarak şehir isimleri, açıklamaları, turistik yerleri ve etiketleri arasında tarar.
   - **Kategori Filtreleri:** "Tümü", "Metropol & Sahil", "UNESCO Mirasları", "Kültür & Tarih" ve "Doğa & Arkeoloji" butonlarıyla hızlı filtreleme yapar.
   - **Dinamik Sayaç:** Ekranda filtrelenen güncel şehir sayısını (`X turistik merkez gösteriliyor`) anında günceller.
   - **Sıfırlama Durumu:** Eşleşen sonuç bulunamadığında kullanıcıya bilgilendirici uyarı ve tek tıkla sıfırlama butonu sunar.
   - **İnteraktif Şehir Detay Penceresi (Modal):** Kartlardaki "Detaylı Bilgi" butonuna tıklandığında koordinatlar, ziyaret ipuçları ve tarihî detayları içeren zengin bir modal pencere açılır.

4. **Azerbaycan Hakkında 5 Soruluk Etkileşimli Mini Bilgi Yarışması (Quiz):**
   - Tarih, müzik, mimari, doğa ve bağımsızlık konularını kapsayan 5 sorudan oluşur.
   - Seçenek tıklandığında doğru cevap anında yeşil (`check` ikonu), varsa yanlış seçenek kırmızı (`cross` ikonu) ile işaretlenir.
   - Her soru için doğru cevabın gerekçesini açıklayan öğretici bilgi kutusu açılır.
   - Soru ilerleme çubuğu (`progress bar`) ve anlık puan sayacı dinamik olarak güncellenir.
   - Test bitiminde başarı yüzdesi, doğru/yanlış dökümü, skora göre özel başarı rozeti ve testi tekrar çözme butonu sunulur.

5. **Ek UX İyileştirmeleri:**
   - **ScrollSpy:** Sayfa kaydırıldıkça kullanıcının bulunduğu bölümü navbar üzerinde otomatik olarak vurgular.
   - **Yukarı Çık (Back to Top) Butonu:** 300px aşağı kaydırıldığında yumuşak bir animasyonla belirir ve sayfayı en başa kaydırır.
   - **Akıcı Kaydırma (Smooth Scroll):** Menü bağlantıları sabit header yüksekliğini hesaba katarak kusursuz bir geçiş yapar.

---

## 🤖 Kullanılan Yapay Zekâ Aracı
Bu web sitesinin tüm tasarım mimarisi, semantik kodlaması, görsel entegrasyonu ve JavaScript algoritmaları **Google Antigravity** yapay zekâ asistanı kullanılarak hazırlanmıştır.

---

## 📝 Teslim İçin Proje Açıklaması (145 Kelime)

> **AZERBAIJAN – Ateşler Ülkesi**, Kafkasya’nın köklü medeniyet beşiği Azerbaycan’ın tarihini, zengin kültürünü, mimarisini ve tabiat harikalarını tanıtmak amacıyla geliştirilmiş modern ve etkileşimli bir web projesidir. Proje; semantik HTML5, modern CSS3 ve saf Vanilla JavaScript teknolojileri kullanılarak hiçbir harici kütüphaneye bağımlı kalmadan tasarlanmıştır. Sitede Antik Çağ’dan günümüze uzanan kronolojik tarih zaman çizelgesi, canlı arama ve kategori filtreleme sistemine sahip şehir rehberi, UNESCO tescilli halı sanatı, Nevruz gelenekleri, mugam müziği ve zengin mutfak kültürü yer almaktadır. Ayrıca mobil uyumlu hamburger menü, `localStorage` destekli açık/koyu tema değiştirici, detaylı şehir modal pencereleri ve kullanıcının bilgisini ölçen 5 soruluk dinamik mini bilgi yarışması bulunmaktadır. Tüm cihazlarda kusursuz görüntülenen responsive tasarımı, akıcı animasyonları ve resmî UNESCO kaynaklarına dayanan zengin içeriğiyle proje; hem estetik hem de teknik açıdan yüksek standartlarda bir eğitim ve tanıtım platformu sunmaktadır.

---

## 🖥️ Projeyi Yerel Ortamda Çalıştırma

### Yöntem 1: XAMPP / Apache Sunucusu ile
1. Dosyalar hâlihazırda `C:\xampp\htdocs\Odev\` klasöründedir.
2. XAMPP Control Panel'i açın ve **Apache** servisini başlatın (`Start`).
3. Web tarayıcınızı açarak şu adrese gidin:  
   `http://localhost/Odev/`

### Yöntem 2: Doğrudan Tarayıcıda Açma
1. `C:\xampp\htdocs\Odev\` klasörünü açın.
2. `index.html` dosyasına çift tıklayarak varsayılan tarayıcınızda açın.

---

## 🌐 GitHub Pages Üzerinden Yayınlama Adımları

1. [GitHub](https://github.com) hesabınıza giriş yapın ve **"New repository"** butonuna basarak yeni bir depo oluşturun (Örn: `azerbaijan-atesler-ulkesi`).
2. Terminal veya komut istemcisinde proje dizinine gelin:
   ```bash
   cd C:\xampp\htdocs\Odev
   git init
   git add .
   git commit -m "İlk sürüm: Azerbaycan web sitesi tamamlandı"
   git branch -M main
   git remote add origin https://github.com/<kullanici-adiniz>/<depo-adiniz>.git
   git push -u origin main
   ```
3. GitHub deponuzun sayfasına gidin ve **Settings (Ayarlar)** sekmesine tıklayın.
4. Sol menüden **Pages** bölümünü seçin.
5. **Branch** kısmından `main` dalını ve klasör olarak `/ (root)` seçeneğini belirleyip **Save** butonuna tıklayın.
6. 1-2 dakika içinde GitHub, sitenizi şu adreste canlıya alacaktır:  
   `https://<kullanici-adiniz>.github.io/<depo-adiniz>/`
