import { jsx } from "react/jsx-runtime";

function applyRoundedCards(rounded) {
  document.querySelectorAll(".ic-DashboardCard").forEach((card) => {
    card.style.borderRadius = rounded ? "24px" : "";
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
