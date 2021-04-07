const contentBlock = document.querySelector(".c_contentblock__text");

let totalWords = 0;

totalWords += contentBlock.innerText.trim().split(" ").length;

const estimatedReadingTime = totalWords / 4.16;

visitData.estReadingTime = parseInt(estimatedReadingTime);
