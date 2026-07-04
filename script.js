const state = {
  form: "Horse",
  coat: "Cream",
  marking: "None",
  effect: "None",
  orb: "None",
  pole: "None",
  ribbon: "None"
};

const defaultState = { ...state };

const data = {
  forms: [
    { name: "Horse", icon: "🐴", rarity: "✦" },
    { name: "Centaur", icon: "🎠", rarity: "✦" },
    { name: "Hippocampus", icon: "🌊", rarity: "✦✦" },
    { name: "Satyr", icon: "🐐", rarity: "✦✦" }
  ],

  coats: [
    { name: "Cream", color: "#f4e7d9", rarity: "✦" },
    { name: "Bay", color: "#7a4a34", rarity: "✦" },
    { name: "Black", color: "#251f25", rarity: "✦" },
    { name: "Grey", color: "#a49b9b", rarity: "✦" },
    { name: "Palomino", color: "#e6c078", rarity: "✦" },
    { name: "Chestnut", color: "#9c5238", rarity: "✦" },
    { name: "Blue Roan", color: "#6f7f91", rarity: "✦✦" },
    { name: "Lavender Cream", color: "#d4b8f2", rarity: "✦✦" },
    { name: "Seafoam", color: "#97d8d2", rarity: "✦✦" },
    { name: "Rose Milk", color: "#eab0c7", rarity: "✦✦" },
    { name: "Moon Blue", color: "#9fc8ee", rarity: "✦✦" },
    { name: "Void", color: "#10091c", rarity: "✦✦✦" },
    { name: "Nebula Plum", color: "#5c3a86", rarity: "✦✦✦" },
    { name: "Starlight Gold", color: "#f5cf85", rarity: "✦✦✦" },
    { name: "Aurora Mint", color: "#78dec9", rarity: "✦✦✦" }
  ],

  markings: [
    { name: "None", icon: "—", className: "", rarity: "✦" },
    { name: "Pinto", icon: "◖", className: "pinto", rarity: "✦" },
    { name: "Appaloosa Spots", icon: "●", className: "spots", rarity: "✦" },
    { name: "Star Appaloosa", icon: "✦", className: "stars", rarity: "✦✦" }
  ],

  effects: [
    { name: "None", icon: "—", className: "", rarity: "✦" },
    { name: "Stardust", icon: "✦", className: "stardust", rarity: "✦✦" },
    { name: "Aurora", icon: "☄", className: "aurora", rarity: "✦✦" },
    { name: "Petals", icon: "✿", className: "petal", rarity: "✦✦" }
  ],

  orbs: [
    { name: "None", icon: "—", color: "", rarity: "✦" },
    { name: "Pearl Orb", icon: "◉", color: "#f6d7e8", rarity: "✦" },
    { name: "Moon Orb", icon: "◉", color: "#bcdcff", rarity: "✦✦" },
    { name: "Night Sky Orb", icon: "◉", color: "#3b2a83", rarity: "✦✦✦" }
  ],

  poles: [
    { name: "None", icon: "—", rarity: "✦" },
    { name: "Brass Spiral", icon: "▥", rarity: "✦" },
    { name: "Silver Spiral", icon: "▥", rarity: "✦✦" },
    { name: "Crystal Pole", icon: "♢", rarity: "✦✦✦" }
  ],

  ribbons: [
    { name: "None", icon: "—", color: "", rarity: "✦" },
    { name: "Lavender Bow", icon: "🎀", color: "#b995ff", rarity: "✦" },
    { name: "Rose Bow", icon: "🎀", color: "#ef9fbd", rarity: "✦" },
    { name: "Ocean Bow", icon: "🎀", color: "#7fc9cf", rarity: "✦✦" }
  ]
};

const horsePreview = document.getElementById("horsePreview");
const selectionBar = document.getElementById("selectionBar");
const toast = document.getElementById("toast");

function rarityLabel(rarity) {
  if (rarity === "✦✦✦") return "Mythical";
  if (rarity === "✦✦") return "Rare";
  return "Common";
}

function createCard(item, type) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "option-card";
  card.dataset.type = type;
  card.dataset.name = item.name;
  card.title = `${item.name} — ${rarityLabel(item.rarity || "✦")}`;
  card.innerHTML = `
    <span class="rarity">${item.rarity || "✦"}</span>
    <span class="option-icon">${item.icon || "✧"}</span>
    <span class="option-name">${item.name}</span>
  `;

  card.addEventListener("click", () => {
    state[type] = item.name;
    applyState();
    refreshActive();
  });

  return card;
}

function createSwatch(item) {
  const swatch = document.createElement("button");
  swatch.type = "button";
  swatch.className = "swatch";
  swatch.dataset.type = "coat";
  swatch.dataset.name = item.name;
  swatch.title = `${item.name} — ${rarityLabel(item.rarity)}`;
  swatch.style.background = item.color;
  swatch.innerHTML = `<span class="rarity">${item.rarity}</span>`;

  swatch.addEventListener("click", () => {
    state.coat = item.name;
    applyState();
    refreshActive();
  });

  return swatch;
}

function renderOptions() {
  document.getElementById("formOptions").innerHTML = "";
  document.getElementById("coatOptions").innerHTML = "";
  document.getElementById("markingOptions").innerHTML = "";
  document.getElementById("effectOptions").innerHTML = "";
  document.getElementById("orbOptions").innerHTML = "";
  document.getElementById("poleOptions").innerHTML = "";
  document.getElementById("ribbonOptions").innerHTML = "";

  data.forms.forEach(item => document.getElementById("formOptions").appendChild(createCard(item, "form")));
  data.coats.forEach(item => document.getElementById("coatOptions").appendChild(createSwatch(item)));
  data.markings.forEach(item => document.getElementById("markingOptions").appendChild(createCard(item, "marking")));
  data.effects.forEach(item => document.getElementById("effectOptions").appendChild(createCard(item, "effect")));
  data.orbs.forEach(item => document.getElementById("orbOptions").appendChild(createCard(item, "orb")));
  data.poles.forEach(item => document.getElementById("poleOptions").appendChild(createCard(item, "pole")));
  data.ribbons.forEach(item => document.getElementById("ribbonOptions").appendChild(createCard(item, "ribbon")));
}

function findByName(collection, name) {
  return collection.find(item => item.name === name);
}

function applyState() {
  const coat = findByName(data.coats, state.coat);
  const marking = findByName(data.markings, state.marking);
  const effect = findByName(data.effects, state.effect);
  const orb = findByName(data.orbs, state.orb);
  const ribbon = findByName(data.ribbons, state.ribbon);

  if (coat) horsePreview.style.setProperty("--coat", coat.color);

  document.querySelector(".marking-layer").className = `marking-layer ${marking?.className || ""}`;
  document.querySelector(".effect-layer").className = `effect-layer ${effect?.className || ""}`;

  const orbLayer = document.querySelector(".orb-layer");
  orbLayer.classList.toggle("show", state.orb !== "None");
  if (orb?.color) horsePreview.style.setProperty("--orb", orb.color);

  document.querySelector(".pole-layer").classList.toggle("show", state.pole !== "None");

  const ribbonLayer = document.querySelector(".ribbon-layer");
  ribbonLayer.classList.toggle("show", state.ribbon !== "None");
  if (ribbon?.color) horsePreview.style.setProperty("--ribbon", ribbon.color);

  renderSelections();
}

function renderSelections() {
  selectionBar.innerHTML = "";
  Object.entries(state).forEach(([key, value]) => {
    const div = document.createElement("div");
    div.className = "selection";
    div.innerHTML = `<strong>${key}</strong><span>${value}</span>`;
    selectionBar.appendChild(div);
  });
}

function refreshActive() {
  document.querySelectorAll(".option-card, .swatch").forEach(el => {
    el.classList.toggle("active", state[el.dataset.type] === el.dataset.name);
  });
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 4200);
}

function getDesignSummary() {
  return Object.entries(state)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

document.getElementById("randomizeBtn").addEventListener("click", () => {
  state.form = randomItem(data.forms).name;
  state.coat = randomItem(data.coats).name;
  state.marking = randomItem(data.markings).name;
  state.effect = randomItem(data.effects).name;
  state.orb = randomItem(data.orbs).name;
  state.pole = randomItem(data.poles).name;
  state.ribbon = randomItem(data.ribbons).name;
  applyState();
  refreshActive();
  showToast("A new Carouzell design has been shuffled in the workshop ✧");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  Object.assign(state, defaultState);
  applyState();
  refreshActive();
  showToast("The workshop canvas has been reset.");
});

document.getElementById("exportBtn").addEventListener("click", async () => {
  const summary = `Prototype export summary:\n\n${getDesignSummary()}\n\nPNG export can be connected after you replace the CSS horse with transparent PNG layers.`;

  try {
    await navigator.clipboard.writeText(getDesignSummary());
    showToast(`${summary}\n\nCopied trait list to clipboard.`);
  } catch (error) {
    showToast(summary);
  }
});

document.querySelectorAll(".section-title").forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".workshop-section").classList.toggle("open");
  });
});

renderOptions();
applyState();
refreshActive();
