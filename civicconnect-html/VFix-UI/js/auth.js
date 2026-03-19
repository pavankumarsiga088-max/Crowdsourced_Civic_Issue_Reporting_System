// auth.js - login + routing system (HTML/CSS/JS version)

function initLoginPage() {
  const loginBtn = document.getElementById("loginBtn");
  const userId = document.getElementById("userId");
  const userName = document.getElementById("userName");
  const userPhone = document.getElementById("userPhone");
  const loginError = document.getElementById("loginError");

  // if already logged in -> go citizen/admin
  const savedUser = JSON.parse(localStorage.getItem("userInfo") || "null");
  if (savedUser && savedUser.role) {
    if (savedUser.role === "admin") window.location.href = "admin.html";
    else window.location.href = "citizen.html";
    return;
  }

  if (!loginBtn) return;

  loginBtn.addEventListener("click", () => {
    const id = userId.value.trim();

    if (!id) {
      loginError.textContent = "User ID is required!";
      loginError.style.display = "block";
      return;
    }

    loginError.style.display = "none";

    const role = id.toUpperCase().startsWith("ADM-") ? "admin" : "citizen";

    const info = {
      id,
      name: userName.value.trim(),
      phone: userPhone.value.trim(),
      role,
    };

    localStorage.setItem("userInfo", JSON.stringify(info));

    if (role === "admin") window.location.href = "admin.html";
    else window.location.href = "citizen.html";
  });
}

// Protect citizen/admin pages
function protectPage(requiredRole) {
  const savedUser = JSON.parse(localStorage.getItem("userInfo") || "null");

  // Not logged in -> go login
  if (!savedUser) {
    window.location.href = "login.html";
    return;
  }

  // Role check
  if (requiredRole === "admin" && savedUser.role !== "admin") {
    window.location.href = "citizen.html";
    return;
  }

  if (requiredRole === "citizen" && savedUser.role !== "citizen") {
    window.location.href = "admin.html";
    return;
  }

  // ✅ show welcome info
  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    welcomeText.textContent = `Welcome ${savedUser.id}`;
  }

  // ✅ Logout button should ALWAYS work (all pages/tabs)
  setupLogoutButton();

  // ✅ Default page after login (citizen/admin)
  if (requiredRole === "citizen") {
    showPage("home"); // default open home page
  } else {
    showAdminHome(); // optional function if you have admin
  }
}

// ✅ makes logout work always
function setupLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    window.location.href = "login.html";
  };
}

/* ---------------------------------------------------
   ✅ MAIN ROUTING SYSTEM (Step 5)
--------------------------------------------------- */
function showPage(page) {
  const content = document.getElementById("pageContent");
  if (!content) return;

  setupLogoutButton();

  if (page === "home") {
  if (typeof loadHomeDashboard === "function") loadHomeDashboard(content);
  else content.innerHTML = "<p>Home dashboard missing</p>";
}


 else if (page === "ai") {
  if (typeof loadAI === "function") loadAI(content);
  else content.innerHTML = "<p>AI page missing</p>";
}

  else if (page === "report") {
    if (typeof loadReport === "function") loadReport(content);
    else content.innerHTML = "<p style='padding:20px;'>Report page missing</p>";
  }

  else if (page === "analytics") {
    if (typeof loadAnalytics === "function") loadAnalytics(content);
    else content.innerHTML = "<p style='padding:20px;'>Analytics page missing</p>";
  }

  else if (page === "profile") {
    if (typeof loadProfile === "function") loadProfile(content);
    else content.innerHTML = "<p style='padding:20px;'>Profile page missing</p>";
  }
  else if (page === "complaints") {
  if (typeof loadComplaints === "function") loadComplaints(content);
  else content.innerHTML = "<p style='padding:20px;'>Complaints page missing</p>";
}

}





/* ---------------------------------------------------
   ✅ HOME PAGE HTML
--------------------------------------------------- */

/* ---------------------------------------------------
   ✅ Admin Home placeholder (only if you need admin)
--------------------------------------------------- */
function showAdminHome() {
  const content = document.getElementById("pageContent");
  if (!content) return;

  content.innerHTML = `
    <div class="card">
      <h2>Admin Dashboard</h2>
      <p>Admin features will be added here...</p>
    </div>
  `;
}
