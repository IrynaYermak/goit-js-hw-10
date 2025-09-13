import iziToast from 'izitoast';

const form = document
  .querySelector('form')
  .addEventListener('submit', promiseCreator);

function promiseCreator(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const checkedResult = event.target.elements.state.value;

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkedResult === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
        return;
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  prom
    .then(text => {
      return alert(text);
    })
    .catch(errorText => {
      return alert(errorText);
    });

  event.target.elements.delay.value = '';
}
