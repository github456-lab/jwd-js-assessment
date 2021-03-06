/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });

  function timer() {
    var hour = 00;
    //edit seconds
    var sec = 35;
    //edit min
    var min = 00;
    if (min > 0) {
      sec = 60;
      min = min - 1;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    var timer = setInterval(function () {
      document.getElementById("time").innerHTML = `0${hour}:${min}:${sec}`;

      if (sec == 0) {
        if (min > 0) {
          min = min - 1;
          min = `0${min}`;
          sec = 60;
        }
      }
      sec--;

      if (sec < 0) {
        clearInterval(timer);
      }
      if (sec < 10) {
        sec = `0${sec}`;
      }
      if (min == 0) {
        if (sec == 0) {
          
           document.getElementById("time").innerHTML = "00:00:00 ";
          // windo.preventDefault();
         // alert("You have exceeded 2 minutes quiz time");
          document.getElementById("errMsg").innerHTML =
            "Sorry! Exceeded 2 mins quiz time.Please Click Reset button at the bottom to do the quiz again";
          document.getElementById("errMsg").classList.add("errmsg");
         
          calculateScore();
        }
      }
    }, 1000);
  }
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Which Australian state is the biggest (by size)?",
      o: ["Queensland", "Victoria", "Western Australia", "New South Wales"],
      a: 2,
    },
    {
      q: "How many states does Australia have?",
      o: ["4", "5", "7", "6"],
      a: 3,
    },
  ];
 timer();
  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1" > ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2" > ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3" > ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
   
  };
  btnSubmit = document.querySelector("#btnSubmit");
  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);
        let scoreDis = document.querySelector("#score");

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.classList.add("changecolor");
        }

        if (radioElement.checked) {
          // code for task 1 goes here

          //alert(i);
          if (quizItem.a === i) {
            score += 1;
            //alert(i);
            //scoreDis.innerHTML = `Your score is ${score}`;
          }
        }
        btnSubmit.style.display = "none";
       document.getElementById("errMsg").style.display = "none";

        if (score == 5) {
          scoreDis.innerHTML = `Your score is ${score}. Prefect score!`;
          scoreDis.classList.add("showscore");
        } else {
          scoreDis.innerHTML = `Your score is ${score}/${index+1} . Please Try Again! by clicking Reset Quiz button`;
          scoreDis.classList.add("showscore");
        }
      }
    });
  };
  const resetPage = () => {
   // window.location.reload(false);
    location.reload();
  };

  btnSubmit.addEventListener("click", calculateScore);
  btnReset = document.querySelector("#btnReset");
  btnReset.addEventListener("click", resetPage);
 
  // call the displayQuiz function
  displayQuiz();
});
