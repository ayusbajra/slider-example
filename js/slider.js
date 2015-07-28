;(function () {
'use strict';

	//for moving the slider
	function Slider(options){
		var className = 'slider';
		var duration = 500;
		var isStatic = true;
		var indexArray = [];
		var slideShow;

		if (options && options.className) {
			className = options.className;
		}

		var animator = new Animator();

		var sliderElement = document.getElementsByClassName(className)[0];
		var indexElement = sliderElement.children[2];
		var totalSlides = sliderElement.children[0].childElementCount;
		var slides = sliderElement.children[0].children;
		var slidesHolder = sliderElement.children[0];
		var currentPosition = 0;
		var slideWidth = 960;

		var btnLeft = sliderElement.children[1].children[0];
		var btnRight =  sliderElement.children[1].children[1];

		var that = this;

		btnLeft.onclick = function(){
					currentPosition--;
					console.log(currentPosition);
					if (currentPosition < 0) {
						currentPosition = totalSlides-1;
					}
					var ml = currentPosition * slideWidth * -1;
					
					console.log('moved left');
					animator.animate(slidesHolder, {marginLeft: ml}, duration);
					updateIndex();
		};

		btnRight.onclick = function(){
					currentPosition++;
					console.log(currentPosition);
					if (currentPosition >= totalSlides) {
						currentPosition = 0;
					}
					var ml = currentPosition * slideWidth * -1;
					
					console.log("moved right");
					animator.animate(slidesHolder, {marginLeft: ml}, duration);
					updateIndex();
		};
		
		var autoSlide = function(){
					currentPosition++;
					console.log(currentPosition);
					if (currentPosition >= totalSlides) {
						currentPosition = 0;
					}
					var ml = currentPosition * slideWidth * -1;
					
					console.log(currentPosition, ml);
					animator.animate(slidesHolder, {marginLeft: ml}, duration);
					updateIndex();
		};

		;(function(){
				sliderElement.onmouseover = function() {
							clearInterval(slideShow);

				};
				sliderElement.onmouseout = function(){
							slideShow = setInterval(autoSlide,5000);
				};		
		})();

		var index = function (){
				for(var i=1; i<=totalSlides; i++){
						var indexIcon = document.createElement('div');
						indexIcon.className = 'index'+i;
						indexIcon.name = 'index';
						indexIcon.id = 'index';
						indexIcon.style.width = '15px';
						indexIcon.style.height = '15px';
						indexIcon.style.float = 'left';

						if (i<=totalSlides - 1) {
							indexIcon.style.marginRight = '5px';
						};

						indexIcon.style.background = 'url(images/index-default.png)';

						indexIcon.onclick = (function(){
							var currI = i;
							return function () {
								if (currentPosition >= totalSlides) {
									currentPosition = 0;
								}
								currentPosition = currI - 1;
								var ml = currentPosition * slideWidth * -1;
								animator.animate(slidesHolder, {marginLeft: ml}, duration);
								updateIndex();
							};
						})();

						indexIcon.onmouseover = (function(){
						   	var currI = i;
		                    return function () {
	                    		if (currI-1 != currentPosition){
	                    			indexArray[currI-1].style.background = 'url(images/index-click.png)';
	                    			indexArray[currI-1].style.opacity = .75;
	                    		}
		                    };							
						})();
						
						indexIcon.onmouseout = (function(){
						   	var currI = i;
		                    return function () {
	                    		if (currI-1 != currentPosition){
	                    			indexArray[currI-1].style.background = 'url(images/index-default.png)';
	                    			indexArray[currI-1].style.opacity = .5;
	                    		}    							                     					                        
		                    };							
						})();

						indexArray.push(indexIcon);
						indexElement.appendChild(indexIcon);
				}
				var indexWidth = indexElement.offsetWidth;
				indexElement.style.marginLeft = (960-indexWidth)/2+'px';
		};

		var updateIndex = function() {
			for (var j=0; j<=indexArray.length-1; j++){
				if(j!=currentPosition){
					indexArray[j].style.background = 'url(images/index-default.png)';
					indexArray[j].style.opacity = '0.5';
				}else{
					indexArray[j].style.background = 'url(images/index-click.png)';
					indexArray[j].style.opacity = '1';
				}
			}
		};

		index();
		updateIndex();
		slideShow = setInterval(autoSlide,5000);

	};



	function Animator() { //right animator
		var fps = 30;
		this.isStatic = true;
		
		this.animate = function(element, props, duration) {
				var intervalDuration = duration/fps;
				var initialPosition = element.style.marginLeft=='' ? 0 : parseInt(element.style.marginLeft);
				var endPosition = props.marginLeft;
				var difference = endPosition - initialPosition;
				var counter = 0;

				var interval = setInterval(function() {
						counter++;
						var step = difference / intervalDuration;
						var noOfIteration = duration/fps;
						var current = initialPosition + (step * counter);
						if(counter >= noOfIteration){
							clearInterval(interval);
							current = endPosition;
						}
						element.style.marginLeft = current + 'px';
					}, intervalDuration);
		};
	};

	window.Slider = Slider;	
})();