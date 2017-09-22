function pall(canvas,marke){
	this.canvas=canvas;
	this.marke=marke;
	this.cst=this.canvas.getContext('2d');
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.cst.strokeStyle='#fff';
	this.cst.lineWidth=1;
	this.history=[];
	this.bian=6;
	this.style='stroke';
	this.strokeStyle='#fff';
	this.fillStyle='#fff';
	this.temp=null;
}
pall.prototype={
	line:function(ox,oy,cx,cy,r,r2,num){
		let that=this;
		that.cst.beginPath();
		that.cst.moveTo(ox,oy);
		that.cst.lineTo(cx,cy);
		that.cst.closePath();
		that.cst.stroke();
	},
	pencil:function(){
		let that=this;
		that.cst.strokeStyle=that.strokeStyle;
		that.marke.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.cst.beginPath();
			that.cst.moveTo(ox,oy);
			that.marke.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				that.cst.lineTo(cx,cy);
				that.cst.stroke();
			}
			that.marke.onmouseup=function(){
				that.history.push(that.cst.getImageData(0,0,that.width,that.height));
				that.marke.onmousemove=null;
				that.marke.onmouseup=null;
			}
			that.return();
		}
	},
	polo:function(ox,oy,cx,cy,r,r2,num){

		let that=this;
		that.cst.beginPath();
		that.cst.moveTo(ox+r,oy);
		for(let i=0;i<num;i++){
			that.cst.lineTo((Math.cos(360/num*i*Math.PI/180)*r)+ox,Math.sin(360/num*i*Math.PI/180)*r+oy);
		}
		that.cst.closePath();
		that.cst[that.style]();
		
	},
	circle:function(ox,oy,cx,cy,r,r2,num){
		let that=this;
		if(that.history.length>0){
			that.cst.putImageData(that.history[that.history.length-1],0,0)
		}
		that.cst.beginPath();
		that.cst.arc(ox,oy,r,0,2*Math.PI);
		that.cst[that.style]();
		
		that.cst.closePath()
				
	},
	rect:function(ox,oy,cx,cy,r,r2,num){
		let that=this;
		that.cst.beginPath();
		if(that.history.length>0){
			that.cst.putImageData(that.history[that.history.length-1],0,0)
		}
		that.cst.rect(ox,oy,cx-ox,cy-oy);
		that.cst[that.style]();
		
		that.cst.closePath();
	},
	duojiaoxing:function(ox,oy,cx,cy,r,r2,num){
		let that=this;
		that.cst.beginPath();
		that.cst.moveTo(ox+r,oy);
		for(let i=0;i<=2*that.bian;i++){
			if(i%2==1){
				that.cst.lineTo(r2*Math.cos(i*360/2/that.bian*Math.PI/180)+ox,r2*Math.sin(i*360/2/that.bian*Math.PI/180)+oy)
			}else{
				that.cst.lineTo(r*Math.cos(i*360/2/that.bian*Math.PI/180)+ox,r*Math.sin(i*360/2/that.bian*Math.PI/180)+oy)
			}

		}
			that.cst[that.style]();
	},
	draw:function(type){
		let that=this;
		that.cst.fillStyle=that.fillStyle;
		that.cst.strokeStyle=that.strokeStyle;
		that.marke.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.marke.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
				let r2=r/2;
				
				that.cst.clearRect(0,0,that.width,that.height);
				if(that.history.length>0){
					that.cst.putImageData(that.history[that.history.length-1],0,0)
				}
				that[type](ox,oy,cx,cy,r,r2,5);
				
			}
			that.marke.onmouseup=function(){
				that.history.push(that.cst.getImageData(0,0,that.width,that.height));
				that.marke.onmousemove=null;
				that.marke.onmouseup=null;
			}
		}
		that.return();
	},
	eraser:function(obj,w,h){
		let that=this;
		that.marke.onmousedown=function(e){
			obj.style.display='block';
			that.marke.onmousemove=function(e){
				let ox=e.offsetX,oy=e.offsetY;
				let lefts=ox-w/2;
				let tops=oy-h/2;
				if(lefts>that.canvas.width-w){
					lefts=that.canvas.width-w;
				}
				if(lefts<0){
					lefts=0;
				}
				if(tops>that.canvas.height-h){
					tops=that.canvas.height-h;
				}
				if(tops<0){
					tops=0;
				}
				obj.style.top=`${tops}px`;
				obj.style.left=`${lefts}px`;
				that.cst.clearRect(lefts,tops,w,h);
			}
			that.marke.onmouseup=function(){
				that.history.push(that.cst.getImageData(0,0,that.width,that.height));
				obj.style.display='none'
				that.marke.onmousemove=null;
				that.marke.onmouseup=null;
			}
		}
	},
	wenzi:function(){
		let that=this;
		let topp;
		let leftt;
		that.cst.fillStyle=that.fillStyle;
		that.cst.strokeStyle=that.strokeStyle;
		that.marke.onmousedown=function(e){
			let ox=e.offsetX;oy=e.offsetY;
			let divs=document.createElement('div');
			divs.style.cssText=`
				width:100px;height:30px;border:1px dashed #fff;position:absolute;
				top:${oy}px;left:${ox}px;color:#fff;
			`
			if(that.history.length>0){
				that.cst.putImageData(that.history[that.history.length-1],0,0)
			}
			that.marke.appendChild(divs);
			divs.contentEditable=true;
			that.marke.onmousedown=null;
			divs.onblur=function(){
				let value=this.innerText;
				that.cst.fillText(value,leftt,topp);
				that.cst.font='18px';
				that.marke.removeChild(divs);
				that.history.push(that.cst.getImageData(0,0,that.width,that.height));
				
			}
			divs.onmousedown=function(e){
				let cx=e.clientX,cy=e.clientY,left=divs.offsetLeft,top=divs.offsetTop,ox=e.offsetX,oy=e.offsetY;
				let lefts=cx-ox-left;
				let tops=cy-oy-top;
				divs.onmousemove=function(e){
					let ccx=e.clientX,ccy=e.clientY;
					leftt=ccx-lefts-ox;
					topp=ccy-tops-oy;
					divs.style.top=`${topp}px`;
					divs.style.left=`${leftt}px`;
					
				}
				divs.onmouseup=function(){
					that.history.push(that.cst.getImageData(0,0,that.width,that.height));
					this.onmousemove=null;
					this.onmouseup=null;
				}
			}
		}
		that.return();
	},
	clip:function(obj){
		let that=this;
		that.marke.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			let lefts,tops,widths,heights
			that.marke.onmousemove=function(e){
				let cx=e.offsetX;cy=e.offsetY;
				widths=Math.abs(cx-ox);
				heights=Math.abs(cy-oy);
				lefts=Math.min(ox,cx),tops=Math.min(cy,oy);
				obj.style.cssText=`
					width:${widths}px;height:${heights}px;
					top:${tops}px;left:${lefts}px;
				`
			}
			that.marke.onmouseup=function(){

				that.marke.onmousemove=null;
				that.marke.onmouseup=null;
				that.temp=that.cst.getImageData(lefts,tops,widths,heights);
				that.cst.clearRect(lefts,tops,widths,heights);
				that.history.push(that.cst.getImageData(0,0,that.width,that.height));
				that.cst.putImageData(that.temp,lefts,tops);
				that.drag(tops,lefts,widths,heights,obj);
			}
			
		}
		
	},
	drag:function(tops,lefts,widths,heights,obj){
		let that=this;
		that.marke.onmousedown=function(e){
			let ox= e.offsetX, oy=e.offsetY;
			that.marke.onmousemove=function(e){
				let cx= e.offsetX, cy=e.offsetY;
				let leftss=cx-ox+lefts;
				let topss=cy-oy+tops;
				if(topss>that.width-widths){
					topss=that.width-widths
				}if(topss<0){
					topss=0
				}
				obj.style.left=`${leftss}px`;
				obj.style.top=`${topss}px`;
				that.cst.putImageData(that.history[that.history.length-1],0,0);
				that.cst.putImageData(that.temp,leftss,topss);
			}
			that.marke.onmouseup=function(){
				that.temp=null;
				obj.style.display='none';
				that.history.push(that.cst.getImageData(0,0,that.width,that.height))
				that.marke.onmousemove=null;
				that.marke.onmouseup=null;
			}
		}
	},
	return:function(){
		let that=this;
		document.onkeydown=function(e){
			if(e.ctrlKey&&e.keyCode==90){
				that.che();
			}
		}
	},
	che:function(){
		let that=this;
		that.history.pop();
		if(that.history.length==0){
			that.cst.clearRect(0,0,that.width,that.height);
		}else{
			that.cst.putImageData(that.history[that.history.length-1],0,0);	
		}
	}
}

