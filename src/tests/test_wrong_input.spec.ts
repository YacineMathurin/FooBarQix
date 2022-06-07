import { compute } from "../app";

describe("Should output wrong input alert message", () => {
  it("Get alphabetic as input", () => {
    /**Could make the test less specific */
    expect(compute("A")).toBe("Input of compute should be a string");
  });
});
