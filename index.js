// --------------- 輪播圖 ---------------
let currentIndex = 0; // 當前顯示的幻燈片索引
let slides = document.querySelectorAll('.carousel-item'); // 獲取所有幻燈片元素
let totalSlides = slides.length; // 總幻燈片數量

function showSlide(index) {
    if (index >= totalSlides) {
        proxy.currentIndex = 0; // 如果索引超過總數，重置為0
    } else if (index < 0) {
        proxy.currentIndex = totalSlides - 1; // 如果索引小於0，設置為最後一張幻燈片
    } else {
        proxy.currentIndex = index; // 否則設置為當前索引
    }
    const offset = -proxy.currentIndex * 100; // 計算偏移量
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`; // 移動幻燈片
}

function nextSlide() {
    showSlide(proxy.currentIndex + 1); // 顯示下一張幻燈片
}

function prevSlide() {
    showSlide(proxy.currentIndex - 1); // 顯示上一張幻燈片
}

function autoSlide() {
    nextSlide(); // 自動顯示下一張幻燈片
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(proxy.currentIndex); // 頁面加載完成後顯示當前幻燈片
    // setInterval(autoSlide, 5000); // 每5秒自動切換幻燈片

    let startX;
    let endX;
    const carouselInner = document.querySelector('.carousel-inner');

    carouselInner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // 記錄觸摸開始位置
    });

    carouselInner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX; // 記錄觸摸結束位置
        if (startX > endX + 50) {
            nextSlide(); // 向左滑動，顯示下一張幻燈片
        } else if (startX < endX - 50) {
            prevSlide(); // 向右滑動，顯示上一張幻燈片
        }
    });
});

// 創建一個 Proxy 來監視 currentIndex 的變化
const handler = {
    set: function (obj, prop, value) {
        obj[prop] = value; // 設置新值
        updateMapTransform(value); // 更新地圖變換
        console.log(value); // 輸出新值到控制台
        return true;
    }
};
const proxy = new Proxy({ currentIndex: currentIndex }, handler); // 創建 Proxy


// 地圖
const map = document.getElementById('map'); // 獲取地圖元素
const carouselItems = document.querySelectorAll('.carousel-item'); // 獲取所有幻燈片元素

function updateMapTransform(index) {
    switch (index) {
        case 0:
            map.style.transform = 'scale(9) translate(39%, -7%)'; // 根據索引更新地圖放大及平移
            break;
        case 1:
            map.style.transform = 'scale(9) translate(31%, -20%)';
            break;
        case 2:
            map.style.transform = 'scale(9) translate(22%, -19%)';
            break;
        case 3:
            map.style.transform = 'scale(9) translate(19%, -27%)';
            break;
        case 4:
            map.style.transform = 'scale(9) translate(22.5%, -20%)';
        break;
        case 5:
            map.style.transform = 'scale(15) translate(15%, -19%)';
        break;
    }
}