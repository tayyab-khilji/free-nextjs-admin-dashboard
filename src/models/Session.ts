import mongoose from 'mongoose';

export interface ISession {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema<ISession>(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema); 