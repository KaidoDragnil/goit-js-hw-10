import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const delayInput = document.querySelector('.form > label > input');
const submitBtn = document.querySelector('.form button');

const formForPromis = document.querySelector('.form');
const radios = document.getElementsByName('state');
formForPromis.addEventListener('submit', event => {
  event.preventDefault();
  const delay = delayInput.value;
  let a = null;
  Array.from(radios).forEach(elem => {
    if (elem.checked) {
      a = elem.value === 'fulfilled';
    }
  });

  const getPromis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  getPromis
    .then(result => {
      izitoast.success({
        position: 'topRight',
        message: `Fulfilled promise in ${result} ms`,
      });
    })
    .catch(error => {
      izitoast.error({
        position: 'topRight',
        message: `Rejected promise in ${error} ms`,
      });
    });
});
