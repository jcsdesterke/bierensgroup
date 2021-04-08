
//User id loggen
console.log(userId);


biri.search('users/' + userId + '/pagevisits' , '').then((result) => {
    console.log(result);


    for (let i = 0; i < result.length; i += 1) {
        const pageList = result[i];

        console.log(pageList);

    }
    });



var pagelist = [
    { date: '12/1/2011', reading: 3, id: 20055 },
    { date: '13/1/2011', reading: 5, id: 20053 },
    { date: '14/1/2011', reading: 6, id: 45652 }
];

document.getElementById("pageTable").textContent = pagelist[1].id;
