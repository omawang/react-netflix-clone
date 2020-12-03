import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// your config
const config = {};

const firebase = Firebase.initializeApp(config);

export { firebase };
