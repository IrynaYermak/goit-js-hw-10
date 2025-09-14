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
      return iziToast.success({
        message: text,
        timeout: 3000,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: '#59a10d',
        borderBottom: '2px solid #b5ea7c',
        progressBar: false,
        close: false,
        icon: '',
        width: '383px',
        // iconColor: 'white',
        // iconUrl: '/src/img/symbol-defs.svg#icon-check-circle',
      });
    })
    .catch(errorText => {
      return iziToast.error({
        message: errorText,
        timeout: 3000,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: '#ef4040',
        progressBar: false,
        close: false,
        icon: '',
      });
    });

  event.target.reset();
}
