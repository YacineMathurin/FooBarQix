var output = "";

class ContainsThree {
  response: string;
  character: string;
  constructor(respondBy: string, character: string) {
    this.response = respondBy;
    this.character = character;
  }

  handleResponse(str: string) {
    this.checkOccurance(str);
    this.checkDivisibility(str);
  }

  checkOccurance(str: string) {
    const occurances = str.split(this.character).length - 1;
    for (let index = 0; index < occurances; index++) output += this.response;
  }
  checkDivisibility(str: string) {
    if (Number(str) % Number(this.character) === 0) output += this.response;
  }
}

const printOut = () => {
  console.log(output);
};

const main = (str: string) => {
  rules.map((rule) => rule.handleResponse(str));
  printOut();
};

const rules = new Array(new ContainsThree("Foo", "3"));

main("3");
