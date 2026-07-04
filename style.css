const App = (() => {
  const state = { form:'horse', formName:'Horse', skin:'fair', skinName:'Fair', skinColor:'#e8c3a5', coat:'white', coatName:'White', coatColor:'#f4efe8', effectName:'None', effectClass:'', marking:'none', markingName:'None', markingClass:'', orb:'none', orbName:'None', orbColor:'', pole:'none', poleName:'None', ribbon:'none', ribbonName:'None', ribbonColor:'' };
  let currentRoom='forms';
  function usesSkin(){ return FORMS.find(f=>f.id===state.form)?.usesSkin; }
  function refresh(){ Renderer.apply(state); UI.renderTray(state); UI.renderRoom(currentRoom); }
  function selectForm(f){ state.form=f.id; state.formName=f.name; if(!f.usesSkin){state.skinName='Hidden'} refresh(); }
  function selectSkin(s){ state.skin=s.id; state.skinName=s.name; state.skinColor=s.color; refresh(); }
  function selectCoat(c){ if(c.color){state.coat=c.id; state.coatName=c.name; state.coatColor=c.color;} state.effectName=c.effect?c.name:'None'; state.effectClass=c.effect||''; refresh(); }
  function selectMarking(m){ state.marking=m.id; state.markingName=m.name; state.markingClass=m.className; refresh(); }
  function selectOrb(o){ state.orb=o.id; state.orbName=o.name; state.orbColor=o.color||''; refresh(); }
  function selectPole(p){ state.pole=p.id; state.poleName=p.name; refresh(); }
  function selectRibbon(r){ state.ribbon=r.id; state.ribbonName=r.name; state.ribbonColor=r.color||''; refresh(); }
  function reset(){ Object.assign(state,{form:'horse',formName:'Horse',skin:'fair',skinName:'Fair',skinColor:'#e8c3a5',coat:'white',coatName:'White',coatColor:'#f4efe8',effectName:'None',effectClass:'',marking:'none',markingName:'None',markingClass:'',orb:'none',orbName:'None',orbColor:'',pole:'none',poleName:'None',ribbon:'none',ribbonName:'None',ribbonColor:''}); refresh(); }
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
  function allCoats(){let out=[]; Object.values(COATS).forEach(r=>Object.values(r.categories).forEach(a=>out.push(...a))); return out;}
  function randomize(){ selectForm(pick(FORMS)); if(usesSkin()) selectSkin(pick(SKIN)); selectCoat(pick(allCoats())); selectMarking(pick(Object.values(MARKINGS).flat())); selectOrb(pick(ORBS)); selectPole(pick(POLES)); selectRibbon(pick(RIBBONS)); refresh(); }
  function init(){ document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>{currentRoom=b.dataset.room; UI.setRoom(currentRoom)}); document.getElementById('resetBtn').onclick=reset; document.getElementById('randomizeBtn').onclick=randomize; refresh(); UI.setRoom('forms'); }
  return { state, init, usesSkin, selectForm, selectSkin, selectCoat, selectMarking, selectOrb, selectPole, selectRibbon };
})();
window.addEventListener('DOMContentLoaded', App.init);
