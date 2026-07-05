// Carouzell Builder — extracted from v34.8 prototype
// Future step: move the large data arrays into /data/*.js or /data/*.json.

const rooms=[['forms','🎠 Forms'],['coats','🎨 Coat Studio'],['skin','Skin Color'],['markings','🦄 Markings'],['eyes','👁 Eyes'],['orbs','🔮 Soulmarble Foundary'],['poles','🎠 Carousel Workshop'],['ribbons','🎀 Ribbon Atelier'],['tack','🛡 Tack Boutique'],['charms','✨ Charm Cabinet'],['fins','🌊 Fin Workshop'],['extras','⭐ Extra Traits'],['export','📋 Export']];
const forms=[{id:'horse',name:'Horse',icon:'🐴',rarity:'✦',skin:false},{id:'centaur',name:'Centaur',icon:'🎠',rarity:'✦',skin:true},{id:'hippocampus',name:'Hippocampus',icon:'🌊',rarity:'✦✦',skin:false},{id:'satyr',name:'Satyr',icon:'🐐',rarity:'✦',skin:true},{id:'hippocampustaur',name:'Hippocampustaur',icon:'🧜',rarity:'✦✦',skin:true}];
const skin=[{id:'fair',name:'Fair',color:'#e8c3a5'},{id:'warm',name:'Warm Tan',color:'#c58d67'},{id:'brown',name:'Brown',color:'#8e5d43'},{id:'deep',name:'Deep Brown',color:'#5b342a'},{id:'cool',name:'Cool Rose',color:'#d8a5a9'},{id:'lavender',name:'Lavender Fantasy',color:'#c5a5e8'}];
const eyePupils={
'✦ Common':[{name:'Horse Pupil',class:'pupil-horse',icon:'◐'},{name:'Human Pupil',class:'pupil-human',icon:'●'},{name:'Flower Pupil',class:'pupil-flower',icon:'✿'}],
'✦✦ Rare':[{name:'Butterfly Pupil',class:'pupil-butterfly',icon:'🦋'},{name:'Gear Pupil',class:'pupil-gear',icon:'⚙'},{name:'Heart Pupil',class:'pupil-heart',icon:'♥'}],
'✦✦✦ Mythical':[{name:'Star Pupil',class:'pupil-star',icon:'★'},{name:'Diamond Pupil',class:'pupil-diamond',icon:'◆'}]
};
const eyeColors=[{name:'Amber',color:'#f2c766',swatch:'#f2c766'},{name:'Brown',color:'#7a4a34',swatch:'#7a4a34'},{name:'Blue',color:'#3b82f6',swatch:'#3b82f6'},{name:'Green',color:'#22c55e',swatch:'#22c55e'},{name:'Lavender',color:'#b995ff',swatch:'#b995ff'},{name:'Rose',color:'#ef9fbd',swatch:'#ef9fbd'},{name:'Silver',color:'#cfd3d9',swatch:'#cfd3d9'},{name:'Black',color:'#1d1724',swatch:'#1d1724'}];
const hoofColors=[{name:'Black',color:'#1d1724',swatch:'#1d1724'},{name:'Brown',color:'#5a392b',swatch:'#5a392b'},{name:'Cream',color:'#fff0df',swatch:'#fff0df'},{name:'Grey',color:'#9d9997',swatch:'#9d9997'},{name:'Gold',color:'#f2c766',swatch:'#f2c766'},{name:'Silver',color:'#cfd3d9',swatch:'#cfd3d9'},{name:'Rose',color:'#ef9fbd',swatch:'#ef9fbd'}];
const extraTraits={
'✦ Common':[{name:'Body Carvings / Painted Decor'},{name:'Hair Stars / Flowers / Decor'}],
'✦✦ Rare':[{name:'Body / Hair Gems'},{name:'Cracks in Soulmarble'},{name:'Cracks on Body / Light from Cracks'},{name:'Glass / Resin Soulmarble Prosthetic / Partial Replacement'},{name:'On Body Wire / Alloy Decor'},{name:'Other Tail Types'},{name:'Pearlescent / Iridescent Sheen'},{name:'Pieces of Soulmarble in Hair / on Body'}],
'✦✦✦ Mythical':[{name:'Crystal Growths'},{name:'Crystalized Tail'},{name:'Elemental Traits'},{name:'Feather Tail'},{name:'Glow Accents'},{name:'Horns'},{name:'Orbits or Halo'},{name:'Wings'}]
};

const naturalCoats={
'Basic Colors':[{id:'black',name:'Black',color:'#1f1a1d'},{id:'bay',name:'Bay',color:'#7a452d'},{id:'brown',name:'Brown',color:'#5a392b'},{id:'chestnut',name:'Chestnut',color:'#a35230'},{id:'grey',name:'Grey',color:'#9d9997'},{id:'white',name:'White',color:'#f4efe8'}],
'Dilutes':[{id:'buckskin',name:'Buckskin',color:'#c99a5a'},{id:'cremello',name:'Cremello',color:'#f1ddc2'},{id:'perlino',name:'Perlino',color:'#ead2b8'},{id:'smoky-black',name:'Smoky Black',color:'#343035'},{id:'palomino',name:'Palomino',color:'#e7c36d'}],
'Roans':[{id:'blue-roan',name:'Blue Roan',color:'#6f7f91'},{id:'red-roan',name:'Red Roan',color:'#b46a5d'},{id:'bay-roan',name:'Bay Roan',color:'#876052'}]};
const fantasyIntegrations={
'Fantasy Markings':[{id:'stars',name:'Star Speckles',class:'stardust',icon:'✦',swatch:'radial-gradient(circle,#fff8c9 0 18%,#d79bff 45%,#2b1648 100%)'},{id:'petals',name:'Petal Dust',class:'petal',icon:'✿',swatch:'radial-gradient(circle,#ffd8e8,#e568a0 60%,#7d3158)'},{id:'glitter',name:'Glitter Dust',class:'glitter',icon:'✧',swatch:'radial-gradient(circle,#ffffff,#ffd977 45%,#8a5d27)'}],
'Coat Effects':[{id:'aurora',name:'Aurora Sheen',class:'aurora',icon:'☄',swatch:'linear-gradient(135deg,#52dccb,#d36ff1,#fff0a8)'},{id:'pearlescent',name:'Pearlescent Glow',class:'aurora',icon:'◌',swatch:'linear-gradient(135deg,#fff,#d7f4ff,#f7d8ff,#fff3bf)'},{id:'stardust',name:'Stardust',class:'stardust',icon:'✦',swatch:'radial-gradient(circle,#fff7ca,#e2b45e 55%,#51306a)'}],
'Accents / Gradients':[{id:'sunset',name:'Sunset Gradient',class:'sunset',icon:'▰',swatch:'linear-gradient(135deg,#ffd977,#e9a469,#9f5bb5)'},{id:'seafoam',name:'Seafoam Tint',class:'seafoam',icon:'▰',swatch:'linear-gradient(135deg,#f2fff9,#99d9cf,#509ba5)'},{id:'lavender',name:'Lavender Wash',class:'lavender',icon:'▰',swatch:'linear-gradient(135deg,#fff0ff,#d4b8f2,#7446a7)'}]};
const mythicalCoats={'Full Fantasy Colors':[{id:'galaxy',name:'Galaxy',color:'#252052',bonus:'stardust'},{id:'nebula',name:'Nebula',color:'#68428e',bonus:'aurora'},{id:'coral-reef',name:'Coral Reef',color:'#f19b96',bonus:'petal'},{id:'stained-glass',name:'Stained Glass',color:'#467fb5',bonus:'aurora'},{id:'patchwork',name:'Patchwork Plush',color:'#d8a58c'},{id:'midnight',name:'Midnight Toymaker',color:'#171026',bonus:'stardust'}]};
const coatMarkings={
'Paints':[{id:'none',name:'None',class:'',swatch:'linear-gradient(135deg,#fff8ef,#d8c2ff)'},{id:'tobiano',name:'Tobiano',class:'pinto',swatch:'linear-gradient(135deg,#fff 0 48%,#7a452d 50%)'},{id:'overo',name:'Overo',class:'pinto',swatch:'radial-gradient(circle at 35% 30%,#fff 0 28%,#7a452d 30% 100%)'}],
'Dapples':[{id:'none',name:'None',class:'',swatch:'linear-gradient(135deg,#fff8ef,#d8c2ff)'},{id:'dapple',name:'Dapple',class:'dapple',swatch:'radial-gradient(circle,#fff 0 22%,#9d9997 25% 100%)'}],
'Appaloosa':[{id:'none',name:'None',class:'',swatch:'linear-gradient(135deg,#fff8ef,#d8c2ff)'},{id:'blanket',name:'Blanket',class:'appaloosa',swatch:'radial-gradient(circle,#4c2b5c 0 14%,#fff 16% 100%)'},{id:'snowcap',name:'Snowcap',class:'appaloosa',swatch:'linear-gradient(135deg,#fff 0 70%,#876052 72%)'},{id:'leopard',name:'Leopard',class:'appaloosa',swatch:'radial-gradient(circle,#4c2b5c 0 12%,#fff 14% 100%)'}]};
const legMarkingOptions=[{id:'none',name:'None',type:'',swatch:'linear-gradient(135deg,#fff8ef,#d8c2ff)'},{id:'sock',name:'Sock',type:'sock',swatch:'linear-gradient(0deg,#fff 0 55%,#7a452d 56%)'},{id:'stocking',name:'Stocking',type:'stocking',swatch:'linear-gradient(0deg,#fff 0 80%,#7a452d 81%)'}];
const faceMarkings=[{id:'none',name:'None',class:'',swatch:'linear-gradient(135deg,#fff8ef,#d8c2ff)'},{id:'star',name:'Star',class:'star',swatch:'radial-gradient(circle,#fff 0 20%,#7a452d 22% 100%)'},{id:'stripe',name:'Stripe',class:'stripe',swatch:'linear-gradient(90deg,#7a452d 0 35%,#fff 36% 64%,#7a452d 65%)'},{id:'blaze',name:'Blaze',class:'blaze',swatch:'linear-gradient(90deg,#7a452d 0 24%,#fff 25% 75%,#7a452d 76%)'}];
const orbShapes={
'✦ Common':[{id:'oval',name:'Oval',shape:'shape-oval',swatch:'linear-gradient(135deg,#f6e6ff,#bcdcff)'},{id:'sphere',name:'Sphere',shape:'shape-sphere',swatch:'radial-gradient(circle,#fff,#bcdcff 55%,#6c4ca2)'}],
'✦✦ Rare':[{id:'cube',name:'Cube',shape:'shape-cube',swatch:'linear-gradient(135deg,#d9f5ff,#7bb8df)'},{id:'teardrop',name:'Teardrop',shape:'shape-teardrop',swatch:'linear-gradient(135deg,#fff,#aee8ff,#6b8bd6)'},{id:'pyramid',name:'Triangle / Pyramid',shape:'shape-pyramid',swatch:'linear-gradient(135deg,#fff6bf,#d59b51,#7b4785)'}],
'✦✦✦ Mythical':[{id:'star',name:'Star',shape:'shape-star',swatch:'linear-gradient(135deg,#fff5a8,#d78aff,#3a2c80)'},{id:'heart',name:'Heart',shape:'shape-heart',swatch:'linear-gradient(135deg,#ffe0ec,#f28ab5,#873c78)'}]
};
const orbMainColors=[{name:'Clear',color:'rgba(255,255,255,1)',swatch:'linear-gradient(135deg,#ffffff,#dff5ff)'},{name:'Pearl',color:'rgba(246,215,232,1)',swatch:'#f6d7e8'},{name:'Moon Blue',color:'rgba(188,220,255,1)',swatch:'#bcdcff'},{name:'Rose',color:'rgba(238,151,184,1)',swatch:'#ee97b8'},{name:'Violet',color:'rgba(136,98,216,1)',swatch:'#8862d8'},{name:'Night',color:'rgba(44,36,104,1)',swatch:'#2c2468'}];
const orbSecondColors=[{name:'None',color:'rgba(255,255,255,0)',swatch:'linear-gradient(135deg,#fff,#eee)'},{name:'Blue Gradient',color:'rgba(83,154,219,.9)',swatch:'linear-gradient(135deg,#fff,#539adb)'},{name:'Pink Gradient',color:'rgba(239,111,166,.9)',swatch:'linear-gradient(135deg,#fff,#ef6fa6)'},{name:'Gold Gradient',color:'rgba(236,179,88,.9)',swatch:'linear-gradient(135deg,#fff,#ecb358)'},{name:'Void Gradient',color:'rgba(27,17,48,.95)',swatch:'linear-gradient(135deg,#fff,#1b1130)'}];
const insideMarblePresets={
'Objects':[{name:'None',inside:'transparent',icon:'—'},{name:'Key',inside:'radial-gradient(circle at 50% 50%,transparent 0 25%,rgba(255,214,126,.8) 26% 32%,transparent 33%),linear-gradient(90deg,transparent 0 44%,rgba(255,214,126,.9) 45% 55%,transparent 56%)',icon:'🗝️'},{name:'Clock Gear',inside:'repeating-conic-gradient(from 0deg,rgba(213,156,82,.8) 0 8deg,transparent 9deg 18deg)',icon:'⚙'}],
'Flowers':[{name:'Rose',inside:'radial-gradient(circle at 45% 45%,#f28ab5 0 10%,transparent 12%),radial-gradient(circle at 56% 52%,#a5d69b 0 8%,transparent 10%)',icon:'🌹'},{name:'Daisy',inside:'radial-gradient(circle,#ffd977 0 8%,transparent 10%),repeating-conic-gradient(#fff 0 15deg,transparent 16deg 30deg)',icon:'✿'}],
'Scenery':[{name:'Tiny Clouds',inside:'radial-gradient(circle at 35% 45%,rgba(255,255,255,.9) 0 14%,transparent 16%),radial-gradient(circle at 55% 50%,rgba(255,255,255,.85) 0 18%,transparent 20%)',icon:'☁'},{name:'Moon Scene',inside:'radial-gradient(circle at 65% 32%,#fff6c4 0 12%,transparent 14%),linear-gradient(#1e235f,#71559f)',icon:'🌙'}],
'Snowglobe':[{name:'Snowglobe Snow',inside:'radial-gradient(circle,#fff 0 3px,transparent 4px),radial-gradient(circle at 30% 70%,#fff 0 2px,transparent 3px)',icon:'❄'}]
};
const orbEffects={
'Stars / Constellations':[{name:'None',effect:'',swatch:'linear-gradient(135deg,#fff,#eee)'},{name:'Stars',effect:'stars',swatch:'radial-gradient(circle,#fff7ca,#41266a)'},{name:'Constellations',effect:'constellations',swatch:'linear-gradient(135deg,#1d174b,#fff7ca)'}],
'Patterns':[{name:'Sparkle Dust',effect:'sparkles',swatch:'radial-gradient(circle,#fff,#e8b45c,#6f4a96)'},{name:'Petals',effect:'petals',swatch:'radial-gradient(circle,#fff,#ef9fbd)'},{name:'Bubbles',effect:'bubbles',swatch:'radial-gradient(circle,#fff,#7fc9cf)'}]
};
const wirePatterns=[{name:'None',class:'wire-none',swatch:'linear-gradient(135deg,#fff,#eee)'},{name:'Simple Ring',class:'wire-ring',swatch:'linear-gradient(135deg,#d9d9d9,#8f8f8f)'},{name:'Spiral Wrap',class:'wire-spiral',swatch:'linear-gradient(135deg,#c28a3e,#fff1b8)'},{name:'Double Spiral',class:'wire-double',swatch:'linear-gradient(135deg,#c28a3e,#56306d)'},{name:'Orb Cage',class:'wire-cage',swatch:'linear-gradient(135deg,#fff,#c28a3e,#fff)'}];
const wireTypes={
'✦ Common':[{name:'Brass',color:'#c28a3e',swatch:'#c28a3e'},{name:'Silver',color:'#cfd3d9',swatch:'#cfd3d9'}],
'✦✦ Rare':[{name:'Black',color:'#1d1724',swatch:'#1d1724'},{name:'Gold',color:'#f2c766',swatch:'#f2c766'},{name:'Rose Gold',color:'#d99a89',swatch:'#d99a89'}]
};

const spiralColors=[
{name:'Red',color:'#ef4444'},{name:'Orange',color:'#f97316'},{name:'Yellow',color:'#facc15'},{name:'Green',color:'#22c55e'},{name:'Blue',color:'#3b82f6'},{name:'Purple',color:'#a855f7'},{name:'Pink',color:'#ec4899'},{name:'Black',color:'#111827'},{name:'White',color:'#f8fafc'}
];
const headOrbSides=[{name:'Left Ear',side:'left',icon:'←'},{name:'Right Ear',side:'right',icon:'→'}];

const poleStyles={
'✦ Common':[
  {name:'None',class:'pole-style-none',icon:'—'},
  {name:'Straight',class:'pole-style-straight',icon:'│'},
  {name:'Simple Spiral',class:'pole-style-spiral',icon:'⥁'}
],
'✦✦ Rare':[
  {name:'Vine / Flower Spiral',class:'pole-style-vine',icon:'🌿'},
  {name:'Braided Spiral Around',class:'pole-style-braided',icon:'≋'},
  {name:'Ribbon Wrapped',class:'pole-style-ribbon',icon:'🎀'}
],
'✦✦✦ Mythical':[
  {name:'Floating Rings',class:'pole-style-rings',icon:'◎'},
  {name:'Crystal Spiral Around',class:'pole-style-crystal',icon:'◇'}
]
};
const poleMaterials={
'✦ Common':[
  {name:'Brass',color:'#c28a3e',swatch:'#c28a3e'},
  {name:'Steel',color:'#b7bec7',swatch:'#b7bec7'}
],
'✦✦ Rare':[
  {name:'Painted Wood',color:'#7a4a34',swatch:'#7a4a34'},
  {name:'Crystal',color:'#d7caff',swatch:'linear-gradient(135deg,#ffffff,#d7caff,#88f7ff)'}
]
};
const finOptions={
  dorsal:[{name:'None',icon:'—'},{name:'Soft Dorsal Fin',icon:'▴'},{name:'Spined Dorsal Fin',icon:'▵'},{name:'Ribbon Dorsal Fin',icon:'〰'}],
  tail:[{name:'None',icon:'—'},{name:'Fan Tail Fin',icon:'◖'},{name:'Betta Tail Fin',icon:'❧'},{name:'Koi Tail Fin',icon:'⌁'}],
  pelvic:[{name:'None',icon:'—'},{name:'Small Pelvic Fins',icon:'⌄'},{name:'Long Pelvic Fins',icon:'⌁'}],
  pectoral:[{name:'None',icon:'—'},{name:'Small Pectoral Fins',icon:'◁'},{name:'Winglike Pectoral Fins',icon:'❯'}],
  anal:[{name:'None',icon:'—'},{name:'Short Anal Fin',icon:'▾'},{name:'Ribbon Anal Fin',icon:'⌁'}]
};
const finColors=[{name:'Aqua',color:'#7fc9cf',swatch:'#7fc9cf'},{name:'Ocean Blue',color:'#3b82f6',swatch:'#3b82f6'},{name:'Lavender',color:'#b995ff',swatch:'#b995ff'},{name:'Rose',color:'#ef9fbd',swatch:'#ef9fbd'},{name:'Pearl',color:'#fff8ef',swatch:'#fff8ef'},{name:'Gold',color:'#f2c766',swatch:'#f2c766'}];
const poleToppers=[
  {name:'None',class:'topper-none',icon:'—'},
  {name:'Star',class:'topper-star',icon:'⭐'},
  {name:'Crescent Moon',class:'topper-moon',icon:'☾'},
  {name:'Sun',class:'topper-sun',icon:'☀'},
  {name:'Rose Bloom',class:'topper-rose',icon:'🌹'},
  {name:'Crystal Cluster',class:'topper-crystal',icon:'💎'},
  {name:'Carousel Horse',class:'topper-horse',icon:'🎠'},
  {name:'Music Box',class:'topper-music',icon:'♫'},
  {name:'Key',class:'topper-key',icon:'🗝'},
  {name:'Clock Face',class:'topper-clock',icon:'◴'},
  {name:'Butterfly',class:'topper-butterfly',icon:'🦋'},
  {name:'Lantern',class:'topper-lantern',icon:'🏮'}
];
const poleBottoms=[
  {name:'None',class:'bottom-none',icon:'—'},
  {name:'Crystal Drop',class:'bottom-crystal',icon:'💧'},
  {name:'Bell',class:'bottom-bell',icon:'🔔'},
  {name:'Tassel',class:'bottom-tassel',icon:'▾'},
  {name:'Ribbon Drop',class:'bottom-ribbon',icon:'🎀'},
  {name:'Flower',class:'bottom-flower',icon:'✿'},
  {name:'Lantern',class:'bottom-lantern',icon:'🏮'},
  {name:'Key',class:'bottom-key',icon:'🗝'},
  {name:'Small Orb',class:'bottom-orb',icon:'○'},
  {name:'Feather',class:'bottom-feather',icon:'🪶'}
];
const carouselTrims=[
  {name:'None',class:'trim-none',swatch:'linear-gradient(135deg,#fff,#eee)'},
  {name:'Gold Scrollwork',class:'trim-scroll',swatch:'linear-gradient(135deg,#fff4b8,#d99b34)'},
  {name:'Victorian Filigree',class:'trim-filigree',swatch:'linear-gradient(135deg,#f2c766,#7b4aa0)'},
  {name:'Art Nouveau Vines',class:'trim-vines',swatch:'linear-gradient(135deg,#2f8f4e,#f2c766)'},
  {name:'Stars',class:'trim-stars',swatch:'radial-gradient(circle,#fff7ca,#6d4a99)'},
  {name:'Hearts',class:'trim-hearts',swatch:'linear-gradient(135deg,#ff9fbd,#fff1b8)'},
  {name:'Diamonds',class:'trim-diamonds',swatch:'linear-gradient(135deg,#ffffff,#7fc9cf)'},
  {name:'Music Notes',class:'trim-music',swatch:'linear-gradient(135deg,#fff,#1d1724)'},
  {name:'Toymaker Gears',class:'trim-gears',swatch:'linear-gradient(135deg,#c28a3e,#4b2a60)'},
  {name:'Painted Flourishes',class:'trim-flourish',swatch:'linear-gradient(135deg,#ef9fbd,#7fc9cf,#f2c766)'}
];
const poleDecorations=[
  {key:'ivy',name:'Ivy',icon:'🌿'},
  {key:'flowers',name:'Flowers',icon:'✿'},
  {key:'ribbons',name:'Ribbons',icon:'🎀'},
  {key:'lace',name:'Lace',icon:'◡'},
  {key:'rope',name:'Rope',icon:'⛓'},
  {key:'charms',name:'Hanging Charms',icon:'✧'},
  {key:'bells',name:'Bells',icon:'🔔'},
  {key:'pearls',name:'Pearls',icon:'○'},
  {key:'lights',name:'Fairy Lights',icon:'✨'},
  {key:'petals',name:'Floating Petals',icon:'❀'},
  {key:'snow',name:'Snowflakes',icon:'❄'},
  {key:'music',name:'Music Notes',icon:'♫'}
];
const ribbonTypes={
'✦ Common':[{id:'none',name:'None',icon:'—'},{id:'bow',name:'Bow',icon:'🎀'},{id:'ribbon',name:'Ribbon',icon:'〰'},{id:'tassel',name:'Tassel',icon:'▾'}],
'✦✦ Rare':[{id:'feather',name:'Feather',icon:'🪶'},{id:'flowers',name:'Flowers',icon:'✿'},{id:'lace',name:'Lace / Fabric Drapery',icon:'◡'}],
'✦✦✦ Mythical':[{id:'butterfly',name:'Butterfly',icon:'🦋'},{id:'fairy',name:'Fairy',icon:'✦'},{id:'wing',name:'Wing',icon:'🪽'}]
};
const ribbonColors=[{name:'None',color:'transparent',swatch:'linear-gradient(135deg,#fff,#eee)'},{name:'White',color:'#fff8ef',swatch:'#fff8ef'},{name:'Black',color:'#1d1724',swatch:'#1d1724'},{name:'Lavender',color:'#b995ff',swatch:'#b995ff'},{name:'Rose',color:'#ef9fbd',swatch:'#ef9fbd'},{name:'Ocean',color:'#7fc9cf',swatch:'#7fc9cf'},{name:'Gold',color:'#f2c766',swatch:'#f2c766'},{name:'Red',color:'#ef4444',swatch:'#ef4444'},{name:'Blue',color:'#3b82f6',swatch:'#3b82f6'},{name:'Green',color:'#22c55e',swatch:'#22c55e'}];
const ribbonPatterns=[{name:'None',class:''},{name:'Dots',class:'pattern-dots'},{name:'Stripes',class:'pattern-stripes'},{name:'Edges',class:'pattern-edges'},{name:'Gradient',class:'pattern-gradient'}];
const thirdRibbonPatterns=[{name:'None',class:''},{name:'Knot Dot',class:'third-dots'}];

const tackSections={
  saddle:{title:'Saddle',forms:['hippocampus','hippocampustaur','centaur','horse'],items:[{name:'None',icon:'—'},{name:'Classic Saddle',icon:'◠'},{name:'Carousel Saddle',icon:'♛'},{name:'Travel Saddle',icon:'▱'}]},
  saddlePad:{title:'Saddle Pad',forms:['hippocampus','hippocampustaur','centaur','horse'],items:[{name:'None',icon:'—'},{name:'Plain Pad',icon:'▭'},{name:'Quilted Pad',icon:'▦'},{name:'Star Pad',icon:'✦'}]},
  barding:{title:'Barding',forms:['centaur','horse'],items:[{name:'None',icon:'—'},{name:'Light Barding',icon:'◈'},{name:'Parade Barding',icon:'✥'},{name:'Knight Barding',icon:'⬟'}]},
  bridle:{title:'Bridle',forms:['horse','hippocampus'],items:[{name:'None',icon:'—'},{name:'Simple Bridle',icon:'⌁'},{name:'Decorated Bridle',icon:'✧'},{name:'Royal Bridle',icon:'♕'}]},
  breastCollar:{title:'Breast Collar',forms:['horse','centaur','hippocampus','hippocampustaur'],items:[{name:'None',icon:'—'},{name:'Simple Breast Collar',icon:'⌁'},{name:'Carousel Breast Collar',icon:'✦'},{name:'Royal Breast Collar',icon:'♕'}]},
  legArmor:{title:'Leg Armor',forms:['satyr','horse','centaur','hippocampus','hippocampustaur'],items:[{name:'None',icon:'—'},{name:'Hoof Guards',icon:'▰'},{name:'Shin Plates',icon:'▥'},{name:'Decorative Greaves',icon:'✦'}]},
  torsoArmor:{title:'Torso Armor',forms:['centaur','hippocampustaur','satyr'],items:[{name:'None',icon:'—'},{name:'Soft Vest',icon:'▱'},{name:'Plate Torso',icon:'⬟'},{name:'Parade Corslet',icon:'✧'}]}
};
const tackColors=[{name:'Leather Brown',color:'#7a4a34'},{name:'Black Leather',color:'#1d1724'},{name:'Cream',color:'#fff0df'},{name:'Brass',color:'#c28a3e'},{name:'Silver',color:'#b8bac4'},{name:'Gold',color:'#f2c766'},{name:'Rose Gold',color:'#d9957d'},{name:'Lavender',color:'#b995ff'}];
const tackColorGroups={
  saddle:[{name:'Leather Brown',color:'#7a4a34'},{name:'Dark Brown',color:'#4a2c22'},{name:'Black Leather',color:'#1d1724'},{name:'Cream Leather',color:'#fff0df'},{name:'Red Leather',color:'#7f1d1d'}],
  saddlePad:[{name:'Cream',color:'#fff0df'},{name:'Lavender',color:'#b995ff'},{name:'Rose',color:'#ef9fbd'},{name:'Ocean',color:'#7fc9cf'},{name:'Royal Blue',color:'#3b82f6'},{name:'Emerald',color:'#22c55e'},{name:'Gold',color:'#f2c766'}],
  barding:[{name:'Carousel Gold',color:'#f2c766'},{name:'Parade Red',color:'#b91c1c'},{name:'Royal Purple',color:'#7c3aed'},{name:'Midnight Blue',color:'#1e3a8a'},{name:'Mint Festival',color:'#7fc9cf'},{name:'Rose Carnival',color:'#ef9fbd'}],
  bridle:[{name:'Leather Brown',color:'#7a4a34'},{name:'Dark Brown',color:'#4a2c22'},{name:'Black Leather',color:'#1d1724'},{name:'Cream Leather',color:'#fff0df'}],
  breastCollar:[{name:'Leather Brown',color:'#7a4a34'},{name:'Dark Brown',color:'#4a2c22'},{name:'Black Leather',color:'#1d1724'},{name:'Cream Leather',color:'#fff0df'},{name:'Royal Purple',color:'#7c3aed'}],
  legArmor:[{name:'Brass',color:'#c28a3e'},{name:'Silver',color:'#b8bac4'},{name:'Gold',color:'#f2c766'},{name:'Rose Gold',color:'#d9957d'},{name:'Black Steel',color:'#24242b'}],
  torsoArmor:[{name:'Brass',color:'#c28a3e'},{name:'Silver',color:'#b8bac4'},{name:'Gold',color:'#f2c766'},{name:'Rose Gold',color:'#d9957d'},{name:'Black Steel',color:'#24242b'}]
};

const tackAccentGroups={
  saddle:[{name:'Brass Trim',color:'#c28a3e'},{name:'Silver Trim',color:'#b8bac4'},{name:'Gold Trim',color:'#f2c766'},{name:'Rose Gold Trim',color:'#d9957d'},{name:'Cream Stitching',color:'#fff0df'}],
  saddlePad:[{name:'Gold Trim',color:'#f2c766'},{name:'White Trim',color:'#fff8ef'},{name:'Lavender Trim',color:'#b995ff'},{name:'Rose Trim',color:'#ef9fbd'},{name:'Ocean Trim',color:'#7fc9cf'}],
  barding:[{name:'Gold Filigree',color:'#f2c766'},{name:'Silver Filigree',color:'#b8bac4'},{name:'Cream Trim',color:'#fff0df'},{name:'Rose Trim',color:'#ef9fbd'},{name:'Black Trim',color:'#1d1724'}],
  bridle:[{name:'Brass Fittings',color:'#c28a3e'},{name:'Silver Fittings',color:'#b8bac4'},{name:'Gold Fittings',color:'#f2c766'},{name:'Rose Gold Fittings',color:'#d9957d'}],
  breastCollar:[{name:'Brass Fittings',color:'#c28a3e'},{name:'Silver Fittings',color:'#b8bac4'},{name:'Gold Fittings',color:'#f2c766'},{name:'Rose Gold Fittings',color:'#d9957d'},{name:'Star Trim',color:'#fff8ef'}],
  legArmor:[{name:'Bright Highlight',color:'#fff8ef'},{name:'Gold Accent',color:'#f2c766'},{name:'Silver Accent',color:'#b8bac4'},{name:'Black Accent',color:'#1d1724'}],
  torsoArmor:[{name:'Bright Highlight',color:'#fff8ef'},{name:'Gold Accent',color:'#f2c766'},{name:'Silver Accent',color:'#b8bac4'},{name:'Black Accent',color:'#1d1724'}]
};
const charmRings=[{name:'None',icon:'—'},{name:'Round Ring',class:'ring-round',icon:'○'},{name:'Oval Ring',class:'ring-oval',icon:'0'},{name:'Heart Ring',class:'ring-heart',icon:'♡'},{name:'Star Ring',class:'ring-star',icon:'☆'}];
const charmShapes=[{name:'None',class:'',icon:'—'},{name:'Star',class:'charm-shape-star',icon:'☆'},{name:'Heart',class:'charm-shape-heart',icon:'♡'},{name:'Moon',class:'charm-shape-moon',icon:'☾'},{name:'Key',class:'charm-shape-key',icon:'⚿'},{name:'Flower',class:'charm-shape-flower',icon:'✿'},{name:'Gem',class:'charm-shape-gem',icon:'◆'}];
const charmObjects=[{name:'None',class:'',icon:'—'},{name:'Book',class:'charm-shape-gem',icon:'▣'},{name:'Bell',class:'charm-shape-moon',icon:'◍'},{name:'Gear',class:'charm-shape-star',icon:'⚙'},{name:'Shell',class:'charm-shape-heart',icon:'◡'},{name:'Lantern',class:'charm-shape-gem',icon:'▱'}];
const charmColors=[{name:'Gold',color:'#f2c766'},{name:'Silver',color:'#b8bac4'},{name:'Rose',color:'#ef9fbd'},{name:'Lavender',color:'#b995ff'},{name:'Ocean',color:'#7fc9cf'},{name:'Black',color:'#1d1724'},{name:'White',color:'#fff8ef'}];

let room='forms';
const state={form:'horse',formName:'Horse',skinName:'Hidden',skinColor:'#e8c3a5',coatName:'White',coatColor:'#f4efe8',customCoatData:'',mythicalBonus:'',fantasyMarkingName:'None',fantasyMarkingClass:'',coatEffectName:'None',coatEffectClass:'',gradientName:'None',gradientClass:'',coatMarkingName:'None',coatMarkingClass:'',furredLegs:false,faceMarkingName:'None',faceMarkingClass:'',furredLegs:false,legMarks:{fl:'None',fr:'None',bl:'None',br:'None'},legTypes:{fl:'',fr:'',bl:'',br:''},orbName:'None',orbShapeName:'Sphere',orbShapeClass:'shape-sphere',orbMainName:'Moon Blue',orbMainColor:'rgba(188,220,255,1)',orbSecondName:'None',orbSecondColor:'rgba(255,255,255,0)',insideName:'None',insideMarble:'transparent',insideCustomData:'',orbEffectName:'None',orbEffectClass:'',orbEffectCustomData:'',spiralsEnabled:false,spiralCount:0,spiralColors:{one:'#ef4444',two:'#3b82f6',three:'#facc15'},headOrbSide:'left',wirePatternName:'Simple Ring',wirePatternClass:'wire-ring',wireTypeName:'Brass',wireColor:'#c28a3e',poleName:'None',poleStyleName:'None',poleStyleClass:'pole-style-none',poleMaterialName:'Brass',poleMaterialColor:'#c28a3e',poleCustomData:'',poleCustomData:'',poleTopperName:'None',poleTopperClass:'topper-none',poleBottomName:'None',poleBottomClass:'bottom-none',poleTrimName:'None',poleTrimClass:'trim-none',poleDecorations:{ivy:false,flowers:false,ribbons:false,lace:false,rope:false,charms:false,bells:false,pearls:false,lights:false,petals:false,snow:false,music:false},ribbonTypeName:'None',ribbonMainName:'Lavender',ribbonMainColor:'#b995ff',ribbonSecondName:'None',ribbonSecondColor:'transparent',ribbonSecondPatternName:'None',ribbonSecondPatternClass:'',ribbonThirdName:'None',ribbonThirdColor:'transparent',ribbonThirdPatternName:'None',ribbonThirdPatternClass:'',ribbonCustomData:'',tack:{saddle:'None',saddlePad:'None',barding:'None',bridle:'None',breastCollar:'None',legArmor:'None',torsoArmor:'None'},tackColors:{saddle:'#7a4a34',saddlePad:'#fff0df',barding:'#f2c766',bridle:'#7a4a34',breastCollar:'#7a4a34',legArmor:'#c28a3e',torsoArmor:'#c28a3e'},tackColorNames:{saddle:'Leather Brown',saddlePad:'Cream',barding:'Carousel Gold',bridle:'Leather Brown',breastCollar:'Leather Brown',legArmor:'Brass',torsoArmor:'Brass'},tackAccentColors:{saddle:'#c28a3e',saddlePad:'#f2c766',barding:'#f2c766',bridle:'#c28a3e',breastCollar:'#c28a3e',legArmor:'#fff8ef',torsoArmor:'#fff8ef'},tackAccentNames:{saddle:'Brass Trim',saddlePad:'Gold Trim',barding:'Gold Filigree',bridle:'Brass Fittings',breastCollar:'Brass Fittings',legArmor:'Bright Highlight',torsoArmor:'Bright Highlight'},tackMainName:'Leather Brown',tackMainColor:'#7a4a34',tackSecondName:'Brass',tackSecondColor:'#c28a3e',charmRingName:'None',charmRingClass:'',charm1Name:'None',charm1Class:'',charm1Color:'#f2c766',charm1CustomData:'',charm2Name:'None',charm2Class:'',charm2Color:'#b995ff',charm2CustomData:'',charm3Name:'None',charm3Class:'',charm3Color:'#7fc9cf',charm3CustomData:'',fins:{dorsal:'None',tail:'Fan Tail Fin',pelvic:'None',pectoral:'None',anal:'None'},finClasses:{dorsal:'fin-style-none',tail:'fin-style-fan',pelvic:'fin-style-none',pectoral:'fin-style-none',anal:'fin-style-none'},finColorName:'Aqua',finColor:'#7fc9cf',finAccentName:'Lavender',finAccentColor:'#b995ff',fins:{dorsal:'None',tail:'Fan Tail Fin',pelvic:'None',pectoral:'None',anal:'None'},finClasses:{dorsal:'fin-style-none',tail:'fin-style-fan',pelvic:'fin-style-none',pectoral:'fin-style-none',anal:'fin-style-none'},finColorName:'Aqua',finColor:'#7fc9cf',finAccentName:'Lavender',finAccentColor:'#b995ff',eyePupilName:'Horse Pupil',eyePupilClass:'pupil-horse',eyeColorName:'Amber',eyeColor:'#f2c766',eyeSecondName:'None',eyeSecondColor:'#f2c766',hoofName:'Black',hoofColor:'#1d1724',coatMarkingCustomData:'',extraTraits:{}};
const $=id=>document.getElementById(id); const usesSkin=()=>forms.find(f=>f.id===state.form)?.skin; const usesFace=()=>state.form==='horse'||state.form==='hippocampus'; const usesFins=()=>state.form==='hippocampus'||state.form==='hippocampustaur';
const coatOpenState={common:true,rare:true,mythical:true};
const markingOpenState={coat:true,legs:true,face:true,orbShape:true,orbColors:true,orbInside:true,orbEffects:true,orbWire:true,headOrbPlacement:true,ribbonType:true,ribbonColors:true,tackGear:true,tackColors:true,charmRing:true,charm1:true,charm2:true,charm3:true,eyes:true,hoof:true,extrasCommon:true,extrasRare:true,extrasMythical:true};
function initNav(){ $('nav').innerHTML=rooms.map(r=>`<button data-room="${r[0]}">${r[1]}</button>`).join(''); document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>{ if(room===b.dataset.room) return; const book=$('bookGrid'); const browser=document.querySelector('.browser'); if(book){book.classList.remove('turning'); void book.offsetWidth; book.classList.add('turning'); setTimeout(()=>book.classList.remove('turning'),520);} if(browser){browser.classList.remove('page-change'); void browser.offsetWidth; browser.classList.add('page-change'); setTimeout(()=>browser.classList.remove('page-change'),420);} room=b.dataset.room; render();}); }
function trait(item,onClick,active=false,rarity='✦',swatchMode=false){const b=document.createElement('button');const bg=item.swatch||item.color||'';const badge=(item.rarity!==undefined?item.rarity:rarity)||'';const showBadge=badge&&badge!=='-'&&badge.trim()!=='';b.className='trait'+(active?' active':'')+(swatchMode?' swatch-trait':'')+(item.shape?' shape-swatch':'')+(!showBadge?' no-badge':'');if(swatchMode){b.style.setProperty('--swatch',bg||'linear-gradient(135deg,#fff8ef,#d8c2ff)');b.title=showBadge?`${item.name} — ${badge}`:item.name;b.innerHTML=`${showBadge?`<span class="stars">${badge}</span>`:''}${item.shape?`<span class="mini-shape ${item.shape}"></span>`:''}<span class="name">${item.name}</span>`;}else{b.innerHTML=`${showBadge?`<span class="stars">${badge}</span>`:''}${item.color?`<span class="swatch" style="background:${item.color}"></span>`:`<span class="icon">${item.icon||'✧'}</span>`}<span class="name">${item.name}</span>`;}b.onclick=onClick;return b;}
function grid(items,cb,activeName,rarity='✦',swatchMode=false){const g=document.createElement('div');g.className=swatchMode?'swatch-grid':'trait-grid';items.forEach(i=>g.appendChild(trait(i,()=>cb(i),i.name===activeName,rarity,swatchMode)));return g;}
function raritySection(container,title,rarity,key){const d=document.createElement('details');d.className='group rarity-section';d.dataset.rarityKey=key;d.open=coatOpenState[key]!==false;d.innerHTML=`<summary>${title}</summary>`;d.addEventListener('toggle',()=>{coatOpenState[key]=d.open;});container.appendChild(d);return d;}
function markingSection(container,title,key){const d=document.createElement('details');d.className='group marking-section';d.open=markingOpenState[key]!==false;d.innerHTML=`<summary>${title}</summary>`;d.addEventListener('toggle',()=>{markingOpenState[key]=d.open;});container.appendChild(d);return d;}
function addFurredToggle(container){const label=document.createElement('label');label.className='check-toggle';label.innerHTML=`<input type="checkbox" id="furredLegToggle" ${state.furredLegs?'checked':''}/><span><strong>Furred Legs</strong><br><small>Applies to the available legs for this form and stacks underneath socks or stockings.</small></span>`;container.appendChild(label);setTimeout(()=>{const el=$('furredLegToggle');if(el){el.onchange=()=>{state.furredLegs=el.checked;render();};}},0);}
function addSwatchCategory(container,title,items,onChange,currentName,rarity){const wrap=document.createElement('div');wrap.innerHTML=`<div class="sub-title">${title}</div>`;wrap.appendChild(grid(items,onChange,currentName,rarity,true));container.appendChild(wrap);}
function addHexInput(container,label,getValue,setValue){const id='hex_'+Math.random().toString(36).slice(2);const row=document.createElement('div');row.className='hex-row';row.innerHTML=`<label>${label}</label><input id="${id}" type="text" placeholder="#b995ff" value="${(getValue()||'').startsWith('#')?getValue():''}"><button type="button">Apply</button>`;container.appendChild(row);const input=row.querySelector('input');const btn=row.querySelector('button');btn.onclick=()=>{const v=input.value.trim();if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)){setValue(v);render();}else{alert('Please enter a valid HEX color like #b995ff.');}};}
function addCustomCoatUpload(container){const box=document.createElement('div');box.className='custom-upload';box.innerHTML=`<label>Import Custom Coat Texture</label><input type="file" id="customCoatInput" accept="image/png,image/jpeg,image/webp"/><small>Applies a local uploaded texture/image to the prototype body. It stays only in your browser while the page is open.</small><button class="btn clear-custom" id="clearCustomCoat">Clear Custom Coat</button>`;container.appendChild(box);setTimeout(()=>{const input=$('customCoatInput');const clear=$('clearCustomCoat');if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.customCoatData=reader.result;state.coatName='Custom Imported Coat';render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state.customCoatData='';if(state.coatName==='Custom Imported Coat'){state.coatName='White';state.coatColor='#f4efe8';}render();};}},0);}


function addCoatMarkingUpload(container){const box=document.createElement('div');box.className='custom-upload';box.innerHTML=`<label>Import Coat Marking PNG</label><input type="file" id="coatMarkingInput" accept="image/png,image/jpeg,image/webp"/><small>Local preview only. Places your uploaded image over the body marking area.</small><button class="btn clear-custom" id="clearCoatMarking">Clear Imported Marking</button>`;container.appendChild(box);setTimeout(()=>{const input=$('coatMarkingInput');const clear=$('clearCoatMarking');if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.coatMarkingName='Imported PNG';state.coatMarkingClass='custom-image';state.coatMarkingCustomData=reader.result;render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state.coatMarkingCustomData='';if(state.coatMarkingName==='Imported PNG'){state.coatMarkingName='None';state.coatMarkingClass='';}render();};}},0);}
function selectedExtraSummary(){return Object.keys(state.extraTraits||{}).filter(k=>state.extraTraits[k]).join(', ')||'None';}
function addExtraToggles(container,title,items,key){const box=markingSection(container,title,key);const grid=document.createElement('div');grid.className='extra-toggle-grid';items.forEach(it=>{const lab=document.createElement('label');lab.className='extra-check';lab.innerHTML=`<input type="checkbox" ${state.extraTraits[it.name]?'checked':''} data-extra="${it.name}"><span>${it.name}</span>`;grid.appendChild(lab);});box.appendChild(grid);box.querySelectorAll('[data-extra]').forEach(inp=>inp.onchange=()=>{state.extraTraits[inp.dataset.extra]=inp.checked;render();});}
function addPaintedPoleUpload(container){if(state.poleMaterialName!=='Painted Wood')return;const box=document.createElement('div');box.className='custom-upload';box.innerHTML=`<label>Import Painted Wood Pole PNG</label><input type="file" id="paintedPoleInput" accept="image/png,image/jpeg,image/webp"/><small>Local preview only. Since painted wood is custom-painted, this applies your image texture to the pole.</small><button class="btn clear-custom" id="clearPaintedPole">Clear Painted Pole Texture</button>`;container.appendChild(box);setTimeout(()=>{const input=$('paintedPoleInput');const clear=$('clearPaintedPole');if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{state.poleCustomData=ev.target.result;render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state.poleCustomData='';render();};}},0);}
function addInsideUpload(container){const box=document.createElement('div');box.className='custom-upload';box.innerHTML=`<label>Import Inside Marble PNG</label><input type="file" id="insideMarbleInput" accept="image/png,image/jpeg,image/webp"/><small>Places your uploaded image inside the transparent soulmarble as a local preview.</small><button class="btn clear-custom" id="clearInsideMarble">Clear Inside Marble</button>`;container.appendChild(box);setTimeout(()=>{const input=$('insideMarbleInput');const clear=$('clearInsideMarble');if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.orbName='Custom Soulmarble';state.insideName='Imported PNG';state.insideCustomData=reader.result;render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state.insideName='None';state.insideMarble='transparent';state.insideCustomData='';render();};}},0);}

function addEffectUpload(container){const box=document.createElement('div');box.className='custom-upload';box.innerHTML=`<label>Import Soulmarble Effect PNG</label><input type="file" id="orbEffectInput" accept="image/png,image/jpeg,image/webp"/><small>Places your uploaded effect over the soulmarble, like glitter, glow, symbols, or a pattern overlay.</small><button class="btn clear-custom" id="clearOrbEffect">Clear Imported Effect</button>`;container.appendChild(box);setTimeout(()=>{const input=$('orbEffectInput');const clear=$('clearOrbEffect');if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.orbName='Custom Soulmarble';state.orbEffectName='Imported Effect PNG';state.orbEffectCustomData=reader.result;render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state.orbEffectCustomData='';if(state.orbEffectName==='Imported Effect PNG')state.orbEffectName='None';render();};}},0);}
function spiralBackground(){const cols=[state.spiralColors.one,state.spiralColors.two,state.spiralColors.three];if(!state.spiralCount)return 'transparent';const layers=[];if(state.spiralCount>=1)layers.push(`repeating-conic-gradient(from 28deg at 42% 45%, transparent 0 22deg, ${cols[0]} 23deg 38deg, rgba(255,255,255,.45) 39deg 44deg, transparent 45deg 95deg)`);if(state.spiralCount>=2)layers.push(`repeating-conic-gradient(from 145deg at 58% 55%, transparent 0 28deg, ${cols[1]} 29deg 43deg, rgba(255,255,255,.28) 44deg 48deg, transparent 49deg 100deg)`);if(state.spiralCount>=3)layers.push(`repeating-radial-gradient(ellipse at 52% 48%, transparent 0 8px, ${cols[2]} 9px 12px, transparent 13px 25px)`);return layers.join(',');}
function applySpiralLayer(){state.orbName='Custom Soulmarble';if(state.spiralsEnabled && state.spiralCount<1)state.spiralCount=1;}
function addSpiralBuilder(container){const box=document.createElement('div');box.className='spiral-builder';const activeCount=state.spiralsEnabled?Math.max(state.spiralCount,1):0;box.innerHTML=`<label class="check-toggle"><input type="checkbox" id="addSpirals" ${state.spiralsEnabled?'checked':''}/><span><strong>Add Spirals</strong><br><small>Stacks over the chosen Inside Marble instead of replacing it.</small></span></label>${state.spiralsEnabled?`<div class="sub-title">Custom Spiral Builder</div><div class="spiral-row"><span class="spiral-label">Amount</span>${[1,2,3].map(n=>`<button class="small-pill ${activeCount===n?'active':''}" data-spiral-count="${n}">${n}</button>`).join('')}</div>${['one','two','three'].slice(0,activeCount).map((key,idx)=>`<div class="spiral-row"><span class="spiral-label">Spiral ${idx+1}</span>${spiralColors.map(c=>`<button class="spiral-color ${state.spiralColors[key]===c.color?'active':''}" title="${c.name}" style="background:${c.color}" data-spiral-key="${key}" data-spiral-color="${c.color}"></button>`).join('')}</div>`).join('')}<small>Choose 1–3 overlapping spiral patterns, then pick a classic marble color for each spiral.</small>`:''}`;container.appendChild(box);const toggle=box.querySelector('#addSpirals');if(toggle)toggle.onchange=()=>{state.spiralsEnabled=toggle.checked;if(state.spiralsEnabled && state.spiralCount<1)state.spiralCount=1;if(!state.spiralsEnabled)state.spiralCount=0;applySpiralLayer();render();};box.querySelectorAll('[data-spiral-count]').forEach(btn=>btn.onclick=()=>{state.spiralsEnabled=true;state.spiralCount=Number(btn.dataset.spiralCount);applySpiralLayer();render();});box.querySelectorAll('[data-spiral-color]').forEach(btn=>btn.onclick=()=>{state.spiralsEnabled=true;state.spiralColors[btn.dataset.spiralKey]=btn.dataset.spiralColor;applySpiralLayer();render();});}
function addHeadOrbPlacement(container){if(!usesSkin())return;const box=markingSection(container,'Head Soulmarble Placement','headOrbPlacement');box.appendChild(grid(headOrbSides,i=>{state.headOrbSide=i.side;render();},state.headOrbSide==='left'?'Left Ear':'Right Ear','✦'));}

function activeLegKeys(){return (state.form==='satyr'||state.form==='hippocampustaur'||state.form==='hippocampus')?['fl','fr']:['fl','fr','bl','br'];}
function activeLegLabel(k){return {fl:'Front Left',fr:'Front Right',bl:'Back Left',br:'Back Right'}[k]||k;}
function ribbonTypeId(){const found=Object.values(ribbonTypes).flat().find(r=>r.name===state.ribbonTypeName);return found?found.id:'bow';}
function applyRibbonElement(el){const has=state.ribbonTypeName&&state.ribbonTypeName!=='None';el.style.display=has?'block':'none';el.style.setProperty('--ribbon-main',state.ribbonMainColor||'#b995ff');el.style.setProperty('--ribbon-second',state.ribbonSecondColor||'transparent');el.style.setProperty('--ribbon-third',state.ribbonThirdColor||'transparent');el.style.setProperty('--ribbon-fill',state.ribbonCustomData?`url(${state.ribbonCustomData})`:(state.ribbonMainColor||'#b995ff'));el.className=el.className.split(' ').filter(c=>!c.startsWith('pattern-')&&!c.startsWith('third-')&&!c.startsWith('side-')&&!c.startsWith('ribbon-type-')).join(' ')+' ribbon-type-'+ribbonTypeId()+' '+(state.ribbonSecondPatternClass||'')+' '+(state.ribbonThirdPatternClass||'')+(el.classList.contains('head-ribbon')?' side-'+state.headOrbSide:'');}
function addRibbonUpload(container){const wrap=document.createElement('div');wrap.className='custom-upload ribbon-upload';wrap.innerHTML='<label>Upload own ribbon texture</label><input type="file" id="ribbonTextureInput" accept="image/png,image/jpeg,image/webp"><small>Local preview only. This textures the ribbon shape in your browser.</small><button class="btn clear-custom" id="clearRibbonTexture">Clear Ribbon Texture</button>';container.appendChild(wrap);setTimeout(()=>{const input=$('ribbonTextureInput');const clear=$('clearRibbonTexture');if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{state.ribbonCustomData=ev.target.result;render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state.ribbonCustomData='';render();};}},0);}
function addTackPicker(container,key){if(!sectionAllowed(key))return;const sec=tackSections[key];const box=markingSection(container,sec.title,'tack_'+key);box.appendChild(grid(sec.items,i=>{state.tack[key]=i.name;render();},state.tack[key]));}
function addTackColorPicker(container,key){if(!sectionAllowed(key))return;const sec=tackSections[key];const colors=tackColorGroups[key]||tackColors;addSwatchCategory(container,sec.title+' Main Color',colors,i=>{state.tackColors[key]=i.color;state.tackColorNames[key]=i.name;render();},state.tackColorNames[key],'');addHexInput(container,sec.title+' Main HEX',()=>state.tackColors[key],v=>{state.tackColors[key]=v;state.tackColorNames[key]='Custom HEX';});const accentColors=tackAccentGroups[key]||tackColors;addSwatchCategory(container,sec.title+' Accent / Trim',accentColors,i=>{state.tackAccentColors[key]=i.color;state.tackAccentNames[key]=i.name;render();},state.tackAccentNames[key],'');addHexInput(container,sec.title+' Accent HEX',()=>state.tackAccentColors[key],v=>{state.tackAccentColors[key]=v;state.tackAccentNames[key]='Custom HEX';});}
function addTackSection(container,key){if(!sectionAllowed(key))return;const sec=tackSections[key];const box=markingSection(container,sec.title,'tack_'+key);box.innerHTML += `<p class="form-note">Choose ${sec.title.toLowerCase()} style, main color, and accent/trim color.</p>`;box.appendChild(grid(sec.items,i=>{state.tack[key]=i.name;render();},state.tack[key]));addTackColorPicker(box,key);}
function addCharmUpload(container,num){const box=document.createElement('div');box.className='custom-upload';box.innerHTML=`<label>Import PNG for Charm ${num}</label><input type="file" id="charmUpload${num}" accept="image/png,image/jpeg,image/webp"/><small>Local preview only. This fills Charm ${num} with your uploaded image.</small><button class="btn clear-custom" id="clearCharm${num}">Clear Charm ${num}</button>`;container.appendChild(box);setTimeout(()=>{const input=$('charmUpload'+num);const clear=$('clearCharm'+num);if(input){input.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{state['charm'+num+'Name']='Imported PNG';state['charm'+num+'CustomData']=ev.target.result;render();};reader.readAsDataURL(file);};}if(clear){clear.onclick=()=>{state['charm'+num+'CustomData']='';if(state['charm'+num+'Name']==='Imported PNG')state['charm'+num+'Name']='None';render();};}},0);}
function addCharmPicker(container,num){const box=markingSection(container,'Charm '+num,'charm'+num);const all=[...charmShapes,...charmObjects.filter(x=>x.name!=='None')];addSwatchCategory(box,'Charms',all,i=>{state['charm'+num+'Name']=i.name;state['charm'+num+'Class']=i.class;state['charm'+num+'CustomData']='';render();},state['charm'+num+'Name'],'');addSwatchCategory(box,'Charm '+num+' Color',charmColors,i=>{state['charm'+num+'Color']=i.color;render();},'', '');addHexInput(box,'Charm '+num+' HEX',()=>state['charm'+num+'Color'],v=>{state['charm'+num+'Color']=v;});addCharmUpload(box,num);}
function anyCharm(){return state.charm1Name!=='None'||state.charm2Name!=='None'||state.charm3Name!=='None';}

function sectionAllowed(key){
  const sec=tackSections[key];
  return !!(sec && sec.forms && sec.forms.includes(state.form));
}
function addPatternPicker(container,title,items,currentName,cb){
  const wrap=document.createElement('div');
  wrap.innerHTML=`<div class="sub-title">${title}</div>`;
  wrap.appendChild(grid(items,cb,currentName,'✦',true));
  container.appendChild(wrap);
}
function ensureOrbLayers(el){
  if(!el.querySelector('.orb-spirals')){const s=document.createElement('span');s.className='orb-spirals';el.appendChild(s);}
  if(!el.querySelector('.orb-effect-image')){const img=document.createElement('span');img.className='orb-effect-image';el.appendChild(img);}
  if(!el.querySelector('.orb-effects')){const fx=document.createElement('span');fx.className='orb-effects';el.appendChild(fx);}
}
function syncOrbElement(el){
  if(!el)return;
  ensureOrbLayers(el);
  const isHead=el.classList.contains('head-orb');
  const isBody=el.classList.contains('body-orb');
  const show=state.orbName && state.orbName!=='None';
  const base=isHead?'orb head-orb':'orb body-orb';
  const side=isHead && usesSkin()?(' side-'+state.headOrbSide):'';
  el.className=[base,state.orbShapeClass||'shape-sphere',state.wirePatternClass||'wire-ring',side].join(' ').trim();
  el.style.display=show?'block':'none';
  el.style.setProperty('--orb-main',state.orbMainColor||'rgba(188,220,255,1)');
  el.style.setProperty('--orb-second',state.orbSecondColor||'rgba(255,255,255,0)');
  el.style.setProperty('--wire-color',state.wireColor||'#c28a3e');
  const inside=state.insideCustomData?`url(${state.insideCustomData})`:(state.insideMarble||'transparent');
  el.style.setProperty('--inside-marble',inside);
  el.style.setProperty('--inside-opacity',(state.insideName&&state.insideName!=='None')||state.insideCustomData?'.9':'0');
  el.style.setProperty('--orb-spirals',state.spiralsEnabled?spiralBackground():'transparent');
  el.style.setProperty('--orb-effect-image',state.orbEffectCustomData?`url(${state.orbEffectCustomData})`:'none');
  const fx=el.querySelector('.orb-effects');
  if(fx)fx.className='orb-effects '+(state.orbEffectClass||'');
}


function poleDecorationSummary(){return Object.entries(state.poleDecorations||{}).filter(([k,v])=>v).map(([k])=>({ivy:'Ivy',flowers:'Flowers',ribbons:'Ribbons',lace:'Lace',rope:'Rope',charms:'Hanging Charms',bells:'Bells',pearls:'Pearls',lights:'Fairy Lights',petals:'Floating Petals',snow:'Snowflakes',music:'Music Notes'}[k]||k)).join(', ')||'None';}
function poleIsActive(){return state.poleStyleName && state.poleStyleName!=='None';}
function addPoleDecorationToggles(container){const box=markingSection(container,'Pole Decorations','poleDecorations');box.innerHTML+='<p class="pole-help">Stackable decorations that sit along or around the pole.</p>';const grid=document.createElement('div');grid.className='decoration-toggle-grid';poleDecorations.forEach(d=>{const lab=document.createElement('label');lab.className='decor-check';lab.innerHTML=`<input type="checkbox" ${state.poleDecorations[d.key]?'checked':''} data-pole-decor="${d.key}"><span>${d.icon} ${d.name}</span>`;grid.appendChild(lab);});box.appendChild(grid);box.querySelectorAll('[data-pole-decor]').forEach(inp=>inp.onchange=()=>{state.poleDecorations[inp.dataset.poleDecor]=inp.checked;render();});}
function applyPoleCanvas(){const p=document.querySelector('.pole');if(!p)return;const active=poleIsActive();p.style.display=active?'block':'none';p.style.setProperty('--pole-material',state.poleMaterialColor||'#c28a3e');p.style.setProperty('--painted-pole-texture',state.poleCustomData?`url(${state.poleCustomData})`:'none');p.style.setProperty('--pole-accent',state.wireColor||'#f2c766');p.className=['pole',state.poleStyleClass||'pole-style-none',state.poleCustomData?'custom-painted':''].join(' ');p.innerHTML='<span class="pole-topper"></span><span class="pole-bottom"></span><span class="pole-trim"></span>'+Object.entries(state.poleDecorations||{}).filter(([k,v])=>v).map(([k])=>`<span class="pole-decor decor-${k}"></span>`).join('');const top=p.querySelector('.pole-topper');const bottom=p.querySelector('.pole-bottom');const trim=p.querySelector('.pole-trim');if(top)top.className='pole-topper '+(state.poleTopperClass||'topper-none');if(bottom)bottom.className='pole-bottom '+(state.poleBottomClass||'bottom-none');if(trim)trim.className='pole-trim '+(state.poleTrimClass||'trim-none');}

function renderRoom(){const c=$('content');c.innerHTML='';const titles={forms:['🎠 Forms','Choose the body type for your Carouzell.'],coats:['🎨 Coat Studio','Click circular swatches to choose natural coats, stack fantasy integrations, or pick a full fantasy color.'],skin:['Skin Color','Only appears for centaur, satyr, and hippocampustaur forms.'],markings:['🦄 Markings','Coat markings, individual leg markings, and face markings.'],eyes:['👁 Eyes','Choose a pupil rarity, pupil shape, and eye colors.'],orbs:['🔮 Soulmarble Foundary','Build the soulmarble shape, translucent colors, interior marble, effects, and wire wrap.'],poles:['🎠 Carousel Workshop',''],ribbons:['🎀 Ribbon Atelier','Build the ribbon attached to the soulmarble wire and pole.'],tack:['🛡 Tack Boutique',''],charms:['✨ Charm Cabinet','Build up to three charms that cluster beside the ribbon.'],fins:['🌊 Fin Workshop','Only appears for Hippocampus and Hippocampustaur forms. Add fish-inspired dorsal, tail, pelvic, pectoral, and anal fins.'],extras:['⭐ Extra Traits','Optional body, hair, soulmarble, tail, horn, wing, halo, and glow traits.'],export:['📋 Export','Copy your trait list for now.']};$('roomTitle').textContent=titles[room][0];$('roomDesc').textContent=titles[room][1];
 if(room==='forms') c.appendChild(grid(forms,i=>{state.form=i.id;state.formName=i.name;if(!i.skin)state.skinName='Hidden';else if(state.skinName==='Hidden')state.skinName='Fair';if(!(i.id==='horse'||i.id==='hippocampus')){state.faceMarkingName='None';state.faceMarkingClass='';}render();},state.formName));
 if(room==='skin'){ if(!usesSkin()) c.innerHTML='<div class="export-box">Skin color is completely hidden for Horse and Hippocampus forms. Select Centaur, Satyr, or Hippocampustaur to use it.</div>'; else {c.appendChild(grid(skin,i=>{state.skinName=i.name;state.skinColor=i.color;render();},state.skinName,'',true)); addHexInput(c,'Skin HEX',()=>state.skinColor,v=>{state.skinName='Custom HEX';state.skinColor=v;});} }
 if(room==='eyes'){const eyeBox=markingSection(c,'Pupil Shape','eyes');Object.entries(eyePupils).forEach(([rar,items])=>addSwatchCategory(eyeBox,rar,items,i=>{state.eyePupilName=i.name;state.eyePupilClass=i.class;render();},state.eyePupilName,rar.includes('✦✦✦')?'✦✦✦':rar.includes('✦✦')?'✦✦':'✦'));const colorBox=markingSection(c,'Eye Color','eyeColor');addSwatchCategory(colorBox,'Main Eye Color',eyeColors,i=>{state.eyeColorName=i.name;state.eyeColor=i.color;if(state.eyeSecondName==='None')state.eyeSecondColor=i.color;render();},state.eyeColorName,'');addHexInput(colorBox,'Main Eye HEX',()=>state.eyeColor,v=>{state.eyeColorName='Custom HEX';state.eyeColor=v;if(state.eyeSecondName==='None')state.eyeSecondColor=v;});addSwatchCategory(colorBox,'Secondary Eye Gradient',eyeColors,i=>{state.eyeSecondName=i.name;state.eyeSecondColor=i.color;render();},state.eyeSecondName,'');addHexInput(colorBox,'Secondary Eye HEX',()=>state.eyeSecondColor,v=>{state.eyeSecondName='Custom HEX';state.eyeSecondColor=v;});}
 if(room==='coats'){
   addCustomCoatUpload(c);
   const common=raritySection(c,'✦ Natural Horse Colors','✦','common'); Object.entries(naturalCoats).forEach(([cat,items])=>addSwatchCategory(common,cat,items,i=>{state.coatName=i.name;state.coatColor=i.color;state.customCoatData='';state.mythicalBonus='';render();},state.coatName,'✦'));
   const rare=raritySection(c,'✦✦ Fantasy Integrations — Stackable','✦✦','rare'); Object.entries(fantasyIntegrations).forEach(([cat,items])=>{const active=cat==='Fantasy Markings'?state.fantasyMarkingName:cat==='Coat Effects'?state.coatEffectName:state.gradientName; addSwatchCategory(rare,cat,items,i=>{ if(cat==='Fantasy Markings'){state.fantasyMarkingName=i.name;state.fantasyMarkingClass=i.class;} if(cat==='Coat Effects'){state.coatEffectName=i.name;state.coatEffectClass=i.class;} if(cat==='Accents / Gradients'){state.gradientName=i.name;state.gradientClass=i.class;} render();},active,'✦✦');});
   const clear=document.createElement('div'); clear.className='mini-row'; clear.innerHTML='<button class="btn" id="clearFantasy">Clear Fantasy Integrations</button><button class="btn" id="keepMix">Keep Current Mix</button>'; rare.appendChild(clear); setTimeout(()=>{$('clearFantasy').onclick=()=>{state.fantasyMarkingName='None';state.fantasyMarkingClass='';state.coatEffectName='None';state.coatEffectClass='';state.gradientName='None';state.gradientClass='';render();};},0);
   const myth=raritySection(c,'✦✦✦ Full Fantasy Colors','✦✦✦','mythical'); Object.entries(mythicalCoats).forEach(([cat,items])=>addSwatchCategory(myth,cat,items,i=>{state.coatName=i.name;state.coatColor=i.color;state.customCoatData='';state.mythicalBonus=i.bonus||'';render();},state.coatName,'✦✦✦'));
   const hoofBox=markingSection(c,'Hoof Color','hoof');addSwatchCategory(hoofBox,'Hoof Swatches',hoofColors,i=>{state.hoofName=i.name;state.hoofColor=i.color;render();},state.hoofName,'');addHexInput(hoofBox,'Hoof HEX',()=>state.hoofColor,v=>{state.hoofName='Custom HEX';state.hoofColor=v;});
 }
 if(room==='markings'){
   const coatBox=markingSection(c,'Coat Markings','coat');Object.entries(coatMarkings).forEach(([cat,items])=>addSwatchCategory(coatBox,cat,items,i=>{state.coatMarkingName=i.name;state.coatMarkingClass=i.class;state.coatMarkingCustomData='';render();},state.coatMarkingName,''));addCoatMarkingUpload(coatBox);
   const legBox=markingSection(c,'Leg Markings','legs');addFurredToggle(legBox);activeLegKeys().forEach(key=>addSwatchCategory(legBox,activeLegLabel(key),legMarkingOptions,i=>{state.legMarks[key]=i.name;state.legTypes[key]=i.type;render();},state.legMarks[key],''));
   if(usesFace()){const faceBox=markingSection(c,'Face Markings','face');addSwatchCategory(faceBox,'Horse + Hippocampus Only',faceMarkings,i=>{state.faceMarkingName=i.name;state.faceMarkingClass=i.class;render();},state.faceMarkingName,'');}else{state.faceMarkingName='None';state.faceMarkingClass='';}
 }
 if(room==='fins'){
   if(!usesFins()){c.innerHTML='<div class="export-box">Fins are hidden unless Hippocampus or Hippocampustaur is selected.</div>';}
   else{
     const box=markingSection(c,'Fish Fin Types','fins');
     const labels={dorsal:'Back / Dorsal Fins',tail:'Tail Fin',pelvic:'Pelvic Fins',pectoral:'Pectoral Fins',anal:'Anal Fins'};
     Object.entries(finOptions).forEach(([key,items])=>addSwatchCategory(box,labels[key],items,i=>{state.fins[key]=i.name;state.finClasses[key]=i.name==='None'?'fin-style-none':(key==='tail'?(i.name.includes('Betta')?'fin-style-betta':i.name.includes('Koi')?'fin-style-koi':'fin-style-fan'):(i.name.includes('Spined')?'fin-style-spined':i.name.includes('Ribbon')||i.name.includes('Long')||i.name.includes('Winglike')?'fin-style-ribbon':'fin-style-fan'));render();},state.fins[key],''));
     const colorBox=markingSection(c,'Fin Colors','finColor');addSwatchCategory(colorBox,'Main Color',finColors,i=>{state.finColorName=i.name;state.finColor=i.color;render();},state.finColorName,'');addHexInput(colorBox,'Main Fin HEX',()=>state.finColor,v=>{state.finColorName='Custom HEX';state.finColor=v;});addSwatchCategory(colorBox,'Secondary / Accent Color',finColors,i=>{state.finAccentName=i.name;state.finAccentColor=i.color;render();},state.finAccentName,'');addHexInput(colorBox,'Accent Fin HEX',()=>state.finAccentColor,v=>{state.finAccentName='Custom HEX';state.finAccentColor=v;});
   }
 }
 if(room==='orbs'){
   const shapeBox=markingSection(c,'Shape','orbShape');Object.entries(orbShapes).forEach(([rar,items])=>addSwatchCategory(shapeBox,rar,items,i=>{state.orbName='Custom Soulmarble';state.orbShapeName=i.name;state.orbShapeClass=i.shape;render();},state.orbShapeName,rar.includes('✦✦✦')?'✦✦✦':rar.includes('✦✦')?'✦✦':'✦'));
   const colorBox=markingSection(c,'Colors','orbColors');addSwatchCategory(colorBox,'Main Color',orbMainColors,i=>{state.orbName='Custom Soulmarble';state.orbMainName=i.name;state.orbMainColor=i.color;render();},state.orbMainName,'');addHexInput(colorBox,'Main HEX',()=>state.orbMainColor,v=>{state.orbName='Custom Soulmarble';state.orbMainName='Custom HEX';state.orbMainColor=v;});addSwatchCategory(colorBox,'Second Color / Gradient',orbSecondColors,i=>{state.orbName='Custom Soulmarble';state.orbSecondName=i.name;state.orbSecondColor=i.color;render();},state.orbSecondName,'');addHexInput(colorBox,'Second HEX',()=>state.orbSecondColor,v=>{state.orbName='Custom Soulmarble';state.orbSecondName='Custom HEX';state.orbSecondColor=v;});
   const insideBox=markingSection(c,'Inside Marble','orbInside');addSwatchCategory(insideBox,'Inside Marble Options',Object.values(insideMarblePresets).flat(),i=>{state.orbName='Custom Soulmarble';state.insideName=i.name;state.insideMarble=i.inside;state.insideCustomData='';render();},state.insideName,'');addInsideUpload(insideBox);addSpiralBuilder(insideBox);
   const fxBox=markingSection(c,'Effects','orbEffects');Object.entries(orbEffects).forEach(([cat,items])=>addSwatchCategory(fxBox,cat,items,i=>{state.orbName='Custom Soulmarble';state.orbEffectName=i.name;state.orbEffectClass=i.effect;state.orbEffectCustomData='';render();},state.orbEffectName,''));addEffectUpload(fxBox);addHeadOrbPlacement(c);
   const wireBox=markingSection(c,'Wiring','orbWire');addSwatchCategory(wireBox,'Pattern of Wire',wirePatterns,i=>{state.orbName='Custom Soulmarble';state.wirePatternName=i.name;state.wirePatternClass=i.class;render();},state.wirePatternName,'');Object.entries(wireTypes).forEach(([rar,items])=>addSwatchCategory(wireBox,rar,items,i=>{state.orbName='Custom Soulmarble';state.wireTypeName=i.name;state.wireColor=i.color;render();},state.wireTypeName,rar.includes('✦✦')?'✦✦':'✦'));
 }
 if(room==='poles'){
   const intro=document.createElement('div');intro.className='export-box';intro.innerHTML='<p class="pole-help"></p>';c.appendChild(intro);
   const styleBox=markingSection(c,'Pole Style','poleStyle');Object.entries(poleStyles).forEach(([rar,items])=>addSwatchCategory(styleBox,rar,items,i=>{state.poleStyleName=i.name;state.poleStyleClass=i.class;state.poleName=i.name==='None'?'None':'Custom Pole';render();},state.poleStyleName,rar.includes('✦✦✦')?'✦✦✦':rar.includes('✦✦')?'✦✦':'✦'));
   const matBox=markingSection(c,'Pole Material','poleMaterial');Object.entries(poleMaterials).forEach(([rar,items])=>addSwatchCategory(matBox,rar,items,i=>{state.poleMaterialName=i.name;state.poleMaterialColor=i.color;if(i.name!=='Painted Wood')state.poleCustomData='';render();},state.poleMaterialName,rar.includes('✦✦')?'✦✦':'✦'));addPaintedPoleUpload(matBox);
   const topBox=markingSection(c,'Pole Topper','poleTopper');addSwatchCategory(topBox,'Staff Topper Options',poleToppers,i=>{state.poleTopperName=i.name;state.poleTopperClass=i.class;render();},state.poleTopperName,'');
   const bottomBox=markingSection(c,'Pole Bottom','poleBottom');addSwatchCategory(bottomBox,'Bottom Decoration Options',poleBottoms,i=>{state.poleBottomName=i.name;state.poleBottomClass=i.class;render();},state.poleBottomName,'');
   const trimBox=markingSection(c,'Carousel Trim','poleTrim');addSwatchCategory(trimBox,'Trim / Accent Overlay',carouselTrims,i=>{state.poleTrimName=i.name;state.poleTrimClass=i.class;render();},state.poleTrimName,'');
   addPoleDecorationToggles(c);
 }
 if(room==='ribbons'){
   const typeBox=markingSection(c,'Ribbon Type','ribbonType');Object.entries(ribbonTypes).forEach(([rar,items])=>addSwatchCategory(typeBox,rar,items,i=>{state.ribbonTypeName=i.name;render();},state.ribbonTypeName,rar.includes('✦✦✦')?'✦✦✦':rar.includes('✦✦')?'✦✦':'✦'));
   const colorBox=markingSection(c,'Ribbon Colors','ribbonColors');
   addSwatchCategory(colorBox,'Main Color',ribbonColors.filter(x=>x.name!=='None'),i=>{state.ribbonMainName=i.name;state.ribbonMainColor=i.color;render();},state.ribbonMainName,'');
   addHexInput(colorBox,'Main HEX',()=>state.ribbonMainColor,v=>{state.ribbonMainName='Custom HEX';state.ribbonMainColor=v;});
   addSwatchCategory(colorBox,'Secondary Color',ribbonColors,i=>{state.ribbonSecondName=i.name;state.ribbonSecondColor=i.color;render();},state.ribbonSecondName,'');
   addHexInput(colorBox,'Second HEX',()=>state.ribbonSecondColor,v=>{state.ribbonSecondName='Custom HEX';state.ribbonSecondColor=v;});
   addPatternPicker(colorBox,'Pattern of Second Color',ribbonPatterns,state.ribbonSecondPatternName,p=>{state.ribbonSecondPatternName=p.name;state.ribbonSecondPatternClass=p.class;render();});
   addSwatchCategory(colorBox,'Third Color',ribbonColors,i=>{state.ribbonThirdName=i.name;state.ribbonThirdColor=i.color;render();},state.ribbonThirdName,'');
   addHexInput(colorBox,'Third HEX',()=>state.ribbonThirdColor,v=>{state.ribbonThirdName='Custom HEX';state.ribbonThirdColor=v;});
   addPatternPicker(colorBox,'Pattern of Third Color',thirdRibbonPatterns,state.ribbonThirdPatternName,p=>{state.ribbonThirdPatternName=p.name;state.ribbonThirdPatternClass=p.class;render();});
   addRibbonUpload(colorBox);
 }

 if(room==='tack'){
   ['saddle','saddlePad','barding','bridle','breastCollar','legArmor','torsoArmor'].forEach(k=>addTackSection(c,k));
 }
 if(room==='charms'){
   addCharmPicker(c,1);addCharmPicker(c,2);addCharmPicker(c,3);
 }

 if(room==='extras'){
   Object.entries(extraTraits).forEach(([rar,items],idx)=>{const key=rar.includes('✦✦✦')?'extrasMythical':rar.includes('✦✦')?'extrasRare':'extrasCommon';addExtraToggles(c,rar,items,key);});
   const note=document.createElement('div');note.className='export-box';note.innerHTML='<p><b>Selected Extra Traits:</b><br>'+selectedExtraSummary()+'</p>';c.appendChild(note);
 }

 if(room==='export'){
   const lines=[
     `Form: ${state.formName}`,
     `Coat: ${state.coatName}`,
     `Fantasy Marking: ${state.fantasyMarkingName}`,
     `Coat Effect: ${state.coatEffectName}`,
     `Accent / Gradient: ${state.gradientName}`,
     `Eye Pupil: ${state.eyePupilName}`,
     '',
     `Soulmarble: ${state.orbShapeName} / Main: ${state.orbMainName} / Second: ${state.orbSecondName} / Inside: ${state.insideName} / Spirals: ${state.spiralsEnabled?state.spiralCount:'No'} / Effect: ${state.orbEffectName} / Wire: ${state.wirePatternName} ${state.wireTypeName}`,
     `Pole: ${state.poleName} / Style: ${state.poleStyleName} / Material: ${state.poleMaterialName} / Topper: ${state.poleTopperName} / Bottom: ${state.poleBottomName} / Trim: ${state.poleTrimName} / Decorations: ${poleDecorationSummary()}`,
     `Ribbon: ${state.ribbonTypeName} / Main: ${state.ribbonMainName} / Secondary: ${state.ribbonSecondName} ${state.ribbonSecondPatternName} / Third: ${state.ribbonThirdName} ${state.ribbonThirdPatternName}`,
     '',
     `Extra Traits: ${selectedExtraSummary()}`
   ].join('\n');
   c.innerHTML=`<div class="export-box"><p>This prototype exports both the official trait list and a PNG of the preview canvas.</p><pre id="exportText"></pre><button class="export-button copy-export" id="copy">Copy Trait List ✦</button><button class="export-button secondary-export" id="exportPng">Export Horse PNG ✦</button><p class="export-hint">PNG export captures the preview canvas only, not the handbook UI.</p></div>`;
   setTimeout(()=>{const pre=$('exportText');if(pre)pre.textContent=lines;const copy=$('copy');if(copy)copy.onclick=()=>navigator.clipboard.writeText(lines);const png=$('exportPng');if(png)png.onclick=exportPreviewPng;},0);
 }

}


function exportPreviewPng(){
  const stage=document.querySelector('.stage');
  if(!stage){alert('Preview canvas was not found.');return;}
  const width=stage.offsetWidth||900;
  const height=stage.offsetHeight||650;
  const clone=stage.cloneNode(true);
  clone.style.margin='0';
  clone.style.position='relative';
  clone.style.left='0';
  clone.style.top='0';
  clone.style.transform='none';
  const styleText=Array.from(document.querySelectorAll('style')).map(s=>s.textContent).join('\n');
  const xhtml=`<div xmlns="http://www.w3.org/1999/xhtml"><style>${styleText}
/* v34.8 readability + cleaner notes */
.tray:before{content:none!important;display:none!important;}
.check-toggle{
  color:#3f2a20!important;
  background:rgba(255,246,229,.70)!important;
  border-color:rgba(116,72,37,.30)!important;
}
.check-toggle strong{
  color:#5a2e20!important;
  text-shadow:0 1px 0 rgba(255,255,255,.45)!important;
}
.check-toggle small{
  color:#5b4638!important;
  text-shadow:none!important;
}
.custom-upload label,
.spiral-label,
.sub-title{
  color:#5a2e20!important;
  text-shadow:0 1px 0 rgba(255,255,255,.45)!important;
}
.custom-upload small,
.custom-upload input,
.export-box,
.export-box p,
.page-subtitle,
.hide-face-note,
.head-placement-note{
  color:#4b372d!important;
  text-shadow:none!important;
}
.btn.clear-custom,
.clear-custom,
.custom-upload .btn,
.fantasy-actions .btn{
  color:#5a2e20!important;
  background:rgba(255,248,235,.78)!important;
  border-color:rgba(116,72,37,.34)!important;
  text-shadow:none!important;
  font-weight:700;
}
.btn.clear-custom:hover,
.clear-custom:hover,
.custom-upload .btn:hover,
.fantasy-actions .btn:hover{
  background:rgba(255,238,204,.92)!important;
  color:#2f1c18!important;
}
.browser p:empty,.page-subtitle:empty{display:none!important;}

</style>${clone.outerHTML}</div>`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${xhtml}</foreignObject></svg>`;
  const img=new Image();
  const url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  img.onload=()=>{
    const canvas=document.createElement('canvas');
    canvas.width=width; canvas.height=height;
    const ctx=canvas.getContext('2d');
    ctx.drawImage(img,0,0);
    URL.revokeObjectURL(url);
    const link=document.createElement('a');
    link.download='carouzell-preview.png';
    link.href=canvas.toDataURL('image/png');
    link.click();
  };
  img.onerror=()=>alert('PNG export could not render this preview. Try removing imported images/textures and export again.');
  img.src=url;
}

function applyTackCanvas(){
 const map={'saddle':'.saddle','saddlePad':'.saddle-pad','barding':'.barding','bridle':'.bridle','breastCollar':'.breast-collar','torsoArmor':'.torso-armor'};
 Object.entries(map).forEach(([k,sel])=>{const el=document.querySelector(sel); if(!el)return; el.style.display=(sectionAllowed(k)&&state.tack[k]!=='None')?'block':'none'; el.style.setProperty('--tack-main',state.tackColors[k]||'#7a4a34'); el.style.setProperty('--tack-second',state.tackAccentColors[k]||'#c28a3e');});
 document.querySelectorAll('.leg-armor').forEach(el=>{el.style.display=(sectionAllowed('legArmor')&&state.tack.legArmor!=='None')?'block':'none'; el.style.setProperty('--tack-main',state.tackColors.legArmor||'#c28a3e'); el.style.setProperty('--tack-second',state.tackAccentColors.legArmor||'#fff8ef');});
}
function applyCharmCanvas(){
 const show=anyCharm();
 document.querySelectorAll('.charm-cluster').forEach(cl=>{cl.style.display=show?'block':'none';cl.style.setProperty('--charm-ring',state.wireColor||'#d29b52');cl.style.setProperty('--charm-one',state.charm1Color);cl.style.setProperty('--charm-two',state.charm2Color);cl.style.setProperty('--charm-three',state.charm3Color);});
 const body=document.querySelector('.body-charms');const head=document.querySelector('.head-charms');const pole=document.querySelector('.pole-charms'); if(head){head.className='charm-cluster head-charms side-'+state.headOrbSide;} if(body){body.className='charm-cluster body-charms';} if(pole){pole.className='charm-cluster pole-charms';pole.style.display=(show&&state.poleName!=='None')?'block':'none';}
 document.querySelectorAll('.charm-ring').forEach(r=>{r.className='charm-ring ring-round';});
 [1,2,3].forEach(n=>{document.querySelectorAll('.charm.c'+n).forEach(el=>{el.className='charm c'+n+' '+(state['charm'+n+'Class']||'');el.style.display=state['charm'+n+'Name']==='None'?'none':'block';el.style.backgroundImage=state['charm'+n+'CustomData']?`url(${state['charm'+n+'CustomData']})`:'';el.style.backgroundSize='cover';el.style.backgroundPosition='center';});});
}

function renderCanvas(){const cnv=$('canvas');cnv.style.setProperty('--coat',state.coatColor);cnv.style.setProperty('--coat-fill',state.customCoatData?`url(${state.customCoatData})`:state.coatColor);cnv.style.setProperty('--skin',state.skinColor);cnv.style.setProperty('--ribbon-main',state.ribbonMainColor||'#b995ff');cnv.style.setProperty('--eye-color',state.eyeColor||'#f2c766');cnv.style.setProperty('--eye-color-2',state.eyeSecondName==='None'?(state.eyeColor||'#f2c766'):(state.eyeSecondColor||state.eyeColor||'#f2c766'));cnv.style.setProperty('--hoof-color',state.hoofColor||'#1d1724');cnv.style.setProperty('--fin-color',state.finColor||'#7fc9cf');cnv.style.setProperty('--fin-accent',state.finAccentColor||'#b995ff');cnv.style.setProperty('--coat-marking-custom',state.coatMarkingCustomData?`url(${state.coatMarkingCustomData})`:'none');cnv.classList.toggle('skin-form',usesSkin());cnv.classList.toggle('satyr-form',state.form==='satyr');cnv.classList.toggle('hippo-taur-form',state.form==='hippocampustaur');cnv.classList.toggle('hippo',state.form==='hippocampus'||state.form==='hippocampustaur');['dorsal','tail','pelvic','pectoral','anal'].forEach(k=>{const el=document.querySelector(k==='tail'?'.tail-fin':'.'+k+'-fin');if(el){el.className=(k==='tail'?'fin tail-fin':'fish-fin '+k+'-fin')+' '+(state.finClasses?.[k]||'fin-style-none')+(usesFins()&&state.fins?.[k]!=='None'?' show':'');}});document.querySelector('.marks').className='marks '+(state.coatMarkingClass||'');document.querySelectorAll('.eye').forEach((eye,idx)=>{eye.className='eye '+(idx===0?'eye-one':'eye-two')+' '+(state.eyePupilClass||'pupil-horse');});document.querySelector('.legmarks').innerHTML=(state.furredLegs?activeLegKeys().map(k=>`<span class="lm ${k} furred"></span>`).join(''):'')+activeLegKeys().map(k=>`<span class="lm ${k} ${state.legTypes[k]||''}"></span>`).join('');document.querySelector('.facemarks').className='facemarks '+(usesFace()?state.faceMarkingClass:'');document.querySelector('.fx1').className='fx1 '+(state.fantasyMarkingClass||'');document.querySelector('.fx2').className='fx2 '+(state.coatEffectClass||state.mythicalBonus||'');document.querySelector('.fx3').className='fx3 '+(state.gradientClass||'');const bodyOrb=document.querySelector('.body-orb');const headOrb=document.querySelector('.head-orb');syncOrbElement(bodyOrb);syncOrbElement(headOrb);applyPoleCanvas();document.querySelectorAll('.ribbon').forEach(applyRibbonElement);document.querySelector('.body-ribbon').style.display=(state.ribbonTypeName!=='None'&&state.orbName!=='None')?'block':'none';document.querySelector('.head-ribbon').style.display=(state.ribbonTypeName!=='None'&&state.orbName!=='None')?'block':'none';document.querySelector('.pole-ribbon').style.display=(state.ribbonTypeName!=='None'&&state.poleName!=='None')?'block':'none';applyTackCanvas();applyCharmCanvas();$('formLabel').textContent=state.formName+' Form';}
function renderTray(){const rows=[['form',state.formName],['coat',state.coatName],['fantasy',`${state.fantasyMarkingName} / ${state.coatEffectName} / ${state.gradientName}`],['soulmarble',`${state.orbShapeName} / ${state.orbMainName} / ${state.insideName}`],['pole',`${state.poleStyleName} / ${state.poleMaterialName}`],['ribbon',`${state.ribbonTypeName} / ${state.ribbonMainName}`]];$('tray').innerHTML=rows.map(r=>`<div class="sel"><b>${r[0]}</b>${r[1]}</div>`).join('');}
function render(){document.querySelectorAll('.nav button').forEach(b=>{b.classList.toggle('active',b.dataset.room===room);b.classList.toggle('hidden',(b.dataset.room==='skin'&&!usesSkin())||(b.dataset.room==='fins'&&!usesFins()));}); if((room==='skin'&&!usesSkin())||(room==='fins'&&!usesFins())) room='forms'; renderCanvas(); renderTray(); renderRoom();}
function pick(a){return a[Math.floor(Math.random()*a.length)]} function flat(obj){return Object.values(obj).flat();}
function randomizeBuilder(){let f=pick(forms);state.form=f.id;state.formName=f.name;if(f.skin){let s=pick(skin);state.skinName=s.name;state.skinColor=s.color}else state.skinName='Hidden';let ep=pick(Object.values(eyePupils).flat());state.eyePupilName=ep.name;state.eyePupilClass=ep.class;let ec=pick(eyeColors);state.eyeColorName=ec.name;state.eyeColor=ec.color;let ec2=pick(eyeColors);state.eyeSecondName=ec2.name;state.eyeSecondColor=ec2.color;let co=pick(flat(naturalCoats));state.coatName=co.name;state.coatColor=co.color;state.customCoatData='';state.mythicalBonus='';let hc=pick(hoofColors);state.hoofName=hc.name;state.hoofColor=hc.color;let fm=pick(fantasyIntegrations['Fantasy Markings']);state.fantasyMarkingName=fm.name;state.fantasyMarkingClass=fm.class;let ce=pick(fantasyIntegrations['Coat Effects']);state.coatEffectName=ce.name;state.coatEffectClass=ce.class;let gr=pick(fantasyIntegrations['Accents / Gradients']);state.gradientName=gr.name;state.gradientClass=gr.class;let m=pick(flat(coatMarkings));state.coatMarkingName=m.name;state.coatMarkingClass=m.class;state.furredLegs=Math.random()>.5;['fl','fr','bl','br'].forEach(k=>{let lm=pick(legMarkingOptions);state.legMarks[k]=lm.name;state.legTypes[k]=lm.type;});if(usesFace()){let fm2=pick(faceMarkings);state.faceMarkingName=fm2.name;state.faceMarkingClass=fm2.class;}else{state.faceMarkingName='None';state.faceMarkingClass='';}let osh=pick(Object.values(orbShapes).flat());state.orbName='Custom Soulmarble';state.orbShapeName=osh.name;state.orbShapeClass=osh.shape;let om=pick(orbMainColors);state.orbMainName=om.name;state.orbMainColor=om.color;let os=pick(orbSecondColors);state.orbSecondName=os.name;state.orbSecondColor=os.color;let ip=pick(Object.values(insideMarblePresets).flat());state.insideName=ip.name;state.insideMarble=ip.inside;state.insideCustomData='';state.spiralsEnabled=Math.random()>.5;state.spiralCount=state.spiralsEnabled?Math.ceil(Math.random()*3):0;state.orbEffectCustomData='';let oe=pick(Object.values(orbEffects).flat());state.orbEffectName=oe.name;state.orbEffectClass=oe.effect||'';let wp=pick(wirePatterns);state.wirePatternName=wp.name;state.wirePatternClass=wp.class;let wt=pick(Object.values(wireTypes).flat());state.wireTypeName=wt.name;state.wireColor=wt.color;state.headOrbSide=Math.random()>.5?'left':'right';let ps=pick(Object.values(poleStyles).flat());state.poleStyleName=ps.name;state.poleStyleClass=ps.class;state.poleName=ps.name==='None'?'None':'Custom Pole';let pm=pick(Object.values(poleMaterials).flat());state.poleMaterialName=pm.name;state.poleMaterialColor=pm.color;state.poleCustomData='';let pt=pick(poleToppers);state.poleTopperName=pt.name;state.poleTopperClass=pt.class;let pb=pick(poleBottoms);state.poleBottomName=pb.name;state.poleBottomClass=pb.class;let pct=pick(carouselTrims);state.poleTrimName=pct.name;state.poleTrimClass=pct.class;Object.keys(state.poleDecorations).forEach(k=>state.poleDecorations[k]=Math.random()>.78);let r=pick(Object.values(ribbonTypes).flat());state.ribbonTypeName=r.name;let rc=pick(ribbonColors.filter(x=>x.name!=='None'));state.ribbonMainName=rc.name;state.ribbonMainColor=rc.color;let r2=pick(ribbonColors);state.ribbonSecondName=r2.name;state.ribbonSecondColor=r2.color;let rp=pick(ribbonPatterns);state.ribbonSecondPatternName=rp.name;state.ribbonSecondPatternClass=rp.class;let r3=pick(ribbonColors);state.ribbonThirdName=r3.name;state.ribbonThirdColor=r3.color;let rtp=pick(thirdRibbonPatterns);state.ribbonThirdPatternName=rtp.name;state.ribbonThirdPatternClass=rtp.class;state.ribbonCustomData='';Object.keys(tackSections).forEach(k=>{
  if(sectionAllowed(k)){
    const item=pick(tackSections[k].items);
    state.tack[k]=item.name;
    const main=pick(tackColorGroups[k]||tackColors);
    state.tackColors[k]=main.color;
    state.tackColorNames[k]=main.name;
    const accent=pick(tackAccentGroups[k]||tackColors);
    state.tackAccentColors[k]=accent.color;
    state.tackAccentNames[k]=accent.name;
  }else{
    state.tack[k]='None';
  }
});
state.tackMainColor=state.tackColors.saddle||'#7a4a34';
state.tackMainName=state.tackColorNames.saddle||'Leather Brown';
state.tackSecondColor=state.tackAccentColors.saddle||'#c28a3e';
state.tackSecondName=state.tackAccentNames.saddle||'Brass';
if(usesFins()){Object.keys(finOptions).forEach(k=>{let fo=pick(finOptions[k]);state.fins[k]=fo.name;state.finClasses[k]=fo.name==='None'?'fin-style-none':(k==='tail'?(fo.name.includes('Betta')?'fin-style-betta':fo.name.includes('Koi')?'fin-style-koi':'fin-style-fan'):(fo.name.includes('Spined')?'fin-style-spined':fo.name.includes('Ribbon')||fo.name.includes('Long')||fo.name.includes('Winglike')?'fin-style-ribbon':'fin-style-fan'));});let fc=pick(finColors);state.finColorName=fc.name;state.finColor=fc.color;let fa=pick(finColors);state.finAccentName=fa.name;state.finAccentColor=fa.color;}render();}
function resetBuilder(){Object.assign(state,{form:'horse',formName:'Horse',skinName:'Hidden',skinColor:'#e8c3a5',coatName:'White',coatColor:'#f4efe8',customCoatData:'',mythicalBonus:'',fantasyMarkingName:'None',fantasyMarkingClass:'',coatEffectName:'None',coatEffectClass:'',gradientName:'None',gradientClass:'',coatMarkingName:'None',coatMarkingClass:'',furredLegs:false,faceMarkingName:'None',faceMarkingClass:'',furredLegs:false,legMarks:{fl:'None',fr:'None',bl:'None',br:'None'},legTypes:{fl:'',fr:'',bl:'',br:''},orbName:'None',orbShapeName:'Sphere',orbShapeClass:'shape-sphere',orbMainName:'Moon Blue',orbMainColor:'rgba(188,220,255,1)',orbSecondName:'None',orbSecondColor:'rgba(255,255,255,0)',insideName:'None',insideMarble:'transparent',insideCustomData:'',orbEffectName:'None',orbEffectClass:'',orbEffectCustomData:'',spiralsEnabled:false,spiralCount:0,spiralColors:{one:'#ef4444',two:'#3b82f6',three:'#facc15'},headOrbSide:'left',wirePatternName:'Simple Ring',wirePatternClass:'wire-ring',wireTypeName:'Brass',wireColor:'#c28a3e',poleName:'None',poleStyleName:'None',poleStyleClass:'pole-style-none',poleMaterialName:'Brass',poleMaterialColor:'#c28a3e',poleCustomData:'',poleCustomData:'',poleTopperName:'None',poleTopperClass:'topper-none',poleBottomName:'None',poleBottomClass:'bottom-none',poleTrimName:'None',poleTrimClass:'trim-none',poleDecorations:{ivy:false,flowers:false,ribbons:false,lace:false,rope:false,charms:false,bells:false,pearls:false,lights:false,petals:false,snow:false,music:false},ribbonTypeName:'None',ribbonMainName:'Lavender',ribbonMainColor:'#b995ff',ribbonSecondName:'None',ribbonSecondColor:'transparent',ribbonSecondPatternName:'None',ribbonSecondPatternClass:'',ribbonThirdName:'None',ribbonThirdColor:'transparent',ribbonThirdPatternName:'None',ribbonThirdPatternClass:'',ribbonCustomData:'',tack:{saddle:'None',saddlePad:'None',barding:'None',bridle:'None',breastCollar:'None',legArmor:'None',torsoArmor:'None'},tackColors:{saddle:'#7a4a34',saddlePad:'#fff0df',barding:'#f2c766',bridle:'#7a4a34',breastCollar:'#7a4a34',legArmor:'#c28a3e',torsoArmor:'#c28a3e'},tackColorNames:{saddle:'Leather Brown',saddlePad:'Cream',barding:'Carousel Gold',bridle:'Leather Brown',breastCollar:'Leather Brown',legArmor:'Brass',torsoArmor:'Brass'},tackAccentColors:{saddle:'#c28a3e',saddlePad:'#f2c766',barding:'#f2c766',bridle:'#c28a3e',breastCollar:'#c28a3e',legArmor:'#fff8ef',torsoArmor:'#fff8ef'},tackAccentNames:{saddle:'Brass Trim',saddlePad:'Gold Trim',barding:'Gold Filigree',bridle:'Brass Fittings',breastCollar:'Brass Fittings',legArmor:'Bright Highlight',torsoArmor:'Bright Highlight'},tackMainName:'Leather Brown',tackMainColor:'#7a4a34',tackSecondName:'Brass',tackSecondColor:'#c28a3e',charmRingName:'None',charmRingClass:'',charm1Name:'None',charm1Class:'',charm1Color:'#f2c766',charm1CustomData:'',charm2Name:'None',charm2Class:'',charm2Color:'#b995ff',charm2CustomData:'',charm3Name:'None',charm3Class:'',charm3Color:'#7fc9cf',charm3CustomData:'',fins:{dorsal:'None',tail:'Fan Tail Fin',pelvic:'None',pectoral:'None',anal:'None'},finClasses:{dorsal:'fin-style-none',tail:'fin-style-fan',pelvic:'fin-style-none',pectoral:'fin-style-none',anal:'fin-style-none'},finColorName:'Aqua',finColor:'#7fc9cf',finAccentName:'Lavender',finAccentColor:'#b995ff',eyePupilName:'Horse Pupil',eyePupilClass:'pupil-horse',eyeColorName:'Amber',eyeColor:'#f2c766',eyeSecondName:'None',eyeSecondColor:'#f2c766',hoofName:'Black',hoofColor:'#1d1724',coatMarkingCustomData:'',extraTraits:{}});render();}

function bindActionButtons(){
  const randomBtn=$('randomize');
  const resetBtn=$('reset');
  if(randomBtn){ randomBtn.onclick=null; randomBtn.addEventListener('click', randomizeBuilder); }
  if(resetBtn){ resetBtn.onclick=null; resetBtn.addEventListener('click', resetBuilder); }
}

function v33Sparkle(x,y){
  const s=document.createElement('span');
  s.className='v33-click-spark';
  s.textContent='✦';
  s.style.left=x+'px'; s.style.top=y+'px';
  document.body.appendChild(s);
  setTimeout(()=>s.remove(),650);
}
document.addEventListener('click',e=>{
  if(e.target.closest('.swatch,.card,.shape-card,.mini-card,.nav button,.btn')) v33Sparkle(e.clientX,e.clientY);
});

initNav();bindActionButtons();render();
