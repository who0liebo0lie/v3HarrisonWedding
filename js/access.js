document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('welcome-modal');
  const form = document.getElementById('guest-entry-form');
  const closeBtn = document.getElementById('close-welcome');

  const savedGuest = localStorage.getItem('wedding_guest_name');

  if (!savedGuest && modal) {
    modal.style.display = 'flex';
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('guest-firstname').value.trim();
      const lastName = document.getElementById('guest-lastname').value.trim();

      if (firstName && lastName) {
        const fullName = `${firstName} ${lastName}`;
        localStorage.setItem('wedding_guest_name', fullName);

        if (modal) modal.style.display = 'none';
        updatePersonalization(fullName);
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
});

function updatePersonalization(name) {
  const elements = document.querySelectorAll('.guest-personalized-name');
  elements.forEach(el => el.textContent = name);
}