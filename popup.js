const handleFormSubmit = async (event) => {
  event.preventDefault();

  clearMessage();

  var message = await setCookies();
  setMessage(message);
};

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

  try {
    await chrome.cookies.set(cookie);
    return "Fundraising blocked for 1 year";
  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }
};

const setMessage = (str) => {
  message.textContent = str;
  message.hidden = false;
};

const clearMessage = () => {
  message.hidden = true;
  message.textContent = "";
};

const form = document.getElementById("control-row");
form.addEventListener("submit", handleFormSubmit);