import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VoteStore = { totalVotes: number; users: string[] };

const votesFilePath = process.env.VOTE_FILE_PATH || path.join("/tmp", "ios-votes.json");
let memoryStore: VoteStore = { totalVotes: 0, users: [] };

function normalizeVotes(data: unknown): VoteStore {
  if (!data || typeof data !== "object") {
    return { totalVotes: 0, users: [] };
  }

  const record = data as Partial<VoteStore>;
  const users = Array.isArray(record.users) ? record.users.filter((id): id is string => typeof id === "string") : [];

  return {
    totalVotes: typeof record.totalVotes === "number" ? record.totalVotes : users.length,
    users,
  };
}

async function readVotes(): Promise<VoteStore> {
  try {
    await fs.mkdir(path.dirname(votesFilePath), { recursive: true });
    const fileContents = await fs.readFile(votesFilePath, "utf8");
    const parsed = normalizeVotes(JSON.parse(fileContents));
    memoryStore = parsed;
    return parsed;
  } catch (error) {
    return memoryStore;
  }
}

async function writeVotes(data: VoteStore) {
  try {
    await fs.mkdir(path.dirname(votesFilePath), { recursive: true });
    await fs.writeFile(votesFilePath, JSON.stringify(data, null, 2), "utf8");
    memoryStore = data;
  } catch (error) {
    memoryStore = data;
  }
}

export async function GET() {
  const data = await readVotes();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const userId = body && typeof body === "object" && "userId" in body ? (body as { userId?: unknown }).userId : undefined;

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
