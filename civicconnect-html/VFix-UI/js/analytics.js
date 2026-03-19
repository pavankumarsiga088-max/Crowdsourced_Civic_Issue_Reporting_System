function loadAnalytics(container) {
  container.innerHTML = `
    <section class="card">
      <div class="section-head">
        <h2>Analytics Dashboard</h2>
        <p class="muted">Track disaster response effectiveness</p>
      </div>

      <div class="grid-2">
        <div class="metric">
          <p>Total Reports</p>
          <h3>312</h3>
          <span class="green">+20% from last month</span>
        </div>
        <div class="metric">
          <p>Resolved</p>
          <h3>227</h3>
          <span class="blue">73% success rate</span>
        </div>
      </div>

      <div class="chart-card">
        <h3>Reports by Category</h3>
        <div class="chart-wrap"><canvas id="categoryPie"></canvas></div>
      </div>

      <div class="chart-card">
        <h3>Status Distribution</h3>
        <div class="chart-wrap"><canvas id="statusPie"></canvas></div>
      </div>

      <div class="chart-card">
        <h3>Monthly Report Trends</h3>
        <div class="chart-wrap"><canvas id="monthlyBar"></canvas></div>
      </div>

      <div class="chart-card">
        <h3>Category Performance</h3>
        <div class="chart-wrap"><canvas id="categoryLine"></canvas></div>
      </div>

      <div class="chart-card">
        <h3>Response Time Trends</h3>
        <div class="chart-wrap"><canvas id="responseLine"></canvas></div>
      </div>
    </section>
  `;

  // ✅ IMPORTANT: delay chart render to ensure canvas exists
  setTimeout(renderCharts, 100);
}

function renderCharts() {
  // PIE 1
  new Chart(document.getElementById("categoryPie"), {
    type: "pie",
    data: {
      labels: ["Flood", "Fire", "Earthquake", "Cyclone"],
      datasets: [
        { data: [35, 28, 32, 33], backgroundColor: ["#3b82f6","#ef4444","#f59e0b","#8b5cf6"], borderWidth: 0 }
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  // PIE 2
  new Chart(document.getElementById("statusPie"), {
    type: "pie",
    data: {
      labels: ["Resolved", "In Progress", "Approved", "Pending"],
      datasets: [
        { data: [45, 32, 28, 23], backgroundColor: ["#16a34a","#3b82f6","#f59e0b","#ef4444"], borderWidth: 0 }
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  // BAR
  new Chart(document.getElementById("monthlyBar"), {
    type: "bar",
    data: {
      labels: ["Oct", "Nov", "Dec", "Jan"],
      datasets: [
        { label: "Resolved", data: [15, 22, 18, 28], backgroundColor: "#16a34a", borderRadius: 8 },
        { label: "Pending", data: [8, 12, 6, 10], backgroundColor: "#3b82f6", borderRadius: 8 }
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, scales:{ y:{ beginAtZero:true } } },
  });

  // LINE 1
  new Chart(document.getElementById("categoryLine"), {
    type: "line",
    data: {
      labels: ["Oct", "Nov", "Dec", "Jan"],
      datasets: [
        { label: "Flood", data: [65,72,68,75], borderColor: "#3b82f6", tension:0.3 },
        { label: "Fire", data: [72,78,85,88], borderColor: "#ef4444", tension:0.3 },
        { label: "Earthquake", data: [58,65,70,78], borderColor: "#f59e0b", tension:0.3 },
        { label: "Cyclone", data: [68,75,72,82], borderColor: "#8b5cf6", tension:0.3 }
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  // LINE 2
  new Chart(document.getElementById("responseLine"), {
    type: "line",
    data: {
      labels: ["Oct", "Nov", "Dec", "Jan"],
      datasets: [
        { label: "Avg Response Time (hrs)", data: [4.2,3.8,3.5,3.1], borderColor: "#06b6d4", tension:0.3, pointRadius:6 }
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}
