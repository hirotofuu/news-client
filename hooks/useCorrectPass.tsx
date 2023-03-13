import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentPassState } from '../atoms/usePassAtom'

export function useCurrentPass() {
  const currentPass = useRecoilValue(currentPassState); // グローバルステートからcurrentUserを取り出す
  const setCurrentPass = useSetRecoilState(currentPassState);

  return {
    currentPass,
    setCurrentPass,
  };
}