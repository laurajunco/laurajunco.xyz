const form = document.getElementById("subscribe-form");
const message = document.getElementById("subscribe-message");
const submitButton = form?.querySelector('button[type="submit"]');

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const scriptUrl = form.dataset.scriptUrl;
  const email = form.email.value.trim();
  const honeypot = form.website?.value;

  if (honeypot) {
    form.reset();
    return;
  }

  if (!scriptUrl) {
    message.textContent = "Subscription is not configured yet.";
    return;
  }

  submitButton.disabled = true;
  message.textContent = "";

  try {
    // Google Apps Script does not return CORS headers, so the browser cannot
    // read the response. no-cors still delivers the POST; we confirm optimistically.
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ email }),
    });

    message.textContent = "Thanks for subscribing!";
    form.reset();
  } catch {
    message.textContent = "Something went wrong. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
