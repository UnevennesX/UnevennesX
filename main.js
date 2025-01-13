import { processUrl } from './tokens.js';

function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 20000);
  }).catch(() => {
    alert('Error al copiar al portapapeles');
  });
}

document.getElementById('urlForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const url = document.getElementById('urlInput').value;
  const generatedUrl = processUrl(url);

  if (generatedUrl) {
    const generatedUrlElement = document.getElementById('generatedUrl');
    generatedUrlElement.textContent = generatedUrl;
    generatedUrlElement.classList.remove('hidden');
    setTimeout(() => {
      generatedUrlElement.classList.add('hidden');
    }, 20000);

    copyToClipboard(generatedUrl);
    document.getElementById('error').classList.add('hidden');
  } else {
    const errorElement = document.getElementById('error');
    errorElement.textContent = 'URL no reconocida o no válida';
    errorElement.classList.remove('hidden');
  }
});

setInterval(() => {
  document.getElementById('urlInput').value = '';
}, 20000);

setInterval(() => {
  location.reload();
}, 180000);
