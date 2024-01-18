document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "calculateSum" });
      });
    });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "displayData") {
      const elementsData = request.data;
      const sumTim = elementsData.reduce((sum, element) => element.name === 'TIM 2' ? sum + element.value : sum, 0);
      const sumSonavoip = elementsData.reduce((sum, element) => element.name === 'SONATELECOM' ? sum + element.value : sum, 0);
  
      document.getElementById('sum').innerText = `TIM 2: ${sumTim} \nSONATELECOM: ${sumSonavoip}`;
    }
  });
  