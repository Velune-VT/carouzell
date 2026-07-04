const UI = (() => {
  const titles = {
    forms:['Forms','Choose the body type for your Carouzell.'],
    coats:['Coat Colors','Natural coats, fantasy integrations, and full fantasy themes.'],
    markings:['Markings','Paints, dapples, and appaloosa-style body patterns.'],
    orbs:['Soulmarbles','Choose the visible soulmarble/orb.'],
    poles:['Poles','Choose a starter carousel pole.'],
    ribbons:['Ribbons','Choose a basic starter ribbon.'],
    export:['Export','Review your current design selections.']
  };
  function setRoom(room){
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.room===room));
    document.getElementById('roomTitle').textContent=titles[room][0];
    document.getElementById('roomSubtitle').textContent=titles[room][1];
    renderRoom(room);
  }
  function card(item,onClick,active=false){
    const b=document.createElement('button'); b.className='trait-card'+(active?' active':'');
    b.innerHTML=`<span class="badge">${item.rarity||'✦'}</span><span class="icon">${item.icon||'✧'}</span><span class="name">${item.name}</span>`;
    b.onclick=onClick; return b;
  }
  function swatch(item,onClick,active=false){
    const b=document.createElement('button'); b.className='swatch-card'+(active?' active':'');
    b.innerHTML=`<div class="color-dot" style="background:${item.color}"></div><span>${item.name}</span>`; b.onclick=onClick; return b;
  }
  function group(title,content){const g=document.createElement('section');g.className='rarity-group';g.innerHTML=`<button class="rarity-title"><span>${title}</span><span>⌄</span></button>`;g.appendChild(content);return g;}
  function category(name,children,sw=false){const wrap=document.createElement('div');wrap.className='category-block';wrap.innerHTML=`<h3 class="category-title">${name}</h3>`;const grid=document.createElement('div');grid.className=sw?'swatch-grid':'trait-grid';children.forEach(c=>grid.appendChild(c));wrap.appendChild(grid);return wrap;}
  function renderRoom(room){
    const root=document.getElementById('traitContent'); root.innerHTML='';
    if(room==='forms'){
      const grid=document.createElement('div');grid.className='trait-grid';
      FORMS.forEach(f=>grid.appendChild(card(f,()=>App.selectForm(f),App.state.form===f.id))); root.appendChild(grid);
      if(App.usesSkin()) root.appendChild(renderSkin());
    }
    if(room==='coats') Object.entries(COATS).forEach(([rarity,data])=>{
      const content=document.createElement('div');
      Object.entries(data.categories).forEach(([cat,items])=>content.appendChild(category(cat,items.map(i=>swatch(i,()=>App.selectCoat(i),App.state.coat===i.id)),!!items[0].color)));
      root.appendChild(group(data.label,content));
    });
    if(room==='markings') Object.entries(MARKINGS).forEach(([cat,items])=>root.appendChild(category(cat,items.map(i=>card(i,()=>App.selectMarking(i),App.state.marking===i.id)))));
    if(room==='orbs') root.appendChild(category('Soulmarble Options',ORBS.map(i=>card(i,()=>App.selectOrb(i),App.state.orb===i.id))));
    if(room==='poles') root.appendChild(category('Pole Options',POLES.map(i=>card(i,()=>App.selectPole(i),App.state.pole===i.id))));
    if(room==='ribbons') root.appendChild(category('Ribbon Options',RIBBONS.map(i=>card(i,()=>App.selectRibbon(i),App.state.ribbon===i.id))));
    if(room==='export') root.appendChild(Exporter.panel(App.state));
  }
  function renderSkin(){return category('Skin Colors',SKIN.map(i=>swatch(i,()=>App.selectSkin(i),App.state.skin===i.id)),true)}
  function renderTray(state){
    const tray=document.getElementById('selectionTray'); tray.innerHTML='';
    const items=[['Form',state.formName],['Coat',state.coatName],['Integration',state.effectName],['Marking',state.markingName],['Orb',state.orbName],['Pole',state.poleName],['Ribbon',state.ribbonName]];
    if(App.usesSkin()) items.splice(1,0,['Skin',state.skinName]);
    items.forEach(([k,v])=>{const d=document.createElement('div');d.className='selection-pill';d.innerHTML=`<strong>${k}</strong>${v}`;tray.appendChild(d);});
  }
  return { setRoom, renderRoom, renderTray };
})();
