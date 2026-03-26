function processData(data, callback) {
  const result = data * 2;
  callback(result, "happy to use it."); // Pass result to callback
}

// function displayResult(result) {
//   console.log(`The result is: ${result}`);
// }

processData(5, (result, text) =>
  console.log(`The result is: ${result} ${text}`),
);
// Output: The result is: 10
