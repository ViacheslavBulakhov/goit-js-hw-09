import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  createPromisesByAmount();
}

function createPromisesByAmount() {
  const target = Number(amount.value);
  let currentDelay = Number(delay.value);
  const postDelay = Number(step.value);


  for (let i = 1; i <= target; i += 1) {
    currentDelay += postDelay;

    createPromise(i,currentDelay)
      .then(({ position, delay }) => {
      Notiflix.Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
      resolve({ position, delay })
      }
      reject({ position, delay })
    }, delay)

})

}
