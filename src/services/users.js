import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { users } from '../usersMock';

const USER_DOCUMENT = 'users';

const userRef = collection(db, USER_DOCUMENT);

export const setInitialData = () => {
  users.forEach((user) => {
    setDoc(doc(userRef), user);
  });
};

export const getAll = () => {
  const users = [];
  return getDocs(userRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return users;
    })
    .catch(console.error);
};

export const search = ({ attribute, value, pagination = 10 }) => {
  return getAll()
    .then((users) => {
      return users
        .filter((user) => user[attribute]?.toLowerCase().includes(value.toLowerCase()))
        .slice(0, pagination);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const exist = ({ attribute, value }) => {
  const q = query(userRef, where(attribute, '==', value));

  return getDocs(q)
    .then((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => users.push(doc.data()));
      return Boolean(users.length);
    })
    .catch(() => false);
};

export const create = (user) => {
  return exist({ attribute: 'nit', value: user.nit })
    .then((exist) => {
      if (exist) throw new Error(`El usuario con nit ${user.nit} ya existe`);
      return setDoc(doc(userRef), user)
        .then((res) => res)
        .catch((err) => err);
    })
    .catch((err) => {
      throw err;
    });
};
