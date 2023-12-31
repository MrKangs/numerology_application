// For Google App Script

// <!-- https://drive.google.com/uc?id=FILE_ID_HERE&export=download -->


// Calculate the Soul Card based on the user's birth year, month, and day
function soulCardCalc(birthYear, birthMonth, birthDay){
    var yearSum = birthYear.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var monthSum = birthMonth.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var daySum = birthDay.toString().split('').map(Number).reduce((a, b) => a + b, 0);

    var soulCard = yearSum + monthSum + daySum;

    
    while (soulCard > 9){
        soulCard = soulCard.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return soulCard;

}

// Calculate the Moon Card based on the user's birth month and day
function moonCardCalc(birthMonth, birthDay){
    var monthSum = birthMonth.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var daySum = birthDay.toString().split('').map(Number).reduce((a, b) => a + b, 0);

    var moonCard = monthSum + daySum;

    while (moonCard > 22){
        moonCard = moonCard.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return moonCard;
}

// Calculate the Year Card based on the user's birth month, day, and the current year
function yearCardCalc(birthMonth, birthDay){
    var currentYear = new Date().getFullYear();
    var monthSum = birthMonth.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var daySum = birthDay.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var currYearSum = currentYear.toString().split('').map(Number).reduce((a, b) => a + b, 0);

    var yearCard = daySum + monthSum + currYearSum;

    while (yearCard > 22){
        yearCard = yearCard.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    if (yearCard == 22){
        yearCard = 0;
    }

    return yearCard;
}

// Calculate the Life Year Card based on the user's birth year, month, and day for the next 100 years of their birth year/
function lifeYearCardGraphDataPlot(birthYear, birthMonth, birthDay){

    var dataPoints = [];

    for (let i = 0; i <= 100; i++){
        var newYear = birthYear + i;
        var newYearSum = newYear.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        var monthSum = birthMonth.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        var daySum = birthDay.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        var yearSum = newYearSum + monthSum + daySum;
        if (yearSum > 22){
            yearSum = yearSum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }
        dataPoints.push({x: newYear, y: yearSum});
    }
    return dataPoints;
}

// Check whether the user's mbti input is valid
function checkMBTI(mbti){
    mbti = mbti.toUpperCase();
    var validMBTI = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];
    if (validMBTI.includes(mbti)){
        return true;
    }
    else{
        return false;
    }
}


// Wait for the HTML document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the form element
    var userForm = document.getElementById("userForm");

    // Add a submit event listener to the form
    userForm.addEventListener("submit", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get user input values
        var name = document.getElementById("name").value;
        var birthYear = parseInt(document.getElementById("birthYear").value);
        var birthMonth = parseInt(document.getElementById("birthMonth").value);
        var birthDay = parseInt(document.getElementById("birthDay").value);
        if (document.getElementById("needInfo").checked){
            var needInfo = true;
        }
        else{
            var needInfo = false;
        }
        var soulCard = soulCardCalc(birthYear, birthMonth, birthDay);
        var moonCard = moonCardCalc(birthMonth, birthDay);
        var yearCard = yearCardCalc(birthMonth, birthDay);
        var lifeYearCardGraphData = lifeYearCardGraphDataPlot(birthYear, birthMonth, birthDay);
        var mbti = document.getElementById("mbti").value;
        if (checkMBTI(mbti)){
            var validMBTI = mbti.toUpperCase();
        }
        else{
            var validMBTI = "Invalid/Incorrect MBTI";
        }

        // Create a query JSON
        var query = {
            name: name,
            birthYear: birthYear,
            birthMonth: birthMonth,
            birthDay: birthDay,
            mbti: validMBTI,
            soulCard: soulCard,
            moonCard: moonCard,
            yearCard: yearCard,
            dataPoints: lifeYearCardGraphData,
            needInfo: needInfo,

        };
        const queryString = JSON.stringify(query);
        window.location.href = `resultPage.html?query=${encodeURIComponent(queryString)}`;


    });
});
