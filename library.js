const KEYS_NAME = {
  ADDITION: "ADDITIONS",
  MULTIPLICATION: "MULTIPLICATION",
  SUBTRACTION: "SUBTRACTION",
  PERCENTAGE: "PERCENTAGE",
  DIVISION: "DIVISION",
  EQUALS: "EQUALS",
  DELETE: "DELETE",
  CLEAR_ALL: "CLEAR_ALL",
  DOT: "DOT"
};

 const KEYS = {
  [KEYS_NAME.ADDITION]: "+",
  [KEYS_NAME.SUBTRACTION]: "-",
  [KEYS_NAME.DIVISION]: "/",
  [KEYS_NAME.PERCENTAGE]: "%",
  [KEYS_NAME.MULTIPLICATION]: "*",
  [KEYS_NAME.EQUALS]: "=",
  [KEYS_NAME.DELETE]: "DEL",
  [KEYS_NAME.CLEAR_ALL]: "AC",
  [KEYS_NAME.DOT]: "."
};

const PRECEDENCE = [
  KEYS[KEYS_NAME.DIVISION],
  KEYS[KEYS_NAME.MULTIPLICATION],
  KEYS[KEYS_NAME.ADDITION],
  KEYS[KEYS_NAME.SUBTRACTION]
  
];

const NOT_APPENDABLE_OPERATORS = [
  KEYS[KEYS_NAME.DIVISION],
  KEYS[KEYS_NAME.MULTIPLICATION],
  KEYS[KEYS_NAME.PERCENTAGE]
];

 class Calculator {
  query = "";

  updateQuery(entered) {
    let isOperator = PRECEDENCE.includes(entered);
    let last = this.query.split(" ").pop();

    if (isOperator && PRECEDENCE.includes(last)) return this.query;

    if (
      NOT_APPENDABLE_OPERATORS.includes(entered) &&
      (!this.isNumber(last) || last === "")
    )
      return this.query;

    let isIntendedOperator = isOperator && last !== "" && this.isNumber(last);

    let append = isIntendedOperator ? ` ${entered} ` : entered;
    this.query += append;

    return this.query;
  }

  clear() {
    this.query = "";
  }

  delete() {
    let array = this.query.split(" ");
    let removed = array.splice(array.length - 1)[0];
    if (removed.toString().length > 1) {
      array.push(removed.substr(0, removed.length - 1));
    }
    this.query = array.join(" ");
    return this.query;
  }

//   add(a, b) {
//     return a + b;
//   }

//   subtract(a, b) {
//     return a - b;
//   }

//  divide(a, b) {
//     if (b === 0) {
//       throw new Error("NAN");
//     }
//     return a / b;
//   }

//   mutiply(a, b) {
//     return a * b;
//   }

//    percentage(a , b) {
//     return a + b;
    
//   }

  isNumber(intended) {
    return !isNaN(intended) && isFinite(intended);
  }

  splitQueryStringToArray(querString) {
    let splitBySpace = querString.split(" ");
    return splitBySpace.map((each) => {
      return this.isNumber(each) ? +each : each;
    });
  }

  solve() {
    let splitted = this.splitQueryStringToArray(this.query);
    let executed = splitted;

    for (let index = 0; index < PRECEDENCE.length; index++) {
      const operator = PRECEDENCE[index];

      const helper = (array) => {
        let index = array.indexOf(operator);
        if (index === -1) return;

        let valueBefore = array[index - 1];
        let valueAfter = array[index + 1];

        if (valueAfter === undefined || valueBefore === undefined) {
          throw new Error("UNEXPECTED_END_OF_INPUT");
        }

        // let append;
        // // switch (operator) {
        // //   // case '+':
        // //   //   append = valueBefore + valueAfter;
        // //   //   break;
        // //   case '-':
        // //     append = valueBefore - valueAfter;
        // //     break;
        // //   case '*':
        // //     append = valueBefore * valueAfter;
        // //     break;
        // //   case '/':
        // //     append = valueBefore / valueAfter;
        // //     break;
        // //   case '%':
        // //     append = valueBefore + valueAfter;
        // //     break;
        // //   default:
        // //     break;
        // }
        executed.splice(index - 1, 3, append);
        helper(executed);
      };

      helper(executed);
    }
    return executed[0] || 0;
  }
}