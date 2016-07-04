'use strict';

class Item {
	constructor(options) {
		this.el = options.el;
		this.deleteButtons = this.el.querySelectorAll('.book__cta');

		this._initEvents();
	}

	_initEvents () {
		for (var i = 0; i < this.deleteButtons.length; i++) {

			let deleteButton = this.deleteButtons[i];

			deleteButton.onclick = function() {
				let el = this.parentNode;
				el.parentNode.removeChild(el);
			};
		}
	}



}
