import mongoose from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string; // For credential authentication
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Password is optional because users might sign in with OAuth providers
      required: false,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from creating the model multiple times
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 