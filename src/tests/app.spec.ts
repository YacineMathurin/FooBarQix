import { compute } from "../app";

describe("", () => {
  it("Should output string if string isn't 3 or 5 or 7", () => {
    expect(compute("1")).toBe("1");
  });
  it("Should output FooQix", () => {
    console.log(compute("21"));

    expect(compute("21")).toBe("FooQix");
  });
  it("Should output by digits order", () => {
    expect(compute("53")).toBe("BarFoo");
  });
});
