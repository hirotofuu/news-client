import { setCookie, destroyCookie, nookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';

export function setCookiee(ctx?: GetServerSidePropsContext, pass?: string | string[]) {
  setCookie(ctx, 'uid', pass, {
    maxAge: 15 * 24 * 60 * 60,
    sameSite:'strict',
    httpOnly:true,
    secure: true,
    path: '/',
  })
}

// ついでにcookie削除(動作確認してません)
export function destroyCookiee(ctx?: GetServerSidePropsContext) {
    destroyCookie(ctx, 'uid')
}