import { connectDb } from "@/dbConfig/config";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    //connect db
    await connectDb();

    //make request to helper function
    const id = await getDataFromToken(request);

    //find user in db
    const user = await User.findOne({ _id: id }).select("-password");
    return NextResponse.json({
      message: "user found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
