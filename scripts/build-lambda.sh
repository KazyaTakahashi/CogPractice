#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$ROOT_DIR/.lambda-build"
ZIP_PATH="$ROOT_DIR/lambda.zip"

rm -rf "$BUILD_DIR" "$ZIP_PATH"
mkdir -p "$BUILD_DIR"

cp "$ROOT_DIR/lambda.js" "$BUILD_DIR/"
cp -R "$ROOT_DIR/src" "$BUILD_DIR/src"

cat > "$BUILD_DIR/package.json" <<'JSON'
{
  "name": "cogpractice-lambda",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^7.5.0",
    "mongoose": "^9.8.1",
    "serverless-http": "^4.0.0"
  }
}
JSON

pushd "$BUILD_DIR" >/dev/null
npm install --omit=dev
zip -r "$ZIP_PATH" . -x "*.git*" -x "*.DS_Store" -x "*/node_modules/aws-sdk/*"
popd >/dev/null

echo "Created $ZIP_PATH"
