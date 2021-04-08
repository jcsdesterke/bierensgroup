// Define an object for the visit data
let visitData = {
  pageId: pageId,
};

// Define a visit id
let visitId = "";

// Add a visit to the user's pagevisits and generate a unique id for the visit
biri.add("users/" + userId + "/pagevisits", visitData).then((result) => {
  visitId = result.id;
});

// Update the visit data every 2 seconds
setInterval(() => {
  biri.update("users/" + userId + "/pagevisits/" + visitId, visitData);
}, 2000);

// Add the funnel points to the page visit
visitData.funnelPoints = pageFunnelPoints;

// Analyse the page tags and update the count in the database
let tagData = {};

// Loop through all tags and increase the count
for (let i = 0; i < pageTags.length; i += 1) {
  const tag = pageTags[i].toLowerCase();
  let tagCount = "";
  let tagData = {};

  // Search for the tag data in the userData
  biri.search("users/" + userId + `/tags/`, tag).then((result) => {
    tagCount = result[0].count;

    // If the tag is non-existing create an object and set the count to 1
    if (tagCount === undefined || tagCount === "") {
      tagCount = 1;
    } else {
      tagCount += 1;
    }

    // Update the tagData object
    tagData.count = tagCount;
    tagData.tag = tag;

    // Push changes to the database
    biri.update(`users/${userId}/tags/${tag}`, tagData);
  });
}
