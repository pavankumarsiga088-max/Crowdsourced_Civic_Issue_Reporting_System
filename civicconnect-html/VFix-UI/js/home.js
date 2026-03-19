// js/home.js

const mockIssues = [
  {
    id: "1",
    title: "Large Pothole on Main St",
    location: "Main Street, Downtown",
    status: "In Progress",
    distance: "0.3 km away",
    timeAgo: "2 hours ago",
    reportCount: 12,
    priority: "High",
    image: "assets/potholes.jpeg",
    department: "Public Works Department",
    date: "18 Jan 2026",
    time: "10:30 AM",
  },
  {
    id: "2",
    title: "Overflowing Garbage Bins",
    location: "Park Avenue, Zone 7",
    status: "Reported",
    distance: "1.2 km away",
    timeAgo: "5 hours ago",
    reportCount: 8,
    priority: "Medium",
    image: "assets/garbage.jpeg",
    department: "Municipal Waste",
    date: "18 Jan 2026",
    time: "09:10 AM",
  },
  {
    id: "3",
    title: "Broken Streetlight",
    location: "5th Avenue & Oak Street",
    status: "Resolved",
    distance: "2.8 km away",
    timeAgo: "2 days ago",
    reportCount: 5,
    priority: "Low",
    image: "assets/streetlight.jpeg",
    department: "Electricity Board",
    date: "17 Jan 2026",
    time: "06:45 PM",
  },
  {
    id: "4",
    title: "Water Pipe Leak",
    location: "Maple Street, Sector 12",
    status: "In Progress",
    distance: "0.8 km away",
    timeAgo: "1 hour ago",
    reportCount: 15,
    priority: "High",
    image: "assets/sewage-water.jpeg",
    department: "Water Department",
    date: "18 Jan 2026",
    time: "11:15 AM",
  }
];



function loadHomeDashboard(container) {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");

  container.innerHTML = `
    <!-- HEADER CARD -->
    <div class="card">
      <h2>Citizen Home</h2>

      <p class="muted">
        Logged in as: <b>${user?.id || "Citizen"}</b> (${user?.role || "citizen"})
      </p>

      <div class="success-box">
        ✅ You have access to citizen features.
      </div>
    </div>

    <!-- MAP CARD -->
    <div class="card mt">
      <h3>Recent Complaints Map</h3>

      <div class="map-box">
        <img src="assets/map.png" alt="Map" class="map-img"/>

        <!-- Pins -->
        <span class="pin pin-orange"></span>
        <span class="pin pin-blue"></span>
        <span class="pin pin-purple"></span>
        <span class="pin pin-green"></span>
      </div>

      <div class="legend">
        <span><b style="color:orange;">●</b> Pothole</span>
        <span><b style="color:blue;">●</b> Water</span>
        <span><b style="color:purple;">●</b> Pollution</span>
        <span><b style="color:green;">●</b> Resolved</span>
      </div>
    </div>

    <!-- LIST CARD -->
    <div class="card mt">
      <h3>Recent Complaints</h3>

      <div class="issue-list">
      ${mockIssues.map(i => `
  <div class="complaint-card" onclick="openComplaintDetails('${i.id}')">

    <div class="complaint-img">
      <img src="${i.image}" alt="${i.title}">
    </div>

    <div class="complaint-body">
      <div class="complaint-top">
        <h4>${i.title}</h4>

        <span class="status ${
          i.status === "Resolved"
            ? "badgeGreen"
            : i.status === "In Progress"
            ? "badgeBlue"
            : "badgeGray"
        }">
          ${i.status}
        </span>
      </div>

      <p class="meta">📍 ${i.location}</p>
      <p class="time">${i.timeAgo}</p>

      <div class="complaint-bottom">
        <span class="reports">👥 ${i.reportCount} reports</span>

        <span class="priority ${
          i.priority === "High"
            ? "prioRed"
            : i.priority === "Medium"
            ? "prioYellow"
            : "prioGreen"
        }">
          ${i.priority}
        </span>
      </div>
    </div>

    <div class="complaint-right">
      <p class="distance">${i.distance}</p>
    </div>

  </div>
`).join("")}


      </div>
    </div>
  `;
}
function openComplaintDetails(id) {
  const selected = mockIssues.find(x => x.id === id);
  if (!selected) return;

  localStorage.setItem("selectedIssue", JSON.stringify(selected));

  // redirect to complaint details page
  window.location.href = "complaint-details.html";
}
