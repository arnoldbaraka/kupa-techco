/* assets/script.js - client-side logic for KUPA Super Platform */
document.addEventListener('DOMContentLoaded', () => {

  /* Typing effect for hero */
  (function typing(){
    const el = document.getElementById('typing-text');
    if(!el) return;
    const text = "Connecting Kuria Professionals • SACCO • Coaching • Events • Marketplace";
    let i = 0;
    const t = setInterval(()=> {
      el.textContent += text.charAt(i);
      if(++i >= text.length) clearInterval(t);
    }, 35);
  })();

  /* Simple data fetch and render from local JSON files */
  async function loadJSON(path){
    try {
      const res = await fetch(path);
      if(!res.ok) return null;
      return await res.json();
    } catch(e){ return null; }
  }

  /* Populate directory */
  (async function renderProfiles(){
    const data = await loadJSON('data/profiles.json');
    if(!data) return;
    const container = document.getElementById('directory-container');
    if(!container) return;
    container.innerHTML = '';
    data.forEach(p => {
      const card = document.createElement('div'); card.className = 'profile-card card';
      card.innerHTML = `
        <img src="${p.image||'assets/images/avatar-placeholder.svg'}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="muted">${p.role} · ${p.location}</p>
        <p>${p.summary||''}</p>
        <div style="margin-top:10px"><a class="link" href="${p.contact||'#'}">Connect</a></div>
      `;
      container.appendChild(card);
    });
  })();

  /* Populate coaches */
  (async function renderCoaches(){
    const data = await loadJSON('data/coaches.json');
    if(!data) return;
    const container = document.getElementById('coaches-container');
    if(!container) return;
    container.innerHTML = '';
    data.forEach(c => {
      const card = document.createElement('div'); card.className = 'coach-card';
      card.innerHTML = `
        <h3>${c.name}</h3>
        <p class="muted">${c.field}</p>
        <p>${c.about}</p>
        <div style="margin-top:10px"><a href="${c.contact||'#'}" class="btn-small">Request Session</a></div>
      `;
      container.appendChild(card);
    });
  })();

  /* Populate events */
  (async function renderEvents(){
    const data = await loadJSON('data/events.json');
    if(!data) return;
    const container = document.getElementById('events-container');
    if(!container) return;
    container.innerHTML = '';
    data.forEach(e => {
      const card = document.createElement('div'); card.className = 'event-card';
      card.innerHTML = `
        <h3>${e.title}</h3>
        <p class="muted">${e.date} · ${e.venue}</p>
        <p>${e.description}</p>
        <div style="margin-top:10px"><a class="link" href="${e.link||'#'}">Details</a> <span style="margin-left:8px;color:var(--gold)">${e.tags?.map(t=>`#${t}`).join(' ')||''}</span></div>
      `;
      container.appendChild(card);
    });
  })();

  /* Populate marketplace/businesses */
  (async function renderBusinesses(){
    const data = await loadJSON('data/businesses.json');
    if(!data) return;
    const container = document.getElementById('businesses-container');
    if(!container) return;
    container.innerHTML = '';
    data.forEach(b => {
      const card = document.createElement('div'); card.className = 'business-card';
      card.innerHTML = `
        <h3>${b.name}</h3>
        <p class="muted">${b.category} · ${b.location}</p>
        <p>${b.description}</p>
        <div style="margin-top:10px"><a class="link" href="${b.link||'#'}">View</a></div>
      `;
      container.appendChild(card);
    });
  })();

  /* Stats animation */
  (function statsAnim(){
    const statEls = document.querySelectorAll('.impact-stat');
    statEls.forEach(el => {
      const target = +el.dataset.to || 0;
      let n = 0, step = Math.max(1, Math.floor(target/80));
      const iv = setInterval(()=> {
        n += step;
        if(n >= target){ n = target; clearInterval(iv); }
        el.textContent = n + (el.dataset.suffix||'+');
      }, 25);
    });
  })();

});
