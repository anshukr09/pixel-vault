/* =============================================
   PIXELVAULT — Shared JavaScript (script.js)
   ============================================= */

/* ── 1. NAV: scroll background change ── */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(5,5,8,0.97)'
      : 'rgba(5,5,8,0.88)';
  });
}

/* ── 2. MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const closeMenu  = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) hamburger.onclick = () => mobileMenu.classList.add('open');
  if (closeMenu)  closeMenu.onclick  = () => mobileMenu.classList.remove('open');
}

/* ── 3. SCROLL REVEAL (Intersection Observer) ── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── 4. COUNTER ANIMATION ── */
function animateCounter(el) {
  const target   = +el.dataset.target;
  const duration = 1800;
  const start    = performance.now();
  const suffix   = target >= 10000 ? '+' : target === 70 ? '%' : target === 9 ? '' : '+';
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));
}

/* ── 5. TOAST ── */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── 6. CART / WISHLIST (shared across pages) ── */
function addToCart(name)    { showToast(`🎮 "${name}" added to cart!`); }
function addWishlist(name)  { showToast(`♡ "${name}" added to wishlist!`); }
function tradeNav()         { window.location.href = 'contact.html'; }

/* ── 7. GAME DATA (used by features.html) ── */
const GAMES = [
  { title:"Elden Ring",                genre:"Action RPG",          platform:"PS5",    tag:"ps5",    price:"₹1,899", orig:"₹3,499", save:"-46%", icon:"🕹️", bg:"linear-gradient(135deg,#0a0a20,#1a0535)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", desc:"Journey through the Lands Between in one of the greatest open-world RPGs ever made." },
  { title:"God of War: Ragnarök",      genre:"Action Adventure",    platform:"PS5",    tag:"ps5",    price:"₹2,199", orig:"₹3,999", save:"-45%", icon:"⚡", bg:"linear-gradient(135deg,#1a0500,#2e0a00)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg", desc:"Kratos and Atreus face Norse gods and mythological beasts in this stunning sequel." },
  { title:"Horizon Forbidden West",    genre:"Open World RPG",      platform:"PS5",    tag:"ps5",    price:"₹1,799", orig:"₹3,499", save:"-49%", icon:"🏹", bg:"linear-gradient(135deg,#001a0a,#003320)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/header.jpg", desc:"Explore a lush, post-apocalyptic world filled with mechanical dinosaurs and ancient secrets." },
  { title:"Halo Infinite",             genre:"First-Person Shooter", platform:"Xbox",  tag:"xbox",   price:"₹999",   orig:"₹2,499", save:"-60%", icon:"🪖", bg:"linear-gradient(135deg,#001020,#002040)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg", desc:"Master Chief returns in the most expansive Halo story yet, with an open-world campaign." },
  { title:"Forza Horizon 5",           genre:"Racing",               platform:"Xbox",  tag:"xbox",   price:"₹1,499", orig:"₹2,999", save:"-50%", icon:"🚗", bg:"linear-gradient(135deg,#150010,#300030)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg", desc:"Race across the stunning landscapes of Mexico in the most beautiful racing game ever made." },
  { title:"The Witcher 3",             genre:"Open World RPG",       platform:"Xbox",  tag:"xbox",   price:"₹999",   orig:"₹2,499", save:"-60%", icon:"⚔️", bg:"linear-gradient(135deg,#0f1a00,#1a2a00)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg", desc:"Hunt monsters, make impossible choices, and explore one of gaming's greatest open worlds." },
  { title:"Zelda: Tears of the Kingdom",genre:"Adventure RPG",      platform:"Switch", tag:"switch", price:"₹2,499", orig:"₹3,999", save:"-38%", icon:"🗡️", bg:"linear-gradient(135deg,#1a1000,#2e1e00)", img:"https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_400/v1/ncom/software/switch/70010000063714/ac3e7956faad7e01e45975bd8f4c5c02e8e5f6ba8d2c7e8d4c9c959975c5e9c", desc:"Build, explore, and discover in Hyrule like never before in this mind-bending open-world sequel." },
  { title:"Super Mario Odyssey",       genre:"Platformer",           platform:"Switch", tag:"switch", price:"₹1,299", orig:"₹2,499", save:"-48%", icon:"🍄", bg:"linear-gradient(135deg,#1a0000,#300000)", img:"https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_400/v1/ncom/software/switch/70010000001130/c42553b4fd0312c31e70b23b5b476e8286472ed71c4be3a9bfb63fca86f97f36", desc:"Mario's most inventive adventure. Capture enemies, explore stunning kingdoms, collect moons." },
  { title:"Hollow Knight",             genre:"Metroidvania",         platform:"Switch", tag:"switch", price:"₹699",   orig:"₹1,299", save:"-46%", icon:"🌸", bg:"linear-gradient(135deg,#1a0010,#350020)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg", desc:"A hauntingly beautiful action game through a vast underground kingdom of insects and heroes." },
  { title:"Cyberpunk 2077",            genre:"Action RPG",           platform:"PC",     tag:"pc",     price:"₹1,299", orig:"₹2,999", save:"-57%", icon:"🤖", bg:"linear-gradient(135deg,#0a0a00,#1a1a00)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", desc:"A sprawling open-world RPG set in a dystopian future. Your choices shape the fate of Night City." },
  { title:"Red Dead Redemption 2",     genre:"Open World",           platform:"PC",     tag:"pc",     price:"₹1,199", orig:"₹2,799", save:"-57%", icon:"🤠", bg:"linear-gradient(135deg,#100500,#200a00)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", desc:"The most detailed open world ever created. An epic tale of outlaws, loyalty, and redemption." },
  { title:"Stardew Valley",            genre:"Indie Simulation",     platform:"PC",     tag:"indie",  price:"₹399",   orig:"₹799",   save:"-50%", icon:"🌾", bg:"linear-gradient(135deg,#001a00,#002a00)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg", desc:"Leave behind city life and build your own farm in this beloved indie hit. Relax, grow, live." },
  { title:"Celeste",                   genre:"Indie Platformer",     platform:"Switch", tag:"indie",  price:"₹499",   orig:"₹999",   save:"-50%", icon:"🏔️", bg:"linear-gradient(135deg,#050020,#100050)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg", desc:"Climb a treacherous mountain in this award-winning precision platformer about self-discovery." },
  { title:"EA Sports FC 25",           genre:"Sports",               platform:"PS5",    tag:"sports", price:"₹1,999", orig:"₹3,499", save:"-43%", icon:"⚽", bg:"linear-gradient(135deg,#001a08,#003010)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg", desc:"The world's most popular football game with HyperMotion V technology and deep Ultimate Team." },
  { title:"NBA 2K25",                  genre:"Sports",               platform:"Xbox",   tag:"sports", price:"₹1,599", orig:"₹2,999", save:"-47%", icon:"🏀", bg:"linear-gradient(135deg,#150500,#2a0a00)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/2803430/header.jpg", desc:"The ultimate basketball simulation with MyCareer, MyTeam, and the most realistic court action." },
  { title:"Dark Souls III",            genre:"Action RPG",           platform:"PS5",    tag:"rpg",    price:"₹1,099", orig:"₹2,499", save:"-56%", icon:"💀", bg:"linear-gradient(135deg,#080808,#181018)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg", desc:"The legendary third chapter in the Dark Souls saga. Brutal, rewarding, and endlessly memorable." },
  { title:"Monster Hunter Rise",       genre:"Action RPG",           platform:"Switch", tag:"rpg",    price:"₹1,299", orig:"₹2,499", save:"-48%", icon:"🦖", bg:"linear-gradient(135deg,#0a1500,#152200)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/1446780/header.jpg", desc:"Hunt massive monsters, craft powerful gear, and master exhilarating combat in this action RPG." },
  { title:"Sekiro: Shadows Die Twice", genre:"Action",               platform:"PS5",    tag:"action", price:"₹1,499", orig:"₹2,999", save:"-50%", icon:"🥷", bg:"linear-gradient(135deg,#050010,#100025)", img:"https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg", desc:"Become a master shinobi in feudal Japan. Perfect your posture, learn patterns, fight with precision." },
];

/* ── 8. GAME LIBRARY: render, filter, search ── */
let currentFilter = 'all';

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterGames();
}

function filterGames() {
  const query    = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const filtered = GAMES.filter(g => {
    const matchFilter = currentFilter === 'all' || g.tag === currentFilter;
    const matchSearch = !query ||
      g.title.toLowerCase().includes(query) ||
      g.genre.toLowerCase().includes(query) ||
      g.platform.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });
  renderGames(filtered);
}

function renderGames(games) {
  const grid  = document.getElementById('gameGrid');
  const noRes = document.getElementById('noResults');
  if (!grid) return;
  if (!games.length) {
    grid.innerHTML = '';
    if (noRes) noRes.style.display = 'block';
    return;
  }
  if (noRes) noRes.style.display = 'none';
  grid.innerHTML = games.map((g, i) => `
    <div class="game-card" style="animation:fadeUp .5s ${i * 0.06}s ease both;">
      <div class="game-card-img">
        <img src="${g.img}" alt="${g.title}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
          style="width:100%;height:100%;object-fit:cover;display:block;"/>
        <div class="game-card-img-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:3.5rem;background:${g.bg};">${g.icon}</div>
      </div>
      <div class="game-card-body">
        <span class="game-card-genre">${g.genre} · ${g.platform}</span>
        <div class="game-card-title">${g.title}</div>
        <p class="game-card-desc">${g.desc}</p>
        <div class="game-card-price-row">
          <div><span class="price-new">${g.price}</span><span class="price-old">${g.orig}</span></div>
          <span class="price-badge">${g.save}</span>
        </div>
        <div class="game-card-btns">
          <button class="btn-xs buy"      onclick="addToCart('${g.title.replace(/'/g,"\\'")}')">Buy Now</button>
          <button class="btn-xs trade"    onclick="tradeNav()">Trade In</button>
          <button class="btn-xs wishlist" onclick="addWishlist('${g.title.replace(/'/g,"\\'")}')">♡</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── 9. GALLERY DATA & RENDER ── */
const GALLERY_ITEMS = [
  { icon:"🎮", label:"The Controller",    tag:"consoles", category:"consoles", bg:"linear-gradient(135deg,#0a0a20,#1a0540)", size:"tall", img:"https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=600&q=80", desc:"The humble controller — the universal language of gaming. Every thumbstick and trigger is a doorway into another world." },
  { icon:"🕹️", label:"Arcade Era",        tag:"retro",    category:"retro",    bg:"linear-gradient(135deg,#1a1000,#2e1e00)", size:"",     img:"https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=600&q=80", desc:"Before home consoles, there were arcades. The flashing lights, the queue for the machine — an era that defined gaming culture forever." },
  { icon:"🏆", label:"Victory Screen",    tag:"culture",  category:"culture",  bg:"linear-gradient(135deg,#0a1500,#152200)", size:"",     img:"https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80", desc:"Nothing matches the feeling of that final victory. Whether it's your first Dark Souls boss or a FIFA championship, gaming glory is universal." },
  { icon:"🌌", label:"Open World",         tag:"games",    category:"games",    bg:"linear-gradient(135deg,#050020,#0f0040)", size:"tall", img:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80", desc:"The open world — gaming's greatest gift. The freedom to wander, explore, and discover without borders or instructions. Just you and the horizon." },
  { icon:"👾", label:"Pixel Art",          tag:"retro",    category:"retro",    bg:"linear-gradient(135deg,#001a08,#002a10)", size:"",     img:"https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80", desc:"Pixel art was born from hardware limitations and became an iconic art style. Today's indie games celebrate pixels out of pure love." },
  { icon:"🖥️", label:"Gaming Setup",       tag:"consoles", category:"consoles", bg:"linear-gradient(135deg,#0a0010,#1a0030)", size:"",     img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80", desc:"The battlestation. Every gamer's shrine — crafted with care, tweaked obsessively, and glowing with RGB light." },
  { icon:"🎯", label:"Esports Arena",      tag:"culture",  category:"culture",  bg:"linear-gradient(135deg,#0a0020,#1a0535)", size:"tall", img:"https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&q=80", desc:"Esports fills arenas and commands millions of viewers. Professional gaming is now a legitimate career path and cultural institution." },
  { icon:"📼", label:"Retro Cartridges",   tag:"retro",    category:"retro",    bg:"linear-gradient(135deg,#150a00,#2a1500)", size:"",     img:"https://images.unsplash.com/photo-1600861194802-a2b11076bc51?w=600&q=80", desc:"The cartridge — chunky, satisfying to insert, and impossible to forget. These grey and black rectangles contained entire universes." },
  { icon:"🎧", label:"Gaming Audio",        tag:"culture",  category:"culture",  bg:"linear-gradient(135deg,#050010,#100025)", size:"",     img:"https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80", desc:"Sound design and music are the unsung heroes of gaming. The right soundtrack transforms a game from good to transcendent." },
  { icon:"⚔️", label:"RPG Quest",           tag:"games",    category:"games",    bg:"linear-gradient(135deg,#0f1a00,#1a2a00)", size:"",     img:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80", desc:"The RPG quest — an invitation to become someone else entirely. Build your character, choose your path, write a story that's uniquely yours." },
  { icon:"🌸", label:"Indie Gems",          tag:"games",    category:"games",    bg:"linear-gradient(135deg,#1a0010,#2a0020)", size:"tall", img:"https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80", desc:"Indie games have redefined what's possible. Created by small teams with massive passion, they often tell the most personal stories in the medium." },
  { icon:"🔥", label:"Epic Boss Fight",     tag:"culture",  category:"culture",  bg:"linear-gradient(135deg,#1a0500,#2e0a00)", size:"",     img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80", desc:"Boss fights are gaming's ultimate test — concentrated challenge, spectacle, and reward. Few things in entertainment rival finally winning." },
  { icon:"🚀", label:"Sci-Fi Worlds",       tag:"games",    category:"games",    bg:"linear-gradient(135deg,#001520,#002540)", size:"",     img:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80", desc:"Gaming's sci-fi universes are among the most richly imagined in all of fiction — these worlds feel genuinely alive." },
  { icon:"🏎️", label:"Racing Games",        tag:"games",    category:"games",    bg:"linear-gradient(135deg,#200000,#3a0000)", size:"",     img:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80", desc:"Racing games deliver pure, distilled adrenaline. From Mario Kart chaos to Gran Turismo precision, the thrill of first place is timeless." },
  { icon:"🕹️", label:"Console Collection",  tag:"consoles", category:"consoles", bg:"linear-gradient(135deg,#0a1a00,#152a00)", size:"",     img:"https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=600&q=80", desc:"From the NES to the PlayStation 5, every generation of consoles tells a story of technological leaps and unforgettable gaming moments." },
  { icon:"🔮", label:"VR Frontier",         tag:"consoles", category:"consoles", bg:"linear-gradient(135deg,#100020,#200035)", size:"tall", img:"https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&q=80", desc:"Virtual reality is the next frontier of gaming immersion. Step inside the world — look around, reach out, and blur the line between game and reality." },
];

let currentTab = 'all';

function setTab(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGallery();
}

function renderGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const items = currentTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === currentTab);

  gallery.innerHTML = items.map(item => `
    <div class="masonry-item" onclick="openLightbox('${item.icon}','${item.tag}','${item.label}','${item.desc.replace(/'/g, "\\'")}','${item.img}')">
      <img src="${item.img}" alt="${item.label}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        style="width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;"/>
      <div class="m-inner ${item.size}" style="background:${item.bg};position:relative;z-index:0;display:none;" id="fallback-${item.label.replace(/\s/g,'')}">
        <span class="m-icon ${item.size === 'tall' ? 'large' : ''}">${item.icon}</span>
        <span class="m-label">${item.label}</span>
      </div>
      <div class="m-overlay" style="z-index:2;">
        <span class="m-overlay-txt">${item.label}</span>
      </div>
    </div>
  `).join('');

  // Fix fallback: if img loads, hide fallback div; else show it
  gallery.querySelectorAll('.masonry-item img').forEach(img => {
    img.addEventListener('load', () => {
      img.style.display = 'block';
    });
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = img.nextElementSibling;
      if (fallback) fallback.style.display = 'flex';
    });
  });
}

/* ── 10. LIGHTBOX ── */
function openLightbox(icon, tag, title, desc, img) {
  document.getElementById('lbIcon').textContent  = icon;
  document.getElementById('lbTag').textContent   = tag.toUpperCase();
  document.getElementById('lbTitle').textContent = title;
  document.getElementById('lbDesc').textContent  = desc;
  const lbImg = document.getElementById('lbImg');
  if (lbImg && img) {
    lbImg.src = img;
    lbImg.style.display = 'block';
  }
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── 11. CONTACT FORM ── */
function initContactForm() {
  const subjectEl = document.getElementById('fsubject');
  if (subjectEl) {
    subjectEl.addEventListener('change', function () {
      const tradeGroup = document.getElementById('tradeFieldGroup');
      if (tradeGroup) tradeGroup.style.display = this.value === 'trade' ? 'block' : 'none';
    });
  }
}

function submitForm() {
  const name    = document.getElementById('fname')?.value.trim();
  const email   = document.getElementById('femail')?.value.trim();
  const subject = document.getElementById('fsubject')?.value;
  const message = document.getElementById('fmessage')?.value.trim();

  if (!name || !email || !subject || !message) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }
  if (!email.includes('@')) {
    showToast('⚠️ Please enter a valid email address.');
    return;
  }

  const subjectMap = {
    buy: 'Game Purchase Inquiry', trade: 'Trade-In Request',
    sell: 'Game Sale Inquiry',    order: 'Order Query',
    warranty: 'Warranty Request', other: 'General Inquiry'
  };
  const subjectLine = subjectMap[subject] || 'PIXELVAULT Inquiry';
  const platform    = document.getElementById('fplatform')?.value || '';
  const trades      = document.getElementById('ftrades')?.value || '';
  let body = `Name: ${name}\nEmail: ${email}\n`;
  if (platform) body += `Platform: ${platform}\n`;
  if (trades)   body += `\nGames to Trade:\n${trades}\n`;
  body += `\nMessage:\n${message}`;

  const mailto = `mailto:anshux0909@gmail.com?subject=${encodeURIComponent('[PIXELVAULT] ' + subjectLine)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  setTimeout(() => {
    const fc = document.getElementById('formContainer');
    const ss = document.getElementById('successScreen');
    if (fc) fc.style.display = 'none';
    if (ss) ss.classList.add('show');
  }, 800);
}

/* ── 12. FAQ ACCORDION ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── INIT ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initReveal();
  initCounters();
  initContactForm();

  // Lightbox close handlers
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Home page featured grid (3 hand-picked games)
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = [GAMES[0], GAMES[5], GAMES[8]]; // Elden Ring, Witcher 3, Hollow Knight
    featuredGrid.innerHTML = featured.map((g, i) => `
      <div class="game-card reveal" style="transition-delay:${i * 0.12}s;">
        <div class="game-card-img">
          <img src="${g.img}" alt="${g.title}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/>
          <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:3.5rem;background:${g.bg};">${g.icon}</div>
        </div>
        <div class="game-card-body">
          <span class="game-card-genre">${g.genre} · ${g.platform}</span>
          <div class="game-card-title">${g.title}</div>
          <p class="game-card-desc">${g.desc}</p>
          <div class="game-card-price-row">
            <div><span class="price-new">${g.price}</span><span class="price-old">${g.orig}</span></div>
            <span class="price-badge">${g.save}</span>
          </div>
          <div class="game-card-btns">
            <button class="btn-xs buy"      onclick="addToCart('${g.title.replace(/'/g,"\\'")}')">Buy Now</button>
            <button class="btn-xs trade"    onclick="tradeNav()">Trade In</button>
            <button class="btn-xs wishlist" onclick="addWishlist('${g.title.replace(/'/g,"\\'")}')">♡</button>
          </div>
        </div>
      </div>
    `).join('');
    // re-observe new cards
    featuredGrid.querySelectorAll('.reveal').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }

  // Full game library page
  if (document.getElementById('gameGrid')) renderGames(GAMES);

  // Gallery page
  if (document.getElementById('gallery')) renderGallery();
});
