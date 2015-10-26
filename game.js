Crafty.init(window.innerWidth, window.innerHeight, document.getElementById('game'));
Crafty.background("#000000");

var spaceShip = Crafty.e("2D, Canvas, Image").attr({x: 100, y: 100, w: 60, h: 101}).image("spaceShip.png");
spaceShip.goingLeft = false;
spaceShip.acceleration = .1;  //Ship acceleration per tick
spaceShip.rotationSpeed = 5; //How fast to rotate the ship
spaceShip.origin(spaceShip.w * .5, spaceShip.h * .65);

//Initialize Key Vars
spaceShip.W = false;
spaceShip.A = false;
spaceShip.D = false;
spaceShip.speedX = 0;
spaceShip.speedY = 0;

spaceShip.bind("KeyDown", function(e){
    if(e.key == Crafty.keys.W){
        this.W = true;
    }
    
    if(e.key == Crafty.keys.A){
        this.A = true;
    }
    
    if(e.key == Crafty.keys.D){
        this.D = true;
    }
});

spaceShip.bind("KeyUp", function(e){
    if(e.key == Crafty.keys.W){
        this.W = false;
    }  
    
    if(e.key == Crafty.keys.A){
        this.A = false;
    }
    
    if(e.key == Crafty.keys.D){
        this.D = false;
    }
});


spaceShip.bind("EnterFrame", function(e){
   this.update(); 
});

spaceShip.update = function(){
    this.processkeys();
    this.checkForWrap();
    this.move();
}

spaceShip.checkForWrap = function(){
    if(this.x < (0 - this.w * .5)){
        this.x = window.innerWidth - (this.w * .5);
    }else if(this.x > (window.innerWidth + this.w * .5)){
        this.x = 0 - (this.w * .5);
    }
    if(this.y < (0 - this.h * .5)){
        this.y = window.innerHeight - (this.h * .5);
    }else if(this.y > window.innerHeight - (this.h * .5)){
        this.y = 0 - this.h * .4;
    }
}

spaceShip.processkeys = function(){
    if(this.W){
        spaceShip.speedX += Math.sin(toRadians(this.rotation)) * spaceShip.acceleration;
        spaceShip.speedY += Math.cos(toRadians(this.rotation)) * spaceShip.acceleration;
    }else if(!this.W && spaceShip.speedX >= 0){

    }
    if(this.A){
        this.rotation -= this.rotationSpeed;
    }
    if(this.D){
        this.rotation += this.rotationSpeed;
    }
    
    if(this.speedX > 0){
        this.speedX -= (this.acceleration * .3);
    }else if(this.speedX < 0){
        this.speedX += (this.acceleration * .3);
    }
    
    if(this.speedY > 0){
        this.speedY -= (this.acceleration * .3);
    }else if(this.speedY < 0){
        this.speedY += (this.acceleration * .3);
    }

}

spaceShip.move = function()
{
    this.rotation = this.rotation % 360;

    this.x += this.speedX;
    this.y -= this.speedY;

    // console.log("Cos: "+toDegrees(Math.cos(this.rotation)));
    // console.log("Sin: "+toDegrees(Math.sin(this.rotation)));
    
}



function toDegrees(rad){
    return rad * (180 / Math.PI);
}

function toRadians(rad){
    return rad * (Math.PI / 180);
}  

