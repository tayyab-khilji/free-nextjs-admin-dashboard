import mongoose from 'mongoose';

export interface IAccount {
  _id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new mongoose.Schema<IAccount>(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
    },
    access_token: {
      type: String,
    },
    expires_at: {
      type: Number,
    },
    token_type: {
      type: String,
    },
    scope: {
      type: String,
    },
    id_token: {
      type: String,
    },
    session_state: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for provider and providerAccountId
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export default mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema); 