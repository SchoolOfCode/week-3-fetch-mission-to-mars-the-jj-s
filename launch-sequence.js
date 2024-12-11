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


    const personnelID = await fetch(`/api/personnel/${logsData[5].who}`)
    const personnelIdData = await personnelID.json();
    console.log(personnelIdData);

    const messageResponse = await fetch(`/api/messages?to=${badGuy}`);
    const messages = await messageResponse.json();
    console.log("MESSAGE ", messages);

    const findMessages = messages.find((message) => message.subject.includes( "LAUNCH CODES"))

    console.log(findMessages.message)

    const dogResponse = await fetch('/api/personnel/11')

    const dogData = await dogResponse.json()

    console.log(dogData)


    const hint = await fetch (`api/hint`)
    const hintData = await hint.json()
    console.log(hintData)

    const submitReq = await fetch('/api/codes', {
      method: "POST", 
      body: JSON.stringify({
        enter: dogData.name.toUpperCase(),
      })
    })
   
    const submitData = await submitReq.json()
    console.log(submitData)
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