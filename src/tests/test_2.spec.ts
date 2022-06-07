import { compute } from "../app";

describe("Should output Should output string as it is if string isn't 3 or 5 or 7", () => {
  it("Get the string 2 as input", () => {
    expect(compute("2")).toBe("2");
  });
});
