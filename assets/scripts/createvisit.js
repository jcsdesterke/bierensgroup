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
