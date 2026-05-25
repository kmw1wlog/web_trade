import { describe, expect, it } from "vitest";
import { getKeywordDestination, getResourceByKeyword } from "@/lib/resources";

describe("resource keyword mapping", () => {
  it("maps 조건 to condition-note", () => {
    expect(getResourceByKeyword("조건")?.slug).toBe("condition-note");
  });

  it("maps 색상 to color-setting", () => {
    expect(getResourceByKeyword("색상")?.slug).toBe("color-setting");
  });

  it("maps unknown keyword to /free", () => {
    expect(getKeywordDestination("없는키워드")).toBe("/free");
  });
});
