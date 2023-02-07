import { useUserState } from '../atoms/userAtom';
import axios from '../libs/axios';

export const useAuth = () => {
  const { user, setUser } = useUserState();


  const checkLoggedIn = async (): Promise<boolean> => {
    if (user.id && user.name) {
      return true;
    }

    try {
      const res = await axios.get('/api/user');

      if (!res.data.data) {
        return false;
      }

      setUser(res.data.data);
      return true;
    } catch {

      return false;
    }
  };

  return { checkLoggedIn };
};