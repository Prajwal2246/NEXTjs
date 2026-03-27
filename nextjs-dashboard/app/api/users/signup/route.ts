import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/dbConfig/config";
import userService from "@/services/userService";

await connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    if (!username) throw new Error("username is required");

    const newUser = await userService.signup({ username, email, password });

    return NextResponse.json(
      { data: { message: "new user created successfully", newUser: newUser } },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
