{
  "name": "SkitterTV",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "defaultenvconfig": "node prebuild/scripts/defaultenvconfig.js",
    "bundle": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res",
    "prebuild": "node prebuild/scripts/prescript.js",
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "git config core.hooksPath ./env/hooks && jest",
    "react-devtools": "react-devtools",
    "sourcemaps": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-release.bundle --sourcemap-output android-release.bundle.map && bugsnag-sourcemaps upload --api-key 49a7ea8cffdfd3ff1290ecb8770ce656 --app-version 1.0 --minified-file android-release.bundle --source-map android-release.bundle.map --minified-url index.android.bundle --upload-sources --overwrite",
    "patch": "node node_modules/react-native-text-gradient/patch-rn.js",
    "postinstall": "node node_modules/react-native-text-gradient/patch-rn.js"
  },
  "dependencies": {
    "axios": "^0.19.0",
    "bugsnag-react-native": "^2.21.0",
    "bugsnag-sourcemaps": "^1.2.1",
    "moment": "^2.20.1",
    "prop-types": "^15.6.0",
    "pusher-js": "^4.4.0",
    "react": "16.8.6",
    "react-devtools": "^3.6.1",
    "react-native": "0.59.5",
    "react-native-animatable": "^1.2.4",
    "react-native-device-info": "^1.6.2",
    "react-native-fast-image": "^5.2.0",
    "react-native-gesture-handler": "^1.2.1",
    "react-native-keychain": "^3.1.1",
    "react-native-keyevent": "^0.1.1",
    "react-native-linear-gradient": "^2.4.0",
    "react-native-open-settings": "^1.0.1",
    "react-native-progress": "^3.6.0",
    "react-native-stars": "^1.1.4",
    "react-native-svg": "^7.0.2",
    "react-native-text-gradient": "^0.1.4",
    "react-native-vector-icons": "6.0.2",
    "react-native-video": "4.3.0",
    "react-navigation": "^3.9.1",
    "react-redux": "^7.0.3",
    "redux": "^4.0.1",
    "redux-devtools-extension": "^2.13.8",
    "redux-thunk": "^2.2.0",
    "skitter-video": "git+https://skittertv:B,pk8F9>GU9KJz92@bitbucket.org/eschopler/skitter-video.git"
  },
  "devDependencies": {
    "@babel/core": "^7.4.3",
    "@babel/runtime": "^7.4.3",
    "babel-jest": "^24.7.1",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "jest": "^24.7.1",
    "metro-react-native-babel-preset": "^0.53.1",
    "react-dom": "^16.3.1",
    "react-test-renderer": "16.8.3",
    "redux-mock-store": "^1.5.1"
  },
  "jest": {
    "preset": "react-native",
    "transformIgnorePatterns": [
      "node_modules/(?!(react-native|react-native-vector-icons|react-native-animatable|react-native-video|react-navigation|react-native-safe-area-view|react-native-linear-gradient|rn-fetch-blob)/)"
    ],
    "collectCoverage": true,
    "testEnvironment": "jsdom",
    "verbose": true,
    "testURL": "http://localhost/",
    "globals": {
      "window": true
    }
  },
  "rnpm": {
    "assets": [
      "assets/fonts"
    ]
  }
}