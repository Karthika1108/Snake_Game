var blockSize=25;
var row=20;
var col=20;
var board;
var content;
var gameOver=false;
var score=0;
//snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;

//food
var foodX;
var foodY;

//speed
var velocityX=0;
var velocityY=0;

var snakeBody=[];

window.onload=function(){
    board=document.getElementById("board");
    board.height=blockSize * row;
    board.width=blockSize * col;
    content=board.getContext("2d");
    placeFood();
    document.addEventListener("keyup",changeDirection);
    if(score==0 || score==1 || score==2){
        setInterval(update,1000/2);
    }
    else if(score==3 || score==4 || score==5){

        setInterval(update,1000/3);
    }
    else if(score>5 && score<10){
        setInterval(update,1000/5);
    }
    else if(score>10 && score<15){
        setInterval(update,1000/7);
    }
    else if(score>15 && score<20){
        setInterval(update,1000/9);
    }
    else{
          setInterval(update,1000/10);
    }
   // update();
}
function changeDirection(e){
    if(e.code =="ArrowUp" && velocityY!=1){
        velocityX= 0;
        velocityY=-1;
    }
    else if(e.code =="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.code=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.code=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}
function update(){
    if(gameOver){
        return;
    }
    content.fillStyle="black";
    content.fillRect(0,0,board.width,board.height);


    content.fillStyle="white";
    content.fillRect(foodX,foodY,blockSize,blockSize)

    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        score=score+1;
      //  console.log("hello",foodX,foodY);
        placeFood();
    }
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }
    content.fillStyle="red";
    snakeX+=velocityX * blockSize;
    snakeY+=velocityY * blockSize;
    content.fillRect(snakeX,snakeY,blockSize,blockSize);

    for(let i=0;i<snakeBody.length;i++){
        content.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    if(snakeX<0 || snakeX>col*blockSize || snakeY<0 || snakeY>row*blockSize){
        gameOver=true;
        alert("Game Over and your score = " + score)
      
    }
    
}
function placeFood(){
    foodX=Math.floor(Math.random()*col)*blockSize;
    foodY=Math.floor(Math.random()*row)*blockSize;

}