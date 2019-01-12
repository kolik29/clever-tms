let burgerMenuActive = false;

$(document).ready(function() {
	enableShadow();
	setLinkHead();

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

	$('#top-panel').on('click', function() {
		$('html, body').animate({scrollTop: 0}, 300);
	});

	$('#scrollPage').on('click', function() {
		$('body,html').animate({
		    scrollTop: document.documentElement.clientHeight
		}, 500);
	});

	hoverOnSliderControl();
});

function hoverOnSliderControl() {
	$('#slider-control--left').on('mouseenter', function() {
		$('#slider-control--left').addClass('hover');
	});
	$('#slider-control--left').on('mouseleave', function() {
		$('#slider-control--left').removeClass('hover');
	});

	$('#slider-control--right').on('mouseenter', function() {
		$('#slider-control--right').addClass('hover');
	});
	$('#slider-control--right').on('mouseleave', function() {
		$('#slider-control--right').removeClass('hover');
	});
}

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

		$('#top-panel').css({
			'transform': 'translateY(0)'
		});

		if(!$('.burger-menu').hasClass('yellow'))
			$('.burger-menu').addClass('aqua');

		$('.logo').addClass('aqua');

		$('#main-slider').css({
			'z-index': '-1'
		});
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

		$('#top-panel').css({
			'transform': 'translateY(-100%)'
		});

		$('.burger-menu').removeClass('aqua');
		$('.logo').removeClass('aqua');

		setTimeout(function() {
			$('#main-slider').css({
				'z-index': '0'
			});
		}, 500);
	}
}

var controlButton = {
	'name_1': [
		'Имя 1', 'pagetitle_1'
	],
	'name_2': [
		'Имя 2', 'pagetitle_2'
	],
	'name_3': [
		'Имя 3', 'pagetitle_3'
	]
}
var currentControlIndex = 0;

(function() {
	document.addEventListener('DOMContentLoaded', function() {
		var hexaSlider, leftControl, rightControl, mouseXStart, mouseXEnd;
		hexaSlider = new HexaFlip(document.getElementById('slider-container'), {
			slide: ['<div class="slide-picture" style="background: url(\'img/office.jpg\'), linear-gradient(135deg, #0ff 25%, yellow);"><div class="slider-content"><div class="slider-content--background"></div></div></div>', '2', '3']
		}, {
			horizontalFlip: true
		});

		leftControl = document.getElementById('slider-control--left');
		rightControl = document.getElementById('slider-control--right');

		leftControl.addEventListener('click', (function(e) {
			e.preventDefault();

			if (($(window).prop('pageYOffset') != 0)) {
    			$('html, body').animate({scrollTop: 0}, 300).promise().then(function() {
    				hexaSlider['flipBack']();
    			});
    		} else
    			hexaSlider['flipBack']();

    		setLinkHead('left');
		}), false);

		rightControl.addEventListener('click', (function(e) {
			e.preventDefault();

			if (($(window).prop('pageYOffset') != 0)) {
    			$('html, body').animate({scrollTop: 0}, 300).promise().then(function() {
    				hexaSlider['flip']();
    			});
    		} else
    			hexaSlider['flip']();

    		setLinkHead('right');
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
					setLinkHead('left');
				} else if (mouseXStart - mouseXEnd > 0) {
					hexaSlider['flip']();
					setLinkHead('right');
				}
			}
		}
	}, false);
}).call(this);

function getButtonValue(arr, index) {
	let newIndex = [index - 1, index + 1];

	if (index == 0)
		newIndex = [Object.keys(arr).length - 1, 1];

	if (index == Object.keys(arr).length - 1)
		newIndex = [Object.keys(arr).length - 2, 0];

	return {
		left: [
			Object.keys(arr)[newIndex[0]],
			arr[Object.keys(arr)[newIndex[0]]][0]
		],
		right: [
			Object.keys(arr)[newIndex[1]],
			arr[Object.keys(arr)[newIndex[1]]][0]
		],
	}
}

let siteTitle = document.title;

function setLinkHead(direction) {
	$('#content > section').removeClass('visible');

	$('#slider-control--left').off('mouseenter');
	$('#slider-control--left').off('mouseleave');
	$('#slider-control--right').off('mouseenter');
	$('#slider-control--right').off('mouseleave');
	$('#slider-control--left').removeClass('hover');
	$('#slider-control--right').removeClass('hover');

	if (direction == undefined) {
		history.replaceState(null, null, '#' + getButtonValue(controlButton, currentControlIndex + 1).left[0]);
		$('#' + Object.keys(controlButton)[0]).addClass('visible');
		document.title = getButtonValue(controlButton, currentControlIndex + 1).left[1] + ' — ' + siteTitle;
	} else {
		history.replaceState(null, null, '#' + getButtonValue(controlButton, currentControlIndex).right[0]);
		document.title = getButtonValue(controlButton, currentControlIndex).right[1] + ' — ' + siteTitle;
	}

	if (direction == 'left') {
		currentControlIndex--;
		if (currentControlIndex < 0)
			currentControlIndex = Object.keys(controlButton).length - 1;
	} else if (direction == 'right') {
		currentControlIndex++;
		if (currentControlIndex > Object.keys(controlButton).length - 1)
			currentControlIndex = 0;
	}

	$('#' + Object.keys(controlButton)[currentControlIndex]).addClass('visible');

	setTimeout(function() {
		$('#slider-control--left').attr('href', '#' + getButtonValue(controlButton, currentControlIndex).left[0]);
		$('#slider-control--right').attr('href', '#' + getButtonValue(controlButton, currentControlIndex).right[0]);
		$('#slider-control--left > span').text(getButtonValue(controlButton, currentControlIndex).left[1]);
		$('#slider-control--right > span').text(getButtonValue(controlButton, currentControlIndex).right[1]);
		hoverOnSliderControl();

		if ($('#slider-control--left').is(':hover')) $('#slider-control--left').addClass('hover');
		if ($('#slider-control--right').is(':hover')) $('#slider-control--right').addClass('hover');
	}, 1500);
}