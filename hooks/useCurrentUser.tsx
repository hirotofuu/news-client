import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState } from '../atoms/userAtom'

export function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserState); // グローバルステートからcurrentUserを取り出す
  const setCurrentUser = useSetRecoilState(currentUserState);
  const isAuthChecking = currentUser === undefined; // ログイン情報を取得中かどうか

  return {
    currentUser,
    isAuthChecking,
    setCurrentUser
  };
}