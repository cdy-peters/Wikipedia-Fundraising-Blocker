chrome.storage.local.get("hideFundraiser", (res) => {
  document.getElementById("hide-fundraiser").checked = res.hideFundraiser;
});

document.getElementById("hide-fundraiser").addEventListener("click", (e) => {
  chrome.storage.local.set({ hideFundraiser: e.target.checked });
});
