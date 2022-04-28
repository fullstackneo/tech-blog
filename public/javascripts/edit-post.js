// update a post
function updateFormHandler(event) {
  event.preventDefault();
  const id = location.pathname.split('/')[3];
  const title = document.querySelector('#title').ariaValueMax.trim();
  const content = document.querySelector('#content').ariaValueMax.trim();

  if (title && content) {
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    });
  }
}

document.querySelector('.form').addEventListener('submit', updateFormHandler);

// delete a post
function deleteFormHandler(event) {
  event.preventDefault();
  const id = location.pathname.split('/')[3];

  fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  });
}

document.querySelector('.deleteBtn').addEventListener('click', deleteFormHandler);
