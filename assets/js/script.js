"use strict";

/**
 * add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR TOGGLE FOR MOBILE
 */
document.addEventListener("DOMContentLoaded", function () {
  // Check if nav toggler exists before adding event listener
  const navToggler = document.querySelector("[data-nav-toggler]");
  if (navToggler) {
    navToggler.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = function () {
    if (navbar) navbar.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  if (navTogglers.length > 0) {
    addEventOnElements(navTogglers, "click", toggleNavbar);
  }

  /**
   * HEADER
   * active header when window scroll down to 100px
   */
  const header = document.querySelector("[data-header]");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    });
  }

  /**
   * SCROLL REVEAL
   */
  const revealElements = document.querySelectorAll("[data-reveal]");
  const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

  const reveal = function () {
    for (let i = 0, len = revealElements.length; i < len; i++) {
      if (
        revealElements[i].getBoundingClientRect().top <
        window.innerHeight / 1.2
      ) {
        revealElements[i].classList.add("revealed");
      }
    }
  };

  // Apply reveal delays
  for (let i = 0, len = revealDelayElements.length; i < len; i++) {
    revealDelayElements[i].style.transitionDelay =
      revealDelayElements[i].dataset.revealDelay;
  }

  if (revealElements.length > 0) {
    window.addEventListener("scroll", reveal);
    window.addEventListener("load", reveal);
  }

  /**
   * DARK MODE THEME SWITCH
   */
  const initThemeSwitch = function () {
    const themeSwitch = document.getElementById("theme-switch");

    if (!themeSwitch) {
      console.warn("Theme switch button not found");
      return;
    }

    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem("theme") || "light";

    // Apply the saved theme on page load
    if (currentTheme === "dark") {
      body.classList.add("darkmode");
    }

    // Add click event listener to the theme switch button
    themeSwitch.addEventListener("click", function () {
      // Toggle the darkmode class
      body.classList.toggle("darkmode");

      // Save the new theme preference
      const newTheme = body.classList.contains("darkmode") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });

    // Optional: Add keyboard support (Enter or Space to toggle)
    themeSwitch.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        themeSwitch.click();
      }
    });

    console.log("Theme switch initialized successfully");
  };

  // Initialize theme switch
  initThemeSwitch();

  // Fallback: Try to initialize theme switch after a short delay if it failed initially
  setTimeout(function () {
    if (
      !document
        .getElementById("theme-switch")
        ?.hasAttribute("data-theme-initialized")
    ) {
      const themeSwitch = document.getElementById("theme-switch");
      if (themeSwitch && !themeSwitch.onclick) {
        themeSwitch.setAttribute("data-theme-initialized", "true");
        initThemeSwitch();
      }
    }
  }, 500);
});

// Alternative approach: Initialize theme immediately if DOM is already loaded
if (document.readyState === "loading") {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already loaded, initialize immediately
  const themeSwitch = document.getElementById("theme-switch");
  if (themeSwitch) {
    const body = document.body;
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
      body.classList.add("darkmode");
    }

    themeSwitch.addEventListener("click", function () {
      body.classList.toggle("darkmode");
      const newTheme = body.classList.contains("darkmode") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });
  }
}
