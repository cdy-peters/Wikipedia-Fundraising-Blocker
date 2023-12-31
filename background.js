const setCookie = async () => {
  const created = Math.floor(Date.now() / 1000);

  const cookie = {
    url: "https://en.wikipedia.org",
    name: "centralnotice_hide_fundraising",
    value: `{"v":1,"created":${created},"reason":"donate close"}`,
    domain: ".wikipedia.org",
    path: "/",
    secure: false,
    httpOnly: false,
    expirationDate: created + 604800,
  };

  await chrome.cookies.set(cookie);
};

const removeCookie = async () => {
  await chrome.cookies.remove({
    url: "https://en.wikipedia.org",
    name: "centralnotice_hide_fundraising",
  });
};

// Set hideFundraiser to true on first install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    chrome.storage.local.set({ hideFundraiser: true });
  }
});

// Set cookie on wikipedia page load
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "set_cookie") {
    chrome.storage.local.get("hideFundraiser", (res) => {
      if (res.hideFundraiser) setCookie();
    });
  }
});

// Update cookie on popup toggle
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local") {
    changes.hideFundraiser.newValue ? setCookie() : removeCookie();
  }
});
