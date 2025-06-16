/** Lógica de avaliação por estrelas */
import { showMessage } from './cart.js';

const starRatings = document.querySelectorAll('.star-rating .fa-star');
let ratingValue = 0;

starRatings.forEach((star, idx) => {
  star.addEventListener('mouseover', () => highlightStars(idx + 1));
  star.addEventListener('mouseout', () => highlightStars(ratingValue));
  star.addEventListener('click', () => setRating(idx + 1));
});

function highlightStars(rating) {
  starRatings.forEach((star, idx) => {
    star.classList.toggle('selected', idx < rating);
  });
}

function setRating(rating) {
  ratingValue = rating;
  document.getElementById('rating-value').value = rating;
  highlightStars(ratingValue);
  showMessage(`Você avaliou com ${ratingValue} estrela(s)!`);
}
