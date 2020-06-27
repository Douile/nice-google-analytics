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
<script src="" async="" defer=""></script>
```

## Example
View the example [here](example.html)

## Security
### CSP
Below is a list of the sources you need to add to your CSP (_if you use it_)

Compliant with the license you may copy this script to your own domain, meaning you do not need the `raw.githubusercontent.com` script-src

**default-src**
- `www.googletagmanager.com`

**script-src**
- `www.googletagmanager.com`
- `www.google-analytics.com`
- `raw.githubusercontent.com`

**style-src**
- `'self'`
- `'data'`
- _You could also you the integrity for `nicega.min.css` here_

### Integrity
Below is a list of integrity hashes for the various scripts and versions

| Version | Script | Integrity | URL |
| :-----: | :----- | :-------- | :-- |
| 1.0     | `nicega.js` | `sha512-iLHBHF8Qkw52WEKQftHBvakKUqWXGGaAcohLDehDJsqJPjOilV3jH7cdzD4RvCg0cJclkKy2sQ8toU3aPdcWdg=`
| 1.0     | `nicega.min.js` | `sha512-Gyt9WuZpL7XQ9W4toymzrcMR2BJJrs8ubK6n4NxvGFak4GvGSrrtfigK3ddt0e4E3WK87ySnKhHKoZxLSgpwcQ==`
| 1.0     | `nicega.min.css` | `sha512-36lAgmhNoaCsrUsya6wyv2PrMtVbA77Cy+6mOWyLCq6orMAr6kSVPM6N18ZPD/p+17saP9kVVjFlMhkd0c0Jyw==`
