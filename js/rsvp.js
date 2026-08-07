document.addEventListener('DOMContentLoaded', () => {
  const countSelect = document.getElementById('guest-count-select');
  const container = document.getElementById('dynamic-guests-container');
  const rsvpForm = document.getElementById('rsvp-form');

  if (countSelect) {
    countSelect.addEventListener('change', (e) => {
      renderGuests(parseInt(e.target.value, 10));
    });
    renderGuests(2); // Default to 2 per design reference
  }

  function renderGuests(count) {
    if (!container) return;
    container.innerHTML = '';
    
    const sampleNames = ['Julia Porrino', 'Wesley Harrison'];

    for (let i = 1; i <= count; i++) {
      const card = document.createElement('div');
      card.className = 'card guest-rsvp-card';
      const defaultName = sampleNames[i-1] || `Guest ${i}`;
      
      card.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.8rem; margin-bottom:1.5rem;">
          <span style="background:var(--color-bougainvillea); color:#fff; padding:0.2rem 0.8rem; border-radius:12px; font-weight:bold; font-size:0.85rem;">GUEST ${i}</span>
          <input type="text" class="form-control guest-name-input" value="${defaultName}" style="font-family:var(--font-heading); font-size:1.4rem; font-weight:bold; border:none; border-bottom:1px solid #ccc; border-radius:0; padding:0.2rem;" required>
        </div>
        
        <p style="font-size:0.85rem; font-weight:bold; color:var(--color-bougainvillea); text-transform:uppercase; margin-bottom:0.8rem;">PLEASE RSVP TO EACH EVENT</p>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
          <div class="event-box">
            <label style="font-size:0.9rem; font-weight:600;">🌺 Welcome Party</label>
            <div class="event-toggle-group" data-event="welcome">
              <button type="button" class="toggle-btn active-yes" onclick="setToggle(this, 'Yes')">Yes, I'm in!</button>
              <button type="button" class="toggle-btn" onclick="setToggle(this, 'No')">No, can't make it</button>
            </div>
          </div>

          <div class="event-box">
            <label style="font-size:0.9rem; font-weight:600;">🎲 Bingo</label>
            <div class="event-toggle-group" data-event="bingo">
              <button type="button" class="toggle-btn active-yes" onclick="setToggle(this, 'Yes', ${i})">Yes, I'm in!</button>
              <button type="button" class="toggle-btn" onclick="setToggle(this, 'No', ${i})">No, can't make it</button>
            </div>
          </div>

          <div class="event-box">
            <label style="font-size:0.9rem; font-weight:600;">🎾 Pickleball</label>
            <div class="event-toggle-group" data-event="pickleball">
              <button type="button" class="toggle-btn active-yes" onclick="setToggle(this, 'Yes')">Yes, I'm in!</button>
              <button type="button" class="toggle-btn" onclick="setToggle(this, 'No')">No, can't make it</button>
            </div>
          </div>

          <div class="event-box">
            <label style="font-size:0.9rem; font-weight:600;">💍 Wedding</label>
            <div class="event-toggle-group" data-event="wedding">
              <button type="button" class="toggle-btn active-yes" onclick="setToggle(this, 'Yes')">Yes, I'm in!</button>
              <button type="button" class="toggle-btn" onclick="setToggle(this, 'No')">No, can't make it</button>
            </div>
          </div>
        </div>

        <div class="bingo-clue-box" id="bingo-clue-box-${i}" style="background:var(--color-parchment); padding:1rem; border-radius:12px; border:1px solid rgba(212,175,55,0.4);">
          <label style="font-size:0.85rem; font-weight:bold; color:var(--color-bougainvillea); text-transform:uppercase;">YOUR BINGO CLUE</label>
          <p style="font-size:0.8rem; color:#666; margin-bottom:0.5rem;">Share one surprising or fun fact about yourself.</p>
          <textarea class="form-control" rows="2" placeholder="I once sang karaoke with a cruise ship captain in the Bahamas!"></textarea>
        </div>
      `;
      container.appendChild(card);
    }
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your RSVP responses have been successfully submitted.');
    });
  }
});

function setToggle(btn, val, guestIdx) {
  const group = btn.parentElement;
  group.querySelectorAll('.toggle-btn').forEach(b => {
    b.classList.remove('active-yes', 'active-no');
  });
  if (val === 'Yes') {
    btn.classList.add('active-yes');
  } else {
    btn.classList.add('active-no');
  }

  if (group.dataset.event === 'bingo' && guestIdx) {
    const clueBox = document.getElementById(`bingo-clue-box-${guestIdx}`);
    if (clueBox) clueBox.style.display = (val === 'Yes') ? 'block' : 'none';
  }
}