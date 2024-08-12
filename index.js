// 輪播圖
let currentIndex = 0;
let slides = document.querySelectorAll('.carousel-item');
let totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function autoSlide() {
    nextSlide();
    setTimeout(autoSlide, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
    setTimeout(autoSlide, 2000);
    
    // 手動滑動功能
    let startX;
    let endX;
    const carouselInner = document.querySelector('.carousel-inner');

    carouselInner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselInner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            nextSlide();
        } else if (startX < endX - 50) {
            prevSlide();
        }
    });
});