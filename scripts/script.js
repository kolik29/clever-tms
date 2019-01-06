let burgerMenuActive = false;

$(document).ready(function() {
	enableShadow();
	$(window).on('scroll', function(){
		enableShadow();
	});

	$('.burger-menu').on('click', function() {
		if (!burgerMenuActive) {
			$('.burger-menu > span').css({'margin': '6px 0'});
			setTimeout(function() {
				$('.burger-menu > span').eq(0).css({'transform': 'rotate(45deg)'});
				$('.burger-menu > span').eq(1).css({'opacity': '0'});
				$('.burger-menu > span').eq(2).css({'transform': 'rotate(-45deg)'});
			}, 150);
			$('#overlay-menu').css({'transform': 'translateX(0)'});
			$('.burger-menu').addClass('yellow');
		} else {
			$('.burger-menu > span').eq(0).css({'transform': 'rotate(0)'});
			$('.burger-menu > span').eq(1).css({'opacity': '1'});
			$('.burger-menu > span').eq(2).css({'transform': 'rotate(0)'});
			setTimeout(function() {
				$('.burger-menu > span').eq(1).css({'margin-top': '0'});
				$('.burger-menu > span').eq(2).css({'margin-top': '12px'});
			}, 150);
			$('#overlay-menu').css({'transform': 'translateX(-100%)'});
			$('.burger-menu').removeClass('yellow');
		}
		burgerMenuActive = !burgerMenuActive;
	});

	$('#top-menu').on('click', function() {
		$('html, body').animate({scrollTop: 0}, 300);
	});
});

function enableShadow() {
	if ($(window).prop('pageYOffset') > 0) {
		$('#main-slider > .shadow').css({
			'display': 'block'
		});

		setTimeout(function() {
			$('#main-slider > .shadow').css({
				'opacity': 0.5
			});
		}, 1);

		$('.hexaflip-cube.hexaflip-cube-slide').css({
			'transform': 'scale(0.95)'
		});

		$('#top-menu').css({
			'transform': 'translateY(0)'
		});

		if(!$('.burger-menu').hasClass('yellow'))
			$('.burger-menu').addClass('aqua');

		$('.logo').addClass('aqua');
	} else {
		$('#main-slider > .shadow').css({
			'opacity': 0
		});

		setTimeout(function() {
			$('#main-slider > .shadow').css({
				'display': 'none'
			});
		}, 500);

		$('.hexaflip-cube.hexaflip-cube-slide').css({
			'transform': 'scale(1)'
		});

		$('#top-menu').css({
			'transform': 'translateY(-100%)'
		});

		$('.burger-menu').removeClass('aqua');
		$('.logo').removeClass('aqua');
	}
}

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