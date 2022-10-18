let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
var scale = 2;
canvas.width *= scale;
canvas.height *= scale;
let mainAudio = document.getElementById('main-audio');
mainAudio.volume = 0.05;
mainAudio.muted = true;

window.addEventListener('load',  function () {
    window.addEventListener('click', targetting);
    const startGame = document.getElementById('start-game');
    startGame.addEventListener('click',myGameArea.start);   
}
);

window.addEventListener('keydown', (e)=>{
    if(e.keyCode === 38){
        player.moveUp();
    } else if (e.keyCode === 40){
        player.moveDown();
    }
})


const myGameArea = {
    canvas: document.querySelector('#canvas'),
    frames: 0,
    timing:60, // check when it's time to add obstacles
    start: function () { // setting up canvas on the page
        const textInformation = document.getElementById('text-information');
        const startGame = document.getElementById('start-game');
        mainAudio.muted = false;
        textInformation.remove();
        startGame.remove();
        let soundButton = document.createElement('button');
        soundButton.className = 'stop-audio'
        const newContent = document.createTextNode('Stop Audio');
        soundButton.appendChild(newContent);
        document.body.insertBefore(soundButton, canvas);
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('canvas').style.border = "2px brown solid";
      // call updateGameArea() every 20 milliseconds
      intervalId = setInterval(renderGame, 20);
    },
    clear: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
    stop: function () {
        clearInterval(intervalId);
      },
    score: function () {
        let points = player.balance;
        player.balance +=0;
        ctx.font = '16px serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`Balance: $${points}`, 10, 15);
      },
      timer: function() {
        if (this.frames % 50 === 0 && this.timing > 0){
            this.timing -=1;
        }
        if (this.timing <= 0 && player.balance < 10000 || player.balance <= 0){
            clearInterval(intervalId);
            let mainAudio = document.getElementById('main-audio');
            mainAudio.muted = true;
            ctx.clearRect(0,22,canvas.width,canvas.height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#a52a2a";
            ctx.font="16px Georgia";
            ctx.fillStyle = "#a52a2a";
            ctx.fillText(`You have lost all your Cash Balance in this cycle`, 75, 150);
            ctx.fillText('Better luck next time!',75, 215);
            restartGame();
            }
        if (player.balance >= 10000){
            clearInterval(intervalId);
            let mainAudio = document.getElementById('main-audio');
            mainAudio.muted = true;
            ctx.clearRect(0,22,canvas.width,canvas.height);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#a52a2a";
            ctx.font="16px Georgia";
            ctx.fillStyle = "#a52a2a";
            ctx.fillText(`Congratulations on surviving the Bull Market with over $${player.balance} Cash!`, 75, 150);
            restartGame();
            }
        ctx.fillStyle = 'black';
        ctx.fillText(`Time left: ${this.timing}`, 200, 15);
      }
  };


class Player{
    constructor(){
        this.x = 25;
        this.y = 50;
        this.balance = 1000;
        this.width = 35;
        this.height = 55;
        const img = new Image();
        img.src = "./images/General Resources/player/business_suit-small-bg-removed.png";
        img.onload = () => {
        this.img = img;
        this.draw();           
     }
         }
    moveUp(){
        console.log('up' + this.y);
        if(this.y > 45){
        this.y -= 15;
        }
    }
    moveDown(){
        console.log('down' +this.y);
        if (this.y <240){
            this.y +=15;
        }
    }
    draw(){
        ctx.drawImage(player.img, this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
}

class Scamcoins{
    constructor(y, points){
        this.x = canvas.width;
        this.y = y;
        this.points = points;
        this.width = 20;
        this.height = 25;

        const img2 = new Image();
        img2.src = "./images/Scam-coins logo/dogecoin small size v2.svg";
        img2.onload = () => {
            this.img = img2;
            this.draw();
            }

    }
  draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }   
}

class Bluechips{
    constructor(y, points){
        this.x = canvas.width;
        this.y = y;
        this.points = points;
        this.width = 20;
        this.height = 25;

        const img3 = new Image();
        img3.src = "./images/bluechips/btc logo small size.svg";
        img3.onload = () => {
            this.img = img3;
            this.draw();
            }

    }
  draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
}

class Bluechips2{
    constructor(y, points){
        this.x = canvas.width;
        this.y = y;
        this.points = points;
        this.width = 20;
        this.height = 25;

        const img4 = new Image();
        img4.src = "./images/bluechips/ethereum logo small size.svg";
        img4.onload = () => {
            this.img = img4;
            this.draw();
            }
    }
  draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
}


class Bear{
    constructor(y){
        this.x = canvas.width;
        this.y = y;
        this.width = 43;
        this.height = 40;

        const bearImg = new Image();
        bearImg.src = "./images/General Resources/Bear Obstabcle/bear - transparent.png";
        bearImg.onload = () => {
            this.img = bearImg;
            this.draw();
            }
    }
  draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
    
}

class RandomEvent{
    constructor(y, points){
        this.x = canvas.width;
        this.y = y;
        this.points = points;
        this.width = 25;
        this.height = 30;

        const randomEventImg = new Image();
        randomEventImg.src = "./images/General Resources/Random Event/whole gift transparent.png";
        randomEventImg.onload = () => {
            this.img = randomEventImg;
            this.draw();
            }
    }
  draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
}

const player = new Player();

function renderGame(){
    myGameArea.clear();
    backgroundMoveDraw();
    player.draw();
    myGameArea.frames += 1;
    updateObstacles();
    removeBalance();
    addBalance();
    bearAttack();
    randomPoints();
    myGameArea.timer();
    myGameArea.score();
    ctx.rect(0,20,1000,1);
    ctx.fill();
}

function targetting(event){
    let target = event.target;
    console.log(target);
    if (target.className === 'restart-button'){
        myGameArea.timing = 60;
        console.log(myGameArea);
        myGameArea.frames = 0;
        player.balance = 1000;
        console.log(player);
        myBluechips = [];
        myObstacles = [];
        bearObstacles = [];
        randomEvents = [];
        myGameArea.start = function (){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            mainAudio.muted = false;
            document.getElementById('canvas').style.display = 'block';
            document.getElementById('canvas').style.border = "2px brown solid";
            intervalId = setInterval(renderGame, 20);
        };
        target.remove();
        myGameArea.start();
    } 
    if (target.className === 'stop-audio'){
            stopAudio();

    }
        };

let myObstacles = [];
let myBluechips = [];
let bearObstacles = [];
let randomEvents = [];

function updateObstacles() {
    let randomNumber = Math.floor(Math.random() * 1000);
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -2;
        myObstacles[i].draw();
    }
    for (i=0; i<myBluechips.length; i++){
        myBluechips[i].x += -2;
        myBluechips[i].draw();
    }
    for (i=0;i<bearObstacles.length;i++){
        bearObstacles[i].x += -8;
        bearObstacles[i].draw();
    }
    for(i=0;i<randomEvents.length;i++){
        randomEvents[i].x += -2;
        randomEvents[i].draw();
    }
    if (randomNumber <= 350 &&  myGameArea.frames % 25 === 0) { // every 1s
      let y = Math.floor(Math.random() * (240 - 45 + 1) + 45);
      let points = Math.floor((Math.random() * -750)-150);
      myObstacles.push(new Scamcoins(y, points));//
    }
    if (randomNumber > 350 && randomNumber < 650 && myGameArea.frames % 50 === 0){ // every 1.9s
        let y = Math.floor(Math.random() * (240 - 45 + 1) + 45);
        let points = Math.floor((Math.random() * 300)+150);
        myBluechips.push(new Bluechips(y, points));
    }
    if (randomNumber >= 650 && myGameArea.frames % 30 === 0){ // every 2.4s
        let y = Math.floor(Math.random() * (240 - 45 + 1) + 45);
        let points = Math.floor((Math.random() * 300)+150);
        myBluechips.push(new Bluechips2(y, points));
    }
    if (myGameArea.frames % 300 === 0){
        let y = Math.floor(Math.random() * (240 - 45 + 1) + 45);
        bearAudio();
        bearObstacles.push(new Bear(y));
    }
    if(myGameArea.frames % 200 ===0){
        let y = Math.floor(Math.random() * (240 - 45 + 1) + 45);
        let randomizer = Math.floor(Math.random() * 100);
        if (randomizer>50){
            //randomEventAudio();
        let points = Math.floor((Math.random() * 500)+150);
        randomEvents.push(new RandomEvent(y, points));
        }
        if (randomizer<=50){
            //randomEventAudio();
        let points = Math.floor((Math.random() * -500)-150);
        randomEvents.push(new RandomEvent(y, points));
        }
    }
  }

function removeBalance() {
    // check if one obstacle has had a collision with player
    if (myObstacles.length > 0){
    for(i=0;i<myObstacles.length;i++){
        if (!(player.right() <= myObstacles[i].left()) && !(player.left() >= myObstacles[i].right()) && !(player.top() >= myObstacles[i].bottom()) && !(player.bottom() <= myObstacles[i].top())) { // if there’s a collision
            let points = myObstacles[i].points;
            negativeAudio();
            player.balance += points; // remove the Points from player’s Balance
            myObstacles.splice(i,1); //remove obstacle from obstacle array
            
    }
        }
    }
    }
    
function addBalance() {
    for(j=0;j<myBluechips.length;j++){
            if (!(player.right() <= myBluechips[j].left()) && !(player.left() >= myBluechips[j].right()) && !(player.top() >= myBluechips[j].bottom()) && !(player.bottom() <= myBluechips[j].top())) { // if there’s a collision
            let points = myBluechips[j].points;
            bonusAudio();
            player.balance += points;
            myBluechips.splice(j,1);
             // adds the Points from player’s Balance
    }
        }
}

function bearAttack(){
    for (h=0;h<bearObstacles.length;h++){
        if (!(player.right() <= bearObstacles[h].left()) && !(player.left() >= bearObstacles[h].right()) && !(player.top() >= bearObstacles[h].bottom()) && !(player.bottom() <= bearObstacles[h].top())) { // if there’s a collision
            player.balance -= player.balance;
            bearObstacles.splice(h,1);

    }
}
}

function randomPoints(){
    for(k=0;k<randomEvents.length;k++){
        if (!(player.right() <= randomEvents[k].left()) && !(player.left() >= randomEvents[k].right()) && !(player.top() >= randomEvents[k].bottom()) && !(player.bottom() <= randomEvents[k].top())) { // if there’s a collision
            let points = randomEvents[k].points;
            if (points > 0){
                bonusAudio();
            }
            if (points <= 0){
                negativeAudio();
            }
            player.balance += points;
            randomEvents.splice(k,1);
    }
    }
}
    
function restartGame(){
        const newDiv = document.createElement('button');
        newDiv.className = 'restart-button'
        const newContent = document.createTextNode('Restart Game');
        newDiv.appendChild(newContent);
        const lastDiv = document.getElementById('last-div')
        document.body.insertBefore(newDiv, lastDiv);
}

const background = new Image();
background.src = './images/General Resources/Background/medieval arena with white and tribunes.jpg';

background.onload = ()=>{
    ctx.drawImage(background,0,0);
}

const backgroundImage = {
  img: background,
  x:0,
  y:0, 
  speed: 1,
  move: function() {
    this.x -= this.speed; // controls the vertical movement
    this.x %= canvas.width; // this is the best way i found to make the image loop and avoid white space in background
  },
  draw: function() {
    ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, canvas.width, canvas.height);
  },
};


function backgroundMoveDraw(){
    backgroundImage.move();
    backgroundImage.draw();
}


function stopAudio(){
    console.log(mainAudio);
        if(mainAudio.muted === false){
        mainAudio.muted = true;
        } else if (mainAudio.muted === true){
            mainAudio.muted = false;
        }
}


function bonusAudio(){
    const positiveAudio = new Audio('./images/General Resources/Audio/on Score +/mixkit-player-boost-recharging-2040.wav');
    positiveAudio.volume = 0.1;
    positiveAudio.play();
}

function negativeAudio(){
    const negativeAudio = new Audio('./images/General Resources/Audio/on Score - /negative audio to try - trimmed.wav');
    negativeAudio.volume = 0.1;
    negativeAudio.play();
}

function bearAudio(){
    const bearAudio = new Audio ('./images/General Resources/Audio/Bear Sound/bear growling.wav');
    bearAudio.volume = 1;
    bearAudio.play();
}

//function randomEventAudio(){
//    const randomAudio = new Audio ('/images/General Resources/Audio/RandomEvent/sound trimmed.wav');
//    randomAudio.volume = 0.15;
//    randomAudio.play();
//}