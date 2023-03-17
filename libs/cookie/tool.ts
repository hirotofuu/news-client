import { parseCookies, setCookie, destroyCookie } from 'nookies'
import nookies from 'nookies'
import { GetServerSideProps } from 'next'
import { NextPageContext } from 'next';

export function printCookie(ctx?: NextPageContext) {
    const cookie = parseCookies(ctx);
    return cookie.accessToken // { accessToken: 'test1234' }
}

export const getcookies: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context)
    return cookies
  }