import userService from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await userService.logout();
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
