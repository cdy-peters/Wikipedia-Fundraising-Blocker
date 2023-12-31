const hideFundraiserBtn = document.getElementById("hide-fundraiser");
let hideFundraiser = true;

const changeFundraiserBtnText = () => {
  if (hideFundraiser) {
    hideFundraiserBtn.textContent = "Show Fundraiser";
  } else {
    hideFundraiserBtn.textContent = "Hide Fundraiser";
  }
};

chrome.storage.local.get("hideFundraiser", (res) => {
  hideFundraiser = res.hideFundraiser;
  changeFundraiserBtnText();
});

hideFundraiserBtn.addEventListener("click", () => {
  chrome.storage.local.set({ hideFundraiser: !hideFundraiser });
  hideFundraiser = !hideFundraiser;
  changeFundraiserBtnText();
});
