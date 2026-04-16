import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  return NextResponse.json({
    id,
    title: "Note",
    content: "Hello",
    tag: "general",
    createdAt: new Date().toISOString(),
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  return NextResponse.json({
    message: `Note ${id} deleted`,
  });
}