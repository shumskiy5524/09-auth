import { api } from "../../api";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data } = await api.get(`/notes/${id}`);
  return Response.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data } = await api.delete(`/notes/${id}`);
  return Response.json(data);
}