import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const pathname = req.nextUrl.pathname;

      if (
        pathname.startsWith("/conteudista/login") ||
        pathname.startsWith("/conteudista/cadastro")
      ) {
        return true;
      }

      return !!token;
    },
  },
  pages: {
    signIn: "/conteudista/login",
  },
});

export const config = {
  matcher: ["/conteudista/:path*"],
};
