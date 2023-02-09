function handleNewProject(event) {
  event.preventDefault();

  fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: document.querySelector('#new-project > [name="name"]').value.trim(),
      description: document
        .querySelector('#new-project > [name="description"]')
        .value.trim(),
      needed_funding: document
        .querySelector('#new-project > [name="needed_funding"]')
        .value.trim(),
    }),
  }).then((response) => {
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to post new project');
    }
  });
}
document
  .querySelector('#new-project')
  .addEventListener('submit', handleNewProject);

document.querySelectorAll('.delete').forEach((button) => {
  button.addEventListener('click', () => {
    fetch(`/api/projects/${button.getAttribute('data-id')}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) window.location.reload();
      else alert('Failed to delete project');
    });
  });
});
