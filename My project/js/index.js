window.onload=function(){
	//轮播图的效果
	let banner=document.querySelector('.banner')
	let bannerLi=document.querySelectorAll('.banner li')
	let widths=bannerLi[1].offsetWidth;
	let circle=document.querySelector('.circle');
	let circles=document.querySelectorAll('.circle>li');
	let hgroup=document.querySelectorAll('.h-group')
	console.log(widths)
	let next=now=0
	let t=setInterval(fn,3000);
	let flag=true
	function fn(){
		next++;
		if(next==3){
			next=0;
		}
		bannerLi[next].style.left=`${-widths}px`
		animate(bannerLi[next],{left:0},function(){
			for(let k=0;k<circles.length;k++){
				hgroup[k].style.opacity='0';
			}
			hgroup[next].style.opacity='1'
			flag=true;
		})
		animate(bannerLi[now],{left:widths+18})
		for(let i=0;i<circles.length;i++){
			circles[i].style.background='rgba(0,0,0,0.5)';
			
		}
		circles[next].style.background='#fff';
		
		now=next;
	}
	//左右箭头的点击效果
	let zuo=document.querySelector('.zuo');
	let you=document.querySelector('.you');
	zuo.onclick=function(){
		if(flag){
			flag=false;
			next--;
			if(next==-1){
				next=2;
			}
			bannerLi[next].style.left=`${widths}px`
			animate(bannerLi[next],{left:0},function(){
				for(let k=0;k<circles.length;k++){
					hgroup[k].style.opacity='0';
				}
				hgroup[next].style.opacity='1'
				flag=true;
				
			})
			animate(bannerLi[now],{left:-widths-18})
			for(let i=0;i<circles.length;i++){
				circles[i].style.background='rgba(0,0,0,0.5)';
			}
			circles[next].style.background='#fff';
			now=next;
		}
		
	}
	you.onclick=function(){
		if(flag){
			flag=false;
			fn()
		}
		
	}
	//鼠标移动后轮播消失
	let one=document.getElementById('one');
	one.onmouseenter=function(){
		clearInterval(t)
	}
	one.onmouseleave=function(){
	 t=setInterval(fn,3000);
	}
	//小圆点的点击效果
	
	for(let i=0;i<circles.length;i++){
		circles[i].onclick=function(){
			bannerLi[i].style.left=`${-widths}px`
			animate(bannerLi[i],{left:0},function(){
				for(let k=0;k<circles.length;k++){
					hgroup[k].style.opacity='0';
				}
				hgroup[next].style.opacity='1'
				flag=true;
			})
			animate(bannerLi[now],{left:widths})
			
			for(let j=0;j<circles.length;j++){
				circles[j].style.background='rgba(0,0,0,0.5)';
			}
			circles[i].style.background='#fff';
			now=next=i;
		}
	}
	
	//菜品轮播效果
	let foodLeft=document.querySelector('.food-zuo')
	let foodRight=document.querySelector('.food-you')
	let list=document.querySelector('ul.food-detal')
	let listNum=0
	foodRight.onclick=function(){
		listNum++;
		if(listNum==7){
			listNum=0
		}
		list.style.marginLeft=`${-275*listNum}px`
	}
	foodLeft.onclick=function(){
		listNum--;
		if(listNum==-1){
			listNum=0;
			return false;
		}
		list.style.marginLeft=`${-275*listNum}px`
	}
	//滚轮事件
	
	let w=window.innerHeight
	document.body.style.overflow='hidden';
	let n=0;
	let f=true;
	let lis=document.querySelectorAll('ul.slide>li');
	let liDiv=document.querySelectorAll('div.cc');
	let h1=document.querySelector('div.youzi h1');
	let h2=document.querySelector('div.youzi h2');
	let p=document.querySelector('div.youzi p');
	let more=document.querySelector('button.more');
	let blogLi=document.querySelectorAll('ul.blog>li')
	window.onmousewheel=function(e){
		if(f){
			f=false;
			if(e.wheelDelta==-120){
				n++;
				if(n==7){
					n=6
				}
				if(n==1){
					list.style.top='15px'
				}
				if(n==3){
					h1.style.left='0px';
					h2.style.left='0px';
					p.style.left='0px';
					more.style.left='0px';
				}
				if(n==4){
					for(let i=0;i<blogLi.length;i++){
						blogLi[i].style.top=0;
					}
				}
			}
			if(e.wheelDelta==120){
				n--;
				if(n==-1){
					n=0;
				}
			}
			animate(document.body,{scrollTop:n*w},function fc(){
				f=true;
			})
			for(let i=0;i<7;i++){
				liDiv[i].style.width=`${2}px`;
				liDiv[i].style.height=`${2}px`;
				liDiv[i].style.background='#fff';
				liDiv[i].style.border='none'
			}
			liDiv[n].style.width=`${15}px`;
			liDiv[n].style.height=`${15}px`;
			liDiv[n].style.background='transparent';
			liDiv[n].style.border='1px solid #fff'
		}
		
	}
	//侧导览点击事件
	for(let i = 0;i < 7;i++){
		lis[i].onclick=function(){
			animate(document.body,{scrollTop:i*w},function fc(){
				f=true;
			})
			if(i==1){
					list.style.top='15px'
				}
				if(i==3){
					h1.style.left='0px';
					h2.style.left='0px';
					p.style.left='0px';
					more.style.left='0px';
				}
			for(let j=0;j<7;j++){
				liDiv[j].style.width=`${2}px`;
				liDiv[j].style.height=`${2}px`;
				liDiv[j].style.background='#fff';
				liDiv[j].style.border='none'
			}
			liDiv[i].style.width=`${15}px`;
			liDiv[i].style.height=`${15}px`;
			liDiv[i].style.background='transparent';
			liDiv[i].style.border='1px solid #fff';
			n=i;
		}
	}
	//菜品的轮播2blog
	let blogLeft=document.querySelector('.list-left')
	let blogRight=document.querySelector('.list-right')
	let blogList=document.querySelector('ul.blog')
	let listNum2=0
	blogRight.onclick=function(){
		listNum2++;
		if(listNum2==7){
			listNum2=0
		}
		blogList.style.marginLeft=`${-1200*listNum2}px`
	}
	blogLeft.onclick=function(){
		listNum2--;
		if(listNum2==-1){
			listNum2=0;
			return false;
		}
		blogList.style.marginLeft=`${-1200*listNum2}px`
	}
	
}

