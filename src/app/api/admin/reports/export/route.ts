import { NextResponse } from "next/server";
import { getSessionToken } from "@/lib/session";

export async function GET() {
  const token = await getSessionToken();

  if (!token) {
    return NextResponse.json(
      { success: false, statusCode: 401, message: "Not authenticated", data: null },
      { status: 401 }
    );
  }

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL environment variable is not set");
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${apiUrl}/admin/reports/export`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, statusCode: 503, message: "Unable to reach the server.", data: null },
      { status: 503 }
    );
  }

  if (!upstream.ok) {
    const payload = await upstream.json().catch(() => null);
    return NextResponse.json(
      payload ?? {
        success: false,
        statusCode: upstream.status,
        message: "Couldn't export reports.",
        data: null,
      },
      { status: upstream.status }
    );
  }

  const csv = await upstream.text();

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        upstream.headers.get("content-disposition") ?? 'attachment; filename="admin-reports.csv"',
    },
  });
}
