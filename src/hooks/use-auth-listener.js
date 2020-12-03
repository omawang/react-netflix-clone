import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../contexts/firebase';

export default function useAuthListenet() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    // CLEANUP
    return () => listener();
  }, []);

  return { user };
}
