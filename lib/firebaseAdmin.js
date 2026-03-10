import admin from "firebase-admin";

let app;

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "{}"
  );
  // Replace literal \n with actual newlines
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n"
    );
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      // Replace escaped \n with actual line breaks
      privateKey: serviceAccount.private_key?.replace(/\\n/g, "\n"),
    }),
  });
} else {
  app = admin.app();
}

export const firebaseAdmin = app;
export const fcm = admin.messaging();
