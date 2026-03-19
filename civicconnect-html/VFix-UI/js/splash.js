window.addEventListener("load", () => {
  setTimeout(() => {
    // Check login status
    const savedUser = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (savedUser && savedUser.role) {
      // already logged in
      if (savedUser.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "citizen.html";
      }
    } else {
      // not logged in
      window.location.href = "login.html";
    }
  }, 2500); // 2.5 seconds splash delay
});
