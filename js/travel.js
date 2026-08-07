document.addEventListener('DOMContentLoaded', () => {
  const ctaBtns = document.querySelectorAll('.cta-booking');
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Booking Portal Opening Soon! Please contact our travel advisor directly.');
    });
  });
});