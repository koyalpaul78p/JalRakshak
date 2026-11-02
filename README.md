# JalRakshak – Every Drop Matters 💧

JalRakshak is a mobile-friendly water-conservation learning app. It helps people build water-saving habits through practical tips, rainwater-harvesting information, a water-use calculator, interactive quizzes, and impact tracking.

## Features
- Home dashboard and daily water-saving challenge
- Practical water conservation tips
- Rainwater harvesting learning section
- Water-use calculator
- Interactive quiz with progress tracking
- English and Hindi language support
- Progressive Web App (PWA) support
- Android WebView project for building an APK with GitHub Actions

## Web app files
- `index.html` – app page structure
- `style.css` – design and responsive layout
- `script.js` – app interactions, quiz, language and progress logic
- `manifest.webmanifest` – PWA configuration
- `sw.js` – service worker and offline caching
- `icon.svg` – app icon

## Build Android APK
This repository also contains an Android project in the `app/` folder and a GitHub Actions workflow at `.github/workflows/build-apk.yml`.

1. Open the **Actions** tab in this GitHub repository.
2. Select **Build JalRakshak APK**.
3. Tap **Run workflow** (or push to the `main` branch to trigger it).
4. When the run finishes, open the run and download the `JalRakshak-debug-APK` artifact.
5. Extract the downloaded ZIP and install `app-debug.apk` on your Android phone.

## Run as a website / PWA
Upload the root web files to a static web host using HTTPS. Then open the hosted site in a supported browser and use its install option if available.

## Notes
- The Android app loads the local website files from `app/src/main/assets/`. Keep those copies in sync with the root web files when making changes.
- Some decorative photographs are loaded from the internet and need a connection.
- The APK produced by the workflow is a debug build, suitable for testing and personal installation, not a signed Play Store release.
