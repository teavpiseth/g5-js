function firstName() {
  return "John";
}
function lastName() {
  return "Sey";
}
function displayName({ a, b }) {
  console.log(a() + " " + b());
}

displayName({ b: lastName, a: firstName });
