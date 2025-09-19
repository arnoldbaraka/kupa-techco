// Simple script to load data for demo
function loadJSON(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data));
}

if (document.getElementById('profiles')) {
  loadJSON('data/profiles.json', function(profiles) {
    const container = document.getElementById('profiles');
    container.innerHTML = profiles.map(p => `
      <div class="profile">
        <img src="${p.avatar}" alt="${p.name}" width="80" />
        <h3>${p.name}</h3>
        <p>${p.profession}</p>
        <p>${p.bio}</p>
      </div>
    `).join('');
  });
}

if (document.getElementById('coaches')) {
  loadJSON('data/coaches.json', function(coaches) {
    const container = document.getElementById('coaches');
    container.innerHTML = coaches.map(c => `
      <div class="coach">
        <img src="${c.avatar}" alt="${c.name}" width="80" />
        <h3>${c.name}</h3>
        <p>${c.specialty}</p>
        <p>${c.bio}</p>
      </div>
    `).join('');
  });
}

if (document.getElementById('events')) {
  loadJSON('data/events.json', function(events) {
    const container = document.getElementById('events');
    container.innerHTML = events.map(e => `
      <div class="event">
        <h3>${e.title}</h3>
        <p>${e.date} - ${e.location}</p>
        <p>${e.description}</p>
      </div>
    `).join('');
  });
}

if (document.getElementById('businesses')) {
  loadJSON('data/businesses.json', function(businesses) {
    const container = document.getElementById('businesses');
    container.innerHTML = businesses.map(b => `
      <div class="business">
        <img src="${b.logo}" alt="${b.name}" width="80" />
        <h3>${b.name}</h3>
        <p>${b.category}</p>
        <p>${b.description}</p>
      </div>
    `).join('');
  });
}