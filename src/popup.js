// Page navigation
const mainPage = document.getElementById("mainPage");
const fontPage = document.getElementById("fontPage");
const fontSettingsBtn = document.getElementById("fontSettingsBtn");
const backBtn = document.getElementById("backBtn");

// Font page navigation
fontSettingsBtn.addEventListener("click", () => {
  mainPage.classList.add("hidden");
  fontPage.classList.remove("hidden");
});
backBtn.addEventListener("click", () => {
  fontPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
});

// ...existing code...

const roundedCardsToggle = document.getElementById("toggleRounderCards");

// Restore toggle state on popup open
chrome.storage.sync.get(["roundedCards"], (data) => {
  roundedCardsToggle.checked = !!data.roundedCards;
});

roundedCardsToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ roundedCards: roundedCardsToggle.checked });
});

//

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
