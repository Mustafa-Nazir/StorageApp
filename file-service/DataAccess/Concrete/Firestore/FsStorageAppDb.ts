import admin from "firebase-admin";
import serviceAccount  from "../../../firebase-adminsdk.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  });

const FsStorageAppDb = admin.firestore();

export default FsStorageAppDb;