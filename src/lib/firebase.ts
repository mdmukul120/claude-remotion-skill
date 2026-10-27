import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storageBucket = firebaseConfig.storageBucket;
export const projectId = firebaseConfig.projectId;

// Validate Connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'remotion_assets', 'connection_probe'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: offline or initializing.');
    }
  }
}
testConnection();
