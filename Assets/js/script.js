// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// function generatePassword() here:
function generatePassword() {
  // define variable to hold our booleans for character choices
  let upperCase;
  let lowerCase;
  let numeric;
  let special;
  // define variable to hold our confirmed password length numeric value
  let confirmedPassLen;

  // gather user input for password length
  let passLen = prompt(
    "How many characters would you like this password to be? (please enter a number between 8 and 128)"
  );
  // debug console log
  // console.log(passLen);

  // determine if user input is valid for password length
  function passLenCheck(x) {
    if (x >= 8 && x <= 128) {
      window.alert(
        `Awesome, the password length meets the criteria! a password with ${x} characters will be generated.`
      );
      // debug console log
      // console.log(x);
      // return the confirmned password length value
      return x;
      // if the password is not in range do this:
    } else {
      let x = prompt(
        "I'm sorry, that was an invalid entry. How many characters would you like this password to be? (please enter a number between 8 and 128)"
      );
      // debug console log
      // console.log(x);
      // must have a return statement here << this was the bug
      return passLenCheck(x);
    }
  }

  // call the password check function on the first (passLen) user input, what is returned will be stored (verified) in confirmedPassLen variable:
  confirmedPassLen = passLenCheck(passLen);

  // we need to determine which character types the user wants to include in the password - define a function that handles the input and assignment of user choices for each type of character:
  function charChecker() {
    // confirm lowercase?
    lowerCase = confirm(
      "Quesetion 1 of 4: Do you want to use lowercase characters?"
    );
    // debug console log
    // console.log(lowerCase);
    // user message so they know what they selected.
    if (lowerCase) {
      window.alert("Ok, your password will include lowercase characters!");
    } else {
      window.alert("Ok, your password will not include lowercase characters.");
    }

    // confirm uppercase?
    upperCase = confirm(
      "Question 2 of 4: Do you want to use uppercase characters?"
    );
    // debug console log
    // console.log(upperCase);
    // user message so they know what they selected.
    if (upperCase) {
      window.alert("Ok, your password will include uppercase characters!");
    } else {
      window.alert("Ok, your password will not include uppercase characters.");
    }

    // confirm numeric characters?
    numeric = confirm(
      "Question 3 of 4: Do you want to use numeric characters?"
    );
    // debug console log
    // console.log(numeric);
    // user message so they know what they selected.
    if (numeric) {
      window.alert("Ok, your password will include numeric characters!");
    } else {
      window.alert("Ok, your password will not include numeric characters.");
    }

    // confirm special characters?
    special = confirm("Question 4 of4: Do you want to use special characters?");
    // debug console log
    // console.log(special);
    // if the user has not chosen at least one option:
    if (!upperCase && !lowerCase && !numeric && !special) {
      window.alert(
        "I'm sorry, you must pick at least one type of character to include in the password. Please try again."
      );
      return charChecker();
    } else if (special) {
      window.alert("Ok, your password will include special characters!");
    } else {
      window.alert("Ok, your password will not include special characters.");
    }
  }

  // call the charChecker function:
  charChecker();

  // here are our individual character types - each is an array with all the available character options:
  // min = 0, max = lowerCaseArr.length-1
  let lowerCaseArr = "abcdefghijklmnopqrstuvwxyz".split("");
  // min = 0, max = upperCaseArr.length-1
  let upperCaseArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  // min = 0, max = numericlArr.length-1
  let numericArr = "1234567890".split("");
  // min = 0, max = specialArr.length-1
  let specialArr = [
    "\u0020",
    "\u0021",
    "\u0022",
    "\u0023",
    "\u0024",
    "\u0025",
    "\u0026",
    "\u0027",
    "\u0028",
    "\u0029",
    "\u002a",
    "\u002b",
    "\u002c",
    "\u002d",
    "\u002e",
    "\u002f",
    "\u003a",
    "\u003b",
    "\u003c",
    "\u003d",
    "\u003e",
    "\u003f",
    "\u0040",
    "\u005b",
    "\u005c",
    "\u005d",
    "\u005e",
    "\u005f",
    "\u0060",
    "\u007b",
    "\u007c",
    "\u007d",
    "\u007e",
  ];

  // create an empty array called poolArr that will hold the chosen character types:
  let poolArr = [];

  // concatenate the arrays from the chosen character types into pool array:
  // could use push and spread operator, but lets do this instead...
  // remember - the spread operator makes the array iterable and does not modify the originals.
  if (lowerCase) {
    poolArr = [...poolArr, ...lowerCaseArr];
  }
  if (upperCase) {
    poolArr = [...poolArr, ...upperCaseArr];
  }
  if (numeric) {
    poolArr = [...poolArr, ...numericArr];
  }
  if (special) {
    poolArr = [...poolArr, ...specialArr];
  }

  // debug console log
  // console.log(poolArr);

  // need a random number generator function that will return a random number between two numbers (range [a,b]):
  function randomIndexFromRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  // define an empty array to hold our solution
  let solution = [];
  // define variable that will hold our random index
  let randomIndex;
  // make a count variable to keep track of the length of our created password
  let count = confirmedPassLen;

  // push one random index into the solution to meet minimum character requirement (per the coding challenge requirements) for each selected character:
  if (lowerCase) {
    randomIndex = randomIndexFromRange(0, lowerCaseArr.length - 1);
    // debug console log
    // console.log(randomIndex);
    // add it to our solution array
    solution.push(lowerCaseArr[randomIndex]);
    // take one away from our count
    count--;
  }
  if (upperCase) {
    randomIndex = randomIndexFromRange(0, upperCaseArr.length - 1);
    // console.log(randomIndex);
    solution.push(upperCaseArr[randomIndex]);
    count--;
  }
  if (numeric) {
    randomIndex = randomIndexFromRange(0, numericArr.length - 1);
    // console.log(randomIndex);
    solution.push(numericArr[randomIndex]);
    count--;
  }
  if (special) {
    randomIndex = randomIndexFromRange(0, specialArr.length - 1);
    // console.log(randomIndex);
    solution.push(specialArr[randomIndex]);
    count--;
  }

  // debug console log - making sure we have one of each...
  // console.log(solution);

  // for all the remaining characters, create a new random index and fill up the solution array:
  for (let i = 0; i < count; i++) {
    randomIndex = randomIndexFromRange(0, poolArr.length - 1);
    solution.push(poolArr[randomIndex]);
  }

  // debug console log to make sure our solution holds the required number of characters:
  // console.log(solution);
  // we need to return a string, so join the array and .toString() to make sure all characters are a single string:
  let solutionString = solution.join("").toString();
  // debug console log to make sure we have a string
  // console.log(solutionString);
  // the final output is the string of random characters of the desired length
  return solutionString;

  // this is the end of the generate password function
}

generateBtn.addEventListener("click", writePassword);
