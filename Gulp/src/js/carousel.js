(function(){
var Carousel = function(options){
 	// 属性
 	// 默认值
 	let defaults = {
 		ele:'',//必填参数
 		imgs:[],//必传参数
 		width:810,
 		height:320,
 		index:0,
 		page:true,//是否显示分页
 		button:true,//是否显示左右按钮
 		type:'vertical',//动画类型：vertical(垂直)，horizontal(水平),fade(淡入淡出)
 		seamless:true,//是否无缝滚动,
 		duration:3000,//轮播间隔时间
 	}
 	
 	// 扩展默认参数
 	this.opt = Object.assign({},defaults,options);
 	this.len = this.opt.imgs.length;

 	// 初始化并传递参数
 	this.init();
 }


// 方法：
Carousel.prototype.init = function(){
	var opt = this.opt;
	/*
		* 获取/生成元素
		* 绑定事件
	 */
	
	var ele = document.querySelector(opt.ele);

	// 指定专有类型
	ele.classList.add('lx-carousel');

	// 设置样式（宽高）
	ele.style.width = opt.width + 'px';
	ele.style.height = opt.height + 'px';

	// 生成图片(ul,li,img)
	let ul = document.createElement('ul');

	// 给ul添加类型：设置轮播类型
	ul.className = opt.type;//horizontal,vertical,fade

	// 水平轮播需要给ul添加宽度
	if(opt.type === 'horizontal'){
		ul.style.width = opt.width*this.len + 'px';
	}else if(opt.type === 'fade'){
		ul.style.width = opt.width + 'px';
		ul.style.height = opt.height + 'px';
	}

	ul.innerHTML = opt.imgs.map(url=>{
		return '<li><img src="'+url+'"/></li>';
	}).join('');

	// 写入页面
	ele.appendChild(ul);


	// 分页
	if(opt.page){
		this.page = document.createElement('div');
		this.page.className = 'page';
		for(var i=0;i<this.len;i++){
			var span = document.createElement('span');
			span.innerText = i+1;

			// 高亮
			if(i===opt.index){
				span.className = 'active';
			}
			this.page.appendChild(span);
		}

		ele.appendChild(this.page);


	}

	// 左右按钮
	if(opt.button){
		let btnPrev = document.createElement('span');
		btnPrev.className = 'btn-prev';
		btnPrev.innerHTML = '&lt;';

		let btnNext = document.createElement('span');
		btnNext.className = 'btn-next';
		btnNext.innerHTML = '&gt;';

		ele.appendChild(btnPrev);
		ele.appendChild(btnNext);
	}

	// 传递参数
	this.ul = ul;
	this.ele = ele;



	// 初始化
	// 页面进入自动轮播
	this.timer = setInterval(this.autoPlay.bind(this),opt.duration);
	this.play();
	

	// 鼠标移入移出
	ele.onmouseover = ()=>{
		this.stop();
	}
	ele.onmouseout = ()=>{
		this.timer = setInterval(this.autoPlay.bind(this),opt.duration);
	}

	// 点击分页切换
	ele.onclick = e=>{
		if(e.target.parentNode.className === 'page'){
			opt.index = e.target.innerText-1;

			this.play();
		}else if(e.target.className === 'btn-prev'){
			opt.index--;
			this.play();
		}else if(e.target.className === 'btn-next'){
			opt.index++;
			this.play();
		}
	}
	
	
}

Carousel.prototype.autoPlay = function(){
			this.opt.index++;
			this.play();
}

// 播放
Carousel.prototype.play = function(){
	let opt = this.opt;

	// 到达最后一张后重置到第一张
	if(opt.index>=this.len){
		opt.index = 0;
	}else if(opt.index<0){
		opt.index = this.len-1;
	}

	// var type = {vartical:'top',horizontal:'left',fade:'opacity'}

	var obj = {}

	// 水平
	if(opt.type === 'horizontal'){
		obj.left = -opt.index*opt.width;
		animate(this.ul,obj);
	}else if(opt.type === 'vertical'){
		obj.top = -opt.index*opt.height;
		animate(this.ul,obj);
	}else if(opt.type === 'fade'){
		for(var i=0;i<this.len;i++){
			animate(this.ul.children[i],{opacity:0});
		}
		animate(this.ul.children[opt.index],{opacity:1});

	}

	

	// 页码高亮
	if(this.page){
		for(var i=0;i<this.len;i++){
			this.page.children[i].className = '';
		}
		this.page.children[opt.index].className = 'active';
	}
}

// 停止
Carousel.prototype.stop = function(){
	clearInterval(this.timer);
}




 new Carousel({
 	ele:'.banner',
 	width:320,
 	height:320,
 	index:4,
 	page:false,
 	button:false,
 	type:'fade',
 	imgs:["img/g1.jpg","img/g2.jpg","img/g3.jpg","img/g4.jpg","img/g5.jpg"]
 });


 new Carousel({
 	ele:'.carousel',
 	imgs:["img/001.jpg","img/002.jpg","img/003.jpg","img/004.jpg"]
 })
})()