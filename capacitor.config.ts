import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell (Android / iOS). The web bundle is produced by `npm run build:cap`
 * (Next static export -> ./out) and copied into the native project by `cap sync`.
 *
 * Add platforms once (needs Android Studio / Xcode):
 *   npm i @capacitor/android @capacitor/ios
 *   npx cap add android && npx cap add ios
 */
const config: CapacitorConfig = {
  appId: "com.liftadvisor.app",
  appName: "LiftAdvisor",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  ios: { contentInset: "always" },
};

export default config;
