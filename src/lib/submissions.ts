import { promises as fs } from "fs";
import path from "path";

export type SubmissionKind = "register" | "partnership";

export interface Submission {
  id: string;
  kind: SubmissionKind;
  receivedAt: string;
  ip?: string;
  data: Record<string, string | boolean>;
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "submissions.jsonl");

export async function appendSubmission(s: Submission) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(FILE, JSON.stringify(s) + "\n", "utf8");
}

export async function readSubmissions(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return raw.split("\n").filter(Boolean).map((l) => JSON.parse(l) as Submission);
  } catch {
    return [];
  }
}
