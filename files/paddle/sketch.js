var p
var b
var p2
function setup(){
        x=0;
        createCanvas(window.innerWidth,window.innerHeight);
        p = new paddle(0);
        p2 = new paddle(width-15);
        b = new ball()
}

class paddle{
        constructor(x){
                this.x = x;
                this.y = height/2 - 150;
                this.a = 0;
                this.xspeed = 0;
                this.yspeed = 0;
                this.up = true;
                this.down = true;
        }

        reset(x){
                this.x = x;
                this.y = height/2 - 150;
                this.a = 0;
                this.xspeed = 0;
                this.yspeed = 0;
                this.up = true;
                this.down = true;
        }

        move(){
                this.x = this.x + this.xspeed * 10;
                this.y = this.y + this.yspeed * 10;
        }

        key(xspeed,yspeed){
                this.xspeed = xspeed;
                this.yspeed = yspeed;
        }



        draw(){
                this.move();
                rect(this.x,this.y,15,150);
                if(this.y + 150 >= height){
                        this.down = false;
                        this.yspeed = 0;
                }else if(this.y <= 0){
                        this.up = false;
                        this.yspeed = 0;
                }

        }
}


class ball{
        constructor(){
                this.x = width/2;
                this.y = height/2;
                this.r = 25;
                this.ax = -5;
                this.ay = floor(random(4));
        }

        draw(){
                ellipse(this.x,this.y,this.r,this.r);
        }

        move(){
                this.x += this.ax;
                this.y += this.ay;
                this.paddler();
                this.wallr();
        }

        paddler(){
                if((this.y >= p.y && this.y <= p.y + 150) || (this.y >= p2.y && this.y <= p2.y + 150)){
                        if(this.x - this.r === p.x + 15){
                                this.ax = -this.ax;
                                this.ay = -floor(random(4));
                        }

                        if(this.x + this.r === p2.x){
                                this.ax = -this.ax;
                                this.ay = floor(random(4));
                        }
                }
        }

        wallr(){
                if(this.y + this.r >= height){
                        this.ay = -this.ay;
                }else if(this.y - this.r <= 0){
                        this.ay = -this.ay;
                }else if(this.x - this.r <= 0){
                        this.reset();
                }else if(this.x + this.r >= width){
                        this.reset();
                }


        }

        reset(){
                this.x = width/2;
                this.y = height/2;
                this.ax = -5;
                this.ay = floor(random(4));
                p.reset(0);
                p2.reset(width - 15);
        }
}

function keyPressed(){
        if(keyCode === UP_ARROW && p.up === true){
                p.key(0,-1);
                p.down = true;
        }else if(keyCode === DOWN_ARROW && p.down === true){
                p.key(0,1);
                p.up = true;
        }

        if (keyCode === 87 && p2.up === true){
                p2.key(0,-1);
                p2.down = true;
        }else if(keyCode === 83 && p2.down === true){
                p2.key(0,1);
                p2.up = true;
        }
}

function draw(){
        background(255);
        p.draw();
        p2.draw();
        b.draw();
        b.move();
}
