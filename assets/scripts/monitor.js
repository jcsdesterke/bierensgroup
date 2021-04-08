let visitIdLocal = "";
setTimeout(() => {
  visitIdLocal = localStorage.getItem("visitId");
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

  startUpdatingMonitor();
}, 3000);

// Retrieve new data every 2 seconds and update the monitor
function startUpdatingMonitor() {
  setInterval(() => {
    biri.search(`users/${userId}/pagevisits`, visitIdLocal).then((result) => {
      const keys = Object.keys(result[0]);

      for (let i = 0; i < keys.length; i += 1) {
        const keyValue = result[0][keys[i]];

        document.querySelector(`.${keys[i]}`).innerText = result[0][keys[i]];
      }
    });
  }, 1000);
}

/* ---------- Calculate funnelscore and generate array of all tags with multipliers ---------- */

let calculatingResultsTimer = 0;

function startCalculatingResults() {
  calculatingResultsTimer = setInterval(function () {
    biri.search("users/" + userId + "/pagevisits", "").then((pageVisits) => {
      let allFunnelPoints = 0;
      let allMultipliers = 0;
      let funnelScore = 0;
      let allTags = [];

      for (let i = 0; i < pageVisits.length; i++) {
        const pageVisit = pageVisits[i];
        allFunnelPoints += pageVisit.funnelPoints * pageVisit.multiplier;
        allMultipliers += pageVisit.multiplier;

        let pageTags = pageVisit.pageTags;

        for (let j = 0; j < pageVisit.multiplier; j++) {
          for (let k = 0; k < pageTags.length; k++) {
            allTags.push(pageVisit.pageTags[k]);
          }
        }
      }
      funnelScore = allFunnelPoints / allMultipliers;

      //functions are called to process the score and tags in the monitor
      updateMonitorFunnelScore(funnelScore);
      updateMonitorTagList(allTags);
    });
  }, 1000);
}
startCalculatingResults();

//funtion to update the values in html and css
function updateMonitorFunnelScore(score) {
  score = parseInt(score * 100) / 10;
  document.getElementById("conversion-indicator").innerHTML = score;
  document.getElementById("monitor-progressbar").style.width = score + "%";
}

//function that counts, orders and displays the tags
function updateMonitorTagList(tags) {
  let tagCountArr = [];
  let objIndex = 0;

  //analysing and counting tags. Insert them into array of objects with 'name' and 'count'
  for (i = 0; i < tags.length; i++) {
    objIndex = tagCountArr.findIndex((obj) => obj.name == tags[i]);

    if (objIndex >= 0) {
      tagCountArr[objIndex].count++;
    } else {
      tagCountArr.push({ name: tags[i], count: 1 });
    }
  }

  //sorting array with values based on tag counts
  tagCountArr.sort(compareValues);

  //displaying top 3 tags
  document.getElementById("monitor-taglist").innerHTML = "";

  //The amount of listitems is set in this for-loop
  for (j = 0; j < 3; j++) {
    let tagListItem = "";

    //checking if there are more than 3 values in the array
    if (j < tagCountArr.length) {
      tagListItem = j + 1 + ". " + tagCountArr[j].name + "<br/>";
    } else {
      tagListItem = j + 1 + ". -<br/>";
    }

    //set tags in top 3 list
    document.getElementById("monitor-taglist").innerHTML += tagListItem;
  }
}
// function to sort order on highest tag count
function compareValues(a, b) {
  const countA = a.count;
  const countB = b.count;

  let comparison = 0;
  if (countA > countB) {
    comparison = 1;
  } else if (countA < countB) {
    comparison = -1;
  }
  // reverting order so the highest number gets on top
  return comparison * -1;
}

// Monitor reset button
const resetBtn = document.querySelector(".c_monitor__reset");

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
