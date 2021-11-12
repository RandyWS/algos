//8.1 a child is running up the staircase of n steps and can hop either 1 step, 2 steps, or 3 steps at a time. Implement a method to count how many ways a child can run up the stairs
// brute force
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

//8.2 robot in a grid. imagine a robot sitting n the top left corner of a grid. he can only move right and down, but certain spaces he can't move into. write an algo to find a path to the bottom right.
