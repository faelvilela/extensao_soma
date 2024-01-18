chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "elementsFound") {
      const values = request.data;
      const sum = values.reduce((acc, curr) => acc + curr, 0);
      chrome.runtime.sendMessage({ action: "sumCalculated", data: sum });
    }
  });
  