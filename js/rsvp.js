const RSVP_CONFIG = {
  endpoint: "YOUR_GOOGLE_APPS_SCRIPT_OR_FORMSPREE_URL_HERE",
  demoMode: true
};

document.addEventListener('DOMContentLoaded', () => {
  const countSelect = document.getElementById('guest-count-select');
  const container = document.getElementById('dynamic-guests-container');
  const rsvpForm = document.getElementById('rsvp-form');

  if (countSelect) {
    countSelect.addEventListener('change', (e) => {
      renderGuestFields(parseInt(e.target.value, 10));
    });
    renderGuestFields(1);
  }

  function renderGuestFields(count) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const card = document.createElement('div');
      card.className = 'card guest-rsvp-card';
      card.innerHTML = `
        <h3 class="guest-card-title">Guest ${i}</h3>
        <div class="form-group">
          <label for="guest-name-${i}">Full Name</label>
          <input type="text" id="guest-name-${i}" class="form-control guest-name-input" placeholder="Enter guest's full name" required>
        </div>
        <div class="events-grid">
          <div class="event-option">
            <label>Welcome Party</label>
            <select class="form-control event-attending" data-event="welcomeParty">
              <option value="Yes">Yes, I'm in!</option>
              <option value="No">No, can't make it</option>
            </select>
          </div>
          <div class="event-option">
            <label>Bingo Game</label>
            <select class="form-control event-bingo" data-event="bingo" onchange="toggleBingoFact(this, ${i})">
              <option value="Yes">Yes, I'm in!</option>
              <option value="No">No, can't make it</option>
            </select>
          </div>
          <div class="event-option">
            <label>Pickleball</label>
            <select class="form-control event-attending" data-event="pickleball">
              <option value="Yes">Yes, I'm in!</option>
              <option value="No">No, can't make it</option>
            </select>
          </div>
          <div class="event-option">
            <label>Wedding Ceremony</label>
            <select class="form-control event-attending" data-event="wedding">
              <option value="Yes">Yes, I'm in!</option>
              <option value="No">No, can't make it</option>
            </select>
          </div>
        </div>
        <div class="form-group bingo-fact-group" id="bingo-fact-group-${i}">
          <label for="bingo-fact-${i}">Your Bingo Clue / Fun Fact</label>
          <input type="text" id="bingo-fact-${i}" class="form-control bingo-fact-input" placeholder="Share one surprising or fun fact about yourself">
          <small class="form-hint">This clue may appear anonymously on a personalized Bingo board!</small>
        </div>
      `;
      container.appendChild(card);

      const nameInput = card.querySelector(`#guest-name-${i}`);
      const title = card.querySelector('.guest-card-title');
      nameInput.addEventListener('input', (e) => {
        title.textContent = e.target.value.trim() || `Guest ${i}`;
      });
    }
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        householdId: "HH-" + Date.now(),
        submittedAt: new Date().toISOString(),
        guests: []
      };

      const cards = container.querySelectorAll('.guest-rsvp-card');
      cards.forEach((card, idx) => {
        const index = idx + 1;
        payload.guests.push({
          fullName: card.querySelector(`#guest-name-${index}`).value,
          welcomeParty: card.querySelector('[data-event="welcomeParty"]').value,
          bingo: card.querySelector('.event-bingo').value,
          bingoFact: card.querySelector(`#bingo-fact-${index}`).value || '',
          pickleball: card.querySelector('[data-event="pickleball"]').value,
          wedding: card.querySelector('[data-event="wedding"]').value
        });
      });

      if (RSVP_CONFIG.demoMode) {
        localStorage.setItem('demo_rsvp_submission', JSON.stringify(payload));
        alert('RSVP Submitted Successfully (Demo Mode)! Responses saved locally.');
      }
    });
  }
});

function toggleBingoFact(selectElement, index) {
  const group = document.getElementById(`bingo-fact-group-${index}`);
  if (group) {
    group.style.display = selectElement.value === 'Yes' ? 'block' : 'none';
  }
}