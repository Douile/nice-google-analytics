window.dataLayer = window.dataLayer || [];
function gtag() {dataLayer.push(arguments);};
(function(currentScript) {
const SCRIPT_URL = new URL(currentScript.src, location);

const _GA_STYLES = atob('LmdhLWRpYWxvZywuZ2EtZGlhbG9nICp7Y29sb3I6dmFyKC0tZ2EtZm9yZWdyb3VuZCk7Ym94LXNpemluZzpib3JkZXItYm94fS5nYS1kaWFsb2d7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmZpeGVkO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDB2dztoZWlnaHQ6MTB2aDthbmltYXRpb246c2xpZGUtaW4tYm90dG9tIDFzIGVhc2U7Ym9yZGVyOjA7Ym9yZGVyLXJhZGl1czoxMHB4IDEwcHggMCAwO2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQ7YWxpZ24taXRlbXM6Y2VudGVyO3BhZGRpbmc6MTVweDtiYWNrZ3JvdW5kOnZhcigtLWdhLWJhY2tncm91bmQpO3otaW5kZXg6Mn0uZ2EtZGlhbG9nLXRleHR7ZmxleC1ncm93OjE7bWFyZ2luOjEwcHh9LmdhLWRpYWxvZy1idXR0b257bWluLXdpZHRoOjEwMHB4O2JvcmRlcjoxcHggc29saWQgdmFyKC0tZ2EtZm9yZWdyb3VuZCk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1nYS1iYWNrZ3JvdW5kKTtib3JkZXItcmFkaXVzOjVweDtjdXJzb3I6cG9pbnRlcjtwYWRkaW5nOjVweDttYXJnaW46MTBweDt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOjFzIGVhc2UgYmFja2dyb3VuZC1jb2xvcn0uZ2EtZGlhbG9nLWFjY2VwdDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWdhLWFjY2VwdCl9LmdhLWRpYWxvZy1kZWNsaW5lOmhvdmVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tZ2EtZGVjbGluZSl9KnstLWdhLWJhY2tncm91bmQ6IzFhMWUxYzstLWdhLWZvcmVncm91bmQ6I2ZmZmZmZjstLWdhLWFjY2VwdDojMzA4NzMyOy0tZ2EtZGVjbGluZTojZDMyZjJmfQo=');

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
    const link = createElement('link', { rel: 'stylesheet', name: '_ga_styles', href: url, integrity: 'sha512-36lAgmhNoaCsrUsya6wyv2PrMtVbA77Cy+6mOWyLCq6orMAr6kSVPM6N18ZPD/p+17saP9kVVjFlMhkd0c0Jyw==' });
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
