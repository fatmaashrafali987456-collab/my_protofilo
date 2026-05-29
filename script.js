// ===== CURSOR =====
const cursor = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursor-trail");
let mouseX = 0,
  mouseY = 0;
let trailX = 0,
  trailY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
  spawnSparkleTrail(mouseX, mouseY);
});

setInterval(() => {
  trailX += (mouseX - trailX) * 0.2;
  trailY += (mouseY - trailY) * 0.2;
  cursorTrail.style.left = trailX + "px";
  cursorTrail.style.top = trailY + "px";
}, 16);

let sparkleCount = 0;
function spawnSparkleTrail(x, y) {
  sparkleCount++;
  if (sparkleCount % 4 !== 0) return;
  const emojis = ["✨", "💕", "🌸", "⭐", "💫", "✿", "💖"];
  const el = document.createElement("div");
  el.className = "sparkle-trail";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = x + (Math.random() - 0.5) * 20 + "px";
  el.style.top = y + (Math.random() - 0.5) * 20 + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ===== BACKGROUND HEARTS =====
const heartsBg = document.getElementById("heartsBg");
const heartEmojis = [
  "💕",
  "💖",
  "💗",
  "💓",
  "💝",
  "🌸",
  "✨",
  "💫",
  "🌷",
  "💞",
];
for (let i = 0; i < 25; i++) {
  const h = document.createElement("div");
  h.className = "bg-heart";
  h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  h.style.left = Math.random() * 100 + "%";
  h.style.animationDuration = 8 + Math.random() * 12 + "s";
  h.style.animationDelay = Math.random() * 15 + "s";
  heartsBg.appendChild(h);
}

// ===== HERO SPARKLES =====
const heroSparkles = document.getElementById("heroSparkles");
for (let i = 0; i < 20; i++) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = Math.random() * 3 + "s";
  s.style.animationDuration = 1.5 + Math.random() * 2 + "s";
  s.style.width = 4 + Math.random() * 8 + "px";
  s.style.height = s.style.width;
  heroSparkles.appendChild(s);
}

// ===== HERO FLOATING HEARTS =====
const heroHearts = document.getElementById("heroHearts");
const hh = ["💕", "💖", "💗", "🌸", "✨"];
for (let i = 0; i < 12; i++) {
  const h = document.createElement("div");
  h.className = "hero-float-heart";
  h.textContent = hh[Math.floor(Math.random() * hh.length)];
  h.style.left = Math.random() * 100 + "%";
  h.style.bottom = "0";
  h.style.animationDuration = 3 + Math.random() * 4 + "s";
  h.style.animationDelay = Math.random() * 5 + "s";
  heroHearts.appendChild(h);
}

// ===== TYPING ANIMATION =====
const fullName = "Hello, I'm Fatma Ashraf";
const typed = document.getElementById("typed");
let charIdx = 0;
let typingStarted = false;

function typeChar() {
  if (charIdx < fullName.length) {
    const ch = fullName[charIdx];
    typed.textContent += ch;
    spawnLetterHeart();
    charIdx++;
    setTimeout(typeChar, 80 + Math.random() * 40);
  } else {
    document.getElementById("typingCursor").style.animation =
      "blink 0.8s steps(1) infinite";
  }
}
setTimeout(() => typeChar(), 1000);

function spawnLetterHeart() {
  const wrapper = document.getElementById("typingWrapper");
  const rect = wrapper.getBoundingClientRect();
  const h = document.createElement("div");
  h.className = "letter-heart";
  const heartArr = ["💕", "💖", "🌸", "✨", "💗", "⭐"];
  h.textContent = heartArr[Math.floor(Math.random() * heartArr.length)];
  h.style.left = Math.random() * rect.width * 0.8 + rect.width * 0.1 + "px";
  h.style.top = "-10px";
  wrapper.style.position = "relative";
  wrapper.appendChild(h);
  setTimeout(() => h.remove(), 1200);
}

// ===== HERO HOVER SPARKLES =====
document.getElementById("typingWrapper").addEventListener("mousemove", (e) => {
  if (Math.random() > 0.7) {
    const wrapper = e.currentTarget;
    const s = document.createElement("div");
    s.className = "hover-sparkle";
    const dx = (Math.random() - 0.5) * 80,
      dy = (Math.random() - 0.5) * 80;
    s.style.setProperty("--sparkle-dir", `translate(${dx}px, ${dy}px)`);
    s.style.left = e.offsetX + (Math.random() - 0.5) * 20 + "px";
    s.style.top = e.offsetY + (Math.random() - 0.5) * 20 + "px";
    s.style.background = ["#ffd700", "#ff6b9d", "#ff2d78", "#fff"][
      Math.floor(Math.random() * 4)
    ];
    wrapper.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

// ===== ID CARD DRAG =====
const idCard = document.getElementById("idCard");
const idCardInner = document.getElementById("idCardInner");
let isDragging = false,
  startX = 0,
  startY = 0,
  origX = 0,
  origY = 0;
let cardOffX = 0,
  cardOffY = 0;

idCard.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  const rect = idCard.getBoundingClientRect();
  origX = rect.left;
  origY = rect.top;
  idCard.style.position = "fixed";
  idCard.style.left = origX + "px";
  idCard.style.top = origY + "px";
  idCard.style.zIndex = "9000";
  idCard.style.transition = "none";
  e.preventDefault();
});
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX,
    dy = e.clientY - startY;
  idCard.style.left = origX + dx + "px";
  idCard.style.top = origY + dy + "px";
  idCardInner.style.transform = `rotateY(${dx * 0.03}deg) rotateX(${-dy * 0.03}deg)`;
});
document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  idCardInner.style.transform = "rotateY(0) rotateX(0)";
  idCard.style.transition = "all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)";
  setTimeout(() => {
    idCard.style.position = "";
    idCard.style.left = "";
    idCard.style.top = "";
    idCard.style.zIndex = "";
  }, 500);
});

// Touch drag support
idCard.addEventListener(
  "touchstart",
  (e) => {
    const t = e.touches[0];
    isDragging = true;
    startX = t.clientX;
    startY = t.clientY;
    const rect = idCard.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    idCard.style.position = "fixed";
    idCard.style.left = origX + "px";
    idCard.style.top = origY + "px";
    idCard.style.zIndex = "9000";
    idCard.style.transition = "none";
  },
  { passive: true },
);
document.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    const t = e.touches[0];
    const dx = t.clientX - startX,
      dy = t.clientY - startY;
    idCard.style.left = origX + dx + "px";
    idCard.style.top = origY + dy + "px";
  },
  { passive: true },
);
document.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  idCardInner.style.transform = "";
  idCard.style.transition = "all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)";
  setTimeout(() => {
    idCard.style.position = "";
    idCard.style.left = "";
    idCard.style.top = "";
    idCard.style.zIndex = "";
  }, 500);
});

// ===== PHOTO HOVER HEARTS =====
const photoFrame = document.getElementById("photoFrame");
const photoHeartsContainer = document.getElementById("photoHearts");
photoFrame.addEventListener("mouseenter", spawnPhotoHearts);
photoFrame.addEventListener("mousemove", () => {
  if (Math.random() > 0.6) spawnSinglePhotoHeart();
});

function spawnPhotoHearts() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => spawnSinglePhotoHeart(), i * 150);
  }
}
function spawnSinglePhotoHeart() {
  const h = document.createElement("div");
  h.className = "pop-heart";
  const arr = ["💕", "💖", "🌸", "💗", "✨", "💝"];
  h.textContent = arr[Math.floor(Math.random() * arr.length)];
  h.style.left = Math.random() * 120 - 10 + "px";
  h.style.top = Math.random() * 120 - 10 + "px";
  h.style.animationDelay = Math.random() * 0.3 + "s";
  photoHeartsContainer.appendChild(h);
  setTimeout(() => h.remove(), 1500);
}

// ===== SKILL MODAL DATA =====
const skillData = {
  ml: {
    icon: "🤖",
    title: "AI & Machine Learning",
    subtitle: "Python · Data Science · Deep Learning",
    pills: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "Matplotlib",
      "Jupyter",
      "SQL",
    ],
    desc: `<p>With a genuine passion for Artificial Intelligence, I've been building my skills in Machine Learning from the ground up. From understanding algorithms like linear regression and decision trees to exploring neural networks — every concept is a new adventure! 🌟</p>
           <p>I work with Python and its powerful data science ecosystem to build, train, and evaluate models. I love visualizing data with Matplotlib and Seaborn to find hidden patterns that tell a story.</p>
           <p>My goal is to use ML to solve real-world problems and make the world a little smarter — and cuter! 💕</p>`,
    bars: [
      ["Python", 80],
      ["Machine Learning Basics", 72],
      ["Data Analysis", 75],
      ["Neural Networks", 55],
    ],
    hearts: "🤖💕✨🌸💖",
  },
  nails: {
    icon: "💅",
    title: "Nail Art & Design",
    subtitle: "Beauty · Creativity · Aesthetics",
    pills: [
      "French Tips",
      "Gel Nails",
      "Nail Stamping",
      "Ombre Nails",
      "Nail Foils",
      "3D Nail Art",
      "Color Theory",
      "Nail Care",
    ],
    desc: `<p>Nail art is my creative escape! I treat each nail as a tiny canvas — from elegant minimalist designs to intricate, detailed paintings. Every brushstroke is an expression of personality and style. 🌸</p>
           <p>I specialize in various techniques: soft ombre gradients, cute stamped patterns, glittery festive designs, and seasonal nail themes. I also love mixing trendy styles with traditional Egyptian motifs for something totally unique!</p>
           <p>Beauty and technology aren't opposites — both require precision, creativity, and passion. This skill keeps my artistic side alive alongside my technical work! 💅✨</p>`,
    bars: [
      ["Nail Design", 90],
      ["Color Theory", 85],
      ["Gel Application", 78],
      ["3D Nail Art", 65],
    ],
    hearts: "💅🌸💕✨💗",
  },
  aitools: {
    icon: "✨",
    title: "AI Tools Proficiency",
    subtitle: "Productivity · Content Creation · Research",
    pills: [
      "ChatGPT",
      "Midjourney",
      "Canva AI",
      "GitHub Copilot",
      "Notion AI",
      "Claude",
      "Stable Diffusion",
      "Runway ML",
    ],
    desc: `<p>Living in the AI era means knowing how to work with it, not against it! I've developed strong skills in using AI tools professionally to supercharge my productivity and creativity. ✨</p>
           <p>From generating AI images for design projects with Midjourney, to using GitHub Copilot for coding assistance, to creating presentations with AI-powered tools — I use these technologies thoughtfully and effectively.</p>
           <p>I also understand the importance of prompt engineering — crafting clear, detailed prompts to get the best results from any AI system. It's a skill that bridges creativity and technology! 🌟💕</p>`,
    bars: [
      ["AI Image Generation", 82],
      ["AI Writing Tools", 88],
      ["Prompt Engineering", 78],
      ["AI Workflow Integration", 70],
    ],
    hearts: "✨🤖💕🌸⭐",
  },
  control: {
    icon: "⚡",
    title: "Control & Instrumentation",
    subtitle: "Engineering · Systems · Analysis",
    pills: [
      "PLC Programming",
      "SCADA",
      "Sensors & Actuators",
      "Process Control",
      "PID Controllers",
      "Instrumentation",
      "AutoCAD",
      "MATLAB",
    ],
    desc: `<p>My technical foundation comes from specializing in Control & Instrumentation — a field that combines engineering precision with analytical problem-solving. This background gives me a unique edge in tech! ⚡</p>
           <p>I have hands-on experience with PLC programming, understanding sensor networks, and designing feedback control systems. The logical thinking required in control systems translates beautifully into programming and AI work.</p>
           <p>From understanding process dynamics to reading instrumentation diagrams, this specialization taught me to think systematically — a skill that's invaluable in every technical field. 💪🌸</p>`,
    bars: [
      ["PLC & SCADA", 75],
      ["Process Control", 70],
      ["Instrumentation", 72],
      ["MATLAB/Simulation", 65],
    ],
    hearts: "⚡💕🔧✨🌸",
  },
};

function openModal(id) {
  const data = skillData[id];
  document.getElementById("modalIcon").textContent = data.icon;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalSubtitle").textContent = data.subtitle;
  // Pills
  document.getElementById("modalPills").innerHTML = data.pills
    .map((p) => `<span class="skill-pill">${p}</span>`)
    .join("");
  // Desc
  document.getElementById("modalDesc").innerHTML = data.desc;
  // Bars
  let barsHtml = '<div style="margin-top:16px">';
  data.bars.forEach(([label, val]) => {
    barsHtml += `<div class="skill-bar-wrap">
      <div class="skill-bar-label"><span>${label}</span><span>${val}%</span></div>
      <div class="skill-bar"><div class="skill-bar-fill" data-val="${val}"></div></div>
    </div>`;
  });
  barsHtml += "</div>";
  document.getElementById("modalBars").innerHTML = barsHtml;
  document.getElementById("modalHearts").textContent = data.hearts;
  document.getElementById("modalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
  // Animate bars
  setTimeout(() => {
    document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      bar.style.width = bar.dataset.val + "%";
    });
  }, 300);
}
function closeModal(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ===== SEND MESSAGE =====
function sendMessage() {
  const btn = document.querySelector(".btn-pink");
  btn.textContent = "💕 Sent with Love!";
  btn.style.background = "linear-gradient(135deg, #28a745, #20c997)";
  setTimeout(() => {
    btn.innerHTML = 'Send with Love 💕 <i class="fas fa-paper-plane ms-2"></i>';
    btn.style.background = "";
  }, 2500);
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("id-card-wrapper")) {
          entry.target.style.opacity = "1";
        }
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right, .id-card-wrapper",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ID card scroll trigger
const idCardWrapper = document.getElementById("idCard");
const idObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      idCardWrapper.classList.add("visible");
      idCardWrapper.style.animationPlayState = "running";
    }
  },
  { threshold: 0.3 },
);
idObserver.observe(idCardWrapper);

// ===== SMOOTH SCROLL NAV =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    // Close mobile menu
    const bsCollapse = bootstrap.Collapse.getInstance(
      document.getElementById("navMenu"),
    );
    if (bsCollapse) bsCollapse.hide();
  });
});

// Upload photo support — look for any file input
document.addEventListener("DOMContentLoaded", () => {
  // Add a hidden file input for custom photo upload
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  fileInput.id = "photoUpload";
  document.body.appendChild(fileInput);

  const profilePhoto = document.getElementById("profilePhoto");
  profilePhoto.style.cursor = "pointer";
  profilePhoto.title = "Click to upload your photo!";
  profilePhoto.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        profilePhoto.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});

// ===== 3D CARD TILT on HOVER (when not dragging) =====
idCardInner.addEventListener("mousemove", (e) => {
  if (isDragging) return;
  const rect = idCardInner.getBoundingClientRect();
  const cx = rect.left + rect.width / 2,
    cy = rect.top + rect.height / 2;
  const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
  const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
  idCardInner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
});
idCardInner.addEventListener("mouseleave", () => {
  if (isDragging) return;
  idCardInner.style.transform = "rotateX(0) rotateY(0)";
});
