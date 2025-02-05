import { NextResponse } from "next/server";

const API_URL = "http://localhost:3001/posts";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${API_URL}/${params.id}`);
  if (res.status === 404) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  const post = await res.json();
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  if (!data.title || !data.author || !data.content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const res = await fetch(`${API_URL}/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const updatedPost = await res.json();
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await fetch(`${API_URL}/${params.id}`, {
    method: "DELETE",
  });
  return NextResponse.json({ message: "Post deleted" });
}
