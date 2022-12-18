(async () => {
  await chrome.runtime.sendMessage('set_cookie');
})();
