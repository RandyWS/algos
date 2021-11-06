// 1.4 write func to determine if str is perm of palindrome

import { curryRight } from "lodash";

// E: "Tact Coa"
// A: every char has to have even number of chars except one

const palindromePerm = (str) => {
  let chars = new Map();
  let alph = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < str.length; i++) {
    let curr = str[i].toLowerCase();
    if (alph.includes(curr)) {
      if (!chars.get(curr)) {
        chars.set(curr, 1);
      } else {
        chars.set(curr, chars.get(curr) + 1);
      }
    }
  }

  let onlyOne = false;
  for (const [key, val] of chars) {
    if (val % 2 === 1) {
      if (onlyOne === true) {
        return false;
      } else {
        onlyOne = true;
      }
    }
  }
  return true;
};

console.log(palindromePerm("Tact Coa"));

// with set, delete and check the size is less than or equal to one at the end
export function isPalindromePermutationsSet(str) {
  if (!str) {
    return false;
  }

  let chars = new Set();
  for (let char of str) {
    if (char !== " ") {
      // ignore spaces
      if (chars.has(char)) {
        chars.delete(char);
      } else {
        chars.add(char);
      }
    }
  }

  return chars.size <= 1;
}

// 1.5 one away. write func to determine if one edit (insert, delete, or edit) can be made to one string to make the other string equal

const oneAway = (str1, str2) => {
  if (Math.abs(str1 - str2) > 1) {
    return false;
  } else if (str1 === str2) {
    return true;
  }

  const length = Math.ceil((str1.length + str2.length) / 2);

  for (let i = 0; i < length; i++) {
    if (str1[i] !== str2[i]) {
      if (str1.length > str2.length) {
        str2 = str2.slice(0, i) + str1[i] + str2.slice(i, str2.length);

        return str1 === str2;
      } else if (str1.length < str2.length) {
        str1 = str1.slice(0, i) + str2[i] + str1.slice(i, str1.length);
        return str1 === str2;
      } else {
        str2 = str2.slice(0, i) + str1[i] + str2.slice(i + 1, str2.length);
        return str1 === str2;
      }
    }
    return true;
  }
};

console.log(oneAway("pale", "ple")); //true
console.log(oneAway("pales", "pale")); //true
console.log(oneAway("pale", "bale")); //true
console.log(oneAway("pale", "bake")); //false

export function isOneOrLessAway(str1, str2) {
  // if lengths differ by more than 1 then can't be true
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  let isEdited = false;
  for (let i = 0, j = 0; i < str1.length && j < str2.length; ++i, ++j) {
    if (str1[i] !== str2[j]) {
      if (isEdited) {
        // second edit
        return false;
      }

      if (str1.length > str2.length) {
        --j; // decrease j, we are deleting char from str1
      } else if (str1.length < str2.length) {
        --i; // decrease i, we are deleting char from str2
      }
      isEdited = true;
    }
  }

  return true;
}

// 1.6 string compression. implement method to perform basic string compression using the counts of repeated chars. If the compressed would not be smaller than the original, return the original

const compressed = (str) => {
  if (!str) {
    return str;
  }

  let count = 1;
  let compressed = str[0];
  let currChar = str[0];

  for (let i = 1; i < str.length; i++) {
    if (currChar !== str[i]) {
      compressed += count + str[i];
      currChar = str[i];
      count = 1;
    } else if (i + 1 === str.length) {
      compressed += count + 1;
    } else {
      count++;
    }
  }

  return str.length > compressed.length ? compressed : str;
};

console.log(compressed("aabcccccaaa")); // a2b1c5a3

export function compressString(str) {
  if (!str) {
    return str;
  }

  let cStr = "";
  for (let i = 0; i < str.length; ++i) {
    let char = str[i],
      start = i;
    while (i + 1 < str.length && char === str[i + 1]) {
      ++i;
    }
    // JS does not have a StringBuilder/StringBuffer style class for creating strings
    // string concatenation has been heavily optimised in JS implementations and
    // is faster than creating a string via an array then using a .join('') at the end
    cStr += i - start + 1 + char;
  }

  return cStr.length < str.length ? cStr : str;
}

//  1.7 given an image represented by an n x n matrix where each pixel n the image is represented by an integer, write a method to rotate the image by 90 degrees. Can you do this in place?

const rotateMatrix = (matrix) => {
  let rotated = [];

  for (let i = 0; i < matrix[0].length; i++) {
    let curr = [];
    for (let j = 0; j < matrix.length; j++) {
      curr.push(matrix[j][i]);
    }
    rotated.push(curr);
  }
  return rotated;
};

console.log(
  rotateMatrix([
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ])
);

// Go through the matrix diagonally from 0,0 until half way through (one less
//   * where odd N). For each diagonal starting point move through matrix along row
//   * until length - starting index. For each index in the matrix go through all 4
//   * sides moving items along one place.
//   *
//   * N = dimension of matrix
//   * Time: O(N^2)
//   * Additional space: O(1)

export function rotateMatrix(matrix) {
  if (!matrix || matrix.length === 0 || matrix.length !== matrix[0].length) {
    throw new Error("invalid matrix");
  }
  if (matrix.length < 2) {
    return matrix; // no need to do anything to rotate a 1,1 matrix
  }

  let len = matrix.length - 1,
    half = Math.floor(matrix.length / 2);
  // loop through diagonal
  for (let start = 0; start < half; ++start) {
    // loop through x axis
    for (let i = 0; i < len - start * 2; ++i) {
      let y = start,
        x = start + i,
        prev = matrix[y][x];

      // loop through all 4 corners
      for (let j = 0; j < 4; ++j) {
        let nextY = x,
          nextX = len - y,
          next = matrix[nextY][nextX];
        matrix[nextY][nextX] = prev;
        prev = next;
        x = nextX;
        y = nextY;
      }
    }
  }

  return matrix;
}

// 1.8 zero matrix. in an m x n matrix, if an element is 0 its entire row and column are set to 0

const zeroMatrix = (matrix) => {
  if (!matrix) {
    throw new Error("invalid matrix");
  } else if (matrix.length === 0) {
    return matrix;
  }

  let memory = {};
  let hasZero = false;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        if (!memory[j]) {
          memory[j] = true;
        }
        let count = i - 1;

        while (count >= 0) {
          matrix[count][j] = 0;
          count--;
        }
        hasZero = true;
      }

      if (memory[j]) {
        matrix[i][j] = 0;
      }

      if (j + 1 === matrix[0].length) {
        if (hasZero === true) {
          matrix[i] = new Array(matrix[0].length).fill(0);
        }
        hasZero = false;
      }
    }
  }
  return matrix;
};

console.log(
  zeroMatrix([
    [1, 1, 1, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 0],
  ])
); //[ [0,1,1,0],[0,0,0,0], [0,0,0,0]]

export function zeroMatrix(matrix) {
  if (!matrix) {
    throw new Error("invalid matrix");
  }
  if (matrix.length === 0) {
    return matrix;
  }

  let rows = new Array(matrix.length),
    cols = new Array(matrix[0].length);

  rows.fill(false);
  cols.fill(false);

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < cols.length; ++x) {
      if (matrix[y][x] === 0) {
        rows[y] = true;
        cols[x] = true;
      }
    }
  }

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < cols.length; ++x) {
      if (rows[y] || cols[x]) {
        matrix[y][x] = 0;
      }
    }
  }

  return matrix;
}

// 1.9 string rotation. assumme you have a method is substr which checks if one str is a substr of another. given 2 str, write func if s2 is a rotation of s1 by only calling substr once

const isSubstring = (str1, str2) => {
  return str1.includes(str2);
};

const strRotation = (str1, str2) => {
  if (!str1 || str1.length !== str2.length) {
    return false;
  }

  const concat = str2 + str2;
  return isSubstring(concat, str1);
};

console.log(strRotation("waterbottle", "erbottlewat"));
