import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const votesFilePath = path.join(process.cwd(), "data", "ios-votes.json");

async function readVotes() {
  try {
    await fs.mkdir(path.dirname(votesFilePath), { recursive: true });
    const fileContents = await fs.readFile(votesFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    return { totalVotes: 0, users: [] };
  }
}

async function writeVotes(data: { totalVotes: number; users: string[] }) {
  await fs.mkdir(path.dirname(votesFilePath), { recursive: true });
  await fs.writeFile(votesFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  const data = await readVotes();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body?.userId;

  if (!userId || typeof userId !== "string") {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const data = await readVotes();
  const users = Array.isArray(data.users) ? data.users : [];

  if (users.includes(userId)) {
    return NextResponse.json({
      totalVotes: users.length,
      userVoted: true,
      users,
    });
  }

  const updatedUsers = [...users, userId];
  const updatedData = {
    totalVotes: updatedUsers.length,
    users: updatedUsers,
  };
  await writeVotes(updatedData);

  return NextResponse.json({
    totalVotes: updatedUsers.length,
    userVoted: true,
    users: updatedUsers,
  });
}
