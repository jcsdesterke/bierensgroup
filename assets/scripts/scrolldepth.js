// Total height of the page
const pageHeight = document.body.scrollHeight - document.body.clientHeight;

// An array with all the scrollvalues
const scrollValues = [];

// Run a function to update the scrollDepth everytime the user scrolls
window.addEventListener("scroll", (event) => {
  let scroll = Math.ceil(window.scrollY);
  const percentage = Math.floor((scroll / pageHeight) * 100);

  // Pushm the new value to an array
  scrollValues.push(percentage);

  // Add the heighest values to the userData
  visitData.scrollDepth = Math.max.apply(Math, scrollValues);
});
