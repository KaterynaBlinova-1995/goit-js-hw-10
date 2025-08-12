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
}
