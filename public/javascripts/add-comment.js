async function createPostHandler(event) {
  event.preventDefault();
  const post_id = location.pathname.split('/')[2];
  const comment_text = document.querySelector('textarea').value;
  
  if (post_id && comment_text) {
    await fetch('/api/comments', {
      method: 'post',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        location.reload();
      } else {
        alert(response.statusText);
      }
    });
  }
}

document.querySelector('.form').addEventListener('submit', createPostHandler);
