import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    redirect: async () => {
      return Promise.resolve("/profile");
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isUser = user ? true : false;
      if (isUser) {
        token.id = user.id;
        return Promise.resolve(token);
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: process.env.MONGODB_URI,
};

export default (req, res) => NextAuth(req, res, options);
