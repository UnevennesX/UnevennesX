function processUrl(url) {
          // Expresión regular para extraer el tsid
          const regex = /tsid=([a-f0-9]{32})/;
          const match = url.match(regex);

          if (match) {
              const tsid = match[1]; // El tsid extraído de la URL
              return `https://tssrvy.com/r/?st=1&tsid=${tsid}`; // Generar el nuevo enlace
          }
          return null; // Si no se encuentra el tsid, retornar null
      }

      function toggleList() {
          const domains = document.querySelector('.allowed-domains');
          domains.classList.toggle('open');
      }



