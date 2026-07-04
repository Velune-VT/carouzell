const state = {
  form: 'Horse', coat: 'Cream', marking: 'None', effect: 'None', orb: 'None', pole: 'None', ribbon: 'None'
};

const data = {
  forms: [
    {name:'Horse', icon:'🐴', rarity:'✦'}, {name:'Centaur', icon:'🎠', rarity:'✦'},
    {name:'Hippocampus', icon:'🌊', rarity:'✦✦'}, {name:'Satyr', icon:'🐐', rarity:'✦✦'}
  ],
  coats: [
    {name:'Cream', color:'#f3e5d5', rarity:'✦'}, {name:'Bay', color:'#7a4a34', rarity:'✦'},
    {name:'Black', color:'#26212a', rarity:'✦'}, {name:'Grey', color:'#aaa0a0', rarity:'✦'},
    {name:'Palomino', color:'#e7c27b', rarity:'✦'}, {name:'Blue Roan', color:'#6f8093', rarity:'✦✦'},
    {name:'Lavender Cream', color:'#d2b7f0', rarity:'✦✦'}, {name:'Seafoam', color:'#98d8d2', rarity:'✦✦'},
    {name:'Rose Milk', color:'#e9adc5', rarity:'✦✦'}, {name:'Void', color:'#10091c', rarity:'✦✦✦'}
  ],
  markings: [
    {name:'None', icon:'—', className:'', rarity:'✦'}, {name:'Pinto', icon:'◖', className:'pinto', rarity:'✦'},
    {name:'Appaloosa Spots', icon:'●', className:'spots', rarity:'✦'}, {name:'Star Appaloosa', icon:'✦', className:'stars', rarity:'✦✦'}
  ],
  effects: [
    {name:'None', icon:'—', className:'', rarity:'✦'}, {name:'Stardust', icon:'✦', className:'stardust', rarity:'✦✦'},
    {name:'Aurora', icon:'☄', className:'aurora', rarity:'✦✦'}, {name:'Petals', icon:'✿', className:'petals', rarity:'✦✦'}
  ],
  orbs: [
    {name:'None', icon:'—', color:'', rarity:'✦'}, {name:'Pearl Orb', icon:'◉', color:'#f6d7e8', rarity:'✦'},
    {name:'Moon Orb', icon:'☾', color:'#bcdcff', rarity:'✦✦'}, {name:'Night Sky Orb', icon:'✦', color:'#3b2a83', rarity:'✦✦✦'}
  ],
  poles: [
    {name:'None', icon:'—', rarity:'✦'}, {name:'Brass Spiral', icon:'┃', rarity:'✦'},
    {name:'Silver Spiral', icon:'┃', rarity:'✦✦'}, {name:'Crystal Pole', icon:'♢', rarity:'✦✦✦'}
  ],
  ribbons: [
    {name:'None', icon:'—', color:'', rarity:'✦'}, {name:'Lavender Bow', icon:'🎀', color:'#b993ff', rarity:'✦'},
    {name:'Rose Bow', icon:'🎀', color:'#ef9fbd', rarity:'✦'}, {name:'Ocean Bow', icon:'🎀', color:'#7fc9cf', rarity:'✦✦'}
  ]
};

const horse = document.getElementById('horsePreview');
const selectionBar = document.getElementById('selectionBar');

function makeCard(item, type){
  const el = document.createElement('button');
  el.className = 'card';
  el.dataset.type = type; el.dataset.name = item.name;
  el.innerHTML = `<span class="badge">${item.rarity || '✦'}</span><div class="icon">${item.icon || '✧'}</div><div>${item.name}</div>`;
  el.addEventListener('click',()=>{ state[type]=item.name; applyState(); });
  return el;
}
function makeSwatch(item){
  const el = document.createElement('button');
  el.className = 'swatch'; el.title = `${item.name} ${item.rarity}`; el.dataset.type='coat'; el.dataset.name=item.name;
  el.style.background = item.color;
  el.addEventListener('click',()=>{ state.coat=item.name; applyState(); });
  return el;
}
function renderOptions(){
  data.forms.forEach(x=>formOptions.appendChild(makeCard(x,'form')));
  data.coats.forEach(x=>coatOptions.appendChild(makeSwatch(x)));
  data.markings.forEach(x=>markingOptions.appendChild(makeCard(x,'marking')));
  data.effects.forEach(x=>effectOptions.appendChild(makeCard(x,'effect')));
  data.orbs.forEach(x=>orbOptions.appendChild(makeCard(x,'orb')));
  data.poles.forEach(x=>poleOptions.appendChild(makeCard(x,'pole')));
  data.ribbons.forEach(x=>ribbonOptions.appendChild(makeCard(x,'ribbon')));
}
function applyState(){
  const coat = data.coats.find(x=>x.name===state.coat);
  const marking = data.markings.find(x=>x.name===state.marking);
  const effect = data.effects.find(x=>x.name===state.effect);
  const orb = data.orbs.find(x=>x.name===state.orb);
  const ribbon = data.ribbons.find(x=>x.name===state.ribbon);
  if(coat) horse.style.setProperty('--coat', coat.color);
  document.querySelector('.markings').className = `markings ${marking?.className || ''}`;
  document.querySelector('.effects').className = `effects ${effect?.className || ''}`;
  const orbLayer = document.querySelector('.orb');
  orbLayer.classList.toggle('show', state.orb !== 'None');
  if(orb?.color) horse.style.setProperty('--orb', orb.color);
  document.querySelector('.pole').classList.toggle('show', state.pole !== 'None');
  const ribbonLayer = document.querySelector('.ribbon');
  ribbonLayer.classList.toggle('show', state.ribbon !== 'None');
  if(ribbon?.color) horse.style.setProperty('--ribbon', ribbon.color);
  updateSelections(); updateActive();
}
function updateSelections(){
  selectionBar.innerHTML = Object.entries(state).map(([k,v])=>`<div class="selection"><b>${k}</b>${v}</div>`).join('');
}
function updateActive(){
  document.querySelectorAll('.card,.swatch').forEach(el=>el.classList.toggle('active', state[el.dataset.type] === el.dataset.name));
}
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
randomizeBtn.addEventListener('click',()=>{
  state.form=randomFrom(data.forms).name; state.coat=randomFrom(data.coats).name; state.marking=randomFrom(data.markings).name;
  state.effect=randomFrom(data.effects).name; state.orb=randomFrom(data.orbs).name; state.pole=randomFrom(data.poles).name; state.ribbon=randomFrom(data.ribbons).name; applyState();
});
resetBtn.addEventListener('click',()=>{ Object.assign(state,{form:'Horse',coat:'Cream',marking:'None',effect:'None',orb:'None',pole:'None',ribbon:'None'}); applyState(); });
exportBtn.addEventListener('click',()=>{
  const txt = 'Prototype export summary:\n\n' + Object.entries(state).map(([k,v])=>`${k}: ${v}`).join('\n');
  toast.textContent = txt; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),6000);
});
renderOptions(); applyState();
