#!/bin/sh

# Create base64 and integrity hash for css

css=$(cleancss -format "breaks:afterAtRule=on;space:beforeValue" ./src/nicega.css)
enc=$(echo -n "$css" | openssl base64 -A)
sha256=$(echo -n "$css" | openssl dgst -sha256 -binary | openssl base64 -A)
sha512=$(echo -n "$css" | openssl dgst -sha512 -binary | openssl base64 -A)

echo "Raw CSS"
echo "$css"

echo "Base64 CSS"
echo "$enc"

echo "Integrity"
echo "sha256-$sha256"
echo "sha512-$sha512"
