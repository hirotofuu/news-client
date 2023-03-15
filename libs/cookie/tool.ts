import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { NextPageContext } from 'next';

export function printCookie(ctx?: NextPageContext) {
    const cookie = parseCookies(ctx);
    return cookie.accessToken // { accessToken: 'test1234' }
}

