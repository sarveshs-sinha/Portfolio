tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          base: '#0f172a',
          basedeep: '#0a0f1e',
          panel: '#111c33',
          cyan: { DEFAULT: '#06b6d4', soft: '#22d3ee' },
          emerald: { DEFAULT: '#10b981', soft: '#34d399' },
        },
        fontFamily: {
          display: ['Sora', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        boxShadow: {
          glowCyan: '0 0 20px rgba(6,182,212,0.35), 0 0 60px rgba(6,182,212,0.08)',
          glowEmerald: '0 0 20px rgba(16,185,129,0.35), 0 0 60px rgba(16,185,129,0.08)',
        }
      }
    }
  }

window.addEventListener("load", () => {
      setTimeout(() => {
        document.querySelector("#preloader").classList.add("hide");
        document.body.classList.remove("no-scroll");
      }, 1900);
    });
/* ---------------- Fade-up on scroll ---------------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));

/* ---------------- Navbar scroll state ---------------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('shadow-lg', window.scrollY > 20);
});

/* ---------------- Mobile menu ---------------- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));
mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.add('hidden')));

/* ---------------- Typing animation ---------------- */
const phrases = [
  "B.Tech CSE Student @ Quantum University, Roorkee",
  "Data Science & Analytics Enthusiast",
  "Turning pandas.DataFrame into decisions"
];
const typeEl = document.getElementById('typeLine');
let pI=0, cI=0, deleting=false;
function typeLoop(){
  const current = phrases[pI];
  if(!deleting){
    cI++;
    typeEl.textContent = current.slice(0,cI);
    if(cI === current.length){ deleting = true; setTimeout(typeLoop, 1500); return; }
  } else {
    cI--;
    typeEl.textContent = current.slice(0,cI);
    if(cI === 0){ deleting = false; pI = (pI+1)%phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

/* ---------------- Hero photo tilt ---------------- */
const tiltWrap = document.getElementById('tiltWrap');
const tiltTarget = document.getElementById('tiltTarget');
tiltWrap.addEventListener('mousemove', (e)=>{
  const r = tiltWrap.getBoundingClientRect();
  const x = (e.clientX - r.left)/r.width - 0.5;
  const y = (e.clientY - r.top)/r.height - 0.5;
  tiltTarget.style.transform = `rotateY(${x*16}deg) rotateX(${-y*16}deg)`;
});
tiltWrap.addEventListener('mouseleave', ()=>{ tiltTarget.style.transform = 'rotateY(0) rotateX(0)'; });

/* ---------------- Ticker content ---------------- */
const tickerItems = [
  "rows_cleaned: 1,240,500+", "dashboards_shipped: 6", "models_trained: 12",
  "avg_query_time: 42ms", "notebooks_published: 9", "coffee_consumed: ∞"
];
const tc = tickerItems.map(t=>`<span>${t}</span>`).join('<span class="text-cyan-soft/60">/</span>');
document.getElementById('tickerContent').innerHTML = tc;
document.getElementById('tickerContentDup').innerHTML = tc;

/* ---------------- Skills data ---------------- */
const analyticsSkills = [
  {name:'Python', level:90}, {name:'SQL', level:88}, {name:'Excel', level:82},
  {name:'Power BI', level:85}, {name:'Statistics', level:80}
];
const webSkills = [
  {name:'Numpy', level:92}, {name:'Pandas', level:88}, {name:'Seaborn', level:78}
];
const extraTags = ['Matplotlib','Scikit-Learn','Git-Hub','VS Code'];

function renderBars(container, data, colorClass){
  container.innerHTML = data.map(s=>`
    <div>
      <div class="flex justify-between text-xs font-mono mb-1.5">
        <span class="text-slate-300">${s.name}</span>
        <span class="text-slate-500">${s.level}%</span>
      </div>
      <div class="h-2 rounded-full bg-white/5 overflow-hidden">
        <div class="bar-fill h-full rounded-full ${colorClass}" style="width:0%" data-level="${s.level}"></div>
      </div>
    </div>`).join('');
}
renderBars(document.getElementById('barsAnalytics'), analyticsSkills, 'bg-gradient-to-r from-cyan to-cyan-soft');
renderBars(document.getElementById('barsWeb'), webSkills, 'bg-gradient-to-r from-emerald to-emerald-soft');

document.getElementById('tagCloud').innerHTML = extraTags.map(t=>
  `<span class="skill-tag font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 cursor-default">${t}</span>`
).join('');

const barObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar-fill').forEach(bar=>{
        bar.style.width = bar.dataset.level + '%';
      });
      barObserver.unobserve(e.target);
    }
  });
},{threshold:0.3});
barObserver.observe(document.getElementById('barsAnalytics'));
barObserver.observe(document.getElementById('barsWeb'));

/* ---------------- Projects ---------------- */
const projects = [
  {
    title:'Railway Booking Analysis',
    desc:'End-to-end exploratory analysis on a messy retail dataset — cleaning, outlier handling, and visual storytelling with Pandas & Seaborn.',
    tags:['python'],
    tagLabel:'Python · Pandas · SQL ',
    demo:'#', code:'https://github.com/sarveshs-sinha/Railway-Booking-And-Demand-Analysis'
  },
  {
    title:'IPL-2022-Analysis',
    desc:'The notebook loads the IPL dataset, cleans the data, explores important statistics, and creates beautiful visualizations to discover useful insights about IPL teams and matches.',
    tags:['python'],
    tagLabel:'Pandas · Seaborn',
    demo:'#', code:'https://github.com/sarveshs-sinha/IPL-2022-Analysis'
  },
  {
    title:'Cognifyz-Internship-Data-Analysis',
    desc:'Regression and classification models benchmarked on a customer dataset, with an emphasis on interpretable feature importance.',
    tags:['python'],
    tagLabel:'Python · Scikit-Learn',
    demo:'#', code:'https://github.com/sarveshs-sinha/Cognifyz-Internship-Data-Analysis'
  },
  {
    title:'PostgreSQL-Basics',
    desc:'A classification model estimating cardiac risk from clinical features, evaluated with precision/recall tradeoffs over accuracy alone.',
    tags:['sql'],
    tagLabel:'SQL',
    demo:'#', code:'https://github.com/sarveshs-sinha/PostgreSQL-Basics'
  },
  {
    title:'This Portfolio Site',
    desc:'A fast, dependency-light single-page site — Tailwind for structure, vanilla JS for every interaction, no bloat.',
    tags:['web'],
    tagLabel:'HTML · CSS · JS',
    demo:'#', code:'#'
  },
  {
    title:'Student Performance Analysis (Working)',
    desc:'Statistical analysis linking study habits and attendance to academic outcomes, presented as a clean Excel/Power BI report.',
    tags:['powerbi','python'],
    tagLabel:'Power BI · Python',
    demo:'#', code:'#'
  },
];

function renderProjects(filter){
  const grid = document.getElementById('projectGrid');
  const list = filter==='all' ? projects : projects.filter(p=>p.tags.includes(filter));
  grid.innerHTML = list.map(p=>`
    <div class="glass glass-border-glow rounded-2xl p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
      <span class="font-mono text-[11px] text-cyan-soft/80 uppercase tracking-wider mb-3">${p.tagLabel}</span>
      <h3 class="font-display font-semibold text-lg text-white mb-2">${p.title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed flex-1">${p.desc}</p>
      <div class="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
        <a href="${p.demo}" class="text-xs font-mono px-3 py-2 rounded-lg border border-cyan-500/40 text-cyan-soft hover:bg-cyan-500/10 hover:shadow-glowCyan transition">Live Demo</a>
        <a href="${p.code}" class="text-xs font-mono px-3 py-2 rounded-lg border border-white/10 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-soft transition">GitHub →</a>
      </div>
    </div>`).join('');
}
renderProjects('all');

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

/* ---------------- Chart.js demo ---------------- */
const ctx = document.getElementById('demoChart').getContext('2d');
const chartDatasets = {
  trends: {
    type:'line',
    labels:['Jan','Feb','Mar','Apr','May','Jun','Jul'],
    data:[42,55,49,68,74,70,88],
    label:'Analyses shipped'
  },
  skills: {
    type:'bar',
    labels:['Python','Pandas','SQL','Power BI','JavaScript'],
    data:[90,88,84,80,78],
    label:'Proficiency %'
  }
};
let demoChart = new Chart(ctx, buildConfig('trends'));

function buildConfig(key){
  const d = chartDatasets[key];
  return {
    type: d.type,
    data: {
      labels: d.labels,
      datasets: [{
        label: d.label,
        data: d.data,
        borderColor: '#06b6d4',
        backgroundColor: d.type === 'bar'
          ? 'rgba(16,185,129,0.55)'
          : 'rgba(6,182,212,0.18)',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#0a0f1e',
        pointRadius: 4,
        borderWidth: 2,
        borderRadius: d.type === 'bar' ? 6 : 0,
        tension: 0.35,
        fill: d.type === 'line'
      }]
    },
    options: {
      responsive:true,
      plugins:{
        legend:{ labels:{ color:'#94a3b8', font:{ family:'JetBrains Mono', size:11 } } },
        tooltip:{ backgroundColor:'#111c33', borderColor:'#06b6d4', borderWidth:1, titleColor:'#e2e8f0', bodyColor:'#cbd5e1' }
      },
      scales:{
        x:{ ticks:{ color:'#64748b', font:{family:'JetBrains Mono', size:10} }, grid:{ color:'rgba(148,163,184,0.08)' } },
        y:{ ticks:{ color:'#64748b', font:{family:'JetBrains Mono', size:10} }, grid:{ color:'rgba(148,163,184,0.08)' } }
      }
    }
  };
}

document.querySelectorAll('.viz-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.viz-btn').forEach(b=>{
      b.classList.remove('active','border-cyan-500/40','text-cyan-soft');
      b.classList.add('border-white/10','text-slate-300');
    });
    btn.classList.add('active','border-cyan-500/40','text-cyan-soft');
    btn.classList.remove('border-white/10','text-slate-300');
    demoChart.destroy();
    demoChart = new Chart(ctx, buildConfig(btn.dataset.set));
  });
});

/* ---------------- Contact form ---------------- */
async function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const button = form.querySelector('button[type="submit"]');

  button.disabled = true;
  button.textContent = 'Sending...';

  const formData = new FormData(form);
  formData.set('replyto', document.getElementById('emailField').value);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    note.textContent = '✓ Message sent successfully!';
    note.classList.remove('hidden');
    form.reset();

    setTimeout(() => note.classList.add('hidden'), 5000);

  } catch (error) {
    note.textContent = '✕ Could not send the message. Please try again.';
    note.classList.remove('hidden');
  }

  button.disabled = false;
  button.textContent = 'Send Message';

  return false;
}

document.getElementById('year').textContent = new Date().getFullYear();
