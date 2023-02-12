import { atom, useRecoilState } from 'recoil';

type UserState = { id: number, name: string, api_token: string } | null;

const userState = atom<UserState>({
  key: 'user',
  default: {id: null, name: null, api_token: null},
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState<UserState>(userState);

  return { user, setUser };
};