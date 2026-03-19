// citizen.js - only citizen page init (NO routing here)

document.addEventListener("DOMContentLoaded", () => {
  protectPage("citizen"); // from auth.js

  // show welcome user
  const savedUser = JSON.parse(localStorage.getItem("userInfo") || "null");
  const welcomeUser = document.getElementById("welcomeUser");

  if (savedUser && welcomeUser) {
    welcomeUser.textContent = `Welcome ${savedUser.id}`;
  }

  // ✅ default open home page using auth.js routing
  showPage("home");
});
