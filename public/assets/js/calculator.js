
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

document.getElementById('count-add-btn').addEventListener('click', () => {
  const quantity = document.getElementById('quantity');
  quantity.value = parseInt(quantity.value) + 1;
  document.getElementById('calculated-value').textContent = quantity.value;
});

document.getElementById('count-subtract-btn').addEventListener('click', () => {
  const quantity = document.getElementById('quantity');
  if (parseInt(quantity.value) > 1) {
      quantity.value = parseInt(quantity.value) - 1;
  }
  document.getElementById('calculated-value').textContent = quantity.value;
});

document.getElementById('count-multiply-btn').addEventListener('click', () => {
  const quantity = document.getElementById('quantity');
  quantity.value = parseInt(quantity.value) * 2;
  document.getElementById('calculated-value').textContent = quantity.value;
});


document.addEventListener('DOMContentLoaded', function() {
  const countButtons = document.querySelectorAll('.count-btn');

  countButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          event.preventDefault();
          const action = button.getAttribute('data-action');
          const quantityInput = document.getElementById('quantity');
          let quantity = parseInt(quantityInput.value);

          if (action === 'add') {
              quantity += 1;
          } else if (action === 'subtract' && quantity > 1) {
              quantity -= 1;
          } else if (action === 'multiply') {
              quantity *= 2;
          }
          
          quantityInput.value = quantity;
      });
  });

  // Other codes...
});