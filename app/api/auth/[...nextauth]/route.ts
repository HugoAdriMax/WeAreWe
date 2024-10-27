import NextAuth, { SessionStrategy, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials.username === validUsername &&
          credentials.password === validPassword
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@tolly.fr"
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/cms/login',  // Page de connexion personnalisée
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60, // Durée de session : 24 heures
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Empêche les boucles de redirection vers /cms/login
      if (url.includes('/cms/login')) {
        return baseUrl;  // Redirige vers la page d'accueil
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: process.env.NEXTAUTH_DEBUG === 'true',
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
