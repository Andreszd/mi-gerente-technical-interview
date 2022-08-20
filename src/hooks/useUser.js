import { useState } from 'react';
import { create, search } from '../services/users';

export const useUser = () => {
  const [isLoading, setLoading] = useState(false);

  const searchUser = ({ attribute, value, pagination = 10 }) => {
    setLoading(true);
    return search({ attribute, value, pagination })
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const createUser = (user) => {
    setLoading(true);
    return create(user)
      .then((res) => res)
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };

  return { isLoading, searchUser, createUser };
};
