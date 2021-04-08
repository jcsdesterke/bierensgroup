/* ---------- Active page timer start ---------- */
var timer;
var timerStart;
localStorage.setItem('timeSpentOnSite',0);
visitData.dateTime = Date.now();

function getTimeSpentOnSite(){
    timeSpentOnSite = parseInt(localStorage.getItem('timeSpentOnSite'));
    timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
    return timeSpentOnSite;
}

function startCounting(){
		timerStart = Date.now();
		timer = setInterval(function(){
    		timeSpentOnSite = getTimeSpentOnSite()+(Date.now()-timerStart);
            // Saves time to local storage           
    		localStorage.setItem('timeSpentOnSite',timeSpentOnSite);
    		timerStart = parseInt(Date.now());
    		// Update time in visitData object for sending to firebase
            visitData.activeTime = timeSpentOnSite;
		},1000);
}
startCounting();

/* ---------- Stop the timer when the window/tab is inactive ---------- */

var stopCountingWhenWindowIsInactive = true; 

if( stopCountingWhenWindowIsInactive ){
    
    if( typeof document.hidden !== "undefined" ){
        var hidden = "hidden", 
        visibilityChange = "visibilitychange", 
        visibilityState = "visibilityState";
    }else if ( typeof document.msHidden !== "undefined" ){
        var hidden = "msHidden", 
        visibilityChange = "msvisibilitychange", 
        visibilityState = "msVisibilityState";
    }
    var documentIsHidden = document[hidden];

    document.addEventListener(visibilityChange, function() {
        if(documentIsHidden != document[hidden]) {
            if( document[hidden] ){
                // Window is inactive
                clearInterval(timer);
            }else{
                // Window is active
                startCounting();
            }
            documentIsHidden = document[hidden];
        }
    });
}

/* ---------- Analyse content and count words on website ---------- */

const contentBlock = document.querySelector(".c_contentblock__text");

let totalWords = 0;

totalWords += contentBlock.innerText.trim().split(" ").length;

const estimatedReadingTime = totalWords / (4.16/1000);

visitData.estReadingTime = parseInt(estimatedReadingTime);


/* ---------- Analyse and upload scroll depth per page visit ---------- */

// Total height of the page
const pageHeight = document.body.scrollHeight - document.body.clientHeight;

// An array with all the scrollvalues
const scrollValues = [];

//declare scrollDepth in database with value of 0
visitData.scrollDepth = 0;
localStorage.setItem('scrollDepth',0);

//setting scrollDepth to 1 when window is bigger or equal to page
if(document.body.scrollHeight <= document.body.clientHeight){
    const scrollDepth = 1;
    visitData.scrollDepth = scrollDepth;
    localStorage.setItem('scrollDepth',scrollDepth);
}

// Run a function to update the scrollDepth everytime the user scrolls
window.addEventListener("scroll", (event) => {
  let scroll = Math.ceil(window.scrollY);
  const percentage = Math.floor((scroll / pageHeight) * 1000)/1000;

  // Pushm the new value to an array
  scrollValues.push(percentage);

  //retreive the heighest value of all measurements
  const scrollDepth = Math.max.apply(Math, scrollValues);

  // Add the value to the userData
  visitData.scrollDepth = scrollDepth;
  localStorage.setItem('scrollDepth',scrollDepth);

});


/* ---------- Calculate and upload multiplier per pagevisit ---------- */

// calculate readingscore
let readingTime = 0;
let readingScore = 1;
let multiplier = 1;
let scrollDepth = 0;

let multiplierTimer = 0;

function startCalcMultiplier(){
    
    multiplierTimer = setInterval(function(){
        readingTime = parseInt(localStorage.getItem('timeSpentOnSite'));
        scrollDepth = localStorage.getItem('scrollDepth');
        
        if (readingTime < estimatedReadingTime/10) {
            readingScore = 1;
        }
        else {
            if (readingTime >= estimatedReadingTime/10) {
                if(readingTime > estimatedReadingTime){
                    readingScore = 10;
                }
                else{
                    readingScore = readingTime / estimatedReadingTime * 10;
                }
                
            }
            
        }
        multiplier = parseInt(readingScore * scrollDepth);
        if (multiplier == 0){
            multiplier = 1;
        }

        visitData.multiplier = multiplier;
        localStorage.setItem('multiplier',multiplier);
    },1000);
}
startCalcMultiplier();



/* ---------- Calculate funnelscore and generate array of all tags with multipliers ---------- */

let calculatingResultsTimer = 0;

function startCalculatingResults(){

    calculatingResultsTimer = setInterval(function(){

        biri.search('users/' + userId + '/pagevisits' , '').then((pageVisits) => {

            let allFunnelPoints = 0;
            let allMultipliers = 0;
            let funnelScore = 0;
            let allTags = [];
            
            for (let i = 0; i < pageVisits.length; i ++) {
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
            funnelScore = allFunnelPoints/allMultipliers;
        
            //logging total funnelscore and array of all tags
            // console.log("funnelscore: " + funnelScore);
            // console.log(allTags);
            changeFunction(allMultipliers, allTags);

            });

    },2000);
}
startCalculatingResults();

