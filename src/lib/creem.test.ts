import crypto from "crypto";
import { describe, expect, it } from "vitest";
import { verifyCreemSignature } from "@/lib/creem";

describe("verifyCreemSignature", () => {
  it("returns true for a valid signature", () => {
    const body = JSON.stringify({ type: "checkout.completed" });
    const secret = "test-secret";
    const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    expect(verifyCreemSignature(body, signature, secret)).toBe(true);
  });

  it("returns false for an invalid signature", () => {
    expect(verifyCreemSignature("{}", "bad", "test-secret")).toBe(false);
  });
});
