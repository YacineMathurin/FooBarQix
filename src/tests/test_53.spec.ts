import { compute } from "../app";

describe("Should display in digit order", () => {
  it("Get the string 53 as input", () => {
    expect(compute("53")).toBe("BarFoo");
  });
});
