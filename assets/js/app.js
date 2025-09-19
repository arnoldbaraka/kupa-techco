async function loadJSON(file) {
  const res = await fetch(file);
  return await res.json();
}

function renderSection(containerId, items, formatter) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = formatter(item);
    container.appendChild(div);
  });
}

async function init() {
  const profiles = await loadJSON('data/profiles.json');
  const news = await loadJSON('data/news.json');
  const events = await loadJSON('data/events.json');
  const legends = await loadJSON('data/legends.json');

  renderSection('profiles-container', profiles, p =>
    `<h3>${p.name}</h3><p><em>${p.role}</em></p><p>${p.bio}</p><a href='${p.source}' target='_blank'>Source</a>`
  );

  renderSection('news-container', news, n =>
    `<h3>${n.title}</h3><p>${n.excerpt}</p><a href='${n.link}' target='_blank'>Read more</a>`
  );

  renderSection('events-container', events, e =>
    `<h3>${e.title}</h3><p>${e.date} - ${e.location}</p><p>${e.description}</p>`
  );

  renderSection('legends-container', legends, l =>
    `<h3>${l.name}</h3><p>${l.story}</p><a href='${l.source}' target='_blank'>Reference</a>`
  );

  renderSection('coaching-container', profiles.filter(p => p.is_coach), c =>
    `<h3>${c.name} (Coach)</h3><p>${c.bio}</p>`
  );

  renderSection('women-container', profiles.filter(p => p.tags && p.tags.includes('women')), w =>
    `<h3>${w.name}</h3><p>${w.bio}</p>`
  );
}

init();
