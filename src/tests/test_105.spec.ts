import { compute } from "../app";

describe("Should display divisibility and/or contains match and replace '0' by '*'", () => {
  it("Get the string 105 as input", () => {
    expect(compute("105")).toBe("FooBarQix*Bar");
  });
});
