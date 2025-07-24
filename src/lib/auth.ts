import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "./mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await dbConnect()
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email })
          
          if (!user || !user.password) {
            return null
          }
          
          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string, 
            user.password
          )
          
          if (!isPasswordValid) {
            return null
          }
          
          // Return user object (password field excluded for security)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt", // Use JWT for credentials provider
  },
  secret: process.env.NEXTAUTH_SECRET,
}) 