import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { username, firstName, lastName, phone, email, password } = await request.json();

    if (!username || !firstName || !lastName || !phone || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user exists by email or username
    const userExists = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { username: username }
      ]
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      username,
      firstName,
      lastName,
      phone,
      email: email.toLowerCase(),
      password,
    });

    // Generate JWT
    const secret = process.env.JWT_SECRET || "default_secret_key";
    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "7d",
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
