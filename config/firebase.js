import Firebase from 'firebase';
let config = {
  // its private :D :p

};
let app = Firebase.initializeApp(config);

export const db = app.database();
export const auth = app.auth();
export const storage = app.storage();
