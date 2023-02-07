import { atom, useRecoilState } from 'recoil';

type UserState = { id: number, secret_id: string, name: string } | null;

const userState = atom<UserState>({
  key: 'user',
  default: {id: null, secret_id: null, name: null},
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState<UserState>(userState);

  return { user, setUser };
};