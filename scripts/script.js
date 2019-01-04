$(document).ready(function() {
	$(window).on('scroll', function(){
	    if ($(window).prop('pageYOffset') > 0) {
	    	$('#main-slider > .shadow').css({
	    		display: 'block'
	    	});
	    	setTimeout(function() {
	    		$('#main-slider > .shadow').css({
	    			opacity: 0.5
	    		});
	    	}, 1);
	    	$('.hexaflip-cube.hexaflip-cube-slide').css({
	    		transform: 'scale(0.95)'
	    	})
	    } else {
	    	$('#main-slider > .shadow').css({
	    		opacity: 0
	    	});
	    	setTimeout(function() {
	    		$('#main-slider > .shadow').css({
	    			display: 'none'
	    		});
	    	}, 500);
	    	$('.hexaflip-cube.hexaflip-cube-slide').css({
	    		transform: 'scale(1)'
	    	})
	    }
	});

	let burgerMenuActive = false;
	$('.burger-menu').on('click', function() {
		if (!burgerMenuActive) {
			$('.burger-menu > div').css({'margin': '6px 0'});
			setTimeout(function() {
				$('.burger-menu > div').eq(0).css({'transform': 'rotate(45deg)'});
				$('.burger-menu > div').eq(1).css({'transform': 'rotate(45deg)'});
				$('.burger-menu > div').eq(2).css({'transform': 'rotate(-45deg)'});
			}, 150)
		} else {
			$('.burger-menu > div').eq(0).css({'transform': 'rotate(0)'});
			$('.burger-menu > div').eq(1).css({'transform': 'rotate(0)'});
			$('.burger-menu > div').eq(2).css({'transform': 'rotate(0)'});
			setTimeout(function() {
				$('.burger-menu > div').eq(1).css({'margin-top': '0'});
				$('.burger-menu > div').eq(2).css({'margin-top': '12px'});
			}, 150);
		}
		burgerMenuActive = !burgerMenuActive;
	});
});

(function() {
	document.addEventListener('DOMContentLoaded', function() {
		var hexaSlider, leftControl, rightControl, mouseXStart, mouseXEnd;
		hexaSlider = new HexaFlip(document.getElementById('slider-container'), {
			slide: ['a', 'b', 'c']
		}, {
			horizontalFlip: true
		});
		leftControl = document.getElementById('slider-control--left');
		rightControl = document.getElementById('slider-control--right');

		leftControl.addEventListener('click', (function() {
			if (($(window).prop('pageYOffset') != 0)) {
    			$('html, body').animate({scrollTop: 0}, 300).promise().then(function() {
    				hexaSlider['flipBack']();
    			});
    		} else
    			hexaSlider['flipBack']();
		}), false);
		rightControl.addEventListener('click', (function() {
			if (($(window).prop('pageYOffset') != 0)) {
    			$('html, body').animate({scrollTop: 0}, 300).promise().then(function() {
    				hexaSlider['flip']();
    			});
    		} else
    			hexaSlider['flip']();
		}), false);

		document.getElementById('slider-container').addEventListener('mousedown', function(e) {
			mouseXStart = e.offsetX;
		});
		document.getElementById('slider-container').addEventListener('mouseup', function(e) {
			mouseXEnd = e.offsetX;
			moveFlip();
		});

		document.getElementById('slider-container').addEventListener('touchstart', function(e) {
			mouseXStart = e.changedTouches[0].clientX;
		});
		document.getElementById('slider-container').addEventListener('touchend', function(e) {
			mouseXEnd = e.changedTouches[0].clientX;
			moveFlip();
		});

		function moveFlip() {
			if (Math.abs(mouseXStart - mouseXEnd) > 50) {
				if (mouseXStart - mouseXEnd < 0) {
					hexaSlider['flipBack']();
				} else if (mouseXStart - mouseXEnd > 0) {
					hexaSlider['flip']();
				}
			}
		}
	}, false);
}).call(this);