document.querySelector('#logout').addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/api/users/logout', {
    method: 'POST',
  }).then((respose) => {
    if (respose.ok) window.location = '/';
    else alert('Failed to log out :FEAR ME:');
  });
});
