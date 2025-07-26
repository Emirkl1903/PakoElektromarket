# 🔌 Pako Elektromarket - E-Ticaret Sitesi

Modern ve responsive bir elektriksel malzeme e-ticaret sitesi. 

## 🚀 Özellikler

### 🛍️ E-Ticaret Özellikleri
- **Ürün Katalogu**: Elektriksel malzemeler, LED aydınlatma, akıllı ev sistemleri
- **Akıllı Arama**: Gerçek zamanlı ürün arama ve filtreleme
- **Kategori Filtreleme**: Ürünleri kategorilere göre filtreleme
- **Sepet Yönetimi**: Ürün ekleme, çıkarma ve miktar güncelleme
- **Ürün Detayları**: Modal ile detaylı ürün bilgileri
- **Sıralama**: Fiyat ve isim bazında sıralama

### 🎨 Tasarım & UX
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern UI**: Gradient renkler ve smooth animasyonlar
- **Progressive Web App**: Mobil uyumlu deneyim
- **Accessibility**: Erişilebilirlik standartlarına uygun
- **Dark Mode Desteği**: Sistem tercihine uygun tema

### 💻 Teknik Özellikler
- **Vanilla JavaScript**: Modern ES6+ syntax
- **LocalStorage**: Sepet verilerinin kalıcı saklanması
- **Responsive Grid**: CSS Grid ve Flexbox
- **Font Awesome**: Modern ikonlar
- **Google Fonts**: Poppins font ailesi

## 🛠️ Kurulum

```bash
# Projeyi klonlayın
git clone <repository-url>
cd pako-elektromarket

# Bağımlılıkları yükleyin
npm install

# Sunucuyu başlatın
npm start
```

Site şu adreste çalışacak: **http://localhost:3000**

## 📁 Proje Yapısı

```
pako-elektromarket/
├── public/
│   ├── css/
│   │   ├── style.css          # Ana CSS dosyası
│   │   └── responsive.css     # Responsive tasarım
│   ├── js/
│   │   └── app.js            # Ana JavaScript uygulaması
│   └── index.html            # Ana HTML dosyası
├── server.js                 # Express.js sunucu
├── package.json             # Node.js bağımlılıkları
└── README.md               # Proje dokümantasyonu
```

## 🔧 API Endpoints

- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/:id` - Belirli ürün detayını getir
- `GET /api/categories` - Ürün kategorilerini listele

## 🎯 Kullanım

### Ürün Arama
- Üst kısımdaki arama çubuğunu kullanarak ürün arayabilirsiniz
- Ürün adı, açıklama ve kategori bazında arama yapar

### Kategori Filtreleme
- Menüden veya filtre butonlarından kategori seçebilirsiniz
- Aydınlatma, Akıllı Ev, Kablolar, Panel & Sigortalar

### Sepet İşlemleri
- Ürün kartındaki "Sepete Ekle" butonunu kullanın
- Sağ üstteki sepet simgesinden sepeti görüntüleyin
- Sepet modalında ürün miktarlarını güncelleyebilirsiniz

### Ürün Detayları
- Ürün kartına tıklayarak veya göz simgesine tıklayarak detayları görün
- Modal içerisinde ürün açıklaması ve özelliklerini inceleyin

## 🎨 Tema ve Renkler

### Ana Renkler
- **Birincil**: #2a5298 (Mavi)
- **İkincil**: #ffd700 (Altın sarısı)
- **Başarı**: #28a745 (Yeşil)
- **Hata**: #dc3545 (Kırmızı)
- **Uyarı**: #ffc107 (Turuncu)

### Gradient Renkler
- **Header**: #1e3c72 → #2a5298
- **Hero**: #667eea → #764ba2
- **Newsletter**: #1e3c72 → #2a5298

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: 360px - 480px

## 🚀 Performans Optimizasyonları

- **Lazy Loading**: Ürün resimlerinde lazy loading
- **CSS Grid**: Efficient layout sistemi
- **Minified Assets**: Optimized CSS ve JavaScript
- **Local Storage**: Client-side veri saklama
- **Debounced Search**: Arama performansı optimizasyonu

## 🔒 Güvenlik

- **Input Validation**: Kullanıcı girdi doğrulama
- **XSS Protection**: Cross-site scripting koruması
- **CORS**: Cross-origin resource sharing
- **Sanitized HTML**: Güvenli HTML render

## 🌟 Gelecek Özellikler

- [ ] Kullanıcı hesabı sistemi
- [ ] Ödeme entegrasyonu
- [ ] Ürün değerlendirme sistemi
- [ ] Favoriler listesi
- [ ] Canlı chat desteği
- [ ] Multi-language desteği
- [ ] PWA özellikleri

## 📞 İletişim

**Pako Elektromarket**
- 📧 info@pakoelektromarket.com
- 📞 0212 555 0123
- 📍 İstanbul, Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**© 2024 Pako Elektromarket. Tüm hakları saklıdır.**