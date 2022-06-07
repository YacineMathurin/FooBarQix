/** We store in output the result of divisibility and/or contains match */
var output = "";
/** We store in possibleOutput the string as it is until possible divisibility or
 * match with the rules found */
var possibleOutput = "";

/** For each rule, instance this class to perform divisibility and contains check */
class ComputeCase {
  response: string;
  character: string;
  containsChecked: boolean;

  static divisibilityChecked: boolean;

  constructor(respondBy: string, character: string) {
    this.response = respondBy;
    this.character = character;
    this.containsChecked = false;
  }

  /** str: element in the string to compute
   * String: the whole string to compute
   */
  compute(str: string, String: string) {
    if (!ComputeCase.divisibilityChecked) this.checkDivisibility(String);
    this.checkOccurance(str);
  }
  /** Parse the string to number and test it's divisibility by the current rule element instance */
  checkDivisibility(String: string) {
    if (Number(String) % Number(this.character) === 0) output += this.response;
  }
  /** Check the element in the string to compute match the rule instanced  */
  checkOccurance(str: string) {
    if (str === this.character) {
      output += this.response;
      this.containsChecked = true;
    } else if (str === "0" && output !== "") {
      /** STEP 2: output !== "" means we had a match either on divisibility or contains */
      output += "*";
      this.containsChecked = true;
    } else {
    }
  }
  /** Reset the variable containsChecked for future instances */
  resetContainsChecked() {
    this.containsChecked = false;
  }
}

/** Print the final output */
const printOut = () => {
  /** If no divisibility possible, neither no match possible with the rules */
  if (output === "") {
    /*Step 2: replace "0" by "*" in the final result for
     * no divisibility possible, neither no match possible
     */
    possibleOutput = possibleOutput.replace("0", "*");
    return possibleOutput;
  }
  /** Else print output set accross rules instanced */
  return output;
};

/** Main function */
export function compute(String: string) {
  const wrongInputAlert = "Input of compute should be a string";
  if (isNaN(Number(String))) return wrongInputAlert;

  /**
   * The string to compute on is splited and we'll parse that string
   * element by element
   */
  const splitedStr = String.split("");

  // For each element in the string to compute
  for (let index = 0; index < splitedStr.length; index++) {
    // Get a ComputeCase class instance for each rule among the rules list bellow
    for (let idx = 0; idx < rules.length; idx++) {
      // Instance a rule among the rules array bellow
      const computeCase = rules[idx];

      /** We send as first argument the element in order to check the match with our instanced rule
       * And second argument the string to be parsed as number in order to check divisibility
       * with the instanced rule
       */
      computeCase.compute(splitedStr[index], String);

      /** An element of the string to compute can match to only one rule
       * i.e. "3" contains "3" and that's all, no need to check if "3" matchs "5" or "7"
       */
      if (computeCase.containsChecked) {
        computeCase.resetContainsChecked();
        break;
      }
    }
    // At this step all the rules have been covered, meaning all divisibility check is over
    ComputeCase.divisibilityChecked = true;
    // If no divisibility possible, neither no match possible with the rules
    if (output === "") possibleOutput += splitedStr[index];
  }
  // Print the final output
  return printOut();
}

const rules = new Array(
  new ComputeCase("Foo", "3"),
  new ComputeCase("Bar", "5"),
  new ComputeCase("Qix", "7")
);
