const ASSET_ROOT = 'assets';

// Replace placeholder paths with your transparent PNGs later.
// Every PNG should be the same size as the canvas: 1600 x 1200 is used here.
const TRAITS = {
  form: [
    { id: 'horse', name: 'Horse', icon: '🐴', rarity: 'Common', color: '#f3dcc8', src: `${ASSET_ROOT}/bases/horse.png`, description: 'Classic Carouzell horse form.' },
    { id: 'centaur', name: 'Centaur', icon: '♞', rarity: 'Common', color: '#d9c1ee', src: `${ASSET_ROOT}/bases/centaur.png`, description: 'Half human, half carousel horse form.' },
    { id: 'hippocampus', name: 'Hippocampus', icon: '🌊', rarity: 'Rare', color: '#b9e8ef', src: `${ASSET_ROOT}/bases/hippocampus.png`, description: 'Oceanic form with aquatic traits.' },
    { id: 'satyr', name: 'Satyr', icon: '🦌', rarity: 'Rare', color: '#d1b08b', src: `${ASSET_ROOT}/bases/satyr.png`, description: 'Humanoid form with horse satyr legs.' }
  ],
  coat: [
    { id: 'none', name: 'None', icon: '—', rarity: 'Common', color: '#fff8ef', src: null, description: 'No coat layer selected.' },
    { id: 'bay', name: 'Bay', icon: '●', rarity: 'Common', color: '#5b3329', src: `${ASSET_ROOT}/coats/bay.png`, description: 'A natural warm brown coat.' },
    { id: 'black', name: 'Black', icon: '●', rarity: 'Common', color: '#21191d', src: `${ASSET_ROOT}/coats/black.png`, description: 'A dark natural coat.' },
    { id: 'cream', name: 'Cream', icon: '●', rarity: 'Common', color: '#f4ddbc', src: `${ASSET_ROOT}/coats/cream.png`, description: 'A soft pale natural coat.' },
    { id: 'lilac', name: 'Lilac Cream', icon: '●', rarity: 'Rare', color: '#c9b1e8', src: `${ASSET_ROOT}/coats/lilac-cream.png`, description: 'A mild fantasy coat color.' }
  ],
  markings: [
    { id: 'none', name: 'None', icon: '—', rarity: 'Common', color: '#fff8ef', src: null, description: 'No markings selected.' },
    { id: 'socks', name: 'Socks', icon: '◒', rarity: 'Common', color: '#f7f0e8', src: `${ASSET_ROOT}/markings/socks.png`, description: 'Simple leg markings.' },
    { id: 'paint', name: 'Paint', icon: '◌', rarity: 'Common', color: '#efe3d8', src: `${ASSET_ROOT}/markings/paint.png`, description: 'Classic painted body patches.' },
    { id: 'star-appaloosa', name: 'Star Appaloosa', icon: '✦', rarity: 'Rare', color: '#8270c3', src: `${ASSET_ROOT}/markings/star-appaloosa.png`, description: 'Colorful star-shaped appaloosa markings.' }
  ],
  effects: [
    { id: 'none', name: 'None', icon: '—', rarity: 'Common', color: '#fff8ef', src: null, description: 'No fantasy effect selected.' },
    { id: 'stardust', name: 'Stardust', icon: '✧', rarity: 'Rare', color: '#e7d5ff', src: `${ASSET_ROOT}/effects/stardust.png`, description: 'Soft magical sparkle overlay.' },
    { id: 'aurora', name: 'Aurora', icon: '☄', rarity: 'Rare', color: '#7ddedc', src: `${ASSET_ROOT}/effects/aurora.png`, description: 'A mild fantasy gradient effect.' },
    { id: 'galaxy', name: 'Galaxy', icon: '✹', rarity: 'Mythical', color: '#45317b', src: `${ASSET_ROOT}/effects/galaxy.png`, description: 'A full fantasy cosmic overlay.' }
  ],
  orb: [
    { id: 'none', name: 'None', icon: '—', rarity: 'Common', color: '#fff8ef', src: null, description: 'No soulmarble selected.' },
    { id: 'glass', name: 'Glass Orb', icon: '🔮', rarity: 'Common', color: '#dcefff', src: `${ASSET_ROOT}/orbs/glass.png`, description: 'A simple clear soulmarble.' },
    { id: 'pink', name: 'Rose Orb', icon: '🔮', rarity: 'Rare', color: '#f6bfd5', src: `${ASSET_ROOT}/orbs/rose.png`, description: 'A rosy magical soulmarble.' },
    { id: 'night-sky', name: 'Night Sky Orb', icon: '🌌', rarity: 'Mythical', color: '#1f245d', src: `${ASSET_ROOT}/orbs/night-sky.png`, description: 'A soulmarble filled with stars.' }
  ],
  pole: [
    { id: 'none', name: 'None', icon: '—', rarity: 'Common', color: '#fff8ef', src: null, description: 'No pole selected.' },
    { id: 'brass', name: 'Brass Spiral', icon: '┃', rarity: 'Common', color: '#c99545', src: `${ASSET_ROOT}/poles/brass.png`, description: 'A classic brass carousel pole.' },
    { id: 'silver', name: 'Silver Spiral', icon: '┃', rarity: 'Common', color: '#b7b6c3', src: `${ASSET_ROOT}/poles/silver.png`, description: 'A polished silver carousel pole.' },
    { id: 'crystal', name: 'Crystal Pole', icon: '♢', rarity: 'Mythical', color: '#cfd8ff', src: `${ASSET_ROOT}/poles/crystal.png`, description: 'A luminous fantasy pole.' }
  ],
  ribbon: [
    { id: 'none', name: 'None', icon: '—', rarity: 'Common', color: '#fff8ef', src: null, description: 'No ribbon selected.' },
    { id: 'lavender', name: 'Lavender Bow', icon: '🎀', rarity: 'Common', color: '#b79be4', src: `${ASSET_ROOT}/ribbons/lavender.png`, description: 'A soft ribbon accent.' },
    { id: 'rose', name: 'Rose Bow', icon: '🎀', rarity: 'Common', color: '#f1a7ba', src: `${ASSET_ROOT}/ribbons/rose.png`, description: 'A pink ribbon accent.' },
    { id: 'midnight', name: 'Midnight Bow', icon: '🎀', rarity: 'Rare', color: '#26326a', src: `${ASSET_ROOT}/ribbons/midnight.png`, description: 'A dark celestial ribbon.' }
  ]
};

const state = {
  form: TRAITS.form[0],
  coat: TRAITS.coat[0],
  markings: TRAITS.markings[0],
  effects: TRAITS.effects[0],
  orb: TRAITS.orb[0],
  pole: TRAITS.pole[0],
  ribbon: TRAITS.ribbon[0]
};

const canvas = document.getElementById('builderCanvas');
const ctx = canvas.getContext('2d');
const emptyNote = document.getElementById('emptyNote');
const traitList = document.getElementById('traitList');

const layerOrder = ['form', 'coat', 'markings', 'effects', 'pole', 'orb', 'ribbon'];
const imageCache = new Map();

function rarityStars(rarity) {
  if (rarity === 'Mythical') return '✦✦✦';
  if (rarity === 'Rare') return '✦✦';
  return '✦';
}

function makeOption(category, item) {
  const button = document.createElement('button');
  button.className = 'option-card';
  button.type = 'button';
  button.dataset.id = item.id;
  button.innerHTML = `
    <span class="option-icon">${item.icon}</span>
    <span class="option-name">${item.name}</span>
    <span class="option-rarity">${rarityStars(item.rarity)} ${item.rarity}</span>
  `;
  button.addEventListener('click', () => selectTrait(category, item));
  return button;
}

function renderOptions() {
  const targets = {
    form: 'formOptions', coat: 'coatOptions', markings: 'markingOptions', effects: 'effectOptions',
    orb: 'orbOptions', pole: 'poleOptions', ribbon: 'ribbonOptions'
  };

  Object.entries(targets).forEach(([category, targetId]) => {
    const target = document.getElementById(targetId);
    target.innerHTML = '';
    TRAITS[category].forEach(item => target.appendChild(makeOption(category, item)));
  });
}

function selectTrait(category, item) {
  state[category] = item;
  updateSelectedCards();
  updateDetails(category, item);
  updateSelectionStrip();
  updateTraitList();
  drawCanvas();
}

function updateSelectedCards() {
  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  Object.entries(state).forEach(([category, item]) => {
    const section = document.querySelector(`[data-section="${category}"]`);
    const card = section?.querySelector(`[data-id="${item.id}"]`);
    if (card) card.classList.add('selected');
  });
}

function updateDetails(category, item) {
  document.getElementById('detailTitle').textContent = category.replace('-', ' ').toUpperCase();
  document.getElementById('detailRarity').textContent = `${rarityStars(item.rarity)} ${item.rarity}`;
  document.getElementById('itemName').textContent = item.name;
  document.getElementById('itemDescription').textContent = item.description;

  const swatchRow = document.getElementById('swatchRow');
  swatchRow.innerHTML = '';
  TRAITS[category].slice(0, 12).forEach(trait => {
    const swatch = document.createElement('button');
    swatch.className = 'swatch';
    swatch.title = trait.name;
    swatch.style.background = trait.color || '#fff8ef';
    swatch.addEventListener('click', () => selectTrait(category, trait));
    swatchRow.appendChild(swatch);
  });
}

function updateSelectionStrip() {
  const strip = document.getElementById('selectionStrip');
  strip.innerHTML = '';
  Object.entries(state).forEach(([category, item]) => {
    const chip = document.createElement('div');
    chip.className = 'selection-chip';
    chip.innerHTML = `<strong>${category}</strong><span>${item.icon}</span><br>${item.name}`;
    strip.appendChild(chip);
  });
}

function updateTraitList() {
  traitList.value = Object.entries(state)
    .map(([category, item]) => `${category}: ${item.name} (${item.rarity})`)
    .join('\n');
}

function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (imageCache.has(src)) return imageCache.get(src);

  const promise = new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
  imageCache.set(src, promise);
  return promise;
}

async function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // soft preview backdrop; remove this if you want the canvas preview transparent too
  ctx.fillStyle = 'rgba(255, 248, 239, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let foundAnyImage = false;

  for (const category of layerOrder) {
    const item = state[category];
    const img = await loadImage(item.src);
    if (img) {
      foundAnyImage = true;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  if (!foundAnyImage) drawPlaceholderBase();
  emptyNote.style.display = foundAnyImage ? 'none' : 'block';
}

function drawPlaceholderBase() {
  ctx.save();
  ctx.strokeStyle = '#8d67b2';
  ctx.lineWidth = 8;
  ctx.globalAlpha = 0.85;

  // simple placeholder horse silhouette so the layout feels alive before assets exist
  ctx.beginPath();
  ctx.ellipse(820, 650, 360, 160, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(470, 505, 110, 150, -0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(565, 590); ctx.lineTo(630, 760);
  ctx.moveTo(760, 775); ctx.lineTo(745, 980);
  ctx.moveTo(920, 775); ctx.lineTo(900, 980);
  ctx.moveTo(1060, 740); ctx.lineTo(1110, 960);
  ctx.moveTo(620, 740); ctx.lineTo(585, 950);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1120, 620, 70, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(900, 330); ctx.lineTo(900, 1050);
  ctx.stroke();
  ctx.font = '48px Georgia';
  ctx.fillStyle = '#8d67b2';
  ctx.fillText('Carouzell Preview', 590, 190);
  ctx.restore();
}

function randomize() {
  Object.keys(state).forEach(category => {
    const items = TRAITS[category];
    state[category] = items[Math.floor(Math.random() * items.length)];
  });
  updateSelectedCards();
  updateDetails('form', state.form);
  updateSelectionStrip();
  updateTraitList();
  drawCanvas();
}

function reset() {
  Object.keys(state).forEach(category => { state[category] = TRAITS[category][0]; });
  updateSelectedCards();
  updateDetails('form', state.form);
  updateSelectionStrip();
  updateTraitList();
  drawCanvas();
}

async function exportPNG() {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;
  const exportCtx = exportCanvas.getContext('2d');

  for (const category of layerOrder) {
    const item = state[category];
    const img = await loadImage(item.src);
    if (img) exportCtx.drawImage(img, 0, 0, exportCanvas.width, exportCanvas.height);
  }

  // If there are no assets yet, export the placeholder instead.
  const hasAssets = layerOrder.some(category => state[category].src);
  if (!hasAssets) {
    exportCtx.drawImage(canvas, 0, 0);
  }

  const link = document.createElement('a');
  link.download = 'carouzell-base.png';
  link.href = exportCanvas.toDataURL('image/png');
  link.click();
}

function setupAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const current = header.closest('.accordion');
      current.classList.toggle('open');
    });
  });
}

document.getElementById('randomizeBtn').addEventListener('click', randomize);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('exportBtn').addEventListener('click', exportPNG);

renderOptions();
setupAccordions();
updateSelectedCards();
updateDetails('form', state.form);
updateSelectionStrip();
updateTraitList();
drawCanvas();
