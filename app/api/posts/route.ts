import { NextResponse } from "next/server";

const API_URL = "http://localhost:3001/posts";

export async function GET() {
  const res = await fetch(API_URL);
  const posts = await res.json();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.title || !data.author || !data.content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const post = await res.json();
  return NextResponse.json(post, { status: 201 });
}
