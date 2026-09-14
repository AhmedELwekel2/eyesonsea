import { NextResponse } from "next/server";
import { appendSubmission, type SubmissionKind } from "@/lib/submissions";

const MAX_LEN = 2000;

const REQUIRED: Record<SubmissionKind, string[]> = {
  register: ["name", "phone", "email", "city", "type"],
  partnership: ["name", "org", "title", "email", "phone", "type"],
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const kind = body.kind as SubmissionKind;
  if (kind !== "register" && kind !== "partnership") {
    return NextResponse.json({ ok: false, error: "bad kind" }, { status: 400 });
  }
  // honeypot: bots fill hidden fields
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string | boolean> = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === "kind" || k === "website") continue;
    if (typeof v === "boolean") data[k] = v;
    else if (typeof v === "string") data[k] = v.trim().slice(0, MAX_LEN);
  }
  for (const f of REQUIRED[kind]) {
    if (!data[f]) return NextResponse.json({ ok: false, error: `missing ${f}` }, { status: 400 });
  }
  if (!data.privacy) return NextResponse.json({ ok: false, error: "privacy consent required" }, { status: 400 });

  await appendSubmission({
    id: crypto.randomUUID(),
    kind,
    receivedAt: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    data,
  });
  return NextResponse.json({ ok: true });
}
