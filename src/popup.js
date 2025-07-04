// Page navigation
const mainPage = document.getElementById("mainPage");
const fontPage = document.getElementById("fontPage");
const fontSettingsBtn = document.getElementById("fontSettingsBtn");
const backBtn = document.getElementById("backBtn");

// Toggle for logomark
const logomarkToggle = document.getElementById("logomarkToggle");

// Load saved settings
chrome.storage.sync.get(["hideLogomark", "fontChoice"], (data) => {
  logomarkToggle.checked = data.hideLogomark ?? false;
  if (data.fontChoice) {
    document
      .querySelector(`input[name="font"][value="${data.fontChoice}"]`)
      ?.setAttribute("checked", true);
  }
});

// Save toggle change
logomarkToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ hideLogomark: logomarkToggle.checked });
});

// Font page navigation
fontSettingsBtn.addEventListener("click", () => {
  mainPage.classList.add("hidden");
  fontPage.classList.remove("hidden");
});
backBtn.addEventListener("click", () => {
  fontPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
});

// Font selection
document.querySelectorAll('input[name="font"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    chrome.storage.sync.set({ fontChoice: radio.value });
  });
});
