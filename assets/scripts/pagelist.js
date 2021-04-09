
//User id loggen
console.log(userId);





// biri.search('users/' + userId + '/pagevisits', '').then((pageVisits) => {


//     let tagAantal;
//     let onderwerp;
    
//     pageTags = pageVisits.pageTags;

//     for (let i = 0; i < pageVisits.length; i++) {

//         const pageVisit = pageVisits[i];
//         onderwerp = pagevisit.pageTags;
//         tagAantal = tag.count

//         console.log('funnel punten per onderwerp = ' + onderwerp + ' ' + tagAantal);

        
//         document.getElementById("pageTable").innerHTML = onderwerp + ' ' + tagAantal;
        
        
    
//     }
// });



function changeFunction(x, z) {

        var funnelScore = x;
        var tagsArray = z;

        //console.log(funnelScore);
        //console.log(tagsArray);        

        ldbar.set(funnelScore, true);

}
