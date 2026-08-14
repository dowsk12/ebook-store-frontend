// Autenticação simples usando localStorage; funciona com sessões em login.html e index.html.
const STORAGE = 'bookverse_users_v2';
const SESSION = 'bookverse_session_v2';

const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const pwdEl = document.getElementById('password');
const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin');

function loadUsers(){ try { return JSON.parse(localStorage.getItem(STORAGE)||'[]'); } catch(e){ return []; } }
function saveUsers(u){ localStorage.setItem(STORAGE, JSON.stringify(u)); }
function setSession(email){ localStorage.setItem(SESSION,email); }

btnRegister.addEventListener('click', () => {
  const name = nameEl.value.trim();
  const email = emailEl.value.trim().toLowerCase();
  const pwd = pwdEl.value;
  if(!name||!email||!pwd){ alert('Preencha todos os campos'); return; }
  const users = loadUsers();
  if(users.find(x=>x.email===email)){ alert('Email já registado'); return; }
  users.push({name,email,password:pwd,history:[]});
  saveUsers(users);
  alert('Registrado — faça login agora');
});

btnLogin.addEventListener('click', () => {
  const email = emailEl.value.trim().toLowerCase();
  const pwd = pwdEl.value;
  const users = loadUsers();
  const found = users.find(x=>x.email===email && x.password===pwd);
  if(!found){ alert('Credenciais inválidas'); return; }
  setSession(found.email);
  location.href = 'index.html';
});
