import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  return NextResponse.json({
    id: params.id,
    title: "Note",
    text: "Hello",
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  return NextResponse.json({
    message: `Deleted note ${params.id}`,
  });
}