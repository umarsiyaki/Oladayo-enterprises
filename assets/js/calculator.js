
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    category: document.querySelector('#category').value,
    size: document.querySelector('#size').value,
    quantity: document.querySelector('#quantity').value,
    price: document.querySelector('#price').value,
    name: document.querySelector('#name').value,
  };
  fetch('/api/calculator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});
