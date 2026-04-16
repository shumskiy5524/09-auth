import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      title: "Test note",
      content: "Hello world",
    },
  ]);
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    id: Date.now().toString(),
    ...body,
  });
}