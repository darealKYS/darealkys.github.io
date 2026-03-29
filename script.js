/* =======================
   📅 CALENDAR
======================= */
let currentDate = new Date();

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const monthText = document.getElementById("monthText");

  if (!calendar || !monthText) return;

  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  monthText.innerText = months[month] + " " + year;

  const days = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= days; i++) {
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = i;

    div.onclick = function() {
      document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
      div.classList.add("active");
    };

    calendar.appendChild(div);
  }
}

function changeMonth(n) {
  currentDate.setMonth(currentDate.getMonth() + n);
  renderCalendar();
}


/* =======================
   💬 Q&A
======================= */
let questions = JSON.parse(localStorage.getItem("questions")) || [];

function addQuestion() {
  const input = document.getElementById("questionInput");
  if (!input.value.trim()) return;

  questions.push({
    text: input.value,
    answer: ""
  });

  localStorage.setItem("questions", JSON.stringify(questions));

  input.value = "";
  renderQ();
}

function renderQ() {
  const box = document.getElementById("questionList");
  if (!box) return;

  box.innerHTML = "";

  questions.forEach((q, i) => {
    box.innerHTML += `
      <div class="question-card">
        ❓ ${q.text}
        ${
          q.answer
          ? `<div class="answer">💬 ${q.answer}</div>`
          : `<input placeholder="ตอบ..." onblur="reply(${i}, this.value)">`
        }
      </div>
    `;
  });
}

function reply(i, text) {
  if (!text.trim()) return;

  questions[i].answer = text;
  localStorage.setItem("questions", JSON.stringify(questions));
  renderQ();
}


/* =======================
   📅 FREE DAYS
======================= */
function renderFreeDays() {
  const box = document.getElementById("freeDays");
  if (!box) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const today = new Date();

  box.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const dateStr = d.toISOString().split("T")[0];
    const hasQueue = tasks.some(t => t.date === dateStr);

    box.innerHTML += `
      <div class="day-card ${hasQueue ? 'busy' : 'free'}">
        ${d.getDate()}/${d.getMonth()+1}
        <br>
        ${hasQueue ? "มีคิว" : "ว่าง"}
      </div>
    `;
  }
}


/* =======================
   🚀 START   
======================= */
window.onload = function() {
  renderCalendar();
  renderQ();
  renderFreeDays();   
};
