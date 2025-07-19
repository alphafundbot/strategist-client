
import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app';

const serviceAccount = process.env.SERVICE_ACCOUNT_KEY_JSON 
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY_JSON)
  : {};

const appName = 'firebase-admin-app';

let app: App;
if (getApps().find(a => a.name === appName)) {
  app = getApp(appName);
} else {
  app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL:  `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  }, appName);
}

export { app };
