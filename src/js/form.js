/* eslint-disable import/prefer-default-export */
/** Manipula formulários e comportamentos gerais */
import { showMessage } from './cart.js';

// ================== FORMULÁRIOS ==================
document.getElementById('form-contato')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showMessage('Mensagem enviada! Entraremos em contato.');
  e.target.reset();
});

document.getElementById('form-trabalhe')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showMessage('Currículo enviado com sucesso!');
  e.target.reset();
});

document.getElementById('newsletter')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showMessage('Assinatura realizada. Obrigado!');
  e.target.reset();
});

// ================== FAQ ACCORDION ==================
export function toggleFaq(num) {
  const ans = document.getElementById(`faq-${num}`);
  ans?.classList.toggle('visible');
}

// ================== SCROLL SUAVE ==================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================== ANO AUTOMÁTICO FOOTER ==================
if (document.getElementById('currentYear')) {
  document.getElementById('currentYear').innerText = new Date().getFullYear();
}
