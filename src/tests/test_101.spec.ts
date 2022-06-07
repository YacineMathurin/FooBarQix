import { compute } from "../app";

describe("Should display string as it is and replace '0' by '*'", () => {
  it("Get the string 101 as input", () => {
    expect(compute("101")).toBe("1*1");
  });
});
