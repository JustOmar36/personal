function timeCalc(id){
    var dateInput = document.getElementById(id);
    var targetDate = new Date(dateInput.value);
    var currentDate = new Date();
    var timeDiff = targetDate.getTime() - currentDate.getTime();
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    var answerElement = document.getElementById('answer');
    if(daysDiff > 0){answerElement.textContent = `Days until desired day: ${daysDiff}`;}
    else{answerElement.textContent = `Invalid Date`;}
}