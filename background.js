const setCookies = async () => {
  const created = Math.floor(Date.now() / 1000);

  const cookie = {
    url: "https://en.wikipedia.org",
    name: "centralnotice_hide_fundraising",
    value: `{"v":1,"created":${created},"reason":"donate close"}`,
    domain: ".wikipedia.org",
    path: "/",
    secure: false,
    httpOnly: false,
    expirationDate: created + 31536000,
  };

  await chrome.cookies.set(cookie);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "set_cookie") setCookies();
});
