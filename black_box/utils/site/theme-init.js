(function () {
  try {
    var savedTheme = localStorage.getItem("theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "light");
  }

  function syncTopbarState() {
    var topbar = document.querySelector(".topbar");
    if (!topbar) {
      return false;
    }

    topbar.classList.toggle("is-floating", window.scrollY > 18);
    return true;
  }

  function bindTopbarState() {
    syncTopbarState();
    window.addEventListener("scroll", syncTopbarState, { passive: true });
    window.addEventListener("resize", syncTopbarState);

    if (syncTopbarState()) {
      return;
    }

    var observer = new MutationObserver(function () {
      if (syncTopbarState()) {
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindTopbarState, { once: true });
  } else {
    bindTopbarState();
  }
})();
