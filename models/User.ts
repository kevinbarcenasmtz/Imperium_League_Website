import mongoose, { Document } from 'mongoose';

// Define an interface for User document
interface IUser extends Document {
  email: string;
  name: string;
  password?: string;
  isOAuth: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: function(this: IUser): boolean {
      // Only require password for non-OAuth users
      return !this.isOAuth;
    },
    select: false,
  },
  isOAuth: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(_doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform: function(_doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Check if the model exists before creating a new one
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);