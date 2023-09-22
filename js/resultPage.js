function getZodiacTwelveSign(day, month) {
    var birthday = new Date(2000, month - 1, day); // Create a Date object for the birthday

    if (new Date(2000, 2, 21) <= birthday && birthday <= new Date(2000, 3, 19)) {
        return 0;
    } else if (new Date(2000, 3, 20) <= birthday && birthday <= new Date(2000, 4, 20)) {
        return 1;
    } else if (new Date(2000, 4, 21) <= birthday && birthday <= new Date(2000, 5, 21)) {
        return 2;
    } else if (new Date(2000, 5, 22) <= birthday && birthday <= new Date(2000, 6, 22)) {
        return 3;
    } else if (new Date(2000, 6, 23) <= birthday && birthday <= new Date(2000, 7, 22)) {
        return 4;
    } else if (new Date(2000, 7, 23) <= birthday && birthday <= new Date(2000, 8, 23)) {
        return 5;
    } else if (new Date(2000, 8, 24) <= birthday && birthday <= new Date(2000, 9, 22)) {
        return 6;
    } else if (new Date(2000, 9, 23) <= birthday && birthday <= new Date(2000, 10, 22)) {
        return 7;
    } else if (new Date(2000, 10, 23) <= birthday && birthday <= new Date(2000, 11, 24)) {
        return 8;
    } else if (new Date(2000, 11, 25) <= birthday && birthday <= new Date(2000, 11, 31)) {
        return 9;
    } else if (new Date(2000, 0, 1) <= birthday && birthday <= new Date(2000, 0, 19)) {
        return 9;
    } else if (new Date(2000, 0, 20) <= birthday && birthday <= new Date(2000, 1, 18)) {
        return 10;
    } else if (new Date(2000, 1, 19) <= birthday && birthday <= new Date(2000, 2, 20)) {
        return 11;
    }
}

function getZodiacFortyEightSign(day, month) {
    var birthday = new Date(2000, month - 1, day); // Create a Date object for the birthday

    if (new Date(2000, 2, 19) <= birthday && birthday <= new Date(2000, 3, 18)) {
        return 0;
    } else if (new Date(2000, 3, 19) <= birthday && birthday <= new Date(2000, 4, 18)) {
        return 1;
    } else if (new Date(2000, 4, 19) <= birthday && birthday <= new Date(2000, 6, 18)) {
        return 2;
    } else if (new Date(2000, 6, 19) <= birthday && birthday <= new Date(2000, 8, 18)) {
        return 3;
    } else if (new Date(2000, 8, 19) <= birthday && birthday <= new Date(2000, 8, 24)) {
        return 4;
    } else if (new Date(2000, 8, 25) <= birthday && birthday <= new Date(2000, 9, 2)) {
        return 5;
    } else if (new Date(2000, 9, 3) <= birthday && birthday <= new Date(2000, 9, 10)) {
        return 6;
    } else if (new Date(2000, 9, 11) <= birthday && birthday <= new Date(2000, 9, 18)) {
        return 7;
    } else if (new Date(2000, 9, 19) <= birthday && birthday <= new Date(2000, 9, 25)) {
        return 8;
    } else if (new Date(2000, 9, 26) <= birthday && birthday <= new Date(2000, 10, 2)) {
        return 9;
    } else if (new Date(2000, 10, 3) <= birthday && birthday <= new Date(2000, 10, 11)) {
        return 10;
    } else if (new Date(2000, 10, 12) <= birthday && birthday <= new Date(2000, 10, 18)) {
        return 11;
    } else if (new Date(2000, 10, 19) <= birthday && birthday <= new Date(2000, 11, 31)) {
        return 12;
    } else if (new Date(2000, 0, 1) <= birthday && birthday <= new Date(2000, 0, 16)) {
        return 12;
    } else if (new Date(2000, 0, 17) <= birthday && birthday <= new Date(2000, 2, 18)) {
        return 13;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const queryObject = JSON.parse(decodeURIComponent(query));
    const date = new Date();

    // Fetch all the cards that matches the profile
    fetch('data/card.json').then(response => response.json()).then(data => {

        const ztwelve = getZodiacTwelveSign(queryObject.birthDay, queryObject.birthMonth);
        const zforty = getZodiacFortyEightSign(queryObject.birthDay, queryObject.birthMonth);
       
        // Filter the cards that matches the profile
        const soulCards = data["S_Card"][queryObject.soulCard -1];
        const moonCards = data["M_Card"][queryObject.moonCard -1];
        const yearCards = data["Y_Card"][queryObject.yearCard -1];
        const zodiacCards = data["Z12_Card"][ztwelve];
        const zodiacCards2 = data["Z48_Card"][zforty];
        
        // soulCard Image Tag Insert
        const soulCardTitle = '<h2>Sun Sign(Sun:들어 나는 나의 모습) = Soul Card(1번-9번 : 9장의 카드): {{title}}</h2>';
        const soulCardImageOne = '<img src="{{imageOne}}">';
        const soulCardImageTwo = '<img src="{{imageTwo}}">';
        const soulCardImageThree = '<img src="{{imageThree}}">';

        var soulCardTitleTemplate = Handlebars.compile(soulCardTitle);
        var soulCardImageOneTemplate = Handlebars.compile(soulCardImageOne);
        var soulCardImageTwoTemplate = Handlebars.compile(soulCardImageTwo);
        var soulCardImageThreeTemplate = Handlebars.compile(soulCardImageThree);

        
        var soulCardTitleData = soulCardTitleTemplate({title: soulCards["c_id"]});
        var soulCardImageOneData = soulCardImageOneTemplate({imageOne: soulCards["c_image_1"]});
        var soulCardImageTwoData = soulCardImageTwoTemplate({imageTwo: soulCards["c_image_2"]});
        var soulCardImageThreeData = soulCardImageThreeTemplate({imageThree: soulCards["c_image_3"]});

        document.getElementById('soulCard').innerHTML += soulCardTitleData;
        document.getElementById('soulCard').innerHTML += soulCardImageOneData;
        document.getElementById('soulCard').innerHTML += soulCardImageTwoData;
        document.getElementById('soulCard').innerHTML += soulCardImageThreeData;

        // moonCard Image Tag Insert
        const moonCardTitle = '<h2>Moon Sign(Moon:들어 나지 않는 나의 모습) : {{title}}</h2>';
        const moonCardImage = '<img src="{{image}}">';

        var moonCardTitleTemplate = Handlebars.compile(moonCardTitle);
        var moonCardImageTemplate = Handlebars.compile(moonCardImage);

        var moonCardTitleData = moonCardTitleTemplate({title: moonCards["c_id"]});
        var moonCardImageData = moonCardImageTemplate({image: moonCards["c_image"]});

        document.getElementById('moonCard').innerHTML += moonCardTitleData;
        document.getElementById('moonCard').innerHTML += moonCardImageData;

        // yearCard Image Tag Insert
        const yearCardTitle = '<h2>[Life Year Card] {{year}}년기준 : {{title}}</h2>';
        const yearCardImage = '<img src="{{image}}">';

        var yearCardTitleTemplate = Handlebars.compile(yearCardTitle);
        var yearCardImageTemplate = Handlebars.compile(yearCardImage);

        var yearCardTitleData = yearCardTitleTemplate({year: date.getFullYear(), title: yearCards["c_id"]});
        var yearCardImageData = yearCardImageTemplate({image: yearCards["c_image"]});

        document.getElementById('yearCard').innerHTML += yearCardTitleData;
        document.getElementById('yearCard').innerHTML += yearCardImageData;

        // zodiacTwelveCard Image Tag Insert
        const zodiacTwelveCardImage = '<img src="{{image}}">';

        var zodiacTwelveCardImageTemplate = Handlebars.compile(zodiacTwelveCardImage);

        var zodiacTwelveCardImageData = zodiacTwelveCardImageTemplate({image: zodiacCards["c_image"]});

        document.getElementById('zodiacTwelveCard').innerHTML += zodiacTwelveCardImageData;

        // zodiacTwelveCard Image Tag Insert
        const zodiacFortyEightCardImage = '<img src="{{image}}">';

        var zodiacFortyEightCardImageTemplate = Handlebars.compile(zodiacFortyEightCardImage);

        var zodiacFortyEightCardImageData = zodiacFortyEightCardImageTemplate({image: zodiacCards2["c_image"]});

        document.getElementById('zodiacFortyEightCard').innerHTML += zodiacFortyEightCardImageData;

        // My Tarot Profile Handlebars Template
        const tarotProfileTemplateSource = document.getElementById('tarot-profile-template').innerHTML;
        const tarotProfileTemplate = Handlebars.compile(tarotProfileTemplateSource);


        const tarotProfileContext = {
            soulCard: queryObject.soulCard,
            soulCardName: soulCards["c_name"],
            moonCard: queryObject.moonCard,
            moonCardName: moonCards["c_name"],
            yearCard: queryObject.yearCard,
            yearCardName: yearCards["c_name"],
            zodiacCardName: zodiacCards["c_name"],
            currentYear: date.getFullYear(),
        }
        const tarotProfileHtml = tarotProfileTemplate(tarotProfileContext);

        document.getElementById('tarot-profile').innerHTML = tarotProfileHtml;
    });

    // My Life Profile Handlebars Template
    const profileTemplateSource = document.getElementById('profile-template').innerHTML;
    const profileTemplate = Handlebars.compile(profileTemplateSource);

    var numDaysSinceBirth = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(queryObject.birthYear, queryObject.birthMonth - 1, queryObject.birthDay)) / (1000 * 60 * 60 * 24));

    const profileContext = {
        name: queryObject.name,
        birthDay: queryObject.birthDay,
        birthMonth: queryObject.birthMonth,
        birthYear: queryObject.birthYear,
        numDaysSinceBirth: numDaysSinceBirth,
    };

    const profileHtml = profileTemplate(profileContext);

    document.getElementById('profile').innerHTML = profileHtml;
    
    // Year Card Graph
    const xYearCardGraph = queryObject.dataPoints.map((dataPoint) => { return dataPoint.x; });
    const yYearCardGraph = queryObject.dataPoints.map((dataPoint) => { return dataPoint.y; });

    const yearCardCanvas = document.getElementById('yearCardGraphCanvas');
    const yearCardCtx = yearCardCanvas.getContext('2d');

    new Chart(yearCardCtx, {
        type: 'line',
        data: {
            labels: xYearCardGraph, // Should represent the x-axis values
            datasets: [{
                label: 'Year',
                data: yYearCardGraph, // Should represent the y-axis values
                backgroundColor: 'rgba(51, 102, 153, 0.5)',
                borderColor: 'rgba(51, 102, 153)',
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });

    // Biorhythm Graph
    const xBiorhythmGraphstart = numDaysSinceBirth - 15;
    var xBiorhythmGraph = [];
    var yIntellectualGraph = [];
    var yEmotionalGraph = [];
    var yPhysicalGraph = [];
    var yIntuitionGraph = [];

    for (var i = xBiorhythmGraphstart; i < numDaysSinceBirth + 25; i++) {
        var xDate = (i * (1000 * 60 * 60 * 24)) + Date.UTC(queryObject.birthYear, queryObject.birthMonth - 1, queryObject.birthDay);
        var xday = new Date(xDate).getDate();
        var xmonth = new Date(xDate).getMonth();
        var xyear = new Date(xDate).getFullYear();
        xBiorhythmGraph.push((xmonth+ 1) + "/" + xday);
        yIntellectualGraph.push(Math.sin(2 * Math.PI * i / 33));
        yEmotionalGraph.push(Math.sin(2 * Math.PI * i / 28));
        yPhysicalGraph.push(Math.sin(2 * Math.PI * i / 23));
        yIntuitionGraph.push(Math.sin(2 * Math.PI * i / 38));
    }
    const biorhythmCanvas = document.getElementById('biorhythmGraphCanvas');
    const biorhythmCtx = biorhythmCanvas.getContext('2d');

    new Chart(biorhythmCtx, {
        type: 'line',
        data: {
            labels: xBiorhythmGraph, // Should represent the x-axis values
            datasets: [{
                label: 'Intellectual',
                data: yIntellectualGraph, // Should represent the y-axis values
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                borderColor: 'rgba(0, 255, 0)',
                borderWidth: 1,
                fill: false,
            },
            {
                label: 'Emotional',
                data: yEmotionalGraph, // Should represent the y-axis values
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'rgba(255, 0, 0)',
                borderWidth: 1,
                fill: false,
            },
            {
                label: 'Physical',
                data: yPhysicalGraph, // Should represent the y-axis values
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                borderColor: 'rgba(0, 0, 255)',
                borderWidth: 1,
                fill: false,
            },
            {
                label: 'Intuition',
                data: yIntuitionGraph, // Should represent the y-axis values
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderColor: 'rgba(0, 0, 0)',
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      xMin: xBiorhythmGraph[15],
                      xMax: xBiorhythmGraph[15],
                      borderColor: 'rgb(252, 165, 3)',
                      borderWidth: 2,
                      label: {
                        content: "Today",
                        backgroundColor: 'rgba(252, 165, 3, 0.5)',
                        display: true
                      }
                    }
                  }
                }
              }
        }
    });
});
