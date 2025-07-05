const mainPage = document.getElementById("mainPage");
const fontPage = document.getElementById("fontPage");
const fontSettingsBtn = document.getElementById("fontSettingsBtn");
const backBtn = document.getElementById("backBtn");

fontSettingsBtn.addEventListener("click", () => {
  mainPage.classList.add("hidden");
  fontPage.classList.remove("hidden");
});
backBtn.addEventListener("click", () => {
  fontPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
});

const fontRadios = document.querySelectorAll('input[name="font"]');

chrome.storage.sync.get(["selectedFont"], (data) => {
  if (data.selectedFont) {
    fontRadios.forEach((radio) => {
      if (radio.dataset.font === data.selectedFont) {
        radio.checked = true;
      }
    });
  }
});

fontRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      chrome.storage.sync.set({ selectedFont: radio.dataset.font });
    }
  });
});

const roundedCardsToggle = document.getElementById("toggleRounderCards");

chrome.storage.sync.get(["roundedCards"], (data) => {
  roundedCardsToggle.checked = !!data.roundedCards;
});

roundedCardsToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ roundedCards: roundedCardsToggle.checked });
});

const gradientCardsToggle = document.getElementById("toggleGradientCards");

chrome.storage.sync.get(["gradientCards"], (data) => {
  gradientCardsToggle.checked = !!data.gradientCards;
});

gradientCardsToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ gradientCards: gradientCardsToggle.checked });
});

const hideAnnouncementsToggle = document.getElementById(
  "toggleHideAnnouncements"
);

chrome.storage.sync.get(["hideAnnouncements"], (data) => {
  hideAnnouncementsToggle.checked = !!data.hideAnnouncements;
});

hideAnnouncementsToggle.addEventListener("change", () => {
  chrome.storage.sync.set({
    hideAnnouncements: hideAnnouncementsToggle.checked,
  });
});

const removeSidebarLogoToggle = document.getElementById(
  "toggleRemoveSidebarLogo"
);

chrome.storage.sync.get(["removeSidebarLogo"], (data) => {
  removeSidebarLogoToggle.checked = !!data.removeSidebarLogo;
});

removeSidebarLogoToggle.addEventListener("change", () => {
  chrome.storage.sync.set({
    removeSidebarLogo: removeSidebarLogoToggle.checked,
  });
});

const disableColorOverlayToggle = document.getElementById(
  "toggleDisableColorOverlay"
);

chrome.storage.sync.get(["disableColorOverlay"], (data) => {
  disableColorOverlayToggle.checked = !!data.disableColorOverlay;
});

disableColorOverlayToggle.addEventListener("change", () => {
  chrome.storage.sync.set({
    disableColorOverlay: disableColorOverlayToggle.checked,
  });
});

const hideRecentFeedbackToggle = document.getElementById(
  "toggleHideRecentFeedback"
);

chrome.storage.sync.get(["hideRecentFeedback"], (data) => {
  hideRecentFeedbackToggle.checked = !!data.hideRecentFeedback;
});

hideRecentFeedbackToggle.addEventListener("change", () => {
  chrome.storage.sync.set({
    hideRecentFeedback: hideRecentFeedbackToggle.checked,
  });
});
