var w = window.innerWidth - window.innerWidth % 10;
var h = window.innerHeight - window.innerHeight % 10;
var pause = false;
var state;
var gamestate = "start";


class Snake{
        constructor(){
                this.x = 0;
                this.y = 0;
                this.xspeed = 0;
                this.yspeed = 0;
                this.length = 0;
                this.history = [createVector(this.x,this.y)];
        }

        print(){
                for(var i=0;i< this.history.length-1;i++){
                        this.history[i] = this.history[i+1];
                }
                this.history[this.length-1] = createVector(this.x,this.y);

                this.x += this.xspeed;
                if(this.x  >= w){
                        this.x = 0;
                }else if(this.x  == -20){
                        this.x = w;
                }
                this.y += this.yspeed;
                if(this.y  >= h){
                        this.y = 0;
                }else if(this.y  < 0){
                        this.y = h;
                }

                for(var i=0; i<this.history.length;i++){
                        var d = dist(this.x,this.y,this.history[i].x,this.history[i].y);
                        if(d < 1 && this.length != 0){
                                this.history = [];
                                this.length = 0;
                                gamestate = "gameover";
                        }
                }

                fill(255);
                for(var i=0; i<this.length; i++){
                        rect(this.history[i].x,this.history[i].y,20,20);
                }
                rect(this.x,this.y,20,20);
                this.eat()
        }

        eat(){
                var distance = dist(this.x,this.y,food.pos.x,food.pos.y)
                if(distance < 1){
                        this.length++;
                        food.pos = createVector((floor(random(food.x))*20),(floor(random(food.y))*20));
                        food.print();
                }
        }
}

class Food{
        constructor(){
                this.x = floor(w/20);
                this.y = floor(h/20);
                this.pos = createVector((floor(random(this.x))*20),(floor(random(this.y))*20));
        }

        print(){
                fill(255,0,0);
                rect(this.pos.x,this.pos.y,20,20);
        }
}

var pre = "";

function setDirection(x,y){
        snake.xspeed = x;
        snake.yspeed = y;
}

function runner(x,y,d){
        if(gamestate == "running" || gamestate == "start"){
                setDirection(x,y);
                pre = d;
                gamestate = "running";
        }
}

function keyPressed(){
        if(keyCode === UP_ARROW){
                if(snake.length != 0){
                        if(pre != "d"){
                                runner(0,-20,"u")
                        }
                }else{
                        runner(0,-20,"u")
                }
        }else if(keyCode === LEFT_ARROW){
                if(snake.length != 0){
                        if(pre != "r"){
                                runner(-20,0,"l")
                        }
                }else{
                        runner(-20,0,"l")
                }
        }else if(keyCode === RIGHT_ARROW){
                if(snake.length != 0){
                        if(pre != "l"){
                                runner(20,0,"r")
                        }
                }else{
                        runner(20,0,"r")
                }
        }else if(keyCode === DOWN_ARROW){
                if(snake.length != 0){
                        if(pre != "u"){
                                runner(0,20,"d")
                        }
                }else{
                        runner(0,20,"d")
                }
        }else if(key == "P"){
                if(gamestate == "running"){
                        state = createVector(snake.xspeed,snake.yspeed);
                        setDirection(0,0);
                        frameRate(0);
                        textSize(120)
                        text("Game paused",w/2,h/4)
                        text(" Press P to resume!",w/2,h/2)
                        gamestate = "paused"
                }else{
                        if(gamestate != "gameover"){
                                frameRate(23);
                                setDirection(state.x,state.y);
                                gamestate = "running";
                        }
                }
        }else if(key == "S"){
                if(gamestate == "gameover"){
                        setup()
                        gamestate = "running"
                }
        }
}

function setup() {
        createCanvas(w,h)
        snake = new Snake();
        food = new Food();
        frameRate(23);
        textAlign(CENTER,CENTER);
        textSize(50);
        textFont('Patrick Hand');
}

function draw() {
        background(255);
        snake.print();
        food.print();
        fill(0);
        textSize(50);
        text("Score-"+snake.length,(w*80/100),(h*10/100)); 
        if(gamestate == "start"){
                textSize(120)
                text("Use arrows to play,",w/2,h/3)
                text("P to pause",w/2,h/2)
        }else if(gamestate == "gameover"){
                frameRate(0)
                textSize(120)
                text("Game Over",w/2,h/3)
                text("Press S to try again",w/2,h/2)
        }
}
