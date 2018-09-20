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
})();(function(){
	// tabl标签
})();/*
	放置公共函数
 */

// 明确目的

/**
 * [生成任意范围内的随机整数]
 * @param  {Number} min [最小值]
 * @param  {Number]} max [最大]
 * @return {Number}     [返回min到max间的随机整数]
 */
function randomNumber(min,max){
	// 假设
	// Math.random()最小时 -> min
	// ....
	// Math.random()最大时 -> max
	var res = parseInt(Math.random()*(max-min+1))+min;//0.999


	return res;
}

// randomNumber(1,100);
// randomNumber(100,999);
// randomNumber(10,20);

/**
 * [随机颜色]
 * @return {String} [返回rgb格式随机颜色]
 */
function randomColor(num){
	if(num === 16){
		var str = '0123456789abcdef';
		var res = '#';

		for(var i=0;i<6;i++){
			// 获取随机索引值
			var idx = parseInt(Math.random()*str.length);
			res += str.charAt(idx);
		}

		return res;
	}

	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);

	return 'rgb('+r+','+g+','+b+')';//rgb(244,12,23)
}


function randomCode(num){

}

// randomCode(4);

/**
 * [关于元素节点的操作]
 * 	1.过滤非元素节点
 * 	2.获取子元素
 * 	3.获取兄弟元素
 */
var Element = {
	/**
	 * [过滤非元素节点，得到元素节点]
	 * @param  {Array} nodes [节点列表]
	 * @return {Array}       [元素列表]
	 */
	filter:function(nodes){
		// 声明res变量，用于存放结果
		var res = [];
		for(var i=0;i<nodes.length;i++){
			// 判断是否为元素节点
			// 是：则写入res数组
			if(nodes[i].nodeType === 1){
				res.push(nodes[i]);
			}
		}

		return res;
	},
	children:function(ele){
		// var res = [];
		// for(var i=0;i<ele.childNodes.length;i++){
		// 	if(ele.childNodes[i].nodeType === 1){
		// 		res.push(ele.childNodes[i])
		// 	}
		// }

		// return res;
		return this.filter(ele.childNodes);
	},
	prev:function(ele){

	},
	next:function(ele){}
}

// Element.children(box);//得到box下面的所有子元素
// Element.prev(box);//得到box的前一个元素
// Element.next(box);//得到box后面的兄弟元素


// 封装一个函数，用于获取元素的css样式，兼容所有浏览器
function getCss(ele,attr){
	if(window.getComputedStyle){
		// 标准浏览器
		return getComputedStyle(ele)[attr]
	}else if(ele.currentStyle){
		// IE6,7,8
		return ele.currentStyle[attr]
	}else{
		// 内联样式
		return ele.style[attr];
	}
}

// 先用
// getCss(box,'font-size');

/**
 * [给元素绑定事件的效果,同名事件不覆盖]
 * @param  {Node}  ele       [绑定事件的节点]
 * @param  {String}  type      [事件类型]
 * @param  {Function}  handler   [事件处理函数]
 * @param  {Boolean} isCapture [是否捕获]
 */
function bind(ele,type,handler,isCapture){
	// 判断当前是否支持addEventListener
	if(ele.addEventListener){
		// 标准浏览器
		ele.addEventListener(type,handler,isCapture);
	}else if(ele.attachEvent){
		// IE8-
		ele.attachEvent('on'+type,handler)
	}else{
		// 其他浏览器
		ele['on' + type] = handler;
	}
}

// 给元素绑定事件的效果
// 同名事件不覆盖
// bind(box,'click',function(){},true)

// 只生效一次的事件
function one(ele,type,handler,isCapture){

}

// Cooie的操作
var Cookie = {
	/**
	 * [获取cookie]
	 * @param  {String} name [cookie名]
	 * @return {String}      [返回name对应的cookie值]
	 */
	get:function(name){
		// 获取所有cookie
		var cookies = document.cookie;//

		// 声明变量，用于保存结果
		var res = '';

		// 转成数组
		cookies = cookies.split('; ');

		// 遍历cookie找出name对应的值
		for(var i=0;i<cookies.length;i++){
			// 获取当前cookie
			var arr = cookies[i].split('=');

			// 找出name对应的cookie
			if(arr[0] === name){
				res = arr[1];
			}
		}

		// 返回name对应的值
		// 无则返回cookie
		return res;
	},
	/**
	 * [删除cookie]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	remove:function(name){
		var now = new Date();
		now.setDate(now.getDate()-1);

		// document.cookie = name + '=x;expires='+now.toUTCString()
		this.set(name,'x',{expires:now});
	},
	/**
	 * [设置Cookie]
	 * @param {String} name  [cookie名]
	 * @param {String} value [cookie值]
	 * @param {[Object]} prop  [参数]
	 	* expires
	 	* path
	 	* domain
	 	* secure
	 */
	set:function(name,value,prop){
		// cookie必写部分
		var str = name + '=' + value;

		// 不传参数时避免报错
		if(prop === undefined){
			prop = {};
		}

		// 有效期
		if(prop.expires){
			str += ';expires=' + prop.expires.toUTCString();
		}

		// 保存路径
		if(prop.path){
			str +=';path=' + prop.path
		}

		// 域名
		if(prop.domain){
			str +=';domain=' + prop.domain
		}

		// 安全性
		if(prop.secure){
			str += ';secure';
		}

		// 写入cookie
		document.cookie = str;
	},

}

// Cookie.get('username');//laoxie
// Cookie.set('passowrd','123456',{path:'/'});//laoxie
// Cookie.set('passowrd','abcd',{expires:now,path:'/',secure:true});//laoxie
// Cookie.remove()


// function animate(ele,attr,target){
// 	// 避免多个属性时定时器覆盖
// 	var timerName = attr + 'timer';

// 	// 避免抖动
// 	clearInterval(ele[timerName]);

// 	ele[timerName] = setInterval(function(){
// 		// 获取当前值
// 		// var current = getComputedStyle(ele)[attr];
// 		var current = getCss(ele,attr);//可能达到的值：200px,0.5,1,45deg,#1258bc

// 		// 提取单位
// 		var unit = current.match(/^([\d\.]+)([a-z]*)$/);//null

// 		if(!unit){
// 			// 如果得到null,意味动画无法进行，直接退出
// 			clearInterval(ele.timer);
// 			return;
// 		}

// 		// 提取值和单位
// 		current = unit[1]*1;
// 		unit = unit[2];

// 		// 计算缓冲速度
// 		var speed = (target-current)/10;//0.6->1，-0.6->-1

// 		// speed不能为0
// 		speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

// 		// 针对opacity处理speed
// 		if(attr === 'opacity'){
// 			speed = speed<0 ? -0.05 : 0.05;
// 		}

// 		current += speed;

// 		// 判断结束条件
// 		if(current === target){
// 			clearInterval(ele[timerName]);

// 			// 重置目标值
// 			current = target;
// 		}

// 		// 设置样式
// 		ele.style[attr] = current + unit;
// 	},30)
// }



// animate(item[i],'top',160)
// animate(item[i],'top',5)


function animate(ele,opt,callback){
	// 记录属性数量
	var timerLen = 0;

	for(var attr in opt){
		// 每循环一个属性+1
		timerLen++;

		(function(attr){
			// 获取目标值
			var target = opt[attr];

			var timerName = attr + 'timer';

			// 避免抖动
			clearInterval(ele[timerName]);

			ele[timerName] = setInterval(function(){
				// 获取当前值
				// var current = getComputedStyle(ele)[attr];
				var current = getCss(ele,attr);//可能达到的值：-165px,200px,0.5,1,45deg,#1258bc

				// 提取单位
				var unit = current.match(/^([\-\d\.]+)([a-z]*)$/);//null

				if(!unit){
					// 如果得到null,意味动画无法进行，直接退出
					clearInterval(ele.timer);
					return;
				}

				// 提取值和单位
				current = unit[1]*1;
				unit = unit[2];

				// 计算缓冲速度
				var speed = (target-current)/10;//0.6->1，-0.6->-1

				// speed不能为0
				speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

				// 针对opacity处理speed
				if(attr === 'opacity'){
					speed = speed<0 ? -0.05 : 0.05;
				}

				current += speed;

				// 判断结束条件
				if(current === target){
					clearInterval(ele[timerName]);

					// 重置目标值
					current = target;

					// 每结束一个定时器，数量-1
					timerLen--;

					// 执行背景颜色改变
					if(typeof callback === 'function' && timerLen===0){
						callback();
					}
				}

				// 设置样式
				ele.style[attr] = current + unit;
			},30);

		})(attr);
	}
}

/**
 * 数据类型判断终极版
 * @param  {Every} data [任意数据类型]
 * @return {String}      [数据类型字符串]
 */
function type(data){
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
};/*
	对象方法插件：扩展jQuery的原型
		* 多个调用	each()
		* 链式调用  return this
		* 安全使用$ 匿名函数传参

		* 系列插件
 */

;(function($){
	// $.prototype === $.fn
	$.prototype.lxzoom = function(options){
		// 这里的this指向：实例（jquery对象）

		var defaults = {
			// 大图区域宽高
			width:300,
			height:200,

			// 位置：right,bottom,left,top
			position:'right',

			// 大图小图间距
			gap:15
		}

		// 实例可能存在多个
		// 利用each实现遍历
		this.each(function(){
			// 这里的this指向：实例中的节点

			// 扩展参数
			var opt = $.extend({},defaults,options);


			/*
				小图相关
			 */
			// 获取小图容器
			var $small = $(this);
			// 添加特定样式
			$small.addClass('lx-zoom');

			// 获取小图
			var $smallImg = $small.children('img');


		

			// 大图与小图的比例
			var ratio;

			// 创建大图容器,并写入页面
			var $big = $('<div/>').addClass('lx-bigzoom').appendTo('body');
			var $bigImg

			// 设置大图区域的显示位置：left,top,right(默认),bottom
			var bigLeft,bigTop;
			switch(opt.position){
				case 'left':
					bigLeft = $small.offset().left - opt.gap - opt.width;
					bigTop = $small.offset().top;
					break;
				case 'right':
					bigLeft = $small.offset().left + $smallImg.outerWidth() + opt.gap
					bigTop = $small.offset().top;
					break;
				case 'top':
					bigLeft = $small.offset().left
					bigTop = $small.offset().top - opt.gap - opt.height;
					break;
				case 'bottom':
					bigLeft = $small.offset().left
					bigTop = $small.offset().top + $smallImg.outerHeight() + opt.gap;
			}

			// 定义样式
			$big.css({
				width:opt.width,
				height:opt.height,
				top:bigTop,
				left:bigLeft
			});



			/*
				放大镜相关
			 */
			// 创建放大镜，并写入小图位置
			var $zoom = $('<div/>').addClass('zoom').appendTo($small);



			// 鼠标移入移出
			$small.on('mouseover',function(){
				$zoom.show();
				$big.show();


				// 获取大图url
				var bigUrl = $smallImg.attr('data-big');
				/*
					大图相关
				 */
				$big.empty();
				$bigImg = $('<img/>').attr('src',bigUrl).appendTo($big);

				// 创建临时图片，以解决图片加载慢而产生的比例计算错误的问题 
				var img = new Image();
				img.src = bigUrl;
				img.onload = function(){
				
					// 计算大图与小图的比例
					// 要获取图片的宽高前提：1.加载完成；2.显示到页面
					ratio = $bigImg.outerWidth()/$smallImg.outerWidth();

					// 设置放大镜的尺寸
					// 跟放大区域成比例
					$zoom.css({
						width:opt.width/ratio,
						height:opt.height/ratio
					});
				}

				
				
			}).on('mouseout',function(){
				$zoom.hide();
				$big.hide();
			})

			// 鼠标移动
			.on('mousemove',function(e){
				// 计算left,top
				var left = e.pageX - $zoom.outerWidth()/2 - $small.offset().left;
				var top = e.pageY - $zoom.outerHeight()/2 - $small.offset().top;

				// 限定top,left值
				// 不超出小图区域
				if(left < 0){
					left = 0;
				}else if(left > $smallImg.outerWidth() - $zoom.outerWidth()){
					left = $smallImg.outerWidth() - $zoom.outerWidth();
				}

				if(top<0){
					top = 0;
				}else if(top > $smallImg.outerHeight() - $zoom.outerHeight()){
					top = $smallImg.outerHeight() - $zoom.outerHeight()
				}

				$zoom.css({
					left:left,
					top:top
				});


				// 移动大图
				$bigImg.css({
					left:-left*ratio,
					top:-top*ratio
				});
			})
		});

		// 链式调用的关键
		return this;
	}

	// $.fn.extend({
	// 	lxzoom(){},
	// 	lxcarousel(){},
	// 	lxtab(){}
	// 	....
	// })
})(jQuery);

