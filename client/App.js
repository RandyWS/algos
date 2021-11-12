import React from "react";

const App = () => {
  const countWays = (n) => {
    if (n < 0) {
      return 0;
    } else if (n === 0) {
      return 1;
    } else {
      return countWays(n - 1) + countWays(n - 2) + countWays(n - 3);
    }
  };

  // memoization solution
  const getSteps = (n) => {
    let combo = {};
    const calcCombo = (n) => {
      if (n < 0) return 0;
      if (n === 0) return 1;
      if (!combo[n]) {
        combo[n] = calcCombo(n - 1) + calcCombo(n - 2) + calcCombo(n - 3);
      }
      return combo[n];
    };
    calcCombo(n);
    return combo[n];
  };

  console.log(countWays(5));
  console.log(getSteps(5));

  return <div></div>;
};

export default App;
