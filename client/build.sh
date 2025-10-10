#!/bin/bash
# Build script for Vercel deployment

echo "Installing dependencies..."
npm install

echo "Building React app..."
npm run build

echo "Build completed successfully!"
ls -la build/
