# Grocery Check Assistant

A React Native / Expo grocery companion app adapted from the original Project4M1 project.

## Features
- Scan EAN-13, EAN-8, UPC-A, UPC-E and Code 128 barcodes using the camera.
- Manually enter a barcode if the camera is unavailable.
- Look up product details, product image, ingredients and available nutrition values from the free Open Food Facts API.
- Add scanned products or custom items to a shopping list.
- Check off items with haptic feedback, search the list, remove items and clear completed items.
- Record, save, play and delete voice reminders for grocery substitutions.
- Persist the shopping list and voice-note metadata using AsyncStorage.

## Run the app
Use Node.js LTS, then from this folder run:

```bash
npm install --legacy-peer-deps
npx expo install --fix
npx expo start
```

Scan the QR code with Expo Go on a physical device. Camera scanning and microphone recording require device permissions. An internet connection is required for product lookup.

## Data notes
Product information is provided by Open Food Facts and may be missing or community-submitted. Nutrition is displayed per 100 g / 100 ml when available. This project does not provide store-by-store price comparison because the public product lookup does not reliably provide live retail prices.

## Project structure
- `App.js` — tab navigation and shared grocery state provider
- `screens/GalleryScreen.js` — shopping list and manual item entry
- `screens/CameraScreen.js` — barcode scanner and product details
- `screens/AlbumsScreen.js` — voice reminder recording and playback
- `context/GroceryContext.js` — shared list state and persistence
- `utils/ProductApi.js` — Open Food Facts API client
- `utils/VoiceNotes.js` — voice-note metadata persistence
