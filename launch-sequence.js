// First, register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there

    const logs = await fetch(`api/logs`);
    const logsData = await logs.json();
    console.log(logsData);

    const findLog = logsData.find((log) => log.activity === "CHANGE LAUNCH CODES");
    const badGuy = findLog.who;
    console.log("The bad guy is:", badGuy);

    let id = 8

    const personnelID = await fetch(`/api/personnel/${id}`)
    const personnelIdData = await personnelID.json();
    console.log(personnelIdData);

    const messageResponse = await fetch(`/api/messages?to=${badGuy}`);
    const messages = await messageResponse.json();
    console.log("MESSAGE " + messages);

    const hint = await fetch (`api/hint`)
    const hintData = await hint.json()
    console.log(hintData)
   
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });