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
            // 先在原本位置縮小
            map.style.transform = 'scale(3) translate(15%, -19%)';
            setTimeout(() => {
                // 根據索引更新地圖放大及平移
                map.style.transform = 'scale(9) translate(37.5%, -9.5%)';
            }, 2000);
            break;
        case 1:
            map.style.transform = 'scale(3) translate(39%, -7%)';
            setTimeout(() => {
                map.style.transform = 'scale(9) translate(31%, -20%)';
            }, 2000);            
            break;
        case 2:
            // 先在原本位置縮小
            map.style.transform = 'scale(3) translate(31%, -20%)';
            setTimeout(() => {
                // 根據索引更新地圖放大及平移
                map.style.transform = 'scale(9) translate(22%, -19%)';
            }, 2000);    
            break;
        case 3:
            // 先在原本位置縮小
            map.style.transform = 'scale(3) translate(22%, -19%)';
            setTimeout(() => {
                // 根據索引更新地圖放大及平移
                map.style.transform = 'scale(15) translate(19%, -27%)';
            }, 2000);
            break;
        case 4:
            // 先在原本位置縮小
            map.style.transform = 'scale(3) translate(19%, -27%)';
            setTimeout(() => {
                // 根據索引更新地圖放大及平移
                map.style.transform = 'scale(15) translate(22.5%, -20%)';
            }, 2000);
            break;
        case 5:
            // 先在原本位置縮小
            map.style.transform = 'scale(3) translate(22.5%, -20%)';
            setTimeout(() => {
                // 根據索引更新地圖放大及平移
                map.style.transform = 'scale(15) translate(15%, -19%)';
            }, 2000);
            break;
    }
}

// 新增用兩根手指放大縮小的功能
let initialDistance = 0;
let initialScale = 1;

map.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault(); // 防止默認行為，如滾動或放大網頁...
        initialDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        initialScale = parseFloat(map.style.transform.replace('scale(', '').replace(')', '')) || 1;
    }
});

map.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault(); // 防止默認行為，如滾動或放大網頁...
        const currentDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        const scale = initialScale * (currentDistance / initialDistance);

        // 找出原本的transform，使用.match()、正則表達式及三元運算符保留其他部分，只替換掉scale成新的scale
        const transform = map.style.transform;
        const scaleRegex = /scale\([^\)]+\)/;
        const newTransform = transform.match(scaleRegex)
            ? transform.replace(scaleRegex, `scale(${scale})`)
            : `${transform} scale(${scale})`;
        
        // 將map.style.transform替換成新的
        map.style.transform = newTransform;
    }
});


// 新增用手指移動的功能
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;

map.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        // 防止默認行為，如滾動或放大網頁...
        e.preventDefault();
        
        startX = e.touches[0].pageX - offsetX;
        startY = e.touches[0].pageY - offsetY;
    }
});

map.addEventListener('touchmove', (e) => {
    // 取消過渡效果
    map.style.transition = 'none';

    if (e.touches.length === 1) {
        // 防止默認行為，如滾動或放大網頁...
        e.preventDefault();
        
        offsetX = e.touches[0].pageX - startX;
        offsetY = e.touches[0].pageY - startY;
        // 取得map的變形矩陣，變形矩陣的第一個元素就是我要的scale值
        const transformMatrix = window.getComputedStyle(map).transform;
        // 取得矩陣的第一個元素
        const firstParameter = transformMatrix.match(/matrix\(([^,]+)/)[1];
        // 縮放及平移map
        map.style.transform = `scale(${firstParameter}) translate(${offsetX}px, ${offsetY}px)`;
    }

    // 恢復過渡效果
    setTimeout(() => {
        map.style.transition = 'transform 2s ease';
    }, 500);
});