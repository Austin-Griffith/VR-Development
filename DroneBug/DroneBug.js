// inspired by http://graphics.cs.wisc.edu/Courses/559-f2015/Examples/DroneBug/DroneBug.js
// this is the "class definition" - always use this with "new"
// maybe a bad choice to attach it to a context, but seems easier than passing it around


function DroneBug(context,x,y,sz,numProps)
{

   // these are it's properties
   this.size = sz || 0.7;
   this.propRotationSpeed = .3; //how fast the propellers will rotate
   this.posX = x || 200;
   this.posY = y || 250;   // this is the starting cords of the bug
   this.frontPropAngle = 150; //angle propellers start at
   this.context = context;
   this.numProps = numProps || 2; //how many propellers
   // this.velocityX = Math.random()*4 ;  // controls the speed of the object
   // this.velocityY = Math.random()*4 ;

   this.velocityX = 0 ;  // controls the speed of the object
   this.velocityY = 0 ;

   // this.heading = Math.atan2(this.velocityX, -this.velocityY); //flips the object bc negative y since positive y is down
}


DroneBug.prototype.drawWings = function() {
   this.context.beginPath();
   this.context.moveTo(0,0);
   this.context.bezierCurveTo(5,5,   15,5,  20,5);
   this.context.bezierCurveTo(25,5,  35,5,  40,0);
   this.context.bezierCurveTo(35,-5, 25,-5, 20,-5);
   this.context.bezierCurveTo(15,-5, 5,-5,  0,0);
   this.context.fill();
   this.context.stroke();
};


DroneBug.prototype.drawProp = function() {
   this.context.save();
   this.drawWings();
   this.context.scale(-1,1);
   this.drawWings();
   this.context.restore();
   this.context.beginPath();
   this.context.arc(0,0,7,0,2*Math.PI);
   this.context.fill()
};


DroneBug.prototype.drawBody = function() {
   this.context.save();
   this.context.beginPath();
   this.context.moveTo(0,200);
   this.context.lineTo(5,25);

   this.context.bezierCurveTo( 100,35,  20,-25, 0,-40);
   this.context.bezierCurveTo(-20,-40, -100,35, -5,25);    //draw the curves for the bug body

   this.context.closePath();
   this.context.fill();
   this.context.stroke();

 //draw a circle on the front of body
 this.context.beginPath();
 this.context.arc(0, -25, 5, 1, 4 * Math.PI, false);
 this.context.fillStyle = "blue";
 this.context.fill();
   this.context.restore();
};


DroneBug.prototype.drawArm = function() {
   var d = 80*1.41421;  //bug wing length
   this.context.save();
   this.context.beginPath();
   this.context.moveTo(  5,10);

   this.context.lineTo(  5, d-20);
   this.context.lineTo( 20, d);
   this.context.lineTo(  0, d+20);
   this.context.lineTo(-20, d);
   this.context.lineTo( -5, d-20);
   this.context.lineTo( -5, 20);

   this.context.fill();
   this.context.stroke();

 this.context.fillStyle = "blue"   // prop color
   this.context.strokeStyle = "yellow";   // outter prop stroke
   this.context.save();
   this.context.translate(0, d);
   this.context.rotate(this.frontPropAngle);
   this.drawProp();
   this.context.restore();
   this.context.restore();
};


DroneBug.prototype.draw = function() {
   this.context.save();
   this.context.translate(this.posX, this.posY);
   this.context.rotate(this.heading);
   this.context.scale(this.size, this.size);
   // this.context.fillStyle = "red";
   // this.context.strokeStyle = "blue";

   // change the colors of the bugs over and over bc draw is called in a loop
   var colors = ["red","blue","green","yellow","black","white","pink","brown","grey","orange","teal"];
   var randomColor1 = colors[Math.floor(Math.random() * colors.length)];
   var randomColor2 = colors[Math.floor(Math.random() * colors.length)];

   this.context.fillStyle = randomColor1;
   this.context.strokeStyle = randomColor2;

   this.drawBody();
   this.context.save();
   this.context.rotate(Math.PI/this.numProps);
   this.drawArm();

   for(var i = 1; i < this.numProps; ++i)
   {
     this.context.rotate(Math.PI/(this.numProps/2));
     this.drawArm();
   }
   this.context.restore();

   this.context.restore();

}

DroneBug.prototype.update = function() {
   this.frontPropAngle += this.propRotationSpeed;   //control the spinning of the props

   if (this.velocityX > 10) {
     this.velocityX -= 5 ;
   }

   if (this.velocityY > 10) {
     this.velocityY -= 5 ;
   }

   this.posX += this.velocityX;
   this.posY += this.velocityY;

   		//make the this bounce off the walls
   if (this.posX > canvas.width) {
       this.velocityX *= -1;
       this.posX = canvas.width;
   }
   if (this.posX < 0) {
       this.velocityX *= -1;
   }
   if (this.posY > canvas.height) {
       this.velocityY *= -1;
   }
   if (this.posY < 0) {
       this.velocityY *= -1;
   }
   this.heading = Math.atan2(this.velocityX, -this.velocityY);

  }
