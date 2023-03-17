import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState } from '../atoms/userAtom'
import {useCurrentUser} from '../hooks/useCurrentUser' 
import { fetchCurrentUser } from '../libs/account';
export function useGetUserinfo() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const { currentUser } = useCurrentUser();
  const getUserinfo=async(index: string)=>{
    if(!currentUser && index){
    try {
      const currentUser  = await fetchCurrentUser(index); 
      setCurrentUser(currentUser);
      return;
    } catch {
      setCurrentUser(null);
    }

}
  }
return {getUserinfo}
}