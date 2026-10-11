# App Store Assets Guide
From Activity 12: Deploy Ready

## Required Screenshots

### iOS Screenshots
Create screenshots for these device sizes:

1. **iPhone 6.7" Display** (iPhone 14 Pro Max, 15 Pro Max)
   - Size: 1290 x 2796 pixels
   - Required: Minimum 1 screenshot

2. **iPhone 6.5" Display** (iPhone 11 Pro Max, XS Max)
   - Size: 1284 x 2778 pixels
   - Required: Minimum 1 screenshot

3. **iPad Pro 12.9" Display** (3rd/4th/5th gen)
   - Size: 2048 x 2732 pixels
   - Required: Minimum 1 screenshot

### Android Screenshots
Create screenshots for these device sizes:

1. **Phone** (most common)
   - Size: 1080 x 1920 pixels
   - Required: Minimum 2 screenshots

2. **7-inch Tablet**
   - Size: 1200 x 1920 pixels
   - Optional but recommended

3. **10-inch Tablet**
   - Size: 1600 x 2560 pixels
   - Optional but recommended

## Screenshot Content

Your screenshots should showcase:
1. **Main screen** - Gallery with photos
2. **Camera screen** - Capture interface
3. **Albums screen** - Organization features
4. **Key features** - Performance, testing, optimization
5. **Portfolio features** (if added)

## Tips for Great Screenshots

### Do:
- ✅ Show actual app content (real photos, not placeholders)
- ✅ Use high-quality images
- ✅ Highlight key features
- ✅ Keep UI clean and professional
- ✅ Use consistent design language
- ✅ Add text overlays to explain features (optional)

### Don't:
- ❌ Use lorem ipsum or fake data
- ❌ Include status bars with low battery/poor signal
- ❌ Show debug information or console logs
- ❌ Use outdated or blurry images
- ❌ Include personal information

## How to Capture Screenshots

### iOS
```bash
# 1. Run app on simulator
npm run ios

# 2. Choose device (e.g., iPhone 15 Pro Max)
# 3. Navigate to screen you want to capture
# 4. Press Cmd+S to save screenshot
# 5. Find screenshot on Desktop
```

### Android
```bash
# 1. Run app on emulator
npm run android

# 2. Navigate to screen you want to capture
# 3. Use emulator's screenshot tool
# 4. Or use adb: adb shell screencap -p /sdcard/screenshot.png
```

## App Icon Requirements

### iOS
- Size: 1024 x 1024 pixels
- Format: PNG (no transparency)
- Location: `assets/icon.png`

### Android
- Size: 1024 x 1024 pixels (adaptive icon)
- Format: PNG
- Location: `assets/adaptive-icon.png`

## Feature Graphic (Android Only)
- Size: 1024 x 500 pixels
- Format: PNG or JPG
- Purpose: Shown in Google Play Store featured section

## Promotional Materials (Optional)

### App Preview Video (iOS)
- Length: 15-30 seconds
- Format: M4V, MOV, or MP4
- Shows app in action

### Promotional Video (Android)
- Length: Up to 2 minutes
- Format: YouTube video URL
- Shows app features

## Checklist

- [ ] All required iOS screenshots created
- [ ] All required Android screenshots created
- [ ] App icon (1024x1024) created
- [ ] Splash screen (2048x2048) created
- [ ] Feature graphic created (Android)
- [ ] All images are high quality
- [ ] No personal information visible
- [ ] Screenshots show real app content
- [ ] Consistent design across all images

## Tools for Creating Assets

- **Screenshot Design**: Figma, Canva, Adobe XD
- **Icon Design**: Figma, Sketch, Adobe Illustrator
- **Image Editing**: Photoshop, GIMP, Pixelmator
- **Screenshot Mockups**: Previewed.app, Rotato, MockuPhone

---

**TODO FOR STUDENTS:**
1. Capture screenshots of your working app
2. Edit screenshots to look professional
3. Create app icon and splash screen
4. Organize all assets in this folder
5. Upload to App Store Connect / Google Play Console

<!-- claude-template-fix: readme-v3 -->
