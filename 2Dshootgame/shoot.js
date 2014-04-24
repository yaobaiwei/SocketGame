$(document).ready(function(){
   var socket=io.connect('http://localhost:8082');
	socket.on('connect', function (){
        	   socket.emit('start',{message:"page"});  
   });
   function Player(x,y,space){
   	var self=this;
   	this.plant=new Image();
   	this.plant.src="player.png";
   	this.x=x;
   	this.y=y;
   	this.points=0;
   	this.shoot=false;
   	this.dankind=0;
   	this.daodannum=5;
   	this.direction=0;
   	this.left=-10;
   	this.right=10;
   	this.Blood=100;
   	this.space=space;
   	this.up=1;
   	this.mark=0;
   	this.down=-1;
   	this.protectstate=false;
   	this.blocktime=0;
   	this.block=new Image();
   	this.block.src="treasure.png";
   	this.blockx=0;
   	this.blockstate=false;
   	this.blocky=0;
   	this.protectLoop=new Image();
   	this.protecttime=0;
   	this.protectLoop.src="protect_circle.png";
   	this.loop=null;
   	this.enemyBullets=[];
   	this.bullets=[];
    /*
      document.onkeydown=function(event){
  		event=event || window.event;
  		var code=event.keyCode||event.which||event.charCode;
  		switch(code){
  			case 37://左
  			  self.direction=self.left;
  			  break;
  			case 38://上
  			  self.direction=self.up;
  			  break;
  			case 39://右
  			  self.direction=self.right;
  			  break;
  			case 40://下
  			  self.direction=self.down;
  			  break;
  			case 90:
  			  self.shoot=true;
  			  self.dankind=1;
  			  break;
  			case 88:
  			  self.shoot=true;
  			  self.dankind=2;
  			  break;
  			case 67:
  			  self.daodannum--;
  			  if(self.daodannum>=0)
  			  {
  			  self.shoot=true;
  			  self.dankind=3;
  			  }
  			  else{
           self.shoot=false;  			  	
  			  }
  			  break;
  			case 13:
  			  self.mark++;
  			  if(self.mark%2==0)
  			  {
               self.continueRun();   			  	
  			  	}
  			  else{
  			  	   self.pause();
  			  	}
  	    } 		
     };
      document.onkeyup=function(event){
  		event=event || window.event;
  		var code=event.keyCode||event.which||event.charCode;
  		switch(code){
  			case 37://左
  			  self.direction=0;
  			  break;
  			case 38://上
  			  self.direction=0;
  			  break;
  			case 39://右
  			  self.direction=0;
  			  break;
  			case 40://下
  			  self.direction=0;
  			  break;
  	    } 		
     }*/
     
    socket.on('col', function (data) {
      var code = parseInt(data.message);
      console.log(code);
  		switch(code){
  			case 37://左
  			  self.direction=self.left;
  			  break;
  			case 38://上
  			  self.direction=self.up;
  			  break;
  			case 39://右
  			  self.direction=self.right;
  			  break;
  			case 40://下
  			  self.direction=self.down;
  			  break;
  			case 90:
  			  self.shoot=true;
  			  self.dankind=1;
  			  break;
  			case 88:
  			  self.shoot=true;
  			  self.dankind=2;
  			  break;
  			case 67:
  			  self.daodannum--;
  			  if(self.daodannum>=0)
  			  {
  			  self.shoot=true;
  			  self.dankind=3;
  			  }
  			  else{
           self.shoot=false;  			  	
  			  }
  			  break;
  			case 13:
  			  self.mark++;
  			  if(self.mark%2==0)
  			  {
               self.continueRun();   			  	
  			  	}
  			  else{
  			  	   self.pause();
  			  	}
  	    } 
  	 });	
  	 
    socket.on('del', function (data) {
        self.direction=0;		
     }); 	 
  	 	 
 };
   Player.prototype={
   	init:function(){
   		var canvas=document.getElementById("canvas");
         var ctx=canvas.getContext("2d");
         ctx.fillStyle="#000000";
   	   ctx.fillRect(0,0,canvas.width,canvas.height);
   		ctx.drawImage(this.plant,this.x,this.y);
   	},
      go:function(param){
      	var self=param;
      	switch(self.direction){
      		case -1:
      		   if(self.y<620)
      		   self.y+=8; 
      		   break;
      		case 1:
      		   if(self.y>-10)
      		   self.y-=8;
      		   break;
      		case 10:
      		   if(self.x<365)
      		   self.x+=8;
      		   break;
      		case -10:
      		   if(self.x>-20)
      		   self.x-=8;
      		   break;
      	}
      	self.Bullets();
      	self.draw();
      	self.space.draw();
         self.attact();
         self.drawenemyBullets();
         self.blood();
         self.ProtectBlock();
      },
      Bullets:function(){
      	var self=this;
      	if(self.shoot)
      	{
      		var bullet=new Image();
      		if(self.dankind==1)
      		{
      		  bullet.src="dan1.png";
      		  bullet.hurt=1;
      	   }
      		else if(self.dankind==2)
      		{
      		  bullet.src="dan2.png";
      		  bullet.hurt=2;
      		}
      		else if(self.dankind==3)
      		{
      		  bullet.src="dan3.png";
      		  bullet.hurt=5;
      		}
      		bullet.x=self.x+25;
      		bullet.y=self.y-25;
      		self.bullets.unshift(bullet);
      		self.shoot=false;
      	}
      },
      draw:function(){
   		var canvas=document.getElementById("canvas");
         var ctx=canvas.getContext("2d");
         ctx.fillStyle="#000000";
   	   ctx.fillRect(0,0,canvas.width,canvas.height);
   		ctx.drawImage(this.plant,this.x,this.y);
      	for(var i=0;i<this.bullets.length;i++)
      	{
      		 this.bullets[i].y-=30;
      		 ctx.drawImage(this.bullets[i],this.bullets[i].x,this.bullets[i].y);
      	}
      	while(this.bullets.length>40){
      	     this.bullets.pop();	
      	}
      	ctx.strokeStyle="#ffffff";
      	ctx.fillStyle="#ff0000";
   		ctx.strokeRect(15,630,100,10);	
   		ctx.fillRect(15,630,this.Blood,10);
   		
      },
      start:function()
      {
      	var self=this;
      	self.init();
  		   if(!self.loop)
  		        self.loop=setInterval(self.go,50,this);
      },
      attact:function(){
      	var self=this;
      	for(var i=0;i<self.bullets.length;i++)
      	{
      		 for(var k=0;k<self.space.plants.length;k++)
      		 {
      		 	if(self.space.plants[k].kind!=3)
      		 	 {
                 if((self.bullets[i].x<self.space.plants[k].x+60)&&(self.bullets[i].x>self.space.plants[k].x)&&(self.bullets[i].y>self.space.plants[k].y)&&(self.bullets[i].y<self.space.plants[k].y+75))   
                 {
                 	    if(self.dankind==1)
                 	    {
                 	    	  self.space.plants[k].enemy.blood-=1;
                 	    }
                 	    else if(self.dankind==2)
                 	    {
                 	    	  self.space.plants[k].enemy.blood-=2;
                 	    }
                 	    else if(self.dankind==3)
                 	    {
                 	    	  self.space.plants[k].enemy.blood-=5;
                 	    }
                      for(var p=i;p<self.bullets.length-1;p++)
                      {
                           self.bullets[p]=self.bullets[p+1];               	
                      }                 	
                      self.bullets.pop();
                 } 
                }
                else{
                	
                 if((self.bullets[i].x<self.space.plants[k].x+230)&&(self.bullets[i].x>self.space.plants[k].x+10)&&(self.bullets[i].y>self.space.plants[k].y)&&(self.bullets[i].y<self.space.plants[k].y+120))   
                 {
                 	    if(self.dankind==1)
                 	    {
                 	    	  self.space.plants[k].enemy.blood-=1;
                 	    }
                 	    else if(self.dankind==2)
                 	    {
                 	    	  self.space.plants[k].enemy.blood-=2;
                 	    }
                 	    else if(self.dankind==3)
                 	    {
                 	    	  self.space.plants[k].enemy.blood-=5;
                 	    }
                      for(var p=i;p<self.bullets.length-1;p++)
                      {
                           self.bullets[p]=self.bullets[p+1];               	
                      }                 	
                      self.bullets.pop();
                 } 
                	
                } 		 	
      		 }
      	} 
      	for(var p=0;p<self.space.plants.length;p++)
      	{
             if((self.space.plants[p].enemy.blood<=0)&&(self.space.plants[p].enemy.blood>=-4))
             {
             	   P=self.space.plants[p].kind;
             	   for(i=0;i<self.space.plants[p].bullets.length;i++)
             	   {
             	      self.enemyBullets.push(self.space.plants[p].bullets[i]);
             	   }
                  for(i=p;i<self.space.plants.length-1;i++)
                  {
                       self.space.plants[i]=self.space.plants[i+1];                 	
                  }                 	
                  self.space.plants.pop();
                  if(P==1)
                  {
                     self.points+=5;                 	
                  	}
                  else if(P==2)
                  {
                  	self.points+=10;
                  	}
                  else {
                  	self.points+=30;
                  	self.win();
                  }
             }           		
      	}  	
      },
      blood:function()
      {
      	 var mark1=0;
      	 var self=this;
      	 var planes=self.space.plants;
      	 for(var p=0;p<planes.length;p++)
      	 {
             var bullet_array=planes[p].bullets;
      	    var num=bullet_array.length;
      	    for(var q=0;q<num;q++)
      	    {
               if((bullet_array[q].x>self.x-10)&&(bullet_array[q].x<self.x+50)&&(bullet_array[q].y>self.y-20)&&(bullet_array[q].y<self.y+55)&&(self.protectstate==false))  
               { 
                             
                 if(bullet_array[q].kind==1)
                    self.Blood-=3; 
                 else if(bullet_array[q].kind==2)
                    self.Blood-=5;
                 else  self.Blood-=10;
                
                 for(var k=q;k<num-1;k++)
                 {

                      self.space.plants[p].bullets[k]=self.space.plants[p].bullets[k+1];
                 }
                 if(self.space.plants[p].bullets[k].kind!=3)
                 {
                   self.space.plants[p].bullets.pop();
                 }
                 if(self.Blood<0)
                 {
                 	   self.die();
                 }
                  mark1=1;
                  break;
               } 	 	
      	    }
      	    if(mark1==1) break;                    	 	 	
      	 }
      	 for(var i=0;i<self.enemyBullets.length;i++)
      	 {
               if((self.enemyBullets[i].x>self.x-10)&&(self.enemyBullets[i].x<self.x+50)&&(self.enemyBullets[i].y>self.y-20)&&(self.enemyBullets[i].y<self.y+55))  
               { 
                 if((self.enemyBullets[i].kind==1)&&(self.protectstate==false))
                    self.Blood-=3; 
                 else if((self.enemyBullets[i].kind==2)&&(self.protectstate==false))
                    self.Blood-=5;
                 else if((self.enemyBullets[i].kind==3)&&(self.protectstate==false))
                    self.Blood-=10;
                 if(self.Blood<0)
                 {
                 	   self.die();
                 }
                 for(var k=i;k<self.enemyBullets.length-1;k++)
                 {
                      self.enemyBullets[k]=self.enemyBullets[k+1];
                 }
                  self.enemyBullets.pop();
                  break;
               } 	
      	 }
      },
      ProtectBlock:function(){
          var self=this;
          self.blocktime++;
          if(self.blocktime%600==100)
          {
              self.blockx=Math.round(Math.random()*360)+20;
              self.blocky=Math.round(Math.random()*350)+150;          	
          }
          if((self.blocktime%600>=100)&&(self.blocktime%600<=200)&&(self.blockstate==false))
          {
              self.space.context.drawImage(self.block,self.blockx,self.blocky);
              if((self.x>=self.blockx-15)&&(self.x<=self.blockx+15)&&(self.y<=self.blocky+15)&&(self.y>=self.blocky-15))
              {
                  self.protectstate=true;  
                  self.blockstate=true;            	
              }
          }
          else if((self.blocktime%600<100)||(self.blocktime%600>200)){
          	    self.blockstate=false;       	
          }
          if(self.protectstate==true)
          {
               self.protecttime++;  
               if(self.protecttime<=100)
               {
                  self.space.context.drawImage(self.protectLoop,self.x-10,self.y);	              	
               }  
               else{
               	self.protecttime=0;
               	self.protectstate=false;             	
               }      	
          }            
      },
      drawenemyBullets:function(){
      	var self=this;
      	var context=self.space.context;	
      	for(var k=0;k<self.enemyBullets.length;k++)
   	   {
   			  self.enemyBullets[k].y+=10;
      	     context.drawImage(self.enemyBullets[k],self.enemyBullets[k].x,self.enemyBullets[k].y);
   		} 
      },
      die:function(){
         var self=this;
         var context=self.space.context;      
      	    context.strokeStyle="#ffffff";
      	    context.fillStyle="#ff0000";
   			 context.strokeRect(15,630,0,10);	
   			 context.fillRect(15,630,0,10);         
         
             context.font="35px Verdana";
         var gradient=context.createLinearGradient(0,0,self.space.space.width,0);
             gradient.addColorStop("0","magenta");
             gradient.addColorStop("0.5","blue");
             gradient.addColorStop("1.0","red");
             context.fillStyle=gradient;
             context.fillText("Game Over",100,380); 
             context.fillText("You Get "+self.points+" Sroces!",50,480);	
             self.pause();
      },
      win:function(){
         var self=this;
         var context=self.space.context;      
      	    context.strokeStyle="#ffffff";
      	    context.fillStyle="#ff0000";
   			 context.strokeRect(15,630,0,10);	
   			 context.fillRect(15,630,0,10);         
         
             context.font="35px Verdana";
         var gradient=context.createLinearGradient(0,0,self.space.space.width,0);
             gradient.addColorStop("0","magenta");
             gradient.addColorStop("0.5","blue");
             gradient.addColorStop("1.0","red");
             context.fillStyle=gradient;
             context.fillText("You Win",120,380); 
             context.fillText("You Get "+self.points+" Sroces!",50,480);	
             self.pause();
      },
      pause:function(){
  		   var self=this;
  		   if(!!self.loop)
  		   	clearInterval(self.loop);
  		   self.loop=null;     
      },
  		continueRun:function(){
  		   var self=this;
  		   if(!self.loop)
  		   self.loop=setInterval(self.go,50,this); 		   		 
  		}
   };	
   function Enemy(kind){  	
   	var self=this;
  		this.canvas=document.getElementById("canvas");
   	this.kind=kind;
   	this.enemy1=new Image();
   	this.enemy1.blood=8;
   	this.enemy2=new Image();
   	this.enemy2.blood=15;
   	this.enemy3=new Image();
   	this.enemy3.blood=100;
   	this.enemy=null;
   	this.enemy1.src="enemy1.png";
   	this.enemy2.src="enemy2.png";
   	this.enemy3.src="boss.png";
   	this.x=Math.round(Math.random()*(this.canvas.width-40));
   	this.y=-30;
   	this.adding_x=Math.floor(Math.random()*(4))-2;
   	this.time1=0;
   	this.bullets=[];
   };
   Enemy.prototype={
   	init:function(){		
   		var self=this;
   		if(self.kind==1)
   		{
            self.enemy=self.enemy1;   			
   		}
   		else if(self.kind==2)
   		{
            self.enemy=self.enemy2;     			
   		}
   		self.x+=self.adding_x;
   		self.y+=2;
   	},
   	Bullet:function(){
   		var self=this;
   		self.time1++;
   		if(self.time1%30==0)
   		{
         	var bullet=new Image();
         	if(self.kind==1)
         	{
      	     bullet.src="enemyBullet1.png";
      	     bullet.kind=1;
         	}
         	else if(self.kind==2)
         	{
         	  bullet.src="enemyBullet2.png";
         	  bullet.kind=2;
         	}
         	else{
         	  bullet.src="enemyBullet3.png";
         	  bullet.kind=3;       		
         	}
      	   if(self.kind==3)
      	   {
      	   	var bullet1=new Image();
      	   	var bullet2=new Image();
      	   	var bullet3=new Image();
      	   	bullet1.src=bullet2.src=bullet3.src="enemyBullet3.png";
      	   	bullet1.kind=bullet2.kind=bullet3.kind=3;
      	   	bullet1.x=self.x+60;
      	      bullet1.y=self.y+130;
      	   	bullet2.x=self.x+110;
      	      bullet2.y=self.y+130;
      	   	bullet3.x=self.x+160;
      	      bullet3.y=self.y+130;
      	      self.bullets.unshift(bullet1);	
      	      self.bullets.unshift(bullet2);	
      	      self.bullets.unshift(bullet3);	
      	   }
      	   else  
      	   {
      	   	bullet.x=self.x+30;
      	      bullet.y=self.y+48;
      	   	self.bullets.unshift(bullet);	
      	   }
      	}
   	}
   };
   var Space=function(enemy){
   	this.time=-1;
   	this.arr=0;
   	this.enemy_1=enemy;
  		this.space=document.getElementById("canvas");
  		this.context=this.space.getContext("2d");	
  		this.plants=new Array();
   };
   Space.prototype={
   	draw:function(){
   		var self=this;
   		this.time+=1;
   		var context1=self.context;
   		var enemy_1=this.enemy_1;
   		var num=enemy_1.length;
   		var time_o=Math.floor(Math.random()*(100-80))+80;
         while((this.time%time_o==0)&&(self.arr<num))
         {
         	self.plants.push(enemy_1[self.arr]);
         	self.time++;
         	self.arr++;
         }
        for(var m=0;m<self.plants.length;m++)
        {
        	   if(self.plants[m].kind==3)
        	   {
        	    self.plants[m].enemy=self.plants[m].enemy3; 
        	    self.plants[m].x=70;
        	    if(self.plants[m].y<=30)
        	     {
        	     self.plants[m].y+=2;	
        	     }
   		    context1.drawImage(self.plants[m].enemy,self.plants[m].x,self.plants[m].y);	     	   	
        	   }
        	   else{
         	   self.plants[m].init();
   		      context1.drawImage(self.plants[m].enemy,self.plants[m].x,self.plants[m].y);	       	   	
        	   }
       		self.plants[m].Bullet();
       		if(self.plants[m].kind==3)
       		{
   		         for(var k=0;k<Math.floor((self.plants[m].bullets.length+1)/3);k++)
   		        {
   			       self.plants[m].bullets[3*k].y+=10;
      	          context1.drawImage(self.plants[m].bullets[3*k],self.plants[m].bullets[3*k].x,self.plants[m].bullets[3*k].y);
   			       self.plants[m].bullets[3*k+1].y+=10;
      	          context1.drawImage(self.plants[m].bullets[3*k+1],self.plants[m].bullets[3*k+1].x,self.plants[m].bullets[3*k+1].y);
   			       self.plants[m].bullets[3*k+2].y+=10;		       
      	          context1.drawImage(self.plants[m].bullets[3*k+2],self.plants[m].bullets[3*k+2].x,self.plants[m].bullets[3*k+2].y);
   		        } 
   		   }
   		   else{
   		       for(var k=0;k<self.plants[m].bullets.length;k++)
   		      {
   			     self.plants[m].bullets[k].y+=10;
      	        context1.drawImage(self.plants[m].bullets[k],self.plants[m].bullets[k].x,self.plants[m].bullets[k].y);
   		      } 		   	
   		   }
        } 			
   	}
   };
   var enemy_plant=new Array();
   var enemy_p=null;
   for(var i=0;i<40;i++)
   {
   	if(i<5)
   	{
   		enemy_p=new Enemy(1);	
   		enemy_plant.push(enemy_p);
      }
      else{
        if(i%2==0)
        {
   		enemy_p=new Enemy(1);	
   		enemy_plant.push(enemy_p);        	 
        }
        else{
   		enemy_p=new Enemy(2);	
   		enemy_plant.push(enemy_p);        		
        }	
      }
   }
   enemy_p=new Enemy(3);
   enemy_plant.push(enemy_p);
   var PLAYER=new Player(160,550,new Space(enemy_plant));
   
   PLAYER.start();
});
