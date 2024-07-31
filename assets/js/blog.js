const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    title: document.querySelector('#title').value,
    subtitle: document.querySelector('#subtitle').value,
    image: document.querySelector('#image').files[0],
    body: document.querySelector('#body').value,
    comment: document.querySelector('#comment').value,
    like: document.querySelector('#like').value,
    share: document.querySelector('#share').value,
  };
  fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});