import { compute } from "../app";

describe("Test cases step 2", () => {
  it("Should output string instead of number entered and replace '0' by '*'", () => {
    expect(compute("303")).toBe("FooFoo*Foo");
  });
});
