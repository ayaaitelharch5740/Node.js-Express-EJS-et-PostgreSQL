document.addEventListener('DOMContentLoaded', () => {

  // Formater les dates
  document.querySelectorAll('.format-date').forEach(el => {
    const raw = el.textContent.trim();
    if (!raw || raw === '—') return;
    const d = new Date(raw);
    if (!isNaN(d)) {
      el.textContent = d.toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'long', year: 'numeric'
      });
    }
  });

  // Confirmation de suppression
  document.querySelectorAll('form[data-confirm]').forEach(form => {
    form.addEventListener('submit', e => {
      const msg = form.dataset.confirm || 'Confirmer la suppression ?';
      if (!confirm(msg)) e.preventDefault();
    });
  });

  // Marquer lien nav actif
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    } else if (href === '/' && path === '/') {
      link.classList.add('active');
    }
  });

  // Auto-disparition des alertes
  document.querySelectorAll('.alert-auto-close').forEach(el => {
    setTimeout(() => {
      el.style.transition = 'opacity .5s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 500);
    }, 4000);
  });
});