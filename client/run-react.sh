#!/bin/bash

APP_NAME="react-client"
PORT=3000

echo "🛑 Zabijam procesy na porcie $PORT..."
fuser -k ${PORT}/tcp

echo "🏗️ Buduję aplikację React..."
npm run build

echo "🚀 Uruchamiam aplikację przez PM2..."
pm2 delete $APP_NAME
pm2 start npm --name "$APP_NAME" -- start

echo "✅ Gotowe! Aplikacja działa na porcie $PORT"
