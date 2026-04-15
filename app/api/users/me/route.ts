import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "test@test.com",
    username: "User",
    avatar: "https://ac.goit.global/avatar.jpg",
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    email: "test@test.com",
    username: body.username || "User",
    avatar: "https://ac.goit.global/avatar.jpg",
  });
}