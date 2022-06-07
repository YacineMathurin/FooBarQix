import { compute } from "../app";

describe("Should output string as it is if string isn't 3 or 5 or 7", () => {
  it("Get the string 1 as compute's input", () => {
    expect(compute("1")).toBe("1");
  });
});
