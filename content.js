function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }
  
  function getElementsData() {
    const xpathExpressionValues = "//span[@class='value audio-queue-stats-trunks']";
    const xpathExpressionNames = "//span[@class='value audio-queue-stats-routes']";
  
    const xpathResultValues = document.evaluate(xpathExpressionValues, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const xpathResultNames = document.evaluate(xpathExpressionNames, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
    const elementsData = [];
  
    for (let i = 0; i < xpathResultValues.snapshotLength; i++) {
      const elementValue = xpathResultValues.snapshotItem(i);
      const elementName = xpathResultNames.snapshotItem(i);
  
      if (isElementVisible(elementValue) && isElementVisible(elementName)) {
        const numbers = elementValue.innerText.split('/')[0].trim();
        const name = elementName.innerText.trim();
  
        if (!isNaN(numbers) && (name === 'TIM 2' || name === 'SONATELECOM')) {
          elementsData.push({ value: parseInt(numbers), name });
        }
      }
    }
  
    return elementsData;
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "calculateSum") {
      const elementsData = getElementsData();
      chrome.runtime.sendMessage({ action: "displayData", data: elementsData });
    }
  });
  