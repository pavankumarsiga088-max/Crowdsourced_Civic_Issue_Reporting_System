// complaints.js

const mockReports = [
  {
    id: "CC2024-001",
    title: "Overflowing garbage bins at Park Ave",
    category: "waste",
    status: "inprogress",
    location: "Park Avenue, Zone 7",
    submittedDate: "1/20/2024",
    image: "assets/new-garbage.jpeg",
    description: "Multiple waste bins overflowing near the park, attracting pests and causing odor issues.",
    updates: [
      { date: "1/20/2024", status: "Report Received", message: "Your complaint has been logged and forwarded to Sanitation Department." },
      { date: "1/20/2024", status: "In Progress", message: "Collection team scheduled for today afternoon." }
    ]
  },
  {
    id: "CC2024-002",
    title: "Large pothole on Main Street",
    category: "pothole",
    status: "approved",
    location: "Main Street, Downtown",
    submittedDate: "1/25/2024",
    image: "assets/new-potholes.jpeg",
    description: "Deep pothole causing traffic issues and potential vehicle damage. Located near the city center intersection.",
    updates: [
      { date: "1/25/2024", status: "Report Received", message: "Pothole repair request logged with Public Works." },
      { date: "1/25/2024", status: "Approved", message: "Repair crew assigned, materials ordered for next week." }
    ]
  },
  {
    id: "CC2024-003",
    title: "Water pipe leak on Maple Street",
    category: "water",
    status: "inprogress",
    location: "Maple Street, Sector 12",
    submittedDate: "1/28/2024",
    image: "assets/new-sewage-water.jpeg",
    description: "Water main leak causing flooding on residential street. Emergency repair in progress.",
    updates: [
      { date: "1/28/2024", status: "Report Received", message: "Water leak report received by Water Department." },
      { date: "1/28/2024", status: "In Progress", message: "Emergency crew dispatched to site." }
    ]
  },
   {
    id: "CC2024-004",
    title: "Large pothole on Lizze Street",
    category: "pothole",
    status: "approved",
    location: "Lizze Street, Sector 9",
    submittedDate: "8/17/2024",
    image: "assets/newest-potholes.jpg",
    description: "Deep pothole causing traffic issues and potential vehicle damage. Located near the city center intersection.",
    updates: [
      { date: "8/17/2024", status: "Report Received", message: "Pothole repair request logged with Public Works." },
      { date: "8/17/2024", status: "approved", message: "Emergency crew dispatched to site." }
    ]
  },
  

  // COMPLETED
  {
    id: "CC2024-005",
    title: "Broken streetlight repaired",
    category: "streetlight",
    status: "completed",
    location: "5th Avenue & Oak Street",
    submittedDate: "1/10/2024",
    resolvedDate: "1/11/2024",
    beforeImage: "assets/streetlight.jpeg",
    afterImage: "assets/streetlight.jpeg",
    description: "Streetlight successfully repaired and tested. Area now properly illuminated.",
    updates: [
      { date: "1/10/2024", status: "Report Received", message: "Streetlight repair request received." },
      { date: "1/11/2024", status: "In Progress", message: "Electrical team on site." },
      { date: "1/11/2024", status: "Completed", message: "Streetlight repaired and functional." }
    ]
  }
];

function getStatusClass(status) {
  if (status === "reported") return "status-reported";
  if (status === "approved") return "status-approved";
  if (status === "inprogress") return "status-inprogress";
  if (status === "completed") return "status-completed";
  return "";
}

function getCategoryClass(category) {
  if (category === "waste") return "cat-waste";
  if (category === "pothole") return "cat-pothole";
  if (category === "water") return "cat-water";
  if (category === "streetlight") return "cat-streetlight";
  if (category === "pollution") return "cat-pollution";
  return "";
}

function loadComplaints(container) {
  let selectedTab = "active";

  function renderList() {
    const active = mockReports.filter(r => r.status !== "completed");
    const completed = mockReports.filter(r => r.status === "completed");
    const list = selectedTab === "active" ? active : completed;

    container.innerHTML = `
      <div class="complaints-wrap">

        <div class="complaints-header">
          <h2>My Complaints</h2>
          <p>Track all your civic issue reports</p>
        </div>

        <div class="complaints-tabs">
          <button id="tabActive" class="${selectedTab === "active" ? "active" : ""}">
            Active (${active.length})
          </button>
          <button id="tabCompleted" class="${selectedTab === "completed" ? "active" : ""}">
            Completed (${completed.length})
          </button>
        </div>

        <div class="complaints-list">
          ${list.map(report => `
            <div class="complaint-item" data-id="${report.id}">
              <img class="complaint-img" src="${report.beforeImage || report.image}" alt="${report.title}">
              <div class="complaint-body">
                <h4>${report.title}</h4>

                <div class="complaint-location">
                  📍 <span>${report.location}</span>
                </div>

                <div class="badge-row">
                  <span class="badge ${getStatusClass(report.status)}">${report.status.toUpperCase()}</span>
                  <span class="badge ${getCategoryClass(report.category)}">${report.category.toUpperCase()}</span>
                </div>

                <div class="complaint-id">ID: ${report.id} • ${report.submittedDate}</div>
              </div>
            </div>
          `).join("")}
        </div>

      </div>
    `;

    document.getElementById("tabActive").onclick = () => { selectedTab = "active"; renderList(); };
    document.getElementById("tabCompleted").onclick = () => { selectedTab = "completed"; renderList(); };

    document.querySelectorAll(".complaint-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        const report = mockReports.find(r => r.id === id);
        if (report) renderDetails(report);
      });
    });
  }

  function renderDetails(report) {
    container.innerHTML = `
      <div class="complaints-wrap">

        <div class="details-header">
          <button class="back-btn" id="backBtn">⬅</button>
          <h3 style="margin:0;">Complaint Details</h3>
        </div>

        <div class="details-container">

          <div class="details-card">
            <div class="details-top">
              <img class="details-img" src="${report.beforeImage || report.image}" alt="${report.title}">
              <div>
                <h3 style="margin:0 0 8px;">${report.title}</h3>
                <div style="font-size:13px;color:#666;">📍 ${report.location}</div>

                <div class="badge-row" style="margin-top:10px;">
                  <span class="badge ${getStatusClass(report.status)}">${report.status.toUpperCase()}</span>
                  <span class="badge ${getCategoryClass(report.category)}">${report.category.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <p class="details-desc">${report.description}</p>

            <div class="details-grid">
              <div>
                <div style="font-size:11px;color:#777;">Complaint ID</div>
                <div style="font-family:monospace;">${report.id}</div>
              </div>
              <div>
                <div style="font-size:11px;color:#777;">Submitted</div>
                <div>${report.submittedDate}</div>
              </div>
            </div>
          </div>

          <div class="timeline">
            <h3>Status Timeline</h3>

            ${report.updates.map((u, idx) => `
              <div class="timeline-item">
                <div class="timeline-dot ${idx === report.updates.length - 1 ? "dot-green" : "dot-blue"}"></div>
                <div class="timeline-box">
                  <div class="timeline-top">
                    <span>${u.status}</span>
                    <span style="font-size:11px;color:#777;">${u.date}</span>
                  </div>
                  <p class="timeline-msg">${u.message}</p>
                </div>
              </div>
            `).join("")}
          </div>

        </div>
      </div>
    `;

    document.getElementById("backBtn").onclick = () => renderList();
  }

  renderList();
}
