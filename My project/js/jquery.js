$(function(){
	/*滚动事件*/
	/*去除滚动条*/
	$(document.body).css({overflow:'hidden'})
	/*定义一个插件方法*/ 
	$.fn.extend({
			wheel:function(upfn,dwfn){
				this.each(function(index,obj){
					obj.addEventListener('mousewheel',fn)
					obj.addEventListener('DOMMouseScroll',fn)
					function fn(e){
						if(navigator.platform=='MacIntel'){
							if(-e.wheelDelta>0||e.detail>0){
								if(upfn){
									upfn.call(obj);
								}
							}else if(e.wheelDelta>0||-e.detail>0){
								if(dwfn){
									dwfn.call(obj);
								}
							}
						}else{
							if(-e.wheelDelta>0||e.detail>0){
								if(dwfn){
									dwfn.call(obj);
								}
							}else if(e.wheelDelta>0||-e.detail>0){
								if(upfn){
									upfn.call(obj);
								}
							}
						}
						e.preventDefault();
					}
				})
			}	
		})
	/*滚动事件的插入*/
	let n=0;//定义一个变量记录当前页面
	let flag=true;//定义一个开关记录是否完全滚到某一个页面
	let winHeight=$(window).innerHeight()
	$('section').wheel(
		function(){
			
			if(flag){
				flag=false
				n--;
				if(n<0){
					n=0;
				}
				$(document.body).animate({scrollTop:`${n*winHeight}px`},1000,function(){flag=true})
			}
			
		},function(){
			if(flag){
				flag=false;
				n++;
				if(n>$('section').length-1){
					n=$('section').length-1
				}
				$(document.body).animate({scrollTop:`${n*winHeight}px`},1000,function(){flag=true})
			}
		}
	)
	/*滚轮事件*/
	function fn(h){
		if(h==1){
			$('ul.food-detal').css({top:'15px'})
		}
		if(h==3){
			$('div.youzi h1').css({left:'0px'})
			$('div.youzi h2').css({left:'0px'})
			$('div.youzi p').css({left:'0px'})
			$('button.more').css({left:'0px'})
		}
		if(h==4){
			$('ul.blog>li').css({top:'0'})
		}
		if(h==6){
			$('.bot-left').animate({top:'0px'},1000)
			$('.bot-right').animate({top:'0px'},1000)
		}
	}
	$(window).scroll(function(){
		fn(n)
		$('ul.slide>li>div').css({width:'2px',height:'2px',background:'#fff',border:'none'})
		$('ul.slide>li>div').eq(n).css({width:'15px',height:'15px',background:'transparent',border:'1px solid #fff'})
	})
	/*圆点的点击效果*/
	$('ul.slide>li').click(function(){
		let ind=$(this).index();
		fn(ind)
		$(document.body).animate({scrollTop:`${ind*winHeight}px`})
		$('ul.slide>li>div').css({width:'2px',height:'2px',background:'#fff',border:'none'})
		$('ul.slide>li>div').eq(ind).css({width:'15px',height:'15px',background:'transparent',border:'1px solid #fff'})
		n=ind
	})
	/*图片的轮播*/
	let fl=true;
	let next=now=0;
	let t=setInterval(function(){fc('r')},3000);
	function fc(dir){
		if(fl){
			fl=false;
			if(dir=='r'){
				console.log(1)
				next++;
				if(next==3){
					next=0
				}
			$('.banner>li').eq(next).css({left:'-100%'})
			$('.banner>li').eq(now).animate({left:'100%'},'linear')
			}
			if(dir=='l'){
				next--;
				if(next==-1){
					next=2;
				}
			$('.banner>li').eq(next).css({left:'100%'})
			$('.banner>li').eq(now).animate({left:'-100%'},'linear')
			}
			if(dir==''){
				$('.banner>li').eq(next).css({left:'-100%'})
				$('.banner>li').eq(now).animate({left:'100%'},'linear')
			}
			$('.banner>li').eq(next).animate({left:'0px'},'linear',function(){
				fl=true;
				$('.h-group').css({opacity:'0'})
				$('.h-group').eq(now).css({opacity:'1'})
			});
			$('.circle>li').css({background:'rgba(0,0,0,0.5)'});
			$('.circle>li').eq(next).css({background:'#fff'});
			now=next;
		}
		
	}
	/*左右箭头*/
	$('.you').click(function(){
		fc('r')
	})
	$('.zuo').click(function(){
		fc('l')
	})
	/*小圆点的点击效果*/
	$('.circle>li').click(function(){
		next=$(this).index()
		fc('')
	})
	/*鼠标放上去轮播停止*/
	$('#one').hover(function(){
		clearInterval(t)
	},function(){
		t=setInterval(fn,3000);
	})
	/*菜品轮播*/
	let cai=0;
	let fi=true;
	$('.food-you').click(function(){
		if(fi){
			fi=false;
			cai++;
			if(cai>=$('ul.food-detal>li').length-4){
				cai=$('ul.food-detal>li').length-4;
			}
			$('ul.food-detal').css({transition:'0.1s'})
			$('ul.food-detal').animate({left:`${-cai*276}px`},300,function(){
				fi=true;
			})
		}
	})
	$('.food-zuo').click(function(){
		if(fi){
			fi=false;
			cai--;
			if(cai<0){
				cai=0;
			}
			$('ul.food-detal').css({transition:'0.1s'})
			$('ul.food-detal').animate({left:`${-cai*276}px`},300,function(){
				fi=true;
			})
		}
	})
	/*博客轮播*/
	let bo=0;
	$('.list-right').click(function(){
		bo++;
		if(bo>=$('ul.blog>li').length){
			bo=$('ul.blog>li').length-1
		}
		$('ul.blog').css({'marginLeft':`${-bo*1200}px`})
	})
	$('.list-left').click(function(){
		bo--;
		if(bo<0){
			bo=0;
		}
		$('ul.blog').css({'marginLeft':`${-bo*1200}px`})
	})
})
