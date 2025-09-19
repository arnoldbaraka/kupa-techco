
// Simple client-side renderer for the static prototype
async function loadJSON(path){ const r = await fetch(path); return r.json(); }

function profileCard(p){
  const el = document.createElement('div');
  el.className = 'profile-card card';
  el.innerHTML = `
    <img src="${p.image}" alt="${p.name}" loading="lazy">
    <div class="profile-meta">
      <h4>${p.name}</h4>
      <p class="muted">${p.role || ''}</p>
      <p class="muted" style="font-size:0.85rem">Source: <a href="${p.source}" target="_blank" rel="noopener noreferrer">link</a></p>
    </div>`;
  return el;
}

function eventCard(e){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `<h4>${e.title}</h4><p class="muted">${e.date} · ${e.location || ''}</p><p>${e.description}</p><p class="muted">Posted by <strong>${e.owner}</strong></p>`;
  return el;
}

function newsCard(n){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `<h4>${n.title}</h4><p class="muted">${n.source}</p><p>${n.excerpt}</p><a href="${n.link}" target="_blank" rel="noopener noreferrer">Read →</a>`;
  return el;
}

async function boot(){
  const profiles = await loadJSON('data/profiles.json');
  const events = await loadJSON('data/events.json');
  const news = await loadJSON('data/news.json');
  const legends = await loadJSON('data/legends.json');

  const profilesGrid = document.getElementById('profiles-grid');
  profiles.forEach(p=> profilesGrid.appendChild(profileCard(p)));

  const eventsList = document.getElementById('events-list');
  events.forEach(e=> eventsList.appendChild(eventCard(e)));

  const newsGrid = document.getElementById('news-grid');
  news.forEach(n=> newsGrid.appendChild(newsCard(n)));

  const legendsGrid = document.getElementById('legends-grid');
  legends.forEach(l=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${l.name}</h4><p class="muted">${l.period || ''}</p><p>${l.story}</p><p class="muted">Source: <a href="${l.source}" target="_blank" rel="noopener noreferrer">link</a></p>`;
    legendsGrid.appendChild(card);
  });

  // link for Christine Bhoke source
  const bh = profiles.find(x=> x.name.toLowerCase().includes('bhoke'));
  if(bh) document.getElementById('bhoke-link').href = bh.source;
}

boot().catch(e=>{ console.error(e); });
