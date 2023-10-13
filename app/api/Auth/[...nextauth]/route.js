import NextAuth from "next-auth"
//openssl rand -base64 32  use that to generate open ssl secret
const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }