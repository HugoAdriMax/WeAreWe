import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/cms/login",  // Redirige vers /cms/login si non connecté
  },
});


export const config = {
  matcher: ["/cms/:path*"],  // Applique le middleware sur toutes les pages de /cms
};
