import { Adapter } from "next-auth/adapters"
import dbConnect from "./mongodb"
import User from "@/models/User"
import Account from "@/models/Account"
import Session from "@/models/Session"
import VerificationToken from "@/models/VerificationToken"

export default function MongoDBAdapter(): Adapter {
  return {
    async createUser(data) {
      await dbConnect()
      const user = await User.create(data)
      return user.toObject()
    },

    async getUser(id) {
      await dbConnect()
      const user = await User.findById(id)
      return user ? user.toObject() : null
    },

    async getUserByEmail(email) {
      await dbConnect()
      const user = await User.findOne({ email })
      return user ? user.toObject() : null
    },

    async getUserByAccount({ provider, providerAccountId }) {
      await dbConnect()
      const account = await Account.findOne({ provider, providerAccountId })
      if (!account) return null
      
      const user = await User.findById(account.userId)
      return user ? user.toObject() : null
    },

    async updateUser(data) {
      await dbConnect()
      const user = await User.findByIdAndUpdate(data.id, data, { new: true })
      return user ? user.toObject() : null
    },

    async deleteUser(userId) {
      await dbConnect()
      await User.findByIdAndDelete(userId)
      await Account.deleteMany({ userId })
      await Session.deleteMany({ userId })
    },

    async linkAccount(data) {
      await dbConnect()
      const account = await Account.create(data)
      return account.toObject()
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await dbConnect()
      await Account.findOneAndDelete({ provider, providerAccountId })
    },

    async createSession(data) {
      await dbConnect()
      const session = await Session.create(data)
      return session.toObject()
    },

    async getSessionAndUser(sessionToken) {
      await dbConnect()
      const session = await Session.findOne({ sessionToken })
      if (!session) return null
      
      const user = await User.findById(session.userId)
      if (!user) return null
      
      return {
        session: session.toObject(),
        user: user.toObject(),
      }
    },

    async updateSession(data) {
      await dbConnect()
      const session = await Session.findOneAndUpdate(
        { sessionToken: data.sessionToken },
        data,
        { new: true }
      )
      return session ? session.toObject() : null
    },

    async deleteSession(sessionToken) {
      await dbConnect()
      await Session.findOneAndDelete({ sessionToken })
    },

    async createVerificationToken(data) {
      await dbConnect()
      const verificationToken = await VerificationToken.create(data)
      return verificationToken.toObject()
    },

    async useVerificationToken({ identifier, token }) {
      await dbConnect()
      const verificationToken = await VerificationToken.findOneAndDelete({
        identifier,
        token,
      })
      return verificationToken ? verificationToken.toObject() : null
    },
  }
} 