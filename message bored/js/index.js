HTMLElement.prototype.insertAfter=function(nNode){
	
	let parent=this.parentNode;
	let next=this.nextElementSiblingSibling;
	if(next){
		next.insertBefore(nNode,next);
	}else{
		parent.appendChild(nNode);
	}
	
	
}
HTMLElement.prototype.prepend=function(nNode){
	let child=this.firstElementChild;
	if(child){
		this.insertBefore(nNode,child);
	}else{
		this.appendChild(nNode);

	}
}
HTMLElement.prototype.prependTo=function(nNode){
	nNode.prepend(this);
}
