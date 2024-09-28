// 定義正面圖片路徑
const frontImage = "/images/picture0.png"; 

// 定義食物主題的背面圖片
const foodImages = [
  "/images/picture1.png",
  "/images/picture2.png",
  "/images/picture3.png",
  "/images/picture4.png",
  "/images/picture5.png",
  "/images/picture6.png",
  "/images/picture7.png",
  "/images/picture8.png"
];

// 定義動物主題的背面圖片
const animalImages = [
  "/images/animal1.png",
  "/images/animal2.png",
  "/images/animal3.png",
  "/images/animal4.png",
  "/images/animal5.png",
  "/images/animal6.png",
  "/images/animal7.png",
  "/images/animal8.png"
];

let selectedImages = []; // 用來存儲當前選中的主題圖片集

// 生成背面圖片數組，確保每張圖片最多出現2次
function generateBackImages() {
  let images = [];
  selectedImages.forEach(image => {
    images.push(image);
    images.push(image); // 每張圖片添加兩次
  });
  return shuffleArray(images); // 隨機打亂數組
}

// 打亂數組的函數
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 生成卡片的函數
function generateCards(cardCount) {
  const cardWrapper = document.getElementById('card-wrapper');
  cardWrapper.innerHTML = ''; // 清空現有卡片

  const backImagePool = generateBackImages(); // 生成打亂後的背面圖片池

  for (let i = 0; i < cardCount; i++) {
    // 創建卡片容器
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    // 創建卡片
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `card${i + 1}`; // 為每張卡片設置唯一的ID

    // 創建正面
    const front = document.createElement('div');
    front.classList.add('card-face', 'card-front');
    const frontImageElement = document.createElement('img');
    frontImageElement.src = frontImage;
    frontImageElement.alt = '正面卡片圖片';
    front.appendChild(frontImageElement);

    // 創建背面
    const back = document.createElement('div');
    back.classList.add('card-face', 'card-back');
    const backImageElement = document.createElement('img');
    backImageElement.src = backImagePool[i]; // 從打亂的背面圖片池中獲取圖片
    backImageElement.alt = `背面卡片圖片 ${i + 1}`;
    back.appendChild(backImageElement);

    // 將正面和背面添加到卡片
    card.appendChild(front);
    card.appendChild(back);

    // 將卡片添加到卡片容器
    cardContainer.appendChild(card);

    // 將卡片容器添加到頁面
    cardWrapper.appendChild(card);

    // 添加點擊翻轉事件
    card.addEventListener('click', function () {
      this.classList.toggle('flipped');
    });
  }
}

// 設置開始遊戲按鈕的啟用條件
document.querySelectorAll('input[name="theme"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
    if (selectedTheme === 'food') {
      selectedImages = foodImages;
    } else if (selectedTheme === 'animal') {
      selectedImages = animalImages;
    }
    document.getElementById('startGame').disabled = false; // 啟用開始遊戲按鈕
  });
});

// 開始遊戲按鈕事件
document.getElementById('startGame').addEventListener('click', function() {
  document.getElementById('card-wrapper').style.display = 'grid'; // 顯示卡片容器
  generateCards(16); // 生成16張卡片

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('flipped');  // 顯示背面
  });

  // 10秒後翻回正面
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('flipped');  // 顯示正面
    });
  }, 10000); // 10秒
});

// 按鈕功能實現：依序翻轉卡片
function flipCardsSequentially(showBack = true) {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      if (showBack) {
        card.classList.add('flipped');  // 顯示背面
      } else {
        card.classList.remove('flipped');  // 顯示正面
      }
    }, index * 300); // 每隔300毫秒翻轉一張卡片
  });
}

document.getElementById('showFront').addEventListener('click', function() {
  flipCardsSequentially(false); // 依序顯示正面
});

document.getElementById('showBack').addEventListener('click', function() {
  flipCardsSequentially(true); // 依序顯示背面
});
