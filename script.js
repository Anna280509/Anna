// --- Логіка для кнопок-планет і показу тексту ---
document.addEventListener('DOMContentLoaded', () => {
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

  // Показати першу секцію при завантаженні
  if (planetBtns.length && bioSections.length) {
    showSection(planetBtns[0].getAttribute('data-planet'));
  }
});

document.querySelectorAll('.planet-btn').forEach(button => {
  button.addEventListener('click', () => {
    const planet = button.dataset.planet;
    document.querySelectorAll('.bio-section').forEach(section => {
      if (section.dataset.planet === planet) {
        section.classList.toggle('expanded');
      } else {
        section.classList.remove('expanded');
      }
    });
  });
});

// --- Анімація зірок ---
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector('.stars').appendChild(canvas);
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

// Ініціалізація зірок
function initStars() {
  stars = [];
  for (let i = 0; i < maxStars; i++) {
    stars.push(new Star());
  }
}
initStars();

// Анімація
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}
animate();
document.addEventListener('DOMContentLoaded', () => {
  const toggleLangBtn = document.getElementById('toggle-lang');
  if (!toggleLangBtn) return;

  let isUkrainian = true;

  toggleLangBtn.addEventListener('click', () => {
    const uaTexts = document.querySelectorAll('.lang-ua');
    const enTexts = document.querySelectorAll('.lang-en');

    uaTexts.forEach(el => el.classList.toggle('hidden'));
    enTexts.forEach(el => el.classList.toggle('hidden'));

    toggleLangBtn.textContent = isUkrainian ? '🔁 Translate' : '🔁 Переклад';
    isUkrainian = !isUkrainian;
  });
});
function launchMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  document.body.appendChild(meteor);

  setTimeout(() => {
    meteor.remove(); // прибираємо з DOM після завершення анімації
  }, 3000);
}

// Запуск метеора щоразу при кліку
document.addEventListener('click', launchMeteor);

function launchMeteor1() {
  const meteor1 = document.createElement('div');
  meteor1.classList.add('meteor1');
  document.body.appendChild(meteor1);

  setTimeout(() => {
    meteor1.remove(); // прибираємо з DOM після завершення анімації
  }, 3000);
}

// Запуск метеора щоразу при кліку
document.addEventListener('click', launchMeteor1);
