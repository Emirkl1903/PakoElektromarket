const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Örnek ürün verileri
const products = [
    {
        id: 1,
        name: "LED Ampul 10W",
        price: 45.90,
        category: "Aydınlatma",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=LED+Ampul",
        description: "Enerji tasarruflu LED ampul, uzun ömürlü ve parlak aydınlatma"
    },
    {
        id: 2,
        name: "Akıllı Priz",
        price: 189.90,
        category: "Akıllı Ev",
        image: "https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Akıllı+Priz",
        description: "WiFi destekli akıllı priz, mobil uygulama ile kontrol"
    },
    {
        id: 3,
        name: "Kablo Seti 5m",
        price: 29.90,
        category: "Kablolar",
        image: "https://via.placeholder.com/300x300/FF6347/FFFFFF?text=Kablo+Seti",
        description: "Yüksek kaliteli elektrik kablosu, güvenli ve dayanıklı"
    },
    {
        id: 4,
        name: "Elektrik Panosu",
        price: 450.00,
        category: "Panel ve Sigortalar",
        image: "https://via.placeholder.com/300x300/32CD32/000000?text=Elektrik+Panosu",
        description: "Profesyonel elektrik panosu, güvenlik sertifikalı"
    },
    {
        id: 5,
        name: "LED Şerit 5m",
        price: 95.90,
        category: "Aydınlatma",
        image: "https://via.placeholder.com/300x300/FF1493/FFFFFF?text=LED+Şerit",
        description: "RGB LED şerit, uzaktan kumandalı, çoklu renk seçeneği"
    },
    {
        id: 6,
        name: "Otomatik Sigorta",
        price: 125.00,
        category: "Panel ve Sigortalar",
        image: "https://via.placeholder.com/300x300/8A2BE2/FFFFFF?text=Otomatik+Sigorta",
        description: "16A otomatik sigorta, hızlı koruma sistemi"
    }
];

// API Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json(product);
});

app.get('/api/categories', (req, res) => {
    const categories = [...new Set(products.map(p => p.category))];
    res.json(categories);
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Pako Elektromarket sunucusu ${PORT} portunda çalışıyor`);
    console.log(`Site: http://localhost:${PORT}`);
});