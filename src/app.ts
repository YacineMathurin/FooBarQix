var output = "";
var outputNotDivisible = "";

class ComputeCase {
  response: string;
  character: string;
  divisibilityChecked: boolean;
  foundCharacter: boolean;

  constructor(respondBy: string, character: string) {
    this.response = respondBy;
    this.character = character;
    this.divisibilityChecked = false;
    this.foundCharacter = false;
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
    if (str === this.character) {
      output += this.response;
      this.foundCharacter = true;
    } else if (str === "0" && output !== "") {
      output += "*";
      this.foundCharacter = true;
    } else {
    }
  }
  resetFoundCharacter() {
    this.foundCharacter = false;
  }
}

const printOut = () => {
  if (output === "") {
    outputNotDivisible = outputNotDivisible.replace("0", "*");
    return outputNotDivisible;
  }
  return output;
};

const validateInput = (input: string) => {
  // Could use joi validation to be more realistic
  if (isNaN(Number(input)) || input === "")
    return console.log("Please enter number as string");
};

export function compute(String: string) {
  validateInput(String);
  const splitedStr = String.split("");

  for (let index = 0; index < splitedStr.length; index++) {
    const character = splitedStr[index];

    for (let idx = 0; idx < rules.length; idx++) {
      const computeCase = rules[idx];
      computeCase.handleResponse(character, String);

      if (computeCase.foundCharacter) {
        computeCase.resetFoundCharacter();
        break;
      }
    }
    if (output === "") outputNotDivisible += character;
  }

  return printOut();
}

const rules = new Array(
  new ComputeCase("Foo", "3"),
  new ComputeCase("Bar", "5"),
  new ComputeCase("Qix", "7")
);

// console.log(compute("105"));
