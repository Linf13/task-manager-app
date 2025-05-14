document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      const messageEl = document.getElementById('message');

      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      } else {
        messageEl.textContent = data.message || 'Login failed';
      }
    });
  }
});

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    const messageEl = document.getElementById('regMessage');

    if (res.ok) {
      messageEl.style.color = 'green';
      messageEl.textContent = '✅ Registered successfully! Redirecting...';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      messageEl.textContent = data.message || 'Registration failed';
    }
  });
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

