const state = {
  form: "Horse",
  coat: "Cream",
  skin: "Warm Ivory",
  marking: "None",
  effect: "None",
  orb: "None",
  pole: "None",
  ribbon: "None"
};

const defaults = { ...state };

const data = {
  form: [
    { name: "Horse", icon: "🐴", rarity: "✦" },
    { name: "Centaur", icon: "🎠", rarity: "✦" },
    { name: "Hippocampus", icon: "🌊", rarity: "✦✦" },
    { name: "Satyr", icon: "🦌", rarity: "✦✦" },
    { name: "Hippocampustaur", icon: "🧜‍♀️", rarity: "✦✦✦" }
  ],
  coat: [
    { name: "Cream", color: "#f2e4d2", rarity: "✦" },
    { name: "Bay", color: "#7a4a34", rarity: "✦" },
    { name: "Black", color: "#251f25", rarity: "✦" },
    { name: "Grey", color: "#a49b9b", rarity: "✦" },
    { name: "Palomino", color: "#e6c078", rarity: "✦" },
    { name: "Blue Roan", color: "#6f7f91", rarity: "✦✦" },
    { name: "Lavender Cream", color: "#d4b8f2", rarity: "✦✦" },
    { name: "Seafoam", color: "#97d8d2", rarity: "✦✦" },
    { name: "Rose Milk", color: "#eab0c7", rarity: "✦✦" },
    { name: "Void", color: "#10091c", rarity: "✦✦✦" }
  ],
  skin: [
    { name: "Warm Ivory", color: "#f2c8aa", rarity: "✦" },
    { name: "Peach", color: "#e9ad88", rarity: "✦" },
    { name: "Honey", color: "#c98555", rarity: "✦" },
    { name: "Golden Brown", color: "#a66a43", rarity: "✦" },
    { name: "Deep Brown", color: "#6f3f2b", rarity: "✦" },
    { name: "Rose Porcelain", color: "#f3c7cc", rarity: "✦✦" },
    { name: "Moonlit Lilac", color: "#c5afe6", rarity: "✦✦" },
    { name: "Seafoam Tint", color: "#9ed6cb", rarity: "✦✦" }
  ],
  marking: [
    { name: "None", icon: "—", className: "", rarity: "✦" },
    { name: "Pinto", icon: "◖", className: "pinto", rarity: "✦" },
    { name: "Appaloosa", icon: "●", className: "spots", rarity: "✦" },
    { name: "Star Appaloosa", icon: "✦", className: "stars", rarity: "✦✦" }
  ],
  effect: [
    { name: "None", icon: "—", className: "", rarity: "✦" },
    { name: "Stardust", icon: "✦", className: "stardust", rarity: "✦✦" },
    { name: "Aurora", icon: "☄", className: "aurora", rarity: "✦✦" },
    { name: "Petals", icon: "✿", className: "petals", rarity: "✦✦" }
  ],
  orb: [
    { name: "None", icon: "—", color: "", rarity: "✦" },
    { name: "Pearl Orb", icon: "⚪", color: "#f6d7e8", rarity: "✦" },
    { name: "Moon Orb", icon: "🌕", color: "#bcdcff", rarity: "✦✦" },
    { name: "Night Sky Orb", icon: "🌌", color: "#3b2a83", rarity: "✦✦✦" }
  ],
  pole: [
    { name: "None", icon: "—", rarity: "✦" },
    { name: "Brass Spiral", icon: "▥", rarity: "✦" },
    { name: "Silver Spiral", icon: "▥", rarity: "✦✦" },
    { name: "Crystal Pole", icon: "♢", rarity: "✦✦✦" }
  ],
  ribbon: [
    { name: "None", icon: "—", color: "", rarity: "✦" },
    { name: "Lavender Bow", icon: "🎀", color: "#b994ff", rarity: "✦" },
    { name: "Rose Bow", icon: "🎀", color: "#ef9fbd", rarity: "✦" },
    { name: "Ocean Bow", icon: "🎀", color: "#7fc9cf", rarity: "✦✦" }
  ]
};

const mountIds = {
  form: "formOptions",
  coat: "coatOptions",
  skin: "skinOptions",
  marking: "markingOptions",
  effect: "effectOptions",
  orb: "orbOptions",
  pole: "poleOptions",
  ribbon: "ribbonOptions"
};

const horsePreview = document.getElementById("horsePreview");
const selectionTray = document.getElementById("selectionTray");
const toast = document.getElementById("toast");

function createOptionCard(item, type) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "option-card";
  button.dataset.type = type;
  button.dataset.name = item.name;
  button.innerHTML = `
    <span class="rarity-badge">${item.rarity}</span>
    <span class="option-icon">${item.icon}</span>
    <span class="option-name">${item.name}</span>
  `;
  button.addEventListener("click", () => {
    state[type] = item.name;
    applyState();
  });
  return button;
}

function createSwatch(item, type = "coat") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "swatch";
  button.title = `${item.name} ${item.rarity}`;
  button.dataset.type = type;
  button.dataset.name = item.name;
  button.style.background = item.color;
  button.addEventListener("click", () => {
    state[type] = item.name;
    applyState();
  });
  return button;
}

function renderOptions() {
  Object.entries(mountIds).forEach(([type, id]) => {
    const mount = document.getElementById(id);
    mount.innerHTML = "";
    data[type].forEach(item => {
      mount.appendChild(type === "coat" || type === "skin" ? createSwatch(item, type) : createOptionCard(item, type));
    });
  });
}

function findItem(type, name) {
  return data[type].find(item => item.name === name);
}

function applyState() {
  const coat = findItem("coat", state.coat);
  const skin = findItem("skin", state.skin);
  const marking = findItem("marking", state.marking);
  const effect = findItem("effect", state.effect);
  const orb = findItem("orb", state.orb);
  const ribbon = findItem("ribbon", state.ribbon);

  horsePreview.style.setProperty("--coat", coat?.color || "#f2e4d2");
  horsePreview.style.setProperty("--skin", skin?.color || "#f2c8aa");
  horsePreview.style.setProperty("--orb", orb?.color || "#8763dd");
  horsePreview.dataset.form = state.form;

  const skinSection = document.getElementById("skinSection");
  const usesSkin = ["Centaur", "Satyr", "Hippocampustaur"].includes(state.form);
  skinSection.classList.toggle("hidden", !usesSkin);
  horsePreview.style.setProperty("--ribbon", ribbon?.color || "#b994ff");

  document.querySelector(".marking-layer").className = `marking-layer ${marking?.className || ""}`;
  document.querySelector(".effect-layer").className = `effect-layer ${effect?.className || ""}`;
  document.querySelector(".orb-layer").classList.toggle("show", state.orb !== "None");
  document.querySelector(".pole-layer").classList.toggle("show", state.pole !== "None");
  document.querySelector(".ribbon-layer").classList.toggle("show", state.ribbon !== "None");

  updateActiveButtons();
  renderSelectionTray();
}

function updateActiveButtons() {
  document.querySelectorAll("[data-type][data-name]").forEach(button => {
    const type = button.dataset.type;
    const name = button.dataset.name;
    button.classList.toggle("active", state[type] === name);
  });
}

function renderSelectionTray() {
  selectionTray.innerHTML = "";
  Object.entries(state).forEach(([key, value]) => {
    if (key === "skin" && !["Centaur", "Satyr", "Hippocampustaur"].includes(state.form)) return;
    const chip = document.createElement("div");
    chip.className = "selection-chip";
    chip.innerHTML = `<b>${key}</b><span>${value}</span>`;
    selectionTray.appendChild(chip);
  });
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 4500);
}

document.getElementById("randomizeBtn").addEventListener("click", () => {
  Object.keys(state).forEach(type => {
    state[type] = randomItem(data[type]).name;
  });
  if (!["Centaur", "Satyr", "Hippocampustaur"].includes(state.form)) {
    state.skin = defaults.skin;
  }
  applyState();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  Object.assign(state, defaults);
  applyState();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const summary = Object.entries(state)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  showToast(`Prototype export summary:\n\n${summary}`);
});

renderOptions();
applyState();
