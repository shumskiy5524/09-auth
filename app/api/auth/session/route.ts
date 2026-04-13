import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    user: {
      email: "test@example.com",
    },
  });
}