document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("selectedIssue") || "null");
  const box = document.getElementById("detailsBox");

  if (!data) {
    box.innerHTML = "<p>No issue selected.</p>";
    return;
  }

  box.innerHTML = `
    <div class="details-card">
      <h3>${data.title}</h3>

      <img src="${data.image}" class="details-img" />

      <p><b>Location:</b> ${data.location}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      <p><b>Department:</b> ${data.department}</p>
      <p><b>Status:</b> ${data.status}</p>

      <button class="like-btn" onclick="likeIssue()">👍 Like <span id="likeCount">0</span></button>
    </div>
  `;
});

let likes = 0;
function likeIssue() {
  likes++;
  document.getElementById("likeCount").textContent = likes;
}
