# Assets Directory

## Required Files

### App Icon
- **File**: `icon.png`
- **Size**: 1024 x 1024 pixels
- **Format**: PNG (no transparency)
- **Purpose**: Used for both iOS and Android app icons

### Splash Screen
- **File**: `splash.png`
- **Size**: 2048 x 2048 pixels
- **Format**: PNG
- **Purpose**: Loading screen shown when app launches

### Adaptive Icon (Android)
- **File**: `adaptive-icon.png`
- **Size**: 1024 x 1024 pixels
- **Format**: PNG
- **Purpose**: Android adaptive icon (can have transparency)

### Favicon (Web)
- **File**: `favicon.png`
- **Size**: 48 x 48 pixels
- **Format**: PNG
- **Purpose**: Used when running app in web browser

## Creating Your Assets

### Using Design Tools
- **Figma**: Free, web-based design tool
- **Canva**: Easy-to-use template-based design
- **Adobe Illustrator**: Professional vector design
- **Sketch**: Mac-only design tool

### Design Guidelines

#### App Icon
- Keep it simple and recognizable
- Use 2-3 colors maximum
- Avoid text (icon should work at small sizes)
- Test on different backgrounds
- Follow platform guidelines:
  - iOS: Rounded corners applied automatically
  - Android: Can use adaptive icon layers

#### Splash Screen
- Center your logo/icon
- Use your brand colors
- Keep it simple (users see it briefly)
- Ensure it looks good on all device sizes

### Quick Start (Placeholder Icons)

If you need temporary icons while developing:

1. Use [Icon Kitchen](https://icon.kitchen/) - Generate icons quickly
2. Use [App Icon Generator](https://appicon.co/) - Upload image, get all sizes
3. Use Expo's default icons (already in template)

### Testing Your Assets

```bash
# Clear cache and rebuild
npm start --clear

# Check how icons look on device
npm run ios
npm run android
```

## File Checklist

- [ ] icon.png (1024x1024)
- [ ] splash.png (2048x2048)
- [ ] adaptive-icon.png (1024x1024)
- [ ] favicon.png (48x48)
- [ ] All images are optimized (compressed)
- [ ] Icons tested on both iOS and Android
- [ ] Splash screen tested in production mode

---

**TODO FOR STUDENTS:**
1. Design your app icon (represents your app)
2. Create splash screen (shown on launch)
3. Test icons on real devices
4. Update if needed based on feedback

<!-- claude-template-fix: readme-v3 -->
