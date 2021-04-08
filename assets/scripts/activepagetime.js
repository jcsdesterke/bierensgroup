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
            visitData.activeTime = parseInt(timeSpentOnSite/1000);
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