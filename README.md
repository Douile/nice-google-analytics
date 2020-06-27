# nice-google-analytics
Be nice to your users by asking whether they want to load google's tracking scripts first.

This simple script is designed to make it easy to do just that.

## How it works

1. The script sends a HTTP HEAD request to the GA script, this allows it to check whether the User Agent is already blocking GA (i.e. ublock or adblock)
2. If GA isn't blocked then the script shows a dialog at the bottom of the page asking the user whether they would like to load google analytics
3. Depending on whether they press yes or no the google-analytics script is loaded and the answer they gave is stored in localStorage for next time

## How to add
Add the following to your HTML
```html
<script src="https://cdn.jsdelivr.net/gh/douile/nice-google-analytics/src/nicega.min.js?id=UA-MY-ID-HERE" async="" defer=""></script>
```
And change the UA-MY-ID-HERE to your GA tracking ID

## How to style
You can change the colors used by nice-google-analytics in your current css stylesheet, all you need to is add this rule and change the colors.
```css
* {
  --ga-background: #1a1e1c;
  --ga-foreground: #ffffff;
  --ga-accept: #308732;
  --ga-decline: #d32f2f;
}
```

## How to control
- Set your GA tracking id with query param `id`
- Set the localStorage key used with query param `key` (defaults to `_GA_CONSENT`)

e.g.
```html
<script src="https://cdn.jsdelivr.net/gh/douile/nice-google-analytics/src/nicega.min.js?id=UA-MY-ID-HERE&key=HAS_GA_CONSENT" async="" defer=""></script>
```

The users consent status is stored in localStorage at the key set (default `_GA_CONSENT`) so by changing this value to `true` or `false` you can control consent automatically, or if you wish to show the dialog again you can delete the key.
```javascript
// Show the dialog again (after reload)
localStorage.removeItem('_GA_CONSENT');
// Force the user to decline (after reload)
localStorage.setItem('_GA_CONSENT', 'false');
```

## Example
View the example [here](example.html) or live example [here](https://douile.github.io/nice-google-analytics/example.html) (_you may not see the popup if GA is blocked_)

## Security
### CSP
Below is a list of the sources you need to add to your CSP (_if you use it_)

Compliant with the license you may copy this script to your own domain, meaning you do not need the `cdn.jsdelivr.net` script-src

**default-src**
- `www.googletagmanager.com`

**script-src**
- `www.googletagmanager.com`
- `www.google-analytics.com`
- `cdn.jsdelivr.net`

**style-src**
- `'self'`
- `'data'`
- _You could also you the integrity for `nicega.min.css` here_

### Integrity
Below is a list of integrity hashes for the various scripts and versions (Also sizes)

| Version       | Script            | Integrity | URL |
| :-----------: | :---------------- | :-------- | :-- |
| 1.1 (2.69kb)  | `nicega.js`       | `sha512-hbuNlBzsx/nk4tpa0zPjkUWMp0+OiURha/snN1yNX3awZ8q8xHUCOkkEEwc8sQ9d/btUj5CgVkdcYys4e12l6w==` | `https://cdn.jsdelivr.net/gh/douile/nice-google-analytics@1.1/src/nicega.js`
| 1.1 (2.63kb)  | `nicega.min.js`   | `sha512-D8z5o03OF4Q0viTL+OtgKGeZY3zMb7EOtUMhfOvUvfpaYWwiKF2j+TaXUnWkn+qSqwwmHgtvwwvRsdXl2jEq0Q==` | `https://cdn.jsdelivr.net/gh/douile/nice-google-analytics@1.1/src/nicega.min.js`
| 1.1           | `nicega.min.css`  | `sha512-DQwhnBMIFHMvcFRlbgKqupx8zLPPB+3f77mjTzxQ7FDf4TRoqDrQgMJZWDLGq8IoEfujCH9qZyHvwA2TBQP90Q==` | local (see generatecss.sh)
| 1.0 (2.61kb)  | `nicega.js`       | `sha512-iLHBHF8Qkw52WEKQftHBvakKUqWXGGaAcohLDehDJsqJPjOilV3jH7cdzD4RvCg0cJclkKy2sQ8toU3aPdcWdg=` | `https://cdn.jsdelivr.net/gh/douile/nice-google-analytics@1.0/src/nicega.js`
| 1.0 (2.33kb)  | `nicega.min.js`   | `sha512-Gyt9WuZpL7XQ9W4toymzrcMR2BJJrs8ubK6n4NxvGFak4GvGSrrtfigK3ddt0e4E3WK87ySnKhHKoZxLSgpwcQ==` | `https://cdn.jsdelivr.net/gh/douile/nice-google-analytics@1.0/src/nicega.min.js`
| 1.0          | `nicega.min.css`  | `sha512-36lAgmhNoaCsrUsya6wyv2PrMtVbA77Cy+6mOWyLCq6orMAr6kSVPM6N18ZPD/p+17saP9kVVjFlMhkd0c0Jyw==` | local (see generatecss.sh)
