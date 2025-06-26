const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');
const btnLogin = document.getElementById('btn-login');
const btnGoogle = document.getElementById('btn-google');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnPost = document.getElementById('btn-post');
const fileInput = document.getElementById('file-input');
const videosList = document.getElementById('videos-list');

let videos = JSON.parse(localStorage.getItem('videos')||'[]');

function renderVideos(){
  videosList.innerHTML = '';
  videos.forEach((vid, i) => {
    const card = document.createElement('div');
    card.classList.add('video-card');
    card.innerHTML = `
      <video src="${vid.url}" controls data-index=${i}></video>
      <div class="controls">
        <select data-index=${i}>
          <option value="240">240p</option>
          <option value="480">480p</option>
          <option value="720">720p</option>
          <option value="1080">1080p</option>
        </select>
        <button data-index=${i} class="btn-mute">🔊</button>
      </div>`;
    videosList.appendChild(card);
  });
}

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  videos.unshift({ url, name: file.name });
  localStorage.setItem('videos', JSON.stringify(videos));
  renderVideos();
});

btnPost.addEventListener('click', _ => fileInput.click());

videosList.addEventListener('change', e => {
  if (e.target.tagName==='SELECT'){
    const vidEl = videosList.querySelector(`video[data-index="${e.target.dataset.index}"]`);
    const file = videos[e.target.dataset.index].fileObj;
    // طريقة محاكاة الجودة: تعيين نفس url (بلا تغيير حقاً)
    vidEl.playbackRate = 1;
  }
});

videosList.addEventListener('click', e => {
  if (e.target.classList.contains('btn-mute')){
    const idx = e.target.dataset.index;
    const vidEl = videosList.querySelector(`video[data-index="${idx}"]`);
    vidEl.muted = !vidEl.muted;
    e.target.textContent = vidEl.muted ? '🔇' : '🔊';
  }
});

btnLogin.addEventListener('click', () => {
  if (emailInput.value && passwordInput.value) {
    alert('تم تسجيل الدخول!');
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    renderVideos();
  } else alert('يرجى إدخال البريد وكلمة المرور.');
});

btnGoogle.addEventListener('click', () => {
  alert('تسجيل بحساب Google (محاكاة)');
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  renderVideos();
});
