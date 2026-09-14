import { readSubmissions } from "@/lib/submissions";

/**
 * CSV export for Excel. Protected by ADMIN_KEY.
 *   GET /api/submissions/export?key=...&kind=register|partnership
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const expected = process.env.ADMIN_KEY;
  if (!expected || key !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const kind = url.searchParams.get("kind");
  const rows = (await readSubmissions()).filter((s) => !kind || s.kind === kind);

  const cols = new Set<string>(["id", "kind", "receivedAt"]);
  rows.forEach((r) => Object.keys(r.data).forEach((k) => cols.add(k)));
  const header = [...cols];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    header.map((c) => (c in r.data ? r.data[c] : (r as unknown as Record<string, unknown>)[c])).map(esc).join(","),
  );
  // BOM so Excel opens Arabic correctly
  const csv = "﻿" + [header.join(","), ...lines].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions-${kind || "all"}.csv"`,
    },
  });
}
