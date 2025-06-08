import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export function initFirebase() {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return null
  }
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }
  const app = getApps().length ? getApp() : initializeApp(config)
  const db = getFirestore(app)
  const auth = getAuth(app)
  return { app, db, auth }
}
