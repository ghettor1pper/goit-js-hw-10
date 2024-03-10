import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// ... ... ... //
const form = document.querySelector(".form");
function handleSubmit(event) {
    const delay = form.elements.delay.value;
    const state  = form.elements.state.value;
}
form.addEventListener("submit", handleSubmit);

