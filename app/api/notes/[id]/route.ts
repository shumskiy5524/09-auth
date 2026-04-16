import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  return NextResponse.json({
    id: params.id,
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
  return NextResponse.json({
    message: `Note ${params.id} deleted`,
  });
}