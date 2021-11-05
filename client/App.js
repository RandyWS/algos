import React from "react";

const App = () => {
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
  return <div></div>;
};

export default App;
