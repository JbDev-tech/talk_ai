import { createHash } from "node:crypto";

export function toNamespace(url: string) {
  return createHash("sha256").update(url).digest("hex").slice(0, 32);
}