const Renderer = (() => {
  const character = () => document.getElementById('character');
  const formLabel = () => document.getElementById('formLabel');
  function apply(state){
    const el = character();
    const form = window.FORMS.find(f=>f.id===state.form);
    el.className = `character form-${state.form}`;
    formLabel().textContent = `${form.name} Form`;
    el.style.setProperty('--coat', state.coatColor || '#f0dfce');
    el.style.setProperty('--skin', state.skinColor || '#d7a77d');
    el.style.setProperty('--orb', state.orbColor || '#8f6ee8');
    el.style.setProperty('--ribbon', state.ribbonColor || '#c7a1ff');
    document.querySelector('.marking-layer').className = `marking-layer visual-part ${state.markingClass||''}`;
    document.querySelector('.fantasy-layer').className = `fantasy-layer visual-part ${state.effectClass||''}`;
    document.querySelector('.orb').classList.toggle('show', state.orb !== 'none');
    document.querySelector('.pole').classList.toggle('show', state.pole !== 'none');
    document.querySelector('.ribbon').classList.toggle('show', state.ribbon !== 'none');
  }
  return { apply };
})();
