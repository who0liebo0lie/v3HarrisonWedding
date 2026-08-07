const travelLinks = {
  booking: "#coming-soon",
  email: "mailto:info@alignedjourneys.com",
  phone: "tel:+18005550199",
  royalCaribbeanShip: "https://www.royalcaribbean.com/cruise-ships/harmony-of-the-seas"
};

document.addEventListener('DOMContentLoaded', () => {
  const bookingBtns = document.querySelectorAll('.cta-booking');
  bookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Booking Portal Opening Soon! Please contact our travel advisor directly via phone or email in the interim.");
    });
  });

  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const answer = button.nextElementSibling;
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('open'));

      if (!isOpen) {
        answer.classList.add('open');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('open'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('open'));
    }
  });
});