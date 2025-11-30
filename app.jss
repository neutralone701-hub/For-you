// app.js
const pages = {
  laugh: {
    title: "Make Me Laugh",
    lines: [
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "I told my pillow about you. Now it’s jealous.",
      "Do you have a map? I keep getting lost in your eyes.",
      "If you were a vegetable, you'd be a cute-cumber.",
      "I’m not a photographer, but I can picture us together.",
      "Do you like raisins? How do you feel about a date?",
      "Are you Wi-Fi? Because I'm feeling a connection.",
      "You must be tired — you’ve been running through my mind all day.",
      "If kisses were snowflakes, I’d send you a blizzard.",
      "Are you a bank loan? Because you have my interest."
    ],
    questions: [
      "What’s your favorite comedy movie?",
      "Which comedian always makes you laugh?",
      "Do you prefer puns or silly stories?",
      "What's a joke you never get tired of?",
      "Describe your perfect lazy Sunday."
    ]
  },
  propose: {
    title: "Propose Me",
    lines: [
      "Will you be the reason I delete my dating apps?",
      "I was going to wait another day to tell you I love you, but I couldn't.",
      "If loving you is a crime, I want to be the most wanted.",
      "I promise to always share my fries with you.",
      "Marry me? We can start with coffee and see where it goes.",
      "I’ll be the peanut butter to your jelly forever.",
      "You’re the missing piece to my puzzle.",
      "I want to be your favorite hello and hardest goodbye.",
      "Let’s make our own fairytale, starting tonight.",
      "I’ll pick the movie, you pick the snacks, forever?"
    ],
    questions: [
      "What’s your dream date?",
      "Do you believe in love at first sight?",
      "What’s one thing you want in a partner?",
      "Would you rather a cozy night in or a big adventure?",
      "What’s your favorite romantic movie?"
    ]
  },
  compliment: {
    title: "Compliment Me",
    lines: [
      "Your smile should come with a warning: may cause butterflies.",
      "You glow like a pastel sunrise.",
      "You make ordinary moments feel magical.",
      "Your laugh is my favorite sound.",
      "You’re the kind of person who makes others better.",
      "You have a heart that sparkles brighter than glitter.",
      "Your style is effortlessly charming.",
      "You’re a walking mood-lifter.",
      "You make kindness look so easy.",
      "You’re the reason the stars look jealous."
    ],
    questions: [
      "What’s a compliment you always remember?",
      "What do you like most about yourself?",
      "What makes you feel confident?",
      "Who gives you the best compliments?",
      "What small thing brightens your day?"
    ]
  },
  annoy: {
    title: "Annoy Me",
    lines: [
      "If you keep being this cute, I’ll never get anything done.",
      "Stop being perfect — it’s distracting.",
      "You’re like a song stuck in my head, but worse.",
      "Please stop stealing my attention.",
      "You’re the reason I check my phone for no reason.",
      "Why do you have to be so interesting?",
      "You’re like a puzzle I don’t want to finish.",
      "Quit being adorable, it’s unfair.",
      "You make procrastination look productive.",
      "You’re the best kind of nuisance."
    ],
    questions: [
      "What little habit annoys you the most?",
      "What’s your playful pet peeve?",
      "Do you like teasing or being teased?",
      "What’s a silly thing that makes you roll your eyes?",
      "How do you react when someone annoys you?"
    ]
  },
  impress: {
    title: "Impress Me",
    lines: [
      "Tell me something impressive about you — I’ll be impressed.",
      "You must be a work of art, because I can’t stop staring.",
      "Your brain is my favorite feature.",
      "You’re the kind of person who makes me take notes.",
      "You’ve got talent written all over you.",
      "You’re the plot twist I didn’t see coming.",
      "You make excellence look effortless.",
      "You’re the kind of person who raises the bar.",
      "I’d follow you to the moon and back.",
      "You’re the reason I believe in wow."
    ],
    questions: [
      "What’s a skill you’re proud of?",
      "What’s the last thing you learned?",
      "What’s a small win you had recently?",
      "What impresses you in others?",
      "What’s your secret talent?"
    ]
  }
};

// --- UI references
const home = document.getElementById('home');
const sectionEl = document.getElementById('section');
const sectionTitle = document.getElementById('sectionTitle');
const lineText = document.getElementById('lineText');
const prevLine = document.getElementById('prevLine');
const nextLine = document.getElementById('nextLine');
const randomLine = document.getElementById('randomLine');
const backBtn = document.getElementById('backBtn');
const questionsArea = document.getElementById('questionsArea');
const escapeBtn = document.getElementById('escapeBtn');

let currentPage = null;
let currentIndex = 0;

// navigation
document.querySelectorAll('.big-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> openPage(btn.dataset.page));
});
backBtn.addEventListener('click', ()=> showHome());

// carousel controls
prevLine.addEventListener('click', ()=> showLine(currentIndex-1));
nextLine.addEventListener('click', ()=> showLine(currentIndex+1));
randomLine.addEventListener('click', ()=> showLine(Math.floor(Math.random()*pages[currentPage].lines.length)));

// show home
function showHome(){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  home.classList.add('active');
  sectionEl.classList.remove('active');
  currentPage = null;
}

// open a section
function openPage(pageKey){
  currentPage = pageKey;
  currentIndex = 0;
  sectionTitle.textContent = pages[pageKey].title;
  showLine(0);
  renderQuestions(pages[pageKey].questions);
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  sectionEl.classList.add('active');
}

// show a line by index
function showLine(i){
  const arr = pages[currentPage].lines;
  if(i < 0) i = arr.length - 1;
  if(i >= arr.length) i = 0;
  currentIndex = i;
  lineText.textContent = arr[i];
  // small sparkle animation
  lineText.classList.remove('bounce');
  void lineText.offsetWidth;
  lineText.classList.add('bounce');
}

// render questions
function renderQuestions(questions){
  questionsArea.innerHTML = '';
  questions.forEach((q, idx)=>{
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <label><strong>Q${idx+1}.</strong> ${q}</label>
      <input type="text" placeholder="Type your answer..." data-q="${q}" />
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="submit" data-q="${q}">Submit</button>
      </div>
    `;
    questionsArea.appendChild(div);
  });

  // attach submit handlers
  questionsArea.querySelectorAll('.submit').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const q = btn.dataset.q;
      const input = btn.closest('.question').querySelector('input');
      const answer = input.value.trim();
      if(!answer) {
        input.classList.add('wiggle');
        setTimeout(()=>input.classList.remove('wiggle'),600);
        return;
      }
      // send to backend
      await submitAnswer({page: currentPage, question: q, answer});
      // small success micro-animation
      btn.textContent = 'Saved ✓';
      setTimeout(()=>btn.textContent='Submit',1200);
      input.value = '';
    });
  });
}

// escaping button behavior
escapeBtn.addEventListener('mouseenter', ()=> moveEscape());
function moveEscape(){
  const wrap = document.querySelector('.escape-wrap');
  const w = wrap.clientWidth, h = 60;
  const x = Math.random()*(w-80);
  const y = Math.random()*40;
  escapeBtn.style.transform = `translate(${x}px, ${y}px)`;
  // playful wiggle
  escapeBtn.classList.add('wiggle');
  setTimeout(()=>escapeBtn.classList.remove('wiggle'),600);
}

// --- Backend endpoint (replace with your Apps Script URL or serverless endpoint)
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbztW09WuvVw423mfBzQ1bzV6-zaRfZikc2O-llIt94-jDA62qgnFElui_ThqAbDOomB/exec"; // replace

async function submitAnswer({page, question, answer}){
  const payload = {
    page,
    question,
    answer,
    timestamp: new Date().toISOString()
  };
  try{
    await fetch(BACKEND_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
  }catch(err){
    console.error('Save failed', err);
    alert('Could not save answer. Check backend.');
  }
}

// admin route (hidden)
const adminSecretPath = '/admin-secret-1827';
if(location.pathname.endsWith(adminSecretPath)){
  // show admin page
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('admin').classList.add('active');
  setupAdmin();
} else {
  showHome();
}

// Admin UI logic
function setupAdmin(){
  const loginBtn = document.getElementById('adminLogin');
  const passInput = document.getElementById('adminPass');
  const tableWrap = document.getElementById('adminTableWrap');
  const tableBody = document.querySelector('#adminTable tbody');
  const search = document.getElementById('adminSearch');

  loginBtn.addEventListener('click', async ()=>{
    const pass = passInput.value;
    if(!pass) return;
    // call backend to fetch rows (backend should validate password)
    try{
      const res = await fetch(BACKEND_URL + '?action=get&secret=' + encodeURIComponent(pass));
      if(!res.ok) throw new Error('Auth failed');
      const data = await res.json();
      tableBody.innerHTML = '';
      data.forEach(row=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.timestamp}</td><td>${row.page}</td><td>${row.question}</td><td>${row.answer}</td>`;
        tableBody.appendChild(tr);
      });
      tableWrap.style.display = 'block';
    }catch(e){
      alert('Wrong password or server error.');
    }
  });

  search.addEventListener('input', ()=>{
    const q = search.value.toLowerCase();
    document.querySelectorAll('#adminTable tbody tr').forEach(tr=>{
      const txt = tr.textContent.toLowerCase();
      tr.style.display = txt.includes(q) ? '' : 'none';
    });
  });
}