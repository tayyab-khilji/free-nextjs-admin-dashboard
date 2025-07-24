import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

// GET: Fetch all users (for admin purposes)
export async function GET() {
  try {
    await dbConnect()
    const users = await User.find({}).select("-password") // Exclude passwords
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

// POST: Create a new user or seed demo users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await dbConnect()

    // Handle seeding demo users
    if (body.action === "seed") {
      // Check if admin user already exists
      const existingAdmin = await User.findOne({ email: "admin@example.com" })
      if (existingAdmin) {
        return NextResponse.json({ 
          message: "Demo users already exist",
          users: ["admin@example.com", "demo@example.com"]
        })
      }

      // Create demo users
      const hashedPassword = await bcrypt.hash("password", 10)
      const demoHashedPassword = await bcrypt.hash("demo", 10)

      const adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
      })

      const demoUser = await User.create({
        name: "Demo User", 
        email: "demo@example.com",
        password: demoHashedPassword,
      })

      return NextResponse.json({ 
        message: "Demo users created successfully",
        users: [
          { id: adminUser._id, email: adminUser.email, name: adminUser.name },
          { id: demoUser._id, email: demoUser.email, name: demoUser.name }
        ]
      })
    }

    // Handle creating a new user
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject()
    return NextResponse.json({ 
      message: "User created successfully",
      user: userWithoutPassword
    })

  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
} 