// profile.js

const achievements = [
  { id: "first-reporter", name: "First Reporter", description: "Submitted your first civic issue", icon: "🎯", earned: true },
  { id: "verified-reporter", name: "Verified Reporter", description: "5 reports verified by authorities", icon: "✅", earned: true },
  { id: "community-hero", name: "Community Hero", description: "10+ civic reports submitted", icon: "👷", earned: true },
  { id: "rapid-responder", name: "Rapid Responder", description: "Report within 1 hour of issue", icon: "⚡", earned: true },
  { id: "civic-advocate", name: "Civic Advocate", description: "Help 50+ community members", icon: "🛡️", earned: false, progress: 23, target: 50 },
  { id: "city-champion", name: "City Champion", description: "100+ verified reports", icon: "🏅", earned: false, progress: 47, target: 100 }
];

const menuItems = [
  { label: "Notifications", type: "switch", enabled: true },
  { label: "Location Services", type: "switch", enabled: true },
  { label: "Change Language", type: "link" },
  { label: "App Settings", type: "link" },
  { label: "Help & Support", type: "link" }
];

function copyCitizenId() {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  if (!user) return;

  navigator.clipboard.writeText(user.id);
  alert("Citizen ID copied: " + user.id);
}

function renderAchievements() {
  return achievements.map(a => {
    if (a.earned) {
      return `
        <div class="ach-card earned">
          <div class="ach-icon">${a.icon}</div>
          <h4>${a.name}</h4>
          <p>${a.description}</p>
          <span class="badge earned-badge">Earned</span>
        </div>
      `;
    } else {
      const percent = Math.round((a.progress / a.target) * 100);
      return `
        <div class="ach-card locked">
          <div class="ach-icon">${a.icon}</div>
          <h4>${a.name}</h4>
          <p>${a.description}</p>

          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${percent}%"></div>
            </div>
            <small>${a.progress}/${a.target}</small>
          </div>
        </div>
      `;
    }
  }).join("");
}

function renderSettings() {
  return menuItems.map(item => {
    if (item.type === "switch") {
      return `
        <div class="settings-row">
          <span>${item.label}</span>
          <label class="switch">
            <input type="checkbox" ${item.enabled ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      `;
    }

    return `
      <div class="settings-row link-row">
        <span>${item.label}</span>
        <span class="arrow">›</span>
      </div>
    `;
  }).join("");
}

function loadProfile(container) {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  if (!user) {
    container.innerHTML = "<p>Please login first.</p>";
    return;
  }

  container.innerHTML = `
    <div class="profile-wrap">

      <div class="profile-header">
        <div class="avatar">👤</div>
        <div class="profile-info">
          <h2>${user.name || "Citizen User"}</h2>

          <div class="id-row">
            <span class="mono"># ${user.id}</span>
            <button class="copy-btn" onclick="copyCitizenId()">📋</button>
          </div>

          ${user.phone ? `<p class="phone">${user.phone}</p>` : ""}
          <p class="level">🏆 Level 2 Citizen</p>
        </div>
      </div>

      <div class="card id-card">
        <div>
          <h3>Citizen ID</h3>
          <div class="id-big">
            <span class="mono">${user.id}</span>
            <button class="copy-btn big" onclick="copyCitizenId()">📋</button>
          </div>
          <p class="muted">Use this ID for official correspondence</p>
        </div>
        <div class="hash-box">#</div>
      </div>

      <div class="card">
        <h3>My Impact</h3>

        <div class="grid2">
          <div class="stat">
            <div class="stat-num green">5</div>
            <div class="stat-label">Reports Submitted</div>
          </div>

          <div class="stat">
            <div class="stat-num blue">1</div>
            <div class="stat-label">Reports Resolved</div>
          </div>

          <div class="stat">
            <div class="stat-num purple">#5</div>
            <div class="stat-label">Community Rank</div>
          </div>

          <div class="stat">
            <div class="stat-num orange">1250</div>
            <div class="stat-label">Total Points</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="row-between">
          <h3>Achievements</h3>
          <span class="badge green-badge">🏅 4 Earned</span>
        </div>

        <div class="ach-grid">
          ${renderAchievements()}
        </div>
      </div>

      <div class="card">
        <div class="row-between">
          <h3>Community Leaderboard</h3>
          <button class="mini-btn">👥 View All</button>
        </div>

        <div class="leaderboard">
          <div class="lb-row"><span>🥇 Sarah Chen</span><span>1580 points</span></div>
          <div class="lb-row"><span>🥈 Mike Johnson</span><span>1420 points</span></div>
          <div class="lb-row"><span>🥉 Anna Smith</span><span>1380 points</span></div>
          <div class="lb-row"><span>4 David Park</span><span>1290 points</span></div>
          <div class="lb-row you"><span>5 You</span><span>1250 points</span></div>
        </div>
      </div>

      <div class="card">
        <h3>Settings</h3>
        <div class="settings-list">
          ${renderSettings()}
        </div>
      </div>

      <button class="logout-btn" onclick="setupLogoutButton()">Logout</button>
    </div>
  `;
}