import { compute } from "../app";

describe("Should output FooFoo as divisible by 3 and contains 3", () => {
  it("Get the string 3 as input", () => {
    expect(compute("3")).toBe("FooFoo");
  });
});
