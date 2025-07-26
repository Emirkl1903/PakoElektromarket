// Pako Elektromarket - JavaScript Uygulaması

class ECommerceApp {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.cart = JSON.parse(localStorage.getItem('pakoCart')) || [];
        this.currentFilter = 'all';
        this.currentSort = 'default';
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.renderProducts();
        this.hideLoading();
    }

    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            this.products = await response.json();
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Ürünler yüklenirken hata oluştu:', error);
            this.showNotification('Ürünler yüklenirken bir hata oluştu', 'error');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        searchInput.addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });
        
        searchBtn.addEventListener('click', () => {
            this.searchProducts(searchInput.value);
        });

        // Category filters
        document.querySelectorAll('[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
                this.updateActiveNavLink(e.target);
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterByCategory(e.target.dataset.filter);
                this.updateActiveFilterBtn(e.target);
            });
        });

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortProducts(e.target.value);
        });

        // Cart functionality
        const cartLink = document.querySelector('.cart-link');
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCartModal();
        });

        // Modal close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSignup(e);
        });

        // Hero CTA button
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('click', () => {
            document.querySelector('.products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        // Cart modal functionality
        document.getElementById('clear-cart').addEventListener('click', () => {
            this.clearCart();
        });

        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.proceedToCheckout();
        });
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredProducts = this.currentFilter === 'all' 
                ? [...this.products] 
                : this.products.filter(p => p.category === this.currentFilter);
        } else {
            const baseProducts = this.currentFilter === 'all' 
                ? this.products 
                : this.products.filter(p => p.category === this.currentFilter);
            
            this.filteredProducts = baseProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderProducts();
    }

    filterByCategory(category) {
        this.currentFilter = category;
        
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.category === category
            );
        }
        
        // Apply current search if any
        const searchInput = document.getElementById('search-input');
        if (searchInput.value.trim()) {
            this.searchProducts(searchInput.value);
        } else {
            this.renderProducts();
        }
    }

    sortProducts(sortType) {
        this.currentSort = sortType;
        
        switch (sortType) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
                break;
            default:
                this.filteredProducts.sort((a, b) => a.id - b.id);
        }
        
        this.renderProducts();
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        
        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Ürün bulunamadı</h3>
                    <p>Arama kriterlerinize uygun ürün bulunamadı. Farklı terimler deneyin.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to new product cards
        this.attachProductCardListeners();
    }

    createProductCard(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-badge">Yeni</div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price.toFixed(2)} ₺</div>
                    <div class="product-actions">
                        <button class="btn-primary add-to-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Sepete Ekle
                        </button>
                        <button class="view-details" data-product-id="${product.id}" title="Detayları Gör">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachProductCardListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            });
        });

        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.showProductModal(productId);
            });
        });

        // Product card click (excluding buttons)
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const productId = parseInt(card.dataset.productId);
                    this.showProductModal(productId);
                }
            });
        });
    }

    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.updateCartCount();
        this.saveCartToStorage();
        this.showNotification(`${product.name} sepete eklendi!`, 'success');
        this.animateCartIcon();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartCount();
        this.saveCartToStorage();
        this.updateCartModal();
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }

    saveCartToStorage() {
        localStorage.setItem('pakoCart', JSON.stringify(this.cart));
    }

    showCartModal() {
        this.updateCartModal();
        this.showModal('cart-modal');
    }

    updateCartModal() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Sepetiniz boş</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} ₺</div>
                </div>
                <div class="cart-item-quantity">Adet: ${item.quantity}</div>
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);

        // Add remove item listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.removeFromCart(productId);
            });
        });
    }

    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-product-price').textContent = product.price.toFixed(2);
        document.getElementById('modal-product-category').textContent = product.category;
        
        const addToCartBtn = document.querySelector('.add-to-cart-modal');
        addToCartBtn.onclick = () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            this.addToCart(productId, quantity);
            this.closeModal(document.getElementById('product-modal'));
        };

        this.showModal('product-modal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    clearCart() {
        this.cart = [];
        this.updateCartCount();
        this.saveCartToStorage();
        this.updateCartModal();
        this.showNotification('Sepet temizlendi', 'info');
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Sepetiniz boş!', 'warning');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const message = `Toplam: ${total.toFixed(2)} ₺\n\nÖdeme sayfasına yönlendiriliyorsunuz...`;
        
        if (confirm(message)) {
            this.showNotification('Ödeme sayfasına yönlendiriliyorsunuz...', 'info');
            // Burada gerçek ödeme sayfasına yönlendirme yapılabilir
            setTimeout(() => {
                this.showNotification('Demo modunda çalışıyorsunuz', 'info');
            }, 2000);
        }
    }

    handleNewsletterSignup(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            this.showNotification('Bülten aboneliğiniz başarıyla oluşturuldu!', 'success');
            e.target.reset();
        } else {
            this.showNotification('Geçerli bir e-posta adresi girin', 'error');
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveFilterBtn(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Add show class for animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-link i');
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 600);
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        loading.style.display = 'none';
    }
}

// CSS for notifications (will be added dynamically)
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid #2a5298;
        max-width: 350px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    }

    .notification-success {
        border-left-color: #28a745;
    }

    .notification-error {
        border-left-color: #dc3545;
    }

    .notification-warning {
        border-left-color: #ffc107;
    }

    .notification-info {
        border-left-color: #17a2b8;
    }

    .notification i {
        font-size: 18px;
    }

    .notification-success i {
        color: #28a745;
    }

    .notification-error i {
        color: #dc3545;
    }

    .notification-warning i {
        color: #ffc107;
    }

    .notification-info i {
        color: #17a2b8;
    }

    .bounce {
        animation: bounce 0.6s ease;
    }

    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }

    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }

    .no-products i {
        font-size: 4em;
        margin-bottom: 20px;
        color: #ccc;
    }

    .no-products h3 {
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100px);
        }

        .notification.show {
            transform: translateY(0);
        }
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ECommerceApp();
});

// Handle back/forward navigation
window.addEventListener('popstate', (e) => {
    // Handle browser navigation if needed
    console.log('Navigation event:', e);
});

// Service Worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}