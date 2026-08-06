document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('pickleball-register-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const p1 = document.getElementById('player1-name').value.trim();
      const p2 = document.getElementById('player2-name').value.trim();
      const tName = document.getElementById('team-name').value.trim();

      const newTeam = {
        id: 'team-' + Date.now(),
        teamName: tName || (p1 + "'s Team"),
        playerOne: p1,
        playerTwo: p2 || 'Partner Requested',
        needsPartner: !p2,
        status: 'registered'
      };

      const existing = JSON.parse(localStorage.getItem('pickleball_teams') || '[]');
      existing.push(newTeam);
      localStorage.setItem('pickleball_teams', JSON.stringify(existing));

      alert('Team Registration Received! We look forward to seeing you on court.');
      regForm.reset();
    });
  }

  // FAQ Toggle Logic
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isVisible = answer.style.display === 'block';
      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      if (!isVisible) answer.style.display = 'block';
    });
  });
});