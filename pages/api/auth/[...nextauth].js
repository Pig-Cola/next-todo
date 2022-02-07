import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorization: {
        url: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}`,
        params: { scope: 'profile_nickname', prompt: 'login' },
      },
    }),
  ],
  debug: true,
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
