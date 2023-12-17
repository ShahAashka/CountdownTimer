const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
// const continueBtn = document.getElementById("continue-btn");
// const pauseBtn = document.getElementById("pause-btn");

const hours = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("second");
let remainingTime = 0
let timerId

//common functions

function changeCurrentState(currentState){
    if(currentState == "Start"){
        startBtn.innerText = "Pause"
        startBtn.classList.remove("start-button")
        startBtn.classList.add("pause-button")
    }else if(currentState == "Pause"){
        startBtn.innerText = "Continue"
        startBtn.classList.remove("pause-button")
        startBtn.classList.add("continue-button")
    }else if(currentState == "Continue"){
        startBtn.innerText = "Pause"
        startBtn.classList.remove("continue-button")
        startBtn.classList.add("pause-button")
    }else if(currentState == "Reset"){
        startBtn.innerText = "Start"
        startBtn.classList.remove("pause-button") || startBtn.classList.remove("continue-button");
        startBtn.classList.add("start-button")
    }
}

function timer(h, m, s){
    //run setInterval
    //trnasform all into total seconds
    let totalSeconds = (h * 3600) + (m * 60) + s;
    remainingTime = totalSeconds
        timerId = setInterval(() => {
        remainingTime -= 1;
        if(remainingTime == -1){
            clearInterval(timerId)
            return;
        }
        updateInUi(remainingTime);
    }, 1000)
}

function convertSecondstoHMS(seconds){
    let hrs = Math.floor(seconds/3600)
    let mins = Math.floor((seconds % 3600) / 60)
    let secs = seconds % 60
    return [hrs, mins, secs]
}

function updateInUi(timeLeft){
    let [hrs, mins, secs] = convertSecondstoHMS(timeLeft)
    if(secs > 0 ){
        if(secs == 59){
            minutes.value = mins;
            hours.value = hrs;
        }
        secs -= 1;
        seconds.value = secs;
        return;
    }
    if(mins > 0){
        if(mins == 59){
            hours.value = hrs
        }
        mins -= 1;
        minutes.value = mins;
        seconds.value = 59;
        return;
    }
    if(hrs > 0){
        hrs -= 1;
        hours.value = hrs;
        minutes.value = 59;
        seconds.value = 59;
    }
}

//event listeners
startBtn.addEventListener("click", function(){
    
    let currentState = startBtn.innerText

    if(currentState == "Start"){       
        let hrs = parseInt(hours.value) || 0;
        let mins = parseInt(minutes.value) || 0;
        let secs =  parseInt(seconds.value) || 0;
        changeCurrentState(currentState)
        timer(hrs, mins, secs);
    }
    else if(currentState == "Pause"){
        changeCurrentState(currentState)
        clearInterval(timerId)
    }
    else if(currentState == "Continue"){
        changeCurrentState(currentState)
        let [hrs, mins, secs] = convertSecondstoHMS(remainingTime)
        timer(hrs, mins, secs);
    }
});

resetBtn.addEventListener("click", function(){
    clearInterval(timerId)
    changeCurrentState("Reset")
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
})

// pauseBtn.addEventListener("click", function(){
//     clearInterval(timerId)
// })

// continueBtn.addEventListener("click", function(){
//     let [hrs, mins, secs] = convertSecondstoHMS(remainingTime)
//     timer(hrs, mins, secs);
// })