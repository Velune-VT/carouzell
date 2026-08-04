const UI = {
  pages: ['forms','coat','soul','workshop'],
  pageNumber: {title:0,forms:1,coat:2,soul:3,workshop:4},
  selectedPage:'forms',
  selectedForm:'horse',
  selectedPupil:'Human',
  state:{
    coat:'#d8b07a',hoof:'#3b2621',skin:'#d9b39b',blush:null,lips:null,eyeshadow:null,irisPrimary:'#f0c23b',irisSecondary:'#b995ff',
    lashPrimary:'#1f1729',lashSecondary:'#f6edf4',lash:'Default',
    zoom:1,panX:0,panY:0,idle:false,heterochromia:false,
    activeEye:'left',
    leftEye:{primary:'#f0c23b',gradient:'#f6e6a8'},
    rightEye:{primary:'#b995ff',gradient:'#7fc9cf'},
    selectedFin:'dorsal',
    soul:{
      shape:'oval',
      main:null,
      gradient:null,
      inside:0,
      wiring:'gold',
      wiringPattern:0,
      spirals:[null,null,null],
      spiralEnabled:[false,false,false],
      insidePrimary:null,
      insideSecondary:null,
      effect:0,
      ribbon:'bow',
      ribbonMain:null,
      ribbonGradient:null,
      ribbonPattern:0,
      ribbonSecond:null,
      ribbonThird:null,
      ribbonThirdAmount:50,
      activeCharm:1,
      charms:[{selection:0,color:null},{selection:0,color:null},{selection:0,color:null}],
      placement:'left'
    },
    workshop:{
      activeTackPart:null,
      tackByPart:{},
      material:'brass',
      customPaintFile:null,
      poleStyle:'straight',
      topperOpen:false,
      topper:null,
      bottom:null,
      trimDecor:0,
      trimColor:null,
      topperColor:null,
  bottomColor:null,
      rarityPanel:null,
      activePanel:null,
      extraTraits:[],
      garlands:[]
    },
    coatPattern:null,
    coatPatternIntensity:50,
    dapple:false,
    feathering:false,
    selectedLeg:'rear-left',
    hoofPreset:null,
    legMarkings:{
      'rear-left':null,
      'front-left':null,
      'front-right':null,
      'rear-right':null
    },
    facialMarkings:[],
    appaloosaPattern:0,
    paintPattern:0,
    fantasyMarking:0,
    coatEffect:0,
    fantasyAccents:[null,null,null],
    fantasyCoatColors:[null,null,null],
    fantasyMarkingColors:[null,null,null],
    customCoatFile:null,
    customMarkingFile:null,
    fins:{
      dorsal:{variant:1,mainColor:null,gradientColor:null},
      tail:{variant:1,mainColor:null,gradientColor:null},
      pelvic:{variant:1,mainColor:null,gradientColor:null},
      pectoral:{variant:1,mainColor:null,gradientColor:null},
      ventral:{variant:1,mainColor:null,gradientColor:null}
    }
  }
};
const FEATURES={
  horse:{skin:false,fins:false,hetero:false},
  centaur:{skin:true,fins:false,hetero:true},
  satyr:{skin:true,fins:false,hetero:true},
  hippocampus:{skin:false,fins:true,hetero:false},
  hippocampustaur:{skin:true,fins:true,hetero:true}
};
const RENDERABLE=new Set(['horse','centaur','satyr','hippocampus','hippocampustaur']);
const pageContent=document.getElementById('pageContent');
const pageNumber=document.getElementById('pageNumber');
const summaryForm=document.getElementById('summaryForm');
const unsupported=document.getElementById('unsupportedMessage');

function staticPage(src){pageContent.innerHTML=`<img class="page-static" src="${src}" alt="">`;}
function showTitle(){
  UI.selectedPage='title';
  document.querySelectorAll('.side-tab').forEach(b=>b.classList.remove('active'));
  pageNumber.textContent='';
  pageContent.innerHTML=`<div class="title-copy"><h1>Welcome, Traveler.</h1><p>Within these pages rests the collected knowledge of the Carouzells—living carousel spirits whose forms are shaped through craftsmanship, memory, and imagination.</p><p>Choose a workshop tab to begin assembling your Carouzell.</p><hr></div>`;
}
function showPage(id){
  UI.selectedPage=id;
  pageNumber.textContent=UI.pageNumber[id]??'';
  document.querySelectorAll('.side-tab').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  if(id==='forms') buildForms();
  if(id==='coat') buildCoatStudio();
  if(id==='soul') buildSoulAtelier();
  if(id==='workshop') buildToymakersWorkshop();
}

document.querySelectorAll('.side-tab').forEach(b=>b.onclick=()=>showPage(b.dataset.page));
document.getElementById('titlePageButton').onclick=showTitle;
document.getElementById('backPage').onclick=()=>cyclePage(-1);
document.getElementById('nextPage').onclick=()=>cyclePage(1);
function cyclePage(dir){const current=UI.selectedPage==='title'?-1:UI.pages.indexOf(UI.selectedPage);showPage(UI.pages[(current+dir+UI.pages.length)%UI.pages.length]);}

const pupilNames=['Horse','Human','Flower','Butterfly','Gear','Heart','Star','Diamond'];
const formNames=['horse','centaur','satyr','hippocampus','hippocampustaur'];
function formCard(form){
  const selected=UI.selectedForm===form?'-selected':'';
  return `<button class="form-card form-${form}" data-form="${form}" aria-label="${displayFormName(form)}">
    <img src="assets/ui/pages/forms/forms/${form}${selected}.png" alt="${displayFormName(form)}">
  </button>`;
}

function currentEyeColors(){
  if(!UI.state.heterochromia){
    return {primary:UI.state.irisPrimary,gradient:UI.state.irisSecondary};
  }
  return UI.state.activeEye==='left' ? UI.state.leftEye : UI.state.rightEye;
}
function eyeSideButton(side){
  const selected=UI.state.activeEye===side?'-selected':'';
  return `<button class="eye-side-btn eye-side-${side}" data-eye-side="${side}" aria-label="Edit ${side} eye">
    <img src="assets/ui/controls/buttons/${side}${selected}.png" alt="">
  </button>`;
}


const COAT_PATTERNS=['roan','pangare','brindle'];
const HOOF_COLORS=['1d1724','5a392b','9d9997','cfd3d9','f2c766','fff0df'];
const LEG_MARKINGS=['coronet','fetlock','pastern','sock','stocking','knee'];
const LEG_SIDES=['rear-left','front-left','front-right','rear-right'];
const FACIAL_MARKINGS=['star','strip','blaze','snip','crescent'];

function coatAsset(folder,name,selected=false){
  return `assets/ui/pages/coat-studio/${folder}/${name}${selected?'-selected':''}.png`;
}
function imageButton(className,dataName,value,src,label){
  return `<button class="${className}" data-${dataName}="${value}" aria-label="${label}">
    <img src="${src}" alt="">
  </button>`;
}
function framedColorInput(className,value,label){
  const active=value!==null && value!==undefined;
  const safeValue=active?value:'#ffffff';
  return `<label class="coat-color-wrap ${className}${active?'':' color-null'}">
    <input type="color" value="${safeValue}" aria-label="${label}">
  </label>`;
}
function coatRange(className,value,min=0,max=100,label='Intensity'){
  return `<label class="coat-range-wrap ${className}">
    <input type="range" min="${min}" max="${max}" value="${value}" aria-label="${label}">
    <img class="coat-range-thumb" src="assets/ui/controls/sliders/big-slider-thumb.png" alt="">
  </label>`;
}
function coatCheckbox(className,checked,label){
  return `<label class="coat-check-wrap ${className}">
    <input type="checkbox" ${checked?'checked':''} aria-label="${label}">
    <img class="coat-checkbox-check" src="assets/ui/controls/checkboxes/check.png" alt="" ${checked?'':'hidden'}>
  </label>`;
}
function fileControl(className,label){
  return `<div class="coat-file-control ${className}">
    <input type="file" accept="image/png" aria-label="${label}">
    <button type="button" class="coat-file-choose" aria-label="${label}">
      <img src="assets/ui/controls/buttons/choose-file-button.png" data-normal="assets/ui/controls/buttons/choose-file-button.png" data-hover="assets/ui/controls/buttons/choose-file-button-hover.png" alt="">
    </button>
    <button type="button" class="coat-file-clear" aria-label="Clear ${label}">
      <img src="assets/ui/controls/buttons/clear-button.png" data-normal="assets/ui/controls/buttons/clear-button.png" data-hover="assets/ui/controls/buttons/clear-button-hover.png" alt="">
    </button>
  </div>`;
}
function buildCoatStudio(){
  pageContent.innerHTML=`<div class="coat-studio-layer">
    <img class="coat-studio-art" src="assets/ui/pages/coat-studio/coat-studio-static.png" alt="">
    <img class="coat-studio-panel-overlay" src="assets/ui/pages/coat-studio/coat-studio-panel.png" alt="">

    ${framedColorInput('coat-main-color',UI.state.coat,'Main coat color')}

    <button class="coat-clear-pattern" type="button" aria-label="Clear coat pattern">
      <img src="assets/ui/controls/buttons/clear-button.png" alt="">
    </button>

    <div class="coat-pattern-buttons">
      ${COAT_PATTERNS.map(name=>imageButton(
        'coat-pattern-btn','coat-pattern',name,
        coatAsset('Coat Patterns',name,UI.state.coatPattern===name),
        name
      )).join('')}
    </div>
    ${coatRange('coat-pattern-intensity',UI.state.coatPatternIntensity,0,100,'Coat pattern intensity')}

    <div class="hoof-color-buttons">
      ${HOOF_COLORS.map(hex=>imageButton(
        'hoof-color-btn','hoof-color',`#${hex}`,
        coatAsset('Hoof Color',hex,UI.state.hoofPreset===`#${hex}`),
        `Hoof color #${hex}`
      )).join('')}
    </div>
    ${framedColorInput('hoof-custom-color',UI.state.hoof,'Custom hoof color')}

    ${coatCheckbox('feathering-toggle',UI.state.feathering,'Feathering')}

    <div class="leg-side-buttons">
      ${LEG_SIDES.map(side=>imageButton(
        'leg-side-btn','leg-side',side,
        `assets/ui/pages/coat-studio/leg/${side}${UI.state.selectedLeg===side?'-selected':''}.png`,
        side
      )).join('')}
    </div>

    <div class="leg-marking-buttons">
      ${LEG_MARKINGS.map(name=>imageButton(
        'leg-marking-btn','leg-marking',name,
        coatAsset('Leg Markings',name,UI.state.legMarkings[UI.state.selectedLeg]===name),
        name
      )).join('')}
    </div>

    ${coatCheckbox('dapple-toggle',UI.state.dapple,'Dapple coat')}

    ${coatRange('appaloosa-pattern-slider',UI.state.appaloosaPattern,0,8,'Appaloosa pattern')}
    ${coatRange('paint-pattern-slider',UI.state.paintPattern,0,8,'Paint pattern')}

    <div class="facial-marking-buttons">
      ${FACIAL_MARKINGS.map(name=>imageButton(
        'facial-marking-btn','facial-marking',name,
        coatAsset('Facial Markings',name,UI.state.facialMarkings.includes(name)),
        name
      )).join('')}
    </div>

    <button class="fantasy-clear ui-hit-area" type="button" aria-label="Clear fantasy traits"></button>
    ${coatRange('fantasy-marking-slider',UI.state.fantasyMarking,0,20,'Fantasy marking')}
    ${coatRange('coat-effect-slider',UI.state.coatEffect,0,20,'Coat effect')}

    <button class="fantasy-accents-reset fantasy-null-reset" type="button" aria-label="Clear accents and gradients">
      <img src="assets/ui/controls/buttons/x.png" alt="">
    </button>
    <div class="fantasy-accent-colors">
      ${UI.state.fantasyAccents.map((color,index)=>framedColorInput(`fantasy-accent-${index}`,color,`Fantasy accent ${index+1}`)).join('')}
    </div>

    <button class="fantasy-coats-reset fantasy-null-reset" type="button" aria-label="Clear fantasy coat colors">
      <img src="assets/ui/controls/buttons/x.png" alt="">
    </button>
    <div class="fantasy-coat-colors">
      ${UI.state.fantasyCoatColors.map((color,index)=>framedColorInput(`fantasy-coat-${index}`,color,`Fantasy coat color ${index+1}`)).join('')}
    </div>

    <button class="fantasy-markings-reset fantasy-null-reset" type="button" aria-label="Clear fantasy marking ombre">
      <img src="assets/ui/controls/buttons/x.png" alt="">
    </button>
    <div class="fantasy-marking-colors">
      ${UI.state.fantasyMarkingColors.map((color,index)=>framedColorInput(`fantasy-marking-color-${index}`,color,`Fantasy marking color ${index+1}`)).join('')}
    </div>

    ${fileControl('custom-coat-file','Choose custom coat PNG')}
    <button class="download-coat-fill" type="button" aria-label="Download PNG to color">
      <img src="assets/ui/controls/buttons/download-button.png" alt="">
    </button>

    ${fileControl('custom-marking-file','Choose custom marking PNG')}
  </div>`;
  bindCoatStudio();
  bindImageHover(pageContent);
  updateAllCoatRangeThumbs();
}
function updateCoatRangeThumb(wrap){
  const range=wrap?.querySelector('input[type="range"]');
  const thumb=wrap?.querySelector('.coat-range-thumb');
  if(!range||!thumb)return;
  const pct=(Number(range.value)-Number(range.min))/(Number(range.max)-Number(range.min));
  thumb.style.left=`calc(${pct*100}% - 7px)`;
}
function updateAllCoatRangeThumbs(){
  document.querySelectorAll('.coat-range-wrap').forEach(updateCoatRangeThumb);
}
function bindCoatStudio(){
  const coatInput=document.querySelector('.coat-main-color input');
  coatInput.oninput=()=>{UI.state.coat=coatInput.value;render();};

  document.querySelectorAll('.coat-pattern-btn').forEach(button=>{
    button.onclick=()=>{
      UI.state.coatPattern=button.dataset.coatPattern;
      buildCoatStudio();
      render();
    };
  });
  document.querySelector('.coat-clear-pattern').onclick=()=>{
    UI.state.coatPattern=null;
    UI.state.coatPatternIntensity=0;
    buildCoatStudio();
    render();
  };

  const intensity=document.querySelector('.coat-pattern-intensity input');
  intensity.oninput=()=>{UI.state.coatPatternIntensity=Number(intensity.value);updateCoatRangeThumb(intensity.closest('.coat-range-wrap'));render();};

  document.querySelectorAll('.hoof-color-btn').forEach(button=>{
    button.onclick=()=>{
      UI.state.hoofPreset=button.dataset.hoofColor;
      UI.state.hoof=button.dataset.hoofColor;
      buildCoatStudio();
      render();
    };
  });
  const hoofInput=document.querySelector('.hoof-custom-color input');
  hoofInput.oninput=()=>{
    UI.state.hoofPreset=null;
    UI.state.hoof=hoofInput.value;
    document.querySelectorAll('.hoof-color-btn').forEach(button=>{
      const hex=button.dataset.hoofColor.replace('#','');
      const img=button.querySelector('img');
      if(img)img.src=coatAsset('Hoof Color',hex,false);
    });
    render();
  };

  const feather=document.querySelector('.feathering-toggle input');
  feather.onchange=()=>{UI.state.feathering=feather.checked;buildCoatStudio();render();};

  document.querySelectorAll('.leg-side-btn').forEach(button=>{
    button.onclick=()=>{UI.state.selectedLeg=button.dataset.legSide;buildCoatStudio();};
  });
  document.querySelectorAll('.leg-marking-btn').forEach(button=>{
    button.onclick=()=>{
      const leg=UI.state.selectedLeg;
      const marking=button.dataset.legMarking;
      UI.state.legMarkings[leg]=UI.state.legMarkings[leg]===marking?null:marking;
      buildCoatStudio();
      render();
    };
  });

  const dapple=document.querySelector('.dapple-toggle input');
  dapple.onchange=()=>{UI.state.dapple=dapple.checked;buildCoatStudio();render();};

  const rangeBindings=[
    ['.appaloosa-pattern-slider','appaloosaPattern'],
    ['.paint-pattern-slider','paintPattern'],
    ['.fantasy-marking-slider','fantasyMarking'],
    ['.coat-effect-slider','coatEffect']
  ];
  rangeBindings.forEach(([selector,key])=>{
    const input=document.querySelector(`${selector} input`);
    input.oninput=()=>{
      UI.state[key]=Number(input.value);
      updateCoatRangeThumb(input.closest('.coat-range-wrap'));
      render();
    };
  });

  document.querySelectorAll('.facial-marking-btn').forEach(button=>{
    button.onclick=()=>{
      const marking=button.dataset.facialMarking;
      const index=UI.state.facialMarkings.indexOf(marking);

      if(index>=0)UI.state.facialMarkings.splice(index,1);
      else UI.state.facialMarkings.push(marking);

      buildCoatStudio();
      render();
    };
  });

  document.querySelector('.fantasy-clear').onclick=()=>{
    UI.state.fantasyMarking=0;
    UI.state.coatEffect=0;
    buildCoatStudio();
    render();
  };

  UI.state.fantasyAccents.forEach((_,index)=>{
    const input=document.querySelector(`.fantasy-accent-${index} input`);
    input.oninput=()=>{
      UI.state.fantasyAccents[index]=input.value;
      input.closest('.coat-color-wrap')?.classList.remove('color-null');
      render();
    };
  });
  UI.state.fantasyCoatColors.forEach((_,index)=>{
    const input=document.querySelector(`.fantasy-coat-${index} input`);
    input.oninput=()=>{
      UI.state.fantasyCoatColors[index]=input.value;
      input.closest('.coat-color-wrap')?.classList.remove('color-null');
      render();
    };
  });
  UI.state.fantasyMarkingColors.forEach((_,index)=>{
    const input=document.querySelector(`.fantasy-marking-color-${index} input`);
    input.oninput=()=>{
      UI.state.fantasyMarkingColors[index]=input.value;
      input.closest('.coat-color-wrap')?.classList.remove('color-null');
      render();
    };
  });

  document.querySelector('.fantasy-accents-reset').onclick=()=>{
    UI.state.fantasyAccents=[null,null,null];
    buildCoatStudio();
    render();
  };
  document.querySelector('.fantasy-coats-reset').onclick=()=>{
    UI.state.fantasyCoatColors=[null,null,null];
    buildCoatStudio();
    render();
  };
  document.querySelector('.fantasy-markings-reset').onclick=()=>{
    UI.state.fantasyMarkingColors=[null,null,null];
    buildCoatStudio();
    render();
  };

  document.querySelectorAll('.coat-file-control').forEach(control=>{
    const input=control.querySelector('input[type="file"]');
    control.querySelector('.coat-file-choose').onclick=()=>input.click();
    input.onchange=()=>{
      const key=control.classList.contains('custom-coat-file')?'customCoatFile':'customMarkingFile';
      UI.state[key]=input.files?.[0]||null;
    };
    control.querySelector('.coat-file-clear').onclick=()=>{
      input.value='';
      const key=control.classList.contains('custom-coat-file')?'customCoatFile':'customMarkingFile';
      UI.state[key]=null;
    };
  });

  document.querySelector('.download-coat-fill').onclick=downloadSelectedFormFill;
}
function downloadSelectedFormFill(){
  const config=FORM_CONFIGS[UI.selectedForm];
  if(!config)return;
  const fillEntry=config.body.find(([,tintKey])=>tintKey==='coat');
  if(!fillEntry)return;
  const src=formAssetPath(config,fillEntry[0]);
  const link=document.createElement('a');
  link.href=src;
  link.target='_blank';
  link.rel='noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}



const SOUL_TORSO_FORMS=new Set(['centaur','satyr','hippocampustaur']);
const SOUL_SHAPES=['oval','sphere','cube','teardrop','pyramid','star','heart'];
const SOUL_WIRING=['gold','silver','brass','rose-gold','black'];
const SOUL_RIBBONS=['bow','ribbon','tassel','feather','flower','drapery','butterfly','fairy','wing'];

function soulAssetButton(folder,name,isSelected,className,dataName){
  return `<button type="button" class="${className}" data-${dataName}="${name}" aria-label="${name}">
    <img src="assets/ui/pages/soul-atelier/${folder}/${name}${isSelected?'-selected':''}.png" alt="">
  </button>`;
}

function soulColorInput(className,value,label){
  const isNull=value==null;
  return `<label class="soul-color ${className} ${isNull?'is-null':''}">
    <input type="color" value="${value||'#ffffff'}" aria-label="${label}">
  </label>`;
}

function soulSlider(className,value,max,label){
  return `<label class="soul-slider ${className}">
    <input type="range" min="0" max="${max}" step="1" value="${value}" aria-label="${label}">
    <img class="soul-slider-thumb" src="assets/ui/controls/sliders/big-slider-thumb.png" alt="">
  </label>`;
}

function soulFileButtons(className,label){
  return `<div class="soul-file ${className}">
    <input type="file" accept="image/png" aria-label="${label}">
    <button type="button" class="soul-file-choose" aria-label="${label}">
      <img src="assets/ui/controls/buttons/choose-file-button.png"
           data-normal="assets/ui/controls/buttons/choose-file-button.png"
           data-hover="assets/ui/controls/buttons/choose-file-button-hover.png" alt="">
    </button>
    <button type="button" class="soul-file-clear" aria-label="Clear ${label}">
      <img src="assets/ui/controls/buttons/clear-button.png"
           data-normal="assets/ui/controls/buttons/clear-button.png"
           data-hover="assets/ui/controls/buttons/clear-button-hover.png" alt="">
    </button>
  </div>`;
}

function buildSoulAtelier(){
  const s=UI.state.soul;
  const showPlacement=SOUL_TORSO_FORMS.has(UI.selectedForm);

  pageContent.innerHTML=`<div class="soul-page">
    <img class="soul-static" src="assets/ui/pages/soul-atelier/soul-atelier-static.png" alt="">
    <img class="soul-panel" src="assets/ui/pages/soul-atelier/soul-atelier-panel.png" alt="">

    <div class="soul-shapes">
      ${SOUL_SHAPES.map(name=>soulAssetButton('Soulmarble Shape',name,s.shape===name,'soul-shape','soul-shape')).join('')}
    </div>

    ${soulColorInput('soul-main',s.main,'Soulmarble main color')}
    ${soulColorInput('soul-gradient',s.gradient,'Soulmarble gradient color')}
    ${soulSlider('soul-inside',s.inside,10,'Inside marble')}
    ${soulColorInput('inside-primary',s.insidePrimary,'Inside marble primary color')}
    ${soulFileButtons('soul-decor-file','Choose custom marble decor')}

    ${soulSlider('soul-wiring-pattern',s.wiringPattern,10,'Wiring pattern')}
    <div class="soul-wiring-buttons">
      ${SOUL_WIRING.map(name=>soulAssetButton('Wiring',name,s.wiring===name,'soul-wiring','soul-wiring')).join('')}
    </div>

    <div class="soul-spirals">
      ${s.spirals.map((color,index)=>`<div class="spiral-option">
        <label class="spiral-enable" aria-label="Enable spiral ${index+1}">
          <input type="checkbox" data-spiral-enable="${index}" ${s.spiralEnabled[index]?'checked':''}>
          <img class="spiral-checkmark" src="assets/ui/controls/checkboxes/check.png" alt="" ${s.spiralEnabled[index]?'':'hidden'}>
        </label>
        <label class="spiral-color-picker">
          <input type="color" value="${color||'#ffffff'}" data-null="${color==null}" data-spiral-index="${index}" aria-label="Spiral ${index+1} color">
        </label>
      </div>`).join('')}
    </div>

    ${soulSlider('soul-effect',s.effect,10,'Soul effect')}
    ${soulFileButtons('soul-effect-file','Choose custom soul effect')}

    <div class="soul-display">
      <img src="assets/ui/pages/soul-atelier/display-panel.png" alt="">
      <canvas id="soulPreview" width="606" height="480"></canvas>
    </div>

    <div class="soul-ribbons">
      ${SOUL_RIBBONS.map(name=>soulAssetButton('Ribbon Shape',name,s.ribbon===name,'soul-ribbon','soul-ribbon')).join('')}
    </div>

    ${soulColorInput('ribbon-main',s.ribbonMain,'Ribbon main color')}
    ${soulColorInput('ribbon-gradient',s.ribbonGradient,'Ribbon gradient color')}
    ${soulFileButtons('ribbon-texture-file','Choose ribbon texture')}
    ${soulSlider('ribbon-pattern',s.ribbonPattern,10,'Ribbon pattern')}
    ${soulColorInput('ribbon-second',s.ribbonSecond,'Ribbon second color')}
    ${soulColorInput('ribbon-third',s.ribbonThird,'Ribbon third color')}
    ${soulSlider('ribbon-third-slider',s.ribbonThirdAmount,100,'Third color amount')}

    <div class="soul-charm-slots">
      ${[1,2,3].map(n=>`<button type="button" class="soul-charm-slot" data-charm="${n}">
        <img src="assets/ui/controls/buttons/${n}${s.activeCharm===n?'-selected':''}.png" alt="">
      </button>`).join('')}
    </div>
    ${soulSlider('soul-charm-slider',s.charms[s.activeCharm-1].selection,20,'Charm selection')}
    ${soulColorInput('soul-charm-color',s.charms[s.activeCharm-1].color,`Charm ${s.activeCharm} color`)}
    ${soulFileButtons('soul-charm-file','Choose custom charm')}

    ${showPlacement?`<div class="soul-placement">
      <img class="soul-placement-panel" src="assets/ui/pages/soul-atelier/placement-panel.png" alt="">
      ${['left','right'].map(side=>`<button type="button" class="soul-placement-choice" data-placement="${side}">
        <img src="assets/ui/controls/buttons/${side}${s.placement===side?'-selected':''}.png" alt="">
      </button>`).join('')}
    </div>`:''}
  </div>`;

  bindSoulAtelier();
  updateSoulThumbs();
  drawSoulPreview();
}

function bindSoulAtelier(){
  const s=UI.state.soul;

  document.querySelectorAll('.soul-shape').forEach(button=>{
    button.onclick=()=>{s.shape=button.dataset.soulShape;buildSoulAtelier();};
  });

  document.querySelectorAll('.soul-wiring').forEach(button=>{
    button.onclick=()=>{s.wiring=button.dataset.soulWiring;buildSoulAtelier();};
  });

  document.querySelectorAll('.soul-ribbon').forEach(button=>{
    button.onclick=()=>{s.ribbon=button.dataset.soulRibbon;buildSoulAtelier();};
  });

  const colorBindings=[
    ['.soul-main input','main'],
    ['.soul-gradient input','gradient'],
    ['.inside-primary input','insidePrimary'],
    ['.inside-secondary input','insideSecondary'],
    ['.ribbon-main input','ribbonMain'],
    ['.ribbon-gradient input','ribbonGradient'],
    ['.ribbon-second input','ribbonSecond'],
    ['.ribbon-third input','ribbonThird']
  ];
  colorBindings.forEach(([selector,key])=>{
    const input=document.querySelector(selector);
    if(input)input.oninput=()=>{s[key]=input.value;input.closest('.soul-color')?.classList.remove('is-null');drawSoulPreview();};
  });

  document.querySelectorAll('.spiral-color-picker input').forEach(input=>{
    input.oninput=()=>{
      s.spirals[Number(input.dataset.spiralIndex)]=input.value;
      input.dataset.null='false';
      drawSoulPreview();
    };
  });

  document.querySelectorAll('.spiral-enable input').forEach(input=>{
    input.onchange=()=>{
      const index=Number(input.dataset.spiralEnable);
      s.spiralEnabled[index]=input.checked;
      const check=input.parentElement.querySelector('.spiral-checkmark');
      if(check)check.hidden=!input.checked;
      drawSoulPreview();
    };
  });

  const sliderBindings=[
    ['.soul-inside input','inside'],
    ['.soul-wiring-pattern input','wiringPattern'],
    ['.soul-effect input','effect'],
    ['.ribbon-pattern input','ribbonPattern'],
    ['.ribbon-third-slider input','ribbonThirdAmount']
  ];
  sliderBindings.forEach(([selector,key])=>{
    const input=document.querySelector(selector);
    if(input)input.oninput=()=>{s[key]=Number(input.value);updateSoulThumbs();drawSoulPreview();};
  });

  const charmSlider=document.querySelector('.soul-charm-slider input');
  if(charmSlider)charmSlider.oninput=()=>{
    s.charms[s.activeCharm-1].selection=Number(charmSlider.value);
    updateSoulThumbs();
    drawSoulPreview();
  };

  const charmColor=document.querySelector('.soul-charm-color input');
  if(charmColor)charmColor.oninput=()=>{
    s.charms[s.activeCharm-1].color=charmColor.value;
    charmColor.closest('.soul-color')?.classList.remove('is-null');
    drawSoulPreview();
  };

  document.querySelectorAll('.soul-charm-slot').forEach(button=>{
    button.onclick=()=>{s.activeCharm=Number(button.dataset.charm);buildSoulAtelier();};
  });

  document.querySelectorAll('.soul-placement-choice').forEach(button=>{
    button.onclick=()=>{s.placement=button.dataset.placement;buildSoulAtelier();};
  });

  document.querySelectorAll('.soul-file').forEach(group=>{
    const input=group.querySelector('input[type="file"]');
    const choose=group.querySelector('.soul-file-choose');
    const clear=group.querySelector('.soul-file-clear');
    choose.onclick=()=>input.click();
    clear.onclick=()=>{input.value='';};
  });

  bindImageHover(pageContent);
}

function bindImageHover(scope=document){
  scope.querySelectorAll('img[data-hover][data-normal]').forEach(img=>{
    const button=img.closest('button');
    if(!button)return;
    button.addEventListener('mouseenter',()=>{img.src=img.dataset.hover;});
    button.addEventListener('mouseleave',()=>{img.src=img.dataset.normal;});
    button.addEventListener('focus',()=>{img.src=img.dataset.hover;});
    button.addEventListener('blur',()=>{img.src=img.dataset.normal;});
  });
}

function updateSoulThumbs(){
  document.querySelectorAll('.soul-slider').forEach(wrapper=>{
    const input=wrapper.querySelector('input');
    const thumb=wrapper.querySelector('.soul-slider-thumb');
    if(!input||!thumb)return;
    const pct=(Number(input.value)-Number(input.min))/(Number(input.max)-Number(input.min));
    thumb.style.left=`calc(${pct*100}% - 7px)`;
  });
}

function drawSoulPreview(){
  const canvas=document.getElementById('soulPreview');
  if(!canvas)return;
  const s=UI.state.soul;
  const c=canvas.getContext('2d');
  c.clearRect(0,0,canvas.width,canvas.height);
  c.imageSmoothingEnabled=true;
  c.imageSmoothingQuality='high';

  const cx=canvas.width/2;
  const cy=canvas.height/2-20;
  const g=c.createRadialGradient(cx-45,cy-55,10,cx,cy,145);
  g.addColorStop(0,s.gradient);
  g.addColorStop(1,s.main);

  c.save();
  c.fillStyle=g;
  c.strokeStyle='#e8d6b9';
  c.lineWidth=8;
  c.beginPath();

  if(s.shape==='sphere'){
    c.arc(cx,cy,120,0,Math.PI*2);
  }else if(s.shape==='cube'){
    c.rect(cx-110,cy-110,220,220);
  }else if(s.shape==='pyramid'){
    c.moveTo(cx,cy-135);c.lineTo(cx+130,cy+105);c.lineTo(cx-130,cy+105);c.closePath();
  }else if(s.shape==='teardrop'){
    c.moveTo(cx,cy-145);
    c.bezierCurveTo(cx+145,cy+10,cx+90,cy+135,cx,cy+135);
    c.bezierCurveTo(cx-90,cy+135,cx-145,cy+10,cx,cy-145);
    c.closePath();
  }else if(s.shape==='heart'){
    c.moveTo(cx,cy+115);
    c.bezierCurveTo(cx-165,cy+5,cx-100,cy-135,cx,cy-55);
    c.bezierCurveTo(cx+100,cy-135,cx+165,cy+5,cx,cy+115);
    c.closePath();
  }else if(s.shape==='star'){
    for(let i=0;i<10;i++){
      const angle=-Math.PI/2+i*Math.PI/5;
      const radius=i%2?55:125;
      const x=cx+Math.cos(angle)*radius;
      const y=cy+Math.sin(angle)*radius;
      if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
    }
    c.closePath();
  }else{
    c.ellipse(cx,cy,100,135,0,0,Math.PI*2);
  }

  c.fill();
  c.stroke();
  c.restore();

  c.save();
  c.strokeStyle={
    gold:'#d8b35a',
    silver:'#cfd3d9',
    brass:'#9a7440',
    'rose-gold':'#c88d82',
    black:'#241d2b'
  }[s.wiring]||'#d8b35a';
  c.lineWidth=7;
  c.beginPath();
  c.arc(cx,cy,148,0,Math.PI*2);
  c.stroke();
  c.restore();

  // Preview enabled spiral colors.
  const enabledSpirals=s.spirals.filter((_,index)=>s.spiralEnabled[index]);
  enabledSpirals.forEach((color,index)=>{
    c.save();
    c.strokeStyle=color;
    c.lineWidth=5;
    c.beginPath();
    c.arc(cx,cy,75+index*18,Math.PI*.15,Math.PI*1.85);
    c.stroke();
    c.restore();
  });

  c.fillStyle='#f6edf4';
  c.textAlign='center';
  c.font='italic 28px serif';
  c.fillText(s.ribbon,cx,cy+185);
  c.font='20px serif';
  c.fillText(`Charms: ${s.charms.filter(v=>v.selection>0).length}`,cx,cy+218);
}


const TACK_PIECES=['bridle','saddle','breast-collar','saddle-pad','barding','torso-armor','leg-armor'];
const TACK_BY_FORM={
  horse:['bridle','breast-collar','saddle-pad','saddle','barding','leg-armor'],
  hippocampus:['bridle','breast-collar','saddle-pad','saddle','leg-armor'],
  centaur:['breast-collar','saddle-pad','saddle','barding','torso-armor','leg-armor'],
  satyr:['torso-armor','leg-armor'],
  hippocampustaur:['breast-collar','saddle-pad','saddle','torso-armor','leg-armor']
};
const POLE_MATERIALS=['brass','silver','painted-wood','crystal'];
const POLE_STYLES=['none','straight','spiral','flower','braided','vine','floating-rings','crystal'];
const GARLAND_TYPES=['fairy-lights','flower-garland','pearl-garland','ivy-garland','ribbons','lace','star-garland'];
const EXTRA_TRAITS={
  common:['carvings','hair-decor'],
  rare:['body-gems','marble-cracks','body-cracks','prosthetic','alloy-decor','tail-type','iridescence','marble-shards'],
  mythical:['crystal-growths','crystal-tail','elemental','feather-tail','glow','horns','halo','wings']
};

function workshopImageButton(folder,name,selected,className,dataName){
  return `<button type="button" class="${className}" data-${dataName}="${name}" aria-label="${name}">
    <img src="assets/ui/pages/toymakers-workshop/${folder}/${name}${selected?'-selected':''}.png" alt="">
  </button>`;
}
function workshopHoverButton(className,normal,hover,label){
  return `<button type="button" class="${className} workshop-hover" aria-label="${label}">
    <img src="${normal}" data-normal="${normal}" data-hover="${hover}" alt="">
  </button>`;
}
function buildToymakersWorkshop(){
  const w=UI.state.workshop;
  const rarityMap={common:'✦',rare:'✦✦',mythical:'✦✦✦'};
  const availableTack=TACK_BY_FORM[UI.selectedForm]||[];
  const activeTack=w.activeTackPart;
  const activeTackState=activeTack?(w.tackByPart[activeTack]||{set:null,main:null,accent:null}):null;

  pageContent.innerHTML=`<div class="workshop-page">
    <img class="workshop-static" src="assets/ui/pages/toymakers-workshop/toymakers-workshop-static.png" alt="">
    <img class="workshop-panel-overlay" src="assets/ui/pages/toymakers-workshop/toymakers-workshop-panel.png" alt="">

    <div class="tack-piece-grid">
      ${availableTack.map(name=>workshopImageButton('tack',name,activeTack===name,'tack-piece-btn','tack-piece')).join('')}
    </div>

    <div class="tack-set-grid">
      ${[1,2,3,4,5,6].map(n=>`<button type="button" class="tack-set-btn" data-tack-set="${n}" ${activeTack?'':'disabled'}>
        <img src="assets/ui/pages/toymakers-workshop/tack/set-${n}${activeTackState?.set===n?'-selected':''}.png" alt="">
      </button>`).join('')}
    </div>

    ${workshopHoverButton('download-design-btn',
      'assets/ui/controls/buttons/download-button.png',
      'assets/ui/controls/buttons/download-button.png',
      'Download to design')}
    <div class="custom-tack-file">
      <input type="file" accept="image/png">
      ${workshopHoverButton('custom-tack-choose','assets/ui/controls/buttons/choose-file-button.png','assets/ui/controls/buttons/choose-file-button-hover.png','Choose custom tack')}
      ${workshopHoverButton('custom-tack-clear','assets/ui/controls/buttons/clear-button.png','assets/ui/controls/buttons/clear-button-hover.png','Clear custom tack')}
    </div>
    <div class="tack-current-selection">${activeTack?activeTack.replaceAll('-',' '):'None'}${activeTackState?.set?` · Set ${activeTackState.set}`:''}</div>
    <label class="tack-color-main"><input type="color" value="${activeTackState?.main||'#ffffff'}" data-null="${activeTackState?.main==null}" ${activeTack?'':'disabled'}></label>
    <label class="tack-color-accent"><input type="color" value="${activeTackState?.accent||'#ffffff'}" data-null="${activeTackState?.accent==null}" ${activeTack?'':'disabled'}></label>

    <div class="pole-style-grid">
      ${POLE_STYLES.map(name=>workshopImageButton('pole',name,w.poleStyle===name,'pole-style-btn','pole-style')).join('')}
    </div>

    <div class="pole-material-grid">
      ${POLE_MATERIALS.map(name=>workshopImageButton('material',name,w.material===name,'pole-material-btn','pole-material')).join('')}
    </div>

    ${w.material==='painted-wood'?`<div class="custom-paint-zone">
      <img src="assets/ui/pages/toymakers-workshop/custom-paint-panel.png" alt="">
      <input type="file" accept="image/png">
      ${workshopHoverButton('custom-paint-choose','assets/ui/controls/buttons/choose-file-button.png','assets/ui/controls/buttons/choose-file-button-hover.png','Choose custom paint')}
      ${workshopHoverButton('custom-paint-clear','assets/ui/controls/buttons/clear-button.png','assets/ui/controls/buttons/clear-button-hover.png','Clear custom paint')}
    </div>`:''}

    <div class="pole-top-bottom">
      <label class="trim-color-picker">
        <input type="color" value="${w.trimColor||'#ffffff'}"
          data-null="${w.trimColor==null}" aria-label="Trim decor color">
      </label>
      <label class="trim-slider"><input type="range" min="0" max="10" value="${w.trimDecor}"><img src="assets/ui/controls/sliders/big-slider-thumb.png" alt=""></label>
      <div class="trim-custom-file"><input type="file" accept="image/png">${workshopHoverButton('trim-choose','assets/ui/controls/buttons/choose-file-button.png','assets/ui/controls/buttons/choose-file-button-hover.png','Choose trim decor')}${workshopHoverButton('trim-clear','assets/ui/controls/buttons/clear-button.png','assets/ui/controls/buttons/clear-button-hover.png','Clear trim decor')}</div>
      <button type="button" class="pole-expand-btn workshop-hover" aria-label="Toggle topper and bottom">
        <img src="assets/ui/controls/buttons/down-button.png"
             data-normal="assets/ui/controls/buttons/down-button.png"
             data-hover="assets/ui/controls/buttons/down-button-hover.png" alt="">
      </button>
    </div>

    <div class="pole-preview">
      <img src="assets/ui/pages/toymakers-workshop/display-panel.png" alt="">
      <canvas id="polePreview" width="572" height="942"></canvas>
    </div>

    <div class="rarity-buttons">
      ${['common','rare','mythical'].map(key=>{
        const sym=rarityMap[key];
        return `<button type="button" class="rarity-btn" data-rarity="${key}">
          <img src="assets/ui/pages/toymakers-workshop/extra traits/${sym}${w.rarityPanel===key?'-selected':''}.png" alt="">
        </button>`;
      }).join('')}
    </div>

    <div class="selected-traits-list">
      ${w.extraTraits.slice(0,5).map(name=>`<div class="selection-pill trait-selection">
        <img class="selection-art" src="assets/ui/pages/toymakers-workshop/extra traits/${name}.png" alt="">
        <button type="button" data-remove-trait="${name}" aria-label="Remove ${name}">
          <img src="assets/ui/controls/buttons/x.png" alt="">
        </button>
      </div>`).join('')}
    </div>

    <div class="garland-list">
      ${Array.from({length:4},(_,index)=>{const g=w.garlands[index];return g?`<div class="garland-selection">
        <img class="selection-art" src="assets/ui/pages/toymakers-workshop/garlands/${g.type}.png" alt="">
        <label class="garland-color"><input type="color" value="${g.color||'#ffffff'}" data-null="${g.color==null}" data-garland-color="${index}"><img src="assets/ui/pages/toymakers-workshop/garlands/color-picker-border.png" alt=""></label>
        <button type="button" data-remove-garland="${index}" aria-label="Remove garland"><img src="assets/ui/controls/buttons/x.png" alt=""></button>
      </div>`:`<div class="garland-selection garland-empty"></div>`}).join('')}
    </div>

    ${workshopHoverButton('add-garland-btn',
      'assets/ui/pages/toymakers-workshop/garlands/add-decor.png',
      'assets/ui/pages/toymakers-workshop/garlands/add-decor-hover.png',
      'Add decoration')}

    ${w.activePanel?`<div class="workshop-conditional-panel">
      <img class="conditional-panel-art" src="assets/ui/pages/toymakers-workshop/conditional panels/${w.activePanel==='poles'?'poles.png':w.activePanel==='garlands'?'garlands.png':rarityMap[w.activePanel]+'.png'}" alt="">
      ${['common','rare','mythical'].includes(w.activePanel)?`<div class="rarity-trait-list">
        ${EXTRA_TRAITS[w.activePanel].map(name=>`<label class="conditional-checkbox trait-checkbox" data-extra-trait="${name}">
          <input type="checkbox" ${w.extraTraits.includes(name)?'checked':''}>
          <img class="conditional-check" src="assets/ui/controls/checkboxes/check.png" alt="" ${w.extraTraits.includes(name)?'':'hidden'}>
        </label>`).join('')}
      </div>`:''}
      ${w.activePanel==='garlands'?`<div class="garland-checkbox-list">
        ${GARLAND_TYPES.map(name=>`<label class="conditional-checkbox garland-checkbox" data-garland-type="${name}">
          <input type="checkbox" ${w.garlands.some(g=>g.type===name)?'checked':''}>
          <img class="conditional-check" src="assets/ui/controls/checkboxes/check.png" alt="" ${w.garlands.some(g=>g.type===name)?'':'hidden'}>
        </label>`).join('')}
      </div><div class="garland-custom-file"><input type="file" accept="image/png">${workshopHoverButton('garland-custom-choose','assets/ui/controls/buttons/choose-file-button.png','assets/ui/controls/buttons/choose-file-button-hover.png','Choose custom garland')}${workshopHoverButton('garland-custom-clear','assets/ui/controls/buttons/clear-button.png','assets/ui/controls/buttons/clear-button-hover.png','Clear custom garland')}</div>`:''}
      ${w.activePanel==='poles'?`<img class="pole-panel-overlay" src="assets/ui/pages/toymakers-workshop/conditional panels/pole-panel.png" alt=""><div class="pole-choice-columns"><div class="pole-topper-options"></div><div class="pole-bottom-options"></div><label class="topper-color-picker">
          <input type="color" value="${w.topperColor||'#ffffff'}" data-null="${w.topperColor==null}" aria-label="Pole topper color">
        </label>
        <label class="bottom-color-picker">
          <input type="color" value="${w.bottomColor||'#ffffff'}" data-null="${w.bottomColor==null}" aria-label="Pole bottom color">
        </label></div>`:''}
    </div>`:''}  </div>`;

  bindToymakersWorkshop();
  drawPolePreview();
}

function bindToymakersWorkshop(){
  const w=UI.state.workshop;
  bindImageHover(pageContent);

  document.querySelectorAll('.tack-piece-btn').forEach(button=>button.onclick=()=>{
    const name=button.dataset.tackPiece;
    w.activeTackPart=w.activeTackPart===name?null:name;
    if(w.activeTackPart && !w.tackByPart[w.activeTackPart])w.tackByPart[w.activeTackPart]={set:null,main:null,accent:null};
    buildToymakersWorkshop();
  });
  document.querySelectorAll('.tack-set-btn').forEach(button=>button.onclick=()=>{
    if(!w.activeTackPart)return;
    const state=w.tackByPart[w.activeTackPart]||(w.tackByPart[w.activeTackPart]={set:null,main:null,accent:null});
    const next=Number(button.dataset.tackSet);
    state.set=state.set===next?null:next;
    buildToymakersWorkshop();
  });
  const tackMain=document.querySelector('.tack-color-main input');
  const tackAccent=document.querySelector('.tack-color-accent input');
  if(tackMain)tackMain.oninput=()=>{if(w.activeTackPart){w.tackByPart[w.activeTackPart].main=tackMain.value;}};
  if(tackAccent)tackAccent.oninput=()=>{if(w.activeTackPart){w.tackByPart[w.activeTackPart].accent=tackAccent.value;}};
  document.querySelectorAll('.pole-style-btn').forEach(button=>button.onclick=()=>{
    w.poleStyle=button.dataset.poleStyle;buildToymakersWorkshop();
  });
  document.querySelectorAll('.pole-material-btn').forEach(button=>button.onclick=()=>{
    w.material=button.dataset.poleMaterial;buildToymakersWorkshop();
  });

  const trimRange=document.querySelector('.trim-slider input');
  const trimThumb=document.querySelector('.trim-slider img');
  const updateTrimThumb=()=>{if(trimRange&&trimThumb){const p=(+trimRange.value-+trimRange.min)/(+trimRange.max-+trimRange.min);trimThumb.style.left=`calc(${p*100}% - 7px)`;}};
  if(trimRange){trimRange.oninput=()=>{w.trimDecor=+trimRange.value;updateTrimThumb();drawPolePreview();};updateTrimThumb();}
  const trimColor=document.querySelector('.trim-color-picker input');
  if(trimColor)trimColor.oninput=()=>{
    w.trimColor=trimColor.value;
    trimColor.dataset.null='false';
    drawPolePreview();
  };
  const topperColor=document.querySelector('.topper-color-picker input');if(topperColor)topperColor.oninput=()=>{w.topperColor=topperColor.value;topperColor.dataset.null='false';};
  const bottomColor=document.querySelector('.bottom-color-picker input');if(bottomColor)bottomColor.oninput=()=>{w.bottomColor=bottomColor.value;bottomColor.dataset.null='false';};
  const trimFile=document.querySelector('.trim-custom-file input[type=file]');if(trimFile){document.querySelector('.trim-choose').onclick=()=>trimFile.click();document.querySelector('.trim-clear').onclick=()=>{trimFile.value='';};}
  const garlandFile=document.querySelector('.garland-custom-file input[type=file]');if(garlandFile){document.querySelector('.garland-custom-choose').onclick=()=>garlandFile.click();document.querySelector('.garland-custom-clear').onclick=()=>{garlandFile.value='';};}

  const top=document.querySelector('.pole-expand-btn');
  if(top)top.onclick=()=>{w.activePanel=w.activePanel==='poles'?null:'poles';buildToymakersWorkshop();};

  document.querySelectorAll('.rarity-btn').forEach(button=>button.onclick=()=>{
    const r=button.dataset.rarity;
    w.rarityPanel=r;
    w.activePanel=w.activePanel===r?null:r;
    buildToymakersWorkshop();
  });
  document.querySelectorAll('.trait-checkbox').forEach(label=>{
    const input=label.querySelector('input');
    input.onchange=()=>{
      const name=label.dataset.extraTrait;
      const i=w.extraTraits.indexOf(name);
      if(input.checked){
        if(i<0 && w.extraTraits.length<5)w.extraTraits.push(name);
      }else if(i>=0)w.extraTraits.splice(i,1);
      buildToymakersWorkshop();
    };
  });
  document.querySelectorAll('[data-remove-trait]').forEach(button=>button.onclick=()=>{
    w.extraTraits=w.extraTraits.filter(x=>x!==button.dataset.removeTrait);
    buildToymakersWorkshop();
  });

  const add=document.querySelector('.add-garland-btn');
  if(add)add.onclick=()=>{w.activePanel=w.activePanel==='garlands'?null:'garlands';buildToymakersWorkshop();};
  document.querySelectorAll('.garland-checkbox').forEach(label=>{
    const input=label.querySelector('input');
    input.onchange=()=>{
      const type=label.dataset.garlandType;
      const index=w.garlands.findIndex(g=>g.type===type);
      if(input.checked){
        if(index<0 && w.garlands.length<4)w.garlands.push({type,color:'#f6edf4'});
      }else if(index>=0)w.garlands.splice(index,1);
      buildToymakersWorkshop();
    };
  });
  document.querySelectorAll('[data-remove-garland]').forEach(button=>button.onclick=()=>{
    w.garlands.splice(Number(button.dataset.removeGarland),1);
    buildToymakersWorkshop();
  });
  document.querySelectorAll('[data-garland-color]').forEach(input=>input.oninput=()=>{
    w.garlands[Number(input.dataset.garlandColor)].color=input.value;
    drawPolePreview();
  });

  const customTack=document.querySelector('.custom-tack-file input[type=file]');
  if(customTack){
    document.querySelector('.custom-tack-choose').onclick=()=>customTack.click();
    document.querySelector('.custom-tack-clear').onclick=()=>{customTack.value='';};
  }
  const customPaint=document.querySelector('.custom-paint-zone input[type=file]');
  if(customPaint){
    document.querySelector('.custom-paint-choose').onclick=()=>customPaint.click();
    document.querySelector('.custom-paint-clear').onclick=()=>{customPaint.value='';w.customPaintFile=null;};
    customPaint.onchange=()=>{w.customPaintFile=customPaint.files?.[0]||null;};
  }
}

function drawPolePreview(){
  const canvas=document.getElementById('polePreview');
  if(!canvas)return;
  const c=canvas.getContext('2d');
  const w=UI.state.workshop;
  c.clearRect(0,0,canvas.width,canvas.height);
  c.imageSmoothingEnabled=true;
  c.imageSmoothingQuality='high';

  const colors={brass:'#b38a4e',silver:'#cfd3d9','painted-wood':'#9b6b55',crystal:'#a6e5ff'};
  c.strokeStyle=colors[w.material]||'#b38a4e';
  c.lineWidth=28;
  c.lineCap='round';
  c.beginPath();
  c.moveTo(canvas.width/2,80);
  if(w.poleStyle==='spiral'||w.poleStyle==='flower'||w.poleStyle==='braided'||w.poleStyle==='vine'||w.poleStyle==='crystal'){
    for(let y=80;y<850;y+=12){
      const x=canvas.width/2+Math.sin(y/35)*28;
      if(y===80)c.moveTo(x,y);else c.lineTo(x,y);
    }
  }else if(w.poleStyle!=='none'){
    c.lineTo(canvas.width/2,850);
  }
  c.stroke();

  if(w.poleStyle==='floating-rings'){
    c.lineWidth=10;
    for(let y=130;y<830;y+=85){
      c.beginPath();c.ellipse(canvas.width/2,y,62,22,0,0,Math.PI*2);c.stroke();
    }
  }

  w.garlands.forEach((g,index)=>{
    c.strokeStyle=g.color;
    c.lineWidth=7;
    c.beginPath();
    for(let y=140;y<820;y+=8){
      const x=canvas.width/2+Math.sin(y/30+index)*55;
      if(y===140)c.moveTo(x,y);else c.lineTo(x,y);
    }
    c.stroke();
  });
}

function buildForms(){
  const eye=currentEyeColors();
  const fin=UI.state.fins[UI.state.selectedFin];
  pageContent.innerHTML=`<div class="forms-layer">
    <img class="forms-art" src="assets/ui/pages/forms/forms-static.png" alt="">

    ${formNames.map(formCard).join('')}

    <div class="pupil-grid">${pupilNames.map(n=>`<button class="pupil-btn" data-pupil="${n}" aria-label="${n} pupil"><img src="assets/ui/pages/forms/pupil-shapes/${n.toLowerCase()}${UI.selectedPupil===n?'-selected':''}.png" alt=""></button>`).join('')}</div>

    <div class="eye-controls control-panel">
      <input class="color-input eye-main" type="color" value="${eye.primary}" aria-label="${UI.state.heterochromia?UI.state.activeEye+' eye':'Main eye'} color">
      <input class="color-input eye-grad" type="color" value="${eye.gradient}" aria-label="${UI.state.heterochromia?UI.state.activeEye+' eye':'Eye'} gradient color">

      <div class="eye-side-controls" ${UI.state.heterochromia?'':'hidden'}>
        ${eyeSideButton('left')}
        ${eyeSideButton('right')}
      </div>

      <select class="lash-select" aria-label="Eyelash style">${['Default','Butterfly','Flower','Long','Whispy'].map(v=>`<option ${v===UI.state.lash?'selected':''}>${v}</option>`).join('')}</select>
      <input class="color-input lash-main" type="color" value="${UI.state.lashPrimary}" data-key="lashPrimary" aria-label="Lash main color">
      <input class="color-input lash-grad" type="color" value="${UI.state.lashSecondary}" data-key="lashSecondary" aria-label="Lash gradient color">
      <img class="control-frame-overlay" src="assets/ui/pages/forms/eyes-panel.png" alt="">
    </div>

    <div class="conditional-zone fin-zone control-panel" hidden>
      <img class="options-bg" src="assets/ui/pages/forms/fins-panel.png" alt="">
      ${['dorsal','tail','pelvic','pectoral','ventral'].map(v=>`
        <button class="fin-selector fin-${v}" data-fin="${v}" aria-label="${v} fin">
          <img src="assets/ui/pages/forms/fins/fin-${v}${UI.state.selectedFin===v?'-selected':''}.png" alt="">
        </button>`).join('')}
      <div class="fin-slider-shell" aria-label="Fin style ${fin.variant} of 5">
        <input class="fin-variant-slider" type="range" min="1" max="5" step="1"
          value="${fin.variant}" aria-label="Selected fin style, 1 through 5">
        <img class="fin-slider-thumb" src="assets/ui/controls/sliders/slider-thumb.png" alt="">
      </div>
      
      <input class="color-input fin-main" type="color"
        value="${fin.mainColor||'#ffffff'}" data-null="${fin.mainColor==null}" aria-label="Fin main color">
      <input class="color-input fin-grad" type="color"
        value="${fin.gradientColor||'#ffffff'}" data-null="${fin.gradientColor==null}" aria-label="Fin gradient color">
      <img class="control-frame-overlay" src="assets/ui/pages/forms/fin-workshop-panel.png" alt="">
    </div>

    <div class="conditional-zone skin-zone control-panel" hidden>
      <img class="options-bg" src="assets/ui/pages/forms/skin-panel.png" alt="">
      <input class="color-input skin-color" type="color" value="#d9b39b" aria-label="Skin color">
      <input class="color-input blush-color" type="color" value="${UI.state.blush||'#ffffff'}" data-null="${UI.state.blush==null}" aria-label="Blush color">
      <input class="color-input lips-color" type="color" value="${UI.state.lips||'#ffffff'}" data-null="${UI.state.lips==null}" aria-label="Lip color">
      <input class="color-input eyeshadow-color" type="color" value="${UI.state.eyeshadow||'#ffffff'}" data-null="${UI.state.eyeshadow==null}" aria-label="Eyeshadow color">
      <label class="hetero-toggle-wrap">
        <input class="hetero-toggle" type="checkbox" ${UI.state.heterochromia?'checked':''}>
        <img class="hetero-checkmark" src="assets/ui/controls/checkboxes/check.png" alt="" ${UI.state.heterochromia?'':'hidden'}>
        <span class="sr-only">Heterochromia</span>
      </label>
      <img class="control-frame-overlay" src="assets/ui/pages/forms/skin-options-panel.png" alt="">
    </div>
  </div>`;
  bindForms();
  updateFormVisibility();
  updateFinSliderThumb();
}
function bindForms(){
  document.querySelectorAll('.form-card').forEach(b=>b.onclick=()=>selectForm(b.dataset.form));
  document.querySelectorAll('.pupil-btn').forEach(b=>b.onclick=()=>{UI.selectedPupil=b.dataset.pupil;buildForms();render();});

  const eyeMain=document.querySelector('.eye-main');
  if(eyeMain)eyeMain.oninput=()=>{
    if(UI.state.heterochromia){
      const target=UI.state.activeEye==='left'?UI.state.leftEye:UI.state.rightEye;
      target.primary=eyeMain.value;
    }else{
      UI.state.irisPrimary=eyeMain.value;
    }
    render();
  };

  const eyeGrad=document.querySelector('.eye-grad');
  if(eyeGrad)eyeGrad.oninput=()=>{
    if(UI.state.heterochromia){
      const target=UI.state.activeEye==='left'?UI.state.leftEye:UI.state.rightEye;
      target.gradient=eyeGrad.value;
    }else{
      UI.state.irisSecondary=eyeGrad.value;
    }
    render();
  };

  document.querySelectorAll('.eye-side-btn').forEach(button=>{
    button.onclick=()=>{
      UI.state.activeEye=button.dataset.eyeSide;
      buildForms();
      render();
    };
  });

  document.querySelectorAll('.color-input[data-key]').forEach(i=>i.oninput=()=>{UI.state[i.dataset.key]=i.value;render();});
  const lash=document.querySelector('.lash-select');if(lash)lash.onchange=()=>{UI.state.lash=lash.value;render();};

  document.querySelectorAll('.fin-selector').forEach(button=>{
    button.onclick=()=>{
      UI.state.selectedFin=button.dataset.fin;
      buildForms();
      render();
    };
  });

  const finSlider=document.querySelector('.fin-variant-slider');
  if(finSlider)finSlider.oninput=()=>{
    UI.state.fins[UI.state.selectedFin].variant=Number(finSlider.value);
    updateFinSliderThumb();
    render();
  };

  const finMain=document.querySelector('.fin-main');
  if(finMain)finMain.oninput=()=>{
    UI.state.fins[UI.state.selectedFin].mainColor=finMain.value;
    finMain.dataset.null='false';
    render();
  };

  const finGrad=document.querySelector('.fin-grad');
  if(finGrad)finGrad.oninput=()=>{
    UI.state.fins[UI.state.selectedFin].gradientColor=finGrad.value;
    finGrad.dataset.null='false';
    render();
  };

  const skinColor=document.querySelector('.skin-color');
  if(skinColor)skinColor.oninput=()=>{UI.state.skin=skinColor.value;render();};

  const blushColor=document.querySelector('.blush-color');
  if(blushColor)blushColor.oninput=()=>{UI.state.blush=blushColor.value;blushColor.dataset.null='false';render();};

  const lipsColor=document.querySelector('.lips-color');
  if(lipsColor)lipsColor.oninput=()=>{UI.state.lips=lipsColor.value;lipsColor.dataset.null='false';render();};

  const eyeshadowColor=document.querySelector('.eyeshadow-color');
  if(eyeshadowColor)eyeshadowColor.oninput=()=>{UI.state.eyeshadow=eyeshadowColor.value;eyeshadowColor.dataset.null='false';render();};

  const hetero=document.querySelector('.hetero-toggle');
  if(hetero)hetero.onchange=()=>{
    UI.state.heterochromia=hetero.checked;
    if(hetero.checked){
      UI.state.leftEye.primary=UI.state.irisPrimary;
      UI.state.leftEye.gradient=UI.state.irisSecondary;
    }
    buildForms();
    render();
  };
}
function updateFinSliderThumb(){
  const range=document.querySelector('.fin-variant-slider');
  const thumb=document.querySelector('.fin-slider-thumb');
  const value=document.querySelector('.fin-slider-value');
  if(!range||!thumb)return;
  const pct=(Number(range.value)-1)/4;
  thumb.style.left=`calc(${pct*100}% - 6px)`;
  if(value)value.textContent=range.value;
}

function updateFormVisibility(){
  const f=FEATURES[UI.selectedForm];
  const finZone=document.querySelector('.fin-zone'),skinZone=document.querySelector('.skin-zone');
  if(finZone)finZone.hidden=!f.fins;
  if(skinZone)skinZone.hidden=!f.skin;
}
function displayFormName(form){return form==='hippocampustaur'?'Hippocampustaur':form[0].toUpperCase()+form.slice(1)}
function selectForm(form){
  UI.selectedForm=form;
  summaryForm.textContent=displayFormName(form);
  buildForms();
  Object.assign(UI.state,{zoom:1,panX:0,panY:0});
  if(RENDERABLE.has(form)){unsupported.hidden=true;render();}
  else{ctx.clearRect(0,0,canvas.width,canvas.height);unsupported.hidden=false;unsupported.textContent=`${summaryForm.textContent} renderer assets are not added yet.`;applyView();}
}

// Renderer rebuilt for the current renderer asset folders.
const FORM_CONFIGS={
  horse:{
    name:'Horse', folder:'horse', assetFolder:'assets',
    body:[
      ['horse_fill_normal.png','coat','source-over'],
      ['horse_hooves_normal.png','hoof','source-over']
    ],
    equineEyes:true,
    outline:['horse_outline_overlay.png','overlay'],
    bounds:{x:0,y:274,w:958,h:742}
  },
  hippocampus:{
    name:'Hippocampus', folder:'hippocampus', assetFolder:'assets',
    body:[
      ['hippocampus_fill_normal.png','coat','source-over'],
      ['hippocampus_hooves_normal.png','hoof','source-over']
    ],
    equineEyes:true,
    outline:['hippocampus_outline_overlay.png','overlay'],
    bounds:{x:0,y:274,w:1127,h:845}
  },
  centaur:{
    name:'Centaur', folder:'centaur', assetFolder:'',
    body:[
      ['torso_fill_normal.png','skin','source-over'],
      ['torso-shading-multiply.png',null,'multiply'],
      ['centaur_fill_normal.png','coat','source-over'],
      ['centaur_hooves_normal.png','hoof','source-over']
    ],
    equineEyes:false,
    humanoidFace:true,
    outline:['centaur_outline_overlay.png','overlay'],
    bounds:{x:4,y:33,w:954,h:983}
  },
  satyr:{
    name:'Satyr', folder:'satyr', assetFolder:'',
    body:[
      ['torso_fill_normal.png','skin','source-over'],
      ['torso-shading-multiply.png',null,'multiply'],
      ['satyr_fill_normal.png','coat','source-over'],
      ['satyr_hooves_normal.png','hoof','source-over']
    ],
    equineEyes:false,
    humanoidFace:true,
    outline:['satyr_outline_overlay.png','overlay'],
    bounds:{x:60,y:33,w:655,h:1149}
  },
  hippocampustaur:{
    name:'Hippocampustaur', folder:'hippocampustaur', assetFolder:'',
    body:[
      ['torso_fill_normal.png','skin','source-over'],
      ['torso-shading-multiply.png',null,'multiply'],
      ['hippocampustaur_fill_normal.png','coat','source-over'],
      ['hippocampustaur_hooves_normal.png','hoof','source-over']
    ],
    equineEyes:false,
    humanoidFace:true,
    outline:['hippocampustaur_outline_overlay.png','overlay'],
    bounds:{x:4,y:33,w:1123,h:1088}
  }
};
const RENDER_DISPLAY_WIDTH=580;
const RENDER_DISPLAY_HEIGHT=390;
const RENDER_SCALE=3;

const canvas=document.getElementById('renderCanvas'),
      ctx=canvas.getContext('2d',{alpha:true}),
      viewport=document.getElementById('viewport'),
      renderWrap=document.getElementById('renderWrap'),
      cache=new Map();

canvas.width=RENDER_DISPLAY_WIDTH*RENDER_SCALE;
canvas.height=RENDER_DISPLAY_HEIGHT*RENDER_SCALE;
canvas.style.width=RENDER_DISPLAY_WIDTH+'px';
canvas.style.height=RENDER_DISPLAY_HEIGHT+'px';

ctx.imageSmoothingEnabled=true;
ctx.imageSmoothingQuality='high';
ctx.globalAlpha=1;
ctx.globalCompositeOperation='source-over';
ctx.filter='none';

let lastRenderedComp=null;
let lastRenderGeometry=null;

function redrawCurrentView(){
  if(!lastRenderedComp||!lastRenderGeometry)return;

  const {sx,sy,sw,sh,dx,dy,dw,dh}=lastRenderGeometry;

  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha=1;
  ctx.globalCompositeOperation='source-over';
  ctx.filter='none';
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality='high';

  ctx.save();
  ctx.scale(RENDER_SCALE,RENDER_SCALE);
  ctx.translate(
    RENDER_DISPLAY_WIDTH/2 + UI.state.panX,
    RENDER_DISPLAY_HEIGHT/2 + UI.state.panY
  );
  ctx.scale(UI.state.zoom,UI.state.zoom);
  ctx.translate(-RENDER_DISPLAY_WIDTH/2,-RENDER_DISPLAY_HEIGHT/2);
  ctx.drawImage(lastRenderedComp,sx,sy,sw,sh,dx,dy,dw,dh);
  ctx.restore();
}

function formAssetPath(config,file){
  const middle=config.assetFolder?`/${config.assetFolder}`:'';
  return `assets/renderer/forms/${config.folder}${middle}/${file}`;
}
function eyePath(file){return `assets/renderer/eyes/equine/eye/${file}`}
function pupilPath(name){return `assets/renderer/eyes/pupils/pupil_${name.toLowerCase()}_overlay.png`}
function humanoidPupilPath(name){
  if(name.toLowerCase()==='horse'){
    return 'assets/renderer/eyes/pupils/humanoid_pupil_horse_overlay.png';
  }
  return pupilPath(name);
}
function lashPath(style,mask=false){return `assets/renderer/eyes/equine/lashes/lashes_${mask?'gradientmask_':''}${style.toLowerCase()}_normal.png`}
function humanoidEyePath(side,file){return `assets/renderer/eyes/humanoid/eyes/${side}_eye_${file}.png`}
function humanoidFacePath(file){return `assets/renderer/eyes/humanoid/face/${file}.png`}
function humanoidLashPath(style,gradient=false){
  const base=style.toLowerCase()==='default'?'normal':style.toLowerCase();
  return `assets/renderer/eyes/humanoid/lashes/lashes_${base}${gradient?'_gradientmask':''}.png`;
}
function loadImage(src){if(cache.has(src))return cache.get(src);const p=new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error('Could not load '+src));i.src=src});cache.set(src,p);return p}
function tint(img,color){
  const o=document.createElement('canvas');
  o.width=img.width;o.height=img.height;
  const c=o.getContext('2d',{alpha:true});
  c.clearRect(0,0,o.width,o.height);

  // A null color means this optional layer is disabled.
  if(color==null || color==='')return o;

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  c.drawImage(img,0,0);

  c.globalCompositeOperation='multiply';
  c.fillStyle=color;
  c.fillRect(0,0,o.width,o.height);

  c.globalCompositeOperation='destination-in';
  c.drawImage(img,0,0);

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  return o;
}
function gradientTint(img,a,b){
  const o=document.createElement('canvas');
  o.width=img.width;o.height=img.height;
  const c=o.getContext('2d');
  c.clearRect(0,0,o.width,o.height);

  const g=c.createLinearGradient(0,0,o.width,0);
  g.addColorStop(0,a);
  g.addColorStop(1,b);

  c.fillStyle=g;
  c.fillRect(0,0,o.width,o.height);

  c.globalCompositeOperation='destination-in';
  c.drawImage(img,0,0);

  c.globalCompositeOperation='multiply';
  c.drawImage(img,0,0);

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  return o;
}
function multiplyColorOverArtwork(img,color){
  const o=document.createElement('canvas');
  o.width=img.width;
  o.height=img.height;
  const c=o.getContext('2d',{alpha:true});

  c.clearRect(0,0,o.width,o.height);
  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';

  // Keep the original grayscale artwork, including all highlights and shadows.
  c.drawImage(img,0,0);

  // Match the art-program setup: a solid color layer clipped to the artwork,
  // using Multiply so the original depth remains visible.
  c.globalCompositeOperation='multiply';
  c.fillStyle=color;
  c.fillRect(0,0,o.width,o.height);

  // Restore the source artwork's exact transparency.
  c.globalCompositeOperation='destination-in';
  c.drawImage(img,0,0);

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  return o;
}

function composeEyelashes(normalArtwork,gradientArtwork,mainColor,gradientColor){
  const o=document.createElement('canvas');
  o.width=normalArtwork.width;
  o.height=normalArtwork.height;
  const c=o.getContext('2d',{alpha:true});

  c.clearRect(0,0,o.width,o.height);
  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';

  // Each source artwork gets its own clipped Multiply color layer first.
  const mainLayer=multiplyColorOverArtwork(normalArtwork,mainColor);
  const gradientLayer=multiplyColorOverArtwork(gradientArtwork,gradientColor);

  // Then stack the finished layers normally, just like the art program.
  c.drawImage(mainLayer,0,0);
  c.drawImage(gradientLayer,0,0);

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  return o;
}

function clipToMask(sourceImage,maskImage){
  const o=document.createElement('canvas');
  o.width=sourceImage.width;
  o.height=sourceImage.height;
  const c=o.getContext('2d',{alpha:true});

  c.clearRect(0,0,o.width,o.height);
  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  c.drawImage(sourceImage,0,0);

  c.globalCompositeOperation='destination-in';
  c.drawImage(maskImage,0,0);

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  return o;
}

function tintFlatMask(img,color){
  const o=document.createElement('canvas');
  o.width=img.width;
  o.height=img.height;
  const c=o.getContext('2d',{alpha:true});
  c.clearRect(0,0,o.width,o.height);

  // Null is an actual off state, not an implicit black CSS color.
  if(color==null || color==='')return o;

  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  c.drawImage(img,0,0);
  c.globalCompositeOperation='source-in';
  c.fillStyle=color;
  c.fillRect(0,0,o.width,o.height);
  c.globalAlpha=1;
  c.globalCompositeOperation='source-over';
  return o;
}

function drawLayer(c,source,blend='source-over',alpha=1,dx=0,dy=0){
  c.save();
  c.globalCompositeOperation=blend;
  c.globalAlpha=alpha;
  c.drawImage(source,dx,dy);
  c.restore();
}
function drawScaledLayer(c,source,blend='source-over',alpha=1,x=0,y=0,scale=.72){
  const width=source.width*scale;
  const height=source.height*scale;
  const dx=x+(source.width-width)/2;
  const dy=y+(source.height-height)/2;

  c.save();
  c.globalCompositeOperation=blend;
  c.globalAlpha=alpha;
  c.imageSmoothingEnabled=true;
  c.imageSmoothingQuality='high';
  c.drawImage(source,dx,dy,width,height);
  c.restore();
}

async function renderEquineEyes(c){
  const visibleEye=currentEyeColors();
  const eyeWhite=await loadImage(eyePath('eye_white_normal.png'));
  const iris=await loadImage(eyePath('eye_iris_colormask_normal.png'));
  const irisGradient=await loadImage(eyePath('eye_iris_gradient_normal.png'));
  const highlight=await loadImage(eyePath('eye_highlight_add.png'));
  const pupil=await loadImage(pupilPath(UI.selectedPupil));
  const lashNormal=await loadImage(lashPath(UI.state.lash));
  const lashGradient=await loadImage(lashPath(UI.state.lash,true));
  drawLayer(c,eyeWhite);

  const coloredIris=tint(iris,visibleEye.primary);
  drawLayer(c,coloredIris);

  const coloredGradient=tint(irisGradient,visibleEye.gradient);
  const clippedGradient=clipToMask(coloredGradient,iris);

  // Art-program order: main iris color first, then the gradient artwork above it.
  drawLayer(c,clippedGradient,'source-over');

  // Slightly smaller pupil, kept centered on the original placement.
  drawScaledLayer(c,pupil,'overlay',1,170,425,1);
  drawLayer(c,highlight,'lighter');
  drawLayer(c,composeEyelashes(
    lashNormal,
    lashGradient,
    UI.state.lashPrimary,
    UI.state.lashSecondary
  ));
}

async function renderHumanoidFace(c){
  const sides=['left','right'];
  const sameColors={primary:UI.state.irisPrimary,gradient:UI.state.irisSecondary};

  // Face details underneath the eyes.
  const blush=await loadImage(humanoidFacePath('blush_normal'));
  const eyeshadow=await loadImage(humanoidFacePath('eyeshadow_normal'));
  const lips=await loadImage(humanoidFacePath('lips_normal'));
  const eyebrows=await loadImage(humanoidFacePath('eyebrows_normal'));
  const faceOverlay=await loadImage(humanoidFacePath('face_overlay'));

  drawLayer(c,tintFlatMask(blush,UI.state.blush));
  drawLayer(c,tintFlatMask(eyeshadow,UI.state.eyeshadow),'multiply');
  drawLayer(c,tintFlatMask(lips,UI.state.lips),'multiply');

  for(const side of sides){
    const colors=UI.state.heterochromia
      ? (side==='left'?UI.state.leftEye:UI.state.rightEye)
      : sameColors;

    const eyeWhite=await loadImage(humanoidEyePath(side,'white_normal'));
    const iris=await loadImage(humanoidEyePath(side,'iris_colormask_normal'));
    const irisGradient=await loadImage(humanoidEyePath(side,'iris_gradient_normal'));
    const highlight=await loadImage(humanoidEyePath(side,'highlight_add'));

    drawLayer(c,eyeWhite);
    drawLayer(c,tint(iris,colors.primary));

    const gradientColored=tint(irisGradient,colors.gradient);
    const clippedGradient=clipToMask(gradientColored,iris);

    // Main iris color remains below; the gradient artwork is layered above it.
    drawLayer(c,clippedGradient,'source-over');

    // Reuse a slightly smaller pupil icon and center it independently in each eye.
    const pupil=await loadImage(humanoidPupilPath(UI.selectedPupil));
    const pupilPositions={
      left:{x:381,y:142},
      right:{x:346,y:137}
    };
    const pos=pupilPositions[side];
    drawScaledLayer(c,pupil,'overlay',1,pos.x,pos.y,.68);
    drawLayer(c,highlight,'lighter');
  }

  // Humanoid lashes span both eyes and follow the same selected style.
  const lashNormal=await loadImage(humanoidLashPath(UI.state.lash,false));
  const lashGradient=await loadImage(humanoidLashPath(UI.state.lash,true));
  drawLayer(c,composeEyelashes(
    lashNormal,
    lashGradient,
    UI.state.lashPrimary,
    UI.state.lashSecondary
  ));

  drawLayer(c,eyebrows);
  drawLayer(c,faceOverlay,'overlay');
}

async function render(){
  const config=FORM_CONFIGS[UI.selectedForm];
  if(!config)return;
  try{
    unsupported.hidden=true;
    const layers=[];
    for(const [file,tintKey,blend] of config.body){layers.push({img:await loadImage(formAssetPath(config,file)),tintKey,blend});}
    const outline=await loadImage(formAssetPath(config,config.outline[0]));
    const first=layers[0].img,comp=document.createElement('canvas');
    comp.width=first.width;
    comp.height=first.height;
    const c=comp.getContext('2d',{alpha:true});
    c.imageSmoothingEnabled=true;
    c.imageSmoothingQuality='high';
    c.clearRect(0,0,comp.width,comp.height);
    c.globalAlpha=1;
    c.globalCompositeOperation='source-over';
    c.filter='none';
    for(const layer of layers){
      let source=layer.img;
      if(layer.tintKey==='coat')source=tint(source,UI.state.coat);
      if(layer.tintKey==='hoof')source=tint(source,UI.state.hoof);
      if(layer.tintKey==='skin')source=tint(source,UI.state.skin||'#d9b39b');
      drawLayer(c,source,layer.blend);
    }
    if(config.equineEyes)await renderEquineEyes(c);
    if(config.humanoidFace)await renderHumanoidFace(c);
    drawLayer(c,outline,config.outline[1]);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha=1;
    ctx.globalCompositeOperation='source-over';
    ctx.filter='none';
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality='high';

    const b=config.bounds;
    const pad=24;
    const sx=Math.max(0,b.x-pad);
    const sy=Math.max(0,b.y-pad);
    const sw=Math.min(comp.width-sx,b.w+pad*2);
    const sh=Math.min(comp.height-sy,b.h+pad*2);

    const margin=28;
    const displayScale=Math.min(
      (RENDER_DISPLAY_WIDTH-margin*2)/sw,
      (RENDER_DISPLAY_HEIGHT-margin*2)/sh
    );
    const dw=sw*displayScale;
    const dh=sh*displayScale;
    const dx=(RENDER_DISPLAY_WIDTH-dw)/2;
    const dy=(RENDER_DISPLAY_HEIGHT-dh)/2;

    lastRenderedComp=comp;
    lastRenderGeometry={sx,sy,sw,sh,dx,dy,dw,dh};
    redrawCurrentView();
    summaryForm.textContent=config.name;
    applyView();
  }catch(e){
    console.error('Renderer error:',e);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    unsupported.hidden=false;
    unsupported.textContent='Renderer asset error: '+e.message;
  }
}
function updateSliderThumb(){
  const range=document.getElementById('zoomRange'),thumb=document.getElementById('viewSliderThumb');
  if(!range||!thumb)return;
  const pct=(+range.value-(+range.min))/(+range.max-(+range.min));
  thumb.style.left=`calc(${pct*100}% - 4px)`;
}
function applyView(){
  canvas.style.transform='none';
  canvas.style.transformOrigin='center center';
  renderWrap.classList.toggle('idle',UI.state.idle);
  const range=document.getElementById('zoomRange');
  range.value=Math.round(UI.state.zoom*100);
  document.getElementById('zoomPercent').textContent=Math.round(UI.state.zoom*100)+'%';
  updateSliderThumb();
  redrawCurrentView();
}
document.getElementById('zoomRange').oninput=e=>{UI.state.zoom=+e.target.value/100;applyView()};
document.getElementById('zoomIn').onclick=()=>{UI.state.zoom=Math.min(10,UI.state.zoom+.15);applyView()};
document.getElementById('zoomOut').onclick=()=>{UI.state.zoom=Math.max(.45,UI.state.zoom-.15);applyView()};
document.getElementById('resetView').onclick=()=>{Object.assign(UI.state,{zoom:1,panX:0,panY:0});applyView()};
let dragging=false,lastX=0,lastY=0;
viewport.addEventListener('pointerdown',e=>{if(!RENDERABLE.has(UI.selectedForm))return;dragging=true;lastX=e.clientX;lastY=e.clientY;viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging')});
viewport.addEventListener('pointermove',e=>{if(!dragging)return;UI.state.panX+=e.clientX-lastX;UI.state.panY+=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;applyView()});
function endDrag(){dragging=false;viewport.classList.remove('dragging')}
viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);viewport.addEventListener('lostpointercapture',endDrag);
viewport.addEventListener('wheel',e=>{if(!RENDERABLE.has(UI.selectedForm))return;e.preventDefault();UI.state.zoom=Math.max(.45,Math.min(10,UI.state.zoom+(e.deltaY<0?.1:-.1)));applyView()},{passive:false});

document.getElementById('randomizeBtn').onclick=()=>{
  const colors=['#f2efe8','#d8b07a','#8a5139','#4a2d2a','#b995ff','#7fc9cf','#ef9fbd','#2b2035','#f0c23b'];
  const pick=list=>list[Math.floor(Math.random()*list.length)];
  const randomColor=()=>pick(colors);

  UI.selectedForm=pick(formNames);
  UI.selectedPupil=pick(pupilNames.slice(0,6));

  Object.assign(UI.state,{
    coat:randomColor(),
    hoof:randomColor(),
    irisPrimary:randomColor(),
    irisSecondary:randomColor(),
    lashPrimary:randomColor(),
    lashSecondary:randomColor(),
    lash:pick(['Default','Butterfly','Flower','Long','Whispy'])
  });

  Object.assign(UI.state.soul,{
    shape:pick(SOUL_SHAPES.slice(0,5)),
    wiring:pick(SOUL_WIRING),
    ribbon:pick(SOUL_RIBBONS.slice(0,6))
  });

  Object.assign(UI.state.workshop,{
    poleStyle:pick(POLE_STYLES.slice(0,6)),
    material:pick(['brass','silver'])
  });

  summaryForm.textContent=displayFormName(UI.selectedForm);
  unsupported.hidden=true;

  // Update the main character renderer first.
  render();
  applyView();

  // Then rebuild the open controls and redraw its page-specific preview.
  if(UI.selectedPage==='forms') buildForms();
  else if(UI.selectedPage==='coat') buildCoatStudio();
  else if(UI.selectedPage==='soul'){
    buildSoulAtelier();
    requestAnimationFrame(()=>{
      drawSoulPreview();
      render();
      applyView();
    });
  }else if(UI.selectedPage==='workshop') buildToymakersWorkshop();
};

document.getElementById('resetBtn').onclick=()=>{Object.assign(UI.state,{coat:'#d8b07a',hoof:'#3b2621',skin:'#d9b39b',blush:null,lips:null,eyeshadow:null,irisPrimary:'#f0c23b',irisSecondary:'#b995ff',lashPrimary:'#1f1729',lashSecondary:'#f6edf4',lash:'Default',zoom:1,panX:0,panY:0,heterochromia:false,activeEye:'left',leftEye:{primary:'#f0c23b',gradient:'#f6e6a8'},rightEye:{primary:'#b995ff',gradient:'#7fc9cf'},
hoofPreset:null,
legMarkings:{
  'rear-left':null,
  'front-left':null,
  'front-right':null,
  'rear-right':null
},
facialMarkings:[],
fantasyAccents:[null,null,null],
fantasyCoatColors:[null,null,null],
fantasyMarkingColors:[null,null,null],
fins:{
  dorsal:{variant:1,mainColor:null,gradientColor:null},
  tail:{variant:1,mainColor:null,gradientColor:null},
  pelvic:{variant:1,mainColor:null,gradientColor:null},
  pectoral:{variant:1,mainColor:null,gradientColor:null},
  ventral:{variant:1,mainColor:null,gradientColor:null}
},
soul:{
  ...UI.state.soul,
  main:null,gradient:null,
  spirals:[null,null,null],
  spiralEnabled:[false,false,false],
  insidePrimary:null,insideSecondary:null,
  ribbonMain:null,ribbonGradient:null,
  ribbonSecond:null,ribbonThird:null,
  activeCharm:1,
  charms:[{selection:0,color:null},{selection:0,color:null},{selection:0,color:null}]
},
workshop:{
  ...UI.state.workshop,
  tackByPart:{},
  activeTackPart:null,
  trimColor:null,
  topperColor:null,
  bottomColor:null,
  garlands:[]
}});UI.selectedPupil='Human';if(UI.selectedPage==='forms')buildForms();render();applyView()};
document.getElementById('exportBtn').onclick=()=>{const a=document.createElement('a');a.download=`carouzell-${UI.selectedForm}.png`;a.href=canvas.toDataURL('image/png');a.click()};


/* Automatically fit the fixed 1420×1024 handbook inside an iframe.
   - Embedded: fit the complete handbook within both iframe dimensions.
   - Standalone: scale down only when the browser is narrower than the design.
*/




function fitCarouzellViewport(){
  const app=document.querySelector('.app-shell');
  if(!app)return;

  const designWidth=1420;
  const designHeight=1024;
  const viewportWidth=Math.max(1,window.innerWidth||document.documentElement.clientWidth);
  const embedded=window.self!==window.top;
  const scale=Math.min(1,viewportWidth/designWidth);
  const fittedWidth=Math.ceil(designWidth*scale);
  const fittedHeight=Math.ceil(designHeight*scale);

  document.body.classList.toggle('embed-fit-active',embedded);
  app.style.transformOrigin=embedded?'top left':'top center';
  app.style.transform=`scale(${scale})`;

  document.documentElement.style.height=`${fittedHeight}px`;
  document.body.style.height=`${fittedHeight}px`;
  document.body.style.minHeight=`${fittedHeight}px`;
  document.body.style.width=embedded?`${fittedWidth}px`:'100%';

  if(embedded){
    window.parent.postMessage({
      type:'carouzell-resize',
      width:fittedWidth,
      height:fittedHeight,
      scale
    },'*');
  }
}

window.addEventListener('load',fitCarouzellViewport);
window.addEventListener('resize',fitCarouzellViewport);


showPage('forms');render();applyView();bindImageHover(document);
fitCarouzellViewport();
fitCarouzellViewport();
