// 1.4 write func to determine if str is perm of palindrome

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
