import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "✅ POST route working" });
}

export async function GET() {
  return NextResponse.json({ message: "✅ GET route working" });
}
