import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from "./useCurrentUser"

export function useMypageRoute(user_id: string) {
  const {isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();
  
  useEffect(()=>{
    if(isAuthChecking) return; // まだ確認中
    if(!currentUser) return; // まだ確認中
    if(currentUser.id==user_id)router.push("/mypage/articles")
  },[isAuthChecking, currentUser])
}

export function useIsMyInfoPage(user_id: string) {
  const {isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();
  
  useEffect(()=>{
    if(isAuthChecking) return ; // まだ確認中
    if(!currentUser || currentUser.id!=user_id) router.push("/"); // まだ確認中
  },[isAuthChecking, currentUser])
}