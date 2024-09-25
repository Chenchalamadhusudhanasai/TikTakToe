let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContianer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playeX,playerO
let count = 0;//Tracking of draw condition
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContianer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if(turnO){
            box.innerText = "O";
            box.style.color = "#90EE90";
            turnO=false;
        }else{
            box.innerText="X";
            box.style.color = "#FFB6C1";
            turnO=true;
        }
        box.disabled=true;//this is because it allow us to click the button only once
        //(as per tic tac toe game we have to write inside the box only once)
        count++;
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }

    });
});

const gameDraw = () => {
    msg.innerText = `Game was Draw.`;
    msgContianer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes = () =>{//oka winner dicided ayyaka ade game lo inko winner rakunda boxes ni disabled chese function
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes = () =>{//opposite to disable boxes funtion
    for(let box of boxes){
        box.disabled=false;
        box.innerText ="";
    }
}
const showWinner = (winner) =>{
      msg.innerText = `Congratulations, Winner is ${winner}`;
      msgContianer.classList.remove("hide");
}
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != ""&&pos2Val != ""&&pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                
                showWinner(pos1Val);
            }
        }
   }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);