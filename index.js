const main = document.getElementById("mainContain");
 
const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
 
const colors = ["red", "blue", "green", "yellow"];
 
const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};
 
colors.forEach((color) => {
  const button = document.createElement("button");
  button.id = color;
  button.className = "colorButton";
  button.addEventListener(("click"),()=>{
    handle(button.id)
    
  })
  mainDiv.appendChild(button);
});
 
const startButton = document.createElement("button");
startButton.id = "startButton";
startButton.textContent = "Start Game";
 
main.appendChild(mainDiv);
main.appendChild(startButton);
 
let sequence = [];
let playerSequence = [];
let level = 0;
let lengthSequence=1
let timeChange=1400
 function startGame(){
    playerSequence = [];
    sequence=[]
    nextLevel();
    
 }
 function nextLevel(){
    for(let i=0;i<lengthSequence;i++){
        const nextColor = colors[Math.floor(Math.random()*colors.length)]
        sequence.push(nextColor)
    }
    console.log(playerSequence);
    for(let i=0;i<sequence.length;i++){
        setTimeout(()=>{
            flashColor(sequence[i])
        },(i+1)*(timeChange+100))
    }
 }
 function flashColor(color){
    const button = document.getElementById(color)
    button.style.animation = `ajillah${colors.indexOf(color)+1} ${timeChange/1000}s linear`
    setTimeout(()=>{
        button.style.animation = "none"
    },timeChange+100)
 }
 function checkInput(){
        if(sequence[playerSequence.length-1]!=playerSequence[playerSequence.length-1]){
            startButton.removeAttribute("disabled")
            alert("game over")
            return
        }
        if(sequence.length===playerSequence.length){
            playerSequence=[]
            lengthSequence++
            if(timeChange>500){
                timeChange-=100
            }else timeChange=500
            sequence=[]
            setTimeout(nextLevel,500)
        }
        
 }
 function handle(colorId){
    playerSequence.push(colorId)
    flashColor(colorId)
    checkInput(playerSequence.length-1)
 }
startButton.addEventListener("click",()=>{
    startButton.setAttribute("disabled","disabled")
startGame()
})
 