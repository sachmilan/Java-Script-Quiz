/*variables for the questionary*/
var timeEl = document.querySelector("#time");
var mainEl = document.querySelector(".main");
var buttonEl = document.querySelector("#start");
var contEl = document.querySelector(".Container");
var hEl = document.querySelector("#title");
var listEl = document.querySelector("#list");
var finish = document.querySelector(".finish");
var final = document.querySelector("#result");
var errMsg = document.querySelector("#error");
var input = document.querySelector("#input").value;
var submitEl = document.querySelector(".btn");
var response = document.querySelector("#response");
var finalpage = document.querySelector(".final");
var initialAndScore = document.querySelector("#end");

/*questions*/
var questions = [
    
    {
        title: "How to ask for a value in a pop up box ?",
        choices: ["Confirm", "Alert", "Prompt", "Value"],

        answer: "Prompt",
    },
    {
        title: "You can listen for the mouse click by using",
        choices: ["keyUpEvent", ".Value", "addEventListner", "keyDownEvent"],
        answer: "addEventListner",
    },
    {
        title: "How many ways can you use a Java Script in a HTML document.",
        choices: ["1", "2", "3", "4"],
        answer: "3",
    },
    {
        title: "Chose the one that will return first element.",
        choices: ["Return", "Attribute", 
        "querySelectorall()", "querySelector()"],
        answer: "querySelector()",
    },
    {   
        title: "Data types DO NOT include:",
        choices: ["String", "Bool", "Confirm", "Number"],
        answer: "Confirm",
    }
]

function displayQuestions() {
    var holdQ1Title = questions[i].title
    hEl.textContent = holdQ1Title
    var holdq1Choice1 = questions[i].choices[0];
    var holdq1Choice2 = questions[i].choices[1];
    var holdq1Choice3 = questions[i].choices[2];
    var holdq1Choice4 = questions[i].choices[3];

    listEl.innerHTML = '';

    var liTag1 = document.createElement("li");
    liTag1.setAttribute("class", "all_li")
    var btn = document.createElement('button');
    btn.setAttribute("class", "all_btn")
    btn.textContent = holdq1Choice1;
    liTag1.appendChild(btn)
    listEl.appendChild(liTag1);
    contEl.appendChild(listEl);

    var liTag2 = document.createElement("li");
    liTag2.setAttribute("class", "all_li");
    var btn2 = document.createElement('button');
    btn2.setAttribute("class", "all_btn")
    btn2.textContent = holdq1Choice2;
    liTag2.appendChild(btn2)
    listEl.appendChild(liTag2)
    contEl.appendChild(listEl);

    var liTag3 = document.createElement("li");
    liTag3.setAttribute("class", "all_li")
    var btn3 = document.createElement('button');
    btn3.setAttribute("class", "all_btn")
    btn3.textContent = holdq1Choice3;
    liTag3.appendChild(btn3)
    listEl.appendChild(liTag3)
    contEl.appendChild(listEl);

    var liTag4 = document.createElement("li");
    liTag4.setAttribute("class", "all_li")
    var btn4 = document.createElement('button');
    btn4.setAttribute("class", "all_btn");
    btn4.textContent = holdq1Choice4;
    liTag4.appendChild(btn4);
    listEl.appendChild(liTag4);
    contEl.appendChild(listEl);
    var allBtnEl = document.querySelectorAll(".all_btn")
    allBtnEl.forEach(function (event) {
        event.addEventListener("click", onclickHandler)
    });
}

var timer = 80;
var timeCount;
/*timer*/
function setupTimer() {
    timeCount = setInterval(function () {
        timer--;
        var timeReset = timeEl.textContent = "Seconds Remaining:" + " " + timer;
       timer = timer;
        if (timer <= 0) {         
            clearInterval(timeCount);
              
            timeEl.textContent = timeReset;
             
        }
    }, 1000)
}
 
/**Start Button*/
document.addEventListener("click", function (event) {
    if (event.target === buttonEl) {
        mainEl.style.display = "none";
        setupTimer()
        displayQuestions();
    }

})

var i = 0;

/*Response Checking*/
function onclickHandler(event) {
     
    if(timer<=0){
        clearInterval(timeCount);
        contEl.style.display="none";
        displayResult();
    }
    var answerText = event.target.textContent 
    if (answerText === questions[i].answer) {
        timer = timer;
        response.setAttribute("style", "color: green")
        response.textContent = "Correct";
    } else {

        response.setAttribute("style", "color: red")
        response.textContent = "Wrong";
        timer = timer - 15;
     }
    
      
     
    if (i < questions.length-1) {

      i++;

      setTimeout(function () {
      displayQuestions();
      response.textContent = "";
    }, 1000)
    }else {
        setTimeout(function () {
            response.textContent = "";
            displayResult();
            clearInterval(timeCount);
          
        }, 500)
    

        contEl.innerHTML = '';
     }
     
    /**Final Scores */
    function displayResult() {
        finish.style.visibility = "visible";
        timeEl.textContent = "Time:" + " " + timer;
        var HighScores = timer;
        localStorage.getItem(HighScores)
        final.textContent = "Your finally score is: " + HighScores;
         localStorage.setItem("HighScores", HighScores)
 
    }
}

function renderLastItem() {
    var yourScore = localStorage.getItem("HighScores");
     var yourInitial = localStorage.getItem("Initial");
     if (yourScore && yourInitial === "") {
        return
    }
    finish.textContent = "";
    var finalpage = document.querySelector(".final-page");
    finalpage.style = visible;
    var initialAndScore = document.querySelector("#staticEmail");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;

}
 
//** Records in Web Browser, check in application*/
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.querySelector("#input").value;
    if (input === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";
        localStorage.getItem(input)
        localStorage.setItem("Initial", input)
         renderLastItem()
    }

})

/*function init() {
     location.reload();
 
}
/**This function will  clear initial and score displayed on the final page */
/*function clearScore() {
    initialAndScore.value = "";
}*/

 