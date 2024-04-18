import admin from "firebase-admin";
import serviceAccount  from "../../../firebase-adminsdk.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    storageBucket: process.env.STORAGE_BUCKET || ""
  });

const FsStorageAppDb = admin.firestore();
export const FsStorageBucket = admin.storage().bucket();

export default FsStorageAppDb;