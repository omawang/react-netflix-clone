import { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../contexts/firebase';

export default function useContent(target) {
  const { firebase } = useContext(FirebaseContext);

  const [content, setContent] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(target)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((item) => ({
          ...item.data(),
          docId: item.id,
        }));

        setContent(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return { [target]: content };
}
