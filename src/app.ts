var output = "";

class ComputeCase {
  response: string;
  character: string;
  divisibilityChecked: boolean;
  constructor(respondBy: string, character: string) {
    this.response = respondBy;
    this.character = character;
    this.divisibilityChecked = false;
  }

  handleResponse(str: string, String: string) {
    if (!this.divisibilityChecked) this.checkDivisibility(String);
    this.checkOccurance(str);
  }

  checkDivisibility(String: string) {
    if (Number(String) % Number(this.character) === 0) output += this.response;
    this.divisibilityChecked = true;
  }
  checkOccurance(str: string) {
    const occurances = str.split(this.character).length - 1;
    for (let index = 0; index < occurances; index++) output += this.response;
  }
}

const printOut = (str: string) => {
  if (output === "") {
    // console.log(str);
    return str;
  }
  //   console.log("Output", output);
  return output;
};

export function compute(String: string) {
  const str = String.split("");
  str.map((char) => {
    rules.map((rule) => rule.handleResponse(char, String));
  });
  return printOut(String);
}

const rules = new Array(
  new ComputeCase("Foo", "3"),
  new ComputeCase("Bar", "5"),
  new ComputeCase("Qix", "7")
);

// compute("21");
