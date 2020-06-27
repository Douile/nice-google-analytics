window.dataLayer = window.dataLayer || [];
function gtag() {dataLayer.push(arguments);};
(function(currentScript) {
const SCRIPT_URL = new URL(currentScript.src, location);

const _GA_STYLES = atob('LmdhLWRpYWxvZywuZ2EtZGlhbG9nICp7Y29sb3I6dmFyKC0tZ2EtZm9yZWdyb3VuZCk7Ym94LXNpemluZzpib3JkZXItYm94fS5nYS1kaWFsb2d7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmZpeGVkO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDB2dztoZWlnaHQ6MTB2aDthbmltYXRpb246Z2Etc2xpZGUtaW4tYm90dG9tIC1ib3R0b20gMXMgZWFzZTtib3JkZXI6MDtib3JkZXItcmFkaXVzOjEwcHggMTBweCAwIDA7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDthbGlnbi1pdGVtczpjZW50ZXI7cGFkZGluZzoxNXB4O2JhY2tncm91bmQ6dmFyKC0tZ2EtYmFja2dyb3VuZCk7ei1pbmRleDoyfS5nYS1kaWFsb2ctdGV4dHtmbGV4LWdyb3c6MTttYXJnaW46MTBweH0uZ2EtZGlhbG9nLWJ1dHRvbnttaW4td2lkdGg6MTAwcHg7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1nYS1mb3JlZ3JvdW5kKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWdhLWJhY2tncm91bmQpO2JvcmRlci1yYWRpdXM6NXB4O2N1cnNvcjpwb2ludGVyO3BhZGRpbmc6NXB4O21hcmdpbjoxMHB4O3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246MXMgZWFzZSBiYWNrZ3JvdW5kLWNvbG9yfS5nYS1kaWFsb2ctYWNjZXB0OmhvdmVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tZ2EtYWNjZXB0KX0uZ2EtZGlhbG9nLWRlY2xpbmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1nYS1kZWNsaW5lKX1Aa2V5ZnJhbWVzIGdhLXNsaWRlLWluLWJvdHRvbXswJXt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDB2aCl9MTAwJXt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKX19KnstLWdhLWJhY2tncm91bmQ6IzFhMWUxYzstLWdhLWZvcmVncm91bmQ6I2ZmZmZmZjstLWdhLWFjY2VwdDojMzA4NzMyOy0tZ2EtZGVjbGluZTojZDMyZjJmfQ==');

function createElement(tagName, attributes, innerText) {
  const el = document.createElement(tagName);
  if (innerText !== undefined) el.innerText = innerText;
  if (attributes) {
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
  }
  return el;
}

const _GA = Object.defineProperties({}, {
  'TRACKING_ID': {
    configurable: false,
    writable: false,
    value: SCRIPT_URL.searchParams.get('id')
  },
  'TRACKING_SCRIPT': {
    configurable: false,
    get: function() {
      return `https://www.googletagmanager.com/gtag/js?id=${_GA.TRACKING_ID}`;
    }
  },
  'TRACKING_CONSENT_KEY': {
    configurable: false,
    writable: false,
    value: SCRIPT_URL.searchParams.get('storageKey') || '_GA_CONSENT'
  }
})

function checkGoogleAnalytics() {
  return new Promise((resolve) => {
    fetch(_GA.TRACKING_SCRIPT, { method: 'HEAD', mode: 'no-cors' }).then(() => {
      resolve(true);
    }).catch(() => {
      resolve(false);
    })
  })
}

function checkGoogleAnalyticsConsent() {
  return new Promise((resolve) => {
    try {
    if (localStorage) {
      const consent = localStorage.getItem(_GA.TRACKING_CONSENT_KEY);
      if (consent === 'true') {
        return resolve(true);
      } else if (consent !== null) {
        return resolve(false);
      }
    }
    console.log('Showing GA consent dialog');
    /* Show consent dialog */
    const dialog = createElement('dialog', { class: 'ga-dialog' });
    dialog.appendChild(createElement('p', { class: 'ga-dialog-text' }, 'Would you like to load Google Analytics?'));
    const accept = createElement('button', { class: 'ga-dialog-button ga-dialog-accept' }, 'Yes');
    const decline = createElement('button', { class: 'ga-dialog-button ga-dialog-decline' }, 'No');

    accept.addEventListener('click', () => {
      localStorage.setItem(_GA.TRACKING_CONSENT_KEY, 'true');
      dialog.remove();
      resolve(true);
    }, { once: true });
    decline.addEventListener('click', () => {
      localStorage.setItem(_GA.TRACKING_CONSENT_KEY, 'false');
      dialog.remove();
      resolve(false);
    }, { once: true });

    dialog.appendChild(accept);
    dialog.appendChild(decline);
    document.body.appendChild(dialog);
  } catch (e) { console.error(e) }
  })
}

function addStyleSheet() {
  return new Promise((resolve) => {
    if (document.head.querySelector('link[rel="stylesheet"][name="_ga_styles"]') !== null) return resolve();
    const blob = new Blob([_GA_STYLES], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = createElement('link', { rel: 'stylesheet', name: '_ga_styles', href: url, integrity: 'sha512-Y3/C2ZTKG/tnPTHBWXOmEyGYkeiz3fLUtWrG9YqqfB0BptZwMSZfA/EUfHkIcy24R5XbZ10ASVTIhbegzTHCyg==' });
    link.addEventListener('load', function() {
      resolve();
    }, { once: true });
    document.head.prepend(link);
  })
}

async function loadGoogleAnalytics() {
  await addStyleSheet();
  console.log(`Attempting to load google analytics for ${_GA.TRACKING_ID}`);
  if (await checkGoogleAnalytics()) {
    /* Check for user consent */
    if (!await checkGoogleAnalyticsConsent()) return;
    /* Load google analytics */
    const script = createElement('script', { async: '', src: _GA.TRACKING_SCRIPT });
    document.head.appendChild(script);
    gtag('js',new Date());
    gtag('config',_GA.TRACKING_ID);
    console.log('Loaded google analytics');
  } else {
    console.log('User-Agent blocks google analytics');
  }
}

window.addEventListener('load', function() {
  loadGoogleAnalytics().then(null, console.error);
}, { once: true, passive: true });

}).call(null, document.currentScript);
