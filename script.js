
// 女友的生日密碼
const correctBirthday = "20261220";

// 生日解鎖功能
function checkBirthday() {
    const userBirthday = document.getElementById("birthday").value;
    const message = document.getElementById("message");

    // 移除斜線、空格及連字號
    const birthday = userBirthday.replace(/[\/\s-]/g, "");

    if (birthday === correctBirthday) {

        // 隱藏生日解鎖畫面
        document.getElementById("lock-screen").style.display = "none";

        // 顯示生日主頁
        document.getElementById("birthday-content").style.display = "block";

        // 回到頁面最上方
        window.scrollTo(0, 0);

        // 播放生日歌曲
        const music = document.getElementById("birthday-music");

        if (music) {
            music.play().catch(function(error) {
                console.log("自動播放受到瀏覽器限制，請手動播放音樂。");
            });
        }
                // 啟動漂浮愛心
        startFloatingHearts();

    } else {
        message.textContent = "生日好像不太對喔，再試一次 ♡";
        message.style.color = "#d98b9d";
    }
}


// 照片放大與切換功能
let currentPhotoIndex = 0;


// 取得所有照片
function getPhotos() {
    return document.querySelectorAll(".photo-card img");
}


// 點擊照片時開啟放大相簿
function openPhoto(photo) {
    const photos = getPhotos();

    currentPhotoIndex = Array.from(photos).indexOf(photo);

    if (currentPhotoIndex === -1) return;

    showPhoto();

    document.getElementById("photo-modal").style.display = "flex";
}


// 顯示目前照片
function showPhoto() {
    const photos = getPhotos();

    const modalImage = document.getElementById("modal-image");
    const counter = document.getElementById("photo-counter");

    if (!modalImage || !counter || photos.length === 0) return;

    modalImage.src = photos[currentPhotoIndex].src;
    modalImage.alt = photos[currentPhotoIndex].alt;

    counter.textContent = (currentPhotoIndex + 1) + " / " + photos.length;
}


// 左右切換照片
function changePhoto(direction) {
    const photos = getPhotos();

    currentPhotoIndex += direction;

    // 最後一張回到第一張
    if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    }

    // 第一張回到最後一張
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    }

    showPhoto();
}


// 關閉照片
function closePhoto() {
    document.getElementById("photo-modal").style.display = "none";
}


// 鍵盤操作：左右方向鍵切換、ESC 關閉
document.addEventListener("keydown", function(event) {
    const modal = document.getElementById("photo-modal");

    if (!modal || modal.style.display !== "flex") return;

    if (event.key === "ArrowRight") {
        changePhoto(1);
    }

    if (event.key === "ArrowLeft") {
        changePhoto(-1);
    }

    if (event.key === "Escape") {
        closePhoto();
    }
});

// ===== 漂浮愛心功能 =====

function startFloatingHearts() {
    const container = document.getElementById("floating-hearts");

    if (!container || container.dataset.started === "true") {
        return;
    }

    container.dataset.started = "true";

    setInterval(function() {
        const heart = document.createElement("span");

        heart.className = "heart";
        heart.textContent = "♡";

        // 隨機位置
        heart.style.left = Math.random() * 95 + "%";
heart.style.bottom = (-20 - Math.random() * 100) + "px";

        // 隨機大小
        heart.style.fontSize = (14 + Math.random() * 20) + "px";

        // 隨機漂浮速度
        heart.style.animationDuration = (6 + Math.random() * 5) + "s";

        container.appendChild(heart);

        // 動畫結束後移除愛心
        heart.addEventListener("animationend", function() {
            heart.remove();
        });

    }, 700);
}

