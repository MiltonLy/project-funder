function handleLogin(event) {
  event.preventDefault();
  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: document.querySelector('#login > [name="email"]').value,
      password: document.querySelector('#login > [name="password"]').value,
    }),
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to log in.');
    }
  });
}

function handleRegister(event) {
  event.preventDefault();
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: document.querySelector('#register > [name="username"]').value,
      email: document.querySelector('#register > [name="email"]').value,
      password: document.querySelector('#register > [name="password"]').value,
    }),
  }).then((response) => {
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to register.');
    }
  });
}

document.querySelector('#login').addEventListener('submit', handleLogin);
document.querySelector('#register').addEventListener('submit', handleRegister);
