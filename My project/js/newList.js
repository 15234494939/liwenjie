window.onload=function(){
	//newList的JS
/*菜单*/
let olLi=document.querySelectorAll('.cont>li');
let lleft=document.querySelectorAll('li>div.left');
let rright=document.querySelectorAll('li>div.right');
	let f=true;
for(let i=0;i<olLi.length;i++){

	olLi[i].onclick=function(){
		if(f){
			f=false;
			rright[i].style.transform='rotateY(-90deg)';
			rright[i].style.opacity=0;
			lleft[i].style.transform='rotateY(0deg)';
		}else{
			f=true;
			rright[i].style.transform='rotateY(0deg)';
			rright[i].style.opacity=1;
			lleft[i].style.transform='rotateY(90deg)';
			
		}
		
	}
}
}
