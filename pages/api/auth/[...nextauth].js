import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, NEXTAUTH_SECRET } from 'utill/dotenv'

export default NextAuth({
  debug: true,
  secret: NEXTAUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
      authorization: {
        url: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}`,
        params: { scope: 'profile_nickname', prompt: 'login' },
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 7, // 7 Day
    updateAge: 60 * 60 * 12, // 12 H
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 Day
  },
  callbacks: {
    // session({ session, token, user }) {
    //   return session
    // },
  },
  events: {},
  theme: {
    colorScheme: 'light',
  },
})
