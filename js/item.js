'use strict';

class Item {
	constructor(options) {
		this.el = options.el;
		this.deleteBtns = this.el.querySelectorAll('.book__cta');

		this._initEvents();
	}

	_initEvents () {
		for (var i = 0; i < this.deleteBtns.length; i++) {

			let btn = this.deleteBtns[i];
			console.log(btn);
			btn.onclick = function() {
				let el = this.parentNode;
				el.parentNode.removeChild(el);
			};
		}
	}



}
