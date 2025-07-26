document.addEventListener('DOMContentLoaded', () => {
  // --- Логіка бургер-меню ---
  const burgerBtn = document.getElementById('burger-btn');
  const burgerMenu = document.getElementById('burger-menu');

  if (burgerBtn && burgerMenu) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active');
      burgerMenu.classList.toggle('active');
    });

    // Закриває меню при кліку на будь-яке посилання
    burgerMenu.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        burgerMenu.classList.remove('active');
      });
    });
  }

  // --- Переклад у бургер-меню ---
  const toggleLangBtn = document.getElementById('toggle-lang');
  if (toggleLangBtn) {
    let isUkrainian = true;
    toggleLangBtn.addEventListener('click', () => {
      const uaTexts = document.querySelectorAll('.lang-ua');
      const enTexts = document.querySelectorAll('.lang-en');

      uaTexts.forEach(el => el.classList.toggle('hidden'));
      enTexts.forEach(el => el.classList.toggle('hidden'));

      toggleLangBtn.textContent = isUkrainian ? '🔁 Translate' : '🔁 Переклад';
      isUkrainian = !isUkrainian;
    });
  }

  // --- Планети та секції ---
  const planetBtns = document.querySelectorAll('.planet-btn');
  const bioSections = document.querySelectorAll('.bio-section');

  function showSection(planet) {
    bioSections.forEach(sec => {
      if (sec.getAttribute('data-planet') === planet) {
        sec.classList.remove('collapsed');
        sec.classList.add('expanded');
      } else {
        sec.classList.add('collapsed');
        sec.classList.remove('expanded');
      }
    });
    planetBtns.forEach(btn => {
      if (btn.getAttribute('data-planet') === planet) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  planetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const planet = btn.getAttribute('data-planet');
      showSection(planet);
    });
  });

  if (planetBtns.length && bioSections.length) {
    showSection(planetBtns[0].getAttribute('data-planet'));
  }
});

// --- Анімація зірок ---
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('.stars')?.appendChild(canvas); // перевірка на наявність
const ctx = canvas.getContext('2d');

let stars = [];
const maxStars = 100;

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random();
    this.opacityChange = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
  }

  update() {
    this.opacity += this.opacityChange;
    if (this.opacity <= 0.1 || this.opacity >= 1) this.opacityChange *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 8;
    ctx.fill();
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < maxStars; i++) {
    stars.push(new Star());
  }
}
initStars();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// --- Метеори ---
function launchMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  document.body.appendChild(meteor);

  setTimeout(() => meteor.remove(), 3000);
}

function launchMeteor1() {
  const meteor1 = document.createElement('div');
  meteor1.classList.add('meteor1');
  document.body.appendChild(meteor1);

  setTimeout(() => meteor1.remove(), 3000);
}

document.addEventListener('click', () => {
  launchMeteor();
  launchMeteor1();
});

// --- Таймер життя ---
const birthDate = new Date(2009, 4, 28, 5, 5, 0); // Заміни на свою дату

function updateTimer() {
  const now = new Date();
  let diff = now - birthDate;

  if (diff < 0) {
    document.getElementById('timer').textContent = "Ще не народилася!";
    return;
  }

  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;
  const msInYear = msInDay * 365.25;

  const years = Math.floor(diff / msInYear);
  diff -= years * msInYear;

  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;

  const hours = Math.floor(diff / msInHour);
  diff -= hours * msInHour;

  const minutes = Math.floor(diff / msInMinute);
  diff -= minutes * msInMinute;

  const seconds = Math.floor(diff / msInSecond);

  document.getElementById('timer').textContent =
    `${years} років, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд`;
}

setInterval(updateTimer, 1000);
updateTimer();
// --- Галерея ---