import { atom, useRecoilState } from 'recoil';
import { User } from '../types/user'; 
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


export const currentPassState = atom<string | null>({
  key: 'currentPass',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
