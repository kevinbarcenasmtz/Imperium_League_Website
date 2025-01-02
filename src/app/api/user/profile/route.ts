import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { connectDB } from "../../../../../lib/mongodb";
import { User } from "../../../../../models/User";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: {
          name,
          email,
          updatedAt: new Date() // Add this to trigger a session refresh
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to update user" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}