import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const res = await axios.post('http://localhost:5000/api/auth/login', credentials, {withCredentials: true,});

        // const user = await response.json()

        console.log("response is: ", res.data);

      // If no error and we have user data, return it
        if (res.data) {
          return res.data;          
        } else return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session(session, user) {
      // Include the full user information in the session object
      console.log("1.session is: ", session);      
      session.user = {...user};
      console.log("2.session is: ", session);
      return session;
    },
    async redirect({url, baseUrl}) {

      console.log("Url is: ", url);
      console.log("BaseUrl is: ", baseUrl);

      return url.startsWith(baseUrl + '/login') ? baseUrl : url
    }  
  }
})

export { handler as GET, handler as POST }