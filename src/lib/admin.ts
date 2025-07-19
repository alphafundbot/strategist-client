
import * as admin from 'firebase-admin';

// This is a placeholder for the actual service account JSON contents.
// In a real environment, this would be loaded from a secure location.
const serviceAccount = process.env.SERVICE_ACCOUNT_KEY_JSON 
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY_JSON)
  : {
      type: "service_account",
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: "YOUR_PRIVATE_KEY_ID",
      private_key: "YOUR_PRIVATE_KEY",
      client_email: `firebase-adminsdk-xxxxx@${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
      client_id: "YOUR_CLIENT_ID",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`
    };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:  `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

export { adminAuth, adminDb };
