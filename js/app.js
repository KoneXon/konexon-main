// ── ORBIT DATA ──
// r=1 inner orbit | r=2 mid | r=3 outer
const nodes=[
  {i:'💻',n:'Websites',ne:'Websites',d:'Sites modernos para pequenas e grandes empresas.',de:'Modern websites for small and large businesses.',t:'KoneXon Web',r:1},
  {i:'⚙️',n:'Sistemas IT',ne:'IT Systems',d:'Infraestrutura e consultoria técnica para qualquer empresa.',de:'Infrastructure and technical consultancy for any business.',t:'IT & Systems',r:1},
  {i:'🎨',n:'Design UI/UX',ne:'UI/UX Design',d:'Interfaces bonitas e funcionais que os utilizadores adoram.',de:'Beautiful and functional interfaces users love.',t:'KoneXon Web',r:1},
  {i:'📱',n:'Apps Móveis',ne:'Mobile Apps',d:'Aplicações nativas para iOS e Android.',de:'Native applications for iOS and Android.',t:'KoneXon Serviço',r:1},
  {i:'🤖',n:'Inteligência Artificial',ne:'Artificial Intelligence',d:'Sistemas inteligentes com IA para automatizar negócios.',de:'Intelligent AI systems to automate businesses.',t:'AI',r:2},
  {i:'🔒',n:'Segurança',ne:'Cybersecurity',d:'Proteção de dados e sistemas seguros para empresas.',de:'Data protection and secure systems for businesses.',t:'IT & Security',r:2},
  {i:'🌐',n:'Redes',ne:'Networks',d:'Infraestrutura de redes e conectividade para empresas.',de:'Network infrastructure and connectivity for businesses.',t:'KoneXon Web',r:2},
  {i:'📊',n:'Analytics',ne:'Analytics',d:'Dashboards e relatórios para decisões baseadas em dados.',de:'Dashboards and reports for data-driven decisions.',t:'IT & AI',r:2},
  {i:'☁️',n:'Cloud & Hosting',ne:'Cloud & Hosting',d:'Servidores e alojamento web profissional.',de:'Professional servers and web hosting.',t:'IT',r:2},
  {i:'🛒',n:'E-commerce',ne:'E-commerce',d:'Lojas online completas com pagamento integrado.',de:'Complete online stores with integrated payments.',t:'Web & Serviço',r:3},
  {i:'📡',n:'KoneXon Mind',ne:'KoneXon Mind',d:'Plataforma de informação e tendências tecnológicas.',de:'Tech news and trends platform.',t:'Em breve',r:3},
  {i:'🤝',n:'Parcerias',ne:'Partnerships',d:'Conectamos empresas guineenses a parceiros internacionais.',de:'We connect Guinean businesses to international partners.',t:'Ecosystem',r:3},
  {i:'📈',n:'Crescimento',ne:'Growth',d:'Estratégias para escalar negócios guineenses globalmente.',de:'Strategies to scale Guinean businesses globally.',t:'Ecosystem',r:3},
  {i:'🛡️',n:'Suporte Técnico',ne:'Tech Support',d:'Assistência técnica contínua para o teu negócio.',de:'Ongoing technical assistance for your business.',t:'KoneXon Serviço',r:3},
];

const RATIO={1:0.22, 2:0.34, 3:0.46};
const SPEEDS={1:0.004, 2:-0.0025, 3:0.0018};

document.addEventListener('DOMContentLoaded',()=>{
  const eco=document.getElementById('eco');
  const tt=document.getElementById('tt');
  if(!eco) return;

  function getSize(){
    const s=eco.offsetWidth;
    return {cx:s/2, cy:s/2, radii:{1:s*RATIO[1], 2:s*RATIO[2], 3:s*RATIO[3]}};
  }

  const orbit1=nodes.filter(n=>n.r===1);
  const orbit2=nodes.filter(n=>n.r===2);
  const orbit3=nodes.filter(n=>n.r===3);

  const bases={
    1:orbit1.map((_,i)=>i*(2*Math.PI/orbit1.length)),
    2:orbit2.map((_,i)=>i*(2*Math.PI/orbit2.length)+Math.PI/orbit2.length),
    3:orbit3.map((_,i)=>i*(2*Math.PI/orbit3.length)),
  };
  const angles={1:0, 2:0, 3:0};

  nodes.forEach(n=>{
    const el=document.createElement('div');
    el.className='snode';
    el.innerHTML=`<span class="snode-icon">${n.i}</span><span class="snode-lbl">${n.n.split(' ')[0]}</span>`;
    n._el=el;
    el.addEventListener('mouseenter',()=>{
      el.style.borderColor='rgba(0,232,122,.6)';
      el.style.boxShadow='0 0 20px rgba(0,232,122,.3)';
      el.style.zIndex='20';
      const name=lang==='en'?(n.ne||n.n):n.n;
      const desc=lang==='en'?(n.de||n.d):n.d;
      document.getElementById('tt-n').textContent=name;
      document.getElementById('tt-d').textContent=desc;
      document.getElementById('tt-t').textContent=n.t;
      const eW=eco.offsetWidth;
      let tx=parseFloat(el.style.left)+50;
      let ty=parseFloat(el.style.top)-10;
      if(tx>eW*0.55) tx=parseFloat(el.style.left)-185;
      if(ty<10) ty=parseFloat(el.style.top)+50;
      if(ty>eW*0.75) ty=parseFloat(el.style.top)-90;
      tt.style.left=tx+'px'; tt.style.top=ty+'px';
      tt.classList.add('on');
    });
    el.addEventListener('mouseleave',()=>{
      el.style.borderColor='';
      el.style.boxShadow='';
      el.style.zIndex='';
      tt.classList.remove('on');
    });
    eco.appendChild(el);
  });

  function animateOrbit(){
    angles[1]+=SPEEDS[1];
    angles[2]+=SPEEDS[2];
    angles[3]+=SPEEDS[3];
    const {cx,cy,radii}=getSize();
    const half=eco.offsetWidth*0.058;
    const cnt={1:0,2:0,3:0};
    nodes.forEach(n=>{
      const orb=n.r;
      const i=cnt[orb]++;
      const a=bases[orb][i]+angles[orb];
      const r=radii[orb];
      n._el.style.left=(cx+r*Math.cos(a)-half)+'px';
      n._el.style.top=(cy+r*Math.sin(a)-half)+'px';
    });
    requestAnimationFrame(animateOrbit);
  }
  animateOrbit();

  // hamburger
  const ham=document.getElementById('hamburger');
  const mob=document.getElementById('mobMenu');
  if(ham) ham.addEventListener('click',()=>mob.classList.toggle('open'));

  // lang buttons
  const b1=document.getElementById('langBtn');
  const b2=document.getElementById('langBtn2');
  if(b1) b1.addEventListener('click',toggleLang);
  if(b2) b2.addEventListener('click',()=>{toggleLang();closeMob();});
});

// ── TICKER DATA ──
const r1=[
  {i:'💻',c:'sig',n:'Websites Profissionais',d:'Para empresas pequenas e grandes'},
  {i:'⚙️',c:'sim',n:'Sistemas IT',d:'Infraestrutura e consultoria'},
  {i:'🛒',c:'sib',n:'E-commerce',d:'Lojas online completas'},
  {i:'🎨',c:'sig',n:'Design UI/UX',d:'Interfaces que encantam'},
  {i:'🤖',c:'sim',n:'Inteligência Artificial',d:'Automação e inovação'},
  {i:'📊',c:'sib',n:'Analytics & BI',d:'Decisões baseadas em dados'},
  {i:'🔒',c:'sig',n:'Cibersegurança',d:'Proteção total de dados'},
  {i:'📱',c:'sim',n:'Apps Móveis',d:'iOS e Android nativos'},
];
const r2=[
  {i:'🌐',c:'sib',n:'Redes & Conectividade',d:'Infraestrutura de redes'},
  {i:'🖥️',c:'sig',n:'Hardware & Redes',d:'Infraestrutura IT completa'},
  {i:'💡',c:'sim',n:'Inovação Tech',d:'Soluções tecnológicas avançadas'},
  {i:'📡',c:'sib',n:'KoneXon Mind',d:'Tecnologia & inovação'},
  {i:'📈',c:'sig',n:'Crescimento Digital',d:'Escala o teu negócio'},
  {i:'🤝',c:'sim',n:'Parcerias IT',d:'Projectos tecnológicos'},
  {i:'☁️',c:'sib',n:'Cloud & Hosting',d:'Servidores e alojamento web'},
  {i:'🧠',c:'sig',n:'Consultoria IT',d:'Estratégia e tecnologia'},
];
const r3=[
  {i:'🚀',c:'sig',n:'Startups',d:'Aceleramos ideias guineenses'},
  {i:'🔗',c:'sim',n:'Integrações',d:'Sistemas conectados entre si'},
  {i:'📋',c:'sib',n:'Gestão de Projectos',d:'Do início ao fim, entregamos'},
  {i:'🛡️',c:'sig',n:'Suporte Técnico',d:'Sempre disponíveis para ajudar'},
  {i:'⚡',c:'sim',n:'Performance',d:'Sites rápidos e optimizados'},
  {i:'🌐',c:'sib',n:'Presença Digital',d:'A tua marca online'},
  {i:'📲',c:'sig',n:'Sistemas Mobile',d:'Soluções para telemóvel'},
  {i:'🎯',c:'sim',n:'SEO & Marketing',d:'Mais visibilidade online'},
];

function buildTicker(items){
  return [...items,...items].map(s=>`<div class="sc"><div class="si ${s.c}">${s.i}</div><div><div class="sn">${s.n}</div><div class="sd">${s.d}</div></div></div>`).join('');
}
document.getElementById('r1').innerHTML=buildTicker(r1);
document.getElementById('r2').innerHTML=buildTicker(r2);
document.getElementById('r3').innerHTML=buildTicker(r3);

function closeMob(){document.getElementById('mobMenu').classList.remove('open');}

// ── TRANSLATIONS ──
const translations={
  pt:{
    'hero-tag':'Ecossistema de Conexões',
    'hero-h1':'O teu negócio merece<br>um site que funciona <em>sempre.</em>',
    'hero-p':'O Konexon constrói websites e aplicações para escolas e pequenos negócios na Guiné-Bissau — seguros, rápidos e que funcionam mesmo quando a internet falha.',
    'btn-p':'Ver os nossos serviços',
    'btn-s':'Pedir uma proposta →',
    'ticker-label':'O que fazemos',
    'ticker-title':'Serviços que movem o país.',
    'ticker-sub':'Desenvolvimento web, IT, design, AI e inovação tecnológica — tudo construído para os Guineenses.',
    'about-label':'Quem somos',
    'about-h2':'Não somos apenas<br>uma empresa.',
    'about-p1':'O Konexon nasceu na Guiné-Bissau com uma missão clara — provar que o talento guineense não precisa de sair para criar produtos que competem globalmente.',
    'about-p2':'Criamos websites para pequenas e grandes empresas, sistemas com inteligência artificial, consultoria IT e muito mais.',
    'products-label':'Os nossos produtos',
    'products-h2':'Um ecossistema. Várias soluções.',
    'products-sub':'Cada produto é autónomo, focado e construído para dominar o seu espaço.',
    'founders-label':'Fundadores',
    'founders-h2':'As pessoas por trás do Konexon.',
    'founders-sub':'Dois estudantes de engenharia guineenses que fundaram o Konexon juntos — com a missão de construir o futuro tecnológico do país.',
    'contact-label':'Contacto',
    'contact-h2':'Fala com o Konexon.',
    'contact-sub':'Parcerias, projectos ou simplesmente queres saber mais — estamos aqui.',
    'contact-note':'Respondemos em menos de 24 horas. Podes escrever em Português, Crioulo, Inglês ou Français.',
    'footer-tag':'O Ecossistema de Conexões · Guiné-Bissau para o mundo.',
    'footer-copy':'© 2026 KoneXon · Todos os direitos reservados',
    'lang-btn':'EN',
    'founder-label-mm':'Co-Fundador',
    'founder-role-mm':'Tech & Vision',
    'founder-bio-mm':'Estudante de Engenharia Informática, natural da Guiné-Bissau. Co-fundou o Konexon com a missão de provar que o talento guineense não precisa de sair para vencer.',
    'founder-skills':'Áreas de interesse',
    'founder-label-je':'Co-Fundadora',
    'founder-role-je':'Operations & Tech',
    'founder-bio-je':'Estudante de Engenharia, natural da Guiné-Bissau. Co-fundou o Konexon para conectar pessoas, negócios e tecnologia — dentro e fora do país.',
  },
  en:{
    'hero-tag':'The Connection Ecosystem',
    'hero-h1':'Your business deserves<br>a site that works <em>always.</em>',
    'hero-p':'Konexon builds websites and applications for schools and small businesses in Guinea-Bissau — secure, fast, and working even when the internet fails.',
    'btn-p':'See our services',
    'btn-s':'Request a proposal →',
    'ticker-label':'What we do',
    'ticker-title':'Services that move the country.',
    'ticker-sub':'Web development, IT, design, AI and tech innovation — all built for Guineans.',
    'about-label':'Who we are',
    'about-h2':'We are not just<br>a company.',
    'about-p1':'Konexon was born in Guinea-Bissau with one clear mission — to prove that Guinean talent does not need to leave to build world-class products.',
    'about-p2':'We build websites for small and large businesses, AI-powered systems, IT consultancy and much more.',
    'products-label':'Our products',
    'products-h2':'One ecosystem. Many solutions.',
    'products-sub':'Each product is autonomous, focused and built to dominate its space.',
    'founders-label':'Founders',
    'founders-h2':'The people behind Konexon.',
    'founders-sub':'Two Guinean engineering students who co-founded Konexon — with a mission to build the country\'s technological future.',
    'contact-label':'Contact',
    'contact-h2':'Talk to Konexon.',
    'contact-sub':'Partnerships, projects or just want to know more — we\'re here.',
    'contact-note':'We reply within 24 hours. You can write in Portuguese, Creole, English or French.',
    'footer-tag':'The Connection Ecosystem · Guinea-Bissau to the world.',
    'footer-copy':'© 2026 KoneXon · All rights reserved',
    'lang-btn':'PT',
    'founder-label-mm':'Co-Founder',
    'founder-role-mm':'Tech & Vision',
    'founder-bio-mm':'Computer Engineering student from Guinea-Bissau. Co-founded Konexon with the mission of proving that Guinean talent does not need to leave to succeed.',
    'founder-skills':'Areas of interest',
    'founder-label-je':'Co-Founder',
    'founder-role-je':'Operations & Tech',
    'founder-bio-je':'Engineering student from Guinea-Bissau. Co-founded Konexon to connect people, businesses and technology — inside and outside the country.',
  }
};

let lang='pt';

function applyLang(l){
  const t=translations[l];
  document.querySelectorAll('[data-pt]').forEach(el=>{
    el.textContent=l==='pt'?el.dataset.pt:el.dataset.en;
  });
  document.querySelector('.htag').innerHTML=`<div class="hdot"></div>${t['hero-tag']}`;
  document.querySelector('.hero h1').innerHTML=t['hero-h1'];
  document.querySelector('.hero p').innerHTML=t['hero-p'];
  document.querySelector('.btn-p').textContent=t['btn-p'];
  document.querySelector('.btn-s').textContent=t['btn-s'];
  document.querySelector('.slabel').textContent=t['ticker-label'];
  document.querySelector('.stitle').textContent=t['ticker-title'];
  document.querySelector('.ssub').textContent=t['ticker-sub'];

  const aboutSec=document.getElementById('sobre');
  if(aboutSec){
    aboutSec.querySelector('.slabel').textContent=t['about-label'];
    aboutSec.querySelector('h2').innerHTML=t['about-h2'];
    const ps=aboutSec.querySelectorAll('.about-left p');
    if(ps[0]) ps[0].textContent=t['about-p1'];
    if(ps[1]) ps[1].textContent=t['about-p2'];
  }
  const prodSec=document.getElementById('produtos');
  if(prodSec){
    prodSec.querySelector('.slabel').textContent=t['products-label'];
    prodSec.querySelector('h2').textContent=t['products-h2'];
    prodSec.querySelector('.sec-hdr p').textContent=t['products-sub'];
  }
  const foundSec=document.getElementById('fundadores');
  if(foundSec){
    foundSec.querySelector('.slabel').textContent=t['founders-label'];
    foundSec.querySelector('h2').textContent=t['founders-h2'];
    foundSec.querySelector('.sec-hdr p').textContent=t['founders-sub'];
  }
  const contSec=document.getElementById('contact');
  if(contSec){
    contSec.querySelector('.slabel').textContent=t['contact-label'];
    contSec.querySelector('h2').textContent=t['contact-h2'];
    contSec.querySelector('.sec-hdr p').textContent=t['contact-sub'];
    contSec.querySelector('.contact-note').textContent=t['contact-note'];
  }
  document.querySelector('.ft').textContent=t['footer-tag'];
  document.getElementById('langBtn').textContent=t['lang-btn'];
  document.getElementById('langBtn2').textContent=t['lang-btn'];

  const fcards=document.querySelectorAll('.fcard');
  if(fcards.length>=2){
    fcards[0].querySelector('.founder-label').textContent=t['founder-label-mm'];
    fcards[0].querySelector('.frole').textContent=t['founder-role-mm'];
    fcards[0].querySelector('.fbio').textContent=t['founder-bio-mm'];
    fcards[0].querySelector('.fskills-label').textContent=t['founder-skills'];
    fcards[1].querySelector('.founder-label').textContent=t['founder-label-je'];
    fcards[1].querySelector('.frole').textContent=t['founder-role-je'];
    fcards[1].querySelector('.fbio').textContent=t['founder-bio-je'];
    fcards[1].querySelector('.fskills-label').textContent=t['founder-skills'];
  }
  nodes.forEach(n=>{
    if(!n._el) return;
    const label=l==='en'?(n.ne||n.n):n.n;
    n._el.querySelector('.snode-lbl').textContent=label.split(' ')[0];
  });
}

function toggleLang(){
  lang=lang==='pt'?'en':'pt';
  applyLang(lang);
}
