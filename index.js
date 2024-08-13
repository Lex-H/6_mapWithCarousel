// --------------- 輪播圖 ---------------
// 當前顯示的輪播項目索引
let currentIndex = 0;
// 獲取所有的輪播項目
let slides = document.querySelectorAll('.carousel-item');
// 總的輪播項目數量
let totalSlides = slides.length;

// 顯示指定索引的輪播項目
function showSlide(index) {
    // 如果索引超過總數，重置為第一張
    if (index >= totalSlides) {
        currentIndex = 0;
    // 如果索引小於0，重置為最後一張
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    // 否則顯示指定索引的項目
    } else {
        currentIndex = index;
    }
    // 計算偏移量，並設置過渡效果
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

// 切換到下一張圖片
function nextSlide() {
    showSlide(currentIndex + 1);
}

// 切換到上一張圖片
function prevSlide() {
    showSlide(currentIndex - 1);
}

// 自動切換圖片，每5秒切換一次
function autoSlide() {
    nextSlide();
    setTimeout(autoSlide, 5000);
}

// 當 DOM 內容加載完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 顯示當前索引的圖片
    showSlide(currentIndex);
    // 開始自動切換
    setTimeout(autoSlide, 5000);
    
    // 手動滑動功能
    let startX;
    let endX;
    const carouselInner = document.querySelector('.carousel-inner');

    // 監聽觸摸開始事件
    carouselInner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    // 監聽觸摸結束事件
    carouselInner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        // 如果滑動距離超過50像素，切換到下一張或上一張
        if (startX > endX + 50) {
            nextSlide();
        } else if (startX < endX - 50) {
            prevSlide();
        }
    });
});
// --------------- 輪播圖 End ---------------


// 地圖
document.addEventListener('DOMContentLoaded', function () {
    const map = document.getElementById('map'); // 獲取地圖元素
    const carouselItems = document.querySelectorAll('.carousel-item'); // 獲取所有輪播圖項目

    // 更新地圖的縮放和平移
    function updateMapTransform(index) {
        switch (index) {
            case 0:
                map.style.transform = 'scale(2) translate(-10%, -10%)'; // 當顯示img1時，地圖放大2倍並平移到(10%, 10%)
                break;
            case 1:
                map.style.transform = 'scale(2) translate(-50%, -10%)'; // 當顯示img2時，地圖放大2倍並平移到(50%, 10%)
                break;
            case 2:
                map.style.transform = 'scale(2) translate(-10%, -50%)'; // 當顯示img3時，地圖放大2倍並平移到(10%, 50%)
                break;
        }
    }

    // // 監聽輪播圖的變化
    // carouselItems.forEach((item, index) => {
    //     item.addEventListener('click', function () {
    //         updateMapTransform(index); // 根據點擊的項目更新地圖
    //     });
    // });

    // 依照currentIndex平移到指定位置
    // updateMapTransform(currentIndex);
    // 監視 currentIndex 的變化
    Object.defineProperty(window, 'currentIndex', {
        set: function (value) {
            this._currentIndex = value;
            updateMapTransform(value);
        },
        get: function () {
            return this._currentIndex;
        }
    });
});
