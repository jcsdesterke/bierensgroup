const visitIdLocal = localStorage.getItem("visitId");

biri.search(`users/${userId}/pagevisits`, visitIdLocal).then((result) => {
  const keys = Object.keys(result[0]);

  for (let i = 0; i < keys.length; i += 1) {
    const table = document.querySelector(".c_monitor__stats__table");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = keys[i];
    cell2.innerHTML = result[0][keys[i]];
    cell2.setAttribute("class", keys[i]);
  }
});

// Retrieve new data every 2 seconds and update the monitor
setInterval(() => {
  biri.search(`users/${userId}/pagevisits`, visitIdLocal).then((result) => {
    const keys = Object.keys(result[0]);
    console.log(result);

    for (let i = 0; i < keys.length; i += 1) {
      const keyValue = result[0][keys[i]];
      console.log(keyValue);

      document.querySelector(`.${keys[i]}`).innerText = result[0][keys[i]];
      console.log("logje");
    }
  });
}, 3000);
