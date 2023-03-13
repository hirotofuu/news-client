import { atom, useRecoilState } from 'recoil';
import { User } from '../types/user'; 
import { recoilPersist } from 'recoil-persist'



export const currentUserState = atom< null | User>({
  key: 'currentUser',
  default: null,
});



