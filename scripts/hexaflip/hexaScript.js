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
			return hexaSlider['flipBack']();
		}), false);
		rightControl.addEventListener('click', (function() {
			return hexaSlider['flip']();
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