// Retrieve all meta tags and move them to a workable array
const metaTag = document.head.querySelector("[name=keywords]").content;
const metaTags = metaTag.split(", ");

// Loop through all tags and increase the count
for (let i = 0; i < metaTags.length; i += 1) {
  const tag = metaTags[i];

  const tagCount = parseInt(localStorage.getItem(tag));

  if (tagCount === undefined || isNaN(tagCount)) {
    localStorage.setItem(`${tag}`, 1);
  } else {
    localStorage.setItem(`${tag}`, tagCount + 1);
  }
}

// Display all keys and their values
const savedKeys = Object.keys(localStorage);

for (let i = 0; i < savedKeys.length; i += 1) {
  const savedKey = savedKeys[i];
  const savedValue = localStorage.getItem(`${savedKey}`);

  console.log(`${savedKey}: ${savedValue}`);
}
