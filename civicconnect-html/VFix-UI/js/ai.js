// ai.js (working AI assistant)

function loadAI(container) {
  container.innerHTML = `
    <div class="card ai-card">
      <h2>AI Assistant</h2>
      <p class="muted">Your civic engagement guide</p>

      <div class="quick-list">
        <button onclick="quickAI('Report Guidelines')">📋 Report Guidelines</button>
        <button onclick="quickAI('Nearby Issues')">📍 Nearby Issues</button>
        <button onclick="quickAI('Department Contacts')">📞 Department Contacts</button>
        <button onclick="quickAI('Community Initiatives')">🌟 Community Initiatives</button>
      </div>

      <div class="chatbox">
        <div id="chatMessages" class="chatMessages">
          <div class="chatmsg bot">
            Hello! I'm your CivicConnect AI Assistant. Ask me anything.
          </div>
        </div>

        <div class="chatinput">
          <input id="aiInput" placeholder="Ask something..." />
          <button onclick="sendAI()">Send</button>
        </div>
      </div>
    </div>
  `;
}

// quick button click
function quickAI(text) {
  document.getElementById("aiInput").value = text;
  sendAI();
}

// send message
function sendAI() {
  const input = document.getElementById("aiInput");
  const messagesDiv = document.getElementById("chatMessages");

  if (!input || !messagesDiv) return;

  const userText = input.value.trim();
  if (!userText) return;

  // show user message
  messagesDiv.innerHTML += `
    <div class="chatmsg user">${userText}</div>
  `;

  input.value = "";

  // fake AI reply (like in your earlier style)
  let reply = getAIReply(userText);

  setTimeout(() => {
    messagesDiv.innerHTML += `
      <div class="chatmsg bot">${reply}</div>
    `;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 600);
}

// reply logic (mock AI)
function getAIReply(question) {
  question = question.toLowerCase();

  if (question.includes("guidelines") || question.includes("report")) {
    return `
      ✅ <b>Reporting Guidelines:</b><br>
      • Take clear photo of the issue<br>
      • Mention correct location<br>
      • Choose category (waste/pothole/water etc)<br>
      • Give short description<br>
      • Submit report<br><br>
      ⚡ Tip: Reports with photos get resolved faster!
    `;
  }

  if (question.includes("nearby")) {
    return `
      📍 <b>Current Issues in Your Area:</b><br>
      • Large pothole - Main Street (0.3 km)<br>
      • Overflowing garbage bins - Park Avenue (1.2 km)<br>
      • Water leakage - Maple Street (0.8 km)<br><br>
      👥 Many citizens already reported these issues.
    `;
  }

  if (question.includes("department")) {
    return `
      📞 <b>Department Contacts:</b><br>
      • Pothole → Public Works Dept<br>
      • Waste → Sanitation Dept<br>
      • Water Leak → Water Supply Dept<br>
      • Streetlight → Electricity Board<br>
      • Pollution → Environmental Agency
    `;
  }

  if (question.includes("community")) {
    return `
      🌟 <b>Community Initiatives:</b><br>
      • Weekly Clean-up Drives<br>
      • Road Safety Awareness<br>
      • Tree Plantation Events<br>
      • Citizen Volunteer Program<br><br>
      ✅ You can participate from the Profile page too!
    `;
  }

  return `
    🤖 I understood your question: <b>${question}</b><br>
    Currently AI replies are demo-based.<br>
    Soon it will be connected to live civic database ✅
  `;
}
