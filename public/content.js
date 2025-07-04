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

// Listen for changes to the setting and update cards live
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "roundedCards" in changes) {
    applyRoundedCards(!!changes.roundedCards.newValue);
  }
});