import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// ... ... ... //
const form = document.querySelector('.form');
function handleSubmit(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  const timer = setInterval(() => {
    if (state === 'fulfilled') {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      clearInterval(timer);
    } else {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
      clearInterval(timer);
    }
  }, delay);
}
form.addEventListener('submit', handleSubmit);
