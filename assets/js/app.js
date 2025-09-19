
// KUPA Pro client-side app
async function loadJSON(path){ try{ const r = await fetch(path); return await r.json(); } catch(e){ console.error('loadJSON',e); return []; } }

function el(tag, attrs={}, inner=''){ const e=document.createElement(tag); for(const k in attrs) e.setAttribute(k, attrs[k]); if(typeof inner==='string') e.innerHTML = inner; else if(inner instanceof Node) e.appendChild(inner); else if(Array.isArray(inner)) inner.forEach(n=> e.appendChild(n)); return e; }

function avatarSvg(initials, bg){ return 'https://ui-avatars.com/api/?name='+encodeURIComponent(initials)+'&background='+bg.replace('#','')+'&color=fff&size=256'; }

function profileCard(p){
  const card = el('div',{class:'card profile'});
  const img = el('img',{src:p.image || avatarSvg(p.name,'0b6b3f'), alt:p.name});
  const meta = el('div',{class:'profile-meta'},`<h4>${p.name}</h4><div class="muted">${p.role || ''}</div><div class="muted small">Source: <a href="${p.source}" target="_blank">link</a></div>`);
  card.appendChild(img); card.appendChild(meta);
  return card;
}

function newsCard(n){
  const c = el('div',{class:'card'});
  c.innerHTML = `<h4>${n.title}</h4><p class="muted">${n.source} · ${n.region || 'all'}</p><p>${n.excerpt}</p><div style="display:flex;gap:8px;margin-top:10px"><a class="btn btn-outline" href="${n.link}" target="_blank">Read</a></div>`;
  return c;
}

function eventCard(e){
  const c = el('div',{class:'card'});
  c.innerHTML = `<h4>${e.title}</h4><p class="muted">${e.date} · ${e.location || ''}</p><p>${e.description}</p>`;
  const r = el('button',{}, 'RSVP');
  r.className = 'btn btn-primary';
  const id = 'rsvp_'+(e.title+e.date).replace(/\s+/g,'_');
  if(localStorage.getItem(id)) { r.textContent = 'RSVP’d ✓'; r.disabled = true; }
  r.addEventListener('click', ()=>{ localStorage.setItem(id,true); r.textContent='RSVP’d ✓'; r.disabled=true; });
  c.appendChild(r);
  return c;
}

async function boot(){
  const profiles = await loadJSON('data/profiles.json');
  const news = await loadJSON('data/news.json');
  const events = await loadJSON('data/events.json');
  const legends = await loadJSON('data/legends.json');

  document.getElementById('stat-profiles').textContent = profiles.length;
  document.getElementById('stat-events').textContent = events.length;
  document.getElementById('stat-news').textContent = news.length;

  // spotlight
  const spot = profiles[0];
  if(spot){
    document.getElementById('spot-name').textContent = spot.name + ' · ' + (spot.role || '');
    const av = document.getElementById('spot-avatars');
    [0,1,2].forEach(i=>{ const p = profiles[i%profiles.length]; const img=el('img',{src:p.image||avatarSvg(p.name,'0b6b3f'),alt:p.name}); av.appendChild(img); });
  }

  const profilesGrid = document.getElementById('profiles-grid');
  profiles.forEach(p=> profilesGrid.appendChild(profileCard(p)));

  const coachesGrid = document.getElementById('coaches-grid');
  profiles.filter(x=>x.is_coach).forEach(c=> coachesGrid.appendChild(profileCard(c)));

  const womenGrid = document.getElementById('women-grid');
  profiles.filter(x=> x.tags && x.tags.includes('women')).forEach(w=> womenGrid.appendChild(profileCard(w)));

  const newsGrid = document.getElementById('news-grid');
  function renderNews(filter='all', q=''){
    newsGrid.innerHTML='';
    news.filter(n=> (filter==='all' || n.region===filter) && (q==='' || (n.title+' '+n.excerpt).toLowerCase().includes(q.toLowerCase())) ).forEach(n=> newsGrid.appendChild(newsCard(n)));
  }
  renderNews('all','');
  document.getElementById('news-filter').addEventListener('change', e=> renderNews(e.target.value, document.getElementById('news-search').value));
  document.getElementById('news-search').addEventListener('input', e=> renderNews(document.getElementById('news-filter').value, e.target.value));

  const eventsGrid = document.getElementById('events-grid');
  events.forEach(ev=> eventsGrid.appendChild(eventCard(ev)));

  const legendsGrid = document.getElementById('legends-grid');
  legends.forEach(l=> { const c = el('div',{class:'card'}); c.innerHTML = `<h4>${l.name}</h4><p class="muted">${l.type || ''}</p><p>${l.story}</p><p class="muted small">Source: ${l.source}</p>`; legendsGrid.appendChild(c); });

  // join form local storage
  const form = document.getElementById('join-form');
  form.addEventListener('submit', e=>{ e.preventDefault(); const fd = new FormData(form); const obj = {}; fd.forEach((v,k)=> obj[k]=v ); const key = 'kupa_join_'+Date.now(); localStorage.setItem(key, JSON.stringify(obj)); alert('Thanks — your interest has been recorded locally.'); form.reset(); });

  document.getElementById('download-json').addEventListener('click', ()=>{
    const fd = new FormData(form); const obj={}; fd.forEach((v,k)=> obj[k]=v ); const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj)); const a=document.createElement('a'); a.setAttribute('href', dataStr); a.setAttribute('download','kupa-join.json'); a.click();
  });
}

boot();
