import { NextRequest, NextResponse } from 'next/server';


type Props = {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  context: Props 
) {

  const { id } = await context.params;

 
  return NextResponse.json({ message: `Note ${id} found` });
}