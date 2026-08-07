(() => {
  const gate = document.querySelector('#welcome-gate');
  const form = document.querySelector('#welcome-form');
  const err  = document.querySelector('#welcome-error');
  const qs = new URLSearchParams(location.search);
  if (qs.has('skip')) { gate.hidden = true; return; }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const first = document.querySelector('#first-name').value.trim();
    const last  = document.querySelector('#last-name').value.trim();
    if (!first || !last) { err.textContent = 'Please enter both your first and last name.'; return; }
    localStorage.setItem('weddingGuestName', `${first} ${last}`);
    gate.hidden = true;               // landing page shows immediately — no intro
    window.scrollTo(0, 0);
  });
})();
