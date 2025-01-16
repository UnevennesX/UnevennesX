  function processUrl(url) {
    try {
      let domain = new URL(url).hostname;
      let token = '04651664-4715-4620-8f59-16a272ff3e4a'; // Token de Notch
      let pid1 = new URL(url).searchParams.get('pid1');
      let refid1 = new URL(url).searchParams.get('refid1');
      let rid = new URL(url).searchParams.get('rid');
      let generatedUrl = '';

      if (domain.includes('ovationworldpanel.com')) {
        // Se genera la nueva URL con los parámetros obtenidos
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
      } else {
        throw new Error('URL no válida');
      }

      return generatedUrl;
    } catch (e) {
      return null;
    }
  }

  document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = processUrl(urlInput.value);

    if (result) {
      document.getElementById('generatedTitle').classList.remove('hidden');
      document.getElementById('generatedUrl').classList.remove('hidden');
      document.getElementById('generatedUrl').innerText = result;
      document.getElementById('error').classList.add('hidden');
    } else {
      document.getElementById('generatedTitle').classList.add('hidden');
      document.getElementById('generatedUrl').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
    }
  });

  document.getElementById('generatedUrl').addEventListener('click', function() {
      var el = document.createElement('textarea');
      el.value = this.innerText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      document.getElementById('notification').classList.remove('hidden');
  });
