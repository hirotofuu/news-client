import { setCookie, destroyCookie, nookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';

export function setCookiee(ctx?: GetServerSidePropsContext, pass?: string | string[]) {
  setCookie(ctx, 'accessToken', pass, {
    maxAge: 30 * 24 * 60 * 60,
    sameSite:'strict',
    httpOnly:true,
    path: '/',
  })
}

// ついでにcookie削除(動作確認してません)
export function destroyCookiee(ctx?: GetServerSidePropsContext) {
    destroyCookie(ctx, 'accessToken')
}