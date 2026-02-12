import { describe, expect, it } from "vitest";
import { clamp } from "../clamp";

describe("clamp", () => {
  it("returns min when value is below range", () => {
    expect(clamp(-10, 0, 5)).toBe(0);
  });

  it("returns max when value is above range", () => {
    expect(clamp(20, 0, 5)).toBe(5);
  });

  it("returns the value when already in range", () => {
    expect(clamp(3, 0, 5)).toBe(3);
  });
});
