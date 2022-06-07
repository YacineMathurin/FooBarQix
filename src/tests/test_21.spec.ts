import { compute } from "../app";

describe("Should output FooQix as divisible by 3, by 7 but no contains with the rules character found", () => {
  it("Get the string 21 as input", () => {
    expect(compute("21")).toBe("FooQix");
  });
});
