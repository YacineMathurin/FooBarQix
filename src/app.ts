var output = "";
var possibleOutput = "";

class ComputeCase {
  response: string;
  character: string;
  divisibilityChecked: boolean;
  containsChecked: boolean;

  constructor(respondBy: string, character: string) {
    this.response = respondBy;
    this.character = character;
    this.divisibilityChecked = false;
    this.containsChecked = false;
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
    // console.log("checkOccurance", str, this.containsChecked);

    if (str === this.character) {
      output += this.response;
      this.containsChecked = true;
    } else if (str === "0" && output !== "") {
      output += "*";
      this.containsChecked = true;
    }
    // possibleOutput += str;
    // this.containsChecked = true;
  }
}

const printOut = (str: string) => {
  if (output === "") {
    possibleOutput = possibleOutput.replace("0", "*");
    console.log(possibleOutput);
    return possibleOutput;
  }
  console.log(output);
  return output;
};

export function compute(String: string) {
  const splitedStr = String.split("");

  for (let index = 0; index < splitedStr.length; index++) {
    for (let idx = 0; idx < rules.length; idx++) {
      const computeCase = rules[idx];
      console.log(
        "New ComputeCase ContainsChecked",
        computeCase.containsChecked
      );

      computeCase.handleResponse(splitedStr[index], String);

      if (computeCase.containsChecked) {
        computeCase.containsChecked = false;
        break;
      }
    }
    if (output === "") possibleOutput += splitedStr[index];
  }

  return printOut(String);
}

const rules = new Array(
  new ComputeCase("Foo", "3"),
  new ComputeCase("Bar", "5"),
  new ComputeCase("Qix", "7")
);

compute("51");
