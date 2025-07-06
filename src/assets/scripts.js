// Carousel functionality
class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelector('.carousel-slides');
        this.dots = container.querySelectorAll('.carousel-dot');
        this.prevBtn = container.querySelector('.carousel-arrow.prev');
        this.nextBtn = container.querySelector('.carousel-arrow.next');
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.updateSlide();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateSlide() {
        const translateX = -this.currentSlide * 20;
        this.slides.style.transform = `translateX(${translateX}%)`;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Gallery modal functionality
class GalleryModal {
    constructor(images) {
        this.modal = null;
        this.images = images;
        this.currentIndex = 0;
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <button class="modal-nav prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="modal-nav next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <img src="" alt="Gallery Image">
                <div class="modal-counter">
                    <span class="current">1</span> / <span class="total">${this.images.length}</span>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }
    
    bindEvents() {
        const closeBtn = this.modal.querySelector('.modal-close');
        const prevBtn = this.modal.querySelector('.modal-nav.prev');
        const nextBtn = this.modal.querySelector('.modal-nav.next');
        
        closeBtn.addEventListener('click', () => this.close());
        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('show')) {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowLeft') {
                    this.prev();
                } else if (e.key === 'ArrowRight') {
                    this.next();
                }
            }
        });
    }
    
    open(imageIndex) {
        this.currentIndex = imageIndex;
        this.updateImage();
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    updateImage() {
        const img = this.modal.querySelector('img');
        const counter = this.modal.querySelector('.modal-counter .current');
        
        img.src = this.images[this.currentIndex].src;
        img.alt = this.images[this.currentIndex].alt;
        counter.textContent = this.currentIndex + 1;
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }
    
    close() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel if present
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
    
    // Initialize gallery modal if present
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Create array of images for modal navigation
        const images = Array.from(galleryItems).map(item => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                alt: img.alt
            };
        });
        
        const modal = new GalleryModal(images);
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                modal.open(index);
            });
        });
    }
});
