const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fontSize = 15;
const letters = "010100100101001".split("");
const drops = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (let i = 0; i < canvas.width / fontSize; i++) {
  drops[i] = Math.floor(Math.random() * canvas.height);
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
      drops[i] = 0;
    }
  }

  window.requestAnimationFrame(draw);
}

draw();

