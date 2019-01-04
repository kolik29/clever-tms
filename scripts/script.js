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
    		$('html, body').animate({scrollTop: 0}, 500);
    		setTimeout(hexaSlider['flipBack'](), 1000);
		}), false);
		rightControl.addEventListener('click', (function() {
    		$('html, body').animate({scrollTop: 0}, 500);
    		setTimeout(hexaSlider['flip'](), 1000);
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