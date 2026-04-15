import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "test@test.com",
    username: "User",
    avatar: "https://ac.goit.global/avatar.jpg",
  });
}