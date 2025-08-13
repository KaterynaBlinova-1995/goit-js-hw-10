import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const formElem = document.querySelector('.js-form');
console.log(formElem);
formElem.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const delay = formData.get('delay');
  const state = formData.get('state');
  console.log(delay);
  console.log(state);

  const isActive = state === 'fulfilled';
  createPromise(delay, isActive)
    .then(result => {
      iziToast.show({
        message: result,
        position: 'topRight',
        backgroundColor: 'teal',
        messageColor: 'white',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        position: 'topRight',
        backgroundColor: 'tomato',
        messageColor: 'white',
      });
    });
}

function createPromise(delay, isActive) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isActive) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  return promise;
}
