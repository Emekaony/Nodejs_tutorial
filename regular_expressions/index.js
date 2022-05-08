const re = /ab+c/;

// or you can use the RegExp literal
const re2 = new RegExp("ab+c");

const emekaRegexp = /emeka/;

if ("Nnaemeka".match(emekaRegexp)) {
  console.log(Array.from("Nnaemeka".match(emekaRegexp))[0]);
  //   console.log(`There was a match at index ${index}`);
} else {
  console.log("There was no match");
}

// regular expressions are a whole different ball game. I will revisit later
