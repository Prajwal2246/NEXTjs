import { connectDb } from "@/dbConfig/config";
import userService from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const reqBody = await request.json();
    const { email, password } = reqBody;
    if (!email) throw new Error("email is required");
    if (!password) throw new Error("password is required");

    const res = await userService.login({ email, password });
    return res;
  } catch (error: any) {
    console.log("EXACT ERROR >>>", error.message); // ✅ add this line
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
