/* theme.js — system / light / dark theme switcher.
   Loaded in <head> without defer so the saved theme applies before first paint. */
(function () {
  var KEY = "msi-maker-theme";
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY) || "system"; } catch (e) { return "system"; }
  }
  function apply(value) {
    if (value === "light" || value === "dark") root.setAttribute("data-theme", value);
    else root.removeAttribute("data-theme");
  }

  apply(read());

  document.addEventListener("DOMContentLoaded", function () {
    var select = document.getElementById("theme-select");
    if (!select) return;
    select.value = read();
    select.addEventListener("change", function () {
      apply(select.value);
      try { localStorage.setItem(KEY, select.value); } catch (e) { /* storage unavailable: theme still applies for this visit */ }
    });
  });
})();
