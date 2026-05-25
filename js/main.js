/* Tidy Guys — site-wide helpers */
(function () {

  /* --- Email: copy-to-clipboard on touch devices --- */
  /*
   * On mobile (touch), tapping a mailto: link can trigger a
   * "download Gmail" prompt on Android if no email app is configured.
   * Fix: on touch devices intercept the click, copy the address to
   * the clipboard, and show a toast. Desktop users keep mailto: as-is.
   */
  var isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  function showToast(msg) {
    var toast = document.getElementById('tg-email-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'tg-email-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('tg-toast-show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove('tg-toast-show');
    }, 3000);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    if (!isTouchDevice) return; // desktop: let mailto: open normally

    e.preventDefault();
    var email = link.getAttribute('href').replace(/^mailto:/, '');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        showToast('✓ ' + email + ' copied — paste into any email app');
      }).catch(function () {
        showToast('Email: ' + email);
      });
    } else {
      /* Clipboard API not available — try share sheet, else show address */
      if (navigator.share) {
        navigator.share({ title: 'Email Tidy Guys', url: link.getAttribute('href') }).catch(function () {});
      } else {
        showToast('Email: ' + email);
      }
    }
  });

  /* --- Footer year --- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

})();
