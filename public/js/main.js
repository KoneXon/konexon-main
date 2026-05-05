// Mobile menu
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobMenu');
if (ham) ham.addEventListener('click', () => mob.classList.toggle('open'));
function closeMob() { if (mob) mob.classList.remove('open'); }
