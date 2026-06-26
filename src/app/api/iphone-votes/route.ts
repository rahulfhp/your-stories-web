import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API_URL = "https://emergence.mindefy.tech/api/api/iphone-votes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxyRequest(request: NextRequest) {
  const url = EXTERNAL_API_URL;
  const options: RequestInit = {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (request.method !== "GET") {
    const body = await request.text();
    options.body = body;
  }

  const response = await fetch(url, {
    ...options,
    cache: "no-store",
  });

  const data = await response.text();
  const contentType = response.headers.get("content-type") || "application/json";

  return new NextResponse(data, {
    status: response.status,
    headers: {
      "content-type": contentType,
    },
  });
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}
