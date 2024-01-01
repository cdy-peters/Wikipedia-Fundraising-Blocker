const hideFundraiserBtn = document.getElementById("hide-fundraiser");
const wikipediaLogo = document.getElementById("wikipedia-logo");
let hideFundraiser = true;

const changeWikipediaLogo = () => {
  wikipediaLogo.src = hideFundraiser
    ? "../images/blocking-enabled.png"
    : "../images/blocking-disabled.png";
};

const changeFundraiserBtnText = () => {
  hideFundraiserBtn.textContent = hideFundraiser
    ? "Show Fundraiser"
    : "Hide Fundraiser";
};

chrome.storage.local.get("hideFundraiser", (res) => {
  hideFundraiser = res.hideFundraiser;
  changeWikipediaLogo();
  changeFundraiserBtnText();
});

hideFundraiserBtn.addEventListener("click", () => {
  chrome.storage.local.set({ hideFundraiser: !hideFundraiser });
  hideFundraiser = !hideFundraiser;
  changeWikipediaLogo();
  changeFundraiserBtnText();
});
