import { NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function GET(
  request: Request,
  { params }: Props
) {
  return NextResponse.json({
    id: params.id,
    title: "Note",
    content: "Hello",
    tag: "todo",
    createdAt: new Date().toISOString(),
  });
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  return NextResponse.json({
    message: `Note ${params.id} deleted`,
  });
}