#!/bin/sh

# Create base64 and integrity hash for css

B64=$(cleancss ./src/nicega.css | openssl base64 -A)
INTEGRITY=$(echo $B64 | openssl dgst -sha512 -binary | openssl base64 -A)

echo "Base64"
echo "$B64"

echo "Integrity"
echo "sha512-$INTEGRITY"
