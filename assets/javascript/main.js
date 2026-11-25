/* main.js — copy-to-clipboard buttons and download feedback. */
(function () {
  "use strict";

  function setStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("status--error", Boolean(isError));
  }

  /* Copy buttons: <button data-copy="#target-id" data-status="#status-id"> */
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.querySelector(button.getAttribute("data-copy"));
      var status = document.querySelector(button.getAttribute("data-status"));
      if (!target) return;
      var text = target.textContent.trim();

      function fallback() {
        var range = document.createRange();
        range.selectNodeContents(target);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        setStatus(status, "Couldn’t copy automatically. The checksum is selected: press Ctrl+C.", true);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () { setStatus(status, "Checksum copied."); },
          fallback
        );
      } else {
        fallback();
      }
    });
  });

  /* Download links: confirm the download started for screen readers and sighted users. */
  document.querySelectorAll("[data-download]").forEach(function (link) {
    link.addEventListener("click", function () {
      var status = document.querySelector(link.getAttribute("data-status"));
      setStatus(status, "Download started. If nothing happens, check your browser’s downloads list or allow downloads from this site.");
    });
  });
})();
