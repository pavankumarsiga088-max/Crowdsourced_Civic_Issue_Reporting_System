// js/report.js (Modern 3-step report flow)

let reportStep = 1;
let uploadedImage = null;

function loadReport(container) {
  container.innerHTML = `
    <div class="report-page">

      <!-- Top Back Header -->
      <div class="report-topbar">
        <button class="back-btn" onclick="showPage('home')">←</button>
        <h2>Report Issue</h2>
      </div>

      <!-- Progress -->
      <div class="progress-area">
        <div class="progress-text">
          <span id="stepTitle">Step 1 of 3</span>
          <span id="stepPercent">33%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" id="progressFill" style="width:33%"></div>
        </div>
      </div>

      <!-- STEP 1 -->
      <div id="step1" class="report-step active">
        <div class="step-center">
          <div class="circle-icon">
            📷
          </div>
          <h3>Take a Photo</h3>
          <p>Capture or upload an image of the issue to help authorities understand the problem better.</p>

          <input type="file" id="photoInput" accept="image/*" style="display:none;" />

          <button class="main-btn" id="takePhotoBtn">
            📸 Take Photo
          </button>
        </div>
      </div>

      <!-- STEP 2 -->
      <div id="step2" class="report-step">
        <h3 class="sub-title">Confirm Location</h3>

        <div class="preview-wrap">
          <img id="previewImage" src="" alt="Preview" />
        </div>

        <div class="location-box">
          <div class="loc-icon">📍</div>
          <div>
            <h4>Current Location</h4>
            <p>Main Street, Downtown Area</p>
          </div>
        </div>

        <button class="main-btn" id="continueBtn">Continue</button>
      </div>

      <!-- STEP 3 -->
      <div id="step3" class="report-step">
        <h3 class="sub-title">Issue Details</h3>

        <label>Issue Title</label>
        <input id="issueTitle" placeholder="Brief title for the issue" />

        <label>Category</label>
        <select id="issueCategory">
          <option value="">Select issue category</option>
          <option value="Pothole">Pothole</option>
          <option value="Garbage">Garbage</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Water Leak">Water Leak</option>
        </select>

        <label>Urgency Level</label>
        <select id="issueUrgency">
          <option value="">Select urgency level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Description (Optional)</label>
        <textarea id="issueDesc" placeholder="Briefly describe the issue..."></textarea>

        <button class="main-btn" id="submitBtn">Submit Report</button>
      </div>

      <!-- STEP 4 SUCCESS -->
      <div id="step4" class="report-step">
        <div class="success-card">
          ✅ <h2>Report Submitted!</h2>
          <p><b>Complaint ID:</b> <span id="complaintId"></span></p>
          <p><b>Received by:</b> <span id="deptName"></span></p>
          <p class="muted">Returning to home...</p>
        </div>
      </div>

    </div>
  `;

  setupReportEvents();
}

function setupReportEvents() {
  const photoInput = document.getElementById("photoInput");
  const takePhotoBtn = document.getElementById("takePhotoBtn");
  const continueBtn = document.getElementById("continueBtn");
  const submitBtn = document.getElementById("submitBtn");

  // Step 1: Click Take Photo → file upload
  takePhotoBtn.addEventListener("click", () => {
    photoInput.click();
  });

  // after selecting image → go Step 2
  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage = reader.result;
      document.getElementById("previewImage").src = uploadedImage;
      goStep(2);
    };
    reader.readAsDataURL(file);
  });

  // Step 2: Continue → Step 3
  continueBtn.addEventListener("click", () => {
    goStep(3);
  });

  // Step 3: Submit report
  submitBtn.addEventListener("click", () => {
    const title = document.getElementById("issueTitle").value.trim();
    const category = document.getElementById("issueCategory").value;
    const urgency = document.getElementById("issueUrgency").value;

    if (!title || !category || !urgency) {
      alert("Please fill all required fields!");
      return;
    }

    // simulate submission
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    setTimeout(() => {
      const complaintId = "DR" + Date.now().toString().slice(-6);

      document.getElementById("complaintId").innerText = complaintId;
      document.getElementById("deptName").innerText = departmentByCategory(category);

      goStep(4);

      setTimeout(() => {
        showPage("home"); // return to home
      }, 2500);
    }, 1500);
  });
}

function departmentByCategory(category) {
  const departments = {
    "Pothole": "Public Works Department",
    "Garbage": "Municipal Waste",
    "Streetlight": "Electricity Board",
    "Water Leak": "Water Department"
  };

  return departments[category] || "Concerned Department";
}

function goStep(step) {
  reportStep = step;

  // Hide all
  ["step1", "step2", "step3", "step4"].forEach((id) =>
    document.getElementById(id).classList.remove("active")
  );

  // Show new step
  document.getElementById("step" + step).classList.add("active");

  // Update progress
  const stepTitle = document.getElementById("stepTitle");
  const stepPercent = document.getElementById("stepPercent");
  const fill = document.getElementById("progressFill");

  if (step <= 3) {
    const percent = step === 1 ? 33 : step === 2 ? 67 : 100;
    stepTitle.innerText = `Step ${step} of 3`;
    stepPercent.innerText = percent + "%";
    fill.style.width = percent + "%";
  }
}
