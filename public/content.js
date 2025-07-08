function applyRoundedCards(rounded) {
  document.querySelectorAll(".ic-DashboardCard").forEach((card) => {
    card.style.borderRadius = rounded ? "18px" : "";
  });
}

chrome.storage.sync.get(["roundedCards"], (data) => {
  applyRoundedCards(!!data.roundedCards);

  if (data.roundedCards) {
    const observer = new MutationObserver(() => {
      applyRoundedCards(true);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "roundedCards" in changes) {
    applyRoundedCards(!!changes.roundedCards.newValue);
  }
});

function applyGradientCards(enabled) {
  document
    .querySelectorAll(".ic-DashboardCard__header_image")
    .forEach((div) => {
      let overlay = div.querySelector(".canvaspro-gradient-overlay");
      if (overlay) overlay.remove();

      if (enabled) {
        overlay = document.createElement("div");
        overlay.className = "canvaspro-gradient-overlay";
        overlay.style.position = "absolute";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.pointerEvents = "none";
        overlay.style.borderRadius = "inherit";
        overlay.style.background =
          "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)";
        overlay.style.opacity = "0.7";

        div.style.position = "relative";
        div.appendChild(overlay);
      }
    });
}

chrome.storage.sync.get(["gradientCards"], (data) => {
  applyGradientCards(!!data.gradientCards);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "gradientCards" in changes) {
    applyGradientCards(!!changes.gradientCards.newValue);
  }
});

const observer = new MutationObserver(() => {
  chrome.storage.sync.get(["gradientCards", "hideAnnouncements"], (data) => {
    applyGradientCards(!!data.gradientCards);
    applyHideAnnouncements(!!data.hideAnnouncements);
  });
});
observer.observe(document.body, { childList: true, subtree: true });

function applyHideAnnouncements(enabled) {
  document
    .querySelectorAll(".ic-DashboardCard__action.announcements")
    .forEach((el) => {
      el.style.display = enabled ? "none" : "";
    });
}

chrome.storage.sync.get(["hideAnnouncements"], (data) => {
  applyHideAnnouncements(!!data.hideAnnouncements);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "hideAnnouncements" in changes) {
    applyHideAnnouncements(!!changes.hideAnnouncements.newValue);
  }
});

function applyRemoveSidebarLogo(enabled) {
  document
    .querySelectorAll(".ic-app-header__logomark-container")
    .forEach((el) => {
      el.style.display = enabled ? "none" : "";
    });
}

chrome.storage.sync.get(["removeSidebarLogo"], (data) => {
  applyRemoveSidebarLogo(!!data.removeSidebarLogo);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "removeSidebarLogo" in changes) {
    applyRemoveSidebarLogo(!!changes.removeSidebarLogo.newValue);
  }
});

const fontLinks = {
  Inter:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
  Roboto:
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
  Poppins:
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap",
  "Open Sans":
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap",
  Lato: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
  Montserrat:
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
  Nunito:
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap",
  Merriweather:
    "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
  Oswald:
    "https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap",
  "Source Sans Pro":
    "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap",
};

function applyFont(font) {
  let oldLink = document.getElementById("canvaspro-font-link");
  if (oldLink) oldLink.remove();

  if (fontLinks[font]) {
    const link = document.createElement("link");
    link.id = "canvaspro-font-link";
    link.rel = "stylesheet";
    link.href = fontLinks[font];
    document.head.appendChild(link);
    document.body.style.fontFamily = `'${font}', sans-serif`;
  } else {
    document.body.style.fontFamily = "";
  }
}

chrome.storage.sync.get(["selectedFont"], (data) => {
  if (data.selectedFont) {
    applyFont(data.selectedFont);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "selectedFont" in changes) {
    applyFont(changes.selectedFont.newValue);
  }
});

function applyDisableColorOverlay(enabled) {
  document.querySelectorAll(".ic-DashboardCard__header_hero").forEach((el) => {
    if (enabled) {
      // Save original styles if not already saved
      if (!el.dataset.origOpacity) {
        el.dataset.origOpacity = el.style.opacity;
      }
      if (!el.dataset.origBg) {
        el.dataset.origBg = el.style.background;
      }
      if (!el.dataset.origBgColor) {
        el.dataset.origBgColor = el.style.backgroundColor;
      }
      el.style.opacity = "0";
      el.style.background = "none";
      el.style.backgroundColor = "transparent";
    } else {
      // Restore original styles if saved
      if (el.dataset.origOpacity !== undefined) {
        el.style.opacity = el.dataset.origOpacity;
        delete el.dataset.origOpacity;
      }
      if (el.dataset.origBg !== undefined) {
        el.style.background = el.dataset.origBg;
        delete el.dataset.origBg;
      }
      if (el.dataset.origBgColor !== undefined) {
        el.style.backgroundColor = el.dataset.origBgColor;
        delete el.dataset.origBgColor;
      }
    }
  });
}

chrome.storage.sync.get(["disableColorOverlay"], (data) => {
  applyDisableColorOverlay(!!data.disableColorOverlay);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "disableColorOverlay" in changes) {
    applyDisableColorOverlay(!!changes.disableColorOverlay.newValue);
  }
});

chrome.storage.sync.get(["disableColorOverlay"], (data) => {
  applyDisableColorOverlay(!!data.disableColorOverlay);
});

function applyHideRecentFeedback(enabled) {
  document.querySelectorAll(".events_list.recent_feedback").forEach((el) => {
    el.style.display = enabled ? "none" : "";
  });
}

chrome.storage.sync.get(["hideRecentFeedback"], (data) => {
  applyHideRecentFeedback(!!data.hideRecentFeedback);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "hideRecentFeedback" in changes) {
    applyHideRecentFeedback(!!changes.hideRecentFeedback.newValue);
  }
});

chrome.storage.sync.get(["hideRecentFeedback"], (data) => {
  applyHideRecentFeedback(!!data.hideRecentFeedback);
});

function injectDashboardNotes() {
  chrome.storage.sync.get(
    ["dashboardNotesEnabled", "dashboardNotes"],
    (data) => {
      const enabled = !!data.dashboardNotesEnabled;
      const container = document.getElementById("DashboardCard_Container");
      if (!container) return;

      const existing = container.querySelector("#canvaspro-dashboard-notes");

      if (existing && !enabled) {
        existing.remove();
        return;
      }

      if (enabled && !existing) {
        const notesDiv = document.createElement("div");
        notesDiv.id = "canvaspro-dashboard-notes";
        notesDiv.style.margin = "16px 0";
        notesDiv.innerHTML = `
        <label style="font-weight:600; color:#6366f1; margin-bottom:4px; display:block;">Dashboard Notes</label>
        <textarea id="canvaspro-notes-textarea" rows="5" style="width:100%; border-radius:8px; border:1.5px solid #e0e7ff; padding:10px; font-size:1rem; resize:vertical; background:#f5f7ff;"></textarea>
      `;
        container.prepend(notesDiv);

        document.getElementById("canvaspro-notes-textarea").value =
          data.dashboardNotes || "";

        document
          .getElementById("canvaspro-notes-textarea")
          .addEventListener("input", (e) => {
            chrome.storage.sync.set({ dashboardNotes: e.target.value });
          });
      }
    }
  );
}

injectDashboardNotes();
const notesObserver = new MutationObserver(injectDashboardNotes);
notesObserver.observe(document.body, { childList: true, subtree: true });

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "dashboardNotesEnabled" in changes) {
    injectDashboardNotes();
  }
});

function applyHideFooter(enabled) {
  document.querySelectorAll(".ic-app-footer").forEach((el) => {
    el.style.display = enabled ? "none" : "";
  });
}

chrome.storage.sync.get(["hideFooter"], (data) => {
  applyHideFooter(!!data.hideFooter);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "hideFooter" in changes) {
    applyHideFooter(!!changes.hideFooter.newValue);
  }
});

chrome.storage.sync.get(["hideFooter"], (data) => {
  applyHideFooter(!!data.hideFooter);
});

function applyBetterSidebar(enabled) {
  const sidebar = document.querySelector(".ic-app-header");
  if (!sidebar) return;

  if (enabled) {
    sidebar.classList.add("canvaspro-better-sidebar");
  } else {
    sidebar.classList.remove("canvaspro-better-sidebar");
  }
}

chrome.storage.sync.get(["betterSidebar"], (data) => {
  applyBetterSidebar(!!data.betterSidebar);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "betterSidebar" in changes) {
    applyBetterSidebar(!!changes.betterSidebar.newValue);
  }
});

function applyDarkMode(enabled) {
  let darkStyle = document.getElementById("canvaspro-darkmode-style");
  if (enabled) {
    if (!darkStyle) {
      darkStyle = document.createElement("style");
      darkStyle.id = "canvaspro-darkmode-style";
      darkStyle.textContent = `
        body, .Button, .ic-app-header, .ic-DashboardCard, .ic-Layout-wrapper, .ic-app-footer, .navigation-tray-container, .ic-DashboardCard__header_content, .css-101cswf-view-flexItem {
          background:rgb(34, 34, 34) !important;
         
        }
        .ic-DashboardCard, .ic-Layout-wrapper, .ic-app-header, .ic-app-footer, .tray-with-space-for-global-nav {
          border-color: #23272f !important;
        }
        a, .ic-app-header__menu-list-link, .ic-DashboardCard__header_title, .css-itfdza-text, .css-1ctvu2o-text, .css-h7tmoq-text, .css-o7uq3r-view-heading, .css-o7uq3r-view-heading, .css-o7uq3r-view-heading {
          color: #a5b4fc !important;
        }
         
        .ic-Dashboard-header, .ic-Dashboard-header__layout{
            background:rgb(34, 34, 34) !important;
            color: white !important;
        }
            #canvaspro-notes-textarea{
            background:rgb(60, 51, 90) !important;
    }

          .Sidebar__TodoListContainer :not([class]),  .css-yl8ee1-view--inlineBlock-inlineListItem, .css-8bodfv-text {
        color: #fff !important;
      }
            
 
      `;
      document.head.appendChild(darkStyle);
    }
  } else {
    if (darkStyle) darkStyle.remove();
  }
}

chrome.storage.sync.get(["darkMode"], (data) => {
  applyDarkMode(!!data.darkMode);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "darkMode" in changes) {
    applyDarkMode(!!changes.darkMode.newValue);
  }
});
