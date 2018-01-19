Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
 @shubhamk47
 Sign out
 Watch 0
  Star 0  Fork 0 shubhamk47/shubhamk47.github.io
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights  Settings
Branch: master Find file Copy pathshubhamk47.github.io/files/snake/snakesketch.js
a5b4889  3 minutes ago
@shubhamk47 shubhamk47 Update snakesketch.js
1 contributor
RawBlameHistory     
93 lines (82 sloc)  2.41 KB
var food;
var x;
var y;
function setup() {
        //x = window.innerWidth;
        //y = 800;
        createCanvas(1000, 900);
        frameRate(15);
        s = new snake();
        put();
}

function put(){
        var r = floor(x/20);
        //console.log(r);
        var c = floor(y/20);
        food = createVector((floor(random(r))*20),(floor(random(c))*20));
}

function snake(){
        this.x = 0;
        this.y = floor(height/2) - 20;
        this.xspeed = 0;
        this.yspeed = 0;
        this.l = 0;
        this.tail = [];
        //tail.push([this.x,this.y]);
        this.update = function(){

                for(i = 0; i < this.tail.length-1;i++){
                        this.tail[i] = this.tail[i+1];
                }
                this.tail[this.l-1] = createVector(this.x,this.y);

                if(this.x + this.xspeed < width && this.x + this.xspeed >=0){
                        this.x = this.x + this.xspeed;
                }
                if(this.y + this.yspeed < height && this.y + this.yspeed >=0){
                        this.y = this.y + this.yspeed;
                }

                for(i = 0;i<this.tail.length;i++){
                        var d = dist(this.x,this.y,this.tail[i].x,this.tail[i].y);
                        if(d<1){
                                this.tail = [];
                                this.l = 0;
                        }
                }
        }

        this.show = function(){
                fill(255);
                for(i = 0;i< this.l ; i++){
                        rect(this.tail[i].x,this.tail[i].y,20,20);
                }
                rect(this.x,this.y,20,20);
        }

        this.key = function(x,y){
                this.xspeed = x*20;
                this.yspeed = y*20;
        }

        this.eat = function(){
                var d = dist(this.x,this.y,food.x,food.y)
                if(d<1){
                        this.l++;
                        put();
                }
        }
}

function keyPressed(){
        if(keyCode === UP_ARROW){
                s.key(0,-1);
        }else if(keyCode === LEFT_ARROW){
                s.key(-1,0);
        }else if(keyCode === RIGHT_ARROW){
                s.key(1,0);
        }else if(keyCode === DOWN_ARROW){
                s.key(0,1);
        }
}

function draw() {
        background(255);
        s.update();
        s.show();
        s.eat();
        fill(134,0,0);
        rect(food.x,food.y,20,20);
}