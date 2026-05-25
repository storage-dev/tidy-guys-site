/* Tidy Guys — site-wide helpers */
(function () {

  /* --- Footer year --- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /*
   * Email links use standard mailto: href.
   * Tapping on iPhone opens Apple Mail (or the default mail app).
   * Tapping on Android opens Gmail, Outlook, Samsung Mail, or
   * whatever the user has set as their default email app.
   * No JavaScript interception — the OS handles app selection.
   */

})();
